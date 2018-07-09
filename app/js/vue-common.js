
Vue.config.debug = Config.debug;
Vue.config.devtools = Config.devtools;
Vue.config.silent = Config.silent;

// 时间格式化
Vue.filter('datetime', function (value, format) {

    format = format || Tools.yyyyMMddHHmmss_;

    if(typeof(value) == 'number'){
        value = new Date(value);
    }
    return Tools.dateFormat(value, format);
});