'use strict';

var pth = require('path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var pth__default = /*#__PURE__*/_interopDefaultLegacy(pth);

// sibilispPrelude// -// MIT;
var _eNoValue_ = "E_NO_VALUE";
var _eGuard_ = " guards agains (nil) and (void) values, got";
var _eArg1_ = " expects argument 1 to be a ";
var _eArg2_ = " expects argument 2 to be a ";
var _eArg3_ = " expects argument 3 to be a ";
var identity = (function(a) {
    return a;
});
var show = (function(x) {
    return (null == x
    ? "(nil)"
    : Number.isNaN(x)
    ? "(nan)"
    : Error.prototype.isPrototypeOf(x)
    ? ("(error " + x.name + ": " + x.message + ")")
    : typeof x === "string"
    ? ("(string \"" + x + "\")")
    : (typeof x === "number" && !(Number.isNaN(x)))
    ? ("(number " + x + ")")
    : typeof x === "function"
    ? ("(function " + (x.name || "lambda") + ")")
    : (!(null == x) && x.constructor === GeneratorFunction)
    ? ("(generator " + x.name + ")")
    : Array.isArray(x)
    ? ("(list" + x.reduce((function(a, v) {
      
    return (a + " " + show(v));
  }), "") + ")")
    : (!(null == x) && x.constructor === Set)
    ? ("(mset" + Array.from(x).reduce((function(a, v) {
      
    return (a + " " + show(v));
  }), "") + ")")
    : (!(null == x) && x.constructor === Object)
    ? ("(hash" + Object.entries(x).reduce((function(a, k_v$1) {
      
    var k = k_v$1[0],
        v = k_v$1[1];
  
    return (a + " :" + k + " " + show(v));
  }), "") + ")")
    : (!(null == x) && x.constructor === Map)
    ? ("(dict" + x.entries().reduce((function(a, k_v$2) {
      
    var k = k_v$2[0],
        v = k_v$2[1];
  
    return (a + " :" + show(k) + " " + show(v));
  }), "") + ")")
    : (!(null == x) && x.constructor === Promise)
    ? "(future)"
    : (!(null == x) && x.constructor === Date)
    ? ("(date" + x.getFullYear() + "-" + (1 + x.getMonth()) + "-" + x.getDate() + ")")
    : (!(null == x) && x.constructor === RegExp)
    ? ("(regex " + x.source + " :flags " + x.flags + ")")
    : typeof x.toString === "function"
    ? x.toString()
    : ("(" + x.constructor.name + ")"));
});
var equals = (function(x, y) {
    return (x === null
    ? y === null
    : typeof x === "undefined"
    ? typeof y === "undefined"
    : (typeof x === "string" && typeof y === "string")
    ? x === y
    : (typeof x === "function" && typeof y === "function")
    ? x === y
    : ((typeof x === "number" && !(Number.isNaN(x))) && (typeof y === "number" && !(Number.isNaN(y))))
    ? x === y
    : ((!(null == x) && x.constructor === RegExp) && (!(null == y) && y.constructor === RegExp))
    ? (x.source === y.source && x.flag === y.flag)
    : ((!(null == x) && x.constructor === Date) && (!(null == y) && y.constructor === Date))
    ? Number(x) === Number(y)
    : ((!(null == x) && x.constructor === GeneratorFunction) && (!(null == y) && y.constructor === GeneratorFunction))
    ? x === y
    : ((!(null == x) && x.constructor === Promise) && (!(null == y) && y.constructor === Promise))
    ? x === y
    : (Array.isArray(x) && Array.isArray(y))
    ? (x.length === y.length && x.every((function(va, i) {
      
    return equals(va, y[i]);
  })))
    : ((!(null == x) && x.constructor === Set) && (!(null == y) && y.constructor === Set))
    ? (x.size() === y.size() && equals(Array.from(x), Array.from(y)))
    : ((!(null == x) && x.constructor === Object) && (!(null == y) && y.constructor === Object))
    ? (function(pa, pb) {
      
    return (pa.length === pb.length && pa.every((function(k_v$3) {
          
      var k = k_v$3[0],
          v = k_v$3[1];
    
      return equals(v, y[k]);
    })));
  })(Object.entries(x), Object.entries(y))
    : ((!(null == x) && x.constructor === Map) && (!(null == y) && y.constructor === Map))
    ? (function(pa, pb) {
      
    return (pa.length === pb.length && pa.every((function(k_v$4) {
          
      var k = k_v$4[0],
          v = k_v$4[1];
    
      return equals(v, y.get(k));
    })));
  })(Array.from(x.entries()), Array.from(y.entries()))
    : typeof x.equals === "function"
    ? x.equals(y)
    : false);
});
var concatenate = (function(x, y) {
    return ((!(!(x == null)) || !(!(y == null)))
    ? (function() {
    throw (new Error(("" + "(concatenate) cannot concatenate with a (void) or (nil) value")))
  }).call(this)
    : (typeof x === "string" && typeof y === "string")
    ? (x + y)
    : (typeof x === "function" && typeof y === "function")
    ? (function(args) {
      
    var args = Array.prototype.slice.call(arguments, 0);
  
    return y(x.apply(null, args));
  })
    : (Array.isArray(x) && Array.isArray(y))
    ? x.concat(y)
    : ((!(null == x) && x.constructor === Object) && (!(null == y) && y.constructor === Object))
    ? Object.assign({  }, x, y)
    : ((!(null == x) && x.constructor === Set) && (!(null == y) && y.constructor === Set))
    ? (function() {
      
    xy.forEach((function(mset$1) {
          
      return mset$1.forEach((function(msetVal$1) {
              
        return (new Set([])).add(msetVal$1);
      }));
    }));
    return (new Set([]));
  }).call(this)
    : ((!(null == x) && x.constructor === Map) && (!(null == y) && y.constructor === Map))
    ? (function() {
        values.forEach((function(dict$1) {
            return dict$1.forEach((function(dictVal$1, dictKey$1) {
                return (new Map([])).set(dictKey$1, dictVal$1);
      }));
    }));
    return (new Map([]));
  }).call(this)
    : ((!(null == x) && x.constructor === Promise) && (!(null == y) && y.constructor === Promise))
    ? Promise.all([ x, y ])
    : typeof x.concat === "function"
    ? x.concat(y)
    : (function() {
    throw (new Error(("" + "(concatenate) needs both arguments to be in the same semigroup")))
  }).call(this));
});
var map = (function(x, mapper) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("" + "(map)" + _eGuard_ + show(x))))
  }).call(this)
    : !(typeof mapper === "function")
    ? (function() {
    throw (new Error(("" + "(map)" + _eArg1_ + "function, got " + show(mapper))))
  }).call(this)
    : typeof x === "function"
    ? (function(args) {
      
    var args = Array.prototype.slice.call(arguments, 0);
  
    return mapper(x.apply(null, args));
  })
    : (!(null == x) && x.constructor === Promise)
    ? x.then(mapper, identity)
    : typeof x.map === "function"
    ? x.map(mapper)
    : (!(null == x) && x.constructor === Object)
    ? Object.entries(x).reduce((function(o, k_v$5) {
      
    k_v$5[0];
        var v = k_v$5[1];
  
    return Object.assign(o, { k: mapper(v) });
  }), {  })
    : (!(null == x) && x.constructor === Map)
    ? (function(y) {
      
    Array.from(x.entries()).forEach((function(k_v$6) {
          
      var k = k_v$6[0],
          v = k_v$6[1];
    
      return y.set(k, mapper(v));
    }));
    return y;
  })((new Map([])))
    : (!(null == x) && x.constructor === Set)
    ? (function(y) {
      
    x.forEach((function(v) {
          
      return y.add(mapper(v));
    }));
    return y;
  })((new Set([])))
    : (function() {
    throw (new Error(("" + "(map) needs the value to be a Functor")))
  }).call(this));
});
var flatMap = (function(x, chainMapper) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("" + "(flat-map|chain)" + _eGuard_ + show(x))))
  }).call(this)
    : !(typeof chainMapper === "function")
    ? (function() {
    throw (new Error(("" + "(flat-map|chain)" + _eArg2_ + "function, got " + show(chainMapper))))
  }).call(this)
    : typeof x === "function"
    ? (function(args) {
      
    var args = Array.prototype.slice.call(arguments, 0);
  
    return chainMapper(x.apply(null, args)).apply(this, args);
  })
    : (!(null == x) && x.constructor === Promise)
    ? x.then(chainMapper, identity)
    : typeof x.flatMap === "function"
    ? x.flatMap(chainMapper)
    : typeof x.chain === "function"
    ? x.chain(chainMapper)
    : Array.isArray(x)
    ? x.reduce((function(ls, v) {
      
    return ls.concat(v);
  }), [])
    : (!(null == x) && x.constructor === Set)
    ? (function(y) {
      
    x.forEach((function(v) {
          
      return y = (function() {
              
        chainMapper(v).forEach((function(mset$2) {
                  
          return mset$2.forEach((function(msetVal$2) {
                      
            return y.add(msetVal$2);
          }));
        }));
        return y;
      }).call(this);
    }));
    return y;
  })((new Set([])))
    : (function() {
    throw (new Error(("" + "(flat-map|chain) needs the value to be a Chain")))
  }).call(this));
});
var chain = flatMap;
var traverse = (function(x, lift, transformer) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("" + "(traverse)" + _eArg1_ + "Traversable, got " + show(x))))
  }).call(this)
    : !(typeof lift === "function")
    ? (function() {
    throw (new Error(("" + "(traverse)" + _eArg2_ + "function, got " + show(lift))))
  }).call(this)
    : !(typeof transformer === "function")
    ? (function() {
    throw (new Error(("" + "(traverse)" + _eArg3_ + "function, got " + show(transformer))))
  }).call(this)
    : (!(null == x) && x.constructor === Set)
    ? (function(y) {
      
    return y.reduce((function(a, value) {
          
      return transformer(value).map((function(x) {
              
        return (function(y) {
                  
          return (function() {
                      
            x.forEach((function(mset$3) {
                          
              return mset$3.forEach((function(msetVal$3) {
                              
                return y.add(msetVal$3);
              }));
            }));
            return y;
          }).call(this);
        });
      })).ap(a);
    }), lift((new Set([]))));
  })(Array.from(x.values()))
    : Array.isArray(x)
    ? x.reduce((function(a, value) {
      
    return transformer(value).map((function(x) {
          
      return (function(y) {
              
        return y.concat(x);
      });
    })).ap(a);
  }), lift([]))
    : typeof x.traverse === "function"
    ? x.traverse(lift, transformer)
    : (function() {
    throw (new Error(("" + "(traverse) needs the first argument to be a Traversable")))
  }).call(this));
});
var sequence = (function(x, lift) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("" + "(sequence)" + _eArg1_ + "Traversable, got " + show(x))))
  }).call(this)
    : !(typeof lift === "function")
    ? (function() {
    throw (new Error(("" + "(sequence)" + _eArg2_ + "function, got " + show(lift))))
  }).call(this)
    : (!(null == x) && x.constructor === Set)
    ? (function(y) {
      
    return y.reduce((function(a, value) {
          
      return value.map((function(x) {
              
        return (function(y) {
                  
          return (function() {
                      
            x.forEach((function(mset$4) {
                          
              return mset$4.forEach((function(msetVal$4) {
                              
                return y.add(msetVal$4);
              }));
            }));
            return y;
          }).call(this);
        });
      })).ap(a);
    }), lift((new Set([]))));
  })(Array.from(x.values()))
    : Array.isArray(x)
    ? x.reduce((function(a, value) {
      
    return value.map((function(x) {
          
      return (function(y) {
              
        return y.concat(x);
      });
    })).ap(a);
  }), lift([]))
    : typeof x.sequence === "function"
    ? x.sequence(lift, transformer)
    : (function() {
    throw (new Error(("" + "(sequence) needs the first argument to be a Traversable")))
  }).call(this));
});
var coyo = (function() {
    function type$1(value, mapper) {
    var self$1 = Object.create(type$1.prototype);
    var argCount$1 = arguments.length;
    (function() {
      if (!(argCount$1 === 2)) {
        return (function() {
          throw (new Error(("" + "coyo" + " received invalid number of arguments.")))
        }).call(this);
      }
    }).call(this);
    self$1.value = value;
    self$1.mapper = mapper;
    return self$1;
  }  type$1.is = (function(x$1) {
      
    return x$1 instanceof type$1;
  });
  return type$1;
}).call(undefined);
coyo.of = (function(value) {
    return coyo(value, identity);
});
coyo.lift = (function(value) {
    return (!(!(value == null))
    ? (function() {
    throw (new Error(("" + "(coyo.lift)" + _eGuard_ + value)))
  }).call(this)
    : coyo.of(value));
});
coyo.prototype.toString = (function() {
    return (function(value, fn) {
      
    return ("(coyo " + show(value) + " " + show(fn) + ")");
  })(this.value, this.mapper);
});
coyo.prototype.map = (function(mapper) {
    return (!(typeof mapper === "function")
    ? (function() {
    throw (new Error(("" + "(coyo.map)" + _eArg1_ + "function, got " + show(mapper))))
  }).call(this)
    : (function(value, runSelf) {
      
    return coyo(value, (function(arg) {
          
      return mapper(runSelf(arg));
    }));
  })(this.value, this.mapper));
});
coyo.prototype.lower = (function() {
    return (function(mapper, value) {
      
    return (!(typeof mapper === "function")
      ? (function() {
      throw (new Error(("" + "(coyo.lower) requires the coyo:mapper property\n" +
      "                   to hold a function, but it holds " + show(mapper))))
    }).call(this)
      : !(!(value == null))
      ? (function() {
      throw (new Error(("" + "(coyo.lower) requires the coyo:value property\n" +
      "                   to hold a non (void) or (nil) value, but it holds " + show(value))))
    }).call(this)
      : !(typeof value.map === "function")
      ? (function() {
      throw (new Error(("" + "(coyo.lower) requires the coyo:value property\n" +
      "                   to implement the functor typeclass but it doesn't")))
    }).call(this)
      : coyo(value.map(mapper), identity));
  })(this.mapper, this.value);
});
coyo.prototype.reduce = (function(reducer, seed) {
    return (function(value, mapper) {
      
    return (!(typeof reducer === "function")
      ? (function() {
      throw (new Error(("" + "(coyo.reduce)" + _eArg1_ + "function, got " + show(reducer))))
    }).call(this)
      : !(typeof seed !== "undefined")
      ? (function() {
      throw (new Error(("" + "(coyo.reduce)" + _eArg2_ + "non (void) value, got " + show(seed))))
    }).call(this)
      : typeof value.reduce === "function"
      ? value.reduce((function(acc, val) {
          
      return reducer(acc, mapper(val));
    }), seed)
      : reducer(seed, mapper(value)));
  })(this.value, this.mapper);
});
var io = (function() {
    function type$2(unsafePerform) {
    var self$2 = Object.create(type$2.prototype);
    var argCount$2 = arguments.length;
    (function() {
      if (!(argCount$2 === 1)) {
        return (function() {
          throw (new Error(("" + "io" + " received invalid number of arguments.")))
        }).call(this);
      }
    }).call(this);
    self$2.unsafePerform = unsafePerform;
    return self$2;
  }  type$2.is = (function(x$2) {
      
    return x$2 instanceof type$2;
  });
  return type$2;
}).call(undefined);
io.of = (function(value) {
    return io((function() {
      
    return value;
  }));
});
io.lift = (function(value) {
    return (!(!(value == null))
    ? (function() {
    throw (new Error(("" + "(io.lift)" + _eGuard_ + value)))
  }).call(this)
    : io.of(value));
});
io.empty = (function() {
    return io((function(value) {
      
    return value;
  }));
});
io.identity = io.empty;
io.prototype.toString = (function() {
    return (function(fn) {
      
    ("(io " + show(fn));
    return ")";
  })(this.unsafePerform);
});
io.prototype.equals = (function(tIo) {
    return (!(io.is(tIo))
    ? (function() {
    throw (new Error(("" + "(io.equals)" + _eArg1_ + "io, got " + show(tIo))))
  }).call(this)
    : this.unsafePerform === tIo.unsafePerform);
});
io.prototype.concat = (function(tIo) {
    return (!(io.is(tIo))
    ? (function() {
    throw (new Error(("" + "(io.concat)" + _eArg1_ + "io, got " + show(tIo))))
  }).call(this)
    : (function(runSelf, runThat) {
      
    return io((function(arg) {
          
      return runThat(runSelf(arg));
    }));
  })(this.unsafePerform, tIo.unsafePerform));
});
io.prototype.map = (function(mapper) {
    return (!(typeof mapper === "function")
    ? (function() {
    throw (new Error(("" + "(io.map)" + _eArg1_ + "function, got " + show(mapper))))
  }).call(this)
    : (function(runSelf) {
      
    return io((function(arg) {
          
      return mapper(runSelf(arg));
    }));
  })(this.unsafePerform));
});
io.prototype.contramap = (function(preMapper) {
    return (!(typeof preMapper === "function")
    ? (function() {
    throw (new Error(("" + "(io.contramp)" + _eArg1_ + "function, got " + show(preMapper))))
  }).call(this)
    : (function(runSelf) {
      
    return io((function(arg) {
          
      return runSelf(preMapper(arg));
    }));
  })(this.unsafePerform));
});
io.prototype.promap = (function(preMapper, postMapper) {
    return (!(typeof preMapper === "function")
    ? (function() {
    throw (new Error(("" + "(io.promap)" + _eArg1_ + "function, got " + show(preMapper))))
  }).call(this)
    : !(typeof postMapper === "function")
    ? (function() {
    throw (new Error(("" + "(io.promap)" + _eArg2_ + "function, got " + show(postMapper))))
  }).call(this)
    : (function(runSelf) {
      
    return io((function(arg) {
          
      return postMapper(runSelf(preMapper(arg)));
    }));
  })(this.unsafePerform));
});
io.prototype.ap = (function(tIo) {
    return (!(io.is(tIo))
    ? (function() {
    throw (new Error(("" + "(io.ap)" + _eArg1_ + "io, got " + show(tIo))))
  }).call(this)
    : (function(runSelf) {
      
    return tIo.map(runSelf);
  })(this.unsafePerform));
});
io.prototype.flatMap = (function(toIoMapper) {
    return (!(typeof toIoMapper === "function")
    ? (function() {
    throw (new Error(("" + "(io.flat-map | io.chain)" + _eArg1_ + "io returning function, got " + show(toIoMapper))))
  }).call(this)
    : (function(runSelf) {
      
    return io((function(arg) {
          
      return toIoMapper(runSelf(arg)).unsafePerform(arg);
    }));
  })(this.unsafePerform));
});
io.prototype.chain = io.prototype.flatMap;
io.prototype.compose = (function(tIo) {
    return (!(io.is(tIo))
    ? (function() {
    throw (new Error(("" + "(io.compose)" + _eArg1_ + "io, got " + show(tIo))))
  }).call(this)
    : (function(runSelf, runThat) {
      
    return io((function(arg) {
          
      return runThat(runSelf(arg));
    }));
  })(this.unsafePerform, tIo.unsafePerform));
});
io.prototype.runIo = (function(arg) {
    return this.unsafePerform(arg);
});
var maybe = (function() {
    var sumtype$1 = Object.create(null);
  sumtype$1.prototype = { __sibilispType__: sumtype$1 };
  sumtype$1.nothing = function nothing() {
    var self$3 = Object.create(sumtype$1.prototype);
    var argCount$3 = arguments.length;
    (function() {
      if (!(argCount$3 === 0)) {
        return (function() {
          throw (new Error(("" + "Tagged constructor " + maybe + "." + nothing + "expects " + 0 + " arguments but got " + argCount$3)))
        }).call(this);
      }
    }).call(this);
    self$3.constructor = nothing;
    self$3.__sibilispTags__ = [];
    return self$3;
  };  sumtype$1.just = function just(value) {
    var self$4 = Object.create(sumtype$1.prototype);
    var argCount$4 = arguments.length;
    (function() {
      if (!(argCount$4 === 1)) {
        return (function() {
          throw (new Error(("" + "Tagged constructor " + maybe + "." + just + "expects " + 1 + " arguments but got " + argCount$4)))
        }).call(this);
      }
    }).call(this);
    self$4.value = value;
    self$4.constructor = just;
    self$4.__sibilispTags__ = [ "value" ];
    return self$4;
  };  sumtype$1.prototype.match = (function(ctors) {
      
    var self = this,
        name = self.constructor.name,
        ctor = ctors[name],
        keys = self.__sibilispTags__;
    return (function() {
      if (typeof ctor === "function") {
        return ctor.apply(self, keys.map((function(key) {
                  
          return self[key];
        })));
      } else {
        return (function() {
          throw (new Error(("" + ".match :: Cannot find " + name + " in patterns " + ctors)))
        }).call(this);
      }
    }).call(this);
  });
  sumtype$1.is = (function(x) {
      
    return (!(null == x) && x.__sibilispType__ === sumtype$1);
  });
  return sumtype$1;
}).call(undefined);
maybe.of = (function(value) {
    return maybe.just(value);
});
maybe.lift = (function(value) {
    return (!(!(value == null))
    ? maybe.nothing()
    : maybe.of(value));
});
maybe.empty = (function() {
    return maybe.nothing();
});
maybe.zero = (function() {
    return maybe.nothing();
});
maybe.prototype.toString = (function() {
    return this.match({
    nothing: (function() {
          
      return "(maybe.nothing)";
    }),
    just: (function(value) {
          
      return ("(maybe.just " + show(value) + ")");
    })
  });
});
maybe.prototype.equals = (function(tMaybe) {
    (function() {
    if (!(maybe.is(tMaybe))) {
      return (function() {
        throw (new Error(("" + "(maybe.equals)" + _eArg1_ + "instance of maybe, got " + show(tMaybe))))
      }).call(this);
    }
  }).call(this);
  return this.match({
    nothing: (function() {
          
      return tMaybe.match({
        nothing: (function() {
                  
          return true;
        }),
        just: (function() {
                  
          return false;
        })
      });
    }),
    just: (function(value) {
          
      return tMaybe.match({
        nothing: (function() {
                  
          return false;
        }),
        just: (function(tValue) {
                  
          return (function() {
            if (typeof value.equals === "function") {
              return value.equals(tValue);
            } else {
              return value === tValue;
            }
          }).call(this);
        })
      });
    })
  });
});
maybe.prototype.concat = (function(tMaybe) {
    (function() {
    if (!(maybe.is(tMaybe))) {
      return (function() {
        throw (new Error(("" + "(maybe.concat)" + _eArg1_ + "instance of maybe, got " + show(tMaybe))))
      }).call(this);
    }
  }).call(this);
  return this.match({
    nothing: (function() {
          
      return maybe.nothing();
    }),
    just: (function(value) {
          
      return tMaybe.match({
        nothing: (function() {
                  
          return tMaybe;
        }),
        just: (function(tValue) {
                  
          return (function(cnt) {
                      
            (function() {
              if (!(typeof cnt === "function")) {
                return (function() {
                  throw (new Error(("" + "(maybe.concat) can only concat when both of the carried values implement the semigroup typeclass")))
                }).call(this);
              }
            }).call(this);
            return cnt.call(value, tValue);
          })(value.concat);
        })
      });
    })
  });
});
maybe.prototype.map = (function(mapper) {
    return (!(typeof mapper === "function")
    ? (function() {
    throw (new Error(("" + "(maybe.map)" + _eArg1_ + "function, got " + show(mapper))))
  }).call(this)
    : this.match({
    nothing: (function() {
          
      return maybe.nothing();
    }),
    just: (function(value) {
          
      return maybe.lift(mapper(value));
    })
  }));
});
maybe.prototype.ap = (function(tMaybe) {
    (function() {
    if (!(maybe.is(tMaybe))) {
      return (function() {
        throw (new Error(("" + "(maybe.ap)" + _eArg1_ + "instance of maybe, got " + show(tMaybe))))
      }).call(this);
    }
  }).call(this);
  return this.match({
    nothing: (function() {
          
      return maybe.nothing();
    }),
    just: (function(value) {
          
      return tMaybe.map(value);
    })
  });
});
maybe.prototype.flatMap = (function(toMaybeMapper) {
    return (!(typeof toMaybeMapper === "function")
    ? (function() {
    throw (new Error(("" + "(maybe.flat-map|maybe.chain)" + _eArg1_ + "function, got " + show(toMaybeMapper))))
  }).call(this)
    : this.match({
    nothing: (function() {
          
      return maybe.nothing();
    }),
    just: (function(value) {
          
      return toMaybeMapper(value);
    })
  }));
});
maybe.prototype.chain = maybe.prototype.flatMap;
maybe.prototype.bimap = (function(transformNothing, transformJust) {
    return (!(typeof transformNothing === "function")
    ? (function() {
    throw (new Error(("" + "(maybe.bimap)" + _eArg1_ + "function, got " + show(transformNothing))))
  }).call(this)
    : !(typeof transformJust === "function")
    ? (function() {
    throw (new Error(("" + "(maybe.bimap)" + _eArg2_ + "function, got " + show(transformJust))))
  }).call(this)
    : this.match({
    nothing: (function() {
          
      return transformNothing();
    }),
    just: (function(value) {
          
      return transformJust(value);
    })
  }));
});
maybe.prototype.alt = (function(tMaybe) {
    return (!(maybe.is(tMaybe))
    ? (function() {
    throw (new Error(("" + "(maybe.alt)" + _eArg1_ + "instance of maybe, got " + show(tMaybe))))
  }).call(this)
    : this.match({
    nothing: (function() {
          
      return tMaybe;
    }),
    just: (function(value) {
          
      return maybe.just(value);
    })
  }));
});
maybe.prototype.reduce = (function(reducer, seed) {
    return (!(typeof reducer === "function")
    ? (function() {
    throw (new Error(("" + "(maybe.reduce)" + _eArg1_ + "function, got " + show(reducer))))
  }).call(this)
    : !(typeof seed !== "undefined")
    ? (function() {
    throw (new Error(("" + "(maybe.reduce)" + _eArg2_ + "non (void) value, got " + show(seed))))
  }).call(this)
    : this.match({
    nothing: (function() {
          
      return seed;
    }),
    just: (function(value) {
          
      return reducer(seed, value);
    })
  }));
});
maybe.prototype.traverse = (function(lift, transformer) {
    return (!(typeof lift === "function")
    ? (function() {
    throw (new Error(("" + "(maybe.traverse)" + _eArg1_ + "function, got " + show(lift))))
  }).call(this)
    : not
    ? typeof transformer === "function"
    : this.match({
    nothing: (function() {
          
      return lift(maybe.nothing());
    }),
    just: (function(value) {
          
      return transformer(value).map(maybe.of);
    })
  }));
});
maybe.prototype.sequence = (function(lift) {
    return (!(typeof lift === "function")
    ? (function() {
    throw (new Error(("" + "(maybe.sequence)" + _eArg1_ + "function, got " + show(lift))))
  }).call(this)
    : this.traverse(lift, identity));
});
var either = (function() {
    var sumtype$2 = Object.create(null);
  sumtype$2.prototype = { __sibilispType__: sumtype$2 };
  sumtype$2.left = function left(error) {
    var self$6 = Object.create(sumtype$2.prototype);
    var argCount$6 = arguments.length;
    (function() {
      if (!(argCount$6 === 1)) {
        return (function() {
          throw (new Error(("" + "Tagged constructor " + either + "." + left + "expects " + 1 + " arguments but got " + argCount$6)))
        }).call(this);
      }
    }).call(this);
    self$6.error = error;
    self$6.constructor = left;
    self$6.__sibilispTags__ = [ "error" ];
    return self$6;
  };  sumtype$2.right = function right(value) {
    var self$7 = Object.create(sumtype$2.prototype);
    var argCount$7 = arguments.length;
    (function() {
      if (!(argCount$7 === 1)) {
        return (function() {
          throw (new Error(("" + "Tagged constructor " + either + "." + right + "expects " + 1 + " arguments but got " + argCount$7)))
        }).call(this);
      }
    }).call(this);
    self$7.value = value;
    self$7.constructor = right;
    self$7.__sibilispTags__ = [ "value" ];
    return self$7;
  };  sumtype$2.prototype.match = (function(ctors) {
      
    var self = this,
        name = self.constructor.name,
        ctor = ctors[name],
        keys = self.__sibilispTags__;
    return (function() {
      if (typeof ctor === "function") {
        return ctor.apply(self, keys.map((function(key) {
                  
          return self[key];
        })));
      } else {
        return (function() {
          throw (new Error(("" + ".match :: Cannot find " + name + " in patterns " + ctors)))
        }).call(this);
      }
    }).call(this);
  });
  sumtype$2.is = (function(x) {
      
    return (!(null == x) && x.__sibilispType__ === sumtype$2);
  });
  return sumtype$2;
}).call(undefined);
either.of = (function(value) {
    return either.right(value);
});
either.lift = (function(value, isLeft__QUERY) {
    return (!(!(value == null))
    ? either.left((new Error(("" + ""))))
    : (Error.prototype.isPrototypeOf(value) || isLeft__QUERY)
    ? either.left(value)
    : either.of(value));
});
either.empty = (function() {
    return either.right([]);
});
either.zero = (function() {
    return either.left((new Error(("" + "either-zero"))));
});
either.prototype.toString = (function() {
    return this.match({
    left: (function(error) {
          
      return ("(either.left " + show(error) + ")");
    }),
    right: (function(value) {
          
      return ("(either.right " + show(value) + ")");
    })
  });
});
either.prototype.equals = (function(tEither) {
    return (!(either.is(tEither))
    ? (function() {
    throw (new Error(("" + "(either.equals)" + _eArg1_ + "instance of either, got " + show(tEither))))
  }).call(this)
    : this.match({
    left: (function() {
          
      return tEither.match({
        left: (function() {
                  
          return true;
        }),
        right: (function() {
                  
          return false;
        })
      });
    }),
    right: (function(value) {
          
      return tEither.match({
        left: (function() {
                  
          return false;
        }),
        right: (function(tValue) {
                  
          return (typeof value.equals === "function") ? value.equals(tValue) : value === tValue;
        })
      });
    })
  }));
});
either.prototype.concat = (function(tEither) {
    return (!(either.is(tEither))
    ? (function() {
    throw (new Error(("" + "(either.concat)" + _eArg1_ + "either, got " + show(tEither))))
  }).call(this)
    : this.match({
    left: (function(error) {
          
      return either.left(error);
    }),
    right: (function(value) {
          
      return tEither.match({
        left: (function() {
                  
          return tEither;
        }),
        right: (function(tValue) {
                  
          return (function(cnt) {
                      
            (function() {
              if (!(typeof cnt === "function")) {
                return (function() {
                  throw (new Error(("" + "(either.concat) cannot concat when both of the carried values implement the semigroup typeclass")))
                }).call(this);
              }
            }).call(this);
            return cnt.call(value, tValue);
          })(value.concat);
        })
      });
    })
  }));
});
either.prototype.map = (function(mapper) {
    return (!(typeof mapper === "function")
    ? (function() {
    throw (new Error(("" + "(either.map)" + _eArg1_ + "function, got " + show(mapper))))
  }).call(this)
    : this.match({
    left: (function(error) {
          
      return either.left(error);
    }),
    right: (function(value) {
          
      return either.lift(mapper(value));
    })
  }));
});
either.prototype.ap = (function(tEither) {
    (function() {
    if (!(either.is(tEither))) {
      return (function() {
        throw (new Error(("" + "(either.ap)" + _eArg1_ + "instance of either, got " + show(tEither))))
      }).call(this);
    }
  }).call(this);
  return this.match({
    left: (function(error) {
          
      return either.left(error);
    }),
    right: (function(value) {
          
      return tEither.map(value);
    })
  });
});
either.prototype.flatMap = (function(toEitherMapper) {
    return (!(typeof toEitherMapper === "function")
    ? (function() {
    throw (new Error(("" + "(either.flat-map|either.chain)" + _eArg1_ + "function, got " + show(toEitherMapper))))
  }).call(this)
    : this.match({
    left: (function(error) {
          
      return either.left(error);
    }),
    right: (function(value) {
          
      return toEitherMapper(value);
    })
  }));
});
either.prototype.chain = either.prototype.flatMap;
either.prototype.bimap = (function(transformLeft, transformRight) {
    return (!(typeof transformLeft === "function")
    ? (function() {
    throw (new Error(("" + "(either.bimap)" + _eArg1_ + "function, got " + show(transformLeft))))
  }).call(this)
    : !(typeof transformRight === "function")
    ? (function() {
    throw (new Error(("" + "(either.bimap)" + _eArg2_ + "function, got " + show(transformRight))))
  }).call(this)
    : this.match({
    left: (function(error) {
          
      return transformLeft(error);
    }),
    right: (function(value) {
          
      return transformRight(value);
    })
  }));
});
either.prototype.alt = (function(tEither) {
    return (!(either.is(tEither))
    ? (function() {
    throw (new Error(("" + "(either.alt)" + _eArg1_ + "instance of either, got " + show(tEither))))
  }).call(this)
    : this.match({
    left: (function() {
          
      return tEither;
    }),
    right: (function(value) {
          
      return either.right(value);
    })
  }));
});
either.prototype.reduce = (function(reducer, seed) {
    return (!(typeof reducer === "function")
    ? (function() {
    throw (new Error(("" + "(either.reduce)" + _eArg1_ + "function, got " + show(reducer))))
  }).call(this)
    : !(typeof seed !== "undefined")
    ? (function() {
    throw (new Error(("" + "(either.reduce)" + _eArg2_ + "non (void) value, got " + show(seed))))
  }).call(this)
    : this.match({
    left: (function() {
          
      return seed;
    }),
    right: (function(value) {
          
      return reducer(seed, value);
    })
  }));
});
either.prototype.traverse = (function(lift, transformer) {
    return (!(typeof lift === "function")
    ? (function() {
    throw (new Error(("" + "(either.traverse)" + _eArg1_ + "function, got " + show(lift))))
  }).call(this)
    : !(typeof transformer === "function")
    ? (function() {
    throw (new Error(("" + "(either.traverse)" + _eArg2_ + "function, got " + show(transformer))))
  }).call(this)
    : this.match({
    left: (function(error) {
          
      return lift(either.left(error));
    }),
    right: (function(value) {
          
      return transformer(value).map(either.of);
    })
  }));
});
either.prototype.sequence = (function(lift) {
    return (!(typeof lift === "function")
    ? (function() {
    throw (new Error(("" + "(either.sequence)" + _eArg1_ + "function, got " + show(lift))))
  }).call(this)
    : this.traverse(lift, identity));
});
var proof = (function() {
    var sumtype$3 = Object.create(null);
  sumtype$3.prototype = { __sibilispType__: sumtype$3 };
  sumtype$3.falsy = function falsy(errors) {
    var self$9 = Object.create(sumtype$3.prototype);
    var argCount$9 = arguments.length;
    (function() {
      if (!(argCount$9 === 1)) {
        return (function() {
          throw (new Error(("" + "Tagged constructor " + proof + "." + falsy + "expects " + 1 + " arguments but got " + argCount$9)))
        }).call(this);
      }
    }).call(this);
    self$9.errors = errors;
    self$9.constructor = falsy;
    self$9.__sibilispTags__ = [ "errors" ];
    return self$9;
  };  sumtype$3.truthy = function truthy(value) {
    var self$10 = Object.create(sumtype$3.prototype);
    var argCount$10 = arguments.length;
    (function() {
      if (!(argCount$10 === 1)) {
        return (function() {
          throw (new Error(("" + "Tagged constructor " + proof + "." + truthy + "expects " + 1 + " arguments but got " + argCount$10)))
        }).call(this);
      }
    }).call(this);
    self$10.value = value;
    self$10.constructor = truthy;
    self$10.__sibilispTags__ = [ "value" ];
    return self$10;
  };  sumtype$3.prototype.match = (function(ctors) {
      
    var self = this,
        name = self.constructor.name,
        ctor = ctors[name],
        keys = self.__sibilispTags__;
    return (function() {
      if (typeof ctor === "function") {
        return ctor.apply(self, keys.map((function(key) {
                  
          return self[key];
        })));
      } else {
        return (function() {
          throw (new Error(("" + ".match :: Cannot find " + name + " in patterns " + ctors)))
        }).call(this);
      }
    }).call(this);
  });
  sumtype$3.is = (function(x) {
      
    return (!(null == x) && x.__sibilispType__ === sumtype$3);
  });
  return sumtype$3;
}).call(undefined);
proof.of = (function(value) {
    return proof.truthy(value);
});
proof.lift = (function(value, isFalsy__QUERY) {
    return ((null == value || Number.isNaN(value))
    ? proof.falsy([ (new Error(("" + _eNoValue_))) ])
    : (Error.prototype.isPrototypeOf(value) || isFalsy__QUERY)
    ? proof.falsy([ value ])
    : proof.truthy(value));
});
proof.empty = (function() {
    return proof.truthy(true);
});
proof.zero = (function() {
    return proof.falsy([ (new Error(("" + "ProofZero"))) ]);
});
proof.prototype.toString = (function() {
    return this.match({
    truthy: (function(value) {
          
      return ("(proof.truthy " + show(value) + ")");
    }),
    falsy: (function(errors) {
          
      return ("(proof.falsy " + show(errors) + ")");
    })
  });
});
proof.prototype.equals = (function(tProof) {
    return (!(proof.is(tProof))
    ? (function() {
    throw (new Error(("" + "(proof.equals)" + _eArg1_ + "instance of proof, got " + show(tProof))))
  }).call(this)
    : this.match({
    truthy: (function(value) {
          
      return tProof.match({
        truthy: (function(tValue) {
                  
          return equals(value, tValue);
        }),
        falsy: (function() {
                  
          return false;
        })
      });
    }),
    falsy: (function(errors) {
          
      return tProof.match({
        truthy: (function() {
                  
          return false;
        }),
        falsy: (function(tErrors) {
                  
          return errors.every((function(e, i) {
                      
            return equals(e, tErrors[i]);
          }));
        })
      });
    })
  }));
});
proof.prototype.concat = (function(tProof) {
    return (!(proof.is(tProof))
    ? (function() {
    throw (new Error(("" + "(proof.concat)" + _eArg1_ + "proof, got " + show(tProof))))
  }).call(this)
    : this.match({
    truthy: (function(value) {
          
      return tProof.match({
        truthy: (function(tValue) {
                  
          return proof.truthy(tValue);
        }),
        falsy: (function(errors) {
                  
          return proof.falsy(errors);
        })
      });
    }),
    falsy: (function(errors) {
          
      return tProof.match({
        truthy: (function() {
                  
          return proof.falsy(errors);
        }),
        falsy: (function(tErrors) {
                  
          return proof.falsy(errors.concat(tErrors));
        })
      });
    })
  }));
});
proof.prototype.map = (function(mapper) {
    return (!(typeof mapper === "function")
    ? (function() {
    throw (new Error(("" + "(proof.map)" + _eArg1_ + "function, got " + show(mapper))))
  }).call(this)
    : this.match({
    truthy: (function(value) {
          
      return proof.lift(mapper(value));
    }),
    falsy: (function(errors) {
          
      return proof.falsy(errors);
    })
  }));
});
proof.prototype.flatMap = (function(toProofMapper) {
    return (!(typeof toProofMapper === "function")
    ? (function() {
    throw (new Error(("" + "(proof.flat-map/chain)")))
  }).call(this)
    : this.match({
    truthy: (function(value) {
          
      return toProofMapper(value);
    }),
    falsy: (function(errors) {
          
      return proof.falsy(errors);
    })
  }));
});
proof.prototype.chain = proof.prototype.flatMap;
proof.prototype.bimap = (function(lhsMapper, rhsMapper) {
    return (!(typeof lhsMapper === "function")
    ? (function() {
    throw (new Error(("" + "(proof.bimap)" + _eArg1_ + "function, got " + show(lhsMapper))))
  }).call(this)
    : !(typeof rhsMapper === "function")
    ? (function() {
    throw (new Error(("" + "(proof.bimap)" + _eArg2_ + "function, got " + show(rhsMapper))))
  }).call(this)
    : this.match({
    truthy: (function(value) {
          
      return proof.lift(rhsMapper(value));
    }),
    falsy: (function(errors) {
          
      return proof.falsy(errors.map(lhsMapper));
    })
  }));
});
proof.prototype.ap = (function(tProof) {
    return (!(proof.is(tProof))
    ? (function() {
    throw (new Error(("" + "(proof.ap)" + _eArg1_ + "proof, got " + show(tProof))))
  }).call(this)
    : this.match({
    truthy: (function(value) {
          
      return tProof.match({
        truthy: (function(tValue) {
                  
          return proof.lift(value(tValue));
        }),
        falsy: (function(tErrors) {
                  
          return proof.falsy(tErrors);
        })
      });
    }),
    falsy: (function(errors) {
          
      return tProof.match({
        truthy: (function() {
                  
          return proof.falsy(errors);
        }),
        falsy: (function(tErrors) {
                  
          return proof.falsy(errors.concat(tErrors));
        })
      });
    })
  }));
});
proof.prototype.alt = (function(tProof) {
    return (!(proof.is(tProof))
    ? (function() {
    throw (new Error(("" + "(proof.alt)" + _eArg1_ + "proof, got " + show(tProof))))
  }).call(this)
    : this.match({
    truthy: (function(value) {
          
      return proof.truthy(value);
    }),
    falsy: (function() {
          
      return tProof;
    })
  }));
});
var task = (function() {
    function type$6(runTask) {
    var self$12 = Object.create(type$6.prototype);
    var argCount$12 = arguments.length;
    (function() {
      if (!(argCount$12 === 1)) {
        return (function() {
          throw (new Error(("" + "task" + " received invalid number of arguments.")))
        }).call(this);
      }
    }).call(this);
    self$12.runTask = runTask;
    return self$12;
  }  type$6.is = (function(x$6) {
      
    return x$6 instanceof type$6;
  });
  return type$6;
}).call(undefined);
task.of = (function(value) {
    return task((function(fail, ok) {
      
    return ok(value);
  }));
});
task.zero = (function(value) {
    return task((function(fail) {
      
    return fail((Error.prototype.isPrototypeOf(value)) ? value : (new Error(("" + "TaskZero" + value))));
  }));
});
task.lift = (function(value) {
    return task((function(fail, ok) {
      
    return (((null == value || Number.isNaN(value)) || Error.prototype.isPrototypeOf(value))
      ? fail(value)
      : ok(value));
  }));
});
task.empty = (function() {
    return task((function(fail, ok) {
      
    
  }));
});
task.resolve = task.of;
task.reject = task.zero;
task.prototype.toString = (function() {
    return "(task)";
});
task.prototype.concat = (function(tTask) {
    return (!(task.is(tTask))
    ? (function() {
    throw (new Error(("" + "(task.concat)" + _eArg1_ + "instance of task, got " + show(tTask))))
  }).call(this)
    : (function(runSelf, runThat) {
      
    return task((function(fail, ok) {
          
      return (function() {
              
        var done = false;
        var guard = (function(f) {
                  
          return (function(g) {
                      
            return (function() {
              if (!(done)) {
                done = true;
                return f(g);
              }
            }).call(this);
          });
        });
        return (function() {
                  
          runSelf(guard(fail), guard(ok));
          return runThat(guard(fail), guard(ok));
        })();
      }).call(this);
    }));
  })(this.runTask, tTask.runTask));
});
task.prototype.ap = (function(tTask) {
    return (!(task.is(tTask))
    ? (function() {
    throw (new Error(("" + "(task.ap)" + _eArg1_ + "instance of task, got " + show(tTask))))
  }).call(this)
    : (function(runSelf, runThat) {
      
    return task((function(fail, ok) {
          
      return (function() {
              
        var adone = false;
        var bdone = false;
        var aval = false;
        var bval = false;
        var rejected = false;
        var rej = (function(v) {
                  
          return (function() {
            if (!(rejected)) {
              rejected = true;
              return fail(v);
            }
          }).call(this);
        });
        var res = (function(f) {
                  
          return (function(v) {
                      
            return (function() {
              if (!(rejected)) {
                f(v);
                return (function() {
                  if ((adone && bdone)) {
                    return ok(aval(bval));
                  } else {
                    return v;
                  }
                }).call(this);
              }
            }).call(this);
          });
        });
        return (function() {
                  
          runSelf(rej, res((function(a) {
                      
            adone = true;
            return aval = a;
          })));
          return runThat(rej, res((function(b) {
                      
            bdone = true;
            return bval = b;
          })));
        })();
      }).call(this);
    }));
  })(this.runTask, tTask.runTask));
});
task.prototype.map = (function(mapper) {
    return (!(typeof mapper === "function")
    ? (function() {
    throw (new Error(("" + "(task.map)" + _eArg1_ + "function, got " + show(mapper))))
  }).call(this)
    : (function(run) {
      
    return task((function(fail, ok) {
          
      return run(fail, (function(value) {
              
        return ok(mapper(value));
      }));
    }));
  })(this.runTask));
});
task.prototype.flatMap = (function(toTaskMapper) {
    return (!(typeof toTaskMapper === "function")
    ? (function() {
    throw (new Error(("" + "(task.flat-map)" + _eArg1_ + "function, got " + show(toTaskMapper))))
  }).call(this)
    : (function(run) {
      
    return task((function(fail, ok) {
          
      return run(fail, (function(value) {
              
        return toTaskMapper(value).runTask(fail, ok);
      }));
    }));
  })(this.runTask));
});
task.prototype.chain = task.prototype.flatMap;
task.prototype.bimap = (function(lhsMapper, rhsMapper) {
    return (!(typeof lhsMapper === "function")
    ? (function() {
    throw (new Error(("" + "(task.bimap)" + _eArg1_ + "function, got " + show(lhsMapper))))
  }).call(this)
    : !(typeof rhsMapper === "function")
    ? (function() {
    throw (new Error(("" + "(task.bimap)" + _eArg2_ + "function, got " + show(rhsMapper))))
  }).call(this)
    : (function(run) {
      
    return task((function(fail, ok) {
          
      return run((function(exc) {
              
        return fail(lhsMapper(exc));
      }), (function(value) {
              
        return ok(rhsMapper(value));
      }));
    }));
  })(this.runTask));
});
task.prototype.alt = (function(tTask) {
    return (!(task.is(tTask))
    ? (function() {
    throw (new Error(("" + "(task.alt)" + _eArg1_ + "instance of task, got " + show(tTask))))
  }).call(this)
    : (function(runSelf, runThat) {
      
    return task((function(fail, ok) {
          
      return runSelf((function() {
              
        return runThat(fail, ok);
      }), ok);
    }));
  })(this.runTask, tTask.runTask));
});

