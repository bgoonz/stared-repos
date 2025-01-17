(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    0: function (t, e, n) {
      t.exports = n("zUnb");
    },
    zUnb: function (t, e, n) {
      "use strict";
      function r(t) {
        return "function" == typeof t;
      }
      n.r(e);
      let s = !1;
      const i = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const t = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                t.stack
            );
          } else
            s &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          s = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return s;
        },
      };
      function o(t) {
        setTimeout(() => {
          throw t;
        }, 0);
      }
      const a = {
          closed: !0,
          next(t) {},
          error(t) {
            if (i.useDeprecatedSynchronousErrorHandling) throw t;
            o(t);
          },
          complete() {},
        },
        l = (() =>
          Array.isArray || ((t) => t && "number" == typeof t.length))();
      function c(t) {
        return null !== t && "object" == typeof t;
      }
      const u = (() => {
        function t(t) {
          return (
            Error.call(this),
            (this.message = t
              ? `${t.length} errors occurred during unsubscription:\n${t
                  .map((t, e) => `${e + 1}) ${t.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = t),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      let h = (() => {
        class t {
          constructor(t) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              t && (this._unsubscribe = t);
          }
          unsubscribe() {
            let e;
            if (this.closed) return;
            let {
              _parentOrParents: n,
              _unsubscribe: s,
              _subscriptions: i,
            } = this;
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              n instanceof t)
            )
              n.remove(this);
            else if (null !== n)
              for (let t = 0; t < n.length; ++t) n[t].remove(this);
            if (r(s))
              try {
                s.call(this);
              } catch (o) {
                e = o instanceof u ? d(o.errors) : [o];
              }
            if (l(i)) {
              let t = -1,
                n = i.length;
              for (; ++t < n; ) {
                const n = i[t];
                if (c(n))
                  try {
                    n.unsubscribe();
                  } catch (o) {
                    (e = e || []),
                      o instanceof u ? (e = e.concat(d(o.errors))) : e.push(o);
                  }
              }
            }
            if (e) throw new u(e);
          }
          add(e) {
            let n = e;
            if (!e) return t.EMPTY;
            switch (typeof e) {
              case "function":
                n = new t(e);
              case "object":
                if (
                  n === this ||
                  n.closed ||
                  "function" != typeof n.unsubscribe
                )
                  return n;
                if (this.closed) return n.unsubscribe(), n;
                if (!(n instanceof t)) {
                  const e = n;
                  (n = new t()), (n._subscriptions = [e]);
                }
                break;
              default:
                throw new Error(
                  "unrecognized teardown " + e + " added to Subscription."
                );
            }
            let { _parentOrParents: r } = n;
            if (null === r) n._parentOrParents = this;
            else if (r instanceof t) {
              if (r === this) return n;
              n._parentOrParents = [r, this];
            } else {
              if (-1 !== r.indexOf(this)) return n;
              r.push(this);
            }
            const s = this._subscriptions;
            return null === s ? (this._subscriptions = [n]) : s.push(n), n;
          }
          remove(t) {
            const e = this._subscriptions;
            if (e) {
              const n = e.indexOf(t);
              -1 !== n && e.splice(n, 1);
            }
          }
        }
        return (
          (t.EMPTY = (function (t) {
            return (t.closed = !0), t;
          })(new t())),
          t
        );
      })();
      function d(t) {
        return t.reduce((t, e) => t.concat(e instanceof u ? e.errors : e), []);
      }
      const p = (() =>
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random())();
      class f extends h {
        constructor(t, e, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = a;
              break;
            case 1:
              if (!t) {
                this.destination = a;
                break;
              }
              if ("object" == typeof t) {
                t instanceof f
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                    (this.destination = t),
                    t.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new g(this, t)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new g(this, t, e, n));
          }
        }
        [p]() {
          return this;
        }
        static create(t, e, n) {
          const r = new f(t, e, n);
          return (r.syncErrorThrowable = !1), r;
        }
        next(t) {
          this.isStopped || this._next(t);
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: t } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          );
        }
      }
      class g extends f {
        constructor(t, e, n, s) {
          let i;
          super(), (this._parentSubscriber = t);
          let o = this;
          r(e)
            ? (i = e)
            : e &&
              ((i = e.next),
              (n = e.error),
              (s = e.complete),
              e !== a &&
                ((o = Object.create(e)),
                r(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = i),
            (this._error = n),
            (this._complete = s);
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: e } = this;
            i.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this,
              { useDeprecatedSynchronousErrorHandling: n } = i;
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (e.syncErrorThrowable)
              n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : o(t),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw t;
              o(t);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this;
            if (this._complete) {
              const e = () => this._complete.call(this._context);
              i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e);
          } catch (n) {
            if ((this.unsubscribe(), i.useDeprecatedSynchronousErrorHandling))
              throw n;
            o(n);
          }
        }
        __tryOrSetError(t, e, n) {
          if (!i.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            e.call(this._context, n);
          } catch (r) {
            return i.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = r), (t.syncErrorThrown = !0), !0)
              : (o(r), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: t } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            t.unsubscribe();
        }
      }
      const m = (() =>
        ("function" == typeof Symbol && Symbol.observable) || "@@observable")();
      function y(t) {
        return t;
      }
      function v(...t) {
        return _(t);
      }
      function _(t) {
        return 0 === t.length
          ? y
          : 1 === t.length
          ? t[0]
          : function (e) {
              return t.reduce((t, e) => e(t), e);
            };
      }
      let b = (() => {
        class t {
          constructor(t) {
            (this._isScalar = !1), t && (this._subscribe = t);
          }
          lift(e) {
            const n = new t();
            return (n.source = this), (n.operator = e), n;
          }
          subscribe(t, e, n) {
            const { operator: r } = this,
              s = (function (t, e, n) {
                if (t) {
                  if (t instanceof f) return t;
                  if (t[p]) return t[p]();
                }
                return t || e || n ? new f(t, e, n) : new f(a);
              })(t, e, n);
            if (
              (s.add(
                r
                  ? r.call(s, this.source)
                  : this.source ||
                    (i.useDeprecatedSynchronousErrorHandling &&
                      !s.syncErrorThrowable)
                  ? this._subscribe(s)
                  : this._trySubscribe(s)
              ),
              i.useDeprecatedSynchronousErrorHandling &&
                s.syncErrorThrowable &&
                ((s.syncErrorThrowable = !1), s.syncErrorThrown))
            )
              throw s.syncErrorValue;
            return s;
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              i.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: r } = t;
                    if (e || r) return !1;
                    t = n && n instanceof f ? n : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }
          forEach(t, e) {
            return new (e = w(e))((e, n) => {
              let r;
              r = this.subscribe(
                (e) => {
                  try {
                    t(e);
                  } catch (s) {
                    n(s), r && r.unsubscribe();
                  }
                },
                n,
                e
              );
            });
          }
          _subscribe(t) {
            const { source: e } = this;
            return e && e.subscribe(t);
          }
          [m]() {
            return this;
          }
          pipe(...t) {
            return 0 === t.length ? this : _(t)(this);
          }
          toPromise(t) {
            return new (t = w(t))((t, e) => {
              let n;
              this.subscribe(
                (t) => (n = t),
                (t) => e(t),
                () => t(n)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function w(t) {
        if ((t || (t = i.Promise || Promise), !t))
          throw new Error("no Promise impl found");
        return t;
      }
      const C = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class x extends h {
        constructor(t, e) {
          super(),
            (this.subject = t),
            (this.subscriber = e),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const t = this.subject,
            e = t.observers;
          if (
            ((this.subject = null),
            !e || 0 === e.length || t.isStopped || t.closed)
          )
            return;
          const n = e.indexOf(this.subscriber);
          -1 !== n && e.splice(n, 1);
        }
      }
      class S extends f {
        constructor(t) {
          super(t), (this.destination = t);
        }
      }
      let E = (() => {
        class t extends b {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [p]() {
            return new S(this);
          }
          lift(t) {
            const e = new k(this, this);
            return (e.operator = t), e;
          }
          next(t) {
            if (this.closed) throw new C();
            if (!this.isStopped) {
              const { observers: e } = this,
                n = e.length,
                r = e.slice();
              for (let s = 0; s < n; s++) r[s].next(t);
            }
          }
          error(t) {
            if (this.closed) throw new C();
            (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
            const { observers: e } = this,
              n = e.length,
              r = e.slice();
            for (let s = 0; s < n; s++) r[s].error(t);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new C();
            this.isStopped = !0;
            const { observers: t } = this,
              e = t.length,
              n = t.slice();
            for (let r = 0; r < e; r++) n[r].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(t) {
            if (this.closed) throw new C();
            return super._trySubscribe(t);
          }
          _subscribe(t) {
            if (this.closed) throw new C();
            return this.hasError
              ? (t.error(this.thrownError), h.EMPTY)
              : this.isStopped
              ? (t.complete(), h.EMPTY)
              : (this.observers.push(t), new x(this, t));
          }
          asObservable() {
            const t = new b();
            return (t.source = this), t;
          }
        }
        return (t.create = (t, e) => new k(t, e)), t;
      })();
      class k extends E {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          const { destination: e } = this;
          e && e.next && e.next(t);
        }
        error(t) {
          const { destination: e } = this;
          e && e.error && this.destination.error(t);
        }
        complete() {
          const { destination: t } = this;
          t && t.complete && this.destination.complete();
        }
        _subscribe(t) {
          const { source: e } = this;
          return e ? this.source.subscribe(t) : h.EMPTY;
        }
      }
      function P(t) {
        return t && "function" == typeof t.schedule;
      }
      class O extends f {
        constructor(t, e, n) {
          super(),
            (this.parent = t),
            (this.outerValue = e),
            (this.outerIndex = n),
            (this.index = 0);
        }
        _next(t) {
          this.parent.notifyNext(
            this.outerValue,
            t,
            this.outerIndex,
            this.index++,
            this
          );
        }
        _error(t) {
          this.parent.notifyError(t, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      const A = (t) => (e) => {
        for (let n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
        e.complete();
      };
      function I() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      const T = I(),
        M = (t) => t && "number" == typeof t.length && "function" != typeof t;
      function D(t) {
        return (
          !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        );
      }
      const R = (t) => {
        if (t && "function" == typeof t[m])
          return (
            (r = t),
            (t) => {
              const e = r[m]();
              if ("function" != typeof e.subscribe)
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              return e.subscribe(t);
            }
          );
        if (M(t)) return A(t);
        if (D(t))
          return (
            (n = t),
            (t) => (
              n
                .then(
                  (e) => {
                    t.closed || (t.next(e), t.complete());
                  },
                  (e) => t.error(e)
                )
                .then(null, o),
              t
            )
          );
        if (t && "function" == typeof t[T])
          return (
            (e = t),
            (t) => {
              const n = e[T]();
              for (;;) {
                const e = n.next();
                if (e.done) {
                  t.complete();
                  break;
                }
                if ((t.next(e.value), t.closed)) break;
              }
              return (
                "function" == typeof n.return &&
                  t.add(() => {
                    n.return && n.return();
                  }),
                t
              );
            }
          );
        {
          const e = c(t) ? "an invalid object" : `'${t}'`;
          throw new TypeError(
            `You provided ${e} where a stream was expected.` +
              " You can provide an Observable, Promise, Array, or Iterable."
          );
        }
        var e, n, r;
      };
      function N(t, e, n, r, s = new O(t, n, r)) {
        if (!s.closed) return e instanceof b ? e.subscribe(s) : R(e)(s);
      }
      class V extends f {
        notifyNext(t, e, n, r, s) {
          this.destination.next(e);
        }
        notifyError(t, e) {
          this.destination.error(t);
        }
        notifyComplete(t) {
          this.destination.complete();
        }
      }
      function U(t, e) {
        return function (n) {
          if ("function" != typeof t)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return n.lift(new L(t, e));
        };
      }
      class L {
        constructor(t, e) {
          (this.project = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new F(t, this.project, this.thisArg));
        }
      }
      class F extends f {
        constructor(t, e, n) {
          super(t),
            (this.project = e),
            (this.count = 0),
            (this.thisArg = n || this);
        }
        _next(t) {
          let e;
          try {
            e = this.project.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      function j(t, e) {
        return new b((n) => {
          const r = new h();
          let s = 0;
          return (
            r.add(
              e.schedule(function () {
                s !== t.length
                  ? (n.next(t[s++]), n.closed || r.add(this.schedule()))
                  : n.complete();
              })
            ),
            r
          );
        });
      }
      function H(t, e) {
        return e
          ? (function (t, e) {
              if (null != t) {
                if (
                  (function (t) {
                    return t && "function" == typeof t[m];
                  })(t)
                )
                  return (function (t, e) {
                    return new b((n) => {
                      const r = new h();
                      return (
                        r.add(
                          e.schedule(() => {
                            const s = t[m]();
                            r.add(
                              s.subscribe({
                                next(t) {
                                  r.add(e.schedule(() => n.next(t)));
                                },
                                error(t) {
                                  r.add(e.schedule(() => n.error(t)));
                                },
                                complete() {
                                  r.add(e.schedule(() => n.complete()));
                                },
                              })
                            );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (D(t))
                  return (function (t, e) {
                    return new b((n) => {
                      const r = new h();
                      return (
                        r.add(
                          e.schedule(() =>
                            t.then(
                              (t) => {
                                r.add(
                                  e.schedule(() => {
                                    n.next(t),
                                      r.add(e.schedule(() => n.complete()));
                                  })
                                );
                              },
                              (t) => {
                                r.add(e.schedule(() => n.error(t)));
                              }
                            )
                          )
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (M(t)) return j(t, e);
                if (
                  (function (t) {
                    return t && "function" == typeof t[T];
                  })(t) ||
                  "string" == typeof t
                )
                  return (function (t, e) {
                    if (!t) throw new Error("Iterable cannot be null");
                    return new b((n) => {
                      const r = new h();
                      let s;
                      return (
                        r.add(() => {
                          s && "function" == typeof s.return && s.return();
                        }),
                        r.add(
                          e.schedule(() => {
                            (s = t[T]()),
                              r.add(
                                e.schedule(function () {
                                  if (n.closed) return;
                                  let t, e;
                                  try {
                                    const n = s.next();
                                    (t = n.value), (e = n.done);
                                  } catch (r) {
                                    return void n.error(r);
                                  }
                                  e
                                    ? n.complete()
                                    : (n.next(t), this.schedule());
                                })
                              );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
              }
              throw new TypeError(
                ((null !== t && typeof t) || t) + " is not observable"
              );
            })(t, e)
          : t instanceof b
          ? t
          : new b(R(t));
      }
      function $(t, e, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof e
          ? (r) =>
              r.pipe(
                $((n, r) => H(t(n, r)).pipe(U((t, s) => e(n, t, r, s))), n)
              )
          : ("number" == typeof e && (n = e), (e) => e.lift(new z(t, n)));
      }
      class z {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          (this.project = t), (this.concurrent = e);
        }
        call(t, e) {
          return e.subscribe(new G(t, this.project, this.concurrent));
        }
      }
      class G extends V {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = e),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(t) {
          this.active < this.concurrent
            ? this._tryNext(t)
            : this.buffer.push(t);
        }
        _tryNext(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.active++, this._innerSub(e, t, n);
        }
        _innerSub(t, e, n) {
          const r = new O(this, e, n),
            s = this.destination;
          s.add(r);
          const i = N(this, t, void 0, void 0, r);
          i !== r && s.add(i);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(t, e, n, r, s) {
          this.destination.next(e);
        }
        notifyComplete(t) {
          const e = this.buffer;
          this.remove(t),
            this.active--,
            e.length > 0
              ? this._next(e.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function B(t = Number.POSITIVE_INFINITY) {
        return $(y, t);
      }
      function q(t, e) {
        return e ? j(t, e) : new b(A(t));
      }
      function W() {
        return function (t) {
          return t.lift(new Z(t));
        };
      }
      class Z {
        constructor(t) {
          this.connectable = t;
        }
        call(t, e) {
          const { connectable: n } = this;
          n._refCount++;
          const r = new Q(t, n),
            s = e.subscribe(r);
          return r.closed || (r.connection = n.connect()), s;
        }
      }
      class Q extends f {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _unsubscribe() {
          const { connectable: t } = this;
          if (!t) return void (this.connection = null);
          this.connectable = null;
          const e = t._refCount;
          if (e <= 0) return void (this.connection = null);
          if (((t._refCount = e - 1), e > 1))
            return void (this.connection = null);
          const { connection: n } = this,
            r = t._connection;
          (this.connection = null), !r || (n && r !== n) || r.unsubscribe();
        }
      }
      class Y extends b {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (t && !t.isStopped) || (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let t = this._connection;
          return (
            t ||
              ((this._isComplete = !1),
              (t = this._connection = new h()),
              t.add(this.source.subscribe(new J(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = h.EMPTY))),
            t
          );
        }
        refCount() {
          return W()(this);
        }
      }
      const K = (() => {
        const t = Y.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: t._subscribe },
          _isComplete: { value: t._isComplete, writable: !0 },
          getSubject: { value: t.getSubject },
          connect: { value: t.connect },
          refCount: { value: t.refCount },
        };
      })();
      class J extends S {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _error(t) {
          this._unsubscribe(), super._error(t);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const t = this.connectable;
          if (t) {
            this.connectable = null;
            const e = t._connection;
            (t._refCount = 0),
              (t._subject = null),
              (t._connection = null),
              e && e.unsubscribe();
          }
        }
      }
      function X() {
        return new E();
      }
      function tt(t) {
        return { toString: t }.toString();
      }
      function et(t, e, n) {
        return tt(() => {
          const r = (function (t) {
            return function (...e) {
              if (t) {
                const n = t(...e);
                for (const t in n) this[t] = n[t];
              }
            };
          })(e);
          function s(...t) {
            if (this instanceof s) return r.apply(this, t), this;
            const e = new s(...t);
            return (n.annotation = e), n;
            function n(t, n, r) {
              const s = t.hasOwnProperty("__parameters__")
                ? t.__parameters__
                : Object.defineProperty(t, "__parameters__", { value: [] })
                    .__parameters__;
              for (; s.length <= r; ) s.push(null);
              return (s[r] = s[r] || []).push(e), t;
            }
          }
          return (
            n && (s.prototype = Object.create(n.prototype)),
            (s.prototype.ngMetadataName = t),
            (s.annotationCls = s),
            s
          );
        });
      }
      const nt = et("Inject", (t) => ({ token: t })),
        rt = et("Optional"),
        st = et("Self"),
        it = et("SkipSelf");
      var ot = (function (t) {
        return (
          (t[(t.Default = 0)] = "Default"),
          (t[(t.Host = 1)] = "Host"),
          (t[(t.Self = 2)] = "Self"),
          (t[(t.SkipSelf = 4)] = "SkipSelf"),
          (t[(t.Optional = 8)] = "Optional"),
          t
        );
      })({});
      function at(t) {
        for (let e in t) if (t[e] === at) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function lt(t, e) {
        for (const n in e)
          e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n]);
      }
      function ct(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function ut(t) {
        return {
          factory: t.factory,
          providers: t.providers || [],
          imports: t.imports || [],
        };
      }
      function ht(t) {
        return dt(t, t[ft]) || dt(t, t[yt]);
      }
      function dt(t, e) {
        return e && e.token === t ? e : null;
      }
      function pt(t) {
        return t && (t.hasOwnProperty(gt) || t.hasOwnProperty(vt))
          ? t[gt]
          : null;
      }
      const ft = at({ "\u0275prov": at }),
        gt = at({ "\u0275inj": at }),
        mt = at({ "\u0275provFallback": at }),
        yt = at({ ngInjectableDef: at }),
        vt = at({ ngInjectorDef: at });
      function _t(t) {
        if ("string" == typeof t) return t;
        if (Array.isArray(t)) return "[" + t.map(_t).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return `${t.overriddenName}`;
        if (t.name) return `${t.name}`;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      function bt(t, e) {
        return null == t || "" === t
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? t
          : t + " " + e;
      }
      const wt = at({ __forward_ref__: at });
      function Ct(t) {
        return (
          (t.__forward_ref__ = Ct),
          (t.toString = function () {
            return _t(this());
          }),
          t
        );
      }
      function xt(t) {
        return St(t) ? t() : t;
      }
      function St(t) {
        return (
          "function" == typeof t &&
          t.hasOwnProperty(wt) &&
          t.__forward_ref__ === Ct
        );
      }
      const Et = "undefined" != typeof globalThis && globalThis,
        kt = "undefined" != typeof window && window,
        Pt =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Ot = "undefined" != typeof global && global,
        At = Et || Ot || kt || Pt,
        It = at({ "\u0275cmp": at }),
        Tt = at({ "\u0275dir": at }),
        Mt = at({ "\u0275pipe": at }),
        Dt = at({ "\u0275mod": at }),
        Rt = at({ "\u0275loc": at }),
        Nt = at({ "\u0275fac": at }),
        Vt = at({ __NG_ELEMENT_ID__: at });
      class Ut {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = ct({
                  token: this,
                  providedIn: e.providedIn || "root",
                  factory: e.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const Lt = new Ut("INJECTOR", -1),
        Ft = {},
        jt = /\n/gm,
        Ht = at({ provide: String, useValue: at });
      let $t,
        zt = void 0;
      function Gt(t) {
        const e = zt;
        return (zt = t), e;
      }
      function Bt(t) {
        const e = $t;
        return ($t = t), e;
      }
      function qt(t, e = ot.Default) {
        if (void 0 === zt)
          throw new Error("inject() must be called from an injection context");
        return null === zt
          ? Zt(t, void 0, e)
          : zt.get(t, e & ot.Optional ? null : void 0, e);
      }
      function Wt(t, e = ot.Default) {
        return ($t || qt)(xt(t), e);
      }
      function Zt(t, e, n) {
        const r = ht(t);
        if (r && "root" == r.providedIn)
          return void 0 === r.value ? (r.value = r.factory()) : r.value;
        if (n & ot.Optional) return null;
        if (void 0 !== e) return e;
        throw new Error(`Injector: NOT_FOUND [${_t(t)}]`);
      }
      function Qt(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const r = xt(t[n]);
          if (Array.isArray(r)) {
            if (0 === r.length)
              throw new Error("Arguments array must have arguments.");
            let t = void 0,
              n = ot.Default;
            for (let e = 0; e < r.length; e++) {
              const s = r[e];
              s instanceof rt || "Optional" === s.ngMetadataName || s === rt
                ? (n |= ot.Optional)
                : s instanceof it || "SkipSelf" === s.ngMetadataName || s === it
                ? (n |= ot.SkipSelf)
                : s instanceof st || "Self" === s.ngMetadataName || s === st
                ? (n |= ot.Self)
                : (t = s instanceof nt || s === nt ? s.token : s);
            }
            e.push(Wt(t, n));
          } else e.push(Wt(r));
        }
        return e;
      }
      class Yt {
        get(t, e = Ft) {
          if (e === Ft) {
            const e = new Error(`NullInjectorError: No provider for ${_t(t)}!`);
            throw ((e.name = "NullInjectorError"), e);
          }
          return e;
        }
      }
      class Kt {}
      class Jt {}
      function Xt(t, e) {
        t.forEach((t) => (Array.isArray(t) ? Xt(t, e) : e(t)));
      }
      function te(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function ee(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      function ne(t, e, n) {
        let r = se(t, e);
        return (
          r >= 0
            ? (t[1 | r] = n)
            : ((r = ~r),
              (function (t, e, n, r) {
                let s = t.length;
                if (s == e) t.push(n, r);
                else if (1 === s) t.push(r, t[0]), (t[0] = n);
                else {
                  for (s--, t.push(t[s - 1], t[s]); s > e; )
                    (t[s] = t[s - 2]), s--;
                  (t[e] = n), (t[e + 1] = r);
                }
              })(t, r, e, n)),
          r
        );
      }
      function re(t, e) {
        const n = se(t, e);
        if (n >= 0) return t[1 | n];
      }
      function se(t, e) {
        return (function (t, e, n) {
          let r = 0,
            s = t.length >> 1;
          for (; s !== r; ) {
            const n = r + ((s - r) >> 1),
              i = t[n << 1];
            if (e === i) return n << 1;
            i > e ? (s = n) : (r = n + 1);
          }
          return ~(s << 1);
        })(t, e);
      }
      const ie = (function () {
          var t = { OnPush: 0, Default: 1 };
          return (t[t.OnPush] = "OnPush"), (t[t.Default] = "Default"), t;
        })(),
        oe = (function () {
          var t = { Emulated: 0, Native: 1, None: 2, ShadowDom: 3 };
          return (
            (t[t.Emulated] = "Emulated"),
            (t[t.Native] = "Native"),
            (t[t.None] = "None"),
            (t[t.ShadowDom] = "ShadowDom"),
            t
          );
        })(),
        ae = {},
        le = [];
      let ce = 0;
      function ue(t) {
        return tt(() => {
          const e = t.type,
            n = e.prototype,
            r = {},
            s = {
              type: e,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: r,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onChanges: null,
              onInit: n.ngOnInit || null,
              doCheck: n.ngDoCheck || null,
              afterContentInit: n.ngAfterContentInit || null,
              afterContentChecked: n.ngAfterContentChecked || null,
              afterViewInit: n.ngAfterViewInit || null,
              afterViewChecked: n.ngAfterViewChecked || null,
              onDestroy: n.ngOnDestroy || null,
              onPush: t.changeDetection === ie.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || le,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || oe.Emulated,
              id: "c",
              styles: t.styles || le,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            i = t.directives,
            o = t.features,
            a = t.pipes;
          return (
            (s.id += ce++),
            (s.inputs = ge(t.inputs, r)),
            (s.outputs = ge(t.outputs)),
            o && o.forEach((t) => t(s)),
            (s.directiveDefs = i
              ? () => ("function" == typeof i ? i() : i).map(he)
              : null),
            (s.pipeDefs = a
              ? () => ("function" == typeof a ? a() : a).map(de)
              : null),
            s
          );
        });
      }
      function he(t) {
        return (
          ve(t) ||
          (function (t) {
            return t[Tt] || null;
          })(t)
        );
      }
      function de(t) {
        return (function (t) {
          return t[Mt] || null;
        })(t);
      }
      const pe = {};
      function fe(t) {
        const e = {
          type: t.type,
          bootstrap: t.bootstrap || le,
          declarations: t.declarations || le,
          imports: t.imports || le,
          exports: t.exports || le,
          transitiveCompileScopes: null,
          schemas: t.schemas || null,
          id: t.id || null,
        };
        return (
          null != t.id &&
            tt(() => {
              pe[t.id] = t.type;
            }),
          e
        );
      }
      function ge(t, e) {
        if (null == t) return ae;
        const n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            let s = t[r],
              i = s;
            Array.isArray(s) && ((i = s[1]), (s = s[0])),
              (n[s] = r),
              e && (e[s] = i);
          }
        return n;
      }
      const me = ue;
      function ye(t) {
        return {
          type: t.type,
          name: t.name,
          factory: null,
          pure: !1 !== t.pure,
          onDestroy: t.type.prototype.ngOnDestroy || null,
        };
      }
      function ve(t) {
        return t[It] || null;
      }
      function _e(t, e) {
        return t.hasOwnProperty(Nt) ? t[Nt] : null;
      }
      function be(t, e) {
        const n = t[Dt] || null;
        if (!n && !0 === e)
          throw new Error(`Type ${_t(t)} does not have '\u0275mod' property.`);
        return n;
      }
      function we(t) {
        return Array.isArray(t) && "object" == typeof t[1];
      }
      function Ce(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function xe(t) {
        return 0 != (8 & t.flags);
      }
      function Se(t) {
        return 2 == (2 & t.flags);
      }
      function Ee(t) {
        return 1 == (1 & t.flags);
      }
      function ke(t) {
        return null !== t.template;
      }
      function Pe(t) {
        return 0 != (512 & t[2]);
      }
      let Oe = void 0;
      function Ae(t) {
        return !!t.listen;
      }
      const Ie = {
        createRenderer: (t, e) =>
          void 0 !== Oe
            ? Oe
            : "undefined" != typeof document
            ? document
            : void 0,
      };
      function Te(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function Me(t, e) {
        return Te(e[t + 19]);
      }
      function De(t, e) {
        return Te(e[t.index]);
      }
      function Re(t, e) {
        return t.data[e + 19];
      }
      function Ne(t, e) {
        return t[e + 19];
      }
      function Ve(t, e) {
        const n = e[t];
        return we(n) ? n : n[0];
      }
      function Ue(t) {
        const e = (function (t) {
          return t.__ngContext__ || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function Le(t) {
        return 4 == (4 & t[2]);
      }
      function Fe(t) {
        return 128 == (128 & t[2]);
      }
      function je(t, e) {
        return null === t || null == e ? null : t[e];
      }
      function He(t) {
        t[18] = 0;
      }
      const $e = {
        lFrame: un(null),
        bindingsEnabled: !0,
        checkNoChangesMode: !1,
      };
      function ze() {
        return $e.bindingsEnabled;
      }
      function Ge() {
        return $e.lFrame.lView;
      }
      function Be() {
        return $e.lFrame.tView;
      }
      function qe(t) {
        $e.lFrame.contextLView = t;
      }
      function We() {
        return $e.lFrame.previousOrParentTNode;
      }
      function Ze(t, e) {
        ($e.lFrame.previousOrParentTNode = t), ($e.lFrame.isParent = e);
      }
      function Qe() {
        return $e.lFrame.isParent;
      }
      function Ye() {
        $e.lFrame.isParent = !1;
      }
      function Ke() {
        return $e.checkNoChangesMode;
      }
      function Je(t) {
        $e.checkNoChangesMode = t;
      }
      function Xe() {
        const t = $e.lFrame;
        let e = t.bindingRootIndex;
        return (
          -1 === e && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e
        );
      }
      function tn() {
        return $e.lFrame.bindingIndex;
      }
      function en() {
        return $e.lFrame.bindingIndex++;
      }
      function nn(t) {
        const e = $e.lFrame,
          n = e.bindingIndex;
        return (e.bindingIndex = e.bindingIndex + t), n;
      }
      function rn(t, e) {
        const n = $e.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t),
          (n.currentDirectiveIndex = e);
      }
      function sn() {
        return $e.lFrame.currentQueryIndex;
      }
      function on(t) {
        $e.lFrame.currentQueryIndex = t;
      }
      function an(t, e) {
        const n = cn();
        ($e.lFrame = n), (n.previousOrParentTNode = e), (n.lView = t);
      }
      function ln(t, e) {
        const n = cn(),
          r = t[1];
        ($e.lFrame = n),
          (n.previousOrParentTNode = e),
          (n.lView = t),
          (n.tView = r),
          (n.contextLView = t),
          (n.bindingIndex = r.bindingStartIndex);
      }
      function cn() {
        const t = $e.lFrame,
          e = null === t ? null : t.child;
        return null === e ? un(t) : e;
      }
      function un(t) {
        const e = {
          previousOrParentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: 0,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentSanitizer: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
        };
        return null !== t && (t.child = e), e;
      }
      function hn() {
        const t = $e.lFrame;
        return (
          ($e.lFrame = t.parent),
          (t.previousOrParentTNode = null),
          (t.lView = null),
          t
        );
      }
      const dn = hn;
      function pn() {
        const t = hn();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = 0),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.currentSanitizer = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function fn() {
        return $e.lFrame.selectedIndex;
      }
      function gn(t) {
        $e.lFrame.selectedIndex = t;
      }
      function mn() {
        const t = $e.lFrame;
        return Re(t.tView, t.selectedIndex);
      }
      function yn(t, e) {
        for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
          const e = t.data[n];
          e.afterContentInit &&
            (t.contentHooks || (t.contentHooks = [])).push(
              -n,
              e.afterContentInit
            ),
            e.afterContentChecked &&
              ((t.contentHooks || (t.contentHooks = [])).push(
                n,
                e.afterContentChecked
              ),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(
                n,
                e.afterContentChecked
              )),
            e.afterViewInit &&
              (t.viewHooks || (t.viewHooks = [])).push(-n, e.afterViewInit),
            e.afterViewChecked &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, e.afterViewChecked),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(
                n,
                e.afterViewChecked
              )),
            null != e.onDestroy &&
              (t.destroyHooks || (t.destroyHooks = [])).push(n, e.onDestroy);
        }
      }
      function vn(t, e, n) {
        wn(t, e, 3, n);
      }
      function _n(t, e, n, r) {
        (3 & t[2]) === n && wn(t, e, n, r);
      }
      function bn(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 1023), (n += 1), (t[2] = n));
      }
      function wn(t, e, n, r) {
        const s = null != r ? r : -1;
        let i = 0;
        for (let o = void 0 !== r ? 65535 & t[18] : 0; o < e.length; o++)
          if ("number" == typeof e[o + 1]) {
            if (((i = e[o]), null != r && i >= r)) break;
          } else
            e[o] < 0 && (t[18] += 65536),
              (i < s || -1 == s) &&
                (Cn(t, n, e, o), (t[18] = (4294901760 & t[18]) + o + 2)),
              o++;
      }
      function Cn(t, e, n, r) {
        const s = n[r] < 0,
          i = n[r + 1],
          o = t[s ? -n[r] : n[r]];
        s
          ? t[2] >> 10 < t[18] >> 16 &&
            (3 & t[2]) === e &&
            ((t[2] += 1024), i.call(o))
          : i.call(o);
      }
      class xn {
        constructor(t, e, n) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = e),
            (this.injectImpl = n);
        }
      }
      function Sn(t, e, n) {
        const r = Ae(t);
        let s = 0;
        for (; s < n.length; ) {
          const i = n[s];
          if ("number" == typeof i) {
            if (0 !== i) break;
            s++;
            const o = n[s++],
              a = n[s++],
              l = n[s++];
            r ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l);
          } else {
            const o = i,
              a = n[++s];
            kn(o)
              ? r && t.setProperty(e, o, a)
              : r
              ? t.setAttribute(e, o, a)
              : e.setAttribute(o, a),
              s++;
          }
        }
        return s;
      }
      function En(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function kn(t) {
        return 64 === t.charCodeAt(0);
      }
      function Pn(t, e) {
        if (null === e || 0 === e.length);
        else if (null === t || 0 === t.length) t = e.slice();
        else {
          let n = -1;
          for (let r = 0; r < e.length; r++) {
            const s = e[r];
            "number" == typeof s
              ? (n = s)
              : 0 === n ||
                On(t, n, s, null, -1 === n || 2 === n ? e[++r] : null);
          }
        }
        return t;
      }
      function On(t, e, n, r, s) {
        let i = 0,
          o = t.length;
        if (-1 === e) o = -1;
        else
          for (; i < t.length; ) {
            const n = t[i++];
            if ("number" == typeof n) {
              if (n === e) {
                o = -1;
                break;
              }
              if (n > e) {
                o = i - 1;
                break;
              }
            }
          }
        for (; i < t.length; ) {
          const e = t[i];
          if ("number" == typeof e) break;
          if (e === n) {
            if (null === r) return void (null !== s && (t[i + 1] = s));
            if (r === t[i + 1]) return void (t[i + 2] = s);
          }
          i++, null !== r && i++, null !== s && i++;
        }
        -1 !== o && (t.splice(o, 0, e), (i = o + 1)),
          t.splice(i++, 0, n),
          null !== r && t.splice(i++, 0, r),
          null !== s && t.splice(i++, 0, s);
      }
      function An(t) {
        return -1 !== t;
      }
      function In(t) {
        return 32767 & t;
      }
      function Tn(t) {
        return t >> 16;
      }
      function Mn(t, e) {
        let n = Tn(t),
          r = e;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      function Dn(t) {
        return "string" == typeof t ? t : null == t ? "" : "" + t;
      }
      function Rn(t) {
        return "function" == typeof t
          ? t.name || t.toString()
          : "object" == typeof t && null != t && "function" == typeof t.type
          ? t.type.name || t.type.toString()
          : Dn(t);
      }
      const Nn = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(At))();
      function Vn(t) {
        return t instanceof Function ? t() : t;
      }
      let Un = !0;
      function Ln(t) {
        const e = Un;
        return (Un = t), e;
      }
      let Fn = 0;
      function jn(t, e) {
        const n = $n(t, e);
        if (-1 !== n) return n;
        const r = e[1];
        r.firstCreatePass &&
          ((t.injectorIndex = e.length),
          Hn(r.data, t),
          Hn(e, null),
          Hn(r.blueprint, null));
        const s = zn(t, e),
          i = t.injectorIndex;
        if (An(s)) {
          const t = In(s),
            n = Mn(s, e),
            r = n[1].data;
          for (let s = 0; s < 8; s++) e[i + s] = n[t + s] | r[t + s];
        }
        return (e[i + 8] = s), i;
      }
      function Hn(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function $n(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null == e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function zn(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex;
        let n = e[6],
          r = 1;
        for (; n && -1 === n.injectorIndex; )
          (n = (e = e[15]) ? e[6] : null), r++;
        return n ? n.injectorIndex | (r << 16) : -1;
      }
      function Gn(t, e, n) {
        !(function (t, e, n) {
          let r = "string" != typeof n ? n[Vt] : n.charCodeAt(0) || 0;
          null == r && (r = n[Vt] = Fn++);
          const s = 255 & r,
            i = 1 << s,
            o = 64 & s,
            a = 32 & s,
            l = e.data;
          128 & s
            ? o
              ? a
                ? (l[t + 7] |= i)
                : (l[t + 6] |= i)
              : a
              ? (l[t + 5] |= i)
              : (l[t + 4] |= i)
            : o
            ? a
              ? (l[t + 3] |= i)
              : (l[t + 2] |= i)
            : a
            ? (l[t + 1] |= i)
            : (l[t] |= i);
        })(t, e, n);
      }
      function Bn(t, e, n, r = ot.Default, s) {
        if (null !== t) {
          const s = (function (t) {
            if ("string" == typeof t) return t.charCodeAt(0) || 0;
            const e = t[Vt];
            return "number" == typeof e && e > 0 ? 255 & e : e;
          })(n);
          if ("function" == typeof s) {
            an(e, t);
            try {
              const t = s();
              if (null != t || r & ot.Optional) return t;
              throw new Error(`No provider for ${Rn(n)}!`);
            } finally {
              dn();
            }
          } else if ("number" == typeof s) {
            if (-1 === s) return new Jn(t, e);
            let i = null,
              o = $n(t, e),
              a = -1,
              l = r & ot.Host ? e[16][6] : null;
            for (
              (-1 === o || r & ot.SkipSelf) &&
              ((a = -1 === o ? zn(t, e) : e[o + 8]),
              Kn(r, !1) ? ((i = e[1]), (o = In(a)), (e = Mn(a, e))) : (o = -1));
              -1 !== o;

            ) {
              a = e[o + 8];
              const t = e[1];
              if (Yn(s, o, t.data)) {
                const t = Wn(o, e, n, i, r, l);
                if (t !== qn) return t;
              }
              Kn(r, e[1].data[o + 8] === l) && Yn(s, o, e)
                ? ((i = t), (o = In(a)), (e = Mn(a, e)))
                : (o = -1);
            }
          }
        }
        if (
          (r & ot.Optional && void 0 === s && (s = null),
          0 == (r & (ot.Self | ot.Host)))
        ) {
          const t = e[9],
            i = Bt(void 0);
          try {
            return t ? t.get(n, s, r & ot.Optional) : Zt(n, s, r & ot.Optional);
          } finally {
            Bt(i);
          }
        }
        if (r & ot.Optional) return s;
        throw new Error(`NodeInjector: NOT_FOUND [${Rn(n)}]`);
      }
      const qn = {};
      function Wn(t, e, n, r, s, i) {
        const o = e[1],
          a = o.data[t + 8],
          l = Zn(
            a,
            o,
            n,
            null == r ? Se(a) && Un : r != o && 3 === a.type,
            s & ot.Host && i === a
          );
        return null !== l ? Qn(e, o, l, a) : qn;
      }
      function Zn(t, e, n, r, s) {
        const i = t.providerIndexes,
          o = e.data,
          a = 65535 & i,
          l = t.directiveStart,
          c = i >> 16,
          u = s ? a + c : t.directiveEnd;
        for (let h = r ? a : a + c; h < u; h++) {
          const t = o[h];
          if ((h < l && n === t) || (h >= l && t.type === n)) return h;
        }
        if (s) {
          const t = o[l];
          if (t && ke(t) && t.type === n) return l;
        }
        return null;
      }
      function Qn(t, e, n, r) {
        let s = t[n];
        const i = e.data;
        if (s instanceof xn) {
          const o = s;
          if (o.resolving) throw new Error(`Circular dep for ${Rn(i[n])}`);
          const a = Ln(o.canSeeViewProviders);
          let l;
          (o.resolving = !0), o.injectImpl && (l = Bt(o.injectImpl)), an(t, r);
          try {
            (s = t[n] = o.factory(void 0, i, t, r)),
              e.firstCreatePass &&
                n >= r.directiveStart &&
                (function (t, e, n) {
                  const { onChanges: r, onInit: s, doCheck: i } = e;
                  r &&
                    ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, r),
                    (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(
                      t,
                      r
                    )),
                    s &&
                      (n.preOrderHooks || (n.preOrderHooks = [])).push(-t, s),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, i));
                })(n, i[n], e);
          } finally {
            o.injectImpl && Bt(l), Ln(a), (o.resolving = !1), dn();
          }
        }
        return s;
      }
      function Yn(t, e, n) {
        const r = 64 & t,
          s = 32 & t;
        let i;
        return (
          (i =
            128 & t
              ? r
                ? s
                  ? n[e + 7]
                  : n[e + 6]
                : s
                ? n[e + 5]
                : n[e + 4]
              : r
              ? s
                ? n[e + 3]
                : n[e + 2]
              : s
              ? n[e + 1]
              : n[e]),
          !!(i & (1 << t))
        );
      }
      function Kn(t, e) {
        return !(t & ot.Self || (t & ot.Host && e));
      }
      class Jn {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e) {
          return Bn(this._tNode, this._lView, t, void 0, e);
        }
      }
      function Xn(t) {
        return tt(() => {
          const e = Object.getPrototypeOf(t.prototype).constructor,
            n =
              e[Nt] ||
              (function t(e) {
                const n = e;
                if (St(e))
                  return () => {
                    const e = t(xt(n));
                    return e ? e() : null;
                  };
                let r = _e(n);
                if (null === r) {
                  const t = pt(n);
                  r = t && t.factory;
                }
                return r || null;
              })(e);
          return null !== n ? n : (t) => new t();
        });
      }
      function tr(t) {
        return t.ngDebugContext;
      }
      function er(t) {
        return t.ngOriginalError;
      }
      function nr(t, ...e) {
        t.error(...e);
      }
      class rr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            r = (function (t) {
              return t.ngErrorLogger || nr;
            })(t);
          r(this._console, "ERROR", t),
            e && r(this._console, "ORIGINAL ERROR", e),
            n && r(this._console, "ERROR CONTEXT", n);
        }
        _findContext(t) {
          return t ? (tr(t) ? tr(t) : this._findContext(er(t))) : null;
        }
        _findOriginalError(t) {
          let e = er(t);
          for (; e && er(e); ) e = er(e);
          return e;
        }
      }
      class sr {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return (
            `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}` +
            " (see http://g.co/ng/security#xss)"
          );
        }
      }
      function ir(t) {
        return t instanceof sr ? t.changingThisBreaksApplicationSecurity : t;
      }
      function or(t, e) {
        const n = (function (t) {
          return (t instanceof sr && t.getTypeName()) || null;
        })(t);
        if (null != n && n !== e) {
          if ("ResourceURL" === n && "URL" === e) return !0;
          throw new Error(
            `Required a safe ${e}, got a ${n} (see http://g.co/ng/security#xss)`
          );
        }
        return n === e;
      }
      let ar = !0,
        lr = !1;
      function cr() {
        return (lr = !0), ar;
      }
      const ur = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        hr =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function dr(t) {
        return (t = String(t)).match(ur) || t.match(hr)
          ? t
          : (cr() &&
              console.warn(
                `WARNING: sanitizing unsafe URL value ${t} (see http://g.co/ng/security#xss)`
              ),
            "unsafe:" + t);
      }
      const pr = (function () {
          var t = {
            NONE: 0,
            HTML: 1,
            STYLE: 2,
            SCRIPT: 3,
            URL: 4,
            RESOURCE_URL: 5,
          };
          return (
            (t[t.NONE] = "NONE"),
            (t[t.HTML] = "HTML"),
            (t[t.STYLE] = "STYLE"),
            (t[t.SCRIPT] = "SCRIPT"),
            (t[t.URL] = "URL"),
            (t[t.RESOURCE_URL] = "RESOURCE_URL"),
            t
          );
        })(),
        fr = new RegExp(
          "^([-,.\"'%_!# a-zA-Z0-9]+|(?:(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|Z|3d)?|(?:rgb|hsl)a?|(?:repeating-)?(?:linear|radial)-gradient|(?:attr|calc|var))\\([-0-9.%, #a-zA-Z]+\\))$",
          "g"
        ),
        gr = /^url\(([^)]+)\)$/;
      function mr(t) {
        const e = _r();
        return e
          ? e.sanitize(pr.STYLE, t) || ""
          : or(t, "Style")
          ? ir(t)
          : (function (t) {
              if (!(t = String(t).trim())) return "";
              const e = t.match(gr);
              return (e && dr(e[1]) === e[1]) ||
                (t.match(fr) &&
                  (function (t) {
                    let e = !0,
                      n = !0;
                    for (let r = 0; r < t.length; r++) {
                      const s = t.charAt(r);
                      "'" === s && n ? (e = !e) : '"' === s && e && (n = !n);
                    }
                    return e && n;
                  })(t))
                ? t
                : (cr() &&
                    console.warn(
                      `WARNING: sanitizing unsafe style value ${t} (see http://g.co/ng/security#xss).`
                    ),
                  "unsafe");
            })(Dn(t));
      }
      function yr(t) {
        const e = _r();
        return e
          ? e.sanitize(pr.URL, t) || ""
          : or(t, "URL")
          ? ir(t)
          : dr(Dn(t));
      }
      const vr = function (t, e, n) {
        if (void 0 === e && void 0 === n) return mr(t);
        let r = !0;
        return (
          1 & (n = n || 3) &&
            (r = (function (t) {
              return (
                "background-image" === t ||
                "backgroundImage" === t ||
                "background" === t ||
                "border-image" === t ||
                "borderImage" === t ||
                "border-image-source" === t ||
                "borderImageSource" === t ||
                "filter" === t ||
                "list-style" === t ||
                "listStyle" === t ||
                "list-style-image" === t ||
                "listStyleImage" === t ||
                "clip-path" === t ||
                "clipPath" === t
              );
            })(t)),
          2 & n ? (r ? mr(e) : ir(e)) : r
        );
      };
      function _r() {
        const t = Ge();
        return t && t[12];
      }
      function br(t, e) {
        t.__ngContext__ = e;
      }
      function wr(t) {
        throw new Error(
          `Multiple components match node with tagname ${t.tagName}`
        );
      }
      function Cr() {
        throw new Error("Cannot mix multi providers and regular providers");
      }
      function xr(t, e, n) {
        let r = t.length;
        for (;;) {
          const s = t.indexOf(e, n);
          if (-1 === s) return s;
          if (0 === s || t.charCodeAt(s - 1) <= 32) {
            const n = e.length;
            if (s + n === r || t.charCodeAt(s + n) <= 32) return s;
          }
          n = s + 1;
        }
      }
      function Sr(t, e, n) {
        let r = 0;
        for (; r < t.length; ) {
          let s = t[r++];
          if (n && "class" === s) {
            if (((s = t[r]), -1 !== xr(s.toLowerCase(), e, 0))) return !0;
          } else if (1 === s) {
            for (; r < t.length && "string" == typeof (s = t[r++]); )
              if (s.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Er(t, e, n) {
        return e === (0 !== t.type || n ? t.tagName : "ng-template");
      }
      function kr(t, e, n) {
        let r = 4;
        const s = t.attrs || [],
          i = (function (t) {
            for (let e = 0; e < t.length; e++) if (En(t[e])) return e;
            return t.length;
          })(s);
        let o = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!o)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !Er(t, l, n)) || ("" === l && 1 === e.length))
                ) {
                  if (Pr(r)) return !1;
                  o = !0;
                }
              } else {
                const c = 8 & r ? l : e[++a];
                if (8 & r && null !== t.attrs) {
                  if (!Sr(t.attrs, c, n)) {
                    if (Pr(r)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const u = Or(
                  8 & r ? "class" : l,
                  s,
                  0 == t.type && "ng-template" !== t.tagName,
                  n
                );
                if (-1 === u) {
                  if (Pr(r)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== c) {
                  let t;
                  t = u > i ? "" : s[u + 1].toLowerCase();
                  const e = 8 & r ? t : null;
                  if ((e && -1 !== xr(e, c, 0)) || (2 & r && c !== t)) {
                    if (Pr(r)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !Pr(r) && !Pr(l)) return !1;
            if (o && Pr(l)) continue;
            (o = !1), (r = l | (1 & r));
          }
        }
        return Pr(r) || o;
      }
      function Pr(t) {
        return 0 == (1 & t);
      }
      function Or(t, e, n, r) {
        if (null === e) return -1;
        let s = 0;
        if (r || !n) {
          let n = !1;
          for (; s < e.length; ) {
            const r = e[s];
            if (r === t) return s;
            if (3 === r || 6 === r) n = !0;
            else {
              if (1 === r || 2 === r) {
                let t = e[++s];
                for (; "string" == typeof t; ) t = e[++s];
                continue;
              }
              if (4 === r) break;
              if (0 === r) {
                s += 4;
                continue;
              }
            }
            s += n ? 1 : 2;
          }
          return -1;
        }
        return (function (t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              if (t[n] === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function Ar(t, e, n = !1) {
        for (let r = 0; r < e.length; r++) if (kr(t, e[r], n)) return !0;
        return !1;
      }
      function Ir(t, e) {
        return t ? ":not(" + e.trim() + ")" : e;
      }
      function Tr(t) {
        let e = t[0],
          n = 1,
          r = 2,
          s = "",
          i = !1;
        for (; n < t.length; ) {
          let o = t[n];
          if ("string" == typeof o)
            if (2 & r) {
              const e = t[++n];
              s += "[" + o + (e.length > 0 ? '="' + e + '"' : "") + "]";
            } else 8 & r ? (s += "." + o) : 4 & r && (s += " " + o);
          else
            "" === s || Pr(o) || ((e += Ir(i, s)), (s = "")),
              (r = o),
              (i = i || !Pr(r));
          n++;
        }
        return "" !== s && (e += Ir(i, s)), e;
      }
      const Mr = {};
      function Dr(t) {
        const e = t[3];
        return Ce(e) ? e[3] : e;
      }
      function Rr(t) {
        Nr(Be(), Ge(), fn() + t, Ke());
      }
      function Nr(t, e, n, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const r = t.preOrderCheckHooks;
            null !== r && vn(e, r, n);
          } else {
            const r = t.preOrderHooks;
            null !== r && _n(e, r, 0, n);
          }
        gn(n);
      }
      function Vr(t, e) {
        return (t << 17) | (e << 2);
      }
      function Ur(t) {
        return (t >> 17) & 32767;
      }
      function Lr(t) {
        return 2 | t;
      }
      function Fr(t) {
        return (131068 & t) >> 2;
      }
      function jr(t, e) {
        return (-131069 & t) | (e << 2);
      }
      function Hr(t) {
        return 1 | t;
      }
      function $r(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const s = n[r],
              i = n[r + 1];
            if (-1 !== i) {
              const n = t.data[i];
              on(s), n.contentQueries(2, e[i], i);
            }
          }
      }
      function zr(t, e, n) {
        return Ae(e)
          ? e.createElement(t, n)
          : null === n
          ? e.createElement(t)
          : e.createElementNS(n, t);
      }
      function Gr(t, e, n, r, s, i, o, a, l, c) {
        const u = e.blueprint.slice();
        return (
          (u[0] = s),
          (u[2] = 140 | r),
          He(u),
          (u[3] = u[15] = t),
          (u[8] = n),
          (u[10] = o || (t && t[10])),
          (u[11] = a || (t && t[11])),
          (u[12] = l || (t && t[12]) || null),
          (u[9] = c || (t && t[9]) || null),
          (u[6] = i),
          (u[16] = 2 == e.type ? t[16] : u),
          u
        );
      }
      function Br(t, e, n, r, s, i) {
        const o = n + 19,
          a =
            t.data[o] ||
            (function (t, e, n, r, s, i) {
              const o = We(),
                a = Qe(),
                l = a ? o : o && o.parent,
                c = (t.data[n] = es(0, l && l !== e ? l : null, r, n, s, i));
              return (
                null === t.firstChild && (t.firstChild = c),
                o &&
                  (!a || null != o.child || (null === c.parent && 2 !== o.type)
                    ? a || (o.next = c)
                    : (o.child = c)),
                c
              );
            })(t, e, o, r, s, i);
        return Ze(a, !0), a;
      }
      function qr(t, e, n) {
        ln(e, e[6]);
        try {
          const r = t.viewQuery;
          null !== r && Ss(1, r, n);
          const s = t.template;
          null !== s && Qr(t, e, s, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && $r(t, e),
            t.staticViewQueries && Ss(2, t.viewQuery, n);
          const i = t.components;
          null !== i &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) _s(t, e[n]);
            })(e, i);
        } finally {
          (e[2] &= -5), pn();
        }
      }
      function Wr(t, e, n, r) {
        const s = e[2];
        if (256 == (256 & s)) return;
        ln(e, e[6]);
        const i = Ke();
        try {
          He(e),
            ($e.lFrame.bindingIndex = t.bindingStartIndex),
            null !== n && Qr(t, e, n, 2, r);
          const o = 3 == (3 & s);
          if (!i)
            if (o) {
              const n = t.preOrderCheckHooks;
              null !== n && vn(e, n, null);
            } else {
              const n = t.preOrderHooks;
              null !== n && _n(e, n, 0, null), bn(e, 0);
            }
          if (
            ((function (t) {
              let e = t[13];
              for (; null !== e; ) {
                let n;
                if (Ce(e) && (n = e[2]) >> 1 == -1) {
                  for (let t = 9; t < e.length; t++) {
                    const n = e[t],
                      r = n[1];
                    Fe(n) && Wr(r, n, r.template, n[8]);
                  }
                  0 != (1 & n) && ys(e, t[16]);
                }
                e = e[4];
              }
            })(e),
            null !== t.contentQueries && $r(t, e),
            !i)
          )
            if (o) {
              const n = t.contentCheckHooks;
              null !== n && vn(e, n);
            } else {
              const n = t.contentHooks;
              null !== n && _n(e, n, 1), bn(e, 1);
            }
          !(function (t, e) {
            try {
              const n = t.expandoInstructions;
              if (null !== n) {
                let r = t.expandoStartIndex,
                  s = -1,
                  i = -1;
                for (let t = 0; t < n.length; t++) {
                  const o = n[t];
                  "number" == typeof o
                    ? o <= 0
                      ? ((i = 0 - o), gn(i), (r += 9 + n[++t]), (s = r))
                      : (r += o)
                    : (null !== o && (rn(r, s), o(2, e[s])), s++);
                }
              }
            } finally {
              gn(-1);
            }
          })(t, e);
          const a = t.components;
          null !== a &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) vs(t, e[n]);
            })(e, a);
          const l = t.viewQuery;
          if ((null !== l && Ss(2, l, r), !i))
            if (o) {
              const n = t.viewCheckHooks;
              null !== n && vn(e, n);
            } else {
              const n = t.viewHooks;
              null !== n && _n(e, n, 2), bn(e, 2);
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            i || (e[2] &= -73);
        } finally {
          pn();
        }
      }
      function Zr(t, e, n, r) {
        const s = e[10],
          i = !Ke(),
          o = Le(e);
        try {
          i && !o && s.begin && s.begin(), o && qr(t, e, r), Wr(t, e, n, r);
        } finally {
          i && !o && s.end && s.end();
        }
      }
      function Qr(t, e, n, r, s) {
        const i = fn();
        try {
          gn(-1), 2 & r && e.length > 19 && Nr(t, e, 0, Ke()), n(r, s);
        } finally {
          gn(i);
        }
      }
      function Yr(t, e, n) {
        if (xe(e)) {
          const r = e.directiveEnd;
          for (let s = e.directiveStart; s < r; s++) {
            const e = t.data[s];
            e.contentQueries && e.contentQueries(1, n[s], s);
          }
        }
      }
      function Kr(t, e, n) {
        ze() &&
          ((function (t, e, n, r) {
            const s = n.directiveStart,
              i = n.directiveEnd;
            t.firstCreatePass || jn(n, e), br(r, e);
            const o = n.initialInputs;
            for (let a = s; a < i; a++) {
              const r = t.data[a],
                i = ke(r);
              i && ps(e, n, r);
              const l = Qn(e, t, a, n);
              br(l, e),
                null !== o && fs(0, a - s, l, r, 0, o),
                i && (Ve(n.index, e)[8] = l);
            }
          })(t, e, n, De(n, e)),
          128 == (128 & n.flags) &&
            (function (t, e, n) {
              const r = n.directiveStart,
                s = n.directiveEnd,
                i = t.expandoInstructions,
                o = t.firstCreatePass,
                a = n.index - 19;
              try {
                gn(a);
                for (let n = r; n < s; n++) {
                  const r = t.data[n],
                    s = e[n];
                  null !== r.hostBindings ||
                  0 !== r.hostVars ||
                  null !== r.hostAttrs
                    ? as(r, s)
                    : o && i.push(null);
                }
              } finally {
                gn(-1);
              }
            })(t, e, n));
      }
      function Jr(t, e, n = De) {
        const r = e.localNames;
        if (null !== r) {
          let s = e.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const o = r[i + 1],
              a = -1 === o ? n(e, t) : t[o];
            t[s++] = a;
          }
        }
      }
      function Xr(t) {
        return (
          t.tView ||
          (t.tView = ts(
            1,
            -1,
            t.template,
            t.decls,
            t.vars,
            t.directiveDefs,
            t.pipeDefs,
            t.viewQuery,
            t.schemas,
            t.consts
          ))
        );
      }
      function ts(t, e, n, r, s, i, o, a, l, c) {
        const u = 19 + r,
          h = u + s,
          d = (function (t, e) {
            const n = [];
            for (let r = 0; r < e; r++) n.push(r < t ? null : Mr);
            return n;
          })(u, h);
        return (d[1] = {
          type: t,
          id: e,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: a,
          node: null,
          data: d.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: h,
          expandoInstructions: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: c,
        });
      }
      function es(t, e, n, r, s, i) {
        return {
          type: n,
          index: r,
          injectorIndex: e ? e.injectorIndex : -1,
          directiveStart: -1,
          directiveEnd: -1,
          directiveStylingLast: -1,
          propertyBindings: null,
          flags: 0,
          providerIndexes: 0,
          tagName: s,
          attrs: i,
          mergedAttrs: null,
          localNames: null,
          initialInputs: void 0,
          inputs: null,
          outputs: null,
          tViews: null,
          next: null,
          projectionNext: null,
          child: null,
          parent: e,
          projection: null,
          styles: null,
          residualStyles: void 0,
          classes: null,
          residualClasses: void 0,
          classBindings: 0,
          styleBindings: 0,
        };
      }
      function ns(t, e, n) {
        for (let r in t)
          if (t.hasOwnProperty(r)) {
            const s = t[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(e, s)
              : (n[r] = [e, s]);
          }
        return n;
      }
      function rs(t, e, n, r, s, i, o, a) {
        const l = De(e, n);
        let c,
          u = e.inputs;
        var h;
        !a && null != u && (c = u[r])
          ? (As(t, n, c, r, s),
            Se(e) &&
              (function (t, e) {
                const n = Ve(e, t);
                16 & n[2] || (n[2] |= 64);
              })(n, e.index))
          : 3 === e.type &&
            ((r =
              "class" === (h = r)
                ? "className"
                : "for" === h
                ? "htmlFor"
                : "formaction" === h
                ? "formAction"
                : "innerHtml" === h
                ? "innerHTML"
                : "readonly" === h
                ? "readOnly"
                : "tabindex" === h
                ? "tabIndex"
                : h),
            (s = null != o ? o(s, e.tagName || "", r) : s),
            Ae(i)
              ? i.setProperty(l, r, s)
              : kn(r) || (l.setProperty ? l.setProperty(r, s) : (l[r] = s)));
      }
      function ss(t, e, n, r) {
        let s = !1;
        if (ze()) {
          const i = (function (t, e, n) {
              const r = t.directiveRegistry;
              let s = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const o = r[i];
                  Ar(n, o.selectors, !1) &&
                    (s || (s = []),
                    Gn(jn(n, e), t, o.type),
                    ke(o)
                      ? (2 & n.flags && wr(n), cs(t, n), s.unshift(o))
                      : s.push(o));
                }
              return s;
            })(t, e, n),
            o = null === r ? null : { "": -1 };
          if (null !== i) {
            let r = 0;
            (s = !0), hs(n, t.data.length, i.length);
            for (let t = 0; t < i.length; t++) {
              const e = i[t];
              e.providersResolver && e.providersResolver(e);
            }
            ls(t, n, i.length);
            let a = !1,
              l = !1;
            for (let s = 0; s < i.length; s++) {
              const c = i[s];
              (n.mergedAttrs = Pn(n.mergedAttrs, c.hostAttrs)),
                ds(t, e, c),
                us(t.data.length - 1, c, o),
                null !== c.contentQueries && (n.flags |= 8),
                (null === c.hostBindings &&
                  null === c.hostAttrs &&
                  0 === c.hostVars) ||
                  (n.flags |= 128),
                !a &&
                  (c.onChanges || c.onInit || c.doCheck) &&
                  ((t.preOrderHooks || (t.preOrderHooks = [])).push(
                    n.index - 19
                  ),
                  (a = !0)),
                l ||
                  (!c.onChanges && !c.doCheck) ||
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(
                    n.index - 19
                  ),
                  (l = !0)),
                is(t, c),
                (r += c.hostVars);
            }
            !(function (t, e) {
              const n = e.directiveEnd,
                r = t.data,
                s = e.attrs,
                i = [];
              let o = null,
                a = null;
              for (let l = e.directiveStart; l < n; l++) {
                const t = r[l],
                  e = t.inputs;
                i.push(null !== s ? gs(e, s) : null),
                  (o = ns(e, l, o)),
                  (a = ns(t.outputs, l, a));
              }
              null !== o &&
                (o.hasOwnProperty("class") && (e.flags |= 16),
                o.hasOwnProperty("style") && (e.flags |= 32)),
                (e.initialInputs = i),
                (e.inputs = o),
                (e.outputs = a);
            })(t, n),
              os(t, e, r);
          }
          o &&
            (function (t, e, n) {
              if (e) {
                const r = (t.localNames = []);
                for (let t = 0; t < e.length; t += 2) {
                  const s = n[e[t + 1]];
                  if (null == s)
                    throw new Error(`Export of name '${e[t + 1]}' not found!`);
                  r.push(e[t], s);
                }
              }
            })(n, r, o);
        }
        return (n.mergedAttrs = Pn(n.mergedAttrs, n.attrs)), s;
      }
      function is(t, e) {
        const n = t.expandoInstructions;
        n.push(e.hostBindings), 0 !== e.hostVars && n.push(e.hostVars);
      }
      function os(t, e, n) {
        for (let r = 0; r < n; r++)
          e.push(Mr), t.blueprint.push(Mr), t.data.push(null);
      }
      function as(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function ls(t, e, n) {
        const r = 19 - e.index,
          s = t.data.length - (65535 & e.providerIndexes);
        (t.expandoInstructions || (t.expandoInstructions = [])).push(r, s, n);
      }
      function cs(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function us(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
          ke(e) && (n[""] = t);
        }
      }
      function hs(t, e, n) {
        (t.flags |= 1),
          (t.directiveStart = e),
          (t.directiveEnd = e + n),
          (t.providerIndexes = e);
      }
      function ds(t, e, n) {
        t.data.push(n);
        const r = n.factory || (n.factory = _e(n.type)),
          s = new xn(r, ke(n), null);
        t.blueprint.push(s), e.push(s);
      }
      function ps(t, e, n) {
        const r = De(e, t),
          s = Xr(n),
          i = t[10],
          o = bs(
            t,
            Gr(t, s, null, n.onPush ? 64 : 16, r, e, i, i.createRenderer(r, n))
          );
        t[e.index] = o;
      }
      function fs(t, e, n, r, s, i) {
        const o = i[e];
        if (null !== o) {
          const t = r.setInput;
          for (let e = 0; e < o.length; ) {
            const s = o[e++],
              i = o[e++],
              a = o[e++];
            null !== t ? r.setInput(n, a, s, i) : (n[i] = a);
          }
        }
      }
      function gs(t, e) {
        let n = null,
          r = 0;
        for (; r < e.length; ) {
          const s = e[r];
          if (0 !== s)
            if (5 !== s) {
              if ("number" == typeof s) break;
              t.hasOwnProperty(s) &&
                (null === n && (n = []), n.push(s, t[s], e[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function ms(t, e, n, r) {
        return new Array(t, !0, -2, e, null, null, r, n, null);
      }
      function ys(t, e) {
        const n = t[5];
        for (let r = 0; r < n.length; r++) {
          const t = n[r],
            s = t[3][3][16];
          if (s !== e && 0 == (16 & s[2])) {
            const e = t[1];
            Wr(e, t, e.template, t[8]);
          }
        }
      }
      function vs(t, e) {
        const n = Ve(e, t);
        if (Fe(n) && 80 & n[2]) {
          const t = n[1];
          Wr(t, n, t.template, n[8]);
        }
      }
      function _s(t, e) {
        const n = Ve(e, t),
          r = n[1];
        !(function (t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n]);
        })(r, n),
          qr(r, n, n[8]);
      }
      function bs(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function ws(t) {
        for (; t; ) {
          t[2] |= 64;
          const e = Dr(t);
          if (Pe(t) && !e) return t;
          t = e;
        }
        return null;
      }
      function Cs(t, e, n) {
        const r = e[10];
        r.begin && r.begin();
        try {
          Wr(t, e, t.template, n);
        } catch (s) {
          throw (Os(e, s), s);
        } finally {
          r.end && r.end();
        }
      }
      function xs(t) {
        !(function (t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              r = Ue(n),
              s = r[1];
            Zr(s, r, s.template, n);
          }
        })(t[8]);
      }
      function Ss(t, e, n) {
        on(0), e(t, n);
      }
      const Es = (() => Promise.resolve(null))();
      function ks(t) {
        return t[7] || (t[7] = []);
      }
      function Ps(t) {
        return t.cleanup || (t.cleanup = []);
      }
      function Os(t, e) {
        const n = t[9],
          r = n ? n.get(rr, null) : null;
        r && r.handleError(e);
      }
      function As(t, e, n, r, s) {
        for (let i = 0; i < n.length; ) {
          const o = n[i++],
            a = n[i++],
            l = e[o],
            c = t.data[o];
          null !== c.setInput ? c.setInput(l, s, r, a) : (l[a] = s);
        }
      }
      function Is(t, e, n) {
        const r = Me(e, t),
          s = t[11];
        Ae(s) ? s.setValue(r, n) : (r.textContent = n);
      }
      function Ts(t, e) {
        const n = e[3];
        return -1 === t.index ? (Ce(n) ? n : null) : n;
      }
      function Ms(t, e) {
        const n = Ts(t, e);
        return n ? zs(e[11], n[7]) : null;
      }
      function Ds(t, e, n, r, s) {
        if (null != r) {
          let i,
            o = !1;
          Ce(r) ? (i = r) : we(r) && ((o = !0), (r = r[0]));
          const a = Te(r);
          0 === t && null !== n
            ? null == s
              ? Hs(e, n, a)
              : js(e, n, a, s || null)
            : 1 === t && null !== n
            ? js(e, n, a, s || null)
            : 2 === t
            ? (function (t, e, n) {
                const r = zs(t, e);
                r &&
                  (function (t, e, n, r) {
                    Ae(t) ? t.removeChild(e, n, r) : e.removeChild(n);
                  })(t, r, e, n);
              })(e, a, o)
            : 3 === t && e.destroyNode(a),
            null != i &&
              (function (t, e, n, r, s) {
                const i = n[7];
                i !== Te(n) && Ds(e, t, r, i, s);
                for (let o = 9; o < n.length; o++) {
                  const s = n[o];
                  Ws(s[1], s, t, e, r, i);
                }
              })(e, t, i, n, s);
        }
      }
      function Rs(t, e, n, r) {
        const s = Ms(t.node, e);
        s && Ws(t, e, e[11], n ? 1 : 2, s, r);
      }
      function Ns(t, e) {
        const n = t[5],
          r = n.indexOf(e);
        n.splice(r, 1);
      }
      function Vs(t, e) {
        if (t.length <= 9) return;
        const n = 9 + e,
          r = t[n];
        if (r) {
          const s = r[17];
          null !== s && s !== t && Ns(s, r), e > 0 && (t[n - 1][4] = r[4]);
          const i = ee(t, 9 + e);
          Rs(r[1], r, !1, null);
          const o = i[5];
          null !== o && o.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        return r;
      }
      function Us(t, e) {
        if (!(256 & e[2])) {
          const n = e[11];
          Ae(n) && n.destroyNode && Ws(t, e, n, 3, null, null),
            (function (t) {
              let e = t[13];
              if (!e) return Fs(t[1], t);
              for (; e; ) {
                let n = null;
                if (we(e)) n = e[13];
                else {
                  const t = e[9];
                  t && (n = t);
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; )
                    we(e) && Fs(e[1], e), (e = Ls(e, t));
                  null === e && (e = t), we(e) && Fs(e[1], e), (n = e && e[4]);
                }
                e = n;
              }
            })(e);
        }
      }
      function Ls(t, e) {
        let n;
        return we(t) && (n = t[6]) && 2 === n.type
          ? Ts(n, t)
          : t[3] === e
          ? null
          : t[3];
      }
      function Fs(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function (t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const t = e[n[r]];
                  t instanceof xn || n[r + 1].call(t);
                }
            })(t, e),
            (function (t, e) {
              const n = t.cleanup;
              if (null !== n) {
                const t = e[7];
                for (let r = 0; r < n.length - 1; r += 2)
                  if ("string" == typeof n[r]) {
                    const s = n[r + 1],
                      i = "function" == typeof s ? s(e) : Te(e[s]),
                      o = t[n[r + 2]],
                      a = n[r + 3];
                    "boolean" == typeof a
                      ? i.removeEventListener(n[r], o, a)
                      : a >= 0
                      ? t[a]()
                      : t[-a].unsubscribe(),
                      (r += 2);
                  } else n[r].call(t[n[r + 1]]);
                e[7] = null;
              }
            })(t, e);
          const n = e[6];
          n && 3 === n.type && Ae(e[11]) && e[11].destroy();
          const r = e[17];
          if (null !== r && Ce(e[3])) {
            r !== e[3] && Ns(r, e);
            const n = e[5];
            null !== n && n.detachView(t);
          }
        }
      }
      function js(t, e, n, r) {
        Ae(t) ? t.insertBefore(e, n, r) : e.insertBefore(n, r, !0);
      }
      function Hs(t, e, n) {
        Ae(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function $s(t, e, n, r) {
        null !== r ? js(t, e, n, r) : Hs(t, e, n);
      }
      function zs(t, e) {
        return Ae(t) ? t.parentNode(e) : e.parentNode;
      }
      function Gs(t, e, n, r) {
        const s = (function (t, e, n) {
          let r = e.parent;
          for (; null != r && (4 === r.type || 5 === r.type); )
            r = (e = r).parent;
          if (null == r) {
            const t = n[6];
            return 2 === t.type ? Ms(t, n) : n[0];
          }
          if (e && 5 === e.type && 4 & e.flags) return De(e, n).parentNode;
          if (2 & r.flags) {
            const e = t.data,
              n = e[e[r.index].directiveStart].encapsulation;
            if (n !== oe.ShadowDom && n !== oe.Native) return null;
          }
          return De(r, n);
        })(t, r, e);
        if (null != s) {
          const t = e[11],
            i = (function (t, e) {
              if (2 === t.type) {
                const n = Ts(t, e);
                return null === n ? null : Bs(n.indexOf(e, 9) - 9, n);
              }
              return 4 === t.type || 5 === t.type ? De(t, e) : null;
            })(r.parent || e[6], e);
          if (Array.isArray(n))
            for (let e = 0; e < n.length; e++) $s(t, s, n[e], i);
          else $s(t, s, n, i);
        }
      }
      function Bs(t, e) {
        const n = 9 + t + 1;
        if (n < e.length) {
          const t = e[n],
            r = t[1].firstChild;
          if (null !== r)
            return (function t(e, n) {
              if (null !== n) {
                const r = n.type;
                if (3 === r) return De(n, e);
                if (0 === r) return Bs(-1, e[n.index]);
                if (4 === r || 5 === r) {
                  const r = n.child;
                  if (null !== r) return t(e, r);
                  {
                    const t = e[n.index];
                    return Ce(t) ? Bs(-1, t) : Te(t);
                  }
                }
                {
                  const r = e[16],
                    s = r[6],
                    i = Dr(r),
                    o = s.projection[n.projection];
                  return null != o ? t(i, o) : t(e, n.next);
                }
              }
              return null;
            })(t, r);
        }
        return e[7];
      }
      function qs(t, e, n, r, s, i, o) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          o && 0 === e && (a && br(Te(a), r), (n.flags |= 4)),
            64 != (64 & n.flags) &&
              (4 === l || 5 === l
                ? (qs(t, e, n.child, r, s, i, !1), Ds(e, t, s, a, i))
                : 1 === l
                ? Zs(t, e, r, n, s, i)
                : Ds(e, t, s, a, i)),
            (n = o ? n.projectionNext : n.next);
        }
      }
      function Ws(t, e, n, r, s, i) {
        qs(n, r, t.node.child, e, s, i, !1);
      }
      function Zs(t, e, n, r, s, i) {
        const o = n[16],
          a = o[6].projection[r.projection];
        if (Array.isArray(a))
          for (let l = 0; l < a.length; l++) Ds(e, t, s, a[l], i);
        else qs(t, e, a, o[3], s, i, !0);
      }
      function Qs(t, e, n) {
        Ae(t) ? t.setAttribute(e, "style", n) : (e.style.cssText = n);
      }
      function Ys(t, e, n) {
        Ae(t)
          ? "" === n
            ? t.removeAttribute(e, "class")
            : t.setAttribute(e, "class", n)
          : (e.className = n);
      }
      class Ks {
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._viewContainerRef = null),
            (this._tViewNode = null);
        }
        get rootNodes() {
          const t = this._lView;
          return null == t[0]
            ? (function t(e, n, r, s, i = !1) {
                for (; null !== r; ) {
                  const o = n[r.index];
                  if ((null !== o && s.push(Te(o)), Ce(o)))
                    for (let e = 9; e < o.length; e++) {
                      const n = o[e],
                        r = n[1].firstChild;
                      null !== r && t(n[1], n, r, s);
                    }
                  const a = r.type;
                  if (4 === a || 5 === a) t(e, n, r.child, s);
                  else if (1 === a) {
                    const e = n[16],
                      i = e[6],
                      o = Dr(e);
                    let a = i.projection[r.projection];
                    null !== a && null !== o && t(o[1], o, a, s, !0);
                  }
                  r = i ? r.projectionNext : r.next;
                }
                return s;
              })(t[1], t, t[6].child, [])
            : [];
        }
        get context() {
          return this._lView[8];
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._viewContainerRef) {
            const t = this._viewContainerRef.indexOf(this);
            t > -1 && this._viewContainerRef.detach(t),
              (this._viewContainerRef = null);
          }
          Us(this._lView[1], this._lView);
        }
        onDestroy(t) {
          var e, n, r;
          (e = this._lView[1]),
            (r = t),
            ks((n = this._lView)).push(r),
            e.firstCreatePass && Ps(e).push(n[7].length - 1, null);
        }
        markForCheck() {
          ws(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          Cs(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (t, e, n) {
            Je(!0);
            try {
              Cs(t, e, n);
            } finally {
              Je(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef(t) {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._viewContainerRef = t;
        }
        detachFromAppRef() {
          var t;
          (this._appRef = null),
            Ws(this._lView[1], (t = this._lView), t[11], 2, null, null);
        }
        attachToAppRef(t) {
          if (this._viewContainerRef)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = t;
        }
      }
      class Js extends Ks {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          xs(this._view);
        }
        checkNoChanges() {
          !(function (t) {
            Je(!0);
            try {
              xs(t);
            } finally {
              Je(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      let Xs, ti, ei;
      function ni(t, e, n) {
        return Xs || (Xs = class extends t {}), new Xs(De(e, n));
      }
      function ri(t, e, n, r) {
        return (
          ti ||
            (ti = class extends t {
              constructor(t, e, n) {
                super(),
                  (this._declarationView = t),
                  (this._declarationTContainer = e),
                  (this.elementRef = n);
              }
              createEmbeddedView(t) {
                const e = this._declarationTContainer.tViews,
                  n = Gr(this._declarationView, e, t, 16, null, e.node);
                n[17] =
                  this._declarationView[this._declarationTContainer.index];
                const r = this._declarationView[5];
                null !== r && (n[5] = r.createEmbeddedView(e)), qr(e, n, t);
                const s = new Ks(n);
                return (s._tViewNode = n[6]), s;
              }
            }),
          0 === n.type ? new ti(r, n, ni(e, n, r)) : null
        );
      }
      function si(t, e, n, r) {
        let s;
        ei ||
          (ei = class extends t {
            constructor(t, e, n) {
              super(),
                (this._lContainer = t),
                (this._hostTNode = e),
                (this._hostView = n);
            }
            get element() {
              return ni(e, this._hostTNode, this._hostView);
            }
            get injector() {
              return new Jn(this._hostTNode, this._hostView);
            }
            get parentInjector() {
              const t = zn(this._hostTNode, this._hostView),
                e = Mn(t, this._hostView),
                n = (function (t, e, n) {
                  if (n.parent && -1 !== n.parent.injectorIndex) {
                    const t = n.parent.injectorIndex;
                    let e = n.parent;
                    for (; null != e.parent && t == e.parent.injectorIndex; )
                      e = e.parent;
                    return e;
                  }
                  let r = Tn(t),
                    s = e,
                    i = e[6];
                  for (; r > 1; ) (s = s[15]), (i = s[6]), r--;
                  return i;
                })(t, this._hostView, this._hostTNode);
              return An(t) && null != n
                ? new Jn(n, e)
                : new Jn(null, this._hostView);
            }
            clear() {
              for (; this.length > 0; ) this.remove(this.length - 1);
            }
            get(t) {
              return (
                (null !== this._lContainer[8] && this._lContainer[8][t]) || null
              );
            }
            get length() {
              return this._lContainer.length - 9;
            }
            createEmbeddedView(t, e, n) {
              const r = t.createEmbeddedView(e || {});
              return this.insert(r, n), r;
            }
            createComponent(t, e, n, r, s) {
              const i = n || this.parentInjector;
              if (!s && null == t.ngModule && i) {
                const t = i.get(Kt, null);
                t && (s = t);
              }
              const o = t.create(i, r, void 0, s);
              return this.insert(o.hostView, e), o;
            }
            insert(t, e) {
              const n = t._lView,
                r = n[1];
              if (t.destroyed)
                throw new Error(
                  "Cannot insert a destroyed View in a ViewContainer!"
                );
              if ((this.allocateContainerIfNeeded(), Ce(n[3]))) {
                const e = this.indexOf(t);
                if (-1 !== e) this.detach(e);
                else {
                  const e = n[3],
                    r = new ei(e, e[6], e[3]);
                  r.detach(r.indexOf(t));
                }
              }
              const s = this._adjustIndex(e);
              return (
                (function (t, e, n, r) {
                  const s = 9 + r,
                    i = n.length;
                  r > 0 && (n[s - 1][4] = e),
                    r < i - 9
                      ? ((e[4] = n[s]), te(n, 9 + r, e))
                      : (n.push(e), (e[4] = null)),
                    (e[3] = n);
                  const o = e[17];
                  null !== o &&
                    n !== o &&
                    (function (t, e) {
                      const n = t[5],
                        r = e[3][3][16];
                      16 != (16 & r[2]) && e[16] !== r && (t[2] |= 1),
                        null === n ? (t[5] = [e]) : n.push(e);
                    })(o, e);
                  const a = e[5];
                  null !== a && a.insertView(t), (e[2] |= 128);
                })(r, n, this._lContainer, s),
                Rs(r, n, !0, Bs(s, this._lContainer)),
                t.attachToViewContainerRef(this),
                te(this._lContainer[8], s, t),
                t
              );
            }
            move(t, e) {
              if (t.destroyed)
                throw new Error(
                  "Cannot move a destroyed View in a ViewContainer!"
                );
              return this.insert(t, e);
            }
            indexOf(t) {
              const e = this._lContainer[8];
              return null !== e ? e.indexOf(t) : -1;
            }
            remove(t) {
              this.allocateContainerIfNeeded();
              const e = this._adjustIndex(t, -1);
              (function (t, e) {
                const n = Vs(t, e);
                n && Us(n[1], n);
              })(this._lContainer, e),
                ee(this._lContainer[8], e);
            }
            detach(t) {
              this.allocateContainerIfNeeded();
              const e = this._adjustIndex(t, -1),
                n = Vs(this._lContainer, e);
              return n && null != ee(this._lContainer[8], e) ? new Ks(n) : null;
            }
            _adjustIndex(t, e = 0) {
              return null == t ? this.length + e : t;
            }
            allocateContainerIfNeeded() {
              null === this._lContainer[8] && (this._lContainer[8] = []);
            }
          });
        const i = r[n.index];
        if (Ce(i))
          (s = i),
            (function (t, e) {
              t[2] = -2;
            })(s);
        else {
          let t;
          if (4 === n.type) t = Te(i);
          else if (((t = r[11].createComment("")), Pe(r))) {
            const e = r[11],
              s = De(n, r);
            js(
              e,
              zs(e, s),
              t,
              (function (t, e) {
                return Ae(t) ? t.nextSibling(e) : e.nextSibling;
              })(e, s)
            );
          } else Gs(r[1], r, t, n);
          (r[n.index] = s = ms(i, r, t, n)), bs(r, s);
        }
        return new ei(s, n, r);
      }
      let ii = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => oi()), t;
      })();
      const oi = function (t = !1) {
          return (function (t, e, n) {
            if (!n && Se(t)) {
              const n = Ve(t.index, e);
              return new Ks(n, n);
            }
            return 3 === t.type || 0 === t.type || 4 === t.type || 5 === t.type
              ? new Ks(e[16], e)
              : null;
          })(We(), Ge(), t);
        },
        ai = new Ut("Set Injector scope."),
        li = {},
        ci = {},
        ui = [];
      let hi = void 0;
      function di() {
        return void 0 === hi && (hi = new Yt()), hi;
      }
      function pi(t, e = null, n = null, r) {
        return new fi(t, n, e || di(), r);
      }
      class fi {
        constructor(t, e, n, r = null) {
          (this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const s = [];
          e && Xt(e, (n) => this.processProvider(n, t, e)),
            Xt([t], (t) => this.processInjectorType(t, [], s)),
            this.records.set(Lt, yi(void 0, this));
          const i = this.records.get(ai);
          (this.scope = null != i ? i.value : null),
            (this.source = r || ("object" == typeof t ? null : _t(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(t, e = Ft, n = ot.Default) {
          this.assertNotDestroyed();
          const r = Gt(this);
          try {
            if (!(n & ot.SkipSelf)) {
              let e = this.records.get(t);
              if (void 0 === e) {
                const n =
                  ("function" == typeof (s = t) ||
                    ("object" == typeof s && s instanceof Ut)) &&
                  ht(t);
                (e = n && this.injectableDefInScope(n) ? yi(gi(t), li) : null),
                  this.records.set(t, e);
              }
              if (null != e) return this.hydrate(t, e);
            }
            return (n & ot.Self ? di() : this.parent).get(
              t,
              (e = n & ot.Optional && e === Ft ? null : e)
            );
          } catch (i) {
            if ("NullInjectorError" === i.name) {
              if (
                ((i.ngTempTokenPath = i.ngTempTokenPath || []).unshift(_t(t)),
                r)
              )
                throw i;
              return (function (t, e, n, r) {
                const s = t.ngTempTokenPath;
                throw (
                  (e.__source && s.unshift(e.__source),
                  (t.message = (function (t, e, n, r = null) {
                    t =
                      t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1)
                        ? t.substr(2)
                        : t;
                    let s = _t(e);
                    if (Array.isArray(e)) s = e.map(_t).join(" -> ");
                    else if ("object" == typeof e) {
                      let t = [];
                      for (let n in e)
                        if (e.hasOwnProperty(n)) {
                          let r = e[n];
                          t.push(
                            n +
                              ":" +
                              ("string" == typeof r ? JSON.stringify(r) : _t(r))
                          );
                        }
                      s = `{${t.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${s}]: ${t.replace(
                      jt,
                      "\n  "
                    )}`;
                  })("\n" + t.message, s, n, r)),
                  (t.ngTokenPath = s),
                  (t.ngTempTokenPath = null),
                  t)
                );
              })(i, t, "R3InjectorError", this.source);
            }
            throw i;
          } finally {
            Gt(r);
          }
          var s;
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((e, n) => t.push(_t(n))),
            `R3Injector[${t.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error("Injector has already been destroyed.");
        }
        processInjectorType(t, e, n) {
          if (!(t = xt(t))) return !1;
          let r = pt(t);
          const s = (null == r && t.ngModule) || void 0,
            i = void 0 === s ? t : s,
            o = -1 !== n.indexOf(i);
          if ((void 0 !== s && (r = pt(s)), null == r)) return !1;
          if (null != r.imports && !o) {
            let t;
            n.push(i);
            try {
              Xt(r.imports, (r) => {
                this.processInjectorType(r, e, n) &&
                  (void 0 === t && (t = []), t.push(r));
              });
            } finally {
            }
            if (void 0 !== t)
              for (let e = 0; e < t.length; e++) {
                const { ngModule: n, providers: r } = t[e];
                Xt(r, (t) => this.processProvider(t, n, r || ui));
              }
          }
          this.injectorDefTypes.add(i), this.records.set(i, yi(r.factory, li));
          const a = r.providers;
          if (null != a && !o) {
            const e = t;
            Xt(a, (t) => this.processProvider(t, e, a));
          }
          return void 0 !== s && void 0 !== t.providers;
        }
        processProvider(t, e, n) {
          let r = _i((t = xt(t))) ? t : xt(t && t.provide);
          const s = (function (t, e, n) {
            return vi(t) ? yi(void 0, t.useValue) : yi(mi(t, e, n), li);
          })(t, e, n);
          if (_i(t) || !0 !== t.multi) {
            const t = this.records.get(r);
            t && void 0 !== t.multi && Cr();
          } else {
            let e = this.records.get(r);
            e
              ? void 0 === e.multi && Cr()
              : ((e = yi(void 0, li, !0)),
                (e.factory = () => Qt(e.multi)),
                this.records.set(r, e)),
              (r = t),
              e.multi.push(t);
          }
          this.records.set(r, s);
        }
        hydrate(t, e) {
          var n;
          return (
            e.value === ci
              ? (function (t) {
                  throw new Error(`Cannot instantiate cyclic dependency! ${t}`);
                })(_t(t))
              : e.value === li && ((e.value = ci), (e.value = e.factory())),
            "object" == typeof e.value &&
              e.value &&
              null !== (n = e.value) &&
              "object" == typeof n &&
              "function" == typeof n.ngOnDestroy &&
              this.onDestroy.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          return (
            !!t.providedIn &&
            ("string" == typeof t.providedIn
              ? "any" === t.providedIn || t.providedIn === this.scope
              : this.injectorDefTypes.has(t.providedIn))
          );
        }
      }
      function gi(t) {
        const e = ht(t),
          n = null !== e ? e.factory : _e(t);
        if (null !== n) return n;
        const r = pt(t);
        if (null !== r) return r.factory;
        if (t instanceof Ut)
          throw new Error(`Token ${_t(t)} is missing a \u0275prov definition.`);
        if (t instanceof Function)
          return (function (t) {
            const e = t.length;
            if (e > 0) {
              const n = (function (t, e) {
                const n = [];
                for (let r = 0; r < t; r++) n.push("?");
                return n;
              })(e);
              throw new Error(
                `Can't resolve all parameters for ${_t(t)}: (${n.join(", ")}).`
              );
            }
            const n = (function (t) {
              const e = t && (t[ft] || t[yt] || (t[mt] && t[mt]()));
              if (e) {
                const n = (function (t) {
                  if (t.hasOwnProperty("name")) return t.name;
                  const e = ("" + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\n` +
                      `This will become an error in v10. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new Error("unreachable");
      }
      function mi(t, e, n) {
        let r = void 0;
        if (_i(t)) {
          const e = xt(t);
          return _e(e) || gi(e);
        }
        if (vi(t)) r = () => xt(t.useValue);
        else if ((s = t) && s.useFactory)
          r = () => t.useFactory(...Qt(t.deps || []));
        else if (
          (function (t) {
            return !(!t || !t.useExisting);
          })(t)
        )
          r = () => Wt(xt(t.useExisting));
        else {
          const s = xt(t && (t.useClass || t.provide));
          if (
            (s ||
              (function (t, e, n) {
                let r = "";
                throw (
                  (t &&
                    e &&
                    (r = ` - only instances of Provider and Type are allowed, got: [${e
                      .map((t) => (t == n ? "?" + n + "?" : "..."))
                      .join(", ")}]`),
                  new Error(`Invalid provider for the NgModule '${_t(t)}'` + r))
                );
              })(e, n, t),
            !(function (t) {
              return !!t.deps;
            })(t))
          )
            return _e(s) || gi(s);
          r = () => new s(...Qt(t.deps));
        }
        var s;
        return r;
      }
      function yi(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function vi(t) {
        return null !== t && "object" == typeof t && Ht in t;
      }
      function _i(t) {
        return "function" == typeof t;
      }
      const bi = function (t, e, n) {
        return (function (t, e = null, n = null, r) {
          const s = pi(t, e, n, r);
          return s._resolveInjectorDefTypes(), s;
        })({ name: n }, e, t, n);
      };
      let wi = (() => {
        class t {
          static create(t, e) {
            return Array.isArray(t)
              ? bi(t, e, "")
              : bi(t.providers, t.parent, t.name || "");
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = Ft),
          (t.NULL = new Yt()),
          (t.ɵprov = ct({
            token: t,
            providedIn: "any",
            factory: () => Wt(Lt),
          })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      const Ci = new Ut("AnalyzeForEntryComponents");
      let xi = new Map();
      const Si = new Set();
      function Ei(t) {
        return "string" == typeof t ? t : t.text();
      }
      function ki(t, e) {
        let n = t.styles,
          r = t.classes,
          s = 0;
        for (let i = 0; i < e.length; i++) {
          const t = e[i];
          "number" == typeof t
            ? (s = t)
            : 1 == s
            ? (r = bt(r, t))
            : 2 == s && (n = bt(n, t + ": " + e[++i] + ";"));
        }
        null !== n && (t.styles = n), null !== r && (t.classes = r);
      }
      let Pi = null;
      function Oi() {
        if (!Pi) {
          const t = At.Symbol;
          if (t && t.iterator) Pi = t.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const n = t[e];
              "entries" !== n &&
                "size" !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (Pi = n);
            }
          }
        }
        return Pi;
      }
      function Ai(t, e) {
        return (
          t === e ||
          ("number" == typeof t && "number" == typeof e && isNaN(t) && isNaN(e))
        );
      }
      class Ii {
        constructor(t) {
          this.wrapped = t;
        }
        static wrap(t) {
          return new Ii(t);
        }
        static unwrap(t) {
          return Ii.isWrapped(t) ? t.wrapped : t;
        }
        static isWrapped(t) {
          return t instanceof Ii;
        }
      }
      function Ti(t) {
        return (
          !!Mi(t) && (Array.isArray(t) || (!(t instanceof Map) && Oi() in t))
        );
      }
      function Mi(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t);
      }
      function Di(t, e, n) {
        return (t[e] = n);
      }
      function Ri(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function Ni(t, e, n, r) {
        const s = Ri(t, e, n);
        return Ri(t, e + 1, r) || s;
      }
      function Vi(t, e, n, r) {
        const s = Ge();
        return (
          Ri(s, en(), e) &&
            (Be(),
            (function (t, e, n, r, s, i) {
              const o = De(t, e),
                a = e[11];
              if (null == r)
                Ae(a) ? a.removeAttribute(o, n, i) : o.removeAttribute(n);
              else {
                const e = null == s ? Dn(r) : s(r, t.tagName || "", n);
                Ae(a)
                  ? a.setAttribute(o, n, e, i)
                  : i
                  ? o.setAttributeNS(i, n, e)
                  : o.setAttribute(n, e);
              }
            })(mn(), s, t, e, n, r)),
          Vi
        );
      }
      function Ui(t, e, n, r) {
        return Ri(t, en(), n) ? e + Dn(n) + r : Mr;
      }
      function Li(t, e, n, r, s, i, o, a) {
        const l = Ge(),
          c = Be(),
          u = t + 19,
          h = c.firstCreatePass
            ? (function (t, e, n, r, s, i, o, a, l) {
                const c = e.consts,
                  u = Br(e, n[6], t, 0, o || null, je(c, a));
                ss(e, n, u, je(c, l)), yn(e, u);
                const h = (u.tViews = ts(
                    2,
                    -1,
                    r,
                    s,
                    i,
                    e.directiveRegistry,
                    e.pipeRegistry,
                    null,
                    e.schemas,
                    c
                  )),
                  d = es(0, null, 2, -1, null, null);
                return (
                  (d.injectorIndex = u.injectorIndex),
                  (h.node = d),
                  null !== e.queries &&
                    (e.queries.template(e, u),
                    (h.queries = e.queries.embeddedTView(u))),
                  u
                );
              })(t, c, l, e, n, r, s, i, o)
            : c.data[u];
        Ze(h, !1);
        const d = l[11].createComment("");
        Gs(c, l, d, h),
          br(d, l),
          bs(l, (l[u] = ms(d, l, d, h))),
          Ee(h) && Kr(c, l, h),
          null != o && Jr(l, h, a);
      }
      function Fi(t) {
        return Ne($e.lFrame.contextLView, t);
      }
      function ji(t, e = ot.Default) {
        const n = Ge();
        return null == n ? Wt(t, e) : Bn(We(), n, xt(t), e);
      }
      function Hi(t) {
        return (function (t, e) {
          if ("class" === e) return t.classes;
          if ("style" === e) return t.styles;
          const n = t.attrs;
          if (n) {
            const t = n.length;
            let r = 0;
            for (; r < t; ) {
              const s = n[r];
              if (En(s)) break;
              if (0 === s) r += 2;
              else if ("number" == typeof s)
                for (r++; r < t && "string" == typeof n[r]; ) r++;
              else {
                if (s === e) return n[r + 1];
                r += 2;
              }
            }
          }
          return null;
        })(We(), t);
      }
      function $i() {
        throw new Error("invalid");
      }
      function zi(t, e, n) {
        const r = Ge();
        return Ri(r, en(), e) && rs(Be(), mn(), r, t, e, r[11], n, !1), zi;
      }
      function Gi(t, e, n, r, s) {
        const i = s ? "class" : "style";
        As(t, n, e.inputs[i], i, r);
      }
      function Bi(t, e, n, r) {
        const s = Ge(),
          i = Be(),
          o = 19 + t,
          a = s[11],
          l = (s[o] = zr(e, a, $e.lFrame.currentNamespace)),
          c = i.firstCreatePass
            ? (function (t, e, n, r, s, i, o) {
                const a = e.consts,
                  l = je(a, i),
                  c = Br(e, n[6], t, 3, s, l);
                return (
                  ss(e, n, c, je(a, o)),
                  null !== c.mergedAttrs && ki(c, c.mergedAttrs),
                  null !== e.queries && e.queries.elementStart(e, c),
                  c
                );
              })(t, i, s, 0, e, n, r)
            : i.data[o];
        Ze(c, !0);
        const u = c.mergedAttrs;
        null !== u && Sn(a, l, u);
        const h = c.classes;
        null !== h && Ys(a, l, h);
        const d = c.styles;
        null !== d && Qs(a, l, d),
          Gs(i, s, l, c),
          0 === $e.lFrame.elementDepthCount && br(l, s),
          $e.lFrame.elementDepthCount++,
          Ee(c) && (Kr(i, s, c), Yr(i, c, s)),
          null !== r && Jr(s, c);
      }
      function qi() {
        let t = We();
        Qe() ? Ye() : ((t = t.parent), Ze(t, !1));
        const e = t;
        $e.lFrame.elementDepthCount--;
        const n = Be();
        n.firstCreatePass && (yn(n, t), xe(t) && n.queries.elementEnd(t)),
          null !== e.classes &&
            (function (t) {
              return 0 != (16 & t.flags);
            })(e) &&
            Gi(n, e, Ge(), e.classes, !0),
          null !== e.styles &&
            (function (t) {
              return 0 != (32 & t.flags);
            })(e) &&
            Gi(n, e, Ge(), e.styles, !1);
      }
      function Wi(t, e, n, r) {
        Bi(t, e, n, r), qi();
      }
      function Zi(t, e, n) {
        const r = Ge(),
          s = Be(),
          i = t + 19,
          o = s.firstCreatePass
            ? (function (t, e, n, r, s) {
                const i = e.consts,
                  o = je(i, r),
                  a = Br(e, n[6], t, 4, "ng-container", o);
                return (
                  null !== o && ki(a, o),
                  ss(e, n, a, je(i, s)),
                  null !== e.queries && e.queries.elementStart(e, a),
                  a
                );
              })(t, s, r, e, n)
            : s.data[i];
        Ze(o, !0);
        const a = (r[i] = r[11].createComment(""));
        Gs(s, r, a, o),
          br(a, r),
          Ee(o) && (Kr(s, r, o), Yr(s, o, r)),
          null != n && Jr(r, o);
      }
      function Qi() {
        let t = We();
        const e = Be();
        Qe() ? Ye() : ((t = t.parent), Ze(t, !1)),
          e.firstCreatePass && (yn(e, t), xe(t) && e.queries.elementEnd(t));
      }
      function Yi() {
        return Ge();
      }
      function Ki(t) {
        return !!t && "function" == typeof t.then;
      }
      function Ji(t) {
        return !!t && "function" == typeof t.subscribe;
      }
      function Xi(t, e, n = !1, r) {
        const s = Ge(),
          i = Be(),
          o = We();
        return (
          (function (t, e, n, r, s, i, o = !1, a) {
            const l = Ee(r),
              c = t.firstCreatePass && (t.cleanup || (t.cleanup = [])),
              u = ks(e);
            let h = !0;
            if (3 === r.type) {
              const d = De(r, e),
                p = a ? a(d) : ae,
                f = p.target || d,
                g = u.length,
                m = a ? (t) => a(Te(t[r.index])).target : r.index;
              if (Ae(n)) {
                let o = null;
                if (
                  (!a &&
                    l &&
                    (o = (function (t, e, n, r) {
                      const s = t.cleanup;
                      if (null != s)
                        for (let i = 0; i < s.length - 1; i += 2) {
                          const t = s[i];
                          if (t === n && s[i + 1] === r) {
                            const t = e[7],
                              n = s[i + 2];
                            return t.length > n ? t[n] : null;
                          }
                          "string" == typeof t && (i += 2);
                        }
                      return null;
                    })(t, e, s, r.index)),
                  null !== o)
                )
                  ((o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = i),
                    (o.__ngLastListenerFn__ = i),
                    (h = !1);
                else {
                  i = eo(r, e, i, !1);
                  const t = n.listen(p.name || f, s, i);
                  u.push(i, t), c && c.push(s, m, g, g + 1);
                }
              } else
                (i = eo(r, e, i, !0)),
                  f.addEventListener(s, i, o),
                  u.push(i),
                  c && c.push(s, m, g, o);
            }
            const d = r.outputs;
            let p;
            if (h && null !== d && (p = d[s])) {
              const t = p.length;
              if (t)
                for (let n = 0; n < t; n += 2) {
                  const t = e[p[n]][p[n + 1]].subscribe(i),
                    o = u.length;
                  u.push(i, t), c && c.push(s, r.index, o, -(o + 1));
                }
            }
          })(i, s, s[11], o, t, e, n, r),
          Xi
        );
      }
      function to(t, e, n) {
        try {
          return !1 !== e(n);
        } catch (r) {
          return Os(t, r), !1;
        }
      }
      function eo(t, e, n, r) {
        return function s(i) {
          if (i === Function) return n;
          const o = 2 & t.flags ? Ve(t.index, e) : e;
          0 == (32 & e[2]) && ws(o);
          let a = to(e, n, i),
            l = s.__ngNextListenerFn__;
          for (; l; ) (a = to(e, l, i) && a), (l = l.__ngNextListenerFn__);
          return r && !1 === a && (i.preventDefault(), (i.returnValue = !1)), a;
        };
      }
      function no(t = 1) {
        return (function (t) {
          return ($e.lFrame.contextLView = (function (t, e) {
            for (; t > 0; ) (e = e[15]), t--;
            return e;
          })(t, $e.lFrame.contextLView))[8];
        })(t);
      }
      function ro(t, e, n) {
        return so(t, "", e, "", n), ro;
      }
      function so(t, e, n, r, s) {
        const i = Ge(),
          o = Ui(i, e, n, r);
        return o !== Mr && rs(Be(), mn(), i, t, o, i[11], s, !1), so;
      }
      const io = [];
      function oo(t, e, n, r, s) {
        const i = t[n + 1],
          o = null === e;
        let a = r ? Ur(i) : Fr(i),
          l = !1;
        for (; 0 !== a && (!1 === l || o); ) {
          const n = t[a + 1];
          ao(t[a], e) && ((l = !0), (t[a + 1] = r ? Hr(n) : Lr(n))),
            (a = r ? Ur(n) : Fr(n));
        }
        l && (t[n + 1] = r ? Lr(i) : Hr(i));
      }
      function ao(t, e) {
        return (
          null === t ||
          null == e ||
          (Array.isArray(t) ? t[1] : t) === e ||
          (!(!Array.isArray(t) || "string" != typeof e) && se(t, e) >= 0)
        );
      }
      function lo(t, e, n) {
        return uo(t, e, n, !1), lo;
      }
      function co(t, e) {
        return uo(t, e, null, !0), co;
      }
      function uo(t, e, n, r) {
        const s = Ge(),
          i = Be(),
          o = nn(2);
        if (
          (i.firstUpdatePass &&
            (function (t, e, n, r) {
              const s = t.data;
              if (null === s[n + 1]) {
                const i = s[fn() + 19],
                  o = (function (t, e) {
                    return e >= t.expandoStartIndex;
                  })(t, n);
                (function (t, e) {
                  return 0 != (t.flags & (e ? 16 : 32));
                })(i, r) &&
                  null === e &&
                  !o &&
                  (e = !1),
                  (e = (function (t, e, n, r) {
                    const s = (function (t) {
                      const e = $e.lFrame.currentDirectiveIndex;
                      return -1 === e ? null : t[e];
                    })(t);
                    let i = r ? e.residualClasses : e.residualStyles;
                    if (null === s)
                      0 === (r ? e.classBindings : e.styleBindings) &&
                        ((n = po((n = ho(null, t, e, n, r)), e.attrs, r)),
                        (i = null));
                    else {
                      const o = e.directiveStylingLast;
                      if (-1 === o || t[o] !== s)
                        if (((n = ho(s, t, e, n, r)), null === i)) {
                          let n = (function (t, e, n) {
                            const r = n ? e.classBindings : e.styleBindings;
                            if (0 !== Fr(r)) return t[Ur(r)];
                          })(t, e, r);
                          void 0 !== n &&
                            Array.isArray(n) &&
                            ((n = ho(null, t, e, n[1], r)),
                            (n = po(n, e.attrs, r)),
                            (function (t, e, n, r) {
                              t[Ur(n ? e.classBindings : e.styleBindings)] = r;
                            })(t, e, r, n));
                        } else
                          i = (function (t, e, n) {
                            let r = void 0;
                            const s = e.directiveEnd;
                            for (let i = 1 + e.directiveStylingLast; i < s; i++)
                              r = po(r, t[i].hostAttrs, n);
                            return po(r, e.attrs, n);
                          })(t, e, r);
                    }
                    return (
                      void 0 !== i &&
                        (r ? (e.residualClasses = i) : (e.residualStyles = i)),
                      n
                    );
                  })(s, i, e, r)),
                  (function (t, e, n, r, s, i) {
                    let o = i ? e.classBindings : e.styleBindings,
                      a = Ur(o),
                      l = Fr(o);
                    t[r] = n;
                    let c,
                      u = !1;
                    if (Array.isArray(n)) {
                      const t = n;
                      (c = t[1]), (null === c || se(t, c) > 0) && (u = !0);
                    } else c = n;
                    if (s)
                      if (0 !== l) {
                        const e = Ur(t[a + 1]);
                        (t[r + 1] = Vr(e, a)),
                          0 !== e && (t[e + 1] = jr(t[e + 1], r)),
                          (t[a + 1] = (131071 & t[a + 1]) | (r << 17));
                      } else
                        (t[r + 1] = Vr(a, 0)),
                          0 !== a && (t[a + 1] = jr(t[a + 1], r)),
                          (a = r);
                    else
                      (t[r + 1] = Vr(l, 0)),
                        0 === a ? (a = r) : (t[l + 1] = jr(t[l + 1], r)),
                        (l = r);
                    u && (t[r + 1] = Lr(t[r + 1])),
                      oo(t, c, r, !0),
                      oo(t, c, r, !1),
                      (function (t, e, n, r, s) {
                        const i = s ? t.residualClasses : t.residualStyles;
                        null != i &&
                          "string" == typeof e &&
                          se(i, e) >= 0 &&
                          (n[r + 1] = Hr(n[r + 1]));
                      })(e, c, t, r, i),
                      (o = Vr(a, l)),
                      i ? (e.classBindings = o) : (e.styleBindings = o);
                  })(s, i, e, n, o, r);
              }
            })(i, t, o, r),
          e !== Mr && Ri(s, o, e))
        ) {
          let a;
          null == n &&
            (a = (function () {
              const t = $e.lFrame;
              return null === t ? null : t.currentSanitizer;
            })()) &&
            (n = a),
            (function (t, e, n, r, s, i, o, a) {
              if (3 !== e.type) return;
              const l = t.data,
                c = l[a + 1];
              go(1 == (1 & c) ? fo(l, e, n, s, Fr(c), o) : void 0) ||
                (go(i) ||
                  ((function (t) {
                    return 2 == (2 & t);
                  })(c) &&
                    (i = fo(l, null, n, s, a, o))),
                (function (t, e, n, r, s) {
                  const i = Ae(t);
                  if (e)
                    s
                      ? i
                        ? t.addClass(n, r)
                        : n.classList.add(r)
                      : i
                      ? t.removeClass(n, r)
                      : n.classList.remove(r);
                  else {
                    const e = -1 == r.indexOf("-") ? void 0 : 2;
                    null == s
                      ? i
                        ? t.removeStyle(n, r, e)
                        : n.style.removeProperty(r)
                      : i
                      ? t.setStyle(n, r, s, e)
                      : n.style.setProperty(r, s);
                  }
                })(r, o, Me(fn(), n), s, i));
            })(
              i,
              i.data[fn() + 19],
              s,
              s[11],
              t,
              (s[o + 1] = (function (t, e) {
                return (
                  null == t ||
                    ("function" == typeof e
                      ? (t = e(t))
                      : "string" == typeof e
                      ? (t += e)
                      : "object" == typeof t && (t = _t(ir(t)))),
                  t
                );
              })(e, n)),
              r,
              o
            );
        }
      }
      function ho(t, e, n, r, s) {
        let i = null;
        const o = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < o && ((i = e[a]), (r = po(r, i.hostAttrs, s)), i !== t);

        )
          a++;
        return null !== t && (n.directiveStylingLast = a), r;
      }
      function po(t, e, n) {
        const r = n ? 1 : 2;
        let s = -1;
        if (null !== e)
          for (let i = 0; i < e.length; i++) {
            const o = e[i];
            "number" == typeof o
              ? (s = o)
              : s === r &&
                (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]),
                ne(t, o, !!n || e[++i]));
          }
        return void 0 === t ? null : t;
      }
      function fo(t, e, n, r, s, i) {
        const o = null === e;
        let a = void 0;
        for (; s > 0; ) {
          const e = t[s],
            i = Array.isArray(e),
            l = i ? e[1] : e,
            c = null === l;
          let u = n[s + 1];
          u === Mr && (u = c ? io : void 0);
          let h = c ? re(u, r) : l === r ? u : void 0;
          if ((i && !go(h) && (h = re(e, r)), go(h) && ((a = h), o))) return a;
          const d = t[s + 1];
          s = o ? Ur(d) : Fr(d);
        }
        if (null !== e) {
          let t = i ? e.residualClasses : e.residualStyles;
          null != t && (a = re(t, r));
        }
        return a;
      }
      function go(t) {
        return void 0 !== t;
      }
      function mo(t, e = "") {
        const n = Ge(),
          r = Be(),
          s = t + 19,
          i = r.firstCreatePass ? Br(r, n[6], t, 3, null, null) : r.data[s],
          o = (n[s] = (function (t, e) {
            return Ae(e) ? e.createText(t) : e.createTextNode(t);
          })(e, n[11]));
        Gs(r, n, o, i), Ze(i, !1);
      }
      function yo(t) {
        return vo("", t, ""), yo;
      }
      function vo(t, e, n) {
        const r = Ge(),
          s = Ui(r, t, e, n);
        return s !== Mr && Is(r, fn(), s), vo;
      }
      function _o(t, e, n, r, s) {
        const i = Ge(),
          o = (function (t, e, n, r, s, i) {
            const o = Ni(t, tn(), n, s);
            return nn(2), o ? e + Dn(n) + r + Dn(s) + i : Mr;
          })(i, t, e, n, r, s);
        return o !== Mr && Is(i, fn(), o), _o;
      }
      function bo(t, e, n) {
        const r = Ge();
        return Ri(r, en(), e) && rs(Be(), mn(), r, t, e, r[11], n, !0), bo;
      }
      function wo(t, e) {
        const n = Ue(t)[1],
          r = n.data.length - 1;
        yn(n, { directiveStart: r, directiveEnd: r + 1 });
      }
      function Co(t) {
        let e = Object.getPrototypeOf(t.type.prototype).constructor,
          n = !0;
        const r = [t];
        for (; e; ) {
          let s = void 0;
          if (ke(t)) s = e.ɵcmp || e.ɵdir;
          else {
            if (e.ɵcmp) throw new Error("Directives cannot inherit Components");
            s = e.ɵdir;
          }
          if (s) {
            if (n) {
              r.push(s);
              const e = t;
              (e.inputs = xo(t.inputs)),
                (e.declaredInputs = xo(t.declaredInputs)),
                (e.outputs = xo(t.outputs));
              const n = s.hostBindings;
              n && ko(t, n);
              const i = s.viewQuery,
                o = s.contentQueries;
              if (
                (i && So(t, i),
                o && Eo(t, o),
                lt(t.inputs, s.inputs),
                lt(t.declaredInputs, s.declaredInputs),
                lt(t.outputs, s.outputs),
                ke(s) && s.data.animation)
              ) {
                const e = t.data;
                e.animation = (e.animation || []).concat(s.data.animation);
              }
              (e.afterContentChecked =
                e.afterContentChecked || s.afterContentChecked),
                (e.afterContentInit = t.afterContentInit || s.afterContentInit),
                (e.afterViewChecked = t.afterViewChecked || s.afterViewChecked),
                (e.afterViewInit = t.afterViewInit || s.afterViewInit),
                (e.doCheck = t.doCheck || s.doCheck),
                (e.onDestroy = t.onDestroy || s.onDestroy),
                (e.onInit = t.onInit || s.onInit);
            }
            const e = s.features;
            if (e)
              for (let r = 0; r < e.length; r++) {
                const s = e[r];
                s && s.ngInherit && s(t), s === Co && (n = !1);
              }
          }
          e = Object.getPrototypeOf(e);
        }
        !(function (t) {
          let e = 0,
            n = null;
          for (let r = t.length - 1; r >= 0; r--) {
            const s = t[r];
            (s.hostVars = e += s.hostVars),
              (s.hostAttrs = Pn(s.hostAttrs, (n = Pn(n, s.hostAttrs))));
          }
        })(r);
      }
      function xo(t) {
        return t === ae ? {} : t === le ? [] : t;
      }
      function So(t, e) {
        const n = t.viewQuery;
        t.viewQuery = n
          ? (t, r) => {
              e(t, r), n(t, r);
            }
          : e;
      }
      function Eo(t, e) {
        const n = t.contentQueries;
        t.contentQueries = n
          ? (t, r, s) => {
              e(t, r, s), n(t, r, s);
            }
          : e;
      }
      function ko(t, e) {
        const n = t.hostBindings;
        t.hostBindings = n
          ? (t, r) => {
              e(t, r), n(t, r);
            }
          : e;
      }
      class Po {
        constructor(t, e, n) {
          (this.previousValue = t),
            (this.currentValue = e),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Oo(t) {
        t.type.prototype.ngOnChanges &&
          ((t.setInput = Ao),
          (t.onChanges = function () {
            const t = Io(this),
              e = t && t.current;
            if (e) {
              const n = t.previous;
              if (n === ae) t.previous = e;
              else for (let t in e) n[t] = e[t];
              (t.current = null), this.ngOnChanges(e);
            }
          }));
      }
      function Ao(t, e, n, r) {
        const s =
            Io(t) ||
            (function (t, e) {
              return (t.__ngSimpleChanges__ = e);
            })(t, { previous: ae, current: null }),
          i = s.current || (s.current = {}),
          o = s.previous,
          a = this.declaredInputs[n],
          l = o[a];
        (i[a] = new Po(l && l.currentValue, e, o === ae)), (t[r] = e);
      }
      function Io(t) {
        return t.__ngSimpleChanges__ || null;
      }
      function To(t, e, n, r, s) {
        if (((t = xt(t)), Array.isArray(t)))
          for (let i = 0; i < t.length; i++) To(t[i], e, n, r, s);
        else {
          const i = Be(),
            o = Ge();
          let a = _i(t) ? t : xt(t.provide),
            l = mi(t);
          const c = We(),
            u = 65535 & c.providerIndexes,
            h = c.directiveStart,
            d = c.providerIndexes >> 16;
          if (_i(t) || !t.multi) {
            const r = new xn(l, s, ji),
              p = Ro(a, e, s ? u : u + d, h);
            -1 === p
              ? (Gn(jn(c, o), i, a),
                Mo(i, t, e.length),
                e.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                s && (c.providerIndexes += 65536),
                n.push(r),
                o.push(r))
              : ((n[p] = r), (o[p] = r));
          } else {
            const p = Ro(a, e, u + d, h),
              f = Ro(a, e, u, u + d),
              g = p >= 0 && n[p],
              m = f >= 0 && n[f];
            if ((s && !m) || (!s && !g)) {
              Gn(jn(c, o), i, a);
              const u = (function (t, e, n, r, s) {
                const i = new xn(t, n, ji);
                return (
                  (i.multi = []),
                  (i.index = e),
                  (i.componentProviders = 0),
                  Do(i, s, r && !n),
                  i
                );
              })(s ? Vo : No, n.length, s, r, l);
              !s && m && (n[f].providerFactory = u),
                Mo(i, t, e.length),
                e.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                s && (c.providerIndexes += 65536),
                n.push(u),
                o.push(u);
            } else Mo(i, t, p > -1 ? p : f), Do(n[s ? f : p], l, !s && r);
            !s && r && m && n[f].componentProviders++;
          }
        }
      }
      function Mo(t, e, n) {
        if (_i(e) || e.useClass) {
          const r = (e.useClass || e).prototype.ngOnDestroy;
          r && (t.destroyHooks || (t.destroyHooks = [])).push(n, r);
        }
      }
      function Do(t, e, n) {
        t.multi.push(e), n && t.componentProviders++;
      }
      function Ro(t, e, n, r) {
        for (let s = n; s < r; s++) if (e[s] === t) return s;
        return -1;
      }
      function No(t, e, n, r) {
        return Uo(this.multi, []);
      }
      function Vo(t, e, n, r) {
        const s = this.multi;
        let i;
        if (this.providerFactory) {
          const t = this.providerFactory.componentProviders,
            e = Qn(n, n[1], this.providerFactory.index, r);
          (i = e.slice(0, t)), Uo(s, i);
          for (let n = t; n < e.length; n++) i.push(e[n]);
        } else (i = []), Uo(s, i);
        return i;
      }
      function Uo(t, e) {
        for (let n = 0; n < t.length; n++) e.push((0, t[n])());
        return e;
      }
      function Lo(t, e = []) {
        return (n) => {
          n.providersResolver = (n, r) =>
            (function (t, e, n) {
              const r = Be();
              if (r.firstCreatePass) {
                const s = ke(t);
                To(n, r.data, r.blueprint, s, !0),
                  To(e, r.data, r.blueprint, s, !1);
              }
            })(n, r ? r(t) : t, e);
        };
      }
      Oo.ngInherit = !0;
      class Fo {}
      class jo {
        resolveComponentFactory(t) {
          throw (function (t) {
            const e = Error(
              `No component factory found for ${_t(
                t
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = t), e;
          })(t);
        }
      }
      let Ho = (() => {
          class t {}
          return (t.NULL = new jo()), t;
        })(),
        $o = (() => {
          class t {
            constructor(t) {
              this.nativeElement = t;
            }
          }
          return (t.__NG_ELEMENT_ID__ = () => zo(t)), t;
        })();
      const zo = function (t) {
        return ni(t, We(), Ge());
      };
      class Go {}
      const Bo = (function () {
        var t = { Important: 1, DashCase: 2 };
        return (t[t.Important] = "Important"), (t[t.DashCase] = "DashCase"), t;
      })();
      let qo = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => Wo()), t;
      })();
      const Wo = function () {
        const t = Ge(),
          e = Ve(We().index, t);
        return (function (t) {
          const e = t[11];
          if (Ae(e)) return e;
          throw new Error(
            "Cannot inject Renderer2 when the application uses Renderer3!"
          );
        })(we(e) ? e : t);
      };
      let Zo = (() => {
        class t {}
        return (
          (t.ɵprov = ct({ token: t, providedIn: "root", factory: () => null })),
          t
        );
      })();
      class Qo {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const Yo = new Qo("9.0.7");
      class Ko {
        constructor() {}
        supports(t) {
          return Ti(t);
        }
        create(t) {
          return new Xo(t);
        }
      }
      const Jo = (t, e) => e;
      class Xo {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || Jo);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            r = 0,
            s = null;
          for (; e || n; ) {
            const i = !n || (e && e.currentIndex < ra(n, r, s)) ? e : n,
              o = ra(i, r, s),
              a = i.currentIndex;
            if (i === n) r--, (n = n._nextRemoved);
            else if (((e = e._next), null == i.previousIndex)) r++;
            else {
              s || (s = []);
              const t = o - r,
                e = a - r;
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const r = n < s.length ? s[n] : (s[n] = 0),
                    i = r + n;
                  e <= i && i < t && (s[n] = r + 1);
                }
                s[i.previousIndex] = e - t;
              }
            }
            o !== a && t(i, o, a);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (
            e = this._identityChangesHead;
            null !== e;
            e = e._nextIdentityChange
          )
            t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !Ti(t)))
            throw new Error(
              `Error trying to diff '${_t(
                t
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e,
            n,
            r,
            s = this._itHead,
            i = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let e = 0; e < this.length; e++)
              (n = t[e]),
                (r = this._trackByFn(e, n)),
                null !== s && Ai(s.trackById, r)
                  ? (i && (s = this._verifyReinsertion(s, n, r, e)),
                    Ai(s.item, n) || this._addIdentityChange(s, n))
                  : ((s = this._mismatch(s, n, r, e)), (i = !0)),
                (s = s._next);
          } else
            (e = 0),
              (function (t, e) {
                if (Array.isArray(t))
                  for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[Oi()]();
                  let r;
                  for (; !(r = n.next()).done; ) e(r.value);
                }
              })(t, (t) => {
                (r = this._trackByFn(e, t)),
                  null !== s && Ai(s.trackById, r)
                    ? (i && (s = this._verifyReinsertion(s, t, r, e)),
                      Ai(s.item, t) || this._addIdentityChange(s, t))
                    : ((s = this._mismatch(s, t, r, e)), (i = !0)),
                  (s = s._next),
                  e++;
              }),
              (this.length = e);
          return this._truncate(s), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t, e;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = e
            )
              (t.previousIndex = t.currentIndex), (e = t._nextMoved);
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, n, r) {
          let s;
          return (
            null === t ? (s = this._itTail) : ((s = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._linkedRecords
                ? null
                : this._linkedRecords.get(n, r))
              ? (Ai(t.item, e) || this._addIdentityChange(t, e),
                this._moveAfter(t, s, r))
              : null !==
                (t =
                  null === this._unlinkedRecords
                    ? null
                    : this._unlinkedRecords.get(n, null))
              ? (Ai(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, s, r))
              : (t = this._addAfter(new ta(e, n), s, r)),
            t
          );
        }
        _verifyReinsertion(t, e, n, r) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== s
              ? (t = this._reinsertAfter(s, t._prev, r))
              : t.currentIndex != r &&
                ((t.currentIndex = r), this._addToMoves(t, r)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const r = t._prevRemoved,
            s = t._nextRemoved;
          return (
            null === r ? (this._removalsHead = s) : (r._nextRemoved = s),
            null === s ? (this._removalsTail = r) : (s._prevRemoved = r),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _moveAfter(t, e, n) {
          return (
            this._unlink(t),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _addAfter(t, e, n) {
          return (
            this._insertAfter(t, e, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, n) {
          const r = null === e ? this._itHead : e._next;
          return (
            (t._next = r),
            (t._prev = e),
            null === r ? (this._itTail = t) : (r._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new na()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            n = t._next;
          return (
            null === e ? (this._itHead = n) : (e._next = n),
            null === n ? (this._itTail = e) : (n._prev = e),
            t
          );
        }
        _addToMoves(t, e) {
          return t.previousIndex === e
            ? t
            : ((this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
              t);
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new na()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class ta {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class ea {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, e) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if ((null === e || e <= n.currentIndex) && Ai(n.trackById, t))
              return n;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup;
          return (
            null === e ? (this._head = n) : (e._nextDup = n),
            null === n ? (this._tail = e) : (n._prevDup = e),
            null === this._head
          );
        }
      }
      class na {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let n = this.map.get(e);
          n || ((n = new ea()), this.map.set(e, n)), n.add(t);
        }
        get(t, e) {
          const n = this.map.get(t);
          return n ? n.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function ra(t, e, n) {
        const r = t.previousIndex;
        if (null === r) return r;
        let s = 0;
        return n && r < n.length && (s = n[r]), r + e + s;
      }
      class sa {
        constructor() {}
        supports(t) {
          return t instanceof Map || Mi(t);
        }
        create() {
          return new ia();
        }
      }
      class ia {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e);
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Mi(t)))
              throw new Error(
                `Error trying to diff '${_t(
                  t
                )}'. Only maps and objects are allowed`
              );
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (t, n) => {
              if (e && e.key === n)
                this._maybeAddToChanges(e, t),
                  (this._appendAfter = e),
                  (e = e._next);
              else {
                const r = this._getOrCreateRecordForKey(n, t);
                e = this._insertBeforeOrAppend(e, r);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let t = e; null !== t; t = t._nextRemoved)
              t === this._mapHead && (this._mapHead = null),
                this._records.delete(t.key),
                (t._nextRemoved = t._next),
                (t.previousValue = t.currentValue),
                (t.currentValue = null),
                (t._prev = null),
                (t._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev;
            return (
              (e._next = t),
              (e._prev = n),
              (t._prev = e),
              n && (n._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
              : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t);
            this._maybeAddToChanges(n, e);
            const r = n._prev,
              s = n._next;
            return (
              r && (r._next = s),
              s && (s._prev = r),
              (n._next = null),
              (n._prev = null),
              n
            );
          }
          const n = new oa(t);
          return (
            this._records.set(t, n),
            (n.currentValue = e),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, e) {
          Ai(e, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = e),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, e) {
          t instanceof Map
            ? t.forEach(e)
            : Object.keys(t).forEach((n) => e(t[n], n));
        }
      }
      class oa {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      let aa = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (null != n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend IterableDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new it(), new rt()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (null != e) return e;
              throw new Error(
                `Cannot find a differ supporting object '${t}' of type '${
                  ((n = t), n.name || typeof n)
                }'`
              );
              var n;
            }
          }
          return (
            (t.ɵprov = ct({
              token: t,
              providedIn: "root",
              factory: () => new t([new Ko()]),
            })),
            t
          );
        })(),
        la = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend KeyValueDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new it(), new rt()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (e) return e;
              throw new Error(`Cannot find a differ supporting object '${t}'`);
            }
          }
          return (
            (t.ɵprov = ct({
              token: t,
              providedIn: "root",
              factory: () => new t([new sa()]),
            })),
            t
          );
        })();
      const ca = [new sa()],
        ua = new aa([new Ko()]),
        ha = new la(ca);
      let da = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => pa(t, $o)), t;
      })();
      const pa = function (t, e) {
        return ri(t, e, We(), Ge());
      };
      let fa = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => ga(t, $o)), t;
      })();
      const ga = function (t, e) {
          return si(t, e, We(), Ge());
        },
        ma = {};
      class ya extends Ho {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = ve(t);
          return new ba(e, this.ngModule);
        }
      }
      function va(t) {
        const e = [];
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      const _a = new Ut("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => Nn,
      });
      class ba extends Fo {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = t.selectors.map(Tr).join(",")),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return va(this.componentDef.inputs);
        }
        get outputs() {
          return va(this.componentDef.outputs);
        }
        create(t, e, n, r) {
          const s = (r = r || this.ngModule)
              ? (function (t, e) {
                  return {
                    get: (n, r, s) => {
                      const i = t.get(n, ma, s);
                      return i !== ma || r === ma ? i : e.get(n, r, s);
                    },
                  };
                })(t, r.injector)
              : t,
            i = s.get(Go, Ie),
            o = s.get(Zo, null),
            a = i.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            c = n
              ? (function (t, e, n) {
                  if (Ae(t)) return t.selectRootElement(e, n === oe.ShadowDom);
                  let r = "string" == typeof e ? t.querySelector(e) : e;
                  return (r.textContent = ""), r;
                })(a, n, this.componentDef.encapsulation)
              : zr(
                  l,
                  i.createRenderer(null, this.componentDef),
                  (function (t) {
                    const e = t.toLowerCase();
                    return "svg" === e
                      ? "http://www.w3.org/2000/svg"
                      : "math" === e
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(l)
                ),
            u = this.componentDef.onPush ? 576 : 528,
            h =
              "string" == typeof n && /^#root-ng-internal-isolated-\d+/.test(n),
            d = {
              components: [],
              scheduler: Nn,
              clean: Es,
              playerHandler: null,
              flags: 0,
            },
            p = ts(0, -1, null, 1, 0, null, null, null, null, null),
            f = Gr(null, p, d, u, null, null, i, a, o, s);
          let g, m;
          ln(f, null);
          try {
            const t = (function (t, e, n, r, s, i) {
              const o = n[1];
              n[19] = t;
              const a = Br(o, null, 0, 3, null, null),
                l = (a.mergedAttrs = e.hostAttrs);
              null !== l &&
                (ki(a, l),
                null !== t &&
                  (Sn(s, t, l),
                  null !== a.classes && Ys(s, t, a.classes),
                  null !== a.styles && Qs(s, t, a.styles)));
              const c = r.createRenderer(t, e),
                u = Gr(
                  n,
                  Xr(e),
                  null,
                  e.onPush ? 64 : 16,
                  n[19],
                  a,
                  r,
                  c,
                  void 0
                );
              return (
                o.firstCreatePass &&
                  (Gn(jn(a, n), o, e.type), cs(o, a), hs(a, n.length, 1)),
                bs(n, u),
                (n[19] = u)
              );
            })(c, this.componentDef, f, i, a);
            if (c)
              if (n) Sn(a, c, ["ng-version", Yo.full]);
              else {
                const { attrs: t, classes: e } = (function (t) {
                  const e = [],
                    n = [];
                  let r = 1,
                    s = 2;
                  for (; r < t.length; ) {
                    let i = t[r];
                    if ("string" == typeof i)
                      2 === s
                        ? "" !== i && e.push(i, t[++r])
                        : 8 === s && n.push(i);
                    else {
                      if (!Pr(s)) break;
                      s = i;
                    }
                    r++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                t && Sn(a, c, t), e && e.length > 0 && Ys(a, c, e.join(" "));
              }
            (m = Re(f[1], 0)),
              e && (m.projection = e.map((t) => Array.from(t))),
              (g = (function (t, e, n, r, s) {
                const i = n[1],
                  o = (function (t, e, n) {
                    const r = We();
                    t.firstCreatePass &&
                      (n.providersResolver && n.providersResolver(n),
                      ls(t, r, 1),
                      ds(t, e, n));
                    const s = Qn(e, t, e.length - 1, r);
                    br(s, e);
                    const i = De(r, e);
                    return i && br(i, e), s;
                  })(i, n, e);
                r.components.push(o),
                  (t[8] = o),
                  s && s.forEach((t) => t(o, e)),
                  e.contentQueries && e.contentQueries(1, o, n.length - 1);
                const a = We();
                if (
                  i.firstCreatePass &&
                  (null !== e.hostBindings || null !== e.hostAttrs)
                ) {
                  gn(a.index - 19);
                  const t = n[1];
                  is(t, e), os(t, n, e.hostVars), as(e, o);
                }
                return o;
              })(t, this.componentDef, f, d, [wo])),
              qr(p, f, null);
          } finally {
            pn();
          }
          const y = new wa(this.componentType, g, ni($o, m, f), f, m);
          return (n && !h) || (y.hostView._tViewNode.child = m), y;
        }
      }
      class wa extends class {} {
        constructor(t, e, n, r, s) {
          super(),
            (this.location = n),
            (this._rootLView = r),
            (this._tNode = s),
            (this.destroyCbs = []),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new Js(r)),
            (this.hostView._tViewNode = (function (t, e, n, r) {
              let s = t.node;
              return (
                null == s && (t.node = s = es(0, null, 2, -1, null, null)),
                (r[6] = s)
              );
            })(r[1], 0, 0, r)),
            (this.componentType = t);
        }
        get injector() {
          return new Jn(this._tNode, this._rootLView);
        }
        destroy() {
          this.destroyCbs &&
            (this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null),
            !this.hostView.destroyed && this.hostView.destroy());
        }
        onDestroy(t) {
          this.destroyCbs && this.destroyCbs.push(t);
        }
      }
      const Ca = void 0;
      var xa = [
        "en",
        [["a", "p"], ["AM", "PM"], Ca],
        [["AM", "PM"], Ca, Ca],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        Ca,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        Ca,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", Ca, "{1} 'at' {0}", Ca],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        function (t) {
          let e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === e && 0 === n ? 1 : 5;
        },
      ];
      let Sa = {};
      function Ea(t) {
        const e = (function (t) {
          return t.toLowerCase().replace(/_/g, "-");
        })(t);
        let n = ka(e);
        if (n) return n;
        const r = e.split("-")[0];
        if (((n = ka(r)), n)) return n;
        if ("en" === r) return xa;
        throw new Error(`Missing locale data for the locale "${t}".`);
      }
      function ka(t) {
        return (
          t in Sa ||
            (Sa[t] =
              At.ng &&
              At.ng.common &&
              At.ng.common.locales &&
              At.ng.common.locales[t]),
          Sa[t]
        );
      }
      const Pa = (function () {
        var t = {
          LocaleId: 0,
          DayPeriodsFormat: 1,
          DayPeriodsStandalone: 2,
          DaysFormat: 3,
          DaysStandalone: 4,
          MonthsFormat: 5,
          MonthsStandalone: 6,
          Eras: 7,
          FirstDayOfWeek: 8,
          WeekendRange: 9,
          DateFormat: 10,
          TimeFormat: 11,
          DateTimeFormat: 12,
          NumberSymbols: 13,
          NumberFormats: 14,
          CurrencyCode: 15,
          CurrencySymbol: 16,
          CurrencyName: 17,
          Currencies: 18,
          PluralCase: 19,
          ExtraData: 20,
        };
        return (
          (t[t.LocaleId] = "LocaleId"),
          (t[t.DayPeriodsFormat] = "DayPeriodsFormat"),
          (t[t.DayPeriodsStandalone] = "DayPeriodsStandalone"),
          (t[t.DaysFormat] = "DaysFormat"),
          (t[t.DaysStandalone] = "DaysStandalone"),
          (t[t.MonthsFormat] = "MonthsFormat"),
          (t[t.MonthsStandalone] = "MonthsStandalone"),
          (t[t.Eras] = "Eras"),
          (t[t.FirstDayOfWeek] = "FirstDayOfWeek"),
          (t[t.WeekendRange] = "WeekendRange"),
          (t[t.DateFormat] = "DateFormat"),
          (t[t.TimeFormat] = "TimeFormat"),
          (t[t.DateTimeFormat] = "DateTimeFormat"),
          (t[t.NumberSymbols] = "NumberSymbols"),
          (t[t.NumberFormats] = "NumberFormats"),
          (t[t.CurrencyCode] = "CurrencyCode"),
          (t[t.CurrencySymbol] = "CurrencySymbol"),
          (t[t.CurrencyName] = "CurrencyName"),
          (t[t.Currencies] = "Currencies"),
          (t[t.PluralCase] = "PluralCase"),
          (t[t.ExtraData] = "ExtraData"),
          t
        );
      })();
      let Oa = "en-US";
      function Aa(t) {
        var e, n;
        (n = "Expected localeId to be defined"),
          null == (e = t) &&
            (function (t, e, n, r) {
              throw new Error(
                `ASSERTION ERROR: ${t}` + ` [Expected=> null != ${e} <=Actual]`
              );
            })(n, e),
          "string" == typeof t && (Oa = t.toLowerCase().replace(/_/g, "-"));
      }
      const Ia = new Map();
      class Ta extends Kt {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new ya(this));
          const n = be(t),
            r = t[Rt] || null;
          r && Aa(r),
            (this._bootstrapComponents = Vn(n.bootstrap)),
            (this._r3Injector = pi(
              t,
              e,
              [
                { provide: Kt, useValue: this },
                { provide: Ho, useValue: this.componentFactoryResolver },
              ],
              _t(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, e = wi.THROW_IF_NOT_FOUND, n = ot.Default) {
          return t === wi || t === Kt || t === Lt
            ? this
            : this._r3Injector.get(t, e, n);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Ma extends Jt {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== be(t) &&
              (function t(e) {
                if (null !== e.ɵmod.id) {
                  const t = e.ɵmod.id;
                  (function (t, e, n) {
                    if (e && e !== n)
                      throw new Error(
                        `Duplicate module registered for ${t} - ${_t(
                          e
                        )} vs ${_t(e.name)}`
                      );
                  })(t, Ia.get(t), e),
                    Ia.set(t, e);
                }
                let n = e.ɵmod.imports;
                n instanceof Function && (n = n()), n && n.forEach((e) => t(e));
              })(t);
        }
        create(t) {
          return new Ta(this.moduleType, t);
        }
      }
      function Da(t, e, n) {
        const r = Xe() + t,
          s = Ge();
        return s[r] === Mr
          ? Di(s, r, n ? e.call(n) : e())
          : (function (t, e) {
              return t[e];
            })(s, r);
      }
      function Ra(t, e, n, r) {
        return (function (t, e, n, r, s, i) {
          const o = e + n;
          return Ri(t, o, s)
            ? Di(t, o + 1, i ? r.call(i, s) : r(s))
            : Na(t, o + 1);
        })(Ge(), Xe(), t, e, n, r);
      }
      function Na(t, e) {
        const n = t[e];
        return n === Mr ? void 0 : n;
      }
      function Va(t, e) {
        const n = Be();
        let r;
        const s = t + 19;
        n.firstCreatePass
          ? ((r = (function (t, e) {
              if (e)
                for (let n = e.length - 1; n >= 0; n--) {
                  const r = e[n];
                  if (t === r.name) return r;
                }
              throw new Error(`The pipe '${t}' could not be found!`);
            })(e, n.pipeRegistry)),
            (n.data[s] = r),
            r.onDestroy &&
              (n.destroyHooks || (n.destroyHooks = [])).push(s, r.onDestroy))
          : (r = n.data[s]);
        const i = r.factory || (r.factory = _e(r.type)),
          o = Bt(ji),
          a = i();
        return (
          Bt(o),
          (function (t, e, n, r) {
            const s = n + 19;
            s >= t.data.length && ((t.data[s] = null), (t.blueprint[s] = null)),
              (e[s] = r);
          })(n, Ge(), t, a),
          a
        );
      }
      function Ua(t, e, n, r) {
        const s = Ge(),
          i = Ne(s, t);
        return ja(
          s,
          Fa(s, t)
            ? (function (t, e, n, r, s, i, o) {
                const a = e + n;
                return Ni(t, a, s, i)
                  ? Di(t, a + 2, o ? r.call(o, s, i) : r(s, i))
                  : Na(t, a + 2);
              })(s, Xe(), e, i.transform, n, r, i)
            : i.transform(n, r)
        );
      }
      function La(t, e, n, r, s) {
        const i = Ge(),
          o = Ne(i, t);
        return ja(
          i,
          Fa(i, t)
            ? (function (t, e, n, r, s, i, o, a) {
                const l = e + n;
                return (function (t, e, n, r, s) {
                  const i = Ni(t, e, n, r);
                  return Ri(t, e + 2, s) || i;
                })(t, l, s, i, o)
                  ? Di(t, l + 3, a ? r.call(a, s, i, o) : r(s, i, o))
                  : Na(t, l + 3);
              })(i, Xe(), e, o.transform, n, r, s, o)
            : o.transform(n, r, s)
        );
      }
      function Fa(t, e) {
        return t[1].data[e + 19].pure;
      }
      function ja(t, e) {
        return Ii.isWrapped(e) && ((e = Ii.unwrap(e)), (t[tn()] = Mr)), e;
      }
      class Ha extends E {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, e, n) {
          let r,
            s = (t) => null,
            i = () => null;
          t && "object" == typeof t
            ? ((r = this.__isAsync
                ? (e) => {
                    setTimeout(() => t.next(e));
                  }
                : (e) => {
                    t.next(e);
                  }),
              t.error &&
                (s = this.__isAsync
                  ? (e) => {
                      setTimeout(() => t.error(e));
                    }
                  : (e) => {
                      t.error(e);
                    }),
              t.complete &&
                (i = this.__isAsync
                  ? () => {
                      setTimeout(() => t.complete());
                    }
                  : () => {
                      t.complete();
                    }))
            : ((r = this.__isAsync
                ? (e) => {
                    setTimeout(() => t(e));
                  }
                : (e) => {
                    t(e);
                  }),
              e &&
                (s = this.__isAsync
                  ? (t) => {
                      setTimeout(() => e(t));
                    }
                  : (t) => {
                      e(t);
                    }),
              n &&
                (i = this.__isAsync
                  ? () => {
                      setTimeout(() => n());
                    }
                  : () => {
                      n();
                    }));
          const o = super.subscribe(r, s, i);
          return t instanceof h && t.add(o), o;
        }
      }
      function $a() {
        return this._results[Oi()]();
      }
      class za {
        constructor() {
          (this.dirty = !0),
            (this._results = []),
            (this.changes = new Ha()),
            (this.length = 0);
          const t = Oi(),
            e = za.prototype;
          e[t] || (e[t] = $a);
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, e) {
          return this._results.reduce(t, e);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t) {
          (this._results = (function t(e, n) {
            void 0 === n && (n = e);
            for (let r = 0; r < e.length; r++) {
              let s = e[r];
              Array.isArray(s)
                ? (n === e && (n = e.slice(0, r)), t(s, n))
                : n !== e && n.push(s);
            }
            return n;
          })(t)),
            (this.dirty = !1),
            (this.length = this._results.length),
            (this.last = this._results[this.length - 1]),
            (this.first = this._results[0]);
        }
        notifyOnChanges() {
          this.changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      class Ga {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new Ga(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Ba {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const e = t.queries;
          if (null !== e) {
            const n =
                null !== t.contentQueries ? t.contentQueries[0] : e.length,
              r = [];
            for (let t = 0; t < n; t++) {
              const n = e.getByIndex(t);
              r.push(this.queries[n.indexInDeclarationView].clone());
            }
            return new Ba(r);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let e = 0; e < this.queries.length; e++)
            null !== el(t, e).matches && this.queries[e].setDirty();
        }
      }
      class qa {
        constructor(t, e, n, r = null) {
          (this.predicate = t),
            (this.descendants = e),
            (this.isStatic = n),
            (this.read = r);
        }
      }
      class Wa {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, e) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementStart(t, e);
        }
        elementEnd(t) {
          for (let e = 0; e < this.queries.length; e++)
            this.queries[e].elementEnd(t);
        }
        embeddedTView(t) {
          let e = null;
          for (let n = 0; n < this.length; n++) {
            const r = null !== e ? e.length : 0,
              s = this.getByIndex(n).embeddedTView(t, r);
            s &&
              ((s.indexInDeclarationView = n),
              null !== e ? e.push(s) : (e = [s]));
          }
          return null !== e ? new Wa(e) : null;
        }
        template(t, e) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].template(t, e);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class Za {
        constructor(t, e = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = e);
        }
        elementStart(t, e) {
          this.isApplyingToNode(e) && this.matchTNode(t, e);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, e) {
          this.elementStart(t, e);
        }
        embeddedTView(t, e) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, e),
              new Za(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && !1 === this.metadata.descendants) {
            const e = this._declarationNodeIndex;
            let n = t.parent;
            for (; null !== n && 4 === n.type && n.index !== e; ) n = n.parent;
            return e === (null !== n ? n.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, e) {
          if (Array.isArray(this.metadata.predicate)) {
            const n = this.metadata.predicate;
            for (let r = 0; r < n.length; r++)
              this.matchTNodeWithReadOption(t, e, Qa(e, n[r]));
          } else {
            const n = this.metadata.predicate;
            n === da
              ? 0 === e.type && this.matchTNodeWithReadOption(t, e, -1)
              : this.matchTNodeWithReadOption(t, e, Zn(e, t, n, !1, !1));
          }
        }
        matchTNodeWithReadOption(t, e, n) {
          if (null !== n) {
            const r = this.metadata.read;
            if (null !== r)
              if (r === $o || r === fa || (r === da && 0 === e.type))
                this.addMatch(e.index, -2);
              else {
                const n = Zn(e, t, r, !1, !1);
                null !== n && this.addMatch(e.index, n);
              }
            else this.addMatch(e.index, n);
          }
        }
        addMatch(t, e) {
          null === this.matches
            ? (this.matches = [t, e])
            : this.matches.push(t, e);
        }
      }
      function Qa(t, e) {
        const n = t.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === e) return n[r + 1];
        return null;
      }
      function Ya(t, e, n, r) {
        return -1 === n
          ? (function (t, e) {
              return 3 === t.type || 4 === t.type
                ? ni($o, t, e)
                : 0 === t.type
                ? ri(da, $o, t, e)
                : null;
            })(e, t)
          : -2 === n
          ? (function (t, e, n) {
              return n === $o
                ? ni($o, e, t)
                : n === da
                ? ri(da, $o, e, t)
                : n === fa
                ? si(fa, $o, e, t)
                : void 0;
            })(t, e, r)
          : Qn(t, t[1], n, e);
      }
      function Ka(t, e, n, r) {
        const s = e[5].queries[r];
        if (null === s.matches) {
          const r = t.data,
            i = n.matches,
            o = [];
          for (let t = 0; t < i.length; t += 2) {
            const s = i[t];
            o.push(s < 0 ? null : Ya(e, r[s], i[t + 1], n.metadata.read));
          }
          s.matches = o;
        }
        return s.matches;
      }
      function Ja(t) {
        const e = Ge(),
          n = Be(),
          r = sn();
        on(r + 1);
        const s = el(n, r);
        if (t.dirty && Le(e) === s.metadata.isStatic) {
          if (null === s.matches) t.reset([]);
          else {
            const i = s.crossesNgTemplate
              ? (function t(e, n, r, s) {
                  const i = e.queries.getByIndex(r),
                    o = i.matches;
                  if (null !== o) {
                    const a = Ka(e, n, i, r);
                    for (let e = 0; e < o.length; e += 2) {
                      const r = o[e];
                      if (r > 0) s.push(a[e / 2]);
                      else {
                        const i = o[e + 1],
                          a = n[-r];
                        for (let e = 9; e < a.length; e++) {
                          const n = a[e];
                          n[17] === n[3] && t(n[1], n, i, s);
                        }
                        if (null !== a[5]) {
                          const e = a[5];
                          for (let n = 0; n < e.length; n++) {
                            const r = e[n];
                            t(r[1], r, i, s);
                          }
                        }
                      }
                    }
                  }
                  return s;
                })(n, e, r, [])
              : Ka(n, e, s, r);
            t.reset(i), t.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Xa(t, e, n, r) {
        !(function (t, e, n, r, s, i, o, a) {
          t.firstCreatePass &&
            ((function (t, e, n) {
              null === t.queries && (t.queries = new Wa()),
                t.queries.track(new Za(e, n));
            })(t, new qa(n, r, !1, s), o.index),
            (function (t, e) {
              const n = t.contentQueries || (t.contentQueries = []);
              e !== (t.contentQueries.length ? n[n.length - 1] : -1) &&
                n.push(t.queries.length - 1, e);
            })(t, a)),
            (function (t, e) {
              const n = new za();
              !(function (t, e, n, r) {
                const s = ks(e);
                s.push(n), t.firstCreatePass && Ps(t).push(r, s.length - 1);
              })(t, e, n, n.destroy),
                null === e[5] && (e[5] = new Ba()),
                e[5].queries.push(new Ga(n));
            })(t, e);
        })(Be(), Ge(), e, n, r, 0, We(), t);
      }
      function tl() {
        return (t = Ge()), (e = sn()), t[5].queries[e].queryList;
        var t, e;
      }
      function el(t, e) {
        return t.queries.getByIndex(e);
      }
      const nl = new Ut("Application Initializer");
      let rl = (() => {
        class t {
          constructor(t) {
            (this.appInits = t),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((t, e) => {
                (this.resolve = t), (this.reject = e);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              e = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const e = this.appInits[n]();
                Ki(e) && t.push(e);
              }
            Promise.all(t)
              .then(() => {
                e();
              })
              .catch((t) => {
                this.reject(t);
              }),
              0 === t.length && e(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(nl, 8));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const sl = new Ut("AppId"),
        il = {
          provide: sl,
          useFactory: function () {
            return `${ol()}${ol()}${ol()}`;
          },
          deps: [],
        };
      function ol() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const al = new Ut("Platform Initializer"),
        ll = new Ut("Platform ID"),
        cl = new Ut("appBootstrapListener");
      let ul = (() => {
        class t {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const hl = new Ut("LocaleId"),
        dl = new Ut("DefaultCurrencyCode");
      class pl {
        constructor(t, e) {
          (this.ngModuleFactory = t), (this.componentFactories = e);
        }
      }
      const fl = function (t) {
          return new Ma(t);
        },
        gl = fl,
        ml = function (t) {
          return Promise.resolve(fl(t));
        },
        yl = function (t) {
          const e = fl(t),
            n = Vn(be(t).declarations).reduce((t, e) => {
              const n = ve(e);
              return n && t.push(new ba(n)), t;
            }, []);
          return new pl(e, n);
        },
        vl = yl,
        _l = function (t) {
          return Promise.resolve(yl(t));
        };
      let bl = (() => {
        class t {
          constructor() {
            (this.compileModuleSync = gl),
              (this.compileModuleAsync = ml),
              (this.compileModuleAndAllComponentsSync = vl),
              (this.compileModuleAndAllComponentsAsync = _l);
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const wl = new Ut("compilerOptions"),
        Cl = (() => Promise.resolve(0))();
      function xl(t) {
        "undefined" == typeof Zone
          ? Cl.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      class Sl {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Ha(!1)),
            (this.onMicrotaskEmpty = new Ha(!1)),
            (this.onStable = new Ha(!1)),
            (this.onError = new Ha(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched(),
            (this._nesting = 0),
            (this._outer = this._inner = Zone.current),
            Zone.wtfZoneSpec &&
              (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
            Zone.TaskTrackingZoneSpec &&
              (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
            (this.shouldCoalesceEventChangeDetection = e),
            (this.lastRequestAnimationFrameId = -1),
            (this.nativeRequestAnimationFrame = (function () {
              let t = At.requestAnimationFrame,
                e = At.cancelAnimationFrame;
              if ("undefined" != typeof Zone && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const r = e[Zone.__symbol__("OriginalDelegate")];
                r && (e = r);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function (t) {
              const e =
                !!t.shouldCoalesceEventChangeDetection &&
                t.nativeRequestAnimationFrame &&
                (() => {
                  !(function (t) {
                    -1 === t.lastRequestAnimationFrameId &&
                      ((t.lastRequestAnimationFrameId =
                        t.nativeRequestAnimationFrame.call(At, () => {
                          (t.lastRequestAnimationFrameId = -1), Ol(t), Pl(t);
                        })),
                      Ol(t));
                  })(t);
                });
              t._inner = t._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0, maybeDelayChangeDetection: e },
                onInvokeTask: (n, r, s, i, o, a) => {
                  try {
                    return Al(t), n.invokeTask(s, i, o, a);
                  } finally {
                    e && "eventTask" === i.type && e(), Il(t);
                  }
                },
                onInvoke: (e, n, r, s, i, o, a) => {
                  try {
                    return Al(t), e.invoke(r, s, i, o, a);
                  } finally {
                    Il(t);
                  }
                },
                onHasTask: (e, n, r, s) => {
                  e.hasTask(r, s),
                    n === r &&
                      ("microTask" == s.change
                        ? ((t._hasPendingMicrotasks = s.microTask),
                          Ol(t),
                          Pl(t))
                        : "macroTask" == s.change &&
                          (t.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (e, n, r, s) => (
                  e.handleError(r, s),
                  t.runOutsideAngular(() => t.onError.emit(s)),
                  !1
                ),
              });
            })(this);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Sl.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (Sl.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, e, n) {
          return this._inner.run(t, e, n);
        }
        runTask(t, e, n, r) {
          const s = this._inner,
            i = s.scheduleEventTask("NgZoneEvent: " + r, t, kl, El, El);
          try {
            return s.runTask(i, e, n);
          } finally {
            s.cancelTask(i);
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      function El() {}
      const kl = {};
      function Pl(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function Ol(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          (t.shouldCoalesceEventChangeDetection &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function Al(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function Il(t) {
        t._nesting--, Pl(t);
      }
      class Tl {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Ha()),
            (this.onMicrotaskEmpty = new Ha()),
            (this.onStable = new Ha()),
            (this.onError = new Ha());
        }
        run(t, e, n) {
          return t.apply(e, n);
        }
        runGuarded(t, e, n) {
          return t.apply(e, n);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, n, r) {
          return t.apply(e, n);
        }
      }
      let Ml = (() => {
          class t {
            constructor(t) {
              (this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Sl.assertNotInAngularZone(),
                        xl(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                xl(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (e) =>
                    !e.updateCb ||
                    !e.updateCb(t) ||
                    (clearTimeout(e.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, e, n) {
              let r = -1;
              e &&
                e > 0 &&
                (r = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (t) => t.timeoutId !== r
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, e)),
                this._callbacks.push({ doneCb: t, timeoutId: r, updateCb: n });
            }
            whenStable(t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
                );
              this.addCallback(t, e, n), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(t, e, n) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Sl));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Dl = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), Vl.addToWindow(this);
            }
            registerApplication(t, e) {
              this._applications.set(t, e);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, e = !0) {
              return Vl.findTestabilityInTree(this, t, e);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      class Rl {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null;
        }
      }
      let Nl,
        Vl = new Rl(),
        Ul = function (t, e, n) {
          const r = new Ma(n);
          if (0 === xi.size) return Promise.resolve(r);
          const s = (function (t) {
            const e = [];
            return t.forEach((t) => t && e.push(...t)), e;
          })(
            t
              .get(wl, [])
              .concat(e)
              .map((t) => t.providers)
          );
          if (0 === s.length) return Promise.resolve(r);
          const i = (function () {
              const t = At.ng;
              if (!t || !t.ɵcompilerFacade)
                throw new Error(
                  "Angular JIT compilation failed: '@angular/compiler' not loaded!\n  - JIT compilation is discouraged for production use-cases! Consider AOT mode instead.\n  - Did you bootstrap using '@angular/platform-browser-dynamic' or '@angular/platform-server'?\n  - Alternatively provide the compiler with 'import \"@angular/compiler\";' before bootstrapping."
                );
              return t.ɵcompilerFacade;
            })(),
            o = wi.create({ providers: s }).get(i.ResourceLoader);
          return (function (t) {
            const e = [],
              n = new Map();
            function r(t) {
              let e = n.get(t);
              if (!e) {
                const r = ((t) => Promise.resolve(o.get(t)))(t);
                n.set(t, (e = r.then(Ei)));
              }
              return e;
            }
            return (
              xi.forEach((t, n) => {
                const s = [];
                t.templateUrl &&
                  s.push(
                    r(t.templateUrl).then((e) => {
                      t.template = e;
                    })
                  );
                const i = t.styleUrls,
                  o = t.styles || (t.styles = []),
                  a = t.styles.length;
                i &&
                  i.forEach((e, n) => {
                    o.push(""),
                      s.push(
                        r(e).then((r) => {
                          (o[a + n] = r),
                            i.splice(i.indexOf(e), 1),
                            0 == i.length && (t.styleUrls = void 0);
                        })
                      );
                  });
                const l = Promise.all(s).then(() =>
                  (function (t) {
                    Si.delete(t);
                  })(n)
                );
                e.push(l);
              }),
              (xi = new Map()),
              Promise.all(e).then(() => {})
            );
          })().then(() => r);
        };
      const Ll = new Ut("AllowMultipleToken");
      class Fl {
        constructor(t, e) {
          (this.name = t), (this.token = e);
        }
      }
      function jl(t, e, n = []) {
        const r = `Platform: ${e}`,
          s = new Ut(r);
        return (e = []) => {
          let i = Hl();
          if (!i || i.injector.get(Ll, !1))
            if (t) t(n.concat(e).concat({ provide: s, useValue: !0 }));
            else {
              const t = n
                .concat(e)
                .concat(
                  { provide: s, useValue: !0 },
                  { provide: ai, useValue: "platform" }
                );
              !(function (t) {
                if (Nl && !Nl.destroyed && !Nl.injector.get(Ll, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                Nl = t.get($l);
                const e = t.get(al, null);
                e && e.forEach((t) => t());
              })(wi.create({ providers: t, name: r }));
            }
          return (function (t) {
            const e = Hl();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(t, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return e;
          })(s);
        };
      }
      function Hl() {
        return Nl && !Nl.destroyed ? Nl : null;
      }
      let $l = (() => {
        class t {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, e) {
            const n = (function (t, e) {
                let n;
                return (
                  (n =
                    "noop" === t
                      ? new Tl()
                      : ("zone.js" === t ? void 0 : t) ||
                        new Sl({
                          enableLongStackTrace: cr(),
                          shouldCoalesceEventChangeDetection: e,
                        })),
                  n
                );
              })(e ? e.ngZone : void 0, (e && e.ngZoneEventCoalescing) || !1),
              r = [{ provide: Sl, useValue: n }];
            return n.run(() => {
              const e = wi.create({
                  providers: r,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                s = t.create(e),
                i = s.injector.get(rr, null);
              if (!i)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?"
                );
              return (
                s.onDestroy(() => Bl(this._modules, s)),
                n.runOutsideAngular(() =>
                  n.onError.subscribe({
                    next: (t) => {
                      i.handleError(t);
                    },
                  })
                ),
                (function (t, e, n) {
                  try {
                    const r = n();
                    return Ki(r)
                      ? r.catch((n) => {
                          throw (
                            (e.runOutsideAngular(() => t.handleError(n)), n)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (e.runOutsideAngular(() => t.handleError(r)), r);
                  }
                })(i, n, () => {
                  const t = s.injector.get(rl);
                  return (
                    t.runInitializers(),
                    t.donePromise.then(
                      () => (
                        Aa(s.injector.get(hl, "en-US") || "en-US"),
                        this._moduleDoBootstrap(s),
                        s
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, e = []) {
            const n = zl({}, e);
            return Ul(this.injector, n, t).then((t) =>
              this.bootstrapModuleFactory(t, n)
            );
          }
          _moduleDoBootstrap(t) {
            const e = t.injector.get(Gl);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((t) => e.bootstrap(t));
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${_t(
                    t.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` +
                    "Please define one of these."
                );
              t.instance.ngDoBootstrap(e);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach((t) => t.destroy()),
              this._destroyListeners.forEach((t) => t()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(wi));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function zl(t, e) {
        return Array.isArray(e)
          ? e.reduce(zl, t)
          : Object.assign(Object.assign({}, t), e);
      }
      let Gl = (() => {
        class t {
          constructor(t, e, n, r, s, i) {
            (this._zone = t),
              (this._console = e),
              (this._injector = n),
              (this._exceptionHandler = r),
              (this._componentFactoryResolver = s),
              (this._initStatus = i),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._enforceNoNewChanges = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._enforceNoNewChanges = cr()),
              this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick();
                  });
                },
              });
            const o = new b((t) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete();
                  });
              }),
              a = new b((t) => {
                let e;
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    Sl.assertNotInAngularZone(),
                      xl(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), t.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  Sl.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        t.next(!1);
                      }));
                });
                return () => {
                  e.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = (function (...t) {
              let e = Number.POSITIVE_INFINITY,
                n = null,
                r = t[t.length - 1];
              return (
                P(r)
                  ? ((n = t.pop()),
                    t.length > 1 &&
                      "number" == typeof t[t.length - 1] &&
                      (e = t.pop()))
                  : "number" == typeof r && (e = t.pop()),
                null === n && 1 === t.length && t[0] instanceof b
                  ? t[0]
                  : B(e)(q(t, n))
              );
            })(
              o,
              a.pipe((t) => {
                return W()(
                  ((e = X),
                  function (t) {
                    let n;
                    n =
                      "function" == typeof e
                        ? e
                        : function () {
                            return e;
                          };
                    const r = Object.create(t, K);
                    return (r.source = t), (r.subjectFactory = n), r;
                  })(t)
                );
                var e;
              })
            );
          }
          bootstrap(t, e) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let n;
            (n =
              t instanceof Fo
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType);
            const r = n.isBoundToModule ? void 0 : this._injector.get(Kt),
              s = n.create(wi.NULL, [], e || n.selector, r);
            s.onDestroy(() => {
              this._unloadComponent(s);
            });
            const i = s.injector.get(Ml, null);
            return (
              i &&
                s.injector
                  .get(Dl)
                  .registerApplication(s.location.nativeElement, i),
              this._loadComponent(s),
              cr() &&
                this._console.log(
                  "Angular is running in the development mode. Call enableProdMode() to enable the production mode."
                ),
              s
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
              if (this._enforceNoNewChanges)
                for (let t of this._views) t.checkNoChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const e = t;
            this._views.push(e), e.attachToAppRef(this);
          }
          detachView(t) {
            const e = t;
            Bl(this._views, e), e.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(cl, [])
                .concat(this._bootstrapListeners)
                .forEach((e) => e(t));
          }
          _unloadComponent(t) {
            this.detachView(t.hostView), Bl(this.components, t);
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy());
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(Sl), Wt(ul), Wt(wi), Wt(rr), Wt(Ho), Wt(rl));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Bl(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      class ql {}
      class Wl {}
      const Zl = { factoryPathPrefix: "", factoryPathSuffix: ".ngfactory" };
      let Ql = (() => {
        class t {
          constructor(t, e) {
            (this._compiler = t), (this._config = e || Zl);
          }
          load(t) {
            return this.loadAndCompile(t);
          }
          loadAndCompile(t) {
            let [e, r] = t.split("#");
            return (
              void 0 === r && (r = "default"),
              n("zn8P")(e)
                .then((t) => t[r])
                .then((t) => Yl(t, e, r))
                .then((t) => this._compiler.compileModuleAsync(t))
            );
          }
          loadFactory(t) {
            let [e, r] = t.split("#"),
              s = "NgFactory";
            return (
              void 0 === r && ((r = "default"), (s = "")),
              n("zn8P")(
                this._config.factoryPathPrefix +
                  e +
                  this._config.factoryPathSuffix
              )
                .then((t) => t[r + s])
                .then((t) => Yl(t, e, r))
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(bl), Wt(Wl, 8));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Yl(t, e, n) {
        if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
        return t;
      }
      const Kl = jl(null, "core", [
          { provide: ll, useValue: "unknown" },
          { provide: $l, deps: [wi] },
          { provide: Dl, deps: [] },
          { provide: ul, deps: [] },
        ]),
        Jl = [
          { provide: Gl, useClass: Gl, deps: [Sl, ul, wi, rr, Ho, rl] },
          {
            provide: _a,
            deps: [Sl],
            useFactory: function (t) {
              let e = [];
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (t) {
                  e.push(t);
                }
              );
            },
          },
          { provide: rl, useClass: rl, deps: [[new rt(), nl]] },
          { provide: bl, useClass: bl, deps: [] },
          il,
          {
            provide: aa,
            useFactory: function () {
              return ua;
            },
            deps: [],
          },
          {
            provide: la,
            useFactory: function () {
              return ha;
            },
            deps: [],
          },
          {
            provide: hl,
            useFactory: function (t) {
              return (
                Aa(
                  (t =
                    t ||
                    ("undefined" != typeof $localize && $localize.locale) ||
                    "en-US")
                ),
                t
              );
            },
            deps: [[new nt(hl), new rt(), new it()]],
          },
          { provide: dl, useValue: "USD" },
        ];
      let Xl = (() => {
        class t {
          constructor(t) {}
        }
        return (
          (t.ɵmod = fe({ type: t })),
          (t.ɵinj = ut({
            factory: function (e) {
              return new (e || t)(Wt(Gl));
            },
            providers: Jl,
          })),
          t
        );
      })();
      let tc = null;
      function ec() {
        return tc;
      }
      const nc = new Ut("DocumentToken");
      let rc = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ factory: sc, token: t, providedIn: "platform" })),
          t
        );
      })();
      function sc() {
        return Wt(oc);
      }
      const ic = new Ut("Location Initialized");
      let oc = (() => {
        class t extends rc {
          constructor(t) {
            super(), (this._doc = t), this._init();
          }
          _init() {
            (this.location = ec().getLocation()),
              (this._history = ec().getHistory());
          }
          getBaseHrefFromDOM() {
            return ec().getBaseHref(this._doc);
          }
          onPopState(t) {
            ec()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("popstate", t, !1);
          }
          onHashChange(t) {
            ec()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("hashchange", t, !1);
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(t) {
            this.location.pathname = t;
          }
          pushState(t, e, n) {
            ac() ? this._history.pushState(t, e, n) : (this.location.hash = n);
          }
          replaceState(t, e, n) {
            ac()
              ? this._history.replaceState(t, e, n)
              : (this.location.hash = n);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(nc));
          }),
          (t.ɵprov = ct({ factory: lc, token: t, providedIn: "platform" })),
          t
        );
      })();
      function ac() {
        return !!window.history.pushState;
      }
      function lc() {
        return new oc(Wt(nc));
      }
      function cc(t, e) {
        if (0 == t.length) return e;
        if (0 == e.length) return t;
        let n = 0;
        return (
          t.endsWith("/") && n++,
          e.startsWith("/") && n++,
          2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
        );
      }
      function uc(t) {
        const e = t.match(/#|\?|$/),
          n = (e && e.index) || t.length;
        return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n);
      }
      function hc(t) {
        return t && "?" !== t[0] ? "?" + t : t;
      }
      let dc = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ factory: pc, token: t, providedIn: "root" })),
          t
        );
      })();
      function pc(t) {
        const e = Wt(nc).location;
        return new gc(Wt(rc), (e && e.origin) || "");
      }
      const fc = new Ut("appBaseHref");
      let gc = (() => {
          class t extends dc {
            constructor(t, e) {
              if (
                (super(),
                (this._platformLocation = t),
                null == e && (e = this._platformLocation.getBaseHrefFromDOM()),
                null == e)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = e;
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return cc(this._baseHref, t);
            }
            path(t = !1) {
              const e =
                  this._platformLocation.pathname +
                  hc(this._platformLocation.search),
                n = this._platformLocation.hash;
              return n && t ? `${e}${n}` : e;
            }
            pushState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + hc(r));
              this._platformLocation.pushState(t, e, s);
            }
            replaceState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + hc(r));
              this._platformLocation.replaceState(t, e, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(rc), Wt(fc, 8));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        mc = (() => {
          class t extends dc {
            constructor(t, e) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ""),
                null != e && (this._baseHref = e);
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let e = this._platformLocation.hash;
              return null == e && (e = "#"), e.length > 0 ? e.substring(1) : e;
            }
            prepareExternalUrl(t) {
              const e = cc(this._baseHref, t);
              return e.length > 0 ? "#" + e : e;
            }
            pushState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + hc(r));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(t, e, s);
            }
            replaceState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + hc(r));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, e, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(rc), Wt(fc, 8));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        yc = (() => {
          class t {
            constructor(t, e) {
              (this._subject = new Ha()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = t);
              const n = this._platformStrategy.getBaseHref();
              (this._platformLocation = e),
                (this._baseHref = uc(_c(n))),
                this._platformStrategy.onPopState((t) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: t.state,
                    type: t.type,
                  });
                });
            }
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(t, e = "") {
              return this.path() == this.normalize(t + hc(e));
            }
            normalize(e) {
              return t.stripTrailingSlash(
                (function (t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e;
                })(this._baseHref, _c(e))
              );
            }
            prepareExternalUrl(t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._platformStrategy.prepareExternalUrl(t)
              );
            }
            go(t, e = "", n = null) {
              this._platformStrategy.pushState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + hc(e)),
                  n
                );
            }
            replaceState(t, e = "", n = null) {
              this._platformStrategy.replaceState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + hc(e)),
                  n
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t),
                this.subscribe((t) => {
                  this._notifyUrlChangeListeners(t.url, t.state);
                });
            }
            _notifyUrlChangeListeners(t = "", e) {
              this._urlChangeListeners.forEach((n) => n(t, e));
            }
            subscribe(t, e, n) {
              return this._subject.subscribe({
                next: t,
                error: e,
                complete: n,
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(dc), Wt(rc));
            }),
            (t.normalizeQueryParams = hc),
            (t.joinWithSlash = cc),
            (t.stripTrailingSlash = uc),
            (t.ɵprov = ct({ factory: vc, token: t, providedIn: "root" })),
            t
          );
        })();
      function vc() {
        return new yc(Wt(dc), Wt(rc));
      }
      function _c(t) {
        return t.replace(/\/index.html$/, "");
      }
      const bc = (function () {
          var t = { Zero: 0, One: 1, Two: 2, Few: 3, Many: 4, Other: 5 };
          return (
            (t[t.Zero] = "Zero"),
            (t[t.One] = "One"),
            (t[t.Two] = "Two"),
            (t[t.Few] = "Few"),
            (t[t.Many] = "Many"),
            (t[t.Other] = "Other"),
            t
          );
        })(),
        wc = (function () {
          var t = { Format: 0, Standalone: 1 };
          return (t[t.Format] = "Format"), (t[t.Standalone] = "Standalone"), t;
        })(),
        Cc = (function () {
          var t = { Narrow: 0, Abbreviated: 1, Wide: 2, Short: 3 };
          return (
            (t[t.Narrow] = "Narrow"),
            (t[t.Abbreviated] = "Abbreviated"),
            (t[t.Wide] = "Wide"),
            (t[t.Short] = "Short"),
            t
          );
        })(),
        xc = (function () {
          var t = { Short: 0, Medium: 1, Long: 2, Full: 3 };
          return (
            (t[t.Short] = "Short"),
            (t[t.Medium] = "Medium"),
            (t[t.Long] = "Long"),
            (t[t.Full] = "Full"),
            t
          );
        })(),
        Sc = (function () {
          var t = {
            Decimal: 0,
            Group: 1,
            List: 2,
            PercentSign: 3,
            PlusSign: 4,
            MinusSign: 5,
            Exponential: 6,
            SuperscriptingExponent: 7,
            PerMille: 8,
            Infinity: 9,
            NaN: 10,
            TimeSeparator: 11,
            CurrencyDecimal: 12,
            CurrencyGroup: 13,
          };
          return (
            (t[t.Decimal] = "Decimal"),
            (t[t.Group] = "Group"),
            (t[t.List] = "List"),
            (t[t.PercentSign] = "PercentSign"),
            (t[t.PlusSign] = "PlusSign"),
            (t[t.MinusSign] = "MinusSign"),
            (t[t.Exponential] = "Exponential"),
            (t[t.SuperscriptingExponent] = "SuperscriptingExponent"),
            (t[t.PerMille] = "PerMille"),
            (t[t.Infinity] = "Infinity"),
            (t[t.NaN] = "NaN"),
            (t[t.TimeSeparator] = "TimeSeparator"),
            (t[t.CurrencyDecimal] = "CurrencyDecimal"),
            (t[t.CurrencyGroup] = "CurrencyGroup"),
            t
          );
        })();
      function Ec(t, e) {
        return Ic(Ea(t)[Pa.DateFormat], e);
      }
      function kc(t, e) {
        return Ic(Ea(t)[Pa.TimeFormat], e);
      }
      function Pc(t, e) {
        return Ic(Ea(t)[Pa.DateTimeFormat], e);
      }
      function Oc(t, e) {
        const n = Ea(t),
          r = n[Pa.NumberSymbols][e];
        if (void 0 === r) {
          if (e === Sc.CurrencyDecimal) return n[Pa.NumberSymbols][Sc.Decimal];
          if (e === Sc.CurrencyGroup) return n[Pa.NumberSymbols][Sc.Group];
        }
        return r;
      }
      function Ac(t) {
        if (!t[Pa.ExtraData])
          throw new Error(
            `Missing extra locale data for the locale "${
              t[Pa.LocaleId]
            }". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`
          );
      }
      function Ic(t, e) {
        for (let n = e; n > -1; n--) if (void 0 !== t[n]) return t[n];
        throw new Error("Locale data API: locale data undefined");
      }
      function Tc(t) {
        const [e, n] = t.split(":");
        return { hours: +e, minutes: +n };
      }
      const Mc =
          /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
        Dc = {},
        Rc =
          /((?:[^GyMLwWdEabBhHmsSzZO']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/,
        Nc = (function () {
          var t = { Short: 0, ShortGMT: 1, Long: 2, Extended: 3 };
          return (
            (t[t.Short] = "Short"),
            (t[t.ShortGMT] = "ShortGMT"),
            (t[t.Long] = "Long"),
            (t[t.Extended] = "Extended"),
            t
          );
        })(),
        Vc = (function () {
          var t = {
            FullYear: 0,
            Month: 1,
            Date: 2,
            Hours: 3,
            Minutes: 4,
            Seconds: 5,
            FractionalSeconds: 6,
            Day: 7,
          };
          return (
            (t[t.FullYear] = "FullYear"),
            (t[t.Month] = "Month"),
            (t[t.Date] = "Date"),
            (t[t.Hours] = "Hours"),
            (t[t.Minutes] = "Minutes"),
            (t[t.Seconds] = "Seconds"),
            (t[t.FractionalSeconds] = "FractionalSeconds"),
            (t[t.Day] = "Day"),
            t
          );
        })(),
        Uc = (function () {
          var t = { DayPeriods: 0, Days: 1, Months: 2, Eras: 3 };
          return (
            (t[t.DayPeriods] = "DayPeriods"),
            (t[t.Days] = "Days"),
            (t[t.Months] = "Months"),
            (t[t.Eras] = "Eras"),
            t
          );
        })();
      function Lc(t, e) {
        return (
          e &&
            (t = t.replace(/\{([^}]+)}/g, function (t, n) {
              return null != e && n in e ? e[n] : t;
            })),
          t
        );
      }
      function Fc(t, e, n = "-", r, s) {
        let i = "";
        (t < 0 || (s && t <= 0)) && (s ? (t = 1 - t) : ((t = -t), (i = n)));
        let o = String(t);
        for (; o.length < e; ) o = "0" + o;
        return r && (o = o.substr(o.length - e)), i + o;
      }
      function jc(t, e, n = 0, r = !1, s = !1) {
        return function (i, o) {
          let a = (function (t, e) {
            switch (t) {
              case Vc.FullYear:
                return e.getFullYear();
              case Vc.Month:
                return e.getMonth();
              case Vc.Date:
                return e.getDate();
              case Vc.Hours:
                return e.getHours();
              case Vc.Minutes:
                return e.getMinutes();
              case Vc.Seconds:
                return e.getSeconds();
              case Vc.FractionalSeconds:
                return e.getMilliseconds();
              case Vc.Day:
                return e.getDay();
              default:
                throw new Error(`Unknown DateType value "${t}".`);
            }
          })(t, i);
          if (((n > 0 || a > -n) && (a += n), t === Vc.Hours))
            0 === a && -12 === n && (a = 12);
          else if (t === Vc.FractionalSeconds)
            return (l = e), Fc(a, 3).substr(0, l);
          var l;
          const c = Oc(o, Sc.MinusSign);
          return Fc(a, e, c, r, s);
        };
      }
      function Hc(t, e, n = wc.Format, r = !1) {
        return function (s, i) {
          return (function (t, e, n, r, s, i) {
            switch (n) {
              case Uc.Months:
                return (function (t, e, n) {
                  const r = Ea(t),
                    s = Ic([r[Pa.MonthsFormat], r[Pa.MonthsStandalone]], e);
                  return Ic(s, n);
                })(e, s, r)[t.getMonth()];
              case Uc.Days:
                return (function (t, e, n) {
                  const r = Ea(t),
                    s = Ic([r[Pa.DaysFormat], r[Pa.DaysStandalone]], e);
                  return Ic(s, n);
                })(e, s, r)[t.getDay()];
              case Uc.DayPeriods:
                const o = t.getHours(),
                  a = t.getMinutes();
                if (i) {
                  const t = (function (t) {
                      const e = Ea(t);
                      return (
                        Ac(e),
                        (e[Pa.ExtraData][2] || []).map((t) =>
                          "string" == typeof t ? Tc(t) : [Tc(t[0]), Tc(t[1])]
                        )
                      );
                    })(e),
                    n = (function (t, e, n) {
                      const r = Ea(t);
                      Ac(r);
                      const s =
                        Ic([r[Pa.ExtraData][0], r[Pa.ExtraData][1]], e) || [];
                      return Ic(s, n) || [];
                    })(e, s, r);
                  let i;
                  if (
                    (t.forEach((t, e) => {
                      if (Array.isArray(t)) {
                        const { hours: r, minutes: s } = t[0],
                          { hours: l, minutes: c } = t[1];
                        o >= r &&
                          a >= s &&
                          (o < l || (o === l && a < c)) &&
                          (i = n[e]);
                      } else {
                        const { hours: r, minutes: s } = t;
                        r === o && s === a && (i = n[e]);
                      }
                    }),
                    i)
                  )
                    return i;
                }
                return (function (t, e, n) {
                  const r = Ea(t),
                    s = Ic(
                      [r[Pa.DayPeriodsFormat], r[Pa.DayPeriodsStandalone]],
                      e
                    );
                  return Ic(s, n);
                })(e, s, r)[o < 12 ? 0 : 1];
              case Uc.Eras:
                return (function (t, e) {
                  return Ic(Ea(t)[Pa.Eras], e);
                })(e, r)[t.getFullYear() <= 0 ? 0 : 1];
              default:
                throw new Error(`unexpected translation type ${n}`);
            }
          })(s, i, t, e, n, r);
        };
      }
      function $c(t) {
        return function (e, n, r) {
          const s = -1 * r,
            i = Oc(n, Sc.MinusSign),
            o = s > 0 ? Math.floor(s / 60) : Math.ceil(s / 60);
          switch (t) {
            case Nc.Short:
              return (
                (s >= 0 ? "+" : "") + Fc(o, 2, i) + Fc(Math.abs(s % 60), 2, i)
              );
            case Nc.ShortGMT:
              return "GMT" + (s >= 0 ? "+" : "") + Fc(o, 1, i);
            case Nc.Long:
              return (
                "GMT" +
                (s >= 0 ? "+" : "") +
                Fc(o, 2, i) +
                ":" +
                Fc(Math.abs(s % 60), 2, i)
              );
            case Nc.Extended:
              return 0 === r
                ? "Z"
                : (s >= 0 ? "+" : "") +
                    Fc(o, 2, i) +
                    ":" +
                    Fc(Math.abs(s % 60), 2, i);
            default:
              throw new Error(`Unknown zone width "${t}"`);
          }
        };
      }
      function zc(t, e = !1) {
        return function (n, r) {
          let s;
          if (e) {
            const t = new Date(n.getFullYear(), n.getMonth(), 1).getDay() - 1,
              e = n.getDate();
            s = 1 + Math.floor((e + t) / 7);
          } else {
            const t = (function (t) {
                const e = new Date(t, 0, 1).getDay();
                return new Date(t, 0, 1 + (e <= 4 ? 4 : 11) - e);
              })(n.getFullYear()),
              e =
                ((i = n),
                new Date(
                  i.getFullYear(),
                  i.getMonth(),
                  i.getDate() + (4 - i.getDay())
                )).getTime() - t.getTime();
            s = 1 + Math.round(e / 6048e5);
          }
          var i;
          return Fc(s, t, Oc(r, Sc.MinusSign));
        };
      }
      const Gc = {};
      function Bc(t, e) {
        t = t.replace(/:/g, "");
        const n = Date.parse("Jan 01, 1970 00:00:00 " + t) / 6e4;
        return isNaN(n) ? e : n;
      }
      function qc(t) {
        return t instanceof Date && !isNaN(t.valueOf());
      }
      class Wc {}
      let Zc = (() => {
        class t extends Wc {
          constructor(t) {
            super(), (this.locale = t);
          }
          getPluralCategory(t, e) {
            switch (
              (function (t) {
                return Ea(t)[Pa.PluralCase];
              })(e || this.locale)(t)
            ) {
              case bc.Zero:
                return "zero";
              case bc.One:
                return "one";
              case bc.Two:
                return "two";
              case bc.Few:
                return "few";
              case bc.Many:
                return "many";
              default:
                return "other";
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(hl));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Qc(t, e) {
        e = encodeURIComponent(e);
        for (const n of t.split(";")) {
          const t = n.indexOf("="),
            [r, s] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
          if (r.trim() === e) return decodeURIComponent(s);
        }
        return null;
      }
      class Yc {
        constructor(t, e, n, r) {
          (this.$implicit = t),
            (this.ngForOf = e),
            (this.index = n),
            (this.count = r);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Kc = (() => {
        class t {
          constructor(t, e, n) {
            (this._viewContainer = t),
              (this._template = e),
              (this._differs = n),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            cr() &&
              null != t &&
              "function" != typeof t &&
              console &&
              console.warn &&
              console.warn(
                `trackBy must be a function, but received ${JSON.stringify(
                  t
                )}. ` +
                  "See https://angular.io/api/common/NgForOf#change-propagation for more information."
              ),
              (this._trackByFn = t);
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              if (!this._differ && n)
                try {
                  this._differ = this._differs
                    .find(n)
                    .create(this.ngForTrackBy);
                } catch (e) {
                  throw new Error(
                    `Cannot find a differ supporting object '${n}' of type '${
                      ((t = n), t.name || typeof t)
                    }'. NgFor only supports binding to Iterables such as Arrays.`
                  );
                }
            }
            var t;
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const e = [];
            t.forEachOperation((t, n, r) => {
              if (null == t.previousIndex) {
                const n = this._viewContainer.createEmbeddedView(
                    this._template,
                    new Yc(null, this._ngForOf, -1, -1),
                    null === r ? void 0 : r
                  ),
                  s = new Jc(t, n);
                e.push(s);
              } else if (null == r)
                this._viewContainer.remove(null === n ? void 0 : n);
              else if (null !== n) {
                const s = this._viewContainer.get(n);
                this._viewContainer.move(s, r);
                const i = new Jc(t, s);
                e.push(i);
              }
            });
            for (let n = 0; n < e.length; n++)
              this._perViewChange(e[n].view, e[n].record);
            for (let n = 0, r = this._viewContainer.length; n < r; n++) {
              const t = this._viewContainer.get(n);
              (t.context.index = n),
                (t.context.count = r),
                (t.context.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((t) => {
              this._viewContainer.get(t.currentIndex).context.$implicit =
                t.item;
            });
          }
          _perViewChange(t, e) {
            t.context.$implicit = e.item;
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ji(fa), ji(da), ji(aa));
          }),
          (t.ɵdir = me({
            type: t,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
          })),
          t
        );
      })();
      class Jc {
        constructor(t, e) {
          (this.record = t), (this.view = e);
        }
      }
      let Xc = (() => {
        class t {
          constructor(t, e) {
            (this._viewContainer = t),
              (this._context = new tu()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = e);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            eu("ngIfThen", t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            eu("ngIfElse", t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ji(fa), ji(da));
          }),
          (t.ɵdir = me({
            type: t,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          t
        );
      })();
      class tu {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function eu(t, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${t} must be a TemplateRef, but received '${_t(e)}'.`
          );
      }
      function nu(t, e) {
        return Error(`InvalidPipeArgument: '${e}' for pipe '${_t(t)}'`);
      }
      let ru = (() => {
          class t {
            constructor(t) {
              this.locale = t;
            }
            transform(e, n = "mediumDate", r, s) {
              if (null == e || "" === e || e != e) return null;
              try {
                return (function (t, e, n, r) {
                  let s = (function (t) {
                    if (qc(t)) return t;
                    if ("number" == typeof t && !isNaN(t)) return new Date(t);
                    if ("string" == typeof t) {
                      t = t.trim();
                      const e = parseFloat(t);
                      if (!isNaN(t - e)) return new Date(e);
                      if (/^(\d{4}-\d{1,2}-\d{1,2})$/.test(t)) {
                        const [e, n, r] = t.split("-").map((t) => +t);
                        return new Date(e, n - 1, r);
                      }
                      let n;
                      if ((n = t.match(Mc)))
                        return (function (t) {
                          const e = new Date(0);
                          let n = 0,
                            r = 0;
                          const s = t[8] ? e.setUTCFullYear : e.setFullYear,
                            i = t[8] ? e.setUTCHours : e.setHours;
                          t[9] &&
                            ((n = Number(t[9] + t[10])),
                            (r = Number(t[9] + t[11]))),
                            s.call(
                              e,
                              Number(t[1]),
                              Number(t[2]) - 1,
                              Number(t[3])
                            );
                          const o = Number(t[4] || 0) - n,
                            a = Number(t[5] || 0) - r,
                            l = Number(t[6] || 0),
                            c = Math.round(
                              1e3 * parseFloat("0." + (t[7] || 0))
                            );
                          return i.call(e, o, a, l, c), e;
                        })(n);
                    }
                    const e = new Date(t);
                    if (!qc(e))
                      throw new Error(`Unable to convert "${t}" into a date`);
                    return e;
                  })(t);
                  e =
                    (function t(e, n) {
                      const r = (function (t) {
                        return Ea(t)[Pa.LocaleId];
                      })(e);
                      if (((Dc[r] = Dc[r] || {}), Dc[r][n])) return Dc[r][n];
                      let s = "";
                      switch (n) {
                        case "shortDate":
                          s = Ec(e, xc.Short);
                          break;
                        case "mediumDate":
                          s = Ec(e, xc.Medium);
                          break;
                        case "longDate":
                          s = Ec(e, xc.Long);
                          break;
                        case "fullDate":
                          s = Ec(e, xc.Full);
                          break;
                        case "shortTime":
                          s = kc(e, xc.Short);
                          break;
                        case "mediumTime":
                          s = kc(e, xc.Medium);
                          break;
                        case "longTime":
                          s = kc(e, xc.Long);
                          break;
                        case "fullTime":
                          s = kc(e, xc.Full);
                          break;
                        case "short":
                          const n = t(e, "shortTime"),
                            r = t(e, "shortDate");
                          s = Lc(Pc(e, xc.Short), [n, r]);
                          break;
                        case "medium":
                          const i = t(e, "mediumTime"),
                            o = t(e, "mediumDate");
                          s = Lc(Pc(e, xc.Medium), [i, o]);
                          break;
                        case "long":
                          const a = t(e, "longTime"),
                            l = t(e, "longDate");
                          s = Lc(Pc(e, xc.Long), [a, l]);
                          break;
                        case "full":
                          const c = t(e, "fullTime"),
                            u = t(e, "fullDate");
                          s = Lc(Pc(e, xc.Full), [c, u]);
                      }
                      return s && (Dc[r][n] = s), s;
                    })(n, e) || e;
                  let i,
                    o = [];
                  for (; e; ) {
                    if (((i = Rc.exec(e)), !i)) {
                      o.push(e);
                      break;
                    }
                    {
                      o = o.concat(i.slice(1));
                      const t = o.pop();
                      if (!t) break;
                      e = t;
                    }
                  }
                  let a = s.getTimezoneOffset();
                  r &&
                    ((a = Bc(r, a)),
                    (s = (function (t, e, n) {
                      const r = t.getTimezoneOffset();
                      return (function (t, e) {
                        return (
                          (t = new Date(t.getTime())).setMinutes(
                            t.getMinutes() + e
                          ),
                          t
                        );
                      })(t, -1 * (Bc(e, r) - r));
                    })(s, r)));
                  let l = "";
                  return (
                    o.forEach((t) => {
                      const e = (function (t) {
                        if (Gc[t]) return Gc[t];
                        let e;
                        switch (t) {
                          case "G":
                          case "GG":
                          case "GGG":
                            e = Hc(Uc.Eras, Cc.Abbreviated);
                            break;
                          case "GGGG":
                            e = Hc(Uc.Eras, Cc.Wide);
                            break;
                          case "GGGGG":
                            e = Hc(Uc.Eras, Cc.Narrow);
                            break;
                          case "y":
                            e = jc(Vc.FullYear, 1, 0, !1, !0);
                            break;
                          case "yy":
                            e = jc(Vc.FullYear, 2, 0, !0, !0);
                            break;
                          case "yyy":
                            e = jc(Vc.FullYear, 3, 0, !1, !0);
                            break;
                          case "yyyy":
                            e = jc(Vc.FullYear, 4, 0, !1, !0);
                            break;
                          case "M":
                          case "L":
                            e = jc(Vc.Month, 1, 1);
                            break;
                          case "MM":
                          case "LL":
                            e = jc(Vc.Month, 2, 1);
                            break;
                          case "MMM":
                            e = Hc(Uc.Months, Cc.Abbreviated);
                            break;
                          case "MMMM":
                            e = Hc(Uc.Months, Cc.Wide);
                            break;
                          case "MMMMM":
                            e = Hc(Uc.Months, Cc.Narrow);
                            break;
                          case "LLL":
                            e = Hc(Uc.Months, Cc.Abbreviated, wc.Standalone);
                            break;
                          case "LLLL":
                            e = Hc(Uc.Months, Cc.Wide, wc.Standalone);
                            break;
                          case "LLLLL":
                            e = Hc(Uc.Months, Cc.Narrow, wc.Standalone);
                            break;
                          case "w":
                            e = zc(1);
                            break;
                          case "ww":
                            e = zc(2);
                            break;
                          case "W":
                            e = zc(1, !0);
                            break;
                          case "d":
                            e = jc(Vc.Date, 1);
                            break;
                          case "dd":
                            e = jc(Vc.Date, 2);
                            break;
                          case "E":
                          case "EE":
                          case "EEE":
                            e = Hc(Uc.Days, Cc.Abbreviated);
                            break;
                          case "EEEE":
                            e = Hc(Uc.Days, Cc.Wide);
                            break;
                          case "EEEEE":
                            e = Hc(Uc.Days, Cc.Narrow);
                            break;
                          case "EEEEEE":
                            e = Hc(Uc.Days, Cc.Short);
                            break;
                          case "a":
                          case "aa":
                          case "aaa":
                            e = Hc(Uc.DayPeriods, Cc.Abbreviated);
                            break;
                          case "aaaa":
                            e = Hc(Uc.DayPeriods, Cc.Wide);
                            break;
                          case "aaaaa":
                            e = Hc(Uc.DayPeriods, Cc.Narrow);
                            break;
                          case "b":
                          case "bb":
                          case "bbb":
                            e = Hc(
                              Uc.DayPeriods,
                              Cc.Abbreviated,
                              wc.Standalone,
                              !0
                            );
                            break;
                          case "bbbb":
                            e = Hc(Uc.DayPeriods, Cc.Wide, wc.Standalone, !0);
                            break;
                          case "bbbbb":
                            e = Hc(Uc.DayPeriods, Cc.Narrow, wc.Standalone, !0);
                            break;
                          case "B":
                          case "BB":
                          case "BBB":
                            e = Hc(
                              Uc.DayPeriods,
                              Cc.Abbreviated,
                              wc.Format,
                              !0
                            );
                            break;
                          case "BBBB":
                            e = Hc(Uc.DayPeriods, Cc.Wide, wc.Format, !0);
                            break;
                          case "BBBBB":
                            e = Hc(Uc.DayPeriods, Cc.Narrow, wc.Format, !0);
                            break;
                          case "h":
                            e = jc(Vc.Hours, 1, -12);
                            break;
                          case "hh":
                            e = jc(Vc.Hours, 2, -12);
                            break;
                          case "H":
                            e = jc(Vc.Hours, 1);
                            break;
                          case "HH":
                            e = jc(Vc.Hours, 2);
                            break;
                          case "m":
                            e = jc(Vc.Minutes, 1);
                            break;
                          case "mm":
                            e = jc(Vc.Minutes, 2);
                            break;
                          case "s":
                            e = jc(Vc.Seconds, 1);
                            break;
                          case "ss":
                            e = jc(Vc.Seconds, 2);
                            break;
                          case "S":
                            e = jc(Vc.FractionalSeconds, 1);
                            break;
                          case "SS":
                            e = jc(Vc.FractionalSeconds, 2);
                            break;
                          case "SSS":
                            e = jc(Vc.FractionalSeconds, 3);
                            break;
                          case "Z":
                          case "ZZ":
                          case "ZZZ":
                            e = $c(Nc.Short);
                            break;
                          case "ZZZZZ":
                            e = $c(Nc.Extended);
                            break;
                          case "O":
                          case "OO":
                          case "OOO":
                          case "z":
                          case "zz":
                          case "zzz":
                            e = $c(Nc.ShortGMT);
                            break;
                          case "OOOO":
                          case "ZZZZ":
                          case "zzzz":
                            e = $c(Nc.Long);
                            break;
                          default:
                            return null;
                        }
                        return (Gc[t] = e), e;
                      })(t);
                      l += e
                        ? e(s, n, a)
                        : "''" === t
                        ? "'"
                        : t.replace(/(^'|'$)/g, "").replace(/''/g, "'");
                    }),
                    l
                  );
                })(e, n, s || this.locale, r);
              } catch (i) {
                throw nu(t, i.message);
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ji(hl));
            }),
            (t.ɵpipe = ye({ name: "date", type: t, pure: !0 })),
            t
          );
        })(),
        su = (() => {
          class t {
            transform(e, n, r) {
              if (null == e) return e;
              if (!this.supports(e)) throw nu(t, e);
              return e.slice(n, r);
            }
            supports(t) {
              return "string" == typeof t || Array.isArray(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵpipe = ye({ name: "slice", type: t, pure: !1 })),
            t
          );
        })(),
        iu = (() => {
          class t {}
          return (
            (t.ɵmod = fe({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [{ provide: Wc, useClass: Zc }],
            })),
            t
          );
        })(),
        ou = (() => {
          class t {}
          return (
            (t.ɵprov = ct({
              token: t,
              providedIn: "root",
              factory: () => new au(Wt(nc), window, Wt(rr)),
            })),
            t
          );
        })();
      class au {
        constructor(t, e, n) {
          (this.document = t),
            (this.window = e),
            (this.errorHandler = n),
            (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportScrollRestoration()
            ? [this.window.scrollX, this.window.scrollY]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportScrollRestoration() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (this.supportScrollRestoration()) {
            t =
              this.window.CSS && this.window.CSS.escape
                ? this.window.CSS.escape(t)
                : t.replace(/(\"|\'\ |:|\.|\[|\]|,|=)/g, "\\$1");
            try {
              const e = this.document.querySelector(`#${t}`);
              if (e) return void this.scrollToElement(e);
              const n = this.document.querySelector(`[name='${t}']`);
              if (n) return void this.scrollToElement(n);
            } catch (e) {
              this.errorHandler.handleError(e);
            }
          }
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history;
            e && e.scrollRestoration && (e.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const e = t.getBoundingClientRect(),
            n = e.left + this.window.pageXOffset,
            r = e.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(n - s[0], r - s[1]);
        }
        supportScrollRestoration() {
          try {
            return !!this.window && !!this.window.scrollTo;
          } catch (t) {
            return !1;
          }
        }
      }
      class lu extends class extends class {} {
        constructor() {
          super();
        }
        supportsDOMEvents() {
          return !0;
        }
      } {
        static makeCurrent() {
          var t;
          (t = new lu()), tc || (tc = t);
        }
        getProperty(t, e) {
          return t[e];
        }
        log(t) {
          window.console && window.console.log && window.console.log(t);
        }
        logGroup(t) {
          window.console && window.console.group && window.console.group(t);
        }
        logGroupEnd() {
          window.console &&
            window.console.groupEnd &&
            window.console.groupEnd();
        }
        onAndCancel(t, e, n) {
          return (
            t.addEventListener(e, n, !1),
            () => {
              t.removeEventListener(e, n, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          return t.parentNode && t.parentNode.removeChild(t), t;
        }
        getValue(t) {
          return t.value;
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return "window" === e
            ? window
            : "document" === e
            ? t
            : "body" === e
            ? t.body
            : null;
        }
        getHistory() {
          return window.history;
        }
        getLocation() {
          return window.location;
        }
        getBaseHref(t) {
          const e =
            uu || ((uu = document.querySelector("base")), uu)
              ? uu.getAttribute("href")
              : null;
          return null == e
            ? null
            : ((n = e),
              cu || (cu = document.createElement("a")),
              cu.setAttribute("href", n),
              "/" === cu.pathname.charAt(0) ? cu.pathname : "/" + cu.pathname);
          var n;
        }
        resetBaseElement() {
          uu = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        performanceNow() {
          return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime();
        }
        supportsCookies() {
          return !0;
        }
        getCookie(t) {
          return Qc(document.cookie, t);
        }
      }
      let cu,
        uu = null;
      const hu = new Ut("TRANSITION_ID"),
        du = [
          {
            provide: nl,
            useFactory: function (t, e, n) {
              return () => {
                n.get(rl).donePromise.then(() => {
                  const n = ec();
                  Array.prototype.slice
                    .apply(e.querySelectorAll("style[ng-transition]"))
                    .filter((e) => e.getAttribute("ng-transition") === t)
                    .forEach((t) => n.remove(t));
                });
              };
            },
            deps: [hu, nc, wi],
            multi: !0,
          },
        ];
      class pu {
        static init() {
          var t;
          (t = new pu()), (Vl = t);
        }
        addToWindow(t) {
          (At.getAngularTestability = (e, n = !0) => {
            const r = t.findTestabilityInTree(e, n);
            if (null == r)
              throw new Error("Could not find testability for element.");
            return r;
          }),
            (At.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (At.getAllAngularRootElements = () => t.getAllRootElements()),
            At.frameworkStabilizers || (At.frameworkStabilizers = []),
            At.frameworkStabilizers.push((t) => {
              const e = At.getAllAngularTestabilities();
              let n = e.length,
                r = !1;
              const s = function (e) {
                (r = r || e), n--, 0 == n && t(r);
              };
              e.forEach(function (t) {
                t.whenStable(s);
              });
            });
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null;
          const r = t.getTestability(e);
          return null != r
            ? r
            : n
            ? ec().isShadowRoot(e)
              ? this.findTestabilityInTree(t, e.host, !0)
              : this.findTestabilityInTree(t, e.parentElement, !0)
            : null;
        }
      }
      const fu = new Ut("EventManagerPlugins");
      let gu = (() => {
        class t {
          constructor(t, e) {
            (this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach((t) => (t.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n);
          }
          addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t);
            if (e) return e;
            const n = this._plugins;
            for (let r = 0; r < n.length; r++) {
              const e = n[r];
              if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e;
            }
            throw new Error(`No event manager plugin found for event ${t}`);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(fu), Wt(Sl));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class mu {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, n) {
          const r = ec().getGlobalEventTarget(this._doc, t);
          if (!r)
            throw new Error(`Unsupported event target ${r} for event ${e}`);
          return this.addEventListener(r, e, n);
        }
      }
      let yu = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const e = new Set();
              t.forEach((t) => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t));
              }),
                this.onStylesAdded(e);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        vu = (() => {
          class t extends yu {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Set()),
                (this._styleNodes = new Set()),
                this._hostNodes.add(t.head);
            }
            _addStylesToHost(t, e) {
              t.forEach((t) => {
                const n = this._doc.createElement("style");
                (n.textContent = t), this._styleNodes.add(e.appendChild(n));
              });
            }
            addHost(t) {
              this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t);
            }
            removeHost(t) {
              this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((e) => this._addStylesToHost(t, e));
            }
            ngOnDestroy() {
              this._styleNodes.forEach((t) => ec().remove(t));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(nc));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const _u = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        bu = /%COMP%/g;
      function wu(t, e, n) {
        for (let r = 0; r < e.length; r++) {
          let s = e[r];
          Array.isArray(s) ? wu(t, s, n) : ((s = s.replace(bu, t)), n.push(s));
        }
        return n;
      }
      function Cu(t) {
        return (e) => {
          if ("__ngUnwrap__" === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let xu = (() => {
        class t {
          constructor(t, e, n) {
            (this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Su(t));
          }
          createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer;
            switch (e.encapsulation) {
              case oe.Emulated: {
                let n = this.rendererByCompId.get(e.id);
                return (
                  n ||
                    ((n = new Eu(
                      this.eventManager,
                      this.sharedStylesHost,
                      e,
                      this.appId
                    )),
                    this.rendererByCompId.set(e.id, n)),
                  n.applyToHost(t),
                  n
                );
              }
              case oe.Native:
              case oe.ShadowDom:
                return new ku(this.eventManager, this.sharedStylesHost, t, e);
              default:
                if (!this.rendererByCompId.has(e.id)) {
                  const t = wu(e.id, e.styles, []);
                  this.sharedStylesHost.addStyles(t),
                    this.rendererByCompId.set(e.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(gu), Wt(vu), Wt(sl));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Su {
        constructor(t) {
          (this.eventManager = t), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(t, e) {
          return e
            ? document.createElementNS(_u[e] || e, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          t.appendChild(e);
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let n = "string" == typeof t ? document.querySelector(t) : t;
          if (!n)
            throw new Error(`The selector "${t}" did not match any elements`);
          return e || (n.textContent = ""), n;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, n, r) {
          if (r) {
            e = r + ":" + e;
            const s = _u[r];
            s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n);
          } else t.setAttribute(e, n);
        }
        removeAttribute(t, e, n) {
          if (n) {
            const r = _u[n];
            r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${n}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, n, r) {
          r & Bo.DashCase
            ? t.style.setProperty(e, n, r & Bo.Important ? "important" : "")
            : (t.style[e] = n);
        }
        removeStyle(t, e, n) {
          n & Bo.DashCase ? t.style.removeProperty(e) : (t.style[e] = "");
        }
        setProperty(t, e, n) {
          t[e] = n;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, n) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, Cu(n))
            : this.eventManager.addEventListener(t, e, Cu(n));
        }
      }
      class Eu extends Su {
        constructor(t, e, n, r) {
          super(t), (this.component = n);
          const s = wu(r + "-" + n.id, n.styles, []);
          e.addStyles(s),
            (this.contentAttr = "_ngcontent-%COMP%".replace(
              bu,
              r + "-" + n.id
            )),
            (this.hostAttr = (function (t) {
              return "_nghost-%COMP%".replace(bu, t);
            })(r + "-" + n.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, e) {
          const n = super.createElement(t, e);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      class ku extends Su {
        constructor(t, e, n, r) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = n),
            (this.component = r),
            (this.shadowRoot =
              r.encapsulation === oe.ShadowDom
                ? n.attachShadow({ mode: "open" })
                : n.createShadowRoot()),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = wu(r.id, r.styles, []);
          for (let i = 0; i < s.length; i++) {
            const t = document.createElement("style");
            (t.textContent = s[i]), this.shadowRoot.appendChild(t);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let Pu = (() => {
        class t extends mu {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, e, n) {
            return (
              t.addEventListener(e, n, !1),
              () => this.removeEventListener(t, e, n)
            );
          }
          removeEventListener(t, e, n) {
            return t.removeEventListener(e, n);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(nc));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Ou = ["alt", "control", "meta", "shift"],
        Au = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        Iu = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        Tu = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let Mu = (() => {
        class t extends mu {
          constructor(t) {
            super(t);
          }
          supports(e) {
            return null != t.parseEventName(e);
          }
          addEventListener(e, n, r) {
            const s = t.parseEventName(n),
              i = t.eventCallback(s.fullKey, r, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => ec().onAndCancel(e, s.domEventName, i));
          }
          static parseEventName(e) {
            const n = e.toLowerCase().split("."),
              r = n.shift();
            if (0 === n.length || ("keydown" !== r && "keyup" !== r))
              return null;
            const s = t._normalizeKey(n.pop());
            let i = "";
            if (
              (Ou.forEach((t) => {
                const e = n.indexOf(t);
                e > -1 && (n.splice(e, 1), (i += t + "."));
              }),
              (i += s),
              0 != n.length || 0 === s.length)
            )
              return null;
            const o = {};
            return (o.domEventName = r), (o.fullKey = i), o;
          }
          static getEventFullKey(t) {
            let e = "",
              n = (function (t) {
                let e = t.key;
                if (null == e) {
                  if (((e = t.keyIdentifier), null == e)) return "Unidentified";
                  e.startsWith("U+") &&
                    ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                    3 === t.location && Iu.hasOwnProperty(e) && (e = Iu[e]));
                }
                return Au[e] || e;
              })(t);
            return (
              (n = n.toLowerCase()),
              " " === n ? (n = "space") : "." === n && (n = "dot"),
              Ou.forEach((r) => {
                r != n && (0, Tu[r])(t) && (e += r + ".");
              }),
              (e += n),
              e
            );
          }
          static eventCallback(e, n, r) {
            return (s) => {
              t.getEventFullKey(s) === e && r.runGuarded(() => n(s));
            };
          }
          static _normalizeKey(t) {
            switch (t) {
              case "esc":
                return "escape";
              default:
                return t;
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(nc));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Du = jl(Kl, "browser", [
          { provide: ll, useValue: "browser" },
          {
            provide: al,
            useValue: function () {
              lu.makeCurrent(), pu.init();
            },
            multi: !0,
          },
          {
            provide: nc,
            useFactory: function () {
              return (
                (function (t) {
                  Oe = t;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        Ru = [
          [],
          { provide: ai, useValue: "root" },
          {
            provide: rr,
            useFactory: function () {
              return new rr();
            },
            deps: [],
          },
          { provide: fu, useClass: Pu, multi: !0, deps: [nc, Sl, ll] },
          { provide: fu, useClass: Mu, multi: !0, deps: [nc] },
          [],
          { provide: xu, useClass: xu, deps: [gu, vu, sl] },
          { provide: Go, useExisting: xu },
          { provide: yu, useExisting: vu },
          { provide: vu, useClass: vu, deps: [nc] },
          { provide: Ml, useClass: Ml, deps: [Sl] },
          { provide: gu, useClass: gu, deps: [fu, Sl] },
          [],
        ];
      let Nu = (() => {
        class t {
          constructor(t) {
            if (t)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(e) {
            return {
              ngModule: t,
              providers: [
                { provide: sl, useValue: e.appId },
                { provide: hu, useExisting: sl },
                du,
              ],
            };
          }
        }
        return (
          (t.ɵmod = fe({ type: t })),
          (t.ɵinj = ut({
            factory: function (e) {
              return new (e || t)(Wt(t, 12));
            },
            providers: Ru,
            imports: [iu, Xl],
          })),
          t
        );
      })();
      function Vu(t, e) {
        return new b((n) => {
          const r = t.length;
          if (0 === r) return void n.complete();
          const s = new Array(r);
          let i = 0,
            o = 0;
          for (let a = 0; a < r; a++) {
            const l = H(t[a]);
            let c = !1;
            n.add(
              l.subscribe({
                next: (t) => {
                  c || ((c = !0), o++), (s[a] = t);
                },
                error: (t) => n.error(t),
                complete: () => {
                  i++,
                    (i !== r && c) ||
                      (o === r &&
                        n.next(
                          e ? e.reduce((t, e, n) => ((t[e] = s[n]), t), {}) : s
                        ),
                      n.complete());
                },
              })
            );
          }
        });
      }
      "undefined" != typeof window && window;
      const Uu = new Ut("NgValueAccessor"),
        Lu = { provide: Uu, useExisting: Ct(() => Fu), multi: !0 };
      let Fu = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = (t) => {}),
              (this.onTouched = () => {});
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "checked",
              t
            );
          }
          registerOnChange(t) {
            this.onChange = t;
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ji(qo), ji($o));
          }),
          (t.ɵdir = me({
            type: t,
            selectors: [
              ["input", "type", "checkbox", "formControlName", ""],
              ["input", "type", "checkbox", "formControl", ""],
              ["input", "type", "checkbox", "ngModel", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                Xi("change", function (t) {
                  return e.onChange(t.target.checked);
                })("blur", function () {
                  return e.onTouched();
                });
            },
            features: [Lo([Lu])],
          })),
          t
        );
      })();
      const ju = { provide: Uu, useExisting: Ct(() => $u), multi: !0 },
        Hu = new Ut("CompositionEventMode");
      let $u = (() => {
          class t {
            constructor(t, e, n) {
              (this._renderer = t),
                (this._elementRef = e),
                (this._compositionMode = n),
                (this.onChange = (t) => {}),
                (this.onTouched = () => {}),
                (this._composing = !1),
                null == this._compositionMode &&
                  (this._compositionMode = !(function () {
                    const t = ec() ? ec().getUserAgent() : "";
                    return /android (\d+)/.test(t.toLowerCase());
                  })());
            }
            writeValue(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "value",
                null == t ? "" : t
              );
            }
            registerOnChange(t) {
              this.onChange = t;
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }
            _handleInput(t) {
              (!this._compositionMode ||
                (this._compositionMode && !this._composing)) &&
                this.onChange(t);
            }
            _compositionStart() {
              this._composing = !0;
            }
            _compositionEnd(t) {
              (this._composing = !1), this._compositionMode && this.onChange(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ji(qo), ji($o), ji(Hu, 8));
            }),
            (t.ɵdir = me({
              type: t,
              selectors: [
                ["input", "formControlName", "", 3, "type", "checkbox"],
                ["textarea", "formControlName", ""],
                ["input", "formControl", "", 3, "type", "checkbox"],
                ["textarea", "formControl", ""],
                ["input", "ngModel", "", 3, "type", "checkbox"],
                ["textarea", "ngModel", ""],
                ["", "ngDefaultControl", ""],
              ],
              hostBindings: function (t, e) {
                1 & t &&
                  Xi("input", function (t) {
                    return e._handleInput(t.target.value);
                  })("blur", function () {
                    return e.onTouched();
                  })("compositionstart", function () {
                    return e._compositionStart();
                  })("compositionend", function (t) {
                    return e._compositionEnd(t.target.value);
                  });
              },
              features: [Lo([ju])],
            })),
            t
          );
        })(),
        zu = (() => {
          class t {
            get value() {
              return this.control ? this.control.value : null;
            }
            get valid() {
              return this.control ? this.control.valid : null;
            }
            get invalid() {
              return this.control ? this.control.invalid : null;
            }
            get pending() {
              return this.control ? this.control.pending : null;
            }
            get disabled() {
              return this.control ? this.control.disabled : null;
            }
            get enabled() {
              return this.control ? this.control.enabled : null;
            }
            get errors() {
              return this.control ? this.control.errors : null;
            }
            get pristine() {
              return this.control ? this.control.pristine : null;
            }
            get dirty() {
              return this.control ? this.control.dirty : null;
            }
            get touched() {
              return this.control ? this.control.touched : null;
            }
            get status() {
              return this.control ? this.control.status : null;
            }
            get untouched() {
              return this.control ? this.control.untouched : null;
            }
            get statusChanges() {
              return this.control ? this.control.statusChanges : null;
            }
            get valueChanges() {
              return this.control ? this.control.valueChanges : null;
            }
            get path() {
              return null;
            }
            reset(t) {
              this.control && this.control.reset(t);
            }
            hasError(t, e) {
              return !!this.control && this.control.hasError(t, e);
            }
            getError(t, e) {
              return this.control ? this.control.getError(t, e) : null;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = me({ type: t })),
            t
          );
        })(),
        Gu = (() => {
          class t extends zu {
            get formDirective() {
              return null;
            }
            get path() {
              return null;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return Bu(e || t);
            }),
            (t.ɵdir = me({ type: t, features: [Co] })),
            t
          );
        })();
      const Bu = Xn(Gu);
      function qu() {
        throw new Error("unimplemented");
      }
      class Wu extends zu {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null),
            (this._rawValidators = []),
            (this._rawAsyncValidators = []);
        }
        get validator() {
          return qu();
        }
        get asyncValidator() {
          return qu();
        }
      }
      class Zu {
        constructor(t) {
          this._cd = t;
        }
        get ngClassUntouched() {
          return !!this._cd.control && this._cd.control.untouched;
        }
        get ngClassTouched() {
          return !!this._cd.control && this._cd.control.touched;
        }
        get ngClassPristine() {
          return !!this._cd.control && this._cd.control.pristine;
        }
        get ngClassDirty() {
          return !!this._cd.control && this._cd.control.dirty;
        }
        get ngClassValid() {
          return !!this._cd.control && this._cd.control.valid;
        }
        get ngClassInvalid() {
          return !!this._cd.control && this._cd.control.invalid;
        }
        get ngClassPending() {
          return !!this._cd.control && this._cd.control.pending;
        }
      }
      let Qu = (() => {
          class t extends Zu {
            constructor(t) {
              super(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ji(Wu, 2));
            }),
            (t.ɵdir = me({
              type: t,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""],
              ],
              hostVars: 14,
              hostBindings: function (t, e) {
                2 & t &&
                  co("ng-untouched", e.ngClassUntouched)(
                    "ng-touched",
                    e.ngClassTouched
                  )("ng-pristine", e.ngClassPristine)(
                    "ng-dirty",
                    e.ngClassDirty
                  )("ng-valid", e.ngClassValid)("ng-invalid", e.ngClassInvalid)(
                    "ng-pending",
                    e.ngClassPending
                  );
              },
              features: [Co],
            })),
            t
          );
        })(),
        Yu = (() => {
          class t extends Zu {
            constructor(t) {
              super(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ji(Gu, 2));
            }),
            (t.ɵdir = me({
              type: t,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""],
              ],
              hostVars: 14,
              hostBindings: function (t, e) {
                2 & t &&
                  co("ng-untouched", e.ngClassUntouched)(
                    "ng-touched",
                    e.ngClassTouched
                  )("ng-pristine", e.ngClassPristine)(
                    "ng-dirty",
                    e.ngClassDirty
                  )("ng-valid", e.ngClassValid)("ng-invalid", e.ngClassInvalid)(
                    "ng-pending",
                    e.ngClassPending
                  );
              },
              features: [Co],
            })),
            t
          );
        })();
      function Ku(t) {
        return null == t || 0 === t.length;
      }
      const Ju = new Ut("NgValidators"),
        Xu = new Ut("NgAsyncValidators"),
        th =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class eh {
        static min(t) {
          return (e) => {
            if (Ku(e.value) || Ku(t)) return null;
            const n = parseFloat(e.value);
            return !isNaN(n) && n < t
              ? { min: { min: t, actual: e.value } }
              : null;
          };
        }
        static max(t) {
          return (e) => {
            if (Ku(e.value) || Ku(t)) return null;
            const n = parseFloat(e.value);
            return !isNaN(n) && n > t
              ? { max: { max: t, actual: e.value } }
              : null;
          };
        }
        static required(t) {
          return Ku(t.value) ? { required: !0 } : null;
        }
        static requiredTrue(t) {
          return !0 === t.value ? null : { required: !0 };
        }
        static email(t) {
          return Ku(t.value) ? null : th.test(t.value) ? null : { email: !0 };
        }
        static minLength(t) {
          return (e) => {
            if (Ku(e.value)) return null;
            const n = e.value ? e.value.length : 0;
            return n < t
              ? { minlength: { requiredLength: t, actualLength: n } }
              : null;
          };
        }
        static maxLength(t) {
          return (e) => {
            const n = e.value ? e.value.length : 0;
            return n > t
              ? { maxlength: { requiredLength: t, actualLength: n } }
              : null;
          };
        }
        static pattern(t) {
          if (!t) return eh.nullValidator;
          let e, n;
          return (
            "string" == typeof t
              ? ((n = ""),
                "^" !== t.charAt(0) && (n += "^"),
                (n += t),
                "$" !== t.charAt(t.length - 1) && (n += "$"),
                (e = new RegExp(n)))
              : ((n = t.toString()), (e = t)),
            (t) => {
              if (Ku(t.value)) return null;
              const r = t.value;
              return e.test(r)
                ? null
                : { pattern: { requiredPattern: n, actualValue: r } };
            }
          );
        }
        static nullValidator(t) {
          return null;
        }
        static compose(t) {
          if (!t) return null;
          const e = t.filter(nh);
          return 0 == e.length
            ? null
            : function (t) {
                return sh(
                  (function (t, e) {
                    return e.map((e) => e(t));
                  })(t, e)
                );
              };
        }
        static composeAsync(t) {
          if (!t) return null;
          const e = t.filter(nh);
          return 0 == e.length
            ? null
            : function (t) {
                return (function (...t) {
                  if (1 === t.length) {
                    const e = t[0];
                    if (l(e)) return Vu(e, null);
                    if (c(e) && Object.getPrototypeOf(e) === Object.prototype) {
                      const t = Object.keys(e);
                      return Vu(
                        t.map((t) => e[t]),
                        t
                      );
                    }
                  }
                  if ("function" == typeof t[t.length - 1]) {
                    const e = t.pop();
                    return Vu(
                      (t = 1 === t.length && l(t[0]) ? t[0] : t),
                      null
                    ).pipe(U((t) => e(...t)));
                  }
                  return Vu(t, null);
                })(
                  (function (t, e) {
                    return e.map((e) => e(t));
                  })(t, e).map(rh)
                ).pipe(U(sh));
              };
        }
      }
      function nh(t) {
        return null != t;
      }
      function rh(t) {
        const e = Ki(t) ? H(t) : t;
        if (!Ji(e))
          throw new Error(
            "Expected validator to return Promise or Observable."
          );
        return e;
      }
      function sh(t) {
        let e = {};
        return (
          t.forEach((t) => {
            e = null != t ? Object.assign(Object.assign({}, e), t) : e;
          }),
          0 === Object.keys(e).length ? null : e
        );
      }
      function ih(t) {
        return t.validate ? (e) => t.validate(e) : t;
      }
      function oh(t) {
        return t.validate ? (e) => t.validate(e) : t;
      }
      const ah = { provide: Uu, useExisting: Ct(() => lh), multi: !0 };
      let lh = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = (t) => {}),
              (this.onTouched = () => {});
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              null == t ? "" : t
            );
          }
          registerOnChange(t) {
            this.onChange = (e) => {
              t("" == e ? null : parseFloat(e));
            };
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ji(qo), ji($o));
          }),
          (t.ɵdir = me({
            type: t,
            selectors: [
              ["input", "type", "number", "formControlName", ""],
              ["input", "type", "number", "formControl", ""],
              ["input", "type", "number", "ngModel", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                Xi("change", function (t) {
                  return e.onChange(t.target.value);
                })("input", function (t) {
                  return e.onChange(t.target.value);
                })("blur", function () {
                  return e.onTouched();
                });
            },
            features: [Lo([ah])],
          })),
          t
        );
      })();
      const ch = { provide: Uu, useExisting: Ct(() => hh), multi: !0 };
      let uh = (() => {
          class t {
            constructor() {
              this._accessors = [];
            }
            add(t, e) {
              this._accessors.push([t, e]);
            }
            remove(t) {
              for (let e = this._accessors.length - 1; e >= 0; --e)
                if (this._accessors[e][1] === t)
                  return void this._accessors.splice(e, 1);
            }
            select(t) {
              this._accessors.forEach((e) => {
                this._isSameGroup(e, t) &&
                  e[1] !== t &&
                  e[1].fireUncheck(t.value);
              });
            }
            _isSameGroup(t, e) {
              return (
                !!t[0].control &&
                t[0]._parent === e._control._parent &&
                t[1].name === e.name
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        hh = (() => {
          class t {
            constructor(t, e, n, r) {
              (this._renderer = t),
                (this._elementRef = e),
                (this._registry = n),
                (this._injector = r),
                (this.onChange = () => {}),
                (this.onTouched = () => {});
            }
            ngOnInit() {
              (this._control = this._injector.get(Wu)),
                this._checkName(),
                this._registry.add(this._control, this);
            }
            ngOnDestroy() {
              this._registry.remove(this);
            }
            writeValue(t) {
              (this._state = t === this.value),
                this._renderer.setProperty(
                  this._elementRef.nativeElement,
                  "checked",
                  this._state
                );
            }
            registerOnChange(t) {
              (this._fn = t),
                (this.onChange = () => {
                  t(this.value), this._registry.select(this);
                });
            }
            fireUncheck(t) {
              this.writeValue(t);
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }
            _checkName() {
              this.name &&
                this.formControlName &&
                this.name !== this.formControlName &&
                this._throwNameError(),
                !this.name &&
                  this.formControlName &&
                  (this.name = this.formControlName);
            }
            _throwNameError() {
              throw new Error(
                '\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type="radio" formControlName="food" name="food">\n    '
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ji(qo), ji($o), ji(uh), ji(wi));
            }),
            (t.ɵdir = me({
              type: t,
              selectors: [
                ["input", "type", "radio", "formControlName", ""],
                ["input", "type", "radio", "formControl", ""],
                ["input", "type", "radio", "ngModel", ""],
              ],
              hostBindings: function (t, e) {
                1 & t &&
                  Xi("change", function () {
                    return e.onChange();
                  })("blur", function () {
                    return e.onTouched();
                  });
              },
              inputs: {
                name: "name",
                formControlName: "formControlName",
                value: "value",
              },
              features: [Lo([ch])],
            })),
            t
          );
        })();
      const dh = { provide: Uu, useExisting: Ct(() => ph), multi: !0 };
      let ph = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = (t) => {}),
              (this.onTouched = () => {});
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              parseFloat(t)
            );
          }
          registerOnChange(t) {
            this.onChange = (e) => {
              t("" == e ? null : parseFloat(e));
            };
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ji(qo), ji($o));
          }),
          (t.ɵdir = me({
            type: t,
            selectors: [
              ["input", "type", "range", "formControlName", ""],
              ["input", "type", "range", "formControl", ""],
              ["input", "type", "range", "ngModel", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                Xi("change", function (t) {
                  return e.onChange(t.target.value);
                })("input", function (t) {
                  return e.onChange(t.target.value);
                })("blur", function () {
                  return e.onTouched();
                });
            },
            features: [Lo([dh])],
          })),
          t
        );
      })();
      const fh =
          '\n    <div [formGroup]="myGroup">\n      <input formControlName="firstName">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });',
        gh =
          '\n    <div [formGroup]="myGroup">\n       <div formGroupName="person">\n          <input formControlName="firstName">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });',
        mh =
          '\n    <form>\n       <div ngModelGroup="person">\n          <input [(ngModel)]="person.name" name="firstName">\n       </div>\n    </form>';
      class yh {
        static controlParentException() {
          throw new Error(
            `formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      ${fh}`
          );
        }
        static ngModelGroupException() {
          throw new Error(
            `formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents\n       that also have a "form" prefix: formGroupName, formArrayName, or formGroup.\n\n       Option 1:  Update the parent to be formGroupName (reactive form strategy)\n\n        ${gh}\n\n        Option 2: Use ngModel instead of formControlName (template-driven strategy)\n\n        ${mh}`
          );
        }
        static missingFormException() {
          throw new Error(
            `formGroup expects a FormGroup instance. Please pass one in.\n\n       Example:\n\n       ${fh}`
          );
        }
        static groupParentException() {
          throw new Error(
            `formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup\n      directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      ${gh}`
          );
        }
        static arrayParentException() {
          throw new Error(
            'formArrayName must be used with a parent formGroup directive.  You\'ll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n        Example:\n\n        \n    <div [formGroup]="myGroup">\n      <div formArrayName="cities">\n        <div *ngFor="let city of cityArray.controls; index as i">\n          <input [formControlName]="i">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl(\'SF\')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });'
          );
        }
        static disabledAttrWarning() {
          console.warn(
            "\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\n      you. We recommend using this approach to avoid 'changed after checked' errors.\n       \n      Example: \n      form = new FormGroup({\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\n        last: new FormControl('Drew', Validators.required)\n      });\n    "
          );
        }
        static ngModelWarning(t) {
          console.warn(
            `\n    It looks like you're using ngModel on the same form field as ${t}. \n    Support for using the ngModel input property and ngModelChange event with \n    reactive form directives has been deprecated in Angular v6 and will be removed \n    in Angular v7.\n    \n    For more information on this, see our API docs here:\n    https://angular.io/api/forms/${
              "formControl" === t ? "FormControlDirective" : "FormControlName"
            }#use-with-ngmodel\n    `
          );
        }
      }
      const vh = { provide: Uu, useExisting: Ct(() => _h), multi: !0 };
      let _h = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this._optionMap = new Map()),
              (this._idCounter = 0),
              (this.onChange = (t) => {}),
              (this.onTouched = () => {}),
              (this._compareWith = Ai);
          }
          set compareWith(t) {
            if ("function" != typeof t)
              throw new Error(
                `compareWith must be a function, but received ${JSON.stringify(
                  t
                )}`
              );
            this._compareWith = t;
          }
          writeValue(t) {
            this.value = t;
            const e = this._getOptionId(t);
            null == e &&
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "selectedIndex",
                -1
              );
            const n = (function (t, e) {
              return null == t
                ? `${e}`
                : (e && "object" == typeof e && (e = "Object"),
                  `${t}: ${e}`.slice(0, 50));
            })(e, t);
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              n
            );
          }
          registerOnChange(t) {
            this.onChange = (e) => {
              (this.value = this._getOptionValue(e)), t(this.value);
            };
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
          _registerOption() {
            return (this._idCounter++).toString();
          }
          _getOptionId(t) {
            for (const e of Array.from(this._optionMap.keys()))
              if (this._compareWith(this._optionMap.get(e), t)) return e;
            return null;
          }
          _getOptionValue(t) {
            const e = (function (t) {
              return t.split(":")[0];
            })(t);
            return this._optionMap.has(e) ? this._optionMap.get(e) : t;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ji(qo), ji($o));
          }),
          (t.ɵdir = me({
            type: t,
            selectors: [
              ["select", "formControlName", "", 3, "multiple", ""],
              ["select", "formControl", "", 3, "multiple", ""],
              ["select", "ngModel", "", 3, "multiple", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                Xi("change", function (t) {
                  return e.onChange(t.target.value);
                })("blur", function () {
                  return e.onTouched();
                });
            },
            inputs: { compareWith: "compareWith" },
            features: [Lo([vh])],
          })),
          t
        );
      })();
      const bh = { provide: Uu, useExisting: Ct(() => wh), multi: !0 };
      let wh = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this._optionMap = new Map()),
              (this._idCounter = 0),
              (this.onChange = (t) => {}),
              (this.onTouched = () => {}),
              (this._compareWith = Ai);
          }
          set compareWith(t) {
            if ("function" != typeof t)
              throw new Error(
                `compareWith must be a function, but received ${JSON.stringify(
                  t
                )}`
              );
            this._compareWith = t;
          }
          writeValue(t) {
            let e;
            if (((this.value = t), Array.isArray(t))) {
              const n = t.map((t) => this._getOptionId(t));
              e = (t, e) => {
                t._setSelected(n.indexOf(e.toString()) > -1);
              };
            } else
              e = (t, e) => {
                t._setSelected(!1);
              };
            this._optionMap.forEach(e);
          }
          registerOnChange(t) {
            this.onChange = (e) => {
              const n = [];
              if (e.hasOwnProperty("selectedOptions")) {
                const t = e.selectedOptions;
                for (let e = 0; e < t.length; e++) {
                  const r = t.item(e),
                    s = this._getOptionValue(r.value);
                  n.push(s);
                }
              } else {
                const t = e.options;
                for (let e = 0; e < t.length; e++) {
                  const r = t.item(e);
                  if (r.selected) {
                    const t = this._getOptionValue(r.value);
                    n.push(t);
                  }
                }
              }
              (this.value = n), t(n);
            };
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
          _registerOption(t) {
            const e = (this._idCounter++).toString();
            return this._optionMap.set(e, t), e;
          }
          _getOptionId(t) {
            for (const e of Array.from(this._optionMap.keys()))
              if (this._compareWith(this._optionMap.get(e)._value, t)) return e;
            return null;
          }
          _getOptionValue(t) {
            const e = (function (t) {
              return t.split(":")[0];
            })(t);
            return this._optionMap.has(e) ? this._optionMap.get(e)._value : t;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ji(qo), ji($o));
          }),
          (t.ɵdir = me({
            type: t,
            selectors: [
              ["select", "multiple", "", "formControlName", ""],
              ["select", "multiple", "", "formControl", ""],
              ["select", "multiple", "", "ngModel", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                Xi("change", function (t) {
                  return e.onChange(t.target);
                })("blur", function () {
                  return e.onTouched();
                });
            },
            inputs: { compareWith: "compareWith" },
            features: [Lo([bh])],
          })),
          t
        );
      })();
      function Ch(t, e) {
        return [...e.path, t];
      }
      function xh(t, e) {
        t || Ph(e, "Cannot find control with"),
          e.valueAccessor || Ph(e, "No value accessor for form control with"),
          (t.validator = eh.compose([t.validator, e.validator])),
          (t.asyncValidator = eh.composeAsync([
            t.asyncValidator,
            e.asyncValidator,
          ])),
          e.valueAccessor.writeValue(t.value),
          (function (t, e) {
            e.valueAccessor.registerOnChange((n) => {
              (t._pendingValue = n),
                (t._pendingChange = !0),
                (t._pendingDirty = !0),
                "change" === t.updateOn && Sh(t, e);
            });
          })(t, e),
          (function (t, e) {
            t.registerOnChange((t, n) => {
              e.valueAccessor.writeValue(t), n && e.viewToModelUpdate(t);
            });
          })(t, e),
          (function (t, e) {
            e.valueAccessor.registerOnTouched(() => {
              (t._pendingTouched = !0),
                "blur" === t.updateOn && t._pendingChange && Sh(t, e),
                "submit" !== t.updateOn && t.markAsTouched();
            });
          })(t, e),
          e.valueAccessor.setDisabledState &&
            t.registerOnDisabledChange((t) => {
              e.valueAccessor.setDisabledState(t);
            }),
          e._rawValidators.forEach((e) => {
            e.registerOnValidatorChange &&
              e.registerOnValidatorChange(() => t.updateValueAndValidity());
          }),
          e._rawAsyncValidators.forEach((e) => {
            e.registerOnValidatorChange &&
              e.registerOnValidatorChange(() => t.updateValueAndValidity());
          });
      }
      function Sh(t, e) {
        t._pendingDirty && t.markAsDirty(),
          t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
          e.viewToModelUpdate(t._pendingValue),
          (t._pendingChange = !1);
      }
      function Eh(t, e) {
        null == t && Ph(e, "Cannot find control with"),
          (t.validator = eh.compose([t.validator, e.validator])),
          (t.asyncValidator = eh.composeAsync([
            t.asyncValidator,
            e.asyncValidator,
          ]));
      }
      function kh(t) {
        return Ph(
          t,
          "There is no FormControl instance attached to form control element with"
        );
      }
      function Ph(t, e) {
        let n;
        throw (
          ((n =
            t.path.length > 1
              ? `path: '${t.path.join(" -> ")}'`
              : t.path[0]
              ? `name: '${t.path}'`
              : "unspecified name attribute"),
          new Error(`${e} ${n}`))
        );
      }
      function Oh(t) {
        return null != t ? eh.compose(t.map(ih)) : null;
      }
      function Ah(t) {
        return null != t ? eh.composeAsync(t.map(oh)) : null;
      }
      function Ih(t, e) {
        if (!t.hasOwnProperty("model")) return !1;
        const n = t.model;
        return !!n.isFirstChange() || !Ai(e, n.currentValue);
      }
      const Th = [Fu, ph, lh, _h, wh, hh];
      function Mh(t, e) {
        t._syncPendingControls(),
          e.forEach((t) => {
            const e = t.control;
            "submit" === e.updateOn &&
              e._pendingChange &&
              (t.viewToModelUpdate(e._pendingValue), (e._pendingChange = !1));
          });
      }
      function Dh(t, e) {
        if (!e) return null;
        Array.isArray(e) ||
          Ph(
            t,
            "Value accessor was not provided as an array for form control with"
          );
        let n = void 0,
          r = void 0,
          s = void 0;
        return (
          e.forEach((e) => {
            var i;
            e.constructor === $u
              ? (n = e)
              : ((i = e),
                Th.some((t) => i.constructor === t)
                  ? (r &&
                      Ph(
                        t,
                        "More than one built-in value accessor matches form control with"
                      ),
                    (r = e))
                  : (s &&
                      Ph(
                        t,
                        "More than one custom value accessor matches form control with"
                      ),
                    (s = e)));
          }),
          s ||
            r ||
            n ||
            (Ph(t, "No valid value accessor for form control with"), null)
        );
      }
      function Rh(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      function Nh(t) {
        const e = Uh(t) ? t.validators : t;
        return Array.isArray(e) ? Oh(e) : e || null;
      }
      function Vh(t, e) {
        const n = Uh(e) ? e.asyncValidators : t;
        return Array.isArray(n) ? Ah(n) : n || null;
      }
      function Uh(t) {
        return null != t && !Array.isArray(t) && "object" == typeof t;
      }
      class Lh {
        constructor(t, e) {
          (this.validator = t),
            (this.asyncValidator = e),
            (this._onCollectionChange = () => {}),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []);
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return "VALID" === this.status;
        }
        get invalid() {
          return "INVALID" === this.status;
        }
        get pending() {
          return "PENDING" == this.status;
        }
        get disabled() {
          return "DISABLED" === this.status;
        }
        get enabled() {
          return "DISABLED" !== this.status;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          this.validator = Nh(t);
        }
        setAsyncValidators(t) {
          this.asyncValidator = Vh(t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((t) => {
              t.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((t) => {
              t.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = "PENDING"),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = "DISABLED"),
            (this.errors = null),
            this._forEachChild((e) => {
              e.disable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: e })
            ),
            this._onDisabledChange.forEach((t) => t(!0));
        }
        enable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = "VALID"),
            this._forEachChild((e) => {
              e.enable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: e })
            ),
            this._onDisabledChange.forEach((t) => t(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              ("VALID" !== this.status && "PENDING" !== this.status) ||
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((e) => e._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? "DISABLED" : "VALID";
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            this.status = "PENDING";
            const e = rh(this.asyncValidator(this));
            this._asyncValidationSubscription = e.subscribe((e) =>
              this.setErrors(e, { emitEvent: t })
            );
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            this._asyncValidationSubscription.unsubscribe();
        }
        setErrors(t, e = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== e.emitEvent);
        }
        get(t) {
          return (function (t, e, n) {
            if (null == e) return null;
            if (
              (Array.isArray(e) || (e = e.split(".")),
              Array.isArray(e) && 0 === e.length)
            )
              return null;
            let r = t;
            return (
              e.forEach((t) => {
                r =
                  r instanceof jh
                    ? r.controls.hasOwnProperty(t)
                      ? r.controls[t]
                      : null
                    : (r instanceof Hh && r.at(t)) || null;
              }),
              r
            );
          })(this, t);
        }
        getError(t, e) {
          const n = e ? this.get(e) : this;
          return n && n.errors ? n.errors[t] : null;
        }
        hasError(t, e) {
          return !!this.getError(t, e);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new Ha()), (this.statusChanges = new Ha());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? "DISABLED"
            : this.errors
            ? "INVALID"
            : this._anyControlsHaveStatus("PENDING")
            ? "PENDING"
            : this._anyControlsHaveStatus("INVALID")
            ? "INVALID"
            : "VALID";
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((e) => e.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _isBoxedValue(t) {
          return (
            "object" == typeof t &&
            null !== t &&
            2 === Object.keys(t).length &&
            "value" in t &&
            "disabled" in t
          );
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          Uh(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            this._parent &&
            this._parent.dirty &&
            !this._parent._anyControlsDirty()
          );
        }
      }
      class Fh extends Lh {
        constructor(t = null, e, n) {
          super(Nh(e), Vh(n, e)),
            (this._onChange = []),
            this._applyFormState(t),
            this._setUpdateStrategy(e),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 }),
            this._initObservables();
        }
        setValue(t, e = {}) {
          (this.value = this._pendingValue = t),
            this._onChange.length &&
              !1 !== e.emitModelToViewChange &&
              this._onChange.forEach((t) =>
                t(this.value, !1 !== e.emitViewToModelChange)
              ),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          this.setValue(t, e);
        }
        reset(t = null, e = {}) {
          this._applyFormState(t),
            this.markAsPristine(e),
            this.markAsUntouched(e),
            this.setValue(this.value, e),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(t) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(t) {
          this._onChange.push(t);
        }
        _clearChangeFns() {
          (this._onChange = []),
            (this._onDisabledChange = []),
            (this._onCollectionChange = () => {});
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t);
        }
        _forEachChild(t) {}
        _syncPendingControls() {
          return !(
            "submit" !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1,
            }),
            0)
          );
        }
        _applyFormState(t) {
          this._isBoxedValue(t)
            ? ((this.value = this._pendingValue = t.value),
              t.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = t);
        }
      }
      class jh extends Lh {
        constructor(t, e, n) {
          super(Nh(e), Vh(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 });
        }
        registerControl(t, e) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = e),
              e.setParent(this),
              e._registerOnCollectionChange(this._onCollectionChange),
              e);
        }
        addControl(t, e) {
          this.registerControl(t, e),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        removeControl(t) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        setControl(t, e) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            e && this.registerControl(t, e),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            Object.keys(t).forEach((n) => {
              this._throwIfControlMissing(n),
                this.controls[n].setValue(t[n], {
                  onlySelf: !0,
                  emitEvent: e.emitEvent,
                });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          Object.keys(t).forEach((n) => {
            this.controls[n] &&
              this.controls[n].patchValue(t[n], {
                onlySelf: !0,
                emitEvent: e.emitEvent,
              });
          }),
            this.updateValueAndValidity(e);
        }
        reset(t = {}, e = {}) {
          this._forEachChild((n, r) => {
            n.reset(t[r], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, e, n) => (
              (t[n] = e instanceof Fh ? e.value : e.getRawValue()), t
            )
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (t, e) => !!e._syncPendingControls() || t
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _throwIfControlMissing(t) {
          if (!Object.keys(this.controls).length)
            throw new Error(
              "\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.controls[t])
            throw new Error(`Cannot find form control with name: ${t}.`);
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((e) => t(this.controls[e], e));
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          let e = !1;
          return (
            this._forEachChild((n, r) => {
              e = e || (this.contains(r) && t(n));
            }),
            e
          );
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (t, e, n) => ((e.enabled || this.disabled) && (t[n] = e.value), t)
          );
        }
        _reduceChildren(t, e) {
          let n = t;
          return (
            this._forEachChild((t, r) => {
              n = e(n, t, r);
            }),
            n
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n])
              throw new Error(
                `Must supply a value for form control with name: '${n}'.`
              );
          });
        }
      }
      class Hh extends Lh {
        constructor(t, e, n) {
          super(Nh(e), Vh(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 });
        }
        at(t) {
          return this.controls[t];
        }
        push(t) {
          this.controls.push(t),
            this._registerControl(t),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        insert(t, e) {
          this.controls.splice(t, 0, e),
            this._registerControl(e),
            this.updateValueAndValidity();
        }
        removeAt(t) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            this.updateValueAndValidity();
        }
        setControl(t, e) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            e && (this.controls.splice(t, 0, e), this._registerControl(e)),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            t.forEach((t, n) => {
              this._throwIfControlMissing(n),
                this.at(n).setValue(t, {
                  onlySelf: !0,
                  emitEvent: e.emitEvent,
                });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          t.forEach((t, n) => {
            this.at(n) &&
              this.at(n).patchValue(t, {
                onlySelf: !0,
                emitEvent: e.emitEvent,
              });
          }),
            this.updateValueAndValidity(e);
        }
        reset(t = [], e = {}) {
          this._forEachChild((n, r) => {
            n.reset(t[r], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this.controls.map((t) =>
            t instanceof Fh ? t.value : t.getRawValue()
          );
        }
        clear() {
          this.controls.length < 1 ||
            (this._forEachChild((t) => t._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity());
        }
        _syncPendingControls() {
          let t = this.controls.reduce(
            (t, e) => !!e._syncPendingControls() || t,
            !1
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _throwIfControlMissing(t) {
          if (!this.controls.length)
            throw new Error(
              "\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.at(t))
            throw new Error(`Cannot find form control at index ${t}`);
        }
        _forEachChild(t) {
          this.controls.forEach((e, n) => {
            t(e, n);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter((t) => t.enabled || this.disabled)
            .map((t) => t.value);
        }
        _anyControls(t) {
          return this.controls.some((e) => e.enabled && t(e));
        }
        _setUpControls() {
          this._forEachChild((t) => this._registerControl(t));
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n])
              throw new Error(
                `Must supply a value for form control at index: ${n}.`
              );
          });
        }
        _allControlsDisabled() {
          for (const t of this.controls) if (t.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(t) {
          t.setParent(this),
            t._registerOnCollectionChange(this._onCollectionChange);
        }
      }
      const $h = { provide: Gu, useExisting: Ct(() => Gh) },
        zh = (() => Promise.resolve(null))();
      let Gh = (() => {
          class t extends Gu {
            constructor(t, e) {
              super(),
                (this.submitted = !1),
                (this._directives = []),
                (this.ngSubmit = new Ha()),
                (this.form = new jh({}, Oh(t), Ah(e)));
            }
            ngAfterViewInit() {
              this._setUpdateStrategy();
            }
            get formDirective() {
              return this;
            }
            get control() {
              return this.form;
            }
            get path() {
              return [];
            }
            get controls() {
              return this.form.controls;
            }
            addControl(t) {
              zh.then(() => {
                const e = this._findContainer(t.path);
                (t.control = e.registerControl(t.name, t.control)),
                  xh(t.control, t),
                  t.control.updateValueAndValidity({ emitEvent: !1 }),
                  this._directives.push(t);
              });
            }
            getControl(t) {
              return this.form.get(t.path);
            }
            removeControl(t) {
              zh.then(() => {
                const e = this._findContainer(t.path);
                e && e.removeControl(t.name), Rh(this._directives, t);
              });
            }
            addFormGroup(t) {
              zh.then(() => {
                const e = this._findContainer(t.path),
                  n = new jh({});
                Eh(n, t),
                  e.registerControl(t.name, n),
                  n.updateValueAndValidity({ emitEvent: !1 });
              });
            }
            removeFormGroup(t) {
              zh.then(() => {
                const e = this._findContainer(t.path);
                e && e.removeControl(t.name);
              });
            }
            getFormGroup(t) {
              return this.form.get(t.path);
            }
            updateModel(t, e) {
              zh.then(() => {
                this.form.get(t.path).setValue(e);
              });
            }
            setValue(t) {
              this.control.setValue(t);
            }
            onSubmit(t) {
              return (
                (this.submitted = !0),
                Mh(this.form, this._directives),
                this.ngSubmit.emit(t),
                !1
              );
            }
            onReset() {
              this.resetForm();
            }
            resetForm(t) {
              this.form.reset(t), (this.submitted = !1);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.form._updateOn = this.options.updateOn);
            }
            _findContainer(t) {
              return t.pop(), t.length ? this.form.get(t) : this.form;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ji(Ju, 10), ji(Xu, 10));
            }),
            (t.ɵdir = me({
              type: t,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
                ["ng-form"],
                ["", "ngForm", ""],
              ],
              hostBindings: function (t, e) {
                1 & t &&
                  Xi("submit", function (t) {
                    return e.onSubmit(t);
                  })("reset", function () {
                    return e.onReset();
                  });
              },
              inputs: { options: ["ngFormOptions", "options"] },
              outputs: { ngSubmit: "ngSubmit" },
              exportAs: ["ngForm"],
              features: [Lo([$h]), Co],
            })),
            t
          );
        })(),
        Bh = (() => {
          class t extends Gu {
            ngOnInit() {
              this._checkParentType(), this.formDirective.addFormGroup(this);
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeFormGroup(this);
            }
            get control() {
              return this.formDirective.getFormGroup(this);
            }
            get path() {
              return Ch(
                null == this.name ? this.name : this.name.toString(),
                this._parent
              );
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            get validator() {
              return Oh(this._validators);
            }
            get asyncValidator() {
              return Ah(this._asyncValidators);
            }
            _checkParentType() {}
          }
          return (
            (t.ɵfac = function (e) {
              return qh(e || t);
            }),
            (t.ɵdir = me({ type: t, features: [Co] })),
            t
          );
        })();
      const qh = Xn(Bh);
      class Wh {
        static modelParentException() {
          throw new Error(
            `\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup's partner directive "formControlName" instead.  Example:\n\n      ${fh}\n\n      Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:\n\n      Example:\n\n      \n    <div [formGroup]="myGroup">\n       <input formControlName="firstName">\n       <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">\n    </div>\n  `
          );
        }
        static formGroupNameException() {
          throw new Error(
            `\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      ${gh}\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      ${mh}`
          );
        }
        static missingNameException() {
          throw new Error(
            'If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as \'standalone\' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]="person.firstName" name="first">\n      Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">'
          );
        }
        static modelGroupParentException() {
          throw new Error(
            `\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      ${gh}\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      ${mh}`
          );
        }
      }
      const Zh = { provide: Gu, useExisting: Ct(() => Qh) };
      let Qh = (() => {
        class t extends Bh {
          constructor(t, e, n) {
            super(),
              (this._parent = t),
              (this._validators = e),
              (this._asyncValidators = n);
          }
          _checkParentType() {
            this._parent instanceof t ||
              this._parent instanceof Gh ||
              Wh.modelGroupParentException();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ji(Gu, 5), ji(Ju, 10), ji(Xu, 10));
          }),
          (t.ɵdir = me({
            type: t,
            selectors: [["", "ngModelGroup", ""]],
            inputs: { name: ["ngModelGroup", "name"] },
            exportAs: ["ngModelGroup"],
            features: [Lo([Zh]), Co],
          })),
          t
        );
      })();
      const Yh = { provide: Wu, useExisting: Ct(() => Jh) },
        Kh = (() => Promise.resolve(null))();
      let Jh = (() => {
          class t extends Wu {
            constructor(t, e, n, r) {
              super(),
                (this.control = new Fh()),
                (this._registered = !1),
                (this.update = new Ha()),
                (this._parent = t),
                (this._rawValidators = e || []),
                (this._rawAsyncValidators = n || []),
                (this.valueAccessor = Dh(this, r));
            }
            ngOnChanges(t) {
              this._checkForErrors(),
                this._registered || this._setUpControl(),
                "isDisabled" in t && this._updateDisabled(t),
                Ih(t, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._parent ? Ch(this.name, this._parent) : [this.name];
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            get validator() {
              return Oh(this._rawValidators);
            }
            get asyncValidator() {
              return Ah(this._rawAsyncValidators);
            }
            viewToModelUpdate(t) {
              (this.viewModel = t), this.update.emit(t);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              xh(this.control, this),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {
              !(this._parent instanceof Qh) && this._parent instanceof Bh
                ? Wh.formGroupNameException()
                : this._parent instanceof Qh ||
                  this._parent instanceof Gh ||
                  Wh.modelParentException();
            }
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone() || this.name || Wh.missingNameException();
            }
            _updateValue(t) {
              Kh.then(() => {
                this.control.setValue(t, { emitViewToModelChange: !1 });
              });
            }
            _updateDisabled(t) {
              const e = t.isDisabled.currentValue,
                n = "" === e || (e && "false" !== e);
              Kh.then(() => {
                n && !this.control.disabled
                  ? this.control.disable()
                  : !n && this.control.disabled && this.control.enable();
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                ji(Gu, 9),
                ji(Ju, 10),
                ji(Xu, 10),
                ji(Uu, 10)
              );
            }),
            (t.ɵdir = me({
              type: t,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [Lo([Yh]), Co, Oo],
            })),
            t
          );
        })(),
        Xh = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = me({
              type: t,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""],
              ],
              hostAttrs: ["novalidate", ""],
            })),
            t
          );
        })();
      const td = new Ut("NgModelWithFormControlWarning"),
        ed = { provide: Gu, useExisting: Ct(() => nd) };
      let nd = (() => {
        class t extends Gu {
          constructor(t, e) {
            super(),
              (this._validators = t),
              (this._asyncValidators = e),
              (this.submitted = !1),
              (this.directives = []),
              (this.form = null),
              (this.ngSubmit = new Ha());
          }
          ngOnChanges(t) {
            this._checkFormPresent(),
              t.hasOwnProperty("form") &&
                (this._updateValidators(),
                this._updateDomValue(),
                this._updateRegistrations());
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          addControl(t) {
            const e = this.form.get(t.path);
            return (
              xh(e, t),
              e.updateValueAndValidity({ emitEvent: !1 }),
              this.directives.push(t),
              e
            );
          }
          getControl(t) {
            return this.form.get(t.path);
          }
          removeControl(t) {
            Rh(this.directives, t);
          }
          addFormGroup(t) {
            const e = this.form.get(t.path);
            Eh(e, t), e.updateValueAndValidity({ emitEvent: !1 });
          }
          removeFormGroup(t) {}
          getFormGroup(t) {
            return this.form.get(t.path);
          }
          addFormArray(t) {
            const e = this.form.get(t.path);
            Eh(e, t), e.updateValueAndValidity({ emitEvent: !1 });
          }
          removeFormArray(t) {}
          getFormArray(t) {
            return this.form.get(t.path);
          }
          updateModel(t, e) {
            this.form.get(t.path).setValue(e);
          }
          onSubmit(t) {
            return (
              (this.submitted = !0),
              Mh(this.form, this.directives),
              this.ngSubmit.emit(t),
              !1
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(t) {
            this.form.reset(t), (this.submitted = !1);
          }
          _updateDomValue() {
            this.directives.forEach((t) => {
              const e = this.form.get(t.path);
              t.control !== e &&
                ((function (t, e) {
                  e.valueAccessor.registerOnChange(() => kh(e)),
                    e.valueAccessor.registerOnTouched(() => kh(e)),
                    e._rawValidators.forEach((t) => {
                      t.registerOnValidatorChange &&
                        t.registerOnValidatorChange(null);
                    }),
                    e._rawAsyncValidators.forEach((t) => {
                      t.registerOnValidatorChange &&
                        t.registerOnValidatorChange(null);
                    }),
                    t && t._clearChangeFns();
                })(t.control, t),
                e && xh(e, t),
                (t.control = e));
            }),
              this.form._updateTreeValidity({ emitEvent: !1 });
          }
          _updateRegistrations() {
            this.form._registerOnCollectionChange(() => this._updateDomValue()),
              this._oldForm &&
                this._oldForm._registerOnCollectionChange(() => {}),
              (this._oldForm = this.form);
          }
          _updateValidators() {
            const t = Oh(this._validators);
            this.form.validator = eh.compose([this.form.validator, t]);
            const e = Ah(this._asyncValidators);
            this.form.asyncValidator = eh.composeAsync([
              this.form.asyncValidator,
              e,
            ]);
          }
          _checkFormPresent() {
            this.form || yh.missingFormException();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ji(Ju, 10), ji(Xu, 10));
          }),
          (t.ɵdir = me({
            type: t,
            selectors: [["", "formGroup", ""]],
            hostBindings: function (t, e) {
              1 & t &&
                Xi("submit", function (t) {
                  return e.onSubmit(t);
                })("reset", function () {
                  return e.onReset();
                });
            },
            inputs: { form: ["formGroup", "form"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [Lo([ed]), Co, Oo],
          })),
          t
        );
      })();
      const rd = { provide: Gu, useExisting: Ct(() => sd) };
      let sd = (() => {
        class t extends Bh {
          constructor(t, e, n) {
            super(),
              (this._parent = t),
              (this._validators = e),
              (this._asyncValidators = n);
          }
          _checkParentType() {
            ad(this._parent) && yh.groupParentException();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ji(Gu, 13), ji(Ju, 10), ji(Xu, 10));
          }),
          (t.ɵdir = me({
            type: t,
            selectors: [["", "formGroupName", ""]],
            inputs: { name: ["formGroupName", "name"] },
            features: [Lo([rd]), Co],
          })),
          t
        );
      })();
      const id = { provide: Gu, useExisting: Ct(() => od) };
      let od = (() => {
        class t extends Gu {
          constructor(t, e, n) {
            super(),
              (this._parent = t),
              (this._validators = e),
              (this._asyncValidators = n);
          }
          ngOnInit() {
            this._checkParentType(), this.formDirective.addFormArray(this);
          }
          ngOnDestroy() {
            this.formDirective && this.formDirective.removeFormArray(this);
          }
          get control() {
            return this.formDirective.getFormArray(this);
          }
          get formDirective() {
            return this._parent ? this._parent.formDirective : null;
          }
          get path() {
            return Ch(
              null == this.name ? this.name : this.name.toString(),
              this._parent
            );
          }
          get validator() {
            return Oh(this._validators);
          }
          get asyncValidator() {
            return Ah(this._asyncValidators);
          }
          _checkParentType() {
            ad(this._parent) && yh.arrayParentException();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ji(Gu, 13), ji(Ju, 10), ji(Xu, 10));
          }),
          (t.ɵdir = me({
            type: t,
            selectors: [["", "formArrayName", ""]],
            inputs: { name: ["formArrayName", "name"] },
            features: [Lo([id]), Co],
          })),
          t
        );
      })();
      function ad(t) {
        return !(t instanceof sd || t instanceof nd || t instanceof od);
      }
      const ld = { provide: Wu, useExisting: Ct(() => cd) };
      let cd = (() => {
        class t extends Wu {
          constructor(t, e, n, r, s) {
            super(),
              (this._ngModelWarningConfig = s),
              (this._added = !1),
              (this.update = new Ha()),
              (this._ngModelWarningSent = !1),
              (this._parent = t),
              (this._rawValidators = e || []),
              (this._rawAsyncValidators = n || []),
              (this.valueAccessor = Dh(this, r));
          }
          set isDisabled(t) {
            yh.disabledAttrWarning();
          }
          ngOnChanges(e) {
            var n, r;
            this._added || this._setUpControl(),
              Ih(e, this.viewModel) &&
                ("formControlName",
                (n = t),
                this,
                (r = this._ngModelWarningConfig),
                cr() &&
                  "never" !== r &&
                  ((((null !== r && "once" !== r) ||
                    n._ngModelWarningSentOnce) &&
                    ("always" !== r || this._ngModelWarningSent)) ||
                    (yh.ngModelWarning("formControlName"),
                    (n._ngModelWarningSentOnce = !0),
                    (this._ngModelWarningSent = !0))),
                (this.viewModel = this.model),
                this.formDirective.updateModel(this, this.model));
          }
          ngOnDestroy() {
            this.formDirective && this.formDirective.removeControl(this);
          }
          viewToModelUpdate(t) {
            (this.viewModel = t), this.update.emit(t);
          }
          get path() {
            return Ch(
              null == this.name ? this.name : this.name.toString(),
              this._parent
            );
          }
          get formDirective() {
            return this._parent ? this._parent.formDirective : null;
          }
          get validator() {
            return Oh(this._rawValidators);
          }
          get asyncValidator() {
            return Ah(this._rawAsyncValidators);
          }
          _checkParentType() {
            !(this._parent instanceof sd) && this._parent instanceof Bh
              ? yh.ngModelGroupException()
              : this._parent instanceof sd ||
                this._parent instanceof nd ||
                this._parent instanceof od ||
                yh.controlParentException();
          }
          _setUpControl() {
            this._checkParentType(),
              (this.control = this.formDirective.addControl(this)),
              this.control.disabled &&
                this.valueAccessor.setDisabledState &&
                this.valueAccessor.setDisabledState(!0),
              (this._added = !0);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(
              ji(Gu, 13),
              ji(Ju, 10),
              ji(Xu, 10),
              ji(Uu, 10),
              ji(td, 8)
            );
          }),
          (t.ɵdir = me({
            type: t,
            selectors: [["", "formControlName", ""]],
            inputs: {
              isDisabled: ["disabled", "isDisabled"],
              name: ["formControlName", "name"],
              model: ["ngModel", "model"],
            },
            outputs: { update: "ngModelChange" },
            features: [Lo([ld]), Co, Oo],
          })),
          (t._ngModelWarningSentOnce = !1),
          t
        );
      })();
      const ud = { provide: Ju, useExisting: Ct(() => hd), multi: !0 };
      let hd = (() => {
        class t {
          get required() {
            return this._required;
          }
          set required(t) {
            (this._required = null != t && !1 !== t && "false" !== `${t}`),
              this._onChange && this._onChange();
          }
          validate(t) {
            return this.required ? eh.required(t) : null;
          }
          registerOnValidatorChange(t) {
            this._onChange = t;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵdir = me({
            type: t,
            selectors: [
              [
                "",
                "required",
                "",
                "formControlName",
                "",
                3,
                "type",
                "checkbox",
              ],
              ["", "required", "", "formControl", "", 3, "type", "checkbox"],
              ["", "required", "", "ngModel", "", 3, "type", "checkbox"],
            ],
            hostVars: 1,
            hostBindings: function (t, e) {
              2 & t && Vi("required", e.required ? "" : null);
            },
            inputs: { required: "required" },
            features: [Lo([ud])],
          })),
          t
        );
      })();
      const dd = { provide: Ju, useExisting: Ct(() => pd), multi: !0 };
      let pd = (() => {
        class t {
          set email(t) {
            (this._enabled = "" === t || !0 === t || "true" === t),
              this._onChange && this._onChange();
          }
          validate(t) {
            return this._enabled ? eh.email(t) : null;
          }
          registerOnValidatorChange(t) {
            this._onChange = t;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵdir = me({
            type: t,
            selectors: [
              ["", "email", "", "formControlName", ""],
              ["", "email", "", "formControl", ""],
              ["", "email", "", "ngModel", ""],
            ],
            inputs: { email: "email" },
            features: [Lo([dd])],
          })),
          t
        );
      })();
      const fd = { provide: Ju, useExisting: Ct(() => gd), multi: !0 };
      let gd = (() => {
          class t {
            ngOnChanges(t) {
              "minlength" in t &&
                (this._createValidator(), this._onChange && this._onChange());
            }
            validate(t) {
              return null == this.minlength ? null : this._validator(t);
            }
            registerOnValidatorChange(t) {
              this._onChange = t;
            }
            _createValidator() {
              this._validator = eh.minLength(
                "number" == typeof this.minlength
                  ? this.minlength
                  : parseInt(this.minlength, 10)
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = me({
              type: t,
              selectors: [
                ["", "minlength", "", "formControlName", ""],
                ["", "minlength", "", "formControl", ""],
                ["", "minlength", "", "ngModel", ""],
              ],
              hostVars: 1,
              hostBindings: function (t, e) {
                2 & t && Vi("minlength", e.minlength ? e.minlength : null);
              },
              inputs: { minlength: "minlength" },
              features: [Lo([fd]), Oo],
            })),
            t
          );
        })(),
        md = (() => {
          class t {}
          return (
            (t.ɵmod = fe({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })(),
        yd = (() => {
          class t {
            group(t, e = null) {
              const n = this._reduceControls(t);
              let r = null,
                s = null,
                i = void 0;
              return (
                null != e &&
                  ((function (t) {
                    return (
                      void 0 !== t.asyncValidators ||
                      void 0 !== t.validators ||
                      void 0 !== t.updateOn
                    );
                  })(e)
                    ? ((r = null != e.validators ? e.validators : null),
                      (s =
                        null != e.asyncValidators ? e.asyncValidators : null),
                      (i = null != e.updateOn ? e.updateOn : void 0))
                    : ((r = null != e.validator ? e.validator : null),
                      (s =
                        null != e.asyncValidator ? e.asyncValidator : null))),
                new jh(n, { asyncValidators: s, updateOn: i, validators: r })
              );
            }
            control(t, e, n) {
              return new Fh(t, e, n);
            }
            array(t, e, n) {
              const r = t.map((t) => this._createControl(t));
              return new Hh(r, e, n);
            }
            _reduceControls(t) {
              const e = {};
              return (
                Object.keys(t).forEach((n) => {
                  e[n] = this._createControl(t[n]);
                }),
                e
              );
            }
            _createControl(t) {
              return t instanceof Fh || t instanceof jh || t instanceof Hh
                ? t
                : Array.isArray(t)
                ? this.control(
                    t[0],
                    t.length > 1 ? t[1] : null,
                    t.length > 2 ? t[2] : null
                  )
                : this.control(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        vd = (() => {
          class t {}
          return (
            (t.ɵmod = fe({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [uh],
              imports: [md],
            })),
            t
          );
        })(),
        _d = (() => {
          class t {
            static withConfig(e) {
              return {
                ngModule: t,
                providers: [
                  { provide: td, useValue: e.warnOnNgModelWithFormControl },
                ],
              };
            }
          }
          return (
            (t.ɵmod = fe({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [yd, uh],
              imports: [md],
            })),
            t
          );
        })();
      function bd(...t) {
        let e = t[t.length - 1];
        return P(e) ? (t.pop(), j(t, e)) : q(t);
      }
      class wd extends E {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const e = super._subscribe(t);
          return e && !e.closed && t.next(this._value), e;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new C();
          return this._value;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const Cd = (() => {
          function t() {
            return (
              Error.call(this),
              (this.message = "no elements in sequence"),
              (this.name = "EmptyError"),
              this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })(),
        xd = {};
      class Sd {
        constructor(t) {
          this.resultSelector = t;
        }
        call(t, e) {
          return e.subscribe(new Ed(t, this.resultSelector));
        }
      }
      class Ed extends V {
        constructor(t, e) {
          super(t),
            (this.resultSelector = e),
            (this.active = 0),
            (this.values = []),
            (this.observables = []);
        }
        _next(t) {
          this.values.push(xd), this.observables.push(t);
        }
        _complete() {
          const t = this.observables,
            e = t.length;
          if (0 === e) this.destination.complete();
          else {
            (this.active = e), (this.toRespond = e);
            for (let n = 0; n < e; n++) {
              const e = t[n];
              this.add(N(this, e, e, n));
            }
          }
        }
        notifyComplete(t) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(t, e, n, r, s) {
          const i = this.values,
            o = this.toRespond
              ? i[n] === xd
                ? --this.toRespond
                : this.toRespond
              : 0;
          (i[n] = e),
            0 === o &&
              (this.resultSelector
                ? this._tryResultSelector(i)
                : this.destination.next(i.slice()));
        }
        _tryResultSelector(t) {
          let e;
          try {
            e = this.resultSelector.apply(this, t);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      const kd = new b((t) => t.complete());
      function Pd(t) {
        return t
          ? (function (t) {
              return new b((e) => t.schedule(() => e.complete()));
            })(t)
          : kd;
      }
      function Od(t) {
        return new b((e) => {
          let n;
          try {
            n = t();
          } catch (r) {
            return void e.error(r);
          }
          return (n ? H(n) : Pd()).subscribe(e);
        });
      }
      function Ad() {
        return B(1);
      }
      function Id(t, e) {
        return function (n) {
          return n.lift(new Td(t, e));
        };
      }
      class Td {
        constructor(t, e) {
          (this.predicate = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new Md(t, this.predicate, this.thisArg));
        }
      }
      class Md extends f {
        constructor(t, e, n) {
          super(t), (this.predicate = e), (this.thisArg = n), (this.count = 0);
        }
        _next(t) {
          let e;
          try {
            e = this.predicate.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          e && this.destination.next(t);
        }
      }
      const Dd = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "argument out of range"),
            (this.name = "ArgumentOutOfRangeError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      function Rd(t) {
        return function (e) {
          return 0 === t ? Pd() : e.lift(new Nd(t));
        };
      }
      class Nd {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Dd();
        }
        call(t, e) {
          return e.subscribe(new Vd(t, this.total));
        }
      }
      class Vd extends f {
        constructor(t, e) {
          super(t),
            (this.total = e),
            (this.ring = new Array()),
            (this.count = 0);
        }
        _next(t) {
          const e = this.ring,
            n = this.total,
            r = this.count++;
          e.length < n ? e.push(t) : (e[r % n] = t);
        }
        _complete() {
          const t = this.destination;
          let e = this.count;
          if (e > 0) {
            const n = this.count >= this.total ? this.total : this.count,
              r = this.ring;
            for (let s = 0; s < n; s++) {
              const s = e++ % n;
              t.next(r[s]);
            }
          }
          t.complete();
        }
      }
      function Ud(t = jd) {
        return (e) => e.lift(new Ld(t));
      }
      class Ld {
        constructor(t) {
          this.errorFactory = t;
        }
        call(t, e) {
          return e.subscribe(new Fd(t, this.errorFactory));
        }
      }
      class Fd extends f {
        constructor(t, e) {
          super(t), (this.errorFactory = e), (this.hasValue = !1);
        }
        _next(t) {
          (this.hasValue = !0), this.destination.next(t);
        }
        _complete() {
          if (this.hasValue) return this.destination.complete();
          {
            let e;
            try {
              e = this.errorFactory();
            } catch (t) {
              e = t;
            }
            this.destination.error(e);
          }
        }
      }
      function jd() {
        return new Cd();
      }
      function Hd(t = null) {
        return (e) => e.lift(new $d(t));
      }
      class $d {
        constructor(t) {
          this.defaultValue = t;
        }
        call(t, e) {
          return e.subscribe(new zd(t, this.defaultValue));
        }
      }
      class zd extends f {
        constructor(t, e) {
          super(t), (this.defaultValue = e), (this.isEmpty = !0);
        }
        _next(t) {
          (this.isEmpty = !1), this.destination.next(t);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete();
        }
      }
      function Gd(t, e) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            t ? Id((e, n) => t(e, n, r)) : y,
            Rd(1),
            n ? Hd(e) : Ud(() => new Cd())
          );
      }
      function Bd(t) {
        return function (e) {
          const n = new qd(t),
            r = e.lift(n);
          return (n.caught = r);
        };
      }
      class qd {
        constructor(t) {
          this.selector = t;
        }
        call(t, e) {
          return e.subscribe(new Wd(t, this.selector, this.caught));
        }
      }
      class Wd extends V {
        constructor(t, e, n) {
          super(t), (this.selector = e), (this.caught = n);
        }
        error(t) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(t, this.caught);
            } catch (e) {
              return void super.error(e);
            }
            this._unsubscribeAndRecycle();
            const r = new O(this, void 0, void 0);
            this.add(r);
            const s = N(this, n, void 0, void 0, r);
            s !== r && this.add(s);
          }
        }
      }
      function Zd(t) {
        return (e) => (0 === t ? Pd() : e.lift(new Qd(t)));
      }
      class Qd {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Dd();
        }
        call(t, e) {
          return e.subscribe(new Yd(t, this.total));
        }
      }
      class Yd extends f {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0);
        }
        _next(t) {
          const e = this.total,
            n = ++this.count;
          n <= e &&
            (this.destination.next(t),
            n === e && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function Kd(t, e) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            t ? Id((e, n) => t(e, n, r)) : y,
            Zd(1),
            n ? Hd(e) : Ud(() => new Cd())
          );
      }
      class Jd {
        constructor(t, e, n) {
          (this.predicate = t), (this.thisArg = e), (this.source = n);
        }
        call(t, e) {
          return e.subscribe(
            new Xd(t, this.predicate, this.thisArg, this.source)
          );
        }
      }
      class Xd extends f {
        constructor(t, e, n, r) {
          super(t),
            (this.predicate = e),
            (this.thisArg = n),
            (this.source = r),
            (this.index = 0),
            (this.thisArg = n || this);
        }
        notifyComplete(t) {
          this.destination.next(t), this.destination.complete();
        }
        _next(t) {
          let e = !1;
          try {
            e = this.predicate.call(this.thisArg, t, this.index++, this.source);
          } catch (n) {
            return void this.destination.error(n);
          }
          e || this.notifyComplete(!1);
        }
        _complete() {
          this.notifyComplete(!0);
        }
      }
      function tp(t, e) {
        return "function" == typeof e
          ? (n) =>
              n.pipe(tp((n, r) => H(t(n, r)).pipe(U((t, s) => e(n, t, r, s)))))
          : (e) => e.lift(new ep(t));
      }
      class ep {
        constructor(t) {
          this.project = t;
        }
        call(t, e) {
          return e.subscribe(new np(t, this.project));
        }
      }
      class np extends V {
        constructor(t, e) {
          super(t), (this.project = e), (this.index = 0);
        }
        _next(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this._innerSub(e, t, n);
        }
        _innerSub(t, e, n) {
          const r = this.innerSubscription;
          r && r.unsubscribe();
          const s = new O(this, e, n),
            i = this.destination;
          i.add(s),
            (this.innerSubscription = N(this, t, void 0, void 0, s)),
            this.innerSubscription !== s && i.add(this.innerSubscription);
        }
        _complete() {
          const { innerSubscription: t } = this;
          (t && !t.closed) || super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = null;
        }
        notifyComplete(t) {
          this.destination.remove(t),
            (this.innerSubscription = null),
            this.isStopped && super._complete();
        }
        notifyNext(t, e, n, r, s) {
          this.destination.next(e);
        }
      }
      function rp(...t) {
        return Ad()(bd(...t));
      }
      function sp(t, e) {
        let n = !1;
        return (
          arguments.length >= 2 && (n = !0),
          function (r) {
            return r.lift(new ip(t, e, n));
          }
        );
      }
      class ip {
        constructor(t, e, n = !1) {
          (this.accumulator = t), (this.seed = e), (this.hasSeed = n);
        }
        call(t, e) {
          return e.subscribe(
            new op(t, this.accumulator, this.seed, this.hasSeed)
          );
        }
      }
      class op extends f {
        constructor(t, e, n, r) {
          super(t),
            (this.accumulator = e),
            (this._seed = n),
            (this.hasSeed = r),
            (this.index = 0);
        }
        get seed() {
          return this._seed;
        }
        set seed(t) {
          (this.hasSeed = !0), (this._seed = t);
        }
        _next(t) {
          if (this.hasSeed) return this._tryNext(t);
          (this.seed = t), this.destination.next(t);
        }
        _tryNext(t) {
          const e = this.index++;
          let n;
          try {
            n = this.accumulator(this.seed, t, e);
          } catch (r) {
            this.destination.error(r);
          }
          (this.seed = n), this.destination.next(n);
        }
      }
      function ap(t, e) {
        return $(t, e, 1);
      }
      function lp() {}
      function cp(t, e, n) {
        return function (r) {
          return r.lift(new up(t, e, n));
        };
      }
      class up {
        constructor(t, e, n) {
          (this.nextOrObserver = t), (this.error = e), (this.complete = n);
        }
        call(t, e) {
          return e.subscribe(
            new hp(t, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class hp extends f {
        constructor(t, e, n, s) {
          super(t),
            (this._tapNext = lp),
            (this._tapError = lp),
            (this._tapComplete = lp),
            (this._tapError = n || lp),
            (this._tapComplete = s || lp),
            r(e)
              ? ((this._context = this), (this._tapNext = e))
              : e &&
                ((this._context = e),
                (this._tapNext = e.next || lp),
                (this._tapError = e.error || lp),
                (this._tapComplete = e.complete || lp));
        }
        _next(t) {
          try {
            this._tapNext.call(this._context, t);
          } catch (e) {
            return void this.destination.error(e);
          }
          this.destination.next(t);
        }
        _error(t) {
          try {
            this._tapError.call(this._context, t);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.error(t);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (t) {
            return void this.destination.error(t);
          }
          return this.destination.complete();
        }
      }
      class dp {
        constructor(t) {
          this.callback = t;
        }
        call(t, e) {
          return e.subscribe(new pp(t, this.callback));
        }
      }
      class pp extends f {
        constructor(t, e) {
          super(t), this.add(new h(e));
        }
      }
      class fp {
        constructor(t, e) {
          (this.id = t), (this.url = e);
        }
      }
      class gp extends fp {
        constructor(t, e, n = "imperative", r = null) {
          super(t, e), (this.navigationTrigger = n), (this.restoredState = r);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class mp extends fp {
        constructor(t, e, n) {
          super(t, e), (this.urlAfterRedirects = n);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class yp extends fp {
        constructor(t, e, n) {
          super(t, e), (this.reason = n);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class vp extends fp {
        constructor(t, e, n) {
          super(t, e), (this.error = n);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class _p extends fp {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class bp extends fp {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class wp extends fp {
        constructor(t, e, n, r, s) {
          super(t, e),
            (this.urlAfterRedirects = n),
            (this.state = r),
            (this.shouldActivate = s);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class Cp extends fp {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class xp extends fp {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Sp {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class Ep {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class kp {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Pp {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Op {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Ap {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Ip {
        constructor(t, e, n) {
          (this.routerEvent = t), (this.position = e), (this.anchor = n);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      let Tp = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = ue({
            type: t,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (t, e) {
              1 & t && Wi(0, "router-outlet");
            },
            directives: function () {
              return [Ug];
            },
            encapsulation: 2,
          })),
          t
        );
      })();
      class Mp {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return this.params.hasOwnProperty(t);
        }
        get(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e[0] : e;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e : [e];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Dp(t) {
        return new Mp(t);
      }
      function Rp(t) {
        const e = Error("NavigationCancelingError: " + t);
        return (e.ngNavigationCancelingError = !0), e;
      }
      function Np(t, e, n) {
        const r = n.path.split("/");
        if (r.length > t.length) return null;
        if ("full" === n.pathMatch && (e.hasChildren() || r.length < t.length))
          return null;
        const s = {};
        for (let i = 0; i < r.length; i++) {
          const e = r[i],
            n = t[i];
          if (e.startsWith(":")) s[e.substring(1)] = n;
          else if (e !== n.path) return null;
        }
        return { consumed: t.slice(0, r.length), posParams: s };
      }
      class Vp {
        constructor(t, e) {
          (this.routes = t), (this.module = e);
        }
      }
      function Up(t, e = "") {
        for (let n = 0; n < t.length; n++) {
          const r = t[n];
          Lp(r, Fp(e, r));
        }
      }
      function Lp(t, e) {
        if (!t)
          throw new Error(
            `\n      Invalid configuration of route '${e}': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    `
          );
        if (Array.isArray(t))
          throw new Error(
            `Invalid configuration of route '${e}': Array cannot be specified`
          );
        if (
          !t.component &&
          !t.children &&
          !t.loadChildren &&
          t.outlet &&
          "primary" !== t.outlet
        )
          throw new Error(
            `Invalid configuration of route '${e}': a componentless route without children or loadChildren cannot have a named outlet set`
          );
        if (t.redirectTo && t.children)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and children cannot be used together`
          );
        if (t.redirectTo && t.loadChildren)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and loadChildren cannot be used together`
          );
        if (t.children && t.loadChildren)
          throw new Error(
            `Invalid configuration of route '${e}': children and loadChildren cannot be used together`
          );
        if (t.redirectTo && t.component)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and component cannot be used together`
          );
        if (t.path && t.matcher)
          throw new Error(
            `Invalid configuration of route '${e}': path and matcher cannot be used together`
          );
        if (
          void 0 === t.redirectTo &&
          !t.component &&
          !t.children &&
          !t.loadChildren
        )
          throw new Error(
            `Invalid configuration of route '${e}'. One of the following must be provided: component, redirectTo, children or loadChildren`
          );
        if (void 0 === t.path && void 0 === t.matcher)
          throw new Error(
            `Invalid configuration of route '${e}': routes must have either a path or a matcher specified`
          );
        if ("string" == typeof t.path && "/" === t.path.charAt(0))
          throw new Error(
            `Invalid configuration of route '${e}': path cannot start with a slash`
          );
        if ("" === t.path && void 0 !== t.redirectTo && void 0 === t.pathMatch)
          throw new Error(
            `Invalid configuration of route '{path: "${e}", redirectTo: "${t.redirectTo}"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`
          );
        if (
          void 0 !== t.pathMatch &&
          "full" !== t.pathMatch &&
          "prefix" !== t.pathMatch
        )
          throw new Error(
            `Invalid configuration of route '${e}': pathMatch can only be set to 'prefix' or 'full'`
          );
        t.children && Up(t.children, e);
      }
      function Fp(t, e) {
        return e
          ? t || e.path
            ? t && !e.path
              ? `${t}/`
              : !t && e.path
              ? e.path
              : `${t}/${e.path}`
            : ""
          : t;
      }
      function jp(t) {
        const e = t.children && t.children.map(jp),
          n = e
            ? Object.assign(Object.assign({}, t), { children: e })
            : Object.assign({}, t);
        return (
          !n.component &&
            (e || n.loadChildren) &&
            n.outlet &&
            "primary" !== n.outlet &&
            (n.component = Tp),
          n
        );
      }
      function Hp(t, e) {
        const n = Object.keys(t),
          r = Object.keys(e);
        if (!n || !r || n.length != r.length) return !1;
        let s;
        for (let i = 0; i < n.length; i++)
          if (((s = n[i]), !$p(t[s], e[s]))) return !1;
        return !0;
      }
      function $p(t, e) {
        return Array.isArray(t) && Array.isArray(e)
          ? t.length == e.length && t.every((t) => e.indexOf(t) > -1)
          : t === e;
      }
      function zp(t) {
        return Array.prototype.concat.apply([], t);
      }
      function Gp(t) {
        return t.length > 0 ? t[t.length - 1] : null;
      }
      function Bp(t, e) {
        for (const n in t) t.hasOwnProperty(n) && e(t[n], n);
      }
      function qp(t) {
        return Ji(t) ? t : Ki(t) ? H(Promise.resolve(t)) : bd(t);
      }
      function Wp(t, e, n) {
        return n
          ? (function (t, e) {
              return Hp(t, e);
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                if (!Kp(e.segments, n.segments)) return !1;
                if (e.numberOfChildren !== n.numberOfChildren) return !1;
                for (const r in n.children) {
                  if (!e.children[r]) return !1;
                  if (!t(e.children[r], n.children[r])) return !1;
                }
                return !0;
              })(t.root, e.root)
          : (function (t, e) {
              return (
                Object.keys(e).length <= Object.keys(t).length &&
                Object.keys(e).every((n) => $p(t[n], e[n]))
              );
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                return (function e(n, r, s) {
                  if (n.segments.length > s.length)
                    return (
                      !!Kp(n.segments.slice(0, s.length), s) && !r.hasChildren()
                    );
                  if (n.segments.length === s.length) {
                    if (!Kp(n.segments, s)) return !1;
                    for (const e in r.children) {
                      if (!n.children[e]) return !1;
                      if (!t(n.children[e], r.children[e])) return !1;
                    }
                    return !0;
                  }
                  {
                    const t = s.slice(0, n.segments.length),
                      i = s.slice(n.segments.length);
                    return (
                      !!Kp(n.segments, t) &&
                      !!n.children.primary &&
                      e(n.children.primary, r, i)
                    );
                  }
                })(e, n, n.segments);
              })(t.root, e.root);
      }
      class Zp {
        constructor(t, e, n) {
          (this.root = t), (this.queryParams = e), (this.fragment = n);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Dp(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return ef.serialize(this);
        }
      }
      class Qp {
        constructor(t, e) {
          (this.segments = t),
            (this.children = e),
            (this.parent = null),
            Bp(e, (t, e) => (t.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return nf(this);
        }
      }
      class Yp {
        constructor(t, e) {
          (this.path = t), (this.parameters = e);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Dp(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return cf(this);
        }
      }
      function Kp(t, e) {
        return t.length === e.length && t.every((t, n) => t.path === e[n].path);
      }
      function Jp(t, e) {
        let n = [];
        return (
          Bp(t.children, (t, r) => {
            "primary" === r && (n = n.concat(e(t, r)));
          }),
          Bp(t.children, (t, r) => {
            "primary" !== r && (n = n.concat(e(t, r)));
          }),
          n
        );
      }
      class Xp {}
      class tf {
        parse(t) {
          const e = new ff(t);
          return new Zp(
            e.parseRootSegment(),
            e.parseQueryParams(),
            e.parseFragment()
          );
        }
        serialize(t) {
          var e;
          return `${`/${(function t(e, n) {
            if (!e.hasChildren()) return nf(e);
            if (n) {
              const n = e.children.primary ? t(e.children.primary, !1) : "",
                r = [];
              return (
                Bp(e.children, (e, n) => {
                  "primary" !== n && r.push(`${n}:${t(e, !1)}`);
                }),
                r.length > 0 ? `${n}(${r.join("//")})` : n
              );
            }
            {
              const n = Jp(e, (n, r) =>
                "primary" === r
                  ? [t(e.children.primary, !1)]
                  : [`${r}:${t(n, !1)}`]
              );
              return `${nf(e)}/(${n.join("//")})`;
            }
          })(t.root, !0)}`}${(function (t) {
            const e = Object.keys(t).map((e) => {
              const n = t[e];
              return Array.isArray(n)
                ? n.map((t) => `${sf(e)}=${sf(t)}`).join("&")
                : `${sf(e)}=${sf(n)}`;
            });
            return e.length ? `?${e.join("&")}` : "";
          })(t.queryParams)}${
            "string" == typeof t.fragment
              ? `#${((e = t.fragment), encodeURI(e))}`
              : ""
          }`;
        }
      }
      const ef = new tf();
      function nf(t) {
        return t.segments.map((t) => cf(t)).join("/");
      }
      function rf(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function sf(t) {
        return rf(t).replace(/%3B/gi, ";");
      }
      function of(t) {
        return rf(t)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function af(t) {
        return decodeURIComponent(t);
      }
      function lf(t) {
        return af(t.replace(/\+/g, "%20"));
      }
      function cf(t) {
        return `${of(t.path)}${
          ((e = t.parameters),
          Object.keys(e)
            .map((t) => `;${of(t)}=${of(e[t])}`)
            .join(""))
        }`;
        var e;
      }
      const uf = /^[^\/()?;=#]+/;
      function hf(t) {
        const e = t.match(uf);
        return e ? e[0] : "";
      }
      const df = /^[^=?&#]+/,
        pf = /^[^?&#]+/;
      class ff {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new Qp([], {})
              : new Qp([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let e = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (e = this.parseParens(!0)));
          let n = {};
          return (
            this.peekStartsWith("(") && (n = this.parseParens(!1)),
            (t.length > 0 || Object.keys(e).length > 0) &&
              (n.primary = new Qp(t, e)),
            n
          );
        }
        parseSegment() {
          const t = hf(this.remaining);
          if ("" === t && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(t), new Yp(af(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const e = hf(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = hf(this.remaining);
            t && ((n = t), this.capture(n));
          }
          t[af(e)] = af(n);
        }
        parseQueryParam(t) {
          const e = (function (t) {
            const e = t.match(df);
            return e ? e[0] : "";
          })(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = (function (t) {
              const e = t.match(pf);
              return e ? e[0] : "";
            })(this.remaining);
            t && ((n = t), this.capture(n));
          }
          const r = lf(e),
            s = lf(n);
          if (t.hasOwnProperty(r)) {
            let e = t[r];
            Array.isArray(e) || ((e = [e]), (t[r] = e)), e.push(s);
          } else t[r] = s;
        }
        parseParens(t) {
          const e = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const n = hf(this.remaining),
              r = this.remaining[n.length];
            if ("/" !== r && ")" !== r && ";" !== r)
              throw new Error(`Cannot parse url '${this.url}'`);
            let s = void 0;
            n.indexOf(":") > -1
              ? ((s = n.substr(0, n.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : t && (s = "primary");
            const i = this.parseChildren();
            (e[s] = 1 === Object.keys(i).length ? i.primary : new Qp([], i)),
              this.consumeOptional("//");
          }
          return e;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`);
        }
      }
      class gf {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const e = this.pathFromRoot(t);
          return e.length > 1 ? e[e.length - 2] : null;
        }
        children(t) {
          const e = mf(t, this._root);
          return e ? e.children.map((t) => t.value) : [];
        }
        firstChild(t) {
          const e = mf(t, this._root);
          return e && e.children.length > 0 ? e.children[0].value : null;
        }
        siblings(t) {
          const e = yf(t, this._root);
          return e.length < 2
            ? []
            : e[e.length - 2].children
                .map((t) => t.value)
                .filter((e) => e !== t);
        }
        pathFromRoot(t) {
          return yf(t, this._root).map((t) => t.value);
        }
      }
      function mf(t, e) {
        if (t === e.value) return e;
        for (const n of e.children) {
          const e = mf(t, n);
          if (e) return e;
        }
        return null;
      }
      function yf(t, e) {
        if (t === e.value) return [e];
        for (const n of e.children) {
          const r = yf(t, n);
          if (r.length) return r.unshift(e), r;
        }
        return [];
      }
      class vf {
        constructor(t, e) {
          (this.value = t), (this.children = e);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function _f(t) {
        const e = {};
        return t && t.children.forEach((t) => (e[t.value.outlet] = t)), e;
      }
      class bf extends gf {
        constructor(t, e) {
          super(t), (this.snapshot = e), kf(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function wf(t, e) {
        const n = (function (t, e) {
            const n = new Sf(
              [],
              {},
              {},
              "",
              {},
              "primary",
              e,
              null,
              t.root,
              -1,
              {}
            );
            return new Ef("", new vf(n, []));
          })(t, e),
          r = new wd([new Yp("", {})]),
          s = new wd({}),
          i = new wd({}),
          o = new wd({}),
          a = new wd(""),
          l = new Cf(r, s, o, a, i, "primary", e, n.root);
        return (l.snapshot = n.root), new bf(new vf(l, []), n);
      }
      class Cf {
        constructor(t, e, n, r, s, i, o, a) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this._futureSnapshot = a);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(U((t) => Dp(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(U((t) => Dp(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function xf(t, e = "emptyOnly") {
        const n = t.pathFromRoot;
        let r = 0;
        if ("always" !== e)
          for (r = n.length - 1; r >= 1; ) {
            const t = n[r],
              e = n[r - 1];
            if (t.routeConfig && "" === t.routeConfig.path) r--;
            else {
              if (e.component) break;
              r--;
            }
          }
        return (function (t) {
          return t.reduce(
            (t, e) => ({
              params: Object.assign(Object.assign({}, t.params), e.params),
              data: Object.assign(Object.assign({}, t.data), e.data),
              resolve: Object.assign(
                Object.assign({}, t.resolve),
                e._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Sf {
        constructor(t, e, n, r, s, i, o, a, l, c, u) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this.routeConfig = a),
            (this._urlSegment = l),
            (this._lastPathIndex = c),
            (this._resolve = u);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Dp(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Dp(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((t) => t.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class Ef extends gf {
        constructor(t, e) {
          super(e), (this.url = t), kf(this, e);
        }
        toString() {
          return Pf(this._root);
        }
      }
      function kf(t, e) {
        (e.value._routerState = t), e.children.forEach((e) => kf(t, e));
      }
      function Pf(t) {
        const e =
          t.children.length > 0 ? ` { ${t.children.map(Pf).join(", ")} } ` : "";
        return `${t.value}${e}`;
      }
      function Of(t) {
        if (t.snapshot) {
          const e = t.snapshot,
            n = t._futureSnapshot;
          (t.snapshot = n),
            Hp(e.queryParams, n.queryParams) ||
              t.queryParams.next(n.queryParams),
            e.fragment !== n.fragment && t.fragment.next(n.fragment),
            Hp(e.params, n.params) || t.params.next(n.params),
            (function (t, e) {
              if (t.length !== e.length) return !1;
              for (let n = 0; n < t.length; ++n) if (!Hp(t[n], e[n])) return !1;
              return !0;
            })(e.url, n.url) || t.url.next(n.url),
            Hp(e.data, n.data) || t.data.next(n.data);
        } else
          (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data);
      }
      function Af(t, e) {
        var n, r;
        return (
          Hp(t.params, e.params) &&
          Kp((n = t.url), (r = e.url)) &&
          n.every((t, e) => Hp(t.parameters, r[e].parameters)) &&
          !(!t.parent != !e.parent) &&
          (!t.parent || Af(t.parent, e.parent))
        );
      }
      function If(t) {
        return (
          "object" == typeof t && null != t && !t.outlets && !t.segmentPath
        );
      }
      function Tf(t, e, n, r, s) {
        let i = {};
        return (
          r &&
            Bp(r, (t, e) => {
              i[e] = Array.isArray(t) ? t.map((t) => `${t}`) : `${t}`;
            }),
          new Zp(
            n.root === t
              ? e
              : (function t(e, n, r) {
                  const s = {};
                  return (
                    Bp(e.children, (e, i) => {
                      s[i] = e === n ? r : t(e, n, r);
                    }),
                    new Qp(e.segments, s)
                  );
                })(n.root, t, e),
            i,
            s
          )
        );
      }
      class Mf {
        constructor(t, e, n) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = e),
            (this.commands = n),
            t && n.length > 0 && If(n[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const r = n.find(
            (t) => "object" == typeof t && null != t && t.outlets
          );
          if (r && r !== Gp(n))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Df {
        constructor(t, e, n) {
          (this.segmentGroup = t), (this.processChildren = e), (this.index = n);
        }
      }
      function Rf(t) {
        return "object" == typeof t && null != t && t.outlets
          ? t.outlets.primary
          : `${t}`;
      }
      function Nf(t, e, n) {
        if (
          (t || (t = new Qp([], {})),
          0 === t.segments.length && t.hasChildren())
        )
          return Vf(t, e, n);
        const r = (function (t, e, n) {
            let r = 0,
              s = e;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; s < t.segments.length; ) {
              if (r >= n.length) return i;
              const e = t.segments[s],
                o = Rf(n[r]),
                a = r < n.length - 1 ? n[r + 1] : null;
              if (s > 0 && void 0 === o) break;
              if (o && a && "object" == typeof a && void 0 === a.outlets) {
                if (!jf(o, a, e)) return i;
                r += 2;
              } else {
                if (!jf(o, {}, e)) return i;
                r++;
              }
              s++;
            }
            return { match: !0, pathIndex: s, commandIndex: r };
          })(t, e, n),
          s = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < t.segments.length) {
          const e = new Qp(t.segments.slice(0, r.pathIndex), {});
          return (
            (e.children.primary = new Qp(
              t.segments.slice(r.pathIndex),
              t.children
            )),
            Vf(e, 0, s)
          );
        }
        return r.match && 0 === s.length
          ? new Qp(t.segments, {})
          : r.match && !t.hasChildren()
          ? Uf(t, e, n)
          : r.match
          ? Vf(t, 0, s)
          : Uf(t, e, n);
      }
      function Vf(t, e, n) {
        if (0 === n.length) return new Qp(t.segments, {});
        {
          const r = (function (t) {
              return "object" != typeof t[0]
                ? { primary: t }
                : void 0 === t[0].outlets
                ? { primary: t }
                : t[0].outlets;
            })(n),
            s = {};
          return (
            Bp(r, (n, r) => {
              null !== n && (s[r] = Nf(t.children[r], e, n));
            }),
            Bp(t.children, (t, e) => {
              void 0 === r[e] && (s[e] = t);
            }),
            new Qp(t.segments, s)
          );
        }
      }
      function Uf(t, e, n) {
        const r = t.segments.slice(0, e);
        let s = 0;
        for (; s < n.length; ) {
          if ("object" == typeof n[s] && void 0 !== n[s].outlets) {
            const t = Lf(n[s].outlets);
            return new Qp(r, t);
          }
          if (0 === s && If(n[0])) {
            r.push(new Yp(t.segments[e].path, n[0])), s++;
            continue;
          }
          const i = Rf(n[s]),
            o = s < n.length - 1 ? n[s + 1] : null;
          i && o && If(o)
            ? (r.push(new Yp(i, Ff(o))), (s += 2))
            : (r.push(new Yp(i, {})), s++);
        }
        return new Qp(r, {});
      }
      function Lf(t) {
        const e = {};
        return (
          Bp(t, (t, n) => {
            null !== t && (e[n] = Uf(new Qp([], {}), 0, t));
          }),
          e
        );
      }
      function Ff(t) {
        const e = {};
        return Bp(t, (t, n) => (e[n] = `${t}`)), e;
      }
      function jf(t, e, n) {
        return t == n.path && Hp(e, n.parameters);
      }
      class Hf {
        constructor(t, e, n, r) {
          (this.routeReuseStrategy = t),
            (this.futureState = e),
            (this.currState = n),
            (this.forwardEvent = r);
        }
        activate(t) {
          const e = this.futureState._root,
            n = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(e, n, t),
            Of(this.futureState.root),
            this.activateChildRoutes(e, n, t);
        }
        deactivateChildRoutes(t, e, n) {
          const r = _f(e);
          t.children.forEach((t) => {
            const e = t.value.outlet;
            this.deactivateRoutes(t, r[e], n), delete r[e];
          }),
            Bp(r, (t, e) => {
              this.deactivateRouteAndItsChildren(t, n);
            });
        }
        deactivateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null;
          if (r === s)
            if (r.component) {
              const s = n.getContext(r.outlet);
              s && this.deactivateChildRoutes(t, e, s.children);
            } else this.deactivateChildRoutes(t, e, n);
          else s && this.deactivateRouteAndItsChildren(e, n);
        }
        deactivateRouteAndItsChildren(t, e) {
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, e)
            : this.deactivateRouteAndOutlet(t, e);
        }
        detachAndStoreRouteSubtree(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n && n.outlet) {
            const e = n.outlet.detach(),
              r = n.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: e,
              route: t,
              contexts: r,
            });
          }
        }
        deactivateRouteAndOutlet(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n) {
            const r = _f(t),
              s = t.value.component ? n.children : e;
            Bp(r, (t, e) => this.deactivateRouteAndItsChildren(t, s)),
              n.outlet &&
                (n.outlet.deactivate(), n.children.onOutletDeactivated());
          }
        }
        activateChildRoutes(t, e, n) {
          const r = _f(e);
          t.children.forEach((t) => {
            this.activateRoutes(t, r[t.value.outlet], n),
              this.forwardEvent(new Ap(t.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new Pp(t.value.snapshot));
        }
        activateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null;
          if ((Of(r), r === s))
            if (r.component) {
              const s = n.getOrCreateContext(r.outlet);
              this.activateChildRoutes(t, e, s.children);
            } else this.activateChildRoutes(t, e, n);
          else if (r.component) {
            const e = n.getOrCreateContext(r.outlet);
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
              const t = this.routeReuseStrategy.retrieve(r.snapshot);
              this.routeReuseStrategy.store(r.snapshot, null),
                e.children.onOutletReAttached(t.contexts),
                (e.attachRef = t.componentRef),
                (e.route = t.route.value),
                e.outlet && e.outlet.attach(t.componentRef, t.route.value),
                $f(t.route);
            } else {
              const n = (function (t) {
                  for (let e = t.parent; e; e = e.parent) {
                    const t = e.routeConfig;
                    if (t && t._loadedConfig) return t._loadedConfig;
                    if (t && t.component) return null;
                  }
                  return null;
                })(r.snapshot),
                s = n ? n.module.componentFactoryResolver : null;
              (e.attachRef = null),
                (e.route = r),
                (e.resolver = s),
                e.outlet && e.outlet.activateWith(r, s),
                this.activateChildRoutes(t, null, e.children);
            }
          } else this.activateChildRoutes(t, null, n);
        }
      }
      function $f(t) {
        Of(t.value), t.children.forEach($f);
      }
      function zf(t) {
        return "function" == typeof t;
      }
      function Gf(t) {
        return t instanceof Zp;
      }
      class Bf {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class qf {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Wf(t) {
        return new b((e) => e.error(new Bf(t)));
      }
      function Zf(t) {
        return new b((e) => e.error(new qf(t)));
      }
      function Qf(t) {
        return new b((e) =>
          e.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${t}'`
            )
          )
        );
      }
      class Yf {
        constructor(t, e, n, r, s) {
          (this.configLoader = e),
            (this.urlSerializer = n),
            (this.urlTree = r),
            (this.config = s),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(Kt));
        }
        apply() {
          return this.expandSegmentGroup(
            this.ngModule,
            this.config,
            this.urlTree.root,
            "primary"
          )
            .pipe(
              U((t) =>
                this.createUrlTree(
                  t,
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Bd((t) => {
                if (t instanceof qf)
                  return (this.allowRedirects = !1), this.match(t.urlTree);
                if (t instanceof Bf) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(
            this.ngModule,
            this.config,
            t.root,
            "primary"
          )
            .pipe(U((e) => this.createUrlTree(e, t.queryParams, t.fragment)))
            .pipe(
              Bd((t) => {
                if (t instanceof Bf) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
          );
        }
        createUrlTree(t, e, n) {
          const r = t.segments.length > 0 ? new Qp([], { primary: t }) : t;
          return new Zp(r, e, n);
        }
        expandSegmentGroup(t, e, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.expandChildren(t, e, n).pipe(U((t) => new Qp([], t)))
            : this.expandSegment(t, n, e, n.segments, r, !0);
        }
        expandChildren(t, e, n) {
          return (function (t, e) {
            if (0 === Object.keys(t).length) return bd({});
            const n = [],
              r = [],
              s = {};
            return (
              Bp(t, (t, i) => {
                const o = e(i, t).pipe(U((t) => (s[i] = t)));
                "primary" === i ? n.push(o) : r.push(o);
              }),
              bd.apply(null, n.concat(r)).pipe(
                Ad(),
                Gd(),
                U(() => s)
              )
            );
          })(n.children, (n, r) => this.expandSegmentGroup(t, e, r, n));
        }
        expandSegment(t, e, n, r, s, i) {
          return bd(...n).pipe(
            U((o) =>
              this.expandSegmentAgainstRoute(t, e, n, o, r, s, i).pipe(
                Bd((t) => {
                  if (t instanceof Bf) return bd(null);
                  throw t;
                })
              )
            ),
            Ad(),
            Kd((t) => !!t),
            Bd((t, n) => {
              if (t instanceof Cd || "EmptyError" === t.name) {
                if (this.noLeftoversInUrl(e, r, s)) return bd(new Qp([], {}));
                throw new Bf(e);
              }
              throw t;
            })
          );
        }
        noLeftoversInUrl(t, e, n) {
          return 0 === e.length && !t.children[n];
        }
        expandSegmentAgainstRoute(t, e, n, r, s, i, o) {
          return tg(r) !== i
            ? Wf(e)
            : void 0 === r.redirectTo
            ? this.matchSegmentAgainstRoute(t, e, r, s)
            : o && this.allowRedirects
            ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i)
            : Wf(e);
        }
        expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
          return "**" === r.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                e,
                n,
                r,
                s,
                i
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, r) {
          const s = this.applyRedirectCommands([], n.redirectTo, {});
          return n.redirectTo.startsWith("/")
            ? Zf(s)
            : this.lineralizeSegments(n, s).pipe(
                $((n) => {
                  const s = new Qp(n, {});
                  return this.expandSegment(t, s, e, n, r, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
          const {
            matched: o,
            consumedSegments: a,
            lastChild: l,
            positionalParamSegments: c,
          } = Kf(e, r, s);
          if (!o) return Wf(e);
          const u = this.applyRedirectCommands(a, r.redirectTo, c);
          return r.redirectTo.startsWith("/")
            ? Zf(u)
            : this.lineralizeSegments(r, u).pipe(
                $((r) =>
                  this.expandSegment(t, e, n, r.concat(s.slice(l)), i, !1)
                )
              );
        }
        matchSegmentAgainstRoute(t, e, n, r) {
          if ("**" === n.path)
            return n.loadChildren
              ? this.configLoader
                  .load(t.injector, n)
                  .pipe(U((t) => ((n._loadedConfig = t), new Qp(r, {}))))
              : bd(new Qp(r, {}));
          const { matched: s, consumedSegments: i, lastChild: o } = Kf(e, n, r);
          if (!s) return Wf(e);
          const a = r.slice(o);
          return this.getChildConfig(t, n, r).pipe(
            $((t) => {
              const n = t.module,
                r = t.routes,
                { segmentGroup: s, slicedSegments: o } = (function (
                  t,
                  e,
                  n,
                  r
                ) {
                  return n.length > 0 &&
                    (function (t, e, n) {
                      return n.some((n) => Xf(t, e, n) && "primary" !== tg(n));
                    })(t, n, r)
                    ? {
                        segmentGroup: Jf(
                          new Qp(
                            e,
                            (function (t, e) {
                              const n = {};
                              n.primary = e;
                              for (const r of t)
                                "" === r.path &&
                                  "primary" !== tg(r) &&
                                  (n[tg(r)] = new Qp([], {}));
                              return n;
                            })(r, new Qp(n, t.children))
                          )
                        ),
                        slicedSegments: [],
                      }
                    : 0 === n.length &&
                      (function (t, e, n) {
                        return n.some((n) => Xf(t, e, n));
                      })(t, n, r)
                    ? {
                        segmentGroup: Jf(
                          new Qp(
                            t.segments,
                            (function (t, e, n, r) {
                              const s = {};
                              for (const i of n)
                                Xf(t, e, i) &&
                                  !r[tg(i)] &&
                                  (s[tg(i)] = new Qp([], {}));
                              return Object.assign(Object.assign({}, r), s);
                            })(t, n, r, t.children)
                          )
                        ),
                        slicedSegments: n,
                      }
                    : { segmentGroup: t, slicedSegments: n };
                })(e, i, a, r);
              return 0 === o.length && s.hasChildren()
                ? this.expandChildren(n, r, s).pipe(U((t) => new Qp(i, t)))
                : 0 === r.length && 0 === o.length
                ? bd(new Qp(i, {}))
                : this.expandSegment(n, s, r, o, "primary", !0).pipe(
                    U((t) => new Qp(i.concat(t.segments), t.children))
                  );
            })
          );
        }
        getChildConfig(t, e, n) {
          return e.children
            ? bd(new Vp(e.children, t))
            : e.loadChildren
            ? void 0 !== e._loadedConfig
              ? bd(e._loadedConfig)
              : (function (t, e, n) {
                  const r = e.canLoad;
                  return r && 0 !== r.length
                    ? H(r)
                        .pipe(
                          U((r) => {
                            const s = t.get(r);
                            let i;
                            if (
                              (function (t) {
                                return t && zf(t.canLoad);
                              })(s)
                            )
                              i = s.canLoad(e, n);
                            else {
                              if (!zf(s))
                                throw new Error("Invalid CanLoad guard");
                              i = s(e, n);
                            }
                            return qp(i);
                          })
                        )
                        .pipe(
                          Ad(),
                          ((s = (t) => !0 === t),
                          (t) => t.lift(new Jd(s, void 0, t)))
                        )
                    : bd(!0);
                  var s;
                })(t.injector, e, n).pipe(
                  $((n) =>
                    n
                      ? this.configLoader
                          .load(t.injector, e)
                          .pipe(U((t) => ((e._loadedConfig = t), t)))
                      : (function (t) {
                          return new b((e) =>
                            e.error(
                              Rp(
                                `Cannot load children because the guard of the route "path: '${t.path}'" returned false`
                              )
                            )
                          );
                        })(e)
                  )
                )
            : bd(new Vp([], t));
        }
        lineralizeSegments(t, e) {
          let n = [],
            r = e.root;
          for (;;) {
            if (((n = n.concat(r.segments)), 0 === r.numberOfChildren))
              return bd(n);
            if (r.numberOfChildren > 1 || !r.children.primary)
              return Qf(t.redirectTo);
            r = r.children.primary;
          }
        }
        applyRedirectCommands(t, e, n) {
          return this.applyRedirectCreatreUrlTree(
            e,
            this.urlSerializer.parse(e),
            t,
            n
          );
        }
        applyRedirectCreatreUrlTree(t, e, n, r) {
          const s = this.createSegmentGroup(t, e.root, n, r);
          return new Zp(
            s,
            this.createQueryParams(e.queryParams, this.urlTree.queryParams),
            e.fragment
          );
        }
        createQueryParams(t, e) {
          const n = {};
          return (
            Bp(t, (t, r) => {
              if ("string" == typeof t && t.startsWith(":")) {
                const s = t.substring(1);
                n[r] = e[s];
              } else n[r] = t;
            }),
            n
          );
        }
        createSegmentGroup(t, e, n, r) {
          const s = this.createSegments(t, e.segments, n, r);
          let i = {};
          return (
            Bp(e.children, (e, s) => {
              i[s] = this.createSegmentGroup(t, e, n, r);
            }),
            new Qp(s, i)
          );
        }
        createSegments(t, e, n, r) {
          return e.map((e) =>
            e.path.startsWith(":")
              ? this.findPosParam(t, e, r)
              : this.findOrReturn(e, n)
          );
        }
        findPosParam(t, e, n) {
          const r = n[e.path.substring(1)];
          if (!r)
            throw new Error(
              `Cannot redirect to '${t}'. Cannot find '${e.path}'.`
            );
          return r;
        }
        findOrReturn(t, e) {
          let n = 0;
          for (const r of e) {
            if (r.path === t.path) return e.splice(n), r;
            n++;
          }
          return t;
        }
      }
      function Kf(t, e, n) {
        if ("" === e.path)
          return "full" === e.pathMatch && (t.hasChildren() || n.length > 0)
            ? {
                matched: !1,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              }
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              };
        const r = (e.matcher || Np)(n, t, e);
        return r
          ? {
              matched: !0,
              consumedSegments: r.consumed,
              lastChild: r.consumed.length,
              positionalParamSegments: r.posParams,
            }
          : {
              matched: !1,
              consumedSegments: [],
              lastChild: 0,
              positionalParamSegments: {},
            };
      }
      function Jf(t) {
        if (1 === t.numberOfChildren && t.children.primary) {
          const e = t.children.primary;
          return new Qp(t.segments.concat(e.segments), e.children);
        }
        return t;
      }
      function Xf(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 !== n.redirectTo
        );
      }
      function tg(t) {
        return t.outlet || "primary";
      }
      class eg {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class ng {
        constructor(t, e) {
          (this.component = t), (this.route = e);
        }
      }
      function rg(t, e, n) {
        const r = t._root;
        return (function t(
          e,
          n,
          r,
          s,
          i = { canDeactivateChecks: [], canActivateChecks: [] }
        ) {
          const o = _f(n);
          return (
            e.children.forEach((e) => {
              !(function (
                e,
                n,
                r,
                s,
                i = { canDeactivateChecks: [], canActivateChecks: [] }
              ) {
                const o = e.value,
                  a = n ? n.value : null,
                  l = r ? r.getContext(e.value.outlet) : null;
                if (a && o.routeConfig === a.routeConfig) {
                  const c = (function (t, e, n) {
                    if ("function" == typeof n) return n(t, e);
                    switch (n) {
                      case "pathParamsChange":
                        return !Kp(t.url, e.url);
                      case "pathParamsOrQueryParamsChange":
                        return (
                          !Kp(t.url, e.url) || !Hp(t.queryParams, e.queryParams)
                        );
                      case "always":
                        return !0;
                      case "paramsOrQueryParamsChange":
                        return !Af(t, e) || !Hp(t.queryParams, e.queryParams);
                      case "paramsChange":
                      default:
                        return !Af(t, e);
                    }
                  })(a, o, o.routeConfig.runGuardsAndResolvers);
                  c
                    ? i.canActivateChecks.push(new eg(s))
                    : ((o.data = a.data), (o._resolvedData = a._resolvedData)),
                    t(e, n, o.component ? (l ? l.children : null) : r, s, i),
                    c &&
                      i.canDeactivateChecks.push(
                        new ng((l && l.outlet && l.outlet.component) || null, a)
                      );
                } else
                  a && ig(n, l, i),
                    i.canActivateChecks.push(new eg(s)),
                    t(e, null, o.component ? (l ? l.children : null) : r, s, i);
              })(e, o[e.value.outlet], r, s.concat([e.value]), i),
                delete o[e.value.outlet];
            }),
            Bp(o, (t, e) => ig(t, r.getContext(e), i)),
            i
          );
        })(r, e ? e._root : null, n, [r.value]);
      }
      function sg(t, e, n) {
        const r = (function (t) {
          if (!t) return null;
          for (let e = t.parent; e; e = e.parent) {
            const t = e.routeConfig;
            if (t && t._loadedConfig) return t._loadedConfig;
          }
          return null;
        })(e);
        return (r ? r.module.injector : n).get(t);
      }
      function ig(t, e, n) {
        const r = _f(t),
          s = t.value;
        Bp(r, (t, r) => {
          ig(t, s.component ? (e ? e.children.getContext(r) : null) : e, n);
        }),
          n.canDeactivateChecks.push(
            new ng(
              s.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              s
            )
          );
      }
      const og = Symbol("INITIAL_VALUE");
      function ag() {
        return tp((t) =>
          (function (...t) {
            let e = null,
              n = null;
            return (
              P(t[t.length - 1]) && (n = t.pop()),
              "function" == typeof t[t.length - 1] && (e = t.pop()),
              1 === t.length && l(t[0]) && (t = t[0]),
              q(t, n).lift(new Sd(e))
            );
          })(
            ...t.map((t) =>
              t.pipe(
                Zd(1),
                (function (...t) {
                  const e = t[t.length - 1];
                  return P(e) ? (t.pop(), (n) => rp(t, n, e)) : (e) => rp(t, e);
                })(og)
              )
            )
          ).pipe(
            sp((t, e) => {
              let n = !1;
              return e.reduce((t, r, s) => {
                if (t !== og) return t;
                if ((r === og && (n = !0), !n)) {
                  if (!1 === r) return r;
                  if (s === e.length - 1 || Gf(r)) return r;
                }
                return t;
              }, t);
            }, og),
            Id((t) => t !== og),
            U((t) => (Gf(t) ? t : !0 === t)),
            Zd(1)
          )
        );
      }
      function lg(t, e) {
        return null !== t && e && e(new Op(t)), bd(!0);
      }
      function cg(t, e) {
        return null !== t && e && e(new kp(t)), bd(!0);
      }
      function ug(t, e, n) {
        const r = e.routeConfig ? e.routeConfig.canActivate : null;
        return r && 0 !== r.length
          ? bd(
              r.map((r) =>
                Od(() => {
                  const s = sg(r, e, n);
                  let i;
                  if (
                    (function (t) {
                      return t && zf(t.canActivate);
                    })(s)
                  )
                    i = qp(s.canActivate(e, t));
                  else {
                    if (!zf(s)) throw new Error("Invalid CanActivate guard");
                    i = qp(s(e, t));
                  }
                  return i.pipe(Kd());
                })
              )
            ).pipe(ag())
          : bd(!0);
      }
      function hg(t, e, n) {
        const r = e[e.length - 1],
          s = e
            .slice(0, e.length - 1)
            .reverse()
            .map((t) =>
              (function (t) {
                const e = t.routeConfig ? t.routeConfig.canActivateChild : null;
                return e && 0 !== e.length ? { node: t, guards: e } : null;
              })(t)
            )
            .filter((t) => null !== t)
            .map((e) =>
              Od(() =>
                bd(
                  e.guards.map((s) => {
                    const i = sg(s, e.node, n);
                    let o;
                    if (
                      (function (t) {
                        return t && zf(t.canActivateChild);
                      })(i)
                    )
                      o = qp(i.canActivateChild(r, t));
                    else {
                      if (!zf(i))
                        throw new Error("Invalid CanActivateChild guard");
                      o = qp(i(r, t));
                    }
                    return o.pipe(Kd());
                  })
                ).pipe(ag())
              )
            );
        return bd(s).pipe(ag());
      }
      class dg {}
      class pg {
        constructor(t, e, n, r, s, i) {
          (this.rootComponentType = t),
            (this.config = e),
            (this.urlTree = n),
            (this.url = r),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = i);
        }
        recognize() {
          try {
            const t = mg(
                this.urlTree.root,
                [],
                [],
                this.config,
                this.relativeLinkResolution
              ).segmentGroup,
              e = this.processSegmentGroup(this.config, t, "primary"),
              n = new Sf(
                [],
                Object.freeze({}),
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                {},
                "primary",
                this.rootComponentType,
                null,
                this.urlTree.root,
                -1,
                {}
              ),
              r = new vf(n, e),
              s = new Ef(this.url, r);
            return this.inheritParamsAndData(s._root), bd(s);
          } catch (t) {
            return new b((e) => e.error(t));
          }
        }
        inheritParamsAndData(t) {
          const e = t.value,
            n = xf(e, this.paramsInheritanceStrategy);
          (e.params = Object.freeze(n.params)),
            (e.data = Object.freeze(n.data)),
            t.children.forEach((t) => this.inheritParamsAndData(t));
        }
        processSegmentGroup(t, e, n) {
          return 0 === e.segments.length && e.hasChildren()
            ? this.processChildren(t, e)
            : this.processSegment(t, e, e.segments, n);
        }
        processChildren(t, e) {
          const n = Jp(e, (e, n) => this.processSegmentGroup(t, e, n));
          return (
            (function (t) {
              const e = {};
              t.forEach((t) => {
                const n = e[t.value.outlet];
                if (n) {
                  const e = n.url.map((t) => t.toString()).join("/"),
                    r = t.value.url.map((t) => t.toString()).join("/");
                  throw new Error(
                    `Two segments cannot have the same outlet name: '${e}' and '${r}'.`
                  );
                }
                e[t.value.outlet] = t.value;
              });
            })(n),
            n.sort((t, e) =>
              "primary" === t.value.outlet
                ? -1
                : "primary" === e.value.outlet
                ? 1
                : t.value.outlet.localeCompare(e.value.outlet)
            ),
            n
          );
        }
        processSegment(t, e, n, r) {
          for (const i of t)
            try {
              return this.processSegmentAgainstRoute(i, e, n, r);
            } catch (s) {
              if (!(s instanceof dg)) throw s;
            }
          if (this.noLeftoversInUrl(e, n, r)) return [];
          throw new dg();
        }
        noLeftoversInUrl(t, e, n) {
          return 0 === e.length && !t.children[n];
        }
        processSegmentAgainstRoute(t, e, n, r) {
          if (t.redirectTo) throw new dg();
          if ((t.outlet || "primary") !== r) throw new dg();
          let s,
            i = [],
            o = [];
          if ("**" === t.path) {
            const i = n.length > 0 ? Gp(n).parameters : {};
            s = new Sf(
              n,
              i,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              _g(t),
              r,
              t.component,
              t,
              fg(e),
              gg(e) + n.length,
              bg(t)
            );
          } else {
            const a = (function (t, e, n) {
              if ("" === e.path) {
                if ("full" === e.pathMatch && (t.hasChildren() || n.length > 0))
                  throw new dg();
                return { consumedSegments: [], lastChild: 0, parameters: {} };
              }
              const r = (e.matcher || Np)(n, t, e);
              if (!r) throw new dg();
              const s = {};
              Bp(r.posParams, (t, e) => {
                s[e] = t.path;
              });
              const i =
                r.consumed.length > 0
                  ? Object.assign(
                      Object.assign({}, s),
                      r.consumed[r.consumed.length - 1].parameters
                    )
                  : s;
              return {
                consumedSegments: r.consumed,
                lastChild: r.consumed.length,
                parameters: i,
              };
            })(e, t, n);
            (i = a.consumedSegments),
              (o = n.slice(a.lastChild)),
              (s = new Sf(
                i,
                a.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                _g(t),
                r,
                t.component,
                t,
                fg(e),
                gg(e) + i.length,
                bg(t)
              ));
          }
          const a = (function (t) {
              return t.children
                ? t.children
                : t.loadChildren
                ? t._loadedConfig.routes
                : [];
            })(t),
            { segmentGroup: l, slicedSegments: c } = mg(
              e,
              i,
              o,
              a,
              this.relativeLinkResolution
            );
          if (0 === c.length && l.hasChildren()) {
            const t = this.processChildren(a, l);
            return [new vf(s, t)];
          }
          if (0 === a.length && 0 === c.length) return [new vf(s, [])];
          const u = this.processSegment(a, l, c, "primary");
          return [new vf(s, u)];
        }
      }
      function fg(t) {
        let e = t;
        for (; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function gg(t) {
        let e = t,
          n = e._segmentIndexShift ? e._segmentIndexShift : 0;
        for (; e._sourceSegment; )
          (e = e._sourceSegment),
            (n += e._segmentIndexShift ? e._segmentIndexShift : 0);
        return n - 1;
      }
      function mg(t, e, n, r, s) {
        if (
          n.length > 0 &&
          (function (t, e, n) {
            return n.some((n) => yg(t, e, n) && "primary" !== vg(n));
          })(t, n, r)
        ) {
          const s = new Qp(
            e,
            (function (t, e, n, r) {
              const s = {};
              (s.primary = r),
                (r._sourceSegment = t),
                (r._segmentIndexShift = e.length);
              for (const i of n)
                if ("" === i.path && "primary" !== vg(i)) {
                  const n = new Qp([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift = e.length),
                    (s[vg(i)] = n);
                }
              return s;
            })(t, e, r, new Qp(n, t.children))
          );
          return (
            (s._sourceSegment = t),
            (s._segmentIndexShift = e.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function (t, e, n) {
            return n.some((n) => yg(t, e, n));
          })(t, n, r)
        ) {
          const i = new Qp(
            t.segments,
            (function (t, e, n, r, s, i) {
              const o = {};
              for (const a of r)
                if (yg(t, n, a) && !s[vg(a)]) {
                  const n = new Qp([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift =
                      "legacy" === i ? t.segments.length : e.length),
                    (o[vg(a)] = n);
                }
              return Object.assign(Object.assign({}, s), o);
            })(t, e, n, r, t.children, s)
          );
          return (
            (i._sourceSegment = t),
            (i._segmentIndexShift = e.length),
            { segmentGroup: i, slicedSegments: n }
          );
        }
        const i = new Qp(t.segments, t.children);
        return (
          (i._sourceSegment = t),
          (i._segmentIndexShift = e.length),
          { segmentGroup: i, slicedSegments: n }
        );
      }
      function yg(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 === n.redirectTo
        );
      }
      function vg(t) {
        return t.outlet || "primary";
      }
      function _g(t) {
        return t.data || {};
      }
      function bg(t) {
        return t.resolve || {};
      }
      function wg(t, e, n, r) {
        const s = sg(t, e, r);
        return qp(s.resolve ? s.resolve(e, n) : s(e, n));
      }
      function Cg(t) {
        return function (e) {
          return e.pipe(
            tp((e) => {
              const n = t(e);
              return n ? H(n).pipe(U(() => e)) : H([e]);
            })
          );
        };
      }
      class xg {
        shouldDetach(t) {
          return !1;
        }
        store(t, e) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, e) {
          return t.routeConfig === e.routeConfig;
        }
      }
      const Sg = new Ut("ROUTES");
      class Eg {
        constructor(t, e, n, r) {
          (this.loader = t),
            (this.compiler = e),
            (this.onLoadStartListener = n),
            (this.onLoadEndListener = r);
        }
        load(t, e) {
          return (
            this.onLoadStartListener && this.onLoadStartListener(e),
            this.loadModuleFactory(e.loadChildren).pipe(
              U((n) => {
                this.onLoadEndListener && this.onLoadEndListener(e);
                const r = n.create(t);
                return new Vp(zp(r.injector.get(Sg)).map(jp), r);
              })
            )
          );
        }
        loadModuleFactory(t) {
          return "string" == typeof t
            ? H(this.loader.load(t))
            : qp(t()).pipe(
                $((t) =>
                  t instanceof Jt
                    ? bd(t)
                    : H(this.compiler.compileModuleAsync(t))
                )
              );
        }
      }
      class kg {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, e) {
          return t;
        }
      }
      function Pg(t) {
        throw t;
      }
      function Og(t, e, n) {
        return e.parse("/");
      }
      function Ag(t, e) {
        return bd(null);
      }
      let Ig = (() => {
          class t {
            constructor(t, e, n, r, s, i, o, a) {
              (this.rootComponentType = t),
                (this.urlSerializer = e),
                (this.rootContexts = n),
                (this.location = r),
                (this.config = a),
                (this.lastSuccessfulNavigation = null),
                (this.currentNavigation = null),
                (this.navigationId = 0),
                (this.isNgZoneEnabled = !1),
                (this.events = new E()),
                (this.errorHandler = Pg),
                (this.malformedUriErrorHandler = Og),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.hooks = {
                  beforePreactivation: Ag,
                  afterPreactivation: Ag,
                }),
                (this.urlHandlingStrategy = new kg()),
                (this.routeReuseStrategy = new xg()),
                (this.onSameUrlNavigation = "ignore"),
                (this.paramsInheritanceStrategy = "emptyOnly"),
                (this.urlUpdateStrategy = "deferred"),
                (this.relativeLinkResolution = "legacy"),
                (this.ngModule = s.get(Kt)),
                (this.console = s.get(ul));
              const l = s.get(Sl);
              (this.isNgZoneEnabled = l instanceof Sl),
                this.resetConfig(a),
                (this.currentUrlTree = new Zp(new Qp([], {}), {}, null)),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.configLoader = new Eg(
                  i,
                  o,
                  (t) => this.triggerEvent(new Sp(t)),
                  (t) => this.triggerEvent(new Ep(t))
                )),
                (this.routerState = wf(
                  this.currentUrlTree,
                  this.rootComponentType
                )),
                (this.transitions = new wd({
                  id: 0,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  extractedUrl: this.urlHandlingStrategy.extract(
                    this.currentUrlTree
                  ),
                  urlAfterRedirects: this.urlHandlingStrategy.extract(
                    this.currentUrlTree
                  ),
                  rawUrl: this.currentUrlTree,
                  extras: {},
                  resolve: null,
                  reject: null,
                  promise: Promise.resolve(!0),
                  source: "imperative",
                  restoredState: null,
                  currentSnapshot: this.routerState.snapshot,
                  targetSnapshot: null,
                  currentRouterState: this.routerState,
                  targetRouterState: null,
                  guards: { canActivateChecks: [], canDeactivateChecks: [] },
                  guardsResult: null,
                })),
                (this.navigations = this.setupNavigations(this.transitions)),
                this.processNavigations();
            }
            setupNavigations(t) {
              const e = this.events;
              return t.pipe(
                Id((t) => 0 !== t.id),
                U((t) =>
                  Object.assign(Object.assign({}, t), {
                    extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl),
                  })
                ),
                tp((t) => {
                  let n = !1,
                    r = !1;
                  return bd(t).pipe(
                    cp((t) => {
                      this.currentNavigation = {
                        id: t.id,
                        initialUrl: t.currentRawUrl,
                        extractedUrl: t.extractedUrl,
                        trigger: t.source,
                        extras: t.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? Object.assign(
                              Object.assign({}, this.lastSuccessfulNavigation),
                              { previousNavigation: null }
                            )
                          : null,
                      };
                    }),
                    tp((t) => {
                      const n =
                        !this.navigated ||
                        t.extractedUrl.toString() !==
                          this.browserUrlTree.toString();
                      if (
                        ("reload" === this.onSameUrlNavigation || n) &&
                        this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)
                      )
                        return bd(t).pipe(
                          tp((t) => {
                            const n = this.transitions.getValue();
                            return (
                              e.next(
                                new gp(
                                  t.id,
                                  this.serializeUrl(t.extractedUrl),
                                  t.source,
                                  t.restoredState
                                )
                              ),
                              n !== this.transitions.getValue() ? kd : [t]
                            );
                          }),
                          tp((t) => Promise.resolve(t)),
                          ((r = this.ngModule.injector),
                          (s = this.configLoader),
                          (i = this.urlSerializer),
                          (o = this.config),
                          function (t) {
                            return t.pipe(
                              tp((t) =>
                                (function (t, e, n, r, s) {
                                  return new Yf(t, e, n, r, s).apply();
                                })(r, s, i, t.extractedUrl, o).pipe(
                                  U((e) =>
                                    Object.assign(Object.assign({}, t), {
                                      urlAfterRedirects: e,
                                    })
                                  )
                                )
                              )
                            );
                          }),
                          cp((t) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: t.urlAfterRedirects }
                            );
                          }),
                          (function (t, e, n, r, s) {
                            return function (i) {
                              return i.pipe(
                                $((i) =>
                                  (function (
                                    t,
                                    e,
                                    n,
                                    r,
                                    s = "emptyOnly",
                                    i = "legacy"
                                  ) {
                                    return new pg(t, e, n, r, s, i).recognize();
                                  })(
                                    t,
                                    e,
                                    i.urlAfterRedirects,
                                    n(i.urlAfterRedirects),
                                    r,
                                    s
                                  ).pipe(
                                    U((t) =>
                                      Object.assign(Object.assign({}, i), {
                                        targetSnapshot: t,
                                      })
                                    )
                                  )
                                )
                              );
                            };
                          })(
                            this.rootComponentType,
                            this.config,
                            (t) => this.serializeUrl(t),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          cp((t) => {
                            "eager" === this.urlUpdateStrategy &&
                              (t.extras.skipLocationChange ||
                                this.setBrowserUrl(
                                  t.urlAfterRedirects,
                                  !!t.extras.replaceUrl,
                                  t.id,
                                  t.extras.state
                                ),
                              (this.browserUrlTree = t.urlAfterRedirects));
                          }),
                          cp((t) => {
                            const n = new _p(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            e.next(n);
                          })
                        );
                      var r, s, i, o;
                      if (
                        n &&
                        this.rawUrlTree &&
                        this.urlHandlingStrategy.shouldProcessUrl(
                          this.rawUrlTree
                        )
                      ) {
                        const {
                            id: n,
                            extractedUrl: r,
                            source: s,
                            restoredState: i,
                            extras: o,
                          } = t,
                          a = new gp(n, this.serializeUrl(r), s, i);
                        e.next(a);
                        const l = wf(r, this.rootComponentType).snapshot;
                        return bd(
                          Object.assign(Object.assign({}, t), {
                            targetSnapshot: l,
                            urlAfterRedirects: r,
                            extras: Object.assign(Object.assign({}, o), {
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            }),
                          })
                        );
                      }
                      return (
                        (this.rawUrlTree = t.rawUrl),
                        (this.browserUrlTree = t.urlAfterRedirects),
                        t.resolve(null),
                        kd
                      );
                    }),
                    Cg((t) => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: { skipLocationChange: i, replaceUrl: o },
                      } = t;
                      return this.hooks.beforePreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!i,
                        replaceUrl: !!o,
                      });
                    }),
                    cp((t) => {
                      const e = new bp(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot
                      );
                      this.triggerEvent(e);
                    }),
                    U((t) =>
                      Object.assign(Object.assign({}, t), {
                        guards: rg(
                          t.targetSnapshot,
                          t.currentSnapshot,
                          this.rootContexts
                        ),
                      })
                    ),
                    (function (t, e) {
                      return function (n) {
                        return n.pipe(
                          $((n) => {
                            const {
                              targetSnapshot: r,
                              currentSnapshot: s,
                              guards: {
                                canActivateChecks: i,
                                canDeactivateChecks: o,
                              },
                            } = n;
                            return 0 === o.length && 0 === i.length
                              ? bd(
                                  Object.assign(Object.assign({}, n), {
                                    guardsResult: !0,
                                  })
                                )
                              : (function (t, e, n, r) {
                                  return H(t).pipe(
                                    $((t) =>
                                      (function (t, e, n, r, s) {
                                        const i =
                                          e && e.routeConfig
                                            ? e.routeConfig.canDeactivate
                                            : null;
                                        return i && 0 !== i.length
                                          ? bd(
                                              i.map((i) => {
                                                const o = sg(i, e, s);
                                                let a;
                                                if (
                                                  (function (t) {
                                                    return (
                                                      t && zf(t.canDeactivate)
                                                    );
                                                  })(o)
                                                )
                                                  a = qp(
                                                    o.canDeactivate(t, e, n, r)
                                                  );
                                                else {
                                                  if (!zf(o))
                                                    throw new Error(
                                                      "Invalid CanDeactivate guard"
                                                    );
                                                  a = qp(o(t, e, n, r));
                                                }
                                                return a.pipe(Kd());
                                              })
                                            ).pipe(ag())
                                          : bd(!0);
                                      })(t.component, t.route, n, e, r)
                                    ),
                                    Kd((t) => !0 !== t, !0)
                                  );
                                })(o, r, s, t).pipe(
                                  $((n) =>
                                    n && "boolean" == typeof n
                                      ? (function (t, e, n, r) {
                                          return H(e).pipe(
                                            ap((e) =>
                                              H([
                                                cg(e.route.parent, r),
                                                lg(e.route, r),
                                                hg(t, e.path, n),
                                                ug(t, e.route, n),
                                              ]).pipe(
                                                Ad(),
                                                Kd((t) => !0 !== t, !0)
                                              )
                                            ),
                                            Kd((t) => !0 !== t, !0)
                                          );
                                        })(r, i, t, e)
                                      : bd(n)
                                  ),
                                  U((t) =>
                                    Object.assign(Object.assign({}, n), {
                                      guardsResult: t,
                                    })
                                  )
                                );
                          })
                        );
                      };
                    })(this.ngModule.injector, (t) => this.triggerEvent(t)),
                    cp((t) => {
                      if (Gf(t.guardsResult)) {
                        const e = Rp(
                          `Redirecting to "${this.serializeUrl(
                            t.guardsResult
                          )}"`
                        );
                        throw ((e.url = t.guardsResult), e);
                      }
                    }),
                    cp((t) => {
                      const e = new wp(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot,
                        !!t.guardsResult
                      );
                      this.triggerEvent(e);
                    }),
                    Id((t) => {
                      if (!t.guardsResult) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new yp(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          ""
                        );
                        return e.next(n), t.resolve(!1), !1;
                      }
                      return !0;
                    }),
                    Cg((t) => {
                      if (t.guards.canActivateChecks.length)
                        return bd(t).pipe(
                          cp((t) => {
                            const e = new Cp(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            this.triggerEvent(e);
                          }),
                          ((e = this.paramsInheritanceStrategy),
                          (n = this.ngModule.injector),
                          function (t) {
                            return t.pipe(
                              $((t) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: s },
                                } = t;
                                return s.length
                                  ? H(s).pipe(
                                      ap((t) =>
                                        (function (t, e, n, r) {
                                          return (function (t, e, n, r) {
                                            const s = Object.keys(t);
                                            if (0 === s.length) return bd({});
                                            if (1 === s.length) {
                                              const i = s[0];
                                              return wg(t[i], e, n, r).pipe(
                                                U((t) => ({ [i]: t }))
                                              );
                                            }
                                            const i = {};
                                            return H(s)
                                              .pipe(
                                                $((s) =>
                                                  wg(t[s], e, n, r).pipe(
                                                    U((t) => ((i[s] = t), t))
                                                  )
                                                )
                                              )
                                              .pipe(
                                                Gd(),
                                                U(() => i)
                                              );
                                          })(t._resolve, t, e, r).pipe(
                                            U(
                                              (e) => (
                                                (t._resolvedData = e),
                                                (t.data = Object.assign(
                                                  Object.assign({}, t.data),
                                                  xf(t, n).resolve
                                                )),
                                                null
                                              )
                                            )
                                          );
                                        })(t.route, r, e, n)
                                      ),
                                      (function (t, e) {
                                        return arguments.length >= 2
                                          ? function (n) {
                                              return v(
                                                sp(t, e),
                                                Rd(1),
                                                Hd(e)
                                              )(n);
                                            }
                                          : function (e) {
                                              return v(
                                                sp((e, n, r) => t(e, n, r + 1)),
                                                Rd(1)
                                              )(e);
                                            };
                                      })((t, e) => t),
                                      U((e) => t)
                                    )
                                  : bd(t);
                              })
                            );
                          }),
                          cp((t) => {
                            const e = new xp(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            this.triggerEvent(e);
                          })
                        );
                      var e, n;
                    }),
                    Cg((t) => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: { skipLocationChange: i, replaceUrl: o },
                      } = t;
                      return this.hooks.afterPreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!i,
                        replaceUrl: !!o,
                      });
                    }),
                    U((t) => {
                      const e = (function (t, e, n) {
                        const r = (function t(e, n, r) {
                          if (
                            r &&
                            e.shouldReuseRoute(n.value, r.value.snapshot)
                          ) {
                            const s = r.value;
                            s._futureSnapshot = n.value;
                            const i = (function (e, n, r) {
                              return n.children.map((n) => {
                                for (const s of r.children)
                                  if (
                                    e.shouldReuseRoute(
                                      s.value.snapshot,
                                      n.value
                                    )
                                  )
                                    return t(e, n, s);
                                return t(e, n);
                              });
                            })(e, n, r);
                            return new vf(s, i);
                          }
                          {
                            const r = e.retrieve(n.value);
                            if (r) {
                              const t = r.route;
                              return (
                                (function t(e, n) {
                                  if (
                                    e.value.routeConfig !== n.value.routeConfig
                                  )
                                    throw new Error(
                                      "Cannot reattach ActivatedRouteSnapshot created from a different route"
                                    );
                                  if (e.children.length !== n.children.length)
                                    throw new Error(
                                      "Cannot reattach ActivatedRouteSnapshot with a different number of children"
                                    );
                                  n.value._futureSnapshot = e.value;
                                  for (let r = 0; r < e.children.length; ++r)
                                    t(e.children[r], n.children[r]);
                                })(n, t),
                                t
                              );
                            }
                            {
                              const r = new Cf(
                                  new wd((s = n.value).url),
                                  new wd(s.params),
                                  new wd(s.queryParams),
                                  new wd(s.fragment),
                                  new wd(s.data),
                                  s.outlet,
                                  s.component,
                                  s
                                ),
                                i = n.children.map((n) => t(e, n));
                              return new vf(r, i);
                            }
                          }
                          var s;
                        })(t, e._root, n ? n._root : void 0);
                        return new bf(r, e);
                      })(
                        this.routeReuseStrategy,
                        t.targetSnapshot,
                        t.currentRouterState
                      );
                      return Object.assign(Object.assign({}, t), {
                        targetRouterState: e,
                      });
                    }),
                    cp((t) => {
                      (this.currentUrlTree = t.urlAfterRedirects),
                        (this.rawUrlTree = this.urlHandlingStrategy.merge(
                          this.currentUrlTree,
                          t.rawUrl
                        )),
                        (this.routerState = t.targetRouterState),
                        "deferred" === this.urlUpdateStrategy &&
                          (t.extras.skipLocationChange ||
                            this.setBrowserUrl(
                              this.rawUrlTree,
                              !!t.extras.replaceUrl,
                              t.id,
                              t.extras.state
                            ),
                          (this.browserUrlTree = t.urlAfterRedirects));
                    }),
                    ((i = this.rootContexts),
                    (o = this.routeReuseStrategy),
                    (a = (t) => this.triggerEvent(t)),
                    U(
                      (t) => (
                        new Hf(
                          o,
                          t.targetRouterState,
                          t.currentRouterState,
                          a
                        ).activate(i),
                        t
                      )
                    )),
                    cp({
                      next() {
                        n = !0;
                      },
                      complete() {
                        n = !0;
                      },
                    }),
                    ((s = () => {
                      if (!n && !r) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new yp(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`
                        );
                        e.next(n), t.resolve(!1);
                      }
                      this.currentNavigation = null;
                    }),
                    (t) => t.lift(new dp(s))),
                    Bd((n) => {
                      if (((r = !0), (s = n) && s.ngNavigationCancelingError)) {
                        const r = Gf(n.url);
                        r ||
                          ((this.navigated = !0),
                          this.resetStateAndUrl(
                            t.currentRouterState,
                            t.currentUrlTree,
                            t.rawUrl
                          ));
                        const s = new yp(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n.message
                        );
                        e.next(s),
                          r
                            ? setTimeout(() => {
                                const e = this.urlHandlingStrategy.merge(
                                  n.url,
                                  this.rawUrlTree
                                );
                                return this.scheduleNavigation(
                                  e,
                                  "imperative",
                                  null,
                                  {
                                    skipLocationChange:
                                      t.extras.skipLocationChange,
                                    replaceUrl:
                                      "eager" === this.urlUpdateStrategy,
                                  },
                                  {
                                    resolve: t.resolve,
                                    reject: t.reject,
                                    promise: t.promise,
                                  }
                                );
                              }, 0)
                            : t.resolve(!1);
                      } else {
                        this.resetStateAndUrl(
                          t.currentRouterState,
                          t.currentUrlTree,
                          t.rawUrl
                        );
                        const r = new vp(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n
                        );
                        e.next(r);
                        try {
                          t.resolve(this.errorHandler(n));
                        } catch (i) {
                          t.reject(i);
                        }
                      }
                      var s;
                      return kd;
                    })
                  );
                  var s, i, o, a;
                })
              );
            }
            resetRootComponentType(t) {
              (this.rootComponentType = t),
                (this.routerState.root.component = this.rootComponentType);
            }
            getTransition() {
              const t = this.transitions.value;
              return (t.urlAfterRedirects = this.browserUrlTree), t;
            }
            setTransition(t) {
              this.transitions.next(
                Object.assign(Object.assign({}, this.getTransition()), t)
              );
            }
            initialNavigation() {
              this.setUpLocationChangeListener(),
                0 === this.navigationId &&
                  this.navigateByUrl(this.location.path(!0), {
                    replaceUrl: !0,
                  });
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe((t) => {
                  let e = this.parseUrl(t.url);
                  const n = "popstate" === t.type ? "popstate" : "hashchange",
                    r = t.state && t.state.navigationId ? t.state : null;
                  setTimeout(() => {
                    this.scheduleNavigation(e, n, r, { replaceUrl: !0 });
                  }, 0);
                }));
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.currentNavigation;
            }
            triggerEvent(t) {
              this.events.next(t);
            }
            resetConfig(t) {
              Up(t),
                (this.config = t.map(jp)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = null));
            }
            createUrlTree(t, e = {}) {
              const {
                relativeTo: n,
                queryParams: r,
                fragment: s,
                preserveQueryParams: i,
                queryParamsHandling: o,
                preserveFragment: a,
              } = e;
              cr() &&
                i &&
                console &&
                console.warn &&
                console.warn(
                  "preserveQueryParams is deprecated, use queryParamsHandling instead."
                );
              const l = n || this.routerState.root,
                c = a ? this.currentUrlTree.fragment : s;
              let u = null;
              if (o)
                switch (o) {
                  case "merge":
                    u = Object.assign(
                      Object.assign({}, this.currentUrlTree.queryParams),
                      r
                    );
                    break;
                  case "preserve":
                    u = this.currentUrlTree.queryParams;
                    break;
                  default:
                    u = r || null;
                }
              else u = i ? this.currentUrlTree.queryParams : r || null;
              return (
                null !== u && (u = this.removeEmptyProps(u)),
                (function (t, e, n, r, s) {
                  if (0 === n.length) return Tf(e.root, e.root, e, r, s);
                  const i = (function (t) {
                    if (
                      "string" == typeof t[0] &&
                      1 === t.length &&
                      "/" === t[0]
                    )
                      return new Mf(!0, 0, t);
                    let e = 0,
                      n = !1;
                    const r = t.reduce((t, r, s) => {
                      if ("object" == typeof r && null != r) {
                        if (r.outlets) {
                          const e = {};
                          return (
                            Bp(r.outlets, (t, n) => {
                              e[n] = "string" == typeof t ? t.split("/") : t;
                            }),
                            [...t, { outlets: e }]
                          );
                        }
                        if (r.segmentPath) return [...t, r.segmentPath];
                      }
                      return "string" != typeof r
                        ? [...t, r]
                        : 0 === s
                        ? (r.split("/").forEach((r, s) => {
                            (0 == s && "." === r) ||
                              (0 == s && "" === r
                                ? (n = !0)
                                : ".." === r
                                ? e++
                                : "" != r && t.push(r));
                          }),
                          t)
                        : [...t, r];
                    }, []);
                    return new Mf(n, e, r);
                  })(n);
                  if (i.toRoot()) return Tf(e.root, new Qp([], {}), e, r, s);
                  const o = (function (t, e, n) {
                      if (t.isAbsolute) return new Df(e.root, !0, 0);
                      if (-1 === n.snapshot._lastPathIndex)
                        return new Df(n.snapshot._urlSegment, !0, 0);
                      const r = If(t.commands[0]) ? 0 : 1;
                      return (function (t, e, n) {
                        let r = t,
                          s = e,
                          i = n;
                        for (; i > s; ) {
                          if (((i -= s), (r = r.parent), !r))
                            throw new Error("Invalid number of '../'");
                          s = r.segments.length;
                        }
                        return new Df(r, !1, s - i);
                      })(
                        n.snapshot._urlSegment,
                        n.snapshot._lastPathIndex + r,
                        t.numberOfDoubleDots
                      );
                    })(i, e, t),
                    a = o.processChildren
                      ? Vf(o.segmentGroup, o.index, i.commands)
                      : Nf(o.segmentGroup, o.index, i.commands);
                  return Tf(o.segmentGroup, a, e, r, s);
                })(l, this.currentUrlTree, t, u, c)
              );
            }
            navigateByUrl(t, e = { skipLocationChange: !1 }) {
              cr() &&
                this.isNgZoneEnabled &&
                !Sl.isInAngularZone() &&
                this.console.warn(
                  "Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?"
                );
              const n = Gf(t) ? t : this.parseUrl(t),
                r = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
              return this.scheduleNavigation(r, "imperative", null, e);
            }
            navigate(t, e = { skipLocationChange: !1 }) {
              return (
                (function (t) {
                  for (let e = 0; e < t.length; e++) {
                    const n = t[e];
                    if (null == n)
                      throw new Error(
                        `The requested path contains ${n} segment at index ${e}`
                      );
                  }
                })(t),
                this.navigateByUrl(this.createUrlTree(t, e), e)
              );
            }
            serializeUrl(t) {
              return this.urlSerializer.serialize(t);
            }
            parseUrl(t) {
              let e;
              try {
                e = this.urlSerializer.parse(t);
              } catch (n) {
                e = this.malformedUriErrorHandler(n, this.urlSerializer, t);
              }
              return e;
            }
            isActive(t, e) {
              if (Gf(t)) return Wp(this.currentUrlTree, t, e);
              const n = this.parseUrl(t);
              return Wp(this.currentUrlTree, n, e);
            }
            removeEmptyProps(t) {
              return Object.keys(t).reduce((e, n) => {
                const r = t[n];
                return null != r && (e[n] = r), e;
              }, {});
            }
            processNavigations() {
              this.navigations.subscribe(
                (t) => {
                  (this.navigated = !0),
                    (this.lastSuccessfulId = t.id),
                    this.events.next(
                      new mp(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(this.currentUrlTree)
                      )
                    ),
                    (this.lastSuccessfulNavigation = this.currentNavigation),
                    (this.currentNavigation = null),
                    t.resolve(!0);
                },
                (t) => {
                  this.console.warn("Unhandled Navigation Error: ");
                }
              );
            }
            scheduleNavigation(t, e, n, r, s) {
              const i = this.getTransition();
              if (
                i &&
                "imperative" !== e &&
                "imperative" === i.source &&
                i.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              if (
                i &&
                "hashchange" == e &&
                "popstate" === i.source &&
                i.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              if (
                i &&
                "popstate" == e &&
                "hashchange" === i.source &&
                i.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              let o, a, l;
              s
                ? ((o = s.resolve), (a = s.reject), (l = s.promise))
                : (l = new Promise((t, e) => {
                    (o = t), (a = e);
                  }));
              const c = ++this.navigationId;
              return (
                this.setTransition({
                  id: c,
                  source: e,
                  restoredState: n,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.rawUrlTree,
                  rawUrl: t,
                  extras: r,
                  resolve: o,
                  reject: a,
                  promise: l,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                l.catch((t) => Promise.reject(t))
              );
            }
            setBrowserUrl(t, e, n, r) {
              const s = this.urlSerializer.serialize(t);
              (r = r || {}),
                this.location.isCurrentPathEqualTo(s) || e
                  ? this.location.replaceState(
                      s,
                      "",
                      Object.assign(Object.assign({}, r), { navigationId: n })
                    )
                  : this.location.go(
                      s,
                      "",
                      Object.assign(Object.assign({}, r), { navigationId: n })
                    );
            }
            resetStateAndUrl(t, e, n) {
              (this.routerState = t),
                (this.currentUrlTree = e),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  n
                )),
                this.resetUrlToCurrentUrlTree();
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                "",
                { navigationId: this.lastSuccessfulId }
              );
            }
          }
          return (
            (t.ɵfac = function (t) {
              $i();
            }),
            (t.ɵdir = me({ type: t })),
            t
          );
        })(),
        Tg = (() => {
          class t {
            constructor(t, e, n, r, s) {
              (this.router = t),
                (this.route = e),
                (this.commands = []),
                null == n && r.setAttribute(s.nativeElement, "tabindex", "0");
            }
            set routerLink(t) {
              this.commands = null != t ? (Array.isArray(t) ? t : [t]) : [];
            }
            set preserveQueryParams(t) {
              cr() &&
                console &&
                console.warn &&
                console.warn(
                  "preserveQueryParams is deprecated!, use queryParamsHandling instead."
                ),
                (this.preserve = t);
            }
            onClick() {
              const t = {
                skipLocationChange: Dg(this.skipLocationChange),
                replaceUrl: Dg(this.replaceUrl),
                state: this.state,
              };
              return this.router.navigateByUrl(this.urlTree, t), !0;
            }
            get urlTree() {
              return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                preserveQueryParams: Dg(this.preserve),
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: Dg(this.preserveFragment),
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                ji(Ig),
                ji(Cf),
                Hi("tabindex"),
                ji(qo),
                ji($o)
              );
            }),
            (t.ɵdir = me({
              type: t,
              selectors: [["", "routerLink", "", 5, "a", 5, "area"]],
              hostBindings: function (t, e) {
                1 & t &&
                  Xi("click", function () {
                    return e.onClick();
                  });
              },
              inputs: {
                routerLink: "routerLink",
                preserveQueryParams: "preserveQueryParams",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                state: "state",
              },
            })),
            t
          );
        })(),
        Mg = (() => {
          class t {
            constructor(t, e, n) {
              (this.router = t),
                (this.route = e),
                (this.locationStrategy = n),
                (this.commands = []),
                (this.subscription = t.events.subscribe((t) => {
                  t instanceof mp && this.updateTargetUrlAndHref();
                }));
            }
            set routerLink(t) {
              this.commands = null != t ? (Array.isArray(t) ? t : [t]) : [];
            }
            set preserveQueryParams(t) {
              cr() &&
                console &&
                console.warn &&
                console.warn(
                  "preserveQueryParams is deprecated, use queryParamsHandling instead."
                ),
                (this.preserve = t);
            }
            ngOnChanges(t) {
              this.updateTargetUrlAndHref();
            }
            ngOnDestroy() {
              this.subscription.unsubscribe();
            }
            onClick(t, e, n, r) {
              if (0 !== t || e || n || r) return !0;
              if ("string" == typeof this.target && "_self" != this.target)
                return !0;
              const s = {
                skipLocationChange: Dg(this.skipLocationChange),
                replaceUrl: Dg(this.replaceUrl),
                state: this.state,
              };
              return this.router.navigateByUrl(this.urlTree, s), !1;
            }
            updateTargetUrlAndHref() {
              this.href = this.locationStrategy.prepareExternalUrl(
                this.router.serializeUrl(this.urlTree)
              );
            }
            get urlTree() {
              return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                preserveQueryParams: Dg(this.preserve),
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: Dg(this.preserveFragment),
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ji(Ig), ji(Cf), ji(dc));
            }),
            (t.ɵdir = me({
              type: t,
              selectors: [
                ["a", "routerLink", ""],
                ["area", "routerLink", ""],
              ],
              hostVars: 2,
              hostBindings: function (t, e) {
                1 & t &&
                  Xi("click", function (t) {
                    return e.onClick(
                      t.button,
                      t.ctrlKey,
                      t.metaKey,
                      t.shiftKey
                    );
                  }),
                  2 & t && (bo("href", e.href, yr), Vi("target", e.target));
              },
              inputs: {
                routerLink: "routerLink",
                preserveQueryParams: "preserveQueryParams",
                target: "target",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                state: "state",
              },
              features: [Oo],
            })),
            t
          );
        })();
      function Dg(t) {
        return "" === t || !!t;
      }
      let Rg = (() => {
        class t {
          constructor(t, e, n, r, s) {
            (this.router = t),
              (this.element = e),
              (this.renderer = n),
              (this.link = r),
              (this.linkWithHref = s),
              (this.classes = []),
              (this.isActive = !1),
              (this.routerLinkActiveOptions = { exact: !1 }),
              (this.subscription = t.events.subscribe((t) => {
                t instanceof mp && this.update();
              }));
          }
          ngAfterContentInit() {
            this.links.changes.subscribe((t) => this.update()),
              this.linksWithHrefs.changes.subscribe((t) => this.update()),
              this.update();
          }
          set routerLinkActive(t) {
            const e = Array.isArray(t) ? t : t.split(" ");
            this.classes = e.filter((t) => !!t);
          }
          ngOnChanges(t) {
            this.update();
          }
          ngOnDestroy() {
            this.subscription.unsubscribe();
          }
          update() {
            this.links &&
              this.linksWithHrefs &&
              this.router.navigated &&
              Promise.resolve().then(() => {
                const t = this.hasActiveLinks();
                this.isActive !== t &&
                  ((this.isActive = t),
                  this.classes.forEach((e) => {
                    t
                      ? this.renderer.addClass(this.element.nativeElement, e)
                      : this.renderer.removeClass(
                          this.element.nativeElement,
                          e
                        );
                  }));
              });
          }
          isLinkActive(t) {
            return (e) =>
              t.isActive(e.urlTree, this.routerLinkActiveOptions.exact);
          }
          hasActiveLinks() {
            const t = this.isLinkActive(this.router);
            return (
              (this.link && t(this.link)) ||
              (this.linkWithHref && t(this.linkWithHref)) ||
              this.links.some(t) ||
              this.linksWithHrefs.some(t)
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ji(Ig), ji($o), ji(qo), ji(Tg, 8), ji(Mg, 8));
          }),
          (t.ɵdir = me({
            type: t,
            selectors: [["", "routerLinkActive", ""]],
            contentQueries: function (t, e, n) {
              var r;
              1 & t && (Xa(n, Tg, !0), Xa(n, Mg, !0)),
                2 & t &&
                  (Ja((r = tl())) && (e.links = r),
                  Ja((r = tl())) && (e.linksWithHrefs = r));
            },
            inputs: {
              routerLinkActiveOptions: "routerLinkActiveOptions",
              routerLinkActive: "routerLinkActive",
            },
            exportAs: ["routerLinkActive"],
            features: [Oo],
          })),
          t
        );
      })();
      class Ng {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new Vg()),
            (this.attachRef = null);
        }
      }
      class Vg {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(t, e) {
          const n = this.getOrCreateContext(t);
          (n.outlet = e), this.contexts.set(t, n);
        }
        onChildOutletDestroyed(t) {
          const e = this.getContext(t);
          e && (e.outlet = null);
        }
        onOutletDeactivated() {
          const t = this.contexts;
          return (this.contexts = new Map()), t;
        }
        onOutletReAttached(t) {
          this.contexts = t;
        }
        getOrCreateContext(t) {
          let e = this.getContext(t);
          return e || ((e = new Ng()), this.contexts.set(t, e)), e;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      let Ug = (() => {
        class t {
          constructor(t, e, n, r, s) {
            (this.parentContexts = t),
              (this.location = e),
              (this.resolver = n),
              (this.changeDetector = s),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new Ha()),
              (this.deactivateEvents = new Ha()),
              (this.name = r || "primary"),
              t.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const t = this.parentContexts.getContext(this.name);
              t &&
                t.route &&
                (t.attachRef
                  ? this.attach(t.attachRef, t.route)
                  : this.activateWith(t.route, t.resolver || null));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new Error("Outlet is not activated");
            this.location.detach();
            const t = this.activated;
            return (this.activated = null), (this._activatedRoute = null), t;
          }
          attach(t, e) {
            (this.activated = t),
              (this._activatedRoute = e),
              this.location.insert(t.hostView);
          }
          deactivate() {
            if (this.activated) {
              const t = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(t);
            }
          }
          activateWith(t, e) {
            if (this.isActivated)
              throw new Error("Cannot activate an already activated outlet");
            this._activatedRoute = t;
            const n = (e = e || this.resolver).resolveComponentFactory(
                t._futureSnapshot.routeConfig.component
              ),
              r = this.parentContexts.getOrCreateContext(this.name).children,
              s = new Lg(t, r, this.location.injector);
            (this.activated = this.location.createComponent(
              n,
              this.location.length,
              s
            )),
              this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ji(Vg), ji(fa), ji(Ho), Hi("name"), ji(ii));
          }),
          (t.ɵdir = me({
            type: t,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
            },
            exportAs: ["outlet"],
          })),
          t
        );
      })();
      class Lg {
        constructor(t, e, n) {
          (this.route = t), (this.childContexts = e), (this.parent = n);
        }
        get(t, e) {
          return t === Cf
            ? this.route
            : t === Vg
            ? this.childContexts
            : this.parent.get(t, e);
        }
      }
      class Fg {}
      class jg {
        preload(t, e) {
          return bd(null);
        }
      }
      let Hg = (() => {
          class t {
            constructor(t, e, n, r, s) {
              (this.router = t),
                (this.injector = r),
                (this.preloadingStrategy = s),
                (this.loader = new Eg(
                  e,
                  n,
                  (e) => t.triggerEvent(new Sp(e)),
                  (e) => t.triggerEvent(new Ep(e))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  Id((t) => t instanceof mp),
                  ap(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const t = this.injector.get(Kt);
              return this.processRoutes(t, this.router.config);
            }
            ngOnDestroy() {
              this.subscription.unsubscribe();
            }
            processRoutes(t, e) {
              const n = [];
              for (const r of e)
                if (r.loadChildren && !r.canLoad && r._loadedConfig) {
                  const t = r._loadedConfig;
                  n.push(this.processRoutes(t.module, t.routes));
                } else
                  r.loadChildren && !r.canLoad
                    ? n.push(this.preloadConfig(t, r))
                    : r.children && n.push(this.processRoutes(t, r.children));
              return H(n).pipe(
                B(),
                U((t) => {})
              );
            }
            preloadConfig(t, e) {
              return this.preloadingStrategy.preload(e, () =>
                this.loader
                  .load(t.injector, e)
                  .pipe(
                    $(
                      (t) => (
                        (e._loadedConfig = t),
                        this.processRoutes(t.module, t.routes)
                      )
                    )
                  )
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Ig), Wt(ql), Wt(bl), Wt(wi), Wt(Fg));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        $g = (() => {
          class t {
            constructor(t, e, n = {}) {
              (this.router = t),
                (this.viewportScroller = e),
                (this.options = n),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (n.scrollPositionRestoration =
                  n.scrollPositionRestoration || "disabled"),
                (n.anchorScrolling = n.anchorScrolling || "disabled");
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof gp
                  ? ((this.store[this.lastId] =
                      this.viewportScroller.getScrollPosition()),
                    (this.lastSource = t.navigationTrigger),
                    (this.restoredId = t.restoredState
                      ? t.restoredState.navigationId
                      : 0))
                  : t instanceof mp &&
                    ((this.lastId = t.id),
                    this.scheduleScrollEvent(
                      t,
                      this.router.parseUrl(t.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof Ip &&
                  (t.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(t.position)
                    : t.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(t.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(t, e) {
              this.router.triggerEvent(
                new Ip(
                  t,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  e
                )
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (t) {
              $i();
            }),
            (t.ɵdir = me({ type: t })),
            t
          );
        })();
      const zg = new Ut("ROUTER_CONFIGURATION"),
        Gg = new Ut("ROUTER_FORROOT_GUARD"),
        Bg = [
          yc,
          { provide: Xp, useClass: tf },
          {
            provide: Ig,
            useFactory: function (t, e, n, r, s, i, o, a = {}, l, c) {
              const u = new Ig(null, t, e, n, r, s, i, zp(o));
              if (
                (l && (u.urlHandlingStrategy = l),
                c && (u.routeReuseStrategy = c),
                a.errorHandler && (u.errorHandler = a.errorHandler),
                a.malformedUriErrorHandler &&
                  (u.malformedUriErrorHandler = a.malformedUriErrorHandler),
                a.enableTracing)
              ) {
                const t = ec();
                u.events.subscribe((e) => {
                  t.logGroup(`Router Event: ${e.constructor.name}`),
                    t.log(e.toString()),
                    t.log(e),
                    t.logGroupEnd();
                });
              }
              return (
                a.onSameUrlNavigation &&
                  (u.onSameUrlNavigation = a.onSameUrlNavigation),
                a.paramsInheritanceStrategy &&
                  (u.paramsInheritanceStrategy = a.paramsInheritanceStrategy),
                a.urlUpdateStrategy &&
                  (u.urlUpdateStrategy = a.urlUpdateStrategy),
                a.relativeLinkResolution &&
                  (u.relativeLinkResolution = a.relativeLinkResolution),
                u
              );
            },
            deps: [
              Xp,
              Vg,
              yc,
              wi,
              ql,
              bl,
              Sg,
              zg,
              [class {}, new rt()],
              [class {}, new rt()],
            ],
          },
          Vg,
          {
            provide: Cf,
            useFactory: function (t) {
              return t.routerState.root;
            },
            deps: [Ig],
          },
          { provide: ql, useClass: Ql },
          Hg,
          jg,
          class {
            preload(t, e) {
              return e().pipe(Bd(() => bd(null)));
            }
          },
          { provide: zg, useValue: { enableTracing: !1 } },
        ];
      function qg() {
        return new Fl("Router", Ig);
      }
      let Wg = (() => {
        class t {
          constructor(t, e) {}
          static forRoot(e, n) {
            return {
              ngModule: t,
              providers: [
                Bg,
                Kg(e),
                {
                  provide: Gg,
                  useFactory: Yg,
                  deps: [[Ig, new rt(), new it()]],
                },
                { provide: zg, useValue: n || {} },
                {
                  provide: dc,
                  useFactory: Qg,
                  deps: [rc, [new nt(fc), new rt()], zg],
                },
                { provide: $g, useFactory: Zg, deps: [Ig, ou, zg] },
                {
                  provide: Fg,
                  useExisting:
                    n && n.preloadingStrategy ? n.preloadingStrategy : jg,
                },
                { provide: Fl, multi: !0, useFactory: qg },
                [
                  Jg,
                  { provide: nl, multi: !0, useFactory: Xg, deps: [Jg] },
                  { provide: em, useFactory: tm, deps: [Jg] },
                  { provide: cl, multi: !0, useExisting: em },
                ],
              ],
            };
          }
          static forChild(e) {
            return { ngModule: t, providers: [Kg(e)] };
          }
        }
        return (
          (t.ɵmod = fe({ type: t })),
          (t.ɵinj = ut({
            factory: function (e) {
              return new (e || t)(Wt(Gg, 8), Wt(Ig, 8));
            },
          })),
          t
        );
      })();
      function Zg(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new $g(t, e, n);
      }
      function Qg(t, e, n = {}) {
        return n.useHash ? new mc(t, e) : new gc(t, e);
      }
      function Yg(t) {
        if (t)
          throw new Error(
            "RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function Kg(t) {
        return [
          { provide: Ci, multi: !0, useValue: t },
          { provide: Sg, multi: !0, useValue: t },
        ];
      }
      let Jg = (() => {
        class t {
          constructor(t) {
            (this.injector = t),
              (this.initNavigation = !1),
              (this.resultOfPreactivationDone = new E());
          }
          appInitializer() {
            return this.injector.get(ic, Promise.resolve(null)).then(() => {
              let t = null;
              const e = new Promise((e) => (t = e)),
                n = this.injector.get(Ig),
                r = this.injector.get(zg);
              if (this.isLegacyDisabled(r) || this.isLegacyEnabled(r)) t(!0);
              else if ("disabled" === r.initialNavigation)
                n.setUpLocationChangeListener(), t(!0);
              else {
                if ("enabled" !== r.initialNavigation)
                  throw new Error(
                    `Invalid initialNavigation options: '${r.initialNavigation}'`
                  );
                (n.hooks.afterPreactivation = () =>
                  this.initNavigation
                    ? bd(null)
                    : ((this.initNavigation = !0),
                      t(!0),
                      this.resultOfPreactivationDone)),
                  n.initialNavigation();
              }
              return e;
            });
          }
          bootstrapListener(t) {
            const e = this.injector.get(zg),
              n = this.injector.get(Hg),
              r = this.injector.get($g),
              s = this.injector.get(Ig),
              i = this.injector.get(Gl);
            t === i.components[0] &&
              (this.isLegacyEnabled(e)
                ? s.initialNavigation()
                : this.isLegacyDisabled(e) && s.setUpLocationChangeListener(),
              n.setUpPreloading(),
              r.init(),
              s.resetRootComponentType(i.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
          isLegacyEnabled(t) {
            return (
              "legacy_enabled" === t.initialNavigation ||
              !0 === t.initialNavigation ||
              void 0 === t.initialNavigation
            );
          }
          isLegacyDisabled(t) {
            return (
              "legacy_disabled" === t.initialNavigation ||
              !1 === t.initialNavigation
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(wi));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Xg(t) {
        return t.appInitializer.bind(t);
      }
      function tm(t) {
        return t.bootstrapListener.bind(t);
      }
      const em = new Ut("Router Initializer");
      class nm {}
      class rm {}
      class sm {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach((t) => {
                            const e = t.indexOf(":");
                            if (e > 0) {
                              const n = t.slice(0, e),
                                r = n.toLowerCase(),
                                s = t.slice(e + 1).trim();
                              this.maybeSetNormalizedName(n, r),
                                this.headers.has(r)
                                  ? this.headers.get(r).push(s)
                                  : this.headers.set(r, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((e) => {
                            let n = t[e];
                            const r = e.toLowerCase();
                            "string" == typeof n && (n = [n]),
                              n.length > 0 &&
                                (this.headers.set(r, n),
                                this.maybeSetNormalizedName(e, r));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const e = this.headers.get(t.toLowerCase());
          return e && e.length > 0 ? e[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, e) {
          return this.clone({ name: t, value: e, op: "a" });
        }
        set(t, e) {
          return this.clone({ name: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ name: t, value: e, op: "d" });
        }
        maybeSetNormalizedName(t, e) {
          this.normalizedNames.has(e) || this.normalizedNames.set(e, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof sm
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((e) => {
              this.headers.set(e, t.headers.get(e)),
                this.normalizedNames.set(e, t.normalizedNames.get(e));
            });
        }
        clone(t) {
          const e = new sm();
          return (
            (e.lazyInit =
              this.lazyInit && this.lazyInit instanceof sm
                ? this.lazyInit
                : this),
            (e.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            e
          );
        }
        applyUpdate(t) {
          const e = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let n = t.value;
              if (("string" == typeof n && (n = [n]), 0 === n.length)) return;
              this.maybeSetNormalizedName(t.name, e);
              const r = ("a" === t.op ? this.headers.get(e) : void 0) || [];
              r.push(...n), this.headers.set(e, r);
              break;
            case "d":
              const s = t.value;
              if (s) {
                let t = this.headers.get(e);
                if (!t) return;
                (t = t.filter((t) => -1 === s.indexOf(t))),
                  0 === t.length
                    ? (this.headers.delete(e), this.normalizedNames.delete(e))
                    : this.headers.set(e, t);
              } else this.headers.delete(e), this.normalizedNames.delete(e);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((e) =>
              t(this.normalizedNames.get(e), this.headers.get(e))
            );
        }
      }
      class im {
        encodeKey(t) {
          return om(t);
        }
        encodeValue(t) {
          return om(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      function om(t) {
        return encodeURIComponent(t)
          .replace(/%40/gi, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/gi, "$")
          .replace(/%2C/gi, ",")
          .replace(/%3B/gi, ";")
          .replace(/%2B/gi, "+")
          .replace(/%3D/gi, "=")
          .replace(/%3F/gi, "?")
          .replace(/%2F/gi, "/");
      }
      class am {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new im()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function (t, e) {
              const n = new Map();
              return (
                t.length > 0 &&
                  t.split("&").forEach((t) => {
                    const r = t.indexOf("="),
                      [s, i] =
                        -1 == r
                          ? [e.decodeKey(t), ""]
                          : [
                              e.decodeKey(t.slice(0, r)),
                              e.decodeValue(t.slice(r + 1)),
                            ],
                      o = n.get(s) || [];
                    o.push(i), n.set(s, o);
                  }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((e) => {
                  const n = t.fromObject[e];
                  this.map.set(e, Array.isArray(n) ? n : [n]);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const e = this.map.get(t);
          return e ? e[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, e) {
          return this.clone({ param: t, value: e, op: "a" });
        }
        set(t, e) {
          return this.clone({ param: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ param: t, value: e, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const e = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((t) => e + "=" + this.encoder.encodeValue(t))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const e = new am({ encoder: this.encoder });
          return (
            (e.cloneFrom = this.cloneFrom || this),
            (e.updates = (this.updates || []).concat([t])),
            e
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const e =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    e.push(t.value), this.map.set(t.param, e);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let e = this.map.get(t.param) || [];
                      const n = e.indexOf(t.value);
                      -1 !== n && e.splice(n, 1),
                        e.length > 0
                          ? this.map.set(t.param, e)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      function lm(t) {
        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer;
      }
      function cm(t) {
        return "undefined" != typeof Blob && t instanceof Blob;
      }
      function um(t) {
        return "undefined" != typeof FormData && t instanceof FormData;
      }
      class hm {
        constructor(t, e, n, r) {
          let s;
          if (
            ((this.url = e),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function (t) {
              switch (t) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || r
              ? ((this.body = void 0 !== n ? n : null), (s = r))
              : (s = n),
            s &&
              ((this.reportProgress = !!s.reportProgress),
              (this.withCredentials = !!s.withCredentials),
              s.responseType && (this.responseType = s.responseType),
              s.headers && (this.headers = s.headers),
              s.params && (this.params = s.params)),
            this.headers || (this.headers = new sm()),
            this.params)
          ) {
            const t = this.params.toString();
            if (0 === t.length) this.urlWithParams = e;
            else {
              const n = e.indexOf("?");
              this.urlWithParams =
                e + (-1 === n ? "?" : n < e.length - 1 ? "&" : "") + t;
            }
          } else (this.params = new am()), (this.urlWithParams = e);
        }
        serializeBody() {
          return null === this.body
            ? null
            : lm(this.body) ||
              cm(this.body) ||
              um(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof am
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body
            ? null
            : um(this.body)
            ? null
            : cm(this.body)
            ? this.body.type || null
            : lm(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof am
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              Array.isArray(this.body)
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const e = t.method || this.method,
            n = t.url || this.url,
            r = t.responseType || this.responseType,
            s = void 0 !== t.body ? t.body : this.body,
            i =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            o =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let a = t.headers || this.headers,
            l = t.params || this.params;
          return (
            void 0 !== t.setHeaders &&
              (a = Object.keys(t.setHeaders).reduce(
                (e, n) => e.set(n, t.setHeaders[n]),
                a
              )),
            t.setParams &&
              (l = Object.keys(t.setParams).reduce(
                (e, n) => e.set(n, t.setParams[n]),
                l
              )),
            new hm(e, n, s, {
              params: l,
              headers: a,
              reportProgress: o,
              responseType: r,
              withCredentials: i,
            })
          );
        }
      }
      const dm = (function () {
        var t = {
          Sent: 0,
          UploadProgress: 1,
          ResponseHeader: 2,
          DownloadProgress: 3,
          Response: 4,
          User: 5,
        };
        return (
          (t[t.Sent] = "Sent"),
          (t[t.UploadProgress] = "UploadProgress"),
          (t[t.ResponseHeader] = "ResponseHeader"),
          (t[t.DownloadProgress] = "DownloadProgress"),
          (t[t.Response] = "Response"),
          (t[t.User] = "User"),
          t
        );
      })();
      class pm {
        constructor(t, e = 200, n = "OK") {
          (this.headers = t.headers || new sm()),
            (this.status = void 0 !== t.status ? t.status : e),
            (this.statusText = t.statusText || n),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class fm extends pm {
        constructor(t = {}) {
          super(t), (this.type = dm.ResponseHeader);
        }
        clone(t = {}) {
          return new fm({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class gm extends pm {
        constructor(t = {}) {
          super(t),
            (this.type = dm.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new gm({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class mm extends pm {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function ym(t, e) {
        return {
          body: e,
          headers: t.headers,
          observe: t.observe,
          params: t.params,
          reportProgress: t.reportProgress,
          responseType: t.responseType,
          withCredentials: t.withCredentials,
        };
      }
      let vm = (() => {
        class t {
          constructor(t) {
            this.handler = t;
          }
          request(t, e, n = {}) {
            let r;
            if (t instanceof hm) r = t;
            else {
              let s = void 0;
              s = n.headers instanceof sm ? n.headers : new sm(n.headers);
              let i = void 0;
              n.params &&
                (i =
                  n.params instanceof am
                    ? n.params
                    : new am({ fromObject: n.params })),
                (r = new hm(t, e, void 0 !== n.body ? n.body : null, {
                  headers: s,
                  params: i,
                  reportProgress: n.reportProgress,
                  responseType: n.responseType || "json",
                  withCredentials: n.withCredentials,
                }));
            }
            const s = bd(r).pipe(ap((t) => this.handler.handle(t)));
            if (t instanceof hm || "events" === n.observe) return s;
            const i = s.pipe(Id((t) => t instanceof gm));
            switch (n.observe || "body") {
              case "body":
                switch (r.responseType) {
                  case "arraybuffer":
                    return i.pipe(
                      U((t) => {
                        if (null !== t.body && !(t.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return t.body;
                      })
                    );
                  case "blob":
                    return i.pipe(
                      U((t) => {
                        if (null !== t.body && !(t.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return t.body;
                      })
                    );
                  case "text":
                    return i.pipe(
                      U((t) => {
                        if (null !== t.body && "string" != typeof t.body)
                          throw new Error("Response is not a string.");
                        return t.body;
                      })
                    );
                  case "json":
                  default:
                    return i.pipe(U((t) => t.body));
                }
              case "response":
                return i;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${n.observe}}`
                );
            }
          }
          delete(t, e = {}) {
            return this.request("DELETE", t, e);
          }
          get(t, e = {}) {
            return this.request("GET", t, e);
          }
          head(t, e = {}) {
            return this.request("HEAD", t, e);
          }
          jsonp(t, e) {
            return this.request("JSONP", t, {
              params: new am().append(e, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(t, e = {}) {
            return this.request("OPTIONS", t, e);
          }
          patch(t, e, n = {}) {
            return this.request("PATCH", t, ym(n, e));
          }
          post(t, e, n = {}) {
            return this.request("POST", t, ym(n, e));
          }
          put(t, e, n = {}) {
            return this.request("PUT", t, ym(n, e));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(nm));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class _m {
        constructor(t, e) {
          (this.next = t), (this.interceptor = e);
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next);
        }
      }
      const bm = new Ut("HTTP_INTERCEPTORS");
      let wm = (() => {
        class t {
          intercept(t, e) {
            return e.handle(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Cm = /^\)\]\}',?\n/;
      class xm {}
      let Sm = (() => {
          class t {
            constructor() {}
            build() {
              return new XMLHttpRequest();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Em = (() => {
          class t {
            constructor(t) {
              this.xhrFactory = t;
            }
            handle(t) {
              if ("JSONP" === t.method)
                throw new Error(
                  "Attempted to construct Jsonp request without JsonpClientModule installed."
                );
              return new b((e) => {
                const n = this.xhrFactory.build();
                if (
                  (n.open(t.method, t.urlWithParams),
                  t.withCredentials && (n.withCredentials = !0),
                  t.headers.forEach((t, e) =>
                    n.setRequestHeader(t, e.join(","))
                  ),
                  t.headers.has("Accept") ||
                    n.setRequestHeader(
                      "Accept",
                      "application/json, text/plain, */*"
                    ),
                  !t.headers.has("Content-Type"))
                ) {
                  const e = t.detectContentTypeHeader();
                  null !== e && n.setRequestHeader("Content-Type", e);
                }
                if (t.responseType) {
                  const e = t.responseType.toLowerCase();
                  n.responseType = "json" !== e ? e : "text";
                }
                const r = t.serializeBody();
                let s = null;
                const i = () => {
                    if (null !== s) return s;
                    const e = 1223 === n.status ? 204 : n.status,
                      r = n.statusText || "OK",
                      i = new sm(n.getAllResponseHeaders()),
                      o =
                        (function (t) {
                          return "responseURL" in t && t.responseURL
                            ? t.responseURL
                            : /^X-Request-URL:/m.test(t.getAllResponseHeaders())
                            ? t.getResponseHeader("X-Request-URL")
                            : null;
                        })(n) || t.url;
                    return (
                      (s = new fm({
                        headers: i,
                        status: e,
                        statusText: r,
                        url: o,
                      })),
                      s
                    );
                  },
                  o = () => {
                    let { headers: r, status: s, statusText: o, url: a } = i(),
                      l = null;
                    204 !== s &&
                      (l = void 0 === n.response ? n.responseText : n.response),
                      0 === s && (s = l ? 200 : 0);
                    let c = s >= 200 && s < 300;
                    if ("json" === t.responseType && "string" == typeof l) {
                      const t = l;
                      l = l.replace(Cm, "");
                      try {
                        l = "" !== l ? JSON.parse(l) : null;
                      } catch (u) {
                        (l = t), c && ((c = !1), (l = { error: u, text: l }));
                      }
                    }
                    c
                      ? (e.next(
                          new gm({
                            body: l,
                            headers: r,
                            status: s,
                            statusText: o,
                            url: a || void 0,
                          })
                        ),
                        e.complete())
                      : e.error(
                          new mm({
                            error: l,
                            headers: r,
                            status: s,
                            statusText: o,
                            url: a || void 0,
                          })
                        );
                  },
                  a = (t) => {
                    const { url: r } = i(),
                      s = new mm({
                        error: t,
                        status: n.status || 0,
                        statusText: n.statusText || "Unknown Error",
                        url: r || void 0,
                      });
                    e.error(s);
                  };
                let l = !1;
                const c = (r) => {
                    l || (e.next(i()), (l = !0));
                    let s = { type: dm.DownloadProgress, loaded: r.loaded };
                    r.lengthComputable && (s.total = r.total),
                      "text" === t.responseType &&
                        n.responseText &&
                        (s.partialText = n.responseText),
                      e.next(s);
                  },
                  u = (t) => {
                    let n = { type: dm.UploadProgress, loaded: t.loaded };
                    t.lengthComputable && (n.total = t.total), e.next(n);
                  };
                return (
                  n.addEventListener("load", o),
                  n.addEventListener("error", a),
                  t.reportProgress &&
                    (n.addEventListener("progress", c),
                    null !== r &&
                      n.upload &&
                      n.upload.addEventListener("progress", u)),
                  n.send(r),
                  e.next({ type: dm.Sent }),
                  () => {
                    n.removeEventListener("error", a),
                      n.removeEventListener("load", o),
                      t.reportProgress &&
                        (n.removeEventListener("progress", c),
                        null !== r &&
                          n.upload &&
                          n.upload.removeEventListener("progress", u)),
                      n.abort();
                  }
                );
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(xm));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const km = new Ut("XSRF_COOKIE_NAME"),
        Pm = new Ut("XSRF_HEADER_NAME");
      class Om {}
      let Am = (() => {
          class t {
            constructor(t, e, n) {
              (this.doc = t),
                (this.platform = e),
                (this.cookieName = n),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ("server" === this.platform) return null;
              const t = this.doc.cookie || "";
              return (
                t !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = Qc(t, this.cookieName)),
                  (this.lastCookieString = t)),
                this.lastToken
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(nc), Wt(ll), Wt(km));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Im = (() => {
          class t {
            constructor(t, e) {
              (this.tokenService = t), (this.headerName = e);
            }
            intercept(t, e) {
              const n = t.url.toLowerCase();
              if (
                "GET" === t.method ||
                "HEAD" === t.method ||
                n.startsWith("http://") ||
                n.startsWith("https://")
              )
                return e.handle(t);
              const r = this.tokenService.getToken();
              return (
                null === r ||
                  t.headers.has(this.headerName) ||
                  (t = t.clone({ headers: t.headers.set(this.headerName, r) })),
                e.handle(t)
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Om), Wt(Pm));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Tm = (() => {
          class t {
            constructor(t, e) {
              (this.backend = t), (this.injector = e), (this.chain = null);
            }
            handle(t) {
              if (null === this.chain) {
                const t = this.injector.get(bm, []);
                this.chain = t.reduceRight(
                  (t, e) => new _m(t, e),
                  this.backend
                );
              }
              return this.chain.handle(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(rm), Wt(wi));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Mm = (() => {
          class t {
            static disable() {
              return {
                ngModule: t,
                providers: [{ provide: Im, useClass: wm }],
              };
            }
            static withOptions(e = {}) {
              return {
                ngModule: t,
                providers: [
                  e.cookieName ? { provide: km, useValue: e.cookieName } : [],
                  e.headerName ? { provide: Pm, useValue: e.headerName } : [],
                ],
              };
            }
          }
          return (
            (t.ɵmod = fe({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [
                Im,
                { provide: bm, useExisting: Im, multi: !0 },
                { provide: Om, useClass: Am },
                { provide: km, useValue: "XSRF-TOKEN" },
                { provide: Pm, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            t
          );
        })(),
        Dm = (() => {
          class t {}
          return (
            (t.ɵmod = fe({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [
                vm,
                { provide: nm, useClass: Tm },
                Em,
                { provide: rm, useExisting: Em },
                Sm,
                { provide: xm, useExisting: Sm },
              ],
              imports: [
                [
                  Mm.withOptions({
                    cookieName: "XSRF-TOKEN",
                    headerName: "X-XSRF-TOKEN",
                  }),
                ],
              ],
            })),
            t
          );
        })();
      const Rm = "https://zany-periodic-fisherman.glitch.me/api/posts";
      let Nm = (() => {
        class t {
          constructor(t, e) {
            (this.http = t),
              (this.router = e),
              (this.posts = []),
              (this.postsUpdated = new E()),
              (this.err = new wd(null));
          }
          getPostUpdateListener() {
            return this.postsUpdated.asObservable();
          }
          addPost(t, e, n, r) {
            const s = new FormData();
            s.append("title", t),
              s.append("content", e),
              s.append("image", n, t),
              s.append("postDate", r.toString()),
              this.http.post(Rm, s).subscribe((t) => {
                this.err.next(null), this.router.navigate(["/"]);
              });
          }
          getPosts() {
            this.http
              .get(Rm)
              .pipe(
                U((t) =>
                  t.posts.map((t) => ({
                    title: t.title,
                    content: t.content,
                    id: t._id,
                    imagePath: t.imagePath,
                    creator: t.creator,
                    postDate: t.postDate,
                  }))
                )
              )
              .subscribe(
                (t) => {
                  this.err.next(null),
                    (this.posts = t),
                    this.postsUpdated.next([...this.posts]);
                },
                (t) => {
                  this.err.next(t), console.log(t);
                }
              );
          }
          getPost(t) {
            return this.http.get(Rm + "/" + t);
          }
          getMyPost(t) {
            this.http
              .get(Rm + "/mypost")
              .pipe(
                U((t) =>
                  t.posts.map((t) => ({
                    title: t.title,
                    content: t.content,
                    id: t._id,
                    imagePath: t.imagePath,
                    creator: t.creator,
                    postDate: t.postDate,
                  }))
                )
              )
              .subscribe(
                (t) => {
                  this.err.next(null),
                    (this.posts = t),
                    this.postsUpdated.next([...this.posts]);
                },
                (t) => {
                  this.err.next(t), console.log(t);
                }
              );
          }
          updatePost(t, e, n, r) {
            let s;
            "object" == typeof r
              ? ((s = new FormData()),
                s.append("id", t),
                s.append("title", e),
                s.append("content", n),
                s.append("image", r, e))
              : (s = {
                  id: t,
                  title: e,
                  content: n,
                  imagePath: r,
                  creator: null,
                }),
              this.http.put(Rm + "/" + t, s).subscribe(
                (t) => {
                  this.err.next(null), this.router.navigate(["/myposts"]);
                },
                (t) => {
                  this.err.next(t);
                }
              );
          }
          deletePost(t) {
            this.http.delete(Rm + "/" + t).subscribe(
              (e) => {
                this.err.next(null);
                const n = this.posts.filter((e) => e.id !== t);
                (this.posts = n),
                  this.postsUpdated.next([...this.posts]),
                  this.router.navigate(["/"]);
              },
              (t) => {
                console.log(t), this.err.next(t);
              }
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(vm), Wt(Ig));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac, providedIn: "root" })),
          t
        );
      })();
      const Vm = "https://zany-periodic-fisherman.glitch.me/api/profile";
      let Um = (() => {
          class t {
            constructor(t, e) {
              (this.http = t),
                (this.router = e),
                (this.isProfileSet = !1),
                (this.updatedProfile = new E()),
                (this.err = new wd(null));
            }
            getProfileUpdateListener() {
              return this.updatedProfile.asObservable();
            }
            getIsProfile() {
              return this.profile;
            }
            getIsProfileSet() {
              return this.isProfileSet;
            }
            addProfile(t, e, n) {
              const r = new FormData();
              r.append("username", t),
                r.append("bio", e),
                r.append("image", n, t),
                this.http.post(Vm + "/create", r).subscribe(
                  (t) => {
                    this.router.navigate(["/"]), this.err.next(null);
                  },
                  (t) => {
                    this.err.next(t);
                  }
                );
            }
            updateProfile(t, e, n, r) {
              let s;
              "object" == typeof r
                ? ((s = new FormData()),
                  s.append("id", t),
                  s.append("username", e),
                  s.append("bio", n),
                  s.append("image", r, e))
                : (s = {
                    id: t,
                    username: e,
                    bio: n,
                    imagePath: r,
                    creator: null,
                  }),
                this.http.put(Vm + "/edit/" + t, s).subscribe(
                  (t) => {
                    this.err.next(null), this.router.navigate(["/profile"]);
                  },
                  (t) => {
                    console.log(t), this.err.next(t);
                  }
                );
            }
            getProfile() {
              this.http.get(Vm + "/viewprofile").subscribe(
                (t) => {
                  (this.profile = t.profile),
                    (this.isProfileSet = !0),
                    this.updatedProfile.next(t.profile),
                    this.saveProfileData(t.profile);
                },
                (t) => {
                  console.log(t);
                }
              );
            }
            getProfileByCreatorId() {
              return this.http.get(Vm + "/viewprofile");
            }
            getPostUserByCreatorId(t) {
              return this.http.get(Vm + "/bycreator/" + t);
            }
            getAllUsers() {
              return this.http.get(Vm + "/profiles");
            }
            getProfileByUsername(t) {
              return this.http.get(Vm + "/" + t);
            }
            getMyPost(t) {
              return this.http.get(Vm + "/" + t + "/mypost");
            }
            saveProfileData(t) {
              localStorage.setItem("profile", t),
                localStorage.setItem("uname", t.username);
            }
            autogetProfile() {
              localStorage.getItem("profile") && (this.isProfileSet = !0);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(vm), Wt(Ig));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        Lm = (() => {
          class t {
            constructor(t, e, n) {
              (this.http = t),
                (this.router = e),
                (this.profileService = n),
                (this.isAuthenticated = !1),
                (this.authStatusListener = new E()),
                (this.err = new wd(null));
            }
            getToken() {
              return this.token;
            }
            getIsAuth() {
              return this.isAuthenticated;
            }
            getUserId() {
              return this.userId;
            }
            getAuthStatusListener() {
              return this.authStatusListener.asObservable();
            }
            signIn(t, e) {
              this.http
                .post(
                  "https://zany-periodic-fisherman.glitch.me/api/user/login",
                  { email: t, password: e }
                )
                .subscribe(
                  (t) => {
                    this.err.next(null);
                    const e = t.token;
                    if (((this.token = e), e)) {
                      const n = t.expiresIn;
                      this.setAuthTimer(n),
                        (this.isAuthenticated = !0),
                        (this.userId = t.userId),
                        this.authStatusListener.next(!0);
                      const r = new Date(),
                        s = new Date(r.getTime() + 1e3 * n);
                      this.saveAuthData(e, s, this.userId),
                        this.router.navigate(["/"]);
                    }
                  },
                  (t) => {
                    this.err.next(t), console.log(t);
                  }
                );
            }
            createUser(t, e) {
              this.http
                .post(
                  "https://zany-periodic-fisherman.glitch.me/api/user/signup",
                  { email: t, password: e }
                )
                .subscribe(
                  (t) => {
                    this.err.next(null), this.router.navigate(["/"]);
                  },
                  (t) => {
                    this.err.next(t), console.log(t);
                  }
                );
            }
            logout() {
              (this.token = null),
                (this.isAuthenticated = !1),
                this.authStatusListener.next(!1),
                clearTimeout(this.tokenTimer),
                this.clearAuthData(),
                this.router.navigate(["/"]);
            }
            autoAuthUser() {
              const t = this.getAuthData();
              if (!t) return;
              const e = new Date(),
                n = t.expirationDate.getTime() - e.getTime();
              n > 0 &&
                ((this.token = t.token),
                (this.isAuthenticated = !0),
                (this.userId = t.userId),
                this.setAuthTimer(n / 1e3),
                this.authStatusListener.next(!0));
            }
            getAuthData() {
              const t = localStorage.getItem("token"),
                e = localStorage.getItem("expiration"),
                n = localStorage.getItem("userId");
              if (t && e)
                return { token: t, expirationDate: new Date(e), userId: n };
            }
            setAuthTimer(t) {
              this.tokenTimer = setTimeout(() => {
                this.logout();
              }, 1e3 * t);
            }
            saveAuthData(t, e, n) {
              this.profileService.getProfile(),
                localStorage.setItem("token", t),
                localStorage.setItem("expiration", e.toISOString()),
                localStorage.setItem("userId", n);
            }
            clearAuthData() {
              localStorage.removeItem("token"),
                localStorage.removeItem("expiration"),
                localStorage.removeItem("userId"),
                localStorage.removeItem("profile"),
                localStorage.removeItem("uname");
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(vm), Wt(Ig), Wt(Um));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        Fm = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["app-spinner"]],
              decls: 6,
              vars: 0,
              consts: [
                [1, "text-center", "spinner"],
                ["role", "status", 1, "spinner-border"],
                [1, "sr-only"],
              ],
              template: function (t, e) {
                1 & t &&
                  (Bi(0, "div", 0),
                  Bi(1, "div", 1),
                  Bi(2, "span", 2),
                  mo(3, "Loading..."),
                  qi(),
                  qi(),
                  Bi(4, "h4"),
                  mo(5, " Please Wait ..."),
                  qi(),
                  qi());
              },
              styles: [
                ".spinner[_ngcontent-%COMP%]{margin:auto}h4[_ngcontent-%COMP%]{margin-top:20px}",
              ],
            })),
            t
          );
        })();
      function jm(t, e) {
        1 & t &&
          (Bi(0, "div", 12),
          Bi(1, "div", 13),
          Bi(2, "div", 7),
          Bi(3, "h1", 14),
          mo(4, "Tell Your Story to the World"),
          qi(),
          Bi(5, "p"),
          mo(
            6,
            "Join with us! Login or Register. Write your story and share !!"
          ),
          qi(),
          qi(),
          Bi(7, "div", 5),
          Wi(8, "img", 15),
          qi(),
          qi(),
          qi());
      }
      function Hm(t, e) {
        1 & t && (Bi(0, "div", 16), Wi(1, "app-spinner"), qi());
      }
      const $m = function (t) {
        return ["public", t];
      };
      function zm(t, e) {
        if (
          (1 & t &&
            (Bi(0, "small"),
            Bi(1, "a", 21),
            mo(2),
            qi(),
            Bi(3, "span", 27),
            mo(4, " / "),
            qi(),
            mo(5),
            Va(6, "date"),
            qi()),
          2 & t)
        ) {
          const t = no().$implicit,
            e = no().$implicit;
          Rr(1),
            zi("routerLink", Ra(6, $m, t.username)),
            Rr(1),
            vo("by ", t.username, ""),
            Rr(3),
            yo(Ua(6, 3, e.postDate, "short"));
        }
      }
      function Gm(t, e) {
        if (
          (1 & t && (Bi(0, "span", 25), Li(1, zm, 7, 8, "small", 26), qi()),
          2 & t)
        ) {
          const t = e.$implicit,
            n = no().$implicit;
          Rr(1), zi("ngIf", t.creator === n.creator);
        }
      }
      const Bm = function (t) {
        return [t];
      };
      function qm(t, e) {
        if (
          (1 & t &&
            (Bi(0, "div", 17),
            Wi(1, "div", 18),
            Bi(2, "div", 19),
            Bi(3, "h3", 20),
            Bi(4, "a", 21),
            mo(5),
            qi(),
            qi(),
            Bi(6, "div", 22),
            Li(7, Gm, 2, 1, "span", 23),
            qi(),
            Bi(8, "div", 24),
            Bi(9, "p"),
            mo(10),
            Va(11, "slice"),
            Bi(12, "a", 21),
            mo(13),
            qi(),
            qi(),
            qi(),
            qi(),
            qi()),
          2 & t)
        ) {
          const t = e.$implicit,
            n = no();
          Rr(1),
            lo("background-image", "url(" + t.imagePath + ") ", vr),
            Rr(3),
            zi("routerLink", Ra(12, Bm, t.id)),
            Rr(1),
            vo(" ", t.title, ""),
            Rr(2),
            zi("ngForOf", n.postbyUser),
            Rr(3),
            vo("", La(11, 8, t.content, 0, 170), " "),
            Rr(2),
            zi("routerLink", Ra(14, Bm, t.id)),
            Rr(1),
            yo(t.content.length > 170 ? "...Read More" : "");
        }
      }
      function Wm(t, e) {
        if (
          (1 & t &&
            (Bi(0, "li"),
            Bi(1, "a", 28),
            Wi(2, "img", 29),
            Bi(3, "div", 30),
            Bi(4, "span", 31),
            mo(5),
            qi(),
            Bi(6, "span", 32),
            mo(7),
            Va(8, "slice"),
            qi(),
            qi(),
            qi(),
            qi()),
          2 & t)
        ) {
          const t = e.$implicit;
          Rr(1),
            zi("routerLink", Ra(8, $m, t.username)),
            Rr(1),
            ro("src", t.imagePath, yr),
            Rr(3),
            yo(t.username),
            Rr(2),
            yo(La(8, 4, t.bio, 0, 70));
        }
      }
      let Zm = (() => {
        class t {
          constructor(t, e, n) {
            (this.ps = t),
              (this.authService = e),
              (this.profileService = n),
              (this.userIsAuthenticated = !1),
              (this.posts = []),
              (this.user = []),
              (this.postbyUser = []),
              (this.isloading = !1);
          }
          ngOnInit() {
            this.checkAuth(),
              this.getErrors(),
              this.getUsers(),
              (this.isloading = !0),
              (this.userId = this.authService.getUserId()),
              console.log(this.userId),
              this.ps.getPosts(),
              (this.postsSub = this.ps.getPostUpdateListener().subscribe(
                (t) => {
                  (this.isloading = !1),
                    (this.posts = t),
                    this.getPostUserbyCreatorId(this.posts),
                    console.log("posts is", this.posts);
                },
                (t) => {
                  (this.isloading = !1), (this.error = t);
                }
              ));
          }
          getErrors() {
            (this.error = null),
              this.ps.err.subscribe((t) => {
                (this.error = t), (this.isloading = !1);
              });
          }
          checkAuth() {
            (this.userIsAuthenticated = this.authService.getIsAuth()),
              (this.authListenerSubs = this.authService
                .getAuthStatusListener()
                .subscribe((t) => {
                  this.userIsAuthenticated = t;
                }));
          }
          getUsers() {
            this.profileService.getAllUsers().subscribe((t) => {
              this.user = t.profile;
            });
          }
          getPostUserbyCreatorId(t) {
            let e = [];
            for (let r in t) e.push(t[r].creator);
            let n = [...new Set(e)];
            for (let r in n)
              this.profileService
                .getPostUserByCreatorId(n[r])
                .subscribe((t) => {
                  this.postbyUser.push(t.profile);
                });
          }
          ngOnDestroy() {
            this.postsSub.unsubscribe(), this.authListenerSubs.unsubscribe();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ji(Nm), ji(Lm), ji(Um));
          }),
          (t.ɵcmp = ue({
            type: t,
            selectors: [["app-post-list"]],
            decls: 14,
            vars: 4,
            consts: [
              ["class", "container hero", 4, "ngIf"],
              [1, "site-section"],
              [1, "container"],
              [1, "row"],
              [
                "style",
                "text-align: center;",
                "class",
                "loading-text",
                4,
                "ngIf",
              ],
              [1, "col-lg-8"],
              [
                "class",
                "d-block d-md-flex podcast-entry bg-white mb-5 aos-init aos-animate",
                "data-aos",
                "fade-up",
                4,
                "ngFor",
                "ngForOf",
              ],
              [1, "col-lg-4"],
              [1, "featured-user", "mb-5", "mb-lg-0"],
              [1, "mb-4"],
              [1, "list-unstyled"],
              [4, "ngFor", "ngForOf"],
              [1, "container", "hero"],
              [1, "row", "align-items-center", "text-center", "text-md-left"],
              [1, "mb-3", "display-3"],
              ["src", "assets/asset-1.png", "alt", "Image", 1, "img-fluid"],
              [1, "loading-text", 2, "text-align", "center"],
              [
                "data-aos",
                "fade-up",
                1,
                "d-block",
                "d-md-flex",
                "podcast-entry",
                "bg-white",
                "mb-5",
                "aos-init",
                "aos-animate",
              ],
              [1, "image"],
              [1, "text"],
              [1, "font-weight-dark"],
              [3, "routerLink"],
              [1, "text-white", "mb-3"],
              ["class", "text-black-opacity-05", 4, "ngFor", "ngForOf"],
              [1, "desc"],
              [1, "text-black-opacity-05"],
              [4, "ngIf"],
              [1, "sep"],
              [1, "d-flex", "align-items-center", 3, "routerLink"],
              [1, "img-fluid", "mr-2", 3, "src"],
              [1, "podcaster"],
              [1, "d-block"],
              [1, "small"],
            ],
            template: function (t, e) {
              1 & t &&
                (Li(0, jm, 9, 0, "div", 0),
                Wi(1, "hr"),
                Bi(2, "div", 1),
                Bi(3, "div", 2),
                Bi(4, "div", 3),
                Li(5, Hm, 2, 0, "div", 4),
                Bi(6, "div", 5),
                Li(7, qm, 14, 16, "div", 6),
                qi(),
                Bi(8, "div", 7),
                Bi(9, "div", 8),
                Bi(10, "h3", 9),
                mo(11, "Popular Podcaster"),
                qi(),
                Bi(12, "ul", 10),
                Li(13, Wm, 9, 10, "li", 11),
                qi(),
                qi(),
                qi(),
                qi(),
                qi(),
                qi()),
                2 & t &&
                  (zi("ngIf", !e.userIsAuthenticated),
                  Rr(5),
                  zi("ngIf", e.isloading),
                  Rr(2),
                  zi("ngForOf", e.posts),
                  Rr(6),
                  zi("ngForOf", e.user));
            },
            directives: [Xc, Kc, Fm, Mg],
            pipes: [su, ru],
            styles: [
              ".card[_ngcontent-%COMP%], .card-body[_ngcontent-%COMP%]{min-height:150px}.card-body[_ngcontent-%COMP%]{display:flex;flex-wrap:nowrap}.card-body[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{padding:5px}.body-text[_ngcontent-%COMP%]{flex:3}.bg-image[_ngcontent-%COMP%]{flex:1;display:flex;justify-content:flex-end;background-size:100% 100%;background-repeat:no-repeat;background-position:0 0}@media screen and (max-width:551px){.body-text[_ngcontent-%COMP%]{flex:2}}.alert-danger[_ngcontent-%COMP%]{margin:3rem auto;width:50%}.podcast-entry[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]{width:250px;height:auto;background-size:cover;background-position:50%;background-repeat:no-repeat}.podcast-entry[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{width:100%;padding:20px 20px 20px 40px}.featured-user[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:14px;text-transform:uppercase}.featured-user[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:20px;box-shadow:0 5px 40px -10px rgba(0,0,0,.1);border-radius:4px;overflow:hidden;padding:25px 15px}.featured-user[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;color:rgba(0,0,0,.5);text-decoration:none}.featured-user[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:65px;float:left;height:65px;border-radius:50%}@media (min-width:768px){.site-section[_ngcontent-%COMP%]{padding:5em 0}.podcast-entry[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{width:calc(100% - 100px)}}@media screen and (max-width:551px){.hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:40px!important}.podcast-entry[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]{height:250px;width:auto}.podcast-entry[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{padding:25px}}",
            ],
          })),
          t
        );
      })();
      const Qm = (t) => {
        if ("string" == typeof t.value) return bd(null);
        const e = t.value,
          n = new FileReader();
        return b.create((t) => {
          n.addEventListener("loadend", () => {
            const e = new Uint8Array(n.result).subarray(0, 4);
            let r = "",
              s = !1;
            for (let t = 0; t < e.length; t++) r += e[t].toString(16);
            switch (r) {
              case "89504e47":
                s = !0;
                break;
              case "ffd8ffe0":
              case "ffd8ffe1":
              case "ffd8ffe2":
              case "ffd8ffe3":
              case "ffd8ffe8":
                s = !0;
                break;
              default:
                s = !1;
            }
            t.next(s ? null : { invalidMimeType: !0 }), t.complete();
          }),
            n.readAsArrayBuffer(e);
        });
      };
      function Ym(t, e) {
        1 & t && (Bi(0, "div", 12), Wi(1, "app-spinner"), qi());
      }
      function Km(t, e) {
        1 & t && (Bi(0, "span", 13), mo(1, "Please enter a post title."), qi());
      }
      function Jm(t, e) {
        if ((1 & t && (Bi(0, "div", 14), Wi(1, "img", 15), qi()), 2 & t)) {
          const t = no();
          Rr(1), zi("src", t.imagePreview, yr)("alt", t.form.value.title);
        }
      }
      function Xm(t, e) {
        1 & t &&
          (Bi(0, "span", 13), mo(1, "Please Choose a valid image."), qi());
      }
      function ty(t, e) {
        1 & t && (Bi(0, "span", 13), mo(1, "Please enter a post title."), qi());
      }
      let ey = (() => {
        class t {
          constructor(t, e) {
            (this.ps = t),
              (this.route = e),
              (this.isLoading = !1),
              (this.mode = "create");
          }
          ngOnInit() {
            this.route.paramMap.subscribe((t) => {
              t.has("postId")
                ? ((this.mode = "edit"),
                  (this.postId = t.get("postId")),
                  this.getPostById(this.postId))
                : ((this.mode = "create"), (this.postId = null));
            }),
              this.createForm();
          }
          getPostById(t) {
            (this.isLoading = !0),
              this.ps.getPost(t).subscribe((t) => {
                (this.post = {
                  id: t._id,
                  title: t.title,
                  content: t.content,
                  imagePath: t.imagePath,
                  creator: t.creator,
                }),
                  console.log(t),
                  (this.imagePreview = t.imagePath),
                  this.form.setValue({
                    title: this.post.title,
                    content: this.post.content,
                    image: this.post.imagePath,
                  }),
                  (this.isLoading = !1);
              });
          }
          createForm() {
            this.form = new jh({
              title: new Fh(null, {
                validators: [eh.required, eh.minLength(3)],
              }),
              content: new Fh(null, { validators: [eh.required] }),
              image: new Fh(null, {
                validators: [eh.required],
                asyncValidators: [Qm],
              }),
            });
          }
          onImagePicked(t) {
            const e = t.target.files[0];
            this.form.patchValue({ image: e }),
              this.form.get("image").updateValueAndValidity();
            const n = new FileReader();
            (n.onload = () => {
              this.imagePreview = n.result;
            }),
              n.readAsDataURL(e);
          }
          onSavePost() {
            (this.postdate = new Date()),
              console.log(this.postdate),
              this.form.invalid ||
                ((this.isLoading = !0),
                console.log(this.form.value),
                "create" === this.mode
                  ? (console.log("inside"),
                    this.ps.addPost(
                      this.form.value.title,
                      this.form.value.content,
                      this.form.value.image,
                      this.postdate
                    ))
                  : this.ps.updatePost(
                      this.postId,
                      this.form.value.title,
                      this.form.value.content,
                      this.form.value.image
                    ),
                this.form.reset());
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ji(Nm), ji(Cf));
          }),
          (t.ɵcmp = ue({
            type: t,
            selectors: [["app-create-post"]],
            decls: 19,
            vars: 7,
            consts: [
              [1, "container"],
              [
                "style",
                "text-align: center;",
                "class",
                "loading-text",
                4,
                "ngIf",
              ],
              [3, "formGroup", "submit"],
              [1, "form-group"],
              [
                "type",
                "text",
                "formControlName",
                "title",
                "placeholder",
                "Post Title",
                1,
                "form-control",
              ],
              ["class", "text-danger", 4, "ngIf"],
              ["type", "button", 1, "btn", "btn-outline-success", 3, "click"],
              ["type", "file", 1, "form-control", 3, "change"],
              ["filePicker", ""],
              ["class", "image-preview", 4, "ngIf"],
              [
                "rows",
                "4",
                "formControlName",
                "content",
                "placeholder",
                "Post Content",
                1,
                "form-control",
              ],
              ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"],
              [1, "loading-text", 2, "text-align", "center"],
              [1, "text-danger"],
              [1, "image-preview"],
              [3, "src", "alt"],
            ],
            template: function (t, e) {
              if (1 & t) {
                const t = Yi();
                Wi(0, "hr"),
                  Bi(1, "div", 0),
                  Li(2, Ym, 2, 0, "div", 1),
                  Bi(3, "form", 2),
                  Xi("submit", function () {
                    return e.onSavePost();
                  }),
                  Bi(4, "div", 3),
                  Wi(5, "input", 4),
                  Li(6, Km, 2, 0, "span", 5),
                  qi(),
                  Bi(7, "div", 3),
                  Bi(8, "button", 6),
                  Xi("click", function () {
                    return qe(t), Fi(11).click();
                  }),
                  mo(9, " Pick Image "),
                  qi(),
                  Bi(10, "input", 7, 8),
                  Xi("change", function (t) {
                    return e.onImagePicked(t);
                  }),
                  qi(),
                  Li(12, Jm, 2, 2, "div", 9),
                  Li(13, Xm, 2, 0, "span", 5),
                  qi(),
                  Bi(14, "div", 3),
                  Wi(15, "textarea", 10),
                  Li(16, ty, 2, 0, "span", 5),
                  qi(),
                  Bi(17, "button", 11),
                  mo(18, " Save Post "),
                  qi(),
                  qi(),
                  qi();
              }
              2 & t &&
                (Rr(2),
                zi("ngIf", e.isLoading),
                Rr(1),
                zi("formGroup", e.form),
                Rr(3),
                zi(
                  "ngIf",
                  e.form.get("title").invalid && e.form.get("title").touched
                ),
                Rr(6),
                zi(
                  "ngIf",
                  "" !== e.imagePreview &&
                    e.imagePreview &&
                    e.form.get("image").valid
                ),
                Rr(1),
                zi(
                  "ngIf",
                  e.form.get("image").invalid && e.form.dirty && e.form.touched
                ),
                Rr(3),
                zi(
                  "ngIf",
                  e.form.get("content").invalid && e.form.get("content").touched
                ),
                Rr(1),
                zi("disabled", e.form.invalid));
            },
            directives: [Xc, Xh, Yu, nd, $u, Qu, cd, Fm],
            styles: [
              "textarea[_ngcontent-%COMP%]{width:100%}input[type=file][_ngcontent-%COMP%]{visibility:hidden;position:absolute;left:0}.image-preview[_ngcontent-%COMP%]{height:8rem;margin:1rem 0}.image-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%}form[_ngcontent-%COMP%]{width:70%;margin:3rem auto}",
            ],
          })),
          t
        );
      })();
      function ny(t, e) {
        if (
          (1 & t && (Bi(0, "div", 6), Bi(1, "p"), mo(2), qi(), qi()), 2 & t)
        ) {
          const t = no();
          Rr(2), _o("", t.error.status, " - ", t.error.error.message, "");
        }
      }
      function ry(t, e) {
        1 & t && (Bi(0, "div", 7), Wi(1, "app-spinner"), qi());
      }
      const sy = function (t) {
        return ["../edit", t];
      };
      function iy(t, e) {
        if (1 & t) {
          const t = Yi();
          Bi(0, "div", 8),
            Bi(1, "div", 9),
            Bi(2, "a", 10),
            mo(3, " Edit Post "),
            qi(),
            Bi(4, "a", 11),
            mo(5, "Delete Post"),
            qi(),
            qi(),
            Bi(6, "div", 12),
            Bi(7, "div", 13),
            Bi(8, "div", 14),
            Bi(9, "div", 15),
            Bi(10, "h5", 16),
            mo(11, "Delete Confirmation Box"),
            qi(),
            Bi(12, "button", 17),
            Bi(13, "span", 18),
            mo(14, "\xd7"),
            qi(),
            qi(),
            qi(),
            Bi(15, "div", 19),
            mo(
              16,
              " Please click on Ok button to Delete the post permanently "
            ),
            qi(),
            Bi(17, "div", 20),
            Bi(18, "button", 21),
            mo(19, "Cancel"),
            qi(),
            Bi(20, "button", 22),
            Xi("click", function () {
              qe(t);
              const e = no();
              return e.OnDelete(e.postId);
            }),
            mo(21, "Confirm"),
            qi(),
            qi(),
            qi(),
            qi(),
            qi(),
            qi();
        }
        if (2 & t) {
          const t = no();
          Rr(2), zi("routerLink", Ra(1, sy, t.postId));
        }
      }
      function oy(t, e) {
        if (
          (1 & t &&
            (Bi(0, "div", 23),
            Bi(1, "div", 24),
            Bi(2, "h1"),
            mo(3),
            qi(),
            Bi(4, "div", 25),
            Wi(5, "img", 26),
            qi(),
            Wi(6, "hr"),
            Bi(7, "p"),
            mo(8),
            qi(),
            qi(),
            qi()),
          2 & t)
        ) {
          const t = no();
          Rr(3),
            yo(t.post.title),
            Rr(2),
            ro("src", t.post.imagePath, yr),
            Rr(3),
            yo(t.post.content);
        }
      }
      let ay = (() => {
        class t {
          constructor(t, e, n, r) {
            (this.postsService = t),
              (this.route = e),
              (this.router = n),
              (this.authService = r),
              (this.isloading = !1);
          }
          ngOnInit() {
            (this.url = this.router.url.split("/")[1]),
              this.authData(),
              this.getErrors(),
              this.route.paramMap.subscribe((t) => {
                t.has("postId") &&
                  ((this.postId = t.get("postId")),
                  this.getPostById(this.postId));
              });
          }
          authData() {
            (this.isAuth = this.authService.getIsAuth()),
              (this.userId = this.authService.getUserId()),
              (this.authStatusSub = this.authService
                .getAuthStatusListener()
                .subscribe((t) => {
                  (this.userIsAuthenticated = t),
                    (this.userId = this.authService.getUserId());
                }));
          }
          getErrors() {
            (this.error = null),
              this.postsService.err.subscribe((t) => {
                (this.error = t), (this.isloading = !1);
              });
          }
          getPostById(t) {
            (this.isloading = !0),
              this.postsService.getPost(this.postId).subscribe((t) => {
                console.log(t),
                  (this.post = {
                    id: t._id,
                    title: t.title,
                    content: t.content,
                    imagePath: t.imagePath,
                    creator: t.creator,
                  }),
                  (this.isloading = !1);
              });
          }
          OnDelete(t) {
            this.postsService.deletePost(t);
          }
          ngOnDestroy() {
            this.authStatusSub.unsubscribe();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ji(Nm), ji(Cf), ji(Ig), ji(Lm));
          }),
          (t.ɵcmp = ue({
            type: t,
            selectors: [["app-post-detail"]],
            decls: 6,
            vars: 4,
            consts: [
              [1, "container"],
              ["class", "alert alert-danger", 4, "ngIf"],
              [
                "style",
                "text-align: center;",
                "class",
                "loading-text",
                4,
                "ngIf",
              ],
              [1, "row"],
              ["class", "col-md-3 col-xs-12", 4, "ngIf"],
              ["class", "col-md-9 main", 4, "ngIf"],
              [1, "alert", "alert-danger"],
              [1, "loading-text", 2, "text-align", "center"],
              [1, "col-md-3", "col-xs-12"],
              [1, "list-group"],
              [1, "list-group-item", "list-group-item-action", 3, "routerLink"],
              [
                "data-toggle",
                "modal",
                "data-target",
                "#exampleModal",
                1,
                "list-group-item",
                "list-group-item-action",
              ],
              [
                "id",
                "exampleModal",
                "tabindex",
                "-1",
                "role",
                "dialog",
                "aria-labelledby",
                "exampleModalLabel",
                "aria-hidden",
                "true",
                1,
                "modal",
                "fade",
              ],
              ["role", "document", 1, "modal-dialog"],
              [1, "modal-content"],
              [1, "modal-header"],
              ["id", "exampleModalLabel", 1, "modal-title"],
              [
                "type",
                "button",
                "data-dismiss",
                "modal",
                "aria-label",
                "Close",
                1,
                "close",
              ],
              ["aria-hidden", "true"],
              [1, "modal-body"],
              [1, "modal-footer"],
              [
                "type",
                "button",
                "data-dismiss",
                "modal",
                1,
                "btn",
                "btn-secondary",
              ],
              [
                "type",
                "button",
                "data-dismiss",
                "modal",
                1,
                "btn",
                "btn-primary",
                3,
                "click",
              ],
              [1, "col-md-9", "main"],
              [1, "card-body"],
              [1, "img"],
              ["alt", "", 1, "img-responsive", "center", 3, "src"],
            ],
            template: function (t, e) {
              1 & t &&
                (Bi(0, "div", 0),
                Li(1, ny, 3, 2, "div", 1),
                Li(2, ry, 2, 0, "div", 2),
                Bi(3, "div", 3),
                Li(4, iy, 22, 3, "div", 4),
                Li(5, oy, 9, 3, "div", 5),
                qi(),
                qi()),
                2 & t &&
                  (Rr(1),
                  zi("ngIf", e.error),
                  Rr(1),
                  zi("ngIf", e.isloading),
                  Rr(2),
                  zi("ngIf", e.isAuth && "myposts" == e.url),
                  Rr(1),
                  zi("ngIf", e.post));
            },
            directives: [Xc, Fm, Mg],
            styles: [
              ".img[_ngcontent-%COMP%]{text-align:center;margin:3rem auto}.img-responsive[_ngcontent-%COMP%]{width:80%}.main[_ngcontent-%COMP%]{margin:0 auto}",
            ],
          })),
          t
        );
      })();
      function ly(t, e) {
        if (
          (1 & t && (Bi(0, "div", 6), Bi(1, "p"), mo(2), qi(), qi()), 2 & t)
        ) {
          const t = no();
          Rr(2), _o("", t.error.status, " - ", t.error.error.message, "");
        }
      }
      function cy(t, e) {
        1 & t && (Bi(0, "div", 7), Wi(1, "app-spinner"), qi());
      }
      const uy = function () {
        return ["/reset-password"];
      };
      function hy(t, e) {
        if (1 & t) {
          const t = Yi();
          Bi(0, "form", 8, 9),
            Xi("ngSubmit", function () {
              qe(t);
              const e = Fi(1);
              return no().onSubmit(e);
            }),
            Bi(2, "div", 10),
            Bi(3, "label", 11),
            mo(4, "E-Mail"),
            qi(),
            Wi(5, "input", 12),
            qi(),
            Bi(6, "div", 10),
            Bi(7, "label", 13),
            mo(8, "Password"),
            qi(),
            Wi(9, "input", 14),
            qi(),
            Bi(10, "div", 10),
            Bi(11, "button", 15),
            mo(12),
            qi(),
            mo(13, " | "),
            Bi(14, "button", 16),
            Xi("click", function () {
              return qe(t), no().onSwitchMode();
            }),
            mo(15),
            qi(),
            Bi(16, "a", 17),
            mo(17, "Forget Password"),
            qi(),
            qi(),
            qi();
        }
        if (2 & t) {
          const t = Fi(1),
            e = no();
          Rr(11),
            zi("disabled", !t.valid),
            Rr(1),
            vo(" ", e.isLoginMode ? "Login" : "Sign Up", " "),
            Rr(3),
            vo(" Switch to ", e.isLoginMode ? "Sign Up" : "Login", " "),
            Rr(1),
            zi("routerLink", Da(4, uy));
        }
      }
      let dy = (() => {
          class t {
            constructor(t) {
              (this.authService = t),
                (this.isLoginMode = !0),
                (this.isLoading = !1),
                (this.error = null);
            }
            ngOnInit() {
              (this.error = null),
                this.authService.err.subscribe((t) => {
                  (this.error = t), (this.isLoading = !1);
                });
            }
            onSwitchMode() {
              this.isLoginMode = !this.isLoginMode;
            }
            onSubmit(t) {
              if (((this.isLoading = !0), !t.valid)) return;
              const e = t.value.email,
                n = t.value.password;
              this.isLoginMode
                ? (this.authService.signIn(e, n), t.reset())
                : (this.authService.createUser(e, n), t.reset());
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ji(Lm));
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["app-login"]],
              decls: 6,
              vars: 3,
              consts: [
                [1, "container"],
                [1, "row"],
                [1, "col-xs-12", "col-md-6", "col-md-offset-3"],
                ["class", "alert alert-danger", 4, "ngIf"],
                [
                  "style",
                  "text-align: center;",
                  "class",
                  "loading-text",
                  4,
                  "ngIf",
                ],
                [3, "ngSubmit", 4, "ngIf"],
                [1, "alert", "alert-danger"],
                [1, "loading-text", 2, "text-align", "center"],
                [3, "ngSubmit"],
                ["authForm", "ngForm"],
                [1, "form-group"],
                ["for", "email"],
                [
                  "type",
                  "email",
                  "id",
                  "email",
                  "ngModel",
                  "",
                  "name",
                  "email",
                  "required",
                  "",
                  "email",
                  "",
                  1,
                  "form-control",
                ],
                ["for", "password"],
                [
                  "type",
                  "password",
                  "id",
                  "password",
                  "ngModel",
                  "",
                  "name",
                  "password",
                  "required",
                  "",
                  "minlength",
                  "6",
                  1,
                  "form-control",
                ],
                ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"],
                ["type", "button", 1, "btn", "btn-primary", 3, "click"],
                [1, "btn", "btn-link", 3, "routerLink"],
              ],
              template: function (t, e) {
                1 & t &&
                  (Bi(0, "div", 0),
                  Bi(1, "div", 1),
                  Bi(2, "div", 2),
                  Li(3, ly, 3, 2, "div", 3),
                  Li(4, cy, 2, 0, "div", 4),
                  Li(5, hy, 18, 5, "form", 5),
                  qi(),
                  qi(),
                  qi()),
                  2 & t &&
                    (Rr(3),
                    zi("ngIf", e.error),
                    Rr(1),
                    zi("ngIf", e.isLoading),
                    Rr(1),
                    zi("ngIf", !e.isLoading));
              },
              directives: [Xc, Fm, Xh, Yu, Gh, $u, Qu, Jh, hd, pd, gd, Mg],
              styles: [".col-md-offset-3[_ngcontent-%COMP%]{margin:3rem auto}"],
            })),
            t
          );
        })(),
        py = (() => {
          class t {
            constructor(t, e) {
              (this.authService = t), (this.router = e);
            }
            canActivate(t, e) {
              const n = this.authService.getIsAuth();
              return n || this.router.navigate(["/login"]), n;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Lm), Wt(Ig));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      function fy(t, e) {
        if (
          (1 & t && (Bi(0, "div", 9), Bi(1, "p"), mo(2), qi(), qi()), 2 & t)
        ) {
          const t = no();
          Rr(2), _o("", t.error.status, " - ", t.error.error.message, "");
        }
      }
      function gy(t, e) {
        if (
          (1 & t && (Bi(0, "div", 9), Bi(1, "p"), mo(2), qi(), qi()), 2 & t)
        ) {
          const t = no();
          Rr(2), _o("", t.error.status, " - ", t.error.statusText, "");
        }
      }
      function my(t, e) {
        1 & t && (Bi(0, "div", 10), Wi(1, "app-spinner"), qi());
      }
      const yy = function (t) {
        return ["../public", t];
      };
      function vy(t, e) {
        if (
          (1 & t &&
            (Bi(0, "small"),
            Bi(1, "a", 17),
            mo(2),
            qi(),
            Bi(3, "span", 22),
            mo(4, " / "),
            qi(),
            mo(5),
            Va(6, "date"),
            qi()),
          2 & t)
        ) {
          const t = no().$implicit,
            e = no().$implicit;
          Rr(1),
            zi("routerLink", Ra(6, yy, t.username)),
            Rr(1),
            vo("by ", t.username, ""),
            Rr(3),
            yo(Ua(6, 3, e.postDate, "short"));
        }
      }
      function _y(t, e) {
        if (
          (1 & t && (Bi(0, "span", 21), Li(1, vy, 7, 8, "small", 8), qi()),
          2 & t)
        ) {
          const t = e.$implicit,
            n = no().$implicit;
          Rr(1), zi("ngIf", t.creator === n.creator);
        }
      }
      const by = function (t) {
        return [t];
      };
      function wy(t, e) {
        if (
          (1 & t &&
            (Bi(0, "div", 12),
            Bi(1, "div", 13),
            Wi(2, "div", 14),
            Bi(3, "div", 15),
            Bi(4, "h3", 16),
            Bi(5, "a", 17),
            mo(6),
            qi(),
            qi(),
            Bi(7, "div", 18),
            Li(8, _y, 2, 1, "span", 19),
            qi(),
            Bi(9, "p", 20),
            mo(10),
            qi(),
            qi(),
            qi(),
            qi()),
          2 & t)
        ) {
          const t = e.$implicit,
            n = no(2);
          Rr(2),
            lo("background-image", "url(" + t.imagePath + ") ", vr),
            Rr(3),
            zi("routerLink", Ra(6, by, t.id)),
            Rr(1),
            yo(t.title),
            Rr(2),
            zi("ngForOf", n.postbyUser),
            Rr(2),
            vo("", t.content, " ");
        }
      }
      function Cy(t, e) {
        if ((1 & t && (Zi(0), Li(1, wy, 11, 8, "div", 11), Qi()), 2 & t)) {
          const t = no();
          Rr(1), zi("ngForOf", t.posts);
        }
      }
      function xy(t, e) {
        1 & t &&
          (Bi(0, "div", 10), Bi(1, "h2"), mo(2, "No Posts Found"), qi(), qi());
      }
      let Sy = (() => {
        class t {
          constructor(t, e, n) {
            (this.ps = t),
              (this.authService = e),
              (this.profileService = n),
              (this.posts = []),
              (this.postbyUser = []),
              (this.isloading = !1);
          }
          ngOnInit() {
            this.getErrors(),
              (this.isloading = !0),
              this.getMyPost(),
              (this.postsSub = this.ps.getPostUpdateListener().subscribe(
                (t) => {
                  this.getPostUserbyCreatorId(t),
                    (this.isloading = !1),
                    (this.posts = t),
                    console.log("posts is", this.posts);
                },
                (t) => {
                  (this.isloading = !1), (this.error = t);
                }
              ));
          }
          getPostUserbyCreatorId(t) {
            let e = [];
            for (let r in t) e.push(t[r].creator);
            let n = [...new Set(e)];
            for (let r in n)
              this.profileService
                .getPostUserByCreatorId(n[r])
                .subscribe((t) => {
                  this.postbyUser.push(t.profile);
                });
          }
          getErrors() {
            (this.error = null),
              this.ps.err.subscribe((t) => {
                (this.error = t), (this.isloading = !1);
              });
          }
          getMyPost() {
            this.ps.getMyPost(this.userId);
          }
          ngOnDestroy() {
            this.postsSub.unsubscribe();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ji(Nm), ji(Lm), ji(Um));
          }),
          (t.ɵcmp = ue({
            type: t,
            selectors: [["app-myposts"]],
            decls: 12,
            vars: 5,
            consts: [
              [1, "site-section", "bg-light"],
              [1, "container"],
              [1, "row", "mb-5"],
              [1, "col-md-12", "text-center"],
              [1, "font-weight-bold", "text-black"],
              [1, "row"],
              ["class", "alert alert-danger", 4, "ngIf"],
              [
                "style",
                "text-align: center;",
                "class",
                "loading-text",
                4,
                "ngIf",
              ],
              [4, "ngIf"],
              [1, "alert", "alert-danger"],
              [1, "loading-text", 2, "text-align", "center"],
              ["class", "col-md-6", 4, "ngFor", "ngForOf"],
              [1, "col-md-6"],
              [
                "data-aos",
                "fade-up",
                1,
                "d-block",
                "podcast-entry",
                "bg-white",
                "mb-5",
                "aos-init",
                "aos-animate",
              ],
              [1, "image", "w-100"],
              [1, "text", "w-100"],
              [1, ""],
              [3, "routerLink"],
              [1, "text-white", "mb-3"],
              ["class", "text-black-opacity-05", 4, "ngFor", "ngForOf"],
              [1, "mb-4"],
              [1, "text-black-opacity-05"],
              [1, "sep"],
            ],
            template: function (t, e) {
              1 & t &&
                (Bi(0, "div", 0),
                Bi(1, "div", 1),
                Bi(2, "div", 2),
                Bi(3, "div", 3),
                Bi(4, "h2", 4),
                mo(5, "My Posts"),
                qi(),
                qi(),
                qi(),
                Bi(6, "div", 5),
                Li(7, fy, 3, 2, "div", 6),
                Li(8, gy, 3, 2, "div", 6),
                Li(9, my, 2, 0, "div", 7),
                Li(10, Cy, 2, 1, "ng-container", 8),
                Li(11, xy, 3, 0, "div", 7),
                qi(),
                qi(),
                qi()),
                2 & t &&
                  (Rr(7),
                  zi("ngIf", e.error && e.error.error.message),
                  Rr(1),
                  zi("ngIf", e.error && !e.error.error.message),
                  Rr(1),
                  zi("ngIf", e.isloading),
                  Rr(1),
                  zi("ngIf", e.posts.length > 0),
                  Rr(1),
                  zi("ngIf", 0 == e.posts.length && !e.isloading));
            },
            directives: [Xc, Fm, Kc, Mg],
            pipes: [ru],
            styles: [
              ".bg-light[_ngcontent-%COMP%]{background:#ccc}.site-section[_ngcontent-%COMP%]{padding:2.5em 0}.podcast-entry[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]{height:300px;background-size:cover;background-position:50%;background-repeat:no-repeat}.podcast-entry[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{width:100%;height:250px;padding:40px 40px 20px}.text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}@media (min-width:768px){.site-section[_ngcontent-%COMP%]{padding:5em 0}}@media screen and (max-width:551px){.podcast-entry[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{height:225px;padding:25px}.body-text[_ngcontent-%COMP%]{flex:2}}.alert-danger[_ngcontent-%COMP%]{margin:3rem auto;width:50%}",
            ],
          })),
          t
        );
      })();
      function Ey(t, e) {
        1 & t && (Bi(0, "div", 13), Wi(1, "app-spinner"), qi());
      }
      function ky(t, e) {
        if ((1 & t && (Bi(0, "span", 14), mo(1), qi()), 2 & t)) {
          const t = no(2);
          Rr(1), vo(" ", t.error, "");
        }
      }
      function Py(t, e) {
        if ((1 & t && (Zi(0), Li(1, ky, 2, 1, "span", 6), Qi()), 2 & t)) {
          const t = no();
          Rr(1),
            zi(
              "ngIf",
              t.form.get("username") &&
                (t.form.get("username").dirty || t.form.get("username").touched)
            );
        }
      }
      function Oy(t, e) {
        1 & t && (Bi(0, "span", 14), mo(1, "Please enter a post title."), qi());
      }
      function Ay(t, e) {
        if ((1 & t && (Bi(0, "div", 15), Wi(1, "img", 16), qi()), 2 & t)) {
          const t = no();
          Rr(1), zi("src", t.imagePreview, yr)("alt", t.form.value.title);
        }
      }
      function Iy(t, e) {
        1 & t &&
          (Bi(0, "span", 14), mo(1, "Please Choose a valid image."), qi());
      }
      function Ty(t, e) {
        1 & t && (Bi(0, "span", 14), mo(1, "Please enter a Bio"), qi());
      }
      let My = (() => {
        class t {
          constructor(t, e, n) {
            (this.profileService = t),
              (this.router = e),
              (this.route = n),
              (this.isLoading = !0),
              (this.mode = "create");
          }
          ngOnInit() {
            this.route.paramMap.subscribe((t) => {
              t.has("profileId")
                ? ((this.mode = "edit"),
                  (this.uname = t.get("profileId")),
                  this.getProfileById(this.uname))
                : ((this.mode = "create"), (this.uname = null));
            }),
              this.createForm(),
              this.checkProfileExist();
          }
          getProfileById(t) {
            (this.isLoading = !0),
              this.profileService.getProfileByUsername(t).subscribe((t) => {
                (this.isLoading = !1),
                  (this.post = {
                    id: t.profile._id,
                    username: t.profile.username,
                    bio: t.profile.bio,
                    imagePath: t.profile.imagePath,
                    creator: t.profile.creator,
                  }),
                  (this.profileId = t.profile._id),
                  console.log(this.profileId),
                  (this.imagePreview = t.profile.imagePath),
                  this.form.setValue({
                    username: this.post.username,
                    bio: this.post.bio,
                    image: this.post.imagePath,
                  });
              });
          }
          checkProfileExist() {
            this.profileService.getProfileByCreatorId().subscribe((t) => {
              if ((console.log(t), t.profile)) {
                let e = t.profile.username;
                "create" == this.mode && this.router.navigate(["/profile", e]);
              }
            });
          }
          createForm() {
            this.form = new jh({
              username: new Fh(null, {
                validators: [eh.required, eh.minLength(3)],
              }),
              bio: new Fh(null, { validators: [eh.required] }),
              image: new Fh(null, {
                validators: [eh.required],
                asyncValidators: [Qm],
              }),
            });
          }
          onImagePicked(t) {
            const e = t.target.files[0];
            this.form.patchValue({ image: e }),
              this.form.get("image").updateValueAndValidity();
            const n = new FileReader();
            (n.onload = () => {
              this.imagePreview = n.result;
            }),
              n.readAsDataURL(e);
          }
          onSavePost() {
            this.form.invalid ||
              ((this.isLoading = !0),
              "create" === this.mode
                ? (console.log("inside"),
                  this.profileService.addProfile(
                    this.form.value.username,
                    this.form.value.bio,
                    this.form.value.image
                  ))
                : (console.log(this.form.value),
                  this.profileService.updateProfile(
                    this.profileId,
                    this.form.value.username,
                    this.form.value.bio,
                    this.form.value.image
                  )),
              this.form.reset());
          }
          clearError() {
            this.error = "";
          }
          checkUsername(t) {
            this.profileService.getProfileByUsername(t).subscribe((e) => {
              e &&
                t !== this.uname &&
                ((this.error = "Username is already taken!"),
                console.log(this.error));
            });
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ji(Um), ji(Ig), ji(Cf));
          }),
          (t.ɵcmp = ue({
            type: t,
            selectors: [["app-create-profile"]],
            decls: 19,
            vars: 8,
            consts: [
              [1, "container"],
              [
                "style",
                "text-align: center;",
                "class",
                "loading-text",
                4,
                "ngIf",
              ],
              [3, "formGroup", "submit"],
              [1, "form-group"],
              [
                "type",
                "text",
                "formControlName",
                "username",
                "placeholder",
                "Username",
                1,
                "form-control",
                3,
                "focus",
                "blur",
              ],
              [4, "ngIf"],
              ["class", "text-danger", 4, "ngIf"],
              ["type", "button", 1, "btn", "btn-outline-success", 3, "click"],
              ["type", "file", 1, "form-control", 3, "change"],
              ["filePicker", ""],
              ["class", "image-preview", 4, "ngIf"],
              [
                "rows",
                "4",
                "formControlName",
                "bio",
                "placeholder",
                "Your short Bio",
                1,
                "form-control",
              ],
              ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"],
              [1, "loading-text", 2, "text-align", "center"],
              [1, "text-danger"],
              [1, "image-preview"],
              [3, "src", "alt"],
            ],
            template: function (t, e) {
              if (1 & t) {
                const t = Yi();
                Bi(0, "div", 0),
                  Li(1, Ey, 2, 0, "div", 1),
                  Bi(2, "form", 2),
                  Xi("submit", function () {
                    return e.onSavePost();
                  }),
                  Bi(3, "div", 3),
                  Bi(4, "input", 4),
                  Xi("focus", function () {
                    return e.clearError();
                  })("blur", function (t) {
                    return e.checkUsername(t.target.value);
                  }),
                  qi(),
                  Li(5, Py, 2, 1, "ng-container", 5),
                  Li(6, Oy, 2, 0, "span", 6),
                  qi(),
                  Bi(7, "div", 3),
                  Bi(8, "button", 7),
                  Xi("click", function () {
                    return qe(t), Fi(11).click();
                  }),
                  mo(9, " Pick Image "),
                  qi(),
                  Bi(10, "input", 8, 9),
                  Xi("change", function (t) {
                    return e.onImagePicked(t);
                  }),
                  qi(),
                  Li(12, Ay, 2, 2, "div", 10),
                  Li(13, Iy, 2, 0, "span", 6),
                  qi(),
                  Bi(14, "div", 3),
                  Wi(15, "textarea", 11),
                  Li(16, Ty, 2, 0, "span", 6),
                  qi(),
                  Bi(17, "button", 12),
                  mo(18, " Save Post "),
                  qi(),
                  qi(),
                  qi();
              }
              2 & t &&
                (Rr(1),
                zi("ngIf", e.isLoading),
                Rr(1),
                zi("formGroup", e.form),
                Rr(3),
                zi("ngIf", e.error),
                Rr(1),
                zi(
                  "ngIf",
                  e.form.get("username").invalid &&
                    e.form.get("username").touched
                ),
                Rr(6),
                zi(
                  "ngIf",
                  "" !== e.imagePreview &&
                    e.imagePreview &&
                    e.form.get("image").valid
                ),
                Rr(1),
                zi(
                  "ngIf",
                  e.form.get("image").invalid && e.form.dirty && e.form.touched
                ),
                Rr(3),
                zi(
                  "ngIf",
                  e.form.get("bio").invalid && e.form.get("bio").touched
                ),
                Rr(1),
                zi("disabled", e.form.invalid || e.error));
            },
            directives: [Xc, Xh, Yu, nd, $u, Qu, cd, Fm],
            styles: [
              "textarea[_ngcontent-%COMP%]{width:100%}input[type=file][_ngcontent-%COMP%]{visibility:hidden;position:absolute;left:0}.image-preview[_ngcontent-%COMP%]{height:8rem;margin:1rem 0}.image-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%}form[_ngcontent-%COMP%]{width:70%;margin:3rem auto}",
            ],
          })),
          t
        );
      })();
      function Dy(t, e) {
        1 & t && (Bi(0, "div", 7), Wi(1, "app-spinner"), qi());
      }
      const Ry = function (t) {
        return ["../edit", t];
      };
      function Ny(t, e) {
        if ((1 & t && (Bi(0, "a", 14), mo(1, "Edit Profile"), qi()), 2 & t)) {
          const t = no(2);
          zi("routerLink", Ra(1, Ry, t.profileId));
        }
      }
      function Vy(t, e) {
        if (
          (1 & t &&
            (Bi(0, "div", 8),
            Bi(1, "div", 9),
            Bi(2, "h2", 10),
            mo(3),
            qi(),
            Li(4, Ny, 2, 3, "a", 11),
            Bi(5, "p"),
            mo(6),
            qi(),
            qi(),
            Bi(7, "div", 12),
            Wi(8, "img", 13),
            qi(),
            qi()),
          2 & t)
        ) {
          const t = no();
          Rr(3),
            yo(t.profile.username),
            Rr(1),
            zi("ngIf", t.userId === t.profile.creator && "profile" == t.url),
            Rr(2),
            yo(t.profile.bio),
            Rr(2),
            ro("src", t.profile.imagePath, yr);
        }
      }
      function Uy(t, e) {
        if ((1 & t && (Bi(0, "h2", 15), mo(1), qi()), 2 & t)) {
          const t = no();
          Rr(1), vo("", t.profile.username, "'s Posts");
        }
      }
      function Ly(t, e) {
        1 & t && (Bi(0, "div", 7), Wi(1, "app-spinner"), qi());
      }
      const Fy = function (t) {
        return ["../../myposts", t];
      };
      function jy(t, e) {
        if ((1 & t && (Bi(0, "a", 14), mo(1), qi()), 2 & t)) {
          const t = no().$implicit;
          zi("routerLink", Ra(2, Fy, t.id)), Rr(1), vo(" ", t.title, "");
        }
      }
      const Hy = function (t) {
        return ["posts", t];
      };
      function $y(t, e) {
        if ((1 & t && (Bi(0, "a", 14), mo(1), qi()), 2 & t)) {
          const t = no().$implicit;
          zi("routerLink", Ra(2, Hy, t.id)), Rr(1), vo(" ", t.title, "");
        }
      }
      function zy(t, e) {
        if (
          (1 & t &&
            (Bi(0, "div", 17),
            Wi(1, "div", 18),
            Bi(2, "div", 19),
            Bi(3, "h3", 20),
            Li(4, jy, 2, 4, "a", 11),
            Li(5, $y, 2, 4, "a", 11),
            qi(),
            Bi(6, "div", 21),
            Bi(7, "span", 22),
            Bi(8, "small"),
            mo(9, "By Mike Smith "),
            Bi(10, "span", 23),
            mo(11, "/"),
            qi(),
            mo(12),
            Va(13, "date"),
            qi(),
            qi(),
            qi(),
            Bi(14, "div", 24),
            Bi(15, "p"),
            mo(16),
            Va(17, "slice"),
            qi(),
            qi(),
            qi(),
            qi()),
          2 & t)
        ) {
          const t = e.$implicit,
            n = no(2);
          Rr(1),
            lo("background-image", "url(" + t.imagePath + ") ", vr),
            Rr(3),
            zi("ngIf", n.userId === t.creator),
            Rr(1),
            zi("ngIf", n.userId !== t.creator),
            Rr(7),
            yo(Ua(13, 7, t.postDate, "short")),
            Rr(4),
            _o(
              "",
              La(17, 10, t.content, 0, 170),
              "",
              t.content.length > 170 ? " ...Read More" : "",
              ""
            );
        }
      }
      function Gy(t, e) {
        if ((1 & t && (Zi(0), Li(1, zy, 18, 14, "div", 16), Qi()), 2 & t)) {
          const t = no();
          Rr(1), zi("ngForOf", t.posts);
        }
      }
      function By(t, e) {
        1 & t &&
          (Bi(0, "div", 7),
          Bi(1, "h2", 25),
          mo(2, "No Posts written by this user"),
          qi(),
          qi());
      }
      let qy = (() => {
        class t {
          constructor(t, e, n, r) {
            (this.profileService = t),
              (this.authService = e),
              (this.route = n),
              (this.router = r),
              (this.isloading = !1),
              (this.posts = []);
          }
          ngOnInit() {
            (this.userId = this.authService.getUserId()),
              (this.url = this.router.url.split("/")[1]),
              this.route.paramMap.subscribe((t) => {
                t.has("profileId") &&
                  ((this.profileId = t.get("profileId")),
                  this.getProfileByUsername(this.profileId),
                  this.getCurrentUseersPost(this.profileId));
              });
          }
          getProfileByUsername(t) {
            (this.isloading = !0),
              this.profileService.getProfileByUsername(t).subscribe((t) => {
                (this.profile = t.profile), (this.isloading = !1);
              });
          }
          getCurrentUseersPost(t) {
            (this.isloading = !0),
              this.profileService
                .getMyPost(t)
                .pipe(
                  U((t) =>
                    t.post.map((t) => ({
                      title: t.title,
                      content: t.content,
                      id: t._id,
                      imagePath: t.imagePath,
                      creator: t.creator,
                      postDate: t.postDate,
                    }))
                  )
                )
                .subscribe((t) => {
                  (this.isloading = !1), (this.posts = t);
                });
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ji(Um), ji(Lm), ji(Cf), ji(Ig));
          }),
          (t.ɵcmp = ue({
            type: t,
            selectors: [["app-view-profile"]],
            decls: 12,
            vars: 6,
            consts: [
              [1, "container", "py-5"],
              [
                "style",
                "text-align: center;",
                "class",
                "loading-text",
                4,
                "ngIf",
              ],
              ["class", "row profile", 4, "ngIf"],
              ["class", "font-weight-light text-black", 4, "ngIf"],
              [1, "row"],
              [1, "col-lg-12"],
              [4, "ngIf"],
              [1, "loading-text", 2, "text-align", "center"],
              [1, "row", "profile"],
              [1, "col-md-8", "col-xs-12", "order-2", "order-lg-1"],
              [1, "text-black", "font-weight-light", "mb-4"],
              [3, "routerLink", 4, "ngIf"],
              [1, "col-md-4", "col-xs-12", "order-1", "order-lg-2"],
              [1, "img-fluid", "w-50", "rounded-circle", "mb-3", 3, "src"],
              [3, "routerLink"],
              [1, "font-weight-light", "text-black"],
              [
                "class",
                "d-block d-md-flex podcast-entry bg-white mb-5 aos-init aos-animate",
                "data-aos",
                "fade-up",
                4,
                "ngFor",
                "ngForOf",
              ],
              [
                "data-aos",
                "fade-up",
                1,
                "d-block",
                "d-md-flex",
                "podcast-entry",
                "bg-white",
                "mb-5",
                "aos-init",
                "aos-animate",
              ],
              [1, "image"],
              [1, "text"],
              [1, "font-weight-light"],
              [1, "text-white", "mb-3"],
              [1, "text-black-opacity-05"],
              [1, "sep"],
              [1, "desc"],
              [1, "nopost"],
            ],
            template: function (t, e) {
              1 & t &&
                (Wi(0, "hr"),
                Bi(1, "div", 0),
                Li(2, Dy, 2, 0, "div", 1),
                Li(3, Vy, 9, 4, "div", 2),
                qi(),
                Bi(4, "div", 0),
                Li(5, Uy, 2, 1, "h2", 3),
                Wi(6, "hr"),
                Bi(7, "div", 4),
                Li(8, Ly, 2, 0, "div", 1),
                Bi(9, "div", 5),
                Li(10, Gy, 2, 1, "ng-container", 6),
                Li(11, By, 3, 0, "div", 1),
                qi(),
                qi(),
                qi()),
                2 & t &&
                  (Rr(2),
                  zi("ngIf", e.isloading),
                  Rr(1),
                  zi("ngIf", e.profile),
                  Rr(2),
                  zi("ngIf", e.profile),
                  Rr(3),
                  zi("ngIf", e.isloading),
                  Rr(2),
                  zi("ngIf", e.posts.length > 0),
                  Rr(1),
                  zi("ngIf", 0 == e.posts.length && !e.isloading));
            },
            directives: [Xc, Fm, Mg, Kc],
            pipes: [ru, su],
            styles: [
              '.icon-twitter[_ngcontent-%COMP%]:before{content:"\\f099"}[class*=" icon-"][_ngcontent-%COMP%], [class^=icon-][_ngcontent-%COMP%]{font-family:icomoon!important;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.profile[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:134px!important;height:135px}.profile[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{display:inline-block;padding-right:25px}.profile[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{padding:0 8px;border:1px solid #757575;border-radius:5px}.container[_ngcontent-%COMP%]{max-width:728px}.podcast-entry[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]{width:250px;height:auto;background-size:cover;background-position:50%;background-repeat:no-repeat}.podcast-entry[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{width:100%;padding:20px 20px 20px 40px}.featured-user[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:14px;text-transform:uppercase}.featured-user[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:20px}.featured-user[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;color:rgba(0,0,0,.5);text-decoration:none}.featured-user[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:65px;float:left;height:65px;border-radius:50%}@media (min-width:768px){.site-section[_ngcontent-%COMP%]{padding:5em 0}.podcast-entry[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{width:calc(100% - 100px)}}@media screen and (max-width:551px){.hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:40px!important}.col-md-4.col-xs-12.order-1.order-lg-2[_ngcontent-%COMP%]{float:none;margin:0 auto;text-align:center}.podcast-entry[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]{height:250px;width:auto}.podcast-entry[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{padding:25px}}',
            ],
          })),
          t
        );
      })();
      const Wy = [
        { path: "", component: Zm },
        { path: "myposts", component: Sy, canActivate: [py] },
        { path: "create", component: ey, canActivate: [py] },
        { path: "login", component: dy },
        { path: "myposts/:postId", component: ay, canActivate: [py] },
        { path: "myposts/edit/:postId", component: ey, canActivate: [py] },
        { path: "profile", component: My, canActivate: [py] },
        { path: "public/:profileId", component: qy },
        { path: "profile/:profileId", component: qy, canActivate: [py] },
        { path: "profile/edit/:profileId", component: My, canActivate: [py] },
        { path: "public/:profileId/posts/:postId", component: ay },
        { path: ":postId", component: ay },
      ];
      let Zy = (() => {
        class t {}
        return (
          (t.ɵmod = fe({ type: t })),
          (t.ɵinj = ut({
            factory: function (e) {
              return new (e || t)();
            },
            imports: [[Wg.forRoot(Wy, { useHash: !0 })], Wg],
          })),
          t
        );
      })();
      function Qy(t, e) {
        1 & t && (Bi(0, "li", 30), Bi(1, "a", 31), mo(2, "Create"), qi(), qi());
      }
      const Yy = function (t) {
        return ["/profile", t];
      };
      function Ky(t, e) {
        if (
          (1 & t &&
            (Bi(0, "li", 30), Bi(1, "a", 32), mo(2, "Profile"), qi(), qi()),
          2 & t)
        ) {
          const t = no();
          Rr(1), zi("routerLink", Ra(1, Yy, t.username));
        }
      }
      const Jy = function () {
        return ["/profile"];
      };
      function Xy(t, e) {
        1 & t &&
          (Bi(0, "li", 30),
          Bi(1, "a", 32),
          mo(2, "Create Profile"),
          qi(),
          qi()),
          2 & t && (Rr(1), zi("routerLink", Da(1, Jy)));
      }
      function tv(t, e) {
        1 & t &&
          (Bi(0, "li", 30), Bi(1, "a", 33), mo(2, "MyPosts"), qi(), qi());
      }
      function ev(t, e) {
        1 & t && (Bi(0, "li", 30), Bi(1, "a", 34), mo(2, "Auth"), qi(), qi());
      }
      function nv(t, e) {
        if (1 & t) {
          const t = Yi();
          Bi(0, "li", 30),
            Bi(1, "a", 35),
            Xi("click", function () {
              return qe(t), no().onLogout();
            }),
            mo(2, "Logout"),
            qi(),
            qi();
        }
      }
      const rv = function () {
        return { exact: !0 };
      };
      let sv = (() => {
          class t {
            constructor(t, e, n) {
              (this.authService = t),
                (this.profileService = e),
                (this.route = n),
                (this.userIsAuthenticated = !1),
                (this.profileisSet = !1);
            }
            ngOnInit() {
              (this.profileisSet = this.profileService.getIsProfileSet()),
                console.log(this.profileisSet),
                (this.userIsAuthenticated = this.authService.getIsAuth()),
                console.log(this.userIsAuthenticated),
                this.userIsAuthenticated && this.getProfile(),
                (this.authListenerSubs = this.authService
                  .getAuthStatusListener()
                  .subscribe((t) => {
                    console.log(t),
                      (this.userIsAuthenticated = t),
                      this.userIsAuthenticated && this.getProfile();
                  }));
            }
            onLogout() {
              this.authService.logout();
            }
            getProfile() {
              this.profileService.getProfileByCreatorId().subscribe(
                (t) => {
                  (this.profileisSet = !0),
                    (this.username = t.profile.username),
                    (this.profile = {
                      id: t.profile._id,
                      username: t.profile.username,
                      bio: t.profile.bio,
                      imagePath: t.profile.imagePath,
                      creator: t.profile.creator,
                    }),
                    console.log(t),
                    console.log(this.profile);
                },
                (t) => {
                  (this.profileisSet = !1),
                    (this.username = null),
                    console.log(t);
                }
              );
            }
            ngOnDestroy() {
              this.authListenerSubs.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ji(Lm), ji(Um), ji(Cf));
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["app-header"]],
              decls: 45,
              vars: 8,
              consts: [
                [1, "container"],
                [
                  1,
                  "navbar",
                  "navbar-expand-lg",
                  "navbar-light",
                  "bg-light",
                  "py-4",
                ],
                ["href", "#", 1, "navbar-brand"],
                [
                  "type",
                  "button",
                  "data-toggle",
                  "collapse",
                  "data-target",
                  "#navbarTogglerDemo02",
                  "aria-controls",
                  "navbarTogglerDemo02",
                  "aria-expanded",
                  "false",
                  "aria-label",
                  "Toggle navigation",
                  1,
                  "navbar-toggler",
                ],
                [1, "navbar-toggler-icon"],
                ["id", "navbarTogglerDemo02", 1, "collapse", "navbar-collapse"],
                [1, "navbar-nav", "mr-auto", "mt-2", "mt-lg-0"],
                [
                  "routerLinkActive",
                  "active",
                  1,
                  "nav-item",
                  3,
                  "routerLinkActiveOptions",
                ],
                ["routerLink", "/", 1, "nav-link"],
                ["class", "nav-item", "routerLinkActive", "active", 4, "ngIf"],
                [1, "social"],
                ["href", "https://github.com/mehulk05"],
                [1, "fa", "fa-github"],
                ["href", "https://medium.com/@mehulkothari05"],
                [1, "fa", "fa-medium"],
                ["href", "https://www.instagram.com/mehul_kothari05/"],
                [1, "fa", "fa-instagram"],
                [
                  "href",
                  "https://www.linkedin.com/in/mehul-kothari-765868126/",
                ],
                [1, "fa", "fa-linkedin"],
                [1, "footer-icons", "hidden-xs", "hidden-sm", "sideicons"],
                [1, "navbar-nav"],
                [1, "nav-item", "inline-block"],
                [
                  "href",
                  "https://github.com/mehulk05",
                  "aria-label",
                  "Github",
                  1,
                  "nav-link",
                  "text-github",
                ],
                [
                  1,
                  "fa",
                  "fa-github",
                  2,
                  "font-size",
                  "24px",
                  "color",
                  "black",
                ],
                [
                  "href",
                  "https://medium.com/@mehulkothari05",
                  "aria-label",
                  "Medium",
                  1,
                  "nav-link",
                ],
                [
                  "width",
                  "24",
                  "alt",
                  "",
                  "src",
                  "https://seeklogo.com/images/M/medium-logo-93CDCF6451-seeklogo.com.png",
                  1,
                  "img-circle",
                  "medium-icon",
                ],
                [
                  "href",
                  "https://www.instagram.com/mehul_kothari05/",
                  "aria-label",
                  "Instagram",
                  1,
                  "nav-link",
                ],
                [
                  1,
                  "fa",
                  "fa-instagram",
                  2,
                  "font-size",
                  "24px",
                  "color",
                  "black",
                ],
                [
                  "href",
                  "https://www.linkedin.com/in/mehul-kothari-765868126/",
                  "aria-label",
                  "LinkedIn",
                  1,
                  "nav-link",
                ],
                [
                  1,
                  "fa",
                  "fa-linkedin",
                  2,
                  "font-size",
                  "24px",
                  "color",
                  "black",
                ],
                ["routerLinkActive", "active", 1, "nav-item"],
                ["routerLink", "/create", 1, "nav-link"],
                [1, "nav-link", 3, "routerLink"],
                ["routerLink", "/myposts", 1, "nav-link"],
                ["routerLink", "/login", 1, "nav-link"],
                [1, "nav-link", 3, "click"],
              ],
              template: function (t, e) {
                1 & t &&
                  (Bi(0, "div", 0),
                  Bi(1, "nav", 1),
                  Bi(2, "a", 2),
                  mo(3, "BlogApp"),
                  qi(),
                  Bi(4, "button", 3),
                  Wi(5, "span", 4),
                  qi(),
                  Bi(6, "div", 5),
                  Bi(7, "ul", 6),
                  Bi(8, "li", 7),
                  Bi(9, "a", 8),
                  mo(10, "Home"),
                  qi(),
                  qi(),
                  Li(11, Qy, 3, 0, "li", 9),
                  Li(12, Ky, 3, 3, "li", 9),
                  Li(13, Xy, 3, 2, "li", 9),
                  Li(14, tv, 3, 0, "li", 9),
                  Li(15, ev, 3, 0, "li", 9),
                  Li(16, nv, 3, 0, "li", 9),
                  qi(),
                  qi(),
                  qi(),
                  Bi(17, "ul", 10),
                  Bi(18, "li"),
                  Bi(19, "a", 11),
                  Wi(20, "i", 12),
                  qi(),
                  qi(),
                  Bi(21, "li"),
                  Bi(22, "a", 13),
                  Wi(23, "i", 14),
                  qi(),
                  qi(),
                  Bi(24, "li"),
                  Bi(25, "a", 15),
                  Wi(26, "i", 16),
                  qi(),
                  qi(),
                  Bi(27, "li"),
                  Bi(28, "a", 17),
                  Wi(29, "i", 18),
                  qi(),
                  qi(),
                  qi(),
                  qi(),
                  Bi(30, "div", 19),
                  Bi(31, "ul", 20),
                  Bi(32, "li", 21),
                  Bi(33, "a", 22),
                  Wi(34, "i", 23),
                  qi(),
                  qi(),
                  Bi(35, "li", 21),
                  Bi(36, "a", 24),
                  Bi(37, "span"),
                  Wi(38, "img", 25),
                  qi(),
                  qi(),
                  qi(),
                  Bi(39, "li", 21),
                  Bi(40, "a", 26),
                  Wi(41, "i", 27),
                  qi(),
                  qi(),
                  Bi(42, "li", 21),
                  Bi(43, "a", 28),
                  Wi(44, "i", 29),
                  qi(),
                  qi(),
                  qi(),
                  qi()),
                  2 & t &&
                    (Rr(8),
                    zi("routerLinkActiveOptions", Da(7, rv)),
                    Rr(3),
                    zi("ngIf", e.userIsAuthenticated),
                    Rr(1),
                    zi("ngIf", e.userIsAuthenticated && e.profileisSet),
                    Rr(1),
                    zi("ngIf", e.userIsAuthenticated && !e.profileisSet),
                    Rr(1),
                    zi("ngIf", e.userIsAuthenticated),
                    Rr(1),
                    zi("ngIf", !e.userIsAuthenticated),
                    Rr(1),
                    zi("ngIf", e.userIsAuthenticated));
              },
              directives: [Rg, Mg, Xc],
              styles: [
                ".bg-light[_ngcontent-%COMP%]{background-color:#fff!important}.navbar-expand-lg[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]{margin-right:50px!important;margin-left:auto}.navbar-brand[_ngcontent-%COMP%]{font-size:2rem;font-weight:500}.navbar-nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]{padding:10px 5px}.navbar-nav[_ngcontent-%COMP%]   .nav-item.active[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-weight:700;color:#007bff}.navbar-nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{padding:10px;color:#000;font-size:16px}ul.social[_ngcontent-%COMP%]{padding:0;display:block;position:relative}ul.social[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:inline-block;padding:0 15px}ul.social[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#000}@media (max-width:551px){.sideicon[_ngcontent-%COMP%]{display:none}ul.social[_ngcontent-%COMP%]{display:block}nav.navbar.navbar-expand-lg.navbar-light.bg-light.py-4[_ngcontent-%COMP%]{padding-bottom:10px!important;padding-top:10px!important}.navbar-nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]{padding:0;border-bottom:1px solid #afa6a6}.navbar-collapse.collapse.show[_ngcontent-%COMP%]{height:100vh}.collapse.navbar-collapse.sticky[_ngcontent-%COMP%]{position:fixed;top:0;z-index:99999;width:100%;display:block;background:#f8f8f8;box-shadow:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23)}.header-main[_ngcontent-%COMP%]   .footer-icons[_ngcontent-%COMP%]{width:auto;text-align:right}.header-main[_ngcontent-%COMP%]   .footer-icons[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{float:right;margin:15px 0 0}.header-main[_ngcontent-%COMP%]   .footer-icons[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:10px}.header-main[_ngcontent-%COMP%]   .footer-icons[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .fa[_ngcontent-%COMP%]{font-size:21px!important}.header-main[_ngcontent-%COMP%]   .footer-icons[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:20px;margin-top:-2px}.sticky-header[_ngcontent-%COMP%]{top:0}}@media screen and (min-width:992px){ul.social[_ngcontent-%COMP%]{display:none}.footer-icons.hidden-xs.hidden-sm[_ngcontent-%COMP%]{position:fixed;left:0;background:#fff;z-index:55;border-radius:4px;box-shadow:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23);top:25%;width:auto;text-align:left}.footer-icons.hidden-xs.hidden-sm[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:block}.footer-icons.hidden-xs.hidden-sm[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin-bottom:30px}.main-header[_ngcontent-%COMP%] > .container[_ngcontent-%COMP%]{position:fixed;top:0;background-color:#f8f8f8;border-color:#e7e7e7;width:100%;z-index:55;padding-left:55px;padding-right:55px;box-shadow:0 0 0 rgba(0,0,0,.28),0 2px 6px rgba(0,0,0,.23)}.footer-icons[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{opacity:.8;transform:translateY(-3px);transition:all .2s ease-in-out}}.middle[_ngcontent-%COMP%]{min-height:450px}",
              ],
            })),
            t
          );
        })(),
        iv = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["app-footer"]],
              decls: 25,
              vars: 0,
              consts: [
                [1, "col-md-12", "col-xs-12", "footer"],
                [
                  "href",
                  "https://github.com/mehulk05/Blog-using-mean",
                  1,
                  "button",
                  "github",
                ],
                [
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "24",
                  "height",
                  "24",
                  "viewBox",
                  "0 0 24 24",
                  "fill",
                  "none",
                  "stroke",
                  "currentColor",
                  "stroke-width",
                  "2",
                  "stroke-linecap",
                  "round",
                  "stroke-linejoin",
                  "round",
                ],
                [
                  "d",
                  "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
                ],
                [
                  "href",
                  "https://medium.com/@mehulkothari05/crud-operation-using-mean-stack-7dfa2f51ec8c",
                  1,
                  "button",
                  "btn-light",
                  "medium",
                ],
                [
                  "width",
                  "20",
                  "alt",
                  "",
                  "src",
                  "https://seeklogo.com/images/M/medium-logo-93CDCF6451-seeklogo.com.png",
                  1,
                  "img-circle",
                ],
                [1, "nav", "mymenu"],
                [1, "nav-item"],
                [
                  "href",
                  "https://github.com/mehulk05",
                  "aria-label",
                  "Github",
                  1,
                  "nav-link",
                  "text-github",
                ],
                [
                  1,
                  "fa",
                  "fa-github",
                  2,
                  "font-size",
                  "28px",
                  "color",
                  "black",
                ],
                [
                  "href",
                  "https://medium.com/@mehulkothari05",
                  "aria-label",
                  "Github",
                  1,
                  "nav-link",
                  "text-github",
                ],
                [
                  1,
                  "fa",
                  "fa-medium",
                  2,
                  "font-size",
                  "28px",
                  "color",
                  "black",
                ],
                [
                  "href",
                  "https://www.instagram.com/mehul_kothari05/",
                  "aria-label",
                  "Instagram",
                  1,
                  "nav-link",
                ],
                [
                  1,
                  "fa",
                  "fa-instagram",
                  2,
                  "font-size",
                  "28px",
                  "color",
                  "black",
                ],
                [
                  "href",
                  "https://www.linkedin.com/in/mehul-kothari-765868126/",
                  "aria-label",
                  "LinkedIn",
                  1,
                  "nav-link",
                ],
                [
                  1,
                  "fa",
                  "fa-linkedin",
                  2,
                  "font-size",
                  "28px",
                  "color",
                  "black",
                ],
                [1, "text-center", "copyright"],
              ],
              template: function (t, e) {
                1 & t &&
                  (Bi(0, "div", 0),
                  Bi(1, "a", 1),
                  ($e.lFrame.currentNamespace = "http://www.w3.org/2000/svg"),
                  Bi(2, "svg", 2),
                  Wi(3, "path", 3),
                  qi(),
                  ($e.lFrame.currentNamespace = null),
                  Bi(4, "span"),
                  mo(5, "Open Sourced on GitHub"),
                  qi(),
                  qi(),
                  Bi(6, "a", 4),
                  Bi(7, "span"),
                  Wi(8, "img", 5),
                  mo(9, "Read about this Project On MEDIUM"),
                  qi(),
                  qi(),
                  qi(),
                  Bi(10, "ul", 6),
                  Bi(11, "li", 7),
                  Bi(12, "a", 8),
                  Wi(13, "i", 9),
                  qi(),
                  qi(),
                  Bi(14, "li", 7),
                  Bi(15, "a", 10),
                  Wi(16, "i", 11),
                  qi(),
                  qi(),
                  Bi(17, "li", 7),
                  Bi(18, "a", 12),
                  Wi(19, "i", 13),
                  qi(),
                  qi(),
                  Bi(20, "li", 7),
                  Bi(21, "a", 14),
                  Wi(22, "i", 15),
                  qi(),
                  qi(),
                  qi(),
                  Bi(23, "h5", 16),
                  mo(24, " \xa9 Copyrights reserved by Mehul Kothari"),
                  qi());
              },
              styles: [
                ".mymenu[_ngcontent-%COMP%]{margin:0 auto;justify-content:center;padding-bottom:30px}.button[_ngcontent-%COMP%]{display:flex;flex-direction:row;padding:10px;border:0;text-transform:uppercase;background:rgba(0,123,255,.0627451);color:rgba(0,123,255,.6);cursor:pointer;border-radius:5px;transition:background .2s ease-in-out;margin:15px auto .5rem;outline:none;font-size:13px;text-decoration:none}.github[_ngcontent-%COMP%]{width:30%;background:#000!important;color:#fff!important;transition:all .2s ease-in-out;font-weight:600}.github[_ngcontent-%COMP%], footer[_ngcontent-%COMP%]{justify-content:center}a.button.btn-light.medium[_ngcontent-%COMP%]{background:rgba(87,100,112,.083);width:30%;color:#000!important;justify-content:center;font-weight:600;padding:11px}a.button.btn-light.medium[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-right:5px}@media screen and (max-width:551px){.button[_ngcontent-%COMP%], a.button.btn-light.medium[_ngcontent-%COMP%]{width:100%}}.footer[_ngcontent-%COMP%]{padding:80px 0 50px}.copyright[_ngcontent-%COMP%]{background:#e2e2e2;padding-top:25px;padding-bottom:25px;margin-bottom:0;font-size:14px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol}",
              ],
            })),
            t
          );
        })(),
        ov = (() => {
          class t {
            constructor(t, e) {
              (this.authService = t), (this.profileService = e);
            }
            ngOnInit() {
              this.authService.autoAuthUser(),
                this.profileService.autogetProfile();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ji(Lm), ji(Um));
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["app-root"]],
              decls: 4,
              vars: 0,
              template: function (t, e) {
                1 & t &&
                  (Wi(0, "app-header"),
                  Wi(1, "router-outlet"),
                  Wi(2, "hr"),
                  Wi(3, "app-footer"));
              },
              directives: [sv, Ug, iv],
              styles: [""],
            })),
            t
          );
        })(),
        av = (() => {
          class t {
            constructor(t) {
              this.authService = t;
            }
            intercept(t, e) {
              const n = this.authService.getToken(),
                r = t.clone({
                  headers: t.headers.set("Authorization", "Bearer " + n),
                });
              return e.handle(r);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Lm));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        lv = (() => {
          class t {}
          return (
            (t.ɵmod = fe({ type: t, bootstrap: [ov] })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [
                Nm,
                Lm,
                py,
                { provide: bm, useClass: av, multi: !0 },
                { provide: dc, useClass: mc },
              ],
              imports: [[Nu, Zy, _d, Dm, vd]],
            })),
            t
          );
        })();
      (function () {
        if (lr)
          throw new Error("Cannot enable prod mode after platform setup.");
        ar = !1;
      })(),
        Du()
          .bootstrapModule(lv)
          .catch((t) => console.error(t));
    },
    zn8P: function (t, e) {
      function n(t) {
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = "MODULE_NOT_FOUND"), e);
        });
      }
      (n.keys = function () {
        return [];
      }),
        (n.resolve = n),
        (t.exports = n),
        (n.id = "zn8P");
    },
  },
  [[0, 0]],
]);
