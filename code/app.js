(function () {
  'use strict';

  // prelude;
  var _eNoValue_ = "E_NO_VALUE";
  var _eGuard_ = " guards agains (nil) and (void) values, got";
  var _eArg1_ = " expects argument 1 to be a ";
  var _eArg2_ = " expects argument 2 to be a ";
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
  var clone = (function(x) {
      return ((typeof x === "string" || (typeof x === "number" && !(Number.isNaN(x))) || typeof x === "function" || boolean__QUERY(x) || (null == x || Number.isNaN(x)))
      ? x
      : Array.isArray(x)
      ? x.map((function(y) {
        
      return clone(y);
    }))
      : (!(null == x) && x.constructor === Set)
      ? (new Set(Array.from(x).map((function(y) {
        
      return clone(y);
    }))))
      : (!(null == x) && x.constructor === Object)
      ? Object.entries(x).reduce((function(a, k_v$9) {
        
      var k = k_v$9[0],
          v = k_v$9[1];
    
      a[k] = clone(v);
      return a;
    }), Object.create(null))
      : (!(null == x) && x.constructor === Map)
      ? Array.from(x.entries()).reduce((function(a, k_v$10) {
        
      var k = k_v$10[0],
          v = k_v$10[1];
    
      return a.set(k, clone(v));
    }), (new Map([])))
      : (!(null == x) && x.constructor === Date)
      ? (new Date(Number(x)))
      : (!(null == x) && x.constructor === RegExp)
      ? (new RegExp(x.source, x.flags))
      : typeof x.clone === "function"
      ? x.clone()
      : (function() {
      throw (new Error(("" + "(clone) doesn't know how to clone " + show(x))))
    }).call(this));
  });
  var lens_ = (function() {
      var sumtype$1 = Object.create(null);
    sumtype$1.prototype = { __sibilispType__: sumtype$1 };
    sumtype$1.lval = function lval(value) {
      var self$1 = Object.create(sumtype$1.prototype);
      var argCount$1 = arguments.length;
      (function() {
        if (!(argCount$1 === 1)) {
          return (function() {
            throw (new Error(("" + "Tagged constructor " + lens_ + "." + lval + "expects " + 1 + " arguments but got " + argCount$1)))
          }).call(this);
        }
      }).call(this);
      self$1.value = value;
      self$1.constructor = lval;
      self$1.__sibilispTags__ = [ "value" ];
      return self$1;
    };  sumtype$1.lconst = function lconst(value) {
      var self$2 = Object.create(sumtype$1.prototype);
      var argCount$2 = arguments.length;
      (function() {
        if (!(argCount$2 === 1)) {
          return (function() {
            throw (new Error(("" + "Tagged constructor " + lens_ + "." + lconst + "expects " + 1 + " arguments but got " + argCount$2)))
          }).call(this);
        }
      }).call(this);
      self$2.value = value;
      self$2.constructor = lconst;
      self$2.__sibilispTags__ = [ "value" ];
      return self$2;
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
  lens_.prototype.map = (function(f) {
      return this.match({
      lval: (function(v) {
            
        return lens_.lval(f(v));
      }),
      lconst: (function(v) {
            
        return lens_.lconst(v);
      })
    });
  });
  var coyo = (function() {
      function type$1(value, mapper) {
      var self$3 = Object.create(type$1.prototype);
      var argCount$3 = arguments.length;
      (function() {
        if (!(argCount$3 === 2)) {
          return (function() {
            throw (new Error(("" + "coyo" + " received invalid number of arguments.")))
          }).call(this);
        }
      }).call(this);
      self$3.value = value;
      self$3.mapper = mapper;
      return self$3;
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
      var self$4 = Object.create(type$2.prototype);
      var argCount$4 = arguments.length;
      (function() {
        if (!(argCount$4 === 1)) {
          return (function() {
            throw (new Error(("" + "io" + " received invalid number of arguments.")))
          }).call(this);
        }
      }).call(this);
      self$4.unsafePerform = unsafePerform;
      return self$4;
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
      var sumtype$2 = Object.create(null);
    sumtype$2.prototype = { __sibilispType__: sumtype$2 };
    sumtype$2.nothing = function nothing() {
      var self$5 = Object.create(sumtype$2.prototype);
      var argCount$5 = arguments.length;
      (function() {
        if (!(argCount$5 === 0)) {
          return (function() {
            throw (new Error(("" + "Tagged constructor " + maybe + "." + nothing + "expects " + 0 + " arguments but got " + argCount$5)))
          }).call(this);
        }
      }).call(this);
      self$5.constructor = nothing;
      self$5.__sibilispTags__ = [];
      return self$5;
    };  sumtype$2.just = function just(value) {
      var self$6 = Object.create(sumtype$2.prototype);
      var argCount$6 = arguments.length;
      (function() {
        if (!(argCount$6 === 1)) {
          return (function() {
            throw (new Error(("" + "Tagged constructor " + maybe + "." + just + "expects " + 1 + " arguments but got " + argCount$6)))
          }).call(this);
        }
      }).call(this);
      self$6.value = value;
      self$6.constructor = just;
      self$6.__sibilispTags__ = [ "value" ];
      return self$6;
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
      var sumtype$3 = Object.create(null);
    sumtype$3.prototype = { __sibilispType__: sumtype$3 };
    sumtype$3.left = function left(error) {
      var self$8 = Object.create(sumtype$3.prototype);
      var argCount$8 = arguments.length;
      (function() {
        if (!(argCount$8 === 1)) {
          return (function() {
            throw (new Error(("" + "Tagged constructor " + either + "." + left + "expects " + 1 + " arguments but got " + argCount$8)))
          }).call(this);
        }
      }).call(this);
      self$8.error = error;
      self$8.constructor = left;
      self$8.__sibilispTags__ = [ "error" ];
      return self$8;
    };  sumtype$3.right = function right(value) {
      var self$9 = Object.create(sumtype$3.prototype);
      var argCount$9 = arguments.length;
      (function() {
        if (!(argCount$9 === 1)) {
          return (function() {
            throw (new Error(("" + "Tagged constructor " + either + "." + right + "expects " + 1 + " arguments but got " + argCount$9)))
          }).call(this);
        }
      }).call(this);
      self$9.value = value;
      self$9.constructor = right;
      self$9.__sibilispTags__ = [ "value" ];
      return self$9;
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
      var sumtype$4 = Object.create(null);
    sumtype$4.prototype = { __sibilispType__: sumtype$4 };
    sumtype$4.falsy = function falsy(errors) {
      var self$11 = Object.create(sumtype$4.prototype);
      var argCount$11 = arguments.length;
      (function() {
        if (!(argCount$11 === 1)) {
          return (function() {
            throw (new Error(("" + "Tagged constructor " + proof + "." + falsy + "expects " + 1 + " arguments but got " + argCount$11)))
          }).call(this);
        }
      }).call(this);
      self$11.errors = errors;
      self$11.constructor = falsy;
      self$11.__sibilispTags__ = [ "errors" ];
      return self$11;
    };  sumtype$4.truthy = function truthy(value) {
      var self$12 = Object.create(sumtype$4.prototype);
      var argCount$12 = arguments.length;
      (function() {
        if (!(argCount$12 === 1)) {
          return (function() {
            throw (new Error(("" + "Tagged constructor " + proof + "." + truthy + "expects " + 1 + " arguments but got " + argCount$12)))
          }).call(this);
        }
      }).call(this);
      self$12.value = value;
      self$12.constructor = truthy;
      self$12.__sibilispTags__ = [ "value" ];
      return self$12;
    };  sumtype$4.prototype.match = (function(ctors) {
        
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
    sumtype$4.is = (function(x) {
        
      return (!(null == x) && x.__sibilispType__ === sumtype$4);
    });
    return sumtype$4;
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
      var self$14 = Object.create(type$6.prototype);
      var argCount$14 = arguments.length;
      (function() {
        if (!(argCount$14 === 1)) {
          return (function() {
            throw (new Error(("" + "task" + " received invalid number of arguments.")))
          }).call(this);
        }
      }).call(this);
      self$14.runTask = runTask;
      return self$14;
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

  var __storeMessage__ = { kind: "message" };
  var create = (function(reducer) {
      return createStoreBase(reducer, null);
  });
  var action = (function(msgType, payload) {
      var payload = Array.prototype.slice.call(arguments, 1);

    (function() {
      if (2 < payload.length) {
        return payload = (1 < payload.length) ? null : payload[0];
      }
    }).call(this);
    return createStoreMessage(msgType, payload);
  });
  var createStoreMessage = (function(msgType, payload) {
      return {
      kind: __storeMessage__,
      type: msgType,
      payload: (payload.length < 1
        ? null
        : payload.length < 2
        ? payload[0]
        : payload)
    };
  });
  var isStoreMessage__QUERY = (function(msg) {
      return (!(msg == null) && msg.kind === __storeMessage__);
  });
  var storeProxy = (function(store) {
      return (function(msgType, data) {
        
      var data = Array.prototype.slice.call(arguments, 1);
    
      return store.dispatch(createStoreMessage(msgType, data));
    });
  });
  var createStoreBase = (function(foldStateAction, initState) {
      return (function(state, subs, idle, store) {
        
      store.getState = (function() {
            
        (function() {
          if (!(idle)) {
            return (function() {
              throw (new Error(("" + "(store.get-state) may not be called on updates")))
            }).call(this);
          }
        }).call(this);
        return clone(state);
      });
      store.dispatch = (function(msg) {
            
        return (function() {
          if (isStoreMessage__QUERY(msg)) {
            (function() {
              if (!(idle)) {
                return (function() {
                  throw (new Error(("" + "(store.dispatch) may not be called on updates")))
                }).call(this);
              }
            }).call(this);
            idle = false;
            state = foldStateAction(state, msg);
            subs.forEach((function(update) {
                        
              return update(state, storeProxy(store));
            }));
            idle = true;
            return store;
          }
        }).call(this);
      });
      store.subscribe = (function(update) {
            
        (function() {
          if (!(typeof update === "function")) {
            return (function() {
              throw (new Error(("" + "(store.subscribe) awaits a function, got " + show(update))))
            }).call(this);
          }
        }).call(this);
        (function() {
          if (!(idle)) {
            return (function() {
              throw (new Error(("" + "(store.subscribe) may not be called during updates")))
            }).call(this);
          }
        }).call(this);
        subs.add(update);
        return store;
      });
      return store;
    })((!(initState == null)) ? initState : null, (new Set([])), true, {  });
  });

  var SSR_NODE = 1,
    TEXT_NODE = 3,
    EMPTY_OBJ = {},
    EMPTY_ARR = [],
    SVG_NS = "http://www.w3.org/2000/svg";

  var listener = function (event) {
    this.events[event.type](event);
  };

  var getKey = function (vdom) { return (vdom == null ? vdom : vdom.key); };

  var patchProperty = function (node, key, oldValue, newValue, isSvg) {
    if (key === "key") ; else if (key[0] === "o" && key[1] === "n") {
      if (
        !((node.events || (node.events = {}))[(key = key.slice(2))] = newValue)
      ) {
        node.removeEventListener(key, listener);
      } else if (!oldValue) {
        node.addEventListener(key, listener);
      }
    } else if (!isSvg && key !== "list" && key !== "form" && key in node) {
      node[key] = newValue == null ? "" : newValue;
    } else if (newValue == null || newValue === false) {
      node.removeAttribute(key);
    } else {
      node.setAttribute(key, newValue);
    }
  };

  var createNode = function (vdom, isSvg) {
    var props = vdom.props,
      node =
        vdom.type === TEXT_NODE
          ? document.createTextNode(vdom.tag)
          : (isSvg = isSvg || vdom.tag === "svg")
          ? document.createElementNS(SVG_NS, vdom.tag, { is: props.is })
          : document.createElement(vdom.tag, { is: props.is });

    for (var k in props) {
      patchProperty(node, k, null, props[k], isSvg);
    }

    for (var i = 0; i < vdom.children.length; i++) {
      node.appendChild(
        createNode((vdom.children[i] = vdomify(vdom.children[i])), isSvg)
      );
    }

    return (vdom.node = node)
  };

  var patchNode = function (parent, node, oldVNode, newVNode, isSvg) {
    if (oldVNode === newVNode) ; else if (
      oldVNode != null &&
      oldVNode.type === TEXT_NODE &&
      newVNode.type === TEXT_NODE
    ) {
      if (oldVNode.tag !== newVNode.tag) { node.nodeValue = newVNode.tag; }
    } else if (oldVNode == null || oldVNode.tag !== newVNode.tag) {
      node = parent.insertBefore(
        createNode((newVNode = vdomify(newVNode)), isSvg),
        node
      );
      if (oldVNode != null) {
        parent.removeChild(oldVNode.node);
      }
    } else {
      var tmpVKid,
        oldVKid,
        oldKey,
        newKey,
        oldProps = oldVNode.props,
        newProps = newVNode.props,
        oldVKids = oldVNode.children,
        newVKids = newVNode.children,
        oldHead = 0,
        newHead = 0,
        oldTail = oldVKids.length - 1,
        newTail = newVKids.length - 1;

      isSvg = isSvg || newVNode.tag === "svg";

      for (var i in Object.assign({}, oldProps, newProps)) {
        if (
          (i === "value" || i === "selected" || i === "checked"
            ? node[i]
            : oldProps[i]) !== newProps[i]
        ) {
          patchProperty(node, i, oldProps[i], newProps[i], isSvg);
        }
      }

      while (newHead <= newTail && oldHead <= oldTail) {
        if (
          (oldKey = getKey(oldVKids[oldHead])) == null ||
          oldKey !== getKey(newVKids[newHead])
        ) {
          break
        }

        patchNode(
          node,
          oldVKids[oldHead].node,
          oldVKids[oldHead++],
          (newVKids[newHead] = vdomify(newVKids[newHead++])),
          isSvg
        );
      }

      while (newHead <= newTail && oldHead <= oldTail) {
        if (
          (oldKey = getKey(oldVKids[oldTail])) == null ||
          oldKey !== getKey(newVKids[newTail])
        ) {
          break
        }

        patchNode(
          node,
          oldVKids[oldTail].node,
          oldVKids[oldTail--],
          (newVKids[newTail] = vdomify(newVKids[newTail--])),
          isSvg
        );
      }

      if (oldHead > oldTail) {
        while (newHead <= newTail) {
          node.insertBefore(
            createNode((newVKids[newHead] = vdomify(newVKids[newHead++])), isSvg),
            (oldVKid = oldVKids[oldHead]) && oldVKid.node
          );
        }
      } else if (newHead > newTail) {
        while (oldHead <= oldTail) {
          node.removeChild(oldVKids[oldHead++].node);
        }
      } else {
        for (var keyed = {}, newKeyed = {}, i = oldHead; i <= oldTail; i++) {
          if ((oldKey = oldVKids[i].key) != null) {
            keyed[oldKey] = oldVKids[i];
          }
        }

        while (newHead <= newTail) {
          oldKey = getKey((oldVKid = oldVKids[oldHead]));
          newKey = getKey((newVKids[newHead] = vdomify(newVKids[newHead])));

          if (
            newKeyed[oldKey] ||
            (newKey != null && newKey === getKey(oldVKids[oldHead + 1]))
          ) {
            if (oldKey == null) {
              node.removeChild(oldVKid.node);
            }
            oldHead++;
            continue
          }

          if (newKey == null || oldVNode.type === SSR_NODE) {
            if (oldKey == null) {
              patchNode(
                node,
                oldVKid && oldVKid.node,
                oldVKid,
                newVKids[newHead],
                isSvg
              );
              newHead++;
            }
            oldHead++;
          } else {
            if (oldKey === newKey) {
              patchNode(node, oldVKid.node, oldVKid, newVKids[newHead], isSvg);
              newKeyed[newKey] = true;
              oldHead++;
            } else {
              if ((tmpVKid = keyed[newKey]) != null) {
                patchNode(
                  node,
                  node.insertBefore(tmpVKid.node, oldVKid && oldVKid.node),
                  tmpVKid,
                  newVKids[newHead],
                  isSvg
                );
                newKeyed[newKey] = true;
              } else {
                patchNode(
                  node,
                  oldVKid && oldVKid.node,
                  null,
                  newVKids[newHead],
                  isSvg
                );
              }
            }
            newHead++;
          }
        }

        while (oldHead <= oldTail) {
          if (getKey((oldVKid = oldVKids[oldHead++])) == null) {
            node.removeChild(oldVKid.node);
          }
        }

        for (var i in keyed) {
          if (newKeyed[i] == null) {
            node.removeChild(keyed[i].node);
          }
        }
      }
    }

    return (newVNode.node = node)
  };

  var vdomify = function (newVNode) { return newVNode !== true && newVNode !== false && newVNode ? newVNode : text(""); };

  var recycleNode = function (node) { return node.nodeType === TEXT_NODE
      ? text(node.nodeValue, node)
      : createVNode(
          node.nodeName.toLowerCase(),
          EMPTY_OBJ,
          EMPTY_ARR.map.call(node.childNodes, recycleNode),
          SSR_NODE,
          node
        ); };

  var createVNode = function (tag, props, children, type, node) { return ({
    tag: tag,
    props: props,
    key: props.key,
    children: children,
    type: type,
    node: node,
  }); };

  var text = function (value, node) { return createVNode(value, EMPTY_OBJ, EMPTY_ARR, TEXT_NODE, node); };

  var h$1 = function (tag, props, children) {
      if ( children === void 0 ) children = EMPTY_ARR;

      return createVNode(tag, props, Array.isArray(children) ? children : [children]);
  };

  var patch = function (node, vdom) { return (
    ((node = patchNode(
      node.parentNode,
      node,
      node.vdom || recycleNode(node),
      vdom
    )).vdom = vdom),
    node
  ); };

  var h = (function(tag, props, childs) {
      childs = (typeof childs !== "undefined") ? childs : props;
    (function() {
      if (!(Array.isArray(childs))) {
        return childs = [ childs ];
      }
    }).call(this);
    return h$1(tag, (childs === props) ? null : props, childs.reduce((function(a, c) {
        
      return ((null == c || Number.isNaN(c))
        ? a
        : typeof c === "string"
        ? concatenate(a, text(c))
        : (typeof c === "number" && !(Number.isNaN(c)))
        ? concatenate(a, text(String(c)))
        : typeof c === "function"
        ? concatenate(a, c(h, tag, props))
        : concatenate(a, c));
    }), []));
  });
  var update = (function(oldNode, newNode) {
      return patch(oldNode, newNode);
  });

  var div = (function(props$1, childs$1) {
      childs$1 = Array.prototype.slice.call(arguments, 1);
    return h("div", props$1, childs$1);
  });var p = (function(props$2, childs$2) {
      childs$2 = Array.prototype.slice.call(arguments, 1);
    return h("p", props$2, childs$2);
  });var h1 = (function(props$3, childs$3) {
      childs$3 = Array.prototype.slice.call(arguments, 1);
    return h("h1", props$3, childs$3);
  });
  var render = (function(state, emit) {
      return div({ id: "app" }, h1({  }, "Welcome to ElementDesk!"), p({  }, ("You can choose from " + state.length + " Widgets.")));
  });

  var __store = create((function(state, msg) {
      return (function() {
      switch(msg.type) {
      case "gotWidgets":
        return msg.payload;
      
      default:
        return state;
      }
    }).call(this);
  }));
  window.onmessage = (function(eventWin$1) {
      return (function() {
      if ((eventWin$1.source === window && eventWin$1.data === "mainPort")) {
        return (function(port$1) {
                
          window.mainPort = port$1;
          port$1.onmessage = (function(eventPort$1) {
                    
            return (function() {
              switch(eventPort$1.data.topic) {
              case "getWidgets":
                return (function() {
                  switch(eventPort$1.data.type) {
                  case "ok":
                    return (function(widgets) {
                                        
                      console.log("all", widgets);
                      return __store.dispatch(action("gotWidgets", widgets));
                    })(eventPort$1.data.payload);
                  
                  case "error":
                    return (function(exc) {
                                        
                      return console.log("all", exc);
                    })(eventPort$1.data.payload);
                  
                  default:
                    return null;
                  }
                }).call(this);
              
              case "getWidgetsByTags":
                return (function() {
                  switch(eventPort$1.data.type) {
                  case "ok":
                    return (function(widgets) {
                                        
                      return console.log("byTags", widgets);
                    })(eventPort$1.data.payload);
                  
                  case "error":
                    return (function(exc) {
                                        
                      return console.log("byTags", exc);
                    })(eventPort$1.data.payload);
                  
                  default:
                    return null;
                  }
                }).call(this);
              
              case "getWidgetByName":
                return (function() {
                  switch(eventPort$1.data.type) {
                  case "ok":
                    return (function(widget) {
                                        
                      return console.log("byName", widget);
                    })(eventPort$1.data.payload);
                  
                  case "error":
                    return (function(exc) {
                                        
                      return console.log("byName", exc);
                    })(eventPort$1.data.payload);
                  
                  default:
                    return null;
                  }
                }).call(this);
              
              case "getWidgetById":
                return (function() {
                  switch(eventPort$1.data.type) {
                  case "ok":
                    return (function(widget) {
                                        
                      return console.log("byId", widget);
                    })(eventPort$1.data.payload);
                  
                  case "error":
                    return (function(exc) {
                                        
                      return console.log("byId", exc);
                    })(eventPort$1.data.payload);
                  
                  default:
                    return null;
                  }
                }).call(this);
              
              default:
                return null;
              }
            }).call(this);
          });
          return window.dispatchEvent((new CustomEvent("edPortSetup")));
        })(eventWin$1.ports[0]);
      }
    }).call(this);
  });
  window.addEventListener("edPortSetup", (function() {
      return (function(appNode, newNode) {
        
      var render$1 = (function(state) {
            
        newNode = render(state);
        return appNode = update(appNode, newNode);
      });
      __store.subscribe(render$1);
      return (function() {
            
        return (function() {
          if (!(window.mainPort == null)) {
            return window.mainPort.postMessage({
              type: "getWidgets",
              payload: null
            });
          }
        }).call(this);
      }).call(this);
    })(document.querySelector("#app"), null);
  }));

})();
