var vmModule = new Vue({
    el: '#vmModule',
    data: {
        groups: []
    },
    mounted: function () {
        this.fetchData();
    },
    methods: {
        fetchData: function () {
            var $this = this;
            JqdeBox.loading();
            JqdeMods.ajax('qdeReports', 'getReports').then(function (result) {
                JqdeBox.unloading();
                if (result.success) {
                    $this.render(result);
                } else {
                    // 后台报错，临时假数据测试
                    $this.render(result);

                    JqdeBox.message(false, result.message);
                }
            });
        },
        render: function (result) {
            // 后台报错，临时假数据测试
            result = {
                "success": true,
                "rows": [{
                    "category": "系统环境",
                    "key": "操作系统",
                    "value": "Linux V3.10.0-327.10.1.el7.x86_64 amd64 (unknown)"
                }, {"category": "系统环境", "key": "中央处理器", "value": "12个CPU；1900 MHz"}, {
                    "category": "系统环境",
                    "key": "物理内存",
                    "value": "空闲2151M；总内存128662M"
                }, {"category": "系统环境", "key": "QDE版本", "value": "QDE V4.0.18"}, {
                    "category": "系统环境",
                    "key": "JRE信息",
                    "value": "版本1.8.0_45；路径/opt/jdk1.8.0_45/jre"
                }, {
                    "category": "系统环境",
                    "key": "Java虚拟机内存",
                    "value": "空闲1120M；总内存2473M；最大内存 27305M"
                }, {"category": "系统环境", "key": "JVM线程数", "value": "31"}]
            };
            var groups = [], groupMap = {};
            for (var i in result.rows) {
                var row = result.rows[i];
                if (!groupMap[row.category]) {
                    var gourp = {
                        category: row.category,
                        rows: []
                    };
                    groups.push(gourp);
                    groupMap[row.category] = gourp.rows;
                }
                groupMap[row.category].push(row);
            }

            this.groups = groups;
        }
    }
})
