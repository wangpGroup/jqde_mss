/**
 * login
 */

var vmLogin = new Vue({
    el: '#vmLogin',
    data: function () {
        var userId = '', password = '', rememberMe = false;
        if (localStorage.rememberMe) {
            rememberMe = eval(localStorage.rememberMe);
        }
        if (rememberMe) {
            userId = localStorage.userId;
            password = localStorage.password;
        }
        return {
            userId: userId,
            password: password,
            rememberMe: rememberMe,
            error: '',
        }
    },
    methods: {
        login: function () {
            $.ajax({
                type: 'post',
                url: Config.apiPath + '/qdeMods/login',
                data: {
                    userId: vmLogin.userId,
                    password: vmLogin.password
                },
                success: function (result) {
                    if (result.indexOf('模块导航') > -1) {
                        vmLogin.error = '';

                        if (vmLogin.rememberMe) {
                            localStorage.rememberMe = true;
                            localStorage.userId = vmLogin.userId;
                            localStorage.password = vmLogin.password;
                        } else {
                            localStorage.rememberMe = false;
                            localStorage.userId = null;
                            localStorage.password = null;
                        }

                        location = './';
                    } else {
                        vmLogin.error = '用户名或密码不正确。'
                    }
                }
            });
        }
    }
});

//you don't need this, just used for changing background
jQuery(function ($) {
    $('#btn-login-dark').on('click', function (e) {
        $('body').attr('class', 'login-layout');
        $('#id-text2').attr('class', 'white');
        $('#id-company-text').attr('class', 'blue');

        e.preventDefault();
    });
    $('#btn-login-light').on('click', function (e) {
        $('body').attr('class', 'login-layout light-login');
        $('#id-text2').attr('class', 'grey');
        $('#id-company-text').attr('class', 'blue');

        e.preventDefault();
    });
    $('#btn-login-blur').on('click', function (e) {
        $('body').attr('class', 'login-layout blur-login');
        $('#id-text2').attr('class', 'white');
        $('#id-company-text').attr('class', 'light-blue');

        e.preventDefault();
    });

});