var fse = require("fs-extra");
var pathExists__QUERY = (function(fpath) {
    (function() {
    if (((null == fpath || Number.isNaN(fpath)) || !(typeof fpath.extract === "function"))) {
      return (function() {
        throw (new Error(("" + "Received an invalid filepath: " + show(fpath))))
      }).call(this);
    }
  }).call(this);
  return task((function(rej, res) {
      
    return fse.pathExists(fpath.extract(), (function(err, exists__QUERY) {
          
      return (!(err == null)
        ? rej(err)
        : res(exists__QUERY));
    }));
  }));
});
var isFile__QUERY = (function(fpath) {
    return map(pathExists__QUERY(fpath), (function(exists__QUERY) {
      
    return (exists__QUERY && fse.statSync(fpath.extract()).isFile());
  }));
});
var readFile = (function(fpath) {
    return chain(isFile__QUERY(fpath), (function(file__QUERY) {
      
    return (function() {
      if (file__QUERY) {
        return task((function(rej, res) {
                  
          return fse.readFile(fpath.extract(), { encoding: "utf8" }, (function(err, data) {
                      
            return (!(err == null)
              ? rej(err)
              : res(data));
          }));
        }));
      } else {
        return task.of("");
      }
    }).call(this);
  }));
});

var pathNormalize = (function(path) {
    return (function(p) {
      
    return pth__default["default"].normalize(p);
  })(path.split("/").join(pth__default["default"].sep));
});
var filepath = (function() {
    function type$1(path, isAbs__QUERY) {
    var self$1 = Object.create(type$1.prototype);
    var argCount$1 = arguments.length;
    (function() {
      if (!(argCount$1 === 2)) {
        return (function() {
          throw (new Error(("" + "filepath" + " received invalid number of arguments.")))
        }).call(this);
      }
    }).call(this);
    self$1.path = path;
    self$1.isAbs__QUERY = isAbs__QUERY;
    return self$1;
  }  type$1.is = (function(x$1) {
      
    return x$1 instanceof type$1;
  });
  return type$1;
}).call(undefined);
filepath.of = (function(segment) {
    return (function() {
      
    var path = pathNormalize(segment);
    var abs__QUERY = pth__default["default"].isAbsolute(path);
    return (function() {
          
      return filepath(path, abs__QUERY);
    })();
  }).call(this);
});
filepath.lift = (function(segment) {
    return (!(typeof segment === "string")
    ? (function() {
    throw (new Error(("" + "(filepath): Path segment not a string " + segment)))
  }).call(this)
    : filepath.of(segment));
});
filepath.cwd = (function() {
    return filepath.of(process.cwd());
});
filepath.dirName = (function(fpath) {
    (function() {
    if (!(filepath.is(fpath))) {
      return (function() {
        throw (new Error(("" + "(filepath.dir-name): Received non filepath object")))
      }).call(this);
    }
  }).call(this);
  return filepath.of(pth__default["default"].dirname(fpath.extract()));
});
filepath.prototype.equals = (function(fpath) {
    return (filepath.is(fpath) && this.isAbs__QUERY === fpath.isAbs__QUERY && this.path === fpath.path);
});
filepath.prototype.lt = (function(fpath) {
    return (!(filepath.is(fpath))
    ? (function() {
    throw (new Error(("" + "(filepath.lt): Cannot compare with non-filepath objects")))
  }).call(this)
    : (!(this.isAbs__QUERY) && fpath.isAbs__QUERY));
});
filepath.prototype.lte = (function(fpath) {
    return (!(filepath.is(fpath))
    ? (function() {
    throw (new Error(("" + "(filepath.lte): Cannot compare with non-filepath objects")))
  }).call(this)
    : ((!(this.isAbs__QUERY) && fpath.isAbs__QUERY) || (this.isAbs__QUERY === fpath.isAbs__QUERY && this.path === fpath.path)));
});
filepath.prototype.gt = (function(fpath) {
    return (!(filepath.is(fpath))
    ? (function() {
    throw (new Error(("" + "(filepath.gt): Cannot compare with non-filepath objects")))
  }).call(this)
    : (!(fpath.isAbs__QUERY) && this.isAbs__QUERY));
});
filepath.prototype.gte = (function(fpath) {
    return (!(filepath.is(fpath))
    ? (function() {
    throw (new Error(("" + "(filepath.gte): Cannot compare with non-filepath objects")))
  }).call(this)
    : ((!(fpath.isAbs__QUERY) && this.isAbs__QUERY) || (!(this.isAbs__QUERY) && fpath.isAbs__QUERY)));
});
filepath.prototype.concat = (function(fpath) {
    return (!(filepath.is(fpath))
    ? (function() {
    throw (new Error(("" + "(filepath.concat): Cannot concat with non-filepath objects")))
  }).call(this)
    : this.gte(fpath)
    ? filepath.of((this.path + "/" + fpath.path))
    : filepath.of((fpath.path + "/" + this.path)));
});
filepath.prototype.extract = (function() {
    return this.path;
});

