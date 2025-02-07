"use strict";
var Jd = Object.defineProperty, Xd = Object.defineProperties;
var ef = Object.getOwnPropertyDescriptors;
var Ia = Object.getOwnPropertySymbols;
var tf = Object.prototype.hasOwnProperty, nf = Object.prototype.propertyIsEnumerable;
var Ca = (e, t, n) => t in e ? Jd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, g = (e, t) => { for (var n in t ||= {})
    tf.call(t, n) && Ca(e, n, t[n]); if (Ia)
    for (var n of Ia(t))
        nf.call(t, n) && Ca(e, n, t[n]); return e; }, k = (e, t) => Xd(e, ef(t));
var ht = (e, t, n) => new Promise((r, o) => { var i = u => { try {
    a(n.next(u));
}
catch (c) {
    o(c);
} }, s = u => { try {
    a(n.throw(u));
}
catch (c) {
    o(c);
} }, a = u => u.done ? r(u.value) : Promise.resolve(u.value).then(i, s); a((n = n.apply(e, t)).next()); });
var Oo = null;
var xo = 1, wa = Symbol("SIGNAL");
function P(e) { let t = Oo; return Oo = e, t; }
function ba() { return Oo; }
var Po = { version: 0, lastCleanEpoch: 0, dirty: !1, producerNode: void 0, producerLastReadVersion: void 0, producerIndexOfThis: void 0, nextProducerIndex: 0, liveConsumerNode: void 0, liveConsumerIndexOfThis: void 0, consumerAllowSignalWrites: !1, consumerIsAlwaysLive: !1, producerMustRecompute: () => !1, producerRecomputeValue: () => { }, consumerMarkedDirty: () => { }, consumerOnSignalRead: () => { } };
function rf(e) { if (!(Vo(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === xo)) {
    if (!e.producerMustRecompute(e) && !ko(e)) {
        e.dirty = !1, e.lastCleanEpoch = xo;
        return;
    }
    e.producerRecomputeValue(e), e.dirty = !1, e.lastCleanEpoch = xo;
} }
function Fo(e) { return e && (e.nextProducerIndex = 0), P(e); }
function Sa(e, t) { if (P(t), !(!e || e.producerNode === void 0 || e.producerIndexOfThis === void 0 || e.producerLastReadVersion === void 0)) {
    if (Vo(e))
        for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
            jo(e.producerNode[n], e.producerIndexOfThis[n]);
    for (; e.producerNode.length > e.nextProducerIndex;)
        e.producerNode.pop(), e.producerLastReadVersion.pop(), e.producerIndexOfThis.pop();
} }
function ko(e) { Bo(e); for (let t = 0; t < e.producerNode.length; t++) {
    let n = e.producerNode[t], r = e.producerLastReadVersion[t];
    if (r !== n.version || (rf(n), r !== n.version))
        return !0;
} return !1; }
function Lo(e) { if (Bo(e), Vo(e))
    for (let t = 0; t < e.producerNode.length; t++)
        jo(e.producerNode[t], e.producerIndexOfThis[t]); e.producerNode.length = e.producerLastReadVersion.length = e.producerIndexOfThis.length = 0, e.liveConsumerNode && (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0); }
function jo(e, t) { if (of(e), e.liveConsumerNode.length === 1 && sf(e))
    for (let r = 0; r < e.producerNode.length; r++)
        jo(e.producerNode[r], e.producerIndexOfThis[r]); let n = e.liveConsumerNode.length - 1; if (e.liveConsumerNode[t] = e.liveConsumerNode[n], e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n], e.liveConsumerNode.length--, e.liveConsumerIndexOfThis.length--, t < e.liveConsumerNode.length) {
    let r = e.liveConsumerIndexOfThis[t], o = e.liveConsumerNode[t];
    Bo(o), o.producerIndexOfThis[r] = t;
} }
function Vo(e) { return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0; }
function Bo(e) { e.producerNode ??= [], e.producerIndexOfThis ??= [], e.producerLastReadVersion ??= []; }
function of(e) { e.liveConsumerNode ??= [], e.liveConsumerIndexOfThis ??= []; }
function sf(e) { return e.producerNode !== void 0; }
function af() { throw new Error; }
var uf = af;
function _a(e) { uf = e; }
function y(e) { return typeof e == "function"; }
function pt(e) { let n = e(r => { Error.call(r), r.stack = new Error().stack; }); return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n; }
var Kn = pt(e => function (n) {
    e(this), this.message = n ? `${n.length} errors occurred during unsubscription:
${n.map((r, o) => `${o + 1}) ${r.toString()}`).join(`
  `)}` : "", this.name = "UnsubscriptionError", this.errors = n;
});
function nn(e, t) { if (e) {
    let n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
} }
var j = class e {
    constructor(t) { this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null; }
    unsubscribe() { let t; if (!this.closed) {
        this.closed = !0;
        let { _parentage: n } = this;
        if (n)
            if (this._parentage = null, Array.isArray(n))
                for (let i of n)
                    i.remove(this);
            else
                n.remove(this);
        let { initialTeardown: r } = this;
        if (y(r))
            try {
                r();
            }
            catch (i) {
                t = i instanceof Kn ? i.errors : [i];
            }
        let { _finalizers: o } = this;
        if (o) {
            this._finalizers = null;
            for (let i of o)
                try {
                    Ma(i);
                }
                catch (s) {
                    t = t ?? [], s instanceof Kn ? t = [...t, ...s.errors] : t.push(s);
                }
        }
        if (t)
            throw new Kn(t);
    } }
    add(t) { var n; if (t && t !== this)
        if (this.closed)
            Ma(t);
        else {
            if (t instanceof e) {
                if (t.closed || t._hasParent(this))
                    return;
                t._addParent(this);
            }
            (this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
        } }
    _hasParent(t) { let { _parentage: n } = this; return n === t || Array.isArray(n) && n.includes(t); }
    _addParent(t) { let { _parentage: n } = this; this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t; }
    _removeParent(t) { let { _parentage: n } = this; n === t ? this._parentage = null : Array.isArray(n) && nn(n, t); }
    remove(t) { let { _finalizers: n } = this; n && nn(n, t), t instanceof e && t._removeParent(this); }
};
j.EMPTY = (() => { let e = new j; return e.closed = !0, e; })();
var Ho = j.EMPTY;
function Qn(e) { return e instanceof j || e && "closed" in e && y(e.remove) && y(e.add) && y(e.unsubscribe); }
function Ma(e) { y(e) ? e() : e.unsubscribe(); }
var le = { onUnhandledError: null, onStoppedNotification: null, Promise: void 0, useDeprecatedSynchronousErrorHandling: !1, useDeprecatedNextContext: !1 };
var gt = { setTimeout(e, t, ...n) { let { delegate: r } = gt; return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n); }, clearTimeout(e) { let { delegate: t } = gt; return (t?.clearTimeout || clearTimeout)(e); }, delegate: void 0 };
function Jn(e) { gt.setTimeout(() => { let { onUnhandledError: t } = le; if (t)
    t(e);
else
    throw e; }); }
function rn() { }
var Ta = Uo("C", void 0, void 0);
function Na(e) { return Uo("E", void 0, e); }
function Ra(e) { return Uo("N", e, void 0); }
function Uo(e, t, n) { return { kind: e, value: t, error: n }; }
var Ze = null;
function mt(e) { if (le.useDeprecatedSynchronousErrorHandling) {
    let t = !Ze;
    if (t && (Ze = { errorThrown: !1, error: null }), e(), t) {
        let { errorThrown: n, error: r } = Ze;
        if (Ze = null, n)
            throw r;
    }
}
else
    e(); }
function Aa(e) { le.useDeprecatedSynchronousErrorHandling && Ze && (Ze.errorThrown = !0, Ze.error = e); }
var Ye = class extends j {
    constructor(t) { super(), this.isStopped = !1, t ? (this.destination = t, Qn(t) && t.add(this)) : this.destination = df; }
    static create(t, n, r) { return new vt(t, n, r); }
    next(t) { this.isStopped ? Go(Ra(t), this) : this._next(t); }
    error(t) { this.isStopped ? Go(Na(t), this) : (this.isStopped = !0, this._error(t)); }
    complete() { this.isStopped ? Go(Ta, this) : (this.isStopped = !0, this._complete()); }
    unsubscribe() { this.closed || (this.isStopped = !0, super.unsubscribe(), this.destination = null); }
    _next(t) { this.destination.next(t); }
    _error(t) { try {
        this.destination.error(t);
    }
    finally {
        this.unsubscribe();
    } }
    _complete() { try {
        this.destination.complete();
    }
    finally {
        this.unsubscribe();
    } }
}, cf = Function.prototype.bind;
function $o(e, t) { return cf.call(e, t); }
var zo = class {
    constructor(t) { this.partialObserver = t; }
    next(t) { let { partialObserver: n } = this; if (n.next)
        try {
            n.next(t);
        }
        catch (r) {
            Xn(r);
        } }
    error(t) { let { partialObserver: n } = this; if (n.error)
        try {
            n.error(t);
        }
        catch (r) {
            Xn(r);
        }
    else
        Xn(t); }
    complete() { let { partialObserver: t } = this; if (t.complete)
        try {
            t.complete();
        }
        catch (n) {
            Xn(n);
        } }
}, vt = class extends Ye {
    constructor(t, n, r) { super(); let o; if (y(t) || !t)
        o = { next: t ?? void 0, error: n ?? void 0, complete: r ?? void 0 };
    else {
        let i;
        this && le.useDeprecatedNextContext ? (i = Object.create(t), i.unsubscribe = () => this.unsubscribe(), o = { next: t.next && $o(t.next, i), error: t.error && $o(t.error, i), complete: t.complete && $o(t.complete, i) }) : o = t;
    } this.destination = new zo(o); }
};
function Xn(e) { le.useDeprecatedSynchronousErrorHandling ? Aa(e) : Jn(e); }
function lf(e) { throw e; }
function Go(e, t) { let { onStoppedNotification: n } = le; n && gt.setTimeout(() => n(e, t)); }
var df = { closed: !0, next: rn, error: lf, complete: rn };
var yt = typeof Symbol == "function" && Symbol.observable || "@@observable";
function Q(e) { return e; }
function Wo(...e) { return qo(e); }
function qo(e) { return e.length === 0 ? Q : e.length === 1 ? e[0] : function (n) { return e.reduce((r, o) => o(r), n); }; }
var O = (() => { class e {
    constructor(n) { n && (this._subscribe = n); }
    lift(n) { let r = new e; return r.source = this, r.operator = n, r; }
    subscribe(n, r, o) { let i = hf(n) ? n : new vt(n, r, o); return mt(() => { let { operator: s, source: a } = this; i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i)); }), i; }
    _trySubscribe(n) { try {
        return this._subscribe(n);
    }
    catch (r) {
        n.error(r);
    } }
    forEach(n, r) { return r = xa(r), new r((o, i) => { let s = new vt({ next: a => { try {
            n(a);
        }
        catch (u) {
            i(u), s.unsubscribe();
        } }, error: i, complete: o }); this.subscribe(s); }); }
    _subscribe(n) { var r; return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(n); }
    [yt]() { return this; }
    pipe(...n) { return qo(n)(this); }
    toPromise(n) { return n = xa(n), new n((r, o) => { let i; this.subscribe(s => i = s, s => o(s), () => r(i)); }); }
} return e.create = t => new e(t), e; })();
function xa(e) { var t; return (t = e ?? le.Promise) !== null && t !== void 0 ? t : Promise; }
function ff(e) { return e && y(e.next) && y(e.error) && y(e.complete); }
function hf(e) { return e && e instanceof Ye || ff(e) && Qn(e); }
function Zo(e) { return y(e?.lift); }
function T(e) { return t => { if (Zo(t))
    return t.lift(function (n) { try {
        return e(n, this);
    }
    catch (r) {
        this.error(r);
    } }); throw new TypeError("Unable to lift unknown Observable type"); }; }
