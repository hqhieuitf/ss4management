var viewModel = kendo.observable({
    isVisible: true,
    selectedRow: null,
    bEditing: false,
    newId: 0,
    actGrid: false,
    ModelEntity: function () { return kendo.observable({ data: {} }); },

    onDebug: function (e) { console.log("event :: save(" + kendo.stringify(e.values, null, 4) + ")"); },
    dataSource: new kendo.data.TreeListDataSource({
        schema: {
            model: {
                id: "id",
                parentId: "parentid",
                fields: {
                    id: { type: "number" },
                    tblglobaltype_id: { type: "number" },
                    parentid: { type: "number" },
                    name: { type: "string" },
                    p1: { type: "string" },
                    p2: { type: "string" },
                    p3: { type: "string" },
                    p4: { type: "string" },
                    p5: { type: "string" },
                }
            },
            data: "data",
            total: "total"
        },
        batch: true,
        transport: {
            read: {
                url: "/errgroup/getAll",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                cache: true,
                complete: function (data, status) {
                    ss4.loading(false, 'Vui lòng đợi');
                    viewModel.modelC = null;
                    viewModel.actGrid = false;
                }
            },
        }
    }),
    onDataBound: function (e) {
        var treeList = this.getTreeList();
        for (var i = 0; i < this.dataSource._data.length; i++) {
            var row = treeList.content.find("tr[data-uid=" + this.dataSource._data[i].uid + "]");
            treeList.expand(row);
        }
    },
    getTreeList: function () {
        return $("div[data-role='treelist']").data("kendoTreeList");
    },
    raddcur: null,
    onClick_Reload: function () { ss4.loading(true, 'Vui lòng đợi'); this.dataSource.read(); this.raddcur = null, this.selectedRow = null; this.bEditing = false; },
    onClick_AddGroup: function () {
        if (this.raddcur != null) {
            if (this.raddcur.name == '') {
                ss4.alert({ title: 'Thông báo', message: 'Vui lòng nhập mã code và thực hiện lại!!!', width: 300, height: 150, icon: 'info', time: 5000 });
                return false;
            }
        }
        if (this.bEditing) {
            var editRow = $("tr.k-grid-edit-row");
            var model = this.getTreeList().dataItem(editRow);
            if (model['id'] == 0) {
                this.newId--;
                model['id'] = this.newId;
            }

            if (model['id'] < 0)  //then it's not saved and has to be added to datasource
                this.getTreeList().dataSource.add(model);
            this.getTreeList().saveRow();
            this.bEditing = false;
        }

        var o = new this.dataSource.reader.model();
        o.id = 0;
        o.parentid = 0;
        o.dirty1 = true;
        this.raddcur = o;
        this.modelC = o;
        this.dataSource.pushCreate(o);
        this.actGrid = true;
        //this.dataSource.add(o);
        this.getTreeList().editRow($('tr[data-uid=' + o.uid + ']'));
        this.bEditing = true;
    },
    onClick_AddChild: function () {
        if (this.selectedRow != null) {
            if (this.raddcur != null) {
                if (this.raddcur.name == '') {
                    ss4.alert({ title: 'Thông báo', message: 'Vui lòng nhập mã code và thực hiện lại!!!', width: 300, height: 150, icon: 'info', time: 5000 });
                    return false;
                }
            }
            if (this.bEditing) {
                var editRow = $("tr.k-grid-edit-row");
                var model = this.getTreeList().dataItem(editRow);
                if (model['id'] == 0) {
                    this.newId--;
                    model['id'] = this.newId;
                }

                if (model['id'] < 0)  //then it's not saved and has to be added to datasource
                    this.getTreeList().dataSource.add(model);
                this.getTreeList().saveRow();
                this.bEditing = false;
            }

            var o = new this.dataSource.reader.model();
            o.id = 0;
            o.parentId = o.parentid = this.selectedRow.id;
            o.dirty1 = true;
            this.raddcur = o;
            this.dataSource.pushCreate(o);
            this.actGrid = true;
            //this.dataSource.add(o);
            this.getTreeList().editRow($('tr[data-uid=' + o.uid + ']'));
            this.getTreeList().expand($('tr[data-uid=' + this.selectedRow.uid + ']'));
            this.bEditing = true;
        } else { ss4.alert({ title: 'Thông báo', message: 'Vui lòng chọn 1 dòng dữ liệu và thực hiện lại!', width: 300, height: 150, icon: 'info', time: 5000 }); }
    },

    onClick_Remove: function () {
        var thisObj = this;
        if (this.selectedRow != null) {
            ss4.confirm({
                title: 'Confirm', message: 'Bạn có chắc muốn xóa "' + this.selectedRow.name + '"?', width: 300, height: 150, icon: 'info',
                fnCallback: function () {
                    thisObj.dataSource.remove(thisObj.selectedRow);
                    var params = JSON.stringify({ models: [thisObj.selectedRow] });
                    $.ajax({
                        type: "POST",
                        url: "/errgroup/Destroy",
                        data: params,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (e) {
                            if (!e.err) {
                                thisObj.dataSource.read();
                                //ss4.alert({ title: 'Thông báo', message: 'Cập nhật dữ liệu thành công!', width: 300, height: 150, icon: 'info', time: 1000 });
                            }
                            else ss4.alert({ title: 'Thông báo', message: e.msg, width: 300, height: 150, icon: 'info', time: 1000 });
                        }
                    });
                }
            });
        } else {
            ss4.alert({ title: 'Thông báo', message: 'Vui lòng chọn một dòng và bấm nút xóa!!!', width: 300, height: 150, icon: 'info', time: 5000 });
        }
    },

    onClick_Save: function () {
        var thisObj = this;
        
        if (this.actGrid == false) {
            //focus other row.
            var arrRows = $("div[data-role='treelist']").data("kendoTreeList").dataSource.data();
            for (var i = 0; i < arrRows.length; i++) {
                if (arrRows[i].uid != thisObj.modelC.uid) {
                    $('tr[data-uid=' + arrRows[i].uid + ']').click();
                    break;
                }
            }
        }

        //console.log(this.dataSource._data);
        //return false;

        //var params = JSON.stringify({ models: this.dataSource._data });
        var para = [];
        for (var i = 0; i < this.dataSource._data.length; i++) {
            if (this.dataSource._data[i].dirty1) {
                para.push({
                    id: this.dataSource._data[i].id,
                    tblglobaltype_id: this.dataSource._data[i].tblglobaltype_id,
                    parentid: this.dataSource._data[i].parentid,
                    name: this.dataSource._data[i].name,
                    p1: this.dataSource._data[i].p1,
                    p2: this.dataSource._data[i].p2,
                    p3: this.dataSource._data[i].p3,
                    p4: this.dataSource._data[i].p4,
                    p5: this.dataSource._data[i].p5,
                });
            }
        }
        if (para.length != 0) {
            var params = JSON.stringify({ models: para });
            $.ajax({
                type: "POST",
                url: "/errgroup/CreateOrUpdate",
                data: params,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (e) {
                    if (!e.err) {
                        thisObj.dataSource.read();
                        thisObj.bEditing = false;
                        ss4.shwNotification('Bạn đã cập nhật thành công!', 'info');
                    }
                    else ss4.shwNotification(e.message, 'error');
                }
            });
        }        
    },
    modelC: null,
    onChangeRow: function (e) {
        if (this.modelC != null) {
            this.modelC.name = $('input[name=name]').val();
            this.modelC.p1 = $('input[name=p1]').val();
            this.modelC.p2 = $('input[name=p2]').val();
            this.modelC.p3 = $('input[name=p3]').val();
            this.modelC.dirty1 = true;
            e.sender.dataSource.pushUpdate(this.modelC);
        }

        var widget = e.sender;
        var dataItem = widget.dataItem(widget.select());
        //console.log("event :: change(" + kendo.stringify(dataItem, null, 4) + ")");

        this.set("selectedRow", dataItem);
        this.getTreeList().editRow($('tr[data-uid=' + this.selectedRow.uid + ']'));        
    },
    onEdit: function (e) {
        //console.log('onEdit');
        this.modelC = e.model;
    },
    onSave: function (e) {        
        //console.log("save");
    }
});

//var oTreeGrid = null;
$(document).ready(function () {
    $('#breadcrumb').html('Danh mục <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span> Nhóm lỗi + lỗi sản phẩm');
    kendo.bind($("#wrapperMain"), viewModel);


    //oTreeGrid = $("div[data-role='treelist']").data("kendoTreeList");
    ss4.resizeGrid();
});