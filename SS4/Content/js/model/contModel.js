var viewModel = kendo.observable({
    isVisible: true,
    selectedRow: null,
    ModelEntity: function () { return kendo.observable({ data: {} }); },

    onDebug: function (e) { console.log("event :: save(" + kendo.stringify(e.values, null, 4) + ")"); },
    dataSource: new kendo.data.DataSource({
        schema: {
            model: {
                id: "id",
                fields: {
                    name: { type: "string", editable: true },                    
                    p1: { type: "string", editable: true },                                       
                }
            },
            data: "data",
            total: "total"
        },
        batch: true,
        pageSize: 100,
        transport: {
            read: {
                url: "/cont/getAll",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                cache: true,
                complete: function (data, status) { }
            },
            create: {
                url: "/cont/CreateOrUpdate",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                complete: function (e) {
                    if (!e.err) {
                        $(".k-pager-refresh").trigger('click');
                        ss4.shwNotification('Thêm dữ liệu thành công!', 'info');
                    }
                    else ss4.shwNotification(e.msg, 'error');
                }
            },
            update: {
                url: "/cont/CreateOrUpdate",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                complete: function (e) {
                    if (!e.err) ss4.shwNotification('Cập nhật dữ liệu thành công!', 'info');
                    else ss4.shwNotification(e.msg, 'error');
                }
            },
            destroy: {
                url: "/cont/destroy",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                complete: function (e) {
                    if (!e.err) ss4.shwNotification('Cập nhật dữ liệu thành công!', 'info');
                    else ss4.shwNotification(e.msg, 'error');
                }
            },
            parameterMap: function (options, operation) {
                if (operation !== "read" && options.models) {
                    return kendo.stringify(options);
                }
            }
        }
    }),
    dataBound: function (e) {
        //var grid = e.sender;
        //console.log(grid);

        //for (var i = 0; i < this.dataSource._data; i++) {
        //    this.dataSource._data[i].p1d = ss4.parse_ddMMyyyy(this.dataSource._data[i].p1);
        //}
    },
    detailInit: function (e) {
        //var grid = e.sender;
        //console.log(grid);
    },
    raddcur: null,
    onClick_Add: function () {
        if (this.raddcur != null) {
            if (this.raddcur.name == '') {
                $('tr[data-uid=' + this.raddcur.uid + '] td:first-child').click();
                ss4.alert({ title: 'Thông báo', message: 'Vui lòng nhập số Cont và thực hiện lại!!!', width: 300, height: 150, icon: 'info', time: 5000 });
                return false;
            }
        }
        var o = new this.dataSource.reader.model();
        this.raddcur = o;
        this.dataSource.add(o);
        $('tr[data-uid=' + o.uid + '] td:first-child').click();
    },

    onClick_Remove: function () {
        var thisObj = this;
        if (this.selectedRow != null) {
            ss4.confirm({
                title: 'Confirm', message: 'Bạn có chắc muốn xóa "' + this.selectedRow.name + '"?', width: 300, height: 150, icon: 'info',
                fnCallback: function () {
                    thisObj.dataSource.remove(thisObj.selectedRow);
                    thisObj.dataSource.sync();
                }
            });
        } else {
            ss4.alert({ title: 'Thông báo', message: 'Vui lòng chọn một dòng và bấm nút xóa!!!', width: 300, height: 150, icon: 'info', time: 5000 });
        }        
    },

    onClick_Save: function () {
        var arrData = viewModel.dataSource._data;
        var arrCodeExist = [];
        for (var i = 0; i < arrData.length; i++) {
            var iExist = 0;
            if (arrData[i].name == '' || arrData[i].name == null) {
                ss4.confirm({ title: 'Thông báo', message: 'Mã Cont không thể là rỗng!!', width: 300, height: 150, icon: 'info' });
                return false;
            }
            for (var j = 0; j < arrData.length; j++) {
                if (arrData[i].name == arrData[j].name) {
                    iExist += 1;
                }
            }
            if (iExist > 1) {
                arrCodeExist.push(arrData[i].name);
            }
        }

        if (arrCodeExist.length == 0)
            this.dataSource.sync();
        else {
            var sError = '';
            for (var i = 0; i < arrCodeExist.length; i++) {
                if (sError == '') sError = '<strong>Dòng ' + (i + 1).toString() + ': ' + arrCodeExist[i] + '</strong><br>';
                else sError += '<strong>Dòng ' + (i + 1).toString() + ': ' + arrCodeExist[i] + '</strong><br>';
            }

            ss4.confirm({ title: 'Thông báo', message: 'Vui lòng kiểm tra lại các số Cont<br>' + sError, width: 300, height: 150, icon: 'info' });
        }
    },

    onChangeRow: function (eventArgs) {
        this.set("selectedRow", eventArgs.sender.dataItem(eventArgs.sender.select()));
        //console.log(eventArgs.sender.select());
    },
});
$(document).ready(function () {
    $('#breadcrumb').html('Danh mục <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span> Số Cont');
    kendo.bind($("#wrapperMain"), viewModel);

    ss4.resizeGrid();
});