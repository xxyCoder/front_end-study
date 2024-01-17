// es5
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError();
  }
}

function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.")
  }
  return ("string" === r ? String : Number)(t)
}

function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : String(i)
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.protoProps, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

var Animal = function() {
  function _Animal(name) {
    _classCallCheck(this, _Animal);
    this.name = name;
  }
  _createClass(_Animal, [{
    key: "eat",
    value: function eat() {}
  }], [{
    key: "sleep",
    value: function sleep() {}
  }]);
  return _Animal; 
}();


function _setPrototypeOf(o, p) {
  if (Object.setPrototypeOf) {
    return Object.setPrototypeOf(o, p);
  } else {
    o.__proto__ = p;
    return o;
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError();
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  })
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (subClass) _setPrototypeOf(subClass, superClass);
}

function _callSuper(t, o, e) {
  return o.apply(t, e || []);
}

var Cat = function(_Animal) {
  _inherits(Cat, _Animal);
  function _Cat(name, age) {
    var _this = this
    _classCallCheck(this, Cat);
    _this = _callSuper(this, Cat, [name]);
    _this._age = age;
    return _this;
  }
  _createClass(Cat, [{
    key: "miao",
    value: function miao() {}
  }, {
    key: "age",
    get: function get() {
      return this._age;
    },
    set: function set(val) {
      this._age = val;
    }
  }])
  return _Cat;
}(Animal);

function _defineProperty(obj, key, value) {
  // key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    })
  } else {
    obj[key] = value
  }
  return obj
}
_defineProperty(Cat, "Type", "CAT")