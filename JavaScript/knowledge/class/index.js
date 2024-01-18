// es6
class Animal {
  #Apri;
  static sleep () {}
  static #SAPri = "SAPri"
  #MAPri() {}
  constructor(name, other) {
    this.name = name;
    this.#Apri = other
  }
  eat() {}
}

class Cat extends Animal {
  static Type = "CAT";
  #Cpri;
  #MCpri() {}
  constructor(name, age, other1, other2) {
    super(name, other1);
    this._age = age;
    this.#Cpri = other2
  }
  miao() {}
  set age(val) {
    this._age = val;
  }
  get age() {
    return this._age
  }
}

// es5
"use strict";

function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  })();
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : String(i);
}

function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function _classPrivateMethodInitSpec(obj, privateSet) {
  _checkPrivateRedeclaration(obj, privateSet);
  privateSet.add(obj);
}

function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}

function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
  _classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}

function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}

function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}
var _Apri = /*#__PURE__*/ new WeakMap();
var _MAPri = /*#__PURE__*/ new WeakSet();
var Animal = /*#__PURE__*/ function () {
  function Animal(name, other) {
    _classCallCheck(this, Animal);
    _classPrivateMethodInitSpec(this, _MAPri);
    _classPrivateFieldInitSpec(this, _Apri, {
      writable: true,
      value: void 0
    });
    this.name = name;
    _classPrivateFieldSet(this, _Apri, other);
  }
  _createClass(Animal, [{
    key: "eat",
    value: function eat() {}
  }], [{
    key: "sleep",
    value: function sleep() {}
  }]);
  return Animal;
}();

function _MAPri2() {}
var _SAPri = {
  writable: true,
  value: "SAPri"
};
var _Cpri = /*#__PURE__*/ new WeakMap();
var _MCpri = /*#__PURE__*/ new WeakSet();
var Cat = /*#__PURE__*/ function (_Animal) {
  _inherits(Cat, _Animal);

  function Cat(name, age, other1, other2) {
    var _this;
    _classCallCheck(this, Cat);
    _this = _callSuper(this, Cat, [name, other1]);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _MCpri);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _Cpri, {
      writable: true,
      value: void 0
    });
    _this._age = age;
    _classPrivateFieldSet(_assertThisInitialized(_this), _Cpri, other2);
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
  }]);
  return Cat;
}(Animal);

function _MCpri2() {}
_defineProperty(Cat, "Type", "CAT");