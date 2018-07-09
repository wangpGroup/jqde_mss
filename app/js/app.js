var vmApp = new Vue({
    el: '#vmApp',
    data: {
        userId: 'root',
        userName: 'INFCN',
        menus: [],
        iconCls: ['fa-desktop', 'fa-list', 'fa-pencil-square-o', 'fa-list-alt', 'fa-calendar', 'fa-picture-o', 'fa-tag', 'fa-folder', 'fa-cogs'],
        modulePath: ''
    },
    mounted: function () {
        // DO on hash change
        $(window).on('hashchange', function () {
            vmApp.checkURL();
        });

        this.fetchData();
    },
    methods: {
        fetchData: function () {
            JqdeMods.ajax('qdeProfiles', 'getCurrentProfiles').then(function (result) {
                if (result.success) {
                    vmApp.render(result);
                }
            });
        },
        render: function (result) {
            var menus = [], menuMap = {};
            for (var i in result.services) {
                var service = result.services[i];
                if (!menuMap[service.folder]) {
                    var moduleMenu = {
                        name: service.folder,
                        submenus: []
                    };
                    menus.push(moduleMenu);
                    menuMap[service.folder] = moduleMenu;
                }

                var serviceMenu = {
                    name: service.serviceName,
                    url: service.serviceId
                };
                menuMap[service.folder].submenus.push(serviceMenu);
            }

            this.menus = menus;
            this.userId = result.userId;
            this.userName = result.userName;

            setTimeout(function () {
                vmApp.init();
            }, 200);
        },
        init: function () {
            // fire this on page load if nav exists
            if ($('#nav').length) {
                vmApp.checkURL();
            }

            $('#nav a[href!="#"]').click(function (e) {
                e.preventDefault();
                window.location.hash = $(this).attr('href');
            });

            // fire links with targets on different window
            $('#nav a[target="_blank"]').click(function (e) {
                e.preventDefault();
                window.open($(this).attr('href'));
            });

            // all links with hash tags are ignored
            $('#nav a[href="#"]').click(function (e) {
                e.preventDefault();
                if ($(this).parents('.menu-min').length == 0) {
                    $(this).parent().find('.submenu').slideToggle();
                }
            });
        },
        // CHECK TO SEE IF URL EXISTS
        checkURL: function () {
            //get the url by removing the hash
            var url = location.hash.replace(/^#/, '');

            param = {};

            // Do this if url exists (for page refresh, etc...)
            if (url) {
                url = 'modules/' + url.replace(/^\//, '');
                // console.log(url);

                var urls = url.split('?');

                if (urls.length > 1) {
                    window.param = _.chain(urls[1].split('&'))
                        .map(function (value) {
                            return value.split('=');
                        }).object().value();
                    // console.log(param);
                }


                var href = '/' + urls[0].split('/')[1] ;
                // console.log(href);

                // remove all active class
                $('#nav li.active').removeClass("active");
                $('#nav li.open').removeClass("open");

                // match the url and add the active class
                $('#nav li:has(a[href="' + href + '"])').addClass("active");
                $('#nav li:has(a[href="' + href + '"])').parents('li').addClass("active").addClass("open");
                $('#nav li:has(a[href="' + href + '"])').parents('li').siblings().find('.submenu').slideUp('fast');


                // parse url to jquery
                Tools.loadURL(urls[0], $('#content'), function () {
                    vmApp.drawBreadCrumb();
                }, function () {
                    vmApp.drawBreadCrumb();
                });



            } else {
                //update hash
                window.location.hash = $('#nav > li:first-child > a[href!="#"]').attr('href');
            }
        },
        // UPDATE BREADCRUMB
        drawBreadCrumb: function () {
            $("#breadcrumbs ul.breadcrumb").empty();
            $("#breadcrumbs ul.breadcrumb").append($('<li><i class="ace-icon fa fa-home home-icon"></i> 首页 </li>'));
            $('#nav li.active > a').each(function () {
                $("#breadcrumbs ul.breadcrumb").append($("<li>111</li>")
                    .html($.trim($(this).clone().children(".badge").remove().end().text())));
            });
        },
        logout: function () {
            JqdeBox.confirm('您确定要退出吗？', function (result) {
                if (result) {
                    $.ajax({
                        type: 'post',
                        url: Config.apiPath + '/qdeMods/logout',
                        success: function (result) {
                            location = 'login.html';
                        },
                        error: function (error) {
                            JqdeBox.message(false, error);
                        }
                    });
                }
            });
        }
    }
});