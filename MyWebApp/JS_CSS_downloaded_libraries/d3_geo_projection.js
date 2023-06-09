! function() {
    function t(t, a) { return { type: "Feature", id: t.id, properties: t.properties, geometry: n(t.geometry, a) } }

    function n(t, a) { if (!t) return null; if ("GeometryCollection" === t.type) return { type: "GeometryCollection", geometries: object.geometries.map(function(t) { return n(t, a) }) }; if (!ga.hasOwnProperty(t.type)) return null; var r = ga[t.type]; return d3.geo.stream(t, a(r)), r.result() }

    function a() {}

    function r(t) { if ((n = t.length) < 4) return !1; for (var n, a = 0, r = t[n - 1][1] * t[0][0] - t[n - 1][0] * t[0][1]; ++a < n;) r += t[a - 1][1] * t[a][0] - t[a - 1][0] * t[a][1]; return 0 >= r }

    function e(t, n) {
        for (var a = n[0], r = n[1], e = !1, o = 0, i = t.length, h = i - 1; i > o; h = o++) {
            var u = t[o],
                M = u[0],
                s = u[1],
                c = t[h],
                f = c[0],
                v = c[1];
            s > r ^ v > r && (f - M) * (r - s) / (v - s) + M > a && (e = !e)
        }
        return e
    }

    function o(t) { return t ? t / Math.sin(t) : 1 }

    function i(t) { return t > 0 ? 1 : 0 > t ? -1 : 0 }

    function h(t) { return t > 1 ? wa : -1 > t ? -wa : Math.asin(t) }

    function u(t) { return t > 1 ? 0 : -1 > t ? pa : Math.acos(t) }

    function M(t) { return t > 0 ? Math.sqrt(t) : 0 }

    function s(t) {
        function n(t, n) {
            var a = Math.cos(t),
                e = Math.cos(n),
                o = Math.sin(n),
                i = e * a,
                h = -((1 - i ? Math.log(.5 * (1 + i)) / (1 - i) : -.5) + r / (1 + i));
            return [h * e * Math.sin(t), h * o]
        }
        var a = Math.tan(.5 * t),
            r = 2 * Math.log(Math.cos(.5 * t)) / (a * a);
        return n.invert = function(n, a) {
            var e, o = Math.sqrt(n * n + a * a),
                i = t * -.5,
                u = 50;
            if (!o) return [0, 0];
            do {
                var M = .5 * i,
                    s = Math.cos(M),
                    c = Math.sin(M),
                    f = Math.tan(M),
                    v = Math.log(1 / s);
                i -= e = (2 / f * v - r * f - o) / (-v / (c * c) + 1 - r / (2 * s * s))
            } while (Math.abs(e) > da && --u > 0);
            var l = Math.sin(i);
            return [Math.atan2(n * l, o * Math.cos(i)), h(a * l / o)]
        }, n
    }

    function c() {
        var t = wa,
            n = Qa(s),
            a = n(t);
        return a.radius = function(a) { return arguments.length ? n(t = a * pa / 180) : 180 * (t / pa) }, a
    }

    function f(t, n) {
        var a = Math.cos(n),
            r = o(u(a * Math.cos(t /= 2)));
        return [2 * a * Math.sin(t) * r, Math.sin(n) * r]
    }

    function v(t) {
        function n(t, n) {
            var h = Math.cos(n),
                u = Math.cos(t /= 2);
            return [(1 + h) * Math.sin(t), (e * n > -Math.atan2(u, o) - .001 ? 0 : 10 * -e) + i + Math.sin(n) * r - (1 + h) * a * u]
        }
        var a = Math.sin(t),
            r = Math.cos(t),
            e = t > 0 ? 1 : -1,
            o = Math.tan(e * t),
            i = (1 + a - r) / 2;
        return n.invert = function(t, n) {
            var h = 0,
                u = 0,
                M = 50;
            do {
                var s = Math.cos(h),
                    c = Math.sin(h),
                    f = Math.cos(u),
                    v = Math.sin(u),
                    l = 1 + f,
                    g = l * c - t,
                    d = i + v * r - l * a * s - n,
                    b = .5 * l * s,
                    p = -c * v,
                    w = .5 * a * l * c,
                    q = r * f + a * s * v,
                    m = p * w - q * b,
                    y = .5 * (d * p - g * q) / m,
                    S = (g * w - d * b) / m;
                h -= y, u -= S
            } while ((Math.abs(y) > da || Math.abs(S) > da) && --M > 0);
            return e * u > -Math.atan2(Math.cos(h), o) - .001 ? [2 * h, u] : null
        }, n
    }

    function l() {
        var t = pa / 9,
            n = t > 0 ? 1 : -1,
            a = Math.tan(n * t),
            r = Qa(v),
            e = r(t),
            o = e.stream;
        return e.parallel = function(e) { return arguments.length ? (a = Math.tan((n = (t = e * pa / 180) > 0 ? 1 : -1) * t), r(t)) : 180 * (t / pa) }, e.stream = function(r) {
            var i = e.rotate(),
                h = o(r),
                u = (e.rotate([0, 0]), o(r));
            return e.rotate(i), h.sphere = function() {
                u.polygonStart(), u.lineStart();
                for (var r = -180 * n; 180 > n * r; r += 90 * n) u.point(r, 90 * n);
                for (; n * (r -= t) >= -180;) u.point(r, n * -Math.atan2(Math.cos(r * ma / 2), a) * ya);
                u.lineEnd(), u.polygonEnd()
            }, h
        }, e
    }

    function g(t) { return t = Math.exp(2 * t), (t - 1) / (t + 1) }

    function d(t) { return .5 * (Math.exp(t) - Math.exp(-t)) }

    function b(t) { return .5 * (Math.exp(t) + Math.exp(-t)) }

    function p(t) { return Math.log(t + M(t * t + 1)) }

    function w(t) { return Math.log(t + M(t * t - 1)) }

    function q(t, n) {
        var a = Math.tan(n / 2),
            r = M(1 - a * a),
            e = 1 + r * Math.cos(t /= 2),
            o = Math.sin(t) * r / e,
            i = a / e,
            h = o * o,
            u = i * i;
        return [4 / 3 * o * (3 + h - 3 * u), 4 / 3 * i * (3 + 3 * h - u)]
    }

    function m(t, n) { var a = Math.abs(n); return pa / 4 > a ? [t, Math.log(Math.tan(pa / 4 + n / 2))] : [t * Math.cos(a) * (2 * Math.SQRT2 - 1 / Math.sin(a)), i(n) * (2 * Math.SQRT2 * (a - pa / 4) - Math.log(Math.tan(a / 2)))] }

    function y(t) {
        function n(t, n) {
            var r = Ta(t, n);
            if (Math.abs(t) > wa) {
                var e = Math.atan2(r[1], r[0]),
                    o = Math.sqrt(r[0] * r[0] + r[1] * r[1]),
                    i = a * Math.round((e - wa) / a) + wa,
                    u = Math.atan2(Math.sin(e -= i), 2 - Math.cos(e));
                e = i + h(pa / o * Math.sin(u)) - u, r[0] = o * Math.cos(e), r[1] = o * Math.sin(e)
            }
            return r
        }
        var a = 2 * pa / t;
        return n.invert = function(t, n) {
            var r = Math.sqrt(t * t + n * n);
            if (r > wa) {
                var e = Math.atan2(n, t),
                    o = a * Math.round((e - wa) / a) + wa,
                    i = e > o ? -1 : 1,
                    h = r * Math.cos(o - e),
                    u = 1 / Math.tan(i * Math.acos((h - pa) / Math.sqrt(pa * (pa - 2 * h) + r * r)));
                e = o + 2 * Math.atan((u + i * Math.sqrt(u * u - 3)) / 3), t = r * Math.cos(e), n = r * Math.sin(e)
            }
            return Ta.invert(t, n)
        }, n
    }

    function S() {
        var t = 5,
            n = Qa(y),
            a = n(t),
            r = a.stream,
            e = .01,
            o = -Math.cos(e * ma),
            i = Math.sin(e * ma);
        return a.lobes = function(a) { return arguments.length ? n(t = +a) : t }, a.stream = function(n) {
            var u = a.rotate(),
                M = r(n),
                s = (a.rotate([0, 0]), r(n));
            return a.rotate(u), M.sphere = function() {
                s.polygonStart(), s.lineStart();
                for (var n = 0, a = 360 / t, r = 2 * pa / t, u = 90 - 180 / t, M = wa; t > n; ++n, u -= a, M -= r) s.point(Math.atan2(i * Math.cos(M), o) * ya, h(i * Math.sin(M)) * ya), -90 > u ? (s.point(-90, -180 - u - e), s.point(-90, -180 - u + e)) : (s.point(90, u + e), s.point(90, u - e));
                s.lineEnd(), s.polygonEnd()
            }, M
        }, a
    }

    function Q(t) {
        return function(n) {
            var a, r = t * Math.sin(n),
                e = 30;
            do n -= a = (n + Math.sin(n) - r) / (1 + Math.cos(n)); while (Math.abs(a) > da && --e > 0);
            return n / 2
        }
    }

    function R(t, n, a) {
        function r(a, r) { return [t * a * Math.cos(r = e(r)), n * Math.sin(r)] }
        var e = Q(a);
        return r.invert = function(r, e) { var o = h(e / n); return [r / (t * Math.cos(o)), h((2 * o + Math.sin(2 * o)) / a)] }, r
    }

    function T(t, n) {
        var a = 2.00276,
            r = xa(n);
        return [a * t / (1 / Math.cos(n) + 1.11072 / Math.cos(r)), (n + Math.SQRT2 * Math.sin(r)) / a]
    }

    function x(t) {
        var n = 0,
            a = Qa(t),
            r = a(n);
        return r.parallel = function(t) { return arguments.length ? a(n = t * pa / 180) : 180 * (n / pa) }, r
    }

    function E(t, n) { return [t * Math.cos(n), n] }

    function k(t) {
        function n(n, r) {
            var e = a + t - r,
                o = e ? n * Math.cos(r) / e : e;
            return [e * Math.sin(o), a - e * Math.cos(o)]
        }
        if (!t) return E;
        var a = 1 / Math.tan(t);
        return n.invert = function(n, r) {
            var e = Math.sqrt(n * n + (r = a - r) * r),
                o = a + t - e;
            return [e / Math.cos(o) * Math.atan2(n, r), o]
        }, n
    }

    function P(t) {
        function n(t, n) {
            var r = wa - n,
                e = r ? t * a * Math.sin(r) / r : r;
            return [r * Math.sin(e) / a, wa - r * Math.cos(e)]
        }
        var a = Math.sin(t);
        return n.invert = function(t, n) {
            var r = t * a,
                e = wa - n,
                o = Math.sqrt(r * r + e * e),
                i = Math.atan2(r, e);
            return [(o ? o / Math.sin(o) : 1) * i / a, wa - o]
        }, n
    }

    function _(t) {
        function n(n, a) {
            for (var r = Math.sin(a), e = Math.cos(a), o = new Array(3), M = 0; 3 > M; ++M) {
                var s = t[M];
                if (o[M] = B(a - s[1], s[3], s[2], e, r, n - s[0]), !o[M][0]) return s.point;
                o[M][1] = j(o[M][1] - s.v[1])
            }
            for (var c = u.slice(), M = 0; 3 > M; ++M) {
                var f = 2 == M ? 0 : M + 1,
                    v = F(t[M].v[0], o[M][0], o[f][0]);
                o[M][1] < 0 && (v = -v), M ? 1 == M ? (v = i - v, c[0] -= o[M][0] * Math.cos(v), c[1] -= o[M][0] * Math.sin(v)) : (v = h - v, c[0] += o[M][0] * Math.cos(v), c[1] += o[M][0] * Math.sin(v)) : (c[0] += o[M][0] * Math.cos(v), c[1] -= o[M][0] * Math.sin(v))
            }
            return c[0] /= 3, c[1] /= 3, c
        }
        t = t.map(function(t) { return [t[0], t[1], Math.sin(t[1]), Math.cos(t[1])] });
        for (var a, r = t[2], e = 0; 3 > e; ++e, r = a) a = t[e], r.v = B(a[1] - r[1], r[3], r[2], a[3], a[2], a[0] - r[0]), r.point = [0, 0];
        var o = F(t[0].v[0], t[2].v[0], t[1].v[0]),
            i = F(t[0].v[0], t[1].v[0], t[2].v[0]),
            h = pa - o;
        t[2].point[1] = 0, t[0].point[0] = -(t[1].point[0] = .5 * t[0].v[0]);
        var u = [t[2].point[0] = t[0].point[0] + t[2].v[0] * Math.cos(o), 2 * (t[0].point[1] = t[1].point[1] = t[2].v[0] * Math.sin(o))];
        return n
    }

    function z() {
        var t = [
                [0, 0],
                [0, 0],
                [0, 0]
            ],
            n = Qa(_),
            a = n(t),
            r = a.rotate;
        return delete a.rotate, a.points = function(e) {
            if (!arguments.length) return t;
            t = e;
            var o = d3.geo.centroid({ type: "MultiPoint", coordinates: t }),
                i = [-o[0], -o[1]];
            return r.call(a, i), n(t.map(d3.geo.rotation(i)).map(A))
        }, a.points([
            [-150, 55],
            [-35, 55],
            [-92.5, 10]
        ])
    }

    function B(t, n, a, r, e, o) {
        var i, M = Math.cos(o);
        if (Math.abs(t) > 1 || Math.abs(o) > 1) i = u(a * e + n * r * M);
        else {
            var s = Math.sin(.5 * t),
                c = Math.sin(.5 * o);
            i = 2 * h(Math.sqrt(s * s + n * r * c * c))
        }
        return Math.abs(i) > da ? [i, Math.atan2(r * Math.sin(o), n * e - a * r * M)] : [0, 0]
    }

    function F(t, n, a) { return u(.5 * (t * t + n * n - a * a) / (t * n)) }

    function j(t) { return t - 2 * pa * Math.floor((t + pa) / (2 * pa)) }

    function A(t) { return [t[0] * ma, t[1] * ma] }

    function G(t, n) { var a = M(1 - Math.sin(n)); return [2 / qa * t * a, qa * (1 - a)] }

    function C(t) {
        function n(t, n) { return [t, (t ? t / Math.sin(t) : 1) * (Math.sin(n) * Math.cos(t) - a * Math.cos(n))] }
        var a = Math.tan(t);
        return n.invert = a ? function(t, n) { t && (n *= Math.sin(t) / t); var r = Math.cos(t); return [t, 2 * Math.atan2(Math.sqrt(r * r + a * a - n * n) - r, a - n)] } : function(t, n) { return [t, h(t ? n * Math.tan(t) / t : n)] }, n
    }

    function D(t, n) { var a = Math.sqrt(3); return [a * t * (2 * Math.cos(2 * n / 3) - 1) / qa, a * qa * Math.sin(n / 3)] }

    function L(t) {
        function n(t, n) { return [t * a, Math.sin(n) / a] }
        var a = Math.cos(t);
        return n.invert = function(t, n) { return [t / a, h(n * a)] }, n
    }

    function O(t) {
        function n(t, n) { return [t * a, (1 + a) * Math.tan(.5 * n)] }
        var a = Math.cos(t);
        return n.invert = function(t, n) { return [t / a, 2 * Math.atan(n / (1 + a))] }, n
    }

    function H(t, n) { var a = Math.sqrt(8 / (3 * pa)); return [a * t * (1 - Math.abs(n) / pa), a * n] }

    function I(t, n) { var a = Math.sqrt(4 - 3 * Math.sin(Math.abs(n))); return [2 / Math.sqrt(6 * pa) * t * a, i(n) * Math.sqrt(2 * pa / 3) * (2 - a)] }

    function J(t, n) { var a = Math.sqrt(pa * (4 + pa)); return [2 / a * t * (1 + Math.sqrt(1 - 4 * n * n / (pa * pa))), 4 / a * n] }

    function K(t, n) {
        var a = (2 + wa) * Math.sin(n);
        n /= 2;
        for (var r = 0, e = 1 / 0; 10 > r && Math.abs(e) > da; r++) {
            var o = Math.cos(n);
            n -= e = (n + Math.sin(n) * (o + 2) - a) / (2 * o * (1 + o))
        }
        return [2 / Math.sqrt(pa * (4 + pa)) * t * (1 + Math.cos(n)), 2 * Math.sqrt(pa / (4 + pa)) * Math.sin(n)]
    }

    function N(t, n) { return [t * (1 + Math.cos(n)) / Math.sqrt(2 + pa), 2 * n / Math.sqrt(2 + pa)] }

    function U(t, n) { for (var a = (1 + wa) * Math.sin(n), r = 0, e = 1 / 0; 10 > r && Math.abs(e) > da; r++) n -= e = (n + Math.sin(n) - a) / (1 + Math.cos(n)); return a = Math.sqrt(2 + pa), [t * (1 + Math.cos(n)) / a, 2 * n / a] }

    function V(t, n) {
        var a = Math.sin(t /= 2),
            r = Math.cos(t),
            e = Math.sqrt(Math.cos(n)),
            o = Math.cos(n /= 2),
            i = Math.sin(n) / (o + Math.SQRT2 * r * e),
            h = Math.sqrt(2 / (1 + i * i)),
            u = Math.sqrt((Math.SQRT2 * o + (r + a) * e) / (Math.SQRT2 * o + (r - a) * e));
        return [Pa * (h * (u - 1 / u) - 2 * Math.log(u)), Pa * (h * i * (u + 1 / u) - 2 * Math.atan(i))]
    }

    function W(t, n) { var a = Math.tan(n / 2); return [t * _a * M(1 - a * a), (1 + _a) * a] }

    function X(t, n) {
        var a = n / 2,
            r = Math.cos(a);
        return [2 * t / qa * Math.cos(n) * r * r, qa * Math.tan(a)]
    }

    function Y(t, n) {
        function a(n, a) {
            var o = za(n, a),
                i = o[0],
                h = o[1],
                u = i * i + h * h;
            if (u > e) {
                var M = Math.sqrt(u),
                    s = Math.atan2(h, i),
                    c = r * Math.round(s / r),
                    f = s - c,
                    v = t * Math.cos(f),
                    l = (t * Math.sin(f) - f * Math.sin(v)) / (wa - v),
                    g = Z(f, l),
                    d = (pa - t) / tn(g, v, pa);
                i = M;
                var b, p = 50;
                do i -= b = (t + tn(g, v, i) * d - M) / (g(i) * d); while (Math.abs(b) > da && --p > 0);
                h = f * Math.sin(i), wa > i && (h -= l * (i - wa));
                var w = Math.sin(c),
                    q = Math.cos(c);
                o[0] = i * q - h * w, o[1] = i * w + h * q
            }
            return o
        }
        var r = 2 * pa / n,
            e = t * t;
        return a.invert = function(n, a) {
            var o = n * n + a * a;
            if (o > e) {
                var i = Math.sqrt(o),
                    h = Math.atan2(a, n),
                    u = r * Math.round(h / r),
                    M = h - u,
                    n = i * Math.cos(M);
                a = i * Math.sin(M);
                for (var s = n - wa, c = Math.sin(n), f = a / c, v = wa > n ? 1 / 0 : 0, l = 10;;) {
                    var g = t * Math.sin(f),
                        d = t * Math.cos(f),
                        b = Math.sin(d),
                        p = wa - d,
                        w = (g - f * b) / p,
                        q = Z(f, w);
                    if (Math.abs(v) < ba || !--l) break;
                    f -= v = (f * c - w * s - a) / (c - 2 * s * (p * (d + f * g * Math.cos(d) - b) - g * (g - f * b)) / (p * p))
                }
                i = t + tn(q, d, n) * (pa - t) / tn(q, d, pa), h = u + f, n = i * Math.cos(h), a = i * Math.sin(h)
            }
            return za.invert(n, a)
        }, a
    }

    function Z(t, n) { return function(a) { var r = t * Math.cos(a); return wa > a && (r -= n), Math.sqrt(1 + r * r) } }

    function $() {
        var t = 6,
            n = 30 * ma,
            a = Math.cos(n),
            r = Math.sin(n),
            e = Qa(Y),
            o = e(n, t),
            i = o.stream,
            h = .01,
            u = -Math.cos(h * ma),
            M = Math.sin(h * ma);
        return o.radius = function(o) { return arguments.length ? (a = Math.cos(n = o * ma), r = Math.sin(n), e(n, t)) : n * ya }, o.lobes = function(a) { return arguments.length ? e(n, t = +a) : t }, o.stream = function(n) {
            var e = o.rotate(),
                h = i(n),
                s = (o.rotate([0, 0]), i(n));
            return o.rotate(e), h.sphere = function() {
                s.polygonStart(), s.lineStart();
                for (var n = 0, e = 2 * pa / t, o = 0; t > n; ++n, o -= e) s.point(Math.atan2(M * Math.cos(o), u) * ya, Math.asin(M * Math.sin(o)) * ya), s.point(Math.atan2(r * Math.cos(o - e / 2), a) * ya, Math.asin(r * Math.sin(o - e / 2)) * ya);
                s.lineEnd(), s.polygonEnd()
            }, h
        }, o
    }

    function tn(t, n, a) { for (var r = 50, e = (a - n) / r, o = t(n) + t(a), i = 1, h = n; r > i; ++i) o += 2 * t(h += e); return .5 * o * e }

    function nn(t, n, a, r, e, o, i, h) {
        function u(u, M) {
            if (!M) return [t * u / pa, 0];
            var s = M * M,
                c = t + s * (n + s * (a + s * r)),
                f = M * (e - 1 + s * (o - h + s * i)),
                v = (c * c + f * f) / (2 * f),
                l = u * Math.asin(c / v) / pa;
            return [v * Math.sin(l), M * (1 + s * h) + v * (1 - Math.cos(l))]
        }
        return arguments.length < 8 && (h = 0), u.invert = function(u, s) {
            var c, f, v = pa * u / t,
                l = s,
                g = 50;
            do {
                var d = l * l,
                    b = t + d * (n + d * (a + d * r)),
                    p = l * (e - 1 + d * (o - h + d * i)),
                    w = b * b + p * p,
                    q = 2 * p,
                    m = w / q,
                    y = m * m,
                    S = Math.asin(b / m) / pa,
                    Q = v * S;
                if (xB2 = b * b, dxBdφ = (2 * n + d * (4 * a + 6 * d * r)) * l, dyBdφ = e + d * (3 * o + 5 * d * i), dpdφ = 2 * (b * dxBdφ + p * (dyBdφ - 1)), dqdφ = 2 * (dyBdφ - 1), dmdφ = (dpdφ * q - w * dqdφ) / (q * q), cosα = Math.cos(Q), sinα = Math.sin(Q), mcosα = m * cosα, msinα = m * sinα, dαdφ = v / pa * (1 / M(1 - xB2 / y)) * (dxBdφ * m - b * dmdφ) / y, fx = msinα - u, fy = l * (1 + d * h) + m - mcosα - s, δxδφ = dmdφ * sinα + mcosα * dαdφ, δxδλ = mcosα * S, δyδφ = 1 + dmdφ - (dmdφ * cosα - msinα * dαdφ), δyδλ = msinα * S, denominator = δxδφ * δyδλ - δyδφ * δxδλ, !denominator) break;
                v -= c = (fy * δxδφ - fx * δyδφ) / denominator, l -= f = (fx * δyδλ - fy * δxδλ) / denominator
            } while ((Math.abs(c) > da || Math.abs(f) > da) && --g > 0);
            return [v, l]
        }, u
    }

    function an(t, n) {
        var a = t * t,
            r = n * n;
        return [t * (1 - .162388 * r) * (.87 - 952426e-9 * a * a), n * (1 + r / 12)]
    }

    function rn(t) {
        function n() {
            var t = !1,
                n = Qa(a),
                r = n(t);
            return r.quincuncial = function(a) { return arguments.length ? n(t = !!a) : t }, r
        }

        function a(n) {
            var a = n ? function(n, a) {
                var e = Math.abs(n) < wa,
                    o = t(e ? n : n > 0 ? n - pa : n + pa, a),
                    h = (o[0] - o[1]) * Math.SQRT1_2,
                    u = (o[0] + o[1]) * Math.SQRT1_2;
                if (e) return [h, u];
                var M = r * Math.SQRT1_2,
                    s = h > 0 ^ u > 0 ? -1 : 1;
                return [s * h - i(u) * M, s * u - i(h) * M]
            } : function(n, a) {
                var e = n > 0 ? -.5 : .5,
                    o = t(n + e * pa, a);
                return o[0] -= e * r, o
            };
            return t.invert && (a.invert = n ? function(n, a) {
                var e = (n + a) * Math.SQRT1_2,
                    o = (a - n) * Math.SQRT1_2,
                    i = Math.abs(e) < .5 * r && Math.abs(o) < .5 * r;
                if (!i) {
                    var h = r * Math.SQRT1_2,
                        u = e > 0 ^ o > 0 ? -1 : 1,
                        M = -u * (n + (o > 0 ? 1 : -1) * h),
                        s = -u * (a + (e > 0 ? 1 : -1) * h);
                    e = (-M - s) * Math.SQRT1_2, o = (M - s) * Math.SQRT1_2
                }
                var c = t.invert(e, o);
                return i || (c[0] += e > 0 ? pa : -pa), c
            } : function(n, a) {
                var e = n > 0 ? -.5 : .5,
                    o = t.invert(n + e * r, a),
                    i = o[0] - e * pa;
                return -pa > i ? i += 2 * pa : i > pa && (i -= 2 * pa), o[0] = i, o
            }), a
        }
        var r = t(wa, 0)[0] - t(-wa, 0)[0];
        return n.raw = a, n
    }

    function en(t, n) {
        var a = i(t),
            r = i(n),
            e = Math.cos(n),
            o = Math.cos(t) * e,
            u = Math.sin(t) * e,
            M = Math.sin(r * n);
        t = Math.abs(Math.atan2(u, M)), n = h(o), Math.abs(t - wa) > da && (t %= wa);
        var s = on(t > pa / 4 ? wa - t : t, n);
        return t > pa / 4 && (M = s[0], s[0] = -s[1], s[1] = -M), s[0] *= a, s[1] *= -r, s
    }

    function on(t, n) {
        if (n === wa) return [0, 0];
        var a = Math.sin(n),
            r = a * a,
            e = r * r,
            o = 1 + e,
            i = 1 + 3 * e,
            u = 1 - e,
            s = h(1 / Math.sqrt(o)),
            c = u + r * o * s,
            f = (1 - a) / c,
            v = Math.sqrt(f),
            l = f * o,
            g = Math.sqrt(l),
            d = v * u;
        if (0 === t) return [0, -(d + r * g)];
        var b = Math.cos(n),
            p = 1 / b,
            w = 2 * a * b,
            q = (-3 * r + s * i) * w,
            m = (-c * b - (1 - a) * q) / (c * c),
            y = .5 * m / v,
            S = u * y - 2 * r * v * w,
            Q = r * o * m + f * i * w,
            R = -p * w,
            T = -p * Q,
            x = -2 * p * S,
            E = 4 * t / pa;
        if (t > .222 * pa || pa / 4 > n && t > .175 * pa) {
            var k = (d + r * M(l * (1 + e) - d * d)) / (1 + e);
            if (t > pa / 4) return [k, k];
            var P = k,
                _ = .5 * k,
                z = 50;
            k = .5 * (_ + P);
            do {
                var B = Math.sqrt(l - k * k),
                    F = k * (x + R * B) + T * h(k / g) - E;
                if (!F) break;
                0 > F ? _ = k : P = k, k = .5 * (_ + P)
            } while (Math.abs(P - _) > da && --z > 0)
        } else {
            var j, k = da,
                z = 25;
            do {
                var A = k * k,
                    B = M(l - A),
                    G = x + R * B,
                    F = k * G + T * h(k / g) - E,
                    C = G + (T - R * A) / B;
                k -= j = B ? F / C : 0
            } while (Math.abs(j) > da && --z > 0)
        }
        return [k, -d - r * M(l - k * k)]
    }

    function hn(t, n) {
        for (var a = 0, r = 1, e = .5, o = 50;;) {
            var i = e * e,
                h = Math.sqrt(e),
                u = Math.asin(1 / Math.sqrt(1 + i)),
                M = 1 - i + e * (1 + i) * u,
                s = (1 - h) / M,
                c = Math.sqrt(s),
                f = s * (1 + i),
                v = c * (1 - i),
                l = f - t * t,
                g = Math.sqrt(l),
                d = n + v + e * g;
            if (Math.abs(r - a) < ba || 0 === --o || 0 === d) break;
            d > 0 ? a = e : r = e, e = .5 * (a + r)
        }
        if (!o) return null;
        var b = Math.asin(h),
            p = Math.cos(b),
            w = 1 / p,
            q = 2 * h * p,
            m = (-3 * e + u * (1 + 3 * i)) * q,
            y = (-M * p - (1 - h) * m) / (M * M),
            S = .5 * y / c,
            Q = (1 - i) * S - 2 * e * c * q,
            R = -2 * w * Q,
            T = -w * q,
            x = -w * (e * (1 + i) * y + s * (1 + 3 * i) * q);
        return [pa / 4 * (t * (R + T * g) + x * Math.asin(t / Math.sqrt(f))), b]
    }

    function un(t, n, a) {
        if (!t) {
            var r = Mn(n, 1 - a);
            return [
                [0, r[0] / r[1]],
                [1 / r[1], 0],
                [r[2] / r[1], 0]
            ]
        }
        var e = Mn(t, a);
        if (!n) return [
            [e[0], 0],
            [e[1], 0],
            [e[2], 0]
        ];
        var r = Mn(n, 1 - a),
            o = r[1] * r[1] + a * e[0] * e[0] * r[0] * r[0];
        return [
            [e[0] * r[2] / o, e[1] * e[2] * r[0] * r[1] / o],
            [e[1] * r[1] / o, -e[0] * e[2] * r[0] * r[2] / o],
            [e[2] * r[1] * r[2] / o, -a * e[0] * e[1] * r[0] / o]
        ]
    }

    function Mn(t, n) {
        var a, r, e, o, i;
        if (da > n) return o = Math.sin(t), r = Math.cos(t), a = .25 * n * (t - o * r), [o - a * r, r + a * o, 1 - .5 * n * o * o, t - a];
        if (n >= 1 - da) return a = .25 * (1 - n), r = b(t), o = g(t), e = 1 / r, i = r * d(t), [o + a * (i - t) / (r * r), e - a * o * e * (i - t), e + a * o * e * (i + t), 2 * Math.atan(Math.exp(t)) - wa + a * (i - t) / r];
        var u = [1, 0, 0, 0, 0, 0, 0, 0, 0],
            s = [Math.sqrt(n), 0, 0, 0, 0, 0, 0, 0, 0],
            c = 0;
        for (r = Math.sqrt(1 - n), i = 1; Math.abs(s[c] / u[c]) > da && 8 > c;) a = u[c++], s[c] = .5 * (a - r), u[c] = .5 * (a + r), r = M(a * r), i *= 2;
        e = i * u[c] * t;
        do o = s[c] * Math.sin(r = e) / u[c], e = .5 * (h(o) + e); while (--c);
        return [Math.sin(e), o = Math.cos(e), o / Math.cos(e - r), e]
    }

    function sn(t, n, a) {
        var r = Math.abs(t),
            e = Math.abs(n),
            o = d(e);
        if (r) {
            var h = 1 / Math.sin(r),
                u = 1 / (Math.tan(r) * Math.tan(r)),
                s = -(u + a * o * o * h * h - 1 + a),
                c = (a - 1) * u,
                f = .5 * (-s + Math.sqrt(s * s - 4 * c));
            return [cn(Math.atan(1 / Math.sqrt(f)), a) * i(t), cn(Math.atan(M((f / u - 1) / a)), 1 - a) * i(n)]
        }
        return [0, cn(Math.atan(o), 1 - a) * i(n)]
    }

    function cn(t, n) {
        if (!n) return t;
        if (1 === n) return Math.log(Math.tan(t / 2 + pa / 4));
        for (var a = 1, r = Math.sqrt(1 - n), e = Math.sqrt(n), o = 0; Math.abs(e) > da; o++) {
            if (t % pa) {
                var i = Math.atan(r * Math.tan(t) / a);
                0 > i && (i += pa), t += i + ~~(t / pa) * pa
            } else t += t;
            e = (a + r) / 2, r = Math.sqrt(a * r), e = ((a = e) - r) / 2
        }
        return t / (Math.pow(2, o) * a)
    }

    function fn(t, n) {
        var a = (Math.SQRT2 - 1) / (Math.SQRT2 + 1),
            r = Math.sqrt(1 - a * a),
            e = cn(wa, r * r),
            o = -1,
            i = Math.log(Math.tan(pa / 4 + Math.abs(n) / 2)),
            h = Math.exp(o * i) / Math.sqrt(a),
            u = vn(h * Math.cos(o * t), h * Math.sin(o * t)),
            M = sn(u[0], u[1], r * r);
        return [-M[1], (n >= 0 ? 1 : -1) * (.5 * e - M[0])]
    }

    function vn(t, n) {
        var a = t * t,
            r = n + 1,
            e = 1 - a - n * n;
        return [.5 * ((t >= 0 ? wa : -wa) - Math.atan2(e, 2 * t)), -.25 * Math.log(e * e + 4 * a) + .5 * Math.log(r * r + a)]
    }

    function ln(t, n) { var a = n[0] * n[0] + n[1] * n[1]; return [(t[0] * n[0] + t[1] * n[1]) / a, (t[1] * n[0] - t[0] * n[1]) / a] }

    function gn(t) {
        function n(t, n) {
            var o = e(t, n);
            t = o[0], n = o[1];
            var i = Math.sin(n),
                h = Math.cos(n),
                M = Math.cos(t),
                s = u(a * i + r * h * M),
                c = Math.sin(s),
                f = Math.abs(c) > da ? s / c : 1;
            return [f * r * Math.sin(t), (Math.abs(t) > wa ? f : -f) * (a * h - r * i * M)]
        }
        var a = Math.sin(t),
            r = Math.cos(t),
            e = dn(t);
        return e.invert = dn(-t), n.invert = function(t, n) {
            var r = Math.sqrt(t * t + n * n),
                o = -Math.sin(r),
                i = Math.cos(r),
                h = r * i,
                u = -n * o,
                s = r * a,
                c = M(h * h + u * u - s * s),
                f = Math.atan2(h * s + u * c, u * s - h * c),
                v = (r > wa ? -1 : 1) * Math.atan2(t * o, r * Math.cos(f) * i + n * Math.sin(f) * o);
            return e.invert(v, f)
        }, n
    }

    function dn(t) {
        var n = Math.sin(t),
            a = Math.cos(t);
        return function(t, r) {
            var e = Math.cos(r),
                o = Math.cos(t) * e,
                i = Math.sin(t) * e,
                u = Math.sin(r);
            return [Math.atan2(i, o * a - u * n), h(u * a + o * n)]
        }
    }

    function bn() {
        var t = 0,
            n = Qa(gn),
            a = n(t),
            r = a.rotate,
            e = a.stream,
            o = d3.geo.circle();
        return a.parallel = function(r) { if (!arguments.length) return 180 * (t / pa); var e = a.rotate(); return n(t = r * pa / 180).rotate(e) }, a.rotate = function(n) { return arguments.length ? (r.call(a, [n[0], n[1] - 180 * (t / pa)]), o.origin([-n[0], -n[1]]), a) : (n = r.call(a), n[1] += 180 * (t / pa), n) }, a.stream = function(t) {
            return t = e(t), t.sphere = function() {
                t.polygonStart();
                var n, a = .01,
                    r = o.angle(90 - a)().coordinates[0],
                    e = r.length - 1,
                    i = -1;
                for (t.lineStart(); ++i < e;) t.point((n = r[i])[0], n[1]);
                for (t.lineEnd(), r = o.angle(90 + a)().coordinates[0], e = r.length - 1, t.lineStart(); --i >= 0;) t.point((n = r[i])[0], n[1]);
                t.lineEnd(), t.polygonEnd()
            }, t
        }, a
    }

    function pn(t, n) {
        function a(a, r) { var e = Ga(a / n, r); return e[0] *= t, e }
        return arguments.length < 2 && (n = t), 1 === n ? Ga : 1 / 0 === n ? qn : (a.invert = function(a, r) { var e = Ga.invert(a / t, r); return e[0] *= n, e }, a)
    }

    function wn() {
        var t = 2,
            n = Qa(pn),
            a = n(t);
        return a.coefficient = function(a) { return arguments.length ? n(t = +a) : t }, a
    }

    function qn(t, n) { return [t * Math.cos(n) / Math.cos(n /= 2), 2 * Math.sin(n)] }

    function mn(t, n) { for (var a, r = Math.sin(n) * (0 > n ? 2.43763 : 2.67595), e = 0; 20 > e && (n -= a = (n + Math.sin(n) - r) / (1 + Math.cos(n)), !(Math.abs(a) < da)); e++); return [.85 * t * Math.cos(n *= .5), Math.sin(n) * (0 > n ? 1.93052 : 1.75859)] }

    function yn(t) {
        function n(n, s) {
            var c, f = Math.abs(s);
            if (f > r) {
                var v = Math.min(t - 1, Math.max(0, Math.floor((n + pa) / M)));
                n += pa * (t - 1) / t - v * M, c = d3.geo.collignon.raw(n, f), c[0] = c[0] * e / o - e * (t - 1) / (2 * t) + v * e / t, c[1] = i + 4 * (c[1] - h) * u / e, 0 > s && (c[1] = -c[1])
            } else c = a(n, s);
            return c[0] /= 2, c
        }
        var a = d3.geo.cylindricalEqualArea.raw(0),
            r = Ca * pa / 180,
            e = 2 * pa,
            o = d3.geo.collignon.raw(pa, r)[0] - d3.geo.collignon.raw(-pa, r)[0],
            i = a(0, r)[1],
            h = d3.geo.collignon.raw(0, r)[1],
            u = d3.geo.collignon.raw(0, wa)[1] - h,
            M = 2 * pa / t;
        return n.invert = function(n, r) {
            n *= 2;
            var s = Math.abs(r);
            if (s > i) {
                var c = Math.min(t - 1, Math.max(0, Math.floor((n + pa) / M)));
                n = (n + pa * (t - 1) / t - c * M) * o / e;
                var f = d3.geo.collignon.raw.invert(n, .25 * (s - i) * e / u + h);
                return f[0] -= pa * (t - 1) / t - c * M, 0 > r && (f[1] = -f[1]), f
            }
            return a.invert(n, r)
        }, n
    }

    function Sn() {
        function t() { var t = 180 / n; return { type: "Polygon", coordinates: [d3.range(-180, 180 + t / 2, t).map(function(t, n) { return [t, 1 & n ? 90 - 1e-6 : Ca] }).concat(d3.range(180, -180 - t / 2, -t).map(function(t, n) { return [t, 1 & n ? -90 + 1e-6 : -Ca] }))] } }
        var n = 2,
            a = Qa(yn),
            r = a(n),
            e = r.stream;
        return r.lobes = function(t) { return arguments.length ? a(n = +t) : n }, r.stream = function(n) {
            var a = r.rotate(),
                o = e(n),
                i = (r.rotate([0, 0]), e(n));
            return r.rotate(a), o.sphere = function() { d3.geo.stream(t(), i) }, o
        }, r
    }

    function Qn(t) {
        function n(n, e) {
            var h, u, f = 1 - Math.sin(e);
            if (f && 2 > f) {
                var v, l = wa - e,
                    g = 25;
                do {
                    var d = Math.sin(l),
                        b = Math.cos(l),
                        p = o + Math.atan2(d, r - b),
                        w = 1 + c - 2 * r * b;
                    l -= v = (l - s * o - r * d + w * p - .5 * f * a) / (2 * r * d * p)
                } while (Math.abs(v) > ba && --g > 0);
                h = i * Math.sqrt(w), u = n * p / pa
            } else h = i * (t + f), u = n * o / pa;
            return [h * Math.sin(u), M - h * Math.cos(u)]
        }
        var a, r = 1 + t,
            e = Math.sin(1 / r),
            o = h(e),
            i = 2 * Math.sqrt(pa / (a = pa + 4 * o * r)),
            M = .5 * i * (r + Math.sqrt(t * (2 + t))),
            s = t * t,
            c = r * r;
        return n.invert = function(t, n) {
            var e = t * t + (n -= M) * n,
                f = (1 + c - e / (i * i)) / (2 * r),
                v = u(f),
                l = Math.sin(v),
                g = o + Math.atan2(l, r - f);
            return [h(t / Math.sqrt(e)) * pa / g, h(1 - 2 * (v - s * o - r * l + (1 + c - 2 * r * f) * g) / a)]
        }, n
    }

    function Rn() {
        var t = 1,
            n = Qa(Qn),
            a = n(t);
        return a.ratio = function(a) { return arguments.length ? n(t = +a) : t }, a
    }

    function Tn(t, n) { return n > -Da ? (t = Ea(t, n), t[1] += La, t) : E(t, n) }

    function xn(t, n) { return Math.abs(n) > Da ? (t = Ea(t, n), t[1] -= n > 0 ? La : -La, t) : E(t, n) }

    function En(t, n) { return [3 * t / (2 * pa) * Math.sqrt(pa * pa / 3 - n * n), n] }

    function kn(t) {
        function n(n, a) {
            if (Math.abs(Math.abs(a) - wa) < da) return [0, 0 > a ? -2 : 2];
            var r = Math.sin(a),
                e = Math.pow((1 + r) / (1 - r), t / 2),
                o = .5 * (e + 1 / e) + Math.cos(n *= t);
            return [2 * Math.sin(n) / o, (e - 1 / e) / o]
        }
        return n.invert = function(n, a) {
            var r = Math.abs(a);
            if (Math.abs(r - 2) < da) return n ? null : [0, i(a) * wa];
            if (r > 2) return null;
            n /= 2, a /= 2;
            var e = n * n,
                o = a * a,
                u = 2 * a / (1 + e + o);
            return u = Math.pow((1 + u) / (1 - u), 1 / t), [Math.atan2(2 * n, 1 - e - o) / t, h((u - 1) / (u + 1))]
        }, n
    }

    function Pn() {
        var t = .5,
            n = Qa(kn),
            a = n(t);
        return a.spacing = function(a) { return arguments.length ? n(t = +a) : t }, a
    }

    function _n(t, n) { return [t * (1 + Math.sqrt(Math.cos(n))) / 2, n / (Math.cos(n / 2) * Math.cos(t / 6))] }

    function zn(t, n) {
        var a = t * t,
            r = n * n;
        return [t * (.975534 + r * (-.119161 + a * -.0143059 + r * -.0547009)), n * (1.00384 + a * (.0802894 + r * -.02855 + 199025e-9 * a) + r * (.0998909 + r * -.0491032))]
    }

    function Bn(t, n) { return [Math.sin(t) / Math.cos(n), Math.tan(n) * Math.cos(t)] }

    function Fn(t) {
        function n(n, e) {
            var o = e - t,
                i = Math.abs(o) < da ? n * a : Math.abs(i = pa / 4 + e / 2) < da || Math.abs(Math.abs(i) - wa) < da ? 0 : n * o / Math.log(Math.tan(i) / r);
            return [i, o]
        }
        var a = Math.cos(t),
            r = Math.tan(pa / 4 + t / 2);
        return n.invert = function(n, e) { var o, i = e + t; return [Math.abs(e) < da ? n / a : Math.abs(o = pa / 4 + i / 2) < da || Math.abs(Math.abs(o) - wa) < da ? 0 : n * Math.log(Math.tan(o) / r) / e, i] }, n
    }

    function jn(t, n) { return [t, 1.25 * Math.log(Math.tan(pa / 4 + .4 * n))] }

    function An(t) {
        function n(n, r) { for (var e, o = Math.cos(r), i = 2 / (1 + o * Math.cos(n)), h = i * o * Math.sin(n), u = i * Math.sin(r), M = a, s = t[M], c = s[0], f = s[1]; --M >= 0;) s = t[M], c = s[0] + h * (e = c) - u * f, f = s[1] + h * f + u * e; return c = h * (e = c) - u * f, f = h * f + u * e, [c, f] }
        var a = t.length - 1;
        return n.invert = function(n, r) {
            var e = 20,
                o = n,
                i = r;
            do {
                for (var u, M = a, s = t[M], c = s[0], f = s[1], v = 0, l = 0; --M >= 0;) s = t[M], v = c + o * (u = v) - i * l, l = f + o * l + i * u, c = s[0] + o * (u = c) - i * f, f = s[1] + o * f + i * u;
                v = c + o * (u = v) - i * l, l = f + o * l + i * u, c = o * (u = c) - i * f - n, f = o * f + i * u - r;
                var g, d, b = v * v + l * l;
                o -= g = (c * v + f * l) / b, i -= d = (f * v - c * l) / b
            } while (Math.abs(g) + Math.abs(d) > da * da && --e > 0);
            if (e) {
                var p = Math.sqrt(o * o + i * i),
                    w = 2 * Math.atan(.5 * p),
                    q = Math.sin(w);
                return [Math.atan2(o * q, p * Math.cos(w)), p ? h(i * q / p) : 0]
            }
        }, n
    }

    function Gn() {
        var t = Oa.miller,
            n = Qa(An),
            a = n(t);
        return a.coefficients = function(a) { return arguments.length ? n(t = "string" == typeof a ? Oa[a] : a) : t }, a
    }

    function Cn(t, n) {
        var a = Math.sqrt(6),
            r = Math.sqrt(7),
            e = Math.asin(7 * Math.sin(n) / (3 * a));
        return [a * t * (2 * Math.cos(2 * e / 3) - 1) / r, 9 * Math.sin(e / 3) / r]
    }

    function Dn(t, n) { for (var a, r = (1 + Math.SQRT1_2) * Math.sin(n), e = n, o = 0; 25 > o && (e -= a = (Math.sin(e / 2) + Math.sin(e) - r) / (.5 * Math.cos(e / 2) + Math.cos(e)), !(Math.abs(a) < da)); o++); return [t * (1 + 2 * Math.cos(e) / Math.cos(e / 2)) / (3 * Math.SQRT2), 2 * Math.sqrt(3) * Math.sin(e / 2) / Math.sqrt(2 + Math.SQRT2)] }

    function Ln(t, n) { for (var a, r = Math.sqrt(6 / (4 + pa)), e = (1 + pa / 4) * Math.sin(n), o = n / 2, i = 0; 25 > i && (o -= a = (o / 2 + Math.sin(o) - e) / (.5 + Math.cos(o)), !(Math.abs(a) < da)); i++); return [r * (.5 + Math.cos(o)) * t / 1.5, r * o] }

    function On(t, n) {
        var a = n * n,
            r = a * a;
        return [t * (.8707 - .131979 * a + r * (-.013791 + r * (.003971 * a - .001529 * r))), n * (1.007226 + a * (.015085 + r * (-.044475 + .028874 * a - .005916 * r)))]
    }

    function Hn(t, n) { return [t * (1 + Math.cos(n)) / 2, 2 * (n - Math.tan(n / 2))] }

    function In(t, n) { var a = n * n; return [t, n * (Ha + a * a * (Ia + a * (Ja + Ka * a)))] }

    function Jn(t, n) {
        if (Math.abs(n) < da) return [t, 0];
        var a = Math.tan(n),
            r = t * Math.sin(n);
        return [Math.sin(r) / a, n + (1 - Math.cos(r)) / a]
    }

    function Kn(t) {
        function n(n, r) {
            var e = a ? Math.tan(n * a / 2) / a : n / 2;
            if (!r) return [2 * e, -t];
            var o = 2 * Math.atan(e * Math.sin(r)),
                i = 1 / Math.tan(r);
            return [Math.sin(o) * i, r + (1 - Math.cos(o)) * i - t]
        }
        var a = Math.sin(t);
        return n.invert = function(n, r) {
            if (Math.abs(r += t) < da) return [a ? 2 * Math.atan(a * n / 2) / a : n, 0];
            var e, o = n * n + r * r,
                i = 0,
                M = 10;
            do {
                var s = Math.tan(i),
                    c = 1 / Math.cos(i),
                    f = o - 2 * r * i + i * i;
                i -= e = (s * f + 2 * (i - r)) / (2 + f * c * c + 2 * (i - r) * s)
            } while (Math.abs(e) > da && --M > 0);
            var v = n * (s = Math.tan(i)),
                l = Math.tan(Math.abs(r) < Math.abs(i + 1 / s) ? .5 * h(v) : .5 * u(v) + pa / 4) / Math.sin(i);
            return [a ? 2 * Math.atan(a * l) / a : 2 * l, i]
        }, n
    }

    function Nn(t, n) {
        var a, r = Math.min(18, 36 * Math.abs(n) / pa),
            e = Math.floor(r),
            o = r - e,
            i = (a = Za[e])[0],
            h = a[1],
            u = (a = Za[++e])[0],
            M = a[1],
            s = (a = Za[Math.min(19, ++e)])[0],
            c = a[1];
        return [t * (u + o * (s - i) / 2 + o * o * (s - 2 * u + i) / 2), (n > 0 ? wa : -wa) * (M + o * (c - h) / 2 + o * o * (c - 2 * M + h) / 2)]
    }

    function Un(t) {
        function n(n, a) {
            var r = Math.cos(a),
                e = (t - 1) / (t - r * Math.cos(n));
            return [e * r * Math.sin(n), e * Math.sin(a)]
        }
        return n.invert = function(n, a) {
            var r = n * n + a * a,
                e = Math.sqrt(r),
                o = (t - Math.sqrt(1 - r * (t + 1) / (t - 1))) / ((t - 1) / e + e / (t - 1));
            return [Math.atan2(n * o, e * Math.sqrt(1 - o * o)), e ? h(a * o / e) : 0]
        }, n
    }

    function Vn(t, n) {
        function a(n, a) {
            var i = r(n, a),
                h = i[1],
                u = h * o / (t - 1) + e;
            return [i[0] * e / u, h / u]
        }
        var r = Un(t);
        if (!n) return r;
        var e = Math.cos(n),
            o = Math.sin(n);
        return a.invert = function(n, a) { var i = (t - 1) / (t - 1 - a * o); return r.invert(i * n, i * a * e) }, a
    }

    function Wn() {
        var t = 1.4,
            n = 0,
            a = Qa(Vn),
            r = a(t, n);
        return r.distance = function(r) { return arguments.length ? a(t = +r, n) : t }, r.tilt = function(r) { return arguments.length ? a(t, n = r * pa / 180) : 180 * n / pa }, r
    }

    function Xn(t, n) {
        var a = Math.tan(n / 2),
            r = Math.sin(pa / 4 * a);
        return [t * (.74482 - .34588 * r * r), 1.70711 * a]
    }

    function Yn(t) {
        function n(n, o) {
            var i = u(Math.cos(o) * Math.cos(n - a)),
                h = u(Math.cos(o) * Math.cos(n - r)),
                s = 0 > o ? -1 : 1;
            return i *= i, h *= h, [(i - h) / (2 * t), s * M(4 * e * h - (e - i + h) * (e - i + h)) / (2 * t)]
        }
        if (!t) return d3.geo.azimuthalEquidistant.raw;
        var a = -t / 2,
            r = -a,
            e = t * t,
            o = Math.tan(r),
            i = .5 / Math.sin(r);
        return n.invert = function(t, n) {
            var e, h, M = n * n,
                s = Math.cos(Math.sqrt(M + (e = t + a) * e)),
                c = Math.cos(Math.sqrt(M + (e = t + r) * e));
            return [Math.atan2(h = s - c, e = (s + c) * o), (0 > n ? -1 : 1) * u(Math.sqrt(e * e + h * h) * i)]
        }, n
    }

    function Zn() {
        var t = [
                [0, 0],
                [0, 0]
            ],
            n = Qa(Yn),
            a = n(0),
            r = a.rotate;
        return delete a.rotate, a.points = function(a) {
            if (!arguments.length) return t;
            t = a;
            var e = d3.geo.interpolate(a[0], a[1]),
                o = e(.5),
                i = d3.geo.rotation([-o[0], -o[1]])(a[0]),
                u = .5 * e.distance,
                M = -h(Math.sin(i[1] * ma) / Math.sin(u));
            return i[0] > 0 && (M = pa - M), r.call(i, [-o[0], -o[1], -M * ya]), n(2 * u)
        }, a
    }

    function $n(t) {
        function n(t, n) { var r = d3.geo.gnomonic.raw(t, n); return r[0] *= a, r }
        var a = Math.cos(t);
        return n.invert = function(t, n) { return d3.geo.gnomonic.raw.invert(t / a, n) }, n
    }

    function ta() {
        var t = [
                [0, 0],
                [0, 0]
            ],
            n = Qa($n),
            a = n(0),
            r = a.rotate;
        return delete a.rotate, a.points = function(a) {
            if (!arguments.length) return t;
            t = a;
            var e = d3.geo.interpolate(a[0], a[1]),
                o = e(.5),
                i = d3.geo.rotation([-o[0], -o[1]])(a[0]),
                u = .5 * e.distance,
                M = -h(Math.sin(i[1] * ma) / Math.sin(u));
            return i[0] > 0 && (M = pa - M), r.call(i, [-o[0], -o[1], -M * ya]), n(u)
        }, a
    }

    function na(t, n) {
        if (Math.abs(n) < da) return [t, 0];
        var a = Math.abs(n / wa),
            r = h(a);
        if (Math.abs(t) < da || Math.abs(Math.abs(n) - wa) < da) return [0, i(n) * pa * Math.tan(r / 2)];
        var e = Math.cos(r),
            o = Math.abs(pa / t - t / pa) / 2,
            u = o * o,
            M = e / (a + e - 1),
            s = M * (2 / a - 1),
            c = s * s,
            f = c + u,
            v = M - c,
            l = u + M;
        return [i(t) * pa * (o * v + Math.sqrt(u * v * v - f * (M * M - c))) / f, i(n) * pa * (s * l - o * Math.sqrt((u + 1) * f - l * l)) / f]
    }

    function aa(t, n) {
        if (Math.abs(n) < da) return [t, 0];
        var a = Math.abs(n / wa),
            r = h(a);
        if (Math.abs(t) < da || Math.abs(Math.abs(n) - wa) < da) return [0, i(n) * pa * Math.tan(r / 2)];
        var e = Math.cos(r),
            o = Math.abs(pa / t - t / pa) / 2,
            u = o * o,
            s = e * (Math.sqrt(1 + u) - o * e) / (1 + u * a * a);
        return [i(t) * pa * s, i(n) * pa * M(1 - s * (2 * o + s))]
    }

    function ra(t, n) {
        if (Math.abs(n) < da) return [t, 0];
        var a = n / wa,
            r = h(a);
        if (Math.abs(t) < da || Math.abs(Math.abs(n) - wa) < da) return [0, pa * Math.tan(r / 2)];
        var e = (pa / t - t / pa) / 2,
            o = a / (1 + Math.cos(r));
        return [pa * (i(t) * M(e * e + 1 - o * o) - e), pa * o]
    }

    function ea(t, n) {
        if (!n) return [t, 0];
        var a = Math.abs(n);
        if (!t || a === wa) return [0, n];
        var r = a / wa,
            e = r * r,
            o = (8 * r - e * (e + 2) - 5) / (2 * e * (r - 1)),
            h = o * o,
            u = r * o,
            s = e + h + 2 * u,
            c = r + 3 * o,
            f = t / wa,
            v = f + 1 / f,
            l = i(Math.abs(t) - wa) * Math.sqrt(v * v - 4),
            g = l * l,
            d = s * (e + h * g - 1) + (1 - e) * (e * (c * c + 4 * h) + 12 * u * h + 4 * h * h),
            b = (l * (s + h - 1) + 2 * M(d)) / (4 * s + g);
        return [i(t) * wa * b, i(n) * wa * M(1 + l * Math.abs(b) - b * b)]
    }

    function oa(t, n) { return [t * Math.sqrt(1 - 3 * n * n / (pa * pa)), n] }

    function ia(t, n) {
        var a = .90631 * Math.sin(n),
            r = Math.sqrt(1 - a * a),
            e = Math.sqrt(2 / (1 + r * Math.cos(t /= 3)));
        return [2.66723 * r * e * Math.sin(t), 1.24104 * a * e]
    }

    function ha(t, n) {
        var a = Math.cos(n),
            r = Math.cos(t) * a,
            e = 1 - r,
            o = Math.cos(t = Math.atan2(Math.sin(t) * a, -Math.sin(n))),
            i = Math.sin(t);
        return a = M(1 - r * r), [i * a - o * e, -o * a - i * e]
    }

    function ua(t, n) { var a = f(t, n); return [(a[0] + t / wa) / 2, (a[1] + n) / 2] }
    d3.geo.project = function(t, a) { var r = a.stream; if (!r) throw new Error("not yet supported"); return (t && Ma.hasOwnProperty(t.type) ? Ma[t.type] : n)(t, r) };
    var Ma = { Feature: t, FeatureCollection: function(n, a) { return { type: "FeatureCollection", features: n.features.map(function(n) { return t(n, a) }) } } },
        sa = [],
        ca = [],
        fa = { point: function(t, n) { sa.push([t, n]) }, result: function() { var t = sa.length ? sa.length < 2 ? { type: "Point", coordinates: sa[0] } : { type: "MultiPoint", coordinates: sa } : null; return sa = [], t } },
        va = { lineStart: a, point: function(t, n) { sa.push([t, n]) }, lineEnd: function() { sa.length && (ca.push(sa), sa = []) }, result: function() { var t = ca.length ? ca.length < 2 ? { type: "LineString", coordinates: ca[0] } : { type: "MultiLineString", coordinates: ca } : null; return ca = [], t } },
        la = {
            polygonStart: a,
            lineStart: a,
            point: function(t, n) { sa.push([t, n]) },
            lineEnd: function() {
                var t = sa.length;
                if (t) {
                    do sa.push(sa[0].slice()); while (++t < 4);
                    ca.push(sa), sa = []
                }
            },
            polygonEnd: a,
            result: function() {
                if (!ca.length) return null;
                var t = [],
                    n = [];
                return ca.forEach(function(a) { r(a) ? t.push([a]) : n.push(a) }), n.forEach(function(n) {
                    var a = n[0];
                    t.some(function(t) { return e(t[0], a) ? (t.push(n), !0) : void 0 }) || t.push([n])
                }), ca = [], t.length ? t.length > 1 ? { type: "MultiPolygon", coordinates: t } : { type: "Polygon", coordinates: t[0] } : null
            }
        },
        ga = { Point: fa, MultiPoint: fa, LineString: va, MultiLineString: va, Polygon: la, MultiPolygon: la, Sphere: la },
        da = 1e-6,
        ba = da * da,
        pa = Math.PI,
        wa = pa / 2,
        qa = Math.sqrt(pa),
        ma = pa / 180,
        ya = 180 / pa,
        Sa = d3.geo.projection,
        Qa = d3.geo.projectionMutator;
    d3.geo.interrupt = function(t) {
        function n(n, a) { for (var r = 0 > a ? -1 : 1, e = h[+(0 > a)], o = 0, i = e.length - 1; i > o && n > e[o][2][0]; ++o); var u = t(n - e[o][1][0], a); return u[0] += t(e[o][1][0], r * a > r * e[o][0][1] ? e[o][0][1] : a)[0], u }

        function a() {
            i = h.map(function(n) {
                return n.map(function(n) {
                    var a, r = t(n[0][0], n[0][1])[0],
                        e = t(n[2][0], n[2][1])[0],
                        o = t(n[1][0], n[0][1])[1],
                        i = t(n[1][0], n[1][1])[1];
                    return o > i && (a = o, o = i, i = a), [
                        [r, o],
                        [e, i]
                    ]
                })
            })
        }

        function r() {
            for (var t = 1e-6, n = [], a = 0, r = h[0].length; r > a; ++a) {
                var o = h[0][a],
                    i = 180 * o[0][0] / pa,
                    u = 180 * o[0][1] / pa,
                    M = 180 * o[1][1] / pa,
                    s = 180 * o[2][0] / pa,
                    c = 180 * o[2][1] / pa;
                n.push(e([
                    [i + t, u + t],
                    [i + t, M - t],
                    [s - t, M - t],
                    [s - t, c + t]
                ], 30))
            }
            for (var a = h[1].length - 1; a >= 0; --a) {
                var o = h[1][a],
                    i = 180 * o[0][0] / pa,
                    u = 180 * o[0][1] / pa,
                    M = 180 * o[1][1] / pa,
                    s = 180 * o[2][0] / pa,
                    c = 180 * o[2][1] / pa;
                n.push(e([
                    [s - t, c - t],
                    [s - t, M + t],
                    [i + t, M + t],
                    [i + t, u - t]
                ], 30))
            }
            return { type: "Polygon", coordinates: [d3.merge(n)] }
        }

        function e(t, n) {
            for (var a, r, e, o = -1, i = t.length, h = t[0], u = []; ++o < i;) {
                a = t[o], r = (a[0] - h[0]) / n, e = (a[1] - h[1]) / n;
                for (var M = 0; n > M; ++M) u.push([h[0] + M * r, h[1] + M * e]);
                h = a
            }
            return u.push(a), u
        }

        function o(t, n) { return Math.abs(t[0] - n[0]) < da && Math.abs(t[1] - n[1]) < da }
        var i, h = [
            [
                [
                    [-pa, 0],
                    [0, wa],
                    [pa, 0]
                ]
            ],
            [
                [
                    [-pa, 0],
                    [0, -wa],
                    [pa, 0]
                ]
            ]
        ];
        t.invert && (n.invert = function(a, r) { for (var e = i[+(0 > r)], u = h[+(0 > r)], M = 0, s = e.length; s > M; ++M) { var c = e[M]; if (c[0][0] <= a && a < c[1][0] && c[0][1] <= r && r < c[1][1]) { var f = t.invert(a - t(u[M][1][0], 0)[0], r); return f[0] += u[M][1][0], o(n(f[0], f[1]), [a, r]) ? f : null } } });
        var u = d3.geo.projection(n),
            M = u.stream;
        return u.stream = function(t) {
            var n = u.rotate(),
                a = M(t),
                e = (u.rotate([0, 0]), M(t));
            return u.rotate(n), a.sphere = function() { d3.geo.stream(r(), e) }, a
        }, u.lobes = function(t) {
            return arguments.length ? (h = t.map(function(t) {
                return t.map(function(t) {
                    return [
                        [t[0][0] * pa / 180, t[0][1] * pa / 180],
                        [t[1][0] * pa / 180, t[1][1] * pa / 180],
                        [t[2][0] * pa / 180, t[2][1] * pa / 180]
                    ]
                })
            }), a(), u) : h.map(function(t) {
                return t.map(function(t) {
                    return [
                        [180 * t[0][0] / pa, 180 * t[0][1] / pa],
                        [180 * t[1][0] / pa, 180 * t[1][1] / pa],
                        [180 * t[2][0] / pa, 180 * t[2][1] / pa]
                    ]
                })
            })
        }, u
    }, (d3.geo.airy = c).raw = s, f.invert = function(t, n) {
        if (!(t * t + 4 * n * n > pa * pa + da)) {
            var a = t,
                r = n,
                e = 25;
            do {
                var o, i = Math.sin(a),
                    h = Math.sin(a / 2),
                    M = Math.cos(a / 2),
                    s = Math.sin(r),
                    c = Math.cos(r),
                    f = Math.sin(2 * r),
                    v = s * s,
                    l = c * c,
                    g = h * h,
                    d = 1 - l * M * M,
                    b = d ? u(c * M) * Math.sqrt(o = 1 / d) : o = 0,
                    p = 2 * b * c * h - t,
                    w = b * s - n,
                    q = o * (l * g + b * c * M * v),
                    m = o * (.5 * i * f - 2 * b * s * h),
                    y = .25 * o * (f * h - b * s * l * i),
                    S = o * (v * M + b * g * c),
                    Q = m * y - S * q;
                if (!Q) break;
                var R = (w * m - p * S) / Q,
                    T = (p * y - w * q) / Q;
                a -= R, r -= T
            } while ((Math.abs(R) > da || Math.abs(T) > da) && --e > 0);
            return [a, r]
        }
    }, (d3.geo.aitoff = function() { return Sa(f) }).raw = f, (d3.geo.armadillo = l).raw = v, q.invert = function(t, n) {
        if (t *= 3 / 8, n *= 3 / 8, !t && Math.abs(n) > 1) return null;
        var a = t * t,
            r = n * n,
            e = 1 + a + r,
            o = Math.sqrt(.5 * (e - Math.sqrt(e * e - 4 * n * n))),
            u = h(o) / 3,
            M = o ? w(Math.abs(n / o)) / 3 : p(Math.abs(t)) / 3,
            s = Math.cos(u),
            c = b(M),
            f = c * c - s * s;
        return [2 * i(t) * Math.atan2(d(M) * s, .25 - f), 2 * i(n) * Math.atan2(c * Math.sin(u), .25 + f)]
    }, (d3.geo.august = function() { return Sa(q) }).raw = q;
    var Ra = Math.log(1 + Math.SQRT2);
    m.invert = function(t, n) {
        if ((r = Math.abs(n)) < Ra) return [t, 2 * Math.atan(Math.exp(n)) - wa];
        var a, r, e = Math.sqrt(8),
            o = pa / 4,
            h = 25;
        do {
            var u = Math.cos(o / 2),
                M = Math.tan(o / 2);
            o -= a = (e * (o - pa / 4) - Math.log(M) - r) / (e - .5 * u * u / M)
        } while (Math.abs(a) > ba && --h > 0);
        return [t / (Math.cos(o) * (e - 1 / Math.sin(o))), i(n) * o]
    }, (d3.geo.baker = function() { return Sa(m) }).raw = m;
    var Ta = d3.geo.azimuthalEquidistant.raw;
    (d3.geo.berghaus = S).raw = y;
    var xa = Q(pa),
        Ea = R(Math.SQRT2 / wa, Math.SQRT2, pa);
    (d3.geo.mollweide = function() { return Sa(Ea) }).raw = Ea, T.invert = function(t, n) {
        var a, r, e = 2.00276,
            o = e * n,
            i = 0 > n ? -pa / 4 : pa / 4,
            h = 25;
        do r = o - Math.SQRT2 * Math.sin(i), i -= a = (Math.sin(2 * i) + 2 * i - pa * Math.sin(r)) / (2 * Math.cos(2 * i) + 2 + pa * Math.cos(r) * Math.SQRT2 * Math.cos(i)); while (Math.abs(a) > da && --h > 0);
        return r = o - Math.SQRT2 * Math.sin(i), [t * (1 / Math.cos(r) + 1.11072 / Math.cos(i)) / e, r]
    }, (d3.geo.boggs = function() { return Sa(T) }).raw = T, E.invert = function(t, n) { return [t / Math.cos(n), n] }, (d3.geo.sinusoidal = function() { return Sa(E) }).raw = E, (d3.geo.bonne = function() { return x(k).parallel(45) }).raw = k, (d3.geo.bottomley = function() {
        var t = pa / 6,
            n = d3.geo.projectionMutator(P),
            a = n(t);
        return a.variant = function(a) { return arguments.length ? n(t = +a) : t }, a
    }).raw = P;
    var ka = R(1, 4 / pa, pa);
    (d3.geo.bromley = function() { return Sa(ka) }).raw = ka, (d3.geo.chamberlin = z).raw = _, G.invert = function(t, n) { var a = (a = n / qa - 1) * a; return [a > 0 ? t * Math.sqrt(pa / a) / 2 : 0, h(1 - a)] }, (d3.geo.collignon = function() { return Sa(G) }).raw = G, (d3.geo.craig = function() { return x(C) }).raw = C, D.invert = function(t, n) {
        var a = Math.sqrt(3),
            r = 3 * h(n / (a * qa));
        return [qa * t / (a * (2 * Math.cos(2 * r / 3) - 1)), r]
    }, (d3.geo.craster = function() { return Sa(D) }).raw = D, (d3.geo.cylindricalEqualArea = function() { return x(L) }).raw = L, (d3.geo.cylindricalStereographic = function() { return x(O) }).raw = O, H.invert = function(t, n) {
        var a = Math.sqrt(8 / (3 * pa)),
            r = n / a;
        return [t / (a * (1 - Math.abs(r) / pa)), r]
    }, (d3.geo.eckert1 = function() { return Sa(H) }).raw = H, I.invert = function(t, n) { var a = 2 - Math.abs(n) / Math.sqrt(2 * pa / 3); return [t * Math.sqrt(6 * pa) / (2 * a), i(n) * h((4 - a * a) / 3)] }, (d3.geo.eckert2 = function() { return Sa(I) }).raw = I, J.invert = function(t, n) { var a = Math.sqrt(pa * (4 + pa)) / 2; return [t * a / (1 + M(1 - n * n * (4 + pa) / (4 * pa))), n * a / 2] }, (d3.geo.eckert3 = function() { return Sa(J) }).raw = J, K.invert = function(t, n) {
        var a = .5 * n * Math.sqrt((4 + pa) / pa),
            r = h(a),
            e = Math.cos(r);
        return [t / (2 / Math.sqrt(pa * (4 + pa)) * (1 + e)), h((r + a * (e + 2)) / (2 + wa))]
    }, (d3.geo.eckert4 = function() { return Sa(K) }).raw = K, N.invert = function(t, n) {
        var a = Math.sqrt(2 + pa),
            r = n * a / 2;
        return [a * t / (1 + Math.cos(r)), r]
    }, (d3.geo.eckert5 = function() { return Sa(N) }).raw = N, U.invert = function(t, n) {
        var a = 1 + wa,
            r = Math.sqrt(a / 2);
        return [2 * t * r / (1 + Math.cos(n *= r)), h((n + Math.sin(n)) / a)]
    }, (d3.geo.eckert6 = function() { return Sa(U) }).raw = U, V.invert = function(t, n) {
        var a = d3.geo.august.raw.invert(t / 1.2, 1.065 * n);
        if (!a) return null;
        var r = a[0],
            e = a[1],
            o = 20;
        t /= Pa, n /= Pa;
        do {
            var i = r / 2,
                h = e / 2,
                u = Math.sin(i),
                M = Math.cos(i),
                s = Math.sin(h),
                c = Math.cos(h),
                f = Math.cos(e),
                v = Math.sqrt(f),
                l = s / (c + Math.SQRT2 * M * v),
                g = l * l,
                d = Math.sqrt(2 / (1 + g)),
                b = Math.SQRT2 * c + (M + u) * v,
                p = Math.SQRT2 * c + (M - u) * v,
                w = b / p,
                q = Math.sqrt(w),
                m = q - 1 / q,
                y = q + 1 / q,
                S = d * m - 2 * Math.log(q) - t,
                Q = d * l * y - 2 * Math.atan(l) - n,
                R = s && Math.SQRT1_2 * v * u * g / s,
                T = (Math.SQRT2 * M * c + v) / (2 * (c + Math.SQRT2 * M * v) * (c + Math.SQRT2 * M * v) * v),
                x = -.5 * l * d * d * d,
                E = x * R,
                k = x * T,
                P = (P = 2 * c + Math.SQRT2 * v * (M - u)) * P * q,
                _ = (Math.SQRT2 * M * c * v + f) / P,
                z = -(Math.SQRT2 * u * s) / (v * P),
                B = m * E - 2 * _ / q + d * (_ + _ / w),
                F = m * k - 2 * z / q + d * (z + z / w),
                j = l * y * E - 2 * R / (1 + g) + d * y * R + d * l * (_ - _ / w),
                A = l * y * k - 2 * T / (1 + g) + d * y * T + d * l * (z - z / w),
                G = F * j - A * B;
            if (!G) break;
            var C = (Q * F - S * A) / G,
                D = (S * j - Q * B) / G;
            r -= C, e = Math.max(-wa, Math.min(wa, e - D))
        } while ((Math.abs(C) > da || Math.abs(D) > da) && --o > 0);
        return Math.abs(Math.abs(e) - wa) < da ? [0, e] : o && [r, e]
    };
    var Pa = 3 + 2 * Math.SQRT2;
    (d3.geo.eisenlohr = function() { return Sa(V) }).raw = V, W.invert = function(t, n) { var a = n / (1 + _a); return [t ? t / (_a * M(1 - a * a)) : 0, 2 * Math.atan(a)] };
    var _a = Math.cos(35 * ma);
    (d3.geo.fahey = function() { return Sa(W) }).raw = W, X.invert = function(t, n) {
        var a = Math.atan(n / qa),
            r = Math.cos(a),
            e = 2 * a;
        return [.5 * t * qa / (Math.cos(e) * r * r), e]
    }, (d3.geo.foucaut = function() { return Sa(X) }).raw = X, d3.geo.gilbert = function(t) {
        function n(n) { return t([.5 * n[0], h(Math.tan(.5 * n[1] * ma)) * ya]) }
        var a = d3.geo.equirectangular().scale(ya).translate([0, 0]);
        return t.invert && (n.invert = function(n) { return n = t.invert(n), n[0] *= 2, n[1] = 2 * Math.atan(Math.sin(n[1] * ma)) * ya, n }), n.stream = function(n) { n = t.stream(n); var r = a.stream({ point: function(t, a) { n.point(.5 * t, h(Math.tan(.5 * -a * ma)) * ya) }, lineStart: function() { n.lineStart() }, lineEnd: function() { n.lineEnd() }, polygonStart: function() { n.polygonStart() }, polygonEnd: function() { n.polygonEnd() } }); return r.sphere = function() { n.sphere() }, r.valid = !1, r }, n
    };
    var za = d3.geo.azimuthalEquidistant.raw;
    (d3.geo.gingery = $).raw = Y;
    var Ba = nn(2.8284, -1.6988, .75432, -.18071, 1.76003, -.38914, .042555);
    (d3.geo.ginzburg4 = function() { return Sa(Ba) }).raw = Ba;
    var Fa = nn(2.583819, -.835827, .170354, -.038094, 1.543313, -.411435, .082742);
    (d3.geo.ginzburg5 = function() { return Sa(Fa) }).raw = Fa;
    var ja = nn(5 / 6 * pa, -.62636, -.0344, 0, 1.3493, -.05524, 0, .045);
    (d3.geo.ginzburg6 = function() { return Sa(ja) }).raw = ja, an.invert = function(t, n) {
        var a, r = t,
            e = n,
            o = 50;
        do {
            var i = e * e;
            e -= a = (e * (1 + i / 12) - n) / (1 + i / 4)
        } while (Math.abs(a) > da && --o > 0);
        o = 50, t /= 1 - .162388 * i;
        do {
            var h = (h = r * r) * h;
            r -= a = (r * (.87 - 952426e-9 * h) - t) / (.87 - .00476213 * h)
        } while (Math.abs(a) > da && --o > 0);
        return [r, e]
    }, (d3.geo.ginzburg8 = function() { return Sa(an) }).raw = an;
    var Aa = nn(2.6516, -.76534, .19123, -.047094, 1.36289, -.13965, .031762);
    (d3.geo.ginzburg9 = function() { return Sa(Aa) }).raw = Aa, en.invert = function(t, n) {
        var a = i(t),
            r = i(n),
            e = -a * t,
            o = -r * n,
            u = 1 > o / e,
            M = hn(u ? o : e, u ? e : o),
            s = M[0],
            c = M[1];
        u && (s = -wa - s);
        var f = Math.cos(c),
            t = Math.cos(s) * f,
            n = Math.sin(s) * f,
            v = Math.sin(c);
        return [a * (Math.atan2(n, -v) + pa), r * h(t)]
    }, d3.geo.gringorten = rn(en), fn.invert = function(t, n) {
        var a = (Math.SQRT2 - 1) / (Math.SQRT2 + 1),
            r = Math.sqrt(1 - a * a),
            e = cn(wa, r * r),
            o = -1,
            i = un(.5 * e - n, -t, r * r),
            h = ln(i[0], i[1]),
            u = Math.atan2(h[1], h[0]) / o;
        return [u, 2 * Math.atan(Math.exp(.5 / o * Math.log(a * h[0] * h[0] + a * h[1] * h[1]))) - wa]
    }, d3.geo.guyou = rn(fn), (d3.geo.hammerRetroazimuthal = bn).raw = gn;
    var Ga = d3.geo.azimuthalEqualArea.raw;
    qn.invert = function(t, n) { var a = 2 * h(n / 2); return [t * Math.cos(a / 2) / Math.cos(a), a] }, (d3.geo.hammer = wn).raw = pn, mn.invert = function(t, n) { var a = Math.abs(a = n * (0 > n ? .5179951515653813 : .5686373742600607)) > 1 - da ? a > 0 ? wa : -wa : h(a); return [1.1764705882352942 * t / Math.cos(a), Math.abs(a = ((a += a) + Math.sin(a)) * (0 > n ? .4102345310814193 : .3736990601468637)) > 1 - da ? a > 0 ? wa : -wa : h(a)] }, (d3.geo.hatano = function() { return Sa(mn) }).raw = mn;
    var Ca = 41 + 48 / 36 + 37 / 3600;
    (d3.geo.healpix = Sn).raw = yn, (d3.geo.hill = Rn).raw = Qn;
    var Da = .7109889596207567,
        La = .0528035274542;
    Tn.invert = function(t, n) { return n > -Da ? Ea.invert(t, n - La) : E.invert(t, n) }, (d3.geo.sinuMollweide = function() { return Sa(Tn).rotate([-20, -55]) }).raw = Tn, xn.invert = function(t, n) { return Math.abs(n) > Da ? Ea.invert(t, n + (n > 0 ? La : -La)) : E.invert(t, n) }, (d3.geo.homolosine = function() { return Sa(xn) }).raw = xn, En.invert = function(t, n) { return [2 / 3 * pa * t / Math.sqrt(pa * pa / 3 - n * n), n] }, (d3.geo.kavrayskiy7 = function() { return Sa(En) }).raw = En, (d3.geo.lagrange = Pn).raw = kn, _n.invert = function(t, n) {
        var a = Math.abs(t),
            r = Math.abs(n),
            e = pa / Math.SQRT2,
            o = da,
            i = wa;
        e > r ? i *= r / e : o += 6 * u(e / r);
        for (var h = 0; 25 > h; h++) {
            var s = Math.sin(i),
                c = M(Math.cos(i)),
                f = Math.sin(i / 2),
                v = Math.cos(i / 2),
                l = Math.sin(o / 6),
                g = Math.cos(o / 6),
                d = .5 * o * (1 + c) - a,
                b = i / (v * g) - r,
                p = c ? -.25 * o * s / c : 0,
                w = .5 * (1 + c),
                q = (1 + .5 * i * f / v) / (v * g),
                m = i / v * (l / 6) / (g * g),
                y = p * m - q * w,
                S = (d * m - b * w) / y,
                Q = (b * p - d * q) / y;
            if (i -= S, o -= Q, Math.abs(S) < da && Math.abs(Q) < da) break
        }
        return [0 > t ? -o : o, 0 > n ? -i : i]
    }, (d3.geo.larrivee = function() { return Sa(_n) }).raw = _n, zn.invert = function(t, n) {
        var a = i(t) * pa,
            r = n / 2,
            e = 50;
        do {
            var o = a * a,
                h = r * r,
                u = a * r,
                M = a * (.975534 + h * (-.119161 + o * -.0143059 + h * -.0547009)) - t,
                s = r * (1.00384 + o * (.0802894 + h * -.02855 + 199025e-9 * o) + h * (.0998909 + h * -.0491032)) - n,
                c = .975534 - h * (.119161 + .0143059 * 3 * o + .0547009 * h),
                f = -u * (.238322 + .2188036 * h + .0286118 * o),
                v = u * (.1605788 + 7961e-7 * o + -0.0571 * h),
                l = 1.00384 + o * (.0802894 + 199025e-9 * o) + h * (3 * (.0998909 - .02855 * o) - .245516 * h),
                g = f * v - l * c,
                d = (s * f - M * l) / g,
                b = (M * v - s * c) / g;
            a -= d, r -= b
        } while ((Math.abs(d) > da || Math.abs(b) > da) && --e > 0);
        return e && [a, r]
    }, (d3.geo.laskowski = function() { return Sa(zn) }).raw = zn, Bn.invert = function(t, n) {
        var a = t * t,
            r = n * n,
            e = r + 1,
            o = t ? Math.SQRT1_2 * Math.sqrt((e - Math.sqrt(a * a + 2 * a * (r - 1) + e * e)) / a + 1) : 1 / Math.sqrt(e);
        return [h(t * o), i(n) * u(o)]
    }, (d3.geo.littrow = function() { return Sa(Bn) }).raw = Bn, (d3.geo.loximuthal = function() { return x(Fn).parallel(40) }).raw = Fn, jn.invert = function(t, n) { return [t, 2.5 * Math.atan(Math.exp(.8 * n)) - .625 * pa] }, (d3.geo.miller = function() { return Sa(jn) }).raw = jn;
    var Oa = {
        alaska: [
            [.9972523, 0],
            [.0052513, -.0041175],
            [.0074606, .0048125],
            [-.0153783, -.1968253],
            [.0636871, -.1408027],
            [.3660976, -.2937382]
        ],
        gs48: [
            [.98879, 0],
            [0, 0],
            [-.050909, 0],
            [0, 0],
            [.075528, 0]
        ],
        gs50: [
            [.984299, 0],
            [.0211642, .0037608],
            [-.1036018, -.0575102],
            [-.0329095, -.0320119],
            [.0499471, .1223335],
            [.026046, .0899805],
            [7388e-7, -.1435792],
            [.0075848, -.1334108],
            [-.0216473, .0776645],
            [-.0225161, .0853673]
        ],
        miller: [
            [.9245, 0],
            [0, 0],
            [.01943, 0]
        ],
        lee: [
            [.721316, 0],
            [0, 0],
            [-.00881625, -.00617325]
        ]
    };
    (d3.geo.modifiedStereographic = Gn).raw = An, Cn.invert = function(t, n) {
        var a = Math.sqrt(6),
            r = Math.sqrt(7),
            e = 3 * h(n * r / 9);
        return [t * r / (a * (2 * Math.cos(2 * e / 3) - 1)), h(3 * Math.sin(e) * a / 7)]
    }, (d3.geo.mtFlatPolarParabolic = function() { return Sa(Cn) }).raw = Cn, Dn.invert = function(t, n) {
        var a = n * Math.sqrt(2 + Math.SQRT2) / (2 * Math.sqrt(3)),
            r = 2 * h(a);
        return [3 * Math.SQRT2 * t / (1 + 2 * Math.cos(r) / Math.cos(r / 2)), h((a + Math.sin(r)) / (1 + Math.SQRT1_2))]
    }, (d3.geo.mtFlatPolarQuartic = function() { return Sa(Dn) }).raw = Dn, Ln.invert = function(t, n) {
        var a = Math.sqrt(6 / (4 + pa)),
            r = n / a;
        return Math.abs(Math.abs(r) - wa) < da && (r = 0 > r ? -wa : wa), [1.5 * t / (a * (.5 + Math.cos(r))), h((r / 2 + Math.sin(r)) / (1 + pa / 4))]
    }, (d3.geo.mtFlatPolarSinusoidal = function() { return Sa(Ln) }).raw = Ln, On.invert = function(t, n) {
        var a, r = n,
            e = 25;
        do {
            var o = r * r,
                i = o * o;
            r -= a = (r * (1.007226 + o * (.015085 + i * (-.044475 + .028874 * o - .005916 * i))) - n) / (1.007226 + o * (.045255 + i * (-0.311325 + .259866 * o - .005916 * 11 * i)))
        } while (Math.abs(a) > da && --e > 0);
        return [t / (.8707 + (o = r * r) * (-.131979 + o * (-.013791 + o * o * o * (.003971 - .001529 * o)))), r]
    }, (d3.geo.naturalEarth = function() { return Sa(On) }).raw = On, Hn.invert = function(t, n) {
        for (var a = n / 2, r = 0, e = 1 / 0; 10 > r && Math.abs(e) > da; r++) {
            var o = Math.cos(n / 2);
            n -= e = (n - Math.tan(n / 2) - a) / (1 - .5 / (o * o))
        }
        return [2 * t / (1 + Math.cos(n)), n]
    }, (d3.geo.nellHammer = function() { return Sa(Hn) }).raw = Hn;
    var Ha = 1.0148,
        Ia = .23185,
        Ja = -.14499,
        Ka = .02406,
        Na = Ha,
        Ua = 5 * Ia,
        Va = 7 * Ja,
        Wa = 9 * Ka,
        Xa = 1.790857183;
    In.invert = function(t, n) {
        n > Xa ? n = Xa : -Xa > n && (n = -Xa);
        var a, r = n;
        do {
            var e = r * r;
            r -= a = (r * (Ha + e * e * (Ia + e * (Ja + Ka * e))) - n) / (Na + e * e * (Ua + e * (Va + Wa * e)))
        } while (Math.abs(a) > da);
        return [t, r]
    }, (d3.geo.patterson = function() { return Sa(In) }).raw = In;
    var Ya = rn(fn);
    (d3.geo.peirceQuincuncial = function() { return Ya().quincuncial(!0).rotate([-90, -90, 45]).clipAngle(180 - 1e-6) }).raw = Ya.raw, Jn.invert = function(t, n) {
        if (Math.abs(n) < da) return [t, 0];
        var a, r = t * t + n * n,
            e = .5 * n,
            o = 10;
        do {
            var M = Math.tan(e),
                s = 1 / Math.cos(e),
                c = r - 2 * n * e + e * e;
            e -= a = (M * c + 2 * (e - n)) / (2 + c * s * s + 2 * (e - n) * M)
        } while (Math.abs(a) > da && --o > 0);
        return M = Math.tan(e), [(Math.abs(n) < Math.abs(e + 1 / M) ? h(t * M) : i(t) * (u(Math.abs(t * M)) + wa)) / Math.sin(e), e]
    }, (d3.geo.polyconic = function() { return Sa(Jn) }).raw = Jn, (d3.geo.rectangularPolyconic = function() { return x(Kn) }).raw = Kn;
    var Za = [
        [.9986, -.062],
        [1, 0],
        [.9986, .062],
        [.9954, .124],
        [.99, .186],
        [.9822, .248],
        [.973, .31],
        [.96, .372],
        [.9427, .434],
        [.9216, .4958],
        [.8962, .5571],
        [.8679, .6176],
        [.835, .6769],
        [.7986, .7346],
        [.7597, .7903],
        [.7186, .8435],
        [.6732, .8936],
        [.6213, .9394],
        [.5722, .9761],
        [.5322, 1]
    ];
    Za.forEach(function(t) { t[1] *= 1.0144 }), Nn.invert = function(t, n) {
        var a = n / wa,
            r = 90 * a,
            e = Math.min(18, Math.abs(r / 5)),
            o = Math.max(0, Math.floor(e));
        do {
            var i = Za[o][1],
                h = Za[o + 1][1],
                u = Za[Math.min(19, o + 2)][1],
                M = u - i,
                s = u - 2 * h + i,
                c = 2 * (Math.abs(a) - h) / M,
                f = s / M,
                v = c * (1 - f * c * (1 - 2 * f * c));
            if (v >= 0 || 1 === o) {
                r = (n >= 0 ? 5 : -5) * (v + e);
                var l, g = 50;
                do e = Math.min(18, Math.abs(r) / 5), o = Math.floor(e), v = e - o, i = Za[o][1], h = Za[o + 1][1], u = Za[Math.min(19, o + 2)][1], r -= (l = (n >= 0 ? wa : -wa) * (h + v * (u - i) / 2 + v * v * (u - 2 * h + i) / 2) - n) * ya; while (Math.abs(l) > ba && --g > 0);
                break
            }
        } while (--o >= 0);
        var d = Za[o][0],
            b = Za[o + 1][0],
            p = Za[Math.min(19, o + 2)][0];
        return [t / (b + v * (p - d) / 2 + v * v * (p - 2 * b + d) / 2), r * ma]
    }, (d3.geo.robinson = function() { return Sa(Nn) }).raw = Nn, (d3.geo.satellite = Wn).raw = Vn, Xn.invert = function(t, n) {
        var a = n / 1.70711,
            r = Math.sin(pa / 4 * a);
        return [t / (.74482 - .34588 * r * r), 2 * Math.atan(a)]
    }, (d3.geo.times = function() { return Sa(Xn) }).raw = Xn, (d3.geo.twoPointEquidistant = Zn).raw = Yn, (d3.geo.twoPointAzimuthal = ta).raw = $n, na.invert = function(t, n) {
        if (Math.abs(n) < da) return [t, 0];
        if (Math.abs(t) < da) return [0, wa * Math.sin(2 * Math.atan(n / pa))];
        var a = (t /= pa) * t,
            r = (n /= pa) * n,
            e = a + r,
            o = e * e,
            h = -Math.abs(n) * (1 + e),
            M = h - 2 * r + a,
            s = -2 * h + 1 + 2 * r + o,
            c = r / s + (2 * M * M * M / (s * s * s) - 9 * h * M / (s * s)) / 27,
            f = (h - M * M / (3 * s)) / s,
            v = 2 * Math.sqrt(-f / 3),
            l = u(3 * c / (f * v)) / 3;
        return [pa * (e - 1 + Math.sqrt(1 + 2 * (a - r) + o)) / (2 * t), i(n) * pa * (-v * Math.cos(l + pa / 3) - M / (3 * s))]
    }, (d3.geo.vanDerGrinten = function() { return Sa(na) }).raw = na, aa.invert = function(t, n) {
        if (!t) return [0, wa * Math.sin(2 * Math.atan(n / pa))];
        var a = Math.abs(t / pa),
            r = (1 - a * a - (n /= pa) * n) / (2 * a),
            e = r * r,
            o = Math.sqrt(e + 1);
        return [i(t) * pa * (o - r), i(n) * wa * Math.sin(2 * Math.atan2(Math.sqrt((1 - 2 * r * a) * (r + o) - a), Math.sqrt(o + r + a)))]
    }, (d3.geo.vanDerGrinten2 = function() { return Sa(aa) }).raw = aa, ra.invert = function(t, n) {
        if (!n) return [t, 0];
        var a = n / pa,
            r = (pa * pa * (1 - a * a) - t * t) / (2 * pa * t);
        return [t ? pa * (i(t) * Math.sqrt(r * r + 1) - r) : 0, wa * Math.sin(2 * Math.atan(a))]
    }, (d3.geo.vanDerGrinten3 = function() { return Sa(ra) }).raw = ra, ea.invert = function(t, n) {
        if (!t || !n) return [t, n];
        n /= pa;
        var a = i(t) * t / wa,
            r = (a * a - 1 + 4 * n * n) / Math.abs(a),
            e = r * r,
            o = 2 * n,
            h = 50;
        do {
            var u = o * o,
                M = (8 * o - u * (u + 2) - 5) / (2 * u * (o - 1)),
                s = (3 * o - u * o - 10) / (2 * u * o),
                c = M * M,
                f = o * M,
                v = o + M,
                l = v * v,
                g = o + 3 * M,
                d = l * (u + c * e - 1) + (1 - u) * (u * (g * g + 4 * c) + c * (12 * f + 4 * c)),
                b = -2 * v * (4 * f * c + (1 - 4 * u + 3 * u * u) * (1 + s) + c * (-6 + 14 * u - e + (-8 + 8 * u - 2 * e) * s) + f * (-8 + 12 * u + (-10 + 10 * u - e) * s)),
                p = Math.sqrt(d),
                w = r * (l + c - 1) + 2 * p - a * (4 * l + e),
                q = r * (2 * M * s + 2 * v * (1 + s)) + b / p - 8 * v * (r * (-1 + c + l) + 2 * p) * (1 + s) / (e + 4 * l);
            o -= δ = w / q
        } while (δ > da && --h > 0);
        return [i(t) * (Math.sqrt(r * r + 4) + r) * pa / 4, wa * o]
    }, (d3.geo.vanDerGrinten4 = function() { return Sa(ea) }).raw = ea;
    var $a = function() {
        var t = 4 * pa + 3 * Math.sqrt(3),
            n = 2 * Math.sqrt(2 * pa * Math.sqrt(3) / t);
        return R(n * Math.sqrt(3) / pa, n, t / 6)
    }();
    (d3.geo.wagner4 = function() { return Sa($a) }).raw = $a, oa.invert = function(t, n) { return [t / Math.sqrt(1 - 3 * n * n / (pa * pa)), n] }, (d3.geo.wagner6 = function() { return Sa(oa) }).raw = oa, ia.invert = function(t, n) {
        var a = t / 2.66723,
            r = n / 1.24104,
            e = Math.sqrt(a * a + r * r),
            o = 2 * h(e / 2);
        return [3 * Math.atan2(t * Math.tan(o), 2.66723 * e), e && h(n * Math.sin(o) / (1.24104 * .90631 * e))]
    }, (d3.geo.wagner7 = function() { return Sa(ia) }).raw = ia, ha.invert = function(t, n) {
        var a = -.5 * (t * t + n * n),
            r = Math.sqrt(-a * (2 + a)),
            e = n * a + t * r,
            o = t * a - n * r,
            i = Math.sqrt(o * o + e * e);
        return [Math.atan2(r * e, i * (1 + a)), i ? -h(r * o / i) : 0]
    }, (d3.geo.wiechel = function() { return Sa(ha) }).raw = ha, ua.invert = function(t, n) {
        var a = t,
            r = n,
            e = 25;
        do {
            var o, i = Math.cos(r),
                h = Math.sin(r),
                M = Math.sin(2 * r),
                s = h * h,
                c = i * i,
                f = Math.sin(a),
                v = Math.cos(a / 2),
                l = Math.sin(a / 2),
                g = l * l,
                d = 1 - c * v * v,
                b = d ? u(i * v) * Math.sqrt(o = 1 / d) : o = 0,
                p = .5 * (2 * b * i * l + a / wa) - t,
                w = .5 * (b * h + r) - n,
                q = .5 * o * (c * g + b * i * v * s) + .5 / wa,
                m = o * (f * M / 4 - b * h * l),
                y = .125 * o * (M * l - b * h * c * f),
                S = .5 * o * (s * v + b * g * i) + .5,
                Q = m * y - S * q,
                R = (w * m - p * S) / Q,
                T = (p * y - w * q) / Q;
            a -= R, r -= T
        } while ((Math.abs(R) > da || Math.abs(T) > da) && --e > 0);
        return [a, r]
    }, (d3.geo.winkel3 = function() { return Sa(ua) }).raw = ua
}();