function N(e, t, n, r, o) { return new Yo(e, t, n, r, o); }
var Yo = class extends Ye {
    constructor(t, n, r, o, i, s) { super(t), this.onFinalize = i, this.shouldUnsubscribe = s, this._next = n ? function (a) { try {
        n(a);
    }
    catch (u) {
        t.error(u);
    } } : super._next, this._error = o ? function (a) { try {
        o(a);
    }
    catch (u) {
        t.error(u);
    }
    finally {
        this.unsubscribe();
    } } : super._error, this._complete = r ? function () { try {
        r();
    }
    catch (a) {
        t.error(a);
    }
    finally {
        this.unsubscribe();
    } } : super._complete; }
    unsubscribe() { var t; if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
        let { closed: n } = this;
        super.unsubscribe(), !n && ((t = this.onFinalize) === null || t === void 0 || t.call(this));
    } }
};
function Dt() { return T((e, t) => { let n = null; e._refCount++; let r = N(t, void 0, void 0, void 0, () => { if (!e || e._refCount <= 0 || 0 < --e._refCount) {
    n = null;
    return;
} let o = e._connection, i = n; n = null, o && (!i || o === i) && o.unsubscribe(), t.unsubscribe(); }); e.subscribe(r), r.closed || (n = e.connect()); }); }
var Et = class extends O {
    constructor(t, n) { super(), this.source = t, this.subjectFactory = n, this._subject = null, this._refCount = 0, this._connection = null, Zo(t) && (this.lift = t.lift); }
    _subscribe(t) { return this.getSubject().subscribe(t); }
    getSubject() { let t = this._subject; return (!t || t.isStopped) && (this._subject = this.subjectFactory()), this._subject; }
    _teardown() { this._refCount = 0; let { _connection: t } = this; this._subject = this._connection = null, t?.unsubscribe(); }
    connect() { let t = this._connection; if (!t) {
        t = this._connection = new j;
        let n = this.getSubject();
        t.add(this.source.subscribe(N(n, void 0, () => { this._teardown(), n.complete(); }, r => { this._teardown(), n.error(r); }, () => this._teardown()))), t.closed && (this._connection = null, t = j.EMPTY);
    } return t; }
    refCount() { return Dt()(this); }
};
var Oa = pt(e => function () { e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"; });
var q = (() => { class e extends O {
    constructor() { super(), this.closed = !1, this.currentObservers = null, this.observers = [], this.isStopped = !1, this.hasError = !1, this.thrownError = null; }
    lift(n) { let r = new er(this, this); return r.operator = n, r; }
    _throwIfClosed() { if (this.closed)
        throw new Oa; }
    next(n) { mt(() => { if (this._throwIfClosed(), !this.isStopped) {
        this.currentObservers || (this.currentObservers = Array.from(this.observers));
        for (let r of this.currentObservers)
            r.next(n);
    } }); }
    error(n) { mt(() => { if (this._throwIfClosed(), !this.isStopped) {
        this.hasError = this.isStopped = !0, this.thrownError = n;
        let { observers: r } = this;
        for (; r.length;)
            r.shift().error(n);
    } }); }
    complete() { mt(() => { if (this._throwIfClosed(), !this.isStopped) {
        this.isStopped = !0;
        let { observers: n } = this;
        for (; n.length;)
            n.shift().complete();
    } }); }
    unsubscribe() { this.isStopped = this.closed = !0, this.observers = this.currentObservers = null; }
    get observed() { var n; return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0; }
    _trySubscribe(n) { return this._throwIfClosed(), super._trySubscribe(n); }
    _subscribe(n) { return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n); }
    _innerSubscribe(n) { let { hasError: r, isStopped: o, observers: i } = this; return r || o ? Ho : (this.currentObservers = null, i.push(n), new j(() => { this.currentObservers = null, nn(i, n); })); }
    _checkFinalizedStatuses(n) { let { hasError: r, thrownError: o, isStopped: i } = this; r ? n.error(o) : i && n.complete(); }
    asObservable() { let n = new O; return n.source = this, n; }
} return e.create = (t, n) => new er(t, n), e; })(), er = class extends q {
    constructor(t, n) { super(), this.destination = t, this.source = n; }
    next(t) { var n, r; (r = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || r === void 0 || r.call(n, t); }
    error(t) { var n, r; (r = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || r === void 0 || r.call(n, t); }
    complete() { var t, n; (n = (t = this.destination) === null || t === void 0 ? void 0 : t.complete) === null || n === void 0 || n.call(t); }
    _subscribe(t) { var n, r; return (r = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t)) !== null && r !== void 0 ? r : Ho; }
};
var G = class extends q {
    constructor(t) { super(), this._value = t; }
    get value() { return this.getValue(); }
    _subscribe(t) { let n = super._subscribe(t); return !n.closed && t.next(this._value), n; }
    getValue() { let { hasError: t, thrownError: n, _value: r } = this; if (t)
        throw n; return this._throwIfClosed(), r; }
    next(t) { super.next(this._value = t); }
};
var J = new O(e => e.complete());
function Pa(e) { return e && y(e.schedule); }
function Fa(e) { return e[e.length - 1]; }
function ka(e) { return y(Fa(e)) ? e.pop() : void 0; }
function Le(e) { return Pa(Fa(e)) ? e.pop() : void 0; }
function ja(e, t, n, r) { function o(i) { return i instanceof n ? i : new n(function (s) { s(i); }); } return new (n || (n = Promise))(function (i, s) { function a(l) { try {
    c(r.next(l));
}
catch (d) {
    s(d);
} } function u(l) { try {
    c(r.throw(l));
}
catch (d) {
    s(d);
} } function c(l) { l.done ? i(l.value) : o(l.value).then(a, u); } c((r = r.apply(e, t || [])).next()); }); }
function La(e) { var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0; if (n)
    return n.call(e); if (e && typeof e.length == "number")
    return { next: function () { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined."); }
function Ke(e) { return this instanceof Ke ? (this.v = e, this) : new Ke(e); }
function Va(e, t, n) { if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined."); var r = n.apply(e, t || []), o, i = []; return o = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), a("next"), a("throw"), a("return", s), o[Symbol.asyncIterator] = function () { return this; }, o; function s(f) { return function (m) { return Promise.resolve(m).then(f, d); }; } function a(f, m) { r[f] && (o[f] = function (A) { return new Promise(function (B, L) { i.push([f, A, B, L]) > 1 || u(f, A); }); }, m && (o[f] = m(o[f]))); } function u(f, m) { try {
    c(r[f](m));
}
catch (A) {
    p(i[0][3], A);
} } function c(f) { f.value instanceof Ke ? Promise.resolve(f.value.v).then(l, d) : p(i[0][2], f); } function l(f) { u("next", f); } function d(f) { u("throw", f); } function p(f, m) { f(m), i.shift(), i.length && u(i[0][0], i[0][1]); } }
function Ba(e) { if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined."); var t = e[Symbol.asyncIterator], n; return t ? t.call(e) : (e = typeof La == "function" ? La(e) : e[Symbol.iterator](), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function () { return this; }, n); function r(i) { n[i] = e[i] && function (s) { return new Promise(function (a, u) { s = e[i](s), o(a, u, s.done, s.value); }); }; } function o(i, s, a, u) { Promise.resolve(u).then(function (c) { i({ value: c, done: a }); }, s); } }
var tr = e => e && typeof e.length == "number" && typeof e != "function";
function nr(e) { return y(e?.then); }
function rr(e) { return y(e[yt]); }
function or(e) { return Symbol.asyncIterator && y(e?.[Symbol.asyncIterator]); }
function ir(e) { return new TypeError(`You provided ${e !== null && typeof e == "object" ? "an invalid object" : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`); }
function pf() { return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator; }
var sr = pf();
function ar(e) { return y(e?.[sr]); }
function ur(e) { return Va(this, arguments, function* () { let n = e.getReader(); try {
    for (;;) {
        let { value: r, done: o } = yield Ke(n.read());
        if (o)
            return yield Ke(void 0);
        yield yield Ke(r);
    }
}
finally {
    n.releaseLock();
} }); }
function cr(e) { return y(e?.getReader); }
function $(e) { if (e instanceof O)
    return e; if (e != null) {
    if (rr(e))
        return gf(e);
    if (tr(e))
        return mf(e);
    if (nr(e))
        return vf(e);
    if (or(e))
        return Ha(e);
    if (ar(e))
        return yf(e);
    if (cr(e))
        return Df(e);
} throw ir(e); }
function gf(e) { return new O(t => { let n = e[yt](); if (y(n.subscribe))
    return n.subscribe(t); throw new TypeError("Provided object does not correctly implement Symbol.observable"); }); }
function mf(e) { return new O(t => { for (let n = 0; n < e.length && !t.closed; n++)
    t.next(e[n]); t.complete(); }); }
function vf(e) { return new O(t => { e.then(n => { t.closed || (t.next(n), t.complete()); }, n => t.error(n)).then(null, Jn); }); }
function yf(e) { return new O(t => { for (let n of e)
    if (t.next(n), t.closed)
        return; t.complete(); }); }
function Ha(e) { return new O(t => { Ef(e, t).catch(n => t.error(n)); }); }
function Df(e) { return Ha(ur(e)); }
function Ef(e, t) { var n, r, o, i; return ja(this, void 0, void 0, function* () { try {
    for (n = Ba(e); r = yield n.next(), !r.done;) {
        let s = r.value;
        if (t.next(s), t.closed)
            return;
    }
}
catch (s) {
    o = { error: s };
}
finally {
    try {
        r && !r.done && (i = n.return) && (yield i.call(n));
    }
    finally {
        if (o)
            throw o.error;
    }
} t.complete(); }); }
function K(e, t, n, r = 0, o = !1) { let i = t.schedule(function () { n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe(); }, r); if (e.add(i), !o)
    return i; }
function lr(e, t = 0) { return T((n, r) => { n.subscribe(N(r, o => K(r, e, () => r.next(o), t), () => K(r, e, () => r.complete(), t), o => K(r, e, () => r.error(o), t))); }); }
function dr(e, t = 0) { return T((n, r) => { r.add(e.schedule(() => n.subscribe(r), t)); }); }
function Ua(e, t) { return $(e).pipe(dr(t), lr(t)); }
function $a(e, t) { return $(e).pipe(dr(t), lr(t)); }
function Ga(e, t) { return new O(n => { let r = 0; return t.schedule(function () { r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule()); }); }); }
function za(e, t) { return new O(n => { let r; return K(n, t, () => { r = e[sr](), K(n, t, () => { let o, i; try {
    ({ value: o, done: i } = r.next());
}
catch (s) {
    n.error(s);
    return;
} i ? n.complete() : n.next(o); }, 0, !0); }), () => y(r?.return) && r.return(); }); }
function fr(e, t) { if (!e)
    throw new Error("Iterable cannot be null"); return new O(n => { K(n, t, () => { let r = e[Symbol.asyncIterator](); K(n, t, () => { r.next().then(o => { o.done ? n.complete() : n.next(o.value); }); }, 0, !0); }); }); }
function Wa(e, t) { return fr(ur(e), t); }
function qa(e, t) { if (e != null) {
    if (rr(e))
        return Ua(e, t);
    if (tr(e))
        return Ga(e, t);
    if (nr(e))
        return $a(e, t);
    if (or(e))
        return fr(e, t);
    if (ar(e))
        return za(e, t);
    if (cr(e))
        return Wa(e, t);
} throw ir(e); }
function H(e, t) { return t ? qa(e, t) : $(e); }
function E(...e) { let t = Le(e); return H(e, t); }
function It(e, t) { let n = y(e) ? e : () => e, r = o => o.error(n()); return new O(t ? o => t.schedule(r, 0, o) : r); }
function Ko(e) { return !!e && (e instanceof O || y(e.lift) && y(e.subscribe)); }
var Se = pt(e => function () { e(this), this.name = "EmptyError", this.message = "no elements in sequence"; });
function S(e, t) { return T((n, r) => { let o = 0; n.subscribe(N(r, i => { r.next(e.call(t, i, o++)); })); }); }
var { isArray: If } = Array;
function Cf(e, t) { return If(t) ? e(...t) : e(t); }
function Za(e) { return S(t => Cf(e, t)); }
var { isArray: wf } = Array, { getPrototypeOf: bf, prototype: Sf, keys: _f } = Object;
function Ya(e) { if (e.length === 1) {
    let t = e[0];
    if (wf(t))
        return { args: t, keys: null };
    if (Mf(t)) {
        let n = _f(t);
        return { args: n.map(r => t[r]), keys: n };
    }
} return { args: e, keys: null }; }
function Mf(e) { return e && typeof e == "object" && bf(e) === Sf; }
function Ka(e, t) { return e.reduce((n, r, o) => (n[r] = t[o], n), {}); }
function hr(...e) { let t = Le(e), n = ka(e), { args: r, keys: o } = Ya(e); if (r.length === 0)
    return H([], t); let i = new O(Tf(r, t, o ? s => Ka(o, s) : Q)); return n ? i.pipe(Za(n)) : i; }
function Tf(e, t, n = Q) { return r => { Qa(t, () => { let { length: o } = e, i = new Array(o), s = o, a = o; for (let u = 0; u < o; u++)
    Qa(t, () => { let c = H(e[u], t), l = !1; c.subscribe(N(r, d => { i[u] = d, l || (l = !0, a--), a || r.next(n(i.slice())); }, () => { --s || r.complete(); })); }, r); }, r); }; }
function Qa(e, t, n) { e ? K(n, e, t) : t(); }
function Ja(e, t, n, r, o, i, s, a) { let u = [], c = 0, l = 0, d = !1, p = () => { d && !u.length && !c && t.complete(); }, f = A => c < r ? m(A) : u.push(A), m = A => { i && t.next(A), c++; let B = !1; $(n(A, l++)).subscribe(N(t, L => { o?.(L), i ? f(L) : t.next(L); }, () => { B = !0; }, void 0, () => { if (B)
    try {
        for (c--; u.length && c < r;) {
            let L = u.shift();
            s ? K(t, s, () => m(L)) : m(L);
        }
        p();
    }
    catch (L) {
        t.error(L);
    } })); }; return e.subscribe(N(t, f, () => { d = !0, p(); })), () => { a?.(); }; }
function U(e, t, n = 1 / 0) { return y(t) ? U((r, o) => S((i, s) => t(r, i, o, s))($(e(r, o))), n) : (typeof t == "number" && (n = t), T((r, o) => Ja(r, o, e, n))); }
function Qo(e = 1 / 0) { return U(Q, e); }
function Xa() { return Qo(1); }
function Ct(...e) { return Xa()(H(e, Le(e))); }
function pr(e) { return new O(t => { $(e()).subscribe(t); }); }
function de(e, t) { return T((n, r) => { let o = 0; n.subscribe(N(r, i => e.call(t, i, o++) && r.next(i))); }); }
function je(e) { return T((t, n) => { let r = null, o = !1, i; r = t.subscribe(N(n, void 0, void 0, s => { i = $(e(s, je(e)(t))), r ? (r.unsubscribe(), r = null, i.subscribe(n)) : o = !0; })), o && (r.unsubscribe(), r = null, i.subscribe(n)); }); }
function eu(e, t, n, r, o) { return (i, s) => { let a = n, u = t, c = 0; i.subscribe(N(s, l => { let d = c++; u = a ? e(u, l, d) : (a = !0, l), r && s.next(u); }, o && (() => { a && s.next(u), s.complete(); }))); }; }
function wt(e, t) { return y(t) ? U(e, t, 1) : U(e, 1); }
function Ve(e) { return T((t, n) => { let r = !1; t.subscribe(N(n, o => { r = !0, n.next(o); }, () => { r || n.next(e), n.complete(); })); }); }
function _e(e) { return e <= 0 ? () => J : T((t, n) => { let r = 0; t.subscribe(N(n, o => { ++r <= e && (n.next(o), e <= r && n.complete()); })); }); }
function Jo(e) { return S(() => e); }
function gr(e = Nf) { return T((t, n) => { let r = !1; t.subscribe(N(n, o => { r = !0, n.next(o); }, () => r ? n.complete() : n.error(e()))); }); }
function Nf() { return new Se; }
function on(e) { return T((t, n) => { try {
    t.subscribe(n);
}
finally {
    n.add(e);
} }); }
function Ee(e, t) { let n = arguments.length >= 2; return r => r.pipe(e ? de((o, i) => e(o, i, r)) : Q, _e(1), n ? Ve(t) : gr(() => new Se)); }
function bt(e) { return e <= 0 ? () => J : T((t, n) => { let r = []; t.subscribe(N(n, o => { r.push(o), e < r.length && r.shift(); }, () => { for (let o of r)
    n.next(o); n.complete(); }, void 0, () => { r = null; })); }); }
function Xo(e, t) { let n = arguments.length >= 2; return r => r.pipe(e ? de((o, i) => e(o, i, r)) : Q, bt(1), n ? Ve(t) : gr(() => new Se)); }
function ei(e, t) { return T(eu(e, t, arguments.length >= 2, !0)); }
function ti(...e) { let t = Le(e); return T((n, r) => { (t ? Ct(e, n, t) : Ct(e, n)).subscribe(r); }); }
function fe(e, t) { return T((n, r) => { let o = null, i = 0, s = !1, a = () => s && !o && r.complete(); n.subscribe(N(r, u => { o?.unsubscribe(); let c = 0, l = i++; $(e(u, l)).subscribe(o = N(r, d => r.next(t ? t(u, d, l, c++) : d), () => { o = null, a(); })); }, () => { s = !0, a(); })); }); }
function ni(e) { return T((t, n) => { $(e).subscribe(N(n, () => n.complete(), rn)), !n.closed && t.subscribe(n); }); }
function z(e, t, n) { let r = y(e) || t || n ? { next: e, error: t, complete: n } : e; return r ? T((o, i) => { var s; (s = r.subscribe) === null || s === void 0 || s.call(r); let a = !0; o.subscribe(N(i, u => { var c; (c = r.next) === null || c === void 0 || c.call(r, u), i.next(u); }, () => { var u; a = !1, (u = r.complete) === null || u === void 0 || u.call(r), i.complete(); }, u => { var c; a = !1, (c = r.error) === null || c === void 0 || c.call(r, u), i.error(u); }, () => { var u, c; a && ((u = r.unsubscribe) === null || u === void 0 || u.call(r)), (c = r.finalize) === null || c === void 0 || c.call(r); })); }) : Q; }
var v = class extends Error {
    constructor(t, n) { super(Gi(t, n)), this.code = t; }
};
function Gi(e, t) { return `${`NG0${Math.abs(e)}`}${t ? ": " + t : ""}`; }
function zi(e) { return { toString: e }.toString(); }
function F(e) { for (let t in e)
    if (e[t] === F)
        return t; throw Error("Could not find renamed property on target object."); }
function X(e) {
    if (typeof e == "string")
        return e;
    if (Array.isArray(e))
        return "[" + e.map(X).join(", ") + "]";
    if (e == null)
        return "" + e;
    if (e.overriddenName)
        return `${e.overriddenName}`;
    if (e.name)
        return `${e.name}`;
    let t = e.toString();
    if (t == null)
        return "" + t;
    let n = t.indexOf(`
`);
    return n === -1 ? t : t.substring(0, n);
}
function tu(e, t) { return e == null || e === "" ? t === null ? "" : t : t == null || t === "" ? e : e + " " + t; }
var Rf = F({ __forward_ref__: F });
function ku(e) { return e.__forward_ref__ = ku, e.toString = function () { return X(this()); }, e; }
function oe(e) { return Lu(e) ? e() : e; }
function Lu(e) { return typeof e == "function" && e.hasOwnProperty(Rf) && e.__forward_ref__ === ku; }
function D(e) { return { token: e.token, providedIn: e.providedIn || null, factory: e.factory, value: void 0 }; }
function Br(e) { return nu(e, Vu) || nu(e, Bu); }
function ju(e) { return Br(e) !== null; }
function nu(e, t) { return e.hasOwnProperty(t) ? e[t] : null; }
function Af(e) { let t = e && (e[Vu] || e[Bu]); return t || null; }
function ru(e) { return e && (e.hasOwnProperty(ou) || e.hasOwnProperty(xf)) ? e[ou] : null; }
var Vu = F({ \u0275prov: F }), ou = F({ \u0275inj: F }), Bu = F({ ngInjectableDef: F }), xf = F({ ngInjectorDef: F }), w = class {
    constructor(t, n) { this._desc = t, this.ngMetadataName = "InjectionToken", this.\u0275prov = void 0, typeof n == "number" ? this.__NG_ELEMENT_ID__ = n : n !== void 0 && (this.\u0275prov = D({ token: this, providedIn: n.providedIn || "root", factory: n.factory })); }
    get multi() { return this; }
    toString() { return `InjectionToken ${this._desc}`; }
};
function Hu(e) { return e && !!e.\u0275providers; }
var Of = F({ \u0275cmp: F }), Pf = F({ \u0275dir: F }), Ff = F({ \u0275pipe: F }), kf = F({ \u0275mod: F }), Cr = F({ \u0275fac: F }), un = F({ __NG_ELEMENT_ID__: F }), iu = F({ __NG_ENV_ID__: F });
function Uu(e) { return typeof e == "string" ? e : e == null ? "" : String(e); }
function Lf(e) { return typeof e == "function" ? e.name || e.toString() : typeof e == "object" && e != null && typeof e.type == "function" ? e.type.name || e.type.toString() : Uu(e); }
function jf(e, t) { let n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : ""; throw new v(-200, e); }
function Wi(e, t) { throw new v(-201, !1); }
var b = function (e) { return e[e.Default = 0] = "Default", e[e.Host = 1] = "Host", e[e.Self = 2] = "Self", e[e.SkipSelf = 4] = "SkipSelf", e[e.Optional = 8] = "Optional", e; }(b || {}), di;
function $u() { return di; }
function re(e) { let t = di; return di = e, t; }
function Gu(e, t, n) { let r = Br(e); if (r && r.providedIn == "root")
    return r.value === void 0 ? r.value = r.factory() : r.value; if (n & b.Optional)
    return null; if (t !== void 0)
    return t; Wi(e, "Injector"); }
var Vf = {}, cn = Vf, Bf = "__NG_DI_FLAG__", wr = "ngTempTokenPath", Hf = "ngTokenPath", Uf = /\n/gm, $f = "\u0275", su = "__source", Tt;
function Gf() { return Tt; }
function Be(e) { let t = Tt; return Tt = e, t; }
function zf(e, t = b.Default) { if (Tt === void 0)
    throw new v(-203, !1); return Tt === null ? Gu(e, void 0, t) : Tt.get(e, t & b.Optional ? null : void 0, t); }
function M(e, t = b.Default) { return ($u() || zf)(oe(e), t); }
function h(e, t = b.Default) { return M(e, Hr(t)); }
function Hr(e) { return typeof e > "u" || typeof e == "number" ? e : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4); }
function fi(e) { let t = []; for (let n = 0; n < e.length; n++) {
    let r = oe(e[n]);
    if (Array.isArray(r)) {
        if (r.length === 0)
            throw new v(900, !1);
        let o, i = b.Default;
        for (let s = 0; s < r.length; s++) {
            let a = r[s], u = Wf(a);
            typeof u == "number" ? u === -1 ? o = a.token : i |= u : o = a;
        }
        t.push(M(o, i));
    }
    else
        t.push(M(r));
} return t; }
function Wf(e) { return e[Bf]; }
function qf(e, t, n, r) {
    let o = e[wr];
    throw t[su] && o.unshift(t[su]), e.message = Zf(`
` + e.message, o, n, r), e[Hf] = o, e[wr] = null, e;
}
function Zf(e, t, n, r = null) {
    e = e && e.charAt(0) === `
` && e.charAt(1) == $f ? e.slice(2) : e;
    let o = X(t);
    if (Array.isArray(t))
        o = t.map(X).join(" -> ");
    else if (typeof t == "object") {
        let i = [];
        for (let s in t)
            if (t.hasOwnProperty(s)) {
                let a = t[s];
                i.push(s + ":" + (typeof a == "string" ? JSON.stringify(a) : X(a)));
            }
        o = `{${i.join(", ")}}`;
    }
    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(Uf, `
  `)}`;
}
function Rt(e, t) { let n = e.hasOwnProperty(Cr); return n ? e[Cr] : null; }
function qi(e, t) { e.forEach(n => Array.isArray(n) ? qi(n, t) : t(n)); }
function zu(e, t, n) { t >= e.length ? e.push(n) : e.splice(t, 0, n); }
function br(e, t) { return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]; }
var ln = {}, At = [], xt = new w(""), Wu = new w("", -1), qu = new w(""), Sr = class {
    get(t, n = cn) { if (n === cn) {
        let r = new Error(`NullInjectorError: No provider for ${X(t)}!`);
        throw r.name = "NullInjectorError", r;
    } return n; }
}, Zu = function (e) { return e[e.OnPush = 0] = "OnPush", e[e.Default = 1] = "Default", e; }(Zu || {}), Ce = function (e) { return e[e.Emulated = 0] = "Emulated", e[e.None = 2] = "None", e[e.ShadowDom = 3] = "ShadowDom", e; }(Ce || {}), $e = function (e) { return e[e.None = 0] = "None", e[e.SignalBased = 1] = "SignalBased", e[e.HasDecoratorInputTransform = 2] = "HasDecoratorInputTransform", e; }($e || {});
function Yf(e, t, n) { let r = e.length; for (;;) {
    let o = e.indexOf(t, n);
    if (o === -1)
        return o;
    if (o === 0 || e.charCodeAt(o - 1) <= 32) {
        let i = t.length;
        if (o + i === r || e.charCodeAt(o + i) <= 32)
            return o;
    }
    n = o + 1;
} }
function hi(e, t, n) { let r = 0; for (; r < n.length;) {
    let o = n[r];
    if (typeof o == "number") {
        if (o !== 0)
            break;
        r++;
        let i = n[r++], s = n[r++], a = n[r++];
        e.setAttribute(t, s, a, i);
    }
    else {
        let i = o, s = n[++r];
        Qf(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
    }
} return r; }
function Kf(e) { return e === 3 || e === 4 || e === 6; }
function Qf(e) { return e.charCodeAt(0) === 64; }
function Zi(e, t) { if (!(t === null || t.length === 0))
    if (e === null || e.length === 0)
        e = t.slice();
    else {
        let n = -1;
        for (let r = 0; r < t.length; r++) {
            let o = t[r];
            typeof o == "number" ? n = o : n === 0 || (n === -1 || n === 2 ? au(e, n, o, null, t[++r]) : au(e, n, o, null, null));
        }
    } return e; }
function au(e, t, n, r, o) { let i = 0, s = e.length; if (t === -1)
    s = -1;
else
    for (; i < e.length;) {
        let a = e[i++];
        if (typeof a == "number") {
            if (a === t) {
                s = -1;
                break;
            }
            else if (a > t) {
                s = i - 1;
                break;
            }
        }
    } for (; i < e.length;) {
    let a = e[i];
    if (typeof a == "number")
        break;
    if (a === n) {
        if (r === null) {
            o !== null && (e[i + 1] = o);
            return;
        }
        else if (r === e[i + 1]) {
            e[i + 2] = o;
            return;
        }
    }
    i++, r !== null && i++, o !== null && i++;
} s !== -1 && (e.splice(s, 0, t), i = s + 1), e.splice(i++, 0, n), r !== null && e.splice(i++, 0, r), o !== null && e.splice(i++, 0, o); }
var Yu = "ng-template";
function Jf(e, t, n, r) { let o = 0; if (r) {
    for (; o < t.length && typeof t[o] == "string"; o += 2)
        if (t[o] === "class" && Yf(t[o + 1].toLowerCase(), n, 0) !== -1)
            return !0;
}
else if (Yi(e))
    return !1; if (o = t.indexOf(1, o), o > -1) {
    let i;
    for (; ++o < t.length && typeof (i = t[o]) == "string";)
        if (i.toLowerCase() === n)
            return !0;
} return !1; }
function Yi(e) { return e.type === 4 && e.value !== Yu; }
function Xf(e, t, n) { let r = e.type === 4 && !n ? Yu : e.value; return t === r; }
function eh(e, t, n) { let r = 4, o = e.attrs, i = o !== null ? rh(o) : 0, s = !1; for (let a = 0; a < t.length; a++) {
    let u = t[a];
    if (typeof u == "number") {
        if (!s && !he(r) && !he(u))
            return !1;
        if (s && he(u))
            continue;
        s = !1, r = u | r & 1;
        continue;
    }
    if (!s)
        if (r & 4) {
            if (r = 2 | r & 1, u !== "" && !Xf(e, u, n) || u === "" && t.length === 1) {
                if (he(r))
                    return !1;
                s = !0;
            }
        }
        else if (r & 8) {
            if (o === null || !Jf(e, o, u, n)) {
                if (he(r))
                    return !1;
                s = !0;
            }
        }
        else {
            let c = t[++a], l = th(u, o, Yi(e), n);
            if (l === -1) {
                if (he(r))
                    return !1;
                s = !0;
                continue;
            }
            if (c !== "") {
                let d;
                if (l > i ? d = "" : d = o[l + 1].toLowerCase(), r & 2 && c !== d) {
                    if (he(r))
                        return !1;
                    s = !0;
                }
            }
        }
} return he(r) || s; }
function he(e) { return (e & 1) === 0; }
function th(e, t, n, r) { if (t === null)
    return -1; let o = 0; if (r || !n) {
    let i = !1;
    for (; o < t.length;) {
        let s = t[o];
        if (s === e)
            return o;
        if (s === 3 || s === 6)
            i = !0;
        else if (s === 1 || s === 2) {
            let a = t[++o];
            for (; typeof a == "string";)
                a = t[++o];
            continue;
        }
        else {
            if (s === 4)
                break;
            if (s === 0) {
                o += 4;
                continue;
            }
        }
        o += i ? 1 : 2;
    }
    return -1;
}
else
    return oh(t, e); }
function nh(e, t, n = !1) { for (let r = 0; r < t.length; r++)
    if (eh(e, t[r], n))
        return !0; return !1; }
function rh(e) { for (let t = 0; t < e.length; t++) {
    let n = e[t];
    if (Kf(n))
        return t;
} return e.length; }
function oh(e, t) { let n = e.indexOf(4); if (n > -1)
    for (n++; n < e.length;) {
        let r = e[n];
        if (typeof r == "number")
            return -1;
        if (r === t)
            return n;
        n++;
    } return -1; }
function uu(e, t) { return e ? ":not(" + t.trim() + ")" : t; }
function ih(e) { let t = e[0], n = 1, r = 2, o = "", i = !1; for (; n < e.length;) {
    let s = e[n];
    if (typeof s == "string")
        if (r & 2) {
            let a = e[++n];
            o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
        }
        else
            r & 8 ? o += "." + s : r & 4 && (o += " " + s);
    else
        o !== "" && !he(s) && (t += uu(i, o), o = ""), r = s, i = i || !he(r);
    n++;
} return o !== "" && (t += uu(i, o)), t; }
function sh(e) { return e.map(ih).join(","); }
function ah(e) { let t = [], n = [], r = 1, o = 2; for (; r < e.length;) {
    let i = e[r];
    if (typeof i == "string")
        o === 2 ? i !== "" && t.push(i, e[++r]) : o === 8 && n.push(i);
    else {
        if (!he(o))
            break;
        o = i;
    }
    r++;
} return { attrs: t, classes: n }; }
function Vt(e) { return zi(() => { let t = ec(e), n = k(g({}, t), { decls: e.decls, vars: e.vars, template: e.template, consts: e.consts || null, ngContentSelectors: e.ngContentSelectors, onPush: e.changeDetection === Zu.OnPush, directiveDefs: null, pipeDefs: null, dependencies: t.standalone && e.dependencies || null, getStandaloneInjector: null, signals: e.signals ?? !1, data: e.data || {}, encapsulation: e.encapsulation || Ce.Emulated, styles: e.styles || At, _: null, schemas: e.schemas || null, tView: null, id: "" }); tc(n); let r = e.dependencies; return n.directiveDefs = lu(r, !1), n.pipeDefs = lu(r, !0), n.id = lh(n), n; }); }
function uh(e) { return Xe(e) || Ku(e); }
function ch(e) { return e !== null; }
function cu(e, t) { if (e == null)
    return ln; let n = {}; for (let r in e)
    if (e.hasOwnProperty(r)) {
        let o = e[r], i, s, a = $e.None;
        Array.isArray(o) ? (a = o[0], i = o[1], s = o[2] ?? i) : (i = o, s = o), t ? (n[i] = a !== $e.None ? [r, a] : r, t[i] = s) : n[i] = r;
    } return n; }
function Ki(e) { return zi(() => { let t = ec(e); return tc(t), t; }); }
function Xe(e) { return e[Of] || null; }
function Ku(e) { return e[Pf] || null; }
function Qu(e) { return e[Ff] || null; }
function Ju(e) { let t = Xe(e) || Ku(e) || Qu(e); return t !== null ? t.standalone : !1; }
function Xu(e, t) { let n = e[kf] || null; if (!n && t === !0)
    throw new Error(`Type ${X(e)} does not have '\u0275mod' property.`); return n; }
function ec(e) { let t = {}; return { type: e.type, providersResolver: null, factory: null, hostBindings: e.hostBindings || null, hostVars: e.hostVars || 0, hostAttrs: e.hostAttrs || null, contentQueries: e.contentQueries || null, declaredInputs: t, inputTransforms: null, inputConfig: e.inputs || ln, exportAs: e.exportAs || null, standalone: e.standalone === !0, signals: e.signals === !0, selectors: e.selectors || At, viewQuery: e.viewQuery || null, features: e.features || null, setInput: null, findHostDirectiveDefs: null, hostDirectives: null, inputs: cu(e.inputs, t), outputs: cu(e.outputs), debugInfo: null }; }
function tc(e) { e.features?.forEach(t => t(e)); }
function lu(e, t) { if (!e)
    return null; let n = t ? Qu : uh; return () => (typeof e == "function" ? e() : e).map(r => n(r)).filter(ch); }
function lh(e) { let t = 0, n = [e.selectors, e.ngContentSelectors, e.hostVars, e.hostAttrs, e.consts, e.vars, e.decls, e.encapsulation, e.standalone, e.signals, e.exportAs, JSON.stringify(e.inputs), JSON.stringify(e.outputs), Object.getOwnPropertyNames(e.type.prototype), !!e.contentQueries, !!e.viewQuery].join("|"); for (let o of n)
    t = Math.imul(31, t) + o.charCodeAt(0) << 0; return t += 2147483648, "c" + t; }
function Ur(e) { return { \u0275providers: e }; }
function dh(...e) { return { \u0275providers: nc(!0, e), \u0275fromNgModule: !0 }; }
function nc(e, ...t) { let n = [], r = new Set, o, i = s => { n.push(s); }; return qi(t, s => { let a = s; pi(a, i, [], r) && (o ||= [], o.push(a)); }), o !== void 0 && rc(o, i), n; }
function rc(e, t) { for (let n = 0; n < e.length; n++) {
    let { ngModule: r, providers: o } = e[n];
    Qi(o, i => { t(i, r); });
} }
function pi(e, t, n, r) { if (e = oe(e), !e)
    return !1; let o = null, i = ru(e), s = !i && Xe(e); if (!i && !s) {
    let u = e.ngModule;
    if (i = ru(u), i)
        o = u;
    else
        return !1;
}
else {
    if (s && !s.standalone)
        return !1;
    o = e;
} let a = r.has(o); if (s) {
    if (a)
        return !1;
    if (r.add(o), s.dependencies) {
        let u = typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
        for (let c of u)
            pi(c, t, n, r);
    }
}
else if (i) {
    if (i.imports != null && !a) {
        r.add(o);
        let c;
        try {
            qi(i.imports, l => { pi(l, t, n, r) && (c ||= [], c.push(l)); });
        }
        finally { }
        c !== void 0 && rc(c, t);
    }
    if (!a) {
        let c = Rt(o) || (() => new o);
        t({ provide: o, useFactory: c, deps: At }, o), t({ provide: qu, useValue: o, multi: !0 }, o), t({ provide: xt, useValue: () => M(o), multi: !0 }, o);
    }
    let u = i.providers;
    if (u != null && !a) {
        let c = e;
        Qi(u, l => { t(l, c); });
    }
}
else
    return !1; return o !== e && e.providers !== void 0; }
function Qi(e, t) { for (let n of e)
    Hu(n) && (n = n.\u0275providers), Array.isArray(n) ? Qi(n, t) : t(n); }
var fh = F({ provide: String, useValue: F });
function oc(e) { return e !== null && typeof e == "object" && fh in e; }
function hh(e) { return !!(e && e.useExisting); }
function ph(e) { return !!(e && e.useFactory); }
function gi(e) { return typeof e == "function"; }
var $r = new w(""), vr = {}, gh = {}, ri;
function Ji() { return ri === void 0 && (ri = new Sr), ri; }
var ae = class {
}, dn = class extends ae {
    get destroyed() { return this._destroyed; }
    constructor(t, n, r, o) { super(), this.parent = n, this.source = r, this.scopes = o, this.records = new Map, this._ngOnDestroyHooks = new Set, this._onDestroyHooks = [], this._destroyed = !1, vi(t, s => this.processProvider(s)), this.records.set(Wu, St(void 0, this)), o.has("environment") && this.records.set(ae, St(void 0, this)); let i = this.records.get($r); i != null && typeof i.value == "string" && this.scopes.add(i.value), this.injectorDefTypes = new Set(this.get(qu, At, b.Self)); }
    destroy() { this.assertNotDestroyed(), this._destroyed = !0; let t = P(null); try {
        for (let r of this._ngOnDestroyHooks)
            r.ngOnDestroy();
        let n = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let r of n)
            r();
    }
    finally {
        this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), P(t);
    } }
    onDestroy(t) { return this.assertNotDestroyed(), this._onDestroyHooks.push(t), () => this.removeOnDestroy(t); }
    runInContext(t) { this.assertNotDestroyed(); let n = Be(this), r = re(void 0), o; try {
        return t();
    }
    finally {
        Be(n), re(r);
    } }
    get(t, n = cn, r = b.Default) { if (this.assertNotDestroyed(), t.hasOwnProperty(iu))
        return t[iu](this); r = Hr(r); let o, i = Be(this), s = re(void 0); try {
        if (!(r & b.SkipSelf)) {
            let u = this.records.get(t);
            if (u === void 0) {
                let c = Ih(t) && Br(t);
                c && this.injectableDefInScope(c) ? u = St(mi(t), vr) : u = null, this.records.set(t, u);
            }
            if (u != null)
                return this.hydrate(t, u);
        }
        let a = r & b.Self ? Ji() : this.parent;
        return n = r & b.Optional && n === cn ? null : n, a.get(t, n);
    }
    catch (a) {
        if (a.name === "NullInjectorError") {
            if ((a[wr] = a[wr] || []).unshift(X(t)), i)
                throw a;
            return qf(a, t, "R3InjectorError", this.source);
        }
        else
            throw a;
    }
    finally {
        re(s), Be(i);
    } }
    resolveInjectorInitializers() { let t = P(null), n = Be(this), r = re(void 0), o; try {
        let i = this.get(xt, At, b.Self);
        for (let s of i)
            s();
    }
    finally {
        Be(n), re(r), P(t);
    } }
    toString() { let t = [], n = this.records; for (let r of n.keys())
        t.push(X(r)); return `R3Injector[${t.join(", ")}]`; }
    assertNotDestroyed() { if (this._destroyed)
        throw new v(205, !1); }
    processProvider(t) { t = oe(t); let n = gi(t) ? t : oe(t && t.provide), r = vh(t); if (!gi(t) && t.multi === !0) {
        let o = this.records.get(n);
        o || (o = St(void 0, vr, !0), o.factory = () => fi(o.multi), this.records.set(n, o)), n = t, o.multi.push(t);
    } this.records.set(n, r); }
    hydrate(t, n) { let r = P(null); try {
        return n.value === vr && (n.value = gh, n.value = n.factory()), typeof n.value == "object" && n.value && Eh(n.value) && this._ngOnDestroyHooks.add(n.value), n.value;
    }
    finally {
        P(r);
    } }
    injectableDefInScope(t) { if (!t.providedIn)
        return !1; let n = oe(t.providedIn); return typeof n == "string" ? n === "any" || this.scopes.has(n) : this.injectorDefTypes.has(n); }
    removeOnDestroy(t) { let n = this._onDestroyHooks.indexOf(t); n !== -1 && this._onDestroyHooks.splice(n, 1); }
};
function mi(e) { let t = Br(e), n = t !== null ? t.factory : Rt(e); if (n !== null)
    return n; if (e instanceof w)
    throw new v(204, !1); if (e instanceof Function)
    return mh(e); throw new v(204, !1); }
function mh(e) { if (e.length > 0)
    throw new v(204, !1); let n = Af(e); return n !== null ? () => n.factory(e) : () => new e; }
function vh(e) { if (oc(e))
    return St(void 0, e.useValue); {
    let t = yh(e);
    return St(t, vr);
} }
function yh(e, t, n) { let r; if (gi(e)) {
    let o = oe(e);
    return Rt(o) || mi(o);
}
else if (oc(e))
    r = () => oe(e.useValue);
else if (ph(e))
    r = () => e.useFactory(...fi(e.deps || []));
else if (hh(e))
    r = () => M(oe(e.useExisting));
else {
    let o = oe(e && (e.useClass || e.provide));
    if (Dh(e))
        r = () => new o(...fi(e.deps));
    else
        return Rt(o) || mi(o);
} return r; }
function St(e, t, n = !1) { return { factory: e, value: t, multi: n ? [] : void 0 }; }
function Dh(e) { return !!e.deps; }
function Eh(e) { return e !== null && typeof e == "object" && typeof e.ngOnDestroy == "function"; }
function Ih(e) { return typeof e == "function" || typeof e == "object" && e instanceof w; }
function vi(e, t) { for (let n of e)
    Array.isArray(n) ? vi(n, t) : n && Hu(n) ? vi(n.\u0275providers, t) : t(n); }
function Re(e, t) { e instanceof dn && e.assertNotDestroyed(); let n, r = Be(e), o = re(void 0); try {
    return t();
}
finally {
    Be(r), re(o);
} }
function Ch() { return $u() !== void 0 || Gf() != null; }
function wh(e) { return typeof e == "function"; }
var Ae = 0, _ = 1, I = 2, Y = 3, pe = 4, me = 5, _r = 6, du = 7, Ge = 8, Ot = 9, Me = 10, ge = 11, fn = 12, fu = 13, yn = 14, we = 15, hn = 16, _t = 17, Gr = 18, zr = 19, ic = 20, Ue = 21, oi = 22, ie = 23, et = 25, sc = 1;
var tt = 7, Mr = 8, Tr = 9, se = 10, Nr = function (e) { return e[e.None = 0] = "None", e[e.HasTransplantedViews = 2] = "HasTransplantedViews", e; }(Nr || {});
function Qe(e) { return Array.isArray(e) && typeof e[sc] == "object"; }
function xe(e) { return Array.isArray(e) && e[sc] === !0; }
function ac(e) { return (e.flags & 4) !== 0; }
function Xi(e) { return e.componentOffset > -1; }
function bh(e) { return (e.flags & 1) === 1; }
function Dn(e) { return !!e.template; }
function yi(e) { return (e[I] & 512) !== 0; }
var Di = class {
    constructor(t, n, r) { this.previousValue = t, this.currentValue = n, this.firstChange = r; }
    isFirstChange() { return this.firstChange; }
};
function uc(e, t, n, r) { t !== null ? t.applyValueToInputSignal(t, r) : e[n] = r; }
function Wr() { return cc; }
function cc(e) { return e.type.prototype.ngOnChanges && (e.setInput = _h), Sh; }
Wr.ngInherit = !0;
function Sh() { let e = dc(this), t = e?.current; if (t) {
    let n = e.previous;
    if (n === ln)
        e.previous = t;
    else
        for (let r in t)
            n[r] = t[r];
    e.current = null, this.ngOnChanges(t);
} }
function _h(e, t, n, r, o) { let i = this.declaredInputs[r], s = dc(e) || Mh(e, { previous: ln, current: null }), a = s.current || (s.current = {}), u = s.previous, c = u[i]; a[i] = new Di(c && c.currentValue, n, u === ln), uc(e, t, o, n); }
var lc = "__ngSimpleChanges__";
function dc(e) { return e[lc] || null; }
function Mh(e, t) { return e[lc] = t; }
var hu = null;
var He = function (e, t, n) { hu?.(e, t, n); }, Th = "svg", Nh = "math";
function Te(e) { for (; Array.isArray(e);)
    e = e[Ae]; return e; }
function Rh(e, t) { return Te(t[e]); }
function Oe(e, t) { return Te(t[e.index]); }
function Ah(e, t) { return e.data[t]; }
function En(e, t) { let n = t[e]; return Qe(n) ? n : n[Ae]; }
function es(e) { return (e[I] & 128) === 128; }
function xh(e) { return xe(e[Y]); }
function pu(e, t) { return t == null ? null : e[t]; }
function fc(e) { e[_t] = 0; }
function hc(e) { e[I] & 1024 || (e[I] |= 1024, es(e) && Zr(e)); }
function qr(e) { return !!(e[I] & 9216 || e[ie]?.dirty); }
function Ei(e) { e[Me].changeDetectionScheduler?.notify(8), e[I] & 64 && (e[I] |= 1024), qr(e) && Zr(e); }
function Zr(e) { e[Me].changeDetectionScheduler?.notify(0); let t = nt(e); for (; t !== null && !(t[I] & 8192 || (t[I] |= 8192, !es(t)));)
    t = nt(t); }
function pc(e, t) { if ((e[I] & 256) === 256)
    throw new v(911, !1); e[Ue] === null && (e[Ue] = []), e[Ue].push(t); }
function Oh(e, t) { if (e[Ue] === null)
    return; let n = e[Ue].indexOf(t); n !== -1 && e[Ue].splice(n, 1); }
function nt(e) { let t = e[Y]; return xe(t) ? t[Y] : t; }
var x = { lFrame: wc(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
var gc = !1;
function Ph() { return x.lFrame.elementDepthCount; }
function Fh() { x.lFrame.elementDepthCount++; }
function kh() { x.lFrame.elementDepthCount--; }
function mc() { return x.bindingsEnabled; }
function Lh() { return x.skipHydrationRootTNode !== null; }
function jh(e) { return x.skipHydrationRootTNode === e; }
function Vh() { x.skipHydrationRootTNode = null; }
function ee() { return x.lFrame.lView; }
function Yr() { return x.lFrame.tView; }
function Pe() { let e = vc(); for (; e !== null && e.type === 64;)
    e = e.parent; return e; }
function vc() { return x.lFrame.currentTNode; }
function Bh() { let e = x.lFrame, t = e.currentTNode; return e.isParent ? t : t.parent; }
function Kr(e, t) { let n = x.lFrame; n.currentTNode = e, n.isParent = t; }
function yc() { return x.lFrame.isParent; }
function Hh() { x.lFrame.isParent = !1; }
function Dc() { return gc; }
function gu(e) { gc = e; }
function Uh(e) { return x.lFrame.bindingIndex = e; }
function $h() { return x.lFrame.bindingIndex++; }
function Gh() { return x.lFrame.inI18n; }
function zh(e, t) { let n = x.lFrame; n.bindingIndex = n.bindingRootIndex = e, Ii(t); }
function Wh() { return x.lFrame.currentDirectiveIndex; }
function Ii(e) { x.lFrame.currentDirectiveIndex = e; }
function Ec(e) { x.lFrame.currentQueryIndex = e; }
function qh(e) { let t = e[_]; return t.type === 2 ? t.declTNode : t.type === 1 ? e[me] : null; }
function Ic(e, t, n) { if (n & b.SkipSelf) {
    let o = t, i = e;
    for (; o = o.parent, o === null && !(n & b.Host);)
        if (o = qh(i), o === null || (i = i[yn], o.type & 10))
            break;
    if (o === null)
        return !1;
    t = o, e = i;
} let r = x.lFrame = Cc(); return r.currentTNode = t, r.lView = e, !0; }
function ts(e) { let t = Cc(), n = e[_]; x.lFrame = t, t.currentTNode = n.firstChild, t.lView = e, t.tView = n, t.contextLView = e, t.bindingIndex = n.bindingStartIndex, t.inI18n = !1; }
function Cc() { let e = x.lFrame, t = e === null ? null : e.child; return t === null ? wc(e) : t; }
function wc(e) { let t = { currentTNode: null, isParent: !0, lView: null, tView: null, selectedIndex: -1, contextLView: null, elementDepthCount: 0, currentNamespace: null, currentDirectiveIndex: -1, bindingRootIndex: -1, bindingIndex: -1, currentQueryIndex: 0, parent: e, child: null, inI18n: !1 }; return e !== null && (e.child = t), t; }
function bc() { let e = x.lFrame; return x.lFrame = e.parent, e.currentTNode = null, e.lView = null, e; }
var Sc = bc;
function ns() { let e = bc(); e.isParent = !0, e.tView = null, e.selectedIndex = -1, e.contextLView = null, e.elementDepthCount = 0, e.currentDirectiveIndex = -1, e.currentNamespace = null, e.bindingRootIndex = -1, e.bindingIndex = -1, e.currentQueryIndex = 0; }
function rs() { return x.lFrame.selectedIndex; }
function rt(e) { x.lFrame.selectedIndex = e; }
function Zh() { return x.lFrame.currentNamespace; }
var _c = !0;
function Mc() { return _c; }
function Tc(e) { _c = e; }
function Yh(e, t, n) { let { ngOnChanges: r, ngOnInit: o, ngDoCheck: i } = t.type.prototype; if (r) {
    let s = cc(t);
    (n.preOrderHooks ??= []).push(e, s), (n.preOrderCheckHooks ??= []).push(e, s);
} o && (n.preOrderHooks ??= []).push(0 - e, o), i && ((n.preOrderHooks ??= []).push(e, i), (n.preOrderCheckHooks ??= []).push(e, i)); }
function Nc(e, t) { for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
    let i = e.data[n].type.prototype, { ngAfterContentInit: s, ngAfterContentChecked: a, ngAfterViewInit: u, ngAfterViewChecked: c, ngOnDestroy: l } = i;
    s && (e.contentHooks ??= []).push(-n, s), a && ((e.contentHooks ??= []).push(n, a), (e.contentCheckHooks ??= []).push(n, a)), u && (e.viewHooks ??= []).push(-n, u), c && ((e.viewHooks ??= []).push(n, c), (e.viewCheckHooks ??= []).push(n, c)), l != null && (e.destroyHooks ??= []).push(n, l);
} }
function yr(e, t, n) { Rc(e, t, 3, n); }
function Dr(e, t, n, r) { (e[I] & 3) === n && Rc(e, t, n, r); }
function ii(e, t) { let n = e[I]; (n & 3) === t && (n &= 16383, n += 1, e[I] = n); }
function Rc(e, t, n, r) { let o = r !== void 0 ? e[_t] & 65535 : 0, i = r ?? -1, s = t.length - 1, a = 0; for (let u = o; u < s; u++)
    if (typeof t[u + 1] == "number") {
        if (a = t[u], r != null && a >= r)
            break;
    }
    else
        t[u] < 0 && (e[_t] += 65536), (a < i || i == -1) && (Kh(e, n, t, u), e[_t] = (e[_t] & 4294901760) + u + 2), u++; }
function mu(e, t) { He(4, e, t); let n = P(null); try {
    t.call(e);
}
finally {
    P(n), He(5, e, t);
} }
function Kh(e, t, n, r) { let o = n[r] < 0, i = n[r + 1], s = o ? -n[r] : n[r], a = e[s]; o ? e[I] >> 14 < e[_t] >> 16 && (e[I] & 3) === t && (e[I] += 16384, mu(a, i)) : mu(a, i); }
var Nt = -1, pn = class {
    constructor(t, n, r) { this.factory = t, this.resolving = !1, this.canSeeViewProviders = n, this.injectImpl = r; }
};
function Qh(e) { return e instanceof pn; }
function Jh(e) { return (e.flags & 8) !== 0; }
function Xh(e) { return (e.flags & 16) !== 0; }
var si = {}, Ci = class {
    constructor(t, n) { this.injector = t, this.parentInjector = n; }
    get(t, n, r) { r = Hr(r); let o = this.injector.get(t, si, r); return o !== si || n === si ? o : this.parentInjector.get(t, n, r); }
};
function Ac(e) { return e !== Nt; }
function Rr(e) { return e & 32767; }
function ep(e) { return e >> 16; }
function Ar(e, t) { let n = ep(e), r = t; for (; n > 0;)
    r = r[yn], n--; return r; }
var wi = !0;
function vu(e) { let t = wi; return wi = e, t; }
var tp = 256, xc = tp - 1, Oc = 5, np = 0, Ie = {};
function rp(e, t, n) { let r; typeof n == "string" ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(un) && (r = n[un]), r == null && (r = n[un] = np++); let o = r & xc, i = 1 << o; t.data[e + (o >> Oc)] |= i; }
function Pc(e, t) { let n = Fc(e, t); if (n !== -1)
    return n; let r = t[_]; r.firstCreatePass && (e.injectorIndex = t.length, ai(r.data, e), ai(t, null), ai(r.blueprint, null)); let o = os(e, t), i = e.injectorIndex; if (Ac(o)) {
    let s = Rr(o), a = Ar(o, t), u = a[_].data;
    for (let c = 0; c < 8; c++)
        t[i + c] = a[s + c] | u[s + c];
} return t[i + 8] = o, i; }
function ai(e, t) { e.push(0, 0, 0, 0, 0, 0, 0, 0, t); }
function Fc(e, t) { return e.injectorIndex === -1 || e.parent && e.parent.injectorIndex === e.injectorIndex || t[e.injectorIndex + 8] === null ? -1 : e.injectorIndex; }
function os(e, t) { if (e.parent && e.parent.injectorIndex !== -1)
    return e.parent.injectorIndex; let n = 0, r = null, o = t; for (; o !== null;) {
    if (r = Bc(o), r === null)
        return Nt;
    if (n++, o = o[yn], r.injectorIndex !== -1)
        return r.injectorIndex | n << 16;
} return Nt; }
function op(e, t, n) { rp(e, t, n); }
function kc(e, t, n) { if (n & b.Optional || e !== void 0)
    return e; Wi(t, "NodeInjector"); }
function Lc(e, t, n, r) { if (n & b.Optional && r === void 0 && (r = null), !(n & (b.Self | b.Host))) {
    let o = e[Ot], i = re(void 0);
    try {
        return o ? o.get(t, r, n & b.Optional) : Gu(t, r, n & b.Optional);
    }
    finally {
        re(i);
    }
} return kc(r, t, n); }
function jc(e, t, n, r = b.Default, o) { if (e !== null) {
    if (t[I] & 2048 && !(r & b.Self)) {
        let s = cp(e, t, n, r, Ie);
        if (s !== Ie)
            return s;
    }
    let i = Vc(e, t, n, r, Ie);
    if (i !== Ie)
        return i;
} return Lc(t, n, r, o); }
function Vc(e, t, n, r, o) { let i = ap(n); if (typeof i == "function") {
    if (!Ic(t, e, r))
        return r & b.Host ? kc(o, n, r) : Lc(t, n, r, o);
    try {
        let s;
        if (s = i(r), s == null && !(r & b.Optional))
            Wi(n);
        else
            return s;
    }
    finally {
        Sc();
    }
}
else if (typeof i == "number") {
    let s = null, a = Fc(e, t), u = Nt, c = r & b.Host ? t[we][me] : null;
    for ((a === -1 || r & b.SkipSelf) && (u = a === -1 ? os(e, t) : t[a + 8], u === Nt || !Du(r, !1) ? a = -1 : (s = t[_], a = Rr(u), t = Ar(u, t))); a !== -1;) {
        let l = t[_];
        if (yu(i, a, l.data)) {
            let d = ip(a, t, n, s, r, c);
            if (d !== Ie)
                return d;
        }
        u = t[a + 8], u !== Nt && Du(r, t[_].data[a + 8] === c) && yu(i, a, t) ? (s = l, a = Rr(u), t = Ar(u, t)) : a = -1;
    }
} return o; }
function ip(e, t, n, r, o, i) { let s = t[_], a = s.data[e + 8], u = r == null ? Xi(a) && wi : r != s && (a.type & 3) !== 0, c = o & b.Host && i === a, l = sp(a, s, n, u, c); return l !== null ? gn(t, s, l, a) : Ie; }
function sp(e, t, n, r, o) { let i = e.providerIndexes, s = t.data, a = i & 1048575, u = e.directiveStart, c = e.directiveEnd, l = i >> 20, d = r ? a : a + l, p = o ? a + l : c; for (let f = d; f < p; f++) {
    let m = s[f];
    if (f < u && n === m || f >= u && m.type === n)
        return f;
} if (o) {
    let f = s[u];
    if (f && Dn(f) && f.type === n)
        return u;
} return null; }
function gn(e, t, n, r) { let o = e[n], i = t.data; if (Qh(o)) {
    let s = o;
    s.resolving && jf(Lf(i[n]));
    let a = vu(s.canSeeViewProviders);
    s.resolving = !0;
    let u, c = s.injectImpl ? re(s.injectImpl) : null, l = Ic(e, r, b.Default);
    try {
        o = e[n] = s.factory(void 0, i, e, r), t.firstCreatePass && n >= r.directiveStart && Yh(n, i[n], t);
    }
    finally {
        c !== null && re(c), vu(a), s.resolving = !1, Sc();
    }
} return o; }
function ap(e) { if (typeof e == "string")
    return e.charCodeAt(0) || 0; let t = e.hasOwnProperty(un) ? e[un] : void 0; return typeof t == "number" ? t >= 0 ? t & xc : up : t; }
function yu(e, t, n) { let r = 1 << e; return !!(n[t + (e >> Oc)] & r); }
function Du(e, t) { return !(e & b.Self) && !(e & b.Host && t); }
var Je = class {
    constructor(t, n) { this._tNode = t, this._lView = n; }
    get(t, n, r) { return jc(this._tNode, this._lView, t, Hr(r), n); }
};
function up() { return new Je(Pe(), ee()); }
function is(e) { return zi(() => { let t = e.prototype.constructor, n = t[Cr] || bi(t), r = Object.prototype, o = Object.getPrototypeOf(e.prototype).constructor; for (; o && o !== r;) {
    let i = o[Cr] || bi(o);
    if (i && i !== n)
        return i;
    o = Object.getPrototypeOf(o);
} return i => new i; }); }
function bi(e) { return Lu(e) ? () => { let t = bi(oe(e)); return t && t(); } : Rt(e); }
function cp(e, t, n, r, o) { let i = e, s = t; for (; i !== null && s !== null && s[I] & 2048 && !(s[I] & 512);) {
    let a = Vc(i, s, n, r | b.Self, Ie);
    if (a !== Ie)
        return a;
    let u = i.parent;
    if (!u) {
        let c = s[ic];
        if (c) {
            let l = c.get(n, Ie, r);
            if (l !== Ie)
                return l;
        }
        u = Bc(s), s = s[yn];
    }
    i = u;
} return o; }
function Bc(e) { let t = e[_], n = t.type; return n === 2 ? t.declTNode : n === 1 ? e[me] : null; }
function Eu(e, t = null, n = null, r) { let o = Hc(e, t, n, r); return o.resolveInjectorInitializers(), o; }
function Hc(e, t = null, n = null, r, o = new Set) { let i = [n || At, dh(e)]; return r = r || (typeof e == "object" ? void 0 : X(e)), new dn(i, t || Ji(), r || null, o); }
var ot = class e {
    static { this.THROW_IF_NOT_FOUND = cn; }
    static { this.NULL = new Sr; }
    static create(t, n) { if (Array.isArray(t))
        return Eu({ name: "" }, n, t, ""); {
        let r = t.name ?? "";
        return Eu({ name: r }, t.parent, t.providers, r);
    } }
    static { this.\u0275prov = D({ token: e, providedIn: "any", factory: () => M(Wu) }); }
    static { this.__NG_ELEMENT_ID__ = -1; }
};
var lp = new w("");
lp.__NG_ELEMENT_ID__ = e => { let t = Pe(); if (t === null)
    throw new v(204, !1); if (t.type & 2)
    return t.value; if (e & b.Optional)
    return null; throw new v(204, !1); };
var dp = "ngOriginalError";
function ui(e) { return e[dp]; }
var Uc = !0, $c = (() => { class e {
    static { this.__NG_ELEMENT_ID__ = fp; }
    static { this.__NG_ENV_ID__ = n => n; }
} return e; })(), Si = class extends $c {
    constructor(t) { super(), this._lView = t; }
    onDestroy(t) { return pc(this._lView, t), () => Oh(this._lView, t); }
};
function fp() { return new Si(ee()); }
var Bt = (() => { class e {
    constructor() { this.taskId = 0, this.pendingTasks = new Set, this.hasPendingTasks = new G(!1); }
    get _hasPendingTasks() { return this.hasPendingTasks.value; }
    add() { this._hasPendingTasks || this.hasPendingTasks.next(!0); let n = this.taskId++; return this.pendingTasks.add(n), n; }
    remove(n) { this.pendingTasks.delete(n), this.pendingTasks.size === 0 && this._hasPendingTasks && this.hasPendingTasks.next(!1); }
    ngOnDestroy() { this.pendingTasks.clear(), this._hasPendingTasks && this.hasPendingTasks.next(!1); }
    static { this.\u0275prov = D({ token: e, providedIn: "root", factory: () => new e }); }
} return e; })();
var _i = class extends q {
    constructor(t = !1) { super(), this.destroyRef = void 0, this.pendingTasks = void 0, this.__isAsync = t, Ch() && (this.destroyRef = h($c, { optional: !0 }) ?? void 0, this.pendingTasks = h(Bt, { optional: !0 }) ?? void 0); }
    emit(t) { let n = P(null); try {
        super.next(t);
    }
    finally {
        P(n);
    } }
    subscribe(t, n, r) { let o = t, i = n || (() => null), s = r; if (t && typeof t == "object") {
        let u = t;
        o = u.next?.bind(u), i = u.error?.bind(u), s = u.complete?.bind(u);
    } this.__isAsync && (i = this.wrapInTimeout(i), o && (o = this.wrapInTimeout(o)), s && (s = this.wrapInTimeout(s))); let a = super.subscribe({ next: o, error: i, complete: s }); return t instanceof j && t.add(a), a; }
    wrapInTimeout(t) { return n => { let r = this.pendingTasks?.add(); setTimeout(() => { t(n), r !== void 0 && this.pendingTasks?.remove(r); }); }; }
}, Z = _i;
function xr(...e) { }
function Gc(e) { let t, n; function r() { e = xr; try {
    n !== void 0 && typeof cancelAnimationFrame == "function" && cancelAnimationFrame(n), t !== void 0 && clearTimeout(t);
}
catch { } } return t = setTimeout(() => { e(), r(); }), typeof requestAnimationFrame == "function" && (n = requestAnimationFrame(() => { e(), r(); })), () => r(); }
function Iu(e) { return queueMicrotask(() => e()), () => { e = xr; }; }
var ss = "isAngularZone", Or = ss + "_ID", hp = 0, V = class e {
    constructor(t) { this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new Z(!1), this.onMicrotaskEmpty = new Z(!1), this.onStable = new Z(!1), this.onError = new Z(!1); let { enableLongStackTrace: n = !1, shouldCoalesceEventChangeDetection: r = !1, shouldCoalesceRunChangeDetection: o = !1, scheduleInRootZone: i = Uc } = t; if (typeof Zone > "u")
        throw new v(908, !1); Zone.assertZonePatched(); let s = this; s._nesting = 0, s._outer = s._inner = Zone.current, Zone.TaskTrackingZoneSpec && (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec)), n && Zone.longStackTraceZoneSpec && (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)), s.shouldCoalesceEventChangeDetection = !o && r, s.shouldCoalesceRunChangeDetection = o, s.callbackScheduled = !1, s.scheduleInRootZone = i, mp(s); }
    static isInAngularZone() { return typeof Zone < "u" && Zone.current.get(ss) === !0; }
    static assertInAngularZone() { if (!e.isInAngularZone())
        throw new v(909, !1); }
    static assertNotInAngularZone() { if (e.isInAngularZone())
        throw new v(909, !1); }
    run(t, n, r) { return this._inner.run(t, n, r); }
    runTask(t, n, r, o) { let i = this._inner, s = i.scheduleEventTask("NgZoneEvent: " + o, t, pp, xr, xr); try {
        return i.runTask(s, n, r);
    }
    finally {
        i.cancelTask(s);
    } }
    runGuarded(t, n, r) { return this._inner.runGuarded(t, n, r); }
    runOutsideAngular(t) { return this._outer.run(t); }
}, pp = {};
function as(e) { if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable)
    try {
        e._nesting++, e.onMicrotaskEmpty.emit(null);
    }
    finally {
        if (e._nesting--, !e.hasPendingMicrotasks)
            try {
                e.runOutsideAngular(() => e.onStable.emit(null));
            }
            finally {
                e.isStable = !0;
            }
    } }
function gp(e) { if (e.isCheckStableRunning || e.callbackScheduled)
    return; e.callbackScheduled = !0; function t() { Gc(() => { e.callbackScheduled = !1, Mi(e), e.isCheckStableRunning = !0, as(e), e.isCheckStableRunning = !1; }); } e.scheduleInRootZone ? Zone.root.run(() => { t(); }) : e._outer.run(() => { t(); }), Mi(e); }
function mp(e) { let t = () => { gp(e); }, n = hp++; e._inner = e._inner.fork({ name: "angular", properties: { [ss]: !0, [Or]: n, [Or + n]: !0 }, onInvokeTask: (r, o, i, s, a, u) => { if (vp(u))
        return r.invokeTask(i, s, a, u); try {
        return Cu(e), r.invokeTask(i, s, a, u);
    }
    finally {
        (e.shouldCoalesceEventChangeDetection && s.type === "eventTask" || e.shouldCoalesceRunChangeDetection) && t(), wu(e);
    } }, onInvoke: (r, o, i, s, a, u, c) => { try {
        return Cu(e), r.invoke(i, s, a, u, c);
    }
    finally {
        e.shouldCoalesceRunChangeDetection && !e.callbackScheduled && !yp(u) && t(), wu(e);
    } }, onHasTask: (r, o, i, s) => { r.hasTask(i, s), o === i && (s.change == "microTask" ? (e._hasPendingMicrotasks = s.microTask, Mi(e), as(e)) : s.change == "macroTask" && (e.hasPendingMacrotasks = s.macroTask)); }, onHandleError: (r, o, i, s) => (r.handleError(i, s), e.runOutsideAngular(() => e.onError.emit(s)), !1) }); }
function Mi(e) { e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && e.callbackScheduled === !0 ? e.hasPendingMicrotasks = !0 : e.hasPendingMicrotasks = !1; }
function Cu(e) { e._nesting++, e.isStable && (e.isStable = !1, e.onUnstable.emit(null)); }
function wu(e) { e._nesting--, as(e); }
var Ti = class {
    constructor() { this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new Z, this.onMicrotaskEmpty = new Z, this.onStable = new Z, this.onError = new Z; }
    run(t, n, r) { return t.apply(n, r); }
    runGuarded(t, n, r) { return t.apply(n, r); }
    runOutsideAngular(t) { return t(); }
    runTask(t, n, r, o) { return t.apply(n, r); }
};
function vp(e) { return zc(e, "__ignore_ng_zone__"); }
function yp(e) { return zc(e, "__scheduler_tick__"); }
function zc(e, t) { return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[t] === !0; }
var Ne = class {
    constructor() { this._console = console; }
    handleError(t) { let n = this._findOriginalError(t); this._console.error("ERROR", t), n && this._console.error("ORIGINAL ERROR", n); }
    _findOriginalError(t) { let n = t && ui(t); for (; n && ui(n);)
        n = ui(n); return n || null; }
}, Dp = new w("", { providedIn: "root", factory: () => { let e = h(V), t = h(Ne); return n => e.runOutsideAngular(() => t.handleError(n)); } });
function Ep() { return us(Pe(), ee()); }
function us(e, t) { return new Qr(Oe(e, t)); }
var Qr = (() => { class e {
    constructor(n) { this.nativeElement = n; }
    static { this.__NG_ELEMENT_ID__ = Ep; }
} return e; })();
function Wc(e) { return (e.flags & 128) === 128; }
var qc = new Map, Ip = 0;
function Cp() { return Ip++; }
function wp(e) { qc.set(e[zr], e); }
function Ni(e) { qc.delete(e[zr]); }
var bu = "__ngContext__";
function Pt(e, t) { Qe(t) ? (e[bu] = t[zr], wp(t)) : e[bu] = t; }
function Zc(e) { return Kc(e[fn]); }
function Yc(e) { return Kc(e[pe]); }
function Kc(e) { for (; e !== null && !xe(e);)
    e = e[pe]; return e; }
var Ri;
function Qc(e) { Ri = e; }
function bp() { if (Ri !== void 0)
    return Ri; if (typeof document < "u")
    return document; throw new v(210, !1); }
var cs = new w("", { providedIn: "root", factory: () => Sp }), Sp = "ng", ls = new w(""), Ht = new w("", { providedIn: "platform", factory: () => "unknown" });
var ds = new w("", { providedIn: "root", factory: () => bp().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") || null });
var _p = "h", Mp = "b";
var Tp = () => null;
function fs(e, t, n = !1) { return Tp(e, t, n); }
var Jc = !1, Np = new w("", { providedIn: "root", factory: () => Jc });
function Xc(e) { return e instanceof Function ? e() : e; }
var it = function (e) { return e[e.Important = 1] = "Important", e[e.DashCase = 2] = "DashCase", e; }(it || {}), Rp;
function hs(e, t) { return Rp(e, t); }
function Mt(e, t, n, r, o) { if (r != null) {
    let i, s = !1;
    xe(r) ? i = r : Qe(r) && (s = !0, r = r[Ae]);
    let a = Te(r);
    e === 0 && n !== null ? o == null ? ol(t, n, a) : Pr(t, n, a, o || null, !0) : e === 1 && n !== null ? Pr(t, n, a, o || null, !0) : e === 2 ? zp(t, a, s) : e === 3 && t.destroyNode(a), i != null && qp(t, e, i, n, o);
} }
function Ap(e, t) { return e.createText(t); }
function xp(e, t, n) { e.setValue(t, n); }
function el(e, t, n) { return e.createElement(t, n); }
function Op(e, t) { tl(e, t), t[Ae] = null, t[me] = null; }
function Pp(e, t, n, r, o, i) { r[Ae] = o, r[me] = t, Jr(e, r, n, 1, o, i); }
function tl(e, t) { t[Me].changeDetectionScheduler?.notify(9), Jr(e, t, t[ge], 2, null, null); }
function Fp(e) { let t = e[fn]; if (!t)
    return ci(e[_], e); for (; t;) {
    let n = null;
    if (Qe(t))
        n = t[fn];
    else {
        let r = t[se];
        r && (n = r);
    }
    if (!n) {
        for (; t && !t[pe] && t !== e;)
            Qe(t) && ci(t[_], t), t = t[Y];
        t === null && (t = e), Qe(t) && ci(t[_], t), n = t && t[pe];
    }
    t = n;
} }
function kp(e, t, n, r) { let o = se + r, i = n.length; r > 0 && (n[o - 1][pe] = t), r < i - se ? (t[pe] = n[o], zu(n, se + r, t)) : (n.push(t), t[pe] = null), t[Y] = n; let s = t[hn]; s !== null && n !== s && nl(s, t); let a = t[Gr]; a !== null && a.insertView(e), Ei(t), t[I] |= 128; }
function nl(e, t) { let n = e[Tr], r = t[Y]; if (Qe(r))
    e[I] |= Nr.HasTransplantedViews;
else {
    let o = r[Y][we];
    t[we] !== o && (e[I] |= Nr.HasTransplantedViews);
} n === null ? e[Tr] = [t] : n.push(t); }
function ps(e, t) { let n = e[Tr], r = n.indexOf(t); n.splice(r, 1); }
function Ai(e, t) { if (e.length <= se)
    return; let n = se + t, r = e[n]; if (r) {
    let o = r[hn];
    o !== null && o !== e && ps(o, r), t > 0 && (e[n - 1][pe] = r[pe]);
    let i = br(e, se + t);
    Op(r[_], r);
    let s = i[Gr];
    s !== null && s.detachView(i[_]), r[Y] = null, r[pe] = null, r[I] &= -129;
} return r; }
function rl(e, t) { if (!(t[I] & 256)) {
    let n = t[ge];
    n.destroyNode && Jr(e, t, n, 3, null, null), Fp(t);
} }
function ci(e, t) { if (t[I] & 256)
    return; let n = P(null); try {
    t[I] &= -129, t[I] |= 256, t[ie] && Lo(t[ie]), jp(e, t), Lp(e, t), t[_].type === 1 && t[ge].destroy();
    let r = t[hn];
    if (r !== null && xe(t[Y])) {
        r !== t[Y] && ps(r, t);
        let o = t[Gr];
        o !== null && o.detachView(e);
    }
    Ni(t);
}
finally {
    P(n);
} }
function Lp(e, t) { let n = e.cleanup, r = t[du]; if (n !== null)
    for (let i = 0; i < n.length - 1; i += 2)
        if (typeof n[i] == "string") {
            let s = n[i + 3];
            s >= 0 ? r[s]() : r[-s].unsubscribe(), i += 2;
        }
        else {
            let s = r[n[i + 1]];
            n[i].call(s);
        } r !== null && (t[du] = null); let o = t[Ue]; if (o !== null) {
    t[Ue] = null;
    for (let i = 0; i < o.length; i++) {
        let s = o[i];
        s();
    }
} }
function jp(e, t) { let n; if (e != null && (n = e.destroyHooks) != null)
    for (let r = 0; r < n.length; r += 2) {
        let o = t[n[r]];
        if (!(o instanceof pn)) {
            let i = n[r + 1];
            if (Array.isArray(i))
                for (let s = 0; s < i.length; s += 2) {
                    let a = o[i[s]], u = i[s + 1];
                    He(4, a, u);
                    try {
                        u.call(a);
                    }
                    finally {
                        He(5, a, u);
                    }
                }
            else {
                He(4, o, i);
                try {
                    i.call(o);
                }
                finally {
                    He(5, o, i);
                }
            }
        }
    } }
function Vp(e, t, n) { return Bp(e, t.parent, n); }
function Bp(e, t, n) { let r = t; for (; r !== null && r.type & 168;)
    t = r, r = t.parent; if (r === null)
    return n[Ae]; {
    let { componentOffset: o } = r;
    if (o > -1) {
        let { encapsulation: i } = e.data[r.directiveStart + o];
        if (i === Ce.None || i === Ce.Emulated)
            return null;
    }
    return Oe(r, n);
} }
function Pr(e, t, n, r, o) { e.insertBefore(t, n, r, o); }
function ol(e, t, n) { e.appendChild(t, n); }
function Su(e, t, n, r, o) { r !== null ? Pr(e, t, n, r, o) : ol(e, t, n); }
function il(e, t) { return e.parentNode(t); }
function Hp(e, t) { return e.nextSibling(t); }
function Up(e, t, n) { return Gp(e, t, n); }
function $p(e, t, n) { return e.type & 40 ? Oe(e, n) : null; }
var Gp = $p, _u;
function sl(e, t, n, r) { let o = Vp(e, r, t), i = t[ge], s = r.parent || t[me], a = Up(s, r, t); if (o != null)
    if (Array.isArray(n))
        for (let u = 0; u < n.length; u++)
            Su(i, o, n[u], a, !1);
    else
        Su(i, o, n, a, !1); _u !== void 0 && _u(i, r, t, n, o); }
function sn(e, t) { if (t !== null) {
    let n = t.type;
    if (n & 3)
        return Oe(t, e);
    if (n & 4)
        return xi(-1, e[t.index]);
    if (n & 8) {
        let r = t.child;
        if (r !== null)
            return sn(e, r);
        {
            let o = e[t.index];
            return xe(o) ? xi(-1, o) : Te(o);
        }
    }
    else {
        if (n & 128)
            return sn(e, t.next);
        if (n & 32)
            return hs(t, e)() || Te(e[t.index]);
        {
            let r = al(e, t);
            if (r !== null) {
                if (Array.isArray(r))
                    return r[0];
                let o = nt(e[we]);
                return sn(o, r);
            }
            else
                return sn(e, t.next);
        }
    }
} return null; }
function al(e, t) { if (t !== null) {
    let r = e[we][me], o = t.projection;
    return r.projection[o];
} return null; }
function xi(e, t) { let n = se + e + 1; if (n < t.length) {
    let r = t[n], o = r[_].firstChild;
    if (o !== null)
        return sn(r, o);
} return t[tt]; }
function zp(e, t, n) { e.removeChild(null, t, n); }
function gs(e, t, n, r, o, i, s) { for (; n != null;) {
    if (n.type === 128) {
        n = n.next;
        continue;
    }
    let a = r[n.index], u = n.type;
    if (s && t === 0 && (a && Pt(Te(a), r), n.flags |= 2), (n.flags & 32) !== 32)
        if (u & 8)
            gs(e, t, n.child, r, o, i, !1), Mt(t, e, o, a, i);
        else if (u & 32) {
            let c = hs(n, r), l;
            for (; l = c();)
                Mt(t, e, o, l, i);
            Mt(t, e, o, a, i);
        }
        else
            u & 16 ? Wp(e, t, r, n, o, i) : Mt(t, e, o, a, i);
    n = s ? n.projectionNext : n.next;
} }
function Jr(e, t, n, r, o, i) { gs(n, r, e.firstChild, t, o, i, !1); }
function Wp(e, t, n, r, o, i) { let s = n[we], u = s[me].projection[r.projection]; if (Array.isArray(u))
    for (let c = 0; c < u.length; c++) {
        let l = u[c];
        Mt(t, e, o, l, i);
    }
else {
    let c = u, l = s[Y];
    Wc(r) && (c.flags |= 128), gs(e, t, c, l, o, i, !0);
} }
function qp(e, t, n, r, o) { let i = n[tt], s = Te(n); i !== s && Mt(t, e, r, i, o); for (let a = se; a < n.length; a++) {
    let u = n[a];
    Jr(u[_], u, e, t, r, i);
} }
function Zp(e, t, n) { e.setAttribute(t, "style", n); }
function ul(e, t, n) { n === "" ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n); }
function cl(e, t, n) { let { mergedAttrs: r, classes: o, styles: i } = n; r !== null && hi(e, t, r), o !== null && ul(e, t, o), i !== null && Zp(e, t, i); }
var Xr = {};
function ms(e = 1) { ll(Yr(), ee(), rs() + e, !1); }
function ll(e, t, n, r) { if (!r)
    if ((t[I] & 3) === 3) {
        let i = e.preOrderCheckHooks;
        i !== null && yr(t, i, n);
    }
    else {
        let i = e.preOrderHooks;
        i !== null && Dr(t, i, 0, n);
    } rt(n); }
function vs(e, t = b.Default) { let n = ee(); if (n === null)
    return M(e, t); let r = Pe(); return jc(r, n, oe(e), t); }
function dl(e, t, n, r, o, i) { let s = P(null); try {
    let a = null;
    o & $e.SignalBased && (a = t[r][wa]), a !== null && a.transformFn !== void 0 && (i = a.transformFn(i)), o & $e.HasDecoratorInputTransform && (i = e.inputTransforms[r].call(t, i)), e.setInput !== null ? e.setInput(t, a, i, n, r) : uc(t, a, r, i);
}
finally {
    P(s);
} }
function Yp(e, t) { let n = e.hostBindingOpCodes; if (n !== null)
    try {
        for (let r = 0; r < n.length; r++) {
            let o = n[r];
            if (o < 0)
                rt(~o);
            else {
                let i = o, s = n[++r], a = n[++r];
                zh(s, i);
                let u = t[i];
                a(2, u);
            }
        }
    }
    finally {
        rt(-1);
    } }
function ys(e, t, n, r, o, i, s, a, u, c, l) { let d = t.blueprint.slice(); return d[Ae] = o, d[I] = r | 4 | 128 | 8 | 64, (c !== null || e && e[I] & 2048) && (d[I] |= 2048), fc(d), d[Y] = d[yn] = e, d[Ge] = n, d[Me] = s || e && e[Me], d[ge] = a || e && e[ge], d[Ot] = u || e && e[Ot] || null, d[me] = i, d[zr] = Cp(), d[_r] = l, d[ic] = c, d[we] = t.type == 2 ? e[we] : d, d; }
function Ds(e, t, n, r, o) { let i = e.data[t]; if (i === null)
    i = Kp(e, t, n, r, o), Gh() && (i.flags |= 32);
else if (i.type & 64) {
    i.type = n, i.value = r, i.attrs = o;
    let s = Bh();
    i.injectorIndex = s === null ? -1 : s.injectorIndex;
} return Kr(i, !0), i; }
function Kp(e, t, n, r, o) { let i = vc(), s = yc(), a = s ? i : i && i.parent, u = e.data[t] = rg(e, a, n, t, r, o); return e.firstChild === null && (e.firstChild = u), i !== null && (s ? i.child == null && u.parent !== null && (i.child = u) : i.next === null && (i.next = u, u.prev = i)), u; }
function fl(e, t, n, r) { if (n === 0)
    return -1; let o = t.length; for (let i = 0; i < n; i++)
    t.push(r), e.blueprint.push(r), e.data.push(null); return o; }
function hl(e, t, n, r, o) { let i = rs(), s = r & 2; try {
    rt(-1), s && t.length > et && ll(e, t, et, !1), He(s ? 2 : 0, o), n(r, o);
}
finally {
    rt(i), He(s ? 3 : 1, o);
} }
function pl(e, t, n) { if (ac(t)) {
    let r = P(null);
    try {
        let o = t.directiveStart, i = t.directiveEnd;
        for (let s = o; s < i; s++) {
            let a = e.data[s];
            if (a.contentQueries) {
                let u = n[s];
                a.contentQueries(1, u, s);
            }
        }
    }
    finally {
        P(r);
    }
} }
function Qp(e, t, n) { mc() && (ug(e, t, n, Oe(n, t)), (n.flags & 64) === 64 && yl(e, t, n)); }
function Jp(e, t, n = Oe) { let r = t.localNames; if (r !== null) {
    let o = t.index + 1;
    for (let i = 0; i < r.length; i += 2) {
        let s = r[i + 1], a = s === -1 ? n(t, e) : e[s];
        e[o++] = a;
    }
} }
function gl(e) { let t = e.tView; return t === null || t.incompleteFirstPass ? e.tView = ml(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts, e.id) : t; }
function ml(e, t, n, r, o, i, s, a, u, c, l) { let d = et + r, p = d + o, f = Xp(d, p), m = typeof c == "function" ? c() : c; return f[_] = { type: e, blueprint: f, template: n, queries: null, viewQuery: a, declTNode: t, data: f.slice().fill(null, d), bindingStartIndex: d, expandoStartIndex: p, hostBindingOpCodes: null, firstCreatePass: !0, firstUpdatePass: !0, staticViewQueries: !1, staticContentQueries: !1, preOrderHooks: null, preOrderCheckHooks: null, contentHooks: null, contentCheckHooks: null, viewHooks: null, viewCheckHooks: null, destroyHooks: null, cleanup: null, contentQueries: null, components: null, directiveRegistry: typeof i == "function" ? i() : i, pipeRegistry: typeof s == "function" ? s() : s, firstChild: null, schemas: u, consts: m, incompleteFirstPass: !1, ssrId: l }; }
function Xp(e, t) { let n = []; for (let r = 0; r < t; r++)
    n.push(r < e ? null : Xr); return n; }
function eg(e, t, n, r) { let i = r.get(Np, Jc) || n === Ce.ShadowDom, s = e.selectRootElement(t, i); return tg(s), s; }
function tg(e) { ng(e); }
var ng = () => null;
function rg(e, t, n, r, o, i) { let s = t ? t.injectorIndex : -1, a = 0; return Lh() && (a |= 128), { type: n, index: r, insertBeforeIndex: null, injectorIndex: s, directiveStart: -1, directiveEnd: -1, directiveStylingLast: -1, componentOffset: -1, propertyBindings: null, flags: a, providerIndexes: 0, value: o, attrs: i, mergedAttrs: null, localNames: null, initialInputs: void 0, inputs: null, outputs: null, tView: null, next: null, prev: null, projectionNext: null, child: null, parent: t, projection: null, styles: null, stylesWithoutHost: null, residualStyles: void 0, classes: null, classesWithoutHost: null, residualClasses: void 0, classBindings: 0, styleBindings: 0 }; }
function Mu(e, t, n, r, o) { for (let i in t) {
    if (!t.hasOwnProperty(i))
        continue;
    let s = t[i];
    if (s === void 0)
        continue;
    r ??= {};
    let a, u = $e.None;
    Array.isArray(s) ? (a = s[0], u = s[1]) : a = s;
    let c = i;
    if (o !== null) {
        if (!o.hasOwnProperty(i))
            continue;
        c = o[i];
    }
    e === 0 ? Tu(r, n, c, a, u) : Tu(r, n, c, a);
} return r; }
function Tu(e, t, n, r, o) { let i; e.hasOwnProperty(n) ? (i = e[n]).push(t, r) : i = e[n] = [t, r], o !== void 0 && i.push(o); }
function og(e, t, n) { let r = t.directiveStart, o = t.directiveEnd, i = e.data, s = t.attrs, a = [], u = null, c = null; for (let l = r; l < o; l++) {
    let d = i[l], p = n ? n.get(d) : null, f = p ? p.inputs : null, m = p ? p.outputs : null;
    u = Mu(0, d.inputs, l, u, f), c = Mu(1, d.outputs, l, c, m);
    let A = u !== null && s !== null && !Yi(t) ? vg(u, l, s) : null;
    a.push(A);
} u !== null && (u.hasOwnProperty("class") && (t.flags |= 8), u.hasOwnProperty("style") && (t.flags |= 16)), t.initialInputs = a, t.inputs = u, t.outputs = c; }
function ig(e, t, n, r) { if (mc()) {
    let o = r === null ? null : { "": -1 }, i = lg(e, n), s, a;
    i === null ? s = a = null : [s, a] = i, s !== null && vl(e, t, n, s, o, a), o && dg(n, r, o);
} n.mergedAttrs = Zi(n.mergedAttrs, n.attrs); }
function vl(e, t, n, r, o, i) { for (let c = 0; c < r.length; c++)
    op(Pc(n, t), e, r[c].type); hg(n, e.data.length, r.length); for (let c = 0; c < r.length; c++) {
    let l = r[c];
    l.providersResolver && l.providersResolver(l);
} let s = !1, a = !1, u = fl(e, t, r.length, null); for (let c = 0; c < r.length; c++) {
    let l = r[c];
    n.mergedAttrs = Zi(n.mergedAttrs, l.hostAttrs), pg(e, n, t, u, l), fg(u, l, o), l.contentQueries !== null && (n.flags |= 4), (l.hostBindings !== null || l.hostAttrs !== null || l.hostVars !== 0) && (n.flags |= 64);
    let d = l.type.prototype;
    !s && (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) && ((e.preOrderHooks ??= []).push(n.index), s = !0), !a && (d.ngOnChanges || d.ngDoCheck) && ((e.preOrderCheckHooks ??= []).push(n.index), a = !0), u++;
} og(e, n, i); }
function sg(e, t, n, r, o) { let i = o.hostBindings; if (i) {
    let s = e.hostBindingOpCodes;
    s === null && (s = e.hostBindingOpCodes = []);
    let a = ~t.index;
    ag(s) != a && s.push(a), s.push(n, r, i);
} }
function ag(e) { let t = e.length; for (; t > 0;) {
    let n = e[--t];
    if (typeof n == "number" && n < 0)
        return n;
} return 0; }
function ug(e, t, n, r) { let o = n.directiveStart, i = n.directiveEnd; Xi(n) && gg(t, n, e.data[o + n.componentOffset]), e.firstCreatePass || Pc(n, t), Pt(r, t); let s = n.initialInputs; for (let a = o; a < i; a++) {
    let u = e.data[a], c = gn(t, e, a, n);
    if (Pt(c, t), s !== null && mg(t, a - o, c, u, n, s), Dn(u)) {
        let l = En(n.index, t);
        l[Ge] = gn(t, e, a, n);
    }
} }
function yl(e, t, n) { let r = n.directiveStart, o = n.directiveEnd, i = n.index, s = Wh(); try {
    rt(i);
    for (let a = r; a < o; a++) {
        let u = e.data[a], c = t[a];
        Ii(a), (u.hostBindings !== null || u.hostVars !== 0 || u.hostAttrs !== null) && cg(u, c);
    }
}
finally {
    rt(-1), Ii(s);
} }
function cg(e, t) { e.hostBindings !== null && e.hostBindings(1, t); }
function lg(e, t) { let n = e.directiveRegistry, r = null, o = null; if (n)
    for (let i = 0; i < n.length; i++) {
        let s = n[i];
        if (nh(t, s.selectors, !1))
            if (r || (r = []), Dn(s))
                if (s.findHostDirectiveDefs !== null) {
                    let a = [];
                    o = o || new Map, s.findHostDirectiveDefs(s, a, o), r.unshift(...a, s);
                    let u = a.length;
                    Oi(e, t, u);
                }
                else
                    r.unshift(s), Oi(e, t, 0);
            else
                o = o || new Map, s.findHostDirectiveDefs?.(s, r, o), r.push(s);
    } return r === null ? null : [r, o]; }
function Oi(e, t, n) { t.componentOffset = n, (e.components ??= []).push(t.index); }
function dg(e, t, n) { if (t) {
    let r = e.localNames = [];
    for (let o = 0; o < t.length; o += 2) {
        let i = n[t[o + 1]];
        if (i == null)
            throw new v(-301, !1);
        r.push(t[o], i);
    }
} }
function fg(e, t, n) { if (n) {
    if (t.exportAs)
        for (let r = 0; r < t.exportAs.length; r++)
            n[t.exportAs[r]] = e;
    Dn(t) && (n[""] = e);
} }
function hg(e, t, n) { e.flags |= 1, e.directiveStart = t, e.directiveEnd = t + n, e.providerIndexes = t; }
function pg(e, t, n, r, o) { e.data[r] = o; let i = o.factory || (o.factory = Rt(o.type, !0)), s = new pn(i, Dn(o), vs); e.blueprint[r] = s, n[r] = s, sg(e, t, r, fl(e, n, o.hostVars, Xr), o); }
function gg(e, t, n) { let r = Oe(t, e), o = gl(n), i = e[Me].rendererFactory, s = 16; n.signals ? s = 4096 : n.onPush && (s = 64); let a = Es(e, ys(e, o, null, s, r, t, null, i.createRenderer(r, n), null, null, null)); e[t.index] = a; }
function mg(e, t, n, r, o, i) { let s = i[t]; if (s !== null)
    for (let a = 0; a < s.length;) {
        let u = s[a++], c = s[a++], l = s[a++], d = s[a++];
        dl(r, n, u, c, l, d);
    } }
function vg(e, t, n) { let r = null, o = 0; for (; o < n.length;) {
    let i = n[o];
    if (i === 0) {
        o += 4;
        continue;
    }
    else if (i === 5) {
        o += 2;
        continue;
    }
    if (typeof i == "number")
        break;
    if (e.hasOwnProperty(i)) {
        r === null && (r = []);
        let s = e[i];
        for (let a = 0; a < s.length; a += 3)
            if (s[a] === t) {
                r.push(i, s[a + 1], s[a + 2], n[o + 1]);
                break;
            }
    }
    o += 2;
} return r; }
function yg(e, t, n, r) { return [e, !0, 0, t, null, r, null, n, null, null]; }
function Dl(e, t) { let n = e.contentQueries; if (n !== null) {
    let r = P(null);
    try {
        for (let o = 0; o < n.length; o += 2) {
            let i = n[o], s = n[o + 1];
            if (s !== -1) {
                let a = e.data[s];
                Ec(i), a.contentQueries(2, t[s], s);
            }
        }
    }
    finally {
        P(r);
    }
} }
function Es(e, t) { return e[fn] ? e[fu][pe] = t : e[fn] = t, e[fu] = t, t; }
function Pi(e, t, n) { Ec(0); let r = P(null); try {
    t(e, n);
}
finally {
    P(r);
} }
function Dg(e, t) { let n = e[Ot], r = n ? n.get(Ne, null) : null; r && r.handleError(t); }
function El(e, t, n, r, o) { for (let i = 0; i < n.length;) {
    let s = n[i++], a = n[i++], u = n[i++], c = t[s], l = e.data[s];
    dl(l, c, r, a, u, o);
} }
function Eg(e, t, n) { let r = Rh(t, e); xp(e[ge], r, n); }
function Ig(e, t) { let n = En(t, e), r = n[_]; Cg(r, n); let o = n[Ae]; o !== null && n[_r] === null && (n[_r] = fs(o, n[Ot])), Il(r, n, n[Ge]); }
function Cg(e, t) { for (let n = t.length; n < e.blueprint.length; n++)
    t.push(e.blueprint[n]); }
function Il(e, t, n) { ts(t); try {
    let r = e.viewQuery;
    r !== null && Pi(1, r, n);
    let o = e.template;
    o !== null && hl(e, t, o, 1, n), e.firstCreatePass && (e.firstCreatePass = !1), t[Gr]?.finishViewCreation(e), e.staticContentQueries && Dl(e, t), e.staticViewQueries && Pi(2, e.viewQuery, n);
    let i = e.components;
    i !== null && wg(t, i);
}
catch (r) {
    throw e.firstCreatePass && (e.incompleteFirstPass = !0, e.firstCreatePass = !1), r;
}
finally {
    t[I] &= -5, ns();
} }
function wg(e, t) { for (let n = 0; n < t.length; n++)
    Ig(e, t[n]); }
function Nu(e, t) { return !t || t.firstChild === null || Wc(e); }
function bg(e, t, n, r = !0) { let o = t[_]; if (kp(o, t, e, n), r) {
    let s = xi(n, e), a = t[ge], u = il(a, e[tt]);
    u !== null && Pp(o, e[me], a, t, u, s);
} let i = t[_r]; i !== null && i.firstChild !== null && (i.firstChild = null); }
function Fr(e, t, n, r, o = !1) { for (; n !== null;) {
    if (n.type === 128) {
        n = o ? n.projectionNext : n.next;
        continue;
    }
    let i = t[n.index];
    i !== null && r.push(Te(i)), xe(i) && Sg(i, r);
    let s = n.type;
    if (s & 8)
        Fr(e, t, n.child, r);
    else if (s & 32) {
        let a = hs(n, t), u;
        for (; u = a();)
            r.push(u);
    }
    else if (s & 16) {
        let a = al(t, n);
        if (Array.isArray(a))
            r.push(...a);
        else {
            let u = nt(t[we]);
            Fr(u[_], u, a, r, !0);
        }
    }
    n = o ? n.projectionNext : n.next;
} return r; }
function Sg(e, t) { for (let n = se; n < e.length; n++) {
    let r = e[n], o = r[_].firstChild;
    o !== null && Fr(r[_], r, o, t);
} e[tt] !== e[Ae] && t.push(e[tt]); }
var Cl = [];
function _g(e) { return e[ie] ?? Mg(e); }
function Mg(e) { let t = Cl.pop() ?? Object.create(Ng); return t.lView = e, t; }
function Tg(e) { e.lView[ie] !== e && (e.lView = null, Cl.push(e)); }
var Ng = k(g({}, Po), { consumerIsAlwaysLive: !0, consumerMarkedDirty: e => { Zr(e.lView); }, consumerOnSignalRead() { this.lView[ie] = this; } });
function Rg(e) { let t = e[ie] ?? Object.create(Ag); return t.lView = e, t; }
var Ag = k(g({}, Po), { consumerIsAlwaysLive: !0, consumerMarkedDirty: e => { let t = nt(e.lView); for (; t && !wl(t[_]);)
        t = nt(t); t && hc(t); }, consumerOnSignalRead() { this.lView[ie] = this; } });
function wl(e) { return e.type !== 2; }
var xg = 100;
function bl(e, t = !0, n = 0) { let r = e[Me], o = r.rendererFactory, i = !1; i || o.begin?.(); try {
    Og(e, n);
}
catch (s) {
    throw t && Dg(e, s), s;
}
finally {
    i || (o.end?.(), r.inlineEffectRunner?.flush());
} }
function Og(e, t) { let n = Dc(); try {
    gu(!0), Fi(e, t);
    let r = 0;
    for (; qr(e);) {
        if (r === xg)
            throw new v(103, !1);
        r++, Fi(e, 1);
    }
}
finally {
    gu(n);
} }
function Pg(e, t, n, r) { let o = t[I]; if ((o & 256) === 256)
    return; let i = !1, s = !1; !i && t[Me].inlineEffectRunner?.flush(), ts(t); let a = !0, u = null, c = null; i || (wl(e) ? (c = _g(t), u = Fo(c)) : ba() === null ? (a = !1, c = Rg(t), u = Fo(c)) : t[ie] && (Lo(t[ie]), t[ie] = null)); try {
    fc(t), Uh(e.bindingStartIndex), n !== null && hl(e, t, n, 2, r);
    let l = (o & 3) === 3;
    if (!i)
        if (l) {
            let f = e.preOrderCheckHooks;
            f !== null && yr(t, f, null);
        }
        else {
            let f = e.preOrderHooks;
            f !== null && Dr(t, f, 0, null), ii(t, 0);
        }
    if (s || Fg(t), Sl(t, 0), e.contentQueries !== null && Dl(e, t), !i)
        if (l) {
            let f = e.contentCheckHooks;
            f !== null && yr(t, f);
        }
        else {
            let f = e.contentHooks;
            f !== null && Dr(t, f, 1), ii(t, 1);
        }
    Yp(e, t);
    let d = e.components;
    d !== null && Ml(t, d, 0);
    let p = e.viewQuery;
    if (p !== null && Pi(2, p, r), !i)
        if (l) {
            let f = e.viewCheckHooks;
            f !== null && yr(t, f);
        }
        else {
            let f = e.viewHooks;
            f !== null && Dr(t, f, 2), ii(t, 2);
        }
    if (e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[oi]) {
        for (let f of t[oi])
            f();
        t[oi] = null;
    }
    i || (t[I] &= -73);
}
catch (l) {
    throw i || Zr(t), l;
}
finally {
    c !== null && (Sa(c, u), a && Tg(c)), ns();
} }
function Sl(e, t) { for (let n = Zc(e); n !== null; n = Yc(n))
    for (let r = se; r < n.length; r++) {
        let o = n[r];
        _l(o, t);
    } }
function Fg(e) { for (let t = Zc(e); t !== null; t = Yc(t)) {
    if (!(t[I] & Nr.HasTransplantedViews))
        continue;
    let n = t[Tr];
    for (let r = 0; r < n.length; r++) {
        let o = n[r];
        hc(o);
    }
} }
function kg(e, t, n) { let r = En(t, e); _l(r, n); }
function _l(e, t) { es(e) && Fi(e, t); }
function Fi(e, t) { let r = e[_], o = e[I], i = e[ie], s = !!(t === 0 && o & 16); if (s ||= !!(o & 64 && t === 0), s ||= !!(o & 1024), s ||= !!(i?.dirty && ko(i)), s ||= !1, i && (i.dirty = !1), e[I] &= -9217, s)
    Pg(r, e, r.template, e[Ge]);
else if (o & 8192) {
    Sl(e, 1);
    let a = r.components;
    a !== null && Ml(e, a, 1);
} }
function Ml(e, t, n) { for (let r = 0; r < t.length; r++)
    kg(e, t[r], n); }
function Tl(e, t) { let n = Dc() ? 64 : 1088; for (e[Me].changeDetectionScheduler?.notify(t); e;) {
    e[I] |= n;
    let r = nt(e);
    if (yi(e) && !r)
        return e;
    e = r;
} return null; }
var Ft = class {
    get rootNodes() { let t = this._lView, n = t[_]; return Fr(n, t, n.firstChild, []); }
    constructor(t, n, r = !0) { this._lView = t, this._cdRefInjectingView = n, this.notifyErrorHandler = r, this._appRef = null, this._attachedToViewContainer = !1; }
    get context() { return this._lView[Ge]; }
    set context(t) { this._lView[Ge] = t; }
    get destroyed() { return (this._lView[I] & 256) === 256; }
    destroy() { if (this._appRef)
        this._appRef.detachView(this);
    else if (this._attachedToViewContainer) {
        let t = this._lView[Y];
        if (xe(t)) {
            let n = t[Mr], r = n ? n.indexOf(this) : -1;
            r > -1 && (Ai(t, r), br(n, r));
        }
        this._attachedToViewContainer = !1;
    } rl(this._lView[_], this._lView); }
    onDestroy(t) { pc(this._lView, t); }
    markForCheck() { Tl(this._cdRefInjectingView || this._lView, 4); }
    detach() { this._lView[I] &= -129; }
    reattach() { Ei(this._lView), this._lView[I] |= 128; }
    detectChanges() { this._lView[I] |= 1024, bl(this._lView, this.notifyErrorHandler); }
    checkNoChanges() { }
    attachToViewContainerRef() { if (this._appRef)
        throw new v(902, !1); this._attachedToViewContainer = !0; }
    detachFromAppRef() { this._appRef = null; let t = yi(this._lView), n = this._lView[hn]; n !== null && !t && ps(n, this._lView), tl(this._lView[_], this._lView); }
    attachToAppRef(t) { if (this._attachedToViewContainer)
        throw new v(902, !1); this._appRef = t; let n = yi(this._lView), r = this._lView[hn]; r !== null && !n && nl(r, this._lView), Ei(this._lView); }
};
var Yb = new RegExp(`^(\\d+)*(${Mp}|${_p})*(.*)`);
var Lg = () => null;
function Ru(e, t) { return Lg(e, t); }
var kt = class {
}, eo = new w("", { providedIn: "root", factory: () => !1 });
var Nl = new w(""), Rl = new w(""), ki = class {
}, kr = class {
};
function jg(e) { let t = Error(`No component factory found for ${X(e)}.`); return t[Vg] = e, t; }
var Vg = "ngComponent";
var Li = class {
    resolveComponentFactory(t) { throw jg(t); }
}, Lt = class {
    static { this.NULL = new Li; }
}, jt = class {
};
var Bg = (() => { class e {
    static { this.\u0275prov = D({ token: e, providedIn: "root", factory: () => null }); }
} return e; })();
function ji(e, t, n) { let r = n ? e.styles : null, o = n ? e.classes : null, i = 0; if (t !== null)
    for (let s = 0; s < t.length; s++) {
        let a = t[s];
        if (typeof a == "number")
            i = a;
        else if (i == 1)
            o = tu(o, a);
        else if (i == 2) {
            let u = a, c = t[++s];
            r = tu(r, u + ": " + c + ";");
        }
    } n ? e.styles = r : e.stylesWithoutHost = r, n ? e.classes = o : e.classesWithoutHost = o; }
var Lr = class extends Lt {
    constructor(t) { super(), this.ngModule = t; }
    resolveComponentFactory(t) { let n = Xe(t); return new mn(n, this.ngModule); }
};
function Au(e, t) { let n = []; for (let r in e) {
    if (!e.hasOwnProperty(r))
        continue;
    let o = e[r];
    if (o === void 0)
        continue;
    let i = Array.isArray(o), s = i ? o[0] : o, a = i ? o[1] : $e.None;
    t ? n.push({ propName: s, templateName: r, isSignal: (a & $e.SignalBased) !== 0 }) : n.push({ propName: s, templateName: r });
} return n; }
function Hg(e) { let t = e.toLowerCase(); return t === "svg" ? Th : t === "math" ? Nh : null; }
var mn = class extends kr {
    get inputs() { let t = this.componentDef, n = t.inputTransforms, r = Au(t.inputs, !0); if (n !== null)
        for (let o of r)
            n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]); return r; }
    get outputs() { return Au(this.componentDef.outputs, !1); }
    constructor(t, n) { super(), this.componentDef = t, this.ngModule = n, this.componentType = t.type, this.selector = sh(t.selectors), this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [], this.isBoundToModule = !!n; }
    create(t, n, r, o) { let i = P(null); try {
        o = o || this.ngModule;
        let s = o instanceof ae ? o : o?.injector;
        s && this.componentDef.getStandaloneInjector !== null && (s = this.componentDef.getStandaloneInjector(s) || s);
        let a = s ? new Ci(t, s) : t, u = a.get(jt, null);
        if (u === null)
            throw new v(407, !1);
        let c = a.get(Bg, null), l = a.get(kt, null), d = { rendererFactory: u, sanitizer: c, inlineEffectRunner: null, changeDetectionScheduler: l }, p = u.createRenderer(null, this.componentDef), f = this.componentDef.selectors[0][0] || "div", m = r ? eg(p, r, this.componentDef.encapsulation, a) : el(p, f, Hg(f)), A = 512;
        this.componentDef.signals ? A |= 4096 : this.componentDef.onPush || (A |= 16);
        let B = null;
        m !== null && (B = fs(m, a, !0));
        let L = ml(0, null, null, 1, 0, null, null, null, null, null, null), ye = ys(null, L, null, A, null, null, d, p, a, null, B);
        ts(ye);
        let qe, Zn, Yn = null;
        try {
            let De = this.componentDef, ft, Ao = null;
            De.findHostDirectiveDefs ? (ft = [], Ao = new Map, De.findHostDirectiveDefs(De, ft, Ao), ft.push(De)) : ft = [De];
            let Qd = Ug(ye, m);
            Yn = $g(Qd, m, De, ft, ye, d, p), Zn = Ah(L, et), m && Wg(p, De, m, r), n !== void 0 && qg(Zn, this.ngContentSelectors, n), qe = zg(Yn, De, ft, Ao, ye, [Zg]), Il(L, ye, null);
        }
        catch (De) {
            throw Yn !== null && Ni(Yn), Ni(ye), De;
        }
        finally {
            ns();
        }
        return new Vi(this.componentType, qe, us(Zn, ye), ye, Zn);
    }
    finally {
        P(i);
    } }
}, Vi = class extends ki {
    constructor(t, n, r, o, i) { super(), this.location = r, this._rootLView = o, this._tNode = i, this.previousInputValues = null, this.instance = n, this.hostView = this.changeDetectorRef = new Ft(o, void 0, !1), this.componentType = t; }
    setInput(t, n) { let r = this._tNode.inputs, o; if (r !== null && (o = r[t])) {
        if (this.previousInputValues ??= new Map, this.previousInputValues.has(t) && Object.is(this.previousInputValues.get(t), n))
            return;
        let i = this._rootLView;
        El(i[_], i, o, t, n), this.previousInputValues.set(t, n);
        let s = En(this._tNode.index, i);
        Tl(s, 1);
    } }
    get injector() { return new Je(this._tNode, this._rootLView); }
    destroy() { this.hostView.destroy(); }
    onDestroy(t) { this.hostView.onDestroy(t); }
};
function Ug(e, t) { let n = e[_], r = et; return e[r] = t, Ds(n, r, 2, "#host", null); }
function $g(e, t, n, r, o, i, s) { let a = o[_]; Gg(r, e, t, s); let u = null; t !== null && (u = fs(t, o[Ot])); let c = i.rendererFactory.createRenderer(t, n), l = 16; n.signals ? l = 4096 : n.onPush && (l = 64); let d = ys(o, gl(n), null, l, o[e.index], e, i, c, null, null, u); return a.firstCreatePass && Oi(a, e, r.length - 1), Es(o, d), o[e.index] = d; }
function Gg(e, t, n, r) { for (let o of e)
    t.mergedAttrs = Zi(t.mergedAttrs, o.hostAttrs); t.mergedAttrs !== null && (ji(t, t.mergedAttrs, !0), n !== null && cl(r, n, t)); }
function zg(e, t, n, r, o, i) { let s = Pe(), a = o[_], u = Oe(s, o); vl(a, o, s, n, null, r); for (let l = 0; l < n.length; l++) {
    let d = s.directiveStart + l, p = gn(o, a, d, s);
    Pt(p, o);
} yl(a, o, s), u && Pt(u, o); let c = gn(o, a, s.directiveStart + s.componentOffset, s); if (e[Ge] = o[Ge] = c, i !== null)
    for (let l of i)
        l(c, t); return pl(a, s, o), c; }
function Wg(e, t, n, r) { if (r)
    hi(e, n, ["ng-version", "18.2.9"]);
else {
    let { attrs: o, classes: i } = ah(t.selectors[0]);
    o && hi(e, n, o), i && i.length > 0 && ul(e, n, i.join(" "));
} }
function qg(e, t, n) { let r = e.projection = []; for (let o = 0; o < t.length; o++) {
    let i = n[o];
    r.push(i != null ? Array.from(i) : null);
} }
function Zg() { let e = Pe(); Nc(ee()[_], e); }
var to = (() => { class e {
    static { this.__NG_ELEMENT_ID__ = Yg; }
} return e; })();
function Yg() { let e = Pe(); return Qg(e, ee()); }
var Kg = to, Al = class extends Kg {
    constructor(t, n, r) { super(), this._lContainer = t, this._hostTNode = n, this._hostLView = r; }
    get element() { return us(this._hostTNode, this._hostLView); }
    get injector() { return new Je(this._hostTNode, this._hostLView); }
    get parentInjector() { let t = os(this._hostTNode, this._hostLView); if (Ac(t)) {
        let n = Ar(t, this._hostLView), r = Rr(t), o = n[_].data[r + 8];
        return new Je(o, n);
    }
    else
        return new Je(null, this._hostLView); }
    clear() { for (; this.length > 0;)
        this.remove(this.length - 1); }
    get(t) { let n = xu(this._lContainer); return n !== null && n[t] || null; }
    get length() { return this._lContainer.length - se; }
    createEmbeddedView(t, n, r) { let o, i; typeof r == "number" ? o = r : r != null && (o = r.index, i = r.injector); let s = Ru(this._lContainer, t.ssrId), a = t.createEmbeddedViewImpl(n || {}, i, s); return this.insertImpl(a, o, Nu(this._hostTNode, s)), a; }
    createComponent(t, n, r, o, i) { let s = t && !wh(t), a; if (s)
        a = n;
    else {
        let m = n || {};
        a = m.index, r = m.injector, o = m.projectableNodes, i = m.environmentInjector || m.ngModuleRef;
    } let u = s ? t : new mn(Xe(t)), c = r || this.parentInjector; if (!i && u.ngModule == null) {
        let A = (s ? c : this.parentInjector).get(ae, null);
        A && (i = A);
    } let l = Xe(u.componentType ?? {}), d = Ru(this._lContainer, l?.id ?? null), p = d?.firstChild ?? null, f = u.create(c, o, p, i); return this.insertImpl(f.hostView, a, Nu(this._hostTNode, d)), f; }
    insert(t, n) { return this.insertImpl(t, n, !0); }
    insertImpl(t, n, r) { let o = t._lView; if (xh(o)) {
        let a = this.indexOf(t);
        if (a !== -1)
            this.detach(a);
        else {
            let u = o[Y], c = new Al(u, u[me], u[Y]);
            c.detach(c.indexOf(t));
        }
    } let i = this._adjustIndex(n), s = this._lContainer; return bg(s, o, i, r), t.attachToViewContainerRef(), zu(li(s), i, t), t; }
    move(t, n) { return this.insert(t, n); }
    indexOf(t) { let n = xu(this._lContainer); return n !== null ? n.indexOf(t) : -1; }
    remove(t) { let n = this._adjustIndex(t, -1), r = Ai(this._lContainer, n); r && (br(li(this._lContainer), n), rl(r[_], r)); }
    detach(t) { let n = this._adjustIndex(t, -1), r = Ai(this._lContainer, n); return r && br(li(this._lContainer), n) != null ? new Ft(r) : null; }
    _adjustIndex(t, n = 0) { return t ?? this.length + n; }
};
function xu(e) { return e[Mr]; }
function li(e) { return e[Mr] || (e[Mr] = []); }
function Qg(e, t) { let n, r = t[e.index]; return xe(r) ? n = r : (n = yg(r, t, null, e), t[e.index] = n, Es(t, n)), Xg(n, t, e, r), new Al(n, e, t); }
function Jg(e, t) { let n = e[ge], r = n.createComment(""), o = Oe(t, e), i = il(n, o); return Pr(n, i, r, Hp(n, o), !1), r; }
var Xg = em;
function em(e, t, n, r) { if (e[tt])
    return; let o; n.type & 8 ? o = Te(r) : o = Jg(t, n), e[tt] = o; }
var Ou = new Set;
function Is(e) { Ou.has(e) || (Ou.add(e), performance?.mark?.("mark_feature_usage", { detail: { feature: e } })); }
var ze = class {
}, vn = class {
};
var Bi = class extends ze {
    constructor(t, n, r, o = !0) { super(), this.ngModuleType = t, this._parent = n, this._bootstrapComponents = [], this.destroyCbs = [], this.componentFactoryResolver = new Lr(this); let i = Xu(t); this._bootstrapComponents = Xc(i.bootstrap), this._r3Injector = Hc(t, n, [{ provide: ze, useValue: this }, { provide: Lt, useValue: this.componentFactoryResolver }, ...r], X(t), new Set(["environment"])), o && this.resolveInjectorInitializers(); }
    resolveInjectorInitializers() { this._r3Injector.resolveInjectorInitializers(), this.instance = this._r3Injector.get(this.ngModuleType); }
    get injector() { return this._r3Injector; }
    destroy() { let t = this._r3Injector; !t.destroyed && t.destroy(), this.destroyCbs.forEach(n => n()), this.destroyCbs = null; }
    onDestroy(t) { this.destroyCbs.push(t); }
}, Hi = class extends vn {
    constructor(t) { super(), this.moduleType = t; }
    create(t) { return new Bi(this.moduleType, t, []); }
};
var jr = class extends ze {
    constructor(t) { super(), this.componentFactoryResolver = new Lr(this), this.instance = null; let n = new dn([...t.providers, { provide: ze, useValue: this }, { provide: Lt, useValue: this.componentFactoryResolver }], t.parent || Ji(), t.debugName, new Set(["environment"])); this.injector = n, t.runEnvironmentInitializers && n.resolveInjectorInitializers(); }
    destroy() { this.injector.destroy(); }
    onDestroy(t) { this.injector.onDestroy(t); }
};
function Cs(e, t, n = null) { return new jr({ providers: e, parent: t, debugName: n, runEnvironmentInitializers: !0 }).injector; }
function tm(e, t, n) { let r = e[t]; return Object.is(r, n) ? !1 : (e[t] = n, !0); }
function nm(e) { return (e.flags & 32) === 32; }
var an = function (e) { return e[e.EarlyRead = 0] = "EarlyRead", e[e.Write = 1] = "Write", e[e.MixedReadWrite = 2] = "MixedReadWrite", e[e.Read = 3] = "Read", e; }(an || {}), rm = (() => { class e {
    constructor() { this.impl = null; }
    execute() { this.impl?.execute(); }
    static { this.\u0275prov = D({ token: e, providedIn: "root", factory: () => new e }); }
} return e; })(), Pu = class e {
    constructor() { this.ngZone = h(V), this.scheduler = h(kt), this.errorHandler = h(Ne, { optional: !0 }), this.sequences = new Set, this.deferredRegistrations = new Set, this.executing = !1; }
    static { this.PHASES = [an.EarlyRead, an.Write, an.MixedReadWrite, an.Read]; }
    execute() { this.executing = !0; for (let t of e.PHASES)
        for (let n of this.sequences)
            if (!(n.erroredOrDestroyed || !n.hooks[t]))
                try {
                    n.pipelinedValue = this.ngZone.runOutsideAngular(() => n.hooks[t](n.pipelinedValue));
                }
                catch (r) {
                    n.erroredOrDestroyed = !0, this.errorHandler?.handleError(r);
                } this.executing = !1; for (let t of this.sequences)
        t.afterRun(), t.once && (this.sequences.delete(t), t.destroy()); for (let t of this.deferredRegistrations)
        this.sequences.add(t); this.deferredRegistrations.size > 0 && this.scheduler.notify(7), this.deferredRegistrations.clear(); }
    register(t) { this.executing ? this.deferredRegistrations.add(t) : (this.sequences.add(t), this.scheduler.notify(6)); }
    unregister(t) { this.executing && this.sequences.has(t) ? (t.erroredOrDestroyed = !0, t.pipelinedValue = void 0, t.once = !0) : (this.sequences.delete(t), this.deferredRegistrations.delete(t)); }
    static { this.\u0275prov = D({ token: e, providedIn: "root", factory: () => new e }); }
};
function om(e, t, n, r) { return tm(e, $h(), n) ? t + Uu(n) + r : Xr; }
function Fu(e, t, n, r, o) { let i = t.inputs, s = o ? "class" : "style"; El(e, n, i[s], s, r); }
function im(e, t, n, r, o, i) { let s = t.consts, a = pu(s, o), u = Ds(t, e, 2, r, a); return ig(t, n, u, pu(s, i)), u.attrs !== null && ji(u, u.attrs, !1), u.mergedAttrs !== null && ji(u, u.mergedAttrs, !0), t.queries !== null && t.queries.elementStart(t, u), u; }
function Ut(e, t, n, r) { let o = ee(), i = Yr(), s = et + e, a = o[ge], u = i.firstCreatePass ? im(s, i, o, t, n, r) : i.data[s], c = sm(i, o, u, a, t, e); o[s] = c; let l = bh(u); return Kr(u, !0), cl(a, c, u), !nm(u) && Mc() && sl(i, o, c, u), Ph() === 0 && Pt(c, o), Fh(), l && (Qp(i, o, u), pl(i, u, o)), r !== null && Jp(o, u), Ut; }
function $t() { let e = Pe(); yc() ? Hh() : (e = e.parent, Kr(e, !1)); let t = e; jh(t) && Vh(), kh(); let n = Yr(); return n.firstCreatePass && (Nc(n, e), ac(e) && n.queries.elementEnd(e)), t.classesWithoutHost != null && Jh(t) && Fu(n, t, ee(), t.classesWithoutHost, !0), t.stylesWithoutHost != null && Xh(t) && Fu(n, t, ee(), t.stylesWithoutHost, !1), $t; }
function In(e, t, n, r) { return Ut(e, t, n, r), $t(), In; }
var sm = (e, t, n, r, o, i) => (Tc(!0), el(r, o, Zh()));
var Vr = "en-US";
var am = Vr;
function um(e) { typeof e == "string" && (am = e.toLowerCase().replace(/_/g, "-")); }
function no(e, t = "") { let n = ee(), r = Yr(), o = e + et, i = r.firstCreatePass ? Ds(r, o, 1, t, null) : r.data[o], s = cm(r, n, i, t, e); n[o] = s, Mc() && sl(r, n, s, i), Kr(i, !1); }
var cm = (e, t, n, r, o) => (Tc(!0), Ap(t[ge], r));
function ws(e) { return ro("", e, ""), ws; }
function ro(e, t, n) { let r = ee(), o = om(r, e, t, n); return o !== Xr && Eg(r, rs(), o), ro; }
var lm = (() => { class e {
    constructor(n) { this._injector = n, this.cachedInjectors = new Map; }
    getOrCreateStandaloneInjector(n) { if (!n.standalone)
        return null; if (!this.cachedInjectors.has(n)) {
        let r = nc(!1, n.type), o = r.length > 0 ? Cs([r], this._injector, `Standalone[${n.type.name}]`) : null;
        this.cachedInjectors.set(n, o);
    } return this.cachedInjectors.get(n); }
    ngOnDestroy() { try {
        for (let n of this.cachedInjectors.values())
            n !== null && n.destroy();
    }
    finally {
        this.cachedInjectors.clear();
    } }
    static { this.\u0275prov = D({ token: e, providedIn: "environment", factory: () => new e(M(ae)) }); }
} return e; })();
function Gt(e) { Is("NgStandalone"), e.getStandaloneInjector = t => t.get(lm).getOrCreateStandaloneInjector(e); }
var oo = (() => { class e {
    log(n) { console.log(n); }
    warn(n) { console.warn(n); }
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac, providedIn: "platform" }); }
} return e; })();
var xl = new w("");
function Cn(e) { return !!e && typeof e.then == "function"; }
function Ol(e) { return !!e && typeof e.subscribe == "function"; }
var Pl = new w(""), Fl = (() => { class e {
    constructor() { this.initialized = !1, this.done = !1, this.donePromise = new Promise((n, r) => { this.resolve = n, this.reject = r; }), this.appInits = h(Pl, { optional: !0 }) ?? []; }
    runInitializers() { if (this.initialized)
        return; let n = []; for (let o of this.appInits) {
        let i = o();
        if (Cn(i))
            n.push(i);
        else if (Ol(i)) {
            let s = new Promise((a, u) => { i.subscribe({ complete: a, error: u }); });
            n.push(s);
        }
    } let r = () => { this.done = !0, this.resolve(); }; Promise.all(n).then(() => { r(); }).catch(o => { this.reject(o); }), n.length === 0 && r(), this.initialized = !0; }
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac, providedIn: "root" }); }
} return e; })(), bs = new w("");
function dm() { _a(() => { throw new v(600, !1); }); }
function fm(e) { return e.isBoundToModule; }
var hm = 10;
function pm(e, t, n) { try {
    let r = n();
    return Cn(r) ? r.catch(o => { throw t.runOutsideAngular(() => e.handleError(o)), o; }) : r;
}
catch (r) {
    throw t.runOutsideAngular(() => e.handleError(r)), r;
} }
var st = (() => { class e {
    constructor() { this._bootstrapListeners = [], this._runningTick = !1, this._destroyed = !1, this._destroyListeners = [], this._views = [], this.internalErrorHandler = h(Dp), this.afterRenderManager = h(rm), this.zonelessEnabled = h(eo), this.dirtyFlags = 0, this.deferredDirtyFlags = 0, this.externalTestViews = new Set, this.beforeRender = new q, this.afterTick = new q, this.componentTypes = [], this.components = [], this.isStable = h(Bt).hasPendingTasks.pipe(S(n => !n)), this._injector = h(ae); }
    get allViews() { return [...this.externalTestViews.keys(), ...this._views]; }
    get destroyed() { return this._destroyed; }
    whenStable() { let n; return new Promise(r => { n = this.isStable.subscribe({ next: o => { o && r(); } }); }).finally(() => { n.unsubscribe(); }); }
    get injector() { return this._injector; }
    bootstrap(n, r) { let o = n instanceof kr; if (!this._injector.get(Fl).done) {
        let p = !o && Ju(n), f = !1;
        throw new v(405, f);
    } let s; o ? s = n : s = this._injector.get(Lt).resolveComponentFactory(n), this.componentTypes.push(s.componentType); let a = fm(s) ? void 0 : this._injector.get(ze), u = r || s.selector, c = s.create(ot.NULL, [], u, a), l = c.location.nativeElement, d = c.injector.get(xl, null); return d?.registerApplication(l), c.onDestroy(() => { this.detachView(c.hostView), Er(this.components, c), d?.unregisterApplication(l); }), this._loadComponent(c), c; }
    tick() { this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick(); }
    _tick() { if (this._runningTick)
        throw new v(101, !1); let n = P(null); try {
        this._runningTick = !0, this.synchronize();
    }
    catch (r) {
        this.internalErrorHandler(r);
    }
    finally {
        this._runningTick = !1, P(n), this.afterTick.next();
    } }
    synchronize() { let n = null; this._injector.destroyed || (n = this._injector.get(jt, null, { optional: !0 })), this.dirtyFlags |= this.deferredDirtyFlags, this.deferredDirtyFlags = 0; let r = 0; for (; this.dirtyFlags !== 0 && r++ < hm;)
        this.synchronizeOnce(n); }
    synchronizeOnce(n) { if (this.dirtyFlags |= this.deferredDirtyFlags, this.deferredDirtyFlags = 0, this.dirtyFlags & 7) {
        let r = !!(this.dirtyFlags & 1);
        this.dirtyFlags &= -8, this.dirtyFlags |= 8, this.beforeRender.next(r);
        for (let { _lView: o, notifyErrorHandler: i } of this._views)
            gm(o, i, r, this.zonelessEnabled);
        if (this.dirtyFlags &= -5, this.syncDirtyFlagsWithViews(), this.dirtyFlags & 7)
            return;
    }
    else
        n?.begin?.(), n?.end?.(); this.dirtyFlags & 8 && (this.dirtyFlags &= -9, this.afterRenderManager.execute()), this.syncDirtyFlagsWithViews(); }
    syncDirtyFlagsWithViews() { if (this.allViews.some(({ _lView: n }) => qr(n))) {
        this.dirtyFlags |= 2;
        return;
    }
    else
        this.dirtyFlags &= -8; }
    attachView(n) { let r = n; this._views.push(r), r.attachToAppRef(this); }
    detachView(n) { let r = n; Er(this._views, r), r.detachFromAppRef(); }
    _loadComponent(n) { this.attachView(n.hostView), this.tick(), this.components.push(n); let r = this._injector.get(bs, []); [...this._bootstrapListeners, ...r].forEach(o => o(n)); }
    ngOnDestroy() { if (!this._destroyed)
        try {
            this._destroyListeners.forEach(n => n()), this._views.slice().forEach(n => n.destroy());
        }
        finally {
            this._destroyed = !0, this._views = [], this._bootstrapListeners = [], this._destroyListeners = [];
        } }
    onDestroy(n) { return this._destroyListeners.push(n), () => Er(this._destroyListeners, n); }
    destroy() { if (this._destroyed)
        throw new v(406, !1); let n = this._injector; n.destroy && !n.destroyed && n.destroy(); }
    get viewCount() { return this._views.length; }
    warnIfDestroyed() { }
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac, providedIn: "root" }); }
} return e; })();
function Er(e, t) { let n = e.indexOf(t); n > -1 && e.splice(n, 1); }
function gm(e, t, n, r) { if (!n && !qr(e))
    return; bl(e, t, n && !r ? 0 : 1); }
var Ui = class {
    constructor(t, n) { this.ngModuleFactory = t, this.componentFactories = n; }
}, Ss = (() => { class e {
    compileModuleSync(n) { return new Hi(n); }
    compileModuleAsync(n) { return Promise.resolve(this.compileModuleSync(n)); }
    compileModuleAndAllComponentsSync(n) { let r = this.compileModuleSync(n), o = Xu(n), i = Xc(o.declarations).reduce((s, a) => { let u = Xe(a); return u && s.push(new mn(u)), s; }, []); return new Ui(r, i); }
    compileModuleAndAllComponentsAsync(n) { return Promise.resolve(this.compileModuleAndAllComponentsSync(n)); }
    clearCache() { }
    clearCacheFor(n) { }
    getModuleId(n) { }
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac, providedIn: "root" }); }
} return e; })();
var mm = (() => { class e {
    constructor() { this.zone = h(V), this.changeDetectionScheduler = h(kt), this.applicationRef = h(st); }
    initialize() { this._onMicrotaskEmptySubscription || (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({ next: () => { this.changeDetectionScheduler.runningTick || this.zone.run(() => { this.applicationRef.tick(); }); } })); }
    ngOnDestroy() { this._onMicrotaskEmptySubscription?.unsubscribe(); }
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac, providedIn: "root" }); }
} return e; })(), vm = new w("", { factory: () => !1 });
function kl({ ngZoneFactory: e, ignoreChangesOutsideZone: t, scheduleInRootZone: n }) { return e ??= () => new V(k(g({}, jl()), { scheduleInRootZone: n })), [{ provide: V, useFactory: e }, { provide: xt, multi: !0, useFactory: () => { let r = h(mm, { optional: !0 }); return () => r.initialize(); } }, { provide: xt, multi: !0, useFactory: () => { let r = h(ym); return () => { r.initialize(); }; } }, t === !0 ? { provide: Nl, useValue: !0 } : [], { provide: Rl, useValue: n ?? Uc }]; }
function Ll(e) { let t = e?.ignoreChangesOutsideZone, n = e?.scheduleInRootZone, r = kl({ ngZoneFactory: () => { let o = jl(e); return o.scheduleInRootZone = n, o.shouldCoalesceEventChangeDetection && Is("NgZone_CoalesceEvent"), new V(o); }, ignoreChangesOutsideZone: t, scheduleInRootZone: n }); return Ur([{ provide: vm, useValue: !0 }, { provide: eo, useValue: !1 }, r]); }
function jl(e) { return { enableLongStackTrace: !1, shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1, shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1 }; }
var ym = (() => { class e {
    constructor() { this.subscription = new j, this.initialized = !1, this.zone = h(V), this.pendingTasks = h(Bt); }
    initialize() { if (this.initialized)
        return; this.initialized = !0; let n = null; !this.zone.isStable && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (n = this.pendingTasks.add()), this.zone.runOutsideAngular(() => { this.subscription.add(this.zone.onStable.subscribe(() => { V.assertNotInAngularZone(), queueMicrotask(() => { n !== null && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (this.pendingTasks.remove(n), n = null); }); })); }), this.subscription.add(this.zone.onUnstable.subscribe(() => { V.assertInAngularZone(), n ??= this.pendingTasks.add(); })); }
    ngOnDestroy() { this.subscription.unsubscribe(); }
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac, providedIn: "root" }); }
} return e; })();
var Dm = (() => { class e {
    constructor() { this.appRef = h(st), this.taskService = h(Bt), this.ngZone = h(V), this.zonelessEnabled = h(eo), this.disableScheduling = h(Nl, { optional: !0 }) ?? !1, this.zoneIsDefined = typeof Zone < "u" && !!Zone.root.run, this.schedulerTickApplyArgs = [{ data: { __scheduler_tick__: !0 } }], this.subscriptions = new j, this.angularZoneId = this.zoneIsDefined ? this.ngZone._inner?.get(Or) : null, this.scheduleInRootZone = !this.zonelessEnabled && this.zoneIsDefined && (h(Rl, { optional: !0 }) ?? !1), this.cancelScheduledCallback = null, this.useMicrotaskScheduler = !1, this.runningTick = !1, this.pendingRenderTaskId = null, this.subscriptions.add(this.appRef.afterTick.subscribe(() => { this.runningTick || this.cleanup(); })), this.subscriptions.add(this.ngZone.onUnstable.subscribe(() => { this.runningTick || this.cleanup(); })), this.disableScheduling ||= !this.zonelessEnabled && (this.ngZone instanceof Ti || !this.zoneIsDefined); }
    notify(n) { if (!this.zonelessEnabled && n === 5)
        return; switch (n) {
        case 0: {
            this.appRef.dirtyFlags |= 2;
            break;
        }
        case 3:
        case 2:
        case 4:
        case 5:
        case 1: {
            this.appRef.dirtyFlags |= 4;
            break;
        }
        case 7: {
            this.appRef.deferredDirtyFlags |= 8;
            break;
        }
        case 9:
        case 8:
        case 6:
        case 10:
        default: this.appRef.dirtyFlags |= 8;
    } if (!this.shouldScheduleTick())
        return; let r = this.useMicrotaskScheduler ? Iu : Gc; this.pendingRenderTaskId = this.taskService.add(), this.scheduleInRootZone ? this.cancelScheduledCallback = Zone.root.run(() => r(() => this.tick())) : this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() => r(() => this.tick())); }
    shouldScheduleTick() { return !(this.disableScheduling || this.pendingRenderTaskId !== null || this.runningTick || this.appRef._runningTick || !this.zonelessEnabled && this.zoneIsDefined && Zone.current.get(Or + this.angularZoneId)); }
    tick() { if (this.runningTick || this.appRef.destroyed)
        return; !this.zonelessEnabled && this.appRef.dirtyFlags & 7 && (this.appRef.dirtyFlags |= 1); let n = this.taskService.add(); try {
        this.ngZone.run(() => { this.runningTick = !0, this.appRef._tick(); }, void 0, this.schedulerTickApplyArgs);
    }
    catch (r) {
        throw this.taskService.remove(n), r;
    }
    finally {
        this.cleanup();
    } this.useMicrotaskScheduler = !0, Iu(() => { this.useMicrotaskScheduler = !1, this.taskService.remove(n); }); }
    ngOnDestroy() { this.subscriptions.unsubscribe(), this.cleanup(); }
    cleanup() { if (this.runningTick = !1, this.cancelScheduledCallback?.(), this.cancelScheduledCallback = null, this.pendingRenderTaskId !== null) {
        let n = this.pendingRenderTaskId;
        this.pendingRenderTaskId = null, this.taskService.remove(n);
    } }
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac, providedIn: "root" }); }
} return e; })();
function Em() { return typeof $localize < "u" && $localize.locale || Vr; }
var _s = new w("", { providedIn: "root", factory: () => h(_s, b.Optional | b.SkipSelf) || Em() });
var $i = new w("");
function mr(e) { return !e.moduleRef; }
function Im(e) { let t = mr(e) ? e.r3Injector : e.moduleRef.injector, n = t.get(V); return n.run(() => { mr(e) ? e.r3Injector.resolveInjectorInitializers() : e.moduleRef.resolveInjectorInitializers(); let r = t.get(Ne, null), o; if (n.runOutsideAngular(() => { o = n.onError.subscribe({ next: i => { r.handleError(i); } }); }), mr(e)) {
    let i = () => t.destroy(), s = e.platformInjector.get($i);
    s.add(i), t.onDestroy(() => { o.unsubscribe(), s.delete(i); });
}
else {
    let i = () => e.moduleRef.destroy(), s = e.platformInjector.get($i);
    s.add(i), e.moduleRef.onDestroy(() => { Er(e.allPlatformModules, e.moduleRef), o.unsubscribe(), s.delete(i); });
} return pm(r, n, () => { let i = t.get(Fl); return i.runInitializers(), i.donePromise.then(() => { let s = t.get(_s, Vr); if (um(s || Vr), mr(e)) {
    let a = t.get(st);
    return e.rootComponent !== void 0 && a.bootstrap(e.rootComponent), a;
}
else
    return Cm(e.moduleRef, e.allPlatformModules), e.moduleRef; }); }); }); }
function Cm(e, t) { let n = e.injector.get(st); if (e._bootstrapComponents.length > 0)
    e._bootstrapComponents.forEach(r => n.bootstrap(r));
else if (e.instance.ngDoBootstrap)
    e.instance.ngDoBootstrap(n);
else
    throw new v(-403, !1); t.push(e); }
var Ir = null;
function wm(e = [], t) { return ot.create({ name: t, providers: [{ provide: $r, useValue: "platform" }, { provide: $i, useValue: new Set([() => Ir = null]) }, ...e] }); }
function bm(e = []) { if (Ir)
    return Ir; let t = wm(e); return Ir = t, dm(), Sm(t), t; }
function Sm(e) { e.get(ls, null)?.forEach(n => n()); }
var wn = (() => { class e {
    static { this.__NG_ELEMENT_ID__ = _m; }
} return e; })();
function _m(e) { return Mm(Pe(), ee(), (e & 16) === 16); }
function Mm(e, t, n) { if (Xi(e) && !n) {
    let r = En(e.index, t);
    return new Ft(r, r);
}
else if (e.type & 175) {
    let r = t[we];
    return new Ft(r, t);
} return null; }
function Vl(e) { try {
    let { rootComponent: t, appProviders: n, platformProviders: r } = e, o = bm(r), i = [kl({}), { provide: kt, useExisting: Dm }, ...n || []], s = new jr({ providers: i, parent: o, debugName: "", runEnvironmentInitializers: !1 });
    return Im({ r3Injector: s.injector, platformInjector: o, rootComponent: t });
}
catch (t) {
    return Promise.reject(t);
} }
var Wl = null;
function zt() { return Wl; }
function ql(e) { Wl ??= e; }
var io = class {
};
var ue = new w(""), Zl = (() => { class e {
    historyGo(n) { throw new Error(""); }
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: () => h(xm), providedIn: "platform" }); }
} return e; })();
var xm = (() => { class e extends Zl {
    constructor() { super(), this._doc = h(ue), this._location = window.location, this._history = window.history; }
    getBaseHrefFromDOM() { return zt().getBaseHref(this._doc); }
    onPopState(n) { let r = zt().getGlobalEventTarget(this._doc, "window"); return r.addEventListener("popstate", n, !1), () => r.removeEventListener("popstate", n); }
    onHashChange(n) { let r = zt().getGlobalEventTarget(this._doc, "window"); return r.addEventListener("hashchange", n, !1), () => r.removeEventListener("hashchange", n); }
    get href() { return this._location.href; }
    get protocol() { return this._location.protocol; }
    get hostname() { return this._location.hostname; }
    get port() { return this._location.port; }
    get pathname() { return this._location.pathname; }
    get search() { return this._location.search; }
    get hash() { return this._location.hash; }
    set pathname(n) { this._location.pathname = n; }
    pushState(n, r, o) { this._history.pushState(n, r, o); }
    replaceState(n, r, o) { this._history.replaceState(n, r, o); }
    forward() { this._history.forward(); }
    back() { this._history.back(); }
    historyGo(n = 0) { this._history.go(n); }
    getState() { return this._history.state; }
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: () => new e, providedIn: "platform" }); }
} return e; })();
function Yl(e, t) { if (e.length == 0)
    return t; if (t.length == 0)
    return e; let n = 0; return e.endsWith("/") && n++, t.startsWith("/") && n++, n == 2 ? e + t.substring(1) : n == 1 ? e + t : e + "/" + t; }
function Bl(e) { let t = e.match(/#|\?|$/), n = t && t.index || e.length, r = n - (e[n - 1] === "/" ? 1 : 0); return e.slice(0, r) + e.slice(n); }
function at(e) { return e && e[0] !== "?" ? "?" + e : e; }
var ao = (() => { class e {
    historyGo(n) { throw new Error(""); }
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: () => h(Kl), providedIn: "root" }); }
} return e; })(), Om = new w(""), Kl = (() => { class e extends ao {
    constructor(n, r) { super(), this._platformLocation = n, this._removeListenerFns = [], this._baseHref = r ?? this._platformLocation.getBaseHrefFromDOM() ?? h(ue).location?.origin ?? ""; }
    ngOnDestroy() { for (; this._removeListenerFns.length;)
        this._removeListenerFns.pop()(); }
    onPopState(n) { this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n)); }
    getBaseHref() { return this._baseHref; }
    prepareExternalUrl(n) { return Yl(this._baseHref, n); }
    path(n = !1) { let r = this._platformLocation.pathname + at(this._platformLocation.search), o = this._platformLocation.hash; return o && n ? `${r}${o}` : r; }
    pushState(n, r, o, i) { let s = this.prepareExternalUrl(o + at(i)); this._platformLocation.pushState(n, r, s); }
    replaceState(n, r, o, i) { let s = this.prepareExternalUrl(o + at(i)); this._platformLocation.replaceState(n, r, s); }
    forward() { this._platformLocation.forward(); }
    back() { this._platformLocation.back(); }
    getState() { return this._platformLocation.getState(); }
    historyGo(n = 0) { this._platformLocation.historyGo?.(n); }
    static { this.\u0275fac = function (r) { return new (r || e)(M(Zl), M(Om, 8)); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac, providedIn: "root" }); }
} return e; })();
var Sn = (() => { class e {
    constructor(n) { this._subject = new Z, this._urlChangeListeners = [], this._urlChangeSubscription = null, this._locationStrategy = n; let r = this._locationStrategy.getBaseHref(); this._basePath = km(Bl(Hl(r))), this._locationStrategy.onPopState(o => { this._subject.emit({ url: this.path(!0), pop: !0, state: o.state, type: o.type }); }); }
    ngOnDestroy() { this._urlChangeSubscription?.unsubscribe(), this._urlChangeListeners = []; }
    path(n = !1) { return this.normalize(this._locationStrategy.path(n)); }
    getState() { return this._locationStrategy.getState(); }
    isCurrentPathEqualTo(n, r = "") { return this.path() == this.normalize(n + at(r)); }
    normalize(n) { return e.stripTrailingSlash(Fm(this._basePath, Hl(n))); }
    prepareExternalUrl(n) { return n && n[0] !== "/" && (n = "/" + n), this._locationStrategy.prepareExternalUrl(n); }
    go(n, r = "", o = null) { this._locationStrategy.pushState(o, "", n, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(n + at(r)), o); }
    replaceState(n, r = "", o = null) { this._locationStrategy.replaceState(o, "", n, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(n + at(r)), o); }
    forward() { this._locationStrategy.forward(); }
    back() { this._locationStrategy.back(); }
    historyGo(n = 0) { this._locationStrategy.historyGo?.(n); }
    onUrlChange(n) { return this._urlChangeListeners.push(n), this._urlChangeSubscription ??= this.subscribe(r => { this._notifyUrlChangeListeners(r.url, r.state); }), () => { let r = this._urlChangeListeners.indexOf(n); this._urlChangeListeners.splice(r, 1), this._urlChangeListeners.length === 0 && (this._urlChangeSubscription?.unsubscribe(), this._urlChangeSubscription = null); }; }
    _notifyUrlChangeListeners(n = "", r) { this._urlChangeListeners.forEach(o => o(n, r)); }
    subscribe(n, r, o) { return this._subject.subscribe({ next: n, error: r, complete: o }); }
    static { this.normalizeQueryParams = at; }
    static { this.joinWithSlash = Yl; }
    static { this.stripTrailingSlash = Bl; }
    static { this.\u0275fac = function (r) { return new (r || e)(M(ao)); }; }
    static { this.\u0275prov = D({ token: e, factory: () => Pm(), providedIn: "root" }); }
} return e; })();
function Pm() { return new Sn(M(ao)); }
function Fm(e, t) { if (!e || !t.startsWith(e))
    return t; let n = t.substring(e.length); return n === "" || ["/", ";", "?", "#"].includes(n[0]) ? n : t; }
function Hl(e) { return e.replace(/\/index.html$/, ""); }
function km(e) { if (new RegExp("^(https?:)?//").test(e)) {
    let [, n] = e.split(/\/\/[^\/]+/);
    return n;
} return e; }
function Ql(e, t) { t = encodeURIComponent(t); for (let n of e.split(";")) {
    let r = n.indexOf("="), [o, i] = r == -1 ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
    if (o.trim() === t)
        return decodeURIComponent(i);
} return null; }
var Jl = "browser", Lm = "server";
function Ms(e) { return e === Lm; }
var so = class {
};
var Rs = class extends io {
    constructor() { super(...arguments), this.supportsDOMEvents = !0; }
}, As = class e extends Rs {
    static makeCurrent() { ql(new e); }
    onAndCancel(t, n, r) { return t.addEventListener(n, r), () => { t.removeEventListener(n, r); }; }
    dispatchEvent(t, n) { t.dispatchEvent(n); }
    remove(t) { t.remove(); }
    createElement(t, n) { return n = n || this.getDefaultDocument(), n.createElement(t); }
    createHtmlDocument() { return document.implementation.createHTMLDocument("fakeTitle"); }
    getDefaultDocument() { return document; }
    isElementNode(t) { return t.nodeType === Node.ELEMENT_NODE; }
    isShadowRoot(t) { return t instanceof DocumentFragment; }
    getGlobalEventTarget(t, n) { return n === "window" ? window : n === "document" ? t : n === "body" ? t.body : null; }
    getBaseHref(t) { let n = Vm(); return n == null ? null : Bm(n); }
    resetBaseElement() { _n = null; }
    getUserAgent() { return window.navigator.userAgent; }
    getCookie(t) { return Ql(document.cookie, t); }
}, _n = null;
function Vm() { return _n = _n || document.querySelector("base"), _n ? _n.getAttribute("href") : null; }
function Bm(e) { return new URL(e, document.baseURI).pathname; }
var Hm = (() => { class e {
    build() { return new XMLHttpRequest; }
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac }); }
} return e; })(), xs = new w(""), nd = (() => { class e {
    constructor(n, r) { this._zone = r, this._eventNameToPlugin = new Map, n.forEach(o => { o.manager = this; }), this._plugins = n.slice().reverse(); }
    addEventListener(n, r, o) { return this._findPluginFor(r).addEventListener(n, r, o); }
    getZone() { return this._zone; }
    _findPluginFor(n) { let r = this._eventNameToPlugin.get(n); if (r)
        return r; if (r = this._plugins.find(i => i.supports(n)), !r)
        throw new v(5101, !1); return this._eventNameToPlugin.set(n, r), r; }
    static { this.\u0275fac = function (r) { return new (r || e)(M(xs), M(V)); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac }); }
} return e; })(), uo = class {
    constructor(t) { this._doc = t; }
}, Ts = "ng-app-id", rd = (() => { class e {
    constructor(n, r, o, i = {}) { this.doc = n, this.appId = r, this.nonce = o, this.platformId = i, this.styleRef = new Map, this.hostNodes = new Set, this.styleNodesInDOM = this.collectServerRenderedStyles(), this.platformIsServer = Ms(i), this.resetHostNodes(); }
    addStyles(n) { for (let r of n)
        this.changeUsageCount(r, 1) === 1 && this.onStyleAdded(r); }
    removeStyles(n) { for (let r of n)
        this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r); }
    ngOnDestroy() { let n = this.styleNodesInDOM; n && (n.forEach(r => r.remove()), n.clear()); for (let r of this.getAllStyles())
        this.onStyleRemoved(r); this.resetHostNodes(); }
    addHost(n) { this.hostNodes.add(n); for (let r of this.getAllStyles())
        this.addStyleToHost(n, r); }
    removeHost(n) { this.hostNodes.delete(n); }
    getAllStyles() { return this.styleRef.keys(); }
    onStyleAdded(n) { for (let r of this.hostNodes)
        this.addStyleToHost(r, n); }
    onStyleRemoved(n) { let r = this.styleRef; r.get(n)?.elements?.forEach(o => o.remove()), r.delete(n); }
    collectServerRenderedStyles() { let n = this.doc.head?.querySelectorAll(`style[${Ts}="${this.appId}"]`); if (n?.length) {
        let r = new Map;
        return n.forEach(o => { o.textContent != null && r.set(o.textContent, o); }), r;
    } return null; }
    changeUsageCount(n, r) { let o = this.styleRef; if (o.has(n)) {
        let i = o.get(n);
        return i.usage += r, i.usage;
    } return o.set(n, { usage: r, elements: [] }), r; }
    getStyleElement(n, r) { let o = this.styleNodesInDOM, i = o?.get(r); if (i?.parentNode === n)
        return o.delete(r), i.removeAttribute(Ts), i; {
        let s = this.doc.createElement("style");
        return this.nonce && s.setAttribute("nonce", this.nonce), s.textContent = r, this.platformIsServer && s.setAttribute(Ts, this.appId), n.appendChild(s), s;
    } }
    addStyleToHost(n, r) { let o = this.getStyleElement(n, r), i = this.styleRef, s = i.get(r)?.elements; s ? s.push(o) : i.set(r, { elements: [o], usage: 1 }); }
    resetHostNodes() { let n = this.hostNodes; n.clear(), n.add(this.doc.head); }
    static { this.\u0275fac = function (r) { return new (r || e)(M(ue), M(cs), M(ds, 8), M(Ht)); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac }); }
} return e; })(), Ns = { svg: "http://www.w3.org/2000/svg", xhtml: "http://www.w3.org/1999/xhtml", xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace", xmlns: "http://www.w3.org/2000/xmlns/", math: "http://www.w3.org/1998/Math/MathML" }, Ps = /%COMP%/g, od = "%COMP%", Um = `_nghost-${od}`, $m = `_ngcontent-${od}`, Gm = !0, zm = new w("", { providedIn: "root", factory: () => Gm });
function Wm(e) { return $m.replace(Ps, e); }
function qm(e) { return Um.replace(Ps, e); }
function id(e, t) { return t.map(n => n.replace(Ps, e)); }
var Xl = (() => { class e {
    constructor(n, r, o, i, s, a, u, c = null) { this.eventManager = n, this.sharedStylesHost = r, this.appId = o, this.removeStylesOnCompDestroy = i, this.doc = s, this.platformId = a, this.ngZone = u, this.nonce = c, this.rendererByCompId = new Map, this.platformIsServer = Ms(a), this.defaultRenderer = new Mn(n, s, u, this.platformIsServer); }
    createRenderer(n, r) { if (!n || !r)
        return this.defaultRenderer; this.platformIsServer && r.encapsulation === Ce.ShadowDom && (r = k(g({}, r), { encapsulation: Ce.Emulated })); let o = this.getOrCreateRenderer(n, r); return o instanceof co ? o.applyToHost(n) : o instanceof Tn && o.applyStyles(), o; }
    getOrCreateRenderer(n, r) { let o = this.rendererByCompId, i = o.get(r.id); if (!i) {
        let s = this.doc, a = this.ngZone, u = this.eventManager, c = this.sharedStylesHost, l = this.removeStylesOnCompDestroy, d = this.platformIsServer;
        switch (r.encapsulation) {
            case Ce.Emulated:
                i = new co(u, c, r, this.appId, l, s, a, d);
                break;
            case Ce.ShadowDom: return new Os(u, c, n, r, s, a, this.nonce, d);
            default:
                i = new Tn(u, c, r, l, s, a, d);
                break;
        }
        o.set(r.id, i);
    } return i; }
    ngOnDestroy() { this.rendererByCompId.clear(); }
    static { this.\u0275fac = function (r) { return new (r || e)(M(nd), M(rd), M(cs), M(zm), M(ue), M(Ht), M(V), M(ds)); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac }); }
} return e; })(), Mn = class {
    constructor(t, n, r, o) { this.eventManager = t, this.doc = n, this.ngZone = r, this.platformIsServer = o, this.data = Object.create(null), this.throwOnSyntheticProps = !0, this.destroyNode = null; }
    destroy() { }
    createElement(t, n) { return n ? this.doc.createElementNS(Ns[n] || n, t) : this.doc.createElement(t); }
    createComment(t) { return this.doc.createComment(t); }
    createText(t) { return this.doc.createTextNode(t); }
    appendChild(t, n) { (ed(t) ? t.content : t).appendChild(n); }
    insertBefore(t, n, r) { t && (ed(t) ? t.content : t).insertBefore(n, r); }
    removeChild(t, n) { n.remove(); }
    selectRootElement(t, n) { let r = typeof t == "string" ? this.doc.querySelector(t) : t; if (!r)
        throw new v(-5104, !1); return n || (r.textContent = ""), r; }
    parentNode(t) { return t.parentNode; }
    nextSibling(t) { return t.nextSibling; }
    setAttribute(t, n, r, o) { if (o) {
        n = o + ":" + n;
        let i = Ns[o];
        i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
    }
    else
        t.setAttribute(n, r); }
    removeAttribute(t, n, r) { if (r) {
        let o = Ns[r];
        o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
    }
    else
        t.removeAttribute(n); }
    addClass(t, n) { t.classList.add(n); }
    removeClass(t, n) { t.classList.remove(n); }
    setStyle(t, n, r, o) { o & (it.DashCase | it.Important) ? t.style.setProperty(n, r, o & it.Important ? "important" : "") : t.style[n] = r; }
    removeStyle(t, n, r) { r & it.DashCase ? t.style.removeProperty(n) : t.style[n] = ""; }
    setProperty(t, n, r) { t != null && (t[n] = r); }
    setValue(t, n) { t.nodeValue = n; }
    listen(t, n, r) { if (typeof t == "string" && (t = zt().getGlobalEventTarget(this.doc, t), !t))
        throw new Error(`Unsupported event target ${t} for event ${n}`); return this.eventManager.addEventListener(t, n, this.decoratePreventDefault(r)); }
    decoratePreventDefault(t) { return n => { if (n === "__ngUnwrap__")
        return t; (this.platformIsServer ? this.ngZone.runGuarded(() => t(n)) : t(n)) === !1 && n.preventDefault(); }; }
};
function ed(e) { return e.tagName === "TEMPLATE" && e.content !== void 0; }
var Os = class extends Mn {
    constructor(t, n, r, o, i, s, a, u) { super(t, i, s, u), this.sharedStylesHost = n, this.hostEl = r, this.shadowRoot = r.attachShadow({ mode: "open" }), this.sharedStylesHost.addHost(this.shadowRoot); let c = id(o.id, o.styles); for (let l of c) {
        let d = document.createElement("style");
        a && d.setAttribute("nonce", a), d.textContent = l, this.shadowRoot.appendChild(d);
    } }
    nodeOrShadowRoot(t) { return t === this.hostEl ? this.shadowRoot : t; }
    appendChild(t, n) { return super.appendChild(this.nodeOrShadowRoot(t), n); }
    insertBefore(t, n, r) { return super.insertBefore(this.nodeOrShadowRoot(t), n, r); }
    removeChild(t, n) { return super.removeChild(null, n); }
    parentNode(t) { return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t))); }
    destroy() { this.sharedStylesHost.removeHost(this.shadowRoot); }
}, Tn = class extends Mn {
    constructor(t, n, r, o, i, s, a, u) { super(t, i, s, a), this.sharedStylesHost = n, this.removeStylesOnCompDestroy = o, this.styles = u ? id(u, r.styles) : r.styles; }
    applyStyles() { this.sharedStylesHost.addStyles(this.styles); }
    destroy() { this.removeStylesOnCompDestroy && this.sharedStylesHost.removeStyles(this.styles); }
}, co = class extends Tn {
    constructor(t, n, r, o, i, s, a, u) { let c = o + "-" + r.id; super(t, n, r, i, s, a, u, c), this.contentAttr = Wm(c), this.hostAttr = qm(c); }
    applyToHost(t) { this.applyStyles(), this.setAttribute(t, this.hostAttr, ""); }
    createElement(t, n) { let r = super.createElement(t, n); return super.setAttribute(r, this.contentAttr, ""), r; }
}, Zm = (() => { class e extends uo {
    constructor(n) { super(n); }
    supports(n) { return !0; }
    addEventListener(n, r, o) { return n.addEventListener(r, o, !1), () => this.removeEventListener(n, r, o); }
    removeEventListener(n, r, o) { return n.removeEventListener(r, o); }
    static { this.\u0275fac = function (r) { return new (r || e)(M(ue)); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac }); }
} return e; })(), td = ["alt", "control", "meta", "shift"], Ym = { "\b": "Backspace", "	": "Tab", "\x7F": "Delete", "\x1B": "Escape", Del: "Delete", Esc: "Escape", Left: "ArrowLeft", Right: "ArrowRight", Up: "ArrowUp", Down: "ArrowDown", Menu: "ContextMenu", Scroll: "ScrollLock", Win: "OS" }, Km = { alt: e => e.altKey, control: e => e.ctrlKey, meta: e => e.metaKey, shift: e => e.shiftKey }, Qm = (() => { class e extends uo {
    constructor(n) { super(n); }
    supports(n) { return e.parseEventName(n) != null; }
    addEventListener(n, r, o) { let i = e.parseEventName(r), s = e.eventCallback(i.fullKey, o, this.manager.getZone()); return this.manager.getZone().runOutsideAngular(() => zt().onAndCancel(n, i.domEventName, s)); }
    static parseEventName(n) { let r = n.toLowerCase().split("."), o = r.shift(); if (r.length === 0 || !(o === "keydown" || o === "keyup"))
        return null; let i = e._normalizeKey(r.pop()), s = "", a = r.indexOf("code"); if (a > -1 && (r.splice(a, 1), s = "code."), td.forEach(c => { let l = r.indexOf(c); l > -1 && (r.splice(l, 1), s += c + "."); }), s += i, r.length != 0 || i.length === 0)
        return null; let u = {}; return u.domEventName = o, u.fullKey = s, u; }
    static matchEventFullKeyCode(n, r) { let o = Ym[n.key] || n.key, i = ""; return r.indexOf("code.") > -1 && (o = n.code, i = "code."), o == null || !o ? !1 : (o = o.toLowerCase(), o === " " ? o = "space" : o === "." && (o = "dot"), td.forEach(s => { if (s !== o) {
        let a = Km[s];
        a(n) && (i += s + ".");
    } }), i += o, i === r); }
    static eventCallback(n, r, o) { return i => { e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i)); }; }
    static _normalizeKey(n) { return n === "esc" ? "escape" : n; }
    static { this.\u0275fac = function (r) { return new (r || e)(M(ue)); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac }); }
} return e; })();
function sd(e, t) { return Vl(g({ rootComponent: e }, Jm(t))); }
function Jm(e) { return { appProviders: [...rv, ...e?.providers ?? []], platformProviders: nv }; }
function Xm() { As.makeCurrent(); }
function ev() { return new Ne; }
function tv() { return Qc(document), document; }
var nv = [{ provide: Ht, useValue: Jl }, { provide: ls, useValue: Xm, multi: !0 }, { provide: ue, useFactory: tv, deps: [] }];
var rv = [{ provide: $r, useValue: "root" }, { provide: Ne, useFactory: ev, deps: [] }, { provide: xs, useClass: Zm, multi: !0, deps: [ue, V, Ht] }, { provide: xs, useClass: Qm, multi: !0, deps: [ue] }, Xl, rd, nd, { provide: jt, useExisting: Xl }, { provide: so, useClass: Hm, deps: [] }, []];
var ad = (() => { class e {
    constructor(n) { this._doc = n; }
    getTitle() { return this._doc.title; }
    setTitle(n) { this._doc.title = n || ""; }
    static { this.\u0275fac = function (r) { return new (r || e)(M(ue)); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac, providedIn: "root" }); }
} return e; })();
var C = "primary", zn = Symbol("RouteTitle"), Vs = class {
    constructor(t) { this.params = t || {}; }
    has(t) { return Object.prototype.hasOwnProperty.call(this.params, t); }
    get(t) { if (this.has(t)) {
        let n = this.params[t];
        return Array.isArray(n) ? n[0] : n;
    } return null; }
    getAll(t) { if (this.has(t)) {
        let n = this.params[t];
        return Array.isArray(n) ? n : [n];
    } return []; }
    get keys() { return Object.keys(this.params); }
};
function Qt(e) { return new Vs(e); }
function iv(e, t, n) { let r = n.path.split("/"); if (r.length > e.length || n.pathMatch === "full" && (t.hasChildren() || r.length < e.length))
    return null; let o = {}; for (let i = 0; i < r.length; i++) {
    let s = r[i], a = e[i];
    if (s[0] === ":")
        o[s.substring(1)] = a;
    else if (s !== a.path)
        return null;
} return { consumed: e.slice(0, r.length), posParams: o }; }
function sv(e, t) { if (e.length !== t.length)
    return !1; for (let n = 0; n < e.length; ++n)
    if (!be(e[n], t[n]))
        return !1; return !0; }
function be(e, t) { let n = e ? Bs(e) : void 0, r = t ? Bs(t) : void 0; if (!n || !r || n.length != r.length)
    return !1; let o; for (let i = 0; i < n.length; i++)
    if (o = n[i], !gd(e[o], t[o]))
        return !1; return !0; }
function Bs(e) { return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)]; }
function gd(e, t) { if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length)
        return !1;
    let n = [...e].sort(), r = [...t].sort();
    return n.every((o, i) => r[i] === o);
}
else
    return e === t; }
function md(e) { return e.length > 0 ? e[e.length - 1] : null; }
function We(e) { return Ko(e) ? e : Cn(e) ? H(Promise.resolve(e)) : E(e); }
var av = { exact: yd, subset: Dd }, vd = { exact: uv, subset: cv, ignored: () => !0 };
function ud(e, t, n) { return av[n.paths](e.root, t.root, n.matrixParams) && vd[n.queryParams](e.queryParams, t.queryParams) && !(n.fragment === "exact" && e.fragment !== t.fragment); }
function uv(e, t) { return be(e, t); }
function yd(e, t, n) { if (!ct(e.segments, t.segments) || !ho(e.segments, t.segments, n) || e.numberOfChildren !== t.numberOfChildren)
    return !1; for (let r in t.children)
    if (!e.children[r] || !yd(e.children[r], t.children[r], n))
        return !1; return !0; }
function cv(e, t) { return Object.keys(t).length <= Object.keys(e).length && Object.keys(t).every(n => gd(e[n], t[n])); }
function Dd(e, t, n) { return Ed(e, t, t.segments, n); }
function Ed(e, t, n, r) { if (e.segments.length > n.length) {
    let o = e.segments.slice(0, n.length);
    return !(!ct(o, n) || t.hasChildren() || !ho(o, n, r));
}
else if (e.segments.length === n.length) {
    if (!ct(e.segments, n) || !ho(e.segments, n, r))
        return !1;
    for (let o in t.children)
        if (!e.children[o] || !Dd(e.children[o], t.children[o], r))
            return !1;
    return !0;
}
else {
    let o = n.slice(0, e.segments.length), i = n.slice(e.segments.length);
    return !ct(e.segments, o) || !ho(e.segments, o, r) || !e.children[C] ? !1 : Ed(e.children[C], t, i, r);
} }
function ho(e, t, n) { return t.every((r, o) => vd[n](e[o].parameters, r.parameters)); }
var ke = class {
    constructor(t = new R([], {}), n = {}, r = null) { this.root = t, this.queryParams = n, this.fragment = r; }
    get queryParamMap() { return this._queryParamMap ??= Qt(this.queryParams), this._queryParamMap; }
    toString() { return fv.serialize(this); }
}, R = class {
    constructor(t, n) { this.segments = t, this.children = n, this.parent = null, Object.values(n).forEach(r => r.parent = this); }
    hasChildren() { return this.numberOfChildren > 0; }
    get numberOfChildren() { return Object.keys(this.children).length; }
    toString() { return po(this); }
}, ut = class {
    constructor(t, n) { this.path = t, this.parameters = n; }
    get parameterMap() { return this._parameterMap ??= Qt(this.parameters), this._parameterMap; }
    toString() { return Cd(this); }
};
function lv(e, t) { return ct(e, t) && e.every((n, r) => be(n.parameters, t[r].parameters)); }
function ct(e, t) { return e.length !== t.length ? !1 : e.every((n, r) => n.path === t[r].path); }
function dv(e, t) { let n = []; return Object.entries(e.children).forEach(([r, o]) => { r === C && (n = n.concat(t(o, r))); }), Object.entries(e.children).forEach(([r, o]) => { r !== C && (n = n.concat(t(o, r))); }), n; }
var fa = (() => { class e {
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: () => new Fn, providedIn: "root" }); }
} return e; })(), Fn = class {
    parse(t) { let n = new Us(t); return new ke(n.parseRootSegment(), n.parseQueryParams(), n.parseFragment()); }
    serialize(t) { let n = `/${Nn(t.root, !0)}`, r = gv(t.queryParams), o = typeof t.fragment == "string" ? `#${hv(t.fragment)}` : ""; return `${n}${r}${o}`; }
}, fv = new Fn;
function po(e) { return e.segments.map(t => Cd(t)).join("/"); }
function Nn(e, t) { if (!e.hasChildren())
    return po(e); if (t) {
    let n = e.children[C] ? Nn(e.children[C], !1) : "", r = [];
    return Object.entries(e.children).forEach(([o, i]) => { o !== C && r.push(`${o}:${Nn(i, !1)}`); }), r.length > 0 ? `${n}(${r.join("//")})` : n;
}
else {
    let n = dv(e, (r, o) => o === C ? [Nn(e.children[C], !1)] : [`${o}:${Nn(r, !1)}`]);
    return Object.keys(e.children).length === 1 && e.children[C] != null ? `${po(e)}/${n[0]}` : `${po(e)}/(${n.join("//")})`;
} }
function Id(e) { return encodeURIComponent(e).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ","); }
function lo(e) { return Id(e).replace(/%3B/gi, ";"); }
function hv(e) { return encodeURI(e); }
function Hs(e) { return Id(e).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&"); }
function go(e) { return decodeURIComponent(e); }
function cd(e) { return go(e.replace(/\+/g, "%20")); }
function Cd(e) { return `${Hs(e.path)}${pv(e.parameters)}`; }
function pv(e) { return Object.entries(e).map(([t, n]) => `;${Hs(t)}=${Hs(n)}`).join(""); }
function gv(e) { let t = Object.entries(e).map(([n, r]) => Array.isArray(r) ? r.map(o => `${lo(n)}=${lo(o)}`).join("&") : `${lo(n)}=${lo(r)}`).filter(n => n); return t.length ? `?${t.join("&")}` : ""; }
var mv = /^[^\/()?;#]+/;
function Fs(e) { let t = e.match(mv); return t ? t[0] : ""; }
var vv = /^[^\/()?;=#]+/;
function yv(e) { let t = e.match(vv); return t ? t[0] : ""; }
var Dv = /^[^=?&#]+/;
function Ev(e) { let t = e.match(Dv); return t ? t[0] : ""; }
var Iv = /^[^&#]+/;
function Cv(e) { let t = e.match(Iv); return t ? t[0] : ""; }
var Us = class {
    constructor(t) { this.url = t, this.remaining = t; }
    parseRootSegment() { return this.consumeOptional("/"), this.remaining === "" || this.peekStartsWith("?") || this.peekStartsWith("#") ? new R([], {}) : new R([], this.parseChildren()); }
    parseQueryParams() { let t = {}; if (this.consumeOptional("?"))
        do
            this.parseQueryParam(t);
        while (this.consumeOptional("&")); return t; }
    parseFragment() { return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null; }
    parseChildren() { if (this.remaining === "")
        return {}; this.consumeOptional("/"); let t = []; for (this.peekStartsWith("(") || t.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");)
        this.capture("/"), t.push(this.parseSegment()); let n = {}; this.peekStartsWith("/(") && (this.capture("/"), n = this.parseParens(!0)); let r = {}; return this.peekStartsWith("(") && (r = this.parseParens(!1)), (t.length > 0 || Object.keys(n).length > 0) && (r[C] = new R(t, n)), r; }
    parseSegment() { let t = Fs(this.remaining); if (t === "" && this.peekStartsWith(";"))
        throw new v(4009, !1); return this.capture(t), new ut(go(t), this.parseMatrixParams()); }
    parseMatrixParams() { let t = {}; for (; this.consumeOptional(";");)
        this.parseParam(t); return t; }
    parseParam(t) { let n = yv(this.remaining); if (!n)
        return; this.capture(n); let r = ""; if (this.consumeOptional("=")) {
        let o = Fs(this.remaining);
        o && (r = o, this.capture(r));
    } t[go(n)] = go(r); }
    parseQueryParam(t) { let n = Ev(this.remaining); if (!n)
        return; this.capture(n); let r = ""; if (this.consumeOptional("=")) {
        let s = Cv(this.remaining);
        s && (r = s, this.capture(r));
    } let o = cd(n), i = cd(r); if (t.hasOwnProperty(o)) {
        let s = t[o];
        Array.isArray(s) || (s = [s], t[o] = s), s.push(i);
    }
    else
        t[o] = i; }
    parseParens(t) { let n = {}; for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0;) {
        let r = Fs(this.remaining), o = this.remaining[r.length];
        if (o !== "/" && o !== ")" && o !== ";")
            throw new v(4010, !1);
        let i;
        r.indexOf(":") > -1 ? (i = r.slice(0, r.indexOf(":")), this.capture(i), this.capture(":")) : t && (i = C);
        let s = this.parseChildren();
        n[i] = Object.keys(s).length === 1 ? s[C] : new R([], s), this.consumeOptional("//");
    } return n; }
    peekStartsWith(t) { return this.remaining.startsWith(t); }
    consumeOptional(t) { return this.peekStartsWith(t) ? (this.remaining = this.remaining.substring(t.length), !0) : !1; }
    capture(t) { if (!this.consumeOptional(t))
        throw new v(4011, !1); }
};
function wd(e) { return e.segments.length > 0 ? new R([], { [C]: e }) : e; }
function bd(e) { let t = {}; for (let [r, o] of Object.entries(e.children)) {
    let i = bd(o);
    if (r === C && i.segments.length === 0 && i.hasChildren())
        for (let [s, a] of Object.entries(i.children))
            t[s] = a;
    else
        (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
} let n = new R(e.segments, t); return wv(n); }
function wv(e) { if (e.numberOfChildren === 1 && e.children[C]) {
    let t = e.children[C];
    return new R(e.segments.concat(t.segments), t.children);
} return e; }
function kn(e) { return e instanceof ke; }
function bv(e, t, n = null, r = null) { let o = Sd(e); return _d(o, t, n, r); }
function Sd(e) { let t; function n(i) { let s = {}; for (let u of i.children) {
    let c = n(u);
    s[u.outlet] = c;
} let a = new R(i.url, s); return i === e && (t = a), a; } let r = n(e.root), o = wd(r); return t ?? o; }
function _d(e, t, n, r) { let o = e; for (; o.parent;)
    o = o.parent; if (t.length === 0)
    return ks(o, o, o, n, r); let i = Sv(t); if (i.toRoot())
    return ks(o, o, new R([], {}), n, r); let s = _v(i, o, e), a = s.processChildren ? xn(s.segmentGroup, s.index, i.commands) : Td(s.segmentGroup, s.index, i.commands); return ks(o, s.segmentGroup, a, n, r); }
function mo(e) { return typeof e == "object" && e != null && !e.outlets && !e.segmentPath; }
function Ln(e) { return typeof e == "object" && e != null && e.outlets; }
function ks(e, t, n, r, o) { let i = {}; r && Object.entries(r).forEach(([u, c]) => { i[u] = Array.isArray(c) ? c.map(l => `${l}`) : `${c}`; }); let s; e === t ? s = n : s = Md(e, t, n); let a = wd(bd(s)); return new ke(a, i, o); }
function Md(e, t, n) { let r = {}; return Object.entries(e.children).forEach(([o, i]) => { i === t ? r[o] = n : r[o] = Md(i, t, n); }), new R(e.segments, r); }
var vo = class {
    constructor(t, n, r) { if (this.isAbsolute = t, this.numberOfDoubleDots = n, this.commands = r, t && r.length > 0 && mo(r[0]))
        throw new v(4003, !1); let o = r.find(Ln); if (o && o !== md(r))
        throw new v(4004, !1); }
    toRoot() { return this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/"; }
};
function Sv(e) { if (typeof e[0] == "string" && e.length === 1 && e[0] === "/")
    return new vo(!0, 0, e); let t = 0, n = !1, r = e.reduce((o, i, s) => { if (typeof i == "object" && i != null) {
    if (i.outlets) {
        let a = {};
        return Object.entries(i.outlets).forEach(([u, c]) => { a[u] = typeof c == "string" ? c.split("/") : c; }), [...o, { outlets: a }];
    }
    if (i.segmentPath)
        return [...o, i.segmentPath];
} return typeof i != "string" ? [...o, i] : s === 0 ? (i.split("/").forEach((a, u) => { u == 0 && a === "." || (u == 0 && a === "" ? n = !0 : a === ".." ? t++ : a != "" && o.push(a)); }), o) : [...o, i]; }, []); return new vo(n, t, r); }
var Zt = class {
    constructor(t, n, r) { this.segmentGroup = t, this.processChildren = n, this.index = r; }
};
function _v(e, t, n) { if (e.isAbsolute)
    return new Zt(t, !0, 0); if (!n)
    return new Zt(t, !1, NaN); if (n.parent === null)
    return new Zt(n, !0, 0); let r = mo(e.commands[0]) ? 0 : 1, o = n.segments.length - 1 + r; return Mv(n, o, e.numberOfDoubleDots); }
function Mv(e, t, n) { let r = e, o = t, i = n; for (; i > o;) {
    if (i -= o, r = r.parent, !r)
        throw new v(4005, !1);
    o = r.segments.length;
} return new Zt(r, !1, o - i); }
function Tv(e) { return Ln(e[0]) ? e[0].outlets : { [C]: e }; }
function Td(e, t, n) { if (e ??= new R([], {}), e.segments.length === 0 && e.hasChildren())
    return xn(e, t, n); let r = Nv(e, t, n), o = n.slice(r.commandIndex); if (r.match && r.pathIndex < e.segments.length) {
    let i = new R(e.segments.slice(0, r.pathIndex), {});
    return i.children[C] = new R(e.segments.slice(r.pathIndex), e.children), xn(i, 0, o);
}
else
    return r.match && o.length === 0 ? new R(e.segments, {}) : r.match && !e.hasChildren() ? $s(e, t, n) : r.match ? xn(e, 0, o) : $s(e, t, n); }
function xn(e, t, n) { if (n.length === 0)
    return new R(e.segments, {}); {
    let r = Tv(n), o = {};
    if (Object.keys(r).some(i => i !== C) && e.children[C] && e.numberOfChildren === 1 && e.children[C].segments.length === 0) {
        let i = xn(e.children[C], t, n);
        return new R(e.segments, i.children);
    }
    return Object.entries(r).forEach(([i, s]) => { typeof s == "string" && (s = [s]), s !== null && (o[i] = Td(e.children[i], t, s)); }), Object.entries(e.children).forEach(([i, s]) => { r[i] === void 0 && (o[i] = s); }), new R(e.segments, o);
} }
function Nv(e, t, n) { let r = 0, o = t, i = { match: !1, pathIndex: 0, commandIndex: 0 }; for (; o < e.segments.length;) {
    if (r >= n.length)
        return i;
    let s = e.segments[o], a = n[r];
    if (Ln(a))
        break;
    let u = `${a}`, c = r < n.length - 1 ? n[r + 1] : null;
    if (o > 0 && u === void 0)
        break;
    if (u && c && typeof c == "object" && c.outlets === void 0) {
        if (!dd(u, c, s))
            return i;
        r += 2;
    }
    else {
        if (!dd(u, {}, s))
            return i;
        r++;
    }
    o++;
} return { match: !0, pathIndex: o, commandIndex: r }; }
function $s(e, t, n) { let r = e.segments.slice(0, t), o = 0; for (; o < n.length;) {
    let i = n[o];
    if (Ln(i)) {
        let u = Rv(i.outlets);
        return new R(r, u);
    }
    if (o === 0 && mo(n[0])) {
        let u = e.segments[t];
        r.push(new ut(u.path, ld(n[0]))), o++;
        continue;
    }
    let s = Ln(i) ? i.outlets[C] : `${i}`, a = o < n.length - 1 ? n[o + 1] : null;
    s && a && mo(a) ? (r.push(new ut(s, ld(a))), o += 2) : (r.push(new ut(s, {})), o++);
} return new R(r, {}); }
function Rv(e) { let t = {}; return Object.entries(e).forEach(([n, r]) => { typeof r == "string" && (r = [r]), r !== null && (t[n] = $s(new R([], {}), 0, r)); }), t; }
function ld(e) { let t = {}; return Object.entries(e).forEach(([n, r]) => t[n] = `${r}`), t; }
function dd(e, t, n) { return e == n.path && be(t, n.parameters); }
var On = "imperative", W = function (e) { return e[e.NavigationStart = 0] = "NavigationStart", e[e.NavigationEnd = 1] = "NavigationEnd", e[e.NavigationCancel = 2] = "NavigationCancel", e[e.NavigationError = 3] = "NavigationError", e[e.RoutesRecognized = 4] = "RoutesRecognized", e[e.ResolveStart = 5] = "ResolveStart", e[e.ResolveEnd = 6] = "ResolveEnd", e[e.GuardsCheckStart = 7] = "GuardsCheckStart", e[e.GuardsCheckEnd = 8] = "GuardsCheckEnd", e[e.RouteConfigLoadStart = 9] = "RouteConfigLoadStart", e[e.RouteConfigLoadEnd = 10] = "RouteConfigLoadEnd", e[e.ChildActivationStart = 11] = "ChildActivationStart", e[e.ChildActivationEnd = 12] = "ChildActivationEnd", e[e.ActivationStart = 13] = "ActivationStart", e[e.ActivationEnd = 14] = "ActivationEnd", e[e.Scroll = 15] = "Scroll", e[e.NavigationSkipped = 16] = "NavigationSkipped", e; }(W || {}), ce = class {
    constructor(t, n) { this.id = t, this.url = n; }
}, jn = class extends ce {
    constructor(t, n, r = "imperative", o = null) { super(t, n), this.type = W.NavigationStart, this.navigationTrigger = r, this.restoredState = o; }
    toString() { return `NavigationStart(id: ${this.id}, url: '${this.url}')`; }
}, lt = class extends ce {
    constructor(t, n, r) { super(t, n), this.urlAfterRedirects = r, this.type = W.NavigationEnd; }
    toString() { return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`; }
}, ne = function (e) { return e[e.Redirect = 0] = "Redirect", e[e.SupersededByNewNavigation = 1] = "SupersededByNewNavigation", e[e.NoDataFromResolver = 2] = "NoDataFromResolver", e[e.GuardRejected = 3] = "GuardRejected", e; }(ne || {}), Gs = function (e) { return e[e.IgnoredSameUrlNavigation = 0] = "IgnoredSameUrlNavigation", e[e.IgnoredByUrlHandlingStrategy = 1] = "IgnoredByUrlHandlingStrategy", e; }(Gs || {}), Fe = class extends ce {
    constructor(t, n, r, o) { super(t, n), this.reason = r, this.code = o, this.type = W.NavigationCancel; }
    toString() { return `NavigationCancel(id: ${this.id}, url: '${this.url}')`; }
}, dt = class extends ce {
    constructor(t, n, r, o) { super(t, n), this.reason = r, this.code = o, this.type = W.NavigationSkipped; }
}, Vn = class extends ce {
    constructor(t, n, r, o) { super(t, n), this.error = r, this.target = o, this.type = W.NavigationError; }
    toString() { return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`; }
}, yo = class extends ce {
    constructor(t, n, r, o) { super(t, n), this.urlAfterRedirects = r, this.state = o, this.type = W.RoutesRecognized; }
    toString() { return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`; }
}, zs = class extends ce {
    constructor(t, n, r, o) { super(t, n), this.urlAfterRedirects = r, this.state = o, this.type = W.GuardsCheckStart; }
    toString() { return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`; }
}, Ws = class extends ce {
    constructor(t, n, r, o, i) { super(t, n), this.urlAfterRedirects = r, this.state = o, this.shouldActivate = i, this.type = W.GuardsCheckEnd; }
    toString() { return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`; }
}, qs = class extends ce {
    constructor(t, n, r, o) { super(t, n), this.urlAfterRedirects = r, this.state = o, this.type = W.ResolveStart; }
    toString() { return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`; }
}, Zs = class extends ce {
    constructor(t, n, r, o) { super(t, n), this.urlAfterRedirects = r, this.state = o, this.type = W.ResolveEnd; }
    toString() { return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`; }
}, Ys = class {
    constructor(t) { this.route = t, this.type = W.RouteConfigLoadStart; }
    toString() { return `RouteConfigLoadStart(path: ${this.route.path})`; }
}, Ks = class {
    constructor(t) { this.route = t, this.type = W.RouteConfigLoadEnd; }
    toString() { return `RouteConfigLoadEnd(path: ${this.route.path})`; }
}, Qs = class {
    constructor(t) { this.snapshot = t, this.type = W.ChildActivationStart; }
    toString() { return `ChildActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`; }
}, Js = class {
    constructor(t) { this.snapshot = t, this.type = W.ChildActivationEnd; }
    toString() { return `ChildActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`; }
}, Xs = class {
    constructor(t) { this.snapshot = t, this.type = W.ActivationStart; }
    toString() { return `ActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`; }
}, ea = class {
    constructor(t) { this.snapshot = t, this.type = W.ActivationEnd; }
    toString() { return `ActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`; }
};
var Bn = class {
}, Jt = class {
    constructor(t, n) { this.url = t, this.navigationBehaviorOptions = n; }
};
function Av(e, t) { return e.providers && !e._injector && (e._injector = Cs(e.providers, t, `Route: ${e.path}`)), e._injector ?? t; }
function ve(e) { return e.outlet || C; }
function xv(e, t) { let n = e.filter(r => ve(r) === t); return n.push(...e.filter(r => ve(r) !== t)), n; }
function Wn(e) { if (!e)
    return null; if (e.routeConfig?._injector)
    return e.routeConfig._injector; for (let t = e.parent; t; t = t.parent) {
    let n = t.routeConfig;
    if (n?._loadedInjector)
        return n._loadedInjector;
    if (n?._injector)
        return n._injector;
} return null; }
var ta = class {
    get injector() { return Wn(this.route?.snapshot) ?? this.rootInjector; }
    set injector(t) { }
    constructor(t) { this.rootInjector = t, this.outlet = null, this.route = null, this.children = new So(this.rootInjector), this.attachRef = null; }
}, So = (() => { class e {
    constructor(n) { this.rootInjector = n, this.contexts = new Map; }
    onChildOutletCreated(n, r) { let o = this.getOrCreateContext(n); o.outlet = r, this.contexts.set(n, o); }
    onChildOutletDestroyed(n) { let r = this.getContext(n); r && (r.outlet = null, r.attachRef = null); }
    onOutletDeactivated() { let n = this.contexts; return this.contexts = new Map, n; }
    onOutletReAttached(n) { this.contexts = n; }
    getOrCreateContext(n) { let r = this.getContext(n); return r || (r = new ta(this.rootInjector), this.contexts.set(n, r)), r; }
    getContext(n) { return this.contexts.get(n) || null; }
    static { this.\u0275fac = function (r) { return new (r || e)(M(ae)); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac, providedIn: "root" }); }
} return e; })(), Do = class {
    constructor(t) { this._root = t; }
    get root() { return this._root.value; }
    parent(t) { let n = this.pathFromRoot(t); return n.length > 1 ? n[n.length - 2] : null; }
    children(t) { let n = na(t, this._root); return n ? n.children.map(r => r.value) : []; }
    firstChild(t) { let n = na(t, this._root); return n && n.children.length > 0 ? n.children[0].value : null; }
    siblings(t) { let n = ra(t, this._root); return n.length < 2 ? [] : n[n.length - 2].children.map(o => o.value).filter(o => o !== t); }
    pathFromRoot(t) { return ra(t, this._root).map(n => n.value); }
};
function na(e, t) { if (e === t.value)
    return t; for (let n of t.children) {
    let r = na(e, n);
    if (r)
        return r;
} return null; }
function ra(e, t) { if (e === t.value)
    return [t]; for (let n of t.children) {
    let r = ra(e, n);
    if (r.length)
        return r.unshift(t), r;
} return []; }
var te = class {
    constructor(t, n) { this.value = t, this.children = n; }
    toString() { return `TreeNode(${this.value})`; }
};
function qt(e) { let t = {}; return e && e.children.forEach(n => t[n.value.outlet] = n), t; }
var Eo = class extends Do {
    constructor(t, n) { super(t), this.snapshot = n, ha(this, t); }
    toString() { return this.snapshot.toString(); }
};
function Nd(e) { let t = Ov(e), n = new G([new ut("", {})]), r = new G({}), o = new G({}), i = new G({}), s = new G(""), a = new Xt(n, r, i, s, o, C, e, t.root); return a.snapshot = t.root, new Eo(new te(a, []), t); }
function Ov(e) { let t = {}, n = {}, r = {}, o = "", i = new Yt([], t, r, o, n, C, e, null, {}); return new Co("", new te(i, [])); }
var Xt = class {
    constructor(t, n, r, o, i, s, a, u) { this.urlSubject = t, this.paramsSubject = n, this.queryParamsSubject = r, this.fragmentSubject = o, this.dataSubject = i, this.outlet = s, this.component = a, this._futureSnapshot = u, this.title = this.dataSubject?.pipe(S(c => c[zn])) ?? E(void 0), this.url = t, this.params = n, this.queryParams = r, this.fragment = o, this.data = i; }
    get routeConfig() { return this._futureSnapshot.routeConfig; }
    get root() { return this._routerState.root; }
    get parent() { return this._routerState.parent(this); }
    get firstChild() { return this._routerState.firstChild(this); }
    get children() { return this._routerState.children(this); }
    get pathFromRoot() { return this._routerState.pathFromRoot(this); }
    get paramMap() { return this._paramMap ??= this.params.pipe(S(t => Qt(t))), this._paramMap; }
    get queryParamMap() { return this._queryParamMap ??= this.queryParams.pipe(S(t => Qt(t))), this._queryParamMap; }
    toString() { return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`; }
};
function Io(e, t, n = "emptyOnly") { let r, { routeConfig: o } = e; return t !== null && (n === "always" || o?.path === "" || !t.component && !t.routeConfig?.loadComponent) ? r = { params: g(g({}, t.params), e.params), data: g(g({}, t.data), e.data), resolve: g(g(g(g({}, e.data), t.data), o?.data), e._resolvedData) } : r = { params: g({}, e.params), data: g({}, e.data), resolve: g(g({}, e.data), e._resolvedData ?? {}) }, o && Ad(o) && (r.resolve[zn] = o.title), r; }
var Yt = class {
    get title() { return this.data?.[zn]; }
    constructor(t, n, r, o, i, s, a, u, c) { this.url = t, this.params = n, this.queryParams = r, this.fragment = o, this.data = i, this.outlet = s, this.component = a, this.routeConfig = u, this._resolve = c; }
    get root() { return this._routerState.root; }
    get parent() { return this._routerState.parent(this); }
    get firstChild() { return this._routerState.firstChild(this); }
    get children() { return this._routerState.children(this); }
    get pathFromRoot() { return this._routerState.pathFromRoot(this); }
    get paramMap() { return this._paramMap ??= Qt(this.params), this._paramMap; }
    get queryParamMap() { return this._queryParamMap ??= Qt(this.queryParams), this._queryParamMap; }
    toString() { let t = this.url.map(r => r.toString()).join("/"), n = this.routeConfig ? this.routeConfig.path : ""; return `Route(url:'${t}', path:'${n}')`; }
}, Co = class extends Do {
    constructor(t, n) { super(n), this.url = t, ha(this, n); }
    toString() { return Rd(this._root); }
};
function ha(e, t) { t.value._routerState = e, t.children.forEach(n => ha(e, n)); }
function Rd(e) { let t = e.children.length > 0 ? ` { ${e.children.map(Rd).join(", ")} } ` : ""; return `${e.value}${t}`; }
function Ls(e) { if (e.snapshot) {
    let t = e.snapshot, n = e._futureSnapshot;
    e.snapshot = n, be(t.queryParams, n.queryParams) || e.queryParamsSubject.next(n.queryParams), t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment), be(t.params, n.params) || e.paramsSubject.next(n.params), sv(t.url, n.url) || e.urlSubject.next(n.url), be(t.data, n.data) || e.dataSubject.next(n.data);
}
else
    e.snapshot = e._futureSnapshot, e.dataSubject.next(e._futureSnapshot.data); }
function oa(e, t) { let n = be(e.params, t.params) && lv(e.url, t.url), r = !e.parent != !t.parent; return n && !r && (!e.parent || oa(e.parent, t.parent)); }
function Ad(e) { return typeof e.title == "string" || e.title === null; }
var Pv = (() => { class e {
    constructor() { this.activated = null, this._activatedRoute = null, this.name = C, this.activateEvents = new Z, this.deactivateEvents = new Z, this.attachEvents = new Z, this.detachEvents = new Z, this.parentContexts = h(So), this.location = h(to), this.changeDetector = h(wn), this.inputBinder = h(pa, { optional: !0 }), this.supportsBindingToComponentInputs = !0; }
    get activatedComponentRef() { return this.activated; }
    ngOnChanges(n) { if (n.name) {
        let { firstChange: r, previousValue: o } = n.name;
        if (r)
            return;
        this.isTrackedInParentContexts(o) && (this.deactivate(), this.parentContexts.onChildOutletDestroyed(o)), this.initializeOutletWithName();
    } }
    ngOnDestroy() { this.isTrackedInParentContexts(this.name) && this.parentContexts.onChildOutletDestroyed(this.name), this.inputBinder?.unsubscribeFromRouteData(this); }
    isTrackedInParentContexts(n) { return this.parentContexts.getContext(n)?.outlet === this; }
    ngOnInit() { this.initializeOutletWithName(); }
    initializeOutletWithName() { if (this.parentContexts.onChildOutletCreated(this.name, this), this.activated)
        return; let n = this.parentContexts.getContext(this.name); n?.route && (n.attachRef ? this.attach(n.attachRef, n.route) : this.activateWith(n.route, n.injector)); }
    get isActivated() { return !!this.activated; }
    get component() { if (!this.activated)
        throw new v(4012, !1); return this.activated.instance; }
    get activatedRoute() { if (!this.activated)
        throw new v(4012, !1); return this._activatedRoute; }
    get activatedRouteData() { return this._activatedRoute ? this._activatedRoute.snapshot.data : {}; }
    detach() { if (!this.activated)
        throw new v(4012, !1); this.location.detach(); let n = this.activated; return this.activated = null, this._activatedRoute = null, this.detachEvents.emit(n.instance), n; }
    attach(n, r) { this.activated = n, this._activatedRoute = r, this.location.insert(n.hostView), this.inputBinder?.bindActivatedRouteToOutletComponent(this), this.attachEvents.emit(n.instance); }
    deactivate() { if (this.activated) {
        let n = this.component;
        this.activated.destroy(), this.activated = null, this._activatedRoute = null, this.deactivateEvents.emit(n);
    } }
    activateWith(n, r) { if (this.isActivated)
        throw new v(4013, !1); this._activatedRoute = n; let o = this.location, s = n.snapshot.component, a = this.parentContexts.getOrCreateContext(this.name).children, u = new ia(n, a, o.injector); this.activated = o.createComponent(s, { index: o.length, injector: u, environmentInjector: r }), this.changeDetector.markForCheck(), this.inputBinder?.bindActivatedRouteToOutletComponent(this), this.activateEvents.emit(this.activated.instance); }
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275dir = Ki({ type: e, selectors: [["router-outlet"]], inputs: { name: "name" }, outputs: { activateEvents: "activate", deactivateEvents: "deactivate", attachEvents: "attach", detachEvents: "detach" }, exportAs: ["outlet"], standalone: !0, features: [Wr] }); }
} return e; })(), ia = class e {
    __ngOutletInjector(t) { return new e(this.route, this.childContexts, t); }
    constructor(t, n, r) { this.route = t, this.childContexts = n, this.parent = r; }
    get(t, n) { return t === Xt ? this.route : t === So ? this.childContexts : this.parent.get(t, n); }
}, pa = new w("");
function Fv(e, t, n) { let r = Hn(e, t._root, n ? n._root : void 0); return new Eo(r, t); }
function Hn(e, t, n) { if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
    let r = n.value;
    r._futureSnapshot = t.value;
    let o = kv(e, t, n);
    return new te(r, o);
}
else {
    if (e.shouldAttach(t.value)) {
        let i = e.retrieve(t.value);
        if (i !== null) {
            let s = i.route;
            return s.value._futureSnapshot = t.value, s.children = t.children.map(a => Hn(e, a)), s;
        }
    }
    let r = Lv(t.value), o = t.children.map(i => Hn(e, i));
    return new te(r, o);
} }
function kv(e, t, n) { return t.children.map(r => { for (let o of n.children)
    if (e.shouldReuseRoute(r.value, o.value.snapshot))
        return Hn(e, r, o); return Hn(e, r); }); }
function Lv(e) { return new Xt(new G(e.url), new G(e.params), new G(e.queryParams), new G(e.fragment), new G(e.data), e.outlet, e.component, e); }
var Un = class {
    constructor(t, n) { this.redirectTo = t, this.navigationBehaviorOptions = n; }
}, xd = "ngNavigationCancelingError";
function wo(e, t) { let { redirectTo: n, navigationBehaviorOptions: r } = kn(t) ? { redirectTo: t, navigationBehaviorOptions: void 0 } : t, o = Od(!1, ne.Redirect); return o.url = n, o.navigationBehaviorOptions = r, o; }
function Od(e, t) { let n = new Error(`NavigationCancelingError: ${e || ""}`); return n[xd] = !0, n.cancellationCode = t, n; }
function jv(e) { return Pd(e) && kn(e.url); }
function Pd(e) { return !!e && e[xd]; }
var Vv = (e, t, n, r) => S(o => (new sa(t, o.targetRouterState, o.currentRouterState, n, r).activate(e), o)), sa = class {
    constructor(t, n, r, o, i) { this.routeReuseStrategy = t, this.futureState = n, this.currState = r, this.forwardEvent = o, this.inputBindingEnabled = i; }
    activate(t) { let n = this.futureState._root, r = this.currState ? this.currState._root : null; this.deactivateChildRoutes(n, r, t), Ls(this.futureState.root), this.activateChildRoutes(n, r, t); }
    deactivateChildRoutes(t, n, r) { let o = qt(n); t.children.forEach(i => { let s = i.value.outlet; this.deactivateRoutes(i, o[s], r), delete o[s]; }), Object.values(o).forEach(i => { this.deactivateRouteAndItsChildren(i, r); }); }
    deactivateRoutes(t, n, r) { let o = t.value, i = n ? n.value : null; if (o === i)
        if (o.component) {
            let s = r.getContext(o.outlet);
            s && this.deactivateChildRoutes(t, n, s.children);
        }
        else
            this.deactivateChildRoutes(t, n, r);
    else
        i && this.deactivateRouteAndItsChildren(n, r); }
    deactivateRouteAndItsChildren(t, n) { t.value.component && this.routeReuseStrategy.shouldDetach(t.value.snapshot) ? this.detachAndStoreRouteSubtree(t, n) : this.deactivateRouteAndOutlet(t, n); }
    detachAndStoreRouteSubtree(t, n) { let r = n.getContext(t.value.outlet), o = r && t.value.component ? r.children : n, i = qt(t); for (let s of Object.values(i))
        this.deactivateRouteAndItsChildren(s, o); if (r && r.outlet) {
        let s = r.outlet.detach(), a = r.children.onOutletDeactivated();
        this.routeReuseStrategy.store(t.value.snapshot, { componentRef: s, route: t, contexts: a });
    } }
    deactivateRouteAndOutlet(t, n) { let r = n.getContext(t.value.outlet), o = r && t.value.component ? r.children : n, i = qt(t); for (let s of Object.values(i))
        this.deactivateRouteAndItsChildren(s, o); r && (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()), r.attachRef = null, r.route = null); }
    activateChildRoutes(t, n, r) { let o = qt(n); t.children.forEach(i => { this.activateRoutes(i, o[i.value.outlet], r), this.forwardEvent(new ea(i.value.snapshot)); }), t.children.length && this.forwardEvent(new Js(t.value.snapshot)); }
    activateRoutes(t, n, r) { let o = t.value, i = n ? n.value : null; if (Ls(o), o === i)
        if (o.component) {
            let s = r.getOrCreateContext(o.outlet);
            this.activateChildRoutes(t, n, s.children);
        }
        else
            this.activateChildRoutes(t, n, r);
    else if (o.component) {
        let s = r.getOrCreateContext(o.outlet);
        if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
            let a = this.routeReuseStrategy.retrieve(o.snapshot);
            this.routeReuseStrategy.store(o.snapshot, null), s.children.onOutletReAttached(a.contexts), s.attachRef = a.componentRef, s.route = a.route.value, s.outlet && s.outlet.attach(a.componentRef, a.route.value), Ls(a.route.value), this.activateChildRoutes(t, null, s.children);
        }
        else
            s.attachRef = null, s.route = o, s.outlet && s.outlet.activateWith(o, s.injector), this.activateChildRoutes(t, null, s.children);
    }
    else
        this.activateChildRoutes(t, null, r); }
}, bo = class {
    constructor(t) { this.path = t, this.route = this.path[this.path.length - 1]; }
}, Kt = class {
    constructor(t, n) { this.component = t, this.route = n; }
};
function Bv(e, t, n) { let r = e._root, o = t ? t._root : null; return Rn(r, o, n, [r.value]); }
function Hv(e) { let t = e.routeConfig ? e.routeConfig.canActivateChild : null; return !t || t.length === 0 ? null : { node: e, guards: t }; }
function tn(e, t) { let n = Symbol(), r = t.get(e, n); return r === n ? typeof e == "function" && !ju(e) ? e : t.get(e) : r; }
function Rn(e, t, n, r, o = { canDeactivateChecks: [], canActivateChecks: [] }) { let i = qt(t); return e.children.forEach(s => { Uv(s, i[s.value.outlet], n, r.concat([s.value]), o), delete i[s.value.outlet]; }), Object.entries(i).forEach(([s, a]) => Pn(a, n.getContext(s), o)), o; }
function Uv(e, t, n, r, o = { canDeactivateChecks: [], canActivateChecks: [] }) { let i = e.value, s = t ? t.value : null, a = n ? n.getContext(e.value.outlet) : null; if (s && i.routeConfig === s.routeConfig) {
    let u = $v(s, i, i.routeConfig.runGuardsAndResolvers);
    u ? o.canActivateChecks.push(new bo(r)) : (i.data = s.data, i._resolvedData = s._resolvedData), i.component ? Rn(e, t, a ? a.children : null, r, o) : Rn(e, t, n, r, o), u && a && a.outlet && a.outlet.isActivated && o.canDeactivateChecks.push(new Kt(a.outlet.component, s));
}
else
    s && Pn(t, a, o), o.canActivateChecks.push(new bo(r)), i.component ? Rn(e, null, a ? a.children : null, r, o) : Rn(e, null, n, r, o); return o; }
function $v(e, t, n) { if (typeof n == "function")
    return n(e, t); switch (n) {
    case "pathParamsChange": return !ct(e.url, t.url);
    case "pathParamsOrQueryParamsChange": return !ct(e.url, t.url) || !be(e.queryParams, t.queryParams);
    case "always": return !0;
    case "paramsOrQueryParamsChange": return !oa(e, t) || !be(e.queryParams, t.queryParams);
    case "paramsChange":
    default: return !oa(e, t);
} }
function Pn(e, t, n) { let r = qt(e), o = e.value; Object.entries(r).forEach(([i, s]) => { o.component ? t ? Pn(s, t.children.getContext(i), n) : Pn(s, null, n) : Pn(s, t, n); }), o.component ? t && t.outlet && t.outlet.isActivated ? n.canDeactivateChecks.push(new Kt(t.outlet.component, o)) : n.canDeactivateChecks.push(new Kt(null, o)) : n.canDeactivateChecks.push(new Kt(null, o)); }
function qn(e) { return typeof e == "function"; }
function Gv(e) { return typeof e == "boolean"; }
function zv(e) { return e && qn(e.canLoad); }
function Wv(e) { return e && qn(e.canActivate); }
function qv(e) { return e && qn(e.canActivateChild); }
function Zv(e) { return e && qn(e.canDeactivate); }
function Yv(e) { return e && qn(e.canMatch); }
function Fd(e) { return e instanceof Se || e?.name === "EmptyError"; }
var fo = Symbol("INITIAL_VALUE");
function en() { return fe(e => hr(e.map(t => t.pipe(_e(1), ti(fo)))).pipe(S(t => { for (let n of t)
    if (n !== !0) {
        if (n === fo)
            return fo;
        if (n === !1 || Kv(n))
            return n;
    } return !0; }), de(t => t !== fo), _e(1))); }
function Kv(e) { return kn(e) || e instanceof Un; }
function Qv(e, t) { return U(n => { let { targetSnapshot: r, currentSnapshot: o, guards: { canActivateChecks: i, canDeactivateChecks: s } } = n; return s.length === 0 && i.length === 0 ? E(k(g({}, n), { guardsResult: !0 })) : Jv(s, r, o, e).pipe(U(a => a && Gv(a) ? Xv(r, i, e, t) : E(a)), S(a => k(g({}, n), { guardsResult: a }))); }); }
function Jv(e, t, n, r) { return H(e).pipe(U(o => oy(o.component, o.route, n, t, r)), Ee(o => o !== !0, !0)); }
function Xv(e, t, n, r) { return H(t).pipe(wt(o => Ct(ty(o.route.parent, r), ey(o.route, r), ry(e, o.path, n), ny(e, o.route, n))), Ee(o => o !== !0, !0)); }
function ey(e, t) { return e !== null && t && t(new Xs(e)), E(!0); }
function ty(e, t) { return e !== null && t && t(new Qs(e)), E(!0); }
function ny(e, t, n) { let r = t.routeConfig ? t.routeConfig.canActivate : null; if (!r || r.length === 0)
    return E(!0); let o = r.map(i => pr(() => { let s = Wn(t) ?? n, a = tn(i, s), u = Wv(a) ? a.canActivate(t, e) : Re(s, () => a(t, e)); return We(u).pipe(Ee()); })); return E(o).pipe(en()); }
function ry(e, t, n) { let r = t[t.length - 1], i = t.slice(0, t.length - 1).reverse().map(s => Hv(s)).filter(s => s !== null).map(s => pr(() => { let a = s.guards.map(u => { let c = Wn(s.node) ?? n, l = tn(u, c), d = qv(l) ? l.canActivateChild(r, e) : Re(c, () => l(r, e)); return We(d).pipe(Ee()); }); return E(a).pipe(en()); })); return E(i).pipe(en()); }
function oy(e, t, n, r, o) { let i = t && t.routeConfig ? t.routeConfig.canDeactivate : null; if (!i || i.length === 0)
    return E(!0); let s = i.map(a => { let u = Wn(t) ?? o, c = tn(a, u), l = Zv(c) ? c.canDeactivate(e, t, n, r) : Re(u, () => c(e, t, n, r)); return We(l).pipe(Ee()); }); return E(s).pipe(en()); }
function iy(e, t, n, r) { let o = t.canLoad; if (o === void 0 || o.length === 0)
    return E(!0); let i = o.map(s => { let a = tn(s, e), u = zv(a) ? a.canLoad(t, n) : Re(e, () => a(t, n)); return We(u); }); return E(i).pipe(en(), kd(r)); }
function kd(e) { return Wo(z(t => { if (typeof t != "boolean")
    throw wo(e, t); }), S(t => t === !0)); }
function sy(e, t, n, r) { let o = t.canMatch; if (!o || o.length === 0)
    return E(!0); let i = o.map(s => { let a = tn(s, e), u = Yv(a) ? a.canMatch(t, n) : Re(e, () => a(t, n)); return We(u); }); return E(i).pipe(en(), kd(r)); }
var $n = class {
    constructor(t) { this.segmentGroup = t || null; }
}, Gn = class extends Error {
    constructor(t) { super(), this.urlTree = t; }
};
function Wt(e) { return It(new $n(e)); }
function ay(e) { return It(new v(4e3, !1)); }
function uy(e) { return It(Od(!1, ne.GuardRejected)); }
var aa = class {
    constructor(t, n) { this.urlSerializer = t, this.urlTree = n; }
    lineralizeSegments(t, n) { let r = [], o = n.root; for (;;) {
        if (r = r.concat(o.segments), o.numberOfChildren === 0)
            return E(r);
        if (o.numberOfChildren > 1 || !o.children[C])
            return ay(`${t.redirectTo}`);
        o = o.children[C];
    } }
    applyRedirectCommands(t, n, r, o, i) { if (typeof n != "string") {
        let a = n, { queryParams: u, fragment: c, routeConfig: l, url: d, outlet: p, params: f, data: m, title: A } = o, B = Re(i, () => a({ params: f, data: m, queryParams: u, fragment: c, routeConfig: l, url: d, outlet: p, title: A }));
        if (B instanceof ke)
            throw new Gn(B);
        n = B;
    } let s = this.applyRedirectCreateUrlTree(n, this.urlSerializer.parse(n), t, r); if (n[0] === "/")
        throw new Gn(s); return s; }
    applyRedirectCreateUrlTree(t, n, r, o) { let i = this.createSegmentGroup(t, n.root, r, o); return new ke(i, this.createQueryParams(n.queryParams, this.urlTree.queryParams), n.fragment); }
    createQueryParams(t, n) { let r = {}; return Object.entries(t).forEach(([o, i]) => { if (typeof i == "string" && i[0] === ":") {
        let a = i.substring(1);
        r[o] = n[a];
    }
    else
        r[o] = i; }), r; }
    createSegmentGroup(t, n, r, o) { let i = this.createSegments(t, n.segments, r, o), s = {}; return Object.entries(n.children).forEach(([a, u]) => { s[a] = this.createSegmentGroup(t, u, r, o); }), new R(i, s); }
    createSegments(t, n, r, o) { return n.map(i => i.path[0] === ":" ? this.findPosParam(t, i, o) : this.findOrReturn(i, r)); }
    findPosParam(t, n, r) { let o = r[n.path.substring(1)]; if (!o)
        throw new v(4001, !1); return o; }
    findOrReturn(t, n) { let r = 0; for (let o of n) {
        if (o.path === t.path)
            return n.splice(r), o;
        r++;
    } return t; }
}, ua = { matched: !1, consumedSegments: [], remainingSegments: [], parameters: {}, positionalParamSegments: {} };
function cy(e, t, n, r, o) { let i = Ld(e, t, n); return i.matched ? (r = Av(t, r), sy(r, t, n, o).pipe(S(s => s === !0 ? i : g({}, ua)))) : E(i); }
function Ld(e, t, n) { if (t.path === "**")
    return ly(n); if (t.path === "")
    return t.pathMatch === "full" && (e.hasChildren() || n.length > 0) ? g({}, ua) : { matched: !0, consumedSegments: [], remainingSegments: n, parameters: {}, positionalParamSegments: {} }; let o = (t.matcher || iv)(n, e, t); if (!o)
    return g({}, ua); let i = {}; Object.entries(o.posParams ?? {}).forEach(([a, u]) => { i[a] = u.path; }); let s = o.consumed.length > 0 ? g(g({}, i), o.consumed[o.consumed.length - 1].parameters) : i; return { matched: !0, consumedSegments: o.consumed, remainingSegments: n.slice(o.consumed.length), parameters: s, positionalParamSegments: o.posParams ?? {} }; }
function ly(e) { return { matched: !0, parameters: e.length > 0 ? md(e).parameters : {}, consumedSegments: e, remainingSegments: [], positionalParamSegments: {} }; }
function fd(e, t, n, r) { return n.length > 0 && hy(e, n, r) ? { segmentGroup: new R(t, fy(r, new R(n, e.children))), slicedSegments: [] } : n.length === 0 && py(e, n, r) ? { segmentGroup: new R(e.segments, dy(e, n, r, e.children)), slicedSegments: n } : { segmentGroup: new R(e.segments, e.children), slicedSegments: n }; }
function dy(e, t, n, r) { let o = {}; for (let i of n)
    if (_o(e, t, i) && !r[ve(i)]) {
        let s = new R([], {});
        o[ve(i)] = s;
    } return g(g({}, r), o); }
function fy(e, t) { let n = {}; n[C] = t; for (let r of e)
    if (r.path === "" && ve(r) !== C) {
        let o = new R([], {});
        n[ve(r)] = o;
    } return n; }
function hy(e, t, n) { return n.some(r => _o(e, t, r) && ve(r) !== C); }
function py(e, t, n) { return n.some(r => _o(e, t, r)); }
function _o(e, t, n) { return (e.hasChildren() || t.length > 0) && n.pathMatch === "full" ? !1 : n.path === ""; }
function gy(e, t, n) { return t.length === 0 && !e.children[n]; }
var ca = class {
};
function my(e, t, n, r, o, i, s = "emptyOnly") { return new la(e, t, n, r, o, s, i).recognize(); }
var vy = 31, la = class {
    constructor(t, n, r, o, i, s, a) { this.injector = t, this.configLoader = n, this.rootComponentType = r, this.config = o, this.urlTree = i, this.paramsInheritanceStrategy = s, this.urlSerializer = a, this.applyRedirects = new aa(this.urlSerializer, this.urlTree), this.absoluteRedirectCount = 0, this.allowRedirects = !0; }
    noMatchError(t) { return new v(4002, `'${t.segmentGroup}'`); }
    recognize() { let t = fd(this.urlTree.root, [], [], this.config).segmentGroup; return this.match(t).pipe(S(({ children: n, rootSnapshot: r }) => { let o = new te(r, n), i = new Co("", o), s = bv(r, [], this.urlTree.queryParams, this.urlTree.fragment); return s.queryParams = this.urlTree.queryParams, i.url = this.urlSerializer.serialize(s), { state: i, tree: s }; })); }
    match(t) { let n = new Yt([], Object.freeze({}), Object.freeze(g({}, this.urlTree.queryParams)), this.urlTree.fragment, Object.freeze({}), C, this.rootComponentType, null, {}); return this.processSegmentGroup(this.injector, this.config, t, C, n).pipe(S(r => ({ children: r, rootSnapshot: n })), je(r => { if (r instanceof Gn)
        return this.urlTree = r.urlTree, this.match(r.urlTree.root); throw r instanceof $n ? this.noMatchError(r) : r; })); }
    processSegmentGroup(t, n, r, o, i) { return r.segments.length === 0 && r.hasChildren() ? this.processChildren(t, n, r, i) : this.processSegment(t, n, r, r.segments, o, !0, i).pipe(S(s => s instanceof te ? [s] : [])); }
    processChildren(t, n, r, o) { let i = []; for (let s of Object.keys(r.children))
        s === "primary" ? i.unshift(s) : i.push(s); return H(i).pipe(wt(s => { let a = r.children[s], u = xv(n, s); return this.processSegmentGroup(t, u, a, s, o); }), ei((s, a) => (s.push(...a), s)), Ve(null), Xo(), U(s => { if (s === null)
        return Wt(r); let a = jd(s); return yy(a), E(a); })); }
    processSegment(t, n, r, o, i, s, a) { return H(n).pipe(wt(u => this.processSegmentAgainstRoute(u._injector ?? t, n, u, r, o, i, s, a).pipe(je(c => { if (c instanceof $n)
        return E(null); throw c; }))), Ee(u => !!u), je(u => { if (Fd(u))
        return gy(r, o, i) ? E(new ca) : Wt(r); throw u; })); }
    processSegmentAgainstRoute(t, n, r, o, i, s, a, u) { return ve(r) !== s && (s === C || !_o(o, i, r)) ? Wt(o) : r.redirectTo === void 0 ? this.matchSegmentAgainstRoute(t, o, r, i, s, u) : this.allowRedirects && a ? this.expandSegmentAgainstRouteUsingRedirect(t, o, n, r, i, s, u) : Wt(o); }
    expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s, a) { let { matched: u, parameters: c, consumedSegments: l, positionalParamSegments: d, remainingSegments: p } = Ld(n, o, i); if (!u)
        return Wt(n); typeof o.redirectTo == "string" && o.redirectTo[0] === "/" && (this.absoluteRedirectCount++, this.absoluteRedirectCount > vy && (this.allowRedirects = !1)); let f = new Yt(i, c, Object.freeze(g({}, this.urlTree.queryParams)), this.urlTree.fragment, hd(o), ve(o), o.component ?? o._loadedComponent ?? null, o, pd(o)), m = Io(f, a, this.paramsInheritanceStrategy); f.params = Object.freeze(m.params), f.data = Object.freeze(m.data); let A = this.applyRedirects.applyRedirectCommands(l, o.redirectTo, d, f, t); return this.applyRedirects.lineralizeSegments(o, A).pipe(U(B => this.processSegment(t, r, n, B.concat(p), s, !1, a))); }
    matchSegmentAgainstRoute(t, n, r, o, i, s) { let a = cy(n, r, o, t, this.urlSerializer); return r.path === "**" && (n.children = {}), a.pipe(fe(u => u.matched ? (t = r._injector ?? t, this.getChildConfig(t, r, o).pipe(fe(({ routes: c }) => { let l = r._loadedInjector ?? t, { parameters: d, consumedSegments: p, remainingSegments: f } = u, m = new Yt(p, d, Object.freeze(g({}, this.urlTree.queryParams)), this.urlTree.fragment, hd(r), ve(r), r.component ?? r._loadedComponent ?? null, r, pd(r)), A = Io(m, s, this.paramsInheritanceStrategy); m.params = Object.freeze(A.params), m.data = Object.freeze(A.data); let { segmentGroup: B, slicedSegments: L } = fd(n, p, f, c); if (L.length === 0 && B.hasChildren())
        return this.processChildren(l, c, B, m).pipe(S(qe => new te(m, qe))); if (c.length === 0 && L.length === 0)
        return E(new te(m, [])); let ye = ve(r) === i; return this.processSegment(l, c, B, L, ye ? C : i, !0, m).pipe(S(qe => new te(m, qe instanceof te ? [qe] : []))); }))) : Wt(n))); }
    getChildConfig(t, n, r) { return n.children ? E({ routes: n.children, injector: t }) : n.loadChildren ? n._loadedRoutes !== void 0 ? E({ routes: n._loadedRoutes, injector: n._loadedInjector }) : iy(t, n, r, this.urlSerializer).pipe(U(o => o ? this.configLoader.loadChildren(t, n).pipe(z(i => { n._loadedRoutes = i.routes, n._loadedInjector = i.injector; })) : uy(n))) : E({ routes: [], injector: t }); }
};
function yy(e) { e.sort((t, n) => t.value.outlet === C ? -1 : n.value.outlet === C ? 1 : t.value.outlet.localeCompare(n.value.outlet)); }
function Dy(e) { let t = e.value.routeConfig; return t && t.path === ""; }
function jd(e) { let t = [], n = new Set; for (let r of e) {
    if (!Dy(r)) {
        t.push(r);
        continue;
    }
    let o = t.find(i => r.value.routeConfig === i.value.routeConfig);
    o !== void 0 ? (o.children.push(...r.children), n.add(o)) : t.push(r);
} for (let r of n) {
    let o = jd(r.children);
    t.push(new te(r.value, o));
} return t.filter(r => !n.has(r)); }
function hd(e) { return e.data || {}; }
function pd(e) { return e.resolve || {}; }
function Ey(e, t, n, r, o, i) { return U(s => my(e, t, n, r, s.extractedUrl, o, i).pipe(S(({ state: a, tree: u }) => k(g({}, s), { targetSnapshot: a, urlAfterRedirects: u })))); }
function Iy(e, t) { return U(n => { let { targetSnapshot: r, guards: { canActivateChecks: o } } = n; if (!o.length)
    return E(n); let i = new Set(o.map(u => u.route)), s = new Set; for (let u of i)
    if (!s.has(u))
        for (let c of Vd(u))
            s.add(c); let a = 0; return H(s).pipe(wt(u => i.has(u) ? Cy(u, r, e, t) : (u.data = Io(u, u.parent, e).resolve, E(void 0))), z(() => a++), bt(1), U(u => a === s.size ? E(n) : J)); }); }
function Vd(e) { let t = e.children.map(n => Vd(n)).flat(); return [e, ...t]; }
function Cy(e, t, n, r) { let o = e.routeConfig, i = e._resolve; return o?.title !== void 0 && !Ad(o) && (i[zn] = o.title), wy(i, e, t, r).pipe(S(s => (e._resolvedData = s, e.data = Io(e, e.parent, n).resolve, null))); }
function wy(e, t, n, r) { let o = Bs(e); if (o.length === 0)
    return E({}); let i = {}; return H(o).pipe(U(s => by(e[s], t, n, r).pipe(Ee(), z(a => { if (a instanceof Un)
    throw wo(new Fn, a); i[s] = a; }))), bt(1), Jo(i), je(s => Fd(s) ? J : It(s))); }
function by(e, t, n, r) { let o = Wn(t) ?? r, i = tn(e, o), s = i.resolve ? i.resolve(t, n) : Re(o, () => i(t, n)); return We(s); }
function js(e) { return fe(t => { let n = e(t); return n ? H(n).pipe(S(() => t)) : E(t); }); }
var Bd = (() => { class e {
    buildTitle(n) { let r, o = n.root; for (; o !== void 0;)
        r = this.getResolvedTitleForRoute(o) ?? r, o = o.children.find(i => i.outlet === C); return r; }
    getResolvedTitleForRoute(n) { return n.data[zn]; }
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: () => h(Sy), providedIn: "root" }); }
} return e; })(), Sy = (() => { class e extends Bd {
    constructor(n) { super(), this.title = n; }
    updateTitle(n) { let r = this.buildTitle(n); r !== void 0 && this.title.setTitle(r); }
    static { this.\u0275fac = function (r) { return new (r || e)(M(ad)); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac, providedIn: "root" }); }
} return e; })(), ga = new w("", { providedIn: "root", factory: () => ({}) }), _y = (() => { class e {
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275cmp = Vt({ type: e, selectors: [["ng-component"]], standalone: !0, features: [Gt], decls: 1, vars: 0, template: function (r, o) { r & 1 && In(0, "router-outlet"); }, dependencies: [Pv], encapsulation: 2 }); }
} return e; })();
function ma(e) { let t = e.children && e.children.map(ma), n = t ? k(g({}, e), { children: t }) : g({}, e); return !n.component && !n.loadComponent && (t || n.loadChildren) && n.outlet && n.outlet !== C && (n.component = _y), n; }
var va = new w(""), My = (() => { class e {
    constructor() { this.componentLoaders = new WeakMap, this.childrenLoaders = new WeakMap, this.compiler = h(Ss); }
    loadComponent(n) { if (this.componentLoaders.get(n))
        return this.componentLoaders.get(n); if (n._loadedComponent)
        return E(n._loadedComponent); this.onLoadStartListener && this.onLoadStartListener(n); let r = We(n.loadComponent()).pipe(S(Hd), z(i => { this.onLoadEndListener && this.onLoadEndListener(n), n._loadedComponent = i; }), on(() => { this.componentLoaders.delete(n); })), o = new Et(r, () => new q).pipe(Dt()); return this.componentLoaders.set(n, o), o; }
    loadChildren(n, r) { if (this.childrenLoaders.get(r))
        return this.childrenLoaders.get(r); if (r._loadedRoutes)
        return E({ routes: r._loadedRoutes, injector: r._loadedInjector }); this.onLoadStartListener && this.onLoadStartListener(r); let i = Ty(r, this.compiler, n, this.onLoadEndListener).pipe(on(() => { this.childrenLoaders.delete(r); })), s = new Et(i, () => new q).pipe(Dt()); return this.childrenLoaders.set(r, s), s; }
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac, providedIn: "root" }); }
} return e; })();
function Ty(e, t, n, r) { return We(e.loadChildren()).pipe(S(Hd), U(o => o instanceof vn || Array.isArray(o) ? E(o) : H(t.compileModuleAsync(o))), S(o => { r && r(e); let i, s, a = !1; return Array.isArray(o) ? (s = o, a = !0) : (i = o.create(n).injector, s = i.get(va, [], { optional: !0, self: !0 }).flat()), { routes: s.map(ma), injector: i }; })); }
function Ny(e) { return e && typeof e == "object" && "default" in e; }
function Hd(e) { return Ny(e) ? e.default : e; }
var ya = (() => { class e {
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: () => h(Ry), providedIn: "root" }); }
} return e; })(), Ry = (() => { class e {
    shouldProcessUrl(n) { return !0; }
    extract(n) { return n; }
    merge(n, r) { return n; }
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac, providedIn: "root" }); }
} return e; })(), Ay = new w("");
var xy = new w(""), Oy = (() => { class e {
    get hasRequestedNavigation() { return this.navigationId !== 0; }
    constructor() { this.currentNavigation = null, this.currentTransition = null, this.lastSuccessfulNavigation = null, this.events = new q, this.transitionAbortSubject = new q, this.configLoader = h(My), this.environmentInjector = h(ae), this.urlSerializer = h(fa), this.rootContexts = h(So), this.location = h(Sn), this.inputBindingEnabled = h(pa, { optional: !0 }) !== null, this.titleStrategy = h(Bd), this.options = h(ga, { optional: !0 }) || {}, this.paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || "emptyOnly", this.urlHandlingStrategy = h(ya), this.createViewTransition = h(Ay, { optional: !0 }), this.navigationErrorHandler = h(xy, { optional: !0 }), this.navigationId = 0, this.afterPreactivation = () => E(void 0), this.rootComponentType = null; let n = o => this.events.next(new Ys(o)), r = o => this.events.next(new Ks(o)); this.configLoader.onLoadEndListener = r, this.configLoader.onLoadStartListener = n; }
    complete() { this.transitions?.complete(); }
    handleNavigationRequest(n) { let r = ++this.navigationId; this.transitions?.next(k(g(g({}, this.transitions.value), n), { id: r })); }
    setupNavigations(n, r, o) { return this.transitions = new G({ id: 0, currentUrlTree: r, currentRawUrl: r, extractedUrl: this.urlHandlingStrategy.extract(r), urlAfterRedirects: this.urlHandlingStrategy.extract(r), rawUrl: r, extras: {}, resolve: () => { }, reject: () => { }, promise: Promise.resolve(!0), source: On, restoredState: null, currentSnapshot: o.snapshot, targetSnapshot: null, currentRouterState: o, targetRouterState: null, guards: { canActivateChecks: [], canDeactivateChecks: [] }, guardsResult: null }), this.transitions.pipe(de(i => i.id !== 0), S(i => k(g({}, i), { extractedUrl: this.urlHandlingStrategy.extract(i.rawUrl) })), fe(i => { let s = !1, a = !1; return E(i).pipe(fe(u => { if (this.navigationId > i.id)
        return this.cancelNavigationTransition(i, "", ne.SupersededByNewNavigation), J; this.currentTransition = i, this.currentNavigation = { id: u.id, initialUrl: u.rawUrl, extractedUrl: u.extractedUrl, targetBrowserUrl: typeof u.extras.browserUrl == "string" ? this.urlSerializer.parse(u.extras.browserUrl) : u.extras.browserUrl, trigger: u.source, extras: u.extras, previousNavigation: this.lastSuccessfulNavigation ? k(g({}, this.lastSuccessfulNavigation), { previousNavigation: null }) : null }; let c = !n.navigated || this.isUpdatingInternalState() || this.isUpdatedBrowserUrl(), l = u.extras.onSameUrlNavigation ?? n.onSameUrlNavigation; if (!c && l !== "reload") {
        let d = "";
        return this.events.next(new dt(u.id, this.urlSerializer.serialize(u.rawUrl), d, Gs.IgnoredSameUrlNavigation)), u.resolve(!1), J;
    } if (this.urlHandlingStrategy.shouldProcessUrl(u.rawUrl))
        return E(u).pipe(fe(d => { let p = this.transitions?.getValue(); return this.events.next(new jn(d.id, this.urlSerializer.serialize(d.extractedUrl), d.source, d.restoredState)), p !== this.transitions?.getValue() ? J : Promise.resolve(d); }), Ey(this.environmentInjector, this.configLoader, this.rootComponentType, n.config, this.urlSerializer, this.paramsInheritanceStrategy), z(d => { i.targetSnapshot = d.targetSnapshot, i.urlAfterRedirects = d.urlAfterRedirects, this.currentNavigation = k(g({}, this.currentNavigation), { finalUrl: d.urlAfterRedirects }); let p = new yo(d.id, this.urlSerializer.serialize(d.extractedUrl), this.urlSerializer.serialize(d.urlAfterRedirects), d.targetSnapshot); this.events.next(p); })); if (c && this.urlHandlingStrategy.shouldProcessUrl(u.currentRawUrl)) {
        let { id: d, extractedUrl: p, source: f, restoredState: m, extras: A } = u, B = new jn(d, this.urlSerializer.serialize(p), f, m);
        this.events.next(B);
        let L = Nd(this.rootComponentType).snapshot;
        return this.currentTransition = i = k(g({}, u), { targetSnapshot: L, urlAfterRedirects: p, extras: k(g({}, A), { skipLocationChange: !1, replaceUrl: !1 }) }), this.currentNavigation.finalUrl = p, E(i);
    }
    else {
        let d = "";
        return this.events.next(new dt(u.id, this.urlSerializer.serialize(u.extractedUrl), d, Gs.IgnoredByUrlHandlingStrategy)), u.resolve(!1), J;
    } }), z(u => { let c = new zs(u.id, this.urlSerializer.serialize(u.extractedUrl), this.urlSerializer.serialize(u.urlAfterRedirects), u.targetSnapshot); this.events.next(c); }), S(u => (this.currentTransition = i = k(g({}, u), { guards: Bv(u.targetSnapshot, u.currentSnapshot, this.rootContexts) }), i)), Qv(this.environmentInjector, u => this.events.next(u)), z(u => { if (i.guardsResult = u.guardsResult, u.guardsResult && typeof u.guardsResult != "boolean")
        throw wo(this.urlSerializer, u.guardsResult); let c = new Ws(u.id, this.urlSerializer.serialize(u.extractedUrl), this.urlSerializer.serialize(u.urlAfterRedirects), u.targetSnapshot, !!u.guardsResult); this.events.next(c); }), de(u => u.guardsResult ? !0 : (this.cancelNavigationTransition(u, "", ne.GuardRejected), !1)), js(u => { if (u.guards.canActivateChecks.length)
        return E(u).pipe(z(c => { let l = new qs(c.id, this.urlSerializer.serialize(c.extractedUrl), this.urlSerializer.serialize(c.urlAfterRedirects), c.targetSnapshot); this.events.next(l); }), fe(c => { let l = !1; return E(c).pipe(Iy(this.paramsInheritanceStrategy, this.environmentInjector), z({ next: () => l = !0, complete: () => { l || this.cancelNavigationTransition(c, "", ne.NoDataFromResolver); } })); }), z(c => { let l = new Zs(c.id, this.urlSerializer.serialize(c.extractedUrl), this.urlSerializer.serialize(c.urlAfterRedirects), c.targetSnapshot); this.events.next(l); })); }), js(u => { let c = l => { let d = []; l.routeConfig?.loadComponent && !l.routeConfig._loadedComponent && d.push(this.configLoader.loadComponent(l.routeConfig).pipe(z(p => { l.component = p; }), S(() => { }))); for (let p of l.children)
        d.push(...c(p)); return d; }; return hr(c(u.targetSnapshot.root)).pipe(Ve(null), _e(1)); }), js(() => this.afterPreactivation()), fe(() => { let { currentSnapshot: u, targetSnapshot: c } = i, l = this.createViewTransition?.(this.environmentInjector, u.root, c.root); return l ? H(l).pipe(S(() => i)) : E(i); }), S(u => { let c = Fv(n.routeReuseStrategy, u.targetSnapshot, u.currentRouterState); return this.currentTransition = i = k(g({}, u), { targetRouterState: c }), this.currentNavigation.targetRouterState = c, i; }), z(() => { this.events.next(new Bn); }), Vv(this.rootContexts, n.routeReuseStrategy, u => this.events.next(u), this.inputBindingEnabled), _e(1), z({ next: u => { s = !0, this.lastSuccessfulNavigation = this.currentNavigation, this.events.next(new lt(u.id, this.urlSerializer.serialize(u.extractedUrl), this.urlSerializer.serialize(u.urlAfterRedirects))), this.titleStrategy?.updateTitle(u.targetRouterState.snapshot), u.resolve(!0); }, complete: () => { s = !0; } }), ni(this.transitionAbortSubject.pipe(z(u => { throw u; }))), on(() => { !s && !a && this.cancelNavigationTransition(i, "", ne.SupersededByNewNavigation), this.currentTransition?.id === i.id && (this.currentNavigation = null, this.currentTransition = null); }), je(u => { if (a = !0, Pd(u))
        this.events.next(new Fe(i.id, this.urlSerializer.serialize(i.extractedUrl), u.message, u.cancellationCode)), jv(u) ? this.events.next(new Jt(u.url, u.navigationBehaviorOptions)) : i.resolve(!1);
    else {
        let c = new Vn(i.id, this.urlSerializer.serialize(i.extractedUrl), u, i.targetSnapshot ?? void 0);
        try {
            let l = Re(this.environmentInjector, () => this.navigationErrorHandler?.(c));
            if (l instanceof Un) {
                let { message: d, cancellationCode: p } = wo(this.urlSerializer, l);
                this.events.next(new Fe(i.id, this.urlSerializer.serialize(i.extractedUrl), d, p)), this.events.next(new Jt(l.redirectTo, l.navigationBehaviorOptions));
            }
            else {
                this.events.next(c);
                let d = n.errorHandler(u);
                i.resolve(!!d);
            }
        }
        catch (l) {
            this.options.resolveNavigationPromiseOnError ? i.resolve(!1) : i.reject(l);
        }
    } return J; })); })); }
    cancelNavigationTransition(n, r, o) { let i = new Fe(n.id, this.urlSerializer.serialize(n.extractedUrl), r, o); this.events.next(i), n.resolve(!1); }
    isUpdatingInternalState() { return this.currentTransition?.extractedUrl.toString() !== this.currentTransition?.currentUrlTree.toString(); }
    isUpdatedBrowserUrl() { let n = this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))), r = this.currentNavigation?.targetBrowserUrl ?? this.currentNavigation?.extractedUrl; return n.toString() !== r?.toString() && !this.currentNavigation?.extras.skipLocationChange; }
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac, providedIn: "root" }); }
} return e; })();
function Py(e) { return e !== On; }
var Fy = (() => { class e {
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: () => h(ky), providedIn: "root" }); }
} return e; })(), da = class {
    shouldDetach(t) { return !1; }
    store(t, n) { }
    shouldAttach(t) { return !1; }
    retrieve(t) { return null; }
    shouldReuseRoute(t, n) { return t.routeConfig === n.routeConfig; }
}, ky = (() => { class e extends da {
    static { this.\u0275fac = (() => { let n; return function (o) { return (n || (n = is(e)))(o || e); }; })(); }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac, providedIn: "root" }); }
} return e; })(), Ud = (() => { class e {
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: () => h(Ly), providedIn: "root" }); }
} return e; })(), Ly = (() => { class e extends Ud {
    constructor() { super(...arguments), this.location = h(Sn), this.urlSerializer = h(fa), this.options = h(ga, { optional: !0 }) || {}, this.canceledNavigationResolution = this.options.canceledNavigationResolution || "replace", this.urlHandlingStrategy = h(ya), this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred", this.currentUrlTree = new ke, this.rawUrlTree = this.currentUrlTree, this.currentPageId = 0, this.lastSuccessfulId = -1, this.routerState = Nd(null), this.stateMemento = this.createStateMemento(); }
    getCurrentUrlTree() { return this.currentUrlTree; }
    getRawUrlTree() { return this.rawUrlTree; }
    restoredState() { return this.location.getState(); }
    get browserPageId() { return this.canceledNavigationResolution !== "computed" ? this.currentPageId : this.restoredState()?.\u0275routerPageId ?? this.currentPageId; }
    getRouterState() { return this.routerState; }
    createStateMemento() { return { rawUrlTree: this.rawUrlTree, currentUrlTree: this.currentUrlTree, routerState: this.routerState }; }
    registerNonRouterCurrentEntryChangeListener(n) { return this.location.subscribe(r => { r.type === "popstate" && n(r.url, r.state); }); }
    handleRouterEvent(n, r) { if (n instanceof jn)
        this.stateMemento = this.createStateMemento();
    else if (n instanceof dt)
        this.rawUrlTree = r.initialUrl;
    else if (n instanceof yo) {
        if (this.urlUpdateStrategy === "eager" && !r.extras.skipLocationChange) {
            let o = this.urlHandlingStrategy.merge(r.finalUrl, r.initialUrl);
            this.setBrowserUrl(r.targetBrowserUrl ?? o, r);
        }
    }
    else
        n instanceof Bn ? (this.currentUrlTree = r.finalUrl, this.rawUrlTree = this.urlHandlingStrategy.merge(r.finalUrl, r.initialUrl), this.routerState = r.targetRouterState, this.urlUpdateStrategy === "deferred" && !r.extras.skipLocationChange && this.setBrowserUrl(r.targetBrowserUrl ?? this.rawUrlTree, r)) : n instanceof Fe && (n.code === ne.GuardRejected || n.code === ne.NoDataFromResolver) ? this.restoreHistory(r) : n instanceof Vn ? this.restoreHistory(r, !0) : n instanceof lt && (this.lastSuccessfulId = n.id, this.currentPageId = this.browserPageId); }
    setBrowserUrl(n, r) { let o = n instanceof ke ? this.urlSerializer.serialize(n) : n; if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
        let i = this.browserPageId, s = g(g({}, r.extras.state), this.generateNgRouterState(r.id, i));
        this.location.replaceState(o, "", s);
    }
    else {
        let i = g(g({}, r.extras.state), this.generateNgRouterState(r.id, this.browserPageId + 1));
        this.location.go(o, "", i);
    } }
    restoreHistory(n, r = !1) { if (this.canceledNavigationResolution === "computed") {
        let o = this.browserPageId, i = this.currentPageId - o;
        i !== 0 ? this.location.historyGo(i) : this.currentUrlTree === n.finalUrl && i === 0 && (this.resetState(n), this.resetUrlToCurrentUrlTree());
    }
    else
        this.canceledNavigationResolution === "replace" && (r && this.resetState(n), this.resetUrlToCurrentUrlTree()); }
    resetState(n) { this.routerState = this.stateMemento.routerState, this.currentUrlTree = this.stateMemento.currentUrlTree, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, n.finalUrl ?? this.rawUrlTree); }
    resetUrlToCurrentUrlTree() { this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)); }
    generateNgRouterState(n, r) { return this.canceledNavigationResolution === "computed" ? { navigationId: n, \u0275routerPageId: r } : { navigationId: n }; }
    static { this.\u0275fac = (() => { let n; return function (o) { return (n || (n = is(e)))(o || e); }; })(); }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac, providedIn: "root" }); }
} return e; })(), An = function (e) { return e[e.COMPLETE = 0] = "COMPLETE", e[e.FAILED = 1] = "FAILED", e[e.REDIRECTING = 2] = "REDIRECTING", e; }(An || {});
function jy(e, t) { e.events.pipe(de(n => n instanceof lt || n instanceof Fe || n instanceof Vn || n instanceof dt), S(n => n instanceof lt || n instanceof dt ? An.COMPLETE : (n instanceof Fe ? n.code === ne.Redirect || n.code === ne.SupersededByNewNavigation : !1) ? An.REDIRECTING : An.FAILED), de(n => n !== An.REDIRECTING), _e(1)).subscribe(() => { t(); }); }
function Vy(e) { throw e; }
var By = { paths: "exact", fragment: "ignored", matrixParams: "ignored", queryParams: "exact" }, Hy = { paths: "subset", fragment: "ignored", matrixParams: "ignored", queryParams: "subset" }, $d = (() => { class e {
    get currentUrlTree() { return this.stateManager.getCurrentUrlTree(); }
    get rawUrlTree() { return this.stateManager.getRawUrlTree(); }
    get events() { return this._events; }
    get routerState() { return this.stateManager.getRouterState(); }
    constructor() { this.disposed = !1, this.console = h(oo), this.stateManager = h(Ud), this.options = h(ga, { optional: !0 }) || {}, this.pendingTasks = h(Bt), this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred", this.navigationTransitions = h(Oy), this.urlSerializer = h(fa), this.location = h(Sn), this.urlHandlingStrategy = h(ya), this._events = new q, this.errorHandler = this.options.errorHandler || Vy, this.navigated = !1, this.routeReuseStrategy = h(Fy), this.onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore", this.config = h(va, { optional: !0 })?.flat() ?? [], this.componentInputBindingEnabled = !!h(pa, { optional: !0 }), this.eventsSubscription = new j, this.resetConfig(this.config), this.navigationTransitions.setupNavigations(this, this.currentUrlTree, this.routerState).subscribe({ error: n => { this.console.warn(n); } }), this.subscribeToNavigationEvents(); }
    subscribeToNavigationEvents() { let n = this.navigationTransitions.events.subscribe(r => { try {
        let o = this.navigationTransitions.currentTransition, i = this.navigationTransitions.currentNavigation;
        if (o !== null && i !== null) {
            if (this.stateManager.handleRouterEvent(r, i), r instanceof Fe && r.code !== ne.Redirect && r.code !== ne.SupersededByNewNavigation)
                this.navigated = !0;
            else if (r instanceof lt)
                this.navigated = !0;
            else if (r instanceof Jt) {
                let s = r.navigationBehaviorOptions, a = this.urlHandlingStrategy.merge(r.url, o.currentRawUrl), u = g({ browserUrl: o.extras.browserUrl, info: o.extras.info, skipLocationChange: o.extras.skipLocationChange, replaceUrl: o.extras.replaceUrl || this.urlUpdateStrategy === "eager" || Py(o.source) }, s);
                this.scheduleNavigation(a, On, null, u, { resolve: o.resolve, reject: o.reject, promise: o.promise });
            }
        }
        $y(r) && this._events.next(r);
    }
    catch (o) {
        this.navigationTransitions.transitionAbortSubject.next(o);
    } }); this.eventsSubscription.add(n); }
    resetRootComponentType(n) { this.routerState.root.component = n, this.navigationTransitions.rootComponentType = n; }
    initialNavigation() { this.setUpLocationChangeListener(), this.navigationTransitions.hasRequestedNavigation || this.navigateToSyncWithBrowser(this.location.path(!0), On, this.stateManager.restoredState()); }
    setUpLocationChangeListener() { this.nonRouterCurrentEntryChangeSubscription ??= this.stateManager.registerNonRouterCurrentEntryChangeListener((n, r) => { setTimeout(() => { this.navigateToSyncWithBrowser(n, "popstate", r); }, 0); }); }
    navigateToSyncWithBrowser(n, r, o) { let i = { replaceUrl: !0 }, s = o?.navigationId ? o : null; if (o) {
        let u = g({}, o);
        delete u.navigationId, delete u.\u0275routerPageId, Object.keys(u).length !== 0 && (i.state = u);
    } let a = this.parseUrl(n); this.scheduleNavigation(a, r, s, i); }
    get url() { return this.serializeUrl(this.currentUrlTree); }
    getCurrentNavigation() { return this.navigationTransitions.currentNavigation; }
    get lastSuccessfulNavigation() { return this.navigationTransitions.lastSuccessfulNavigation; }
    resetConfig(n) { this.config = n.map(ma), this.navigated = !1; }
    ngOnDestroy() { this.dispose(); }
    dispose() { this.navigationTransitions.complete(), this.nonRouterCurrentEntryChangeSubscription && (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(), this.nonRouterCurrentEntryChangeSubscription = void 0), this.disposed = !0, this.eventsSubscription.unsubscribe(); }
    createUrlTree(n, r = {}) { let { relativeTo: o, queryParams: i, fragment: s, queryParamsHandling: a, preserveFragment: u } = r, c = u ? this.currentUrlTree.fragment : s, l = null; switch (a ?? this.options.defaultQueryParamsHandling) {
        case "merge":
            l = g(g({}, this.currentUrlTree.queryParams), i);
            break;
        case "preserve":
            l = this.currentUrlTree.queryParams;
            break;
        default: l = i || null;
    } l !== null && (l = this.removeEmptyProps(l)); let d; try {
        let p = o ? o.snapshot : this.routerState.snapshot.root;
        d = Sd(p);
    }
    catch {
        (typeof n[0] != "string" || n[0][0] !== "/") && (n = []), d = this.currentUrlTree.root;
    } return _d(d, n, l, c ?? null); }
    navigateByUrl(n, r = { skipLocationChange: !1 }) { let o = kn(n) ? n : this.parseUrl(n), i = this.urlHandlingStrategy.merge(o, this.rawUrlTree); return this.scheduleNavigation(i, On, null, r); }
    navigate(n, r = { skipLocationChange: !1 }) { return Uy(n), this.navigateByUrl(this.createUrlTree(n, r), r); }
    serializeUrl(n) { return this.urlSerializer.serialize(n); }
    parseUrl(n) { try {
        return this.urlSerializer.parse(n);
    }
    catch {
        return this.urlSerializer.parse("/");
    } }
    isActive(n, r) { let o; if (r === !0 ? o = g({}, By) : r === !1 ? o = g({}, Hy) : o = r, kn(n))
        return ud(this.currentUrlTree, n, o); let i = this.parseUrl(n); return ud(this.currentUrlTree, i, o); }
    removeEmptyProps(n) { return Object.entries(n).reduce((r, [o, i]) => (i != null && (r[o] = i), r), {}); }
    scheduleNavigation(n, r, o, i, s) { if (this.disposed)
        return Promise.resolve(!1); let a, u, c; s ? (a = s.resolve, u = s.reject, c = s.promise) : c = new Promise((d, p) => { a = d, u = p; }); let l = this.pendingTasks.add(); return jy(this, () => { queueMicrotask(() => this.pendingTasks.remove(l)); }), this.navigationTransitions.handleNavigationRequest({ source: r, restoredState: o, currentUrlTree: this.currentUrlTree, currentRawUrl: this.currentUrlTree, rawUrl: n, extras: i, resolve: a, reject: u, promise: c, currentSnapshot: this.routerState.snapshot, currentRouterState: this.routerState }), c.catch(d => Promise.reject(d)); }
    static { this.\u0275fac = function (r) { return new (r || e); }; }
    static { this.\u0275prov = D({ token: e, factory: e.\u0275fac, providedIn: "root" }); }
} return e; })();
function Uy(e) { for (let t = 0; t < e.length; t++)
    if (e[t] == null)
        throw new v(4008, !1); }
