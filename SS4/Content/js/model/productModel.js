function checkboxEditor(container, options) {
    $('<input type="checkbox" ' + (options.model.p2checkbox ? 'checked="checked"' : '') + '  name="' + options.field + '"/>')
        .appendTo(container);
};
function checkboxView(model) {
    try {
        return model.p2 == '0' //model.p2checkbox == false
            ? '<input type="checkbox" disabled readonly>' : '<input type="checkbox" checked="checked" disabled readonly>';
    } catch (e) { return '<input type="checkbox" disabled readonly>'; }
}

function hesoEditor(container, options) {
    $('<input required name="' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
            step: 0.1
        });
};
function hesoView(model) {
    //try {
    if (model.p3numeric != null) model.p3 = model.p3numeric.toString();
        else model.p3numeric = parseFloat(model.p3);
        return model.p3 == null ? '' : model.p3;
    //} catch (e) { return ''; }
}

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
                    p2: { type: "string", editable: true },
                    p3: { type: "string", editable: true },
                    p4: { type: "string", editable: true },
                    p5: { type: "string", editable: true },
                    p2checkbox: { type: "boolean", editable: true, defaultValue: false },
                    p3numeric: { type: "number", editable: true, defaultValue: 0 }
                }
            },
            data: "data",
            total: "total"
        },
        batch: true,
        pageSize: 100,
        transport: {
            read: {
                url: "/product/getAll",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                cache: true,
                complete: function (data, status) { }
            },
            create: {
                url: "/product/create",
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
                url: "/product/update",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                complete: function (e) {
                    if (!e.err) ss4.shwNotification('Cập nhật dữ liệu thành công!', 'info');
                    else ss4.shwNotification(e.msg, 'error');
                }
            },
            destroy: {
                url: "/product/destroy",
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
        for (var i = 0; i < this.dataSource._data.length; i++) {
            this.dataSource._data[i].p2checkbox = this.dataSource._data[i].p2 == '0' ? false : true;
            //this.dataSource._data[i].p3numeric = parseFloat(this.dataSource._data[i].p3);
        }
    },
    raddcur: null,
    onClick_Add: function () {
        if (this.raddcur != null)
        {
            if (this.raddcur.name == '') {
                $('tr[data-uid=' + this.raddcur.uid + '] td:first-child').click();
                ss4.alert({ title: 'Thông báo', message: 'Vui lòng nhập mã sản phẩm và thực hiện lại!!!', width: 300, height: 150, icon: 'info', time: 5000 });
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
        for (var i = 0; i < this.dataSource._data.length; i++)
            this.dataSource._data[i].p2 = (this.dataSource._data[i].p2checkbox == true ? '1' : '0');
        this.dataSource.sync();
    },

    onClick_Import: function(){
        $('#fileUpload').trigger('click');


    },

    onChangeRow: function (eventArgs) {
        this.set("selectedRow", eventArgs.sender.dataItem(eventArgs.sender.select()));
    },
});
$(document).ready(function () {
    $('#breadcrumb').html('Danh mục <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span> Sản phẩm');
    kendo.bind($("#wrapperMain"), viewModel);
    
    ss4.resizeGrid();
});