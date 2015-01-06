"use strict";

var createHash = Npm.require('crypto').createHash
  , toString = Object.prototype.toString;



function validateArg (args, config) {
  var err;

  args.validate.forEach(function (tokens) {
    var key = tokens[0]
      , value = args[key];

    switch(tokens[1]){
      case Number:
        if (toString.call(value) !== '[object Number]') {
          err = 'Argument "' + key + '" is not a valid Number.';
        }

        break;

      case Boolean:
        if (toString.call(value) !== '[object Boolean]') {
          err = 'Argument "' + key + '" is not a valid Boolean.';
        }

        break;

      case Array:
        if (toString.call(value) !== '[object Array]') {
          err = 'Argument "' + key + '" is not a valid Array.';
        }
        if (!err && key === 'key') {
          for (var vKey in value) {
            var vValue = value[vKey];
            var result = validateKeySize(config, vKey, vValue);
            if (result.err) {
              err = result.err;
            } else {
              args.command = args.command.replace(vValue, result['value']);
            }
          }
        }
        break;

      case Object:
        if (toString.call(value) !== '[object Object]') {
          err = 'Argument "' + key + '" is not a valid Object.';
        }

        break;

      case Function:
        if (toString.call(value) !== '[object Function]') {
          err = 'Argument "' + key + '" is not a valid Function.';
        }

        break;

      case String:
        if (toString.call(value) !== '[object String]') {
          err = 'Argument "' + key + '" is not a valid String.';
        }

        if (!err && key === 'key') {
          var result = validateKeySize(config, key, value);
          if (result.err) {
            err = result.err;
          } else {
            args.command = args.command.replace(value, result['value']);
          }
        }
        break;

      default:
        if (toString.call(value) === '[object global]' && !tokens[2]) {
          err = 'Argument "' + key + '" is not defined.';
        }
    }
  });

  if (err){
    if (args.callback) args.callback(new Error(err));
    return false;
  }

  return true;
};

function validateKeySize(config, key, value) {
  if (value.length > config.maxKeySize) {
    if (config.keyCompression){
      return { err: false, value: createHash('md5').update(value).digest('hex') };
    } else {
      return { err: 'Argument "' + key + '" is longer than the maximum allowed length of ' + config.maxKeySize };
    }
  } else if (/[\s\n\r]/.test(value)) {
    return { err: 'The key should not contain any whitespace or new lines' };
  } else {
    return { err: false, value: value };
  }
};

// a small util to use an object for eventEmitter
function fuse (target, handlers) {
  for (var i in handlers)
    if (handlers.hasOwnProperty(i)){
      target.on(i, handlers[i]);
    }
};

// merges a object's proppertys / values with a other object
function merge (target, obj) {
  for (var i in obj) {
    target[i] = obj[i];
  }

  return target;
};

// curry/bind functions
function curry (context, fn) {
  var copy = Array.prototype.slice
    , args = copy.call(arguments, 2);

  return function bowlofcurry () {
    return fn.apply(context || this, args.concat(copy.call(arguments)));
  };
};

// a small items iterator
var Iterator = function iterator (collection, callback) {
  var arr = Array.isArray(collection)
    , keys = !arr ? Object.keys(collection) : false
    , index = 0
    , maximum = arr ? collection.length : keys.length
    , self = this;

  // returns next item
  this.next = function next () {
    var obj = arr ? collection[index] : { key: keys[index], value: collection[keys[index]] };
    callback(obj, index++, collection, self);
  };

  // check if we have more items
  this.hasNext = function hasNext () {
    return index < maximum;
  };
};

//Escapes values by putting backslashes before line breaks
function escapeValue(value) {
  return value.replace(/(\r|\n)/g, '\\$1');
};

//Unescapes escaped values by removing backslashes before line breaks
function unescapeValue(value) {
  return value.replace(/\\(\r|\n)/g, '$1');
};

this.Utils = {
  escapeValue: escapeValue,
  unescapeValue: unescapeValue,
  Iterator: Iterator,
  curry: curry,
  merge: merge,
  fuse: fuse,
  validateArg: validateArg,
  validateKeySize: validateKeySize

};