var __widgetsJson__ = filepath.lift((__dirname + "/widgets/widgets.json"));
var _widgets_ = null;
var getWidgetsList = (function() {
    return loadAllWidgets(__widgetsJson__);
});
var loadAllWidgets = (function(fpath) {
    return (function() {
    if (_widgets_ === null) {
      return map(chain(readJson(fpath), (function(widgets) {
              
        return traverse(widgets.widgets, task.lift, (function(path$1) {
                  
          var path = path$1.path;
        
          return loadSingleWidget(concatenate(filepath.dirName(fpath), filepath.lift(path)));
        }));
      })), (function(widgetJsons) {
              
        _widgets_ = widgetJsons;
        return widgetJsons;
      }));
    } else {
      return task.of(_widgets_);
    }
  }).call(this);
});
var loadSingleWidget = (function(fpath) {
    return map(readJson(fpath), (function(widgetData) {
      
    return Object.assign({  }, widgetData, { root: filepath.dirName(fpath).extract() });
  }));
});
var readJson = (function(fpath) {
    return map(readFile(fpath), (function() {
      
    return JSON.parse(arguments[0]);
  }));
});

var getAll = (function() {
    return chain(getWidgetsList(), (function() {
      
    return traverse(arguments[0], task.lift, readTemplates);
  }));
});
var readTemplates = (function(widgetData) {
    return (function(root) {
      
    return map(traverse(widgetData.templates, task.lift, readTemplateResources(root)), (function(templateData) {
          
      return Object.assign({  }, widgetData, { template: templateData[0] });
    }));
  })(filepath.lift(widgetData.root));
});
var readTemplateResources = (function(rootPath) {
    return (function(name_html_css_j$1) {
      
    var name = name_html_css_j$1.name,
        html = name_html_css_j$1.html,
        css = name_html_css_j$1.css,
        js = name_html_css_j$1.js;
  
    return (function(templateHtml, templateCss, templateJs) {
          
      return map(sequence([ readFile(templateHtml), readFile(templateCss), readFile(templateJs) ], task.lift), (function(html_css_js$1) {
              
        var html = html_css_js$1[0],
            css = html_css_js$1[1],
            js = html_css_js$1[2];
      
        return {
          html: html,
          css: css,
          js: js
        };
      }));
    })(concatenate(rootPath, filepath.lift((name + "/" + html))), concatenate(rootPath, filepath.lift((name + "/" + css))), concatenate(rootPath, filepath.lift((name + "/" + js))));
  });
});

var getWidgets = (function(fail, ok) {
    return getAll().runTask(fail, ok);
});
var appBackend = {
  getWidgets: getWidgets
};

module.exports = appBackend;
