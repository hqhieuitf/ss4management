//editable: {'confirmation':'Are you sure you want to delete this item?','mode':'inline','createAt':'top'},
// BEGIN HIEN THI THONG BAO 
//$("#notification").kendoNotification({
//    width: "100%",
//    position: {
//        top: 0,
//        left: 0
//    }
//});
//function shwNotification() {
//    var notification = $("#notification").data("kendoNotification");
//    notification.show('Thông báo');
//};
// END HIEN THI THONG BAO 

var viewModel = kendo.observable({
    isVisible: true,
    selectedRow: null,
    HasChanges: false,

    onSaveDS: function (e) {
        //kendoConsole.log("event :: save(" + kendo.stringify(e.values, null, 4) + ")");
    },
    products: new kendo.data.DataSource({
        schema: {
            model: {
                id: "ProductID",
                fields: {
                    ProductName: { type: "string", editable: true },
                    UnitPrice: { type: "number" }
                }
            }
        },
        batch: true,
        transport: {
            read: {
                url: "//demos.telerik.com/kendo-ui/service/products",
                dataType: "jsonp"
            },
            update: {
                url: "//demos.telerik.com/kendo-ui/service/products/update",
                dataType: "jsonp"
            },
            create: {
                url: "//demos.telerik.com/kendo-ui/service/products/create",
                dataType: "jsonp"
            },
            parameterMap: function (options, operation) {
                if (operation !== "read" && options.models) {
                    return { models: kendo.stringify(options.models) };
                }
            }
        }
    }),

    onClick_Add: function () {
        //if (this.SelectedMedication == null) {
        //this.products.add({ MedicationId: this.get("MedicationId"), Name: this.get("Name") });
        //}            

        var o = new this.products.reader.model();
        this.products.add(o);
        console.log(o);
        $('tr[data-uid=' + o.uid + '] td:first-child').click();
    },

    onClick_Remove: function () {
        if (confirm("Are you sure you want to delete this record?")) {
            this.products.remove(this.selectedRow);
            //this.set("selectedRow", this.products.view()[0]);
        }
    },

    onClick_Save: function () {
        this.products.sync();
    },

    onChangeRow: function (eventArgs) {
        this.set("selectedRow", eventArgs.sender.dataItem(eventArgs.sender.select()));
        console.log(eventArgs.sender.select());
    },
});
$(document).ready(function () {
    kendo.bind($("#example"), viewModel);
    ss4.resizeGrid();
});