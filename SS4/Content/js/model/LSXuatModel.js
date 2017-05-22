function ngaySXEditor(container, options) {
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
function ngaySXView(model) {
    try {
        if (model.p1d != null) model.p1 = ss4.dateToString(model.p1d);
        else model.p1d = ss4.parse_ddMMyyyy(model.p1);
        return model.p1;
    } catch (e) { return ''; }
}

var viewModel = kendo.observable({
    isVisible: true,
    sTungay: null,
    sDenngay: null,
    selectedRow: null,
    ModelEntity: function () { return kendo.observable({ data: {} }); },

    onDebug: function (e) { console.log("event :: save(" + kendo.stringify(e.values, null, 4) + ")"); },
    dataSource: new kendo.data.DataSource({
        schema: {
            model: {
                id: "id",
                fields: {
                    checkall: { type: 'bool', editable: true },

                    name: { type: "string", editable: true },
                    p1d: { type: "date", editable: true },
                    p1: { type: "string", editable: true },
                    p2: { type: "string", editable: true },                    
                }
            },
            data: "data",
            total: "total"
        },
        batch: true,
        pageSize: 100,
        transport: {
            read: {
                //url: "/LSXuat/getAll",
                url: "/LSXuat/getAllByDateRange",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                cache: true,
                complete: function (data, status) { }
            },
            create: {
                url: "/LSXuat/CreateOrUpdate",
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
                url: "/LSXuat/CreateOrUpdate",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                complete: function (e) {
                    if (!e.err) ss4.shwNotification('Cập nhật dữ liệu thành công!', 'info');
                    else ss4.shwNotification(e.msg, 'error');
                }
            },
            destroy: {
                url: "/LSXuat/destroy",
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
                if (operation == "read") {
                    if (viewModel.sTungay == null) {
                        var lastDateofMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
                        options.tungay = ss4.dateToString(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
                        options.denngay = ss4.dateToString(lastDateofMonth);
                    } else {
                        options.tungay = viewModel.sTungay;
                        options.denngay = viewModel.sDenngay;
                    }
                    return kendo.stringify(options);
                }
            }
        }
    }),
    dataBound: function (e) {
        //var grid = e.sender;
        //console.log(grid);
        //var thisObj = this;

        for (var i = 0; i < this.dataSource._data; i++) {
            this.dataSource._data[i].p1d = ss4.parse_ddMMyyyy(this.dataSource._data[i].p1);
        }

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
        $('#cbxFromDate').val(viewModel.sTungay);
        $('#cbxToDate').val(viewModel.sDenngay);
        $('#btnXem').click(function () {
            viewModel.onRefresh();
        });
    },
    detailInit: function (e) {
        //var grid = e.sender;
        //console.log(grid);
    },
    raddcur: null,
    InitToolbar: function () {
        var thisObj = this;
        if (thisObj.sTungay == null) {
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
    },
    onRefresh: function () {
        var thisObj = this;
        try {
            if ($('#cbxFromDate').length != 0) {
                viewModel.sTungay = $('#cbxFromDate').val();
                viewModel.sDenngay = $('#cbxToDate').val();
                viewModel.dataSource.read();
            }
        } catch (e) { }
    },
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
        //check exists key??
        var arrData = viewModel.dataSource._data;
        var arrCodeExist = [];
        for (var i = 0; i < arrData.length; i++) {
            var iExist = 0;
            if (arrData[i].name == '') {
                ss4.confirm({ title: 'Thông báo', message: 'Mã lệnh sản xuất không thể là rỗng!!', width: 300, height: 150, icon: 'info' });
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
                if (sError == '') sError ='<strong>Dòng '+ (i+1).toString() + ': ' + arrCodeExist[i] + '</strong><br>';
                else sError += ',' + '<strong>Dòng ' + (i + 1).toString() + ': ' + arrCodeExist[i] + '</strong><br>';
            }

            ss4.confirm({ title: 'Thông báo', message: 'Vui lòng kiểm tra lại các lệnh sản xuất sau<br>' + sError, width: 300, height: 150, icon: 'info' });
        }
    },
    onChangeRow: function (eventArgs) {
        this.set("selectedRow", eventArgs.sender.dataItem(eventArgs.sender.select()));
    },
});
$(document).ready(function () {
    $('#breadcrumb').html('Danh mục <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span> Lệnh SX/Cont');
    viewModel.InitToolbar();
    kendo.bind($("#wrapperMain"), viewModel);
    
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
});