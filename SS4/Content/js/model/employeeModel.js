function checkboxEditor(container, options) {
    $('<input type="checkbox" ' + (options.model.p2checkbox ? 'checked="checked"' : '') + '  name="' + options.field + '"/>')
        .appendTo(container);
};
function checkboxView(model) {
    try {
        return model.isactive == false ? '<input type="checkbox" disabled readonly>' : '<input type="checkbox" checked="checked" disabled readonly>';
    } catch (e) { return '<input type="checkbox" disabled readonly>'; }
}

function birthdayEditor(container, options) {
    $('<input required name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDatePicker({
            parseFormats: ["dd/MM/yyyy"],
            format: "dd/MM/yyyy",
            value: new Date(),
            min: new Date(1950, 0, 1),
            max: new Date(2049, 11, 31)
        });
};
function birthdayView(model) {
    try {
        if (model.birthday != null) model.sbirthday = ss4.dateToString(model.birthday);
        else model.birthday = ss4.parse_ddMMyyyy(model.sbirthday);
        return model.sbirthday;
    } catch (e) { return ''; }
}

function DeptEditor(container, options) {
    var o = $('<input required name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            autoBind: false,
            dataTextField: "name",
            dataValueField: "id",
            dataSource: {
                data: arrDept
            },
        });
    $(o).data('kendoDropDownList').value(options.model.tbldeptid);
};
function DeptView(model) {
    for (var i = 0; i < arrDept.length; i++) {
        if (model.tbldeptid == arrDept[i].id)
            return arrDept[i].name;
    }
    return '';
};

function LineEditor(container, options) {
    var o = $('<input required name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            autoBind: false,
            dataTextField: "name",
            dataValueField: "id",
            dataSource: {
                data: arrLine
            },
        });
    $(o).data('kendoDropDownList').value(options.model.tbllineid);
};
function LineView(model) {
    for (var i = 0; i < arrLine.length; i++) {
        if (model.tbllineid == arrLine[i].id)
            return arrLine[i].name;
    }
    return '';
};

