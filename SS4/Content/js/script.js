var ss4 = ss4 || { 'settings': {}, 'behaviors': {}, 'locale': {}, 'easyui': {} };
Number.prototype.formatMoney = function (c, d, t) {
    if (this == undefined || this == '')
        return '';

    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
	return n;
    //return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
Number.prototype.formatMoney1 = function (c, d, t) {
    if (this == undefined || this == '')
        return '';

    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

(function ($) {
    var IGNORE_ERROR = 'ignore_error';
    //Helper methods
    ss4.isArray = function (ob) { return ob.constructor === Array; };
    ss4.getParam = function (obj, default_value) {
        if (typeof obj === 'undefined' || obj == null || obj == 'null') {
            if (typeof default_value === 'undefined')
                return null;
            return default_value;
        }
        return obj;
    };
    ss4.getFileExtension = function (filename) {
        var ext = /^.+\.([^.]+)$/.exec(filename);
        return ext == null ? "" : ext[1];
    };
    ss4.getSizeUpload = function (elID) {
        var size = document.getElementById(elID).files[0].size;
        if (size < 1024) return "<br>(<strong> " + size.toString() + "B</strong> )";
        else if (size < 1024 * 1024) return "<br>(<strong> " + parseInt((size / 1024)).toString() + "KB</strong> )";
        else if (size < 1024 * 1024 * 1024) return "<br>(<strong> " + parseInt((size / 1024 / 1024)).toString() + "MB</strong> )";
        else return "<br>(<strong> " + parseInt((size / 1024 / 1024 / 1024).toString()) + "GB</strong> )";
    };
    ss4.removeSpaceAll = function (s) { return s.replace(/ /g, ''); };
    ss4.getFileExtension = function (filename) {
        var ext = /^.+\.([^.]+)$/.exec(filename);
        return ext == null ? "" : ext[1];
    };
    ss4.getSizeUpload = function (elID) {
        var size = document.getElementById(elID).files[0].size;
        if (size < 1024) return "<br>(<strong> " + size.toString() + "B</strong> )";
        else if (size < 1024 * 1024) return "<br>(<strong> " + parseInt((size / 1024)).toString() + "KB</strong> )";
        else if (size < 1024 * 1024 * 1024) return "<br>(<strong> " + parseInt((size / 1024 / 1024)).toString() + "MB</strong> )";
        else return "<br>(<strong> " + parseInt((size / 1024 / 1024 / 1024).toString()) + "GB</strong> )";
    };

    //Date
    ss4.isSunday = function (yourDateObject) {
        var day = yourDateObject.getDay();
        //var isWeekend = (day == 6) || (day == 0); // 6 = Saturday, 0 = Sunday
        return day == 0;
    };
    ss4.dateToString = function (date, strType) {
        if (date == null) return null;
        var day = date.getDate();
        day = day < 10 ? "0" + day : day;
        var month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        var year = date.getFullYear();
        if (strType == "ddmmyyyy")
            return day.toString() + month.toString() + year.toString();
        if (strType == "mmyyyy")
            return month.toString() + year.toString();
        if (strType == "mm/yyyy")
            return month.toString() + "/" + year.toString();
        if (strType == "yyyymm")
            return year.toString() + month.toString();
        if (strType == "yyyymmdd")
            return year.toString() + month.toString() + day.toString();
        if (strType == "mm/dd/yyyy")
            return month.toString() + "/" + day.toString() + "/" + year.toString();
        return day.toString() + "/" + month.toString() + "/" + year.toString();
    };
    ss4.format_ddMMyyyy = function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y;
    };
    ss4.format_ddMMyy = function (date) {
        var y = date.getFullYear().toString().substring(2);
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y;
    };
    ss4.parse_ddMMyyyy = function (s) {
        if (!s) return new Date();
        var ss = (s.split('/'));
        var d = parseInt(ss[0], 10);
        var m = parseInt(ss[1], 10);
        var y = parseInt(ss[2], 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            return new Date(y, m - 1, d);
        } else {
            return new Date();
        }
    };
    ss4.JsonDateToddMMyyyy = function (value) {
        /*'Date(1231321313)'--> 18/03/2014*/
        if (value != null) {
            var tmp = value.substring(6, value.length - 2);
            var dt = new Date(eval(tmp));
            var y = dt.getFullYear();
            var m = dt.getMonth() + 1;
            var d = dt.getDate();
            return (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y;
        }
        return null;
    };

    //Array
    //var a = ['a', 1, 'a', 2, '1'];
    //var unique = a.filter(onlyUnique); // returns ['a', 1, 2, '1']
    ss4.onlyUnique = function (value, index, self) { return self.indexOf(value) === index; };
    ss4.distinctInArray = function (arrInput) { return arrInput.filter(ss4.onlyUnique); };
    ss4.getObjToFieldArray = function (obj) {
        var arr = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                arr.push({ field: p });
            }
        }
        return arr;
    };
    //Ulties
    ss4.Screen = function () { return { width: $(window).width(), height: $(window).height() }; };
    ss4.resizeGrid = function () {
        var gridElement = $(".wrapperGrid"),
            dataArea = gridElement.find(".k-grid-content"),
            gridHeight = gridElement.innerHeight(),
            otherElements = gridElement.children().not(".k-grid-content"),
            otherElementsHeight = 0;
        otherElements.each(function () {
            otherElementsHeight += $(this).outerHeight();
        });
        //dataArea.height(gridHeight - otherElementsHeight);
        dataArea.height(ss4.Screen().height - (parseInt($('.navContainer').css('height')) + parseInt($('.header').css('height')) + parseInt($('.subhead-collapse').css('height')) + 152));
    };
    ss4.getRandom = function (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };
    ss4.htmlspecialchars = function (str) {
        if (typeof (str) == "string") {
            str = str.replace(/&/g, "&amp;"); /* must do &amp; first */
            str = str.replace(/"/g, "&quot;");
            str = str.replace(/'/g, "&#039;");
            str = str.replace(/</g, "&lt;");
            str = str.replace(/>/g, "&gt;");
        }
        return str;
    };
    ss4.rhtmlspecialchars = function (str) {
        if (typeof (str) == "string") {
            str = str.replace(/&gt;/ig, ">");
            str = str.replace(/&lt;/ig, "<");
            str = str.replace(/&#039;/g, "'");
            str = str.replace(/&quot;/ig, '"');
            str = str.replace(/&amp;/ig, '&'); /* must do &amp; last */
        }
        return str;
    };

    ss4.loading = function (bshow, msg) {
        bshow = bshow || false;
        msg = msg || 'Vui lòng đợi.....';
        if ($('.loadingAjax').length != 0) $('.loadingAjax').remove();
        $('<center class="loadingAjax" />').css({ 'position': 'fixed', 'width': '100%', 'top': '40%', 'z-index': '99999999', 'display': 'none' }).append('<div style="width: 25%;position:relative;"><h2 style="background-color: #ffffff;border-radius: 10px;box-shadow: 1px 1px 39px #9e9ece;color: #101010;font-size: 15px;padding: 20px 20px 20px 39px;font-family:Tahoma;">' + msg + '</h2><img src="/Content/images/loading-image.gif" style="width: 32px;height: 32px;position: absolute;top: 12px;left: 5px;"/></div>').appendTo(document.body);
        if (bshow) $('.loadingAjax').show();
        else $('.loadingAjax').hide();
    };
    //"info", "success", "warning" and "error"
    ss4.shwNotification = function (message, msgType) {
        if ($("#notification").length == 0)
            $('<span id="notification"></span>').appendTo('body');
        var notificationWidget = $("#notification").kendoNotification().data("kendoNotification");
        switch (msgType) {
            case 'info': notificationWidget.show(message, "info"); break;
            case 'success': notificationWidget.show(message, "success"); break;
            case 'warning': notificationWidget.show(message, "warning"); break;
            case 'error': notificationWidget.show(message, "error"); break;
            default: notificationWidget.show(message, "info"); break;
        }
    };
    ss4.alert = function (newoptions) {
        var options = { title: 'Thông báo', message: 'Thông báo tới người dùng', width: 300, height: 150, icon: 'info', time: null };
        options = jQuery.extend({}, options, newoptions);

        if ($('#dlgAlert').length != 0) {
            var dialog = $("#dlgAlert").data("kendoWindow");
            dialog.destroy();
            $('#dlgAlert').remove();
        }
        $('<div id="dlgAlert"></div>').appendTo(document.body);
        $("#dlgAlert").kendoWindow({
            actions: ["Minimize", "Close"],
            width: options.width,
            height: options.height,
            resizable: false,
            modal: true,
            close: function (e) { }
        });
        var dialog = $("#dlgAlert").data("kendoWindow");
        dialog.title(options.title);
        dialog.content(options.message);
        dialog.center();

        if (options.time != null) {
            setTimeout(function () { dialog.close(); }, options.time);
        }
    };
    ss4.confirm = function (newoptions) {
        var options = { title: 'Thông báo', message: 'Are you sure?', width: 300, height: 150, icon: 'info', fnCallback: null, resizable: false };
        options = jQuery.extend({}, options, newoptions);

        var kendoWindow = $("<div />").kendoWindow({
            title: options.title,
            resizable: options.resizable,
            modal: true
        });
        //kendoWindow.data("kendoWindow").content($("#delete-confirmation").html()).center().open();
        kendoWindow.data("kendoWindow").content('<p class="delete-message">' + options.message + '</p><br/><button class="delete-confirm k-button" style="margin-right:10px;">Đồng ý</button><button class="delete-cancel k-button">Bỏ qua</button>').center().open();
        kendoWindow.find(".delete-confirm,.delete-cancel")
        .click(function () {
            if ($(this).hasClass("delete-confirm")) {
                if (options.fnCallback != null)
                    options.fnCallback();
            }

            kendoWindow.data("kendoWindow").close();
        }).end();
    };
    ss4.RowMix = function (eleSelect) {
        //ss4.RowMix('.Content tbody tr td[field="tenmenu"]');
        var tenSp = $($(eleSelect + ":first-child").get(0)).find('div').text();
        var count = 0;
        var ele = $($(eleSelect + ":first-child").get(0));
        $(eleSelect).each(function () {
            if ($(this).find('div').text() != tenSp && $(this).find('div').text() != "") {
                ele.attr("rowspan", count);
                //ele.html('vertical-align', 'middle !important');
                count = 1;
                tenSp = $(this).find('div').text();
                ele = $(this);
            } else if ($(this).find('div').text() == tenSp && $(this).find('div').text() != "") {
                count++;
                if (count > 1) $(this).remove();
            }
        });
        ele.attr("rowspan", count);
        //ele.css('vertical-align', 'middle !important');
    };

    //kendo
    ss4.kepageable = function () {
        return {
            refresh: true,
            pageSizes: true,
            messages: {
                display: "{0}-{1}/{2}",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "của {0}",
                itemsPerPage: "",
                first: "Trang đầu",
                previous: "Trang trước",
                next: "Trang kế",
                last: "Trang cuối",
                refresh: "Làm mới"
            }
        }
    };
    ss4.kefilterable = function () {
        return {
            extra: false,
            messages: {
                info: "Hiển thị dữ liệu:", // sets the text on top of the filter menu
                filter: "Lọc", // sets the text for the "Filter" button
                clear: "Bỏ lọc", // sets the text for the "Clear" button

                // when filtering boolean numbers
                isTrue: "True", // sets the text for "isTrue" radio button
                isFalse: "False", // sets the text for "isFalse" radio button

                //changes the text of the "And" and "Or" of the filter menu
                and: "Và",
                or: "Hoặc"
            },
            operators: {
                string: {
                    contains: "Lọc gần đúng",
                    //startswith: "Lọc gần đúng",
                    eq: "Lọc chính xác",
                    neq: "Tất cả trừ"
                },
                number: {
                    eq: "Bằng",
                    neq: "Khác",
                    gte: "Lớn hơn bằng",
                    gt: "Lớn hơn",
                    lte: "Nhỏ hơn bằng",
                    lt: "Nhỏ hơn"
                },
                date: {
                    eq: "Tìm chính xác",
                    neq: "Khác ngày",
                    gte: "Lớn hơn bằng",
                    gt: "Lớn hơn",
                    lte: "Nhỏ hơn bằng",
                    lt: "Nhỏ hơn"
                }
            }
        }
    };

    ss4.clsApi = function (param) {
        var thisObj = this;

        this.request = function (url, onCompleteFn, onErrorFn, data_options, retry_count) {
            if (url == '') {
                onCompleteFn(data_options.result);
                return;
            }
            if (!ss4.getParam(data_options)) {
                data_options = {
                    type: 'POST',
                    dataType: 'json',
                    timeout: 10000,
                    auto_disable: true, // Tự động disable page khi load ajax
                    auto_enable: true, // Tự động enable page sau khi load ajax xong
                    data: {},
                    error_message: 'Lỗi kết nối',
                    waiting_message: 'Vui lòng đợi',
                    bshowwaiting: true
                }
            } else {
                if (!ss4.getParam(data_options.data))
                    data_options.data = {};
                //if (!ss4.getParam(data_options.bshowwaiting))
                if (data_options.bshowwaiting == undefined)
                    data_options.bshowwaiting = true;
            }

            // add version to url
            retry_count = ss4.getParam(retry_count, 1);
            //get userAgent
            //data_options.data.userAgent = navigator.userAgent;
            // add timestamp in dataoptions
            data_options.data.ss4id = ss4.getRandom(10, 999999999);

            if (data_options.bshowwaiting)
                ss4.loading(true, ss4.getParam(data_options.waiting_message, 'Vui lòng đợi...'));
            is_ajax = true;
            $.ajax({
                cache: false,
                //async: ss4.getParam(data_options.async, true),
                type: ss4.getParam(data_options.type, 'POST'),
                url: url,
                dataType: ss4.getParam(data_options.dataType, 'json'),
                timeout: ss4.getParam(data_options.timeout, 500000),
                data: ss4.getParam(data_options.data),
                error: function (xhr, ajaxOptions, thrownError) {
                    ss4.loading(false, ss4.getParam(data_options.waiting_message, 'Vui lòng đợi...'));
                    if (retry_count == 3) {
                        ss4.loading(false, ss4.getParam(data_options.waiting_message, 'Vui lòng đợi...'));
                        is_ajax = false;

                        var msg = ss4.getParam(data_options.error_message, 'Lỗi kết nối');
                        if (msg == IGNORE_ERROR) {
                            if (ss4.getParam(onErrorFn))
                                onErrorFn();
                        } else {
                            msg += ' Trạng thái: ' + xhr.status + '. Lỗi : ' + thrownError;
                            //alert(msg);
                            console.log('ERROR:' + msg);
                        }
                    } else {
                        //retry_count++;
                        //thisObj.request(url, onCompleteFn, onErrorFn, data_options, retry_count);
                    }

                    if (ss4.getParam(onErrorFn))
                        onErrorFn();
                },
                success: function (stringdata) {
                    is_ajax = false;
                    if (data_options.bshowwaiting)
                        ss4.loading(false, ss4.getParam(data_options.waiting_message, 'Vui lòng đợi...'));

                    if (stringdata) {
                        if (ss4.isArray(stringdata)) {
                            if ((stringdata.length > 0) || !ss4.getParam(data_options.onNothingFoundFn)) {
                                if (onCompleteFn)
                                    onCompleteFn(stringdata);
                            } else {
                                if (ss4.getParam(data_options.onNothingFoundFn))
                                    data_options.onNothingFoundFn();
                            }
                        } else {
                            if (onCompleteFn)
                                onCompleteFn(stringdata);
                        }
                    } else if (ss4.getParam(data_options.onNothingFoundFn))
                        data_options.onNothingFoundFn();
                    else if (onCompleteFn)
                        onCompleteFn(stringdata);

                    if (ss4.getParam(data_options.onFinalFn))
                        data_options.onFinalFn();
                },
                failure: function (response) {
                    ss4.loading(false, ss4.getParam(data_options.waiting_message, 'Vui lòng đợi...'));
                    if (ss4.getParam(onErrorFn))
                        onErrorFn();
                }
            });

        };
    };
    ss4.checkSession = function () {
        var request = false;
        if (window.XMLHttpRequest) { // Mozilla/Safari
            request = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        request.open('POST', '/clsSession', true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                var session = eval('(' + request.responseText + ')');
                if (session.valid) {
                    window.setTimeout("ss4.checkSession()", 10000);
                } else {
                    ss4.alert({ title: 'Thông báo', message: 'Trạng thái phiên làm việc của bạn đã hết. <br>Vui lòng đăng nhập lại, cảm ơn.', fnCallback: function () { window.location.reload(); } });
                }
            }
        }
        request.send(null);
    };


})(jQuery);

var clsApi = new ss4.clsApi();
//ss4.checkSession();