function $y(e) { return !(e instanceof Bn) && !(e instanceof Jt); }
var Gy = new w("");
function Gd(e, ...t) { return Ur([{ provide: va, multi: !0, useValue: e }, [], { provide: Xt, useFactory: zy, deps: [$d] }, { provide: bs, multi: !0, useFactory: Wy }, t.map(n => n.\u0275providers)]); }
function zy(e) { return e.routerState.root; }
function Wy() { let e = h(ot); return t => { let n = e.get(st); if (t !== n.components[0])
    return; let r = e.get($d), o = e.get(qy); e.get(Zy) === 1 && r.initialNavigation(), e.get(Yy, null, b.Optional)?.setUpPreloading(), e.get(Gy, null, b.Optional)?.init(), r.resetRootComponentType(n.componentTypes[0]), o.closed || (o.next(), o.complete(), o.unsubscribe()); }; }
var qy = new w("", { factory: () => new q }), Zy = new w("", { providedIn: "root", factory: () => 1 });
var Yy = new w("");
var zd = [];
var Wd = { providers: [Ll({ eventCoalescing: !0 }), Gd(zd)] };
var Ky = { AFG: 132.53, AFRICA: 547.83, ALB: 24.29, DZA: 634.61, ASM: 611.11, AGO: 174.73, ATG: 611.11, ARG: 353.96, ARM: 264.54, ABW: 561.22, ASEAN: 570.41, ASIA: 591.13, AUS: 556.3, AUT: 110.78, AZE: 671.39, BHS: 660.1, BHR: 904.62, BGD: 691.41, BRB: 605.51, BLR: 441.74, BEL: 138.11, BLZ: 225.81, BEN: 584.07, BTN: 23.33, BOL: 531.69, BIH: 600.94, BWA: 847.91, BRA: 96.4, BRN: 893.91, BGR: 335.33, BFA: 467.53, BDI: 250, CPV: 558.14, KHM: 417.71, CMR: 305.42, CAN: 165.15, CYM: 642.86, CAF: 0, TCD: 628.57, CHL: 291.11, CHN: 583.61, COL: 259.51, COM: 642.86, COG: 700, COD: 24.46, COK: 250, CRI: 53.38, CIV: 393.89, HRV: 204.96, CUB: 637.61, CYP: 526.02, CZE: 449.72, DNK: 151.65, DJI: 692.31, DMA: 529.41, DOM: 580.78, ECU: 166.91, EGY: 574.04, SLV: 224.76, GNQ: 591.84, ERI: 631.58, EST: 416.67, SWZ: 172.41, ETH: 24.64, EU: 243.89, EUROPE: 302.27, FLK: 500, FRO: 404.76, FJI: 288.46, FIN: 79.12, FRA: 56.02, GUF: 217.82, PYF: 442.86, G20: 477.87, G7: 341.49, GAB: 491.6, GMB: 666.67, GEO: 167.59, DEU: 381.41, GHA: 484, GRC: 336.57, GRL: 178.57, GRD: 640, GLP: 500, GUM: 622.86, GTM: 328.27, GIN: 236.84, GNB: 625, GUY: 640.35, HTI: 567.31, HND: 282.27, HKG: 699.5, HUN: 204.01, ISL: 27.68, IND: 713.01, IDN: 682.43, IRN: 641.73, IRQ: 688.81, IRL: 282.98, ISR: 582.93, ITA: 330.72, JAM: 555.56, JPN: 493.59, JOR: 540.92, KAZ: 821.9, KEN: 71.2, KIR: 666.67, XKX: 894.65, KWT: 649.16, KGZ: 147.29, LAO: 265.51, "LATIN AMERICA AND CARIBBEAN": 256.03, LVA: 123.99, LBN: 599.01, LSO: 20, LBR: 227.85, LBY: 818.69, LTU: 160.07, LUX: 105.26, MAC: 448.98, MDG: 436.44, MWI: 66.67, MYS: 607.88, MDV: 611.77, MLI: 408, MLT: 444.03, MTQ: 523.18, MRT: 464.71, MUS: 632.48, MEX: 492.34, "MIDDLE EAST": 643.04, MDA: 643.46, MNG: 775.31, MNE: 418.09, MSR: 1e3, MAR: 624.45, MOZ: 135.65, MMR: 436.92, NAM: 59.26, NRU: 750, NPL: 24.44, NLD: 268.48, NCL: 660.58, NZL: 112.76, NIC: 265.12, NER: 670.89, NGA: 523.25, "NORTH AMERICA": 343.03, PRK: 389.59, MKD: 539.55, NOR: 30.05, OCEANIA: 495.74, OECD: 341.31, OMN: 564.55, PAK: 440.61, PSE: 516.13, PAN: 161.68, PNG: 507.25, PRY: 24.31, PER: 266.48, POL: 661.93, PRT: 165.55, PRI: 677.96, QAT: 602.5, REU: 572.82, ROU: 240.58, RUS: 445.02, RWA: 316.33, KNA: 636.36, LCA: 666.67, SPM: 600, VCT: 529.41, WSM: 473.68, STP: 642.86, SAU: 696.31, SEN: 511.6, SRB: 648.2, SYC: 564.52, SLE: 50, SGP: 470.78, SVK: 116.77, SVN: 231.28, SLB: 700, SOM: 578.95, ZAF: 709.69, KOR: 432.11, SSD: 629.03, ESP: 174.05, LKA: 509.78, SDN: 263.16, SUR: 349.28, SWE: 40.7, CHE: 34.7, SYR: 701.66, TWN: 644.36, TJK: 116.86, TZA: 339.25, THA: 549.85, PHL: 610.74, TGO: 443.18, TON: 625, TTO: 681.53, TUN: 563.96, TUR: 464.59, TKM: 1306.03, TCA: 653.85, UGA: 44.53, UKR: 256.21, ARE: 492.7, GBR: 228.25, USA: 369.53, URY: 128.79, UZB: 1167.6, VUT: 571.43, VEN: 185.8, VNM: 472.47, VGB: 647.06, VIR: 632.35, WORLD: 481.63, YEM: 566.1, ZMB: 111.97, ZWE: 297.87 }, Qy = "average", Mo = { data: Ky, type: Qy };
var Zd = Mo.data.WORLD;
var To = { OPERATIONAL_KWH_PER_GB_DATACENTER: .055, OPERATIONAL_KWH_PER_GB_NETWORK: .059, OPERATIONAL_KWH_PER_GB_DEVICE: .08, EMBODIED_KWH_PER_GB_DATACENTER: .012, EMBODIED_KWH_PER_GB_NETWORK: .013, EMBODIED_KWH_PER_GB_DEVICE: .081, GLOBAL_GRID_INTENSITY: 494 };
var K0 = To.GLOBAL_GRID_INTENSITY;
function Da(e = "") { return { "User-Agent": `co2js/0.16.2 ${e}` }; }
var { OPERATIONAL_KWH_PER_GB_DATACENTER: l_, OPERATIONAL_KWH_PER_GB_NETWORK: d_, OPERATIONAL_KWH_PER_GB_DEVICE: f_, EMBODIED_KWH_PER_GB_DATACENTER: h_, EMBODIED_KWH_PER_GB_NETWORK: p_, EMBODIED_KWH_PER_GB_DEVICE: g_, GLOBAL_GRID_INTENSITY: m_ } = To;
var nD = Object.getOwnPropertyNames, rD = (e, t) => function () { return t || (0, e[nD(e)[0]])((t = { exports: {} }).exports, t), t.exports; }, oD = rD({ "src/hosting-json.js"(e, t) { function n(c, l) { return ht(this, null, function* () { return typeof c == "string" ? r(c, l) : i(c, l); }); } function r(c, l) { return l.indexOf(c) > -1; } function o(c) { return Object.entries(c).filter(([p, f]) => f.green).map(([p, f]) => f.url); } function i(c, l) { let d = []; for (let p of c)
        l.indexOf(p) > -1 && d.push(p); return d; } function s(c, l) { return typeof c == "string" ? a(c, l) : u(c, l); } function a(c, l) { return l.indexOf(c) > -1 ? c : { url: c, green: !1 }; } function u(c, l) { let d = {}; for (let p of c)
        d[p] = a(p, l); return d; } t.exports = { check: n, greenDomainsFromResults: o, find: s }; } }), Yd = oD();
