var AR = AR || {};
AR.build = AR.build || {};
if (!AR.build.mobile) {
    var AR = AR || {};
    AR.build = AR.build || {};
    AR.build.desktop = true;
    var AR = AR || {};
    AR.i = AR.i || {};
    AR.js = AR.js || {};
    if (AR.build && AR.build.mobile && AR.ADE) {
        AR.ADE.instance.removeADE()
    }
    var SUPPORT_BRIDGE_OBJECTS = true;
    AR.isDefined = function(a) {
        return a != null && a != undefined
    };
    AR.__architectBuildVersion__ = 20;
    (function() {
        var a = function(b) {
            return typeof b == "function"
        };
        PClass = function() {};
        PClass.create = function(c) {
            var b = function(d) {
                if (d != a && a(this.init)) {
                    this.init.apply(this, arguments)
                }
            };
            b.prototype = new this(a);
            for (key in c) {
                (function(d, e) {
                    b.prototype[key] = !a(d) || !a(e) ? d : function() {
                        this._super = e;
                        return d.apply(this, arguments)
                    }
                })(c[key], b.prototype[key])
            }
            b.prototype.constructor = b;
            b.extend = this.extend || this.create;
            return b
        }
    })();
    AR.__toJSONString__ = function(a) {
        return JSON.stringify(a)
    };
    AR.__fromJSONString__ = function(a) {
        return JSON.parse(a)
    };
    AR.__resourceUrl = function(a) {
        if (/^([a-z\d.-]+:)?\/\//i.test(a)) {
            return a
        }
        var d = document.baseURI.substring(0, document.baseURI.indexOf("/") + 2);
        var c = document.baseURI.substring(document.baseURI.indexOf("/") + 2);
        c = c.substring(0, c.lastIndexOf("/") + 1);
        var b = d + c;
        if (b[b.length - 1] !== "/") {
            b += "/"
        }
        if (a[0] === "/") {
            b = b.substring(0, b.indexOf("/", b.indexOf("//") + 2))
        }
        return b + a
    };
    AR.VALIDATE = {
        HEX_CHARS: "0123456789ABCDEF",
        isDefined: function(a) {
            return !(a == null || a == undefined)
        },
        isBoolean: function(a) {
            return typeof a == "boolean"
        },
        isNumeric: function(a) {
            return typeof a == "number"
        },
        isPositive: function(a) {
            return this.isNumeric(a) && a > 0
        },
        isNonNegative: function(a) {
            return this.isNumeric(a) && a >= 0
        },
        isInRange: function(c, b, a) {
            return this.isNumeric(c) && c >= b && c <= a
        },
        isFunction: function(a) {
            return typeof a == "function"
        },
        isWholeNumber: function(a) {
            return this.isNumeric(a) && Math.round(a) == a
        },
        isTypeOf: function(b, a) {
            return b instanceof a
        },
        isString: function(a) {
            return typeof a == "string"
        },
        isArrayOf: function(c, b) {
            if (!(c instanceof Array)) {
                return false
            }
            for (var a = 0; a < c.length; a++) {
                if (!this.isTypeOf(c[a], b)) {
                    return false
                }
            }
            return true
        },
        isHex: function(b) {
            if (typeof b != "string" || !AR.VALIDATE.isDefined(b) || b.charAt(0) != "#") {
                return false
            }
            var c = b.length;
            if (c != 7 && c != 9) {
                return false
            }
            b = b.toUpperCase();
            for (var a = 1; a < c; a++) {
                if (AR.VALIDATE.HEX_CHARS.indexOf(b.charAt(a)) < 0) {
                    return false
                }
            }
            return true
        }
    };
    AR.ERROR = {
        ERROR_PREFIX: "ARchitect Error: ",
        create: function(d, b, e, a) {
            if (!e) {
                e = ""
            }
            var c = "";
            switch (b) {
                case AR.ERROR.TYPE.UNDEFINED:
                    c = AR.ERROR.ERROR_PREFIX + d + " is undefined" + buildStack("<br />");
                    break;
                case AR.ERROR.TYPE.INVALID_VALUE:
                    c = AR.ERROR.ERROR_PREFIX + d + " is invalid" + buildStack("<br />");
                    break;
                case AR.ERROR.TYPE.RANGE:
                    c = AR.ERROR.ERROR_PREFIX + d + " is not in the valid range " + e + buildStack("<br />");
                    break;
                case AR.ERROR.TYPE.ENUMERATION:
                    c = AR.ERROR.ERROR_PREFIX + d + " is not one of the allowed values defined in the 'enumeration-object' " + e + buildStack("<br />");
                    break;
                case AR.ERROR.TYPE.FLOAT:
                    c = AR.ERROR.ERROR_PREFIX + d + " is not a numeric value." + buildStack("<br />");
                    break;
                case AR.ERROR.TYPE.INT:
                    c = AR.ERROR.ERROR_PREFIX + d + " is not a whole number." + buildStack("<br />");
                    break;
                case AR.ERROR.TYPE.BOOLEAN:
                    c = AR.ERROR.ERROR_PREFIX + d + " is not a boolean value." + buildStack("<br />");
                    break;
                case AR.ERROR.TYPE.ARRAY_CONTENT:
                    c = AR.ERROR.ERROR_PREFIX + d + " contains invalid values in the array." + buildStack("<br />");
                    break;
                case AR.ERROR.TYPE.OBJECT:
                    c = AR.ERROR.ERROR_PREFIX + d + " of object type " + a + " is not of the expected object type " + e + buildStack("<br />");
                    break;
                case AR.ERROR.TYPE.IMMUTABLE:
                    c = AR.ERROR.ERROR_PREFIX + d + " must not be altered." + buildStack("<br />");
                    break;
                case AR.ERROR.TYPE.HEX:
                    c = AR.ERROR.ERROR_PREFIX + d + " is not a valid hex value." + buildStack("<br />");
                    break;
                case AR.ERROR.TYPE.UNKNOWN_PROPERTY:
                    c = AR.ERROR.ERROR_PREFIX + "Property " + d + " cannot be found." + buildStack("<br />");
                    break;
                case AR.ERROR.TYPE.STRING:
                    c = AR.ERROR.ERROR_PREFIX + d + " is not a String value." + buildStack("<br />");
                    break
            }
            AR.logger.error(c);
            return c
        },
        TYPE: {
            UNDEFINED: "___UNDEFINED___",
            INVALID_VALUE: "___INVALID___",
            RANGE: "___RANGE___",
            FLOAT: "___FLOAT___",
            INT: "___INT___",
            BOOLEAN: "___BOOLEAN___",
            ARRAY_CONTENT: "___ARRAY_CONTENT___",
            OBJECT: "___OBJECT___",
            IMMUTABLE: "___IMMUTABLE___",
            HEX: "___HEX___",
            UNKNOWN_PROPERTY: "___UNKNOWN_PROPERTY___",
            STRING: "___STRING___",
            ENUMERATION: "___ENUMERATION___"
        }
    };
    _PROPERTY_VALIDATOR = {
        TYPE: {
            FUNCTION: 1,
            BOOLEAN: 2,
            STRING: 3,
            POSITIVE: 4,
            UNIT_INTERVAL: 5,
            CLASS: 6,
            ARRAY: 7,
            ARRAY_OR_PROPERTY: 8,
            NUMERIC: 9,
            POSITIVE_INT: 10,
            NON_NEGATIVE_INT: 11,
            INT: 12,
            RGBA: 13,
            NON_NEGATIVE: 14
        },
        RULE: {
            MUST_BE_SET: 0,
            CAN_BE_EMPTY: 1
        },
        validate: function(a, h, d, g, c) {
            var e = true;
            switch (g) {
                case _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY:
                    if (h == null || h == undefined) {
                        e = false;
                        break
                    }
                    break;
                case _PROPERTY_VALIDATOR.RULE.MUST_BE_SET:
                    if (h == null || h == undefined) {
                        throw AR.ERROR.create(a, AR.ERROR.TYPE.UNDEFINED)
                    }
                    break
            }
            if (e) {
                if (d) {
                    if (!(d.type)) {
                        d = {
                            type: d
                        }
                    }
                    switch (d.type) {
                        case _PROPERTY_VALIDATOR.TYPE.FUNCTION:
                            if (typeof h == "function") {
                                break
                            } else {
                                throw AR.ERROR.create(a, AR.ERROR.TYPE.OBJECT, "function", typeof h)
                            }
                            break;
                        case _PROPERTY_VALIDATOR.TYPE.BOOLEAN:
                            if (typeof h == "boolean") {
                                break
                            } else {
                                throw AR.ERROR.create(a, AR.ERROR.TYPE.BOOLEAN)
                            }
                            break;
                        case _PROPERTY_VALIDATOR.TYPE.STRING:
                            if (typeof h == "string") {
                                break
                            } else {
                                throw AR.ERROR.create(a, AR.ERROR.TYPE.STRING)
                            }
                            break;
                        case _PROPERTY_VALIDATOR.TYPE.NUMERIC:
                            if (typeof h != "number") {
                                throw AR.ERROR.create(a, AR.ERROR.TYPE.FLOAT)
                            }
                            break;
                        case _PROPERTY_VALIDATOR.TYPE.UNIT_INTERVAL:
                            h = _PROPERTY_VALIDATOR.validate(a, h, _PROPERTY_VALIDATOR.TYPE.NUMERIC, g, c);
                            if (h < 0 || h > 1) {
                                throw AR.ERROR.create(a, AR.ERROR.TYPE.RANGE, "[0, 1]")
                            } else {
                                break
                            }
                            break;
                        case _PROPERTY_VALIDATOR.TYPE.POSITIVE:
                            h = _PROPERTY_VALIDATOR.validate(a, h, _PROPERTY_VALIDATOR.TYPE.NUMERIC, g, c);
                            if (h <= 0) {
                                throw AR.ERROR.create(a, AR.ERROR.TYPE.RANGE, "(0, infinity)")
                            } else {
                                break
                            }
                            break;
                        case _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE:
                            h = _PROPERTY_VALIDATOR.validate(a, h, _PROPERTY_VALIDATOR.TYPE.NUMERIC, g, c);
                            if (h < 0) {
                                throw AR.ERROR.create(a, AR.ERROR.TYPE.RANGE, "[0, infinity)")
                            } else {
                                break
                            }
                            break;
                        case _PROPERTY_VALIDATOR.TYPE.POSITIVE_INT:
                            h = _PROPERTY_VALIDATOR.validate(a, h, _PROPERTY_VALIDATOR.TYPE.INT, g, c);
                            if (h <= 0) {
                                throw AR.ERROR.create(a, AR.ERROR.TYPE.RANGE, "(0, infinity)")
                            }
                            break;
                        case _PROPERTY_VALIDATOR.TYPE.INT:
                            if (typeof h != "number") {
                                throw AR.ERROR.create(a, AR.ERROR.TYPE.FLOAT)
                            } else {
                                if (Math.round(h) != h) {
                                    throw AR.ERROR.create(a, AR.ERROR.TYPE.INT)
                                }
                            }
                            break;
                        case _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE_INT:
                            h = _PROPERTY_VALIDATOR.validate(a, h, _PROPERTY_VALIDATOR.TYPE.INT, g, c);
                            if (h <= 0) {
                                throw AR.ERROR.create(a, AR.ERROR.TYPE.RANGE, "(0, infinity)")
                            }
                            break;
                        case _PROPERTY_VALIDATOR.TYPE.CLASS:
                            if (h instanceof d.ofType) {
                                break
                            } else {
                                throw AR.ERROR.create(a, AR.ERROR.TYPE.OBJECT, d.ofType)
                            }
                            break;
                        case _PROPERTY_VALIDATOR.TYPE.ARRAY:
                            if (!(h instanceof Array)) {
                                throw AR.ERROR.create(a, AR.ERROR.TYPE.ARRAY_CONTENT)
                            }
                            for (var f = 0; f < h.length; f++) {
                                if (!(h[f] instanceof d.ofType)) {
                                    throw AR.ERROR.create(a, AR.ERROR.TYPE.ARRAY_CONTENT)
                                }
                            }
                            break;
                        case _PROPERTY_VALIDATOR.TYPE.ARRAY_OR_PROPERTY:
                            if (h instanceof d.ofType) {
                                h = new Array(h);
                                break
                            }
                            h = _PROPERTY_VALIDATOR.validate(a, h, {
                                type: _PROPERTY_VALIDATOR.TYPE.ARRAY,
                                ofType: d.ofType
                            }, g, c);
                            break;
                        case _PROPERTY_VALIDATOR.TYPE.RGBA:
                            if (typeof h != "string" || h.charAt(0) != "#") {
                                throw AR.ERROR.create(a, AR.ERROR.TYPE.HEX)
                            }
                            var j = h.length;
                            if (j != 7 && j != 9) {
                                throw AR.ERROR.create(a, AR.ERROR.TYPE.HEX)
                            }
                            h = h.toUpperCase();
                            var b = "0123456789ABCDEF";
                            for (var f = 1; f < j; f++) {
                                if (b.indexOf(h.charAt(f)) < 0) {
                                    throw AR.ERROR.create(a, AR.ERROR.TYPE.HEX)
                                }
                            }
                            if (j == 7) {
                                h += "FF"
                            }
                            return h;
                            break;
                        default:
                            throw "Invalid test"
                    }
                }
            }
            if (c) {
                return c()
            }
            return h
        }
    };
    AR.om = {
        __currentObjectID__: 1,
        __objects__: [],
        registerObjectForID: function registerObjectForID(b, a) {
            AR.om.__objects__[b] = a
        },
        getObjectForID: function getObjectForID(a) {
            return AR.om.__objects__[a]
        },
        getExistingObjectForID: function getObjectForID(b) {
            var a = AR.om.__objects__[b];
            if (a) {
                return a
            } else {
                throw "Object with ID " + b + " does not exist - maybe it was already destroyed?"
            }
        },
        createObjectID: function createObjectID() {
            return AR.om.__currentObjectID__++
        },
        destroyAllObjects: function destroyAllObjects(b) {
            for (var c in AR.om.__objects__) {
                var a = AR.om.getObjectForID(c);
                if (a != null && a != undefined && a.__id != undefined) {
                    a.destroy(b)
                }
            }
            AR.om.resetObjectManager()
        },
        resetObjectManager: function resetObjectManager() {
            AR.om.__currentObjectID__ = 1;
            AR.om.__objects__.splice(0, AR.om.__objects__.length - 1)
        },
        __getIds__: function(d) {
            var b = new Array();
            if (!d) {
                return b
            }
            var c = 0;
            for (var a = 0; a < d.length; a++) {
                if (d[a] != null && !(d[a].destroyed)) {
                    b[c] = d[a].__id;
                    c++
                }
            }
            return b
        },
        __getObjects__: function(b) {
            var d = new Array();
            if (!b) {
                return d
            }
            var c = 0;
            for (var a = 0; a < b.length; a++) {
                if (b[a] != null) {
                    d[c] = AR.om.getObjectForID(b[a]);
                    c++
                }
            }
            return d
        }
    };
    AR.bm = {
        batchQueue: new Array(),
        originalSyncDistributor: null,
        originalAsyncDistributor: null,
        batchSyncDistributor: function(a) {
            AR.bm.batchQueue.push(a)
        },
        batchAsyncDistributor: function(a) {
            AR.bm.batchQueue.push(a)
        },
        setBatchCreationActive: function() {
            AR.bm.originalSyncDistributor = AR.i.callSync;
            AR.bm.originalAsyncDistributor = AR.i.callAsync;
            AR.i.callSync = AR.bm.batchSyncDistributor;
            AR.i.callAsync = AR.bm.batchAsyncDistributor
        },
        setBatchCreationDeactivated: function() {
            AR.bm.originalAsyncDistributor(AR.bm.batchQueue);
            AR.i.callSync = AR.bm.originalSyncDistributor;
            AR.i.callAsync = AR.bm.originalAsyncDistributor;
            AR.bm.batchQueue.splice(0, AR.bm.batchQueue.length)
        }
    };
    AR.js.clickbuster = {};
    AR.js.clickbuster.preventGhostClick = function(a, b) {
        AR.js.clickbuster.coordinates.push(a, b);
        window.setTimeout(AR.js.clickbuster.pop, 2500)
    };
    AR.js.clickbuster.pop = function() {
        AR.js.clickbuster.coordinates.splice(0, 2)
    };
    AR.js.clickbuster.coordinates = [];
    AR.js.click = {};
    AR.js.click.onClickTrigger = function(d) {
        for (var c = 0; c < d.drawables.length; c++) {
            var b = AR.om.getObjectForID(d.drawables[c].drawable);
            if (b && b.onClick) {
                if (b.__onClick__(AR.om.getObjectForID(d.drawables[c].arObject))) {
                    return
                }
            }
        }
        for (var c = 0; c < d.arObjects.length; c++) {
            var a = AR.om.getObjectForID(d.arObjects[c]);
            if (a && a.onClick) {
                if (a.onClick()) {
                    return
                }
            }
        }
        if (AR.context.onScreenClick) {
            AR.context.onScreenClick()
        }
    };
    AR.js.clickBehavior = {};
    AR.js.clickBehavior = {
        clickEvent: function(c) {
            for (var b = 0; b < AR.js.clickbuster.coordinates.length; b += 2) {
                var a = AR.js.clickbuster.coordinates[b];
                var d = AR.js.clickbuster.coordinates[b + 1];
                if (Math.abs(c.clientX - a) < 25 && Math.abs(c.clientY - d) < 25) {
                    c.stopPropagation();
                    c.preventDefault()
                }
            }
        },
        executeClick: function(a) {
            if (a.target === document.body || a.target === document.documentElement || (a.target.style.background == "none" && typeof(a.target.attributes["data-role"]) !== "undefined" && a.target.attributes["data-role"].value === "page")) {
                AR.js.click.executePlatformClick(a)
            }
        }
    };
    AR.js.clickBehavior.touchDown = {
        touchstartEvent: function(a) {
            AR.js.clickBehavior.executeClick(a)
        }
    };
    AR.js.clickBehavior.touchClick = {
        touchstartEvent: function(a) {
            AR.js.clickBehavior.moveDistance = 0;
            AR.js.clickBehavior.startX = a.touches[0].screenX;
            AR.js.clickBehavior.startY = a.touches[0].screenY;
            AR.js.clickBehavior.lastX = a.touches[0].screenX;
            AR.js.clickBehavior.lastY = a.touches[0].screenY
        },
        touchmoveEvent: function(c) {
            var b = (c.touches[0].screenX - AR.js.clickBehavior.lastX);
            var a = (c.touches[0].screenY - AR.js.clickBehavior.lastY);
            AR.js.clickBehavior.lastX = c.touches[0].screenX;
            AR.js.clickBehavior.lastY = c.touches[0].screenY;
            AR.js.clickBehavior.moveDistance += b * b + a * a
        },
        touchendEvent: function(d) {
            var c = (d.changedTouches[0].screenX - AR.js.clickBehavior.lastX);
            var b = (d.changedTouches[0].screenY - AR.js.clickBehavior.lastY);
            AR.js.clickBehavior.moveDistance += c * c + b * b;
            var a = (d.changedTouches[0].screenX - AR.js.clickBehavior.startX);
            var f = (d.changedTouches[0].screenY - AR.js.clickBehavior.startY);
            var e = a * a + f * f;
            if (AR.js.clickBehavior.moveDistance < 1000 && e < 100) {
                AR.js.clickBehavior.executeClick(d)
            }
        }
    };
    AR.js.clickBehavior.touchUp = {
        touchendEvent: function(a) {
            AR.js.clickBehavior.executeClick(a)
        }
    };
    AR.js.clickBehavior.removeClickBehavior = function() {
        if (AR.js.clickBehavior.currentBehavior != null) {
            if (AR.js.clickBehavior.currentBehavior.touchstartEvent != null) {
                document.removeEventListener("touchstart", AR.js.clickBehavior.currentBehavior.touchstartEvent, true)
            }
            if (AR.js.clickBehavior.currentBehavior.touchmoveEvent != null) {
                document.removeEventListener("touchmove", AR.js.clickBehavior.currentBehavior.touchmoveEvent, true)
            }
            if (AR.js.clickBehavior.currentBehavior.touchendEvent != null) {
                document.removeEventListener("touchend", AR.js.clickBehavior.currentBehavior.touchendEvent, true)
            }
            document.removeEventListener("click", AR.js.clickBehavior.clickEvent);
            AR.js.clickBehavior.currentBehavior = null
        }
    };
    AR.js.clickBehavior.addClickBehavior = function(a) {
        var b;
        if (a === "touchDown") {
            b = AR.js.clickBehavior.touchDown
        } else {
            if (a === "touchClick") {
                b = AR.js.clickBehavior.touchClick
            } else {
                if (a === "touchUp") {
                    b = AR.js.clickBehavior.touchUp
                }
            }
        }
        if (b.touchstartEvent != null) {
            document.addEventListener("touchstart", b.touchstartEvent, true)
        }
        if (b.touchmoveEvent != null) {
            document.addEventListener("touchmove", b.touchmoveEvent, true)
        }
        if (b.touchendEvent != null) {
            document.addEventListener("touchend", b.touchendEvent, true)
        }
        AR.js.clickBehavior.currentBehavior = b;
        AR.js.clickBehavior.clickEvent = document.addEventListener("click", AR.js.clickBehavior.clickEvent, true)
    };
    AR.js.clickBehavior.setClickBehavior = function(a) {
        AR.js.clickBehavior.removeClickBehavior();
        AR.js.clickBehavior.addClickBehavior(a)
    };
    AR.js.clickBehavior.setClickBehavior("touchClick");
    AR.ARchitectObject = PClass.create({
        init: function() {
            var a = false;
            var b = {};
            this.__defineSetter__("destroyed", function(c) {
                throw AR.ERROR.create("destroyed", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("destroyed", function() {
                return a
            });
            this.__isDirtyInternally = function(c) {
                return b[c] != undefined
            };
            this.__alertDirty = function(c) {
                var d = b[c];
                if (d) {
                    b[c]++
                } else {
                    b[c] = 1
                }
            };
            this.__removeDirt = function(c) {
                var d = b[c];
                if (d) {
                    b[c]--;
                    if (b[c] == 0) {
                        delete b[c]
                    }
                }
            }
        },
        __isDirty: function(a) {
            return this.__isDirtyInternally(a)
        },
        destroy: function(d) {
            if (!d) {
                AR.i.callAsync({
                    objectId: this.__id,
                    is: "AR.i.contextInterface.destroy"
                })
            }
            if (AR.ADE && AR.ADE.instance && AR.ADE.instance.alertDeletion) {
                AR.ADE.instance.alertDeletion(this.__id)
            }
            delete AR.om.__objects__[this.__id];
            for (var a in this) {
                delete this[a];
                if (this[a] != undefined) {
                    try {
                        this[a] = undefined
                    } catch (c) {
                        if (contextInterface.info) {
                            AR.i.callAsync({
                                is: "AR.i.contextInterface.info",
                                message: "Exception caught: " + c
                            })
                        }
                    }
                }
            }
            var b = true;
            this.__defineSetter__("destroyed", function(e) {
                throw AR.ERROR.create("destroyed", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("destroyed", function() {
                return b
            })
        }
    });
    AR.ARObject = AR.ARchitectObject.extend({
        init: function(d) {
            this._super();
            var b = null;
            var c;
            var g;
            var e;
            var a = true;
            var f = 0;
            if (d) {
                if (d.enabled != undefined) {
                    a = _PROPERTY_VALIDATOR.validate("enabled", d.enabled, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
                }
                if (d.triggers) {
                    if (d.triggers.onEnterFieldOfVision) {
                        c = _PROPERTY_VALIDATOR.validate("triggers.onEnterFieldOfVision", d.triggers.onEnterFieldOfVision, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                    }
                    if (d.triggers.onExitFieldOfVision) {
                        g = _PROPERTY_VALIDATOR.validate("triggers.onExitFieldOfVision", d.triggers.onExitFieldOfVision, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                    }
                }
                if (d.onEnterFieldOfVision) {
                    c = _PROPERTY_VALIDATOR.validate("onEnterFieldOfVision", d.onEnterFieldOfVision, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
                if (d.onExitFieldOfVision) {
                    g = _PROPERTY_VALIDATOR.validate("onExitFieldOfVision", d.onExitFieldOfVision, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
                if (d.onClick) {
                    e = _PROPERTY_VALIDATOR.validate("onClick", d.onClick, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
                b = new AR.ARObjectDrawables(this, d.drawables);
                if (d.renderingOrder) {
                    f = _PROPERTY_VALIDATOR.validate("renderingOrder", d.renderingOrder, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
                }
            } else {
                b = new AR.ARObjectDrawables(this, null)
            }
            this.__defineSetter__("drawables", function(h) {
                throw AR.ERROR.create("drawables", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("drawables", function() {
                return b
            });
            this.__defineSetter__("enabled", function(h) {
                h = _PROPERTY_VALIDATOR.validate("enabled", h, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                AR.i.callAsync({
                    objectId: this.__id,
                    enabled: h,
                    is: "AR.i.arObjectInterface.setEnabled"
                });
                a = h
            });
            this.__defineGetter__("enabled", function() {
                return a
            });
            this.__defineSetter__("renderingOrder", function(h) {
                h = _PROPERTY_VALIDATOR.validate("renderingOrder", h, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                AR.i.callAsync({
                    objectId: this.__id,
                    renderingOrder: h,
                    is: "AR.i.arObjectInterface.setRenderingOrder"
                });
                f = h
            });
            this.__defineGetter__("renderingOrder", function() {
                return f
            });
            this.__defineSetter__("onEnterFieldOfVision", function(h) {
                h = _PROPERTY_VALIDATOR.validate("onEnterFieldOfVision", h, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                c = h;
                AR.i.callAsync({
                    objectId: this.__id,
                    onEnterFieldOfVisionTriggerActive: h != null,
                    is: "AR.i.arObjectInterface.setOnEnterFieldOfVisionTriggerActive"
                })
            });
            this.__defineGetter__("onEnterFieldOfVision", function() {
                return c
            });
            this.__defineSetter__("__onEnterFieldOfVision__", function(h) {});
            this.__defineGetter__("__onEnterFieldOfVision__", function() {
                var h = null;
                if (c) {
                    if (this._triggers) {
                        h = this.onEnterFieldOfVision.call(this._triggers)
                    } else {
                        h = this.onEnterFieldOfVision()
                    }
                }
                return function() {
                    return h
                }
            });
            this.__defineSetter__("onExitFieldOfVision", function(h) {
                h = _PROPERTY_VALIDATOR.validate("onExitFieldOfVision", h, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                g = h;
                AR.i.callAsync({
                    objectId: this.__id,
                    onExitFieldOfVisionTriggerActive: h != null,
                    is: "AR.i.arObjectInterface.setOnExitFieldOfVisionTriggerActive"
                })
            });
            this.__defineGetter__("onExitFieldOfVision", function() {
                return g
            });
            this.__defineSetter__("__onExitFieldOfVision__", function(h) {});
            this.__defineGetter__("__onExitFieldOfVision__", function() {
                var h = null;
                if (g) {
                    if (this._triggers) {
                        h = g.call(this._triggers)
                    } else {
                        h = g()
                    }
                }
                return function() {
                    return h
                }
            });
            this.__defineSetter__("onClick", function(h) {
                h = _PROPERTY_VALIDATOR.validate("onClick", h, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                e = h;
                AR.i.callAsync({
                    objectId: this.__id,
                    onClickTriggerActive: h != null,
                    is: "AR.i.arObjectInterface.setOnClickTriggerActive"
                })
            });
            this.__defineGetter__("onClick", function() {
                return e
            });
            return {
                drawables: b,
                onEnterFieldOfVisionTriggerActive: c != null,
                onExitFieldOfVisionTriggerActive: g != null,
                onClickTriggerActive: e != null,
                enabled: a,
                renderingOrder: f
            }
        },
        isVisible: function() {
            return arObjectInterface.isVisible({
                objectId: this.__id,
                is: "AR.i.arObjectInterface.isVisible"
            })
        }
    });
    AR.ARObjectDrawables = PClass.create({
        init: function(a, g) {
            var e = a;
            var h = new Array();
            var d = new Array();
            var c = new Array();
            if (g != null) {
                if (g.cam) {
                    h = _PROPERTY_VALIDATOR.validate("drawables.cam", g.cam, {
                        type: _PROPERTY_VALIDATOR.TYPE.ARRAY_OR_PROPERTY,
                        ofType: AR.Drawable
                    }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
                if (g.radar) {
                    d = _PROPERTY_VALIDATOR.validate("drawables.radar", g.radar, {
                        type: _PROPERTY_VALIDATOR.TYPE.ARRAY_OR_PROPERTY,
                        ofType: AR.Drawable2D
                    }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
                if (g.indicator) {
                    c = _PROPERTY_VALIDATOR.validate("drawables.indicator", g.indicator, {
                        type: _PROPERTY_VALIDATOR.TYPE.ARRAY_OR_PROPERTY,
                        ofType: AR.Drawable2D
                    }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
            }
            this.__defineSetter__("cam", function(i) {
                i = _PROPERTY_VALIDATOR.validate("drawables.cam", i, {
                    type: _PROPERTY_VALIDATOR.TYPE.ARRAY_OR_PROPERTY,
                    ofType: AR.Drawable
                }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                AR.i.callAsync({
                    objectId: a.__id,
                    camDrawableIds: AR.__toJSONString__(AR.om.__getIds__(i)),
                    is: "AR.i.arObjectInterface.setCamDrawables"
                });
                h = i
            });
            this.__defineGetter__("cam", function() {
                return h
            });
            this.__defineSetter__("radar", function(i) {
                if (a instanceof AR.GeoObject) {
                    i = _PROPERTY_VALIDATOR.validate("drawables.radar", i, {
                        type: _PROPERTY_VALIDATOR.TYPE.ARRAY_OR_PROPERTY,
                        ofType: AR.Drawable2D
                    }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                    AR.i.callAsync({
                        objectId: a.__id,
                        radarDrawableIds: AR.__toJSONString__(AR.om.__getIds__(i)),
                        is: "AR.i.geoObjectInterface.setRadarDrawables"
                    });
                    d = i
                }
            });
            this.__defineGetter__("radar", function() {
                return d
            });
            this.__defineSetter__("indicator", function(i) {
                if (a instanceof AR.GeoObject) {
                    i = _PROPERTY_VALIDATOR.validate("drawables.indicator", i, {
                        type: _PROPERTY_VALIDATOR.TYPE.ARRAY_OR_PROPERTY,
                        ofType: AR.Drawable2D
                    }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                    AR.i.callAsync({
                        objectId: a.__id,
                        indicatorDrawableIds: AR.__toJSONString__(AR.om.__getIds__(i)),
                        is: "AR.i.geoObjectInterface.setIndicatorDrawables"
                    });
                    c = i
                }
            });
            this.__defineGetter__("indicator", function() {
                return c
            });
            this.addCamDrawable = function(j, i) {
                h = b(h, j, i, AR.Drawable);
                AR.i.callAsync({
                    objectId: a.__id,
                    camDrawableIds: AR.__toJSONString__(AR.om.__getIds__(h)),
                    is: "AR.i.arObjectInterface.setCamDrawables"
                })
            };
            this.removeCamDrawable = function(i) {
                h = f(h, i, AR.Drawable);
                AR.i.callAsync({
                    objectId: a.__id,
                    camDrawableIds: AR.__toJSONString__(AR.om.__getIds__(h)),
                    is: "AR.i.arObjectInterface.setCamDrawables"
                })
            };
            this.addRadarDrawable = function(j, i) {
                if (a instanceof AR.GeoObject) {
                    d = b(d, j, i, AR.Drawable2D);
                    AR.i.callAsync({
                        objectId: a.__id,
                        radarDrawableIds: AR.__toJSONString__(AR.om.__getIds__(d)),
                        is: "AR.i.geoObjectInterface.setRadarDrawables"
                    })
                }
            };
            this.removeRadarDrawable = function(i) {
                if (a instanceof AR.GeoObject) {
                    d = f(d, i, AR.Drawable2D);
                    AR.i.callAsync({
                        objectId: a.__id,
                        radarDrawableIds: AR.__toJSONString__(AR.om.__getIds__(d)),
                        is: "AR.i.geoObjectInterface.setRadarDrawables"
                    })
                }
            };
            this.addIndicatorDrawable = function(j, i) {
                if (a instanceof AR.GeoObject) {
                    c = b(c, j, i, AR.Drawable2D);
                    AR.i.callAsync({
                        objectId: a.__id,
                        indicatorDrawableIds: AR.__toJSONString__(AR.om.__getIds__(c)),
                        is: "AR.i.geoObjectInterface.setIndicatorDrawables"
                    })
                }
            };
            this.removeIndicatorDrawable = function(i) {
                if (a instanceof AR.GeoObject) {
                    c = f(c, i, AR.Drawable2D);
                    AR.i.callAsync({
                        objectId: a.__id,
                        indicatorDrawableIds: AR.__toJSONString__(AR.om.__getIds__(c)),
                        is: "AR.i.geoObjectInterface.setIndicatorDrawables"
                    })
                }
            };
            var b = function(p, m, k, o) {
                m = _PROPERTY_VALIDATOR.validate("drawable", m, {
                    type: _PROPERTY_VALIDATOR.TYPE.ARRAY_OR_PROPERTY,
                    ofType: o
                }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                if (!k) {
                    k = -1
                } else {
                    if (!AR.VALIDATE.isWholeNumber(k)) {
                        throw AR.ERROR.create("position", AR.ERROR.TYPE.INT)
                    }
                    if (!AR.VALIDATE.isNonNegative(k)) {
                        throw AR.ERROR.create("position", AR.ERROR.TYPE.RANGE, "[0, Infinity)")
                    }
                }
                if (k < 0) {
                    for (var l = 0; l < m.length; l++) {
                        p.push(m[l])
                    }
                    return p
                } else {
                    var j = new Array();
                    var n = 0;
                    for (var l = 0; l < k; l++) {
                        j[n] = p[l];
                        n++
                    }
                    for (var l = 0; l < m.length; l++) {
                        j[n] = m[l];
                        n++
                    }
                    for (var l = k; l < p.length; l++) {
                        j[n] = p[l];
                        n++
                    }
                    return j
                }
            };
            var f = function(o, m, n) {
                if (AR.VALIDATE.isWholeNumber(m)) {
                    if (!AR.VALIDATE.isNonNegative(m)) {
                        throw AR.ERROR.create("position", AR.ERROR.TYPE.RANGE, "[0, Infinity)")
                    }
                    o.splice(m, 1);
                    return o
                }
                m = _PROPERTY_VALIDATOR.validate("drawable", m, {
                    type: _PROPERTY_VALIDATOR.TYPE.ARRAY_OR_PROPERTY,
                    ofType: n
                }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                for (var l = 0; l < m.length; l++) {
                    for (var k = 0; k < o.length; k++) {
                        if (m[l] == o[k]) {
                            o.splice(k, 1)
                        }
                    }
                }
                return o
            }
        }
    });
    AR.Drawable = AR.ARchitectObject.extend({
        init: function(b) {
            this._super();
            var a = true;
            var c;
            var d = null;
            if (b) {
                a = _PROPERTY_VALIDATOR.validate("enabled", b.enabled, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                if (a == null) {
                    a = true
                }
                if (b.triggers) {
                    c = _PROPERTY_VALIDATOR.validate("onClick", b.triggers.onClick, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
                if (b.onClick) {
                    c = _PROPERTY_VALIDATOR.validate("onClick", b.onClick, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
            }
            if (!b || !b.rotate) {
                d = new AR.DrawableRotate(this, b)
            } else {
                d = new AR.DrawableRotate(this, b.rotate)
            }
            this.__defineSetter__("enabled", function(e) {
                e = _PROPERTY_VALIDATOR.validate("enabled", e, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                if (e == null) {
                    e = true
                }
                AR.i.callAsync({
                    objectId: this.__id,
                    is: "AR.i.drawableInterface.setEnabled",
                    enabled: e
                });
                a = e
            });
            this.__defineGetter__("enabled", function() {
                return a
            });
            this.__defineSetter__("rotate", function(e) {
                _scale = new AR.DrawableRotate(this, e);
                AR.i.callAsync({
                    is: "AR.i.drawableInterface.setRoll",
                    objectId: this.__id,
                    roll: d.roll
                });
                AR.i.callAsync({
                    is: "AR.i.drawableInterface.setTilt",
                    objectId: this.__id,
                    tilt: d.tilt
                });
                AR.i.callAsync({
                    is: "AR.i.drawableInterface.setHeading",
                    objectId: this.__id,
                    heading: d.heading
                })
            });
            this.__defineGetter__("rotate", function() {
                return d
            });
            this.__defineSetter__("onClick", function(e) {
                e = _PROPERTY_VALIDATOR.validate("onClick", e, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                c = e;
                AR.i.callAsync({
                    objectId: this.__id,
                    is: "AR.i.drawableInterface.setOnClickTriggerActive",
                    onClickTriggerActive: e != null
                })
            });
            this.__defineGetter__("onClick", function() {
                return c
            });
            this.__defineSetter__("__onClick__", function(e) {});
            this.__defineGetter__("__onClick__", function() {
                var e = function() {
                    return null
                };
                if (c) {
                    if (this._triggers) {
                        e = function(f) {
                            return c.call(this._triggers)
                        }
                    } else {
                        e = function(f) {
                            return c.call(this, f)
                        }
                    }
                }
                return e
            });
            return {
                enabled: a,
                onClickActive: c != null,
                roll: d.roll,
                tilt: d.tilt,
                heading: d.heading
            }
        }
    });
    AR.DrawableRotate = PClass.create({
        init: function(d, c) {
            var f = d;
            var b = 0;
            var a = 0;
            var e = 0;
            if (c && (typeof c != "object")) {
                throw AR.ERROR.create("rotate", AR.ERROR.TYPE.OBJECT, "rotate")
            }
            if (c) {
                if (c.roll) {
                    b = _PROPERTY_VALIDATOR.validate("rotate.roll", c.roll, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
                }
                if (c.tilt) {
                    a = _PROPERTY_VALIDATOR.validate("rotate.tilt", c.tilt, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
                }
                if (c.heading) {
                    e = _PROPERTY_VALIDATOR.validate("rotate.heading", c.heading, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
                }
            }
            this.__defineSetter__("roll", function(g) {
                g = _PROPERTY_VALIDATOR.validate("rotate.roll", g, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                AR.i.callAsync({
                    objectId: f.__id,
                    is: "AR.i.drawableInterface.setRoll",
                    roll: g
                });
                b = g
            });
            this.__defineGetter__("roll", function() {
                if (f.__isDirty("rotate.roll")) {
                    return AR.i.callSync({
                        objectId: f.__id,
                        is: "AR.i.drawableInterface.getRoll"
                    })
                }
                return b
            });
            this.__defineSetter__("tilt", function(g) {
                g = _PROPERTY_VALIDATOR.validate("rotate.tilt", g, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                AR.i.callAsync({
                    objectId: f.__id,
                    is: "AR.i.drawableInterface.setTilt",
                    tilt: g
                });
                a = g
            });
            this.__defineGetter__("tilt", function() {
                if (f.__isDirty("rotate.tilt")) {
                    return AR.i.callSync({
                        objectId: f.__id,
                        is: "AR.i.drawableInterface.getTilt"
                    })
                }
                return a
            });
            this.__defineSetter__("heading", function(g) {
                g = _PROPERTY_VALIDATOR.validate("rotate.heading", g, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                AR.i.callAsync({
                    objectId: f.__id,
                    is: "AR.i.drawableInterface.setHeading",
                    heading: g
                });
                e = g
            });
            this.__defineGetter__("heading", function() {
                if (f.__isDirty("rotate.heading")) {
                    return AR.i.callSync({
                        objectId: f.__id,
                        is: "AR.i.drawableInterface.getHeading"
                    })
                }
                return e
            })
        }
    });
    AR.Drawable2D = AR.Drawable.extend({
        validateHorizontalAnchor: function(a) {
            if (!AR.CONST.HORIZONTAL_ANCHOR.isValidHorizontalAnchor(a)) {
                throw AR.ERROR.create("horizontalAnchor", AR.ERROR.TYPE.OBJECT, "HORIZONTAL_ANCHOR.___", typeof a)
            }
            return a
        },
        validateVerticalAnchor: function(a) {
            if (!AR.CONST.VERTICAL_ANCHOR.isValidVerticalAnchor(a)) {
                throw AR.ERROR.create("verticalAnchor", AR.ERROR.TYPE.OBJECT, "VERTICAL_ANCHOR.___", typeof a)
            }
            return a
        },
        validateScale: function(a) {
            if (!AR.VALIDATE.isDefined(a)) {
                throw AR.ERROR.create("scale", AR.ERROR.TYPE.UNDEFINED)
            }
            if (!AR.VALIDATE.isNonNegative(a)) {
                throw AR.ERROR.create("scale", AR.ERROR.TYPE.RANGE, "[0, infitity)")
            }
            return a
        },
        validateRotation: function(a) {
            if (!AR.VALIDATE.isDefined(a)) {
                throw AR.ERROR.create("rotation", AR.ERROR.TYPE.UNDEFINED)
            }
            if (!AR.VALIDATE.isNumeric(a)) {
                throw AR.ERROR.create("rotation", AR.ERROR.TYPE.FLOAT)
            }
            return a
        },
        validateOpacity: function(a) {
            if (!AR.VALIDATE.isDefined(a)) {
                throw AR.ERROR.create("opacity", AR.ERROR.TYPE.UNDEFINED)
            }
            if (!AR.VALIDATE.isInRange(a, 0, 1)) {
                throw AR.ERROR.create("opacity", AR.ERROR.TYPE.RANGE, "[0, 1]")
            }
            return a
        },
        validateOffsetX: function(a) {
            if (!AR.VALIDATE.isDefined(a)) {
                throw AR.ERROR.create("offsetX", AR.ERROR.TYPE.UNDEFINED)
            }
            if (!AR.VALIDATE.isNumeric(a)) {
                throw AR.ERROR.create("offsetX", AR.ERROR.TYPE.FLOAT)
            }
            return a
        },
        validateOffsetY: function(a) {
            if (!AR.VALIDATE.isDefined(a)) {
                throw AR.ERROR.create("offsetY", AR.ERROR.TYPE.UNDEFINED)
            }
            if (!AR.VALIDATE.isNumeric(a)) {
                throw AR.ERROR.create("offsetY", AR.ERROR.TYPE.FLOAT)
            }
            return a
        },
        validateZOrder: function(a) {
            if (!AR.VALIDATE.isDefined(a)) {
                throw AR.ERROR.create("zOrder", AR.ERROR.TYPE.UNDEFINED)
            }
            if (!AR.VALIDATE.isNumeric(a)) {
                throw AR.ERROR.create("zOrder", AR.ERROR.TYPE.INT)
            }
            return a
        },
        init: function(i, a, l) {
            var j = this.validateHorizontalAnchor(i);
            var b = this.validateVerticalAnchor(a);
            var g = 1;
            var c = 0;
            var h = 1;
            var e = 0;
            var d = 0;
            var k = 0;
            if (l != null) {
                if (l.horizontalAnchor != null) {
                    j = this.validateHorizontalAnchor(l.horizontalAnchor)
                }
                if (l.verticalAnchor != null) {
                    b = this.validateVerticalAnchor(l.verticalAnchor)
                }
                if (l.scaling != null) {
                    g = this.validateScale(l.scaling)
                }
                if (l.scale != null) {
                    g = this.validateScale(l.scale)
                }
                if (l.rotation != null) {
                    c = this.validateRotation(l.rotation)
                }
                if (l.opacity != null) {
                    h = this.validateOpacity(l.opacity)
                }
                if (l.offsetX != null) {
                    e = this.validateOffsetX(l.offsetX)
                }
                if (l.offsetY != null) {
                    d = this.validateOffsetY(l.offsetY)
                }
                if (l.zOrder != null) {
                    k = this.validateZOrder(l.zOrder)
                }
            }
            var f = this._super(l);
            this.__defineSetter__("scale", function(m) {
                m = this.validateScale(m);
                AR.i.callAsync({
                    objectId: this.__id,
                    is: "AR.i.drawable2DInterface.setScale",
                    scale: m
                });
                g = m
            });
            this.__defineGetter__("scale", function() {
                if (this.__isDirty("scale")) {
                    return AR.i.callSync({
                        objectId: this.__id,
                        is: "AR.i.drawable2DInterface.getScale"
                    })
                }
                return g
            });
            this.__defineSetter__("rotation", function(m) {
                m = this.validateRotation(m);
                AR.i.callAsync({
                    objectId: this.__id,
                    is: "AR.i.drawable2DInterface.setRotation",
                    rotation: m
                });
                c = m
            });
            this.__defineGetter__("rotation", function() {
                if (this.__isDirty("rotation")) {
                    return AR.i.callSync({
                        objectId: this.__id,
                        is: "AR.i.drawable2DInterface.getRotation"
                    })
                }
                return c
            });
            this.__defineSetter__("opacity", function(m) {
                m = this.validateOpacity(m);
                AR.i.callAsync({
                    objectId: this.__id,
                    is: "AR.i.drawable2DInterface.setOpacity",
                    opacity: m
                });
                h = m
            });
            this.__defineGetter__("opacity", function() {
                if (this.__isDirty("opacity")) {
                    return AR.i.callSync({
                        objectId: this.__id,
                        is: "AR.i.drawable2DInterface.getOpacity"
                    })
                }
                return h
            });
            this.__defineSetter__("horizontalAnchor", function(m) {
                m = this.validateHorizontalAnchor(m);
                AR.i.callAsync({
                    objectId: this.__id,
                    is: "AR.i.drawable2DInterface.setHorizontalAnchor",
                    horizontalAnchor: m
                });
                j = m
            });
            this.__defineGetter__("horizontalAnchor", function() {
                return j
            });
            this.__defineSetter__("verticalAnchor", function(m) {
                m = this.validateVerticalAnchor(m);
                AR.i.callAsync({
                    objectId: this.__id,
                    is: "AR.i.drawable2DInterface.setVerticalAnchor",
                    verticalAnchor: m
                });
                b = m
            });
            this.__defineGetter__("verticalAnchor", function() {
                return b
            });
            this.__defineSetter__("offsetX", function(m) {
                m = this.validateOffsetX(m);
                AR.i.callAsync({
                    objectId: this.__id,
                    is: "AR.i.drawable2DInterface.setOffsetX",
                    offsetX: m
                });
                e = m
            });
            this.__defineGetter__("offsetX", function() {
                if (this.__isDirty("offsetX")) {
                    return AR.i.callSync({
                        objectId: this.__id,
                        is: "AR.i.drawable2DInterface.getOffsetX"
                    })
                }
                return e
            });
            this.__defineSetter__("offsetY", function(m) {
                m = this.validateOffsetY(m);
                AR.i.callAsync({
                    objectId: this.__id,
                    is: "AR.i.drawable2DInterface.setOffsetY",
                    offsetY: m
                });
                d = m
            });
            this.__defineGetter__("offsetY", function() {
                if (this.__isDirty("offsetY")) {
                    return AR.i.callSync({
                        objectId: this.__id,
                        is: "AR.i.drawable2DInterface.getOffsetY"
                    })
                }
                return d
            });
            this.__defineSetter__("zOrder", function(m) {
                m = this.validateZOrder(m);
                AR.i.callAsync({
                    objectId: this.__id,
                    is: "AR.i.drawable2DInterface.setZOrder",
                    zOrder: m
                });
                k = m
            });
            this.__defineGetter__("zOrder", function() {
                return k
            });
            f.horizontalAnchor = j;
            f.verticalAnchor = b;
            f.scale = g;
            f.rotation = c;
            f.opacity = h;
            f.offsetX = e;
            f.offsetY = d;
            f.zOrder = k;
            return f
        },
        getBoundingRectangle: function() {
            var a = AR.i.callSync({
                objectId: this.__id,
                is: "AR.i.drawable2DInterface.getBoundingRectangle"
            });
            if (!a) {
                return null
            }
            if (!(AR.isDefined(a.width)) || !(AR.isDefined(a.height))) {
                return null
            }
            return new AR.BoundingRectangle(a.width, a.height)
        }
    });
    AR.Label = AR.Drawable2D.extend({
        init: function(h, b, c) {
            var f = h;
            if (typeof f !== "string") {
                f = "" + f
            }
            var e = this.validateHeight(b);
            var a = null;
            if (c != null) {
                a = new AR.Style(this, c.style)
            } else {
                a = new AR.Style(this, null)
            }
            var g = this._super(AR.CONST.HORIZONTAL_ANCHOR.CENTER, AR.CONST.VERTICAL_ANCHOR.MIDDLE, c);
            var d = AR.om.createObjectID();
            AR.i.callAsync({
                objectId: d,
                is: "AR.i.labelInterface.createLabel",
                enabled: g.enabled,
                offsetX: g.offsetX,
                offsetY: g.offsetY,
                zOrder: g.zOrder,
                onClickTriggerActive: g.onClickActive,
                horizontalAnchor: g.horizontalAnchor,
                verticalAnchor: g.verticalAnchor,
                scale: g.scale,
                rotation: g.rotation,
                opacity: g.opacity,
                text: f,
                fontStyle: a.fontStyle,
                textColor: a.textColor,
                backgroundColor: a.backgroundColor,
                height: e,
                roll: g.roll,
                tilt: g.tilt,
                heading: g.heading
            });
            AR.om.registerObjectForID(d, this);
            this.__defineSetter__("__id", function(i) {
                throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("__id", function() {
                return d
            });
            this.__defineSetter__("text", function(i) {
                if (typeof i !== "string") {
                    i = "" + i
                }
                AR.i.callAsync({
                    is: "AR.i.labelInterface.setText",
                    objectId: d,
                    text: i
                });
                f = i
            });
            this.__defineGetter__("text", function() {
                return f
            });
            this.__defineSetter__("height", function(i) {
                i = this.validateHeight(i);
                AR.i.callAsync({
                    is: "AR.i.labelInterface.setHeight",
                    objectId: d,
                    height: i
                });
                e = i
            });
            this.__defineGetter__("height", function() {
                if (this.__isDirty("height")) {
                    return AR.i.callSync({
                        is: "AR.i.labelInterface.getHeight",
                        objectId: d
                    })
                }
                return e
            });
            this.__defineSetter__("style", function(i) {
                a = new AR.Style(this, i);
                this.setStyleInInterface()
            });
            this.__defineGetter__("style", function() {
                return a
            });
            this.setStyleInInterface = function() {
                AR.i.callAsync({
                    is: "AR.i.labelInterface.setStyle",
                    objectId: d,
                    backgroundColor: a.backgroundColor,
                    textColor: a.textColor,
                    fontStyle: a.fontStyle
                })
            }
        },
        validateHeight: function(a) {
            if ((!AR.VALIDATE.isDefined(a)) || !AR.VALIDATE.isNonNegative(a)) {
                throw AR.ERROR.create("height", AR.ERROR.TYPE.RANGE, "(0, infinity)")
            }
            return a
        }
    });
    AR.Model = AR.Drawable.extend({
        init: function(b, i) {
            this.__modelNotCreatedInCoreYet = true;
            var e = _PROPERTY_VALIDATOR.validate("uri", b, _PROPERTY_VALIDATOR.TYPE.STRING, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            var c, d;
            var g = new AR.ModelScale(this, i && i.scale ? i.scale : undefined);
            var a = new AR.ModelTranslate(this, i ? i.translate : null);
            if (i) {
                if (i.onLoaded) {
                    c = _PROPERTY_VALIDATOR.validate("onLoaded", i.onLoaded, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
                if (i.onError) {
                    d = _PROPERTY_VALIDATOR.validate("onError", i.onError, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
            }
            this.__defineSetter__("__id", function(j) {
                throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("__id", function() {
                return h
            });
            var f = this._super(i);
            var h = AR.om.createObjectID();
            AR.i.callAsync({
                objectId: h,
                is: "AR.i.modelInterface.createModel",
                enabled: f.enabled,
                onClickTriggerActive: f.onClickActive,
                scaleX: g.x,
                scaleY: g.y,
                scaleZ: g.z,
                uri: AR.__resourceUrl(e),
                roll: f.roll,
                tilt: f.tilt,
                heading: f.heading,
                translateX: a.x,
                translateY: a.y,
                translateZ: a.z,
                onLoadedTriggerActive: c != null,
                onErrorTriggerActive: d != null
            });
            delete this.__modelNotCreatedInCoreYet;
            AR.om.registerObjectForID(h, this);
            this.__defineSetter__("uri", function(j) {
                throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("uri", function() {
                return e
            });
            this.__defineSetter__("scale", function(j) {
                g = new AR.ModelScale(this, j)
            });
            this.__defineGetter__("scale", function() {
                return g
            });
            this.__defineSetter__("translate", function(j) {
                a = new AR.ModelTranslate(this, j)
            });
            this.__defineGetter__("translate", function() {
                return a
            });
            this.__defineSetter__("onLoaded", function(j) {
                j = _PROPERTY_VALIDATOR.validate("onLoaded", j, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                c = j;
                AR.i.callAsync({
                    objectId: this.__id,
                    is: "AR.i.modelInterface.setOnLoadedTriggerActive",
                    onLoadedTriggerActive: j != null
                })
            });
            this.__defineGetter__("onLoaded", function() {
                return c
            });
            this.__defineSetter__("onError", function(j) {
                j = _PROPERTY_VALIDATOR.validate("onError", j, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                d = j;
                AR.i.callAsync({
                    objectId: this.__id,
                    is: "AR.i.modelInterface.setOnErrorTriggerActive",
                    onErrorTriggerActive: j != null
                })
            });
            this.__defineGetter__("onError", function() {
                return d
            })
        },
        isLoaded: function() {
            return AR.i.callSync({
                is: "AR.i.modelInterface.isLoaded",
                objectId: this.__id
            })
        }
    });
    AR.ModelScale = PClass.create({
        init: function(e, d) {
            var f = e;
            var c = 1;
            var b = 1;
            var a = 1;
            if (d && (typeof d != "object")) {
                throw AR.ERROR.create("scale", AR.ERROR.TYPE.OBJECT, "scale")
            }
            if (d) {
                if (d.x != null) {
                    c = _PROPERTY_VALIDATOR.validate("scale.x", d.x, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
                if (d.y != null) {
                    b = _PROPERTY_VALIDATOR.validate("scale.y", d.y, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
                if (d.z != null) {
                    a = _PROPERTY_VALIDATOR.validate("scale.z", d.z, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
            }
            if (!f.__modelNotCreatedInCoreYet) {
                AR.i.callAsync({
                    is: "AR.i.modelInterface.setScaleX",
                    objectId: f.__id,
                    scaleX: c
                });
                AR.i.callAsync({
                    is: "AR.i.modelInterface.setScaleY",
                    objectId: f.__id,
                    scaleY: b
                });
                AR.i.callAsync({
                    is: "AR.i.modelInterface.setScaleZ",
                    objectId: f.__id,
                    scaleZ: a
                })
            }
            this.__defineSetter__("x", function(g) {
                c = _PROPERTY_VALIDATOR.validate("scale.x", g, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                AR.i.callAsync({
                    objectId: f.__id,
                    scaleX: c,
                    is: "AR.i.modelInterface.setScaleX"
                })
            });
            this.__defineGetter__("x", function() {
                if (!f.__modelNotCreatedInCoreYet && f.__isDirty("scale.x")) {
                    return AR.i.callSync({
                        objectId: f.__id,
                        is: "AR.i.modelInterface.getScaleX"
                    })
                }
                return c
            });
            this.__defineSetter__("y", function(g) {
                b = _PROPERTY_VALIDATOR.validate("scale.y", g, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                AR.i.callAsync({
                    objectId: f.__id,
                    scaleY: b,
                    is: "AR.i.modelInterface.setScaleY"
                })
            });
            this.__defineGetter__("y", function() {
                if (!f.__modelNotCreatedInCoreYet && f.__isDirty("scale.y")) {
                    return AR.i.callSync({
                        objectId: f.__id,
                        is: "AR.i.modelInterface.getScaleY"
                    })
                }
                return b
            });
            this.__defineSetter__("z", function(g) {
                a = _PROPERTY_VALIDATOR.validate("scale.z", g, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                AR.i.callAsync({
                    objectId: f.__id,
                    scaleZ: a,
                    is: "AR.i.modelInterface.setScaleZ"
                })
            });
            this.__defineGetter__("z", function() {
                if (!f.__modelNotCreatedInCoreYet && f.__isDirty("scale.z")) {
                    return AR.i.callSync({
                        objectId: f.__id,
                        is: "AR.i.modelInterface.getScaleZ"
                    })
                }
                return a
            })
        }
    });
    AR.ModelTranslate = PClass.create({
        init: function(e, d) {
            var f = e;
            var c = 0;
            var b = 0;
            var a = 0;
            if (d && (typeof d != "object")) {
                throw AR.ERROR.create("translate", AR.ERROR.TYPE.OBJECT, "translate")
            }
            if (d) {
                if (d.x) {
                    c = _PROPERTY_VALIDATOR.validate("translate.x", d.x, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
                }
                if (d.y) {
                    b = _PROPERTY_VALIDATOR.validate("translate.y", d.y, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
                }
                if (d.z) {
                    a = _PROPERTY_VALIDATOR.validate("translate.z", d.z, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
                }
            }
            if (!f.__modelNotCreatedInCoreYet) {
                AR.i.callAsync({
                    is: "AR.i.modelInterface.setTranslateX",
                    objectId: f.__id,
                    translateX: c
                });
                AR.i.callAsync({
                    is: "AR.i.modelInterface.setTranslateY",
                    objectId: f.__id,
                    translateY: b
                });
                AR.i.callAsync({
                    is: "AR.i.modelInterface.setTranslateZ",
                    objectId: f.__id,
                    translateZ: a
                })
            }
            this.__defineSetter__("x", function(g) {
                g = _PROPERTY_VALIDATOR.validate("translate.x", g, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                AR.i.callAsync({
                    objectId: f.__id,
                    is: "AR.i.modelInterface.setTranslateX",
                    translateX: g
                });
                c = g
            });
            this.__defineGetter__("x", function() {
                if (!f.__modelNotCreatedInCoreYet && f.__isDirty("translate.x")) {
                    return AR.i.callSync({
                        objectId: f.__id,
                        is: "AR.i.modelInterface.getTranslateX"
                    })
                }
                return c
            });
            this.__defineSetter__("y", function(g) {
                g = _PROPERTY_VALIDATOR.validate("translate.y", g, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                AR.i.callAsync({
                    objectId: f.__id,
                    is: "AR.i.modelInterface.setTranslateY",
                    translateY: g
                });
                b = g
            });
            this.__defineGetter__("y", function() {
                if (!f.__modelNotCreatedInCoreYet && f.__isDirty("translate.y")) {
                    return AR.i.callSync({
                        objectId: f.__id,
                        is: "AR.i.modelInterface.getTranslateY"
                    })
                }
                return b
            });
            this.__defineSetter__("z", function(g) {
                g = _PROPERTY_VALIDATOR.validate("translate.z", g, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                AR.i.callAsync({
                    objectId: f.__id,
                    is: "AR.i.modelInterface.setTranslateZ",
                    translateZ: g
                });
                a = g
            });
            this.__defineGetter__("z", function() {
                if (!f.__modelNotCreatedInCoreYet && f.__isDirty("translate.z")) {
                    return AR.i.callSync({
                        objectId: f.__id,
                        is: "AR.i.modelInterface.getTranslateZ"
                    })
                }
                return a
            })
        }
    });
    AR.Circle = AR.Drawable2D.extend({
        init: function(b, c) {
            var e = this.validateRadius(b);
            var a = null;
            if (c != null) {
                a = new AR.Style(this, c.style)
            } else {
                a = new AR.Style(this, null)
            }
            var f = this._super(AR.CONST.HORIZONTAL_ANCHOR.CENTER, AR.CONST.VERTICAL_ANCHOR.MIDDLE, c);
            var d = AR.om.createObjectID();
            AR.i.callAsync({
                objectId: d,
                is: "AR.i.circleInterface.createCircle",
                enabled: f.enabled,
                offsetX: f.offsetX,
                offsetY: f.offsetY,
                zOrder: f.zOrder,
                onClickTriggerActive: f.onClickActive,
                horizontalAnchor: f.horizontalAnchor,
                verticalAnchor: f.verticalAnchor,
                scale: f.scale,
                rotation: f.rotation,
                opacity: f.opacity,
                radius: e,
                fillColor: a.fillColor,
                outlineColor: a.outlineColor,
                outlineSize: a.outlineSize,
                roll: f.roll,
                tilt: f.tilt,
                heading: f.heading
            });
            AR.om.registerObjectForID(d, this);
            this.__defineSetter__("__id", function(g) {
                throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("__id", function() {
                return d
            });
            this.__defineSetter__("radius", function(g) {
                g = this.validateRadius(g);
                AR.i.callAsync({
                    objectId: d,
                    is: "AR.i.circleInterface.setRadius",
                    radius: g
                });
                e = g
            });
            this.__defineGetter__("radius", function() {
                if (this.__isDirty("radius")) {
                    return AR.i.callSync({
                        objectId: d,
                        is: "AR.i.circleInterface.getRadius"
                    })
                }
                return e
            });
            this.__defineSetter__("style", function(g) {
                a = new AR.Style(this, g);
                this.setStyleInInterface()
            });
            this.__defineGetter__("style", function() {
                return a
            });
            this.setStyleInInterface = function() {
                AR.i.callAsync({
                    objectId: d,
                    is: "AR.i.circleInterface.setStyle",
                    fillColor: a.fillColor,
                    outlineColor: a.outlineColor,
                    outlineSize: a.outlineSize
                })
            }
        },
        validateRadius: function(a) {
            if (!AR.VALIDATE.isNonNegative(a)) {
                throw AR.ERROR.create("radius", AR.ERROR.TYPE.RANGE, "(0, infinity)")
            }
            return a
        }
    });
    AR.HtmlDrawable = AR.Drawable2D.extend({
        init: function(m, k, d) {
            var o = function(s) {
                if (s.indexOf("<body") == -1) {
                    return "<html><head/><body style='background:transparent;margin:0;'>" + s + "</body></html>"
                } else {
                    return s
                }
            };
            var a = null;
            var i = null;
            var l = "#00000000";
            var e = null;
            var n = null;
            var r = 256;
            var j = AR.HtmlDrawable.UPDATE_RATE.STATIC;
            var g = 1024;
            var q = false;
            var p = false;
            var b = null;
            if (!m) {
                throw AR.ERROR.create("content", AR.ERROR.TYPE.UNDEFINED)
            }
            a = _PROPERTY_VALIDATOR.validate("content.html", m.html, _PROPERTY_VALIDATOR.TYPE.STRING, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            i = _PROPERTY_VALIDATOR.validate("content.uri", m.uri, _PROPERTY_VALIDATOR.TYPE.STRING, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            var f = _PROPERTY_VALIDATOR.validate("width", k, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            if (!a && !i) {
                throw AR.ERROR.create("content.html and content.uri", AR.ERROR.TYPE.UNDEFINED)
            }
            if (d) {
                if (d.onLoaded) {
                    e = _PROPERTY_VALIDATOR.validate("onLoaded", d.onLoaded, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
                if (d.onError) {
                    n = _PROPERTY_VALIDATOR.validate("onError", d.onError, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
                if (d.viewportWidth) {
                    r = _PROPERTY_VALIDATOR.validate("viewportWidth", d.viewportWidth, _PROPERTY_VALIDATOR.TYPE.POSITIVE_INT, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                    if (r > g) {
                        throw AR.ERROR.create("viewportWidth", AR.ERROR.TYPE.RANGE, "(0, " + g + "]")
                    }
                }
                if (d.backgroundColor) {
                    l = _PROPERTY_VALIDATOR.validate("backgroundColor", d.backgroundColor, _PROPERTY_VALIDATOR.TYPE.RGBA, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
                if (d.updateRate) {
                    if (!AR.HtmlDrawable.UPDATE_RATE.isValidUpdateRate(d.updateRate)) {
                        throw AR.ERROR.create("updateRate", AR.ERROR.TYPE.ENUMERATION, "AR.HtmlDrawable.UPDATE_RATE.___")
                    } else {
                        j = d.updateRate
                    }
                }
                if (d.clickThroughEnabled) {
                    q = _PROPERTY_VALIDATOR.validate("clickThroughEnabled", d.clickThroughEnabled, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
                if (d.allowDocumentLocationChanges) {
                    p = _PROPERTY_VALIDATOR.validate("allowDocumentLocationChanges", d.allowDocumentLocationChanges, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
                if (d.onDocumentLocationChanged) {
                    b = _PROPERTY_VALIDATOR.validate("onDocumentLocationChanged", d.onDocumentLocationChanged, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
            }
            if (i) {
                i = AR.__resourceUrl(i)
            }
            if (a) {
                a = o(a)
            }
            var h = this._super(AR.CONST.HORIZONTAL_ANCHOR.CENTER, AR.CONST.VERTICAL_ANCHOR.MIDDLE, d);
            var c = AR.om.createObjectID();
            AR.i.callAsync({
                objectId: c,
                is: "AR.i.htmlDrawableInterface.createHtmlDrawable",
                enabled: h.enabled,
                offsetX: h.offsetX,
                offsetY: h.offsetY,
                zOrder: h.zOrder,
                onClickTriggerActive: h.onClickActive,
                horizontalAnchor: h.horizontalAnchor,
                verticalAnchor: h.verticalAnchor,
                scale: h.scale,
                rotation: h.rotation,
                opacity: h.opacity,
                htmlOrUri: AR.__toJSONString__({
                    html: a,
                    uri: i
                }),
                viewportWidth: r,
                width: f,
                updateRate: j,
                onLoadedTriggerActive: e != null,
                onErrorTriggerActive: n != null,
                roll: h.roll,
                tilt: h.tilt,
                heading: h.heading,
                clickThroughEnabled: q,
                allowDocumentLocationChanges: p,
                onDocumentLocationChangedTriggerActive: b != null,
                backgroundColor: l
            });
            AR.om.registerObjectForID(c, this);
            this.__defineSetter__("__id", function(s) {
                throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("__id", function() {
                return c
            });
            this.__defineSetter__("html", function(s) {
                s = _PROPERTY_VALIDATOR.validate("html", s, _PROPERTY_VALIDATOR.TYPE.STRING, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                s = o(s);
                AR.i.callAsync({
                    is: "AR.i.htmlDrawableInterface.setHtml",
                    objectId: c,
                    html: s
                });
                a = s
            });
            this.__defineGetter__("html", function() {
                return a
            });
            this.__defineSetter__("uri", function(s) {
                s = _PROPERTY_VALIDATOR.validate("uri", s, _PROPERTY_VALIDATOR.TYPE.STRING, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                if (s) {
                    s = AR.__resourceUrl(s)
                }
                AR.i.callAsync({
                    is: "AR.i.htmlDrawableInterface.setUri",
                    objectId: c,
                    uri: s
                });
                i = s
            });
            this.__defineGetter__("uri", function() {
                return i
            });
            this.__defineSetter__("backgroundColor", function(s) {
                s = _PROPERTY_VALIDATOR.validate("backgroundColor", s, _PROPERTY_VALIDATOR.TYPE.RGBA, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                AR.i.callAsync({
                    is: "AR.i.htmlDrawableInterface.setBackgroundColor",
                    objectId: c,
                    backgroundColor: s
                });
                l = s
            });
            this.__defineGetter__("backgroundColor", function() {
                return l
            });
            this.__defineSetter__("width", function(s) {
                s = _PROPERTY_VALIDATOR.validate("width", s, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                AR.i.callAsync({
                    is: "AR.i.htmlDrawableInterface.setWidth",
                    objectId: c,
                    width: s
                });
                f = s
            });
            this.__defineGetter__("width", function() {
                if (this.__isDirty("width")) {
                    return AR.i.callSync({
                        is: "AR.i.htmlDrawableInterface.getWidth",
                        objectId: c
                    })
                }
                return f
            });
            this.__defineSetter__("viewportWidth", function(s) {
                s = _PROPERTY_VALIDATOR.validate("viewportWidth", s, _PROPERTY_VALIDATOR.TYPE.POSITIVE_INT, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                if (s > g) {
                    throw AR.ERROR.create("viewportWidth", AR.ERROR.TYPE.RANGE, "(0, " + g + "]")
                }
                AR.i.callAsync({
                    is: "AR.i.htmlDrawableInterface.setViewportWidth",
                    objectId: c,
                    viewportWidth: s
                });
                r = s
            });
            this.__defineGetter__("viewportWidth", function() {
                return r
            });
            this.__defineSetter__("updateRate", function(s) {
                s = _PROPERTY_VALIDATOR.validate("updateRate", s, _PROPERTY_VALIDATOR.TYPE.INT, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                if (!AR.HtmlDrawable.UPDATE_RATE.isValidUpdateRate(s)) {
                    throw AR.ERROR.create("updateRate", AR.ERROR.TYPE.ENUMERATION, "AR.HtmlDrawable.UPDATE_RATE.___")
                }
                AR.i.callAsync({
                    is: "AR.i.htmlDrawableInterface.setUpdateRate",
                    objectId: c,
                    updateRate: s
                });
                j = s
            });
            this.__defineGetter__("updateRate", function() {
                return j
            });
            this.__defineSetter__("clickThroughEnabled", function(s) {
                s = _PROPERTY_VALIDATOR.validate("clickThroughEnabled", s, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                AR.i.callAsync({
                    is: "AR.i.htmlDrawableInterface.setClickThroughEnabled",
                    objectId: c,
                    clickThroughEnabled: s
                });
                q = s
            });
            this.__defineGetter__("clickThroughEnabled", function() {
                return q
            });
            this.__defineSetter__("allowDocumentLocationChanges", function(s) {
                s = _PROPERTY_VALIDATOR.validate("allowDocumentLocationChanges", s, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                AR.i.callAsync({
                    is: "AR.i.htmlDrawableInterface.setAllowDocumentLocationChanges",
                    objectId: c,
                    allowDocumentLocationChanges: s
                });
                p = s
            });
            this.__defineGetter__("allowDocumentLocationChanges", function() {
                return p
            });
            this.__defineSetter__("onDocumentLocationChanged", function(s) {
                s = _PROPERTY_VALIDATOR.validate("onDocumentLocationChanged", s, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                b = s;
                AR.i.callAsync({
                    is: "AR.i.htmlDrawableInterface.setOnDocumentLocationChangedTriggerActive",
                    objectId: c,
                    onDocumentLocationChangedTriggerActive: (s != null)
                })
            });
            this.__defineGetter__("onDocumentLocationChanged", function() {
                return b
            });
            this.__defineSetter__("onLoaded", function(s) {
                s = _PROPERTY_VALIDATOR.validate("onLoaded", s, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                e = s;
                AR.i.callAsync({
                    is: "AR.i.htmlDrawableInterface.setOnLoadedTriggerActive",
                    objectId: c,
                    onLoadedTriggerActive: (s != null)
                })
            });
            this.__defineGetter__("onLoaded", function() {
                return e
            });
            this.__defineSetter__("onError", function(s) {
                s = _PROPERTY_VALIDATOR.validate("onError", s, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                n = s;
                AR.i.callAsync({
                    is: "AR.i.htmlDrawableInterface.setOnErrorTriggerActive",
                    objectId: c,
                    onErrorTriggerActive: (s != null)
                })
            });
            this.__defineGetter__("onError", function() {
                return n
            })
        },
        evalJavaScript: function(a) {
            _PROPERTY_VALIDATOR.validate("js", a, _PROPERTY_VALIDATOR.TYPE.STRING, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                is: "AR.i.htmlDrawableInterface.evalJavaScript",
                objectId: this.__id,
                js: a
            })
        }
    });
    AR.HtmlDrawable.UPDATE_RATE = {
        STATIC: -1,
        LOW: 3,
        MEDIUM: 2,
        HIGH: 1,
        isValidUpdateRate: function(a) {
            switch (a) {
                case AR.HtmlDrawable.UPDATE_RATE.STATIC:
                case AR.HtmlDrawable.UPDATE_RATE.LOW:
                case AR.HtmlDrawable.UPDATE_RATE.MEDIUM:
                case AR.HtmlDrawable.UPDATE_RATE.HIGH:
                    return true;
                default:
                    return false
            }
        },
        toName: function(a) {
            switch (a) {
                case AR.HtmlDrawable.UPDATE_RATE.STATIC:
                    return "AR.HtmlDrawable.UPDATE_RATE.STATIC";
                case AR.HtmlDrawable.UPDATE_RATE.LOW:
                    return "AR.HtmlDrawable.UPDATE_RATE.LOW";
                case AR.HtmlDrawable.UPDATE_RATE.MEDIUM:
                    return "AR.HtmlDrawable.UPDATE_RATE.MEDIUM";
                case AR.HtmlDrawable.UPDATE_RATE.HIGH:
                    return "AR.HtmlDrawable.UPDATE_RATE.HIGH"
            }
        }
    };
    AR.ImageDrawable = AR.Drawable2D.extend({
        init: function(f, a, b) {
            var e = _PROPERTY_VALIDATOR.validate("imageResource", f, {
                type: _PROPERTY_VALIDATOR.TYPE.CLASS,
                ofType: AR.ImageResource
            }, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            var d = _PROPERTY_VALIDATOR.validate("height", a, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            var g = this._super(AR.CONST.HORIZONTAL_ANCHOR.CENTER, AR.CONST.VERTICAL_ANCHOR.MIDDLE, b);
            this.__defineSetter__("imageResource", function(h) {
                h = _PROPERTY_VALIDATOR.validate("imageResource", h, {
                    type: _PROPERTY_VALIDATOR.TYPE.CLASS,
                    ofType: AR.ImageResource
                }, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                AR.i.callAsync({
                    is: "AR.i.imageDrawableInterface.setImageResource",
                    objectId: this.__id,
                    imageResourceId: h.__id
                });
                e = h
            });
            this.__defineGetter__("imageResource", function() {
                return e
            });
            this.__defineSetter__("height", function(h) {
                h = _PROPERTY_VALIDATOR.validate("height", h, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                AR.i.callAsync({
                    is: "AR.i.imageDrawableInterface.setHeight",
                    objectId: this.__id,
                    height: h
                });
                d = h
            });
            this.__defineGetter__("height", function() {
                if (this.__isDirty("height")) {
                    AR.i.callSync({
                        is: "AR.i.imageDrawableInterface.getHeight",
                        objectId: this.__id
                    })
                }
                return d
            });
            if (b && b.__DO_NOT_CREATE_OBJECT) {
                g.imageResource = f;
                g.height = a;
                return g
            } else {
                this.__defineSetter__("__id", function(h) {
                    throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
                });
                this.__defineGetter__("__id", function() {
                    return c
                });
                var c = AR.om.createObjectID();
                AR.i.callAsync({
                    is: "AR.i.imageDrawableInterface.createImageDrawable",
                    objectId: c,
                    enabled: g.enabled,
                    offsetX: g.offsetX,
                    offsetY: g.offsetY,
                    zOrder: g.zOrder,
                    onClickTriggerActive: g.onClickActive,
                    horizontalAnchor: g.horizontalAnchor,
                    verticalAnchor: g.verticalAnchor,
                    scale: g.scale,
                    rotation: g.rotation,
                    opacity: g.opacity,
                    imageResourceId: f.__id,
                    height: a,
                    roll: g.roll,
                    tilt: g.tilt,
                    heading: g.heading
                });
                AR.om.registerObjectForID(c, this)
            }
        }
    });
    AR.AnimatedImageDrawable = AR.ImageDrawable.extend({
        init: function(f, j, i, c, k) {
            var a = _PROPERTY_VALIDATOR.validate("keyFrameWidth", i, _PROPERTY_VALIDATOR.TYPE.POSITIVE_INT, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            var d = _PROPERTY_VALIDATOR.validate("keyFrameHeight", c, _PROPERTY_VALIDATOR.TYPE.POSITIVE_INT, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            var h = 0;
            var e;
            if (k) {
                if (k.keyFrame) {
                    h = _PROPERTY_VALIDATOR.validate("keyFrame", k.keyFrame, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE_INT, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
                }
                if (k.onFinish) {
                    e = _PROPERTY_VALIDATOR.validate("onFinish", k.onFinish, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
            }
            if (!k) {
                k = {}
            }
            k.__DO_NOT_CREATE_OBJECT = true;
            var b = this._super(f, j, k);
            var g = AR.om.createObjectID();
            AR.i.callAsync({
                objectId: g,
                is: "AR.i.animatedImageDrawableInterface.createAnimatedImageDrawable",
                enabled: b.enabled,
                offsetX: b.offsetX,
                offsetY: b.offsetY,
                zOrder: b.zOrder,
                onClickTriggerActive: b.onClickActive,
                onFinishTriggerActive: e != null,
                horizontalAnchor: b.horizontalAnchor,
                verticalAnchor: b.verticalAnchor,
                scale: b.scale,
                rotation: b.rotation,
                opacity: b.opacity,
                imageResourceId: b.imageResource.__id,
                height: b.height,
                keyFrameWidth: a,
                keyFrameHeight: d,
                keyFrame: h,
                roll: b.roll,
                tilt: b.tilt,
                heading: b.heading
            });
            AR.om.registerObjectForID(g, this);
            this.__defineSetter__("__id", function(l) {
                throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("__id", function() {
                return g
            });
            this.__defineSetter__("onFinish", function(l) {
                l = _PROPERTY_VALIDATOR.validate("onFinish", l, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                e = l;
                AR.i.callAsync({
                    is: "AR.i.animatedImageDrawableInterface.setOnFinishTriggerActive",
                    objectId: this.__id,
                    onFinishTriggerActive: e != null
                })
            });
            this.__defineGetter__("onFinish", function(l) {
                return e
            })
        },
        setKeyFrame: function(a) {
            var b = _PROPERTY_VALIDATOR.validate("keyFramePos", a, _PROPERTY_VALIDATOR.TYPE.INT, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.animatedImageDrawableInterface.setKeyFrame",
                keyFrame: b
            })
        },
        animate: function(c, e, b) {
            var d = this.validateKeyFrameArray(c);
            var f = _PROPERTY_VALIDATOR.validate("duration", e, _PROPERTY_VALIDATOR.TYPE.POSITIVE_INT, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            var a = 1;
            if (b) {
                a = _PROPERTY_VALIDATOR.validate("loopTimes", b, _PROPERTY_VALIDATOR.TYPE.INT, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
            }
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.animatedImageDrawableInterface.animate",
                keyFrames: AR.__toJSONString__(d),
                duration: f,
                loopTimes: a
            })
        },
        validateKeyFrameArray: function(b) {
            if (!(b instanceof Array)) {
                throw AR.ERROR.create(name, AR.ERROR.TYPE.ARRAY_CONTENT)
            }
            for (var a = 0; a < b.length; a++) {
                if (!(typeof b[a] == "number" && Math.round(b[a]) == b[a])) {
                    throw AR.ERROR.create(name, AR.ERROR.TYPE.ARRAY_CONTENT)
                }
            }
            return b
        }
    });
    AR.Location = AR.ARchitectObject.extend({
        distanceTo: function(a) {
            a = _PROPERTY_VALIDATOR.validate("location", a, {
                type: _PROPERTY_VALIDATOR.TYPE.CLASS,
                ofType: AR.Location
            }, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            return AR.i.callSync({
                is: "AR.i.locationInterface.distanceTo",
                objectId: this.__id,
                locationId: a.__id
            })
        },
        distanceToUser: function() {
            var a = AR.i.callSync({
                is: "AR.i.locationInterface.distanceToUser",
                objectId: this.__id
            });
            return a < 0 ? undefined : a
        }
    });
    AR.GeoLocation = AR.Location.extend({
        init: function(g, f, b) {
            this._super();
            var a = this.validateLatitude(g);
            var e = this.validateLongitude(f);
            var c = this.validateAltitude(b);
            var d = AR.om.createObjectID();
            AR.i.callAsync({
                objectId: d,
                is: "AR.i.geoLocationInterface.createGeoLocation",
                latitude: a,
                longitude: e,
                altitude: c
            });
            AR.om.registerObjectForID(d, this);
            this.__defineSetter__("__id", function(h) {
                throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("__id", function() {
                return d
            });
            this.__defineSetter__("latitude", function(h) {
                h = this.validateLatitude(h);
                AR.i.callAsync({
                    objectId: d,
                    is: "AR.i.geoLocationInterface.setLatitude",
                    latitude: h
                });
                a = h
            });
            this.__defineGetter__("latitude", function() {
                if (this.__isDirty("latitude")) {
                    return AR.i.callSync({
                        objectId: d,
                        is: "AR.i.geoLocationInterface.getLatitude"
                    })
                }
                return a
            });
            this.__defineSetter__("longitude", function(h) {
                h = this.validateLongitude(h);
                AR.i.callAsync({
                    objectId: d,
                    is: "AR.i.geoLocationInterface.setLongitude",
                    longitude: h
                });
                e = h
            });
            this.__defineGetter__("longitude", function() {
                if (this.__isDirty("longitude")) {
                    return AR.i.callSync({
                        objectId: d,
                        is: "AR.i.geoLocationInterface.getLongitude"
                    })
                }
                return e
            });
            this.__defineSetter__("altitude", function(h) {
                h = this.validateAltitude(h);
                AR.i.callAsync({
                    objectId: d,
                    is: "AR.i.geoLocationInterface.setAltitude",
                    altitude: h
                });
                c = h
            });
            this.__defineGetter__("altitude", function() {
                if (this.__isDirty("altitude")) {
                    return AR.i.callSync({
                        objectId: d,
                        is: "AR.i.geoLocationInterface.getAltitude"
                    })
                }
                return c
            })
        },
        validateLatitude: function(a) {
            if (!AR.VALIDATE.isNumeric(a)) {
                throw AR.ERROR.create("latitude", AR.ERROR.TYPE.FLOAT)
            }
            if (!AR.VALIDATE.isInRange(a, -90, 90)) {
                throw AR.ERROR.create("latitude", AR.ERROR.TYPE.RANGE, "[-90, 90]")
            }
            return a
        },
        validateLongitude: function(a) {
            if (!AR.VALIDATE.isNumeric(a)) {
                throw AR.ERROR.create("longitude", AR.ERROR.TYPE.FLOAT)
            }
            if (!AR.VALIDATE.isInRange(a, -180, 180)) {
                throw AR.ERROR.create("longitude", AR.ERROR.TYPE.RANGE, "[-180, 180]")
            }
            return a
        },
        validateAltitude: function(a) {
            a = (!AR.isDefined(a) ? AR.CONST.UNKNOWN_ALTITUDE : a);
            if (!AR.VALIDATE.isNumeric(a)) {
                throw AR.ERROR.create("altitude", AR.ERROR.TYPE.FLOAT)
            }
            return a
        }
    });
    AR.RelativeLocation = AR.Location.extend({
        init: function(g, a, e, c) {
            this._super();
            var h = _PROPERTY_VALIDATOR.validate("location", g, {
                type: _PROPERTY_VALIDATOR.TYPE.CLASS,
                ofType: AR.Location
            }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            var b = _PROPERTY_VALIDATOR.validate("northing", a, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            var d = _PROPERTY_VALIDATOR.validate("easting", e, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            var i = _PROPERTY_VALIDATOR.validate("altitudeDelta", c, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            if (!i) {
                i = 0
            }
            var f = AR.om.createObjectID();
            if (h) {
                AR.i.callAsync({
                    objectId: f,
                    is: "AR.i.relativeLocationInterface.createRelativeLocation",
                    locationId: h.__id,
                    northing: b,
                    easting: d,
                    altitudeDelta: i
                })
            } else {
                AR.i.callAsync({
                    objectId: f,
                    is: "AR.i.relativeLocationInterface.createRelativeLocationToUser",
                    northing: b,
                    easting: d,
                    altitudeDelta: i
                })
            }
            AR.om.registerObjectForID(f, this);
            this.__defineSetter__("__id", function(j) {
                throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("__id", function() {
                return f
            });
            this.__defineSetter__("location", function(j) {
                j = _PROPERTY_VALIDATOR.validate("location", j, {
                    type: _PROPERTY_VALIDATOR.TYPE.CLASS,
                    ofType: AR.Location
                }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                if (j) {
                    AR.i.callAsync({
                        is: "AR.i.relativeLocationInterface.setLocation",
                        objectId: f,
                        locationId: j.__id
                    })
                } else {
                    AR.i.callAsync({
                        is: "AR.i.relativeLocationInterface.setLocationRelativeToUser",
                        objectId: f,
                    })
                }
                h = j
            });
            this.__defineGetter__("location", function() {
                return h
            });
            this.__defineSetter__("northing", function(j) {
                j = _PROPERTY_VALIDATOR.validate("northing", j, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                AR.i.callAsync({
                    is: "AR.i.relativeLocationInterface.setNorthing",
                    objectId: f,
                    northing: j
                });
                b = j
            });
            this.__defineGetter__("northing", function() {
                if (this.__isDirty("northing")) {
                    return AR.i.callSync({
                        is: "AR.i.relativeLocationInterface.getNorthing",
                        objectId: f
                    })
                }
                return b
            });
            this.__defineSetter__("easting", function(j) {
                j = _PROPERTY_VALIDATOR.validate("easting", j, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                AR.i.callAsync({
                    is: "AR.i.relativeLocationInterface.setEasting",
                    objectId: f,
                    easting: j
                });
                d = j
            });
            this.__defineGetter__("easting", function() {
                if (this.__isDirty("easting")) {
                    return AR.i.callSync({
                        is: "AR.i.relativeLocationInterface.getEasting",
                        objectId: f
                    })
                }
                return d
            });
            this.__defineSetter__("altitudeDelta", function(j) {
                j = _PROPERTY_VALIDATOR.validate("altitudeDelta", j, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                if (!j) {
                    j = 0
                }
                AR.i.callAsync({
                    is: "AR.i.relativeLocationInterface.setAltitudeDelta",
                    objectId: f,
                    altitudeDelta: j
                });
                i = j
            });
            this.__defineGetter__("altitudeDelta", function() {
                if (this.__isDirty("altitudeDelta")) {
                    return AR.i.callSync({
                        is: "AR.i.relativeLocationInterface.getAltitudeDelta",
                        objectId: f
                    })
                }
                return i
            })
        }
    });
    AR.GeoObject = AR.ARObject.extend({
        init: function(b, c) {
            var e = this._super(c);
            var a = this.validateLocations(b);
            var d = AR.om.createObjectID();
            AR.i.callAsync({
                objectId: d,
                is: "AR.i.geoObjectInterface.createGeoObject",
                locationIds: AR.__toJSONString__(AR.om.__getIds__(a)),
                enabled: e.enabled,
                onEnterFieldOfVisionTriggerActive: e.onEnterFieldOfVisionTriggerActive,
                onExitFieldOfVisionTriggerActive: e.onExitFieldOfVisionTriggerActive,
                onClickTriggerActive: e.onClickTriggerActive,
                camDrawableIds: AR.__toJSONString__(AR.om.__getIds__(e.drawables.cam)),
                renderingOrder: e.renderingOrder,
                radarDrawableIds: AR.__toJSONString__(AR.om.__getIds__(e.drawables.radar)),
                indicatorDrawableIds: AR.__toJSONString__(AR.om.__getIds__(e.drawables.indicator))
            });
            AR.om.registerObjectForID(d, this);
            this.__defineSetter__("__id", function(f) {
                throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("__id", function() {
                return d
            });
            this.__defineSetter__("locations", function(f) {
                f = this.validateLocations(f);
                AR.i.callAsync({
                    objectId: d,
                    locationIds: AR.__toJSONString__(AR.om.__getIds__(f)),
                    is: "AR.i.geoObjectInterface.setLocations"
                });
                a = f
            });
            this.__defineGetter__("locations", function() {
                return a
            })
        },
        validateLocations: function(a) {
            if (!AR.VALIDATE.isDefined(a)) {
                throw AR.ERROR.create("locations", AR.ERROR.TYPE.UNDEFINED)
            }
            if (a instanceof AR.Location) {
                a = new Array(a)
            } else {
                if (!AR.VALIDATE.isArrayOf(a, AR.Location)) {
                    throw AR.ERROR.create("locations", AR.ERROR.TYPE.ARRAY_CONTENT)
                }
            }
            return a
        }
    });
    AR.ActionArea = AR.ARchitectObject.extend({
        validateOnEnter: function(a) {
            if (AR.VALIDATE.isDefined(a) && !AR.VALIDATE.isFunction(a)) {
                throw AR.ERROR.create("_onEnter", AR.ERROR.TYPE.OBJECT, "function", typeof a)
            }
            return a
        },
        validateOnExit: function(a) {
            if (AR.VALIDATE.isDefined(a) && !AR.VALIDATE.isFunction(a)) {
                throw AR.ERROR.create("_onExit", AR.ERROR.TYPE.OBJECT, "function", typeof a)
            }
            return a
        },
        validateEnabled: function(a) {
            if (a == null || a == undefined) {
                return true
            }
            if (!AR.VALIDATE.isBoolean(a)) {
                throw AR.ERROR.create("enabled", AR.ERROR.TYPE.BOOLEAN)
            }
            return a
        },
        init: function(b) {
            this._super();
            var a = true;
            var d = null;
            var c = null;
            if (b != null) {
                a = this.validateEnabled(b.enabled);
                d = this.validateOnEnter(b.onEnter);
                c = this.validateOnExit(b.onExit)
            }
            this.__defineSetter__("enabled", function(e) {
                e = this.validateEnabled(e);
                AR.i.callAsync({
                    objectId: this.__id,
                    is: "AR.i.actionAreaInterface.setEnabled",
                    enabled: e
                });
                a = e
            });
            this.__defineGetter__("enabled", function() {
                return a
            });
            this.__defineSetter__("onEnter", function(e) {
                e = this.validateOnEnter(e);
                d = e;
                AR.i.callAsync({
                    objectId: this.__id,
                    is: "AR.i.actionAreaInterface.setOnEnterTriggerActive",
                    onEnterTriggerActive: (d != null)
                })
            });
            this.__defineGetter__("onEnter", function() {
                return d
            });
            this.__defineSetter__("onExit", function(e) {
                e = this.validateOnExit(e);
                c = e;
                AR.i.callAsync({
                    objectId: this.__id,
                    is: "AR.i.actionAreaInterface.setOnExitTriggerActive",
                    onExitTriggerActive: (c != null)
                })
            });
            this.__defineGetter__("onExit", function() {
                return c
            });
            return {
                enabled: a,
                onEnterTriggerActive: d != null,
                onExitTriggerActive: c != null
            }
        },
        isInArea: function(a) {
            if (!AR.VALIDATE.isDefined(a)) {
                throw AR.ERROR.create("geoLocation", AR.ERROR.TYPE.UNDEFINED)
            }
            if (!AR.VALIDATE.isTypeOf(a, AR.GeoLocation)) {
                throw AR.ERROR.create("geoLocation", AR.ERROR.TYPE.OBJECT, "geoLocation", typeof val)
            }
            return AR.i.callSync({
                objectId: this.__id,
                is: "AR.i.actionAreaInterface.isInArea",
                geoLocationId: a.__id
            })
        }
    });
    AR.ActionRange = AR.ActionArea.extend({
        init: function(b, a, d) {
            var f = this.validateRadius(a);
            var c = this.validateLocation(b);
            var g = this._super(d);
            var e = AR.om.createObjectID();
            AR.i.callAsync({
                objectId: e,
                is: "AR.i.actionRangeInterface.createActionRange",
                locationId: c.__id,
                radius: f,
                enabled: g.enabled,
                onEnterTriggerActive: g.onEnterTriggerActive,
                onExitTriggerActive: g.onExitTriggerActive
            });
            AR.om.registerObjectForID(e, this);
            this.__defineSetter__("__id", function(h) {
                throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("__id", function() {
                return e
            });
            this.__defineSetter__("radius", function(h) {
                h = this.validateRadius(h);
                AR.i.callAsync({
                    objectId: e,
                    radius: h,
                    is: "AR.i.actionRangeInterface.setRadius"
                });
                f = h
            });
            this.__defineGetter__("radius", function() {
                if (this.__isDirty("radius")) {
                    return AR.i.callSync({
                        objectId: e,
                        is: "AR.i.actionRangeInterface.getRadius"
                    })
                }
                return f
            });
            this.__defineSetter__("location", function(h) {
                h = this.validateLocation(h);
                AR.i.callAsync({
                    objectId: e,
                    locationId: h.__id,
                    is: "AR.i.actionRangeInterface.setLocation"
                });
                c = h
            });
            this.__defineGetter__("location", function() {
                return c
            })
        },
        validateRadius: function(a) {
            if (!AR.VALIDATE.isNonNegative(a)) {
                throw AR.ERROR.create("radius", AR.ERROR.TYPE.RANGE, "[0, infinity)")
            }
            return a
        },
        validateLocation: function(a) {
            if (!AR.VALIDATE.isDefined(a)) {
                throw AR.ERROR.create("location", AR.ERROR.TYPE.UNDEFINED)
            }
            if (!AR.VALIDATE.isTypeOf(a, AR.Location)) {
                throw AR.ERROR.create("location", AR.ERROR.TYPE.OBJECT, "Location", typeof a)
            }
            return a
        }
    });
    AR.BoundingRectangle = PClass.create({
        init: function(b, a) {
            var b = b;
            var a = a;
            this.getWidth = function() {
                return b
            };
            this.getHeight = function() {
                return a
            }
        }
    });
    AR.ImageResource = AR.ARchitectObject.extend({
        init: function(d, b) {
            this._super();
            var f = this.validateUri(d);
            var e, a;
            if (b != null) {
                if (b.onLoaded != null) {
                    e = this.validateOnLoaded(b.onLoaded)
                }
                if (b.onError != null) {
                    a = this.validateOnError(b.onError)
                }
            }
            var c = AR.om.createObjectID();
            AR.i.callAsync({
                objectId: c,
                is: "AR.i.imageResourceInterface.createImageResource",
                uri: AR.__resourceUrl(f),
                onLoadedTriggerActive: e != null,
                onErrorTriggerActive: a != null
            });
            AR.om.registerObjectForID(c, this);
            this.__defineSetter__("__id", function(g) {
                throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("__id", function() {
                return c
            });
            this.__defineSetter__("onLoaded", function(g) {
                g = this.validateOnLoaded(g);
                e = g;
                AR.i.callAsync({
                    is: "AR.i.imageResourceInterface.setOnLoadedTriggerActive",
                    objectId: c,
                    onLoadedTriggerActive: g != null
                })
            });
            this.__defineGetter__("onLoaded", function() {
                return e
            });
            this.__defineSetter__("onError", function(g) {
                g = this.validateOnError(g);
                a = g;
                AR.i.callAsync({
                    is: "AR.i.imageResourceInterface.setOnErrorTriggerActive",
                    objectId: c,
                    onErrorTriggerActive: g != null
                })
            });
            this.__defineGetter__("onError", function() {
                return a
            });
            this.getUri = function() {
                return f
            }
        },
        validateUri: function(a) {
            if (!AR.VALIDATE.isDefined(a)) {
                throw AR.ERROR.create("uri", AR.ERROR.TYPE.UNDEFINED)
            }
            if (!AR.VALIDATE.isString(a)) {
                throw AR.ERROR.create("uri", AR.ERROR.TYPE.STRING)
            }
            return a
        },
        validateOnLoaded: function(a) {
            if (AR.VALIDATE.isDefined(a) && !AR.VALIDATE.isFunction(a)) {
                throw AR.ERROR.create("onLoaded", AR.ERROR.TYPE.OBJECT, "function", typeof a)
            }
            return a
        },
        validateOnError: function(a) {
            if (AR.VALIDATE.isDefined(a) && !AR.VALIDATE.isFunction(a)) {
                throw AR.ERROR.create("onError", AR.ERROR.TYPE.OBJECT, "function", typeof a)
            }
            return a
        },
        getWidth: function() {
            return AR.i.callSync({
                is: "AR.i.imageResourceInterface.getWidth",
                objectId: this.__id
            })
        },
        getHeight: function() {
            return AR.i.callSync({
                is: "AR.i.imageResourceInterface.getHeight",
                objectId: this.__id
            })
        },
        isLoaded: function() {
            return AR.i.callSync({
                is: "AR.i.imageResourceInterface.isLoaded",
                objectId: this.__id
            })
        }
    });
    AR.Animation = AR.ARchitectObject.extend({
        init: function(a) {
            this._super();
            var c = null;
            var b = null;
            if (a != null) {
                c = _PROPERTY_VALIDATOR.validate("onStart", a.onStart, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                b = _PROPERTY_VALIDATOR.validate("onFinish", a.onFinish, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            this.__defineSetter__("onStart", function(d) {
                d = _PROPERTY_VALIDATOR.validate("onStart", d, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                c = d;
                AR.i.callAsync({
                    objectId: this.__id,
                    is: "AR.i.animationInterface.setOnStartTriggerActive",
                    onStartTriggerActive: c != null
                })
            });
            this.__defineGetter__("onStart", function() {
                return c
            });
            this.__defineSetter__("onFinish", function(d) {
                d = _PROPERTY_VALIDATOR.validate("onFinish", d, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                b = d;
                AR.i.callAsync({
                    objectId: this.__id,
                    is: "AR.i.animationInterface.setOnFinishTriggerActive",
                    onFinishTriggerActive: b != null
                })
            });
            this.__defineGetter__("onFinish", function() {
                return b
            });
            return {
                onStartActive: c != null,
                onFinishActive: b != null
            }
        },
        isRunning: function() {
            return AR.i.callSync({
                objectId: this.__id,
                is: "AR.i.animationInterface.isRunning"
            })
        },
        start: function(a) {
            a = _PROPERTY_VALIDATOR.validate("loopTimes", a, _PROPERTY_VALIDATOR.TYPE.INT, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            if (!a && a != 0) {
                a = 1
            }
            if (this instanceof AR.PropertyAnimation) {
                this.__handleDirtyPropertyOnStart()
            }
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.animationInterface.start",
                loopTimes: a
            })
        },
        stop: function() {
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.animationInterface.stop"
            });
            if (this instanceof AR.PropertyAnimation) {
                this.__handleDirtyPropertyOnStop()
            }
        },
        pause: function() {
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.animationInterface.pause"
            })
        },
        resume: function() {
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.animationInterface.resume"
            })
        }
    });
    AR.PropertyAnimation = AR.Animation.extend({
        init: function(s, j, g, e, a, p, d) {
            var k = this._super(d);
            var m = _PROPERTY_VALIDATOR.validate("target", s, {
                type: _PROPERTY_VALIDATOR.TYPE.CLASS,
                ofType: AR.ARchitectObject
            }, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            var n = _PROPERTY_VALIDATOR.validate("property", j, _PROPERTY_VALIDATOR.TYPE.STRING, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            var b = m;
            var h = n.split(".");
            for (var q = 0; q < h.length - 1; q++) {
                b = b[h[q]]
            }
            if (b[h[h.length - 1]] == null || typeof b[h[h.length - 1]] != "number") {
                throw AR.ERROR.ERROR_PREFIX + "Property " + n + " is not animateable."
            }
            var r = _PROPERTY_VALIDATOR.validate("start", g, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            if (r != null && r != undefined) {
                r = "[" + r + "]"
            }
            var l = "[" + _PROPERTY_VALIDATOR.validate("end", e, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET) + "]";
            var f = _PROPERTY_VALIDATOR.validate("duration", a, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            if (!p || !(p.type)) {
                p = {
                    type: AR.CONST.EASING_CURVE_TYPE.LINEAR
                }
            }
            var o = this.validateEasingCurve(p);
            var c = AR.om.createObjectID();
            AR.i.callAsync({
                objectId: c,
                is: "AR.i.propertyAnimationInterface.createPropertyAnimation",
                targetId: m.__id,
                property: n,
                start: r,
                end: l,
                duration: f,
                easingCurve: AR.__toJSONString__(o),
                onStartTriggerActive: k.onStartActive,
                onFinishTriggerActive: k.onFinishActive
            });
            AR.om.registerObjectForID(c, this);
            this.__defineSetter__("__id", function(i) {
                throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("__id", function() {
                return c
            });
            this.__handleDirtyPropertyOnStart = function(i) {
                m.__alertDirty(n)
            };
            this.__handleDirtyPropertyOnStop = function(i) {
                m.__removeDirt(n)
            }
        },
        validateEasingCurve: function(a) {
            if (!AR.VALIDATE.isDefined(a)) {
                throw AR.ERROR.create("easingCurve", AR.ERROR.TYPE.UNDEFINED)
            }
            if (!AR.CONST.EASING_CURVE_TYPE.isValidEasingCurveType(a.type)) {
                throw AR.ERROR.create("easingCurve.type", AR.ERROR.TYPE.ENUMERATION, "AR.CONST.EASING_CURVE_TYPE.___")
            }
            if (AR.VALIDATE.isDefined(a.amplitude) && !AR.VALIDATE.isNumeric(a.amplitude)) {
                throw AR.ERROR.create("easingCurve.amplitude", AR.ERROR.TYPE.FLOAT)
            }
            if (AR.VALIDATE.isDefined(a.period) && !AR.VALIDATE.isNumeric(a.period)) {
                throw AR.ERROR.create("easingCurve.period", AR.ERROR.TYPE.FLOAT)
            }
            if (AR.VALIDATE.isDefined(a.overshoot) && !AR.VALIDATE.isNumeric(a.overshoot)) {
                throw AR.ERROR.create("easingCurve.overshoot", AR.ERROR.TYPE.FLOAT)
            }
            return a
        }
    });
    AR.AnimationGroup = AR.Animation.extend({
        init: function(d, g, b) {
            var f = this._super(b);
            if (!AR.CONST.ANIMATION_GROUP_TYPE.isValidAnimationGroupType(d)) {
                throw AR.ERROR.create(d, AR.ERROR.TYPE.OBJECT, "AR.CONST.ANIMATION_GROUP_TYPE")
            }
            var a = d;
            var e = _PROPERTY_VALIDATOR.validate("animations", g, {
                type: _PROPERTY_VALIDATOR.TYPE.ARRAY,
                ofType: AR.Animation
            }, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            var c = AR.om.createObjectID();
            AR.i.callAsync({
                objectId: c,
                is: "AR.i.animationGroupInterface.createAnimationGroup",
                type: a,
                animationIds: AR.__toJSONString__(AR.om.__getIds__(e)),
                onStartTriggerActive: f.onStartActive,
                onFinishTriggerActive: f.onFinishActive
            });
            AR.om.registerObjectForID(c, this);
            this.__defineSetter__("__id", function(h) {
                throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("__id", function() {
                return c
            })
        }
    });
    AR.Sound = AR.ARchitectObject.extend({
        init: function(f, d) {
            this._super();
            var h = this.validateUri(f);
            var b = AR.CONST.STATE.INITIALIZED;
            var g = null;
            var a = null;
            var c = null;
            if (d != null) {
                g = this.validateOnX("onLoaded", d.onLoaded);
                a = this.validateOnX("onFinishedPlaying", d.onFinishedPlaying);
                c = this.validateOnX("onError", d.onError)
            }
            var e = AR.om.createObjectID();
            AR.i.callAsync({
                objectId: e,
                is: "AR.i.soundInterface.createSound",
                uri: AR.__resourceUrl(h),
                onLoadedTriggerActive: g != null,
                onFinishedPlayingTriggerActive: a != null,
                onErrorTriggerActive: c != null
            });
            AR.om.registerObjectForID(e, this);
            this.__defineSetter__("__id", function(i) {
                throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("__id", function() {
                return e
            });
            this.__defineSetter__("uri", function(i) {
                throw AR.ERROR.create("uri", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("uri", function() {
                return h
            });
            this.__defineSetter__("state", function(i) {
                throw AR.ERROR.create("state", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("state", function() {
                return AR.i.callSync({
                    objectId: e,
                    is: "AR.i.soundInterface.getState"
                })
            });
            this.__defineSetter__("onLoaded", function(i) {
                i = this.validateOnX("onLoaded", i);
                g = i;
                AR.i.callAsync({
                    objectId: e,
                    is: "AR.i.soundInterface.setOnLoadedTriggerActive",
                    onLoadedTriggerActive: i != null
                })
            });
            this.__defineGetter__("onLoaded", function() {
                return g
            });
            this.__defineSetter__("onFinishedPlaying", function(i) {
                i = this.validateOnX("onFinishedPlaying", i);
                a = i;
                AR.i.callAsync({
                    objectId: e,
                    is: "AR.i.soundInterface.setOnFinishedPlayingTriggerActive",
                    onFinishedPlayingTriggerActive: i != null
                })
            });
            this.__defineGetter__("onFinishedPlaying", function() {
                return a
            });
            this.__defineSetter__("onError", function(i) {
                i = this.validateOnX("onError", i);
                c = i;
                AR.i.callAsync({
                    objectId: e,
                    is: "AR.i.soundInterface.setOnErrorTriggerActive",
                    onErrorTriggerActive: i != null
                })
            });
            this.__defineGetter__("onError", function() {
                return c
            })
        },
        validateUri: function(a) {
            if (!AR.VALIDATE.isDefined(a)) {
                throw AR.ERROR.create("uri", AR.ERROR.TYPE.UNDEFINED)
            }
            if (!AR.VALIDATE.isString(a)) {
                throw AR.ERROR.create("uri", AR.ERROR.TYPE.STRING)
            }
            return a
        },
        validateOnX: function(a, b) {
            if (AR.VALIDATE.isDefined(b) && !AR.VALIDATE.isFunction(b)) {
                throw AR.ERROR.create(a, AR.ERROR.TYPE.OBJECT, "function", typeof b)
            }
            return b
        },
        play: function(a) {
            if (a === undefined) {
                a = 1
            } else {
                if (!AR.VALIDATE.isWholeNumber(a)) {
                    throw AR.ERROR.create("loopTimes", AR.ERROR.TYPE.INT)
                }
            }
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.soundInterface.play",
                loopTimes: a
            })
        },
        stop: function() {
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.soundInterface.stop"
            })
        },
        pause: function() {
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.soundInterface.pause"
            })
        },
        resume: function() {
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.soundInterface.resume"
            })
        },
        load: function() {
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.soundInterface.load"
            })
        }
    });
    AR.Style = PClass.create({
        validateHex: function(a, b) {
            if (!AR.VALIDATE.isHex(b)) {
                throw AR.ERROR.create(a, AR.ERROR.TYPE.HEX)
            }
            return b
        },
        validateOutlineSize: function(a) {
            if (!AR.VALIDATE.isWholeNumber(a)) {
                throw AR.ERROR.create("outlineSize", AR.ERROR.TYPE.INT)
            }
            if (!AR.VALIDATE.isInRange(a, 0, 128)) {
                throw AR.ERROR.create("outlineSize", AR.ERROR.TYPE.RANGE, "[0, 128]")
            }
            return a
        },
        validateFontStyle: function(a) {
            if (!a) {
                return AR.CONST.FONT_STYLE.NORMAL
            }
            if (!AR.CONST.FONT_STYLE.isValidFontStyle(a)) {
                throw AR.ERROR.create("fontStyle", AR.ERROR.TYPE.RANGE, "AR.CONST.FONT_STYLE.___")
            }
            return a
        },
        init: function(d, h) {
            var a = d;
            var g = "#00000000";
            var c = "#000000FF";
            var e = 0;
            var b = "#FFFFFF00";
            var f = AR.CONST.FONT_STYLE.NORMAL;
            var i = "#000000FF";
            if (h != null) {
                if (h.backgroundColor != null) {
                    g = this.validateHex("backgroundColor", h.backgroundColor)
                }
                if (h.fillColor != null) {
                    c = this.validateHex("fillColor", h.fillColor)
                }
                if (h.outlineSize != null) {
                    e = this.validateOutlineSize(h.outlineSize)
                }
                if (h.outlineColor != null) {
                    b = this.validateHex("outlineColor", h.outlineColor)
                }
                if (h.fontStyle != null) {
                    f = this.validateFontStyle(h.fontStyle)
                }
                if (h.textColor != null) {
                    i = this.validateHex("textColor", h.textColor)
                }
            }
            this.__defineSetter__("backgroundColor", function(j) {
                j = this.validateHex("backgroundColor", j);
                g = j;
                a.setStyleInInterface(j)
            });
            this.__defineGetter__("backgroundColor", function() {
                return g
            });
            this.__defineSetter__("fillColor", function(j) {
                j = this.validateHex("fillColor", j);
                c = j;
                a.setStyleInInterface(j)
            });
            this.__defineGetter__("fillColor", function() {
                return c
            });
            this.__defineSetter__("outlineSize", function(j) {
                j = this.validateOutlineSize(j);
                e = j;
                a.setStyleInInterface(j)
            });
            this.__defineGetter__("outlineSize", function() {
                return e
            });
            this.__defineSetter__("outlineColor", function(j) {
                j = this.validateHex("outlineColor", j);
                b = j;
                a.setStyleInInterface(j)
            });
            this.__defineGetter__("outlineColor", function() {
                return b
            });
            this.__defineSetter__("fontStyle", function(j) {
                j = this.validateFontStyle(j);
                f = j;
                a.setStyleInInterface(j)
            });
            this.__defineGetter__("fontStyle", function() {
                return f
            });
            this.__defineSetter__("textColor", function(j) {
                j = this.validateHex("textColor", j);
                i = j;
                a.setStyleInInterface(j)
            });
            this.__defineGetter__("textColor", function() {
                return i
            })
        }
    });
    AR.CONST = {
        LOCATION_ACCURACY: {
            LOW: 1,
            MEDIUM: 2,
            HIGH: 3
        },
        UNKNOWN_ALTITUDE: -32768,
        HORIZONTAL_ANCHOR: {
            LEFT: 0,
            CENTER: 1,
            RIGHT: 2,
            isValidHorizontalAnchor: function(a) {
                switch (a) {
                    case AR.CONST.HORIZONTAL_ANCHOR.LEFT:
                    case AR.CONST.HORIZONTAL_ANCHOR.CENTER:
                    case AR.CONST.HORIZONTAL_ANCHOR.RIGHT:
                        return true;
                    default:
                        return false
                }
            },
            toName: function(a) {
                switch (a) {
                    case AR.CONST.HORIZONTAL_ANCHOR.LEFT:
                        return "AR.CONST.HORIZONTAL_ANCHOR.LEFT";
                    case AR.CONST.HORIZONTAL_ANCHOR.CENTER:
                        return "AR.CONST.HORIZONTAL_ANCHOR.CENTER";
                    case AR.CONST.HORIZONTAL_ANCHOR.RIGHT:
                        return "AR.CONST.HORIZONTAL_ANCHOR.RIGHT";
                    default:
                        return null
                }
            }
        },
        VERTICAL_ANCHOR: {
            TOP: 3,
            MIDDLE: 4,
            BOTTOM: 5,
            isValidVerticalAnchor: function(a) {
                switch (a) {
                    case AR.CONST.VERTICAL_ANCHOR.TOP:
                    case AR.CONST.VERTICAL_ANCHOR.MIDDLE:
                    case AR.CONST.VERTICAL_ANCHOR.BOTTOM:
                        return true;
                    default:
                        return false
                }
            },
            toName: function(a) {
                switch (a) {
                    case AR.CONST.VERTICAL_ANCHOR.TOP:
                        return "AR.CONST.VERTICAL_ANCHOR.TOP";
                    case AR.CONST.VERTICAL_ANCHOR.MIDDLE:
                        return "AR.CONST.VERTICAL_ANCHOR.MIDDLE";
                    case AR.CONST.VERTICAL_ANCHOR.BOTTOM:
                        return "AR.CONST.VERTICAL_ANCHOR.BOTTOM";
                    default:
                        return null
                }
            }
        },
        EASING_CURVE_TYPE: {
            LINEAR: "linear",
            EASE_IN_QUAD: "easeInQuad",
            EASE_OUT_QUAD: "easeOutQuad",
            EASE_IN_OUT_QUAD: "easeInOutQuad",
            EASE_OUT_IN_QUAD: "easeOutInQuad",
            EASE_IN_CUBIC: "easeInCubic",
            EASE_OUT_CUBIC: "easeOutCubic",
            EASE_IN_OUT_CUBIC: "easeInOutCubic",
            EASE_OUT_IN_CUBIC: "easeOutInCubic",
            EASE_IN_QUAT: "easeInQuat",
            EASE_OUT_QUAT: "easeOutQuat",
            EASE_IN_OUT_QUAT: "easeInOutQuat",
            EASE_OUT_IN_QUAT: "easeOutInQuat",
            EASE_IN_QUINT: "easeInQuint",
            EASE_OUT_QUINT: "easeOutQuint",
            EASE_IN_OUT_QUINT: "easeInOutQuint",
            EASE_OUT_IN_QUINT: "easeOutInQuint",
            EASE_IN_ELASTIC: "easeInElastic",
            EASE_OUT_ELASTIC: "easeOutElastic",
            EASE_IN_OUT_ELASTIC: "easeInOutElastic",
            EASE_OUT_IN_ELASTIC: "easeOutInElastic",
            EASE_IN_BACK: "easeInBack",
            EASE_OUT_BACK: "easeOutBack",
            EASE_IN_OUT_BACK: "easeInOutBack",
            EASE_OUT_IN_BACK: "easeOutInBack",
            EASE_IN_SINE: "easeInSine",
            EASE_OUT_SINE: "easeOutSine",
            EASE_IN_OUT_SINE: "easeInOutSine",
            EASE_OUT_IN_SINE: "easeOutInSine",
            EASE_IN_EXPO: "easeInExpo",
            EASE_OUT_EXPO: "easeOutExpo",
            EASE_IN_OUT_EXPO: "easeInOutExpo",
            EASE_OUT_IN_EXPO: "easeOutInExpo",
            EASE_IN_CIRC: "easeInCirc",
            EASE_OUT_CIRC: "easeOutCirc",
            EASE_IN_OUT_CIRC: "easeInOutCirc",
            EASE_OUT_IN_CIRC: "easeOutInCirc",
            EASE_IN_BOUNCE: "easeInBounce",
            EASE_OUT_BOUNCE: "easeOutBounce",
            EASE_IN_OUT_BOUNCE: "easeInOutBounce",
            EASE_OUT_IN_BOUNCE: "easeOutInBounce",
            EASE_IN_CURVE: "easeInCurve",
            EASE_OUT_CURVE: "easeOutCurve",
            isValidEasingCurveType: function(a) {
                switch (a) {
                    case AR.CONST.EASING_CURVE_TYPE.LINEAR:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_QUAD:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_QUAD:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_QUAD:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_QUAD:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_CUBIC:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_CUBIC:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_CUBIC:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_CUBIC:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_QUAT:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_QUAT:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_QUAT:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_QUAT:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_QUINT:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_QUINT:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_QUINT:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_QUINT:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_ELASTIC:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_ELASTIC:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_ELASTIC:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_ELASTIC:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_BACK:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_BACK:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_BACK:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_BACK:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_SINE:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_SINE:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_SINE:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_SINE:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_EXPO:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_EXPO:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_EXPO:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_EXPO:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_CIRC:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_CIRC:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_CIRC:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_CIRC:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_BOUNCE:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_BOUNCE:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_BOUNCE:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_BOUNCE:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_IN_CURVE:
                    case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_CURVE:
                        return true;
                    default:
                        return false
                }
            }
        },
        ANIMATION_GROUP_TYPE: {
            PARALLEL: "parallel",
            SEQUENTIAL: "sequential",
            isValidAnimationGroupType: function(a) {
                switch (a) {
                    case AR.CONST.ANIMATION_GROUP_TYPE.PARALLEL:
                    case AR.CONST.ANIMATION_GROUP_TYPE.SEQUENTIAL:
                        return true;
                    default:
                        return false
                }
            }
        },
        FONT_STYLE: {
            NORMAL: "normal",
            BOLD: "bold",
            ITALIC: "italic",
            isValidFontStyle: function(a) {
                switch (a) {
                    case AR.CONST.FONT_STYLE.NORMAL:
                    case AR.CONST.FONT_STYLE.BOLD:
                    case AR.CONST.FONT_STYLE.ITALIC:
                        return true;
                    default:
                        return false
                }
            },
            toName: function(a) {
                switch (a) {
                    case AR.CONST.FONT_STYLE.NORMAL:
                        return "AR.CONST.FONT_STYLE.NORMAL";
                    case AR.CONST.FONT_STYLE.BOLD:
                        return "AR.CONST.FONT_STYLE.BOLD";
                    case AR.CONST.FONT_STYLE.ITALIC:
                        return "AR.CONST.FONT_STYLE.ITALIC";
                    default:
                        return null
                }
            }
        },
        STATE: {
            ERROR: -1,
            INITIALIZED: 0,
            LOADING: 1,
            LOADED: 2,
            PLAYING: 3,
            PAUSED: 4,
            toName: function(a) {
                switch (a) {
                    case AR.CONST.STATE.ERROR:
                        return "AR.CONST.STATE.ERROR";
                    case AR.CONST.STATE.INITIALIZED:
                        return "AR.CONST.STATE.INITIALIZED";
                    case AR.CONST.STATE.LOADING:
                        return "AR.CONST.STATE.LOADING";
                    case AR.CONST.STATE.LOADED:
                        return "AR.CONST.STATE.LOADED";
                    case AR.CONST.STATE.PLAYING:
                        return "AR.CONST.STATE.PLAYING";
                    case AR.CONST.STATE.PAUSED:
                        return "AR.CONST.STATE.PAUSED";
                    default:
                        return null
                }
            }
        },
        CLICK_BEHAVIOR: {
            CLICK: "touchClick",
            TOUCH_UP: "touchUp",
            TOUCH_DOWN: "touchDown"
        }
    };
    AR.OneTimeUseContextConstructionPlan = PClass.create({
        validateFunction: function(a, b) {
            if (AR.VALIDATE.isDefined(b) && !AR.VALIDATE.isFunction(b)) {
                throw AR.ERROR.create(a, AR.ERROR.TYPE.OBJECT, "function", typeof b)
            }
            return b
        },
        init: function() {
            var a = null;
            _onScreenClick = null;
            _destroyAll = function() {
                AR.om.destroyAllObjects(true);
                AR.i.callAsync({
                    is: "AR.i.contextInterface.destroyAll"
                })
            };
            _clickBehavior = AR.CONST.CLICK_BEHAVIOR.CLICK;
            this.__defineSetter__("onLocationChanged", function(f) {
                f = this.validateFunction("onLocationChanged", f);
                a = f;
                AR.i.callAsync({
                    is: "AR.i.contextInterface.setOnLocationChangedTriggerActive",
                    onLocationChangedTriggerActive: a != null
                })
            });
            this.__defineGetter__("onLocationChanged", function() {
                return a
            });
            this.__defineSetter__("onScreenClick", function(f) {
                f = this.validateFunction("onScreenClick", f);
                _onScreenClick = f;
                AR.i.callAsync({
                    is: "AR.i.contextInterface.setOnScreenClickTriggerActive",
                    onScreenClickTriggerActive: _onScreenClick != null
                })
            });
            this.__defineGetter__("onScreenClick", function() {
                return _onScreenClick
            });
            this.__defineSetter__("destroyAll", function(f) {
                throw AR.ERROR.create("destroyAll", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("destroyAll", function() {
                return _destroyAll
            });
            this.__defineSetter__("clickBehavior", function(f) {
                if (f != AR.CONST.CLICK_BEHAVIOR.CLICK && f != AR.CONST.CLICK_BEHAVIOR.TOUCH_UP && f != AR.CONST.CLICK_BEHAVIOR.TOUCH_DOWN) {
                    throw AR.ERROR.create("clickBehavior", AR.ERROR.TYPE.OBJECT, "CLICK_BEHAVIOR.___", typeof f)
                }
                _clickBehavior = f;
                AR.js.clickBehavior.setClickBehavior(_clickBehavior)
            });
            this.__defineGetter__("clickBehavior", function() {
                return _clickBehavior
            });
            var b = function() {
                var g = true;
                var f = true;
                this.__defineGetter__("camera", function() {
                    return g
                });
                this.__defineSetter__("camera", function(h) {
                    h = _PROPERTY_VALIDATOR.validate("services.camera", h, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                    g = h;
                    AR.i.callAsync({
                        is: "AR.i.contextInterface.setServiceEnabled",
                        service: "camera",
                        enabled: g
                    })
                });
                this.__defineGetter__("sensors", function() {
                    return f
                });
                this.__defineSetter__("sensors", function(h) {
                    h = _PROPERTY_VALIDATOR.validate("services.sensors", h, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                    f = h;
                    AR.i.callAsync({
                        is: "AR.i.contextInterface.setServiceEnabled",
                        service: "sensors",
                        enabled: f
                    })
                })
            };
            var d = new b();
            this.__defineSetter__("services", function(f) {
                throw AR.ERROR.create("services", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("services", function() {
                return d
            });
            var e = function() {
                var f = 50000;
                this.__defineGetter__("cullingDistance", function() {
                    return f
                });
                this.__defineSetter__("cullingDistance", function(g) {
                    g = _PROPERTY_VALIDATOR.validate("scene.cullingDistance", g, _PROPERTY_VALIDATOR.TYPE.POSITIVE_INT, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                    f = g;
                    AR.i.callAsync({
                        is: "AR.i.contextInterface.setCullingDistance",
                        cullingDistance: f
                    })
                })
            };
            var c = new e();
            this.__defineSetter__("scene", function(f) {
                throw AR.ERROR.create("scene", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("scene", function() {
                return c
            });
            AR.OneTimeUseContextConstructionPlan = null
        },
        startVideoPlayer: function(a) {
            if (!AR.VALIDATE.isDefined(a)) {
                throw AR.ERROR.create("uri", AR.ERROR.TYPE.UNDEFINED)
            }
            if (!AR.VALIDATE.isString(a)) {
                throw AR.ERROR.create("uri", AR.ERROR.TYPE.STRING)
            }
            AR.i.callAsync({
                is: "AR.i.contextInterface.startVideoPlayer",
                uri: AR.__resourceUrl(a)
            })
        },
        openInBrowser: function(a, b) {
            if (!AR.VALIDATE.isDefined(a)) {
                throw AR.ERROR.create("url", AR.ERROR.TYPE.UNDEFINED)
            }
            if (!AR.VALIDATE.isDefined(b)) {
                b = false
            }
            if (!AR.VALIDATE.isBoolean(b)) {
                throw AR.ERROR.create("forceNativeBrowser", AR.ERROR.TYPE.BOOLEAN)
            }
            AR.i.callAsync({
                is: "AR.i.contextInterface.openInBrowser",
                url: a,
                forceNativeBrowser: b
            })
        },
        activateBatchCreation: function() {
            AR.bm.setBatchCreationActive()
        },
        deactivateBatchCreation: function() {
            AR.bm.setBatchCreationDeactivated()
        }
    });
    AR.context = new AR.OneTimeUseContextConstructionPlan();
    AR.OneTimeUseLoggerConstructionPlan = function() {
        var b = false;
        var f = [];
        var e = null;
        var d = false;
        var g = [];
        this.registerRegistrar = function(i, h) {
            e = i;
            d = (!h ? false : h)
        };
        this.changeLogLevelEnabled = function(i, h) {
            if (h) {
                g.push(i)
            } else {
                if (g.indexOf(i) != -1) {
                    g.splice(g.indexOf(i), 1)
                }
            }
            a()
        };
        this.toggleLogLevelEnabled = function(h) {
            this.changeLogLevelEnabled(h, g.indexOf(h) == -1)
        };
        this.error = function(h) {
            c(new AR.__LOGGER_MESSAGE__("ERROR", h))
        };
        this.warning = function(h) {
            c(new AR.__LOGGER_MESSAGE__("WARNING", h))
        };
        this.info = function(h) {
            c(new AR.__LOGGER_MESSAGE__("INFO", h))
        };
        this.debug = function(h) {
            c(new AR.__LOGGER_MESSAGE__("DEBUG", h))
        };
        var c = function(h) {
            if (!e) {
                return
            }
            f.push(h);
            if (g.indexOf(h.type) != -1) {
                e.appendLine(h.toString(d), h.color)
            }
        };
        var a = function() {
            if (!e) {
                return
            }
            e.clearConsole();
            var j = f.length;
            for (var h = 0; h < j; h++) {
                if (g.indexOf(f[h].type) != -1) {
                    e.appendLine(f[h].toString(d), f[h].color)
                }
            }
        };
        this.clearConsole = function() {
            f = [];
            if (!e) {
                return
            }
            e.clearConsole()
        };
        this.activateDebugMode = function() {
            if (!b) {
                if (__ARCHITECT_LOGGER_FRAMEWORK__) {
                    b = true;
                    __ARCHITECT_LOGGER_FRAMEWORK__.activateDebugMode()
                }
            }
        };
        AR.OneTimeUseLoggerConstructionPlan = null
    };
    AR.logger = new AR.OneTimeUseLoggerConstructionPlan();
    AR.__LOGGER_MESSAGE__ = function(b, c) {
        this.type = b;
        this.date = new Date();
        this.message = c;
        this.color = null;
        switch (b) {
            case "ERROR":
                this.color = "red";
                break;
            case "WARNING":
                this.color = "orange";
                break;
            case "INFO":
                this.color = "green";
                break;
            default:
                this.color = "black";
                break
        }
        this.toString = function(f) {
            var e = this.type.substring(0, 1) + " " + d(this.date) + " - " + this.message;
            if (f) {
                return "<font color=" + this.color + ">" + e + "</font>"
            } else {
                return e
            }
        };
        var d = function(f) {
            var e = f.getHours();
            var g = f.getMinutes();
            var h = f.getSeconds();
            return a(e) + ":" + a(g) + ":" + a(h)
        };
        var a = function(e) {
            if (e < 10) {
                return "0" + e
            }
            return e
        }
    };
    AR.Tracker = AR.ARchitectObject.extend({
        init: function(g, c) {
            this._super();
            var h = _PROPERTY_VALIDATOR.validate("src", g, _PROPERTY_VALIDATOR.TYPE.STRING, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            var a = true;
            var e;
            var f;
            var b;
            if (c) {
                if (c.enabled) {
                    a = _PROPERTY_VALIDATOR.validate("enabled", c.enabled, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
                }
                if (c.onDisabled) {
                    e = _PROPERTY_VALIDATOR.validate("onDisabled", c.onDisabled, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
                if (c.onLoaded) {
                    f = _PROPERTY_VALIDATOR.validate("onLoaded", c.onLoaded, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
                if (c.onError) {
                    b = _PROPERTY_VALIDATOR.validate("onError", c.onError, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
            }
            var d = AR.om.createObjectID();
            AR.i.callAsync({
                objectId: d,
                is: "AR.i.trackerInterface.createTracker",
                src: AR.__resourceUrl(h),
                enabled: a,
                onDisabledTriggerActive: e != null,
                onLoadedTriggerActive: f != null,
                onErrorTriggerActive: b != null
            });
            AR.om.registerObjectForID(d, this);
            this.__defineSetter__("__id", function(i) {
                throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("__id", function() {
                return d
            });
            this.__defineSetter__("src", function(i) {
                throw AR.ERROR.create("src", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("src", function() {
                return h
            });
            this.__defineSetter__("enabled", function(i) {
                i = _PROPERTY_VALIDATOR.validate("enabled", i, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                AR.i.callAsync({
                    objectId: d,
                    is: "AR.i.trackerInterface.setEnabled",
                    enabled: i
                })
            });
            this.__defineGetter__("enabled", function() {
                return AR.i.callSync({
                    objectId: d,
                    is: "AR.i.trackerInterface.getEnabled"
                })
            });
            this.__defineSetter__("onDisabled", function(i) {
                i = _PROPERTY_VALIDATOR.validate("onDisabled", i, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                e = i;
                AR.i.callAsync({
                    objectId: d,
                    is: "AR.i.trackerInterface.setOnDisabledTriggerActive",
                    onDisabledTriggerActive: i != null
                })
            });
            this.__defineGetter__("onDisabled", function() {
                return e
            });
            this.__defineSetter__("onLoaded", function(i) {
                i = _PROPERTY_VALIDATOR.validate("onLoaded", i, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                f = i;
                AR.i.callAsync({
                    objectId: d,
                    is: "AR.i.trackerInterface.setOnLoadedTriggerActive",
                    onLoadedTriggerActive: i != null
                })
            });
            this.__defineGetter__("onLoaded", function() {
                return f
            });
            this.__defineSetter__("onError", function(i) {
                i = _PROPERTY_VALIDATOR.validate("onError", i, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                b = i;
                AR.i.callAsync({
                    objectId: d,
                    is: "AR.i.trackerInterface.setOnErrorTriggerActive",
                    onErrorTriggerActive: i != null
                })
            });
            this.__defineGetter__("onError", function() {
                return b
            })
        },
        isLoaded: function() {
            return AR.i.callSync({
                objectId: this.__id,
                is: "AR.i.trackerInterface.isLoaded"
            })
        }
    });
    AR.Trackable2DObject = AR.ARObject.extend({
        init: function(f, e, c) {
            var g = this._super(c);
            var b = _PROPERTY_VALIDATOR.validate("tracker", f, {
                type: _PROPERTY_VALIDATOR.TYPE.CLASS,
                ofType: AR.Tracker
            }, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            var a = _PROPERTY_VALIDATOR.validate("targetName", e, _PROPERTY_VALIDATOR.TYPE.STRING, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            var d = AR.om.createObjectID();
            AR.i.callAsync({
                objectId: d,
                is: "AR.i.trackable2DObjectInterface.createTrackable2DObject",
                trackerId: b.__id,
                targetName: e,
                enabled: g.enabled,
                onEnterFieldOfVisionTriggerActive: g.onEnterFieldOfVisionTriggerActive,
                onExitFieldOfVisionTriggerActive: g.onExitFieldOfVisionTriggerActive,
                onClickTriggerActive: g.onClickTriggerActive,
                camDrawableIds: AR.__toJSONString__(AR.om.__getIds__(g.drawables.cam)),
                renderingOrder: g.renderingOrder
            });
            AR.om.registerObjectForID(d, this);
            this.__defineSetter__("__id", function(h) {
                throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("__id", function() {
                return d
            });
            this.__defineSetter__("tracker", function(h) {
                throw AR.ERROR.create("tracker", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("tracker", function() {
                return b
            });
            this.__defineSetter__("targetName", function(h) {
                throw AR.ERROR.create("targetName", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("targetName", function() {
                return a
            });
            this.__defineSetter__("width", function(h) {
                throw AR.ERROR.create("width", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("width", function() {
                var h = AR.i.callSync({
                    objectId: d,
                    is: "AR.i.trackable2DObjectInterface.getWidth"
                });
                return h < 0 ? undefined : h
            });
            this.__defineSetter__("height", function(h) {
                throw AR.ERROR.create("height", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("height", function() {
                var h = AR.i.callSync({
                    objectId: d,
                    is: "AR.i.trackable2DObjectInterface.getHeight"
                });
                return h < 0 ? undefined : h
            });
            this.getDistance = function() {
                var h = AR.i.callSync({
                    objectId: this.__id,
                    is: "AR.i.trackable2DObjectInterface.getDistance"
                });
                return h < 0 ? undefined : h
            }
        }
    });
    AR.OneTimeUseRadarConstructionPlan = PClass.create({
        init: function() {
            var f = false;
            var b;
            var j = 0;
            var i = 0;
            var e = 0;
            var d = 0.5;
            var c = 0.5;
            var a = 0.5;
            var k;
            var g;
            var h = new AR._NorthIndicator();
            this.__defineSetter__("enabled", function(l) {
                l = _PROPERTY_VALIDATOR.validate("enabled", l, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                f = l;
                AR.i.callAsync({
                    is: "AR.i.radarInterface.setEnabled",
                    enabled: l
                })
            });
            this.__defineGetter__("enabled", function() {
                return f
            });
            this.__defineSetter__("background", function(l) {
                l = _PROPERTY_VALIDATOR.validate("background", l, {
                    type: _PROPERTY_VALIDATOR.TYPE.CLASS,
                    ofType: AR.ImageResource
                }, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                b = l;
                AR.i.callAsync({
                    is: "AR.i.radarInterface.setBackground",
                    backgroundId: (l == null || l == undefined ? null : l.__id)
                })
            });
            this.__defineGetter__("background", function() {
                return b
            });
            this.__defineSetter__("positionX", function(l) {
                l = _PROPERTY_VALIDATOR.validate("positionX", l, _PROPERTY_VALIDATOR.TYPE.UNIT_INTERVAL, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                j = l;
                AR.i.callAsync({
                    is: "AR.i.radarInterface.setPositionX",
                    positionX: l
                })
            });
            this.__defineGetter__("positionX", function() {
                return j
            });
            this.__defineSetter__("positionY", function(l) {
                l = _PROPERTY_VALIDATOR.validate("positionY", l, _PROPERTY_VALIDATOR.TYPE.UNIT_INTERVAL, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                i = l;
                AR.i.callAsync({
                    is: "AR.i.radarInterface.setPositionY",
                    positionY: l
                })
            });
            this.__defineGetter__("positionY", function() {
                return i
            });
            this.__defineSetter__("width", function(l) {
                l = _PROPERTY_VALIDATOR.validate("width", l, _PROPERTY_VALIDATOR.TYPE.UNIT_INTERVAL, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                e = l;
                AR.i.callAsync({
                    is: "AR.i.radarInterface.setWidth",
                    width: l
                })
            });
            this.__defineGetter__("width", function() {
                return e
            });
            this.__defineSetter__("centerX", function(l) {
                l = _PROPERTY_VALIDATOR.validate("centerX", l, _PROPERTY_VALIDATOR.TYPE.UNIT_INTERVAL, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                d = l;
                AR.i.callAsync({
                    is: "AR.i.radarInterface.setCenterX",
                    centerX: l
                })
            });
            this.__defineGetter__("centerX", function() {
                return d
            });
            this.__defineSetter__("centerY", function(l) {
                l = _PROPERTY_VALIDATOR.validate("centerY", l, _PROPERTY_VALIDATOR.TYPE.UNIT_INTERVAL, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                c = l;
                AR.i.callAsync({
                    is: "AR.i.radarInterface.setCenterY",
                    centerY: l
                })
            });
            this.__defineGetter__("centerY", function() {
                return c
            });
            this.__defineSetter__("radius", function(l) {
                l = _PROPERTY_VALIDATOR.validate("radius", l, _PROPERTY_VALIDATOR.TYPE.UNIT_INTERVAL, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                a = l;
                AR.i.callAsync({
                    is: "AR.i.radarInterface.setRadius",
                    radius: l
                })
            });
            this.__defineGetter__("radius", function() {
                return a
            });
            this.__defineSetter__("maxDistance", function(l) {
                l = _PROPERTY_VALIDATOR.validate("maxDistance", l, _PROPERTY_VALIDATOR.TYPE.POSITIVE, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                k = l;
                AR.i.callAsync({
                    is: "AR.i.radarInterface.setMaxDistance",
                    maxDistance: (l ? l : -1)
                })
            });
            this.__defineGetter__("maxDistance", function() {
                return k
            });
            this.__defineSetter__("northIndicator", function(l) {
                throw AR.ERROR.create("northIndicator", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("northIndicator", function() {
                return h
            });
            this.__defineSetter__("onClick", function(l) {
                l = _PROPERTY_VALIDATOR.validate("onClick", l, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                g = l;
                AR.i.callAsync({
                    is: "AR.i.radarInterface.setOnClickTriggerActive",
                    onClickTriggerActive: l != null
                })
            });
            this.__defineGetter__("onClick", function() {
                return g
            });
            AR.OneTimeUseRadarConstructionPlan = null
        }
    });
    AR._NorthIndicator = PClass.create({
        init: function() {
            var b;
            var a = 0.5;
            this.__defineSetter__("image", function(c) {
                c = _PROPERTY_VALIDATOR.validate("northIndicator.image", c, {
                    type: _PROPERTY_VALIDATOR.TYPE.CLASS,
                    ofType: AR.ImageResource
                }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                b = c;
                AR.i.callAsync({
                    is: "AR.i.radarInterface.setNorthIndicatorImage",
                    northIndicatorImageId: (c == null || c == undefined ? null : c.__id)
                })
            });
            this.__defineGetter__("image", function() {
                return b
            });
            this.__defineSetter__("radius", function(c) {
                c = _PROPERTY_VALIDATOR.validate("northIndicator.radius", c, _PROPERTY_VALIDATOR.TYPE.UNIT_INTERVAL, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                a = c;
                AR.i.callAsync({
                    is: "AR.i.radarInterface.setNorthIndicatorRadius",
                    northIndicatorRadius: c
                })
            });
            this.__defineGetter__("radius", function() {
                return a
            })
        }
    });
    AR.radar = new AR.OneTimeUseRadarConstructionPlan();
    AR.Drawable2D.prototype.__defineSetter__("scaling", function(a) {
        this.scale = a
    });
    AR.Drawable2D.prototype.__defineGetter__("scaling", function() {
        return this.scale
    });
    AR.EasingCurve = AR.ARchitectObject.extend({
        init: function(b, a) {
            this._super();
            this.type = b;
            if (a != null) {
                if (a.amplitude != null) {
                    this.amplitude = a.amplitude
                }
                if (a.overshoot != null) {
                    this.overshoot = a.overshoot
                }
                if (a.period != null) {
                    this.period = a.period
                }
            }
        }
    });
    AR.Drawable.prototype.__defineSetter__("triggers", function(a) {});
    AR.Drawable.prototype.__defineGetter__("triggers", function() {
        if (!this._triggers) {
            this._triggers = new AR.DrawableTriggers(this, {
                onClick: this.onClick
            })
        }
        return this._triggers
    });
    AR.DrawableTriggers = PClass.create({
        init: function(b, a) {
            var c = b;
            var d = null;
            if (a) {
                c.onClick = a.onClick;
                d = a.onClick
            }
            this.__defineSetter__("onClick", function(e) {
                c.onClick = e;
                d = e
            });
            this.__defineGetter__("onClick", function() {
                d = c.onClick;
                return d
            })
        }
    });
    AR.GeoObject.prototype.__defineSetter__("triggers", function(a) {});
    AR.GeoObject.prototype.__defineGetter__("triggers", function() {
        if (!this._triggers) {
            this._triggers = new AR.GeoObjectTriggers(this, {
                onEnterFieldOfVision: this.onEnterFieldOfVision,
                onExitFieldOfVision: this.onExitFieldOfVision
            })
        }
        return this._triggers
    });
    AR.GeoObjectTriggers = PClass.create({
        init: function(d, b) {
            var c = d;
            var a = null;
            var e = null;
            if (b) {
                c.onEnterFieldOfVision = b.onEnterFieldOfVision;
                a = b.onEnterFieldOfVision;
                c.onExitFieldOfVision = b.onExitFieldOfVision;
                e = b.onExitFieldOfVision
            }
            this.__defineSetter__("onEnterFieldOfVision", function(f) {
                c.onEnterFieldOfVision = f;
                a = f
            });
            this.__defineGetter__("onEnterFieldOfVision", function() {
                a = c.onEnterFieldOfVision;
                return a
            });
            this.__defineSetter__("onExitFieldOfVision", function(f) {
                c.onExitFieldOfVision = f;
                e = f
            });
            this.__defineGetter__("onExitFieldOfVision", function() {
                e = c.onExitFieldOfVision;
                return e
            })
        }
    });
    AR.ActionRange.prototype.__defineSetter__("geoLocation", function(a) {
        this.location = a
    });
    AR.ActionRange.prototype.__defineGetter__("geoLocation", function() {
        return this.location
    });
    AR.Drawable.prototype.__defineSetter__("roll", function(a) {
        this.rotate.roll = a
    });
    AR.Drawable.prototype.__defineGetter__("roll", function() {
        return this.rotate ? this.rotate.roll : undefined
    });
    AR.Drawable.prototype.__defineSetter__("tilt", function(a) {
        this.rotate.tilt = a
    });
    AR.Drawable.prototype.__defineGetter__("tilt", function() {
        return this.rotate ? this.rotate.tilt : undefined
    });
    AR.Drawable.prototype.__defineSetter__("heading", function(a) {
        this.rotate.heading = a
    });
    AR.Drawable.prototype.__defineGetter__("heading", function() {
        return this.rotate ? this.rotate.heading : undefined
    });

    function printStackTrace(b) {
        var c = (b && b.e) ? b.e : null;
        var e = b ? !!b.guess : true;
        var d = new printStackTrace.implementation();
        var a = d.run(c);
        return (e) ? d.guessFunctions(a) : a
    }
    printStackTrace.implementation = function() {};
    printStackTrace.implementation.prototype = {
        run: function(a) {
            a = a || (function() {
                try {
                    this.undef();
                    return null
                } catch (c) {
                    if (AR.i.contextInterface.info) {
                        AR.i.contextInterface.info("Exception caught: " + c)
                    }
                    return c
                }
            })();
            var b = this._mode || this.mode(a);
            if (b === "other") {
                return this.other(arguments.callee)
            } else {
                return this[b](a)
            }
        },
        mode: function(a) {
            if (a["arguments"]) {
                return (this._mode = "chrome")
            } else {
                if (typeof window !== "undefined" && window.opera && a.stacktrace) {
                    return (this._mode = "opera10")
                } else {
                    if (a.stack) {
                        return (this._mode = "firefox")
                    } else {
                        if (typeof window !== "undefined" && window.opera && !("stacktrace" in a)) {
                            return (this._mode = "opera")
                        }
                    }
                }
            }
            return (this._mode = "other")
        },
        instrumentFunction: function(a, b, c) {
            a = a || window;
            a["_old" + b] = a[b];
            a[b] = function() {
                c.call(this, printStackTrace());
                return a["_old" + b].apply(this, arguments)
            };
            a[b]._instrumented = true
        },
        deinstrumentFunction: function(a, b) {
            if (a[b].constructor === Function && a[b]._instrumented && a["_old" + b].constructor === Function) {
                a[b] = a["_old" + b]
            }
        },
        chrome: function(a) {
            return a.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@").split("\n")
        },
        firefox: function(a) {
            return a.stack.replace(/(?:\n@:0)?\s+$/m, "").replace(/^\(/gm, "{anonymous}(").split("\n")
        },
        opera10: function(g) {
            var k = g.stacktrace;
            var m = k.split("\n"),
                a = "{anonymous}",
                h = /.*line (\d+), column (\d+) in ((<anonymous function\:?\s*(\S+))|([^\(]+)\([^\)]*\))(?: in )?(.*)\s*$/i,
                d, c, f;
            for (d = 2, c = 0, f = m.length; d < f - 2; d++) {
                if (h.test(m[d])) {
                    var l = RegExp.$6 + ":" + RegExp.$1 + ":" + RegExp.$2;
                    var b = RegExp.$3;
                    b = b.replace(/<anonymous function\:?\s?(\S+)?>/g, a);
                    m[c++] = b + "@" + l
                }
            }
            m.splice(c, m.length - c);
            return m
        },
        opera: function(h) {
            var c = h.message.split("\n"),
                b = "{anonymous}",
                g = /Line\s+(\d+).*script\s+(http\S+)(?:.*in\s+function\s+(\S+))?/i,
                f, d, a;
            for (f = 4, d = 0, a = c.length; f < a; f += 2) {
                if (g.test(c[f])) {
                    c[d++] = (RegExp.$3 ? RegExp.$3 + "()@" + RegExp.$2 + RegExp.$1 : b + "()@" + RegExp.$2 + ":" + RegExp.$1) + " -- " + c[f + 1].replace(/^\s+/, "")
                }
            }
            c.splice(d, c.length - d);
            return c
        },
        other: function(g) {
            var b = "{anonymous}",
                f = /function\s*([\w\-$]+)?\s*\(/i,
                a = [],
                d, c, e = 10;
            while (g && a.length < e) {
                d = f.test(g.toString()) ? RegExp.$1 || b : b;
                c = Array.prototype.slice.call(g["arguments"]);
                a[a.length] = d + "(" + this.stringifyArguments(c) + ")";
                g = g.caller
            }
            return a
        },
        stringifyArguments: function(b) {
            for (var c = 0; c < b.length; ++c) {
                var a = b[c];
                if (a === undefined) {
                    b[c] = "undefined"
                } else {
                    if (a === null) {
                        b[c] = "null"
                    } else {
                        if (a.constructor) {
                            if (a.constructor === Array) {
                                if (a.length < 3) {
                                    b[c] = "[" + this.stringifyArguments(a) + "]"
                                } else {
                                    b[c] = "[" + this.stringifyArguments(Array.prototype.slice.call(a, 0, 1)) + "..." + this.stringifyArguments(Array.prototype.slice.call(a, -1)) + "]"
                                }
                            } else {
                                if (a.constructor === Object) {
                                    b[c] = "#object"
                                } else {
                                    if (a.constructor === Function) {
                                        b[c] = "#function"
                                    } else {
                                        if (a.constructor === String) {
                                            b[c] = '"' + a + '"'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return b.join(",")
        },
        sourceCache: {},
        ajax: function(a) {
            var b = this.createXMLHTTPObject();
            if (!b) {
                return
            }
            b.open("GET", a, false);
            b.setRequestHeader("User-Agent", "XMLHTTP/1.0");
            b.send("");
            return b.responseText
        },
        createXMLHTTPObject: function() {
            var c, a = [function() {
                return new XMLHttpRequest()
            }, function() {
                return new ActiveXObject("Msxml2.XMLHTTP")
            }, function() {
                return new ActiveXObject("Msxml3.XMLHTTP")
            }, function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }];
            for (var b = 0; b < a.length; b++) {
                try {
                    c = a[b]();
                    this.createXMLHTTPObject = a[b];
                    return c
                } catch (d) {
                    if (AR.i.contextInterface.info) {
                        AR.i.contextInterface.info("Exception caught: " + d)
                    }
                }
            }
        },
        isSameDomain: function(a) {
            return a.indexOf(location.hostname) !== -1
        },
        getSource: function(a) {
            if (!(a in this.sourceCache)) {
                this.sourceCache[a] = this.ajax(a).split("\n")
            }
            return this.sourceCache[a]
        },
        guessFunctions: function(b) {
            for (var d = 0; d < b.length; ++d) {
                var h = /\{anonymous\}\(.*\)@(\w+:\/\/([\-\w\.]+)+(:\d+)?[^:]+):(\d+):?(\d+)?/;
                var g = b[d],
                    a = h.exec(g);
                if (a) {
                    var c = a[1],
                        f = a[4];
                    if (c && this.isSameDomain(c) && f) {
                        var e = this.guessFunctionName(c, f);
                        b[d] = g.replace("{anonymous}", e)
                    }
                }
            }
            return b
        },
        guessFunctionName: function(b, d) {
            var a;
            try {
                a = this.guessFunctionNameFromLines(d, this.getSource(b))
            } catch (c) {
                a = "getSource failed with url: " + b + ", exception: " + c.toString();
                if (AR.i.contextInterface.info) {
                    AR.i.contextInterface.info("Exception caught: " + c)
                }
            }
            return a
        },
        guessFunctionNameFromLines: function(h, f) {
            var c = /function ([^(]*)\(([^)]*)\)/;
            var g = /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*(function|eval|new Function)/;
            var b = "",
                d = 10;
            for (var e = 0; e < d; ++e) {
                b = f[h - e] + b;
                if (b !== undefined) {
                    var a = g.exec(b);
                    if (a && a[1]) {
                        return a[1]
                    } else {
                        a = c.exec(b);
                        if (a && a[1]) {
                            return a[1]
                        }
                    }
                }
            }
            return "(?)"
        }
    };

    function buildStack(b) {
        if (b == null) {
            b = "<br />"
        }
        var c = printStackTrace();
        for (var a = 0; a < 5; a++) {
            c.shift()
        }
        return b + c.join(b) + b
    }
    AR.overlay = AR.overlay || {};
    AR.overlay.__OVERLAY_CONTAINER__CONSTRUCTION_PLAN = function() {
        var n = null;
        var i = [];
        var j = 0;
        var a = function() {
            document.body.appendChild(n);
            document.body.appendChild(b);
            for (var p = 0; p < i.length; p++) {
                if (i[p].initFunction) {
                    i[p].initFunction()
                }
            }
            if (i.length > 0) {
                o()
            }
        };
        var e = function(p) {
            if (window.attachEvent) {
                window.attachEvent("onload", p)
            } else {
                if (window.addEventListener) {
                    window.addEventListener("load", p, false)
                }
            }
        };
        e(a);
        var k = function() {
            var r = document.createElement("style");
            var p = "";
            p += "div.__OVERLAY__mainDiv {-webkit-box-shadow: #333 0px 0px 10px 0px; box-shadow: #333 0px 0px 10px 0px; background: #F0F0F0; position: absolute;top: 5%;left: 5%;right: 5%;bottom: 5%;z-index: 2147483647;padding: 20px;overflow: auto;font-family:Verdana;font-size:small;}";
            p += "input.__OVERLAY__closeButton {float: right;}";
            p += "div.__OVERLAY__openButton {position: absolute;right: 0px;bottom: 0px;z-index: 2147483647;width: 0; height: 0; border-bottom: 40px solid #FF8C0A; border-left: 40px solid transparent; }";
            p += "div.__OVERLAY__tab {margin-right:2px;border-style: groove;margin-bottom:1px;width: 30%;background: #F0F0F0;text-align: center;vertical-align: middle;font-weight: bold;height: 20px;border-top-left-radius:20px;border-top-right-radius:20px;cursor:pointer;cursor: pointer;border-width: 1px;border-color: black;}";
            p += "#toolTipDiv {font-family:Verdana; position: absolute;right: 5px;bottom: 65px;width: 220px;background-color: #FFBB24;padding-bottom: 5px;padding-top: 5px;z-index: 2147483646;}";
            p += "#toolTipDiv:before {  content: ' ';  position: absolute;  right: 20px;bottom: -40px;border: 20px solid;border-color: #FFBB24 #FFBB24 transparent transparent;}";
            r.setAttribute("type", "text/css");
            var q = document.getElementsByTagName("head")[0];
            q.appendChild(r);
            if (r.styleSheet) {
                r.styleSheet.cssText = p
            } else {
                var s = document.createTextNode(p);
                r.appendChild(s)
            }
        };
        k();
        n = document.createElement("div");
        n.id = "overlayDiv";
        n.setAttribute("class", "__OVERLAY__mainDiv");
        n.style.display = "none";
        var d = document.createElement("input");
        d.setAttribute("class", "__OVERLAY__closeButton");
        d.setAttribute("type", "button");
        d.setAttribute("value", "X");
        d.onclick = function() {
            n.style.display = "none";
            b.style.display = "block"
        };
        n.appendChild(d);
        var b = document.createElement("div");
        b.setAttribute("class", "__OVERLAY__openButton");
        b.setAttribute("type", "button");
        b.setAttribute("value", "^^");
        b.onclick = function() {
            n.style.display = "block";
            b.style.display = "none"
        };
        b.setEnabled = function(p) {
            b.style.display = (p ? "block" : "none")
        };
        b.setEnabled(false);
        var c = document.createElement("div");
        n.appendChild(c);
        var m = document.createElement("div");
        m.setAttribute("style", "clear: right;");
        n.appendChild(m);
        var f = 0;
        var h = null;
        var g = null;
        this.appendOverlay = function(r, s, p) {
            if (j == 0) {
                b.setEnabled(true);
                o()
            }
            var q = document.createElement("div");
            q.setAttribute("class", "__OVERLAY__tab");
            q.setAttribute("style", "margin-left:" + (31 * f) + "%;" + (f == 0 ? "float:left;" : ""));
            q.appendChild(document.createTextNode(r));
            if (!h) {
                h = s;
                g = q;
                q.style.backgroundColor = "#BEBEBE"
            } else {
                s.style.display = "none"
            }
            q.onclick = function() {
                h.style.display = "none";
                g.style.backgroundColor = "#F0F0F0";
                s.style.display = "block";
                q.style.backgroundColor = "#BEBEBE";
                h = s;
                g = q
            };
            c.appendChild(q);
            m.appendChild(s);
            i[f] = {
                tab: q,
                htmlElement: s,
                initFunction: p
            };
            f++;
            j++;
            return f - 1
        };
        var o = function() {
            var p = document.createElement("div");
            p.setAttribute("id", "toolTipDiv");
            p.innerHTML = "Open Logger and/or ADE by pressing this button";
            if (document.body) {
                document.body.appendChild(p)
            }
            window.setTimeout(l, 3000)
        };
        var l = function() {
            var p = document.getElementById("toolTipDiv");
            if (p) {
                document.body.removeChild(p)
            }
        };
        this.removeOverlay = function(p) {
            i[p].tab.style.display = "none";
            j--;
            if (j == 0) {
                b.setEnabled(false);
                l()
            }
        }
    };
    AR.overlay.OVERLAY_CONTAINER = new AR.overlay.__OVERLAY_CONTAINER__CONSTRUCTION_PLAN();
    AR.overlay.__OVERLAY_CONTAINER__CONSTRUCTION_PLAN = undefined;
    var __ARCHITECT_LOGGER_FRAMEWORK__ = new function() {
        var c = null;
        var e = null;
        var d = null;
        var l = {};
        var h = function() {
            var o = document.createElement("style");
            var m = "";
            m += "div.__LOGGER__logSelector {cursor:pointer; border: 1px solid black; border-radius:20px; width: 99%;float: left;font-size: large;margin-top: 0.3%;padding: 0.3%;text-align: center;margin-bottom: 0.3%;}";
            m += "div.__LOGGER__messagesContainer {width: 99%;overflow: auto;font-family: monospace;margin-top: 5px;}";
            m += "table.__LOGGER__selectorTable {width: 100%;table-layout: fixed;}";
            m += "div.__LOGGER__logMessage{font-family:monospace;} div.red {color:red;} div.green {color:green;} div.orange {color:orange;} div.black {color:black;}";
            m += "#__LOGGER__ARCHITECT_ERROR_LOG_CONSOLE {width : 100%; overflow : auto; font-family: monospace;}";
            m += "#__LOGGER__masterDiv {top: 0; width: 100%;}";
            m += "#__LOGGER__CONTROL_DIV {width: 100%;}";
            o.setAttribute("type", "text/css");
            var n = document.getElementsByTagName("head")[0];
            n.appendChild(o);
            if (o.styleSheet) {
                o.styleSheet.cssText = m
            } else {
                var p = document.createTextNode(m);
                o.appendChild(p)
            }
        };
        h();
        var g = {
            ERROR: [true, "red"],
            WARNING: [true, "orange"],
            INFO: [false, "green"],
            DEBUG: [false, "grey"]
        };
        this.__toggleLogLevel__ = function(m) {
            g[m][0] = !(g[m][0]);
            AR.logger.changeLogLevelEnabled(m, g[m][0]);
            b(m)
        };
        var b = function(m) {
            var n = l[m];
            if (g[m][0]) {
                n.style.backgroundColor = g[m][1]
            } else {
                n.style.backgroundColor = "#F0F0F0"
            }
        };
        var j = function() {
            function u(z, x, A, y) {
                var B = document.createElement("div");
                B.setAttribute("class", "__LOGGER__logSelector");
                B.setAttribute("id", "LOG_SELECTOR_" + x);
                B.setAttribute("style", "background-color:" + y + ";");
                B.onclick = function() {
                    __ARCHITECT_LOGGER_FRAMEWORK__.__toggleLogLevel__(x)
                };
                B.appendChild(document.createTextNode(z));
                l[x] = B;
                return B
            }
            var m = document.createElement("div");
            m.setAttribute("id", "__LOGGER__CONTROL_DIV");
            var p = document.createElement("table");
            p.setAttribute("class", "__LOGGER__selectorTable");
            var o = document.createElement("tr");
            var r = document.createElement("td");
            var s = document.createElement("td");
            o.appendChild(r);
            o.appendChild(s);
            p.appendChild(o);
            var t = document.createElement("tr");
            var q = document.createElement("td");
            var v = document.createElement("td");
            t.appendChild(q);
            t.appendChild(v);
            p.appendChild(t);
            r.appendChild(u("Error", "ERROR", true, "red"));
            s.appendChild(u("Warning", "WARNING", true, "orange"));
            q.appendChild(u("Info", "INFO", false, "green"));
            v.appendChild(u("Debug", "DEBUG", false, "grey"));
            m.appendChild(p);
            var w = document.createElement("div");
            w.setAttribute("class", "__LOGGER__clearButtonDiv");
            var n = document.createElement("input");
            n.setAttribute("type", "button");
            n.setAttribute("value", "Clear Console");
            n.onclick = function() {
                AR.logger.clearConsole()
            };
            w.appendChild(n);
            m.appendChild(w);
            return m
        };
        var f = function() {
            var m = document.createElement("textarea");
            m.setAttribute("id", "__LOGGER__ARCHITECT_ERROR_LOG_CONSOLE");
            m.scrollTop = m.scrollHeight;
            m.appendLine = function(n) {
                m.value += (n + "\n");
                m.scrollTop = m.scrollHeight - m.clientHeight
            };
            m.clearConsole = function() {
                m.value = ""
            };
            m.canHandleColorCodes = false;
            return m
        };
        var i = function() {
            var m = document.createElement("div");
            m.setAttribute("id", "__LOGGER__ARCHITECT_ERROR_LOG_CONSOLE");
            m.scrollTop = m.scrollHeight;
            m.appendLine = function(o, n) {
                m.innerHTML += (o + "<br />");
                m.scrollTop = m.scrollHeight - m.clientHeight
            };
            m.clearConsole = function() {
                m.innerHTML = ""
            };
            m.canHandleColorCodes = true;
            return m
        };
        var a = function() {
            var m = document.createElement("div");
            m.setAttribute("id", "ARCHITECT_ERROR_LOG_CONSOLE");
            m.scrollTop = m.scrollHeight;
            m.appendLine = function(o, n) {
                var p = document.createElement("div");
                p.setAttribute("class", "__LOGGER__logMessage " + n);
                p.appendChild(document.createTextNode(o));
                m.insertBefore(p, m.firstChild)
            };
            m.clearConsole = function() {
                while (m.hasChildNodes()) {
                    m.removeChild(m.firstChild)
                }
            };
            m.canHandleColorCodes = false;
            return m
        };
        var k = function() {
            var m = document.createElement("div");
            m.setAttribute("id", "__LOGGER__masterDiv");
            return m
        };
        this.activateDebugMode = function() {
            e = j();
            d = a();
            c = k();
            c.appendChild(e);
            c.appendChild(d);
            AR.logger.registerRegistrar(d, d.canHandleColorCodes);
            AR.logger.changeLogLevelEnabled("ERROR", true);
            AR.logger.changeLogLevelEnabled("WARNING", true);
            b("ERROR");
            b("WARNING");
            b("INFO");
            b("DEBUG");
            var m = AR.overlay.OVERLAY_CONTAINER.appendOverlay("Logger", c);
            activateDebugMode = null
        }
    };
    var AR = AR || {};
    AR.ADE = AR.ADE || {};
    AR.ADE.Screen = function() {
        var i = "LS_PREDEF_LOCATIONS_";
        (function() {
            var o = document.createElement("style");
            var m = "table.ygtvtable{margin-bottom:0;border:0;border-collapse:collapse}td.ygtvcell{border:0;padding:0}a.ygtvspacer{text-decoration:none;outline-style:none;display:block}.ygtvtn{width:18px;height:22px;background:url(http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/treeview-sprite.gif) 0 -5600px no-repeat;cursor:pointer}.ygtvtm{width:18px;height:22px;cursor:pointer;background:url(http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/treeview-sprite.gif) 0 -4000px no-repeat}.ygtvtmh,.ygtvtmhh{width:18px;height:22px;cursor:pointer;background:url(http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/treeview-sprite.gif) 0 -4800px no-repeat}.ygtvtp{width:18px;height:22px;cursor:pointer;background:url(http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/treeview-sprite.gif) 0 -6400px no-repeat}.ygtvtph,.ygtvtphh{width:18px;height:22px;cursor:pointer;background:url(http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/treeview-sprite.gif) 0 -7200px no-repeat}.ygtvln{width:18px;height:22px;background:url(http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/treeview-sprite.gif) 0 -1600px no-repeat;cursor:pointer}.ygtvlm{width:18px;height:22px;cursor:pointer;background:url(http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/treeview-sprite.gif) 0 0 no-repeat}.ygtvlmh,.ygtvlmhh{width:18px;height:22px;cursor:pointer;background:url(http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/treeview-sprite.gif) 0 -800px no-repeat}.ygtvlp{width:18px;height:22px;cursor:pointer;background:url(http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/treeview-sprite.gif) 0 -2400px no-repeat}.ygtvlph,.ygtvlphh{width:18px;height:22px;cursor:pointer;background:url(http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/treeview-sprite.gif) 0 -3200px no-repeat;cursor:pointer}.ygtvloading{width:18px;height:22px;background:url(http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/treeview-loading.gif) 0 0 no-repeat}.ygtvdepthcell{width:18px;height:22px;background:url(http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/treeview-sprite.gif) 0 -8000px no-repeat}.ygtvblankdepthcell{width:18px;height:22px}* html .ygtvchildren{height:2%}.ygtvlabel,.ygtvlabel:link,.ygtvlabel:visited,.ygtvlabel:hover{margin-left:2px;text-decoration:none;cursor:pointer}.ygtvcontent{cursor:default}.ygtvspacer{height:22px;width:18px}.ygtvfocus{background-color:#c0e0e0;border:0}.ygtvfocus .ygtvlabel,.ygtvfocus .ygtvlabel:link,.ygtvfocus .ygtvlabel:visited,.ygtvfocus .ygtvlabel:hover{background-color:#c0e0e0}.ygtvfocus a{outline-style:none}.ygtvok{width:18px;height:22px;background:url(http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/treeview-sprite.gif) 0 -8800px no-repeat}.ygtvok:hover{background:url(http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/treeview-sprite.gif) 0 -8844px no-repeat}.ygtvcancel{width:18px;height:22px;background:url(http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/treeview-sprite.gif) 0 -8822px no-repeat}.ygtvcancel:hover{background:url(http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/treeview-sprite.gif) 0 -8866px no-repeat}.ygtv-label-editor{background-color:#f2f2f2;border:1px solid silver;position:absolute;display:none;overflow:hidden;margin:auto;z-index:9000}.ygtv-edit-TextNode{width:190px}.ygtv-edit-TextNode .ygtvcancel,.ygtv-edit-TextNode .ygtvok{border:0}.ygtv-edit-TextNode .ygtv-button-container{float:right}.ygtv-edit-TextNode .ygtv-input input{width:140px}.ygtv-edit-DateNode .ygtvcancel{border:0}.ygtv-edit-DateNode .ygtvok{display:none}.ygtv-edit-DateNode .ygtv-button-container{text-align:right;margin:auto}.ygtv-highlight .ygtv-highlight1,.ygtv-highlight .ygtv-highlight1 .ygtvlabel{background-color:blue;color:white}.ygtv-highlight .ygtv-highlight2,.ygtv-highlight .ygtv-highlight2 .ygtvlabel{background-color:silver}.ygtv-highlight .ygtv-highlight0 .ygtvfocus .ygtvlabel,.ygtv-highlight .ygtv-highlight1 .ygtvfocus .ygtvlabel,.ygtv-highlight .ygtv-highlight2 .ygtvfocus .ygtvlabel{background-color:#c0e0e0}.ygtv-highlight .ygtvcontent{padding-right:1em}.ygtv-checkbox .ygtv-highlight0 .ygtvcontent{padding-left:1em;background:url(http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/check0.gif) no-repeat}.ygtv-checkbox .ygtv-highlight0 .ygtvfocus.ygtvcontent,.ygtv-checkbox .ygtv-highlight1 .ygtvfocus.ygtvcontent,.ygtv-checkbox .ygtv-highlight2 .ygtvfocus.ygtvcontent{background-color:#c0e0e0}.ygtv-checkbox .ygtv-highlight1 .ygtvcontent{padding-left:1em;background:url(http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/check1.gif) no-repeat}.ygtv-checkbox .ygtv-highlight2 .ygtvcontent{padding-left:1em;background:url(http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/check2.gif) no-repeat}";
            m += "#__ADE__tree_div{padding-top:5px;padding-left:20px;min-height:400px;height:auto !important;height:400px; }";
            m += "div.__ADE__header{clear:left;font-weight:bold;padding-bottom: 10px;padding-left: 2px;padding-top: 10px;background-color:#707070; color: white;}";
            m += "#__ADE__treeDivHeader{padding-bottom:12px;}";
            m += "#__ADE__settingsMainBox{float:right;border:2px solid;border-color:#9D9D9D;min-height:100px;height:auto !important;height:100px;}";
            m += "#__ADE__applyButton{margin-right: 5px}";
            m += "#__ADE__saveButton{margin-left: 5px}";
            m += "#__ADE__settingsSubHeader{font-weight: bold;padding: 3px;background-color: #9D9D9D;padding: 3px;margin-top: 2px;font-size: smaller;}";
            m += "div.__ADE__settingsEntryBox{margin-top: 5px;border-bottom: 1px solid;padding: 5px;border-color: #9D9D9D;}div.settingsEntryHeader{font-weight: bold;margin-bottom: 2px;font-size: x-small;}";
            m += "#__ADE__hitARObjectDiv{font-family:Verdana;z-index: 2147483647;position: fixed;top: 50%;left: 50%;background-color: #FFBB24;margin-left: -280px;padding: 20px;border: 2px solid;}";
            o.setAttribute("type", "text/css");
            var n = document.getElementsByTagName("head")[0];
            n.appendChild(o);
            if (o.styleSheet) {
                o.styleSheet.cssText = m
            } else {
                var p = document.createTextNode(m);
                o.appendChild(p)
            }
        })();
        (function() {
            var p = 'if(typeof YAHOO=="undefined"||!YAHOO){var YAHOO={};}YAHOO.namespace=function(){var b=arguments,g=null,e,c,f;for(e=0;e<b.length;e=e+1){f=(""+b[e]).split(".");g=YAHOO;for(c=(f[0]=="YAHOO")?1:0;c<f.length;c=c+1){g[f[c]]=g[f[c]]||{};g=g[f[c]];}}return g;};YAHOO.log=function(d,a,c){var b=YAHOO.widget.Logger;if(b&&b.log){return b.log(d,a,c);}else{return false;}};YAHOO.register=function(a,f,e){var k=YAHOO.env.modules,c,j,h,g,d;if(!k[a]){k[a]={versions:[],builds:[]};}c=k[a];j=e.version;h=e.build;g=YAHOO.env.listeners;c.name=a;c.version=j;c.build=h;c.versions.push(j);c.builds.push(h);c.mainClass=f;for(d=0;d<g.length;d=d+1){g[d](c);}if(f){f.VERSION=j;f.BUILD=h;}else{YAHOO.log("mainClass is undefined for module "+a,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(a){return YAHOO.env.modules[a]||null;};YAHOO.env.parseUA=function(d){var e=function(i){var j=0;return parseFloat(i.replace(/\\./g,function(){return(j++==1)?"":".";}));},h=navigator,g={ie:0,opera:0,gecko:0,webkit:0,chrome:0,mobile:null,air:0,ipad:0,iphone:0,ipod:0,ios:null,android:0,webos:0,caja:h&&h.cajaVersion,secure:false,os:null},c=d||(navigator&&navigator.userAgent),f=window&&window.location,b=f&&f.href,a;g.secure=b&&(b.toLowerCase().indexOf("https")===0);if(c){if((/windows|win32/i).test(c)){g.os="windows";}else{if((/macintosh/i).test(c)){g.os="macintosh";}else{if((/rhino/i).test(c)){g.os="rhino";}}}if((/KHTML/).test(c)){g.webkit=1;}a=c.match(/AppleWebKit\\/([^\\s]*)/);if(a&&a[1]){g.webkit=e(a[1]);if(/ Mobile\\//.test(c)){g.mobile="Apple";a=c.match(/OS ([^\\s]*)/);if(a&&a[1]){a=e(a[1].replace("_","."));}g.ios=a;g.ipad=g.ipod=g.iphone=0;a=c.match(/iPad|iPod|iPhone/);if(a&&a[0]){g[a[0].toLowerCase()]=g.ios;}}else{a=c.match(/NokiaN[^\\/]*|Android \\d\\.\\d|webOS\\/\\d\\.\\d/);if(a){g.mobile=a[0];}if(/webOS/.test(c)){g.mobile="WebOS";a=c.match(/webOS\\/([^\\s]*);/);if(a&&a[1]){g.webos=e(a[1]);}}if(/ Android/.test(c)){g.mobile="Android";a=c.match(/Android ([^\\s]*);/);if(a&&a[1]){g.android=e(a[1]);}}}a=c.match(/Chrome\\/([^\\s]*)/);if(a&&a[1]){g.chrome=e(a[1]);}else{a=c.match(/AdobeAIR\\/([^\\s]*)/);if(a){g.air=a[0];}}}if(!g.webkit){a=c.match(/Opera[\\s\\/]([^\\s]*)/);if(a&&a[1]){g.opera=e(a[1]);a=c.match(/Version\\/([^\\s]*)/);if(a&&a[1]){g.opera=e(a[1]);}a=c.match(/Opera Mini[^;]*/);if(a){g.mobile=a[0];}}else{a=c.match(/MSIE\\s([^;]*)/);if(a&&a[1]){g.ie=e(a[1]);}else{a=c.match(/Gecko\\/([^\\s]*)/);if(a){g.gecko=1;a=c.match(/rv:([^\\s\\)]*)/);if(a&&a[1]){g.gecko=e(a[1]);}}}}}}return g;};YAHOO.env.ua=YAHOO.env.parseUA();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var b=YAHOO_config.listener,a=YAHOO.env.listeners,d=true,c;if(b){for(c=0;c<a.length;c++){if(a[c]==b){d=false;break;}}if(d){a.push(b);}}}})();YAHOO.lang=YAHOO.lang||{};(function(){var f=YAHOO.lang,a=Object.prototype,c="[object Array]",h="[object Function]",i="[object Object]",b=[],g={"&":"&amp;","<":"&lt;",">":"&gt;",\'"\':"&quot;","\'":"&#x27;","/":"&#x2F;","`":"&#x60;"},d=["toString","valueOf"],e={isArray:function(j){return a.toString.apply(j)===c;},isBoolean:function(j){return typeof j==="boolean";},isFunction:function(j){return(typeof j==="function")||a.toString.apply(j)===h;},isNull:function(j){return j===null;},isNumber:function(j){return typeof j==="number"&&isFinite(j);},isObject:function(j){return(j&&(typeof j==="object"||f.isFunction(j)))||false;},isString:function(j){return typeof j==="string";},isUndefined:function(j){return typeof j==="undefined";},_IEEnumFix:(YAHOO.env.ua.ie)?function(l,k){var j,n,m;for(j=0;j<d.length;j=j+1){n=d[j];m=k[n];if(f.isFunction(m)&&m!=a[n]){l[n]=m;}}}:function(){},escapeHTML:function(j){return j.replace(/[&<>"\'\\/`]/g,function(k){return g[k];});},extend:function(m,n,l){if(!n||!m){throw new Error("extend failed, please check that "+"all dependencies are included.");}var k=function(){},j;k.prototype=n.prototype;m.prototype=new k();m.prototype.constructor=m;m.superclass=n.prototype;if(n.prototype.constructor==a.constructor){n.prototype.constructor=n;}if(l){for(j in l){if(f.hasOwnProperty(l,j)){m.prototype[j]=l[j];}}f._IEEnumFix(m.prototype,l);}},augmentObject:function(n,m){if(!m||!n){throw new Error("Absorb failed, verify dependencies.");}var j=arguments,l,o,k=j[2];if(k&&k!==true){for(l=2;l<j.length;l=l+1){n[j[l]]=m[j[l]];}}else{for(o in m){if(k||!(o in n)){n[o]=m[o];}}f._IEEnumFix(n,m);}return n;},augmentProto:function(m,l){if(!l||!m){throw new Error("Augment failed, verify dependencies.");}var j=[m.prototype,l.prototype],k;for(k=2;k<arguments.length;k=k+1){j.push(arguments[k]);}f.augmentObject.apply(this,j);return m;},dump:function(j,p){var l,n,r=[],t="{...}",k="f(){...}",q=", ",m=" => ";if(!f.isObject(j)){return j+"";}else{if(j instanceof Date||("nodeType" in j&&"tagName" in j)){return j;}else{if(f.isFunction(j)){return k;}}}p=(f.isNumber(p))?p:3;if(f.isArray(j)){r.push("[");for(l=0,n=j.length;l<n;l=l+1){if(f.isObject(j[l])){r.push((p>0)?f.dump(j[l],p-1):t);}else{r.push(j[l]);}r.push(q);}if(r.length>1){r.pop();}r.push("]");}else{r.push("{");for(l in j){if(f.hasOwnProperty(j,l)){r.push(l+m);if(f.isObject(j[l])){r.push((p>0)?f.dump(j[l],p-1):t);}else{r.push(j[l]);}r.push(q);}}if(r.length>1){r.pop();}r.push("}");}return r.join("");},substitute:function(x,y,E,l){var D,C,B,G,t,u,F=[],p,z=x.length,A="dump",r=" ",q="{",m="}",n,w;for(;;){D=x.lastIndexOf(q,z);if(D<0){break;}C=x.indexOf(m,D);if(D+1>C){break;}p=x.substring(D+1,C);G=p;u=null;B=G.indexOf(r);if(B>-1){u=G.substring(B+1);G=G.substring(0,B);}t=y[G];if(E){t=E(G,t,u);}if(f.isObject(t)){if(f.isArray(t)){t=f.dump(t,parseInt(u,10));}else{u=u||"";n=u.indexOf(A);if(n>-1){u=u.substring(4);}w=t.toString();if(w===i||n>-1){t=f.dump(t,parseInt(u,10));}else{t=w;}}}else{if(!f.isString(t)&&!f.isNumber(t)){t="~-"+F.length+"-~";F[F.length]=p;}}x=x.substring(0,D)+t+x.substring(C+1);if(l===false){z=D-1;}}for(D=F.length-1;D>=0;D=D-1){x=x.replace(new RegExp("~-"+D+"-~"),"{"+F[D]+"}","g");}return x;},trim:function(j){try{return j.replace(/^\\s+|\\s+$/g,"");}catch(k){return j;}},merge:function(){var n={},k=arguments,j=k.length,m;for(m=0;m<j;m=m+1){f.augmentObject(n,k[m],true);}return n;},later:function(t,k,u,n,p){t=t||0;k=k||{};var l=u,s=n,q,j;if(f.isString(u)){l=k[u];}if(!l){throw new TypeError("method undefined");}if(!f.isUndefined(n)&&!f.isArray(s)){s=[n];}q=function(){l.apply(k,s||b);};j=(p)?setInterval(q,t):setTimeout(q,t);return{interval:p,cancel:function(){if(this.interval){clearInterval(j);}else{clearTimeout(j);}}};},isValue:function(j){return(f.isObject(j)||f.isString(j)||f.isNumber(j)||f.isBoolean(j));}};f.hasOwnProperty=(a.hasOwnProperty)?function(j,k){return j&&j.hasOwnProperty&&j.hasOwnProperty(k);}:function(j,k){return !f.isUndefined(j[k])&&j.constructor.prototype[k]!==j[k];};e.augmentObject(f,e,true);YAHOO.util.Lang=f;f.augment=f.augmentProto;YAHOO.augment=f.augmentProto;YAHOO.extend=f.extend;})();YAHOO.register("yahoo",YAHOO,{version:"2.9.0",build:"2800"});(function(){YAHOO.env._id_counter=YAHOO.env._id_counter||0;var e=YAHOO.util,k=YAHOO.lang,L=YAHOO.env.ua,a=YAHOO.lang.trim,B={},F={},m=/^t(?:able|d|h)$/i,w=/color$/i,j=window.document,v=j.documentElement,C="ownerDocument",M="defaultView",U="documentElement",S="compatMode",z="offsetLeft",o="offsetTop",T="offsetParent",x="parentNode",K="nodeType",c="tagName",n="scrollLeft",H="scrollTop",p="getBoundingClientRect",V="getComputedStyle",y="currentStyle",l="CSS1Compat",A="BackCompat",E="class",f="className",i="",b=" ",R="(?:^|\\\\s)",J="(?= |$)",t="g",O="position",D="fixed",u="relative",I="left",N="top",Q="medium",P="borderLeftWidth",q="borderTopWidth",d=L.opera,h=L.webkit,g=L.gecko,s=L.ie;e.Dom={CUSTOM_ATTRIBUTES:(!v.hasAttribute)?{"for":"htmlFor","class":f}:{"htmlFor":"for","className":E},DOT_ATTRIBUTES:{checked:true},get:function(aa){var ac,X,ab,Z,W,G,Y=null;if(aa){if(typeof aa=="string"||typeof aa=="number"){ac=aa+"";aa=j.getElementById(aa);G=(aa)?aa.attributes:null;if(aa&&G&&G.id&&G.id.value===ac){return aa;}else{if(aa&&j.all){aa=null;X=j.all[ac];if(X&&X.length){for(Z=0,W=X.length;Z<W;++Z){if(X[Z].id===ac){return X[Z];}}}}}}else{if(e.Element&&aa instanceof e.Element){aa=aa.get("element");}else{if(!aa.nodeType&&"length" in aa){ab=[];for(Z=0,W=aa.length;Z<W;++Z){ab[ab.length]=e.Dom.get(aa[Z]);}aa=ab;}}}Y=aa;}return Y;},getComputedStyle:function(G,W){if(window[V]){return G[C][M][V](G,null)[W];}else{if(G[y]){return e.Dom.IE_ComputedStyle.get(G,W);}}},getStyle:function(G,W){return e.Dom.batch(G,e.Dom._getStyle,W);},_getStyle:function(){if(window[V]){return function(G,Y){Y=(Y==="float")?Y="cssFloat":e.Dom._toCamel(Y);var X=G.style[Y],W;if(!X){W=G[C][M][V](G,null);if(W){X=W[Y];}}return X;};}else{if(v[y]){return function(G,Y){var X;switch(Y){case"opacity":X=100;try{X=G.filters["DXImageTransform.Microsoft.Alpha"].opacity;}catch(Z){try{X=G.filters("alpha").opacity;}catch(W){}}return X/100;case"float":Y="styleFloat";default:Y=e.Dom._toCamel(Y);X=G[y]?G[y][Y]:null;return(G.style[Y]||X);}};}}}(),setStyle:function(G,W,X){e.Dom.batch(G,e.Dom._setStyle,{prop:W,val:X});},_setStyle:function(){if(!window.getComputedStyle&&j.documentElement.currentStyle){return function(W,G){var X=e.Dom._toCamel(G.prop),Y=G.val;if(W){switch(X){case"opacity":if(Y===""||Y===null||Y===1){W.style.removeAttribute("filter");}else{if(k.isString(W.style.filter)){W.style.filter="alpha(opacity="+Y*100+")";if(!W[y]||!W[y].hasLayout){W.style.zoom=1;}}}break;case"float":X="styleFloat";default:W.style[X]=Y;}}else{}};}else{return function(W,G){var X=e.Dom._toCamel(G.prop),Y=G.val;if(W){if(X=="float"){X="cssFloat";}W.style[X]=Y;}else{}};}}(),getXY:function(G){return e.Dom.batch(G,e.Dom._getXY);},_canPosition:function(G){return(e.Dom._getStyle(G,"display")!=="none"&&e.Dom._inDoc(G));},_getXY:function(W){var X,G,Z,ab,Y,aa,ac=Math.round,ad=false;if(e.Dom._canPosition(W)){Z=W[p]();ab=W[C];X=e.Dom.getDocumentScrollLeft(ab);G=e.Dom.getDocumentScrollTop(ab);ad=[Z[I],Z[N]];if(Y||aa){ad[0]-=aa;ad[1]-=Y;}if((G||X)){ad[0]+=X;ad[1]+=G;}ad[0]=ac(ad[0]);ad[1]=ac(ad[1]);}else{}return ad;},getX:function(G){var W=function(X){return e.Dom.getXY(X)[0];};return e.Dom.batch(G,W,e.Dom,true);},getY:function(G){var W=function(X){return e.Dom.getXY(X)[1];};return e.Dom.batch(G,W,e.Dom,true);},setXY:function(G,X,W){e.Dom.batch(G,e.Dom._setXY,{pos:X,noRetry:W});},_setXY:function(G,Z){var aa=e.Dom._getStyle(G,O),Y=e.Dom.setStyle,ad=Z.pos,W=Z.noRetry,ab=[parseInt(e.Dom.getComputedStyle(G,I),10),parseInt(e.Dom.getComputedStyle(G,N),10)],ac,X;ac=e.Dom._getXY(G);if(!ad||ac===false){return false;}if(aa=="static"){aa=u;Y(G,O,aa);}if(isNaN(ab[0])){ab[0]=(aa==u)?0:G[z];}if(isNaN(ab[1])){ab[1]=(aa==u)?0:G[o];}if(ad[0]!==null){Y(G,I,ad[0]-ac[0]+ab[0]+"px");}if(ad[1]!==null){Y(G,N,ad[1]-ac[1]+ab[1]+"px");}if(!W){X=e.Dom._getXY(G);if((ad[0]!==null&&X[0]!=ad[0])||(ad[1]!==null&&X[1]!=ad[1])){e.Dom._setXY(G,{pos:ad,noRetry:true});}}},setX:function(W,G){e.Dom.setXY(W,[G,null]);},setY:function(G,W){e.Dom.setXY(G,[null,W]);},getRegion:function(G){var W=function(X){var Y=false;if(e.Dom._canPosition(X)){Y=e.Region.getRegion(X);}else{}return Y;};return e.Dom.batch(G,W,e.Dom,true);},getClientWidth:function(){return e.Dom.getViewportWidth();},getClientHeight:function(){return e.Dom.getViewportHeight();},getElementsByClassName:function(ab,af,ac,ae,X,ad){af=af||"*";ac=(ac)?e.Dom.get(ac):null||j;if(!ac){return[];}var W=[],G=ac.getElementsByTagName(af),Z=e.Dom.hasClass;for(var Y=0,aa=G.length;Y<aa;++Y){if(Z(G[Y],ab)){W[W.length]=G[Y];}}if(ae){e.Dom.batch(W,ae,X,ad);}return W;},hasClass:function(W,G){return e.Dom.batch(W,e.Dom._hasClass,G);},_hasClass:function(X,W){var G=false,Y;if(X&&W){Y=e.Dom._getAttribute(X,f)||i;if(Y){Y=Y.replace(/\\s+/g,b);}if(W.exec){G=W.test(Y);}else{G=W&&(b+Y+b).indexOf(b+W+b)>-1;}}else{}return G;},addClass:function(W,G){return e.Dom.batch(W,e.Dom._addClass,G);},_addClass:function(X,W){var G=false,Y;if(X&&W){Y=e.Dom._getAttribute(X,f)||i;if(!e.Dom._hasClass(X,W)){e.Dom.setAttribute(X,f,a(Y+b+W));G=true;}}else{}return G;},removeClass:function(W,G){return e.Dom.batch(W,e.Dom._removeClass,G);},_removeClass:function(Y,X){var W=false,aa,Z,G;if(Y&&X){aa=e.Dom._getAttribute(Y,f)||i;e.Dom.setAttribute(Y,f,aa.replace(e.Dom._getClassRegex(X),i));Z=e.Dom._getAttribute(Y,f);if(aa!==Z){e.Dom.setAttribute(Y,f,a(Z));W=true;if(e.Dom._getAttribute(Y,f)===""){G=(Y.hasAttribute&&Y.hasAttribute(E))?E:f;Y.removeAttribute(G);}}}else{}return W;},replaceClass:function(X,W,G){return e.Dom.batch(X,e.Dom._replaceClass,{from:W,to:G});},_replaceClass:function(Y,X){var W,ab,aa,G=false,Z;if(Y&&X){ab=X.from;aa=X.to;if(!aa){G=false;}else{if(!ab){G=e.Dom._addClass(Y,X.to);}else{if(ab!==aa){Z=e.Dom._getAttribute(Y,f)||i;W=(b+Z.replace(e.Dom._getClassRegex(ab),b+aa).replace(/\\s+/g,b)).split(e.Dom._getClassRegex(aa));W.splice(1,0,b+aa);e.Dom.setAttribute(Y,f,a(W.join(i)));G=true;}}}}else{}return G;},generateId:function(G,X){X=X||"yui-gen";var W=function(Y){if(Y&&Y.id){return Y.id;}var Z=X+YAHOO.env._id_counter++;if(Y){if(Y[C]&&Y[C].getElementById(Z)){return e.Dom.generateId(Y,Z+X);}Y.id=Z;}return Z;};return e.Dom.batch(G,W,e.Dom,true)||W.apply(e.Dom,arguments);},isAncestor:function(W,X){W=e.Dom.get(W);X=e.Dom.get(X);var G=false;if((W&&X)&&(W[K]&&X[K])){if(W.contains&&W!==X){G=W.contains(X);}else{if(W.compareDocumentPosition){G=!!(W.compareDocumentPosition(X)&16);}}}else{}return G;},inDocument:function(G,W){return e.Dom._inDoc(e.Dom.get(G),W);},_inDoc:function(W,X){var G=false;if(W&&W[c]){X=X||W[C];G=e.Dom.isAncestor(X[U],W);}else{}return G;},getElementsBy:function(W,af,ab,ad,X,ac,ae){af=af||"*";ab=(ab)?e.Dom.get(ab):null||j;var aa=(ae)?null:[],G;if(ab){G=ab.getElementsByTagName(af);for(var Y=0,Z=G.length;Y<Z;++Y){if(W(G[Y])){if(ae){aa=G[Y];break;}else{aa[aa.length]=G[Y];}}}if(ad){e.Dom.batch(aa,ad,X,ac);}}return aa;},getElementBy:function(X,G,W){return e.Dom.getElementsBy(X,G,W,null,null,null,true);},batch:function(X,ab,aa,Z){var Y=[],W=(Z)?aa:null;X=(X&&(X[c]||X.item))?X:e.Dom.get(X);if(X&&ab){if(X[c]||X.length===undefined){return ab.call(W,X,aa);}for(var G=0;G<X.length;++G){Y[Y.length]=ab.call(W||X[G],X[G],aa);}}else{return false;}return Y;},getDocumentHeight:function(){var W=(j[S]!=l||h)?j.body.scrollHeight:v.scrollHeight,G=Math.max(W,e.Dom.getViewportHeight());return G;},getDocumentWidth:function(){var W=(j[S]!=l||h)?j.body.scrollWidth:v.scrollWidth,G=Math.max(W,e.Dom.getViewportWidth());return G;},getViewportHeight:function(){var G=self.innerHeight,W=j[S];if((W||s)&&!d){G=(W==l)?v.clientHeight:j.body.clientHeight;}return G;},getViewportWidth:function(){var G=self.innerWidth,W=j[S];if(W||s){G=(W==l)?v.clientWidth:j.body.clientWidth;}return G;},getAncestorBy:function(G,W){while((G=G[x])){if(e.Dom._testElement(G,W)){return G;}}return null;},getAncestorByClassName:function(W,G){W=e.Dom.get(W);if(!W){return null;}var X=function(Y){return e.Dom.hasClass(Y,G);};return e.Dom.getAncestorBy(W,X);},getAncestorByTagName:function(W,G){W=e.Dom.get(W);if(!W){return null;}var X=function(Y){return Y[c]&&Y[c].toUpperCase()==G.toUpperCase();};return e.Dom.getAncestorBy(W,X);},getPreviousSiblingBy:function(G,W){while(G){G=G.previousSibling;if(e.Dom._testElement(G,W)){return G;}}return null;},getPreviousSibling:function(G){G=e.Dom.get(G);if(!G){return null;}return e.Dom.getPreviousSiblingBy(G);},getNextSiblingBy:function(G,W){while(G){G=G.nextSibling;if(e.Dom._testElement(G,W)){return G;}}return null;},getNextSibling:function(G){G=e.Dom.get(G);if(!G){return null;}return e.Dom.getNextSiblingBy(G);},getFirstChildBy:function(G,X){var W=(e.Dom._testElement(G.firstChild,X))?G.firstChild:null;return W||e.Dom.getNextSiblingBy(G.firstChild,X);},getFirstChild:function(G,W){G=e.Dom.get(G);if(!G){return null;}return e.Dom.getFirstChildBy(G);},getLastChildBy:function(G,X){if(!G){return null;}var W=(e.Dom._testElement(G.lastChild,X))?G.lastChild:null;return W||e.Dom.getPreviousSiblingBy(G.lastChild,X);},getLastChild:function(G){G=e.Dom.get(G);return e.Dom.getLastChildBy(G);},getChildrenBy:function(W,Y){var X=e.Dom.getFirstChildBy(W,Y),G=X?[X]:[];e.Dom.getNextSiblingBy(X,function(Z){if(!Y||Y(Z)){G[G.length]=Z;}return false;});return G;},getChildren:function(G){G=e.Dom.get(G);if(!G){}return e.Dom.getChildrenBy(G);},getDocumentScrollLeft:function(G){G=G||j;return Math.max(G[U].scrollLeft,G.body.scrollLeft);},getDocumentScrollTop:function(G){G=G||j;return Math.max(G[U].scrollTop,G.body.scrollTop);},insertBefore:function(W,G){W=e.Dom.get(W);G=e.Dom.get(G);if(!W||!G||!G[x]){return null;}return G[x].insertBefore(W,G);},insertAfter:function(W,G){W=e.Dom.get(W);G=e.Dom.get(G);if(!W||!G||!G[x]){return null;}if(G.nextSibling){return G[x].insertBefore(W,G.nextSibling);}else{return G[x].appendChild(W);}},getClientRegion:function(){var X=e.Dom.getDocumentScrollTop(),W=e.Dom.getDocumentScrollLeft(),Y=e.Dom.getViewportWidth()+W,G=e.Dom.getViewportHeight()+X;return new e.Region(X,Y,G,W);},setAttribute:function(W,G,X){e.Dom.batch(W,e.Dom._setAttribute,{attr:G,val:X});},_setAttribute:function(X,W){var G=e.Dom._toCamel(W.attr),Y=W.val;if(X&&X.setAttribute){if(e.Dom.DOT_ATTRIBUTES[G]&&X.tagName&&X.tagName!="BUTTON"){X[G]=Y;}else{G=e.Dom.CUSTOM_ATTRIBUTES[G]||G;X.setAttribute(G,Y);}}else{}},getAttribute:function(W,G){return e.Dom.batch(W,e.Dom._getAttribute,G);},_getAttribute:function(W,G){var X;G=e.Dom.CUSTOM_ATTRIBUTES[G]||G;if(e.Dom.DOT_ATTRIBUTES[G]){X=W[G];}else{if(W&&"getAttribute" in W){if(/^(?:href|src)$/.test(G)){X=W.getAttribute(G,2);}else{X=W.getAttribute(G);}}else{}}return X;},_toCamel:function(W){var X=B;function G(Y,Z){return Z.toUpperCase();}return X[W]||(X[W]=W.indexOf("-")===-1?W:W.replace(/-([a-z])/gi,G));},_getClassRegex:function(W){var G;if(W!==undefined){if(W.exec){G=W;}else{G=F[W];if(!G){W=W.replace(e.Dom._patterns.CLASS_RE_TOKENS,"\\\\$1");W=W.replace(/\\s+/g,b);G=F[W]=new RegExp(R+W+J,t);}}}return G;},_patterns:{ROOT_TAG:/^body|html$/i,CLASS_RE_TOKENS:/([\\.\\(\\)\\^\\$\\*\\+\\?\\|\\[\\]\\{\\}\\\\])/g},_testElement:function(G,W){return G&&G[K]==1&&(!W||W(G));},_calcBorders:function(X,Y){var W=parseInt(e.Dom[V](X,q),10)||0,G=parseInt(e.Dom[V](X,P),10)||0;if(g){if(m.test(X[c])){W=0;G=0;}}Y[0]+=G;Y[1]+=W;return Y;}};var r=e.Dom[V];if(L.opera){e.Dom[V]=function(W,G){var X=r(W,G);if(w.test(G)){X=e.Dom.Color.toRGB(X);}return X;};}if(L.webkit){e.Dom[V]=function(W,G){var X=r(W,G);if(X==="rgba(0, 0, 0, 0)"){X="transparent";}return X;};}if(L.ie&&L.ie>=8){e.Dom.DOT_ATTRIBUTES.type=true;}})();YAHOO.util.Region=function(d,e,a,c){this.top=d;this.y=d;this[1]=d;this.right=e;this.bottom=a;this.left=c;this.x=c;this[0]=c;this.width=this.right-this.left;this.height=this.bottom-this.top;};YAHOO.util.Region.prototype.contains=function(a){return(a.left>=this.left&&a.right<=this.right&&a.top>=this.top&&a.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(f){var d=Math.max(this.top,f.top),e=Math.min(this.right,f.right),a=Math.min(this.bottom,f.bottom),c=Math.max(this.left,f.left);if(a>=d&&e>=c){return new YAHOO.util.Region(d,e,a,c);}else{return null;}};YAHOO.util.Region.prototype.union=function(f){var d=Math.min(this.top,f.top),e=Math.max(this.right,f.right),a=Math.max(this.bottom,f.bottom),c=Math.min(this.left,f.left);return new YAHOO.util.Region(d,e,a,c);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+", height: "+this.height+", width: "+this.width+"}");};YAHOO.util.Region.getRegion=function(e){var g=YAHOO.util.Dom.getXY(e),d=g[1],f=g[0]+e.offsetWidth,a=g[1]+e.offsetHeight,c=g[0];return new YAHOO.util.Region(d,f,a,c);};YAHOO.util.Point=function(a,b){if(YAHOO.lang.isArray(a)){b=a[1];a=a[0];}YAHOO.util.Point.superclass.constructor.call(this,b,a,b,a);};YAHOO.extend(YAHOO.util.Point,YAHOO.util.Region);(function(){var b=YAHOO.util,a="clientTop",f="clientLeft",j="parentNode",k="right",w="hasLayout",i="px",u="opacity",l="auto",d="borderLeftWidth",g="borderTopWidth",p="borderRightWidth",v="borderBottomWidth",s="visible",q="transparent",n="height",e="width",h="style",t="currentStyle",r=/^width|height$/,o=/^(\\d[.\\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i,m={get:function(x,z){var y="",A=x[t][z];if(z===u){y=b.Dom.getStyle(x,u);}else{if(!A||(A.indexOf&&A.indexOf(i)>-1)){y=A;}else{if(b.Dom.IE_COMPUTED[z]){y=b.Dom.IE_COMPUTED[z](x,z);}else{if(o.test(A)){y=b.Dom.IE.ComputedStyle.getPixel(x,z);}else{y=A;}}}}return y;},getOffset:function(z,E){var B=z[t][E],x=E.charAt(0).toUpperCase()+E.substr(1),C="offset"+x,y="pixel"+x,A="",D;if(B==l){D=z[C];if(D===undefined){A=0;}A=D;if(r.test(E)){z[h][E]=D;if(z[C]>D){A=D-(z[C]-D);}z[h][E]=l;}}else{if(!z[h][y]&&!z[h][E]){z[h][E]=B;}A=z[h][y];}return A+i;},getBorderWidth:function(x,z){var y=null;if(!x[t][w]){x[h].zoom=1;}switch(z){case g:y=x[a];break;case v:y=x.offsetHeight-x.clientHeight-x[a];break;case d:y=x[f];break;case p:y=x.offsetWidth-x.clientWidth-x[f];break;}return y+i;},getPixel:function(y,x){var A=null,B=y[t][k],z=y[t][x];y[h][k]=z;A=y[h].pixelRight;y[h][k]=B;return A+i;},getMargin:function(y,x){var z;if(y[t][x]==l){z=0+i;}else{z=b.Dom.IE.ComputedStyle.getPixel(y,x);}return z;},getVisibility:function(y,x){var z;while((z=y[t])&&z[x]=="inherit"){y=y[j];}return(z)?z[x]:s;},getColor:function(y,x){return b.Dom.Color.toRGB(y[t][x])||q;},getBorderColor:function(y,x){var z=y[t],A=z[x]||z.color;return b.Dom.Color.toRGB(b.Dom.Color.toHex(A));}},c={};c.top=c.right=c.bottom=c.left=c[e]=c[n]=m.getOffset;c.color=m.getColor;c[g]=c[p]=c[v]=c[d]=m.getBorderWidth;c.marginTop=c.marginRight=c.marginBottom=c.marginLeft=m.getMargin;c.visibility=m.getVisibility;c.borderColor=c.borderTopColor=c.borderRightColor=c.borderBottomColor=c.borderLeftColor=m.getBorderColor;b.Dom.IE_COMPUTED=c;b.Dom.IE_ComputedStyle=m;})();(function(){var c="toString",a=parseInt,b=RegExp,d=YAHOO.util;d.Dom.Color={KEYWORDS:{black:"000",silver:"c0c0c0",gray:"808080",white:"fff",maroon:"800000",red:"f00",purple:"800080",fuchsia:"f0f",green:"008000",lime:"0f0",olive:"808000",yellow:"ff0",navy:"000080",blue:"00f",teal:"008080",aqua:"0ff"},re_RGB:/^rgb\\(([0-9]+)\\s*,\\s*([0-9]+)\\s*,\\s*([0-9]+)\\)$/i,re_hex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,re_hex3:/([0-9A-F])/gi,toRGB:function(e){if(!d.Dom.Color.re_RGB.test(e)){e=d.Dom.Color.toHex(e);}if(d.Dom.Color.re_hex.exec(e)){e="rgb("+[a(b.$1,16),a(b.$2,16),a(b.$3,16)].join(", ")+")";}return e;},toHex:function(f){f=d.Dom.Color.KEYWORDS[f]||f;if(d.Dom.Color.re_RGB.exec(f)){f=[Number(b.$1).toString(16),Number(b.$2).toString(16),Number(b.$3).toString(16)];for(var e=0;e<f.length;e++){if(f[e].length<2){f[e]="0"+f[e];}}f=f.join("");}if(f.length<6){f=f.replace(d.Dom.Color.re_hex3,"$1$1");}if(f!=="transparent"&&f.indexOf("#")<0){f="#"+f;}return f.toUpperCase();}};}());YAHOO.register("dom",YAHOO.util.Dom,{version:"2.9.0",build:"2800"});YAHOO.util.CustomEvent=function(d,c,b,a,e){this.type=d;this.scope=c||window;this.silent=b;this.fireOnce=e;this.fired=false;this.firedWith=null;this.signature=a||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}var f="_YUICEOnSubscribe";if(d!==f){this.subscribeEvent=new YAHOO.util.CustomEvent(f,this,true);}this.lastError=null;};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(b,c,d){if(!b){throw new Error("Invalid callback for subscriber to \'"+this.type+"\'");}if(this.subscribeEvent){this.subscribeEvent.fire(b,c,d);}var a=new YAHOO.util.Subscriber(b,c,d);if(this.fireOnce&&this.fired){this.notify(a,this.firedWith);}else{this.subscribers.push(a);}},unsubscribe:function(d,f){if(!d){return this.unsubscribeAll();}var e=false;for(var b=0,a=this.subscribers.length;b<a;++b){var c=this.subscribers[b];if(c&&c.contains(d,f)){this._delete(b);e=true;}}return e;},fire:function(){this.lastError=null;var h=[],a=this.subscribers.length;var d=[].slice.call(arguments,0),c=true,f,b=false;if(this.fireOnce){if(this.fired){return true;}else{this.firedWith=d;}}this.fired=true;if(!a&&this.silent){return true;}if(!this.silent){}var e=this.subscribers.slice();for(f=0;f<a;++f){var g=e[f];if(!g||!g.fn){b=true;}else{c=this.notify(g,d);if(false===c){if(!this.silent){}break;}}}return(c!==false);},notify:function(g,c){var b,i=null,f=g.getScope(this.scope),a=YAHOO.util.Event.throwErrors;if(!this.silent){}if(this.signature==YAHOO.util.CustomEvent.FLAT){if(c.length>0){i=c[0];}try{b=g.fn.call(f,i,g.obj);}catch(h){this.lastError=h;if(a){throw h;}}}else{try{b=g.fn.call(f,this.type,c,g.obj);}catch(d){this.lastError=d;if(a){throw d;}}}return b;},unsubscribeAll:function(){var a=this.subscribers.length,b;for(b=a-1;b>-1;b--){this._delete(b);}this.subscribers=[];return a;},_delete:function(a){var b=this.subscribers[a];if(b){delete b.fn;delete b.obj;}this.subscribers.splice(a,1);},toString:function(){return"CustomEvent: "+"\'"+this.type+"\', "+"context: "+this.scope;}};YAHOO.util.Subscriber=function(a,b,c){this.fn=a;this.obj=YAHOO.lang.isUndefined(b)?null:b;this.overrideContext=c;};YAHOO.util.Subscriber.prototype.getScope=function(a){if(this.overrideContext){if(this.overrideContext===true){return this.obj;}else{return this.overrideContext;}}return a;};YAHOO.util.Subscriber.prototype.contains=function(a,b){if(b){return(this.fn==a&&this.obj==b);}else{return(this.fn==a);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", overrideContext: "+(this.overrideContext||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var g=false,h=[],j=[],a=0,e=[],b=0,c={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9},d=YAHOO.env.ua.ie,f="focusin",i="focusout";return{POLL_RETRYS:500,POLL_INTERVAL:40,EL:0,TYPE:1,FN:2,WFN:3,UNLOAD_OBJ:3,ADJ_SCOPE:4,OBJ:5,OVERRIDE:6,CAPTURE:7,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:d,_interval:null,_dri:null,_specialTypes:{focusin:(d?"focusin":"focus"),focusout:(d?"focusout":"blur")},DOMReady:false,throwErrors:false,startInterval:function(){if(!this._interval){this._interval=YAHOO.lang.later(this.POLL_INTERVAL,this,this._tryPreloadAttach,null,true);}},onAvailable:function(q,m,o,p,n){var k=(YAHOO.lang.isString(q))?[q]:q;for(var l=0;l<k.length;l=l+1){e.push({id:k[l],fn:m,obj:o,overrideContext:p,checkReady:n});}a=this.POLL_RETRYS;this.startInterval();},onContentReady:function(n,k,l,m){this.onAvailable(n,k,l,m,true);},onDOMReady:function(){this.DOMReadyEvent.subscribe.apply(this.DOMReadyEvent,arguments);},_addListener:function(m,k,v,p,t,y){if(!v||!v.call){return false;}if(this._isValidCollection(m)){var w=true;for(var q=0,s=m.length;q<s;++q){w=this.on(m[q],k,v,p,t)&&w;}return w;}else{if(YAHOO.lang.isString(m)){var o=this.getEl(m);if(o){m=o;}else{this.onAvailable(m,function(){YAHOO.util.Event._addListener(m,k,v,p,t,y);});return true;}}}if(!m){return false;}if("unload"==k&&p!==this){j[j.length]=[m,k,v,p,t];return true;}var l=m;if(t){if(t===true){l=p;}else{l=t;}}var n=function(z){return v.call(l,YAHOO.util.Event.getEvent(z,m),p);};var x=[m,k,v,n,l,p,t,y];var r=h.length;h[r]=x;try{this._simpleAdd(m,k,n,y);}catch(u){this.lastError=u;this.removeListener(m,k,v);return false;}return true;},_getType:function(k){return this._specialTypes[k]||k;},addListener:function(m,p,l,n,o){var k=((p==f||p==i)&&!YAHOO.env.ua.ie)?true:false;return this._addListener(m,this._getType(p),l,n,o,k);},addFocusListener:function(l,k,m,n){return this.on(l,f,k,m,n);},removeFocusListener:function(l,k){return this.removeListener(l,f,k);},addBlurListener:function(l,k,m,n){return this.on(l,i,k,m,n);},removeBlurListener:function(l,k){return this.removeListener(l,i,k);},removeListener:function(l,k,r){var m,p,u;k=this._getType(k);if(typeof l=="string"){l=this.getEl(l);}else{if(this._isValidCollection(l)){var s=true;for(m=l.length-1;m>-1;m--){s=(this.removeListener(l[m],k,r)&&s);}return s;}}if(!r||!r.call){return this.purgeElement(l,false,k);}if("unload"==k){for(m=j.length-1;m>-1;m--){u=j[m];if(u&&u[0]==l&&u[1]==k&&u[2]==r){j.splice(m,1);return true;}}return false;}var n=null;var o=arguments[3];if("undefined"===typeof o){o=this._getCacheIndex(h,l,k,r);}if(o>=0){n=h[o];}if(!l||!n){return false;}var t=n[this.CAPTURE]===true?true:false;try{this._simpleRemove(l,k,n[this.WFN],t);}catch(q){this.lastError=q;return false;}delete h[o][this.WFN];delete h[o][this.FN];h.splice(o,1);return true;},getTarget:function(m,l){var k=m.target||m.srcElement;return this.resolveTextNode(k);},resolveTextNode:function(l){try{if(l&&3==l.nodeType){return l.parentNode;}}catch(k){return null;}return l;},getPageX:function(l){var k=l.pageX;if(!k&&0!==k){k=l.clientX||0;if(this.isIE){k+=this._getScrollLeft();}}return k;},getPageY:function(k){var l=k.pageY;if(!l&&0!==l){l=k.clientY||0;if(this.isIE){l+=this._getScrollTop();}}return l;},getXY:function(k){return[this.getPageX(k),this.getPageY(k)];},getRelatedTarget:function(l){var k=l.relatedTarget;if(!k){if(l.type=="mouseout"){k=l.toElement;}else{if(l.type=="mouseover"){k=l.fromElement;}}}return this.resolveTextNode(k);},getTime:function(m){if(!m.time){var l=new Date().getTime();try{m.time=l;}catch(k){this.lastError=k;return l;}}return m.time;},stopEvent:function(k){this.stopPropagation(k);this.preventDefault(k);},stopPropagation:function(k){if(k.stopPropagation){k.stopPropagation();}else{k.cancelBubble=true;}},preventDefault:function(k){if(k.preventDefault){k.preventDefault();}else{k.returnValue=false;}},getEvent:function(m,k){var l=m||window.event;if(!l){var n=this.getEvent.caller;while(n){l=n.arguments[0];if(l&&Event==l.constructor){break;}n=n.caller;}}return l;},getCharCode:function(l){var k=l.keyCode||l.charCode||0;if(YAHOO.env.ua.webkit&&(k in c)){k=c[k];}return k;},_getCacheIndex:function(n,q,r,p){for(var o=0,m=n.length;o<m;o=o+1){var k=n[o];if(k&&k[this.FN]==p&&k[this.EL]==q&&k[this.TYPE]==r){return o;}}return -1;},generateId:function(k){var l=k.id;if(!l){l="yuievtautoid-"+b;++b;k.id=l;}return l;},_isValidCollection:function(l){try{return(l&&typeof l!=="string"&&l.length&&!l.tagName&&!l.alert&&typeof l[0]!=="undefined");}catch(k){return false;}},elCache:{},getEl:function(k){return(typeof k==="string")?document.getElementById(k):k;},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",YAHOO,0,0,1),_load:function(l){if(!g){g=true;var k=YAHOO.util.Event;k._ready();k._tryPreloadAttach();}},_ready:function(l){var k=YAHOO.util.Event;if(!k.DOMReady){k.DOMReady=true;k.DOMReadyEvent.fire();k._simpleRemove(document,"DOMContentLoaded",k._ready);}},_tryPreloadAttach:function(){if(e.length===0){a=0;if(this._interval){this._interval.cancel();this._interval=null;}return;}if(this.locked){return;}if(this.isIE){if(!this.DOMReady){this.startInterval();return;}}this.locked=true;var q=!g;if(!q){q=(a>0&&e.length>0);}var p=[];var r=function(t,u){var s=t;if(u.overrideContext){if(u.overrideContext===true){s=u.obj;}else{s=u.overrideContext;}}u.fn.call(s,u.obj);};var l,k,o,n,m=[];for(l=0,k=e.length;l<k;l=l+1){o=e[l];if(o){n=this.getEl(o.id);if(n){if(o.checkReady){if(g||n.nextSibling||!q){m.push(o);e[l]=null;}}else{r(n,o);e[l]=null;}}else{p.push(o);}}}for(l=0,k=m.length;l<k;l=l+1){o=m[l];r(this.getEl(o.id),o);}a--;if(q){for(l=e.length-1;l>-1;l--){o=e[l];if(!o||!o.id){e.splice(l,1);}}this.startInterval();}else{if(this._interval){this._interval.cancel();this._interval=null;}}this.locked=false;},purgeElement:function(p,q,s){var n=(YAHOO.lang.isString(p))?this.getEl(p):p;var r=this.getListeners(n,s),o,k;if(r){for(o=r.length-1;o>-1;o--){var m=r[o];this.removeListener(n,m.type,m.fn);}}if(q&&n&&n.childNodes){for(o=0,k=n.childNodes.length;o<k;++o){this.purgeElement(n.childNodes[o],q,s);}}},getListeners:function(n,k){var q=[],m;if(!k){m=[h,j];}else{if(k==="unload"){m=[j];}else{k=this._getType(k);m=[h];}}var s=(YAHOO.lang.isString(n))?this.getEl(n):n;for(var p=0;p<m.length;p=p+1){var u=m[p];if(u){for(var r=0,t=u.length;r<t;++r){var o=u[r];if(o&&o[this.EL]===s&&(!k||k===o[this.TYPE])){q.push({type:o[this.TYPE],fn:o[this.FN],obj:o[this.OBJ],adjust:o[this.OVERRIDE],scope:o[this.ADJ_SCOPE],index:r});}}}}return(q.length)?q:null;},_unload:function(s){var m=YAHOO.util.Event,p,o,n,r,q,t=j.slice(),k;for(p=0,r=j.length;p<r;++p){n=t[p];if(n){try{k=window;if(n[m.ADJ_SCOPE]){if(n[m.ADJ_SCOPE]===true){k=n[m.UNLOAD_OBJ];}else{k=n[m.ADJ_SCOPE];}}n[m.FN].call(k,m.getEvent(s,n[m.EL]),n[m.UNLOAD_OBJ]);}catch(w){}t[p]=null;}}n=null;k=null;j=null;if(h){for(o=h.length-1;o>-1;o--){n=h[o];if(n){try{m.removeListener(n[m.EL],n[m.TYPE],n[m.FN],o);}catch(v){}}}n=null;}try{m._simpleRemove(window,"unload",m._unload);m._simpleRemove(window,"load",m._load);}catch(u){}},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var k=document.documentElement,l=document.body;if(k&&(k.scrollTop||k.scrollLeft)){return[k.scrollTop,k.scrollLeft];}else{if(l){return[l.scrollTop,l.scrollLeft];}else{return[0,0];}}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(m,n,l,k){m.addEventListener(n,l,(k));};}else{if(window.attachEvent){return function(m,n,l,k){m.attachEvent("on"+n,l);};}else{return function(){};}}}(),_simpleRemove:function(){if(window.removeEventListener){return function(m,n,l,k){m.removeEventListener(n,l,(k));};}else{if(window.detachEvent){return function(l,m,k){l.detachEvent("on"+m,k);};}else{return function(){};}}}()};}();(function(){var a=YAHOO.util.Event;a.on=a.addListener;a.onFocus=a.addFocusListener;a.onBlur=a.addBlurListener;/*! DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller/Diego Perini */if(a.isIE){if(self!==self.top){document.onreadystatechange=function(){if(document.readyState=="complete"){document.onreadystatechange=null;a._ready();}};}else{YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var b=document.createElement("p");a._dri=setInterval(function(){try{b.doScroll("left");clearInterval(a._dri);a._dri=null;a._ready();b=null;}catch(c){}},a.POLL_INTERVAL);}}else{if(a.webkit&&a.webkit<525){a._dri=setInterval(function(){var c=document.readyState;if("loaded"==c||"complete"==c){clearInterval(a._dri);a._dri=null;a._ready();}},a.POLL_INTERVAL);}else{a._simpleAdd(document,"DOMContentLoaded",a._ready);}}a._simpleAdd(window,"load",a._load);a._simpleAdd(window,"unload",a._unload);a._tryPreloadAttach();})();}YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(a,c,f,e){this.__yui_events=this.__yui_events||{};var d=this.__yui_events[a];if(d){d.subscribe(c,f,e);}else{this.__yui_subscribers=this.__yui_subscribers||{};var b=this.__yui_subscribers;if(!b[a]){b[a]=[];}b[a].push({fn:c,obj:f,overrideContext:e});}},unsubscribe:function(c,e,g){this.__yui_events=this.__yui_events||{};var a=this.__yui_events;if(c){var f=a[c];if(f){return f.unsubscribe(e,g);}}else{var b=true;for(var d in a){if(YAHOO.lang.hasOwnProperty(a,d)){b=b&&a[d].unsubscribe(e,g);}}return b;}return false;},unsubscribeAll:function(a){return this.unsubscribe(a);},createEvent:function(b,g){this.__yui_events=this.__yui_events||{};var e=g||{},d=this.__yui_events,f;if(d[b]){}else{f=new YAHOO.util.CustomEvent(b,e.scope||this,e.silent,YAHOO.util.CustomEvent.FLAT,e.fireOnce);d[b]=f;if(e.onSubscribeCallback){f.subscribeEvent.subscribe(e.onSubscribeCallback);}this.__yui_subscribers=this.__yui_subscribers||{};var a=this.__yui_subscribers[b];if(a){for(var c=0;c<a.length;++c){f.subscribe(a[c].fn,a[c].obj,a[c].overrideContext);}}}return d[b];},fireEvent:function(b){this.__yui_events=this.__yui_events||{};var d=this.__yui_events[b];if(!d){return null;}var a=[];for(var c=1;c<arguments.length;++c){a.push(arguments[c]);}return d.fire.apply(d,a);},hasEvent:function(a){if(this.__yui_events){if(this.__yui_events[a]){return true;}}return false;}};(function(){var a=YAHOO.util.Event,c=YAHOO.lang;YAHOO.util.KeyListener=function(d,i,e,f){if(!d){}else{if(!i){}else{if(!e){}}}if(!f){f=YAHOO.util.KeyListener.KEYDOWN;}var g=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(c.isString(d)){d=document.getElementById(d);}if(c.isFunction(e)){g.subscribe(e);}else{g.subscribe(e.fn,e.scope,e.correctScope);}function h(o,n){if(!i.shift){i.shift=false;}if(!i.alt){i.alt=false;}if(!i.ctrl){i.ctrl=false;}if(o.shiftKey==i.shift&&o.altKey==i.alt&&o.ctrlKey==i.ctrl){var j,m=i.keys,l;if(YAHOO.lang.isArray(m)){for(var k=0;k<m.length;k++){j=m[k];l=a.getCharCode(o);if(j==l){g.fire(l,o);break;}}}else{l=a.getCharCode(o);if(m==l){g.fire(l,o);}}}}this.enable=function(){if(!this.enabled){a.on(d,f,h);this.enabledEvent.fire(i);}this.enabled=true;};this.disable=function(){if(this.enabled){a.removeListener(d,f,h);this.disabledEvent.fire(i);}this.enabled=false;};this.toString=function(){return"KeyListener ["+i.keys+"] "+d.tagName+(d.id?"["+d.id+"]":"");};};var b=YAHOO.util.KeyListener;b.KEYDOWN="keydown";b.KEYUP="keyup";b.KEY={ALT:18,BACK_SPACE:8,CAPS_LOCK:20,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,META:224,NUM_LOCK:144,PAGE_DOWN:34,PAGE_UP:33,PAUSE:19,PRINTSCREEN:44,RIGHT:39,SCROLL_LOCK:145,SHIFT:16,SPACE:32,TAB:9,UP:38};})();YAHOO.register("event",YAHOO.util.Event,{version:"2.9.0",build:"2800"});YAHOO.register("yahoo-dom-event", YAHOO, {version: "2.9.0", build: "2800"});(function(){var d=YAHOO.util.Dom,b=YAHOO.util.Event,f=YAHOO.lang,e=YAHOO.widget;YAHOO.widget.TreeView=function(h,g){if(h){this.init(h);}if(g){this.buildTreeFromObject(g);}else{if(f.trim(this._el.innerHTML)){this.buildTreeFromMarkup(h);}}};var c=e.TreeView;c.prototype={id:null,_el:null,_nodes:null,locked:false,_expandAnim:null,_collapseAnim:null,_animCount:0,maxAnim:2,_hasDblClickSubscriber:false,_dblClickTimer:null,currentFocus:null,singleNodeHighlight:false,_currentlyHighlighted:null,setExpandAnim:function(g){this._expandAnim=(e.TVAnim.isValid(g))?g:null;},setCollapseAnim:function(g){this._collapseAnim=(e.TVAnim.isValid(g))?g:null;},animateExpand:function(i,j){if(this._expandAnim&&this._animCount<this.maxAnim){var g=this;var h=e.TVAnim.getAnim(this._expandAnim,i,function(){g.expandComplete(j);});if(h){++this._animCount;this.fireEvent("animStart",{"node":j,"type":"expand"});h.animate();}return true;}return false;},animateCollapse:function(i,j){if(this._collapseAnim&&this._animCount<this.maxAnim){var g=this;var h=e.TVAnim.getAnim(this._collapseAnim,i,function(){g.collapseComplete(j);});if(h){++this._animCount;this.fireEvent("animStart",{"node":j,"type":"collapse"});h.animate();}return true;}return false;},expandComplete:function(g){--this._animCount;this.fireEvent("animComplete",{"node":g,"type":"expand"});},collapseComplete:function(g){--this._animCount;this.fireEvent("animComplete",{"node":g,"type":"collapse"});},init:function(i){this._el=d.get(i);this.id=d.generateId(this._el,"yui-tv-auto-id-");this.createEvent("animStart",this);this.createEvent("animComplete",this);this.createEvent("collapse",this);this.createEvent("collapseComplete",this);this.createEvent("expand",this);this.createEvent("expandComplete",this);this.createEvent("enterKeyPressed",this);this.createEvent("clickEvent",this);this.createEvent("focusChanged",this);var g=this;this.createEvent("dblClickEvent",{scope:this,onSubscribeCallback:function(){g._hasDblClickSubscriber=true;}});this.createEvent("labelClick",this);this.createEvent("highlightEvent",this);this._nodes=[];c.trees[this.id]=this;this.root=new e.RootNode(this);var h=e.LogWriter;if(this._initEditor){this._initEditor();}},buildTreeFromObject:function(g){var h=function(q,n){var m,r,l,k,p,j,o;for(m=0;m<n.length;m++){r=n[m];if(f.isString(r)){l=new e.TextNode(r,q);}else{if(f.isObject(r)){k=r.children;delete r.children;p=r.type||"text";delete r.type;switch(f.isString(p)&&p.toLowerCase()){case"text":l=new e.TextNode(r,q);break;case"menu":l=new e.MenuNode(r,q);break;case"html":l=new e.HTMLNode(r,q);break;default:if(f.isString(p)){j=e[p];}else{j=p;}if(f.isObject(j)){for(o=j;o&&o!==e.Node;o=o.superclass.constructor){}if(o){l=new j(r,q);}else{}}else{}}if(k){h(l,k);}}else{}}}};if(!f.isArray(g)){g=[g];}h(this.root,g);},buildTreeFromMarkup:function(i){var h=function(j){var n,q,m=[],l={},k,o;for(n=d.getFirstChild(j);n;n=d.getNextSibling(n)){switch(n.tagName.toUpperCase()){case"LI":k="";l={expanded:d.hasClass(n,"expanded"),title:n.title||n.alt||null,className:f.trim(n.className.replace(/\\bexpanded\\b/,""))||null};q=n.firstChild;if(q.nodeType==3){k=f.trim(q.nodeValue.replace(/[\\n\\t\\r]*/g,""));if(k){l.type="text";l.label=k;}else{q=d.getNextSibling(q);}}if(!k){if(q.tagName.toUpperCase()=="A"){l.type="text";l.label=q.innerHTML;l.href=q.href;l.target=q.target;l.title=q.title||q.alt||l.title;}else{l.type="html";var p=document.createElement("div");p.appendChild(q.cloneNode(true));l.html=p.innerHTML;l.hasIcon=true;}}q=d.getNextSibling(q);switch(q&&q.tagName.toUpperCase()){case"UL":case"OL":l.children=h(q);break;}if(YAHOO.lang.JSON){o=n.getAttribute("yuiConfig");if(o){o=YAHOO.lang.JSON.parse(o);l=YAHOO.lang.merge(l,o);}}m.push(l);break;case"UL":case"OL":l={type:"text",label:"",children:h(q)};m.push(l);break;}}return m;};var g=d.getChildrenBy(d.get(i),function(k){var j=k.tagName.toUpperCase();return j=="UL"||j=="OL";});if(g.length){this.buildTreeFromObject(h(g[0]));}else{}},_getEventTargetTdEl:function(h){var i=b.getTarget(h);while(i&&!(i.tagName.toUpperCase()=="TD"&&d.hasClass(i.parentNode,"ygtvrow"))){i=d.getAncestorByTagName(i,"td");}if(f.isNull(i)){return null;}if(/\\bygtv(blank)?depthcell/.test(i.className)){return null;}if(i.id){var g=i.id.match(/\\bygtv([^\\d]*)(.*)/);if(g&&g[2]&&this._nodes[g[2]]){return i;}}return null;},_onClickEvent:function(j){var h=this,l=this._getEventTargetTdEl(j),i,k,g=function(m){i.focus();if(m||!i.href){i.toggle();try{b.preventDefault(j);}catch(n){}}};if(!l){return;}i=this.getNodeByElement(l);if(!i){return;}k=b.getTarget(j);if(d.hasClass(k,i.labelStyle)||d.getAncestorByClassName(k,i.labelStyle)){this.fireEvent("labelClick",i);}if(this._closeEditor){this._closeEditor(false);}if(/\\bygtv[tl][mp]h?h?/.test(l.className)){g(true);}else{if(this._dblClickTimer){window.clearTimeout(this._dblClickTimer);this._dblClickTimer=null;}else{if(this._hasDblClickSubscriber){this._dblClickTimer=window.setTimeout(function(){h._dblClickTimer=null;if(h.fireEvent("clickEvent",{event:j,node:i})!==false){g();}},200);}else{if(h.fireEvent("clickEvent",{event:j,node:i})!==false){g();}}}}},_onDblClickEvent:function(g){if(!this._hasDblClickSubscriber){return;}var h=this._getEventTargetTdEl(g);if(!h){return;}if(!(/\\bygtv[tl][mp]h?h?/.test(h.className))){this.fireEvent("dblClickEvent",{event:g,node:this.getNodeByElement(h)});if(this._dblClickTimer){window.clearTimeout(this._dblClickTimer);this._dblClickTimer=null;}}},_onMouseOverEvent:function(g){var h;if((h=this._getEventTargetTdEl(g))&&(h=this.getNodeByElement(h))&&(h=h.getToggleEl())){h.className=h.className.replace(/\\bygtv([lt])([mp])\\b/gi,"ygtv$1$2h");}},_onMouseOutEvent:function(g){var h;if((h=this._getEventTargetTdEl(g))&&(h=this.getNodeByElement(h))&&(h=h.getToggleEl())){h.className=h.className.replace(/\\bygtv([lt])([mp])h\\b/gi,"ygtv$1$2");}},_onKeyDownEvent:function(l){var n=b.getTarget(l),k=this.getNodeByElement(n),j=k,g=YAHOO.util.KeyListener.KEY;switch(l.keyCode){case g.UP:do{if(j.previousSibling){j=j.previousSibling;}else{j=j.parent;}}while(j&&!j._canHaveFocus());if(j){j.focus();}b.preventDefault(l);break;case g.DOWN:do{if(j.nextSibling){j=j.nextSibling;}else{j.expand();j=(j.children.length||null)&&j.children[0];}}while(j&&!j._canHaveFocus);if(j){j.focus();}b.preventDefault(l);break;case g.LEFT:do{if(j.parent){j=j.parent;}else{j=j.previousSibling;}}while(j&&!j._canHaveFocus());if(j){j.focus();}b.preventDefault(l);break;case g.RIGHT:var i=this,m,h=function(o){i.unsubscribe("expandComplete",h);m(o);};m=function(o){do{if(o.isDynamic()&&!o.childrenRendered){i.subscribe("expandComplete",h);o.expand();o=null;break;}else{o.expand();if(o.children.length){o=o.children[0];}else{o=o.nextSibling;}}}while(o&&!o._canHaveFocus());if(o){o.focus();}};m(j);b.preventDefault(l);break;case g.ENTER:if(k.href){if(k.target){window.open(k.href,k.target);}else{window.location(k.href);}}else{k.toggle();}this.fireEvent("enterKeyPressed",k);b.preventDefault(l);break;case g.HOME:j=this.getRoot();if(j.children.length){j=j.children[0];}if(j._canHaveFocus()){j.focus();}b.preventDefault(l);break;case g.END:j=j.parent.children;j=j[j.length-1];if(j._canHaveFocus()){j.focus();}b.preventDefault(l);break;case 107:case 187:if(l.shiftKey){k.parent.expandAll();}else{k.expand();}break;case 109:case 189:if(l.shiftKey){k.parent.collapseAll();}else{k.collapse();}break;default:break;}},render:function(){var g=this.root.getHtml(),h=this.getEl();h.innerHTML=g;if(!this._hasEvents){b.on(h,"click",this._onClickEvent,this,true);b.on(h,"dblclick",this._onDblClickEvent,this,true);b.on(h,"mouseover",this._onMouseOverEvent,this,true);b.on(h,"mouseout",this._onMouseOutEvent,this,true);b.on(h,"keydown",this._onKeyDownEvent,this,true);}this._hasEvents=true;},getEl:function(){if(!this._el){this._el=d.get(this.id);}return this._el;},regNode:function(g){this._nodes[g.index]=g;},getRoot:function(){return this.root;},setDynamicLoad:function(g,h){this.root.setDynamicLoad(g,h);},expandAll:function(){if(!this.locked){this.root.expandAll();}},collapseAll:function(){if(!this.locked){this.root.collapseAll();}},getNodeByIndex:function(h){var g=this._nodes[h];return(g)?g:null;},getNodeByProperty:function(j,h){for(var g in this._nodes){if(this._nodes.hasOwnProperty(g)){var k=this._nodes[g];if((j in k&&k[j]==h)||(k.data&&h==k.data[j])){return k;}}}return null;},getNodesByProperty:function(k,j){var g=[];for(var h in this._nodes){if(this._nodes.hasOwnProperty(h)){var l=this._nodes[h];if((k in l&&l[k]==j)||(l.data&&j==l.data[k])){g.push(l);}}}return(g.length)?g:null;},getNodesBy:function(j){var g=[];for(var h in this._nodes){if(this._nodes.hasOwnProperty(h)){var k=this._nodes[h];if(j(k)){g.push(k);}}}return(g.length)?g:null;},getNodeByElement:function(i){var j=i,g,h=/ygtv([^\\d]*)(.*)/;do{if(j&&j.id){g=j.id.match(h);if(g&&g[2]){return this.getNodeByIndex(g[2]);}}j=j.parentNode;if(!j||!j.tagName){break;}}while(j.id!==this.id&&j.tagName.toLowerCase()!=="body");return null;},getHighlightedNode:function(){return this._currentlyHighlighted;},removeNode:function(h,g){if(h.isRoot()){return false;}var i=h.parent;if(i.parent){i=i.parent;}this._deleteNode(h);if(g&&i&&i.childrenRendered){i.refresh();}return true;},_removeChildren_animComplete:function(g){this.unsubscribe(this._removeChildren_animComplete);this.removeChildren(g.node);},removeChildren:function(g){if(g.expanded){if(this._collapseAnim){this.subscribe("animComplete",this._removeChildren_animComplete,this,true);e.Node.prototype.collapse.call(g);return;}g.collapse();}while(g.children.length){this._deleteNode(g.children[0]);}if(g.isRoot()){e.Node.prototype.expand.call(g);}g.childrenRendered=false;g.dynamicLoadComplete=false;g.updateIcon();},_deleteNode:function(g){this.removeChildren(g);this.popNode(g);},popNode:function(k){var l=k.parent;var h=[];for(var j=0,g=l.children.length;j<g;++j){if(l.children[j]!=k){h[h.length]=l.children[j];}}l.children=h;l.childrenRendered=false;if(k.previousSibling){k.previousSibling.nextSibling=k.nextSibling;}if(k.nextSibling){k.nextSibling.previousSibling=k.previousSibling;}if(this.currentFocus==k){this.currentFocus=null;}if(this._currentlyHighlighted==k){this._currentlyHighlighted=null;}k.parent=null;k.previousSibling=null;k.nextSibling=null;k.tree=null;delete this._nodes[k.index];},destroy:function(){if(this._destroyEditor){this._destroyEditor();}var h=this.getEl();b.removeListener(h,"click");b.removeListener(h,"dblclick");b.removeListener(h,"mouseover");b.removeListener(h,"mouseout");b.removeListener(h,"keydown");for(var g=0;g<this._nodes.length;g++){var j=this._nodes[g];if(j&&j.destroy){j.destroy();}}h.innerHTML="";this._hasEvents=false;},toString:function(){return"TreeView "+this.id;},getNodeCount:function(){return this.getRoot().getNodeCount();},getTreeDefinition:function(){return this.getRoot().getNodeDefinition();},onExpand:function(g){},onCollapse:function(g){},setNodesProperty:function(g,i,h){this.root.setNodesProperty(g,i);if(h){this.root.refresh();}},onEventToggleHighlight:function(h){var g;if("node" in h&&h.node instanceof e.Node){g=h.node;}else{if(h instanceof e.Node){g=h;}else{return false;}}g.toggleHighlight();return false;}};var a=c.prototype;a.draw=a.render;YAHOO.augment(c,YAHOO.util.EventProvider);c.nodeCount=0;c.trees=[];c.getTree=function(h){var g=c.trees[h];return(g)?g:null;};c.getNode=function(h,i){var g=c.getTree(h);return(g)?g.getNodeByIndex(i):null;};c.FOCUS_CLASS_NAME="ygtvfocus";})();(function(){var b=YAHOO.util.Dom,c=YAHOO.lang,a=YAHOO.util.Event;YAHOO.widget.Node=function(f,e,d){if(f){this.init(f,e,d);}};YAHOO.widget.Node.prototype={index:0,children:null,tree:null,data:null,parent:null,depth:-1,expanded:false,multiExpand:true,renderHidden:false,childrenRendered:false,dynamicLoadComplete:false,previousSibling:null,nextSibling:null,_dynLoad:false,dataLoader:null,isLoading:false,hasIcon:true,iconMode:0,nowrap:false,isLeaf:false,contentStyle:"",contentElId:null,enableHighlight:true,highlightState:0,propagateHighlightUp:false,propagateHighlightDown:false,className:null,_type:"Node",init:function(g,f,d){this.data={};this.children=[];this.index=YAHOO.widget.TreeView.nodeCount;++YAHOO.widget.TreeView.nodeCount;this.contentElId="ygtvcontentel"+this.index;if(c.isObject(g)){for(var e in g){if(g.hasOwnProperty(e)){if(e.charAt(0)!="_"&&!c.isUndefined(this[e])&&!c.isFunction(this[e])){this[e]=g[e];}else{this.data[e]=g[e];}}}}if(!c.isUndefined(d)){this.expanded=d;}this.createEvent("parentChange",this);if(f){f.appendChild(this);}},applyParent:function(e){if(!e){return false;}this.tree=e.tree;this.parent=e;this.depth=e.depth+1;this.tree.regNode(this);e.childrenRendered=false;for(var f=0,d=this.children.length;f<d;++f){this.children[f].applyParent(this);}this.fireEvent("parentChange");return true;},appendChild:function(e){if(this.hasChildren()){var d=this.children[this.children.length-1];d.nextSibling=e;e.previousSibling=d;}this.children[this.children.length]=e;e.applyParent(this);if(this.childrenRendered&&this.expanded){this.getChildrenEl().style.display="";}return e;},appendTo:function(d){return d.appendChild(this);},insertBefore:function(d){var f=d.parent;if(f){if(this.tree){this.tree.popNode(this);}var e=d.isChildOf(f);f.children.splice(e,0,this);if(d.previousSibling){d.previousSibling.nextSibling=this;}this.previousSibling=d.previousSibling;this.nextSibling=d;d.previousSibling=this;this.applyParent(f);}return this;},insertAfter:function(d){var f=d.parent;if(f){if(this.tree){this.tree.popNode(this);}var e=d.isChildOf(f);if(!d.nextSibling){this.nextSibling=null;return this.appendTo(f);}f.children.splice(e+1,0,this);d.nextSibling.previousSibling=this;this.previousSibling=d;this.nextSibling=d.nextSibling;d.nextSibling=this;this.applyParent(f);}return this;},isChildOf:function(e){if(e&&e.children){for(var f=0,d=e.children.length;f<d;++f){if(e.children[f]===this){return f;}}}return -1;},getSiblings:function(){var d=this.parent.children.slice(0);for(var e=0;e<d.length&&d[e]!=this;e++){}d.splice(e,1);if(d.length){return d;}return null;},showChildren:function(){if(!this.tree.animateExpand(this.getChildrenEl(),this)){if(this.hasChildren()){this.getChildrenEl().style.display="";}}},hideChildren:function(){if(!this.tree.animateCollapse(this.getChildrenEl(),this)){this.getChildrenEl().style.display="none";}},getElId:function(){return"ygtv"+this.index;},getChildrenElId:function(){return"ygtvc"+this.index;},getToggleElId:function(){return"ygtvt"+this.index;},getEl:function(){return b.get(this.getElId());},getChildrenEl:function(){return b.get(this.getChildrenElId());},getToggleEl:function(){return b.get(this.getToggleElId());},getContentEl:function(){return b.get(this.contentElId);},collapse:function(){if(!this.expanded){return;}var d=this.tree.onCollapse(this);if(false===d){return;}d=this.tree.fireEvent("collapse",this);if(false===d){return;}if(!this.getEl()){this.expanded=false;}else{this.hideChildren();this.expanded=false;this.updateIcon();}d=this.tree.fireEvent("collapseComplete",this);},expand:function(f){if(this.isLoading||(this.expanded&&!f)){return;}var d=true;if(!f){d=this.tree.onExpand(this);if(false===d){return;}d=this.tree.fireEvent("expand",this);}if(false===d){return;}if(!this.getEl()){this.expanded=true;return;}if(!this.childrenRendered){this.getChildrenEl().innerHTML=this.renderChildren();}else{}this.expanded=true;this.updateIcon();if(this.isLoading){this.expanded=false;return;}if(!this.multiExpand){var g=this.getSiblings();for(var e=0;g&&e<g.length;++e){if(g[e]!=this&&g[e].expanded){g[e].collapse();}}}this.showChildren();d=this.tree.fireEvent("expandComplete",this);},updateIcon:function(){if(this.hasIcon){var d=this.getToggleEl();if(d){d.className=d.className.replace(/\\bygtv(([tl][pmn]h?)|(loading))\\b/gi,this.getStyle());}}d=b.get("ygtvtableel"+this.index);if(d){if(this.expanded){b.replaceClass(d,"ygtv-collapsed","ygtv-expanded");}else{b.replaceClass(d,"ygtv-expanded","ygtv-collapsed");}}},getStyle:function(){if(this.isLoading){return"ygtvloading";}else{var e=(this.nextSibling)?"t":"l";var d="n";if(this.hasChildren(true)||(this.isDynamic()&&!this.getIconMode())){d=(this.expanded)?"m":"p";}return"ygtv"+e+d;}},getHoverStyle:function(){var d=this.getStyle();if(this.hasChildren(true)&&!this.isLoading){d+="h";}return d;},expandAll:function(){var d=this.children.length;for(var e=0;e<d;++e){var f=this.children[e];if(f.isDynamic()){break;}else{if(!f.multiExpand){break;}else{f.expand();f.expandAll();}}}},collapseAll:function(){for(var d=0;d<this.children.length;++d){this.children[d].collapse();this.children[d].collapseAll();}},setDynamicLoad:function(d,e){if(d){this.dataLoader=d;this._dynLoad=true;}else{this.dataLoader=null;this._dynLoad=false;}if(e){this.iconMode=e;}},isRoot:function(){return(this==this.tree.root);},isDynamic:function(){if(this.isLeaf){return false;}else{return(!this.isRoot()&&(this._dynLoad||this.tree.root._dynLoad));}},getIconMode:function(){return(this.iconMode||this.tree.root.iconMode);},hasChildren:function(d){if(this.isLeaf){return false;}else{return(this.children.length>0||(d&&this.isDynamic()&&!this.dynamicLoadComplete));}},toggle:function(){if(!this.tree.locked&&(this.hasChildren(true)||this.isDynamic())){if(this.expanded){this.collapse();}else{this.expand();}}},getHtml:function(){this.childrenRendered=false;return[\'<div class="ygtvitem" id="\',this.getElId(),\'">\',this.getNodeHtml(),this.getChildrenHtml(),"</div>"].join("");},getChildrenHtml:function(){var d=[];d[d.length]=\'<div class="ygtvchildren" id="\'+this.getChildrenElId()+\'"\';if(!this.expanded||!this.hasChildren()){d[d.length]=\' style="display:none;"\';}d[d.length]=">";if((this.hasChildren(true)&&this.expanded)||(this.renderHidden&&!this.isDynamic())){d[d.length]=this.renderChildren();}d[d.length]="</div>";return d.join("");},renderChildren:function(){var d=this;if(this.isDynamic()&&!this.dynamicLoadComplete){this.isLoading=true;this.tree.locked=true;if(this.dataLoader){setTimeout(function(){d.dataLoader(d,function(){d.loadComplete();});},10);}else{if(this.tree.root.dataLoader){setTimeout(function(){d.tree.root.dataLoader(d,function(){d.loadComplete();});},10);}else{return"Error: data loader not found or not specified.";}}return"";}else{return this.completeRender();}},completeRender:function(){var e=[];for(var d=0;d<this.children.length;++d){e[e.length]=this.children[d].getHtml();}this.childrenRendered=true;return e.join("");},loadComplete:function(){this.getChildrenEl().innerHTML=this.completeRender();if(this.propagateHighlightDown){if(this.highlightState===1&&!this.tree.singleNodeHighlight){for(var d=0;d<this.children.length;d++){this.children[d].highlight(true);}}else{if(this.highlightState===0||this.tree.singleNodeHighlight){for(d=0;d<this.children.length;d++){this.children[d].unhighlight(true);}}}}this.dynamicLoadComplete=true;this.isLoading=false;this.expand(true);this.tree.locked=false;},getAncestor:function(e){if(e>=this.depth||e<0){return null;}var d=this.parent;while(d.depth>e){d=d.parent;}return d;},getDepthStyle:function(d){return(this.getAncestor(d).nextSibling)?"ygtvdepthcell":"ygtvblankdepthcell";},getNodeHtml:function(){var e=[];e[e.length]=\'<table id="ygtvtableel\'+this.index+\'" border="0" cellpadding="0" cellspacing="0" class="ygtvtable ygtvdepth\'+this.depth;e[e.length]=" ygtv-"+(this.expanded?"expanded":"collapsed");if(this.enableHighlight){e[e.length]=" ygtv-highlight"+this.highlightState;}if(this.className){e[e.length]=" "+this.className;}e[e.length]=\'"><tr class="ygtvrow">\';for(var d=0;d<this.depth;++d){e[e.length]=\'<td class="ygtvcell \'+this.getDepthStyle(d)+\'"><div class="ygtvspacer"></div></td>\';}if(this.hasIcon){e[e.length]=\'<td id="\'+this.getToggleElId();e[e.length]=\'" class="ygtvcell \';e[e.length]=this.getStyle();e[e.length]=\'"><a href="#" class="ygtvspacer">&#160;</a></td>\';}e[e.length]=\'<td id="\'+this.contentElId;e[e.length]=\'" class="ygtvcell \';e[e.length]=this.contentStyle+\' ygtvcontent" \';e[e.length]=(this.nowrap)?\' nowrap="nowrap" \':"";e[e.length]=" >";e[e.length]=this.getContentHtml();e[e.length]="</td></tr></table>";return e.join("");},getContentHtml:function(){return"";},refresh:function(){this.getChildrenEl().innerHTML=this.completeRender();if(this.hasIcon){var d=this.getToggleEl();if(d){d.className=d.className.replace(/\\bygtv[lt][nmp]h*\\b/gi,this.getStyle());}}},toString:function(){return this._type+" ("+this.index+")";},_focusHighlightedItems:[],_focusedItem:null,_canHaveFocus:function(){return this.getEl().getElementsByTagName("a").length>0;},_removeFocus:function(){if(this._focusedItem){a.removeListener(this._focusedItem,"blur");this._focusedItem=null;}var d;while((d=this._focusHighlightedItems.shift())){b.removeClass(d,YAHOO.widget.TreeView.FOCUS_CLASS_NAME);}},focus:function(){var f=false,d=this;if(this.tree.currentFocus){this.tree.currentFocus._removeFocus();}var e=function(g){if(g.parent){e(g.parent);g.parent.expand();}};e(this);b.getElementsBy(function(g){return(/ygtv(([tl][pmn]h?)|(content))/).test(g.className);},"td",d.getEl().firstChild,function(h){b.addClass(h,YAHOO.widget.TreeView.FOCUS_CLASS_NAME);if(!f){var g=h.getElementsByTagName("a");if(g.length){g=g[0];g.focus();d._focusedItem=g;a.on(g,"blur",function(){d.tree.fireEvent("focusChanged",{oldNode:d.tree.currentFocus,newNode:null});d.tree.currentFocus=null;d._removeFocus();});f=true;}}d._focusHighlightedItems.push(h);});if(f){this.tree.fireEvent("focusChanged",{oldNode:this.tree.currentFocus,newNode:this});this.tree.currentFocus=this;}else{this.tree.fireEvent("focusChanged",{oldNode:d.tree.currentFocus,newNode:null});this.tree.currentFocus=null;this._removeFocus();}return f;},getNodeCount:function(){for(var d=0,e=0;d<this.children.length;d++){e+=this.children[d].getNodeCount();}return e+1;},getNodeDefinition:function(){if(this.isDynamic()){return false;}var g,d=c.merge(this.data),f=[];if(this.expanded){d.expanded=this.expanded;}if(!this.multiExpand){d.multiExpand=this.multiExpand;}if(this.renderHidden){d.renderHidden=this.renderHidden;}if(!this.hasIcon){d.hasIcon=this.hasIcon;}if(this.nowrap){d.nowrap=this.nowrap;}if(this.className){d.className=this.className;}if(this.editable){d.editable=this.editable;}if(!this.enableHighlight){d.enableHighlight=this.enableHighlight;}if(this.highlightState){d.highlightState=this.highlightState;}if(this.propagateHighlightUp){d.propagateHighlightUp=this.propagateHighlightUp;}if(this.propagateHighlightDown){d.propagateHighlightDown=this.propagateHighlightDown;}d.type=this._type;for(var e=0;e<this.children.length;e++){g=this.children[e].getNodeDefinition();if(g===false){return false;}f.push(g);}if(f.length){d.children=f;}return d;},getToggleLink:function(){return"return false;";},setNodesProperty:function(d,g,f){if(d.charAt(0)!="_"&&!c.isUndefined(this[d])&&!c.isFunction(this[d])){this[d]=g;}else{this.data[d]=g;}for(var e=0;e<this.children.length;e++){this.children[e].setNodesProperty(d,g);}if(f){this.refresh();}},toggleHighlight:function(){if(this.enableHighlight){if(this.highlightState==1){this.unhighlight();}else{this.highlight();}}},highlight:function(e){if(this.enableHighlight){if(this.tree.singleNodeHighlight){if(this.tree._currentlyHighlighted){this.tree._currentlyHighlighted.unhighlight(e);}this.tree._currentlyHighlighted=this;}this.highlightState=1;this._setHighlightClassName();if(!this.tree.singleNodeHighlight){if(this.propagateHighlightDown){for(var d=0;d<this.children.length;d++){this.children[d].highlight(true);}}if(this.propagateHighlightUp){if(this.parent){this.parent._childrenHighlighted();}}}if(!e){this.tree.fireEvent("highlightEvent",this);}}},unhighlight:function(e){if(this.enableHighlight){this.tree._currentlyHighlighted=null;this.highlightState=0;this._setHighlightClassName();if(!this.tree.singleNodeHighlight){if(this.propagateHighlightDown){for(var d=0;d<this.children.length;d++){this.children[d].unhighlight(true);}}if(this.propagateHighlightUp){if(this.parent){this.parent._childrenHighlighted();}}}if(!e){this.tree.fireEvent("highlightEvent",this);}}},_childrenHighlighted:function(){var f=false,e=false;if(this.enableHighlight){for(var d=0;d<this.children.length;d++){switch(this.children[d].highlightState){case 0:e=true;break;case 1:f=true;break;case 2:f=e=true;break;}}if(f&&e){this.highlightState=2;}else{if(f){this.highlightState=1;}else{this.highlightState=0;}}this._setHighlightClassName();if(this.propagateHighlightUp){if(this.parent){this.parent._childrenHighlighted();}}}},_setHighlightClassName:function(){var d=b.get("ygtvtableel"+this.index);if(d){d.className=d.className.replace(/\\bygtv-highlight\\d\\b/gi,"ygtv-highlight"+this.highlightState);}}};YAHOO.augment(YAHOO.widget.Node,YAHOO.util.EventProvider);})();YAHOO.widget.RootNode=function(a){this.init(null,null,true);this.tree=a;};YAHOO.extend(YAHOO.widget.RootNode,YAHOO.widget.Node,{_type:"RootNode",getNodeHtml:function(){return"";},toString:function(){return this._type;},loadComplete:function(){this.tree.draw();},getNodeCount:function(){for(var a=0,b=0;a<this.children.length;a++){b+=this.children[a].getNodeCount();}return b;},getNodeDefinition:function(){for(var c,a=[],b=0;b<this.children.length;b++){c=this.children[b].getNodeDefinition();if(c===false){return false;}a.push(c);}return a;},collapse:function(){},expand:function(){},getSiblings:function(){return null;},focus:function(){}});(function(){var b=YAHOO.util.Dom,c=YAHOO.lang,a=YAHOO.util.Event;YAHOO.widget.TextNode=function(f,e,d){if(f){if(c.isString(f)){f={label:f};}this.init(f,e,d);this.setUpLabel(f);}};YAHOO.extend(YAHOO.widget.TextNode,YAHOO.widget.Node,{labelStyle:"ygtvlabel",labelElId:null,label:null,title:null,href:null,target:"_self",_type:"TextNode",setUpLabel:function(d){if(c.isString(d)){d={label:d};}else{if(d.style){this.labelStyle=d.style;}}this.label=d.label;this.labelElId="ygtvlabelel"+this.index;},getLabelEl:function(){return b.get(this.labelElId);},getContentHtml:function(){var d=[];d[d.length]=this.href?"<a":"<span";d[d.length]=\' id="\'+c.escapeHTML(this.labelElId)+\'"\';d[d.length]=\' class="\'+c.escapeHTML(this.labelStyle)+\'"\';if(this.href){d[d.length]=\' href="\'+c.escapeHTML(this.href)+\'"\';d[d.length]=\' target="\'+c.escapeHTML(this.target)+\'"\';}if(this.title){d[d.length]=\' title="\'+c.escapeHTML(this.title)+\'"\';}d[d.length]=" >";d[d.length]=c.escapeHTML(this.label);d[d.length]=this.href?"</a>":"</span>";return d.join("");},getNodeDefinition:function(){var d=YAHOO.widget.TextNode.superclass.getNodeDefinition.call(this);if(d===false){return false;}d.label=this.label;if(this.labelStyle!="ygtvlabel"){d.style=this.labelStyle;}if(this.title){d.title=this.title;}if(this.href){d.href=this.href;}if(this.target!="_self"){d.target=this.target;}return d;},toString:function(){return YAHOO.widget.TextNode.superclass.toString.call(this)+": "+this.label;},onLabelClick:function(){return false;},refresh:function(){YAHOO.widget.TextNode.superclass.refresh.call(this);var d=this.getLabelEl();d.innerHTML=this.label;if(d.tagName.toUpperCase()=="A"){d.href=this.href;d.target=this.target;}}});})();YAHOO.widget.MenuNode=function(c,b,a){YAHOO.widget.MenuNode.superclass.constructor.call(this,c,b,a);this.multiExpand=false;};YAHOO.extend(YAHOO.widget.MenuNode,YAHOO.widget.TextNode,{_type:"MenuNode"});(function(){var b=YAHOO.util.Dom,c=YAHOO.lang,a=YAHOO.util.Event;var d=function(h,g,f,e){if(h){this.init(h,g,f);this.initContent(h,e);}};YAHOO.widget.HTMLNode=d;YAHOO.extend(d,YAHOO.widget.Node,{contentStyle:"ygtvhtml",html:null,_type:"HTMLNode",initContent:function(f,e){this.setHtml(f);this.contentElId="ygtvcontentel"+this.index;if(!c.isUndefined(e)){this.hasIcon=e;}},setHtml:function(f){this.html=(c.isObject(f)&&"html" in f)?f.html:f;var e=this.getContentEl();if(e){if(f.nodeType&&f.nodeType==1&&f.tagName){e.innerHTML="";}else{e.innerHTML=this.html;}}},getContentHtml:function(){if(typeof this.html==="string"){return this.html;}else{d._deferredNodes.push(this);if(!d._timer){d._timer=window.setTimeout(function(){var e;while((e=d._deferredNodes.pop())){e.getContentEl().appendChild(e.html);}d._timer=null;},0);}return"";}},getNodeDefinition:function(){var e=d.superclass.getNodeDefinition.call(this);if(e===false){return false;}e.html=this.html;return e;}});d._deferredNodes=[];d._timer=null;})();(function(){var b=YAHOO.util.Dom,c=YAHOO.lang,a=YAHOO.util.Event,d=YAHOO.widget.Calendar;YAHOO.widget.DateNode=function(g,f,e){YAHOO.widget.DateNode.superclass.constructor.call(this,g,f,e);};YAHOO.extend(YAHOO.widget.DateNode,YAHOO.widget.TextNode,{_type:"DateNode",calendarConfig:null,fillEditorContainer:function(g){var h,f=g.inputContainer;if(c.isUndefined(d)){b.replaceClass(g.editorPanel,"ygtv-edit-DateNode","ygtv-edit-TextNode");YAHOO.widget.DateNode.superclass.fillEditorContainer.call(this,g);return;}if(g.nodeType!=this._type){g.nodeType=this._type;g.saveOnEnter=false;g.node.destroyEditorContents(g);g.inputObject=h=new d(f.appendChild(document.createElement("div")));if(this.calendarConfig){h.cfg.applyConfig(this.calendarConfig,true);h.cfg.fireQueue();}h.selectEvent.subscribe(function(){this.tree._closeEditor(true);},this,true);}else{h=g.inputObject;}g.oldValue=this.label;h.cfg.setProperty("selected",this.label,false);var i=h.cfg.getProperty("DATE_FIELD_DELIMITER");var e=this.label.split(i);h.cfg.setProperty("pagedate",e[h.cfg.getProperty("MDY_MONTH_POSITION")-1]+i+e[h.cfg.getProperty("MDY_YEAR_POSITION")-1]);h.cfg.fireQueue();h.render();h.oDomContainer.focus();},getEditorValue:function(f){if(c.isUndefined(d)){return f.inputElement.value;}else{var h=f.inputObject,g=h.getSelectedDates()[0],e=[];e[h.cfg.getProperty("MDY_DAY_POSITION")-1]=g.getDate();e[h.cfg.getProperty("MDY_MONTH_POSITION")-1]=g.getMonth()+1;e[h.cfg.getProperty("MDY_YEAR_POSITION")-1]=g.getFullYear();return e.join(h.cfg.getProperty("DATE_FIELD_DELIMITER"));}},displayEditedValue:function(g,e){var f=e.node;f.label=g;f.getLabelEl().innerHTML=g;},getNodeDefinition:function(){var e=YAHOO.widget.DateNode.superclass.getNodeDefinition.call(this);if(e===false){return false;}if(this.calendarConfig){e.calendarConfig=this.calendarConfig;}return e;}});})();(function(){var e=YAHOO.util.Dom,f=YAHOO.lang,b=YAHOO.util.Event,d=YAHOO.widget.TreeView,c=d.prototype;d.editorData={active:false,whoHasIt:null,nodeType:null,editorPanel:null,inputContainer:null,buttonsContainer:null,node:null,saveOnEnter:true,oldValue:undefined};c.validator=null;c._initEditor=function(){this.createEvent("editorSaveEvent",this);this.createEvent("editorCancelEvent",this);};c._nodeEditing=function(m){if(m.fillEditorContainer&&m.editable){var i,k,l,j,h=d.editorData;h.active=true;h.whoHasIt=this;if(!h.nodeType){h.editorPanel=i=this.getEl().appendChild(document.createElement("div"));e.addClass(i,"ygtv-label-editor");i.tabIndex=0;l=h.buttonsContainer=i.appendChild(document.createElement("div"));e.addClass(l,"ygtv-button-container");j=l.appendChild(document.createElement("button"));e.addClass(j,"ygtvok");j.innerHTML=" ";j=l.appendChild(document.createElement("button"));e.addClass(j,"ygtvcancel");j.innerHTML=" ";b.on(l,"click",function(q){var r=b.getTarget(q),o=d.editorData,p=o.node,n=o.whoHasIt;if(e.hasClass(r,"ygtvok")){b.stopEvent(q);n._closeEditor(true);}if(e.hasClass(r,"ygtvcancel")){b.stopEvent(q);n._closeEditor(false);}});h.inputContainer=i.appendChild(document.createElement("div"));e.addClass(h.inputContainer,"ygtv-input");b.on(i,"keydown",function(q){var p=d.editorData,n=YAHOO.util.KeyListener.KEY,o=p.whoHasIt;switch(q.keyCode){case n.ENTER:b.stopEvent(q);if(p.saveOnEnter){o._closeEditor(true);}break;case n.ESCAPE:b.stopEvent(q);o._closeEditor(false);break;}});}else{i=h.editorPanel;}h.node=m;if(h.nodeType){e.removeClass(i,"ygtv-edit-"+h.nodeType);}e.addClass(i," ygtv-edit-"+m._type);e.setStyle(i,"display","block");e.setXY(i,e.getXY(m.getContentEl()));i.focus();m.fillEditorContainer(h);return true;}};c.onEventEditNode=function(h){if(h instanceof YAHOO.widget.Node){h.editNode();}else{if(h.node instanceof YAHOO.widget.Node){h.node.editNode();}}return false;};c._closeEditor=function(j){var h=d.editorData,i=h.node,k=true;if(!i||!h.active){return;}if(j){k=h.node.saveEditorValue(h)!==false;}else{this.fireEvent("editorCancelEvent",i);}if(k){e.setStyle(h.editorPanel,"display","none");h.active=false;i.focus();}};c._destroyEditor=function(){var h=d.editorData;if(h&&h.nodeType&&(!h.active||h.whoHasIt===this)){b.removeListener(h.editorPanel,"keydown");b.removeListener(h.buttonContainer,"click");h.node.destroyEditorContents(h);document.body.removeChild(h.editorPanel);h.nodeType=h.editorPanel=h.inputContainer=h.buttonsContainer=h.whoHasIt=h.node=null;h.active=false;}};var g=YAHOO.widget.Node.prototype;g.editable=false;g.editNode=function(){this.tree._nodeEditing(this);};g.fillEditorContainer=null;g.destroyEditorContents=function(h){b.purgeElement(h.inputContainer,true);h.inputContainer.innerHTML="";};g.saveEditorValue=function(h){var j=h.node,k,i=j.tree.validator;k=this.getEditorValue(h);if(f.isFunction(i)){k=i(k,h.oldValue,j);if(f.isUndefined(k)){return false;}}if(this.tree.fireEvent("editorSaveEvent",{newValue:k,oldValue:h.oldValue,node:j})!==false){this.displayEditedValue(k,h);}};g.getEditorValue=function(h){};g.displayEditedValue=function(i,h){};var a=YAHOO.widget.TextNode.prototype;a.fillEditorContainer=function(i){var h;if(i.nodeType!=this._type){i.nodeType=this._type;i.saveOnEnter=true;i.node.destroyEditorContents(i);i.inputElement=h=i.inputContainer.appendChild(document.createElement("input"));}else{h=i.inputElement;}i.oldValue=this.label;h.value=this.label;h.focus();h.select();};a.getEditorValue=function(h){return h.inputElement.value;};a.displayEditedValue=function(j,h){var i=h.node;i.label=j;i.getLabelEl().innerHTML=j;};a.destroyEditorContents=function(h){h.inputContainer.innerHTML="";};})();YAHOO.widget.TVAnim=function(){return{FADE_IN:"TVFadeIn",FADE_OUT:"TVFadeOut",getAnim:function(b,a,c){if(YAHOO.widget[b]){return new YAHOO.widget[b](a,c);}else{return null;}},isValid:function(a){return(YAHOO.widget[a]);}};}();YAHOO.widget.TVFadeIn=function(a,b){this.el=a;this.callback=b;};YAHOO.widget.TVFadeIn.prototype={animate:function(){var e=this;var d=this.el.style;d.opacity=0.1;d.filter="alpha(opacity=10)";d.display="";var c=0.4;var b=new YAHOO.util.Anim(this.el,{opacity:{from:0.1,to:1,unit:""}},c);b.onComplete.subscribe(function(){e.onComplete();});b.animate();},onComplete:function(){this.callback();},toString:function(){return"TVFadeIn";}};YAHOO.widget.TVFadeOut=function(a,b){this.el=a;this.callback=b;};YAHOO.widget.TVFadeOut.prototype={animate:function(){var d=this;var c=0.4;var b=new YAHOO.util.Anim(this.el,{opacity:{from:1,to:0.1,unit:""}},c);b.onComplete.subscribe(function(){d.onComplete();});b.animate();},onComplete:function(){var a=this.el.style;a.display="none";a.opacity=1;a.filter="alpha(opacity=100)";this.callback();},toString:function(){return"TVFadeOut";}};YAHOO.register("treeview",YAHOO.widget.TreeView,{version:"2.9.0",build:"2800"});';
            var m = document.createElement("script");
            m.setAttribute("type", "text/JavaScript");
            if (m.text) {
                m.text = p
            } else {
                var o = document.createTextNode(p);
                m.appendChild(o)
            }
            var n = document.getElementsByTagName("head")[0];
            n.appendChild(m)
        })();
        var j = function() {
            var m = document.createElement("div");
            m.setAttribute("id", "__ADE__tree_div");
            return m
        };
        var e = function() {
            var m = document.createElement("div");
            m.setAttribute("class", "__ADE__header");
            var n = document.createTextNode("Settings");
            m.appendChild(n);
            var q = document.createElement("div");
            q.setAttribute("id", "__ADE__settingsMainBox");
            var o = document.createElement("div");
            var p = function(u) {
                var t = document.createElement("div");
                t.setAttribute("id", "__ADE__settingsSubHeader");
                t.appendChild(document.createTextNode(u));
                return t
            };
            var s = document.createElement("div");
            s.appendChild(p("Location"));
            s.appendChild(f());
            s.appendChild(b());
            o.appendChild(s);
            var r = document.createElement("div");
            r.appendChild(p("Resources"));
            r.appendChild(a());
            o.appendChild(r);
            q.appendChild(m);
            q.appendChild(o);
            return q
        };
        var a = function() {
            var q = document.createElement("div");
            q.setAttribute("class", "__ADE__settingsEntryBox");
            var n = document.createElement("div");
            n.setAttribute("class", "settingsEntryHeader");
            n.appendChild(document.createTextNode("Ressource Loading"));
            q.appendChild(n);
            var m = document.createElement("div");
            m.setAttribute("class", "settingsSetting");
            var r = document.createElement("input");
            r.setAttribute("type", "checkbox");
            r.onchange = function() {
                if (r.checked) {
                    AR.ADE.instance.loadAllRessourcesNow();
                    o.disabled = true
                } else {
                    o.disabled = false
                }
                AR.ADE.instance.autoLoadResources = r.checked
            };
            var p = document.createTextNode("Auto-Load ressources");
            m.appendChild(r);
            m.appendChild(p);
            m.appendChild(document.createElement("br"));
            var o = document.createElement("input");
            o.setAttribute("type", "button");
            o.setAttribute("value", "Load all Ressources now");
            o.onclick = function() {
                AR.ADE.instance.loadAllRessourcesNow()
            };
            m.appendChild(o);
            q.appendChild(m);
            return q
        };
        var b = function() {
            var p = document.createElement("div");
            p.setAttribute("class", "__ADE__settingsEntryBox");
            var o = document.createElement("div");
            o.setAttribute("class", "settingsEntryHeader");
            o.appendChild(document.createTextNode("Location Updates"));
            p.appendChild(o);
            var n = document.createElement("div");
            n.setAttribute("class", "settingsSetting");
            var m = document.createElement("input");
            m.setAttribute("type", "checkbox");
            m.onchange = function() {
                AR.ADE.instance.simulateLocation = m.checked
            };
            var q = document.createTextNode("Receive Constant Location Updates");
            n.appendChild(m);
            n.appendChild(q);
            p.appendChild(n);
            return p
        };
        var f = function() {
            var x = document.createElement("div");
            x.setAttribute("class", "__ADE__settingsEntryBox");
            var v = document.createElement("div");
            v.setAttribute("class", "settingsEntryHeader");
            v.appendChild(document.createTextNode("Current Location"));
            x.appendChild(v);
            var w = document.createElement("div");
            w.setAttribute("class", "settingsSetting");
            var C = document.createElement("div");
            var D = document.createElement("div");
            D.appendChild(document.createTextNode("Predefined Locations:"));
            var r = document.createElement("select");
            r.setAttribute("id", "preselectedCurrentLocations");
            r.onchange = function() {
                var G = AR.__fromJSONString__(r.value);
                document.getElementById("currentLatitude").value = G[0];
                document.getElementById("currentLongitude").value = G[1];
                document.getElementById("currentAltitude").value = G[2]
            };
            r.addOption = function(I, J, H) {
                var G = document.createElement("option");
                G.setAttribute("value", I);
                G.appendChild(document.createTextNode(J));
                if (H) {
                    G.selected = true
                }
                r.appendChild(G);
                return G
            };
            var n = r.addOption("[0,0,0]", "Custom");
            for (var z = 0; z < localStorage.length; z++) {
                key = localStorage.key(z);
                if (key.substring(0, i.length) === i) {
                    r.addOption(localStorage.getItem(key), key.substring(i.length))
                }
            }
            D.appendChild(r);
            C.appendChild(D);
            var B = document.createElement("table");
            var p = ["Latitude", "Longitude", "Altitude"];
            for (var z = 0; z < 3; z++) {
                var E = document.createElement("tr");
                var A = document.createElement("td");
                var t = document.createTextNode(p[z]);
                var y = document.createElement("td");
                var u = document.createElement("input");
                u.setAttribute("id", "current" + p[z]);
                u.setAttribute("type", "text");
                u.setAttribute("value", "0.0");
                u.onkeydown = function() {
                    n.selected = true
                };
                A.appendChild(t);
                y.appendChild(u);
                E.appendChild(A);
                E.appendChild(y);
                B.appendChild(E)
            }
            var q = function(G) {
                document.getElementById(G).style.backgroundColor = "lightcoral";
                window.setTimeout("document.getElementById('" + G + "').style.backgroundColor = 'white';", 1000)
            };
            var F = document.createElement("div");
            var m = document.createElement("input");
            m.setAttribute("id", "__ADE__applyButton");
            m.setAttribute("type", "button");
            m.setAttribute("value", "Apply");
            var s = function() {
                var I = parseFloat(document.getElementById("currentLatitude").value);
                var H = parseFloat(document.getElementById("currentLongitude").value);
                var G = parseFloat(document.getElementById("currentAltitude").value);
                if (I != null && AR.VALIDATE.isInRange(I, -90, 90)) {} else {
                    q("currentLatitude");
                    return
                }
                if (H != null && AR.VALIDATE.isInRange(H, -180, 180)) {} else {
                    q("currentLongitude");
                    return
                }
                if (G != null && AR.VALIDATE.isNumeric(G) && !isNaN(G)) {} else {
                    q("currentAltitude");
                    return
                }
                return [I, H, G]
            };
            m.onclick = function() {
                var G = s();
                if (G) {
                    AR.ADE.instance.applyLocationUpdate(G)
                }
            };
            C.appendChild(B);
            w.appendChild(C);
            w.setAttribute("class", "currentLocationBox");
            F.appendChild(m);
            F.appendChild(document.createTextNode("or"));
            var o = document.createElement("input");
            o.setAttribute("id", "__ADE__saveButton");
            o.setAttribute("type", "button");
            o.setAttribute("value", "Apply and Save");
            o.onclick = function() {
                var G = s();
                if (G) {
                    AR.ADE.instance.applyLocationUpdate(G);
                    var H = prompt("Enter the ID the saved location:", "");
                    if (H) {
                        r.addOption(AR.__toJSONString__(G), H, true);
                        H = i + H;
                        if (!localStorage) {
                            alert("Your Browser does not support local storage. Values will not be persisted.");
                            return
                        }
                        localStorage.setItem(H, AR.__toJSONString__(G))
                    }
                }
            };
            F.appendChild(o);
            C.appendChild(F);
            x.appendChild(w);
            return x
        };
        this.createWhichARObjectClickedBox = function(q, s) {
            var r = document.createElement("div");
            r.setAttribute("id", "__ADE__hitARObjectDiv");
            var m = document.createElement("select");
            m.addOption = function(u, v) {
                var t = document.createElement("option");
                t.setAttribute("value", u);
                t.appendChild(document.createTextNode(v));
                m.appendChild(t)
            };
            for (var p = 0; p < q.length; p++) {
                m.addOption(q[p].id, q[p].bo.type + " (#" + q[p].id + ")")
            }
            var o = document.createElement("input");
            o.type = "button";
            o.value = "OK";
            o.onclick = function() {
                document.body.removeChild(r);
                s(m.value)
            };
            var n = document.createElement("div");
            n.innerHTML = "The Drawable is attached to multiple ARObjects.<br/>Select which attached ARObject was hit with the click.";
            r.appendChild(n);
            r.appendChild(m);
            r.appendChild(o);
            document.body.appendChild(r)
        };
        this.remove = function() {
            AR.overlay.OVERLAY_CONTAINER.removeOverlay(g)
        };
        var h = null;
        this.getHtmlContainer = function() {
            return h
        };
        var k = document.createElement("div");
        var c = e();
        k.appendChild(c);
        var l = document.createElement("div");
        var d = document.createElement("div");
        d.setAttribute("id", "__ADE__treeDivHeader");
        d.setAttribute("class", "__ADE__header");
        d.appendChild(document.createTextNode("Known ARchitect Objects"));
        h = j();
        l.appendChild(d);
        l.appendChild(h);
        k.appendChild(l);
        var g = AR.overlay.OVERLAY_CONTAINER.appendOverlay("ADE", k, function() {
            AR.ADE.instance.init()
        });
        AR.ADE.Screen = undefined
    };
    var AR = AR || {};
    AR.ADE = AR.ADE || {};
    AR.ADE.ConstructionPlan = function() {
        var a;
        var b = new AR.ADE.Screen();
        var e = [];
        this.simulateLocation = false;
        this.simulatedLocation = {
            latitude: 0,
            longitude: 0,
            altitude: 0,
            accuracy: AR.CONST.LOCATION_ACCURACY.HIGH
        };
        this.applyLocationUncertainity = function() {
            if (AR.ADE.instance.simulateLocation) {
                deltaLatitude = (Math.random() - 0.5) / 1000;
                deltaLongitude = (Math.random() - 0.5) / 1000;
                deltaAltitude = (Math.random() - 0.5) * 10;
                this.simulatedLocation.latitude += deltaLatitude;
                this.simulatedLocation.longitude += deltaLongitude;
                this.simulatedLocation.altitude += deltaAltitude;
                if (AR.context.onLocationChanged) {
                    AR.context.onLocationChanged(this.simulatedLocation.latitude, this.simulatedLocation.longitude, this.simulatedLocation.altitude, this.simulatedLocation.accuracy)
                }
            }
        };
        var d = window.setInterval("AR.ADE.instance.applyLocationUncertainity();", 1000);
        this.autoLoadResources = false;
        this.init = function() {
            c();
            for (var f = 0; f < e.length; f++) {
                var g = AR.om.getObjectForID(e[f]);
                if (g && !(g.destroyed)) {
                    AR.ADE.instance.alertCreation(e[f])
                }
            }
        };
        this.removeADE = function() {
            b.remove();
            window.clearInterval(d);
            AR.ADE.instance = undefined
        };
        this.loadAllRessourcesNow = function() {
            for (objectId in AR.om.__objects__) {
                var f = AR.om.getObjectForID(objectId);
                if (f instanceof AR.ImageResource) {
                    AR.i.imageResourceInterface.startLoading({
                        objectId: f.__id
                    })
                } else {
                    if (f instanceof AR.Tracker) {
                        AR.i.trackerInterface.startLoading({
                            objectId: f.__id
                        })
                    } else {
                        if (f instanceof AR.HtmlDrawable) {
                            AR.i.htmlDrawableInterface.startLoading({
                                objectId: f.__id
                            })
                        } else {
                            if (f instanceof AR.Sound) {
                                AR.i.soundInterface.simulateLoad({
                                    objectId: f.__id
                                })
                            } else {
                                if (f instanceof AR.Model) {
                                    AR.i.modelInterface.simulateLoad({
                                        objectId: f.__id
                                    })
                                }
                            }
                        }
                    }
                }
            }
        };
        this.applyLocationUpdate = function(f) {
            AR.ADE.instance.simulatedLocation.latitude = f[0];
            AR.ADE.instance.simulatedLocation.longitude = f[1];
            AR.ADE.instance.simulatedLocation.altitude = f[2];
            if (AR.context.onLocationChanged != null) {
                AR.context.onLocationChanged(AR.ADE.instance.simulatedLocation.latitude, AR.ADE.instance.simulatedLocation.longitude, AR.ADE.instance.simulatedLocation.altitude, AR.ADE.instance.simulatedLocation.accuracy)
            }
        };
        var c = function() {
            a = new AR.ADE.Tree(b.getHtmlContainer());
            AR.i.bridgeObjects.context = AR.i.contextInterface;
            AR.om.registerObjectForID("context", AR.context);
            AR.ADE.instance.alertCreation("context");
            AR.i.bridgeObjects.radar = AR.i.radarInterface;
            AR.om.registerObjectForID("radar", AR.radar);
            AR.ADE.instance.alertCreation("radar")
        };
        this.alertCreation = function(f) {
            if (a == null) {
                e.push(f);
                return
            }
            a.objectCreated(f)
        };
        this.alertModification = function(f) {
            if (a == null) {
                return
            }
            a.objectModified(f)
        };
        this.alertDeletion = function(f) {
            if (a == null) {
                return
            }
            a.objectDeleted(f)
        };
        this.trigger = function(n, k, j) {
            var g = k.split(".");
            var l = AR.om.getObjectForID(n);
            for (var f = 0; f < g.length - 1; f++) {
                l = l[g[f]]
            }
            var m = [];
            if (j) {
                m = JSON.parse(j)
            }
            var h = l[g[g.length - 1]];
            h.apply(h, m)
        };
        this.triggerClickOnDrawable = function(n) {
            var l = [];
            var k = null;
            for (objectId in AR.om.__objects__) {
                var g = AR.om.getObjectForID(objectId);
                if (g instanceof AR.ARObject) {
                    var j = g.drawables.cam;
                    for (var h = 0; h < j.length; h++) {
                        if (j[h].__id == n) {
                            k = g;
                            var m = AR.i.getBridgeObject(g.__id);
                            l.push({
                                id: g.__id,
                                bo: m.explain()
                            })
                        }
                    }
                }
            }
            var f = function(o, i) {
                var p = {
                    drawables: [{
                        drawable: n,
                        arObject: i
                    }],
                    arObjects: [i]
                };
                AR.js.click.onClickTrigger(p)
            };
            if (l.length == 1) {
                f(n, k.__id)
            } else {
                if (l.length == 0) {
                    f(n, null)
                } else {
                    b.createWhichARObjectClickedBox(l, function(i) {
                        f(n, i)
                    })
                }
            }
        }
    };
    AR.ADE.instance = new AR.ADE.ConstructionPlan();
    AR.ADE.ConstructionPlan = null;
    var AR = AR || {};
    AR.ADE = AR.ADE || {};
    AR.ADE.Tree = function(b) {
        var m = new YAHOO.widget.TreeView(b);
        this.objectCreated = function(p) {
            var o = AR.i.getBridgeObject(p).explain();
            var n = new g(p, o, {
                node: m.getRoot()
            });
            m.render()
        };
        this.objectModified = function(r) {
            var q = m.getNodesByProperty("id", r);
            var p = AR.i.getBridgeObject(r).explain();
            for (var n = 0; n < q.length; n++) {
                var o = q[n].data.node;
                o.update(p)
            }
        };
        this.objectDeleted = function(r) {
            var n = m.getNodesByProperty("id", r);
            for (var o = 0; o < n.length; o++) {
                var p = n[o].parent;
                m.removeNode(n[o]);
                try {
                    p.refresh()
                } catch (q) {}
            }
        };
        var c = function(s, q) {
            var p = AR.i.getBridgeObject(s).explain();
            var o = [];
            for (var n in p.properties) {
                var r = p.properties[n];
                o.push(l(s, n, r, q))
            }
            return o
        };
        var l = function(q, n, p, o) {
            if (!p || !p.type) {
                return new i(q, n, p, o)
            } else {
                switch (p.type) {
                    case "id":
                        return new e(q, n, p, o);
                    case "ids":
                        return new j(q, n, p, o);
                    case "trigger":
                        return new d(q, n, p, o);
                    case "bridgecall":
                        return new k(q, n, p, o);
                    case "html":
                        return new h(q, n, p, o);
                    case "uri":
                        return new f(q, n, p, o);
                    case "custom_Drawables_Click_Trigger":
                        return new a(q, n, p, o)
                }
            }
        };
        var g = function(r, q, o) {
            this.nodeType = "ObjectNode";
            var p = {
                id: r,
                label: q.type + " (#" + r + ")",
                expanded: false,
                node: this
            };
            this.node = new YAHOO.widget.TextNode(p, o.node);
            var n = c(r, this);
            this.update = function(t) {
                for (var s = 0; s < n.length; s++) {
                    n[s].update(t)
                }
            }
        };
        var e = function(u, n, t, p) {
            this.nodeType = "IdNode";
            this.node = null;
            var o = [];
            if (t.value) {
                var r = AR.i.getBridgeObject(t.value).explain();
                var q = {
                    id: t.value,
                    label: n + ": " + r.type + " (#" + t.value + ")",
                    expanded: false,
                    node: this
                };
                this.node = new YAHOO.widget.TextNode(q, p.node);
                o = c(t.value, this)
            } else {
                var s = new i(u, n, "", p);
                this.node = s.node
            }
            this.referencedId = t.value;
            this.update = function(y) {
                var A = y.properties[n];
                if (A) {
                    if (A.value != this.referencedId) {
                        m.removeNode(this.node);
                        if (A.value) {
                            var v = AR.i.getBridgeObject(A.value).explain();
                            var x = {
                                id: A.value,
                                label: n + ": " + v.type + " (#" + A.value + ")",
                                expanded: false,
                                node: this
                            };
                            this.node = new YAHOO.widget.TextNode(x, p.node);
                            o = c(A.value, this)
                        } else {
                            this.node = new i(u, n, "", p)
                        }
                        this.referencedId = A.value;
                        try {
                            this.node.parent.refresh()
                        } catch (z) {}
                    }
                } else {
                    for (var w = 0; w < o.length; w++) {
                        o[w].update(y)
                    }
                }
            }
        };
        var j = function(u, n, t, r) {
            this.nodeType = "IdsNode";
            var s = {
                label: n,
                expanded: false
            };
            this.node = new YAHOO.widget.TextNode(s, r.node);
            var q = AR.__fromJSONString__(t.value);
            var o = [];
            for (var p = 0; p < q.length; p++) {
                o.push(new g(q[p], AR.i.getBridgeObject(q[p]).explain(), this))
            }
            this.update = function(w) {
                var y = AR.__fromJSONString__(w.properties[n].value);
                if (true) {
                    for (var v = 0; v < o.length; v++) {
                        m.removeNode(o[v].node)
                    }
                    o = [];
                    for (var v = 0; v < y.length; v++) {
                        o.push(new g(y[v], AR.i.getBridgeObject(y[v]).explain(), this))
                    }
                    try {
                        this.node.refresh()
                    } catch (x) {}
                    q = y
                }
            }
        };
        var i = function(r, n, q, o) {
            this.nodeType = "StandardPropertyNode";
            var p = {
                label: n + ": " + q,
                id: r + "_" + n,
                expanded: false
            };
            this.value = q;
            this.node = new YAHOO.widget.TextNode(p, o.node);
            this.update = function(s) {
                var u = s.properties[n];
                if (u != this.value) {
                    this.node.setNodesProperty("label", n + ": " + u);
                    this.value = u;
                    try {
                        this.node.parent.refresh()
                    } catch (t) {}
                }
            }
        };
        var d = function(s, o, r, p) {
            this.nodeType = "TriggerNode";
            var n = function(u, t) {
                return "javascript:AR.ADE.instance.trigger('" + u + "','" + t.trigger + "'" + (t.parameters ? ", '" + JSON.stringify(t.parameters) + "'" : "") + ");"
            };
            var q = {
                label: o,
                id: s + "_" + o,
                expanded: false
            };
            if (r.active) {
                q.href = n(s, r)
            }
            this.node = new YAHOO.widget.TextNode(q, p.node);
            this.update = function(t) {
                var v = t.properties[o];
                this.node.setNodesProperty("href", (v.active ? n(s, v) : null));
                try {
                    this.node.parent.refresh()
                } catch (u) {}
            }
        };
        var k = function(s, o, r, p) {
            this.nodeType = "BridgeCallNode";
            var n = function(u, t) {
                return "javascript:" + t.interfaceObject + "." + t.functionName + "({objectId : '" + u + "'});"
            };
            var q = {
                label: o,
                id: s + "_" + o,
                expanded: false
            };
            q.href = n(s, r);
            this.node = new YAHOO.widget.TextNode(q, p.node);
            this.update = function(t) {}
        };
        var h = function(s, o, r, p) {
            this.nodeType = "HtmlNode";
            var o = o;
            var n = function(t) {
                return "javascript:var win=window.open();win.document.write('" + t.value.replace(/\'/g, "\\'") + "');"
            };
            var q = {
                label: o,
                id: s + "_" + o,
                expanded: false
            };
            if (r) {
                q.label += ": " + r.value;
                if (r.value) {
                    q.href = n(r)
                }
            }
            this.node = new YAHOO.widget.TextNode(q, p.node);
            this.update = function(t) {
                var v = t.properties[o];
                this.node.setNodesProperty("label", o + ((v && v.value) ? ": " + v.value : ""));
                this.node.setNodesProperty("href", ((v && v.value) ? n(v) : null));
                try {
                    this.node.parent.refresh()
                } catch (u) {}
            }
        };
        var f = function(s, o, r, p) {
            this.nodeType = "UriNode";
            var o = o;
            var n = function(t) {
                return "javascript:var win=window.open('" + t.value + "');"
            };
            var q = {
                label: o,
                id: s + "_" + o,
                expanded: false
            };
            if (r) {
                q.label += ": " + r.value;
                q.href = n(r)
            }
            this.node = new YAHOO.widget.TextNode(q, p.node);
            this.update = function(t) {
                var v = t.properties[o];
                this.node.setNodesProperty("label", o + (v ? ": " + v.value : ""));
                this.node.setNodesProperty("href", ((v && v.value) ? n(v) : null));
                try {
                    this.node.parent.refresh()
                } catch (u) {}
            }
        };
        var a = function(s, o, r, p) {
            this.nodeType = "DrawablesClickTriggerNode";
            var n = function(t) {
                return "javascript:AR.ADE.instance.triggerClickOnDrawable('" + t + "');"
            };
            var q = {
                label: o,
                id: s + "_" + o,
                expanded: false
            };
            if (r.active) {
                q.href = n(s)
            }
            this.node = new YAHOO.widget.TextNode(q, p.node);
            this.update = function(t) {
                var v = t.properties[o];
                this.node.setNodesProperty("href", (v.active ? n(s) : null));
                try {
                    this.node.parent.refresh()
                } catch (u) {}
            }
        };
        AR.ADE.Tree = undefined
    };
    AR.i = {
        callSync: function(a) {
            return AR.i.__executeFunctionByName(a.is, window, a)
        },
        callAsync: function(a) {
            AR.i.__executeFunctionByName(a.is, window, a)
        },
        __executeFunctionByName: function(f, c) {
            var a = Array.prototype.slice.call(arguments).splice(2);
            var e = f.split(".");
            var d = e.pop();
            for (var b = 0; b < e.length; b++) {
                c = c[e[b]]
            }
            return c[d].apply(c, a)
        },
        __DEFAULT_RETURN_VALUE__: null,
        bridgeObjects: {},
        getBridgeObject: function(a) {
            return AR.i.bridgeObjects[a]
        },
        registerBridgeObject: function(a) {
            AR.i.bridgeObjects[a._id] = a
        }
    };
    AR.i.locationInterface = {
        distanceTo: function(g) {
            var b = AR.i.getBridgeObject(g.objectId);
            var a = AR.i.getBridgeObject(g.locationId);
            var e = b.getCurrentLocation();
            var c = a.getCurrentLocation();
            var f = e.latitude;
            var d = c.latitude;
            var i = e.longitude;
            var h = c.longitude;
            return AR.i.locationInterface.calculateDistance(f, d, i, h)
        },
        distanceToUser: function(c) {
            if (AR.ADE.instance.simulatedLocation) {
                var e = AR.i.getBridgeObject(c.objectId);
                var b = e.getCurrentLocation();
                var d = b.latitude;
                var a = b.longitude;
                return AR.i.locationInterface.calculateDistance(d, AR.ADE.instance.simulatedLocation.latitude, a, AR.ADE.instance.simulatedLocation.longitude)
            }
            return -1
        },
        calculateDistance: function(i, h, g, f) {
            var d = (h - i) * Math.PI / 180;
            var e = (f - g) * Math.PI / 180;
            var b = Math.sin(d / 2) * Math.sin(d / 2) + Math.cos(i * Math.PI / 180) * Math.cos(h * Math.PI / 180) * Math.sin(e / 2) * Math.sin(e / 2);
            var j = 2 * Math.atan2(Math.sqrt(b), Math.sqrt(1 - b));
            return 6371000 * j
        }
    };
    AR.i.geoLocationInterface = {
        setLatitude: function(a) {
            AR.i.getBridgeObject(a.objectId)._latitude = a.latitude;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getLatitude: function(a) {
            return AR.i.getBridgeObject(a.objectId)._latitude
        },
        setLongitude: function(a) {
            AR.i.getBridgeObject(a.objectId)._longitude = a.longitude;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getLongitude: function(a) {
            return AR.i.getBridgeObject(a.objectId)._longitude
        },
        setAltitude: function(a) {
            AR.i.getBridgeObject(a.objectId)._altitude = a.altitude;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getAltitude: function(a) {
            return AR.i.getBridgeObject(a.objectId)._altitude
        },
        createGeoLocation: function(a) {
            AR.i.registerBridgeObject({
                _id: a.objectId,
                _latitude: a.latitude,
                _longitude: a.longitude,
                _altitude: a.altitude,
                getCurrentLocation: function() {
                    return {
                        latitude: this._latitude,
                        longitude: this._longitude,
                        altitude: this._altitude
                    }
                },
                explain: function() {
                    return {
                        type: "GeoLocation",
                        properties: {
                            latitude: this._latitude,
                            longitude: this._longitude,
                            altitude: (this._altitude == AR.CONST.UNKNOWN_ALTITUDE ? "AR.CONST.UNKNOWN_ALTITUDE" : this._altitude)
                        }
                    }
                }
            });
            AR.ADE.instance.alertCreation(a.objectId)
        }
    };
    AR.i.relativeLocationInterface = {
        setLocation: function(a) {
            AR.i.getBridgeObject(a.objectId)._location = a.locationId;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setLocationRelativeToUser: function(a) {
            AR.i.getBridgeObject(a.objectId)._location = null;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setNorthing: function(a) {
            AR.i.getBridgeObject(a.objectId)._northing = a.northing;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getNorthing: function(a) {
            return AR.i.getBridgeObject(a.objectId)._northing
        },
        setEasting: function(a) {
            AR.i.getBridgeObject(a.objectId)._easting = a.easting;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getEasting: function(a) {
            return AR.i.getBridgeObject(a.objectId)._easting
        },
        setAltitudeDelta: function(a) {
            AR.i.getBridgeObject(a.objectId)._altitudeDelta = a.altitudeDelta;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getAltitudeDelta: function(a) {
            return AR.i.getBridgeObject(a.objectId)._altitudeDelta
        },
        createRelativeLocation: function(a) {
            AR.i.registerBridgeObject({
                _id: a.objectId,
                _location: a.locationId,
                _northing: a.northing,
                _easting: a.easting,
                _altitudeDelta: a.altitudeDelta,
                getCurrentLocation: function() {
                    var b = AR.i.getBridgeObject(a.locationId);
                    var d = b.getCurrentLocation();
                    var c = AR.i.relativeLocationInterface.calculateNewLocation(d.latitude, d.longitude, d.altitude, a.northing, a.easting, a.altitudeDelta);
                    return {
                        latitude: c.latitude,
                        longitude: c.longitude,
                        altitude: c.altitude
                    }
                },
                explain: function() {
                    return {
                        type: "RelativeLocation",
                        properties: {
                            location: {
                                type: "id",
                                value: this._location
                            },
                            northing: this._northing,
                            easting: this._easting,
                            altitudeDelta: this._altitudeDelta
                        }
                    }
                }
            });
            AR.ADE.instance.alertCreation(a.objectId)
        },
        createRelativeLocationToUser: function(b) {
            var a = AR.i.relativeLocationInterface.calculateNewLocation(AR.ADE.instance.simulatedLocation.latitude, AR.ADE.instance.simulatedLocation.longitude, AR.ADE.instance.simulatedLocation.altitude, b.northing, b.easting, b.altitudeDelta);
            AR.i.registerBridgeObject({
                _id: b.objectId,
                _northing: b.northing,
                _easting: b.easting,
                _altitudeDelta: b.altitudeDelta,
                explain: function() {
                    return {
                        type: "RelativeLocation",
                        properties: {
                            location: {
                                type: "id",
                                value: this._location
                            },
                            northing: this._northing,
                            easting: this._easting,
                            altitudeDelta: this._altitudeDelta
                        }
                    }
                }
            });
            AR.ADE.instance.alertCreation(b.objectId)
        },
        calculateNewLocation: function(k, a, h, b, g, c) {
            var e = k * Math.PI / 180;
            var i = a * Math.PI / 180;
            var j = Math.abs(b / 6371000);
            var f = b > 0 ? 0 : Math.PI;
            e = Math.asin(Math.sin(e) * Math.cos(j) + Math.cos(e) * Math.sin(j) * Math.cos(f));
            j = Math.abs(g / 6371000);
            f = g > 0 ? Math.PI / 2 : 3 * Math.PI / 2;
            lat2 = Math.asin(Math.sin(e) * Math.cos(j) + Math.cos(e) * Math.sin(j) * Math.cos(f));
            i = i + Math.atan2(Math.sin(f) * Math.sin(j) * Math.cos(e), Math.cos(j) - Math.sin(e) * Math.sin(lat2));
            e = lat2;
            return {
                latitude: e * 180 / Math.PI,
                longitude: i * 180 / Math.PI,
                altitude: (h == AR.CONST.UNKNOWN_ALTITUDE ? AR.CONST.UNKNOWN_ALTITUDE : h + c)
            }
        }
    };
    AR.i.arObjectInterface = {
        setEnabled: function(a) {
            AR.i.getBridgeObject(a.objectId)._enabled = a.enabled;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getEnabled: function(a) {
            return AR.i.getBridgeObject(a.objectId)._enabled
        },
        setCamDrawables: function(a) {
            AR.i.getBridgeObject(a.objectId)._camDrawables = a.camDrawableIds;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setRenderingOrder: function(a) {
            AR.i.getBridgeObject(a.objectId)._renderingOrder = a.renderingOrder;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setOnEnterFieldOfVisionTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onEnterFieldOfVisionTriggerActive = a.onEnterFieldOfVisionTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setOnExitFieldOfVisionTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onExitFieldOfVisionTriggerActive = a.onExitFieldOfVisionTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setOnClickTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onClickTriggerActive = a.onClickTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        isVisible: function(a) {
            return AR.i.getBridgeObject(a.objectId)._visible
        },
        toggleVisibility: function(c) {
            var b = AR.i.getBridgeObject(c.objectId);
            var a = AR.om.getExistingObjectForID(c.objectId);
            b._visible = !b._visible;
            if (b._visible && a.onEnterFieldOfVision != null) {
                a.__onEnterFieldOfVision__()
            } else {
                if (!b._visible && a.onExitFieldOfVision != null) {
                    a.__onExitFieldOfVision__()
                }
            }
            AR.ADE.instance.alertModification(c.objectId)
        }
    };
    AR.i.geoObjectInterface = {
        setLocations: function(a) {
            AR.i.getBridgeObject(a.objectId)._locations = a.locationIds;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setRadarDrawables: function(a) {
            AR.i.getBridgeObject(a.objectId)._radarDrawables = a.radarDrawableIds;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setIndicatorDrawables: function(a) {
            AR.i.getBridgeObject(a.objectId)._indicatorDrawables = a.indicatorDrawableIds;
            AR.ADE.instance.alertModification(a.objectId)
        },
        createGeoObject: function(a) {
            AR.i.registerBridgeObject({
                _id: a.objectId,
                _locations: a.locationIds,
                _enabled: a.enabled,
                _camDrawables: a.camDrawableIds,
                _radarDrawables: a.radarDrawableIds,
                _indicatorDrawables: a.indicatorDrawableIds,
                _renderingOrder: a.renderingOrder,
                _visible: false,
                _onEnterFieldOfVisionTriggerActive: a.onEnterFieldOfVisionTriggerActive,
                _onExitFieldOfVisionTriggerActive: a.onExitFieldOfVisionTriggerActive,
                _onClickTriggerActive: a.onClickTriggerActive,
                explain: function() {
                    return {
                        type: "GeoObject",
                        properties: {
                            locations: {
                                type: "ids",
                                value: this._locations
                            },
                            enabled: this._enabled,
                            renderingOrder: this._renderingOrder,
                            "drawables.cam": {
                                type: "ids",
                                value: this._camDrawables
                            },
                            "drawables.radar": {
                                type: "ids",
                                value: this._radarDrawables
                            },
                            "drawables.indicator": {
                                type: "ids",
                                value: this._indicatorDrawables
                            },
                            onEnterFieldOfVision: {
                                type: "trigger",
                                active: this._onEnterFieldOfVisionTriggerActive,
                                trigger: "__onEnterFieldOfVision__"
                            },
                            onExitFieldOfVision: {
                                type: "trigger",
                                active: this._onExitFieldOfVisionTriggerActive,
                                trigger: "__onExitFieldOfVision__"
                            },
                            onClick: {
                                type: "trigger",
                                active: this._onClickTriggerActive,
                                trigger: "onClick"
                            },
                            "visible (artificial property)": this._visible,
                            "Toggle Visibility": {
                                type: "bridgecall",
                                interfaceObject: "AR.i.arObjectInterface",
                                functionName: "toggleVisibility"
                            }
                        }
                    }
                }
            });
            AR.ADE.instance.alertCreation(a.objectId)
        }
    };
    AR.i.actionAreaInterface = {
        setEnabled: function(a) {
            AR.i.getBridgeObject(a.objectId)._enabled = a.enabled;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getEnabled: function(a) {
            return AR.i.getBridgeObject(a.objectId)._enabled
        },
        setOnEnterTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onEnterTriggerActive = a.onEnterTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setOnExitTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onExitTriggerActive = a.onExitTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        isInArea: function(a) {
            var b = AR.i.actionRangeInterface.isInArea(a.objectId, a.geoLocationId);
            return b
        }
    };
    AR.i.actionRangeInterface = {
        setRadius: function(a) {
            AR.i.getBridgeObject(a.objectId)._radius = a.radius;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getRadius: function(a) {
            return AR.i.getBridgeObject(a.objectId)._radius
        },
        createActionRange: function(a) {
            AR.i.registerBridgeObject({
                _id: a.objectId,
                _enabled: a.enabled,
                _location: a.location,
                _radius: a.radius,
                _onEnterTriggerActive: a.onEnterTriggerActive,
                _onExitTriggerActive: a.onExitTriggerActive,
                explain: function() {
                    return {
                        type: "ActionRange",
                        properties: {
                            enabled: this._enabled,
                            location: {
                                type: "id",
                                value: this._location
                            },
                            radius: this._radius,
                            onEnter: {
                                type: "trigger",
                                active: this._onEnterTriggerActive,
                                trigger: "onEnter"
                            },
                            onExit: {
                                type: "trigger",
                                active: this._onExitTriggerActive,
                                trigger: "onExit"
                            }
                        }
                    }
                }
            });
            AR.ADE.instance.alertCreation(a.objectId)
        },
        setLocation: function(a) {
            AR.i.getBridgeObject(a.objectId)._location = a.location;
            AR.ADE.instance.alertModification(a.objectId)
        },
        isInArea: function(b, a) {
            return (AR.om.getExistingObjectForID(b).location.distanceTo(AR.om.getExistingObjectForID(a)) <= AR.i.getBridgeObject(b)._radius)
        }
    };
    AR.i.drawableInterface = {
        setEnabled: function(a) {
            AR.i.getBridgeObject(a.objectId)._enabled = a.enabled;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setOnClickTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onClickTriggerActive = a.onClickTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setRoll: function(a) {
            AR.i.getBridgeObject(a.objectId)._roll = a.roll;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setTilt: function(a) {
            AR.i.getBridgeObject(a.objectId)._tilt = a.tilt;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setHeading: function(a) {
            AR.i.getBridgeObject(a.objectId)._heading = a.heading;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getRoll: function(a) {
            return AR.i.getBridgeObject(a.objectId)._roll
        },
        getTilt: function(a) {
            return AR.i.getBridgeObject(a.objectId)._tilt
        },
        getHeading: function(a) {
            return AR.i.getBridgeObject(a.objectId)._heading
        },
        setAttachedArObjects: function(a, b) {
            AR.i.getBridgeObject(a).attachedArObjects = b;
            AR.ADE.instance.alertModification(a)
        }
    };
    AR.i.drawable2DInterface = {
        setScale: function(a) {
            AR.i.getBridgeObject(a.objectId)._scale = a.scale;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getScale: function(a) {
            return AR.i.getBridgeObject(a.objectId)._scale
        },
        setRotation: function(a) {
            AR.i.getBridgeObject(a.objectId)._rotation = a.rotation;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getRotation: function(a) {
            return AR.i.getBridgeObject(a.objectId)._rotation
        },
        setOpacity: function(a) {
            AR.i.getBridgeObject(a.objectId)._opacity = a.opacity;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getOpacity: function(a) {
            return AR.i.getBridgeObject(a.objectId)._opacity
        },
        setHorizontalAnchor: function(a) {
            AR.i.getBridgeObject(a.objectId)._horizontalAnchor = a.horizontalAnchor;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setVerticalAnchor: function(a) {
            AR.i.getBridgeObject(a.objectId)._verticalAnchor = a.verticalAnchor;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setOffsetX: function(a) {
            AR.i.getBridgeObject(a.objectId)._offsetX = a.offsetX;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getOffsetX: function(a) {
            return AR.i.getBridgeObject(a.objectId)._offsetX
        },
        setOffsetY: function(a) {
            AR.i.getBridgeObject(a.objectId)._offsetY = a.offsetY;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getOffsetY: function(a) {
            return AR.i.getBridgeObject(a.objectId)._offsetY
        },
        setZOrder: function(a) {
            AR.i.getBridgeObject(a.objectId)._zOrder = a.zOrder;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getBoundingRectangle: function(a) {
            return {
                width: AR.i.__DEFAULT_RETURN_VALUE__,
                height: AR.i.__DEFAULT_RETURN_VALUE__
            }
        }
    };
    AR.i.modelInterface = {
        setScaleX: function(a) {
            AR.i.getBridgeObject(a.objectId)._scaleX = a.scaleX;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setScaleY: function(a) {
            AR.i.getBridgeObject(a.objectId)._scaleY = a.scaleY;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setScaleZ: function(a) {
            AR.i.getBridgeObject(a.objectId)._scaleZ = a.scaleZ;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getScaleX: function(a) {
            return AR.i.getBridgeObject(a.objectId)._scaleX
        },
        getScaleY: function(a) {
            return AR.i.getBridgeObject(a.objectId)._scaleY
        },
        getScaleZ: function(a) {
            return AR.i.getBridgeObject(a.objectId)._scaleZ
        },
        setTranslateX: function(a) {
            AR.i.getBridgeObject(a.objectId)._translateX = a.translateX;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setTranslateY: function(a) {
            AR.i.getBridgeObject(a.objectId)._translateY = a.translateY;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setTranslateZ: function(a) {
            AR.i.getBridgeObject(a.objectId)._translateZ = a.translateZ;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getTranslateX: function(a) {
            return AR.i.getBridgeObject(a.objectId)._translateX
        },
        getTranslateY: function(a) {
            return AR.i.getBridgeObject(a.objectId)._translateY
        },
        getTranslateZ: function(a) {
            return AR.i.getBridgeObject(a.objectId)._translateZ
        },
        setOnLoadedTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onLoadedTriggerActive = a.onLoadedTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setOnErrorTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onErrorTriggerActive = a.onErrorTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        createModel: function(a) {
            AR.i.registerBridgeObject({
                _id: a.objectId,
                _uri: a.uri,
                _enabled: a.enabled,
                _onClickTriggerActive: a.onClickTriggerActive,
                _onLoadedTriggerActive: a.onLoadedTriggerActive,
                _onErrorTriggerActive: a.onErrorTriggerActive,
                _scaleX: a.scaleX,
                _scaleY: a.scaleY,
                _scaleZ: a.scaleZ,
                _translateX: a.translateX,
                _translateY: a.translateY,
                _translateZ: a.translateZ,
                _roll: a.roll,
                _tilt: a.tilt,
                _heading: a.heading,
                _loaded: false,
                loading: false,
                explain: function() {
                    return {
                        type: "Model",
                        properties: {
                            uri: this._uri,
                            enabled: this._enabled,
                            "scale.x": this._scaleX,
                            "scale.y": this._scaleY,
                            "scale.z": this._scaleZ,
                            "translate.x": this._translateX,
                            "translate.y": this._translateY,
                            "translate.z": this._translateZ,
                            "rotate.roll": this._roll,
                            "rotate.tilt": this._tilt,
                            "rotate.heading": this._heading,
                            onClick: {
                                type: "custom_Drawables_Click_Trigger",
                                active: this._onClickTriggerActive
                            },
                            onLoaded: {
                                type: "trigger",
                                active: this._onLoadedTriggerActive,
                                trigger: "onLoaded"
                            },
                            onError: {
                                type: "trigger",
                                active: this._onErrorTriggerActive,
                                trigger: "onError"
                            },
                            Load: {
                                type: "bridgecall",
                                interfaceObject: "AR.i.modelInterface",
                                functionName: "startLoading"
                            },
                            "loaded (artificial property)": this._loaded
                        }
                    }
                }
            });
            AR.ADE.instance.alertCreation(a.objectId);
            if (AR.ADE.instance.autoLoadResources) {
                AR.i.imageResourceInterface.startLoading(a)
            }
        },
        startLoading: function(b) {
            var a = AR.i.getBridgeObject(b.objectId);
            if (!a._loaded && !a.loading) {
                a.loading = true;
                window.setTimeout(function() {
                    AR.i.modelInterface.simulateLoad({
                        objectId: b.objectId
                    })
                }, Math.random() * 5000)
            }
        },
        simulateLoad: function(c) {
            var b = AR.i.getBridgeObject(c.objectId);
            var a = AR.om.getExistingObjectForID(c.objectId);
            b._loaded = true;
            if (a.onLoaded != null) {
                a.onLoaded()
            }
            AR.ADE.instance.alertModification(c.objectId)
        },
        isLoaded: function(a) {
            return AR.i.getBridgeObject(a.objectId)._loaded
        },
    };
    AR.i.circleInterface = {
        setRadius: function(a) {
            AR.i.getBridgeObject(a.objectId)._radius = a.radius;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getRadius: function(a) {
            return AR.i.getBridgeObject(a.objectId)._radius
        },
        setStyle: function(b) {
            var a = AR.i.getBridgeObject(b.objectId);
            a._fillColor = b.fillColor;
            a._outlineSize = b.outlineSize;
            a._outlineColor = b.outlineColor;
            AR.ADE.instance.alertModification(b.objectId)
        },
        createCircle: function(a) {
            AR.i.registerBridgeObject({
                _id: a.objectId,
                _enabled: a.enabled,
                _offsetX: a.offsetX,
                _offsetY: a.offsetY,
                _offsetY: a.offsetY,
                _zOrder: a.zOrder,
                _onClickTriggerActive: a.onClickTriggerActive,
                _horizontalAnchor: a.horizontalAnchor,
                _verticalAnchor: a.verticalAnchor,
                _scale: a.scale,
                _rotation: a.rotation,
                _opacity: a.opacity,
                _fillColor: a.fillColor,
                _outlineSize: a.outlineSize,
                _outlineColor: a.outlineColor,
                _radius: a.radius,
                _roll: a.roll,
                _tilt: a.tilt,
                _heading: a.heading,
                explain: function() {
                    return {
                        type: "Circle",
                        properties: {
                            radius: this._radius,
                            enabled: this._enabled,
                            offsetX: this._offsetX,
                            offsetY: this._offsetY,
                            zOrder: this._zOrder,
                            horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.toName(this._horizontalAnchor),
                            verticalAnchor: AR.CONST.VERTICAL_ANCHOR.toName(this._verticalAnchor),
                            scale: this._scale,
                            rotation: this._rotation,
                            "rotate.roll": this._roll,
                            "rotate.tilt": this._tilt,
                            "rotate.heading": this._heading,
                            opacity: this._opacity,
                            "style.fillColor": this._fillColor,
                            "style.outlineSize": this._outlineSize,
                            "style.outlineColor": this._outlineColor,
                            onClick: {
                                type: "custom_Drawables_Click_Trigger",
                                active: this._onClickTriggerActive
                            }
                        }
                    }
                }
            });
            AR.ADE.instance.alertCreation(a.objectId)
        }
    };
    AR.i.htmlDrawableInterface = {
        setHtml: function(b) {
            var a = AR.i.getBridgeObject(b.objectId);
            a._html = b.html;
            if (AR.ADE.instance.autoLoadResources) {
                window.setTimeout(function() {
                    AR.i.htmlDrawableInterface.simulateLoad({
                        objectId: b.objectId
                    })
                }, Math.random() * 5000)
            }
            AR.ADE.instance.alertModification(b.objectId)
        },
        setUri: function(b) {
            var a = AR.i.getBridgeObject(b.objectId);
            a._uri = b.uri;
            if (AR.ADE.instance.autoLoadResources) {
                window.setTimeout(function() {
                    AR.i.htmlDrawableInterface.simulateLoad({
                        objectId: b.objectId
                    })
                }, Math.random() * 5000)
            }
            AR.ADE.instance.alertModification(b.objectId)
        },
        setWidth: function(a) {
            AR.i.getBridgeObject(a.objectId)._width = a.width;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getWidth: function(a) {
            return AR.i.getBridgeObject(a.objectId)._width
        },
        setViewportWidth: function(a) {
            AR.i.getBridgeObject(a.objectId)._viewportWidth = a.viewportWidth;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getViewportWidth: function(a) {
            return AR.i.getBridgeObject(a.objectId)._viewportWidth
        },
        setUpdateRate: function(a) {
            AR.i.getBridgeObject(a.objectId)._updateRate = a.updateRate;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setClickThroughEnabled: function(a) {
            AR.i.getBridgeObject(a.objectId)._clickThroughEnabled = a.clickThroughEnabled;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setAllowDocumentLocationChanges: function(a) {
            AR.i.getBridgeObject(a.objectId)._allowDocumentLocationChanges = a.allowDocumentLocationChanges;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getUpdateRate: function(a) {
            return AR.i.getBridgeObject(a.objectId)._updateRate
        },
        setOnLoadedTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onLoadedTriggerActive = a.onLoadedTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setOnDocumentLocationChangedTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onDocumentLocationChangedTriggerActive = a.onDocumentLocationChangedTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setOnErrorTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onErrorTriggerActive = a.onErrorTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setBackgroundColor: function(a) {
            AR.i.getBridgeObject(a.objectId)._backgroundColor = a.backgroundColor;
            AR.ADE.instance.alertModification(a.objectId)
        },
        evalJavaScript: function(a) {},
        createHtmlDrawable: function(b) {
            var a = AR.__fromJSONString__(b.htmlOrUri);
            AR.i.registerBridgeObject({
                _id: b.objectId,
                _enabled: b.enabled,
                _offsetX: b.offsetX,
                _offsetY: b.offsetY,
                _rotation: b.rotation,
                _zOrder: b.zOrder,
                _onClickTriggerActive: b.onClickTriggerActive,
                _horizontalAnchor: b.horizontalAnchor,
                _verticalAnchor: b.verticalAnchor,
                _scale: b.scale,
                _opacity: b.opacity,
                _html: a.html,
                _uri: a.uri,
                _viewportWidth: b.viewportWidth,
                _width: b.width,
                _updateRate: b.updateRate,
                _onLoadedTriggerActive: b.onLoadedTriggerActive,
                _onErrorTriggerActive: b.onErrorTriggerActive,
                _roll: b.roll,
                _tilt: b.tilt,
                _heading: b.heading,
                _backgroundColor: b.backgroundColor,
                _loaded: false,
                _clickThroughEnabled: b.clickThroughEnabled,
                _allowDocumentLocationChanges: b.allowDocumentLocationChanges,
                _onDocumentLocationChangedTriggerActive: b.onDocumentLocationChangedTriggerActive,
                loading: false,
                explain: function() {
                    var c = "";
                    if (this._onDocumentLocationChangedTriggerActive) {
                        c = {
                            type: "bridgecall",
                            interfaceObject: "AR.i.htmlDrawableInterface",
                            functionName: "onDocumentLocationChanged"
                        }
                    }
                    return {
                        type: "HtmlDrawable",
                        properties: {
                            html: {
                                type: "html",
                                value: this._html
                            },
                            uri: {
                                type: "uri",
                                value: this._uri
                            },
                            width: this._width,
                            viewportWidth: this._viewportWidth,
                            updateRate: AR.HtmlDrawable.UPDATE_RATE.toName(this._updateRate),
                            enabled: this._enabled,
                            offsetX: this._offsetX,
                            offsetY: this._offsetY,
                            rotation: this._rotation,
                            zOrder: this._zOrder,
                            horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.toName(this._horizontalAnchor),
                            verticalAnchor: AR.CONST.VERTICAL_ANCHOR.toName(this._verticalAnchor),
                            scale: this._scale,
                            "rotate.roll": this._roll,
                            "rotate.tilt": this._tilt,
                            "rotate.heading": this._heading,
                            opacity: this._opacity,
                            backgroundColor: this._backgroundColor,
                            clickThroughEnabled: this._clickThroughEnabled,
                            allowDocumentLocationChanges: this._allowDocumentLocationChanges,
                            onDocumentLocationChanged: c,
                            onClick: {
                                type: "custom_Drawables_Click_Trigger",
                                active: this._onClickTriggerActive
                            },
                            onLoaded: {
                                type: "trigger",
                                active: this._onLoadedTriggerActive,
                                trigger: "onLoaded"
                            },
                            onError: {
                                type: "trigger",
                                active: this._onErrorTriggerActive,
                                trigger: "onError"
                            }
                        }
                    }
                }
            });
            AR.ADE.instance.alertCreation(b.objectId);
            if (AR.ADE.instance.autoLoadResources) {
                AR.i.htmlDrawableInterface.startLoading(b)
            }
        },
        onDocumentLocationChanged: function(c) {
            var b = AR.om.getExistingObjectForID(c.objectId);
            var a = prompt("Enter the URL the document location will be changed to: ");
            if (a && b.onDocumentLocationChanged) {
                b.onDocumentLocationChanged(a)
            }
        },
        startLoading: function(b) {
            var a = AR.i.getBridgeObject(b.objectId);
            if (!a._loaded && !a.loading) {
                a.loading = true;
                window.setTimeout(function() {
                    AR.i.htmlDrawableInterface.simulateLoad({
                        objectId: b.objectId
                    })
                }, Math.random() * 5000)
            }
        },
        simulateLoad: function(c) {
            var b = AR.i.getBridgeObject(c.objectId);
            var a = AR.om.getExistingObjectForID(c.objectId);
            b._loaded = true;
            if (a.onLoaded != null) {
                a.onLoaded()
            }
            AR.ADE.instance.alertModification(c.objectId)
        }
    };
    AR.i.labelInterface = {
        setText: function(a) {
            AR.i.getBridgeObject(a.objectId)._text = a.text;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setHeight: function(a) {
            AR.i.getBridgeObject(a.objectId)._height = a.height;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getHeight: function(a) {
            return AR.i.getBridgeObject(a.objectId)._height
        },
        setStyle: function(b) {
            var a = AR.i.getBridgeObject(b.objectId);
            a._backgroundColor = b.backgroundColor;
            a._textColor = b.textColor;
            a._fontStyle = b.fontStyle;
            AR.ADE.instance.alertModification(b.objectId)
        },
        createLabel: function(a) {
            AR.i.registerBridgeObject({
                _id: a.objectId,
                _enabled: a.enabled,
                _offsetX: a.offsetX,
                _offsetY: a.offsetY,
                _zOrder: a.zOrder,
                _onClickTriggerActive: a.onClickTriggerActive,
                _horizontalAnchor: a.horizontalAnchor,
                _verticalAnchor: a.verticalAnchor,
                _scale: a.scale,
                _rotation: a.rotation,
                _opacity: a.opacity,
                _text: a.text,
                _height: a.height,
                _backgroundColor: a.backgroundColor,
                _textColor: a.textColor,
                _fontStyle: a.fontStyle,
                _roll: a.roll,
                _tilt: a.tilt,
                _heading: a.heading,
                explain: function() {
                    return {
                        type: "Label",
                        properties: {
                            text: this._text,
                            height: this._height,
                            enabled: this._enabled,
                            offsetX: this._offsetX,
                            offsetY: this._offsetY,
                            zOrder: this._zOrder,
                            horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.toName(this._horizontalAnchor),
                            verticalAnchor: AR.CONST.VERTICAL_ANCHOR.toName(this._verticalAnchor),
                            scale: this._scale,
                            rotation: this._rotation,
                            "rotate.roll": this._roll,
                            "rotate.tilt": this._tilt,
                            "rotate.heading": this._heading,
                            opacity: this._opacity,
                            "style.textColor": this._textColor,
                            "style.backgroundColor": this._backgroundColor,
                            "style.fontStyle": this._fontStyle,
                            onClick: {
                                type: "custom_Drawables_Click_Trigger",
                                active: this._onClickTriggerActive
                            }
                        }
                    }
                }
            });
            AR.ADE.instance.alertCreation(a.objectId)
        }
    };
    AR.i.imageDrawableInterface = {
        setImageResource: function(a) {
            AR.i.getBridgeObject(a.objectId)._imageResource = a.imageResourceId;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setHeight: function(a) {
            AR.i.getBridgeObject(a.objectId)._height = a.height;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getHeight: function(a) {
            return AR.i.getBridgeObject(a.objectId)._height
        },
        createImageDrawable: function(a) {
            AR.i.registerBridgeObject({
                _id: a.objectId,
                _enabled: a.enabled,
                _offsetX: a.offsetX,
                _offsetY: a.offsetY,
                _zOrder: a.zOrder,
                _onClickTriggerActive: a.onClickTriggerActive,
                _horizontalAnchor: a.horizontalAnchor,
                _verticalAnchor: a.verticalAnchor,
                _scale: a.scale,
                _rotation: a.rotation,
                _opacity: a.opacity,
                _imageResource: a.imageResourceId,
                _height: a.height,
                _roll: a.roll,
                _tilt: a.tilt,
                _heading: a.heading,
                explain: function() {
                    return {
                        type: "ImageDrawable",
                        properties: {
                            imageResource: {
                                type: "id",
                                value: this._imageResource
                            },
                            height: this._height,
                            enabled: this._enabled,
                            offsetX: this._offsetX,
                            offsetY: this._offsetY,
                            zOrder: this._zOrder,
                            horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.toName(this._horizontalAnchor),
                            verticalAnchor: AR.CONST.VERTICAL_ANCHOR.toName(this._verticalAnchor),
                            scale: this._scale,
                            rotation: this._rotation,
                            "rotate.roll": this._roll,
                            "rotate.tilt": this._tilt,
                            "rotate.heading": this._heading,
                            opacity: this._opacity,
                            onClick: {
                                type: "custom_Drawables_Click_Trigger",
                                active: this._onClickTriggerActive
                            }
                        }
                    }
                }
            });
            AR.ADE.instance.alertCreation(a.objectId)
        }
    };
    AR.i.animatedImageDrawableInterface = {
        createAnimatedImageDrawable: function(a) {
            AR.i.registerBridgeObject({
                _id: a.objectId,
                _enabled: a.enabled,
                _offsetX: a.offsetX,
                _onFinishTriggerActive: a.onFinishTriggerActive,
                _offsetY: a.offsetY,
                _zOrder: a.zOrder,
                _onClickTriggerActive: a.onClickTriggerActive,
                _horizontalAnchor: a.horizontalAnchor,
                _verticalAnchor: a.verticalAnchor,
                _scale: a.scale,
                _rotation: a.rotation,
                _opacity: a.opacity,
                _imageResource: a.imageResourceId,
                _height: a.height,
                _keyFrameWidth: a.keyFrameWidth,
                _keyFrameHeight: a.keyFrameHeight,
                _keyFrame: a.keyFrame,
                _roll: a.roll,
                _tilt: a.tilt,
                _heading: a.heading,
                explain: function() {
                    return {
                        type: "AnimatedImageDrawable",
                        properties: {
                            imageResource: {
                                type: "id",
                                value: this._imageResource
                            },
                            height: this._height,
                            keyFrameWidth: this._keyFrameWidth,
                            keyFrameHeight: this._keyFrameHeight,
                            enabled: this._enabled,
                            offsetX: this._offsetX,
                            offsetY: this._offsetY,
                            zOrder: this._zOrder,
                            horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.toName(this._horizontalAnchor),
                            verticalAnchor: AR.CONST.VERTICAL_ANCHOR.toName(this._verticalAnchor),
                            scale: this._scale,
                            rotation: this._rotation,
                            "rotate.roll": this._roll,
                            "rotate.tilt": this._tilt,
                            "rotate.heading": this._heading,
                            opacity: this._opacity,
                            onClick: {
                                type: "custom_Drawables_Click_Trigger",
                                active: this._onClickTriggerActive
                            },
                            onFinish: {
                                type: "trigger",
                                active: this._onFinishTriggerActive,
                                trigger: "onFinish"
                            }
                        }
                    }
                }
            });
            AR.ADE.instance.alertCreation(a.objectId)
        },
        setKeyFrame: function(a) {},
        setOnFinishTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onFinishTriggerActive = a.onFinishTriggerActive
        },
        animate: function(a) {}
    };
    AR.i.imageResourceInterface = {
        setOnLoadedTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onLoadedTriggerActive = a.onLoadedTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setOnErrorTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onErrorTriggerActive = a.onErrorTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getWidth: function(a) {
            return 10
        },
        getHeight: function(a) {
            return 20
        },
        isLoaded: function(a) {
            return AR.i.getBridgeObject(a.objectId)._loaded
        },
        createImageResource: function(a) {
            AR.i.registerBridgeObject({
                _id: a.objectId,
                _uri: a.uri,
                _onLoadedTriggerActive: a.onLoadedTriggerActive,
                _onErrorTriggerActive: a.onErrorTriggerActive,
                _loaded: false,
                loading: false,
                explain: function() {
                    return {
                        type: "ImageResource",
                        properties: {
                            uri: {
                                type: "uri",
                                value: this._uri
                            },
                            onLoaded: {
                                type: "trigger",
                                active: this._onLoadedTriggerActive,
                                trigger: "onLoaded",
                                parameters: [AR.i.imageResourceInterface.getWidth({
                                    objectId: a.objectId
                                }), AR.i.imageResourceInterface.getHeight({
                                    objectId: a.objectId
                                })]
                            },
                            onError: {
                                type: "trigger",
                                active: this._onErrorTriggerActive,
                                trigger: "onError"
                            },
                            Load: {
                                type: "bridgecall",
                                interfaceObject: "AR.i.imageResourceInterface",
                                functionName: "startLoading"
                            },
                            "loaded (artificial property)": this._loaded
                        }
                    }
                }
            });
            AR.ADE.instance.alertCreation(a.objectId);
            if (AR.ADE.instance.autoLoadResources) {
                AR.i.imageResourceInterface.startLoading(a)
            }
        },
        startLoading: function(b) {
            var a = AR.i.getBridgeObject(b.objectId);
            if (!a._loaded && !a.loading) {
                a.loading = true;
                window.setTimeout(function() {
                    AR.i.imageResourceInterface.simulateLoad({
                        objectId: b.objectId
                    })
                }, Math.random() * 5000)
            }
        },
        simulateLoad: function(c) {
            var b = AR.i.getBridgeObject(c.objectId);
            var a = AR.om.getExistingObjectForID(c.objectId);
            b._loaded = true;
            if (a.onLoaded != null) {
                a.onLoaded(AR.i.imageResourceInterface.getWidth({
                    objectId: a.__id
                }), AR.i.imageResourceInterface.getHeight({
                    objectId: a.__id
                }))
            }
            AR.ADE.instance.alertModification(c.objectId)
        }
    };
    AR.i.soundInterface = {
        createSound: function(a) {
            AR.i.registerBridgeObject({
                _id: a.objectId,
                _uri: a.uri,
                _state: AR.CONST.STATE.INITIALIZED,
                _onLoadedTriggerActive: a.onLoadedTriggerActive,
                _onFinishedPlayingTriggerActive: a.onFinishedPlayingTriggerActive,
                _onErrorTriggerActive: a.onErrorTriggerActive,
                _loaded: false,
                _stopped: false,
                length: Math.random() * 10000,
                explain: function() {
                    return {
                        type: "Sound",
                        properties: {
                            uri: {
                                type: "uri",
                                value: this._uri
                            },
                            state: AR.CONST.STATE.toName(this._state),
                            onLoaded: {
                                type: "trigger",
                                active: this._onLoadedTriggerActive,
                                trigger: "onLoaded"
                            },
                            onFinishedPlaying: {
                                type: "trigger",
                                active: this._onFinishedPlayingTriggerActive,
                                trigger: "onFinishedPlaying"
                            },
                            onError: {
                                type: "trigger",
                                active: this._onErrorTriggerActive,
                                trigger: "onError"
                            },
                            "loaded (artificial property)": this._loaded,
                            Load: {
                                type: "bridgecall",
                                interfaceObject: "AR.i.soundInterface",
                                functionName: "load"
                            },
                            Play: {
                                type: "bridgecall",
                                interfaceObject: "AR.i.soundInterface",
                                functionName: "play"
                            },
                            Pause: {
                                type: "bridgecall",
                                interfaceObject: "AR.i.soundInterface",
                                functionName: "pause"
                            },
                            Resume: {
                                type: "bridgecall",
                                interfaceObject: "AR.i.soundInterface",
                                functionName: "resume"
                            },
                            Stop: {
                                type: "bridgecall",
                                interfaceObject: "AR.i.soundInterface",
                                functionName: "stop"
                            },
                            "Simulate Error": {
                                type: "bridgecall",
                                interfaceObject: "AR.i.soundInterface",
                                functionName: "simulateError"
                            }
                        }
                    }
                }
            });
            AR.ADE.instance.alertCreation(a.objectId)
        },
        getState: function(a) {
            return AR.i.getBridgeObject(a.objectId)._state
        },
        setOnLoadedTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onLoadedTriggerActive = a.onLoadedTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setOnFinishedPlayingTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onFinishedPlayingTriggerActive = a.onFinishedPlayingTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setOnErrorTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onErrorTriggerActive = a.onErrorTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        load: function(a) {
            window.setTimeout(function() {
                AR.i.soundInterface.simulateLoad({
                    objectId: a.objectId
                })
            }, Math.random() * 5000)
        },
        play: function(b) {
            var a = AR.i.getBridgeObject(b.objectId);
            if (!a._loaded) {
                window.setTimeout(function() {
                    AR.i.soundInterface.simulateStreaming({
                        objectId: b.objectId
                    })
                }, Math.random() * 5000)
            } else {
                a._state = AR.CONST.STATE.PLAYING;
                window.setTimeout(function() {
                    if (!AR.i.getBridgeObject(b.objectId)._stopped) {
                        AR.i.soundInterface.simulatePlay({
                            objectId: b.objectId
                        })
                    }
                }, a.length * b.loopTimes)
            }
        },
        simulateLoad: function(c) {
            var b = AR.i.getBridgeObject(c.objectId);
            var a = AR.om.getExistingObjectForID(c.objectId);
            b._loaded = true;
            if (a.onLoaded) {
                a.onLoaded()
            }
            b._state = AR.CONST.STATE.LOADED;
            AR.ADE.instance.alertModification(c.objectId)
        },
        simulatePlay: function(c) {
            var b = AR.i.getBridgeObject(c.objectId);
            var a = AR.om.getExistingObjectForID(c.objectId);
            if (a.onFinishedPlaying) {
                a.onFinishedPlaying()
            }
            b._state = AR.CONST.STATE.LOADED;
            b._stopped = false;
            AR.ADE.instance.alertModification(c.objectId)
        },
        simulateStreaming: function(c) {
            var b = AR.i.getBridgeObject(c.objectId);
            var a = AR.om.getExistingObjectForID(c.objectId);
            if (a.onLoaded) {
                a.onLoaded()
            }
            window.setTimeout(function() {
                if (!AR.i.getBridgeObject(c.objectId)._stopped) {
                    if (AR.om.getExistingObjectForID(c.objectId).onFinishedPlaying) {
                        AR.om.getExistingObjectForID(c.objectId).onFinishedPlaying()
                    }
                }
            }, 1)
        },
        stop: function(a) {
            AR.i.getBridgeObject(a.objectId)._stopped = true
        },
        pause: function(a) {
            AR.i.soundInterface.stop(a)
        },
        resume: function(a) {
            AR.i.soundInterface.play(a)
        },
        simulateError: function(b) {
            var a = AR.om.getExistingObjectForID(b.objectId);
            if (a.onError != null) {
                a.onError()
            }
        }
    };
    AR.i.animationInterface = {
        setOnStartTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onStartTriggerActive = a.onStartTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setOnFinishTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onFinishTriggerActive = a.onFinishTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        start: function(c) {
            var b = AR.i.getBridgeObject(c.objectId);
            var a = AR.om.getExistingObjectForID(c.objectId);
            if (a.onStart != null) {
                a.onStart()
            }
            if (a instanceof AR.PropertyAnimation) {
                AR.i.propertyAnimationInterface.start(c)
            } else {
                if (a instanceof AR.AnimationGroup) {
                    AR.i.animationGroupInterface.start(c)
                } else {
                    if (a instanceof AR.ModelAnimation) {
                        AR.i.modelAnimationInterface.start(c)
                    }
                }
            }
        },
        isRunning: function(b) {
            var a = AR.om.getExistingObjectForID(b.objectId);
            if (a instanceof AR.PropertyAnimation) {
                return AR.i.propertyAnimationInterface.isRunning(b)
            } else {
                if (a instanceof AR.AnimationGroup) {
                    return AR.i.animationGroupInterface.isRunning(b)
                } else {
                    if (a instanceof AR.ModelAnimation) {
                        return AR.i.modelAnimationInterface.isRunning(b)
                    }
                }
            }
        },
        stop: function(b) {
            AR.i.getBridgeObject(b.objectId)._helper_isRunning = false;
            var a = AR.om.getExistingObjectForID(b.objectId);
            if (a instanceof AR.AnimationGroup) {
                AR.i.animationGroupInterface.stopAllChildren(b)
            } else {
                if (a instanceof AR.PropertyAnimation) {
                    AR.i.propertyAnimationInterface.stop(b)
                } else {
                    if (a instanceof AR.ModelAnimation) {
                        AR.i.modelAnimationInterface.stop(b)
                    }
                }
            }
            AR.ADE.instance.alertModification(b.objectId)
        },
        pause: function(a) {
            AR.i.animationInterface.stop(a)
        },
        resume: function(a) {
            AR.i.animationInterface.start(a)
        },
        getDuration: function(b) {
            var a = AR.om.getExistingObjectForID(b);
            if (a instanceof AR.PropertyAnimation) {
                return AR.i.propertyAnimationInterface.getDuration(b)
            } else {
                if (a instanceof AR.AnimationGroup) {
                    return AR.i.animationGroupInterface.getDuration(b)
                } else {
                    if (a instanceof AR.ModelAnimation) {
                        return AR.i.modelAnimationInterface.getDuration(b)
                    }
                }
            }
        }
    };
    AR.i.propertyAnimationInterface = {
        createPropertyAnimation: function(a) {
            AR.i.registerBridgeObject({
                _id: a.objectId,
                _target: a.targetId,
                _property: a.property,
                _start: a.start,
                _end: a.end,
                _duration: a.duration,
                _easingCurve: a.easingCurve,
                _onStartTriggerActive: a.onStartTriggerActive,
                _onFinishTriggerActive: a.onFinishTriggerActive,
                runningId: null,
                explain: function() {
                    return {
                        type: "PropertyAnimation",
                        properties: {
                            target: {
                                type: "id",
                                value: this._target
                            },
                            property: this._property,
                            start: (this._start == null ? null : AR.__fromJSONString__(this._start)[0]),
                            end: AR.__fromJSONString__(this._end)[0],
                            duration: this._duration,
                            easingCurve: this._easingCurve,
                            onStart: {
                                type: "trigger",
                                active: this._onStartTriggerActive,
                                trigger: "onStart"
                            },
                            onFinish: {
                                type: "trigger",
                                active: this._onFinishTriggerActive,
                                trigger: "onFinish"
                            }
                        }
                    }
                }
            });
            AR.ADE.instance.alertCreation(a.objectId)
        },
        stop: function(b) {
            var a = AR.i.getBridgeObject(b.objectId);
            if (a.runningId) {
                window.clearInterval(a.runningId);
                a.runningId = null
            }
        },
        isRunning: function(b) {
            var a = AR.i.getBridgeObject(b.objectId);
            return a.runningId != null
        },
        start: function(d) {
            var f = AR.i.getBridgeObject(d.objectId);
            var c = AR.om.getExistingObjectForID(d.objectId);
            var j = AR.om.getExistingObjectForID(f._target);
            var a = j;
            var g = f._property.split(".");
            for (var e = 0; e < g.length - 1; e++) {
                a = a[g[e]]
            }
            if (f._start) {
                a[g[g.length - 1]] = AR.__fromJSONString__(f._start)[0]
            }
            var b = a[g[g.length - 1]];
            var h = AR.__fromJSONString__(f._end)[0];
            var m = (h - b) * 100 / f._duration;
            var l = function() {
                if (f.runningId) {
                    a[g[g.length - 1]] += m
                }
            };
            var k = function() {
                if (f.runningId) {
                    window.clearInterval(f.runningId);
                    f.runningId = null;
                    a[g[g.length - 1]] = h;
                    if ((d.loopTimes - 1) != 0) {
                        AR.i.propertyAnimationInterface.start({
                            objectId: d.objectId,
                            loopTimes: (d.loopTimes - 1)
                        })
                    } else {
                        if (c.onFinish != null) {
                            c.onFinish()
                        }
                    }
                }
            };
            f.runningId = window.setInterval(l, 100);
            window.setTimeout(k, f._duration)
        },
        getDuration: function(a) {
            return AR.i.getBridgeObject(a)._duration
        }
    };
    AR.i.modelAnimationInterface = {
        createModelAnimation: function(a) {
            AR.i.registerBridgeObject({
                _id: a.objectId,
                _model: a.modelId,
                _animationId: a.animationId,
                _duration: a.duration,
                _onStartTriggerActive: a.onStartTriggerActive,
                _onFinishTriggerActive: a.onFinishTriggerActive,
                runningId: null,
                explain: function() {
                    return {
                        type: "ModelAnimation",
                        properties: {
                            model: {
                                type: "id",
                                value: this._model
                            },
                            animationId: this._animationId,
                            duration: this._duration < 0 ? undefined : this._duration,
                            onStart: {
                                type: "trigger",
                                active: this._onStartTriggerActive,
                                trigger: "onStart"
                            },
                            onFinish: {
                                type: "trigger",
                                active: this._onFinishTriggerActive,
                                trigger: "onFinish"
                            }
                        }
                    }
                }
            });
            AR.ADE.instance.alertCreation(a.objectId)
        },
        stop: function(b) {
            var a = AR.i.getBridgeObject(b.objectId);
            window.clearInterval(a.runningId);
            a.runningId = null
        },
        start: function(b) {
            var a = AR.i.getBridgeObject(b.objectId);
            a.runningId = window.setTimeout(function() {
                a.runningId = null
            }, AR.i.modelAnimationInterface.getDuration(b.objectId))
        },
        getDuration: function(a) {
            return 2000
        },
        isRunning: function(b) {
            var a = AR.i.getBridgeObject(b.objectId);
            return a.runningId != null
        }
    };
    AR.i.animationGroupInterface = {
        createAnimationGroup: function(a) {
            AR.i.registerBridgeObject({
                _id: a.objectId,
                _type: a.type,
                _animations: a.animationIds,
                _onStartTriggerActive: a.onStartTriggerActive,
                _onFinishTriggerActive: a.onFinishTriggerActive,
                running: false,
                explain: function() {
                    return {
                        type: "AnimationGroup",
                        properties: {
                            type: this._type,
                            animations: {
                                type: "ids",
                                value: this._animations
                            },
                            onStart: {
                                type: "trigger",
                                active: this._onStartTriggerActive,
                                trigger: "onStart"
                            },
                            onFinish: {
                                type: "trigger",
                                active: this._onFinishTriggerActive,
                                trigger: "onFinish"
                            }
                        }
                    }
                }
            });
            AR.ADE.instance.alertCreation(a.objectId)
        },
        start: function(g) {
            var e = AR.i.getBridgeObject(g.objectId);
            e.running = true;
            var a = AR.__fromJSONString__(e._animations);
            if (e._type == "parallel") {
                for (var d = 0; d < a.length; d++) {
                    var f = a[d];
                    AR.i.callAsync({
                        objectId: f,
                        is: "AR.i.animationInterface.start",
                        loopTimes: 1
                    })
                }
            } else {
                if (e._type == "sequential") {
                    var c = 0;
                    var b = function(i, h) {
                        window.setTimeout(function() {
                            AR.i.callAsync({
                                objectId: i,
                                is: "AR.i.animationInterface.start",
                                loopTimes: 1
                            })
                        }, h)
                    };
                    for (var d = 0; d < a.length; d++) {
                        var f = a[d];
                        b(f, c);
                        c += AR.i.animationInterface.getDuration(f)
                    }
                }
            }
            if (g.loopTimes - 1 != 0) {
                window.setTimeout(function() {
                    if (e.running) {
                        AR.i.animationGroupInterface.start({
                            objectId: g.objectId,
                            loopTimes: g.loopTimes - 1
                        })
                    }
                }, AR.i.animationGroupInterface.getDuration(g.objectId))
            } else {
                window.setTimeout(function() {
                    var h = AR.om.getExistingObjectForID(g.objectId);
                    if (e.running && h.onFinish != null) {
                        h.onFinish()
                    }
                }, AR.i.animationGroupInterface.getDuration(g.objectId))
            }
        },
        getDuration: function(g) {
            var c = AR.i.getBridgeObject(g);
            var a = AR.__fromJSONString__(c._animations);
            if (c._type == "parallel") {
                var d = 0;
                for (var b = 0; b < a.length; b++) {
                    var f = a[b];
                    var e = AR.i.animationInterface.getDuration(f);
                    if (e > d) {
                        d = e
                    }
                }
                return d
            } else {
                if (c._type == "sequential") {
                    var d = 0;
                    for (var b = 0; b < a.length; b++) {
                        var f = a[b];
                        d += AR.i.animationInterface.getDuration(f)
                    }
                    return d
                }
            }
        },
        stopAllChildren: function(e) {
            var c = AR.i.getBridgeObject(e.objectId);
            c.running = false;
            var a = AR.__fromJSONString__(c._animations);
            for (var b = 0; b < a.length; b++) {
                var d = a[b];
                AR.i.callAsync({
                    objectId: d,
                    is: "AR.i.animationInterface.stop"
                })
            }
        },
        isRunning: function(b) {
            var a = AR.i.getBridgeObject(b.objectId);
            return a.running
        }
    };
    AR.i.contextInterface = {
        _onLocationChangedTriggerActive: false,
        _onExitTriggerActive: false,
        _onScreenClickTriggerActive: false,
        _servicesSensors: true,
        _servicesCamera: true,
        _cullingDistance: 50000,
        setOnLocationChangedTriggerActive: function(a) {
            AR.i.contextInterface._onLocationChangedTriggerActive = a.onLocationChangedTriggerActive;
            AR.ADE.instance.alertModification("context")
        },
        setOnScreenClickTriggerActive: function(a) {
            AR.i.contextInterface._onScreenClickTriggerActive = a.onScreenClickTriggerActive;
            AR.ADE.instance.alertModification("context")
        },
        setServiceEnabled: function(a) {
            switch (a.service) {
                case "camera":
                    AR.i.contextInterface._servicesCamera = a.enabled;
                    break;
                case "sensors":
                    AR.i.contextInterface._servicesSensors = a.enabled;
                    break
            }
            AR.ADE.instance.alertModification("context")
        },
        setCullingDistance: function(a) {
            AR.i.contextInterface._cullingDistance = a.cullingDistance;
            AR.ADE.instance.alertModification("context")
        },
        startVideoPlayer: function(a) {},
        openInBrowser: function(a) {
            window.open(a.url)
        },
        clickScreen: function() {
            AR.context.onScreenClickDialogue = function() {
                if (AR.context.onScreenClick != null) {
                    AR.context.onScreenClick()
                }
            }
        },
        explain: function() {
            return {
                type: "context",
                properties: {
                    "Click Screen": {
                        type: "bridgecall",
                        interfaceObject: "AR.i.contextInterface",
                        functionName: "clickScreen"
                    },
                    "services.camera": this._servicesCamera,
                    "services.sensors": this._servicesSensors,
                    "scene.cullingDistance": this._cullingDistance
                }
            }
        },
        destroy: function() {},
        destroyAll: function() {}
    };
    AR.i.trackerInterface = {
        setEnabled: function(a) {
            AR.i.getBridgeObject(a.objectId)._enabled = a.enabled;
            AR.ADE.instance.alertModification(a.objectId)
        },
        getEnabled: function(a) {
            return AR.i.getBridgeObject(a.objectId)._enabled
        },
        setOnDisabledTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onDisabledTriggerActive = a.onDisabledTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setOnLoadedTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onLoadedTriggerActive = a.onLoadedTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        setOnErrorTriggerActive: function(a) {
            AR.i.getBridgeObject(a.objectId)._onErrorTriggerActive = a.onErrorTriggerActive;
            AR.ADE.instance.alertModification(a.objectId)
        },
        isLoaded: function(a) {
            return AR.i.getBridgeObject(a.objectId)._isLoaded
        },
        createTracker: function(a) {
            AR.i.registerBridgeObject({
                _id: a.objectId,
                _src: a.src,
                _enabled: a.enabled,
                _onDisabledTriggerActive: a.onDisabledTriggerActive,
                _onLoadedTriggerActive: a.onLoadedTriggerActive,
                _onErrorTriggerActive: a.onErrorTriggerActive,
                _isLoaded: false,
                loading: false,
                explain: function() {
                    return {
                        type: "Tracker",
                        properties: {
                            src: this._src,
                            enabled: this._enabled,
                            onDisabled: {
                                type: "trigger",
                                active: this._onDisabledTriggerActive,
                                trigger: "onDisabled"
                            },
                            onLoaded: {
                                type: "trigger",
                                active: this._onLoadedTriggerActive,
                                trigger: "onLoaded"
                            },
                            onError: {
                                type: "trigger",
                                active: this._onErrorTriggerActive,
                                trigger: "onError"
                            }
                        }
                    }
                }
            });
            AR.ADE.instance.alertCreation(a.objectId);
            if (AR.ADE.instance.autoLoadResources) {
                AR.i.trackerInterface.startLoading(a)
            }
        },
        startLoading: function(b) {
            var a = AR.i.getBridgeObject(b.objectId);
            if (!a._isLoaded && !a.loading) {
                a.loading = true;
                window.setTimeout(function() {
                    AR.i.trackerInterface.simulateLoad({
                        objectId: b.objectId
                    })
                }, Math.random() * 5000)
            }
        },
        simulateLoad: function(c) {
            var b = AR.i.getBridgeObject(c.objectId);
            var a = AR.om.getExistingObjectForID(c.objectId);
            b._isLoaded = true;
            if (a.onLoaded != null) {
                a.onLoaded()
            }
        }
    };
    AR.i.trackable2DObjectInterface = {
        getWidth: function(a) {
            return AR.i.getBridgeObject(a.objectId)._visible ? 1 : -1
        },
        getHeight: function(a) {
            return AR.i.getBridgeObject(a.objectId)._visible ? 2 : -1
        },
        getDistance: function(a) {
            return AR.i.getBridgeObject(a.objectId)._visible ? 3 : -1
        },
        createTrackable2DObject: function(a) {
            AR.i.registerBridgeObject({
                _id: a.objectId,
                _tracker: a.tracker,
                _targetName: a.targetName,
                _enabled: a.enabled,
                _camDrawables: a.camDrawableIds,
                _renderingOrder: a.renderingOrder,
                _visible: false,
                _onEnterFieldOfVisionTriggerActive: a.onEnterFieldOfVisionTriggerActive,
                _onExitFieldOfVisionTriggerActive: a.onExitFieldOfVisionTriggerActive,
                _onClickTriggerActive: a.onClickTriggerActive,
                explain: function() {
                    return {
                        type: "Trackable2DObject",
                        properties: {
                            tracker: {
                                type: "id",
                                value: this._tracker
                            },
                            targetName: this._targetName,
                            enabled: this._enabled,
                            renderingOrder: this._renderingOrder,
                            "drawables.cam": {
                                type: "ids",
                                value: this._camDrawables
                            },
                            onEnterFieldOfVision: {
                                type: "trigger",
                                active: this._onEnterFieldOfVisionTriggerActive,
                                trigger: "onEnterFieldOfVision"
                            },
                            onExitFieldOfVision: {
                                type: "trigger",
                                active: this._onExitFieldOfVisionTriggerActive,
                                trigger: "onExitFieldOfVision"
                            },
                            onClick: {
                                type: "trigger",
                                active: this._onClickTriggerActive,
                                trigger: "onClick"
                            },
                            "visible (artificial property)": this._visible,
                            "Toggle Visibility": {
                                type: "bridgecall",
                                interfaceObject: "AR.i.arObjectInterface",
                                functionName: "toggleVisibility"
                            }
                        }
                    }
                }
            });
            AR.ADE.instance.alertCreation(a.objectId)
        }
    };
    AR.i.radarInterface = {
        _enabled: false,
        _background: null,
        _positionX: 0,
        _positionY: 0,
        _width: 0,
        _centerX: 0.5,
        _centerY: 0.5,
        _radius: 0.5,
        _maxDistance: -1,
        _onClickTriggerActive: false,
        _northIndicatorImage: null,
        _northIndicatorRadius: 0.5,
        setEnabled: function(a) {
            AR.i.radarInterface._enabled = a.enabled;
            AR.ADE.instance.alertModification("radar")
        },
        setBackground: function(a) {
            AR.i.radarInterface._background = a.backgroundId;
            AR.ADE.instance.alertModification("radar")
        },
        setPositionX: function(a) {
            AR.i.radarInterface._positionX = a.positionX;
            AR.ADE.instance.alertModification("radar")
        },
        setPositionY: function(a) {
            AR.i.radarInterface._positionY = a.positionY;
            AR.ADE.instance.alertModification("radar")
        },
        setWidth: function(a) {
            AR.i.radarInterface._width = a.width;
            AR.ADE.instance.alertModification("radar")
        },
        setCenterX: function(a) {
            AR.i.radarInterface._centerX = a.centerX;
            AR.ADE.instance.alertModification("radar")
        },
        setCenterY: function(a) {
            AR.i.radarInterface._centerY = a.centerY;
            AR.ADE.instance.alertModification("radar")
        },
        setRadius: function(a) {
            AR.i.radarInterface._radius = a.radius;
            AR.ADE.instance.alertModification("radar")
        },
        setMaxDistance: function(a) {
            AR.i.radarInterface._maxDistance = a.maxDistance;
            AR.ADE.instance.alertModification("radar")
        },
        setNorthIndicatorImage: function(a) {
            AR.i.radarInterface._northIndicatorImage = a.northIndicatorImageId;
            AR.ADE.instance.alertModification("radar")
        },
        setNorthIndicatorRadius: function(a) {
            AR.i.radarInterface._northIndicatorRadius = a.northIndicatorRadius;
            AR.ADE.instance.alertModification("radar")
        },
        setOnClickTriggerActive: function(a) {
            AR.i.radarInterface._onClickTriggerActive = a.onClickTriggerActive;
            AR.ADE.instance.alertModification("radar")
        },
        explain: function() {
            return {
                type: "radar",
                properties: {
                    enabled: AR.i.radarInterface._enabled,
                    background: {
                        type: "id",
                        value: AR.i.radarInterface._background
                    },
                    positionX: AR.i.radarInterface._positionX,
                    positionY: AR.i.radarInterface._positionY,
                    width: AR.i.radarInterface._width,
                    centerX: AR.i.radarInterface._centerX,
                    centerY: AR.i.radarInterface._centerY,
                    radius: AR.i.radarInterface._radius,
                    maxDistance: AR.i.radarInterface._maxDistance < 0 ? undefined : AR.i.radarInterface._maxDistance,
                    "northIndicator.image": {
                        type: "id",
                        value: AR.i.radarInterface._northIndicatorImage
                    },
                    "northIndicator.radius": AR.i.radarInterface._northIndicatorRadius,
                    onClick: {
                        type: "trigger",
                        active: AR.i.radarInterface._onClickTriggerActive,
                        trigger: "onClick"
                    }
                }
            }
        }
    }
};