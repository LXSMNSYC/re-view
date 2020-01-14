// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Exception$ReView = require("../Exception.bs.js");
var RenderContext$ReView = require("../RenderContext.bs.js");

function use(effect, dependency) {
  if (RenderContext$ReView.isActive(/* () */0)) {
    var match = RenderContext$ReView.getContext(/* () */0);
    var slot = match.slot;
    var node = match.node;
    var current = slot.contents;
    var effectSlot = node.getState(current);
    var dependencySlot = node.getState(current + 1 | 0);
    var shouldUpdate;
    if (dependencySlot !== undefined) {
      var match$1 = dependencySlot;
      if (match$1.tag === /* Dependency */8) {
        shouldUpdate = Caml_obj.caml_notequal(match$1[0], dependency);
      } else {
        throw Exception$ReView.IllegalSlotAccess;
      }
    } else {
      shouldUpdate = true;
    }
    var cleanup;
    if (effectSlot !== undefined) {
      var match$2 = effectSlot;
      switch (match$2.tag | 0) {
        case /* Effect */6 :
            cleanup = (function (param) {
                return /* () */0;
              });
            break;
        case /* EffectCleanup */7 :
            cleanup = match$2[0];
            break;
        default:
          throw Exception$ReView.IllegalSlotAccess;
      }
    } else {
      cleanup = (function (param) {
          return /* () */0;
        });
    }
    if (shouldUpdate) {
      if (cleanup !== undefined) {
        Curry._1(cleanup, /* () */0);
      }
      node.setState(current, /* Effect */Block.__(6, [effect]));
      node.setState(current + 1 | 0, /* Dependency */Block.__(8, [dependency]));
    }
    slot.contents = current + 2 | 0;
    return /* () */0;
  } else {
    return 0;
  }
}

exports.use = use;
/* RenderContext-ReView Not a pure module */