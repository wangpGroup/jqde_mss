var vmModule = new Vue({
    el: '#vmModule',
    data: {
        list: []
    },
    mounted: function () {
        this.fetchData();
    },
    methods: {
        fetchData: function () {
            var $this = this;
            JqdeBox.loading();
            JqdeMods.ajax('modulesMgr', 'getAllMoudles').then(function (result) {
                JqdeBox.unloading();
                if (result.success) {
                    $this.list = result.rows;
                } else {
                    JqdeBox.message(false, result.message);
                }
            });
        },
        edit: function (item) {
            var $this = this;
            JqdeBox.dialog({
                title: '修改模块',
                url: 'modules/modulesMgr/edit.html',
                init: function () {
                    vmEdit.item = $.extend({}, item);
                },
                confirm: function () {
                    // 修改数据
                    JqdeMods.ajax('modulesMgr', 'updateModule', vmEdit.item).then(function (result) {
                        if (result.success) {
                            $.extend(item, vmEdit.item);// 更新页面
                            JqdeBox.message(true, '修改成功！');
                        } else {
                            JqdeBox.message(false, result.message);
                        }
                    });
                }
            });
        }
    }
})