function iD(e, t) { let n = typeof t == "string" ? { userAgentIdentifier: t } : t; if (n?.db && n.verbose)
    throw new Error("verbose mode cannot be used with a local lookup database"); return typeof e == "string" ? sD(e, n) : aD(e, n); }
function sD(n) { return ht(this, arguments, function* (e, t = {}) { let r = yield fetch(`https://api.thegreenwebfoundation.org/greencheck/${e}`, { headers: Da(t.userAgentIdentifier) }); if (t?.db)
    return Yd.check(e, t.db); let o = yield r.json(); return t.verbose ? o : o.green; }); }
function aD(n) { return ht(this, arguments, function* (e, t = {}) { try {
    let r = "https://api.thegreenwebfoundation.org/v2/greencheckmulti", o = JSON.stringify(e), s = yield (yield fetch(`${r}/${o}`, { headers: Da(t.userAgentIdentifier) })).json();
    return t.verbose ? s : uD(s);
}
catch {
    return t.verbose ? {} : [];
} }); }
function uD(e) { return Object.entries(e).filter(([r, o]) => o.green).map(([r, o]) => o.url); }
var Kd = { check: iD };
function cD(e, t) { return Kd.check(e, t); }
var Ea = cD;
var No = class e {
    domain = "rabobank.nl";
    getHostStatus() { let t = Ea.check(this.domain, "gcob-co2-check"); return console.log(t), t; }
    static \u0275fac = function (n) { return new (n || e); };
    static \u0275cmp = Vt({ type: e, selectors: [["app-host"]], standalone: !0, features: [Gt], decls: 7, vars: 2, consts: [[1, "root"], [1, "title"], [1, "count"], [1, "description"]], template: function (n, r) { n & 1 && (Ut(0, "div", 0)(1, "div", 1), no(2, "Is our host green?"), $t(), Ut(3, "div", 2), no(4), $t(), Ut(5, "div", 3), no(6), $t()()), n & 2 && (ms(4), ws(r.getHostStatus()), ms(2), ro("Check if the host where your domain ", r.domain, " is green! ")); } });
};
var Ro = class e {
    title = "gcob-ui-co2";
    static \u0275fac = function (n) { return new (n || e); };
    static \u0275cmp = Vt({ type: e, selectors: [["app-root"]], standalone: !0, features: [Gt], decls: 1, vars: 0, template: function (n, r) { n & 1 && In(0, "app-host"); }, dependencies: [No] });
};
sd(Ro, Wd).catch(e => console.error(e));
//# sourceMappingURL=main-QHC2LO7U.js.map