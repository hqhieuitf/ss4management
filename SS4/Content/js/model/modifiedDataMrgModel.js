//===================================
//helper viewColumn
//===================================
function viewMain_tuichinhsua(model) { return parseInt(model.tuichinhsua).formatMoney(0); }
function viewMain_tuilualai(model) { return parseInt(model.tuilualai).formatMoney(0); }

function viewMasterOrDetailDesc(model) {
    if (model.group == 1)
        return '<strong>'+ model.desc +'</strong>';
    return model.desc;
}
function viewMasterOrDetailCondition(model) {
    if (model.group == 1) return '';
    return model.condition;
}
function viewMasterOrDetailQty(model) {
    if (model.group == 1) return '';
    return model.qty;
}

//===================================
//helper editorColumn
//===================================
function calcSobaodat() {
    var arrDS = $("#grid1").data().kendoGrid.dataSource.view();
    var arrLL = $("#grid2").data().kendoGrid.dataSource.view();
    var SumCS = 0, SumLL = 0;

    for (var i = 0; i < arrDS.length; i++) {
        if (arrDS[i].group != 1 && arrDS[i].qty != 0) {
            SumCS += arrDS[i].qty;
        }
    }

    for (var i = 0; i < arrLL.length; i++) {
        if (arrLL[i].group != 1 && arrLL[i].qty != 0) {
            SumLL += arrLL[i].qty;
        }
    }

    SumCS = (SumCS).formatMoney(0);
    SumLL = (SumLL).formatMoney(0);

    $('#toolChinhsua').html(SumCS == '' ? '&nbsp;' : SumCS);
    $('#toolLualai').html(SumLL == '' ? '&nbsp;' : SumLL);
};
function qtyEditorCS(container, options) {
    if (options.model.group == 1) {
        $('#grid1').data("kendoGrid").closeCell();
    } else {
        $('<input required name="' + options.field + '" />')
            .appendTo(container)
            .kendoNumericTextBox({
                step: 1,
                spinners: false,
                format: 'n0',
                change: calcSobaodat
            });
    }
};
function qtyEditorLL(container, options) {
    if (options.model.group == 1) {
        $('#grid2').data("kendoGrid").closeCell();
    } else {
        $('<input required name="' + options.field + '" />')
            .appendTo(container)
            .kendoNumericTextBox({
                step: 1,
                spinners: false,
                format: 'n0',
                change: calcSobaodat
            });
    }
};
function descEditor(container, options) {
    if (options.model.group == 1) {
        $('#grid1').data("kendoGrid").closeCell();
    } else {
        $('<input class="k-textbox" name="' + options.field + '"/>')
            .appendTo(container);
    }
}

