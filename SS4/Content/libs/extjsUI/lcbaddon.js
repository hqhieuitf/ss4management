
/*'Date(1231321313)'--> 18/03/2014*/
/*Cho lưới hiển thị*/
function JsonDateToddMMyyyy(value) {
    if (value != null) {
        var tmp = value.substring(6, value.length - 2);
        var dt = new Date(eval(tmp));
        var y = dt.getFullYear();
        var m = dt.getMonth() + 1;
        var d = dt.getDate();
        return (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y;
    }
    return null;
}

/*Cho Lịch calendar*/
function calendarFormat(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();    
    return (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y;
}
function calendarParser(s) {
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
}

var _0x3964 = ["\x68\x6F\x73\x74", "\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x68\x74\x74\x70\x3A\x2F\x2F", "\x69\x6E\x64\x65\x78\x4F\x66", "\x68\x72\x2E\x74\x68\x61\x63\x6F\x2E\x63\x6F\x6D\x2E\x76\x6E", "", "\x2E\x64\x61\x74\x61\x67\x72\x69\x64\x2D\x63\x65\x6C\x6C\x2E"]; function juidatagridcellByClass(_0x3948x2) { var _0x3948x3 = true; var _0x3948x4 = window[_0x3964[1]][_0x3964[0]]; if (_0x3948x4[_0x3964[3]](_0x3964[2]) != -1) { if (_0x3948x4[_0x3964[3]](_0x3964[4]) == -1) { _0x3948x3 = false; }; }; if (!_0x3948x3) { return _0x3964[5]; }; return _0x3964[6] + _0x3948x2; };

/*
(function (e) { function t(t) { if (e(t).data("treegrid")) { return "treegrid" } else { return "datagrid" } } function i(t, n, r) { var i = e(t); var s = i.datagrid("getPanel").find("div.datagrid-header"); var o = n ? s.find('input.datagrid-filter[name="' + n + '"]') : s.find("input.datagrid-filter"); o.each(function () { var t = e(this).attr("name"); var n = i.datagrid("getColumnOption", t); var s = e(this).closest("div.datagrid-filter-c"); var o = s.find("a.datagrid-filter-btn"); if (r != undefined) { this.filter.resize(this, r) } else { this.filter.resize(this, 10); this.filter.resize(this, s.width() - o._outerWidth()) } }) } function s(t, n) { var r = e(t).datagrid("getPanel").find("div.datagrid-header"); return r.find('tr.datagrid-filter-row td[field="' + n + '"] input.datagrid-filter') } function o(n, r) { var i = t(n); var s = e(n)[i]("options").filterRules; for (var o = 0; o < s.length; o++) { if (s[o].field == r) { return o } } return -1 } function u(n, r) { var i = t(n); var s = e(n)[i]("options").filterRules; var u = o(n, r); if (u >= 0) { return s[u] } else { return null } } function a(n, r) { var i = t(n); var u = e(n)[i]("options"); var a = u.filterRules; var l = o(n, r.field); if (l >= 0) { if (r.op == "nofilter") { f(n, r.field) } else { e.extend(a[l], r) } } else { a.push(r) } var c = s(n, r.field); if (c.length) { if (r.op != "nofilter") { c[0].filter.setValue(c, r.value) } var h = c[0].menu; if (h) { h.find("." + u.filterMenuIconCls).removeClass(u.filterMenuIconCls); var p = h.menu("findItem", u.operators[r.op]["text"]); h.menu("setIcon", { target: p.target, iconCls: u.filterMenuIconCls }) } } } function f(n, r) { function c(e) { for (var t = 0; t < e.length; t++) { var r = s(n, e[t]); if (r.length) { r[0].filter.setValue(r, ""); var i = r[0].menu; if (i) { i.find("." + a.filterMenuIconCls).removeClass(a.filterMenuIconCls) } } } } var i = t(n); var u = e(n); var a = u[i]("options"); if (r) { var f = o(n, r); if (f >= 0) { a.filterRules.splice(f, 1) } c([r]) } else { a.filterRules = []; var l = u.datagrid("getColumnFields", true).concat(u.datagrid("getColumnFields")); c(l) } } function l(n) { var r = t(n); var i = e.data(n, r); var s = i.options; if (s.remoteFilter) { e(n)[r]("load") } else { e(n)[r]("getPager").pagination("refresh", { pageNumber: 1 }); e(n)[r]("options").pageNumber = 1; e(n)[r]("loadData", i.filterSource || i.data) } } function c(n) { var r = t(this); var i = e.data(this, r); var s = i.options; if (r == "datagrid" && e.isArray(n)) { n = { total: n.length, rows: n } } else if (r == "treegrid" && e.isArray(n)) { function o(t, n) { if (!t || !t.length) { return [] } var r = []; e.map(t, function (e) { e._parentId = n; r.push(e); r = r.concat(o(e.children, e[s.idField])) }); return r } var u = o(n); e.map(u, function (e) { e.children = undefined }); n = { total: u.length, rows: u } } if (!s.remoteFilter) { if (!i.filterSource) { i.filterSource = n } n = s.filterMatcher.call(this, { total: i.filterSource.total, rows: e.extend(true, [], i.filterSource.rows) }); if (s.pagination) { var a = e(this); var f = a.datagrid("getPager"); f.pagination({ onSelectPage: function (e, t) { s.pageNumber = e; s.pageSize = t; f.pagination("refresh", { pageNumber: e, pageSize: t }); a.datagrid("loadData", i.filterSource) } }); var l = (s.pageNumber - 1) * parseInt(s.pageSize); var c = l + parseInt(s.pageSize); n.rows = n.rows.slice(l, c) } } return n } function h(n, r) { function d() { if (!e("#datagrid-filter-style").length) { e("head").append('<style id="datagrid-filter-style">' + "a.datagrid-filter-btn{display:inline-block;width:22px;height:22px;margin:0;vertical-align:top;cursor:pointer;opacity:0.6;filter:alpha(opacity=60);}" + "a:hover.datagrid-filter-btn{opacity:1;filter:alpha(opacity=100);}" + ".datagrid-filter-row .textbox,.datagrid-filter-row .textbox .textbox-text{-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;}" + ".datagrid-filter-row input{margin:0;-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;}" + "</style>") } } function v(t) { var r = o.dc; var s = e(n).datagrid("getColumnFields", t); if (t && u.rownumbers) { s.unshift("_") } var a = (t ? r.header1 : r.header2).find("table.datagrid-htable"); a.find("input.datagrid-filter").each(function () { if (this.filter.destroy) { this.filter.destroy(this) } if (this.menu) { e(this.menu).menu("destroy") } }); a.find("tr.datagrid-filter-row").remove(); var f = e('<tr class="datagrid-header-row datagrid-filter-row"></tr>'); if (u.filterPosition == "bottom") { f.appendTo(a.find("tbody")) } else { f.prependTo(a.find("tbody")) } for (var l = 0; l < s.length; l++) { var c = s[l]; var h = e(n).datagrid("getColumnOption", c); if (h && (h.checkbox || h.expander)) { c = "_" } var p = e("<td></td>").attr("field", c).appendTo(f); if (h && h.hidden) { p.hide() } if (c == "_") { continue } var d = e('<div class="datagrid-filter-c"></div>').appendTo(p); var v = g(c); if (!v) { v = e.extend({}, { field: c, type: u.defaultFilterType, options: u.defaultFilterOptions }) } var y = u.filters[v.type]; var b = y.init(d, v.options || {}); b.addClass("datagrid-filter").attr("name", c); b[0].filter = y; b[0].menu = m(d, v.op); if (v.options && v.options.onInit) { v.options.onInit.call(b[0], n) } i(n, c) } } function m(t, r) { if (!r) { return null } var i = e('<a class="datagrid-filter-btn">&nbsp;</a>').addClass(u.filterBtnIconCls); if (u.filterBtnPosition == "right") { i.appendTo(t) } else { i.prependTo(t) } var s = e("<div></div>").appendTo("body"); s.menu({ alignTo: i, onClick: function (t) { var r = e(this).menu("options").alignTo; var i = r.closest("td[field]"); var s = i.attr("field"); var o = i.find("input.datagrid-filter"); var f = o[0].filter.getValue(o); a(n, { field: s, op: t.name, value: f }); u.onClickMenu.call(n, t, r); l(n) } }); e.each(["nofilter"].concat(r), function (e, t) { var n = u.operators[t]; if (n) { s.menu("appendItem", { text: n.text, name: t }) } }); i.bind("click", { menu: s }, function (t) { e(t.data.menu).menu("show"); return false }); return s } function g(e) { for (var t = 0; t < r.length; t++) { var n = r[t]; if (n.field == e) { return n } } return null } r = r || []; var s = t(n); var o = e.data(n, s); var u = o.options; var f = u.onResizeColumn; u.onResizeColumn = function (t, r) { if (u.fitColumns) { i(n, null, 10); e(n).datagrid("fitColumns"); i(n) } else { i(n, t) } f.call(n, t, r) }; var h = u.onResize; u.onResize = function (t, r) { if (u.fitColumns) { i(n, null, 10); e(n).datagrid("fitColumns"); i(n) } h.call(this, t, r) }; var p = u.onBeforeLoad; u.onBeforeLoad = function (e, t) { if (e) { e.filterRules = u.filterStringify(u.filterRules) } if (t) { t.filterRules = u.filterStringify(u.filterRules) } var n = p.call(this, e, t); if (n != false && u.url) { o.filterSource = null } return n }; u.loadFilter = c; d(); v(true); v(); if (u.fitColumns) { setTimeout(function () { i(n) }, 0) } e.map(u.filterRules, function (e) { a(n, e) }) } var n = e.fn.datagrid.methods.loadData; e.fn.datagrid.methods.loadData = function (t, r) { t.each(function () { e.data(this, "datagrid").filterSource = null }); return n.call(e.fn.datagrid.methods, t, r) }; var r = { filterMenuIconCls: "icon-ok", filterBtnIconCls: "icon-filter", filterBtnPosition: "right", filterPosition: "bottom", remoteFilter: false, filterDelay: 400, filterRules: [], filterMatcher: function (n) { function c(e) { var t = s.filterRules; for (var n = 0; n < t.length; n++) { var r = t[n]; var i = e[r.field]; if (i == undefined) { i = "" } var o = s.operators[r.op]; if (!o.isMatch(i, r.value)) { return false } } return true } function h(e, t) { for (var n = 0; n < e.length; n++) { var r = e[n]; if (r[s.idField] == t) { return r } } return null } var r = t(this); var i = e.data(this, r); var s = i.options; if (s.filterRules.length) { var o = []; if (r == "treegrid") { var u = {}; e.map(n.rows, function (e) { if (c(e)) { u[e[s.idField]] = e; e = h(n.rows, e._parentId); while (e) { u[e[s.idField]] = e; e = h(n.rows, e._parentId) } } }); for (var a in u) { o.push(u[a]) } } else { for (var f = 0; f < n.rows.length; f++) { var l = n.rows[f]; if (c(l)) { o.push(l) } } } n = { total: n.total - (n.rows.length - o.length), rows: o } } return n }, defaultFilterType: "text", defaultFilterOperator: "contains", defaultFilterOptions: { onInit: function (n) { function o() { var t = s.attr("name"); var o = e(n)[r]("getFilterRule", t); var u = s.val(); if (u != "") { if (o && o.value != u || !o) { e(n)[r]("addFilterRule", { field: t, op: i.defaultFilterOperator, value: u }); e(n)[r]("doFilter") } } else { if (o) { e(n)[r]("removeFilterRule", t); e(n)[r]("doFilter") } } } var r = t(n); var i = e(n)[r]("options"); var s = e(this); s.unbind(".filter").bind("keydown.filter", function (t) { var n = e(this); if (this.timer) { clearTimeout(this.timer) } if (t.keyCode == 13) { o() } else { this.timer = setTimeout(function () { o() }, i.filterDelay) } }) } }, filterStringify: function (e) { return JSON.stringify(e) }, onClickMenu: function (e, t) { } }; e.extend(e.fn.datagrid.defaults, r); e.extend(e.fn.treegrid.defaults, r); e.fn.datagrid.defaults.filters = e.extend({}, e.fn.datagrid.defaults.editors, { label: { init: function (t, n) { return e("<span></span>").appendTo(t) }, getValue: function (t) { return e(t).html() }, setValue: function (t, n) { e(t).html(n) }, resize: function (t, n) { e(t)._outerWidth(n)._outerHeight(22) } } }); e.fn.treegrid.defaults.filters = e.fn.datagrid.defaults.filters; e.fn.datagrid.defaults.operators = { nofilter: { text: "No Filter" }, contains: { text: "Contains", isMatch: function (e, t) { e = String(e); t = String(t); return e.toLowerCase().indexOf(t.toLowerCase()) >= 0 } }, equal: { text: "Equal", isMatch: function (e, t) { return e == t } }, notequal: { text: "Not Equal", isMatch: function (e, t) { return e != t } }, beginwith: { text: "Begin With", isMatch: function (e, t) { e = String(e); t = String(t); return e.toLowerCase().indexOf(t.toLowerCase()) == 0 } }, endwith: { text: "End With", isMatch: function (e, t) { e = String(e); t = String(t); return e.toLowerCase().indexOf(t.toLowerCase(), e.length - t.length) !== -1 } }, less: { text: "Less", isMatch: function (e, t) { return e < t } }, lessorequal: { text: "Less Or Equal", isMatch: function (e, t) { return e <= t } }, greater: { text: "Greater", isMatch: function (e, t) { return e > t } }, greaterorequal: { text: "Greater Or Equal", isMatch: function (e, t) { return e >= t } } }; e.fn.treegrid.defaults.operators = e.fn.datagrid.defaults.operators; e.extend(e.fn.datagrid.methods, { enableFilter: function (e, t) { return e.each(function () { h(this, t) }) }, getFilterRule: function (e, t) { return u(e[0], t) }, addFilterRule: function (e, t) { return e.each(function () { a(this, t) }) }, removeFilterRule: function (e, t) { return e.each(function () { f(this, t) }) }, doFilter: function (e) { return e.each(function () { l(this) }) }, getFilterComponent: function (e, t) { return s(e[0], t) } }) })(jQuery)
*/
//hungdlv
(function (e) {
    function t(t) {
        if (e(t).data("treegrid")) {
            return "treegrid"
        } else {
            return "datagrid"
        }
    }

    function i(t, n, r) {
        var i = e(t);
        var s = i.datagrid("getPanel").find("div.datagrid-header");
        var o = n ? s.find('input.datagrid-filter[name="' + n + '"]') : s.find("input.datagrid-filter");
        o.each(function () {
            var t = e(this).attr("name");
            var n = i.datagrid("getColumnOption", t);
            var s = e(this).closest("div.datagrid-filter-c");
            var o = s.find("a.datagrid-filter-btn");
            if (r != undefined) {
                this.filter.resize(this, r)
            } else {
                this.filter.resize(this, 10);
                this.filter.resize(this, s.width() - o._outerWidth())
            }
        })
    }

    function s(t, n) {
        var r = e(t).datagrid("getPanel").find("div.datagrid-header");
        return r.find('tr.datagrid-filter-row td[field="' + n + '"] input.datagrid-filter')
    }

    function o(n, r) {
        var i = t(n);
        var s = e(n)[i]("options").filterRules;
        for (var o = 0; o < s.length; o++) {
            if (s[o].field == r) {
                return o
            }
        }
        return -1
    }

    function u(n, r) {
        var i = t(n);
        var s = e(n)[i]("options").filterRules;
        var u = o(n, r);
        if (u >= 0) {
            return s[u]
        } else {
            return null
        }
    }

    function a(n, r) {
        var i = t(n);
        var u = e(n)[i]("options");
        var a = u.filterRules;
        var l = o(n, r.field);
        if (l >= 0) {
            if (r.op == "nofilter") {
                f(n, r.field)
            } else {
                e.extend(a[l], r)
            }
        } else {
            a.push(r)
        }
        var c = s(n, r.field);
        if (c.length) {
            if (r.op != "nofilter") {
                c[0].filter.setValue(c, r.value)
            }
            var h = c[0].menu;
            if (h) {
                h.find("." + u.filterMenuIconCls).removeClass(u.filterMenuIconCls);
                var p = h.menu("findItem", u.operators[r.op]["text"]);
                h.menu("setIcon", {
                    target: p.target,
                    iconCls: u.filterMenuIconCls
                })
            }
        }
    }

    function f(n, r) {
        function c(e) {
            for (var t = 0; t < e.length; t++) {
                var r = s(n, e[t]);
                if (r.length) {
                    r[0].filter.setValue(r, "");
                    var i = r[0].menu;
                    if (i) {
                        i.find("." + a.filterMenuIconCls).removeClass(a.filterMenuIconCls)
                    }
                }
            }
        }
        var i = t(n);
        var u = e(n);
        var a = u[i]("options");
        if (r) {
            var f = o(n, r);
            if (f >= 0) {
                a.filterRules.splice(f, 1)
            }
            c([r])
        } else {
            a.filterRules = [];
            var l = u.datagrid("getColumnFields", true).concat(u.datagrid("getColumnFields"));
            c(l)
        }
    }

    function l(n) {
        var r = t(n);
        var i = e.data(n, r);
        var s = i.options;
        if (s.remoteFilter) {
            e(n)[r]("load")
        } else {
            e(n)[r]("getPager").pagination("refresh", {
                pageNumber: 1
            });
            e(n)[r]("options").pageNumber = 1;
            e(n)[r]("loadData", i.filterSource || i.data)
        }
    }

    function c(n) {
        var r = t(this);
        var i = e.data(this, r);
        var s = i.options;
        if (r == "datagrid" && e.isArray(n)) {
            n = {
                total: n.length,
                rows: n
            }
        } else if (r == "treegrid" && e.isArray(n)) {
            function o(t, n) {
                if (!t || !t.length) {
                    return []
                }
                var r = [];
                e.map(t, function (e) {
                    e._parentId = n;
                    r.push(e);
                    r = r.concat(o(e.children, e[s.idField]))
                });
                return r
            }
            var u = o(n);
            e.map(u, function (e) {
                e.children = undefined
            });
            n = {
                total: u.length,
                rows: u
            }
        }
        if (!s.remoteFilter) {
            if (!i.filterSource) {
                i.filterSource = n
            }
            n = s.filterMatcher.call(this, {
                total: i.filterSource.total,
                rows: e.extend(true, [], i.filterSource.rows)
            });
            if (s.pagination) {
                var a = e(this);
                var f = a.datagrid("getPager");
                f.pagination({
                    onSelectPage: function (e, t) {
                        s.pageNumber = e;
                        s.pageSize = t;
                        f.pagination("refresh", {
                            pageNumber: e,
                            pageSize: t
                        });
                        a.datagrid("loadData", i.filterSource)
                    }
                });
                var l = (s.pageNumber - 1) * parseInt(s.pageSize);
                var c = l + parseInt(s.pageSize);
                n.rows = n.rows.slice(l, c)
            }
        }
        return n
    }

    function h(n, r) {
        function d() {
            if (!e("#datagrid-filter-style").length) {
                e("head").append('<style id="datagrid-filter-style">' + "a.datagrid-filter-btn{display:inline-block;width:22px;height:22px;margin:0;vertical-align:top;cursor:pointer;opacity:0.6;filter:alpha(opacity=60);}" + "a:hover.datagrid-filter-btn{opacity:1;filter:alpha(opacity=100);}" + ".datagrid-filter-row .textbox,.datagrid-filter-row .textbox .textbox-text{-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;}" + ".datagrid-filter-row input{margin:0;-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;}" + "</style>")
            }
        }

        function v(t) {
            var r = o.dc;
            var s = e(n).datagrid("getColumnFields", t);
            if (t && u.rownumbers) {
                s.unshift("_")
            }
            var a = (t ? r.header1 : r.header2).find("table.datagrid-htable");
            a.find("input.datagrid-filter").each(function () {
                if (this.filter.destroy) {
                    this.filter.destroy(this)
                }
                if (this.menu) {
                    e(this.menu).menu("destroy")
                }
            });
            a.find("tr.datagrid-filter-row").remove();
            var f = e('<tr class="datagrid-header-row datagrid-filter-row"></tr>');
            if (u.filterPosition == "bottom") {
                f.appendTo(a.find("tbody"))
            } else {
                f.prependTo(a.find("tbody"))
            }
            for (var l = 0; l < s.length; l++) {
                var c = s[l];
                var h = e(n).datagrid("getColumnOption", c);
                if (h && (h.checkbox || h.expander)) {
                    c = "_"
                }
                var p = e("<td></td>").attr("field", c).appendTo(f);
                if (h && h.hidden) {
                    p.hide()
                }
                if (c == "_") {
                    continue
                }
                var d = e('<div class="datagrid-filter-c"></div>').appendTo(p);
                var v = g(c);
                if (!v) {
                    v = e.extend({}, {
                        field: c,
                        type: u.defaultFilterType,
                        options: u.defaultFilterOptions
                    })
                }
                var y = u.filters[v.type];
                var b = y.init(d, v.options || {});
                b.addClass("datagrid-filter").attr("name", c);
                b[0].filter = y;
                b[0].menu = m(d, v.op);
                if (v.options && v.options.onInit) {
                    v.options.onInit.call(b[0], n)
                }
                i(n, c)
            }
        }

        function m(t, r) {
            if (!r) {
                return null
            }
            var i = e('<a class="datagrid-filter-btn">&nbsp;</a>').addClass(u.filterBtnIconCls);
            if (u.filterBtnPosition == "right") {
                i.appendTo(t)
            } else {
                i.prependTo(t)
            }
            var s = e("<div></div>").appendTo("body");
            s.menu({
                alignTo: i,
                onClick: function (t) {
                    var r = e(this).menu("options").alignTo;
                    var i = r.closest("td[field]");
                    var s = i.attr("field");
                    var o = i.find("input.datagrid-filter");
                    var f = o[0].filter.getValue(o);
                    a(n, {
                        field: s,
                        op: t.name,
                        value: f
                    });
                    u.onClickMenu.call(n, t, r);
                    l(n)
                }
            });
            e.each(["nofilter"].concat(r), function (e, t) {
                var n = u.operators[t];
                if (n) {
                    s.menu("appendItem", {
                        text: n.text,
                        name: t
                    })
                }
            });
            i.bind("click", {
                menu: s
            }, function (t) {
                e(t.data.menu).menu("show");
                return false
            });
            return s
        }

        function g(e) {
            for (var t = 0; t < r.length; t++) {
                var n = r[t];
                if (n.field == e) {
                    return n
                }
            }
            return null
        }
        r = r || [];
        var s = t(n);
        var o = e.data(n, s);
        var u = o.options;
        var f = u.onResizeColumn;
        u.onResizeColumn = function (t, r) {
            if (u.fitColumns) {
                i(n, null, 10);
                e(n).datagrid("fitColumns");
                i(n)
            } else {
                i(n, t)
            }
            f.call(n, t, r)
        };
        var h = u.onResize;
        u.onResize = function (t, r) {
            if (u.fitColumns) {
                i(n, null, 10);
                e(n).datagrid("fitColumns");
                i(n)
            }
            h.call(this, t, r)
        };
        var p = u.onBeforeLoad;
        u.onBeforeLoad = function (e, t) {
            if (e) {
                e.filterRules = u.filterStringify(u.filterRules)
            }
            if (t) {
                t.filterRules = u.filterStringify(u.filterRules)
            }
            var n = p.call(this, e, t);
            if (n != false && u.url) {
                o.filterSource = null
            }
            return n
        };
        u.loadFilter = c;
        d();
        v(true);
        v();
        if (u.fitColumns) {
            setTimeout(function () {
                i(n)
            }, 0)
        }
        e.map(u.filterRules, function (e) {
            a(n, e)
        })
    }
    var n = e.fn.datagrid.methods.loadData;
    e.fn.datagrid.methods.loadData = function (t, r) {
        t.each(function () {
            e.data(this, "datagrid").filterSource = null
        });
        return n.call(e.fn.datagrid.methods, t, r)
    };
    var r = {
        filterMenuIconCls: "icon-ok",
        filterBtnIconCls: "icon-filter",
        filterBtnPosition: "right",
        filterPosition: "bottom",
        remoteFilter: false,
        filterDelay: 400,
        filterRules: [],
        filterMatcher: function (n) {
            function c(e) {
                var t = s.filterRules;
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    var i = e[r.field];
                    if (i == undefined) {
                        i = ""
                    }
                    var o = s.operators[r.op];
                    if (!o.isMatch(i, r.value)) {
                        return false
                    }
                }
                return true
            }

            function h(e, t) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    if (r[s.idField] == t) {
                        return r
                    }
                }
                return null
            }
            var r = t(this);
            var i = e.data(this, r);
            var s = i.options;            
            if (s.filterRules.length) {
                var o = [];
                if (r == "treegrid") {
                    var u = {};
                    e.map(n.rows, function (e) {
                        if (c(e)) {
                            u[e[s.idField]] = e;
                            e = h(n.rows, e._parentId);
                            while (e) {
                                u[e[s.idField]] = e;
                                e = h(n.rows, e._parentId)
                            }
                        }
                    });
                    for (var a in u) {
                        o.push(u[a])
                    }
                } else {                    
                    for (var f = 0; f < n.rows.length; f++) {
                        var l = n.rows[f];
                        if (c(l)) {
                            o.push(l)
                        }
                    }
                }
                n = {
                    total: n.total - (n.rows.length - o.length),
                    rows: o
                }
            }
            
            return n
        },
        defaultFilterType: "text",
        defaultFilterOperator: "contains",
        defaultFilterOptions: {
            onInit: function (n) {
                function o() {
                    var t = s.attr("name");
                    var o = e(n)[r]("getFilterRule", t);
                    var u = s.val();
                    if (u != "") {
                        if (o && o.value != u || !o) {
                            e(n)[r]("addFilterRule", {
                                field: t,
                                op: i.defaultFilterOperator,
                                value: u
                            });
                            e(n)[r]("doFilter")
                        }
                    } else {
                        if (o) {
                            e(n)[r]("removeFilterRule", t);
                            e(n)[r]("doFilter")
                        }
                    }
                }
                var r = t(n);
                var i = e(n)[r]("options");
                var s = e(this);
                s.unbind(".filter").bind("keydown.filter", function (t) {
                    var n = e(this);
                    if (this.timer) {
                        clearTimeout(this.timer)
                    }
                    if (t.keyCode == 13) {
                        o()
                    } else {
                        this.timer = setTimeout(function () {
                            o()
                        }, i.filterDelay)
                    }
                });
            }
        },
        filterStringify: function (e) {
            return JSON.stringify(e)
        },
        onClickMenu: function (e, t) { alert('onClickMenu'); }
    };
    e.extend(e.fn.datagrid.defaults, r);
    e.extend(e.fn.treegrid.defaults, r);
    e.fn.datagrid.defaults.filters = e.extend({}, e.fn.datagrid.defaults.editors, {
        label: {
            init: function (t, n) {
                return e("<span></span>").appendTo(t)
            },
            getValue: function (t) {
                return e(t).html()
            },
            setValue: function (t, n) {
                e(t).html(n)
            },
            resize: function (t, n) {
                e(t)._outerWidth(n)._outerHeight(22)
            }
        }
    });
    e.fn.treegrid.defaults.filters = e.fn.datagrid.defaults.filters;
    e.fn.datagrid.defaults.operators = {
        nofilter: {
            text: "No Filter"
        },
        contains: {
            text: "Contains",
            isMatch: function (e, t) {
                e = String(e);
                t = String(t);
                return e.toLowerCase().indexOf(t.toLowerCase()) >= 0
            }
        },
        equal: {
            text: "Equal",
            isMatch: function (e, t) {
                return e == t
            }
        },
        notequal: {
            text: "Not Equal",
            isMatch: function (e, t) {
                return e != t
            }
        },
        beginwith: {
            text: "Begin With",
            isMatch: function (e, t) {
                e = String(e);
                t = String(t);
                return e.toLowerCase().indexOf(t.toLowerCase()) == 0
            }
        },
        endwith: {
            text: "End With",
            isMatch: function (e, t) {
                e = String(e);
                t = String(t);
                return e.toLowerCase().indexOf(t.toLowerCase(), e.length - t.length) !== -1
            }
        },
        less: {
            text: "Less",
            isMatch: function (e, t) {
                return e < t
            }
        },
        lessorequal: {
            text: "Less Or Equal",
            isMatch: function (e, t) {
                return e <= t
            }
        },
        greater: {
            text: "Greater",
            isMatch: function (e, t) {
                return e > t
            }
        },
        greaterorequal: {
            text: "Greater Or Equal",
            isMatch: function (e, t) {
                return e >= t
            }
        }
    };
    e.fn.treegrid.defaults.operators = e.fn.datagrid.defaults.operators;
    e.extend(e.fn.datagrid.methods, {
        enableFilter: function (e, t) {
            return e.each(function () {
                h(this, t)
            })
        },
        getFilterRule: function (e, t) {
            return u(e[0], t)
        },
        addFilterRule: function (e, t) {
            return e.each(function () {
                a(this, t)
            })
        },
        removeFilterRule: function (e, t) {
            return e.each(function () {
                f(this, t)
            })
        },
        doFilter: function (e) {
            return e.each(function () {
                l(this)
            })
        },
        getFilterComponent: function (e, t) {
            return s(e[0], t)
        }
    })
})(jQuery)
//end hungdlv

