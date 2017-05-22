//editable: {'confirmation':'Are you sure you want to delete this item?','mode':'inline','createAt':'top'},
// BEGIN HIEN THI THONG BAO 

//function shwNotification() {
//    var notification = $("#notification").data("kendoNotification");
//    notification.show('Thông báo');
//};
// END HIEN THI THONG BAO 

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
                    tblglobaltype_id: { type: "number" },
                    p1: { type: "string", editable: true },
                    p2: { type: "string", editable: true },
                    p3: { type: "string", editable: true },
                    p4: { type: "string", editable: true },
                    p5: { type: "string", editable: true },
                }
            },
            data: "data",
            total: "total"
        },
        batch: true,
        pageSize: 100,
        transport: {
            read: {
                url: "/line/getAll",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                cache: true,
                complete: function (data, status) { }
            },
            create: {
                url: "/line/create",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                complete: function (e) {
                    if (!e.err) {
                        $(".k-pager-refresh").trigger('click');
                        ss4.alert({ title: 'Thông báo', message: 'Thêm dữ liệu thành công!', width: 300, height: 150, icon: 'info', time: 1000 });
                    }
                    else ss4.alert({ title: 'Thông báo', message: e.msg, width: 300, height: 150, icon: 'info', time: 1000 });
                }
            },
            update: {
                url: "/line/update",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                complete: function (e) {
                    if (!e.err) ss4.alert({ title: 'Thông báo', message: 'Cập nhật dữ liệu thành công!', width: 300, height: 150, icon: 'info', time: 1000 });
                    else ss4.alert({ title: 'Thông báo', message: e.msg, width: 300, height: 150, icon: 'info', time: 1000 });
                }
            },
            destroy: {
                url: "/line/destroy",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                complete: function (e) {
                    if (!e.err) ss4.alert({ title: 'Thông báo', message: 'Cập nhật dữ liệu thành công!', width: 300, height: 150, icon: 'info', time: 1000 });
                    else ss4.alert({ title: 'Thông báo', message: e.msg, width: 300, height: 150, icon: 'info', time: 1000 });
                }
            },
            parameterMap: function (options, operation) {
                if (operation !== "read" && options.models) {
                    return kendo.stringify(options);
                }
            }
        }
    }),
    raddcur: null,
    onClick_Add: function () {
        if (this.raddcur != null)
        {
            if (this.raddcur.name == '') {
                $('tr[data-uid=' + this.raddcur.uid + '] td:first-child').click();
                ss4.alert({ title: 'Thông báo', message: 'Vui lòng nhập tên Line và thực hiện lại!!!', width: 300, height: 150, icon: 'info', time: 5000 });
                return false;
            }
        }
        var o = new this.dataSource.reader.model();
        this.raddcur = o;
        this.dataSource.add(o);
        console.log(o);
        $('tr[data-uid=' + o.uid + '] td:first-child').click();
    },

    onClick_Remove: function () {
        if (this.selectedRow != null) {
            ss4.confirm({
                title: 'Confirm', message: 'Bạn có chắc muốn xóa "' + this.selectedRow.name + '"?', width: 300, height: 150, icon: 'info',
                fnCallback: function () {                    
                    viewModel.dataSource.remove(viewModel.selectedRow);
                    viewModel.dataSource.sync();
                }
            });
        } else {
            ss4.alert({ title: 'Thông báo', message: 'Vui lòng chọn một dòng và bấm nút xóa!!!', width: 300, height: 150, icon: 'info', time: 5000 });
        }
        //if (confirm("Are you sure you want to delete this record?")) {
        //    this.dataSource.remove(this.selectedRow);
        //    //this.set("selectedRow", this.products.view()[0]);
        //}
    },

    onClick_Save: function () {        
        this.dataSource.sync();
    },

    onChangeRow: function (eventArgs) {
        this.set("selectedRow", eventArgs.sender.dataItem(eventArgs.sender.select()));
        //console.log(eventArgs.sender.select());
    },
});
$(document).ready(function () {
    $('#breadcrumb').html('Danh mục <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span> Định nghĩa Line');
    kendo.bind($("#wrapperMain"), viewModel);
    
    ss4.resizeGrid();
});