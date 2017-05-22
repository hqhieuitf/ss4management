$.extend($.fn.datagrid.methods, {
        toExcel: function (jq, filename) {
            return jq.each(function () {
                var uri = 'data:application/vnd.ms-excel;base64,'
                , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
                , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
                , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

                var alink = $('<a style="display:none"></a>').appendTo('body');
                var view = $(this).datagrid('getPanel').find('div.datagrid-view');

                var table = view.find('div.datagrid-view2 table.datagrid-btable').clone();
                var tbody = table.find('>tbody');
                view.find('div.datagrid-view1 table.datagrid-btable>tbody>tr').each(function (index) {
                    $(this).clone().children().prependTo(tbody.children('tr:eq(' + index + ')'));
                });

                var head = view.find('div.datagrid-view2 table.datagrid-htable').clone();
                var hbody = head.find('>tbody');
                view.find('div.datagrid-view1 table.datagrid-htable>tbody>tr').each(function (index) {
                    $(this).clone().children().prependTo(hbody.children('tr:eq(' + index + ')'));
                });
                hbody.prependTo(table);                

                var ctx = { worksheet: name || 'Worksheet', table: table.html() || '' };
                alink[0].href = uri + base64(format(template, ctx));
                alink[0].download = filename;
                alink[0].click();
                alink.remove();
            })
        }
    });