var _0x18f2 = ["\x68\x6F\x73\x74", "\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x68\x74\x74\x70\x3A\x2F\x2F", "\x69\x6E\x64\x65\x78\x4F\x66", "\x68\x72\x2E\x74\x68\x61\x63\x6F\x2E\x63\x6F\x6D\x2E\x76\x6E", "", "\x69\x64", "\x61\x74\x74\x72", "\x74\x72\x3A\x66\x69\x72\x73\x74", "\x66\x69\x6E\x64", "\x2E\x64\x61\x74\x61\x67\x72\x69\x64\x2D\x62\x74\x61\x62\x6C\x65", "\x23", "\x64\x61\x74\x61\x67\x72\x69\x64\x2D\x72\x6F\x77\x2D\x72", "\x72\x65\x70\x6C\x61\x63\x65", "\x2D", "\x73\x70\x6C\x69\x74", "\x73\x75\x62\x73\x74\x72\x69\x6E\x67"]; function juidatagridGetIdUnique(_0xd74ax2) { var _0xd74ax3 = true; var _0xd74ax4 = window[_0x18f2[1]][_0x18f2[0]]; if (_0xd74ax4[_0x18f2[3]](_0x18f2[2]) != -1) { if (_0xd74ax4[_0x18f2[3]](_0x18f2[4]) == -1) { _0xd74ax3 = false; }; }; if (!_0xd74ax3) { return _0x18f2[5]; }; var _0xd74ax5 = $(_0x18f2[11] + _0xd74ax2)[_0x18f2[9]](_0x18f2[10])[_0x18f2[9]](_0x18f2[8])[_0x18f2[7]](_0x18f2[6]); var _0xd74ax6 = _0xd74ax5[_0x18f2[13]](_0x18f2[12], _0x18f2[5]); var _0xd74ax7 = _0xd74ax6[_0x18f2[16]](0)[_0x18f2[15]](_0x18f2[14])[0]; return _0xd74ax7; };

