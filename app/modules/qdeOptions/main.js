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
            JqdeMods.ajax('qdeOptions', 'getAllOptions').then(function (result) {
                JqdeBox.unloading();
                if (result.success) {
                    $this.render(result);
                } else {
                    JqdeBox.message(false, result.message);
                }
            });
        },
        render: function (result) {
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
        },
        update: function () {
            // ajaxParams:{"api_url":"192.168.10.9","api_port":"9095","search_host":"192.168.10.9:9200","license.user":"图书馆"}
            var ajaxParams = {};
            $(this.$el).find('input.form-field').each(function () {
                ajaxParams[this.name] = this.value;
            });

            // /qdeMods/ajax?action=qdeOptions&verb=updateOptions
            JqdeMods.ajax('qdeOptions', 'updateOptions', ajaxParams).then(function (result) {
                if (result.success) {
                    JqdeBox.message(true, '修改成功！');
                } else {
                    JqdeBox.message(false, result.message);
                }
            });

        }
    }
})