!function() {
    function a(a) {
        "use strict";
        var b = {
            version: "1.7.0",
            constants: {
                CHART_CLASS: "dc-chart",
                DEBUG_GROUP_CLASS: "debug",
                STACK_CLASS: "stack",
                DESELECTED_CLASS: "deselected",
                SELECTED_CLASS: "selected",
                NODE_INDEX_NAME: "__index__",
                GROUP_INDEX_NAME: "__group_index__",
                DEFAULT_CHART_GROUP: "__default_chart_group__",
                EVENT_DELAY: 40,
                NEGLIGIBLE_NUMBER: 1e-10
            },
            _renderlet: null
        };
        return b.chartRegistry = function() {
            function a(a) {
                return a || (a = b.constants.DEFAULT_CHART_GROUP),
                c[a] || (c[a] = []),
                a
            }
            var c = {};
            return {
                has: function(a) {
                    for (var b in c)
                        if (c[b].indexOf(a) >= 0)
                            return !0;
                    return !1
                },
                register: function(b, d) {
                    d = a(d),
                    c[d].push(b)
                },
                clear: function() {
                    c = {}
                },
                list: function(b) {
                    return b = a(b),
                    c[b]
                }
            }
        }(),
        b.registerChart = function(a, c) {
            b.chartRegistry.register(a, c)
        }
        ,
        b.hasChart = function(a) {
            return b.chartRegistry.has(a)
        }
        ,
        b.deregisterAllCharts = function() {
            b.chartRegistry.clear()
        }
        ,
        b.filterAll = function(a) {
            for (var c = b.chartRegistry.list(a), d = 0; d < c.length; ++d)
                c[d].filterAll()
        }
        ,
        b.renderAll = function(a) {
            for (var c = b.chartRegistry.list(a), d = 0; d < c.length; ++d)
                c[d].render();
            null !== b._renderlet && b._renderlet(a)
        }
        ,
        b.redrawAll = function(a) {
            for (var c = b.chartRegistry.list(a), d = 0; d < c.length; ++d)
                c[d].redraw();
            null !== b._renderlet && b._renderlet(a)
        }
        ,
        b.transition = function(a, b, c) {
            if (0 >= b || void 0 === b)
                return a;
            var d = a.transition().duration(b);
            return c instanceof Function && c(d),
            d
        }
        ,
        b.units = {},
        b.units.integers = function(a, b) {
            return Math.abs(b - a)
        }
        ,
        b.units.ordinal = function(a, b, c) {
            return c
        }
        ,
        b.units.fp = {},
        b.units.fp.precision = function(a) {
            var c = function(a, d) {
                var e = Math.abs((d - a) / c.resolution);
                return b.utils.isNegligible(e - Math.floor(e)) ? Math.floor(e) : Math.ceil(e)
            };
            return c.resolution = a,
            c
        }
        ,
        b.round = {},
        b.round.floor = function(a) {
            return Math.floor(a)
        }
        ,
        b.round.ceil = function(a) {
            return Math.ceil(a)
        }
        ,
        b.round.round = function(a) {
            return Math.round(a)
        }
        ,
        b.override = function(a, b, c) {
            var d = a[b];
            a["_" + b] = d,
            a[b] = c
        }
        ,
        b.renderlet = function(a) {
            return arguments.length ? (b._renderlet = a,
            b) : b._renderlet
        }
        ,
        b.instanceOfChart = function(a) {
            return a instanceof Object && a.__dc_flag__
        }
        ,
        b.errors = {},
        b.errors.Exception = function(a) {
            var b = void 0 !== a ? a : "Unexpected internal error";
            this.message = b,
            this.toString = function() {
                return b
            }
        }
        ,
        b.errors.InvalidStateException = function() {
            b.errors.Exception.apply(this, arguments)
        }
        ,
        b.dateFormat = a.time.format("%m/%d/%Y"),
        b.printers = {},
        b.printers.filters = function(a) {
            for (var c = "", d = 0; d < a.length; ++d)
                d > 0 && (c += ", "),
                c += b.printers.filter(a[d]);
            return c
        }
        ,
        b.printers.filter = function(a) {
            var c = "";
            return a && (a instanceof Array ? a.length >= 2 ? c = "[" + b.utils.printSingleValue(a[0]) + " -> " + b.utils.printSingleValue(a[1]) + "]" : a.length >= 1 && (c = b.utils.printSingleValue(a[0])) : c = b.utils.printSingleValue(a)),
            c
        }
        ,
        b.utils = {},
        b.utils.printSingleValue = function(a) {
            var c = "" + a;
            return a instanceof Date ? c = b.dateFormat(a) : "string" == typeof a ? c = a : b.utils.isFloat(a) ? c = b.utils.printSingleValue.fformat(a) : b.utils.isInteger(a) && (c = Math.round(a)),
            c
        }
        ,
        b.utils.printSingleValue.fformat = a.format(".2f"),
        b.utils.add = function(a, b) {
            if ("string" == typeof b && (b = b.replace("%", "")),
            a instanceof Date) {
                "string" == typeof b && (b = +b);
                var c = new Date;
                return c.setTime(a.getTime()),
                c.setDate(a.getDate() + b),
                c
            }
            if ("string" == typeof b) {
                var d = +b / 100;
                return a > 0 ? a * (1 + d) : a * (1 - d)
            }
            return a + b
        }
        ,
        b.utils.subtract = function(a, b) {
            if ("string" == typeof b && (b = b.replace("%", "")),
            a instanceof Date) {
                "string" == typeof b && (b = +b);
                var c = new Date;
                return c.setTime(a.getTime()),
                c.setDate(a.getDate() - b),
                c
            }
            if ("string" == typeof b) {
                var d = +b / 100;
                return 0 > a ? a * (1 + d) : a * (1 - d)
            }
            return a - b
        }
        ,
        b.utils.GroupStack = function() {
            function a(a) {
                c[a] || (c[a] = [])
            }
            var b, c = [[]], d = [];
            this.setDataPoint = function(b, d, e) {
                a(b),
                c[b][d] = e
            }
            ,
            this.getDataPoint = function(b, d) {
                a(b);
                var e = c[b][d];
                return void 0 === e && (e = 0),
                e
            }
            ,
            this.addGroup = function(a, c) {
                return c || (c = b),
                d.push([a, c]),
                d.length - 1
            }
            ,
            this.getGroupByIndex = function(a) {
                return d[a][0]
            }
            ,
            this.getAccessorByIndex = function(a) {
                return d[a][1]
            }
            ,
            this.size = function() {
                return d.length
            }
            ,
            this.clear = function() {
                c = [],
                d = []
            }
            ,
            this.setDefaultAccessor = function(a) {
                b = a
            }
            ,
            this.getDataLayers = function() {
                return c
            }
            ,
            this.toLayers = function() {
                for (var a = [], b = 0; b < c.length; ++b) {
                    for (var d = {
                        index: b,
                        points: []
                    }, e = c[b], f = 0; f < e.length; ++f)
                        d.points.push(e[f]);
                    a.push(d)
                }
                return a
            }
        }
        ,
        b.utils.isNumber = function(a) {
            return a === +a
        }
        ,
        b.utils.isFloat = function(a) {
            return a === +a && a !== (0 | a)
        }
        ,
        b.utils.isInteger = function(a) {
            return a === +a && a === (0 | a)
        }
        ,
        b.utils.isNegligible = function(a) {
            return void 0 === a || a < b.constants.NEGLIGIBLE_NUMBER && a > -b.constants.NEGLIGIBLE_NUMBER
        }
        ,
        b.utils.groupMax = function(c, d) {
            var e = a.max(c.all(), function(a) {
                return d(a)
            });
            return b.utils.isNegligible(e) && (e = 0),
            e
        }
        ,
        b.utils.groupMin = function(c, d) {
            var e = a.min(c.all(), function(a) {
                return d(a)
            });
            return b.utils.isNegligible(e) && (e = 0),
            e
        }
        ,
        b.utils.nameToId = function(a) {
            return a.toLowerCase().replace(/[\s]/g, "_").replace(/[\.']/g, "")
        }
        ,
        b.utils.appendOrSelect = function(a, b) {
            var c = a.select(b);
            return c.empty() && (c = a.append(b)),
            c
        }
        ,
        b.utils.createLegendable = function(a, b, c, d) {
            var e = {
                name: a._getGroupName(b, d),
                data: b
            };
            return "function" == typeof a.colors && (e.color = a.colors()(c)),
            e
        }
        ,
        b.utils.safeNumber = function(a) {
            return b.utils.isNumber(+a) ? +a : 0
        }
        ,
        b.events = {
            current: null
        },
        b.events.trigger = function(a, c) {
            return c ? (b.events.current = a,
            void setTimeout(function() {
                a == b.events.current && a()
            }, c)) : void a()
        }
        ,
        b.cumulative = {},
        b.cumulative.Base = function() {
            this._keyIndex = [],
            this._map = {},
            this.sanitizeKey = function(a) {
                return a += ""
            }
            ,
            this.clear = function() {
                this._keyIndex = [],
                this._map = {}
            }
            ,
            this.size = function() {
                return this._keyIndex.length
            }
            ,
            this.getValueByKey = function(a) {
                a = this.sanitizeKey(a);
                var b = this._map[a];
                return b
            }
            ,
            this.setValueByKey = function(a, b) {
                return a = this.sanitizeKey(a),
                this._map[a] = b
            }
            ,
            this.indexOfKey = function(a) {
                return a = this.sanitizeKey(a),
                this._keyIndex.indexOf(a)
            }
            ,
            this.addToIndex = function(a) {
                a = this.sanitizeKey(a),
                this._keyIndex.push(a)
            }
            ,
            this.getKeyByIndex = function(a) {
                return this._keyIndex[a]
            }
        }
        ,
        b.cumulative.Sum = function() {
            b.cumulative.Base.apply(this, arguments),
            this.add = function(a, b) {
                b || (b = 0),
                void 0 === this.getValueByKey(a) ? (this.addToIndex(a),
                this.setValueByKey(a, b)) : this.setValueByKey(a, this.getValueByKey(a) + b)
            }
            ,
            this.minus = function(a, b) {
                this.setValueByKey(a, this.getValueByKey(a) - b)
            }
            ,
            this.cumulativeSum = function(a) {
                var b = this.indexOfKey(a);
                if (0 > b)
                    return 0;
                for (var c = 0, d = 0; b >= d; ++d) {
                    var e = this.getKeyByIndex(d);
                    c += this.getValueByKey(e)
                }
                return c
            }
        }
        ,
        b.cumulative.Sum.prototype = new b.cumulative.Base,
        b.cumulative.CountUnique = function() {
            function a(a) {
                var b, c = 0;
                for (b in a)
                    a.hasOwnProperty(b) && c++;
                return c
            }
            b.cumulative.Base.apply(this, arguments),
            this.add = function(a, b) {
                void 0 === this.getValueByKey(a) && (this.setValueByKey(a, {}),
                this.addToIndex(a)),
                void 0 !== b && (void 0 === this.getValueByKey(a)[b] && (this.getValueByKey(a)[b] = 0),
                this.getValueByKey(a)[b] += 1)
            }
            ,
            this.minus = function(a, b) {
                this.getValueByKey(a)[b] -= 1,
                this.getValueByKey(a)[b] <= 0 && delete this.getValueByKey(a)[b]
            }
            ,
            this.count = function(b) {
                return a(this.getValueByKey(b))
            }
            ,
            this.cumulativeCount = function(a) {
                var b = this.indexOfKey(a);
                if (0 > b)
                    return 0;
                for (var c = 0, d = 0; b >= d; ++d) {
                    var e = this.getKeyByIndex(d);
                    c += this.count(e)
                }
                return c
            }
        }
        ,
        b.cumulative.CountUnique.prototype = new b.cumulative.Base,
        b.baseChart = function(c) {
            function d(a, b, c) {
                var d = a.anchor()
                  , e = "__names__";
                c && c != a.valueAccessor() || (c = "default"),
                b[e] || (b[e] = {}),
                b[e][d] || (b[e][d] = {
                    a: [],
                    n: []
                });
                var f = b[e][d].a.indexOf(c);
                return -1 == f && (f = b[e][d].a.length,
                b[e][d].a[f] = c,
                b[e][d].n[f] = {
                    name: ""
                }),
                b[e][d].n[f]
            }
            function e() {
                return o = c.root().append("svg").attr("width", c.width()).attr("height", c.height())
            }
            function f(a) {
                F.splice(F.indexOf(a), 1),
                i(),
                c._invokeFilteredListener(a)
            }
            function g(a) {
                F.push(a),
                i(),
                c._invokeFilteredListener(a)
            }
            function h() {
                F = [],
                i(),
                c._invokeFilteredListener(null)
            }
            function i() {
                if (c.dataSet() && void 0 !== c.dimension().filter) {
                    var a = G(c.dimension(), F);
                    F = a ? a : F
                }
            }
            function j() {
                for (var a = 0; a < B.length; ++a)
                    B[a](c)
            }
            c.__dc_flag__ = !0;
            var k, l, m, n, o, p, q = 200, r = 200, s = function(a) {
                return a.key
            }, t = function(a) {
                return a.value
            }, u = function(a) {
                return a.key
            }, v = function(a) {
                return a.key
            }, w = !1, x = function(a) {
                return a.key + ": " + a.value
            }, y = !1, z = 750, A = b.printers.filters, B = [], C = b.constants.DEFAULT_CHART_GROUP, D = function() {}, E = {
                preRender: D,
                postRender: D,
                preRedraw: D,
                postRedraw: D,
                filtered: D,
                zoomed: D
            }, F = [], G = function(a, b) {
                return a.filter(null),
                0 === b.length ? a.filter(null) : 1 === b.length ? a.filter(b[0]) : a.filterFunction(function(a) {
                    return b.indexOf(a) >= 0
                }),
                b
            };
            return c.width = function(a) {
                return arguments.length ? (q = a,
                c) : q
            }
            ,
            c.height = function(a) {
                return arguments.length ? (r = a,
                c) : r
            }
            ,
            c.dimension = function(a) {
                return arguments.length ? (k = a,
                c.expireCache(),
                c) : k
            }
            ,
            c.group = function(a, b) {
                return arguments.length ? (l = a,
                c.expireCache(),
                "string" == typeof b && c._setGroupName(l, b),
                c) : l
            }
            ,
            c._getGroupName = function(a, b) {
                return d(c, a, b).name
            }
            ,
            c._setGroupName = function(a, b, e) {
                d(c, a, e).name = b
            }
            ,
            c.ordering = function(a) {
                return arguments.length ? (u = a,
                c.expireCache(),
                c) : u
            }
            ,
            c.computeOrderedGroups = function(a) {
                var b = a ? a : c.group().all().slice(0);
                if (b.length < 2)
                    return b;
                var d = crossfilter.quicksort.by(c.ordering());
                return d(b, 0, b.length)
            }
            ,
            c.filterAll = function() {
                return c.filter(null)
            }
            ,
            c.dataSet = function() {
                return void 0 !== k && void 0 !== l
            }
            ,
            c.select = function(a) {
                return n.select(a)
            }
            ,
            c.selectAll = function(a) {
                return n ? n.selectAll(a) : null
            }
            ,
            c.anchor = function(d, e) {
                return arguments.length ? (b.instanceOfChart(d) ? (m = d.anchor(),
                n = d.root()) : (m = d,
                n = a.select(m),
                n.classed(b.constants.CHART_CLASS, !0),
                b.registerChart(c, e)),
                C = e,
                c) : m
            }
            ,
            c.anchorName = function() {
                var a = c.anchor();
                return a && a.id ? a.id : a ? a.replace("#", "") : ""
            }
            ,
            c.root = function(a) {
                return arguments.length ? (n = a,
                c) : n
            }
            ,
            c.svg = function(a) {
                return arguments.length ? (o = a,
                c) : o
            }
            ,
            c.resetSvg = function() {
                return c.select("svg").remove(),
                e()
            }
            ,
            c.filterPrinter = function(a) {
                return arguments.length ? (A = a,
                c) : A
            }
            ,
            c.turnOnControls = function() {
                return n && (c.selectAll(".reset").style("display", null),
                c.selectAll(".filter").text(A(c.filters())).style("display", null)),
                c
            }
            ,
            c.turnOffControls = function() {
                return n && (c.selectAll(".reset").style("display", "none"),
                c.selectAll(".filter").style("display", "none").text(c.filter())),
                c
            }
            ,
            c.transitionDuration = function(a) {
                return arguments.length ? (z = a,
                c) : z
            }
            ,
            c.render = function() {
                if (E.preRender(c),
                void 0 === k)
                    throw new b.errors.InvalidStateException("Mandatory attribute chart.dimension is missing on chart[#" + c.anchorName() + "]");
                if (void 0 === l)
                    throw new b.errors.InvalidStateException("Mandatory attribute chart.group is missing on chart[#" + c.anchorName() + "]");
                var a = c.doRender();
                return p && p.render(),
                c.activateRenderlets("postRender"),
                a
            }
            ,
            c.activateRenderlets = function(a) {
                c.transitionDuration() > 0 && o ? o.transition().duration(c.transitionDuration()).each("end", function() {
                    j(),
                    a && E[a](c)
                }) : (j(),
                a && E[a](c))
            }
            ,
            c.redraw = function() {
                E.preRedraw(c);
                var a = c.doRedraw();
                return c.activateRenderlets("postRedraw"),
                a
            }
            ,
            c._invokeFilteredListener = function(a) {
                void 0 !== a && E.filtered(c, a)
            }
            ,
            c._invokeZoomedListener = function() {
                E.zoomed(c)
            }
            ,
            c.hasFilter = function(a) {
                return arguments.length ? F.indexOf(a) >= 0 : F.length > 0
            }
            ,
            c.filter = function(a) {
                return arguments.length ? (null === a ? h() : c.hasFilter(a) ? f(a) : g(a),
                null !== n && c.hasFilter() ? c.turnOnControls() : c.turnOffControls(),
                c) : F.length > 0 ? F[0] : null
            }
            ,
            c.filters = function() {
                return F
            }
            ,
            c.highlightSelected = function(c) {
                a.select(c).classed(b.constants.SELECTED_CLASS, !0),
                a.select(c).classed(b.constants.DESELECTED_CLASS, !1)
            }
            ,
            c.fadeDeselected = function(c) {
                a.select(c).classed(b.constants.SELECTED_CLASS, !1),
                a.select(c).classed(b.constants.DESELECTED_CLASS, !0)
            }
            ,
            c.resetHighlight = function(c) {
                a.select(c).classed(b.constants.SELECTED_CLASS, !1),
                a.select(c).classed(b.constants.DESELECTED_CLASS, !1)
            }
            ,
            c.onClick = function(a) {
                var d = c.keyAccessor()(a);
                b.events.trigger(function() {
                    c.filter(d),
                    b.redrawAll(c.chartGroup())
                })
            }
            ,
            c.filterHandler = function(a) {
                return arguments.length ? (G = a,
                c) : G
            }
            ,
            c.doRender = function() {
                return c
            }
            ,
            c.doRedraw = function() {
                return c
            }
            ,
            c.legendables = function() {
                return []
            }
            ,
            c.legendHighlight = function() {}
            ,
            c.legendReset = function() {}
            ,
            c.keyAccessor = function(a) {
                return arguments.length ? (s = a,
                c) : s
            }
            ,
            c.valueAccessor = function(a) {
                return arguments.length ? (t = a,
                c) : t
            }
            ,
            c.label = function(a) {
                return arguments.length ? (v = a,
                w = !0,
                c) : v
            }
            ,
            c.renderLabel = function(a) {
                return arguments.length ? (w = a,
                c) : w
            }
            ,
            c.title = function(a) {
                return arguments.length ? (x = a,
                y = !0,
                c) : x
            }
            ,
            c.renderTitle = function(a) {
                return arguments.length ? (y = a,
                c) : y
            }
            ,
            c.renderlet = function(a) {
                return B.push(a),
                c
            }
            ,
            c.chartGroup = function(a) {
                return arguments.length ? (C = a,
                c) : C
            }
            ,
            c.expireCache = function() {
                return c
            }
            ,
            c.legend = function(a) {
                return arguments.length ? (p = a,
                p.parent(c),
                c) : p
            }
            ,
            c.on = function(a, b) {
                return E[a] = b,
                c
            }
            ,
            c
        }
        ,
        b.marginable = function(a) {
            var b = {
                top: 10,
                right: 50,
                bottom: 30,
                left: 30
            };
            return a.margins = function(c) {
                return arguments.length ? (b = c,
                a) : b
            }
            ,
            a.effectiveWidth = function() {
                return a.width() - a.margins().left - a.margins().right
            }
            ,
            a.effectiveHeight = function() {
                return a.height() - a.margins().top - a.margins().bottom
            }
            ,
            a
        }
        ,
        b.coordinateGridChart = function(c) {
            function d(a) {
                c.elasticX() && !c.isOrdinal() ? x.domain([c.xAxisMin(), c.xAxisMax()]) : c.isOrdinal() && 0 === x.domain().length && x.domain(c.computeOrderedGroups().map(function(a) {
                    return a.key
                })),
                c.isOrdinal() ? c.prepareOrdinalXAxis() : x.range([0, c.xAxisLength()]),
                G = G.scale(c.x()).orient("bottom"),
                e(a)
            }
            function e(a) {
                var d = a.selectAll("g." + q);
                if (S) {
                    d.empty() && (d = a.insert("g", ":first-child").attr("class", o + " " + q).attr("transform", "translate(" + c.yAxisX() + "," + c.margins().top + ")"));
                    var e = G.tickValues() ? G.tickValues() : x.ticks(G.ticks()[0])
                      , f = d.selectAll("line").data(e)
                      , g = f.enter().append("line").attr("x1", function(a) {
                        return x(a)
                    }).attr("y1", c.xAxisY() - c.margins().top).attr("x2", function(a) {
                        return x(a)
                    }).attr("y2", 0).attr("opacity", 0);
                    b.transition(g, c.transitionDuration()).attr("opacity", 1),
                    b.transition(f, c.transitionDuration()).attr("x1", function(a) {
                        return x(a)
                    }).attr("y1", c.xAxisY() - c.margins().top).attr("x2", function(a) {
                        return x(a)
                    }).attr("y2", 0),
                    f.exit().remove()
                } else
                    d.selectAll("line").remove()
            }
            function f(b) {
                (void 0 === A || c.elasticY()) && (A = a.scale.linear(),
                A.domain([c.yAxisMin(), c.yAxisMax()]).rangeRound([c.yAxisHeight(), 0])),
                A.range([c.yAxisHeight(), 0]),
                L = L.scale(A).orient("left"),
                g(b)
            }
            function g(a) {
                var d = a.selectAll("g." + p);
                if (R) {
                    var e = L.tickValues() ? L.tickValues() : A.ticks(L.ticks()[0]);
                    d.empty() && (d = a.insert("g", ":first-child").attr("class", o + " " + p).attr("transform", "translate(" + c.yAxisX() + "," + c.margins().top + ")"));
                    var f = d.selectAll("line").data(e)
                      , g = f.enter().append("line").attr("x1", 1).attr("y1", function(a) {
                        return A(a)
                    }).attr("x2", c.xAxisLength()).attr("y2", function(a) {
                        return A(a)
                    }).attr("opacity", 0);
                    b.transition(g, c.transitionDuration()).attr("opacity", 1),
                    b.transition(f, c.transitionDuration()).attr("x1", 1).attr("y1", function(a) {
                        return A(a)
                    }).attr("x2", c.xAxisLength()).attr("y2", function(a) {
                        return A(a)
                    }),
                    f.exit().remove()
                } else
                    d.selectAll("line").remove()
            }
            function h() {
                return c.xAxisY() - c.margins().top
            }
            function i() {
                var a = c.extendBrush();
                c.redrawBrush(v),
                c.brushIsEmpty(a) ? b.events.trigger(function() {
                    c.filter(null),
                    b.redrawAll(c.chartGroup())
                }) : b.events.trigger(function() {
                    c.filter(null),
                    c.filter([a[0], a[1]]),
                    b.redrawAll(c.chartGroup())
                }, b.constants.EVENT_DELAY)
            }
            function j() {
                return c.anchorName() + "-clip"
            }
            function k() {
                var a = b.utils.appendOrSelect(u, "defs")
                  , d = b.utils.appendOrSelect(a, "clipPath").attr("id", j())
                  , e = 2 * X;
                b.utils.appendOrSelect(d, "rect").attr("width", c.xAxisLength() + e).attr("height", c.yAxisHeight() + e)
            }
            function l() {
                W && c.root().call(a.behavior.zoom().x(c.x()).scaleExtent(U).on("zoom", function() {
                    c.focus(c.x().domain()),
                    c._invokeZoomedListener(),
                    m()
                }))
            }
            function m() {
                if (E) {
                    var a = c.x().domain();
                    if (V) {
                        var d = E.xOriginalDomain()
                          , e = [a[0] < d[0] ? a[0] : d[0], a[1] > d[1] ? a[1] : d[1]];
                        E.focus(e)
                    } else
                        E.focus(a);
                    E.filter(null),
                    E.filter(a),
                    b.events.trigger(function() {
                        b.redrawAll(c.chartGroup())
                    })
                }
            }
            function n(a) {
                return a instanceof Array && a.length > 1
            }
            var o = "grid-line"
              , p = "horizontal"
              , q = "vertical"
              , r = "y-axis-label"
              , s = "x-axis-label"
              , t = 12;
            c = b.colorChart(b.marginable(b.baseChart(c))),
            c.colors(a.scale.category10());
            var u, v, w, x, y, z, A, B, C, D, E, F, G = a.svg.axis(), H = b.units.integers, I = 0, J = !1, K = 0, L = a.svg.axis(), M = 0, N = !1, O = 0, P = a.svg.brush(), Q = !0, R = !1, S = !1, T = !1, U = [-10, 100], V = !0, W = !1, X = 0;
            return c.title(function(a) {
                return a.data.key + ": " + a.data.value
            }),
            c.rescale = function() {
                D = void 0,
                c.xUnitCount()
            }
            ,
            c.rangeChart = function(a) {
                return arguments.length ? (E = a,
                E.focusChart(c),
                c) : E
            }
            ,
            c.zoomScale = function(a) {
                return arguments.length ? (U = a,
                c) : U
            }
            ,
            c.zoomOutRestrict = function(a) {
                return arguments.length ? (V = a,
                c) : V
            }
            ,
            c._generateG = function(a) {
                return u = void 0 === a ? c.svg() : a,
                v = u.append("g"),
                w = v.append("g").attr("class", "chart-body").attr("transform", "translate(" + c.margins().left + ", " + c.margins().top + ")").attr("clip-path", "url(#" + j() + ")"),
                v
            }
            ,
            c.g = function(a) {
                return arguments.length ? (v = a,
                c) : v
            }
            ,
            c.mouseZoomable = function(a) {
                return arguments.length ? (W = a,
                c) : W
            }
            ,
            c.chartBodyG = function(a) {
                return arguments.length ? (w = a,
                c) : w
            }
            ,
            c.x = function(a) {
                return arguments.length ? (x = a,
                y = x.domain(),
                c) : x
            }
            ,
            c.xOriginalDomain = function() {
                return y
            }
            ,
            c.xUnits = function(a) {
                return arguments.length ? (H = a,
                c) : H
            }
            ,
            c.xAxis = function(a) {
                return arguments.length ? (G = a,
                c) : G
            }
            ,
            c.elasticX = function(a) {
                return arguments.length ? (J = a,
                c) : J
            }
            ,
            c.xAxisPadding = function(a) {
                return arguments.length ? (I = a,
                c) : I
            }
            ,
            c.xUnitCount = function() {
                if (void 0 === D) {
                    var a = c.xUnits()(c.x().domain()[0], c.x().domain()[1], c.x().domain());
                    D = a instanceof Array ? a.length : a
                }
                return D
            }
            ,
            c.isOrdinal = function() {
                return c.xUnits() === b.units.ordinal
            }
            ,
            c.prepareOrdinalXAxis = function(a) {
                a || (a = c.xUnitCount());
                for (var b = [], d = c.xAxisLength() / (a + 1), e = d / 2, f = 0; a > f; f++)
                    b[f] = e,
                    e += d;
                x.range(b)
            }
            ,
            c.renderXAxis = function(a) {
                var d = a.selectAll("g.x");
                d.empty() && (d = a.append("g").attr("class", "axis x").attr("transform", "translate(" + c.margins().left + "," + c.xAxisY() + ")"));
                var e = a.selectAll("text." + s);
                e.empty() && c.xAxisLabel() && (e = a.append("text").attr("transform", "translate(" + c.xAxisLength() / 2 + "," + (c.height() - K) + ")").attr("class", s).attr("text-anchor", "middle").text(c.xAxisLabel())),
                c.xAxisLabel() && e.text() != c.xAxisLabel() && axisYLab.text(c.xAxisLabel()),
                b.transition(d, c.transitionDuration()).call(G)
            }
            ,
            c.xAxisY = function() {
                return c.height() - c.margins().bottom
            }
            ,
            c.xAxisLength = function() {
                return c.effectiveWidth()
            }
            ,
            c.xAxisLabel = function(a, b) {
                return arguments.length ? (z = a,
                c.margins().bottom -= K,
                K = void 0 === b ? t : b,
                c.margins().bottom += K,
                c) : z
            }
            ,
            c.renderYAxis = function(a) {
                var d = a.selectAll("g.y");
                d.empty() && (d = a.append("g").attr("class", "axis y").attr("transform", "translate(" + c.yAxisX() + "," + c.margins().top + ")"));
                var e = a.selectAll("text." + r);
                e.empty() && c.yAxisLabel() && (e = a.append("text").attr("transform", "translate(" + O + "," + c.yAxisHeight() / 2 + "),rotate(-90)").attr("class", r).attr("text-anchor", "middle").text(c.yAxisLabel())),
                c.yAxisLabel() && e.text() != c.yAxisLabel() && e.text(c.yAxisLabel()),
                b.transition(d, c.transitionDuration()).call(L)
            }
            ,
            c.yAxisX = function() {
                return c.margins().left
            }
            ,
            c.yAxisLabel = function(a, b) {
                return arguments.length ? (B = a,
                c.margins().left -= O,
                O = void 0 === b ? t : b,
                c.margins().left += O,
                c) : B
            }
            ,
            c.y = function(a) {
                return arguments.length ? (A = a,
                c) : A
            }
            ,
            c.yAxis = function(a) {
                return arguments.length ? (L = a,
                c) : L
            }
            ,
            c.elasticY = function(a) {
                return arguments.length ? (N = a,
                c) : N
            }
            ,
            c.renderHorizontalGridLines = function(a) {
                return arguments.length ? (R = a,
                c) : R
            }
            ,
            c.renderVerticalGridLines = function(a) {
                return arguments.length ? (S = a,
                c) : S
            }
            ,
            c.xAxisMin = function() {
                var d = a.min(c.group().all(), function(a) {
                    return c.keyAccessor()(a)
                });
                return b.utils.subtract(d, I)
            }
            ,
            c.xAxisMax = function() {
                var d = a.max(c.group().all(), function(a) {
                    return c.keyAccessor()(a)
                });
                return b.utils.add(d, I)
            }
            ,
            c.yAxisMin = function() {
                var d = a.min(c.group().all(), function(a) {
                    return c.valueAccessor()(a)
                });
                return d = b.utils.subtract(d, M)
            }
            ,
            c.yAxisMax = function() {
                var d = a.max(c.group().all(), function(a) {
                    return c.valueAccessor()(a)
                });
                return d = b.utils.add(d, M)
            }
            ,
            c.yAxisPadding = function(a) {
                return arguments.length ? (M = a,
                c) : M
            }
            ,
            c.yAxisHeight = function() {
                return c.effectiveHeight()
            }
            ,
            c.round = function(a) {
                return arguments.length ? (C = a,
                c) : C
            }
            ,
            b.override(c, "filter", function(a) {
                return arguments.length ? (c._filter(a),
                a ? c.brush().extent(a) : c.brush().clear(),
                c) : c._filter()
            }),
            c.brush = function(a) {
                return arguments.length ? (P = a,
                c) : P
            }
            ,
            c.renderBrush = function(a) {
                if (c.isOrdinal() && (Q = !1),
                Q) {
                    P.on("brush", i);
                    var b = a.append("g").attr("class", "brush").attr("transform", "translate(" + c.margins().left + "," + c.margins().top + ")").call(P.x(c.x()));
                    b.selectAll("rect").attr("height", h()),
                    b.selectAll(".resize").append("path").attr("d", c.resizeHandlePath),
                    c.hasFilter() && c.redrawBrush(a)
                }
            }
            ,
            c.extendBrush = function() {
                var a = P.extent();
                return c.round() && (a[0] = a.map(c.round())[0],
                a[1] = a.map(c.round())[1],
                v.select(".brush").call(P.extent(a))),
                a
            }
            ,
            c.brushIsEmpty = function(a) {
                return P.empty() || !a || a[1] <= a[0]
            }
            ,
            c.redrawBrush = function(a) {
                if (Q) {
                    c.filter() && c.brush().empty() && c.brush().extent(c.filter());
                    var b = a.select("g.brush");
                    b.call(c.brush().x(c.x())),
                    b.selectAll("rect").attr("height", h())
                }
                c.fadeDeselectedArea()
            }
            ,
            c.fadeDeselectedArea = function() {}
            ,
            c.resizeHandlePath = function(a) {
                var b = +("e" == a)
                  , c = b ? 1 : -1
                  , d = h() / 3;
                return "M" + .5 * c + "," + d + "A6,6 0 0 " + b + " " + 6.5 * c + "," + (d + 6) + "V" + (2 * d - 6) + "A6,6 0 0 " + b + " " + .5 * c + "," + 2 * d + "ZM" + 2.5 * c + "," + (d + 8) + "V" + (2 * d - 8) + "M" + 4.5 * c + "," + (d + 8) + "V" + (2 * d - 8)
            }
            ,
            c.clipPadding = function(a) {
                return arguments.length ? (X = a,
                c) : X
            }
            ,
            c.doRender = function() {
                if (void 0 === x)
                    throw new b.errors.InvalidStateException("Mandatory attribute chart.x is missing on chart[#" + c.anchorName() + "]");
                return c.resetSvg(),
                c.dataSet() && (c._generateG(),
                k(),
                d(c.g()),
                f(c.g()),
                c.plotData(),
                c.renderXAxis(c.g()),
                c.renderYAxis(c.g()),
                c.renderBrush(c.g()),
                l()),
                c
            }
            ,
            c.doRedraw = function() {
                return d(c.g()),
                f(c.g()),
                c.plotData(),
                c.elasticY() && c.renderYAxis(c.g()),
                (c.elasticX() || T) && c.renderXAxis(c.g()),
                c.redrawBrush(c.g()),
                c
            }
            ,
            c.subRender = function() {
                return c.dataSet() && c.plotData(),
                c
            }
            ,
            c.brushOn = function(a) {
                return arguments.length ? (Q = a,
                c) : Q
            }
            ,
            c.focus = function(a) {
                T = !0,
                c.x().domain(n(a) ? a : c.xOriginalDomain()),
                c.rescale(),
                c.redraw(),
                n(a) || (T = !1)
            }
            ,
            c.refocused = function() {
                return T
            }
            ,
            c.focusChart = function(a) {
                return arguments.length ? (F = a,
                c.on("filtered", function(a) {
                    b.events.trigger(function() {
                        F.focus(a.filter()),
                        F.filter(a.filter()),
                        b.redrawAll(a.chartGroup())
                    })
                }),
                c) : F
            }
            ,
            c
        }
        ,
        b.colorChart = function(c) {
            var d = a.scale.category20c()
              , e = [0, d.range().length]
              , f = function(a) {
                var f = e;
                "function" == typeof e && (f = e.call(c));
                var g = f[0]
                  , h = f[1];
                if (isNaN(a) && (a = 0),
                !b.utils.isNumber(h))
                    return d(a);
                var i = c.colors().range().length
                  , j = (h - g) / i
                  , k = Math.abs(Math.min(i - 1, Math.round((a - g) / j)));
                return c.colors()(k)
            }
              , g = function(a, b) {
                return b
            };
            return c.colors = function(b) {
                if (!arguments.length)
                    return d;
                if (b instanceof Array) {
                    d = a.scale.ordinal().range(b);
                    for (var f = [], g = 0; g < b.length; ++g)
                        f.push(g);
                    d.domain(f)
                } else
                    d = b;
                return e = [0, d.range().length],
                c
            }
            ,
            c.colorCalculator = function(a) {
                return arguments.length ? (f = a,
                c) : f
            }
            ,
            c.getColor = function(a, b) {
                return f(g(a, b))
            }
            ,
            c.colorAccessor = function(a) {
                return arguments.length ? (g = a,
                c) : g
            }
            ,
            c.colorDomain = function(a) {
                return arguments.length ? (e = a,
                c) : e
            }
            ,
            c
        }
        ,
        b.stackableChart = function(c) {
            function d() {
                var b = [];
                if (c.x()) {
                    var d, e = c.x().domain();
                    if (c.isOrdinal()) {
                        var f = a.set(e);
                        d = function(a) {
                            return f.has(a.x)
                        }
                    } else
                        d = function(a) {
                            return a.x >= e[0] && a.x <= e[e.length - 1]
                        }
                        ;
                    c.stackLayers().forEach(function(a) {
                        a.points.forEach(function(a) {
                            d(a) && b.push(a)
                        })
                    })
                } else
                    c.stackLayers().forEach(function(a) {
                        b = b.concat(a.points)
                    });
                return b
            }
            function e(a, b) {
                return c.getKeyAccessorByIndex(a)(b)
            }
            function f(a, b) {
                return c.getValueAccessorByIndex(a)(b)
            }
            function g(a, b) {
                for (var c = 0; c < a.length; ++c) {
                    var d = a[c]
                      , g = e(b, d)
                      , h = f(b, d);
                    l.setDataPoint(b, c, {
                        data: d,
                        x: g,
                        y: h,
                        layer: b
                    })
                }
            }
            var h, i, j, k, l = new b.utils.GroupStack, m = a.layout.stack().offset("zero").order("default").values(function(a) {
                return a.points
            });
            return c.stack = function(a, b, d) {
                return arguments.length || l.clear(),
                "string" == typeof b ? c._setGroupName(a, b, d) : "function" == typeof b && (d = b),
                l.setDefaultAccessor(c.valueAccessor()),
                l.addGroup(a, d),
                c.expireCache(),
                c
            }
            ,
            c.expireCache = function() {
                return h = null,
                i = null,
                j = null,
                k = null,
                c
            }
            ,
            c.allGroups = function() {
                if (null === h) {
                    h = [],
                    h.push(c.group());
                    for (var a = 0; a < l.size(); ++a)
                        h.push(l.getGroupByIndex(a))
                }
                return h
            }
            ,
            c.allValueAccessors = function() {
                if (null === i) {
                    i = [],
                    i.push(c.valueAccessor());
                    for (var a = 0; a < l.size(); ++a)
                        i.push(l.getAccessorByIndex(a))
                }
                return i
            }
            ,
            c.getValueAccessorByIndex = function(a) {
                return c.allValueAccessors()[a]
            }
            ,
            c.yAxisMin = function() {
                var e, f = d();
                return e = a.min(f, function(a) {
                    return a.y + a.y0 < a.y0 ? a.y + a.y0 : a.y0
                }),
                e = b.utils.subtract(e, c.yAxisPadding())
            }
            ,
            c.yAxisMax = function() {
                var e, f = d();
                return e = a.max(f, function(a) {
                    return a.y + a.y0
                }),
                e = b.utils.add(e, c.yAxisPadding())
            }
            ,
            c.allKeyAccessors = function() {
                if (null === j) {
                    j = [],
                    j.push(c.keyAccessor());
                    for (var a = 0; a < l.size(); ++a)
                        j.push(c.keyAccessor())
                }
                return j
            }
            ,
            c.getKeyAccessorByIndex = function(a) {
                return c.allKeyAccessors()[a]
            }
            ,
            c.xAxisMin = function() {
                for (var a = null, d = c.allGroups(), e = 0; e < d.length; ++e) {
                    var f = d[e]
                      , g = b.utils.groupMin(f, c.getKeyAccessorByIndex(e));
                    (null === a || a > g) && (a = g)
                }
                return b.utils.subtract(a, c.xAxisPadding())
            }
            ,
            c.xAxisMax = function() {
                for (var a = null, d = c.allGroups(), e = 0; e < d.length; ++e) {
                    var f = d[e]
                      , g = b.utils.groupMax(f, c.getKeyAccessorByIndex(e));
                    (null === a || g > a) && (a = g)
                }
                return b.utils.add(a, c.xAxisPadding())
            }
            ,
            c.calculateDataPointMatrixForAll = function() {
                for (var a = c.allGroups(), b = 0; b < a.length; ++b) {
                    var d = a[b]
                      , e = d.all();
                    g(e, b)
                }
            }
            ,
            c.getChartStack = function() {
                return l
            }
            ,
            b.override(c, "valueAccessor", function(a) {
                return arguments.length ? (c.expireCache(),
                c._valueAccessor(a)) : c._valueAccessor()
            }),
            b.override(c, "keyAccessor", function(a) {
                return arguments.length ? (c.expireCache(),
                c._keyAccessor(a)) : c._keyAccessor()
            }),
            c.stackLayout = function(a) {
                return arguments.length ? (m = a,
                c) : m
            }
            ,
            c.stackLayers = function(a) {
                return arguments.length ? void (k = a) : (null === k && (c.calculateDataPointMatrixForAll(),
                k = c.stackLayout()(l.toLayers())),
                k)
            }
            ,
            c.colorAccessor(function(a) {
                return a.layer || a.index
            }),
            c.legendables = function() {
                var a = [];
                return h.forEach(function(d, e) {
                    a.push(b.utils.createLegendable(c, d, e, c.getValueAccessorByIndex(e)))
                }),
                a
            }
            ,
            c
        }
        ,
        b.abstractBubbleChart = function(c) {
            var d = .3
              , e = 10;
            c.BUBBLE_NODE_CLASS = "node",
            c.BUBBLE_CLASS = "bubble",
            c.MIN_RADIUS = 10,
            c = b.colorChart(c),
            c.renderLabel(!0),
            c.renderTitle(!1);
            var f = a.scale.linear().domain([0, 100])
              , g = function(a) {
                return a.r
            };
            c.r = function(a) {
                return arguments.length ? (f = a,
                c) : f
            }
            ,
            c.radiusValueAccessor = function(a) {
                return arguments.length ? (g = a,
                c) : g
            }
            ,
            c.rMin = function() {
                var b = a.min(c.group().all(), function(a) {
                    return c.radiusValueAccessor()(a)
                });
                return b
            }
            ,
            c.rMax = function() {
                var b = a.max(c.group().all(), function(a) {
                    return c.radiusValueAccessor()(a)
                });
                return b
            }
            ,
            c.bubbleR = function(a) {
                var b = c.radiusValueAccessor()(a)
                  , d = c.r()(b);
                return (isNaN(d) || 0 >= b) && (d = 0),
                d
            }
            ;
            var h = function(a) {
                return c.label()(a)
            }
              , i = function(a) {
                return c.bubbleR(a) > e ? 1 : 0
            };
            c.doRenderLabel = function(a) {
                if (c.renderLabel()) {
                    var d = a.select("text");
                    d.empty() && (d = a.append("text").attr("text-anchor", "middle").attr("dy", ".3em").on("click", c.onClick)),
                    d.attr("opacity", 0).text(h),
                    b.transition(d, c.transitionDuration()).attr("opacity", i)
                }
            }
            ,
            c.doUpdateLabels = function(a) {
                if (c.renderLabel()) {
                    var d = a.selectAll("text").text(h);
                    b.transition(d, c.transitionDuration()).attr("opacity", i)
                }
            }
            ;
            var j = function(a) {
                return c.title()(a)
            };
            return c.doRenderTitles = function(a) {
                if (c.renderTitle()) {
                    var b = a.select("title");
                    b.empty() && a.append("title").text(j)
                }
            }
            ,
            c.doUpdateTitles = function(a) {
                c.renderTitle() && a.selectAll("title").text(j)
            }
            ,
            c.minRadiusWithLabel = function(a) {
                return arguments.length ? (e = a,
                c) : e
            }
            ,
            c.maxBubbleRelativeSize = function(a) {
                return arguments.length ? (d = a,
                c) : d
            }
            ,
            c.initBubbleColor = function(a, d) {
                return this[b.constants.NODE_INDEX_NAME] = d,
                c.getColor(a, d)
            }
            ,
            c.updateBubbleColor = function(a) {
                return c.getColor(a, this[b.constants.NODE_INDEX_NAME])
            }
            ,
            c.fadeDeselectedArea = function() {
                c.selectAll("g." + c.BUBBLE_NODE_CLASS).each(c.hasFilter() ? function(a) {
                    c.isSelectedNode(a) ? c.highlightSelected(this) : c.fadeDeselected(this)
                }
                : function() {
                    c.resetHighlight(this)
                }
                )
            }
            ,
            c.isSelectedNode = function(a) {
                return c.hasFilter(a.key)
            }
            ,
            c.onClick = function(a) {
                var d = a.key;
                b.events.trigger(function() {
                    c.filter(d),
                    b.redrawAll(c.chartGroup())
                })
            }
            ,
            c
        }
        ,
        b.pieChart = function(c, d) {
            function e() {
                if (D.dataSet()) {
                    var b = q();
                    x = x ? x : a.min([D.width(), D.height()]) / 2;
                    var c = D.buildArcs()
                      , d = b(D.assembleCappedData());
                    if (y) {
                        var e = y.selectAll("g." + A).data(d);
                        f(e, c, d),
                        k(d, c),
                        o(e),
                        p()
                    }
                }
            }
            function f(a, b, c) {
                var d = g(a);
                h(d, b),
                i(d),
                j(c, b)
            }
            function g(a) {
                var b = a.enter().append("g").attr("class", function(a, b) {
                    return A + " _" + b
                });
                return b
            }
            function h(a, b) {
                var c = a.append("path").attr("fill", function(a, b) {
                    return D.getColor(a, b)
                }).on("click", v).attr("d", function(a, c) {
                    return w(a, c, b)
                });
                c.transition().duration(D.transitionDuration()).attrTween("d", t)
            }
            function i(a) {
                D.renderTitle() && a.append("title").text(function(a) {
                    return D.title()(a)
                })
            }
            function j(a, c) {
                if (D.renderLabel()) {
                    var d = y.selectAll("text." + A).data(a);
                    d.exit().remove();
                    var e = d.enter().append("text").attr("class", function(a, b) {
                        return A + " _" + b
                    }).on("click", v);
                    b.transition(e, D.transitionDuration()).attr("transform", function(a) {
                        a.innerRadius = D.innerRadius(),
                        a.outerRadius = x;
                        var b = c.centroid(a);
                        return isNaN(b[0]) || isNaN(b[1]) ? "translate(0,0)" : "translate(" + b + ")"
                    }).attr("text-anchor", "middle").text(function(a) {
                        var b = a.data;
                        return s(b) || r(a) ? "" : D.label()(a)
                    })
                }
            }
            function k(a, b) {
                l(a, b),
                m(a, b),
                n(a)
            }
            function l(a, c) {
                var d = y.selectAll("g." + A).data(a).select("path").attr("d", function(a, b) {
                    return w(a, b, c)
                });
                b.transition(d, D.transitionDuration(), function(a) {
                    a.attrTween("d", t)
                }).attr("fill", function(a, b) {
                    return D.getColor(a, b)
                })
            }
            function m(a, c) {
                if (D.renderLabel()) {
                    var d = y.selectAll("text." + A).data(a);
                    b.transition(d, D.transitionDuration()).attr("transform", function(a) {
                        a.innerRadius = D.innerRadius(),
                        a.outerRadius = x;
                        var b = c.centroid(a);
                        return isNaN(b[0]) || isNaN(b[1]) ? "translate(0,0)" : "translate(" + b + ")"
                    }).attr("text-anchor", "middle").text(function(a) {
                        var b = a.data;
                        return s(b) || r(a) ? "" : D.label()(a)
                    })
                }
            }
            function n(a) {
                D.renderTitle() && y.selectAll("g." + A).data(a).select("title").text(function(a) {
                    return D.title()(a)
                })
            }
            function o(a) {
                a.exit().remove()
            }
            function p() {
                D.selectAll("g." + A).each(D.hasFilter() ? function(a) {
                    D.isSelectedSlice(a) ? D.highlightSelected(this) : D.fadeDeselected(this)
                }
                : function() {
                    D.resetHighlight(this)
                }
                )
            }
            function q() {
                return a.layout.pie().sort(null).value(function(a) {
                    return D.valueAccessor()(a)
                })
            }
            function r(a) {
                var b = a.endAngle - a.startAngle;
                return isNaN(b) || C > b
            }
            function s(a) {
                return 0 === D.valueAccessor()(a)
            }
            function t(b) {
                b.innerRadius = D.innerRadius();
                var c = this._current;
                u(c) && (c = {
                    startAngle: 0,
                    endAngle: 0
                });
                var d = a.interpolate(c, b);
                return this._current = d(0),
                function(a) {
                    return w(d(a), 0, D.buildArcs())
                }
            }
            function u(a) {
                return !a || isNaN(a.startAngle) || isNaN(a.endAngle)
            }
            function v(a) {
                D.onClick(a.data)
            }
            function w(a, b, c) {
                var d = c(a, b);
                return d.indexOf("NaN") >= 0 && (d = "M0,0"),
                d
            }
            var x, y, z = .5, A = "pie-slice", B = 0, C = z, D = b.capped(b.colorChart(b.baseChart({})));
            return D.slicesCap = D.cap,
            D.label(function(a) {
                return D.keyAccessor()(a.data)
            }),
            D.renderLabel(!0),
            D.title(function(a) {
                return D.keyAccessor()(a.data) + ": " + D.valueAccessor()(a.data)
            }),
            D.transitionDuration(350),
            D.doRender = function() {
                return D.resetSvg(),
                y = D.svg().append("g").attr("transform", "translate(" + D.cx() + "," + D.cy() + ")"),
                e(),
                D
            }
            ,
            D.innerRadius = function(a) {
                return arguments.length ? (B = a,
                D) : B
            }
            ,
            D.radius = function(a) {
                return arguments.length ? (x = a,
                D) : x
            }
            ,
            D.cx = function() {
                return D.width() / 2
            }
            ,
            D.cy = function() {
                return D.height() / 2
            }
            ,
            D.buildArcs = function() {
                return a.svg.arc().outerRadius(x).innerRadius(B)
            }
            ,
            D.isSelectedSlice = function(a) {
                return D.hasFilter(D.keyAccessor()(a.data))
            }
            ,
            D.doRedraw = function() {
                return e(),
                D
            }
            ,
            D.minAngleForLabel = function(a) {
                return arguments.length ? (C = a,
                D) : C
            }
            ,
            D.anchor(c, d)
        }
        ,
        b.barChart = function(c, d) {
            function e(a) {
                return b.utils.safeNumber(Math.abs(n.y()(a.y + a.y0) - n.y()(a.y0)))
            }
            function f(a, c) {
                var d = a.selectAll("rect.bar").data(c.points);
                d.enter().append("rect").attr("class", "bar").attr("fill", n.getColor).append("title").text(n.title()),
                n.isOrdinal() && d.on("click", i),
                b.transition(d, n.transitionDuration()).attr("x", function(a) {
                    var c = n.x()(a.x);
                    return (p || n.isOrdinal()) && (c -= k / 2),
                    b.utils.safeNumber(c)
                }).attr("y", function(a) {
                    var c = n.y()(a.y + a.y0);
                    return a.y < 0 && (c -= e(a)),
                    b.utils.safeNumber(c)
                }).attr("width", k).attr("height", function(a) {
                    return e(a)
                }).select("title").text(n.title()),
                b.transition(d.exit(), n.transitionDuration()).attr("height", 0).remove()
            }
            function g() {
                if (void 0 === k) {
                    var a = n.isOrdinal() ? h() + 1 : h()
                      , b = Math.floor((n.xAxisLength() - (a - 1) * o) / a);
                    (1 / 0 == b || isNaN(b) || l > b) && (b = l),
                    k = b
                }
            }
            function h() {
                return void 0 === j && (j = n.xUnitCount()),
                j
            }
            function i(a) {
                n.onClick(a.data)
            }
            var j, k, l = 1, m = 2, n = b.stackableChart(b.coordinateGridChart({})), o = m, p = !1;
            return b.override(n, "rescale", function() {
                n._rescale(),
                j = void 0,
                k = void 0,
                h()
            }),
            n.plotData = function() {
                var b = n.chartBodyG().selectAll("g.stack").data(n.stackLayers());
                g(),
                b.enter().append("g").attr("class", function(a, b) {
                    return "stack _" + b
                }),
                b.each(function(b, c) {
                    var d = a.select(this);
                    f(d, b, c)
                }),
                n.stackLayers(null)
            }
            ,
            n.fadeDeselectedArea = function() {
                var a = n.chartBodyG().selectAll("rect.bar")
                  , c = n.brush().extent();
                if (n.isOrdinal())
                    n.hasFilter() ? (a.classed(b.constants.SELECTED_CLASS, function(a) {
                        return n.hasFilter(n.keyAccessor()(a.data))
                    }),
                    a.classed(b.constants.DESELECTED_CLASS, function(a) {
                        return !n.hasFilter(n.keyAccessor()(a.data))
                    })) : (a.classed(b.constants.SELECTED_CLASS, !1),
                    a.classed(b.constants.DESELECTED_CLASS, !1));
                else if (n.brushIsEmpty(c))
                    a.classed(b.constants.DESELECTED_CLASS, !1);
                else {
                    var d = c[0]
                      , e = c[1];
                    a.classed(b.constants.DESELECTED_CLASS, function(a) {
                        var b = n.keyAccessor()(a.data);
                        return d > b || b >= e
                    })
                }
            }
            ,
            n.centerBar = function(a) {
                return arguments.length ? (p = a,
                n) : p
            }
            ,
            n.gap = function(a) {
                return arguments.length ? (o = a,
                n) : o
            }
            ,
            n.extendBrush = function() {
                var a = n.brush().extent();
                return n.round() && !p && (a[0] = a.map(n.round())[0],
                a[1] = a.map(n.round())[1],
                n.chartBodyG().select(".brush").call(n.brush().extent(a))),
                a
            }
            ,
            n.legendHighlight = function(b) {
                n.select(".chart-body").selectAll("rect.bar").filter(function() {
                    return a.select(this).attr("fill") == b.color
                }).classed("highlight", !0),
                n.select(".chart-body").selectAll("rect.bar").filter(function() {
                    return a.select(this).attr("fill") != b.color
                }).classed("fadeout", !0)
            }
            ,
            n.legendReset = function(b) {
                n.selectAll(".chart-body").selectAll("rect.bar").filter(function() {
                    return a.select(this).attr("fill") == b.color
                }).classed("highlight", !1),
                n.selectAll(".chart-body").selectAll("rect.bar").filter(function() {
                    return a.select(this).attr("fill") != b.color
                }).classed("fadeout", !1)
            }
            ,
            n.anchor(c, d)
        }
        ,
        b.lineChart = function(c, d) {
            function e(c, d) {
                var e = a.svg.line().x(function(a) {
                    return t.x()(a.x)
                }).y(function(a) {
                    return t.y()(a.y + a.y0)
                }).interpolate(w).tension(x);
                n && e.defined(n),
                c.append("path").attr("class", "line").attr("stroke", t.getColor).attr("fill", t.getColor),
                b.transition(d.select("path.line"), t.transitionDuration()).attr("d", function(a) {
                    return g(e(a.points))
                })
            }
            function f(c, d) {
                if (u) {
                    var e = a.svg.area().x(function(a) {
                        return t.x()(a.x)
                    }).y(function(a) {
                        return t.y()(a.y + a.y0)
                    }).y0(function(a) {
                        return t.y()(a.y0)
                    }).interpolate(w).tension(x);
                    n && e.defined(n),
                    c.append("path").attr("class", "area").attr("fill", t.getColor).attr("d", function(a) {
                        return g(e(a.points))
                    }),
                    b.transition(d.select("path.area"), t.transitionDuration()).attr("d", function(a) {
                        return g(e(a.points))
                    })
                }
            }
            function g(a) {
                return !a || a.indexOf("NaN") >= 0 ? "M0,0" : a
            }
            function h(c) {
                t.brushOn() || c.each(function() {
                    var c = a.select(this)
                      , d = c.select("g." + p);
                    d.empty() && (d = c.append("g").attr("class", p)),
                    i(d);
                    var e = d.selectAll("circle." + q).data(d.datum().points);
                    e.enter().append("circle").attr("class", q).attr("r", v).attr("fill", t.getColor).style("fill-opacity", 1e-6).style("stroke-opacity", 1e-6).on("mousemove", function() {
                        var b = a.select(this);
                        j(b),
                        k(b, d)
                    }).on("mouseout", function() {
                        var b = a.select(this);
                        l(b),
                        m(d)
                    }).append("title").text(t.title()),
                    e.attr("cx", function(a) {
                        return b.utils.safeNumber(t.x()(a.x))
                    }).attr("cy", function(a) {
                        return b.utils.safeNumber(t.y()(a.y + a.y0))
                    }).select("title").text(t.title()),
                    e.exit().remove()
                })
            }
            function i(a) {
                var b = a.select("path." + r).empty() ? a.append("path").attr("class", r) : a.select("path." + r);
                b.style("display", "none").attr("stroke-dasharray", "5,5");
                var c = a.select("path." + s).empty() ? a.append("path").attr("class", s) : a.select("path." + s);
                c.style("display", "none").attr("stroke-dasharray", "5,5")
            }
            function j(a) {
                return a.style("fill-opacity", .8),
                a.style("stroke-opacity", .8),
                a
            }
            function k(a, b) {
                var c = a.attr("cx")
                  , d = a.attr("cy");
                b.select("path." + r).style("display", "").attr("d", "M0 " + d + "L" + c + " " + d),
                b.select("path." + s).style("display", "").attr("d", "M" + c + " " + t.yAxisHeight() + "L" + c + " " + d)
            }
            function l(a) {
                a.style("fill-opacity", 1e-6).style("stroke-opacity", 1e-6)
            }
            function m(a) {
                a.select("path." + r).style("display", "none"),
                a.select("path." + s).style("display", "none")
            }
            var n, o = 5, p = "dc-tooltip", q = "dot", r = "yRef", s = "xRef", t = b.stackableChart(b.coordinateGridChart({})), u = !1, v = o, w = "linear", x = .7;
            return t.transitionDuration(500),
            t.plotData = function() {
                var a = t.chartBodyG().selectAll("g.stack").data(t.stackLayers())
                  , b = a.enter().append("g").attr("class", function(a, b) {
                    return "stack _" + b
                });
                e(b, a),
                f(b, a),
                h(a),
                t.stackLayers(null)
            }
            ,
            t.interpolate = function(a) {
                return arguments.length ? (w = a,
                t) : w
            }
            ,
            t.tension = function(a) {
                return arguments.length ? (x = a,
                t) : x
            }
            ,
            t.defined = function(a) {
                return arguments.length ? (n = a,
                t) : n
            }
            ,
            t.renderArea = function(a) {
                return arguments.length ? (u = a,
                t) : u
            }
            ,
            t.dotRadius = function(a) {
                return arguments.length ? (v = a,
                t) : v
            }
            ,
            t.legendHighlight = function(b) {
                t.selectAll(".chart-body").selectAll("path").filter(function() {
                    return a.select(this).attr("fill") == b.color
                }).classed("highlight", !0),
                t.selectAll(".chart-body").selectAll("path").filter(function() {
                    return a.select(this).attr("fill") != b.color
                }).classed("fadeout", !0)
            }
            ,
            t.legendReset = function(b) {
                t.selectAll(".chart-body").selectAll("path").filter(function() {
                    return a.select(this).attr("fill") == b.color
                }).classed("highlight", !1),
                t.selectAll(".chart-body").selectAll("path").filter(function() {
                    return a.select(this).attr("fill") != b.color
                }).classed("fadeout", !1)
            }
            ,
            t.anchor(c, d)
        }
        ,
        b.dataCount = function(c, d) {
            var e = a.format(",d")
              , f = b.baseChart({});
            return f.doRender = function() {
                return f.selectAll(".total-count").text(e(f.dimension().size())),
                f.selectAll(".filter-count").text(e(f.group().value())),
                f
            }
            ,
            f.doRedraw = function() {
                return f.doRender()
            }
            ,
            f.anchor(c, d)
        }
        ,
        b.dataTable = function(c, d) {
            function e() {
                var a = m.root().selectAll("tbody").data(f(), function(a) {
                    return m.keyAccessor()(a)
                })
                  , b = a.enter().append("tbody");
                return b.append("tr").attr("class", l).append("td").attr("class", i).attr("colspan", o.length).html(function(a) {
                    return m.keyAccessor()(a)
                }),
                a.exit().remove(),
                b
            }
            function f() {
                h || (h = crossfilter.quicksort.by(p));
                var b = m.dimension().top(n);
                return a.nest().key(m.group()).sortKeys(q).sortValues(q).entries(h(b, 0, b.length))
            }
            function g(a) {
                for (var b = a.order().selectAll("tr." + j).data(function(a) {
                    return a.values
                }), c = b.enter().append("tr").attr("class", j), d = 0; d < o.length; ++d) {
                    var e = o[d];
                    c.append("td").attr("class", k + " _" + d).html(function(a) {
                        return e(a)
                    })
                }
                return b.exit().remove(),
                b
            }
            var h, i = "dc-table-label", j = "dc-table-row", k = "dc-table-column", l = "dc-table-group", m = b.baseChart({}), n = 25, o = [], p = function(a) {
                return a
            }, q = a.ascending;
            return m.doRender = function() {
                return m.selectAll("tbody").remove(),
                g(e()),
                m
            }
            ,
            m.doRedraw = function() {
                return m.doRender()
            }
            ,
            m.size = function(a) {
                return arguments.length ? (n = a,
                m) : n
            }
            ,
            m.columns = function(a) {
                return arguments.length ? (o = a,
                m) : o
            }
            ,
            m.sortBy = function(a) {
                return arguments.length ? (p = a,
                m) : p
            }
            ,
            m.order = function(a) {
                return arguments.length ? (q = a,
                m) : q
            }
            ,
            m.anchor(c, d)
        }
        ,
        b.bubbleChart = function(a, c) {
            function d(a) {
                var c = a.enter().append("g");
                c.attr("class", i.BUBBLE_NODE_CLASS).attr("transform", k).append("circle").attr("class", function(a, b) {
                    return i.BUBBLE_CLASS + " _" + b
                }).on("click", i.onClick).attr("fill", i.initBubbleColor).attr("r", 0),
                b.transition(a, i.transitionDuration()).attr("r", function(a) {
                    return i.bubbleR(a)
                }).attr("opacity", function(a) {
                    return i.bubbleR(a) > 0 ? 1 : 0
                }),
                i.doRenderLabel(c),
                i.doRenderTitles(c)
            }
            function e(a) {
                b.transition(a, i.transitionDuration()).attr("transform", k).selectAll("circle." + i.BUBBLE_CLASS).attr("fill", i.updateBubbleColor).attr("r", function(a) {
                    return i.bubbleR(a)
                }).attr("opacity", function(a) {
                    return i.bubbleR(a) > 0 ? 1 : 0
                }),
                i.doUpdateLabels(a),
                i.doUpdateTitles(a)
            }
            function f(a) {
                a.exit().remove()
            }
            function g(a) {
                var b = i.x()(i.keyAccessor()(a));
                return isNaN(b) && (b = 0),
                b
            }
            function h(a) {
                var b = i.y()(i.valueAccessor()(a));
                return isNaN(b) && (b = 0),
                b
            }
            var i = b.abstractBubbleChart(b.coordinateGridChart({}))
              , j = !1;
            i.transitionDuration(750);
            var k = function(a) {
                return "translate(" + g(a) + "," + h(a) + ")"
            };
            return i.elasticRadius = function(a) {
                return arguments.length ? (j = a,
                i) : j
            }
            ,
            i.plotData = function() {
                j && i.r().domain([i.rMin(), i.rMax()]),
                i.r().range([i.MIN_RADIUS, i.xAxisLength() * i.maxBubbleRelativeSize()]);
                var a = i.chartBodyG().selectAll("g." + i.BUBBLE_NODE_CLASS).data(i.group().all());
                d(a),
                e(a),
                f(a),
                i.fadeDeselectedArea()
            }
            ,
            i.renderBrush = function() {}
            ,
            i.redrawBrush = function() {
                i.fadeDeselectedArea()
            }
            ,
            i.anchor(a, c)
        }
        ,
        b.compositeChart = function(c, d) {
            function e(a, b) {
                a._generateG(k.g()),
                a.g().attr("class", j + " _" + b)
            }
            function f() {
                for (var a = [], b = 0; b < l.length; ++b)
                    a.push(l[b].yAxisMin());
                return a
            }
            function g() {
                for (var a = [], b = 0; b < l.length; ++b)
                    a.push(l[b].yAxisMax());
                return a
            }
            function h() {
                for (var a = [], b = 0; b < l.length; ++b)
                    a.push(l[b].xAxisMin());
                return a
            }
            function i() {
                for (var a = [], b = 0; b < l.length; ++b)
                    a.push(l[b].xAxisMax());
                return a
            }
            var j = "sub"
              , k = b.coordinateGridChart({})
              , l = [];
            return k.transitionDuration(500),
            k.group({}),
            b.override(k, "_generateG", function() {
                for (var a = this.__generateG(), b = 0; b < l.length; ++b) {
                    var c = l[b];
                    e(c, b),
                    void 0 === c.dimension() && c.dimension(k.dimension()),
                    void 0 === c.group() && c.group(k.group()),
                    c.chartGroup(k.chartGroup()),
                    c.svg(k.svg()),
                    c.xUnits(k.xUnits()),
                    c.transitionDuration(k.transitionDuration()),
                    c.brushOn(k.brushOn())
                }
                return a
            }),
            k.plotData = function() {
                for (var a = 0; a < l.length; ++a) {
                    var b = l[a];
                    void 0 === b.g() && e(b, a),
                    b.x(k.x()),
                    b.y(k.y()),
                    b.xAxis(k.xAxis()),
                    b.yAxis(k.yAxis()),
                    b.plotData(),
                    b.activateRenderlets()
                }
            }
            ,
            k.fadeDeselectedArea = function() {
                for (var a = 0; a < l.length; ++a) {
                    var b = l[a];
                    b.brush(k.brush()),
                    b.fadeDeselectedArea()
                }
            }
            ,
            k.compose = function(a) {
                l = a;
                for (var b = 0; b < l.length; ++b) {
                    var c = l[b];
                    c.height(k.height()),
                    c.width(k.width()),
                    c.margins(k.margins())
                }
                return k
            }
            ,
            k.children = function() {
                return l
            }
            ,
            k.yAxisMin = function() {
                return a.min(f())
            }
            ,
            k.yAxisMax = function() {
                return b.utils.add(a.max(g()), k.yAxisPadding())
            }
            ,
            k.xAxisMin = function() {
                return b.utils.subtract(a.min(h()), k.xAxisPadding())
            }
            ,
            k.xAxisMax = function() {
                return b.utils.add(a.max(i()), k.xAxisPadding())
            }
            ,
            k.legendables = function() {
                var a = [];
                return l.forEach(function(c, d) {
                    var e = c.legendables();
                    e.length > 1 ? a.push.apply(a, e) : a.push(b.utils.createLegendable(c, c.group(), d, c.valueAccessor()))
                }),
                a
            }
            ,
            k.legendHighlight = function(a) {
                for (var b = 0; b < l.length; ++b) {
                    var c = l[b];
                    c.legendHighlight(a)
                }
            }
            ,
            k.legendReset = function(a) {
                for (var b = 0; b < l.length; ++b) {
                    var c = l[b];
                    c.legendReset(a)
                }
            }
            ,
            k.anchor(c, d)
        }
        ,
        b.geoChoroplethChart = function(c, d) {
            function e(a) {
                var b = f();
                if (g(a)) {
                    var c = h(a);
                    n(c, a, b),
                    o(c, a, b)
                }
            }
            function f() {
                for (var a = {}, b = p.group().all(), c = 0; c < b.length; ++c)
                    a[p.keyAccessor()(b[c])] = p.valueAccessor()(b[c]);
                return a
            }
            function g(a) {
                return m(a).keyAccessor
            }
            function h(a) {
                var c = p.svg().selectAll(i(a)).classed("selected", function(b) {
                    return j(a, b)
                }).classed("deselected", function(b) {
                    return k(a, b)
                }).attr("class", function(c) {
                    var d = m(a).name
                      , e = b.utils.nameToId(m(a).keyAccessor(c))
                      , f = d + " " + e;
                    return j(a, c) && (f += " selected"),
                    k(a, c) && (f += " deselected"),
                    f
                });
                return c
            }
            function i(a) {
                return "g.layer" + a + " g." + m(a).name
            }
            function j(a, b) {
                return p.hasFilter() && p.hasFilter(l(a, b))
            }
            function k(a, b) {
                return p.hasFilter() && !p.hasFilter(l(a, b))
            }
            function l(a, b) {
                return m(a).keyAccessor(b)
            }
            function m(a) {
                return s[a]
            }
            function n(c, d, e) {
                var f = c.select("path").attr("fill", function() {
                    var b = a.select(this).attr("fill");
                    return b ? b : "none"
                }).on("click", function(a) {
                    return p.onClick(a, d)
                });
                b.transition(f, p.transitionDuration()).attr("fill", function(a, b) {
                    return p.getColor(e[m(d).keyAccessor(a)], b)
                })
            }
            function o(a, b, c) {
                p.renderTitle() && a.selectAll("title").text(function(a) {
                    var d = l(b, a)
                      , e = c[d];
                    return p.title()({
                        key: d,
                        value: e
                    })
                })
            }
            var p = b.colorChart(b.baseChart({}));
            p.colorAccessor(function(a) {
                return a
            });
            var q, r = a.geo.path(), s = [];
            return p.doRender = function() {
                p.resetSvg();
                for (var a = 0; a < s.length; ++a) {
                    var b = p.svg().append("g").attr("class", "layer" + a)
                      , c = b.selectAll("g." + m(a).name).data(m(a).data).enter().append("g").attr("class", m(a).name);
                    c.append("path").attr("fill", "white").attr("d", r),
                    c.append("title"),
                    e(a)
                }
                q = !1
            }
            ,
            p.onClick = function(a, c) {
                var d = m(c).keyAccessor(a);
                b.events.trigger(function() {
                    p.filter(d),
                    b.redrawAll(p.chartGroup())
                })
            }
            ,
            p.doRedraw = function() {
                for (var a = 0; a < s.length; ++a)
                    e(a),
                    q && p.svg().selectAll("g." + m(a).name + " path").attr("d", r);
                q = !1
            }
            ,
            p.overlayGeoJson = function(a, b, c) {
                for (var d = 0; d < s.length; ++d)
                    if (s[d].name == b)
                        return s[d].data = a,
                        s[d].keyAccessor = c,
                        p;
                return s.push({
                    name: b,
                    data: a,
                    keyAccessor: c
                }),
                p
            }
            ,
            p.projection = function(a) {
                return r.projection(a),
                q = !0,
                p
            }
            ,
            p.geoJsons = function() {
                return s
            }
            ,
            p.removeGeoJson = function(a) {
                for (var b = [], c = 0; c < s.length; ++c) {
                    var d = s[c];
                    d.name != a && b.push(d)
                }
                return s = b,
                p
            }
            ,
            p.anchor(c, d)
        }
        ,
        b.bubbleOverlay = function(c, d) {
            function e() {
                return j = n.select("g." + k),
                j.empty() && (j = n.svg().append("g").attr("class", k)),
                j
            }
            function f() {
                var a = g();
                o.forEach(function(c) {
                    var d = h(c, a)
                      , e = d.select("circle." + m);
                    e.empty() && (e = d.append("circle").attr("class", m).attr("r", 0).attr("fill", n.initBubbleColor).on("click", n.onClick)),
                    b.transition(e, n.transitionDuration()).attr("r", function(a) {
                        return n.bubbleR(a)
                    }),
                    n.doRenderLabel(d),
                    n.doRenderTitles(d)
                })
            }
            function g() {
                var a = {};
                return n.group().all().forEach(function(b) {
                    a[n.keyAccessor()(b)] = b
                }),
                a
            }
            function h(a, c) {
                var d = l + " " + b.utils.nameToId(a.name)
                  , e = j.select("g." + b.utils.nameToId(a.name));
                return e.empty() && (e = j.append("g").attr("class", d).attr("transform", "translate(" + a.x + "," + a.y + ")")),
                e.datum(c[a.name]),
                e
            }
            function i() {
                var a = g();
                o.forEach(function(c) {
                    var d = h(c, a)
                      , e = d.select("circle." + m);
                    b.transition(e, n.transitionDuration()).attr("r", function(a) {
                        return n.bubbleR(a)
                    }).attr("fill", n.updateBubbleColor),
                    n.doUpdateLabels(d),
                    n.doUpdateTitles(d)
                })
            }
            var j, k = "bubble-overlay", l = "node", m = "bubble", n = b.abstractBubbleChart(b.baseChart({})), o = [];
            return n.transitionDuration(750),
            n.radiusValueAccessor(function(a) {
                return a.value
            }),
            n.point = function(a, b, c) {
                return o.push({
                    name: a,
                    x: b,
                    y: c
                }),
                n
            }
            ,
            n.doRender = function() {
                return j = e(),
                n.r().range([n.MIN_RADIUS, n.width() * n.maxBubbleRelativeSize()]),
                f(),
                n.fadeDeselectedArea(),
                n
            }
            ,
            n.doRedraw = function() {
                return i(),
                n.fadeDeselectedArea(),
                n
            }
            ,
            n.debug = function(c) {
                if (c) {
                    var d = n.select("g." + b.constants.DEBUG_GROUP_CLASS);
                    d.empty() && (d = n.svg().append("g").attr("class", b.constants.DEBUG_GROUP_CLASS));
                    var e = d.append("text").attr("x", 10).attr("y", 20);
                    d.append("rect").attr("width", n.width()).attr("height", n.height()).on("mousemove", function() {
                        var b = a.mouse(d.node())
                          , c = b[0] + ", " + b[1];
                        e.text(c)
                    })
                } else
                    n.selectAll(".debug").remove();
                return n
            }
            ,
            n.anchor(c, d),
            n
        }
        ,
        b.rowChart = function(c, d) {
            function e() {
                if (!r || s) {
                    var b = a.extent(t, y.valueAccessor());
                    b[0] > 0 && (b[0] = 0),
                    r = a.scale.linear().domain(b).range([0, y.effectiveWidth()]),
                    z.scale(r)
                }
            }
            function f() {
                var a = q.select("g.axis");
                e(),
                a.empty() && (a = q.append("g").attr("class", "axis").attr("transform", "translate(0, " + y.effectiveHeight() + ")")),
                b.transition(a, y.transitionDuration()).call(z)
            }
            function g() {
                q.selectAll("g.tick").select("line.grid-line").remove(),
                q.selectAll("g.tick").append("line").attr("class", "grid-line").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", function() {
                    return -y.effectiveHeight()
                })
            }
            function h() {
                t = y.assembleCappedData(),
                f(),
                g();
                var a = q.selectAll("g." + x).data(t);
                i(a),
                j(a),
                k(a)
            }
            function i(a) {
                var b = a.enter().append("g").attr("class", function(a, b) {
                    return x + " _" + b
                });
                b.append("rect").attr("width", 0),
                m(b),
                n(a)
            }
            function j(a) {
                a.exit().remove()
            }
            function k(a) {
                var c = t.length
                  , d = (y.effectiveHeight() - (c + 1) * w) / c
                  , e = a.attr("transform", function(a, b) {
                    return "translate(0," + ((b + 1) * w + b * d) + ")"
                }).select("rect").attr("height", d).attr("fill", y.getColor).on("click", o).classed("deselected", function(a) {
                    return y.hasFilter() ? !y.isSelectedRow(a) : !1
                }).classed("selected", function(a) {
                    return y.hasFilter() ? y.isSelectedRow(a) : !1
                });
                b.transition(e, y.transitionDuration()).attr("width", function(a) {
                    var b = r(r(0) == -1 / 0 ? 1 : 0);
                    return Math.abs(b - r(y.valueAccessor()(a)))
                }).attr("transform", p),
                l(a),
                n(a)
            }
            function l(a) {
                y.renderTitle() && (a.selectAll("title").remove(),
                a.append("title").text(function(a) {
                    return y.title()(a)
                }))
            }
            function m(a) {
                y.renderLabel() && a.append("text").on("click", o)
            }
            function n(a) {
                if (y.renderLabel()) {
                    var c = a.select("text").attr("x", u).attr("y", v).on("click", o).attr("class", function(a, b) {
                        return x + " _" + b
                    }).text(function(a) {
                        return y.label()(a)
                    });
                    b.transition(c, y.transitionDuration()).attr("transform", p)
                }
            }
            function o(a) {
                y.onClick(a)
            }
            function p(a) {
                var b = r(y.valueAccessor()(a))
                  , c = r(0)
                  , d = b > c ? c : b;
                return "translate(" + d + ",0)"
            }
            var q, r, s, t, u = 10, v = 15, w = 5, x = "row", y = b.capped(b.marginable(b.colorChart(b.baseChart({})))), z = a.svg.axis().orient("bottom");
            return y.rowsCap = y.cap,
            y.doRender = function() {
                return y.resetSvg(),
                q = y.svg().append("g").attr("transform", "translate(" + y.margins().left + "," + y.margins().top + ")"),
                h(),
                y
            }
            ,
            y.title(function(a) {
                return y.keyAccessor()(a) + ": " + y.valueAccessor()(a)
            }),
            y.label(function(a) {
                return y.keyAccessor()(a)
            }),
            y.x = function(a) {
                return arguments.length ? (r = a,
                y) : r
            }
            ,
            y.doRedraw = function() {
                return h(),
                y
            }
            ,
            y.xAxis = function() {
                return z
            }
            ,
            y.gap = function(a) {
                return arguments.length ? (w = a,
                y) : w
            }
            ,
            y.elasticX = function(a) {
                return arguments.length ? (s = a,
                y) : s
            }
            ,
            y.labelOffsetX = function(a) {
                return arguments.length ? (u = a,
                y) : u
            }
            ,
            y.labelOffsetY = function(a) {
                return arguments.length ? (v = a,
                y) : v
            }
            ,
            y.isSelectedRow = function(a) {
                return y.hasFilter(y.keyAccessor()(a))
            }
            ,
            y.anchor(c, d)
        }
        ,
        b.legend = function() {
            function a() {
                return i + h
            }
            var b, c, d = 2, e = {}, f = 0, g = 0, h = 12, i = 5;
            return e.parent = function(a) {
                return arguments.length ? (b = a,
                e) : b
            }
            ,
            e.render = function() {
                c = b.svg().append("g").attr("class", "dc-legend").attr("transform", "translate(" + f + "," + g + ")");
                var e = c.selectAll("g.dc-legend-item").data(b.legendables()).enter().append("g").attr("class", "dc-legend-item").attr("transform", function(b, c) {
                    return "translate(0," + c * a() + ")"
                }).on("mouseover", function(a) {
                    b.legendHighlight(a)
                }).on("mouseout", function(a) {
                    b.legendReset(a)
                });
                e.append("rect").attr("width", h).attr("height", h).attr("fill", function(a) {
                    return a.color
                }),
                e.append("text").text(function(a) {
                    return a.name
                }).attr("x", h + d).attr("y", function() {
                    return h / 2 + (this.clientHeight ? this.clientHeight : 13) / 2 - 2
                })
            }
            ,
            e.x = function(a) {
                return arguments.length ? (f = a,
                e) : f
            }
            ,
            e.y = function(a) {
                return arguments.length ? (g = a,
                e) : g
            }
            ,
            e.gap = function(a) {
                return arguments.length ? (i = a,
                e) : i
            }
            ,
            e.itemHeight = function(a) {
                return arguments.length ? (h = a,
                e) : h
            }
            ,
            e
        }
        ,
        b.capped = function(c) {
            var d = 1 / 0
              , e = "Others"
              , f = function(b) {
                var d = a.sum(b, c.valueAccessor())
                  , f = c.group().all()
                  , g = a.sum(f, c.valueAccessor())
                  , h = b.map(c.keyAccessor())
                  , i = f.map(c.keyAccessor())
                  , j = a.set(h)
                  , k = i.filter(function(a) {
                    return !j.has(a)
                });
                b.push({
                    others: k,
                    key: e,
                    value: g - d
                })
            };
            return c.assembleCappedData = function() {
                if (1 / 0 == d)
                    return c.computeOrderedGroups();
                var a = c.group().top(d);
                return a = c.computeOrderedGroups(a),
                f && f(a),
                a
            }
            ,
            c.cap = function(a) {
                return arguments.length ? (d = a,
                c) : d
            }
            ,
            c.othersLabel = function(a) {
                return arguments.length ? (e = a,
                c) : e
            }
            ,
            c.othersGrouper = function(a) {
                return arguments.length ? (f = a,
                c) : f
            }
            ,
            b.override(c, "onClick", function(a) {
                a.others && a.others.forEach(function(a) {
                    c.filter(a)
                }),
                c._onClick(a)
            }),
            c
        }
        ,
        b.numberDisplay = function(c, d) {
            var e = "number-display"
              , f = a.format(".2s")
              , g = b.baseChart({});
            return g.dimension({}),
            g.value = function() {
                var a = g.group().all && g.group().all()[0] || g.group().value();
                return g.valueAccessor()(a)
            }
            ,
            g.transitionDuration(250),
            g.doRender = function() {
                var b = g.value()
                  , c = g.selectAll("." + e);
                return c.empty() && (c = c.data([0]).enter().append("span").attr("class", e)),
                c.transition().duration(g.transitionDuration()).ease("quad-out-in").tween("text", function() {
                    var c = a.interpolateNumber(this.lastValue || 0, b);
                    return this.lastValue = b,
                    function(a) {
                        this.textContent = g.formatNumber()(c(a))
                    }
                }),
                g
            }
            ,
            g.doRedraw = function() {
                return g.doRender()
            }
            ,
            g.formatNumber = function(a) {
                return arguments.length ? (f = a,
                g) : f
            }
            ,
            g.anchor(c, d)
        }
        ,
        b
    }
    "function" == typeof define && define.amd ? define(["d3"], a) : "object" == typeof module && module.exports ? module.exports = a(d3) : this.dc = a(d3)
}();
//# sourceMappingURL=dc.min.js.map