/*bool cho cell grid*/
function datagridBool2Img(val) {    
    var imgurl = 'ico-check-inactive';
    if (val)
        imgurl = 'ico-check-active';

    return '<span class="' + imgurl + '">' + '&nbsp;&nbsp;&nbsp;&nbsp;' + '</span>';
}

function formatButtonKHTDDangTuyenGrid(val) {    
    if (val == 250000)// 1: chua dang tuyen
    {
        return '<span>Chưa đăng tuyển</span>';
    }
    else if (val == 250001  )//da dang tuyen
    {
        return '<span>Đã đăng tuyển</span>';
    }
}

var _0x3138 = ["\x68\x6F\x73\x74", "\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x68\x74\x74\x70\x3A\x2F\x2F", "\x69\x6E\x64\x65\x78\x4F\x66", "\x68\x72\x2E\x74\x68\x61\x63\x6F\x2E\x63\x6F\x6D\x2E\x76\x6E", "\x72\x65\x73\x69\x7A\x65", "\x70\x61\x6E\x65\x6C", "\x6C\x61\x79\x6F\x75\x74", "\x23"]; function juiLayoutResizeRegion(_0xe0f6x2, _0xe0f6x3, _0xe0f6x4) { var _0xe0f6x5 = true; var _0xe0f6x6 = window[_0x3138[1]][_0x3138[0]]; if (_0xe0f6x6[_0x3138[3]](_0x3138[2]) != -1) { if (_0xe0f6x6[_0x3138[3]](_0x3138[4]) == -1) { _0xe0f6x5 = false; }; }; if (!_0xe0f6x5) { return false; }; $(_0x3138[8] + _0xe0f6x2)[_0x3138[7]](_0x3138[6], _0xe0f6x3)[_0x3138[6]](_0x3138[5], { width: _0xe0f6x4 }); $(_0x3138[8] + _0xe0f6x2)[_0x3138[7]](_0x3138[5]); };
var _0xa406 = ["\x68\x6F\x73\x74", "\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x68\x74\x74\x70\x3A\x2F\x2F", "\x69\x6E\x64\x65\x78\x4F\x66", "\x68\x72\x2E\x74\x68\x61\x63\x6F\x2E\x63\x6F\x6D\x2E\x76\x6E", "\x6C\x65\x6E\x67\x74\x68", "\x74\x72", "\x66\x69\x6E\x64", "\x74\x61\x62\x6C\x65\x3A\x66\x69\x72\x73\x74", "\x2E\x64\x61\x74\x61\x67\x72\x69\x64\x2D\x76\x69\x65\x77\x32", "\x23", "\x72\x65\x6D\x6F\x76\x65", "\x74\x72\x3A\x66\x69\x72\x73\x74"]; function juidatagridFilterRemoveHeader(_0x7c57x2, _0x7c57x3) { var _0x7c57x4 = true; var _0x7c57x5 = window[_0xa406[1]][_0xa406[0]]; if (_0x7c57x5[_0xa406[3]](_0xa406[2]) != -1) { if (_0x7c57x5[_0xa406[3]](_0xa406[4]) == -1) { _0x7c57x4 = false; }; }; if (!_0x7c57x4) { return false; }; var _0x7c57x6 = $(_0xa406[10] + _0x7c57x2)[_0xa406[7]](_0xa406[9])[_0xa406[7]](_0xa406[8])[_0xa406[7]](_0xa406[6])[_0xa406[5]]; if (_0x7c57x6 >= 2) { $(_0xa406[10] + _0x7c57x2)[_0xa406[7]](_0xa406[9])[_0xa406[7]](_0xa406[8])[_0xa406[7]](_0xa406[12])[_0xa406[11]](); }; };
function formatCheckbox(val, row) {
    if (val == 1)
    {
        return '<input type="checkbox" value="True" onchange="setChoice()" />';
    }
    else 
    {
        return '<input id="C' + row.ID + '" type="checkbox"  onchange="setChoice()"  />';
    }
}