var viewAddModel = kendo.observable({
    isVisible: true,
    frmSaving: false,
    oWin: null,
    masterid: null,
    dataMaster: null,
    dataDetail1: null,
    dataDetail2: null,
    onInit: function (oWin, masterid) {
        var thisObj = this;
        this.masterid = masterid;
        this.dataMaster = null;
        this.dataDetail1 = [];
        this.dataDetail2 = [];
        this.oWin = oWin;
        
        clsApi.request('/modifieddatamrg/SelectDataForm', function (res) {
            thisObj.onInitToolbar();
            thisObj.dataMaster = res.master;
            thisObj.dataDetail1 = res.detail1;
            thisObj.dataDetail2 = res.detail2;
            thisObj.onInitTab();
            thisObj.onInitForm(res.master);

            thisObj.oWin.center().open();
            calcSobaodat();
        }, null, {
            type: 'POST',
            dataType: 'json',
            data: { masterid: (this.masterid == null ? 0 : this.masterid) },
            error_message: 'Có lỗi kết nối, vui lòng kiểm tra',
            waiting_message: 'Vui lòng đợi...',
            bshowwaiting: true
        });
    },
    onChange: function () {
        //console.log("event :: change (" + kendo.htmlEncode(this.get("data.firstname")) + ")");
    },
    onInitForm: function (dataMaster) {
        $("#cbCont").kendoComboBox({
            dataTextField: "name",
            dataValueField: "id",
            dataSource: arrCont,
            filter: "contains",
            suggest: true,
        });
        $("#cbCa").kendoComboBox({
            dataTextField: "name",
            dataValueField: "id",
            dataSource: arrSheet,
            filter: "contains",
            suggest: true,
            //index: 3
        });
        $("#cbProduct").kendoComboBox({
            dataTextField: "name",
            dataValueField: "id",
            dataSource: arrProduct,
            filter: "contains",
            suggest: true,
            //index: 3
        });
        $("#cbLine").kendoComboBox({
            dataTextField: "name",
            dataValueField: "id",
            dataSource: arrLine,
            filter: "contains",
            suggest: true,
            enable: benable == 1//false
            //index: 3
        });
        $("#cbEmployee").kendoComboBox({
            dataTextField: "name",
            dataValueField: "id",
            dataSource: arrEmployee,
            filter: "contains",
            suggest: true,
            enable: benable == 1
            //index: 3
        });        
        $('#txtngaykiem').kendoDatePicker({
            parseFormats: ["dd/MM/yyyy"],
            format: "dd/MM/yyyy",
            value: new Date(),
            min: new Date(1950, 0, 1),
            max: new Date(2049, 11, 31)
        });
        $('#txtsobaokiem').kendoNumericTextBox({ step: 1, spinners: false, format: 'n0', change: calcSobaodat });
        $('#txtsobaodat').kendoNumericTextBox({ step: 1, spinners: false, format: 'n0' });
        $('#txtphelieu').kendoNumericTextBox({ step: 1, spinners: false, format: 'n1' });
        $('#txtlankiem').kendoNumericTextBox({ step: 1, spinners: false, format: 'n0' });
        $('#txtroll').kendoNumericTextBox({ step: 1, spinners: false, format: 'n0' });

        if (dataMaster.length != 0) {
            $('#txtcode').val(dataMaster[0].code);
            $('#txtngaykiem').val(dataMaster[0].scheckdate);

            $('#txtsobaokiem').data("kendoNumericTextBox").value(dataMaster[0].checkbag);
            $('#txtsobaodat').data("kendoNumericTextBox").value(dataMaster[0].goodbag);
            $('#txtphelieu').data("kendoNumericTextBox").value(dataMaster[0].scrap);
            $('#txtlankiem').data("kendoNumericTextBox").value(dataMaster[0].timeno);
            $('#txtroll').data("kendoNumericTextBox").value(dataMaster[0].roll);

            var cb = $('#cbProduct').data("kendoComboBox"); cb.value(dataMaster[0].productid);
            cb.trigger("change");
            var cb = $("#cbCont").data("kendoComboBox"); cb.value(dataMaster[0].contid);
            cb.trigger("change");
            var cb = $("#cbLine").data("kendoComboBox"); cb.value(dataMaster[0].lineid);
            cb.trigger("change");
            var cb = $("#cbEmployee").data("kendoComboBox"); cb.value(dataMaster[0].employeeid);
            cb.trigger("change");
            var cb = $("#cbCa").data("kendoComboBox"); cb.value(dataMaster[0].sheet);
            cb.trigger("change");
        } else {
            clsApi.request('/GenCode/Index', function (res) {
                $('#txtcode').val(res.code);
                var cb = $("#cbLine").data("kendoComboBox"); cb.value(currLineId);
                cb.trigger("change");
                var cb = $("#cbEmployee").data("kendoComboBox"); cb.value(currEmployeeId);
                cb.trigger("change");
            }, null, {
                type: 'POST',
                dataType: 'json',
                data: { sLoai: '01' },
                error_message: 'Có lỗi kết nối, vui lòng kiểm tra',
                waiting_message: 'Vui lòng đợi...',
                bshowwaiting: true
            });
        }
    },
    //tabs
    onInitTab: function (dataGrid) {
        var tabStrip = $("#tabstrip").kendoTabStrip({
            animation: {
                // fade-out current tab over 1000 milliseconds
                close: {
                    duration: 1,
                    effects: "fadeOut"
                },
                // fade-in new tab over 500 milliseconds
                open: {
                    duration: 1,
                    effects: "fadeIn"
                }
            }
        }).data("kendoTabStrip");
        tabStrip.append(
            [
                {
                    text: "<b>TÚI CHỈNH SỬA</b>",
                    encoded: false,
                    content: "<div id='grid1' style='height: 300px;'></div>"
                },
                {
                    text: "<b>TÚI LỰA LẠI</b>",
                    encoded: false,
                    content: "<div id='grid2' style='height: 300px;'></div>"
                }
            ]
        );

        tabStrip.activateTab($('.k-tabstrip-items>.k-item')[0]);

        //1: tui chinh sua, 2: tui lua lai
        var grid1 = $("#grid1").kendoGrid({
            selectable: true,
            allowCopy: false,
            sortable: true,
            reorderable: true,
            groupable: false,
            resizable: true,
            editable: true,
            filterable: ss4.kefilterable(),            
            dataBound: function(e) {
                // get the index of the UnitsInStock cell
                var columns = e.sender.columns;
                var columnIndex_qty = this.wrapper.find(".k-grid-header [data-field=" + "qty" + "]").index();
                var columnIndex_note = this.wrapper.find(".k-grid-header [data-field=" + "note" + "]").index();

                // iterate the table rows and apply custom row and cell styling
                var rows = e.sender.tbody.children();
                for (var j = 0; j < rows.length; j++) {
                    var row = $(rows[j]);
                    var dataItem = e.sender.dataItem(row);
                    var group = dataItem.get("group");

                    //master
                    if (group == 1) {
                        row.addClass("grouperr");
                        //truong hop locked [k-grid-content-locked + k-grid-content]
                        var id = $(row).attr('data-uid');
                        $('div.k-grid-content-locked table.k-selectable tr[data-uid="' + id + '"]').addClass('grouperr');
                    }

                    if (group != 1) {//detail
                        var cell = row.children().eq(columnIndex_qty);
                        cell.addClass("allowinputvalue");

                        cell = row.children().eq(columnIndex_note);
                        cell.addClass("allowinputvalue");
                    }
                }
            },
            columns: [
                { field: "code", title: "Code", width: '80px', editable: false,  },
                { field: "desc", title: "Mô tả lỗi", width: '200px', editable: false, template: viewMasterOrDetailDesc, },
                { field: "condition", title: "Điều kiện", width: '200px', editable: false, template: viewMasterOrDetailCondition },
                { field: "qty", title: "Số lượng", width: '100px', template: viewMasterOrDetailQty, editor: qtyEditorCS },
                { field: "note", title: "Ghi chú", width: '100px', editor: descEditor },
            ],
            dataSource : this.dataDetail1,
            edit: function (e) {
                var indexCell = e.container.context.cellIndex;
                var grid = $('#grid1').data('kendoGrid');
                if (indexCell != 'undefined' && (
                        grid.columns[indexCell].field == "code" ||
                    grid.columns[indexCell].field == "desc" ||
                    grid.columns[indexCell].field == "condition"
                    )) {
                    $('#grid1').data("kendoGrid").closeCell();
                }
            }
        });

        var grid2 = $("#grid2").kendoGrid({
            selectable: true,
            allowCopy: false,
            sortable: true,
            reorderable: true,
            groupable: false,
            resizable: true,
            editable: true,
            filterable: ss4.kefilterable(),
            dataBound: function (e) {
                // get the index of the UnitsInStock cell
                var columns = e.sender.columns;
                var columnIndex_qty = this.wrapper.find(".k-grid-header [data-field=" + "qty" + "]").index();
                var columnIndex_note = this.wrapper.find(".k-grid-header [data-field=" + "note" + "]").index();

                // iterate the table rows and apply custom row and cell styling
                var rows = e.sender.tbody.children();
                for (var j = 0; j < rows.length; j++) {
                    var row = $(rows[j]);
                    var dataItem = e.sender.dataItem(row);
                    var group = dataItem.get("group");

                    //master
                    if (group == 1) {
                        row.addClass("grouperr");
                        //truong hop locked [k-grid-content-locked + k-grid-content]
                        var id = $(row).attr('data-uid');
                        $('div.k-grid-content-locked table.k-selectable tr[data-uid="' + id + '"]').addClass('grouperr');
                    }

                    if (group != 1) {//detail
                        var cell = row.children().eq(columnIndex_qty);
                        cell.addClass("allowinputvalue");

                        cell = row.children().eq(columnIndex_note);
                        cell.addClass("allowinputvalue");
                    }
                }
            },
            columns: [
                { field: "code", title: "Code", width: '80px', editable: false, },
                { field: "desc", title: "Mô tả lỗi", width: '200px', editable: false, template: viewMasterOrDetailDesc, },
                { field: "condition", title: "Điều kiện", width: '200px', editable: false, template: viewMasterOrDetailCondition },
                { field: "qty", title: "Số lượng", width: '100px', template: viewMasterOrDetailQty, editor: qtyEditorLL },
                { field: "note", title: "Ghi chú", width: '100px', editor: descEditor },
            ],
            dataSource: this.dataDetail2,
            edit: function (e) {
                var indexCell = e.container.context.cellIndex;
                var grid = $('#grid2').data('kendoGrid');
                if (indexCell != 'undefined' && (
                        grid.columns[indexCell].field == "code" ||
                    grid.columns[indexCell].field == "desc" ||
                    grid.columns[indexCell].field == "condition"
                    )) {
                    $('#grid2').data("kendoGrid").closeCell();
                }
            }
        });

        tabStrip.one("activate", function () {
            grid1.resize();
        });
    },
    onInitToolbar: function () {
        var thisObj = this;
        $("#toolbarDlg").kendoToolBar({
            items: [
            {
                type: "button",
                id: "button1",
                text: "<div>&nbsp;</div>Lưu và đóng<div>&nbsp;</div>",
                click: function (e) { thisObj.btnSave_Click(); }
            },
            {
                type: "button",
                id: "button2",
                text: "<div>&nbsp;</div>Bỏ qua<div>&nbsp;</div>",
                click: function (e) { thisObj.btnCancel_Click(); }
            },
            { type: "button", id: "button3", text: "<div style='font-weight:bold;color:red;' id='toolChinhsua'>0</div><div id='toolLualai' style='font-weight:bold;color:#13ce13'>0</div>", attributes: { "class": "text-right float-right" }, click: function () { } },
            { type: "button", id: "button4", text: "<div style='font-weight:bold;color:red;'>Túi chỉnh sửa:</div><div style='font-weight:bold;color:#13ce13'>Túi lựa lại:</div>", attributes: { "class": "text-right float-right" }, click: function () { } }
            ],
            click: function (e) { },
            toggle: function (e) { },
            overflowOpen: function (e) { },
            overflowClose: function (e) { },
            open: function (e) { },
            close: function (e) { }
        });
    },
    //button events
    checkValidation: function () {
        var validator = $("#frmData").kendoValidator().data("kendoValidator");
        return validator.validate();
    },
    btnSave_Click: function () {
        var thisObj = this;
        if (this.checkValidation() && !thisObj.frmSaving) {
            var oM = {
                id: this.masterid,
                code: $('#txtcode').val(),
                productid: $('#cbProduct').val(),
                contid: $("#cbCont").val(),
                lineid: $("#cbLine").val(),
                employeeid: $("#cbEmployee").val(),
                scheckdate: $('#txtngaykiem').val(),
                sheet: $('#cbCa').val()
                //checkbag: $('#txtsobaokiem').val(),
                //goodbag: $('#txtsobaodat').val(),
                //scrap: $('#txtphelieu').val(),
                //timeno: $('#txtlankiem').val(),
                //roll: $('#txtroll').val()
            };
            var oD = [], oD2 = [];
            var arrDS = $("#grid1").data().kendoGrid.dataSource.view();
            for (var i = 0; i < arrDS.length; i++) {
                if (arrDS[i].group != 1 && arrDS[i].qty != 0) {
                    oD.push({
                        errcodeid: arrDS[i].errid,
                        qty: arrDS[i].qty,
                        note: arrDS[i].note,
                        masterid: this.masterid
                    });
                }
            }
            var arrLL = $("#grid2").data().kendoGrid.dataSource.view();
            for (var i = 0; i < arrLL.length; i++) {
                if (arrLL[i].group != 1 && arrLL[i].qty != 0) {
                    oD2.push({
                        errcodeid: arrLL[i].errid,
                        qty: arrLL[i].qty,
                        note: arrLL[i].note,
                        masterid: this.masterid
                    });
                }
            }

            if (oD.length == 0) {
                oD.push({
                    errcodeid: 0,
                    qty: 0,
                    note: '',
                    masterid: 0
                });
            }
            if (oD2.length == 0) {
                oD2.push({
                    errcodeid: 0,
                    qty: 0,
                    note: '',
                    masterid: 0
                });
            }
            ss4.loading(true, 'Đang lưu dữ liệu...');
            thisObj.frmSaving = true;
            $.ajax({
                url: "/modifieddatamrg/CreateOrUpdate",
                data: JSON.stringify({ master: oM, detail1: oD, detail2: oD2 }),
                dataType: 'json',
                type: 'Post',
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    ss4.loading(false, 'Đang lưu dữ liệu...');
                    thisObj.frmSaving = false;
                    if (!res.err) {
                        ss4.shwNotification('Đã cập nhật dữ liệu.', 'info');
                        thisObj.oWin.destroy();
                        viewMainModel.onRefresh();
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

//===================================
//MODEL GRIDMAIN
//===================================
var viewMainModel = kendo.observable({
    isVisible: true,
    sTungay: null,
    sDenngay: null,
    selectedRow: null,
    ModelEntity: function () { return kendo.observable({ data: {} }); },

    onDebug: function (e) { },
    dataSource: null,
    onInit: function () {
        var thisObj = this;
        if (thisObj.sTungay == null) {
            //var lastDateofMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
            //thisObj.sTungay = ss4.dateToString(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
            //thisObj.sDenngay = ss4.dateToString(lastDateofMonth);

            var curMonth = new Date().getMonth();
            var lastYear = 0;
            if (curMonth == 1 || curMonth == 2 || curMonth == 3) {
                curMonth = 11;
                lastYear = new Date().getFullYear() - 1;
                thisObj.sTungay = ss4.dateToString(new Date(lastYear, 11, 1));
                thisObj.sDenngay = ss4.dateToString(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));
            } else {
                var lastDateofMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
                thisObj.sTungay = ss4.dateToString(new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1));
                thisObj.sDenngay = ss4.dateToString(lastDateofMonth);
            }
        }
        thisObj.onRefresh();

        //var thisObj = this;
        //clsApi.request('/modifieddatamrg/SelectAll', function (res) {
        //    thisObj.dataSource = res;
        //    kendo.bind($("#wrapperMain"), thisObj);
        //    ss4.resizeGrid();

        //    var width = $('.k-grid-content-locked').css('width');
        //    $('.k-grid-content-locked').attr('style', 'width:' + width);
        //}, null, {
        //    type: 'POST',
        //    dataType: 'json',
        //    data: { masterid: 1 },
        //    error_message: 'Có lỗi kết nối, vui lòng kiểm tra',
        //    waiting_message: 'Vui lòng đợi...',
        //    bshowwaiting: true
        //});
    },
    onRefresh: function () {
        var thisObj = this;
        try {
            if ($('#cbxFromDate').length != 0) {
                thisObj.sTungay = $('#cbxFromDate').val();
                thisObj.sDenngay = $('#cbxToDate').val();
            }
        } catch (e) { }

        clsApi.request('/modifieddatamrg/SelectAllByDateRange', function (res) {
            thisObj.dataSource = res;
            kendo.bind($("#wrapperMain"), thisObj);
            thisObj.onResize();

            var width = $('.k-grid-content-locked').css('width');
            $('.k-grid-content-locked').attr('style', 'width:' + width);

            //set toolbar
            $('.toolbar').html(kendo.template($("#template").html()));
            //init control
            var cbxFromDate = $("#cbxFromDate").kendoDatePicker({
                //value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                parseFormats: ["dd/MM/yyyy"],
                format: "dd/MM/yyyy",
                //change: function () { thisObj.sTungay = $("#cbxFromDate").val(); }
            }).data("kendoDatePicker");
            var cbxToDate = $("#cbxToDate").kendoDatePicker({
                //value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                parseFormats: ["dd/MM/yyyy"],
                format: "dd/MM/yyyy",
                //change: function () { thisObj.sDenngay = $('#cbxToDate').val();  }
            }).data("kendoDatePicker");
            $('#cbxFromDate').val(thisObj.sTungay);
            $('#cbxToDate').val(thisObj.sDenngay);
            $('#btnXem').click(function () {
                thisObj.onRefresh();
            });
        }, null, {
            type: 'POST',
            dataType: 'json',
            data: { tungay: thisObj.sTungay, denngay: thisObj.sDenngay },
            error_message: 'Có lỗi kết nối, vui lòng kiểm tra',
            waiting_message: 'Vui lòng đợi...',
            bshowwaiting: true
        });
    },
    onResize: function () {
        var gridElement = $(".wrapperGrid"),
            dataArea = gridElement.find(".k-grid-content"),
            gridHeight = gridElement.innerHeight(),
            otherElements = gridElement.children().not(".k-grid-content"),
            otherElementsHeight = 0;
        otherElements.each(function () {
            otherElementsHeight += $(this).outerHeight();
        });
        //dataArea.height(gridHeight - otherElementsHeight);
        dataArea.height(ss4.Screen().height - (parseInt($('.navContainer').css('height')) + parseInt($('.header').css('height')) + parseInt($('.subhead-collapse').css('height')) + 152 + 43));
        setTimeout(function () { $("div[data-role='grid']").data("kendoGrid").refresh(); }, 500);
        
    },
    onChangeRow: function (eventArgs) {
        this.set("selectedRow", eventArgs.sender.dataItem(eventArgs.sender.select()));
    },
    onClick_Edit: function () {
        if (this.selectedRow != null) {
            var oWin = $("<div id='popupWindow'></div>")
                .appendTo("body")
                .kendoWindow({
                    width: ss4.Screen().width / 1.2,
                    modal: true,
                    title: "SỬA PHIẾU CHỈNH SỬA TÚI",
                    visible: false,
                    animation: {
                        open: { effects: 'expand:vertical' },
                        close: { effects: 'expand:vertical', reverse: true }
                    },
                    close: function (e) {
                        this.destroy();
                    }
                }).data('kendoWindow').content($('#dlgTemplate').html());
            viewAddModel.onInit(oWin, this.selectedRow.id);
            kendo.bind($("#dlgAdd"), viewAddModel);
        } else ss4.shwNotification('Vui lòng chọn 1 dòng và thực hiện lại', 'error');
    },
    onClick_Add: function () {
        var oWin = $("<div id='popupWindow'></div>")
                        .appendTo("body")
                        .kendoWindow({
                            width: ss4.Screen().width / 1.2,
                            modal: true,
                            title: "THÊM PHIẾU CHỈNH SỬA TÚI",
                            visible: false,
                            animation: {
                                open: { effects: 'expand:vertical' },
                                close: { effects: 'expand:vertical', reverse: true }
                            },
                            close: function (e) {
                                this.destroy();
                            }
                        }).data('kendoWindow').content($('#dlgTemplate').html());
        viewAddModel.onInit(oWin, 0);
        kendo.bind($("#dlgAdd"), viewAddModel);
    },
    onClick_Remove: function () {
        var thisObj = this;
        if (this.selectedRow != null) {
            ss4.confirm({
                title: 'Confirm', message: 'Bạn có chắc muốn xóa phiếu "' + this.selectedRow.code + '"?', width: 300, height: 150, icon: 'info',
                fnCallback: function () {
                    clsApi.request('/modifieddatamrg/delete', function (res) {
                        if (!res.err) {
                            thisObj.onRefresh();
                            ss4.shwNotification('Đã xóa thành công!', 'info');
                        } else ss4.shwNotification(res.msg, 'error');
                    }, null, {
                        type: 'POST',
                        dataType: 'json',
                        data: { masterid: thisObj.selectedRow.id },
                        error_message: 'Có lỗi kết nối, vui lòng kiểm tra',
                        waiting_message: 'Vui lòng đợi...',
                        bshowwaiting: true
                    });
                }
            });
        } else {
            ss4.shwNotification('Vui lòng chọn dòng và thực hiện lại', 'info');
        }
    },
    onClick_View: function () {
        if (this.selectedRow != null) {
            var oWin = $("<div id='popupWindow'></div>")
                .appendTo("body")
                .kendoWindow({
                    width: ss4.Screen().width / 1.2,
                    modal: true,
                    title: "PHIẾU CHỈNH SỬA TÚI",
                    visible: false,
                    animation: {
                        open: { effects: 'expand:vertical' },
                        close: { effects: 'expand:vertical', reverse: true }
                    },
                    close: function (e) {
                        this.destroy();
                    }
                }).data('kendoWindow').content($('#dlgTemplate').html());
            viewAddModel.onInit(oWin, this.selectedRow.id);
            kendo.bind($("#dlgAdd"), viewAddModel);
            $('#toolbarDlg').hide();
        }
    }
});

$(document).ready(function () {
    $('#breadcrumb').html('Nghiệp vụ <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span> Bảng chỉnh sửa túi');

    viewMainModel.onInit();
    kendo.bind($("#wrapperMain"), viewMainModel);
});