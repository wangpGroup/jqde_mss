var vmModule = new Vue({
    el: '#vmModule',
    data: {
        list: [],
        ids: []
    },
    mounted: function () {
        var $this = this;

        this.fetchData();

        // check all
        var $table = $('#dynamic-table');
        $table.on('click', 'th input[type=checkbox]', function () {
            var th_checked = this.checked;
            $table.find('td input[type=checkbox]').each(function () {
                this.checked = th_checked;
            });
            $this.checkChanged();
        });
    },
    methods: {
        // 抓取列表数据
        fetchData: function () {
            var $this = this;
            JqdeBox.loading();
            JqdeMods.ajax('qdeAdmin', 'getAllAdmins').then(function (result) {
                JqdeBox.unloading();
                if (result.success) {
                    $this.list = result.rows;
                } else {
                    JqdeBox.message(false, result.message);
                }
            });
        },
        // 添加
        add: function () {
            var $this = this;
            JqdeBox.dialog({
                title: '添加管理员',
                url: 'modules/qdeAdmin/edit.html',
                init: function () {
                    vmEdit.item = {
                        "department": "",
                        "email": "",
                        "enabled": true,
                        "name": "",
                        "password": "",
                        "phone": "",
                        "sex": "M",
                        "userId": ""
                    };
                },
                confirm: function () {
                    if (vmEdit.valid()) {

                        // 后台交互
                        JqdeMods.ajax('qdeAdmin', 'addAdmin', vmEdit.ajaxPramas).then(function (result) {
                            if (result.success) {
                                $this.list.push(vmEdit.item);// 更新页面
                                JqdeBox.message(true, '添加成功！');
                            } else {
                                JqdeBox.message(false, result.message);
                            }
                        });

                        return true;
                    }
                    return false;
                }
            });
        },
        // 修改
        edit: function (item, index) {
            var $this = this;
            JqdeBox.dialog({
                title: '修改管理员',
                url: 'modules/qdeAdmin/edit.html',
                init: function () {
                    vmEdit.item = $.extend({}, item);
                },
                confirm: function () {
                    if (vmEdit.valid()) {

                        // 后台交互
                        JqdeMods.ajax('qdeAdmin', 'updateAdmin', vmEdit.ajaxPramas).then(function (result) {
                            if (result.success) {
                                $.extend(item, vmEdit.item);
                                JqdeBox.message(true, '修改成功！');
                            } else {
                                JqdeBox.message(false, result.message);
                            }
                        });
                        return true;
                    }
                    return false;
                }
            });
        },
        // 删除
        remove: function (item, index) {
            var $this = this;
            JqdeBox.confirm('您确定要删除吗？', function (result) {
                if (result) {

                    // 后台交互
                    JqdeMods.ajax('qdeAdmin', 'removeAdmin', {"ids": [item.userId]}).then(function (result) {
                        if (result.success) {
                            $this.list.splice(index, 1);
                            JqdeBox.message(true, '删除成功！');
                        } else {
                            JqdeBox.message(false, result.message);
                        }
                    });

                    // ajaxParams:{"ids":["aaaaa"]}
                    // $this.list.splice(0, $this.list.length);
                }
            });
        },
        // 删除选中
        removeSelected: function () {
            var $this = this;
            JqdeBox.confirm('您确定要删除吗？', function (result) {
                if (result) {

                    // 后台交互
                    JqdeMods.ajax('qdeAdmin', 'removeAdmin', {"ids": $this.ids}).then(function (result) {
                        if (result.success) {
                            $this.fetchData();
                            JqdeBox.message(true, '删除成功！');
                        } else {
                            JqdeBox.message(false, result.message);
                        }
                    });
                }
            });
        },
        // 选中改变
        checkChanged: function () {
            var ids = [];
            $('#dynamic-table').find('td input[type=checkbox]').each(function () {
                if (this.checked) {
                    ids.push(this.value);
                }
            });
            this.ids = ids;
        }
    }
})