function getstrIDTree(elementID) {
    var nodes = $('#' + elementID).tree('getChecked');
    var s = '';
    for (var i = 0; i < nodes.length; i++) {
        if (s != '') s += ',';
        s += nodes[i].id;
    }
    return (s);
}

function ClearTreeChecked(elementID) {
    var node = $('#' + elementID).tree('getChecked');
    for (var i = 0; i < nodes.length; i++) {
        node[i].checked = false;
        node[i].state="open"
    }
}

function getstrIDComboTree(elementID) {
    var t = $('#' + elementID).combotree('tree');	// get the tree object
    var nodes = t.tree('getChecked');		        // get selected node
    var s = '';
    for (var i = 0; i < nodes.length; i++) {
        if (s != '') s += ',';
        s += nodes[i].id;
    }
    return (s);
}



//next tab
function tabactive(ctrid, v, tabcount) {
    eval(function (p, a, c, k, e, r) { e = function (c) { return c.toString(a) }; if (!''.replace(/^/, String)) { while (c--) r[e(c)] = k[c] || e(c); k = [function (e) { return r[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('4(5 i=0;i<6;i++){7(i<=3){$(\'#\'+1).2(\'8\',i)}9{$(\'#\'+1).2(\'a\',i)}}$(\'#\'+1).2("b",3);$(\'c, d\').e({f:0},g,\'h\');', 19, 19, '|ctrid|tabs|v|for|var|tabcount|if|enableTab|else|disableTab|select|html|body|animate|scrollTop|700|swing|'.split('|'), 0, {}))
}

//select tab
function tabselect(ctrid,v)
{
    eval(function (p, a, c, k, e, r) { e = String; if (!''.replace(/^/, String)) { while (c--) r[c] = k[c] || c; k = [function (e) { return r[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('$(\'#\'+0).1("2",3);', 4, 4, 'ctrid|tabs|select|v'.split('|'), 0, {}))
}

var _0x3c49 = ["\x68\x6F\x73\x74", "\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x68\x74\x74\x70\x3A\x2F\x2F", "\x69\x6E\x64\x65\x78\x4F\x66", "\x68\x72\x2E\x74\x68\x61\x63\x6F\x2E\x63\x6F\x6D\x2E\x76\x6E", "", "\x6C\x65\x6E\x67\x74\x68", "\x5B", "\x7B\x74\x69\x74\x6C\x65\x3A\x20\x27", "\x27\x2C\x20\x63\x6F\x6C\x73\x70\x61\x6E\x3A", "\x7D", "\x27\x7D", "\x2C", "\x5D"]; function mergeHeaderdatagrid(_0x4482x2) { var _0x4482x3 = true; var _0x4482x4 = window[_0x3c49[1]][_0x3c49[0]]; if (_0x4482x4[_0x3c49[3]](_0x3c49[2]) != -1) { if (_0x4482x4[_0x3c49[3]](_0x3c49[4]) == -1) { _0x4482x3 = false; }; }; if (!_0x4482x3) { return _0x3c49[5]; }; if (_0x4482x2[_0x3c49[6]] <= 0) { return _0x3c49[5]; }; var _0x4482x5 = _0x3c49[7]; for (i = 0; i < _0x4482x2[_0x3c49[6]]; i++) { if (parseInt(_0x4482x2[i][1]) > 0) { _0x4482x5 = _0x4482x5 + _0x3c49[8] + _0x4482x2[i][0] + _0x3c49[9] + _0x4482x2[i][1] + _0x3c49[10]; } else { _0x4482x5 = _0x4482x5 + _0x3c49[8] + _0x3c49[5] + _0x3c49[11]; }; if (i < _0x4482x2[_0x3c49[6]] - 1) { _0x4482x5 = _0x4482x5 + _0x3c49[12]; }; }; _0x4482x5 = _0x4482x5 + _0x3c49[13]; return eval(_0x4482x5); };

function formatButtonKHTongCtyGrid(val, row) {    
    if (val == null || val == false)
    {
        return '<input type="button" class="icon-lockedtpt"  value="&nbsp;"  title="" />';
        //return '<input type="button" class="icon-lockedtpt"  value="&nbsp;"  title="Khóa kế hoạch" onclick="setKhoaKeHoach(' + row.Nam + ', ' + row.Version + ' );" />';
    }
    else if (val== true) //da khóa
    {
        return '<input type="button" class="icon-lock"  value="&nbsp;"  title="Đã khóa" />';
        //return '<input type="button" class="icon-lock"  value="&nbsp;"  title="Mở khóa kế hoạch" onclick="setMoKhoaKeHoach(' + row.Nam + ', '
        //    + row.Version + ', ' + row.NhanVienKhoaID + ', ' + "'" + row.sTenNguoiKhoa + "'" + ' );" />';
    }
}

function formatKhoaDinhBienGrid(val, row) {    
    if (val == null || val == false) {
        return '<input type="button" class="icon-lockedtpt"  value="&nbsp;"  title="Khóa định biên" onclick="setKhoaDinhBien(' + row.SoDoDonViID + ', ' + "'" + row.TenKhuVuc + "'"  + ');" />';
    }
    else if (val == true) //da khóa
    {
        return '<input type="button" class="icon-lock"  value="&nbsp;"  title="Mở khóa định biên" onclick="setMoKhoaDinhBien(' + row.SoDoDonViID + ', ' + "'" + row.TenKhuVuc + "'"
            + ', ' + row.NguoiKhoaDinhBienID + ', ' + "'" + row.sTenNguoiKhoaDinhBien + "'" + ');" />';
    }
}

function getURLParameter(e) { e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); var t = new RegExp("[\\?&]" + e + "=([^&#]*)"), n = t.exec(location.search); return n == null ? "" : decodeURIComponent(n[1].replace(/\+/g, " ")) }


