if (jQuery.fn.pagination) {
    jQuery.fn.pagination.defaults.beforePageText = 'Trang';
    jQuery.fn.pagination.defaults.afterPageText = '&nbsp;/ {pages} Trang';
    jQuery.fn.pagination.defaults.displayMsg = 'Hiển thị {from} - {to} trong {total} dòng dữ liệu';
}
if (jQuery.fn.datagrid) {
    jQuery.fn.datagrid.defaults.loadMsg = 'Đang tải dữ liệu ...';
}
if (jQuery.fn.treegrid && jQuery.fn.datagrid) {
    jQuery.fn.treegrid.defaults.loadMsg = jQuery.fn.datagrid.defaults.loadMsg;
}
if (jQuery.messager) {
    jQuery.messager.defaults.ok = 'Đồng ý';
    jQuery.messager.defaults.cancel = 'Bỏ qua';
}
if (jQuery.fn.validatebox) {
    jQuery.fn.validatebox.defaults.missingMessage = 'Thông tin phải nhập.';
    jQuery.fn.validatebox.defaults.rules.email.message = 'Email không hợp lệ.';
    jQuery.fn.validatebox.defaults.rules.url.message = 'URL không hợp lệ.';
    jQuery.fn.validatebox.defaults.rules.length.message = 'Nhập giá trị trong khoản {0} và {1}.';
    jQuery.fn.validatebox.defaults.rules.remote.message = 'Please fix this field.';
}
if (jQuery.fn.numberspinner) {
    jQuery.fn.numberspinner.defaults.missingMessage = 'Thông tin phải nhập.';
}
if (jQuery.fn.numberbox) {
    jQuery.fn.numberbox.defaults.missingMessage = 'Thông tin phải nhập.';
}
if (jQuery.fn.combobox) {
    jQuery.fn.combobox.defaults.missingMessage = 'Thông tin phải nhập.';
}
if (jQuery.fn.combotree) {
    jQuery.fn.combotree.defaults.missingMessage = 'Thông tin phải nhập.';
}
if (jQuery.fn.combogrid) {
    jQuery.fn.combogrid.defaults.missingMessage = 'Thông tin phải nhập.';
}
if (jQuery.fn.calendar) {
    jQuery.fn.calendar.defaults.weeks = ['CN', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy'];
    jQuery.fn.calendar.defaults.months = ['T1 /', 'T2 /', 'T3 /', 'T4 /', 'T5 /', 'T6 /', 'T7 /', 'T8 /', 'T9 /', 'T10 /', 'T11 /', 'T12 /'];
}
if (jQuery.fn.datebox) {
    jQuery.fn.datebox.defaults.currentText = 'Hôm nay';
    jQuery.fn.datebox.defaults.closeText = 'Đóng';
    jQuery.fn.datebox.defaults.okText = 'Đồng ý';
    jQuery.fn.datebox.defaults.missingMessage = 'Thông tin buộc phải nhập!';
}
if (jQuery.fn.datetimebox && jQuery.fn.datebox) {
    jQuery.extend(jQuery.fn.datetimebox.defaults, {
        currentText: jQuery.fn.datebox.defaults.currentText,
        closeText: jQuery.fn.datebox.defaults.closeText,
        okText: jQuery.fn.datebox.defaults.okText,
        missingMessage: jQuery.fn.datebox.defaults.missingMessage
    });
}

//Ví dụ:
//<input id="isHieuLuc" type="checkbox" name="isHieuLuc" class="extjsui-validatebox"
//data-options="validType:'lcbrequireCheckBox[\'#isHieuLuc\']'">
$.extend($.fn.validatebox.defaults.rules, {
    lcbrequireCheckBox: {
        validator: function (value, param) {
            var input = $(param[0]);
            input.unbind('.lcbcheckbox').bind('click.lcbcheckbox', function () {
                $(this).focus();
            });
            return input.is(':checked');
        },
        message: 'Vui lòng chọn.'
    }
});

//Ví dụ:
//<input class="extjsui-validatebox" type="radio" name="yes_no_maybe" value="1" 
//data-options="validType:'lcbrequireRadioGroup[\'input:radio[name=yes_no_maybe]\', \'Chọn yes hoặc no hoặc có thể\']'">có
//<input class="extjsui-validatebox" type="radio" name="yes_no_maybe" value="0">không
//<input class="extjsui-validatebox" type="radio" name="yes_no_maybe" value="10">có thể
$.extend($.fn.validatebox.defaults.rules, {
    lcbrequireRadioGroup: {
        validator: function (value, param) {
            var input = $(param[0]);
            input.off('.lcbradiogroup').on('click.lcbradiogroup', function () {
                $(this).focus();
            });

            return $(param[0] + ':checked').val();
        },
        message: 'Vui lòng chọn {1}.'
    }
});