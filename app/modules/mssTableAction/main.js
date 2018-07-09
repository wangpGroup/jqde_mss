var vmModule = new Vue({
    el: '#vmModule',
    data: {
        rows: []
    },
    mounted: function () {

        this.dataTable = $('#dynamic-table').DataTable($.extend({
            "columns": [
                {
                    "title": '<label class="pos-rel"><input type="checkbox" class="ace" /><span class="lbl"></span></label>',
                    "data": null,
                    "sortable": false,
                    "className": 'center',
                    "render": function (data, type, row, meta) {
                        return '<label class="pos-rel"><input type="checkbox" class="ace" /><span class="lbl"></span></label>';
                    }
                },
                {"title": "ID", "data": "id"},
                {"title": "名称", "data": "name"},
                {"title": "描述", "data": "alias"},
                {
                    "title": "锁定表结构",
                    "data": "strict",
                    "render": function (data, type, row, meta) {
                        if (data)
                            return '<span class="label label-sm label-success">开启</span>';
                        else
                            return '<span class="label label-sm label-warning">关闭</span>';
                    }
                },
                {
                    "title": "索引服务",
                    "data": "index",
                    "render": function (data, type, row, meta) {
                        if (data)
                            return '<span class="label label-sm label-success">开启</span>';
                        else
                            return '<span class="label label-sm label-warning">关闭</span>';
                    }
                },
                {"title": "分片数", "data": "number_of_shards"},
                {"title": "备份数", "data": "number_of_replicas"},
                {"title": "记录数", "data": "records"},
                {"title": "索引数", "data": "indexs"},
                {
                    "title": "创建时间", "data": "create_time",
                    "render": function (data, type, row, meta) {
                        return Tools.dateFormat(new Date(data), Tools.yyyyMMddHHmmss_);
                    }
                },
                {
                    "title": '',
                    "data": null,
                    "sortable": false,
                    "className": 'center',
                    "render": function (data, type, row, meta) {
                        return '<button class="btn btn-xs btn-info"><i class="ace-icon fa fa-pencil bigger-120"></i></button>';
                    }
                }
            ],
            "ajax": {
                url: Config.apiPath + "/qdeMods/ajax?action=mssTableAction&verb=list",
                dataSrc: 'rows'
            },
            "sorting": [[1, "asc"]],
        }, Config.dataTable_defaultOptions));

        var active_class = 'selected';
        $('#dynamic-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function () {
            var th_checked = this.checked;//checkbox inside "TH" table header

            $(this).closest('table').find('tbody > tr').each(function () {
                var row = this;
                if (th_checked) $(row).addClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', true);
                else $(row).removeClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', false);
            });
        });
        //select/deselect a row when the checkbox is checked/unchecked
        $('#dynamic-table').on('click', 'td input[type=checkbox]', function () {
            var $row = $(this).closest('tr');
            if ($row.is('.detail-row ')) return;
            if (this.checked)
                $row.addClass(active_class);
            else
                $row.removeClass(active_class);
        });
    },
    methods: {
        refresh: function () {
            this.dataTable.ajax.reload();
        }
    }
})