//new
var viewAddModel = kendo.observable({
    isVisible: true,
    oWin: null,
    item: null,
    onInit: function (oWin, objItem) {
        var thisObj = this;
        this.item = objItem;        
        this.oWin = oWin;
        thisObj.oWin.center().open();
        $("#toolbarDlg").kendoToolBar({
            items: [
            {
                type: "button",
                id: "button1",
                text: "Lưu và đóng",
                click: function (e) { thisObj.btnSave_Click(); }
            },
            {
                type: "button",
                id: "button2",
                text: "Bỏ qua",
                click: function (e) { thisObj.btnCancel_Click(); }
            }
            ],
            click: function (e) { },
            toggle: function (e) { },
            overflowOpen: function (e) { },
            overflowClose: function (e) { },
            open: function (e) { },
            close: function (e) { }
        });
        $('#txtngaynghi').kendoDatePicker({
            parseFormats: ["dd/MM/yyyy"],
            format: "dd/MM/yyyy",
            value: new Date(),
            min: new Date(1950, 0, 1),
            max: new Date(2049, 11, 31)
        });
        $('#txtID_Add').val(objItem.id);
        if (objItem.isnghi) {
            $('#txtngaynghi').val(objItem.sngaynghi);
            $('#txtlydonghi').val(objItem.lydonghi);
            $('#chbNghi').prop('checked', true);
        } else {
            $('#txtngaynghi').val('');
            $('#txtlydonghi').val('');
            $('#chbNghi').prop('checked', false);
        }
    },    
    checkValidation: function () {
        var validator = $("#frmData").kendoValidator().data("kendoValidator");
        return validator.validate();
    },
    btnSave_Click: function () {
        var thisObj = this;
        if (this.checkValidation()) {
            var oM = {
                id: thisObj.item.id,
                sngaynghi: $('#txtngaynghi').val(),
                lydonghi: $('#txtlydonghi').val(),
                isnghi: $('#chbNghi').prop('checked')
            };
            $.ajax({
                url: "/employee/UpdateNgaynghi",
                data: JSON.stringify({ master: oM }),
                dataType: 'json',
                type: 'Post',
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    if (!res.err) {
                        ss4.shwNotification('Đã cập nhật dữ liệu.', 'info');
                        thisObj.oWin.destroy();
                        viewModel.onRefresh();
                    } else {
                        ss4.shwNotification(res.msg, 'error');
                    }
                },
                error: function () { }
            });
        }
    },
    btnCancel_Click: function () {
        this.oWin.destroy();
    }
});
//end new


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
                    code: { type: "string", editable: true },
                    tbldeptid: { type: "number", editable: true },
                    tbllineid: { type: "number", editable: true },
                    fullname: { type: "string", editable: true },
                    emaillogin: { type: "string", editable: true },
                    mobile: { type: "string", editable: true },
                    sbirthday: { type: "string", editable: true },
                    birthday: { type: "date", editable: true },
                    isactive: { type: "boolean", editable: true },
                    isnghi: { type: "boolean", editable: true },
                    ngaynghi: { type: "string", editable: true },
                    lydonghi: { type: "string", editable: true }
                }
            },
            data: "data",
            total: "total"
        },
        batch: true,
        pageSize: 100,
        transport: {
            read: {
                url: "/employee/getAll",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                cache: true,
                complete: function (data, status) { }
            },
            create: {
                url: "/employee/CreateOrUpdate",
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
                url: "/employee/CreateOrUpdate",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                complete: function (e) {
                    if (!e.err) ss4.shwNotification('Cập nhật dữ liệu thành công!', 'info');
                    else ss4.shwNotification(e.msg, 'error');
                }
            },
            destroy: {
                url: "/employee/destroy",
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
        for (var i = 0; i < this.dataSource._data.length; i++) {
            this.dataSource._data[i].birthday = ss4.parse_ddMMyyyy(this.dataSource._data[i].sbirthday);
            if (this.dataSource._data[i].isnghi)
                $('tr[data-uid=' + this.dataSource._data[i].uid + ']').addClass("isnghi");
        }
    },
    detailInit: function (e) {
        var grid = e.sender;
        console.log(grid);
    },
    raddcur: null,
    onClick_Add: function () {
        if (this.raddcur != null) {
            if (this.raddcur.name == '') {
                $('tr[data-uid=' + this.raddcur.uid + '] td:first-child').click();
                ss4.alert({ title: 'Thông báo', message: 'Vui lòng nhập tên mã lệnh và thực hiện lại!!!', width: 300, height: 150, icon: 'info', time: 5000 });
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
        this.dataSource.sync();
    },
    onClick_Ngaynghi: function(){
        var oWin = $("<div id='popupWindow'></div>")
                    .appendTo("body")
                    .kendoWindow({
                        width: 500,
                        height: 250,
                        modal: true,
                        title: "CẬP NHẬT NGÀY NGHỈ CỦA NHÂN VIÊN",
                        visible: false,
                        animation: {
                            open: { effects: 'expand:vertical' },
                            close: { effects: 'expand:vertical', reverse: true }
                        },
                        close: function (e) {
                            this.destroy();
                        }
                    }).data('kendoWindow').content($('#dlgTemplate').html());
        viewAddModel.onInit(oWin, this.selectedRow);
        kendo.bind($("#dlgTemplate"), viewAddModel);
    },

    onChangeRow: function (eventArgs) {
        this.set("selectedRow", eventArgs.sender.dataItem(eventArgs.sender.select()));
        //console.log(eventArgs.sender.select());
    },

    onRefresh: function () {
        $('.k-pager-refresh').click();
    }
});
$(document).ready(function () {
    $('#breadcrumb').html('Thông tin <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span> Nhân viên');
    kendo.bind($("#wrapperMain"), viewModel);

    ss4.resizeGrid();
});