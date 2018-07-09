var vmModule = new Vue({
    el: '#vmModule',
    data: {
        userId: 'root',
        userName: 'INFCN',
        menus: [],
        iconCls: ['fa-desktop', 'fa-list', 'fa-pencil-square-o', 'fa-list-alt', 'fa-calendar', 'fa-picture-o', 'fa-tag']
    },
    mounted: function () {

        console.log(param.name);

        this.fetchData();
    },
    methods: {
        fetchData: function () {
            var $this = this;
            JqdeMods.ajax('qdeProfiles', 'getCurrentProfiles').then(function (result) {
                if (result.success) {
                    $this.render(result);
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
        }
    }
});