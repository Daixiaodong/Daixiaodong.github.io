var screenScale = 1;
onScreenResize = function() {
    var shellWidth = 1024;
    var shellHeight = 740;
    var newShellHeight;
    var newShellWidth;
    var agent = navigator.userAgent.toLowerCase();
    var is_ipad = agent.indexOf("ipad") != -1;
    var actWid = Number($(window).width());
    var actHgt = Number($(window).height());
    if (actHgt < actWid) {
        newShellHeight = actHgt;
        var scale = Number(shellHeight / newShellHeight);
        newShellWidth = shellWidth / shellHeight * newShellHeight;
        var _aleft = $(window).width() / 2 - Number(newShellWidth) / 2;
        if (_aleft < 0) {
            newShellWidth = actWid;
            scale = Number(shellWidth / newShellWidth);
            newShellHeight = shellHeight / shellWidth * newShellWidth
        }
    } else {
        newShellWidth = actWid;
        var scale = Number(shellWidth / newShellWidth);
        newShellHeight = shellHeight / shellWidth * newShellWidth
    }
    screenScale = 1 / scale;
    if (screenScale < .6) {
        screenScale = .6
    }
    var _left = $(window).width() / 2 - Number(newShellWidth) / 2;
    var _top = $(window).height() / 2 - Number(newShellHeight) / 2
};
$(document).ready(function(e) {
    onScreenResize()
});

var dkScreenResize = function(_obj) {
    return parseFloat(_obj) * screenScale
};

var globalResizeCalc = function(_obj) {
    return parseFloat(_obj) * screenScale
};
var getRandomNum = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
};
var BrowserDetect = {
    Android: function() {
        return navigator.userAgent.match(/Android/i) ? true: false
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true: false
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true: false
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) ? true: false
    },
    Windows_surface: function() {
        return navigator.userAgent.match(/Trident/i) && navigator.userAgent.match(/Tablet/i) ? true: false
    },
    any: function() {
        return BrowserDetect.Android() || BrowserDetect.BlackBerry() || BrowserDetect.iOS() || BrowserDetect.Windows()
    },
    ie9: function() {
        return navigator.userAgent.match(/MSIE 9.0/i) ? true: false
    },
    ie10: function() {
        return navigator.userAgent.match(/MSIE 10.0/i) ? true: false
    },
    ie: function() {
        return navigator.userAgent.match(/MSIE/i) || navigator.userAgent.match(/Trident/i) ? true: false
    },
    FF: function() {
        return typeof InstallTrigger !== "undefined"
    },
    safari: function() {
        return navigator.userAgent.match(/Safari/i) ? true: false
    }
};
if (typeof console == "undefined") {
    window.console = {
        log: function() {}
    }
}
this.onWindowMouseUp = function() {
    $(window).trigger("mouseup");
    $(document).trigger("mouseup")
};
$(document).bind("keypress",
function(e) {
    var $focused = $(":focus");
    if ($focused.prop("tagName") != "INPUT" && $focused.prop("tagName") != "TEXTAREA" && !$focused.attr("contenteditable")) {
        e.preventDefault()
    }
});
function GlobalCodeOnInit() {
    $("body").append('<a id="falseclickforblur"></a>')
}
function focusOutInput() {
    $("#falseclickforblur").focus()
}
var trace = function(str) {
    0
};
if (typeof MathJax != "undefined") {
    MathJax.Hub.Config({
        extensions: ["tex2jax.js"],
        jax: ["input/TeX", "output/HTML-CSS"],
        tex2jax: {
            inlineMath: [["$", "$"], ["\\(", "\\)"]],
            displayMath: [["$$", "$$"], ["\\[", "\\]"]],
            processEscapes: true
        },
        showMathMenu: false,
        showProcessingMessages: false,
        messageStyle: "none",
        displayAlign: "left"
    })
}
function nDash(_num) {
    return Number(_num) < 0 ? "–" + Math.abs(Number(_num)) : _num
}
var GlobalAnimClass = function() {
    var animObjects = new Object;
    var _thisObj = this;
    var animPlaying = false;
    var requestId;
    this.start = function(_obj) {
        if (_obj.id) {
            animObjects[_obj.id] = _obj;
            if (!_obj.immediate) {
                animObjects[_obj.id].oldDate = new Date
            }
            animObjects[_obj.id].start ? animObjects[_obj.id].start() : null
        }
        if (!animPlaying) {
            animPlaying = true;
            enterFrame()
        }
    };
    this.stop = function(_id) {
        if (_id) {
            if (animObjects[_id]) {
                animObjects[_id].stop ? animObjects[_id].stop() : null;
                animObjects[_id] != undefined ? delete animObjects[_id] : null
            }
        }
        if (objectSize(animObjects) == 0) {
            animPlaying = false;
            cancelAnimationFrame(requestId)
        }
    };
    this.setFps = function(_id, _fps) {
        if (_id) {
            if (animObjects[_id]) {
                animObjects[_id].fps = _fps
            }
        }
    };
    function enterFrame() {
        var _newDate = new Date;
        for (var i in animObjects) {
            if (typeof animObjects[i] != "undefined") {
                if (animObjects[i].delay != undefined) {
                    if (typeof animObjects[i].oldDate == "undefined" || _newDate - animObjects[i].oldDate >= animObjects[i].delay) {
                        animObjects[i].oldDate = _newDate;
                        animObjects[i].frame ? animObjects[i].frame(i) : null
                    }
                } else if (animObjects[i].fps != undefined) {
                    if (typeof animObjects[i].oldDate == "undefined" || _newDate - animObjects[i].oldDate >= 1e3 / animObjects[i].fps) {
                        animObjects[i].oldDate = _newDate;
                        animObjects[i].frame ? animObjects[i].frame(i) : null
                    }
                }
            }
        }
        if (animPlaying) {
            requestId = requestAnimationFrame(enterFrame)
        }
    }
    function objectSize(obj) {
        var size = 0,
        key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++
        }
        return size
    } (function() {
        var lastTime = 0;
        var vendors = ["webkit", "moz"];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
            window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"]
        }
        if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
            var currTime = (new Date).getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall)
            },
            timeToCall);
            lastTime = currTime + timeToCall;
            return id
        };
        if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
            clearTimeout(id)
        }
    })()
};
var globalAnimClassObject = new GlobalAnimClass;
var ExportToAPI = function() {
    var imageDiv, msgBox;
    this.exportCSV = function(data) {
        msgBox = new MsgBoxComp;
        msgBox.init();
        if (BrowserDetect.ie9()) {
            msgBox.showMsg(GetGlobalTooltip("snapshot", "messageie9data"));
            return false
        }
        msgBox.showMsg("Processing table data.", true);
        var _str = new Array;
        var _href = location.href.split(":")[0];
        if (data != false) {
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].length; j++) {
                    var _tempStr = data[i][j].trim();
                    if (_tempStr.indexOf(",") != -1) data[i][j] = '"' + _tempStr + '"';
                    else data[i][j] = _tempStr
                }
                _str.push(data[i].toString())
            }
            _str = _str.join("\n")
        } else {
            _str = "There is no data in table"
        }
        $.ajax({
            type: "POST",
            crossDomain: "true",
            url: _href + "://api.explorelearning.com/api/v3/Gizmos/post-spreadSheet",
            data: {
                preview: "false",
                delimitedStr: _str
            },
            error: function() {
                alert("Error loading link (http://api.explorelearning.com/api/v3/Gizmos/post-spreadSheet).")
            },
            success: function(data, a, b) {
                if (typeof data.CSVLOC != "undefined") {
                    if (BrowserDetect.any()) {
                        if (!window.open(data.CSVLOC.replace(/\\/g, ""), "_blank")) {
                            msgBox.showMsg("Pop-up is blocked in your browser. Please go to settings and select allow pop-up.")
                        }
                    } else {
                        if (BrowserDetect.ie() || BrowserDetect.FF() || BrowserDetect.safari()) {
                            if (!window.open(data.CSVLOC.replace(/\\/g, ""), "_blank")) {
                                msgBox.showMsg("Pop-up is blocked in your browser. Please go to settings and select allow pop-up.")
                            }
                        } else {
                            location.href = data.CSVLOC.replace(/\\/g, "")
                        }
                    }
                    msgBox.hideMsg()
                } else {
                    0;
                    msgBox.showMsg("Processing table data ERROR.")
                }
            }
        })
    };
    this.exportImage = function(_obj) {
        msgBox = new MsgBoxComp;
        msgBox.init();
        if (BrowserDetect.ie9()) {
            msgBox.showMsg(GetGlobalTooltip("snapshot", "messageie9"));
            $.event.trigger({
                type: "commonCameraRenderDone"
            });
            return false
        }
        msgBox.showMsg(GetGlobalTooltip("snapshot", "processscrmessage"), true);
        var _href = location.href.split(":")[0];
        setTimeout(function() {
            var areaObj = {
                x: 0,
                y: 0,
                width: 1024,
                height: 680
            };
            if (_obj) {
                for (var i in _obj) {
                    areaObj[i] = _obj[i]
                }
            } else {
                areaObj.x = globalResizeCalc(areaObj.x);
                areaObj.y = globalResizeCalc(areaObj.y);
                areaObj.width = globalResizeCalc(areaObj.width);
                areaObj.height = globalResizeCalc(areaObj.height)
            }
            html2canvas(document.getElementsByClassName("desktop")[0], {
                onrendered: function(canvas) {
                    var _actCtx = canvas.getContext("2d");
                    var _cnv = document.createElement("canvas");
                    var _ctx = _cnv.getContext("2d");
                    _cnv.width = areaObj.width;
                    _cnv.height = areaObj.height;
                    _ctx.putImageData(_actCtx.getImageData(0, 0, canvas.width, canvas.height), -1 * areaObj.x, -1 * areaObj.y);
                    $.ajax({
                        type: "POST",
                        url: _href + "://api.explorelearning.com/api/v3/Gizmos/post-screenCapture",
                        data: {
                            imgByte: _cnv.toDataURL("image/png")
                        },
                        error: function() {
                            alert("Error loading link (http://api.explorelearning.com/api/v3/Gizmos/post-screenCapture).")
                        },
                        success: function(data, a, b) {
                            if (typeof data.IMAGELOC == "undefined") {
                                0;
                                msgBox.showMsg("Processing snapshot ERROR.")
                            } else {
                                var _img5Obj = new Image;
                                _img5Obj.onload = function() {
                                    showScreenShot(_img5Obj.src, areaObj);
                                    $.event.trigger({
                                        type: "commonCameraRenderDone"
                                    })
                                };
                                _img5Obj.src = data.IMAGELOC.replace(/\\/g, "")
                            }
                        }
                    })
                }
            })
        },
        100)
    };
    function showScreenShot(data, _obj) {
        imageDiv = document.createElement("div");
        $("body").append(imageDiv);
        $(imageDiv).css({
            position: "absolute",
            top: "0px",
            left: "0px",
            width: globalResizeCalc(1024) + "px",
            height: globalResizeCalc(680) + "px",
            "z-index": "103",
            background: "rgba(0,0,0,0)"
        });
        var _closeDiv = document.createElement("div");
        $(imageDiv).append(_closeDiv);
        $(_closeDiv).css({
            position: "absolute",
            top: "0px",
            right: "0px",
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.7)"
        });
        var _img = document.createElement("img");
        $(imageDiv).append(_img);
        $(_img).attr("src", data);
        var scaleFactor = .8;
        $(_img).css({
            position: "absolute",
            top: "50%",
            left: "50%",
            width: _obj.width * scaleFactor + "px",
            height: _obj.height * scaleFactor + "px",
            "margin-left": "-" + _obj.width * scaleFactor / 2 + "px",
            "margin-top": "-" + (_obj.height * scaleFactor / 2 + globalResizeCalc(5)) + "px",
            "image-rendering": "optimizeSpeed",
            "image-rendering": "-moz-crisp-edges",
            "image-rendering": "-webkit-optimize-contrast",
            "image-rendering": "-o-crisp-edges",
            "image-rendering": "optimize-contrast"
        });
        var _disclaimer = document.createElement("div");
        $(imageDiv).append(_disclaimer);
        $(_disclaimer).html(GetGlobalTooltip("snapshot", "messagepanel"));
        $(_disclaimer).css({
            position: "absolute",
            bottom: globalResizeCalc(26) + "px",
            left: "0px",
            width: "100%",
            color: "#FFFFFF",
            "text-align": "center",
            cursor: "default"
        });
        var _close = document.createElement("img");
        $(imageDiv).append(_close);
        $(_close).attr("src", "./images/snapclose.png");
        $(_close).css({
            position: "absolute",
            top: "20px",
            right: "20px",
            width: globalResizeCalc(32) + "px",
            height: globalResizeCalc(32) + "px",
            cursor: "pointer"
        });
        if (BrowserDetect.any()) {
            $(_close).unbind("touchstart", closeAudio).bind("touchstart", closeAudio).unbind("touchend", closeAudio).bind("touchend", closeAudio)
        } else {
            $(_close).unbind("mousedown", closeAudio).bind("mousedown", closeAudio)
        }
        $(_close).unbind("click", closeScreenShot).bind("click", closeScreenShot);
        msgBox.hideMsg()
    }
    function closeScreenShot(e) {
        $.event.trigger({
            type: "screenShotClosed"
        });
        $(imageDiv).remove()
    }
    function closeAudio(e) {
        if (e.type == "mousedown" || e.type == "touchstart") {
            audioPlayerObj.playAudio("down");
            if (e.type == "mousedown") {
                $(document).unbind("mouseup", closeAudio).bind("mouseup", closeAudio)
            }
        } else if (e.type == "mouseup" || e.type == "touchend") {
            audioPlayerObj.playAudio("up");
            $(document).unbind("mouseup", closeAudio)
        }
    }
};
var exportToApiObj = new ExportToAPI;
function passEventIE(target, eventType, forwarded) {
    $(target).unbind(eventType).bind(eventType,
    function(e) {
        listener(e, forwarded)
    });
    function listener(e, forwarded) {
        var tempArr = [];
        $(forwarded + " div").each(function(index, element) {
            var refDiv = $(this);
            var divX = refDiv.offset().left;
            var divY = refDiv.offset().top;
            var divW = refDiv.width();
            var divH = refDiv.height();
            if (e.pageX >= divX && divX + divW >= e.pageX && e.pageY >= divY && divY + divH >= e.pageY) {
                tempArr.push(refDiv)
            }
        });
        if (tempArr.length > 0) tempArr[tempArr.length - 1].trigger(e.type)
    }
}
var PreloadImagesCls = function() {
    var imgObj = new Object;
    var totalImages = 0;
    var imagesLoaded = 0;
    var callBack, preLoadDiv;
    this.loadImages = function(_arr, _cb) {
        callBack = _cb;
        totalImages = _arr.length;
        for (var i = 0; i < _arr.length; i++) {
            var j = _arr[i].split("/").reverse()[0].split(".")[0];
            imgObj[j] = new Image;
            imgObj[j].onload = loadedFn;
            imgObj[j].src = _arr[i]
        }
        preLoadDiv = document.createElement("div");
        $("body").append(preLoadDiv);
        $(preLoadDiv).css({
            background: "url(../images/loading.gif) no-repeat",
            width: globalResizeCalc(1024) + "px",
            height: globalResizeCalc(740) + "px",
            "background-position": "center"
        })
    };
    this.getImage = function(_img) {
        return imgObj[_img]
    };
    function loadedFn() {
        imagesLoaded++;
        if (imagesLoaded >= totalImages - 1) {
            $(preLoadDiv).remove();
            $(preLoadDiv).hide();
            if (callBack) {
                callBack();
                callBack = null
            }
        }
    }
};
var preloadImagesObj = new PreloadImagesCls;
function addPointerGrabbing(_bool) {
    _bool ? $("div,img,canvas,input,td,a").addClass("commongrabbing") : $("div,img,canvas,input,td,a").removeClass("commongrabbing")
}

function GetGlobalTooltip(_obj, _elem) {
    return BrowserDetect.any() || BrowserDetect.Windows_surface() ? GlobalToolTipObj[_obj][_elem].devices: GlobalToolTipObj[_obj][_elem].browsers
}
function GCTConv(_str) {
    return BrowserDetect.any() || BrowserDetect.Windows_surface() ? _str.split("click").join("tap").split("Click").join("Tap") : _str
}
CanvasRenderingContext2D.prototype.dashedLine = function(x1, y1, x2, y2, dashLen) {
    if (dashLen == undefined) dashLen = 2;
    this.moveTo(x1, y1);
    var dX = x2 - x1;
    var dY = y2 - y1;
    var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
    var dashX = dX / dashes;
    var dashY = dY / dashes;
    var q = 0;
    while (q++<dashes) {
        x1 += dashX;
        y1 += dashY;
        this[q % 2 == 0 ? "moveTo": "lineTo"](x1, y1)
    }
    this[q % 2 == 0 ? "moveTo": "lineTo"](x2, y2)
};
function getHCF(m, n) {
    var temp, remainder;
    if (m == 0) return m;
    if (m < n) {
        temp = m;
        m = n;
        n = temp
    }
    while (1) {
        remainder = m % n;
        if (remainder == 0) return n;
        else m = n;
        n = remainder
    }
}
function getMinimizedFraction(cur_num, cur_den) {
    var hcf = getHCF(cur_num, cur_den);
    var numerator = 0,
    denominator = 0;
    if (hcf > 1) {
        numerator = cur_num / hcf;
        denominator = cur_den / hcf
    } else if (cur_num == cur_den) {
        numerator = 1;
        denominator = 1
    } else {
        numerator = cur_num;
        denominator = cur_den
    }
    if (numerator == cur_num && denominator == cur_den) flag = true;
    else flag = false;
    return {
        n: numerator,
        d: denominator,
        flag: flag
    }
}
Number.prototype.noExponents = function() {
    var data = String(this).split(/[eE]/);
    if (data.length == 1) return data[0];
    var z = "",
    sign = this < 0 ? "-": "",
    str = data[0].replace(".", ""),
    mag = Number(data[1]) + 1;
    if (mag < 0) {
        z = sign + "0.";
        while (mag++) z += "0";
        return z + str.replace(/^\-/, "")
    }
    mag -= str.length;
    while (mag--) z += "0";
    return str + z
};
function moveArrayElement(_arr, old_index, new_index) {
    if (new_index >= _arr.length) {
        var k = new_index - _arr.length;
        while (k--+1) {
            _arr.push(undefined)
        }
    }
    _arr.splice(new_index, 0, _arr.splice(old_index, 1)[0])
}
function katexFilter(_str) {
    _str = _str.replace(/\\boldsymbol/g, "");
    _str = _str.replace(/\\bullet/g, "\\cdot");
    _str = _str.replace(/\\bf/g, "");
    _str = _str.replace(/\•/g, "\\cdot");
    _str = _str.replace(/\–/g, "-");
    _str = _str.replace(/\&ndash;/g, "-");
    _str = _str.replace(/π/g, "\\pi");
    return _str
}
function printKatex(elem, txt) {
    if (String(txt).indexOf("\\begin{equation}") != -1) {
        txt = txt.split("\\begin{equation}")[1].split("\\end{equation}")[0];
        txt = katexFilter(txt);
        katex.render(txt, elem);
        $(elem).css({
            opacity: 1
        })
    }
}
function _floatPrecision(num, fixedVal) {
    var multiplier = Math.pow(10, fixedVal);
    return Number((num * multiplier).toFixed(0) / multiplier)
}
function _granularity(variable, granVal) {
    var _n = variable % granVal;
    if (Math.abs(_n) > granVal / 2) {
        if (variable > 0) {
            _graddedval = variable - _n + granVal
        } else {
            _graddedval = variable - _n - granVal
        }
    } else {
        _graddedval = variable - _n
    }
    return _graddedval
}
function hexToRgba(sent_hex, opacity) {
    var hex, resultStr, colors = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        "indianred ": "#cd5c5c",
        "indigo ": "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgrey: "#d3d3d3",
        lightgreen: "#90ee90",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370d8",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#d87093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
    };
    sent_hex = sent_hex.toLowerCase().replace(" ", "");
    opacity = opacity == undefined ? 1 : opacity;
    if (colors.hasOwnProperty(sent_hex)) {
        hex = colors[sent_hex].substr(1);
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);
        resultStr = {
            r: r,
            g: g,
            b: b,
            a: opacity
        }
    } else if (!sent_hex.match(/^#?([0-9A-Fa-f]){3}\s*$|^#?([0-9A-Fa-f]){6}\s*$/)) {
        resultStr = "Invalid HEX value or color name"
    } else {
        hex = sent_hex.charAt(0) === "#" ? sent_hex.substr(1) : sent_hex;
        switch (hex.length) {
        case 6:
            var r = parseInt(hex.substring(0, 2), 16);
            var g = parseInt(hex.substring(2, 4), 16);
            var b = parseInt(hex.substring(4, 6), 16);
            break;
        case 3:
            var r = parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16);
            var g = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16);
            var b = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16);
            break
        }
        resultStr = {
            r: r,
            g: g,
            b: b,
            a: opacity
        }
    }
    return resultStr
}
function detect3dSupport() {
    var is3dSupported = Detector.webgl;
    if (!is3dSupported) {
        var disabler = document.createElement("div");
        $(disabler).css({
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.8)",
            "z-index": "10000",
            "font-size": "2em",
            "text-align": "center",
            color: "rgba(255, 255, 255, 1)",
            "padding-top": "25%"
        }).html("Your browser, operating system, or computer hardware doesn't seem to support WebGL which is required to view this Gizmo. Contact ExploreLearning for more information.");
        $("body").append(disabler)
    }
    return is3dSupported
}
var _originalLogCopy = console.log;
function enableConsole(flag) {
    if (flag) {
        console.log = _originalLogCopy
    } else {
        console.log = function() {}
    }
}

function dkRoundRect( ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == "undefined") {
        stroke = true;
    }
    if (typeof radius === "undefined") {
        radius = 5;
    }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y+ height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (stroke) {
        ctx.stroke();
    }
    if (fill) {
        ctx.fill();
    }
}

function dkRoundRectBt( ctx, x, y, width, height, radius, colorbt,colorlt,colorbr,state,playmode) {
	var _tcolor;
	if (state==0 || state=="undefined"){
//		ctx.fillStyle = colorbt;
		_tcolor = "#444444";
		var cgrd = ctx.createLinearGradient(0,y+height*2/3,0,y+height-dkScreenResize(2));
		cgrd.addColorStop(0,colorbt);
		cgrd.addColorStop(0.6,"#BBBBBB");
		cgrd.addColorStop(1,"#EEEEEE");
		ctx.fillStyle = cgrd;
	}else if (state==1){
		ctx.fillStyle = "#777777";
		_tcolor = "#FFFFFF";
	}else if (state==2){
		ctx.fillStyle = "#CCCCCC";
		_tcolor ="#AAAAAA";
	}
	dkRoundRect( ctx, x, y, width, height, radius, true, false);

	if (state !=1){
	    ctx.beginPath();
	    ctx.strokeStyle = colorlt;
	    ctx.beginPath();
	    ctx.arc(x + width - radius, y + radius,  radius,  1.75*Math.PI,1.5*Math.PI,true);
	    ctx.moveTo(x + width - radius, y);
	    ctx.lineTo(x + radius, y);
	    ctx.quadraticCurveTo(x, y, x , y + radius);
	    ctx.lineTo(x, y + height-radius);
	    ctx.arc(x + radius, y + height- radius,radius, Math.PI,0.75*Math.PI,true);
	    ctx.stroke();

	    ctx.beginPath();
		ctx.strokeStyle = colorbr;
	    ctx.arc(x + width - radius, y + radius, radius, 1.75*Math.PI,2*Math.PI,false);
	    ctx.moveTo(x + width , y+ radius);
	    ctx.lineTo(x + width,  y + height - radius);
	    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y+ height);
	    ctx.lineTo(x + radius, y + height);
	    ctx.arc(x + radius, y + height- radius, radius, 0.5*Math.PI,0.75*Math.PI,false );
	    ctx.stroke();
   	}
	if (playmode == "play"){
	    dkDrawArrow(ctx, x+width/2-dkScreenResize(3), y+height/2-dkScreenResize(1), x+width/2+dkScreenResize(8), y+height/2-dkScreenResize(1),
	    	_tcolor, dkScreenResize(1), 2);
	}
	if (playmode == "pause"){
		ctx.fillStyle = _tcolor;
		ctx.fillRect(x+width/2-dkScreenResize(7), y+height/2-dkScreenResize(9),dkScreenResize(5),dkScreenResize(17));
		ctx.fillRect(x+width/2+dkScreenResize(2), y+height/2-dkScreenResize(9),dkScreenResize(5),dkScreenResize(17));
	}
	if (playmode == "reset"){
		ctx.beginPath();
		ctx.StrokeStyle = _tcolor;
   		ctx.lineWidth = dkScreenResize(5);
   		ctx.lineCap = "round";
		ctx.arc( x+width/2, y+ height/2 + dkScreenResize(1), dkScreenResize(8), 0.75*Math.PI, 1.4*Math.PI,true);
		ctx.stroke();
	    dkDrawArrow(ctx, x+width/2-dkScreenResize(4), y+height/2-dkScreenResize(6), x+width/2-dkScreenResize(12), y+height/2-dkScreenResize(4),
	    	_tcolor, dkScreenResize(1), 1);
	}
}

function dkPlainBt( ctx, x, y, width, height, radius, colorbt,colorbd,state,playmode) {
	if (state == 0){
		ctx.strokeStyle = colorbd;
		ctx.fillStyle = colorbt;
	}else if (state==1){
		ctx.strokeStyle = "#FFFFFF";
		ctx.fillStyle = colorbd;
	}else if (state==2){
		ctx.strokeStyle = "#CCCCCC";
		ctx.fillStyle = colorbt;
	}

	ctx.beginPath();
	ctx.moveTo(width+x-radius,y);
	ctx.lineTo(radius+x,y);
	ctx.arc(radius+x,radius+y,radius,Math.PI*3/2,Math.PI/2,true);
	ctx.moveTo(radius+x,height+y);
	ctx.lineTo(width+x-radius,height+y);
	ctx.arc(width-radius+x, radius+y, radius,Math.PI/2,Math.PI*3/2,true);
	ctx.stroke();

	ctx.fillStyle = colorbd;
	if (playmode == "play"){
	    dkDrawArrow(ctx, x+width/2-dkScreenResize(3), y+height/2, x+width/2+dkScreenResize(8), y+height/2,
	    	colorbd, dkScreenResize(1), 2);
	}
	if (playmode == "pause"){
		ctx.fillRect(x+width/2-dkScreenResize(7), y+height/2-dkScreenResize(8),dkScreenResize(5),dkScreenResize(16));
		ctx.fillRect(x+width/2+dkScreenResize(2), y+height/2-dkScreenResize(8),dkScreenResize(5),dkScreenResize(16));
	}
	if (playmode == "reset"){
		ctx.beginPath();
   		ctx.lineWidth = dkScreenResize(4);
   		ctx.lineCap = "round";
		ctx.arc( x+width/2, y+ height/2 + dkScreenResize(1), dkScreenResize(8), 0.75*Math.PI, 1.3*Math.PI,true);
		ctx.stroke();
	    dkDrawArrow(ctx, x+width/2-dkScreenResize(4), y+height/2-dkScreenResize(6), x+width/2-dkScreenResize(12), y+height/2-dkScreenResize(1),
	    	colorbd, dkScreenResize(1), 1);
	}
}

function dkDrawArrow(ctx, arrowX1, arrowY1, arrowX2, arrowY2, color, lineWidth, arrowSize, text, textLoc) {
    var arrowAng = Maths.getAngle({
        x: arrowX1,
        y: arrowY1
    },
    {
        x: arrowX2,
        y: arrowY2
    });
    var lineW = 2;
    var ar1=10;
    var ar2= 4;
    ctx.save();
    ctx.beginPath();
    ctx.translate(arrowX2, arrowY2);
    ctx.rotate(arrowAng * Math.PI / 180);
    ctx.translate( - arrowX2, -arrowY2);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    if (arrowSize==0) {
        lineW = dkScreenResize(1.5);
        ar1 = dkScreenResize(7);
        ar2 = dkScreenResize(3);
    }else if (arrowSize==1) {
        lineW = dkScreenResize(2);
        ar1 = dkScreenResize(9);
        ar2 = dkScreenResize(4);
    }else if (arrowSize==2){
        lineW = dkScreenResize(3);
        ar1 = dkScreenResize(12);
        ar2 = dkScreenResize(5.5);
    }else if (arrowSize==3){
        lineW = dkScreenResize(5);
        ar1 = dkScreenResize(18);
        ar2 = dkScreenResize(8);
    }
    ctx.moveTo(arrowX2, arrowY2);
    ctx.lineTo(arrowX2 + dkScreenResize(ar1), arrowY2 + dkScreenResize(ar2));
    ctx.lineTo(arrowX2 + dkScreenResize(ar1), arrowY2 - dkScreenResize(ar2));
    ctx.lineTo(arrowX2, arrowY2)
    ctx.lineWidth = lineW;
    ctx.lineCap = "round";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
	ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
  	ctx.moveTo(arrowX1, arrowY1);
  	ctx.lineTo(arrowX2, arrowY2);
    ctx.stroke();
	ctx.closePath();
    if (!text) return;
    ctx.beginPath();
    ctx.font = "normal " + dkScreenResize(16) + "px Arial";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
	if  (textLoc>0){
	    ctx.textBaseline = "bottom";
	}
	var dim = ctx.measureText(text);
    var _ht = dim.width / 2;
    var _top = dkScreenResize(5);
    if ( arrowSize==2) {
        _top = dkScreenResize(8)
    }else  if (arrowSize==3) {
        _top = dkScreenResize(10)
    }
    if (textLoc>0){
	    ctx.fillText(text, arrowX2 - dkScreenResize(5),  arrowY2 - _top/2 );
	}else{
	    ctx.fillText(text, arrowX2 - dkScreenResize(5),  arrowY2 + _top );
    }
    ctx.closePath();
    ctx.restore()
}

function dkDrawBall(ctx,x,y,r,color,plain,text,tsize,tcolor,tloc){
    var _r = dkScreenResize(r);
   	ctx.fillStyle = color;
	if (!plain){
		var cgrd = ctx.createRadialGradient(x-_r/2,y-_r/2, 0, x-_r/2,y-_r/2, _r/2 );
		cgrd.addColorStop(0,"#DDDDDD");
		cgrd.addColorStop(1,color);
		ctx.fillStyle = cgrd;
	}
	ctx.beginPath();
   	ctx.arc( x ,y , _r , 0 , 2*Math.PI , true );
    ctx.fill();
	if (text){
   	   	ctx.beginPath();
		ctx.fillStyle = tcolor;
		ctx.font = "bold "+String(dkScreenResize(tsize))+"px consolas";
   	   	ctx.textAlign = 'center';
   		ctx.textBaseline = 'top';
   		ctx.closePath();
   		var _x,_y;
   		switch (tloc){
   			case 0:
   				_x = x;
   				_y = y-_r*1.3-dkScreenResize(tsize);
   				break;
   			case 1:
   				_x = x + r*1.3;
   				_y = y;
   				break;
   			case 2:
   				_x = x;
   				_y = y+_r*1.3;
   				break;
   			case 3:
   				_x = x -r*1.3 -dkScreenResize(tsize)/2;
   				_y = y-_r*1.3-dkScreenResize(tsize);
   				break;
   			default:
   				_x = x;
   				_y = y+_r*1.3;
   				break;
   		}
  		ctx.fillText(text,_x,_y );
   }
}

function dkDrawLine(ctx,x1,y1,x2,y2,w,color,dash1,dash2, lineCap){
    ctx.save();
   	ctx.beginPath();
   	ctx.strokeStyle = color;
    ctx.lineWidth = dkScreenResize(w);
    if (lineCap){
	    ctx.lineCap = lineCap;
    }
    if (dash1 && dash2){
  	    ctx.setLineDash([dkScreenResize(dash1),dkScreenResize(dash2)]);
    }
	ctx.moveTo( x1, y1 );
	ctx.lineTo( x2, y2);
   	ctx.stroke();
   	ctx.restore();
}

function dkDrawCircle(ctx,x,y,r,w,color,dash1,dash2,ang1,ang2,cw){
    ctx.save();
    ctx.beginPath();
   	ctx.strokeStyle = color;
    ctx.lineWidth = dkScreenResize(w);
    if (dash1!=undefined && dash2!= undefined){
	    ctx.setLineDash([dkScreenResize(dash1),dkScreenResize(dash2)]);
    }
    if (ang1!=undefined && ang2!=undefined && cw!=undefined){
		ctx.arc(x,y,r,ang1,ang2,cw);
    }else{
		ctx.arc(x,y,r,0,2*Math.PI,true);
    }
   	ctx.stroke();
   	ctx.restore();
}

var GlobalToolTipObj = {
	tooltip:
	{
		arrow:
		{
			browsers: "Draggable arrows. Double-click to return to drawer.",
			devices: "Draggable arrows. Drag back to the logo to return to drawer."
		},
		tablescroll:
		{
			browsers: "Drag to scroll the table.",
			devices: "Drag to scroll the table."
		},
		tabs:
		{
			browsers: "Click to select this tab.",
			devices: "Tap to select this tab."
		},
		camera:
		{
			browsers: "Take a screenshot of this area of the Gizmo.",
			devices: "Take a screenshot of this area of the Gizmo."
		},
		increase:
		{
			browsers: "Zoom in.",
			devices: "Zoom in."
		},
		reset:
		{
			browsers: "Reset zoom level.",
			devices: "Reset zoom level."
		},
		decrease:
		{
			browsers: "Zoom out.",
			devices: "Zoom out."
		},
		subm:
		{
			browsers: "Select zoom type.",
			devices: "Select zoom type."
		},
		panx:
		{
			browsers: "Select horizontal zooming.",
			devices: "Select horizontal zooming."
		},
		pany:
		{
			browsers: "Select vertical zooming.",
			devices: "Select vertical zooming."
		},
		panxy:
		{
			browsers: "Select standard zooming.",
			devices: "Select standard zooming."
		},
		playBtn:
		{
			browsers: "Start simulation.",
			devices: "Start simulation."
		},
		pauseBtn:
		{
			browsers: "Pause simulation.",
			devices: "Pause simulation."
		},
		resetBtn:
		{
			browsers: "Reset simulation.",
			devices: "Reset simulation."
		},
		fastforwardBtn:
		{
			browsers: "Forward simulation.",
			devices: "Forward simulation."
		},
		rewindBtn:
		{
			browsers: "Rewind simulation.",
			devices: "Rewind simulation."
		},
		nextBtn:
		{
			browsers: "Next simulation.",
			devices: "Next simulation."
		},
		prevBtn:
		{
			browsers: "Previous simulation.",
			devices: "Previous simulation."
		},
		sliderKnob:
		{
			browsers: "Drag to change the value.",
			devices: "Drag to change the value."
		},
		dataPoint:
		{
			browsers: "Drag to move the point.",
			devices: "Drag to move the point."
		},
		graphArea:
		{
			browsers: "Drag to pan the grid.",
			devices: "Drag to pan the grid."
		},
		genricClick:
		{
			browsers: "Click to activate.",
			devices: "Tap to activate."
		},
		textFeild:
		{
			browsers: "Type in a value and press Enter.",
			devices: "Type in a value and press Enter."
		},
		pieChart:
		{
			point : "Drag the point."
		}
	},
	alert:
	{
		help:
		{
			browsers: "Drag the Help icon from the Tools Palette to activate it.",
			devices: "Drag the Help icon from the Tools Palette to activate it."
		},
		arrow:
		{
			browsers: "Drag the Arrow icon from the Tools Palette to activate it.",
			devices: "Drag the Arrow icon from the Tools Palette to activate it."
		}
	},
	snapshot:
	{
		messageie9:
		{
			browsers: "Snapshot feature is not yet implemented on MSIE v9.",
			devices: "Snapshot feature is not yet implemented on MSIE v9."
		},
		messageie9data:
		{
			browsers: "Data Export feature is not yet implemented on MSIE v9.",
			devices: "Data Export feature is not yet implemented on MSIE v9."
		},
		messagepanel:
		{
			browsers: "Right click image to copy or download.",
			devices: "Tap and hold image to copy or download."
		},
		processscrmessage:
		{
			browsers: "Processing screenshot.",
			devices: "Processing screenshot."
		}
	}
}

function Maths() {}
Maths.TO_DEGREES = 180 / Math.PI;
Maths.TO_RADIANS = Math.PI / 180;
Maths.randomNumber = function(min, max, numOfDes, step) {
    var newRand = Math.random() * (max - min) + min;
    if (!step) return Number(newRand.toFixed(numOfDes));
    var temp = newRand + 0;
    newRand = newRand - temp % step;
    return Number(newRand.toFixed(numOfDes))
};
Maths.numberToPercent = function(number, total) {
    var a = number * 100 / total;
    return a
};
Maths.percentToNumber = function(percent, total) {
    return percent / 100 * total
};
Maths.radiansToDegrees = function(radians) {
    return radians * Maths.TO_DEGREES
};
Maths.degreesToRadians = function(degrees) {
    return degrees * Maths.TO_RADIANS
};
Maths.getDistance = function(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
};
Maths.getAngle = function(p1, p2, isRad) {
    if (isRad) return Math.atan2(p1.y - p2.y, p1.x - p2.x);
    else return Math.atan2(p1.y - p2.y, p1.x - p2.x) * Maths.TO_DEGREES
};
Maths.getAngleBtn3 = function(p0, p1, c, flag) {
    p0.x = Number(p0.x).toFixed(4) * 1;
    p0.y = Number(p0.y).toFixed(4) * 1;
    p1.x = Number(p1.x).toFixed(4) * 1;
    p1.y = Number(p1.y).toFixed(4) * 1;
    c.x = Number(c.x).toFixed(4) * 1;
    c.y = Number(c.y).toFixed(4) * 1;
    var p0c = Math.sqrt(Math.pow(c.x - p0.x, 2) + Math.pow(c.y - p0.y, 2));
    var p1c = Math.sqrt(Math.pow(c.x - p1.x, 2) + Math.pow(c.y - p1.y, 2));
    var p0p1 = Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));
    if (typeof flag != "undefined") {
        var angle_1 = Maths.getAngle(p0, c);
        angle_1 = angle_1 < 0 ? 360 + angle_1: angle_1;
        var angle_2 = Maths.getAngle(p1, c);
        angle_2 = angle_2 < 0 ? 360 + angle_2: angle_2;
        var finalAngle = angle_1 < angle_2 ? angle_2 - angle_1: 360 - angle_1 + angle_2;
        finalAngle = finalAngle == 360 ? 0 : finalAngle;
        return finalAngle
    }
    var _tempNum = (p1c * p1c + p0c * p0c - p0p1 * p0p1).toFixed(2) * 1;
    var _tempDen = (2 * p1c * p0c).toFixed(2) * 1;
    return Math.acos(_tempNum / _tempDen) * Maths.TO_DEGREES
};
Maths.isPointOnLine = function(_p, _p1, _p2, hitArea) {
    var len1 = Maths.getDistance(_p, _p1);
    var len2 = Maths.getDistance(_p, _p2);
    var _center = Maths.getMidPoint(_p1, _p2);
    var dist = Maths.getDistance(_p, _center);
    var mainDist = Maths.getDistance(_p1, _center);
    var pointAngle = Maths.getAngle(_p, _center);
    pointAngle = pointAngle < 0 ? 360 + pointAngle: pointAngle;
    var mainAngle = Maths.getAngle(_center, _p1);
    mainAngle = mainAngle < 0 ? 360 + mainAngle: mainAngle;
    var finalAngle = pointAngle - mainAngle + 90;
    var _tempP = {};
    _tempP.x = _center.x + dist * Math.cos(finalAngle * Maths.TO_RADIANS);
    _tempP.y = _center.y + dist * Math.sin(finalAngle * Maths.TO_RADIANS);
    var tempObj = {
        a: _center.x - hitArea / 2,
        b: _center.x + hitArea / 2,
        c: _center.y - mainDist,
        d: _center.y + mainDist,
        p: _tempP
    };
    if (_center.x - hitArea / 2 <= _tempP.x && _center.x + hitArea / 2 >= _tempP.x && _center.y - mainDist <= _tempP.y && _center.y + mainDist >= _tempP.y) {
        tempObj.flag = true
    } else {
        tempObj.flag = false
    }
    if (tempObj.flag) {
        if (len1 > len2) return _p2;
        else return _p1
    }
    return false
};
Maths.getMidPoint = function(_p1, _p2) {
    var newPoint = new Object;
    newPoint.x = (_p1.x + _p2.x) / 2;
    newPoint.y = (_p1.y + _p2.y) / 2;
    return newPoint
};
Maths.isPrime = function(num) {
    if (num == 1) return false;
    for (var i = 2; i < num; i++) {
        if (num % i == 0) {
            return false
        }
    }
    return true
};
Maths.trunc = function(n) {
    return n < 0 ? Math.ceil(n) : Math.floor(n)
};
Maths.frac = function(n) {
    return n - Maths.trunc(n)
};
Maths.getPoint = function(p, angle, rad) {
    var temp = new Object;
    temp.x = p.x + rad * Math.cos(angle);
    temp.y = p.y + rad * Math.sin(angle);
    return temp
};
Maths.getRound = function(num, dec) {
    var tempArr = ("" + num).split(".");
    if (tempArr[1]) {
        var str = tempArr[1];
        if (dec < str.length) {
            var newStr = "0.";
            for (var i = 0; i < dec - 1; i++) {
                newStr += "0"
            }
            if (5 <= str[dec] * 1) {
                newStr += "1"
            } else {
                newStr += "0"
            }
            num = ((tempArr[0] + "." + tempArr[1].slice(0, dec)) * 1 + Number(newStr)).toFixed(dec)
        }
    }
    return num
};
Maths.log = function(n, base) {
    var log = Math.log;
    return log(n) / (base ? log(base) : 1)
};


var preloadTextImages = function() {
    var ref;
    var isJSFLPresent = false,
    isJSFLLoaded = false;
    var p = new Object;
    var preLoadDiv, newDiv;
    var p = {
        imgTextFile: "images/gizmoImages.txt",
        loadCnt: 0,
        lodedCnt: 0,
        _imageDataObj: new Object,
        isJSFLPresent: false,
        isJSFLLoaded: false
    };
    var _this = this;
    this.init = function(_obj) {
        preLoadDiv = document.createElement("div");
        $("body").append(preLoadDiv);
        newDiv = document.createElement("div");
        $("body").append(newDiv);
        $(newDiv).css({
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "white",
            "z-index": 105
        }).attr("id", "preloader1");
        $(preLoadDiv).css({
            position: "absolute",
            background: "url(../com/images/loading.gif) no-repeat",
            width: globalResizeCalc(1024) + "px",
            height: globalResizeCalc(696) + "px",
            "background-position": "center",
            "z-index": 106
        }).attr("id", "preloader");
        ref = this;
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        getImageTxtFile()
    };
    this.jsflImagesLoaded = function() {
        $(preLoadDiv).remove();
        $(preLoadDiv).hide();
        $(newDiv).remove();
        $(newDiv).hide()
    };
    function getImageTxtFile(txtFile) {
        $.ajax({
            url: p.imgTextFile,
            async: false,
            success: function(data) {
                var decomPressData = JXG.decompress(data);
                loadImages(decomPressData)
            }
        })
    }
    function loadImages(imageDataObj) {
        var _imgArr = imageDataObj.split("~^");
        p._imageDataObj = new Object;
        for (var j = 0; j < _imgArr.length - 1; j++) {
            var _arr = _imgArr[j].split("^~");
            p._imageDataObj[_arr[0]] = new Image;
            p._imageDataObj[_arr[0]].onload = imgloaded;
            p._imageDataObj[_arr[0]].src = _arr[1];
            p.loadCnt++
        }
    }
    function imgloaded() {
        p.lodedCnt++;
        if (p.lodedCnt == p.loadCnt) {
            if (ref.preloadComplete) {
                ref.preloadComplete(p._imageDataObj)
            }
            if (!p.isJSFLPresent) {
                _this.jsflImagesLoaded()
            }
        }
    }
};

var dkCompCaption = function() {
    var p = {
        id: "caption",
        x: 0,
        y: 0,
        width: 500,
        height: 39,
        bold: true,
        visible: true,
        cursor: "default",
        fontSize: "1em",
        text:"Hi",
        textColor:"#333333",
        paddingTop: 4,
        paddingLeft: 13,

    };
    var _thisObj = this;
    var lineBox,textField,logoImg;
    var cnv = document.createElement("canvas");
    var ctx = cnv.getContext("2d");
    this.init = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        p.x = dkScreenResize(p.x);
        p.y = dkScreenResize(p.y);
        p.width = dkScreenResize(p.width);
        p.height = dkScreenResize(p.height);
        p.bold = p.bold ? "bold": "normal";
        var _tDiv = document.createElement("div");
        if (p.target) {
            p.target.append(_tDiv)
        } else {
            $("body").append(_tDiv)
        }
        p.target = $(_tDiv);
        p.visible == false ? p.target.css("display", "none") : null;
        p.index ? p.target.css("z-index", p.index) : null;
        p.title ? p.target.attr("p_title", GCTConv(p.title)) : null;
        p.target.css({
            position: "absolute",
            left: p.x + "px",
            top: p.y + "px",
            width: p.width + "px",
            height: p.height + "px"
        });
        lineBox = document.createElement("div");
        p.target.append(lineBox);
        $(lineBox).css({
            position: "absolute",
            left:  "0px",
            top:  "0px",
            width: dkScreenResize(5) + "px",
            height: p.height + "px",
            background: p.lineColor==undefined? p.color : p.lineColor
        });

        p.target.append(cnv);
        cnv.width = p.width;
        cnv.height = p.height;
        $(cnv).css({
            position: "absolute",
            left: "0px",
            top: "0px",
        	width : p.width+"px",
        	height : p.height+"px",
        });

		//base64 的logo图片
        var img=new Image();
        img.src = "data:image/PNG;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAAAmCAYAAABAvVyFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAA9bSURBVGhD7VlpbJXnmT13X3zt6x28YxubxWDAEKAUAumSlJCUlqRNG3XatGp/dDRS1VbTn6NK/VFppNEoM79GI02bGaVqE00zSSZLs0EIDQlLgGCDHe/mel/utX33zT3nta1asUMIEE1k5oluru+3vN/7nvc85znPh2WOgf+PTy3uaIDTncOIn2hF/M02WHKcyP3xYTi31y6cvT1xZwGcySIbiSN5oQfxi72ItQ8hMTABa3AWTq8T/l8cg/vAZlg8zoUbbj3uGIAzI0Ek2q4herEP0a5hRPgdH5zCHEF3k73+PA9yv30Angd2wbGhYuGuW487AuB0MIrInzsQfPZdTJ1sRdRmw+zYNDAbh8duRU6eFyUlPnibquB7ZD88R3bC4rAv3H1rYV34XrWRSWcRujSI/lc/QMfpfnRPRdGXSqPbYcGwy4Zodg7xYATRcALx9kGkrgaQnZhduPvWY1UDnGX6D3VP4PTZQbxwZQavzbjQ5fRhLBRBMplGxG3HFOVBSTxDgHUsSYATb7cvjHDrsaoBFnsHr4yip2MMo7NRTHus6Kc8dNkcCNvtSPOaMMGdItDxSMKwWPqcONdlNFtF8VZj1QKcSqQxORBExxvdGOuZRDSaNHIQcjgw43JhymYnuEBiLosJmwXhbBYz0zFERqYpFQHET7ZhLpFaGO3mY9UCLHlIRpJIhZOYi6YJVgbpDAse7MiQwUGLDSGrDTGrFbMgi51WzMRTCM8QZFq32KuXkO4bw1w8uTDizYXtl4yFvz+zkUplma3z6Wq1Wsy3IpOZo37SCvGQhf9Ly+eaA4DDaYevKAc5hV7MXJtGdDIGXk6dzZK1GV6XhYXMtXE8N8dOuuxwkuE2XmSltLhYCG30w/bKIlj93vmH3ER85gEWiG1dEwiMhMkzwJ/rmj/BGBoPI0yWOmi1rDYr+gIzCFMKBJqLAFvJzvzyPOQUeBEPxRDsD8HidhBogmidQ4ogZziqV9dSDhIch8jDwQ21ElDH5DScDeWwlxXAwmtuJlb0wTrScy2EP7x4FR29U6gozcWOzaULZ4HJ6ThGxiMLv+Zj8/oibGkoRmd/EP97vBsbagvxpX3rUFaSY36fei+ASPSvmuZy2vCjR7YjS/Z0D4TQw09wJm4+AnUxNL1ppnmWC3/k/o14+CsbcObSMJ5+uR2jE1FzTYHfjRoCqWfH4mnD8o11hXjs61tRV5WPJItXz5kBnH/uCi683omwNYtYNsbdi8KRicOdTKKS+HliCXipIwVMljKmQXFxLkq+uBX+Rw/AfXeTedYnjRUB1mJeOtmDx584h/NtoyjK92B9Tb45ZydTZsiacfrJpXH47jrcs6cav32mFafOBVCxxoftm9agtNBDBk5iYGgGIRr7MEGOswDleBx46vGjaOucwJ9O9eJq96Q5Jwbq+TY+x8vqLvAU1WV5+JujTTjEZzxDT/skwdLGJFIZ5JPV6yr9hs1VvC4aS6G0yItf//wg1nKDNecwN6OffvjiC1dx+e1+TIQjiBPgbDoKWzoOP2WjKJWCL825CeT0HMqo0WX1pSh+cBdyj+2Fc2uNmcsniRUlQnL36tt9OHN5GFNka4qaJIaFZhOYDMXJnAiPU9PItEmmXjSWRn11AUqod//+1CXEyaIg71NqmwxYk2vATiYzZGgCdqbi1sYSPHZsC06cuYY33hkw1xfkuZjuNjOuy2FDOTNnS2OxAenQ7mrs3V5uzp/lvAaGZ81GSQoEfkvTWjOXXVvKUFPhN8e+wk1f1Gyn1wH/2lwUk9EpziEVyyBhCh/5ZQNiGVZAi1XybVI4RX0G52tNpmCLcs7Ud4ekgi21hdJzo7HilSwdRgKU0jmcWAk1TEVEk15bnENmOeBmUaitzIeTQIhBPl6XoFGPsRKr0HjJUA8ZWMx7H7q3Ad9gapeQVbpGYzz64CZzzbWRWbNheT4X7tpaZqQll+bfxfGLCzwm9fXR5nn43AQXPTQW5n0z8OU4zLnP7SjHP/zdPrNJIoVkRxvz4XB5najkM478/UHsvX8T1tet5abmU4e9cLi9mKKzGLHajZWTpRvxOREIxzHUOoCJF85j5ndvIasWW3bkBmNFBmc4+D//9hw+6AuadFPq6ZgWMBGkjeExgdxYW4Ch0TAqyQylrhb79MsdZoxGAiUZECDamH/6zVlcujpmUlrVXkxuqCnEW5QTpbrY2Dc4bcDT+Po9OhnB+x0TuMj78nKdWF+dbwrd8693EdQKs7mjk1HzfeRgHX7/YruRrubGUhw+UGc27cMhojg4r6ota1HBLHJSBsY7g4ikODLppsIX5vxiPJ7HOhHj7xh/Z6jj9tEQHJE4HFXFsBb6Fka8fqwIsGRZRU4FQ4yMGc10Ys+2MgKWZdFJmCIldgqQjfXzBS7GlHvpZDcKqZu6x8L/xP4ox2n9YILf80VOqq/Pw/c1YpD3B8hiZcD9B+vNc+McZw0tVj3TOZcg7WxaQ42vR/OGEgPQMN2DnIIIIM29e1cVuq8FcfJswFi6TZxPC+9Z6jiWhsawU1q8rC2l6wpQu7UcHrI2Ec2YZwvkFDU5Okfrx+fM8SO3EWP2ZYaDsJHVDmaDrdRPq3d9uVh2VuktrVRhs1OHpL9m1x1W1FES/EwbRZrHpXlioxhcXuozdkmsmWd7wqTw/l2VuG9/LarJbsmKqvpDBPZH32zGGkqFQpqbn+vG/p2VRgYUGqeIEqENFohir+akMfRbG7x9UykOcPyqslyMM7OO3dtoiq0KrDb448LNtaxdX4zmLzbgnm+14Avf+Rya7mlGbmUFUh4/ph1uTNhdGGRj0kP56OGaOwOT6HjlIvqePInQS+8hO3n9F0PLABZr23um0MH2UuwSuNJCMUPptzjxJFNd2qkiIXBt3Iy+wLQBWW4gRZ0Sy8TMmoo85PJbvxft098+2oIxjtfLJiBJU+92MVX5O8MN85EdygKNJXZrEx2UgVk6jE6ytrNvCv10JZIpSdiFK6MIsOgJWLkHJ8GXE7mR0FUZ1rMMNR4VBUiXFCLszceUw49JRx4CNh867bnocPjQZfPgssWJ81znpT+9j44nTiDw/Ln5gT4iltm0wOgs/uPp9/F72hmBJ0BUYF4/3W8qsjZAC+af5rziVz85YNL/8f88b95IqbKr85oHiptDsGXTVKK/dWQTfv6D3QaIX/zjCTOuHMOaYq8Be4o+WJ5aLkPPeY56+/2HtuK7R7cYj/ybP17GU9RaMVibvzR0vZbzna824Wc/uMto//VCmRpiXekhmf77j214k9Z0jKRSkyEyaHit0MmNzrHNwZ9Owm1hdluSKEtFUZZOoISZ/e32f5kfcIVY1p5kCZrAUhGRr9W3mHTkUD1OvDtgCpEWpxTW3wq5BTmPZoIioO7ZW2MA1XWKX//bO4aRsln3fr7WME3Fb2BwxvwtMJ2c6Jn3h42UPHzfRm6qB+dbR4wM7KDFy/e7DMAqaJKkL+ytNg5nMSQzvWSW6sNmpn0Fs+rjoo0e/1n66dfe6MIki6W6uAIW0wJqd6lxSzakOc85HtdWWrlGKrJJ+4jHjjDnXlJbZMb6qFjGYOnqcfpSsWHHZi6MD5OVujY8Y7RPod0V6Kr2CvlVLV7NgnZdQGrBYoKA13E3WV2U70Y5PbEkR1JwrnWUd5MZfIbY2MsC5yVo6+hjnfS7PYEQ3rkwZBxKA4uRmpInnrnMRqPTZICakcXQMjSf+1kMlSWybiuFpGOarH2FY7z5Zg966NWzlCgPtV10MGvjZrtJDo0vcBchUgbns2ivZ7Ft5KZX1hTAS0tZwbryUbFMg1XUZI+G6YNVyHrJ0ue5w5c/GDf+VTupSt/Nj9J/PR8yQPDffm/QsFaaq0osvzvNaiu7tZNNwIG7KtG8kV0RwdUmvqjFcQzZNTG9rMRHlrqN/77Kzk9aX5DnZj2Y5LGwGUca3dUfMkCKrV1sjRc/snq61263mIxaKRIc4xqf+dz/tOL0Wz0YHQjCTikrZnboU5DnRB4Ls0fyw+v1Rk7gSv9LSIyde2pw7wObcfDLjWjRpnM91wNXsWwms+z7BZbSUIWsn2ms1NV7BXVyaqGPUyrUwn7/2FYDsqTj1PmASd8N1Oyr3RMGkBBZrRcukhmxlKQ0McLi+F/PthlHIOnIZtdxo7JkZyuukKWyWUe/1GCK2OmLQ8YpSFJUH7oIiu75cIhji+86PpSUJiJcV4BW7gLn+drL7bBKDnIobZ6FSfH3SpHH9ZVX+dGwoRRNzeWoZX2wc503GssYLOapQu8jKGXUMRWCNUzHnz62y1ims5dHDOBiq9rW1s5xw0j1+3m0PeruxC41IB29QaOjOjfNzRHztGkzXKzkYAMbFUmKWDzI6/V+4T06ghB/m/cSbHDE+MZ1hfPuJJIyqXyAvnfpZ19LhdFpFeOacr/x50vDZGLPBI6/0oE3XrwKJ7eDRDfp/1EhOcjhepro/R841oyvPbIdDawHnwRcxTIGy8OKxecIjB6ily8VZLOmMiGbttAsqMh9ngsbD0bZbY3jCrVMTK3nbj/zyjzTBdqebeUmG375r6ewjSxQhzdITa/VOwEuXO8pxFSltzo/FVhlgY5rE8T2aQKtDlJ28Iff3IbvfX2LmcNijLFAHX+33/hu1Y3y0nl/vRh9rAHvvtWLS+wa9c9IHxd69eknc7/6jWZspLwVkGA3G8uKnP7x78KVMfPeQNVUra3SUywaozaLnSpo0kd1durkJCOzBEGNgDooaaI0XDKhZqGFi5aGq5nQe4Y4s0TACVAxU+8kxDIVQxW/xRdH2lx1a3qvoCIpRqv4ymksDc1Pc9NrVLXrmptCY3awzf7z8U60t41gmpv0caGiVd9QgkNsWtbVFcHHsfRy6mZjxdeVqyHSbIwmuYnP03VcuTR4Q+AWM0PE2Jbd1djcXEZg5bUXTt5k3PzWfMZDjU6E2ThA7Y1Q/68XkkI/M615RyXuZtu8jS27nMOtgqtYtQCrABdQZmSjclgvBOJKIf/tYg0QuAe/3IB6Nj23M1YtwFabBXlsbB5+tAXNLZXwsZ6sFB769vXU+MNHm1DGBud2x6oFWKFOLJ8sPsTGYPe+WvhZhJeGCpqahcNfo59nE7W0M7xdsaoBVgi0KnabO/dWGybLx0pbdby2vhh799eirqHYFLRPI1Y9wAobbVYNLdee/esMY6W55dTm7Wzft2yvuG0FbaW4IwBW6N/4xNgHH2o2jmE3W38VNsnEpxmr1gd/VuKOYfD/TQB/AYibw98ahuC6AAAAAElFTkSuQmCC";
		ctx.drawImage(img,0,0,88,38,dkScreenResize(8),0,dkScreenResize(88),cnv.height);
      	//画文本背景
        var cgrd = ctx.createLinearGradient(dkScreenResize(95),0,cnv.width*4/5,cnv.height);
        cgrd.addColorStop(0,p.color);
        cgrd.addColorStop(1,"#FFFFFF");
        ctx.fillStyle = cgrd;
        ctx.fillRect(dkScreenResize(95),0,cnv.width,cnv.height);
     	//文本label,写标题
        textField = document.createElement("label");
        $(textField).empty();
        $(p.target).append(textField);
        $(textField).css({
            position: "absolute",
            left: dkScreenResize(95)+ "px",
            top:  "0px",
            width: p.width - dkScreenResize(95) + "px",
            height: p.height -dkScreenResize(4)+  "px",
			"font-family":"STZhongsong", // Microsoft YaHei",
            "font-size": p.fontSize,
            "color":p.textColor,
            "margin-left": dkScreenResize(p.paddingLeft) + "px",
            "margin-top": dkScreenResize(p.paddingTop) + "px",
            "font-weight": p.bold,
            "vertical-align": "middle",
            cursor: p.cursor
        });
        if (p.text) {
			$(textField).html(p.text);
        }
    }
}

var dkCompColorBar = function() {
    var p = {
        id: "",
        x: 50,
        y: 0,
        width: 450,
        height: 45,
        colorStyle: "244,77,63",
        bold: false,
        sqrBox: true,
        lineBox: true,
        lineLoc: 0,
        lineColor:"",
        attechedLabel : "",
		labelWidth:80,
		labelHeight:30,
		labelBkColor:"",
		labelText:"",
		labelTextColor:"",
        cursor: "default",
        fontSize: "1em",
        bgAlpha: .3,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    };
    var _thisObj = this;
    var newlabelDiv;
    var barBox, sqrBox, rectBox, bgDiv;
    var colorComb, textField;
    var updateWidth;
    var margin = dkScreenResize(8);
    this.init = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        p.x = dkScreenResize(p.x);
        p.y = dkScreenResize(p.y);
        p.width = dkScreenResize(p.width);
        p.height = dkScreenResize(p.height);
        switch (Number(p.colorStyle)) {
        case 1: colorComb = "0,172,239";  break;
        case 2: colorComb = "75,83,236";  break;
        case 3: colorComb = "244,77,63";  break;
        case 4: colorComb = "0,168,110";  break;
        case 5: colorComb = "154,54,205"; break;
        default:
            colorComb = p.colorStyle;
            break
        }

        if (!p.lineColor){
        	p.lineColor = p.colorStyle;
        }
        p.bold = p.bold ? "bold": "normal";
        var _tDiv = document.createElement("div");
        if (p.target) {
            p.target.append(_tDiv)
        } else {
            $("body").append(_tDiv)
        }
        p.target = $(_tDiv);
        p.visible == false ? p.target.css("display", "none") : null;
        p.index ? p.target.css("z-index", p.index) : null;
        p.title ? p.target.attr("p_title", GCTConv(p.title)) : null;
        p.target.css({
            position: "absolute",
            left: p.x + "px",
            top: p.y + "px",
            width: p.width + "px",
            height: p.height + "px"
        });
        if (p.sqrBox) {
            sqrBox = document.createElement("div")
        }
        if (p.lineBox) {
            rectBox = document.createElement("div");
            updateWidth = p.width - margin
        } else {
            updateWidth = p.width
        }

        bgDiv = document.createElement("div");
        p.target.append(sqrBox).append(rectBox).append(bgDiv);
        sqrBoxTop = p.height / 2 - dkScreenResize(21) / 2;
        $(sqrBox).css({
            position: "absolute",
            right: dkScreenResize(20) + "px",
            top: sqrBoxTop + "px",
            width: dkScreenResize(21) + "px",
            height: dkScreenResize(21) + "px",
            background: "rgba(" + colorComb + ",1)"
        });

        if (p.lineLoc==1){
        	updateWidth = p.width;
	        $(rectBox).css({
	            position: "absolute",
	            left: dkScreenResize(0) + "px",
	            top: dkScreenResize(0) + "px",
	            width: dkScreenResize(5) + "px",
	            height: p.height + "px",
//	            background: "rgba(" + colorComb + ",1)"
	            background: p.lineColor
	        });
        }else if (p.lineLoc==2){
        	updateWidth = p.width;
	        $(rectBox).css({
	            position: "absolute",
	            left: dkScreenResize(0) + "px",
	            top: p.height-dkScreenResize(5) + "px",
	            width: p.width + "px",
	            height: dkScreenResize(5) + "px",
//	            background: "rgba(" + colorComb + ",1)"
	            background: p.lineColor
	        });
        }
        else{
	        $(rectBox).css({
	            position: "absolute",
	            right: dkScreenResize(0) + "px",
	            top: dkScreenResize(0) + "px",
	            width: dkScreenResize(5) + "px",
	            height: p.height + "px",
	            background: "rgba(" + colorComb + ",1)"
	        });
        }
        $(bgDiv).css({
            position: "absolute",
            left: p.lineLoc==1 ? dkScreenResize(5) + "px":dkScreenResize(0) + "px",
            top: dkScreenResize(0) + "px",
            width: updateWidth + "px",
            height: p.height + "px",
            background: "rgba(" + colorComb + "," + p.bgAlpha + ")"
        });
        textField = document.createElement("div");
        $(textField).empty();
        $(p.target).append(textField);
        $(textField).css({
            position: "relative",
            "padding-top": dkScreenResize(p.paddingTop) + "px",
            "padding-bottom": dkScreenResize(p.paddingBottom) + "px",
            "padding-left": dkScreenResize(p.paddingLeft) + "px",
            "padding-right": dkScreenResize(p.paddingRight) + "px",
            "font-size": p.fontSize,
            "margin-left": dkScreenResize(2) + "px",
            "font-weight": p.bold,
            "font-family": p.textFont? p.textFont: null,
            cursor: p.cursor
        }).attr("id", "colorBarMathjax_" + p.id);
        this.setColor(colorComb);
        if (p.text) {
            setLabelTextFn(p.text)
        }


		if (p.attechedLabel != "undefined" && p.attechedLabel != ""){
			newlabelDiv = document.createElement("div");
//			$("body").append(newlabelDiv);
			$(".desktop").append(newlabelDiv);
			$(newlabelDiv).css({
	            position: "absolute",
	            left: p.x+p.width +dkScreenResize(10) + "px",
	            top: p.y + "px",
	            width: dkScreenResize(p.labelWidth) + "px",
	            height: dkScreenResize(p.labelHeight) + "px",
	            background: p.labelBkColor,
	            "border-radius": "4px",
	            "z-index": p.index? p.index : null
			});

			var newlabelObj = document.createElement("newlabel");
			$(newlabelDiv).append(newlabelObj);
			$(newlabelDiv).children("newlabel").css({
	            position: "absolute",
				left :"0px",
				top : p.paddingTop? dkScreenResize(p.paddingTop)+ "px" : dkScreenResize(2)+ "px",
				width : "100%",
				height: "100%",
	            "text-align": "left",
        		"vertical-align": "middle",
        		outline: "none",
            	"font-size": "1em",
            	"font-family": p.labelFont? p.labelFont: "Helvetica",
            	"color": p.labelTextColor,
		        "font-weight": "bold",
			});
			$(newlabelDiv).children("newlabel").html( p.labelText) ;
		}
    };
    this.setLabelText2= function( txt ){
    	if ($(newlabelDiv).children("newlabel")){
			$(newlabelDiv).children("newlabel").html( txt ) ;
    	}else{
    		console.log("haha")
    	}
    }
    this.setLabelText = function(_text) {
        setLabelTextFn(_text)
    };
    this.setColor = function(_bgColor) {
        if (_bgColor.indexOf("#") != -1) {
            colorComb = hexToRgb(_bgColor);
            colorComb = String(colorComb.r + ", " + colorComb.g + ", " + colorComb.b)
        }
        $(sqrBox).css({
            background: "rgba(" + colorComb + ",1)"
        });
        $(rectBox).css({
           // background: "rgba(" + colorComb + ",1)"
        });
        $(bgDiv).css({
            background: "rgba(" + colorComb + "," + p.bgAlpha + ")"
        })
    };
    this.show = function() {
        p.target.show()
    };
    this.hide = function() {
        p.target.hide()
    };
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        }: hex
    }
    function setLabelTextFn(_txt) {
        if (_txt) {
            _txt = p.emdash ? _txt.replace(/-/g, "&ndash;") : _txt;
            $(textField).html(_txt);
            if (String(_txt).indexOf("\\begin{equation}") != -1) {
                $(textField).css({
                    "padding-top": "0px",
                    opacity: 0
                });
                setTimeout(function() {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "colorBarMathjax_" + p.id],
                    function() {
                        $(textField).css("opacity", 1)
                    })
                },
                10)
            } else {
                $(textField).css({
                    "padding-top": dkScreenResize(p.paddingTop) + "px"
                })
            }
        }
    }
};
var dkCompTextLabel = function() {
    var p = {
        x: 0,
        y: 0,
        align: "left",
        html: "",
        color: "#000000",
        border: "1px solid transparent",
        bold: false,
        fontFamily: "inherit",
        fontSize: "1em",
        bgColor: "",
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        color: "",
        emdash: false,
        cursor: "default",
        katex: false
    };
    var _thisObj = this;
    this.init = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        p.x = dkScreenResize(p.x);
        p.y = dkScreenResize(p.y);
        if (p.width) {
            p.width = dkScreenResize(p.width)
        }
        if (p.height) {
            p.height = dkScreenResize(p.height)
        }
        p.bold = p.bold ? "bold": "normal";
        var _tDiv = document.createElement("div");
        if (p.target) {
            p.target.append(_tDiv)
        } else {
            $("body").append(_tDiv)
        }
        p.target = $(_tDiv);
        p.visible == false ? p.target.css("display", "none") : null;
        p.index ? p.target.css("z-index", p.index) : null;
        p.title ? p.target.attr("p_title", GCTConv(p.title)) : null;
        p.target.attr("id", p.id + "_mathjaxid");
        p.class ? p.target.attr("class", p.class) : null;
        p.target.css({
            position: "absolute",
            left: p.x + "px",
            top: p.y + "px",
            "font-family": p.fontFamily,
            "text-align": p.align,
            "font-size": p.fontSize,
            background: p.bgColor,
            "padding-top": dkScreenResize(p.paddingTop) + "px",
            "padding-right": dkScreenResize(p.paddingRight) + "px",
            "padding-bottom": dkScreenResize(p.paddingBottom) + "px",
            "padding-left": dkScreenResize(p.paddingLeft) + "px",
            border: p.border,
            color: p.color,
            "font-weight": p.bold,
            cursor: p.cursor
        });
        if (p.border) {
            p.target.css({
                border: p.border
            })
        }
        if (typeof p.rotation != "undefined") {
            p.target.css({
                "-webkit-transform-origin": "left center",
                "-ms-transform-origin": "left center",
                "transform-origin": "left center"
            })
        }
        if (p.width) {
            p.target.css("width", p.width + "px")
        }
        if (p.height) {
            p.target.css("height", p.height + "px")
        }
        this.setText(p.html)
    };
    this.setText = function(_html) {
        if (typeof p.rotation != "undefined") {
            p.target.css({
                "-webkit-transform": "rotate(0deg)",
                "-ms-transform": "rotate(0deg)",
                transform: "rotate(0deg)"
            })
        }
        p.html = p.emdash ? _html.replace(/-/g, "&ndash;") : _html;
        if (String(p.html).indexOf("localMJ_i") != -1 || String(p.html).indexOf("localMJ_n") != -1) {
            p.target.css("margin-top", "-" + dkScreenResize(5) + "px")
        } else {
            p.target.css("margin-top", "auto")
        }
        p.target.html(p.html);
        if (String(_html).indexOf("\\begin{equation}") != -1) {
            if (p.katex) {
                printKatex(p.target[0], _html);
                $("#" + p.id + "_mathjaxid" + " .katex").css("font-weight", p.bold)
            } else {
                p.target.css({
                    "padding-top": "0px",
                    opacity: 0
                });
                var mjObj = MathJax.Hub.getAllJax(p.id + "_mathjaxid")[0],
                mjHubParam = mjObj ? ["Text", mjObj, _html] : ["Typeset", MathJax.Hub, p.id + "_mathjaxid"];
                MathJax.Hub.Queue(mjHubParam, p.id + "_mathjaxid",
                function() {
                    var mjD = p.target.children(".MathJax_Display");
                    if (mjD && $(p.target).text().indexOf("\\") != 0) {
                        mjD.css("text-align", p.align);
                        p.target.css("opacity", 1)
                    }
                })
            }
        } else {
            p.target.css({
                "padding-top": dkScreenResize(p.paddingTop) + "px"
            })
        }
        if (typeof p.rotation != "undefined") {
            p.target.css({
                left: p.x + p.target.outerWidth(true) / 2 + "px",
                top: p.y + p.target.outerWidth(true) / 2 + "px",
                "-webkit-transform": "rotate(" + p.rotation + "deg)",
                "-ms-transform": "rotate(" + p.rotation + "deg)",
                transform: "rotate(" + p.rotation + "deg)"
            })
        }
    };
    this.getText = function(_html) {
        return p.html
    };
    this.setColor = function(_col) {
        p.color = _col;
        p.target.css("color", p.color)
    };
    this.setStyle = function(_val) {
        p.target.css(_val)
    };
    this.show = function() {
        p.target.show()
    };
    this.hide = function() {
        p.target.hide()
    };
    this.enable = function() {
        p.target.css("opacity", 1)
    };
    this.disable = function() {
        p.target.css("opacity", .5)
    }
};
var dkCompCheckBox = function() {
    var p = {
        id: "checkbox",
        checked: true,
        label: "",
        x: 0,
        y: 0,
        width: 411,
        fontSize: "1em",
        labelColor: "#000000",
        labelTextShadow: "none",
        checkSize:0,
        checkColor:0,
        checkType:0,
        attechedLabel : "",
		labelWidth:80,
		labelHeight:30,
		labelBkColor:"",
		labelText:"",
		labelTextColor:""
    };
    var newlabelDiv;
    var _thisObj = this;
    var cb_bg, labelDiv;
    var prevState = false;
//    var tickImg = new Image;
//    tickImg.onload = updateView;
    this.init = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        p.x = dkScreenResize(p.x);
        p.y = dkScreenResize(p.y);
        var _tDiv = document.createElement("div");
        if (p.target) {
            p.target.append(_tDiv)
        } else {
            $("body").append(_tDiv)
        }
        p.target = $(_tDiv);
        p.visible == false ? p.target.css("display", "none") : null;
        p.index ? p.target.css("z-index", p.index) : null;
        p.target.css({
//	        	"id": p.id,
//			"font-family":"STZhongsong",
            position: "absolute",
            left: p.x + "px",
            top: p.y + "px",
            width: p.width + "px",
            "font-size": p.fontSize,
            cursor: "pointer",
        });
        cb_bg = document.createElement("canvas");
        p.target.append(cb_bg);
        //<dk>增加size属性，0(undefined):30px,1:26px
        if (p.checkSize=="undefined" || p.checkSize == 0){
        	cb_bg.width = dkScreenResize(30);
        	cb_bg.height = dkScreenResize(30);
        }else{
        	cb_bg.width = dkScreenResize(26);
        	cb_bg.height = dkScreenResize(26);
        }
        $(cb_bg).css({
            position: "absolute",
            left: "0px",
            top: "0px"
        });
        p.title ? $(cb_bg).attr("p_title", GCTConv(p.title)) : $(cb_bg).attr("p_title", GetGlobalTooltip("tooltip", "genricClick"));
        var textDimention = getTextDimentions(p.label, p.fontSize);
        var probableTop = cb_bg.height / 2 - textDimention.height / 2;
        var _refLine = document.createElement("div");
        $(_refLine).css({
            position: "absolute",
            left: "0px",
            top: cb_bg.height / 2 + "px",
            height: "1px",
            width: "100%",
            display: "none"
        });
        p.target.append(_refLine);
        var _refTextWarapper = document.createElement("div");
        $(_refTextWarapper).css({
            position: "absolute",
            left: cb_bg.width + dkScreenResize(5) + "px",
            height: cb_bg.height + "px",
            display: "table"
        });
        p.target.append(_refTextWarapper);
        labelDiv = document.createElement("span");
        $(_refTextWarapper).append(labelDiv);
        $(labelDiv).css({
            "white-space": "nowrap",
            color: p.labelColor,
            "text-shadow": p.labelTextShadow,
            display: "table-cell",
            "vertical-align": "middle",
        }).html(p.label);
        if ($(labelDiv).children().length > 0) {
            var _labelChildArr = $(labelDiv).children();
            $(_labelChildArr).attr("style", "")
        }
        p.verticalAlign ? $(labelDiv).css("top", dkScreenResize( - 5) + "px") : null;
        p.title ? $(labelDiv).attr("p_title", GCTConv(p.title)) : $(cb_bg).attr("p_title", GetGlobalTooltip("tooltip", "genricClick"));
        _thisObj.enable();

		updateView();

		if (p.attechedLabel != "undefined" && p.attechedLabel != ""){
			newlabelDiv = document.createElement("div");

			$(".desktop").append(newlabelDiv);
			$(newlabelDiv).css({
	            position: "absolute",
	            left: p.x+textDimention.width +dkScreenResize(35) + "px",
	            top: p.y + "px",
	            width: dkScreenResize(p.labelWidth) + "px",
	            height: dkScreenResize(p.labelHeight) + "px",
	            background: p.labelBkColor,
	            "border-radius": "4px",
			});

			var newlabelObj = document.createElement("newlabel");
			$(newlabelDiv).append(newlabelObj);
			$(newlabelDiv).children("newlabel").css({
	            position: "absolute",
				left :"0px",
				top : dkScreenResize(1.5)+ "px",
				width : "100%",
				height: "100%",
	            "text-align": "left",
        		"vertical-align": "middle",
        		outline: "none",
            	"font-size": "1em",
            	"font-family": "Helvetica",
            	"color": p.labelTextColor,
		        "font-weight": "bold",
			});
			$(newlabelDiv).children("newlabel").html( p.labelText) ;
		}
    };
    this.setLabelText = function( txt ){
    	if ($(newlabelDiv).children().length > 0){
			$(newlabelDiv).children().html( txt ) ;
    	}else{
    		console.log("haha")
    	}
    }
    function getTextDimentions(txt, fontSize) {
        $(".desktop").append("<span class='sampleTextDiv' style='font-size:" + fontSize + ";display:none'>" + txt + "</span>");
        var textObj = new Object;
        textObj.width = $(".sampleTextDiv").width();
        textObj.height = $(".sampleTextDiv").height();
        $(".sampleTextDiv").remove();
        return textObj
    }
    this.addEventListener = function(_evt, _fun) {
        p[_evt] = _fun
    };
    this.setLabel = function(arg) {
        $(labelDiv).html(arg)
    };
    this.setTitle = function(_title) {
        p.title = _title;
        $(labelDiv).attr("p_title", GCTConv(p.title));
        $(cb_bg).attr("p_title", GCTConv(p.title))
    };
    this.setLabelColor = function(_col) {
        p.labelColor = _col;
        $(labelDiv).css({
            color: p.labelColor
        })
    };
    this.getLabelColor = function() {
        return p.labelColor
    };
    this.setStatus = function(bool) {
        if (bool) {
            p.checked = true
        } else {
            p.checked = false
        }
        updateView()
    };
    this.getStatus = function() {
        return p.checked
    };
    this.enable = function() {
        p.target.css({
            cursor: "pointer",
            opacity: 1
        });
        if (BrowserDetect.any()) {
            p.target.unbind("touchstart", oncbEvent).bind("touchstart", oncbEvent).unbind("touchend", oncbEvent).bind("touchend", oncbEvent)
        } else {
            p.target.unbind("click", oncbEvent).bind("click", oncbEvent);
            p.target.unbind("mousedown", oncbEvent).bind("mousedown", oncbEvent)
        }
    };
    this.disable = function() {
        p.target.css({
            cursor: "default",
            opacity: .5
        });
        if (BrowserDetect.any()) {
            p.target.unbind("touchstart", oncbEvent).unbind("touchend", oncbEvent)
        } else {
            p.target.unbind("click", oncbEvent);
            p.target.unbind("mousedown", oncbEvent)
        }
    };
    this.show = function() {
        p.target.show();
    };
    this.hide = function() {
        p.target.hide()
    };
    function oncbEvent(e) {
        if (e.type == "mousedown" || e.type == "touchstart") {
            focusOutInput();
            audioPlayerObj.playAudio("down");
            drawCB(true);
            $(window).unbind("mouseup", oncbEvent).bind("mouseup", oncbEvent)
        } else if (e.type == "mouseup" || e.type == "touchend") {
            audioPlayerObj.playAudio("up");
            $(window).unbind("mouseup", oncbEvent);
            updateView()
        }
        if (e.type == "click" || e.type == "touchend") {
            p.checked = !p.checked;
            updateView();
            e.id = p.id;
            e.checked = p.checked;
            if (p.change) {
                p.change(e)
            }
        }
    }
    function updateView() {
        drawCB()
    }
    function drawCB(_downBool) {
        cb_bg.width = cb_bg.width;
        _lWid = p.checkSize==0? dkScreenResize(4) :dkScreenResize(3)  ;
        var _ctx = cb_bg.getContext("2d");
        _ctx.beginPath();

        var _color = p.checkColor!="undefined" ? p.checkColor : "#999999"
        _ctx.strokeStyle = _downBool ? "#545454": _color;
        _ctx.lineWidth = _lWid;
        _ctx.fillStyle = _downBool ? "rgba(153, 153, 153, 0.6)": "rgba(255, 255, 255, 0.6)";

        if (p.checkType==0 || p.checkType == "undefined"){
	        _ctx.rect(_lWid / 2, _lWid / 2, cb_bg.width - _lWid, cb_bg.height - _lWid);
        }else{
        	dkRoundRect(_ctx, _lWid / 2, _lWid / 2, cb_bg.width - _lWid, cb_bg.height - _lWid, dkScreenResize(3), false, true);
        }
        _ctx.fill();
        _ctx.stroke();
        if (p.checked) {
            _ctx.beginPath();
	        _lWid = dkScreenResize(4);
	        _ctx.lineWidth = _lWid;
	        _ctx.lineCap = "round";
	        _ctx.strokeStyle = _color;
	        _ctx.moveTo( (cb_bg.width-_lWid)/2,cb_bg.width-2*_lWid);
	        _ctx.lineTo( _lWid/2+dkScreenResize(6),_lWid/2+(cb_bg.width-_lWid)/2);
	        _ctx.moveTo( (cb_bg.width-_lWid)/2,cb_bg.width-2*_lWid);
	        _ctx.lineTo( _lWid/2+cb_bg.width-dkScreenResize(9), (cb_bg.width-_lWid)/2-_lWid/2);
	        _ctx.stroke()

        }
    }
};
var dkCompRadioButton = function() {
    var p = {
        id: "",
        x: 0,
        y: 0,
        selectedIndex: 0,
        orientation: "v",
        padding: 10,
        radioLabelMargin: 5,
        fontSize: "1em",
        labelColor: "#000000",
        color :"#000000",
        radioSize:29,
        enabled: true,
        optionLableArr: [],
        optionRadioArr: [],
        verticalAlign: false,
        labelTextShadow: "none"
    };
    var _thisObj = this;
    var rdContainer, rdDiv, rd_bg, labelDiv;
    var radioArr = new Array;
    var height = dkScreenResize(29);
    this.init = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        p.x = dkScreenResize(p.x);
        p.y = dkScreenResize(p.y);
        p.padding = dkScreenResize(p.padding);
        p.radioLabelMargin = dkScreenResize(p.radioLabelMargin);
        p.width ? p.width = dkScreenResize(p.width) : null;
        var _tDiv = document.createElement("div");
        if (p.target) {
            p.target.append(_tDiv)
        } else {
            $("body").append(_tDiv)
        }
        p.target = $(_tDiv);
        p.visible == false ? p.target.css("display", "none") : null;
        p.index ? p.target.css("z-index", p.index) : null;
        p.target.css({
            position: "absolute",
            left: p.x + "px",
            top: p.y + "px"
        });
        //<dk>处理radio尺寸
        if (p.radioSize!=undefined){
        	if (p.radioSize>29){
        	}else if (p.radioSize<20){
	        	height = dkScreenResize(20)
        	}else{
	        	height = dkScreenResize(p.radioSize)
        	}
        }
        p.optionLableArr = [];
        p.optionRadioArr = [];
        if (p.labelArr.length != 0) {
            for (var i = 0; i < p.labelArr.length; i++) {
                rdContainer = document.createElement("div");
                p.target.append(rdContainer);
                rdDiv = document.createElement("div");
                rd_bg = document.createElement("canvas");
                labelDiv = document.createElement("div");
                $(rdContainer).append(rdDiv).append(labelDiv);
                $(rdDiv).append(rd_bg);
                $(rdDiv).css({
                    display: "table-cell",
                    width: Math.round(height) + "px"
                });
                rd_bg.width = Math.round(height);
                rd_bg.height = Math.round(height);
                $(rd_bg).css({
                    "margin-bottom": dkScreenResize( - 5) + "px"
                });
                $(rd_bg).attr("p_title", p.title ? typeof p.title == "object" ? GCTConv(p.title[i]) : GCTConv(p.title) : GetGlobalTooltip("tooltip", "genricClick"));
                p.optionRadioArr.push(rd_bg);
                if (p.setXY) {
                    var _XY = p.setXY[i].split(":");
                    $(rdContainer).css({
                        position: "absolute",
                        cursor: "pointer",
                        display: "table",
                        left: dkScreenResize(_XY[0]) + "px",
                        top: dkScreenResize(_XY[1]) + "px",
                        width: p.width + "px"
                    })
                } else {
                    $(rdContainer).css({
                        cursor: "pointer",
                        width: p.width + "px",
                        height: height + "px"
                    });
                    if (p.orientation == "v") {
                        $(rdContainer).css({
                            display: "table",
                            "margin-bottom": p.padding + "px"
                        })
                    } else {
                        $(rdContainer).css({
                            display: "inline-block",
                            "margin-right": p.padding + "px"
                        })
                    }
                }
                $(rdContainer).attr("data-radiogroup_" + p.id, i);
                radioArr.push($(rdContainer));
                $(labelDiv).css({
                    display: "table-cell",
                    "padding-left": p.radioLabelMargin + "px",
                    "white-space": "nowrap",
                    "font-size": p.fontSize,
                    color: p.labelColor,
                    "text-shadow": p.labelTextShadow
                }).html(p.labelArr[i]);
                p.optionLableArr.push(labelDiv);
                p.verticalAlign ? $(labelDiv).css("vertical-align", "middle") : null;
                $(labelDiv).attr("p_title", p.title ? typeof p.title == "object" ? GCTConv(p.title[i]) : GCTConv(p.title) : GetGlobalTooltip("tooltip", "genricClick"));
                this.setEnable(true)
            }
            drawRadioSel()
        }
    };
    this.setText = function(strArr, titleArr) {
        for (var i = 0; i < strArr.length; i++) {
            if (strArr[i]) $(p.optionLableArr[i]).html(strArr[i]);
            if (typeof titleArr != "undefined" && titleArr[i]) {
                $(p.optionLableArr[i]).attr("p_title", titleArr[i]);
                $(p.optionRadioArr[i]).attr("p_title", titleArr[i])
            } else {
                $(p.optionLableArr[i]).attr("p_title", GCTConv(GetGlobalTooltip("tooltip", "genricClick")));
                $(p.optionRadioArr[i]).attr("p_title", GCTConv(GetGlobalTooltip("tooltip", "genricClick")))
            }
        }
    };
    this.addEventListener = function(_evt, _fun) {
        p[_evt] = _fun
    };
    this.setSelected = function(_index) {
        p.selectedIndex = _index;
        radioSelChanged()
    };
    this.getSelected = function() {
        return p.selectedIndex
    };
    this.setLabelColor = function(_col) {
        p.labelColor = _col;
        $(labelDiv).css({
            color: p.labelColor
        })
    };
    this.getLabelColor = function() {
        return p.labelColor
    };
    this.enable = function(){
    	this.setEnable(true);
    }
    this.disable = function(){
    	this.setEnable(false);
    }
    this.setEnable = function(_bool, _indArr) {
        p.enabled = _bool;
        var _arr = typeof _indArr == "undefined" ? radioArr: _indArr;
        for (var i = 0; i < _arr.length; i++) {
            var _ind = typeof _indArr == "undefined" ? i: _indArr[i];
            if (p.enabled) {
                if (BrowserDetect.any()) {
                    radioArr[_ind].unbind("touchstart", onRdEvent).bind("touchstart", onRdEvent).unbind("touchend", onWindowEvt).bind("touchend", onWindowEvt)
                } else {
                    radioArr[_ind].unbind("mousedown", onRdEvent).bind("mousedown", onRdEvent)
                }
                radioArr[_ind].unbind("click", onRdEvent).bind("click", onRdEvent);
                radioArr[_ind].css({
                    cursor: "pointer",
                    opacity: 1
                })
            } else {
                if (BrowserDetect.any()) {
                    radioArr[_ind].unbind("touchstart", onRdEvent).unbind("touchend", onWindowEvt)
                } else {
                    radioArr[_ind].unbind("mousedown", onRdEvent)
                }
                radioArr[_ind].unbind("click", onRdEvent);
                radioArr[_ind].css({
                    cursor: "default",
                    opacity: .5
                })
            }
        }
    };
    this.getEnable = function() {
        return p.enabled
    };
    this.show = function(_arr) {
        if (typeof _arr == "undefined") p.target.show();
        else {
            for (var i in _arr) {
                var _ind = Number(_arr[i]);
                $(radioArr[_ind]).show()
            }
        }
    };
    this.hide = function(_arr) {
        if (typeof _arr == "undefined") p.target.hide();
        else {
            for (var i in _arr) {
                var _ind = Number(_arr[i]);
                $(radioArr[_ind]).hide()
            }
        }
    };
    function onRdEvent(e) {
        var _id = $(this).attr("data-radiogroup_" + p.id);
        if (p.selectedIndex != _id) {
            if (e.type == "mousedown" || e.type == "touchstart") {
                focusOutInput();
                audioPlayerObj.playAudio("down");
                radioArr[_id].find("canvas")[0].down = true;
                drawRadioSel();
                if (e.type == "mousedown") {
                    $(window).unbind("mouseup", onWindowEvt).bind("mouseup", onWindowEvt)
                }
            } else {
                p.selectedIndex = _id;
                radioSelChanged()
            }
        }
    }
    function onWindowEvt(e) {
        audioPlayerObj.playAudio("up");
        for (var i = 0; i < radioArr.length; i++) {
            radioArr[i].find("canvas")[0].down = false
        }
        drawRadioSel();
        $(window).unbind("mouseup", onWindowEvt)
    }
    function drawRadioSel() {
    	var _ctx;
    	var _color,cgrd;
        for (var i = 0; i < radioArr.length; i++) {
            var _cnv = radioArr[i].find("canvas")[0];
	     	_cnv.width = _cnv.width;
     		_ctx = _cnv.getContext("2d");
            _ctx.beginPath();
            _ctx.arc(_cnv.width / 2, _cnv.height / 2, _cnv.width / 2 - dkScreenResize(2), 0, 2 * Math.PI);
            _ctx.fillStyle = _cnv.down ? "rgba(153, 153, 153, 0.6)": "rgba(255, 255, 255, 0.6)";
            _ctx.fill();
            _ctx.lineWidth = dkScreenResize(4);
            var _r = _cnv.width / 2 - dkScreenResize(7);
            if (p.radioSize <=26 ){
            	_ctx.lineWidth = dkScreenResize(3);
                _r = _cnv.width / 2 - dkScreenResize(6.5);
            }else if (p.radioSize <=23 ){
            	_ctx.lineWidth = dkScreenResize(2.5);
               _r = _cnv.width / 2 - dkScreenResize(5);
            }
            _color = p.color=="undefined"? "#999999" : p.color;
            _ctx.strokeStyle = _cnv.down ? "#545454": _color ;
            _ctx.stroke();
            if (p.selectedIndex == i) {
				cgrd= _ctx.createRadialGradient(_cnv.width/2, _cnv.height/2, 0 ,_cnv.width/2, _cnv.height/2, _cnv.width*3/4);
				cgrd.addColorStop(0, _color);
				cgrd.addColorStop(1, "#FFFFFF");
	   	    	_ctx.fillStyle = cgrd;
				_ctx.beginPath();
                _ctx.arc(_cnv.width / 2, _cnv.height / 2, _r, 0, 2 * Math.PI);
                _ctx.fill()
            }
        }
    }
    function radioSelChanged() {
        for (var i = 0; i < radioArr.length; i++) {
            radioArr[i].find("canvas")[0].down = false
        }
        drawRadioSel();
        if (p.onRdSelect) {
            p.onRdSelect({
                id: p.id,
                selected: p.selectedIndex
            })
        }
    }
};
var dkCompTextField = function() {
    var p = {
        value: 5,
        x: 0,
        y: 0,
        width: 57,
        height: 33,
        border: "none",
        innerBorder: "none",
        bgColor: "#E5E5E5",
        fontSize: "1em",
        align: "right",
        paddingTop: 4,
        padding: 6,
        type: "normal",
        toFixed: 0,
        maxlength: 4,
        incrDecrVarValue: 1,
        autoValidate: true,
        showControls: false,
        rSideLineShow: true,
        preTxt: "",
        sufTxt: "",
        isNumber: true,
        restrict: "",
        bgNone: false,
        color: "#000000",
        bold: false,
        controlBtnWidth: 24,
        controlBtnHeight: 11,
        controlBtnLineWidth: 2,
        controlBtnPadding: 1,
        showControlsLeft: 1,
        textVerticallyCenterBool: false
    };
    var _thisObj = this;
    var textBox, textBoxHolder;
    var inc;
    var dec;
    var outerWidth;
    var incDecLeft;
    var rightDiv;
    var colorComb;
    var updateWidth;
    var conWid, conHgt, incClick, idHold;
    this.init = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        p.x = Math.round(dkScreenResize(p.x));
        p.y = Math.round(dkScreenResize(p.y));
        p.padding = Math.round(dkScreenResize(p.padding));
        p.paddingTop = Math.round(dkScreenResize(p.paddingTop));
        if (p.showControls) {
            outerWidth = p.width + 30;
            incDecLeft = p.width;
            outerWidth = Math.round(dkScreenResize(outerWidth));
            incDecLeft = Math.round(dkScreenResize(incDecLeft))
        } else {
            outerWidth = Math.ceil(dkScreenResize(p.width))
        }
        p.width = Math.round(dkScreenResize(p.width));
        p.height = Math.round(dkScreenResize(p.height));
        p.controlBtnPadding = dkScreenResize(p.controlBtnPadding);
        p.restrict = p.restrict == "number" ? "1234567890.-": p.restrict;
        var _tDiv = document.createElement("div");
        if (p.target) {
            p.target.append(_tDiv)
        } else {
            $("body").append(_tDiv)
        }
        p.target = $(_tDiv);
        p.visible == false ? p.target.css("display", "none") : null;
        p.class ? p.target.attr("class", p.class) : null;
        p.target.css({
            position: "absolute",
            left: p.x + "px",
            top: p.y + "px",
            width: outerWidth,
            height: p.height,
            border: p.border,
            "padding-top": p.paddingTop + "px",
            "box-sizing": "border-box",
            "-webkit-box-sizing": "border-box",
            "-moz-box-sizing": "border-box",
            "-ms-box-sizing": "border-box",
            "-o-box-sizing": "border-box",
            outline: "none",
            "white-space": "nowrap",
            overflow: "hidden",
            "font-size": p.fontSize,
            color: p.color
        }).attr("id", p.id + "_TextField");
        p.index ? p.target.css("z-index", p.index) : null;
        p.bold ? p.target.css("font-weight", "bold") : null;
        textBox = p.type == "normal" ? document.createElement("div") : document.createElement("input");
        p.onFocusColor ? $(textBox).bind("focusin", onFocusIn) : null;
        textBoxHolder = document.createElement("div");
        p.target.append(textBoxHolder);
        if (p.rSideLineShow) {
            rightDiv = document.createElement("div");
            updateWidth = p.width - dkScreenResize(8);
            p.target.append(rightDiv)
        } else {
            updateWidth = p.width
        }
        $(textBoxHolder).css({
            position: "absolute",
            width: updateWidth,
            height: p.height,
            left: "0px",
            top: "0px",
            border: p.innerBorder,
            "box-sizing": "border-box"
        });
        if (!p.bgNone) {
            $(textBoxHolder).css({
                background: p.bgColor,
                "box-shadow": "rgba(0, 0, 0, 0.4) 3px 3px 5px inset"
            })
        }
        $(textBoxHolder).append(textBox);
        $(textBox).css({
            position: "absolute",
            width: updateWidth,
            height: $(textBoxHolder).height(),
            left: "0px",
            top: "0px",
            border: "0px solid #ff0000",
            background: "rgba(0,0,0,0)",
            font: "inherit",
            color: p.color,
            "text-align": p.align,
            padding: "0px " + p.padding + "px",
            "padding-top": p.paddingTop + "px",
            "box-sizing": "border-box",
            outline: "none",
            "white-space": "nowrap"
        });
        p.bold ? $(textBox).css("font-weight", "bold") : null;
        if (p.title) {
            p.title.textfield ? $(textBox).attr("p_title", GCTConv(p.title.textfield)) : $(textBox).attr("p_title", GCTConv(p.title))
        } else {
            $(textBox).attr("p_title", GetGlobalTooltip("tooltip", "textFeild"))
        }
        switch (Number(p.rSideLine)) {
        case 1:
            colorComb = "0,172,239";
            break;
        case 2:
            colorComb = "75,83,236";
            break;
        case 3:
            colorComb = "244,77,63";
            break;
        case 4:
            colorComb = "0,168,110";
            break;
        case 5:
            colorComb = "154,54,205";
            break;
        case 6:
            colorComb = "151,151,151";
            break;
        default:
            colorComb = p.rSideLine;
            break
        }
        if (p.rSideLineShow) {
            $(rightDiv).css({
                position: "absolute",
                width: dkScreenResize(5) + "px",
                height: p.height + "px",
                top: dkScreenResize(0) + "px",
                right: dkScreenResize(0) + "px",
                background: "rgba(" + colorComb + ",1)"
            })
        }
        if (p.showControls) {
            idHold = document.createElement("div");
            idHold.setAttribute("id", "isHold");
            inc = document.createElement("canvas");
            dec = document.createElement("canvas");
            p.target.append(idHold);
            var _bPix = p.controlBtnPadding < 1 ? 1 : p.controlBtnPadding;
            var _btnWidth = !p.buttonBg ? dkScreenResize(p.controlBtnWidth + p.controlBtnLineWidth) : dkScreenResize(24);
            $(idHold).css({
                position: "absolute",
                left: updateWidth + dkScreenResize(p.showControlsLeft) + "px",
                top: "0px",
                width: _btnWidth + "px",
                height: p.height + "px",
                background: "rgba(255, 0, 0, 0)"
            });
            $(idHold).append(inc).append(dec);
            inc.width = p.controlBtnWidth;
            inc.height = p.controlBtnHeight;
            inc.disabled = false;
            $(inc).css({
                position: "absolute",
                width: dkScreenResize(p.controlBtnWidth) + "px",
                height: dkScreenResize(p.controlBtnHeight) + "px",
                left: "4%",
                top: _bPix + "px"
            }).attr("data-" + p.id + "_inc", "true");
            drawButtons("inc", "normal");
            dec.width = p.controlBtnWidth;
            dec.height = p.controlBtnHeight;
            dec.disabled = false;
            $(dec).css({
                position: "absolute",
                width: dkScreenResize(p.controlBtnWidth) + "px",
                height: dkScreenResize(p.controlBtnHeight) + "px",
                left: "4%",
                bottom: _bPix + "px"
            }).attr("data-" + p.id + "_dec", "true");
            drawButtons("dec", "normal");
            if (p.buttonBg) {
                $(inc).css({
                    "box-shadow": "" + _bPix + "px " + _bPix + "px 0px 0px #999999, -" + _bPix + "px -" + _bPix + "px 0px 0px #FFFFFF",
                    background: p.buttonBg,
                    width: dkScreenResize(p.controlBtnWidth - 4),
                    height: "45%",
                    left: "4%",
                    top: _bPix + "px"
                });
                $(dec).css({
                    "box-shadow": "" + _bPix + "px " + _bPix + "px 0px 0px #999999, -" + _bPix + "px -" + _bPix + "px 0px 0px #FFFFFF",
                    background: p.buttonBg,
                    width: dkScreenResize(p.controlBtnWidth - 4),
                    height: "45%",
                    left: "4%",
                    bottom: _bPix + "px"
                })
            }
            if (p.title) {
                p.title.increase ? $(inc).attr("p_title", GCTConv(p.title.increase)) : $(inc).attr("p_title", GetGlobalTooltip("tooltip", "textFeild"));
                p.title.decrease ? $(dec).attr("p_title", GCTConv(p.title.decrease)) : $(dec).attr("p_title", GetGlobalTooltip("tooltip", "textFeild"))
            }
            bindEvents(true)
        }
        if (p.type == "normal") {
            $(textBox).css({
                cursor: "default"
            });
            $(textBox).removeAttr("p_title")
        }
        $(textBox).unbind("keyup", onTextFieldUpdate).bind("keyup", onTextFieldUpdate);
        $(textBox).unbind("focus", onTextFieldUpdate).bind("focus", onTextFieldUpdate);
        $(textBox).unbind("keypress", onTextFieldUpdate).unbind("keydown", onTextFieldUpdate);
        $(textBox).bind("keypress", onTextFieldUpdate);
        if (BrowserDetect.Android()) $(textBox).unbind("keyup", onTextFieldUpdate).bind("keyup", onTextFieldUpdate);
        if (p.autoValidate || p.change) {
            $(textBox).unbind("focusout").bind("focusout", onTextFieldUpdate)
        }
        _thisObj.setValue(p.value);
        setEnableDisableControls()
    };
    this.validate = function() {
        var _vval = _thisObj.getValue();
        _vval = Number(_thisObj.getValue());
        _vval = isNaN(_vval) ? 0 : _vval;
        var _multVal = Math.pow(10, p.toFixed);
        if (p.min) {
            _vval = _vval < p.min ? p.min: _vval;
            _thisObj.setValue(p.toFixed > 0 ? ((_vval * _multVal).toFixed(1) * 1).toFixed(0) / _multVal: p.toFixed == 0 ? Math.round(_vval) : _vval)
        }
        if (p.max) {
            _vval = _vval > p.max ? p.max: _vval;
            _thisObj.setValue(p.toFixed > 0 ? ((_vval * _multVal).toFixed(1) * 1).toFixed(0) / _multVal: p.toFixed == 0 ? Math.round(_vval) : _vval)
        }
    };
    this.addEventListener = function(_evt, _fun) {
        p[_evt] = _fun
    };
    this.dispatchEvent = function(_evt) {
        if (p[_evt]) {
            p[_evt]()
        }
    };
    this.getValue = function() {
        if (p.type == "normal") {
            if (!p.textVerticallyCenterBool) {
                return $(textBox).text()
            } else {
                return $(textBox).find("span").text()
            }
        } else {
            var _tVal = $(textBox).val();
            if (p.preTxt != "") {
                _tVal = _tVal.replace(p.preTxt, "")
            } else if (p.sufTxt != "") {
                _tVal = _tVal.replace(p.sufTxt, "")
            }
            return _tVal
        }
    };
    this.setValue = function(_tempVal) {
        _tempVal = p.toFixed && !isNaN(_tempVal) ? ((_tempVal * 10).toFixed(p.toFixed - 1) / 10).toFixed(p.toFixed) : _tempVal;
        _tempVal = p.preTxt + _tempVal + p.sufTxt;
        if (p.type == "normal") {
            $(textBox).css({
                display: "table",
                padding: "0px",
                "padding-right": "2px"
            }).empty();
            var _span = document.createElement("span");
            $(_span).css({
                display: "table-cell",
                "vertical-align": "middle",
                padding: "0px " + p.padding + "px",
                "padding-top": p.paddingTop + "px"
            });
            $(_span).html(_tempVal);
            $(textBox).append(_span)
        } else {
            var textDimention = getTextDimentions(p.label, p.fontSize);
            var parentHt = $(textBox).parent().height();
            var _margin = parentHt / 2 - textDimention.height / 2;
            _margin += dkScreenResize(1);
            $(textBox).css({
                "padding-top": "0px",
                top: _margin + "px",
                height: "auto"
            }).val(_tempVal)
        }
        if (typeof p.min != "undefined" || typeof p.max != "undefined") {
            setEnableDisableControls()
        }
    };
    function getTextDimentions(txt, fontSize) {
        $(".desktop").append("<span class='sampleTextDiv' style='font-size:" + fontSize + ";display:none'>" + txt + "</span>");
        var textObj = new Object;
        textObj.width = $(".sampleTextDiv").width();
        textObj.height = $(".sampleTextDiv").height();
        $(".sampleTextDiv").remove();
        return textObj
    }
    this.updateVal = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        if (typeof _obj.value != "undefined" || typeof _obj.min != "undefined" || typeof _obj.max != "undefined") {
            setEnableDisableControls()
        }
    };
    this.show = function() {
        p.target.show()
    };
    this.hide = function() {
        p.target.hide()
    };
    this.enable = function() {
        if (p.type != "normal") {
            $(textBox).removeAttr("disabled").removeClass("inputDis");
            p.target.css("opacity", 1)
        }
        setEnableDisableControls();
        if (p.showControls) {
            bindEvents(true)
        }
    };
    this.disable = function() {
        if (p.type != "normal") {
            $(textBox).attr("disabled", "true").addClass("inputDis");
            p.target.css("opacity", .5)
        }
        if (p.showControls) {
            dec.disabled = true;
            drawButtons("dec", "disabled");
            drawButtons("inc", "disabled");
            inc.disabled = true;
            bindEvents(false)
        }
    };
    this.getFocus = function() {
        $(textBox).focus()
    };
    this.changeTitle = function(_title) {
        if (_title) {
            p.title = _title;
            $(textBox).attr("p_title", GCTConv(p.title))
        }
    };
    this.updateMaxMin = function(_min, _max) {
        p.min = _min;
        p.max = _max;
        setEnableDisableControls()
    };
    this.getMaxMin = function() {
        return {
            min: p.min,
            max: p.max
        }
    };
    this.changeRSideline = function(_color) {
        $(rightDiv).css({
            background: _color
        })
    };
    function bindEvents(flag) {
        if (flag) {
            $(idHold).unbind("click", onTextFieldUpdate).bind("click", onTextFieldUpdate);
            if (BrowserDetect.any()) {
                $(idHold).unbind("touchstart", onMouseEvent).bind("touchstart", onMouseEvent);
                $(idHold).unbind("touchend", onMouseEvent).bind("touchend", onMouseEvent)
            } else {
                $(idHold).unbind("mousedown", onMouseEvent).bind("mousedown", onMouseEvent);
                $(idHold).unbind("mousemove", onMouseEvent).bind("mousemove", onMouseEvent);
                $(idHold).unbind("mouseout", onMouseEvent).bind("mouseout", onMouseEvent)
            }
        } else {
            $(idHold).unbind("click", onTextFieldUpdate);
            if (BrowserDetect.any()) {
                $(idHold).unbind("touchstart", onMouseEvent);
                $(idHold).unbind("touchend", onMouseEvent)
            } else {
                $(idHold).unbind("mousedown", onMouseEvent);
                $(idHold).unbind("mousemove", onMouseEvent);
                $(idHold).unbind("mouseout", onMouseEvent)
            }
        }
    }
    function onFocusIn() {
        $(textBoxHolder).css({
            background: p.onFocusColor
        });
        $(window).unbind("focusout", onFocusOut).bind("focusout", onFocusOut)
    }
    function onFocusOut() {
        $(window).unbind("focusout", onFocusOut);
        $(textBoxHolder).css({
            background: p.bgColor
        })
    }
    function getRound(num, dec) {
        var tempArr = ("" + num).split(".");
        if (tempArr[1]) {
            var str = tempArr[1];
            if (dec < str.length) {
                var newStr = "0.";
                for (var i = 0; i < dec - 1; i++) {
                    newStr += "0"
                }
                if (5 <= str[dec] * 1) {
                    newStr += "1"
                } else {
                    newStr += "0"
                }
                num = ((tempArr[0] + "." + tempArr[1].slice(0, dec)) * 1 + Number(newStr)).toFixed(dec)
            }
        }
        return num
    }
    function onTextFieldUpdate(e) {
        var txtVal = _thisObj.getValue();
        if (e.type == "focus") {
            p.type == "normal" ? $(textBox).text(txtVal) : $(textBox).val(txtVal);
            p.onFocus ? p.onFocus({
                id: p.id
            }) : null
        }
        if (e.type == "click") {
            var _incClick = e.pageY >= $(this).offset().top && e.pageY <= $(this).offset().top + $(this).height() / 2;
            if (_incClick) {
                if (!inc.disabled) {
                    txtVal = Number(txtVal) + p.incrDecrVarValue;
                    _thisObj.setValue(txtVal);
                    onEnterUpdate(e);
                    p.textChange ? p.textChange({
                        id: p.id,
                        val: _thisObj.getValue()
                    }) : null;
                    setEnableDisableControls()
                }
            } else {
                if (!dec.disabled) {
                    txtVal = Number(txtVal) - p.incrDecrVarValue;
                    _thisObj.setValue(txtVal);
                    onEnterUpdate(e);
                    p.textChange ? p.textChange({
                        id: p.id,
                        val: _thisObj.getValue()
                    }) : null;
                    setEnableDisableControls()
                }
            }
        }
        if (e.type == "focusout") {
            onEnterUpdate(e)
        } else if (e.type == "keypress" || e.type == "keydown") {
            var key = e.which;
            if (key == 13) {
                audioPlayerObj.playAudio("confirm");
                onEnterUpdate(e);
                return false
            }
            if (p.restrict != "" && p.restrict.toLowerCase().indexOf(String.fromCharCode(key).toLowerCase()) == -1 && key != 0 && key != 8) {
                return false
            }
            var maxL = _thisObj.getValue().length;
            if (Math.abs(document.activeElement.selectionEnd - document.activeElement.selectionStart) <= 0 && (maxL >= p.maxlength && key != 0 && key != 8)) {
                return false
            }
            p.onKeyPress ? p.onKeyPress(e) : null
        } else if (e.type == "keyup") {
            txtVal.length > p.maxlength ? _thisObj.setValue(txtVal.split(txtVal[p.maxlength - 1])[0]) : null
        }
    }
    function setEnableDisableControls() {
        if (p.showControls) {
            var txtVal = _thisObj.getValue();
            if (txtVal >= p.max) {
                drawButtons("inc", "disabled");
                inc.disabled = true
            } else {
                drawButtons("inc", "normal");
                inc.disabled = false
            }
            if (txtVal <= p.min) {
                dec.disabled = true;
                drawButtons("dec", "disabled")
            } else {
                dec.disabled = false;
                drawButtons("dec", "normal")
            }
        }
    }
    function onMouseEvent(e) {
        if (e.type == "mousedown" || e.type == "touchstart") {
            if (e.type == "touchstart") {
                e.pageX = e.originalEvent.touches[0].pageX;
                e.pageY = e.originalEvent.touches[0].pageY
            }
            incClick = e.pageY >= $(this).offset().top && e.pageY <= $(this).offset().top + $(this).height() / 2 ? inc: dec;
            if (!incClick.disabled) {
                audioPlayerObj.playAudio("down");
                $(incClick).css({
                    transform: "scale(0.9)",
                    "-ms-transform": "scale(0.9)",
                    "-webkit-transform": "scale(0.9)"
                })
            }
            if (!BrowserDetect.any()) {
                $(window).unbind("mouseup", onMouseEvent).bind("mouseup", onMouseEvent)
            }
        }
        if (e.type == "mouseup" || e.type == "touchend") {
            if (!incClick.disabled) {
                audioPlayerObj.playAudio("up")
            }
            $(window).unbind("mouseup", onMouseEvent);
            $(inc).css({
                transform: "scale(1)",
                "-ms-transform": "scale(1)",
                "-webkit-transform": "scale(1)"
            });
            $(dec).css({
                transform: "scale(1)",
                "-ms-transform": "scale(1)",
                "-webkit-transform": "scale(1)"
            })
        }
        if (e.type == "mousemove") {
            incClick = e.pageY >= $(this).offset().top && e.pageY <= $(this).offset().top + $(this).height() / 2 ? inc: dec;
            if (!incClick.disabled) {
                $(idHold).css("cursor", "pointer")
            } else {
                $(idHold).css("cursor", "default")
            }
        }
        if (e.type == "mouseout") {
            $(idHold).css("cursor", "default")
        }
    }
    function onEnterUpdate(e) {
        p.isNumber && isNaN(_thisObj.getValue()) ? _thisObj.setValue(0) : null;
        p.autoValidate ? _thisObj.validate() : null;
        e.id = p.id;
        p.change ? p.change(e) : null;
        setEnableDisableControls()
    }
    function drawButtons(_btn, _type) {
        if (_btn == "inc") {
            inc.width = inc.width;
            inc.getContext("2d").beginPath();
            inc.getContext("2d").fillStyle = _type == "normal" ? "#666666": "#B3B3B3";
            inc.getContext("2d").lineWidth = p.controlBtnLineWidth;
            inc.getContext("2d").strokeStyle = p.buttonBg ? p.buttonBg: "#ffffff";
            inc.getContext("2d").moveTo(inc.width / 2, p.controlBtnLineWidth / 2);
            inc.getContext("2d").lineTo(inc.width - p.controlBtnLineWidth / 2, inc.height - p.controlBtnLineWidth / 2);
            inc.getContext("2d").lineTo(p.controlBtnLineWidth / 2, inc.height - p.controlBtnLineWidth / 2);
            inc.getContext("2d").lineTo(inc.width / 2, p.controlBtnLineWidth / 2);
            inc.getContext("2d").fill();
            inc.getContext("2d").stroke();
            inc.getContext("2d").closePath()
        } else if (_btn == "dec") {
            dec.width = dec.width;
            dec.getContext("2d").beginPath();
            dec.getContext("2d").fillStyle = _type == "normal" ? "#666666": "#B3B3B3";
            dec.getContext("2d").lineWidth = p.controlBtnLineWidth;
            dec.getContext("2d").strokeStyle = p.buttonBg ? p.buttonBg: "#ffffff";
            dec.getContext("2d").moveTo(dec.width / 2, dec.height - p.controlBtnLineWidth / 2);
            dec.getContext("2d").lineTo(dec.width - p.controlBtnLineWidth / 2, p.controlBtnLineWidth / 2);
            dec.getContext("2d").lineTo(p.controlBtnLineWidth / 2, p.controlBtnLineWidth / 2);
            dec.getContext("2d").lineTo(dec.width / 2, dec.height - p.controlBtnLineWidth / 2);
            dec.getContext("2d").fill();
            dec.getContext("2d").stroke();
            dec.getContext("2d").closePath()
        }
    }
};
var dkCompSlider = function() {
    var p = {
        x: 0,
        y: 0,
        width: 30,
        height: 10,
        color: "#979797",
        min: 0,
        max: 100,
        value: 50,
        inverse: false,
        horizontal: true,
        autoTrigger: false,
        knobHeight: 35,
        knobWidth: 11,
        knobType: 0,
        willHighLight: false,
        attechedLabel : "",
		labelWidth:80,
		labelHeight:30,
		labelBkColor:"",
		labelText:"",
		labelTextColor:""
    };
    var _thisObj = this;
    var isDisabled = false;
    var sliderDiv;
    var labelDiv;
    var slidCnv = document.createElement("canvas");
    var slidKnobBg = document.createElement("canvas");
    var slidCtx = slidCnv.getContext("2d");
    this.init = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        p.x = dkScreenResize(p.x);
        p.y = dkScreenResize(p.y);
		if (p.height>26){
			p.height = 26;
		}else if (p.height < 3){
			p.height = 3;
		}
		if (p.width < 20 ){
			p.width = 20;
		}
		if (p.knobHeight> 50){
			p.knobHeight = 50;
		}else if (p.knobHeight < 22){
			p.knobHeight=22;
		}
		if (p.knobWidth > 50){
			p.knobWidth = 50;
		}else if (p.knobWidth < 10){
			p.knobWidth=10;
			if (p.knobType==2){
				p.knobWidth=22;
			}
		}
		p.width = dkScreenResize(p.width);
        p.height = dkScreenResize(p.height);
        p.knobWidth = dkScreenResize(p.knobWidth);
        p.knobHeight = dkScreenResize(p.knobHeight);
		if (p.color == "undefined"){
            p.color = "#979797";
		}
		if (p.knobColor == "undefined"){
            p.knobColor = p.color;
		}
		var _tDiv = document.createElement("div");
        if (p.target) {
            p.target.append(_tDiv)
        } else {
            $("body").append(_tDiv)
        }
        p.target = $(_tDiv);
        p.visible == false ? p.target.css("display", "none") : null;
        p.index ? p.target.css("z-index", p.index) : null;
        createBaseLine();
        drawKnob()
    };
    this.value = function(_val) {
        if (_val == undefined) {
            return p.value
        } else {
            p.minStep ? $(sliderDiv).slider("option", "step", p.minStep) : null;
            $(sliderDiv).slider("value", _val);
            $(sliderDiv).slider("option", "step", p.step)
            if (p.attechedLabel!=""){
		    	$(labelDiv).children("label").html(String(_val)) ;
            }
        }
    };

    this.addEventListener = function(_evt, _fun) {
        p[_evt] = _fun
    };
    this.show = function() {
        p.target.show();
        $(labelDiv).show();
    };
    this.hide = function() {
        p.target.hide()
        $(labelDiv).hide();
    };
    this.enable = function() {
        isDisabled = false;
        $(sliderDiv).slider("option", "disabled", false);
        $(sliderDiv).css("opacity", "1");
        $(labelDiv).css("opacity", "1");
		var _str = $(sliderDiv).children("a").attr("style");
        if (_str.indexOf("cursor") != -1) {
            _str = _str.replace(_str.substring(_str.indexOf("cursor"), _str.indexOf(";", _str.indexOf("cursor")) + 1), "");
            $(sliderDiv).children("a").attr("style", _str)
        }
        $(sliderDiv).children("a").addClass("commongrab").removeAttr("href");
        if (BrowserDetect.any()) {
            $(sliderDiv).unbind("touchstart", onEventAudio).bind("touchstart", onEventAudio);
            $(sliderDiv).unbind("touchend", onEventAudio).bind("touchend", onEventAudio)
        } else {
            $(sliderDiv).unbind("mousedown", onEventAudio).bind("mousedown", onEventAudio)
        }
    };
    this.disable = function() {
        isDisabled = true;
        $(sliderDiv).slider("option", "disabled", true);
        $(sliderDiv).css("opacity", "0.5");
        $(labelDiv).css("opacity", "0.5");
        $(sliderDiv).children("a").removeClass("commongrab");
        $(sliderDiv).children("a").css("cursor", "default");
        if (BrowserDetect.any()) {
            $(sliderDiv).unbind("touchstart", onEventAudio).unbind("touchend", onEventAudio)
        } else {
            $(sliderDiv).unbind("mousedown", onEventAudio)
        }
    };
    this.updateMaxMin = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        p.value = p.value > p.max ? p.max: p.value < p.min ? p.min: p.value;
        $(sliderDiv).slider({
            min: p.min,
            max: p.max,
            value: p.value,
            step: p.step
        })
    };
    this.getMaxMin = function() {
        return {
            min: p.min,
            max: p.max
        }
    };
    this.updateRestrictMax = function(_val) {
        p.restrictMax = _val
    };
    this.updateRestrictMin = function(_val) {
        p.restrictMin = _val
    };
    this.updateTitle = function(_val) {
        p.title = _val;
        $(slidCnv).attr("p_title", GCTConv(p.title));
        $(sliderDiv).children("a").attr("p_title", GCTConv(p.title))
    };
    this.changeColor = function(_color, _konbcolor, _labelbkcolor, _flagForBg, _flagForKnob,_flagLabelBk) {
        p.color = _color;
        p.knobColor = _konbcolor;
        p.labelBkColor = _labelbkcolor;
        if (!_flagForKnob) drawKnob();
        if (!_flagForBg) {
            $(sliderDiv).css({
                background: p.color
            })
        }
        if (p.attechedLabel!="" && !_flagLabelBk){
		   	$(labelDiv).css({
                background: p.labelBkColor
            })
        };
    };
    this.visibleKnob = function(flag) {
        if (flag) {
            $(slidCnv).show();
            $(slidKnobBg).show()
        } else {
            $(slidCnv).hide();
            $(slidKnobBg).hide()
        }
    };
    this.setHighLightKnob = function(_flag, _color, _blurVal, _spreadVal) {
        if (_flag) {
            if (typeof _blurVal == "undefined") _blurVal = 5;
            if (typeof _spreadVal == "undefined") _spreadVal = 1;
            $(slidKnobBg).css("box-shadow", "0px 0px " + dkScreenResize(_blurVal) + "px " + dkScreenResize(_spreadVal) + "px " + _color)
        } else {
            $(slidKnobBg).css("box-shadow", "")
        }
    };
    function createBaseLine() {
        if (p.target != undefined) {
            p.target.css({
                position: "absolute",
                left: p.x + "px",
                top: p.y + "px"
            });
            sliderDiv = document.createElement("div");
            p.target.append(sliderDiv);
            $(sliderDiv).slider();
            $(sliderDiv).css({
                position: "absolute",
                left: "0px",
                top: dkScreenResize(13) + "px",
                width: p.width + "px",
                height: p.height + "px",
                background: p.color,
                "border-radius": "3px",
                "box-shadow": "2px 2px 2px rgba(0,0,0,0.5) inset"
            });
            $(sliderDiv).children("a").css({
                position: "absolute",
                "text-align": "center",
                outline: "none"
            });
			if (p.attechedLabel != "undefined" && p.attechedLabel != ""){
				labelDiv = document.createElement("div");
				$(".desktop").append(labelDiv);
				$(labelDiv).css({
	                position: "absolute",
	                left: p.x + p.width + dkScreenResize(13) + "px",
	                top:  p.y + dkScreenResize(3) + "px",
	                width: dkScreenResize(p.labelWidth) + "px",
	                height: dkScreenResize(p.labelHeight) + "px",
	                background: p.labelBkColor,
	                "border-radius": "4px",
	                "z-index": p.index?p.index:0
				});
				var labelObj = document.createElement("label");
				$(labelDiv).append(labelObj);
				$(labelDiv).children("label").css({
	                position: "absolute",
					left :"0px",
					top : dkScreenResize(2.5)+ "px",
					width : "100%",
					height: "100%",
	                "text-align": "center",
        		    "vertical-align": "top",
        		    outline: "none",
            		"font-size": "0.85em",
            		"font-family": "Helvetica",
            		"color": p.labelTextColor,
				});
				$(labelDiv).children("label").html( p.labelText) ;
			}

            $(sliderDiv).slider({
                min: p.min,
                max: p.max,
                orientation: p.horizontal ? "horizontal": "vertical",
                step: p.step ? p.step: null,
                change: sliderEvents,
                create: sliderEvents,
                slide: sliderEvents,
                start: sliderEvents,
                stop: sliderEvents
            });
            if (p.horizontal) {
                $(sliderDiv).children("a").css({
                    top: "0px",
                    left: "0px",
                    width: dkScreenResize(25) + "px",
                    height: p.knobHeight + "px",
                    "margin-top": -(p.knobHeight - p.height) / 2 + "px",
                    "margin-left": -(p.knobHeight - p.height) / 2 + "px"
                });
                $(slidKnobBg).css({
                    position: "absolute",
                    top: dkScreenResize(1) + "px",
                    left: dkScreenResize(13) + "px",
                    width: dkScreenResize(3) + "px",
                    height: dkScreenResize(33) + "px"
                })
            } else {
                $(sliderDiv).children("a").css({
                    bottom: "0px",
                    left: "0px",
                    width: p.knobHeight + "px",
                    height: dkScreenResize(15) + "px",
                    "margin-bottom": dkScreenResize( - 8) + "px",
                    "margin-left": -(p.knobHeight - p.width) / 2 + "px"
                });
                $(slidKnobBg).css({
                    position: "absolute",
                    top: dkScreenResize(8) + "px",
                    left: dkScreenResize(1) + "px",
                    width: dkScreenResize(33) + "px",
                    height: dkScreenResize(4) + "px"
                })
            }
            _thisObj.enable();
            $(sliderDiv).slider("option", "value", p.inverse ? p.max + p.min - p.value: p.value);
            if (p.autoTrigger) {
                setTimeout(function() {
                    triggerEvent("slide");
                    triggerEvent("change")
                },
                10)
            }
        }
    }
    function triggerEvent(_evt) {
        $slider = $(sliderDiv);
        var _customEvent = {
            id: p.id,
            type: _evt,
            value: p.value
        };
        var _customUI = {
            value: p.value
        };
        $slider.slider("option", _evt).call($slider, _customEvent, _customUI)
    }
    function drawKnob() {
        if (p.willHighLight) $(sliderDiv).children("a").append(slidKnobBg);
        $(sliderDiv).children("a").append(slidCnv);
        p.title ? _thisObj.updateTitle(p.title) : _thisObj.updateTitle(GetGlobalTooltip("tooltip", "sliderKnob"));
        slidCnv.width = p.knobWidth;
        slidCnv.height = p.knobHeight;
        if (!p.horizontal) {
            $(slidCnv).css({
                position: "absolute",
                top: dkScreenResize(4) + "px",
                left: "0px"
            });
            slidCnv.width = p.knobHeight;
            slidCnv.height = p.knobWidth;
            slidCtx.translate(0, p.knobWidth);
            slidCtx.rotate( - Math.PI / 2)
        } else {
            $(slidCnv).css({
                left :   "-10px",
                transform: "rotate(0deg)",
                "-webkit-transform": "rotate(0deg)",
                "-ms-transform": "rotate(0deg)"
            });
            slidCnv.width = p.knobWidth;
            slidCnv.height = p.knobHeight
        }
        slidCtx.beginPath();
		var cgrd,_r;
		if (p.knobType == 0 || p.knobType == "undefined"){
			cgrd= slidCtx.createLinearGradient(dkScreenResize(5), dkScreenResize(5),p.knobWidth,  p.knobHeight);
			cgrd.addColorStop(0, typeof p.knobColor != "undefined" ? p.knobColor: p.color);
			cgrd.addColorStop(1, "#888888");
	   	    slidCtx.fillStyle = cgrd;
			dkRoundRect( slidCtx,dkScreenResize(1), dkScreenResize(1),p.knobWidth-dkScreenResize(2), p.knobHeight-dkScreenResize(2),dkScreenResize(3),true,false);
		}else if (p.knobType == 1){
			cgrd= slidCtx.createLinearGradient(dkScreenResize(5), dkScreenResize(5),p.knobWidth,  p.knobHeight);
			cgrd.addColorStop(0, typeof p.knobColor != "undefined" ? p.knobColor: p.color);
			cgrd.addColorStop(1, "#DDDDDD");
	   	    slidCtx.fillStyle = cgrd;
			dkRoundRect( slidCtx,dkScreenResize(1), dkScreenResize(1),p.knobWidth-dkScreenResize(2), p.knobHeight-dkScreenResize(2),dkScreenResize(3),true,false);
			cgrd= slidCtx.createLinearGradient( p.knobWidth*2/3,  p.knobHeight*2/3,p.knobWidth/5,  p.knobHeight/5);
			cgrd.addColorStop(0, typeof p.knobColor != "undefined" ? p.knobColor: p.color);
			cgrd.addColorStop(1, "#EEEEEE");
	   	    slidCtx.fillStyle = cgrd;
			dkRoundRect( slidCtx,dkScreenResize(1)+(p.knobWidth-dkScreenResize(2))/4, dkScreenResize(1)+(p.knobHeight-dkScreenResize(2))/4,(p.knobWidth-dkScreenResize(2))/2, (p.knobHeight-dkScreenResize(2))/2,dkScreenResize(2),true,false);
		}else if (p.knobType == 2){
			_r = p.knobWidth <= p.knobHeight ? p.knobWidth/2-dkScreenResize(1.5) : p.knobHeight/2-dkScreenResize(1.5);
			cgrd= slidCtx.createLinearGradient( _r,_r, _r*2,  _r*2);
			cgrd.addColorStop(0, typeof p.knobColor != "undefined" ? p.knobColor: p.color);
			cgrd.addColorStop(1, "#EEEEEE");
	   	    slidCtx.fillStyle = cgrd;
	   	    slidCtx.beginPath();
	   		slidCtx.arc( _r, slidCnv.height/2, _r, 0 , 2*Math.PI , true );
	   		slidCtx.closePath();
	       	slidCtx.fill();
			cgrd= slidCtx.createLinearGradient(  _r*1.5,  _r*1.5, _r/3,_r/3);
			cgrd.addColorStop(0, typeof p.knobColor != "undefined" ? p.knobColor: p.color );
			cgrd.addColorStop(1,"#EEEEEE");
	   	    slidCtx.fillStyle = cgrd;
	   	    slidCtx.beginPath();
	   		slidCtx.arc( _r, slidCnv.height/2, _r/2, 0 , 2*Math.PI , true );
	   		slidCtx.closePath();
	       	slidCtx.fill();
		}
    }
    function onEventAudio(e) {
        if (e.type == "mousedown") {
            $(document).unbind("mouseup", onEventAudio).bind("mouseup", onEventAudio)
        }
        if (e.type == "mousedown" || e.type == "touchstart") {
            e.type = "mousedown";
            addPointerGrabbing(true);
            audioPlayerObj.playAudio("down")
        } else if (e.type == "mouseup" || e.type == "touchend") {
            e.type = "mouseup";
            addPointerGrabbing(false);
            audioPlayerObj.playAudio("up");
            $(document).unbind("mouseup", onEventAudio)
        }
        if (p[e.type]) {
            p[e.type](e)
        }
    }
    function sliderEvents(e, ui) {
        var flagForRestrict = false;
        if (p.id) {
            e.id = p.id
        }
        e.value = p.inverse ? p.max + p.min - Number(ui.value) : ui.value;
        switch (e.type) {
        case "slidechange":
            e.type = "change";
            break;
        case "slidecreate":
            e.type = "create";
            break;
        case "slide":
            if (typeof p.restrictMax != "undefined") {
                if (p.restrictMax < ui.value) {
                    e.value = p.restrictMax;
                    $(sliderDiv).slider("value", p.restrictMax);
                    flagForRestrict = true
                }
            }
            if (typeof p.restrictMin != "undefined") {
                if (p.restrictMin > ui.value) {
                    e.value = p.restrictMin;
                    $(sliderDiv).slider("value", p.restrictMin);
                    flagForRestrict = true
                }
            }
            if (isDisabled) return false;
            e.type = "slide";
            break;
        case "slidestart":
            e.type = "start";
            break;
        case "slidestop":
            e.type = "stop";
            if (p.restrictMax) {
                if ($(sliderDiv).slider("value") > p.restrictMax) {
                    $(sliderDiv).slider("value", p.restrictMax)
                }
            }
            if (p.restrictMin) {
                if ($(sliderDiv).slider("value") < p.restrictMin) {
                    $(sliderDiv).slider("value", p.restrictMin)
                }
            }
            break
        }
        p.value = e.value;
        if (p.restrictMax) {
            if (p.value >= p.restrictMax) {
                p.value = p.restrictMax
            }
        }
        if (p.restrictMin) {
            if (p.value <= p.restrictMin) {
                p.value = p.restrictMin
            }
        }
        e.value = p.value;
        if (p[e.type]) {
            p[e.type](e, ui)
        }
        if (p.attechedLabel!=""){
		  	$(labelDiv).children("label").html(String(p.value)) ;
        }

        if (flagForRestrict) return false
    }
};
var dkCompButton = function() {
    var p = {
        id: "",
        x: 0,
        y: 0,
        width: 192,
        height: 46,
        fontSize: "1em",
        orientation: "horizontal",
        border: false,
        bgColor: "#F2F2F2",
        label: "LABEL",
        visibility: true,
        selected: false,
        paddingTop: 0,
        borderRadius:0,
        borderStyle:false,
 		borderSize:2,
 		borderColor:"#444444"
    };
    var _thisObj = this;
    var inDiv, innerDiv;
    var isClicked = false;
    this.init = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        p.x = Math.round(dkScreenResize(p.x));
        p.y = Math.round(dkScreenResize(p.y));
        p.width = Math.round(dkScreenResize(p.width));
        p.height = Math.round(dkScreenResize(p.height));
        p.paddingTop = Math.round(dkScreenResize(p.paddingTop));
        p.borderRadius = Math.round(dkScreenResize(p.borderRadius));
        if (p.borderStyle!=undefined && p.borderStyle==true ){
        	p.borderSize = p.borderSize? dkScreenResize(p.borderSize):dkScreenResize(2);
        }
        var _tDiv = document.createElement("div");
        if (p.target) {
            p.target.append(_tDiv)
        } else {
            $("body").append(_tDiv)
        }
        p.target = $(_tDiv);
        p.visible == false ? p.target.css("display", "none") : null;
        p.index ? p.target.css("z-index", p.index) : null;
        p.target.css({
            position: "absolute",
            left: p.x + "px",
            top: p.y + "px",
            width: p.width + "px",
            height: p.height + "px",
            "text-align": "center",
            cursor: "pointer",
         	"border-radius": p.borderRadius+"px",
        });
		if (p.borderStyle!=undefined && p.borderStyle==true){
			p.target.css({
	         	"border": p.borderSize + "px solid " + p.borderColor,
	        });
		}
		p.target.attr("p_title", p.title ? GCTConv(p.title) : GetGlobalTooltip("tooltip", "genricClick"));
        var _wid = p.width;
        var _hgt = p.height;
        inDiv = document.createElement("div");
        p.target.append(inDiv);
        $(inDiv).css({
            width: _wid,
            height: _hgt,
            position: "absolute",
            overflow: "hidden",
        });
        innerDiv = document.createElement("div");
        $(inDiv).append(innerDiv);
        $(innerDiv).css({
            width: _wid,
            height: _hgt,
            display: "table-cell",
            "font-size": p.fontSize,
            "padding-top": p.paddingTop + "px",
            "font-weight": "bold",
            "vertical-align": "middle",
            "color": p.color,
         	"border-radius": p.borderRadius +"px",
        }).html(p.label);
        if (p.srcUp) {
            $(innerDiv).css({
                background: "url(" + gizmoImageObj[p.srcUp].src + ") no-repeat"
            });
            $(innerDiv).css({
                "background-size": _wid + "px " + _hgt + "px"
            })
        } else {
            p.target.css({
                background: p.bgColor
            })
        }
        p.title ? $(innerDiv).attr("p_title", p.title ? GCTConv(p.title) : GetGlobalTooltip("tooltip", "genricClick")) : null;
        var _bPix = dkScreenResize(2) < 2 ? 2 : dkScreenResize(2);
        _thisObj.enable();
        if (p.border) {
            p.target.css("box-shadow", "0px 0px 0px " + dkScreenResize(3) + "px rgba(255, 255, 255, 0.6) , 0px 0px 0px " + dkScreenResize(8) + "px rgba(0,0,0,0.2), " + _bPix + "px " + _bPix + "px 0px 0px #000000, -" + _bPix + "px -" + _bPix + "px 0px 0px #FFFFFF")
        } else {
            if (!p.srcUp) {
				p.target.css("box-shadow", "" + _bPix + "px " + _bPix + "px " + _bPix+ "px" +" 0px #AAAAAA, -" + _bPix + "px -" + _bPix + "px 0px 0px #FFFFFF")
			}
        }
		makeOverState(false)
    };
    this.addEventListener = function(_evt, _fun) {
        p[_evt] = _fun
    };
    this.setState = function(_stat) {
        if (_stat) {
            _thisObj.enable()
        } else {
            _thisObj.disable()
        }
    };
    this.showBtn = function(bool) {
        if (bool) {
            _thisObj.show()
        } else {
            _thisObj.hide()
        }
    };
    this.setSelected = function(_bool) {
        makeOverState(_bool)
    };
    this.show = function() {
        p.target.show()
    };
    this.setLabel = function(_str) {
        p.label = _str;
        $(innerDiv).html(p.label)
    };
    this.hide = function() {
        p.target.hide()
    };
    this.enable = function() {
        if (BrowserDetect.any()) {
            p.target.off("touchstart", btnEvt).off("touchend", btnEvt).on("touchstart", btnEvt).on("touchend", btnEvt)
        } else {
            p.target.off("mousedown", btnEvt).off("click", btnEvt).on("mousedown", btnEvt).on("click", btnEvt);
            p.target.off("mouseover", onOver).off("mouseout", onOut).on("mouseover", onOver).on("mouseout", onOut)
        }
        p.target.css({
            opacity: 1,
            cursor: "pointer"
        })
    };
    this.disable = function() {
        if (BrowserDetect.any()) {
            p.target.off("touchstart", btnEvt).off("touchend", btnEvt)
        } else {
            p.target.off("mousedown", btnEvt).off("click", btnEvt);
            p.target.off("mouseover", onOver).off("mouseout", onOut)
        }
        p.target.css({
            opacity: .5,
            cursor: "default"
        });
        if (p.highLightColor) $(innerDiv).css("color", "#333333")
    };
    this.updateTop = function(_top) {
        p.target.css({
            top: _top
        })
    };
    this.updateIndex = function(_index) {
        p.target.css({
            "z-index": _index
        })
    };
    this.setOpacity = function(_val) {
        p.target.css({
            opacity: _val
        })
    };
    function onOver(e) {
        if ( p.borderStyle==true ){
			$(innerDiv).css({
		   		background: p.borderColor,
		        color: "#FFFFFF",
		    });
		    p.target.css({
		   		background: p.borderColor,
		        color: "#FFFFFF",
		    });
        }else{
			$(innerDiv).css({
	            background: p.highLightColor,
	        });
        }
    }
    function onOut(e) {
        if (p.borderStyle!=undefined && p.borderStyle==true ){
			$(innerDiv).css({
	            background: p.bgColor,
		        color: p.color,
	        });
		    p.target.css({
	            background: p.bgColor,
		        color: p.color,
		    });
        }else{
			$(innerDiv).css({
	            background: p.bgColor,
	        });
	    }
    }
    function btnEvt(e) {
        var _bPix = dkScreenResize(1) < 1 ? 1 : dkScreenResize(1);
        if (e.type == "mousedown") {
            $(window).off("mouseup mouseleave", onWindowUp).on("mouseup mouseleave", onWindowUp)
        }
        if (e.type == "mousedown" || e.type == "touchstart") {
            isClicked = true;
            focusOutInput();
            audioPlayerObj.playAudio("down");
            btnName = $(this);
            e.id = p.id;
            e.btnType = btnName.data("type");
            p.mousedown ? p.mousedown(e) : null;
            makeOverState(true);
            if (BrowserDetect.any()) e.preventDefault()
        }
        if (e.type == "click" || e.type == "touchend") {
            if (isClicked) {
                audioPlayerObj.playAudio("up");
                e.id = p.id;
                e.btnType = btnName.data("type");
                p.click ? p.click(e) : null
            }
            isClicked = false;
            onWindowUp(e)
        }
    }
    function onWindowUp(e) {
        if (e.type == "mouseleave") {
            if (isClicked) {
                audioPlayerObj.playAudio("up");
                e.id = p.id;
                e.btnType = btnName.data("type");
                p.click ? p.click(e) : null
            }
            isClicked = false
        }
        if (!p.selected) {
            makeOverState(false)
        }
        $(window).off("mouseup mouseleave", onWindowUp)
    }
    function makeOverState(_bool) {
        var _bPix = dkScreenResize(1) < 1 ? 1 : dkScreenResize(1);
        if (_bool) {
            if (p.srcDown) {
                $(innerDiv).css({
                    background: "url(" + gizmoImageObj[p.srcDown].src + ") no-repeat"
                });
                $(innerDiv).css({
                    "background-size": p.width + "px " + p.height + "px"
                })
            } else {
            	//<dk>鼠标down，激活态颜色
		        if (p.borderStyle==true ){
	                $(innerDiv).css({
	                    background: p.highLightColor? p.highLightColor:"#777777",
	                    color: "#FFFFFF",
	                });
	                p.target.css({
	                    background: p.highLightColor? p.highLightColor:"#777777",
	                    color: "#FFFFFF",
	                });
                }else{
	                $(innerDiv).css({
	                    background: "#777777",
	                    color: "#FFFFFF"
	                });
                }
                if (p.border) {
                    p.target.css("box-shadow", "0px 0px 0px " + dkScreenResize(3) + "px rgba(255, 255, 255, 0.6) , 0px 0px 0px " + dkScreenResize(8) + "px rgba(0,0,0,0.2), " + _bPix + "px " + _bPix + "px 0px 0px #545454, -" + _bPix + "px -" + _bPix + "px 0px 0px #545454")
                } else {
                    if (!p.srcDown) {
				        if (p.borderStyle!=undefined && p.borderStyle==true ){
				        }else{
							p.target.css("box-shadow", _bPix + "px " + _bPix + "px " + _bPix + "px 0px #545454");//   , -" + _bPix + "px -" + _bPix + "px 0px 0px #545454")
				        }
                    }
                }
            }
        } else {
            if (p.srcUp) {
                $(innerDiv).css({
                    background: "url(" + gizmoImageObj[p.srcUp].src + ") no-repeat"
                });
                $(innerDiv).css({
                    "background-size": p.width + "px " + p.height + "px"
                })
            } else {
		        if (p.borderStyle==true ){
					$(innerDiv).css({
			            background: p.bgColor,
			            color: p.color,
			        })
					p.target.css({
				        background: p.bgColor,
					    color: p.color,
					});
                }else{
	                $(innerDiv).css({
	                    background: p.bgColor,
	                })
	            }
            }
            if (p.border) {
                p.target.css("box-shadow", "0px 0px 0px " + dkScreenResize(3) + "px rgba(255, 255, 255, 0.6) , 0px 0px 0px " + dkScreenResize(8) + "px rgba(0,0,0,0.2), " + _bPix + "px " + _bPix + "px 0px " + _bPix + "px #999999, -" + _bPix + "px -" + _bPix + "px 0px " + _bPix + "px #FFFFFF")
            } else {
                if (!p.srcUp) {
				    if (p.borderStyle==true ){
				    }else{
						p.target.css("box-shadow", "" + _bPix + "px " + _bPix + "px " + _bPix +"px " + _bPix + "px #999999, -" + _bPix + "px -" + _bPix + "px 0px " + _bPix + "px #FFFFFF")
                	}
				}
            }
        }
    }
};

var dkCompPlayButton = function() {
    var p = {
        id: "",
        orientation: "horizontal",
        x: 0,
        y: 0,
        content: "controls",
        onSelect: "",
        solidBG: false,
        whiteColor: false,
        playSwitch: false,
        margin: 5,
        plainType:false,
        plainColor:"#FF8800",
        plainShape:0,
    };
    var _thisObj = this;
    var btnName;
    var isMouseDown = false;
    var playBtn, resBtn, pauseBtn, fastForwardBtn, rewindBtn, nextBtn, prevBtn;
    var _leftPos = 0;
    var playIsOn = true;
    var canv_bts=[];

    this.init = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        p.x = dkScreenResize(p.x);
        p.y = dkScreenResize(p.y);
        var _tDiv = document.createElement("div");
        if (p.target) {
            p.target.append(_tDiv)
        } else {
            $("body").append(_tDiv)
        }
        p.target = $(_tDiv);
        p.visible == false ? p.target.css("display", "none") : null;
        p.index ? p.target.css("z-index", p.index) : null;
        p.margin = dkScreenResize(p.margin);
        p.target.css({
            position: "absolute",
            left: p.x + "px",
            top: p.y + "px",
            "transform-origin": "0 0",
            "-webkit-transform-origin": "0px 0px",
            "-ms-transform-origin": "0 0"
        });
        if (p.showButtons.length == 0) {
            p.showButtons = ["play", "fastForward", "pause", "reset"]
        }

		var canvLeft = 0;
        for (var i in p.showButtons) {
            var tempDiv;
            if (i == 0) tempDiv = createElement("left", p.showButtons[i]);
            else if (i == p.showButtons.length - 1) tempDiv = createElement("right", p.showButtons[i]);
            else tempDiv = createElement("middle", p.showButtons[i]);
            p.target.append(tempDiv)

        	var _tempArr = getProperties(p.showButtons[i]);
        	var _cWidth =  _tempArr[2];
        	var _cHeight = _tempArr[3];
			var tempCanv = document.createElement("canvas");
			tempCanv.width= _cWidth;
        	tempCanv.height= _cHeight;
			$(tempDiv).append(tempCanv);
	        $(tempCanv).css({
    	        position: "absolute",
    	        width: _cWidth + "px",
            	height: _cHeight + "px",
        	    left: String(canvLeft) + "px",
            	top: "0px",
        	}).attr({
 	          	"id": "canv_" +p.showButtons[i]
        	});
			canv_bts.push(tempCanv);
			canvLeft += _cWidth;
            drawPlayButtons(i, p.showButtons[i], 0);
        }
        for (var i in p.showButtons) {
            addToolTip(p.showButtons[i]);
            _thisObj.setEnable(p.showButtons[i])
        }
    };
    function drawPlayButtons( i, idStr, state ){
        canv_bts[i].width = canv_bts[i].width;
        if (i=="undefined"){
        	i = 0;
        }
        if (idStr=="undefined"){
        	idStr = "play";
        }
        if (state=="undefined"){
        	state = 0;
        }
        var _ctx = canv_bts[i].getContext("2d");
		if (!p.plainType){
        	_ctx.lineWidth = dkScreenResize(1.5);
        	dkRoundRectBt(_ctx, dkScreenResize(2), dkScreenResize(2), canv_bts[i].width-dkScreenResize(4), canv_bts[i].height-dkScreenResize(4),
    	    	dkScreenResize(4), "#DDDDDD","#FFFFFF","#777777", state, idStr);
		}else{
			var _btH = canv_bts[i].height-dkScreenResize(5);
			var _btW = canv_bts[i].width-dkScreenResize(4);
			var _r = _btH/2;
			var _dx = dkScreenResize(2);
			var _dy = dkScreenResize(2.5);
			_ctx.lineWidth = dkScreenResize(2);
			dkPlainBt( _ctx, _dx, _dy, _btW, _btH, _r,  "#FFFFF2", p.plainColor, state, idStr);
		}
    }

    this.addEventListener = function(_evt, _fun) {
        p[_evt] = _fun
    };
    this.setEnable = function(_btn) {
        if (typeof _btn != "undefined") {
            var _btnObj;
            switch (_btn) {
            case "play":
                _btnObj = $(playBtn);
                break;
            case "pause":
                _btnObj = $(pauseBtn);
                break;
            case "reset":
                _btnObj = $(resBtn);
                break;
            case "fastForward":
                _btnObj = $(fastForwardBtn);
                break;
            case "rewind":
                _btnObj = $(rewindBtn);
                break;
            case "next":
                _btnObj = $(nextBtn);
                break;
            case "prev":
                _btnObj = $(prevBtn);
                break
            }
            if (BrowserDetect.any()) {
                _btnObj.unbind("touchstart", btnEvt).bind("touchstart", btnEvt)
            } else {
                _btnObj.unbind("mousedown", btnEvt).bind("mousedown", btnEvt)
            }
            _btnObj.unbind("click", btnEvt).bind("click", btnEvt);
            _btnObj.css({
                opacity: 1,
                cursor: "pointer"
            });
            _btnObj.find("div").css({
                opacity: 1,
                cursor: "pointer"
            })
        }
    };
    this.setDisable = function(_btn) {
        if (typeof _btn != "undefined") {
            var _btnObj;
            switch (_btn) {
            case "play":
                _btnObj = $(playBtn);
                break;
            case "pause":
                _btnObj = $(pauseBtn);
                break;
            case "reset":
                _btnObj = $(resBtn);
                break;
            case "fastForward":
                _btnObj = $(fastForwardBtn);
                break;
            case "rewind":
                _btnObj = $(rewindBtn);
                break;
            case "next":
                _btnObj = $(nextBtn);
                break;
            case "prev":
                _btnObj = $(prevBtn);
                break
            }
            if (BrowserDetect.any()) {
                _btnObj.unbind("touchstart", btnEvt);
                _btnObj.unbind("touchend", onWindowUp)
            } else {
                _btnObj.unbind("mousedown", btnEvt)
            }
            _btnObj.unbind("click", btnEvt);
            _btnObj.css({
                opacity: .3,
                cursor: "default"
            });
            _btnObj.find("div").css({
                opacity: .3,
                cursor: "default"
            })
        }
    };
    this.setPlayOn = function(_flag) {
        var bgBackPos = $(playBtn).css("background-position").split(" ");
        var symBackPos = $(playBtn).find("div").css("background-position").split(" ");
        var bgPosY = p.whiteColor ? dkScreenResize( - 92) : dkScreenResize( - 4);
        var symPosY = dkScreenResize( - 5);
        if (_flag) {
            symBackPos[0] = getProperties("play")[4] + "px";
            $(playBtn).data("type", "play");
            playIsOn = true;
            var _tempTitle = p.title.play ? GCTConv(p.title.play) : GetGlobalTooltip("tooltip", "playBtn");
            $(playBtn).attr("p_title", GCTConv(_tempTitle))
        } else {
            symBackPos[0] = getProperties("pause")[4] + "px";
            $(playBtn).data("type", "pause");
            playIsOn = false;
            var _tempTitle = p.title.pause ? GCTConv(p.title.pause) : GetGlobalTooltip("tooltip", "pauseBtn");
            $(playBtn).attr("p_title", GCTConv(_tempTitle))
        }
        $(playBtn).css("background-position", bgBackPos[0] + " " + bgPosY + "px");
        $(playBtn).find("div").css("background-position", symBackPos[0] + " " + symPosY + "px")
    };
    this.show = function() {
        p.target.show()
    };
    this.hide = function() {
        p.target.hide()
    };
    function btnEvt(e) {
        var backPos;
        if (e.type == "mousedown" || e.type == "touchstart") {
            focusOutInput();
            audioPlayerObj.playAudio("down");
            btnName = $(this);
            changeButtonState(this, "down");
            if (BrowserDetect.any()) {
                $(window).unbind("touchend", onWindowUp).bind("touchend", onWindowUp)
            } else {
                $(window).unbind("mouseup mouseleave", onWindowUp).bind("mouseup mouseleave", onWindowUp)
            }
            isMouseDown = true
        } else {
            changeButtonState(this, "up");
            onWindowUp(e)
        }
    }
    function onWindowUp(e) {
        e.id = p.id;
        e.btnType = btnName.data("type");
        p.click && isMouseDown ? p.click(e) : null;
        isMouseDown = false;
        if (e.type != "mouseleave" && e.type != "mouseup") audioPlayerObj.playAudio("up");
        for (var i in p.showButtons) {
            var _btnObj;
            switch (p.showButtons[i]) {
            case "play":
                _btnObj = $(playBtn);
                break;
            case "pause":
                _btnObj = $(pauseBtn);
                break;
            case "reset":
                _btnObj = $(resBtn);
                break;
            case "fastForward":
                _btnObj = $(fastForwardBtn);
                break;
            case "rewind":
                _btnObj = $(rewindBtn);
                break;
            case "next":
                _btnObj = $(nextBtn);
                break;
            case "prev":
                _btnObj = $(prevBtn);
                break
            }
            changeButtonState(_btnObj, "up")
        }
        $(window).unbind("touchend", onWindowUp);
        $(window).unbind("mouseup mouseleave", onWindowUp)
    }
    function addToolTip(_btn) {
        if (typeof _btn != "undefined") {
            switch (_btn) {
            case "play":
                var _tempTitle = p.title ? p.title.play ? GCTConv(p.title.play) : GetGlobalTooltip("tooltip", "playBtn") : GetGlobalTooltip("tooltip", "playBtn");
                $(playBtn).attr("p_title", GCTConv(_tempTitle));
                $(playBtn).find("div").attr("p_title", GCTConv(_tempTitle));
                break;
            case "pause":
                var _tempTitle = p.title ? p.title.pause ? GCTConv(p.title.pause) : GetGlobalTooltip("tooltip", "pauseBtn") : GetGlobalTooltip("tooltip", "pauseBtn");
                $(pauseBtn).attr("p_title", GCTConv(_tempTitle));
                $(pauseBtn).find("div").attr("p_title", GCTConv(_tempTitle));
                break;
            case "reset":
                var _tempTitle = p.title ? p.title.reset ? GCTConv(p.title.reset) : GetGlobalTooltip("tooltip", "resetBtn") : GetGlobalTooltip("tooltip", "resetBtn");
                $(resBtn).attr("p_title", GCTConv(_tempTitle));
                $(resBtn).find("div").attr("p_title", GCTConv(_tempTitle));
                break;
            case "fastForward":
                var _tempTitle = p.title ? p.title.fastforward ? GCTConv(p.title.fastforward) : GetGlobalTooltip("tooltip", "fastforwardBtn") : GetGlobalTooltip("tooltip", "fastforwardBtn");
                $(fastForwardBtn).attr("p_title", GCTConv(_tempTitle));
                $(fastForwardBtn).find("div").attr("p_title", GCTConv(_tempTitle));
                break;
            case "rewind":
                var _tempTitle = p.title ? p.title.rewind ? GCTConv(p.title.rewind) : GetGlobalTooltip("tooltip", "rewindBtn") : GetGlobalTooltip("tooltip", "rewindBtn");
                $(rewindBtn).attr("p_title", GCTConv(_tempTitle));
                $(rewindBtn).find("div").attr("p_title", GCTConv(_tempTitle));
                break;
            case "next":
                var _tempTitle = p.title ? p.title.next ? GCTConv(p.title.next) : GetGlobalTooltip("tooltip", "nextBtn") : GetGlobalTooltip("tooltip", "nextBtn");
                $(nextBtn).attr("p_title", GCTConv(_tempTitle));
                $(nextBtn).find("div").attr("p_title", GCTConv(_tempTitle));
                break;
            case "prev":
                var _tempTitle = p.title ? p.title.prev ? GCTConv(p.title.prev) : GetGlobalTooltip("tooltip", "prevBtn") : GetGlobalTooltip("tooltip", "prevBtn");
                $(prevBtn).attr("p_title", GCTConv(_tempTitle));
                $(prevBtn).find("div").attr("p_title", GCTConv(_tempTitle));
                break
            }
        }
    }
    function createElement(type, id) {
        var tempDiv = document.createElement("div");
        var bgPosX, bgPosY, bgWidthWithOutScale, bgWidth, bgHeight, symPosX, symPosY;
        var _tempArr = getProperties(id);
        bgPosX = _tempArr[0];
        bgPosY = _tempArr[1];
        bgWidth = _tempArr[2];
        bgHeight = _tempArr[3];
        symPosX = _tempArr[4];
        symPosY = _tempArr[5];
        bgWidthWithOutScale = _tempArr[6];
        $(tempDiv).css({
            "float": "left",
            width: bgWidth + "px",
            height: bgHeight + "px",
            "background-position": bgPosX + "px " + bgPosY + "px",
            "background-size": dkScreenResize(500) + "px " + dkScreenResize(135) + "px",
            cursor: "pointer",
            border: "0px solid"
        }).attr({
            "data-type": id
        });
        switch (id) {
        case "play":
            playBtn = tempDiv;
            break;
        case "pause":
            pauseBtn = tempDiv;
            break;
        case "reset":
            resBtn = tempDiv;
            break;
        case "fastForward":
            fastForwardBtn = tempDiv;
            break;
        case "rewind":
            rewindBtn = tempDiv;
            break;
        case "next":
            nextBtn = tempDiv;
            break;
        case "prev":
            prevBtn = tempDiv;
            break
        }
        if (type != "left") $(tempDiv).css("margin-left", p.margin);
        var innerDiv = document.createElement("div");
        $(innerDiv).css({
            position: "absolute",
            width: bgWidth + "px",
            height: "100%",
            "background-position": symPosX + "px " + symPosY + "px",
            "background-size": dkScreenResize(500) + "px " + dkScreenResize(135) + "px",
            cursor: "pointer",
            border: "0px solid"
        });
        $(tempDiv).append(innerDiv);
        return tempDiv
    }
    function getProperties(id) {
        var type, _arr = [];
        var i = p.showButtons.indexOf(id);
        if (i == 0) type = "left";
        else if (i == p.showButtons.length - 1) type = "right";
        else type = "middle";
        switch (type) {
        case "left":
            _arr[0] = dkScreenResize( - 1);
            _arr[2] = dkScreenResize(50);
            _arr[6] = 50;
            break;
        case "middle":
            _arr[0] = dkScreenResize( - 58.5);
            _arr[2] = dkScreenResize(43);
            _arr[6] = 43;
            break;
        case "right":
            _arr[0] = dkScreenResize( - 105);
            _arr[2] = dkScreenResize(50);
            _arr[6] = 50;
            break
        }
        _arr[3] = dkScreenResize(38);
        _arr[1] = p.whiteColor ? dkScreenResize( - 92) : dkScreenResize( - 4);
        switch (id) {
        case "play":
            _arr[4] = dkScreenResize( - (333 - _arr[6] / 2));
            break;
        case "pause":
            _arr[4] = dkScreenResize( - (198 - _arr[6] / 2));
            break;
        case "reset":
            _arr[4] = dkScreenResize( - (479 - _arr[6] / 2));
            break;
        case "fastForward":
            _arr[4] = dkScreenResize( - (428 - _arr[6] / 2));
            break;
        case "rewind":
            _arr[4] = dkScreenResize( - (243 - _arr[6] / 2));
            break;
        case "next":
            _arr[4] = dkScreenResize( - (380 - _arr[6] / 2));
            break;
        case "prev":
            _arr[4] = dkScreenResize( - (289 - _arr[6] / 2));
            break
        }
        _arr[5] = dkScreenResize( - 5);
        return _arr
    }
    function changeButtonState(_btnDiv, state) {
        var bgBackPos = $(_btnDiv).css("background-position").split(" ");
        var symBackPos = $(_btnDiv).find("div").css("background-position").split(" ");
        var bgPosY, symPosY;
        if (state == "down") {
            bgPosY = dkScreenResize( - 48);
            symPosY = dkScreenResize( - 46)
        } else {
            bgPosY = p.whiteColor ? dkScreenResize( - 92) : dkScreenResize( - 4);
            symPosY = dkScreenResize( - 5)
        }
        if (p.playSwitch && btnName.data("type") == $(_btnDiv).data("type") && ($(_btnDiv).data("type") == "play" || $(_btnDiv).data("type") == "pause")) {
            if (playIsOn && state == "up") {
                symBackPos[0] = getProperties("pause")[4] + "px";
                $(_btnDiv).data("type", "pause");
                playIsOn = false
            } else if (!playIsOn && state == "up") {
                symBackPos[0] = getProperties("play")[4] + "px";
                $(_btnDiv).data("type", "play");
                playIsOn = true
            }
        }
        $(_btnDiv).css("background-position", bgBackPos[0] + " " + bgPosY + "px");
        $(_btnDiv).find("div").css("background-position", symBackPos[0] + " " + symPosY + "px")
    }
};

var dkCompDropDown = function() {
    var p = {
        id: "",
        x: 50,
        y: 0,
        width: 200,
        boxHeight: 30,
        fontSize: "1em",
        align: "left",
        downwards: true,
        border: true,
        customAlpha: .6,
        paddingTop: 10,
        listLeftPadding: 18
    };
    var DrpDnContainer, tab, indicator, itemCont, lowerHolder, ulParentDiv;
    var curListTop = 0;
    var curSelIndex = 0;
    var innerDivHeight = 0;
    var listArr = new Array;
    var selTxt;
    var _thisObj = this;
    this.init = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        p.x = dkScreenResize(p.x);
        p.y = dkScreenResize(p.y);
        p.width = dkScreenResize(p.width);
        p.boxHeight = dkScreenResize(p.boxHeight);
        p.paddingTop = dkScreenResize(p.paddingTop);
        p.listLeftPadding = dkScreenResize(p.listLeftPadding);
        typeof p.bgColor == "undefined" ? p.bgColor = "rgba(255, 255, 255," + p.customAlpha + ")": null;
        typeof p.height != "undefined" ? p.height = dkScreenResize(p.height) : null;
        var _tDiv = document.createElement("div");
        var updatedWidth = p.width - dkScreenResize(35);
        if (p.target) {
            p.target.append(_tDiv)
        } else {
            $("body").append(_tDiv)
        }
        p.target = $(_tDiv);
        p.visible == false ? p.target.css("display", "none") : null;
        p.index ? p.target.css("z-index", p.index) : null;
        p.title ? p.target.attr("p_title", GCTConv(p.title)) : null;
        p.target.css({
            position: "absolute",
            left: p.x + "px",
            top: p.y + "px",
            background: "rgba(0, 0, 0,0.2)"
        });
        DrpDnContainer = document.createElement("div");
        tab = document.createElement("div");
        indicator = document.createElement("div");
        lowerHolder = document.createElement("div");
        ulParentDiv = document.createElement("div");
        itemCont = document.createElement("ul");
        p.target.append(DrpDnContainer);
        $(DrpDnContainer).append(tab).append(indicator);
        $(DrpDnContainer).css({
            background: "rgba(255, 255, 255, 0.6)",
            "float": "left",
            width: p.width + "px",
            height: "auto",
            cursor: "pointer"
        });
        p.title ? $(DrpDnContainer).attr("p_title", GCTConv(p.title)) : null;
        var _bPix = dkScreenResize(1) < 1 ? 1 : dkScreenResize(1);
        var tabHeight = p.boxHeight - p.paddingTop * 2;
        if (p.border) {
            p.target.css("box-shadow", "0px 0px 0px " + dkScreenResize(3) + "px rgba(255, 255, 255, 0.6) , 0px 0px 0px " + dkScreenResize(8) + "px rgba(0,0,0,0.2), " + _bPix + "px " + _bPix + "px 0px 0px rgba(0,0,0,0), -" + _bPix + "px -" + _bPix + "px 0px 0px #FFFFFF")
        } else {
            p.target.css("box-shadow", "0px 0px 0px " + dkScreenResize(3) + "px rgba(255, 255, 255, 0.6)")
        }
        $(tab).css({
            "text-align": p.align,
            background: p.bgColor,
            "box-shadow": _bPix + "px " + _bPix + "px 0px 0px #999999, -" + _bPix + "px -" + _bPix + "px 0px 0px #ffffff",
            color: "#363336",
            "font-family": "Arial",
            "font-weight": "bold",
            "font-size": p.fontSize,
            padding: p.paddingTop + "px 0px",
            "padding-left": dkScreenResize(6) + "px",
            width: updatedWidth + dkScreenResize(6) + "px",
            "float": "left",
            height: "auto",
            "word-wrap": "break-word"
        });
        p.title ? $(tab).attr("p_title", GCTConv(p.title)) : null;
        $(indicator).css({
            "float": "right",
            right: dkScreenResize(4) + "px",
            background: "url(./images/ddarrow.png) no-repeat " + p.bgColor,
            "background-position": "center",
            "background-size": dkScreenResize(13) + "px " + dkScreenResize(8) + "px",
            "box-shadow": _bPix + "px " + _bPix + "px 0px 0px #999999, -" + _bPix + "px -" + _bPix + "px 0px 0px #ffffff",
            width: dkScreenResize(18) + "px",
            height: tabHeight + "px"
        });
        p.title ? $(indicator).attr("p_title", GCTConv(p.title)) : null;
        $(lowerHolder).css({
            position: "absolute",
            left: "0px",
            display: "inline-block",
            width: p.width + "px",
            background: "rgba(0, 0, 0,0.2)",
            display: "block"
        });
        if (p.border) {
            $(lowerHolder).css({
                "box-shadow": " 0px 0px 0px " + dkScreenResize(8) + "px rgba(0,0,0,0.2)",
                "margin-top": dkScreenResize(15) + "px"
            })
        } else {
            $(lowerHolder).css({
                "box-shadow": "0px 0px 0px " + dkScreenResize(3) + "px rgba(255, 255, 255, 0.6)",
                "margin-top": dkScreenResize(3) + "px"
            })
        }
        $(ulParentDiv).css({
            display: "inline-block",
            width: p.width
        });
        p.height ? $(ulParentDiv).css({
            height: p.height,
            overflow: "hidden"
        }) : null;
        p.target.append(lowerHolder);
        $(lowerHolder).append(ulParentDiv);
        $(ulParentDiv).append(itemCont);
        setListItemFn();
        if (BrowserDetect.any()) {
            $(DrpDnContainer).unbind("touchstart", downEvt).bind("touchstart", downEvt);
            $(DrpDnContainer).unbind("touchend", downEvt).bind("touchend", downEvt)
        } else {
            $(DrpDnContainer).unbind("mousedown", downEvt).bind("mousedown", downEvt)
        }
        $(DrpDnContainer).unbind("click", btnEvt).bind("click", btnEvt);
        setTabContainerHt();
        if (p.selectedIndex) {
            _thisObj.setSelcetedIndex(p.selectedIndex)
        }
        $(lowerHolder).hide()
    };
    function setListItemFn() {
        if (p.tabItem.length != 0) {
            $(itemCont).empty();
            listArr = new Array;
            var containerWidth = p.width;
            containerWidth -= dkScreenResize(22);
            $(itemCont).css({
                position: "relative",
                top: "0px",
                "list-style-type": "none",
                display: "inline-block",
                background: "rgba(0, 0, 0,0.2)",
                width: containerWidth + "px",
                padding: p.paddingTop / 2 + "px " + dkScreenResize(12) + "px " + dkScreenResize(12) + "px " + dkScreenResize(12) + "px",
                margin: "0px",
                padding: "0px",
                "z-index": 100,
                background: "#fff"
            });
            if (typeof p.height != "undefined") {
                $(lowerHolder).css("max-height", p.height + "px")
            }
            var newHeight = 0;
            for (var i = 0; i < p.tabItem.length; i++) {
                var listIndxComp = document.createElement("li");
                $(itemCont).append(listIndxComp);
                $(listIndxComp).attr({
                    "data-dropdownid": i
                });
                $(listIndxComp).css({
                    "text-align": p.align,
                    padding: p.paddingTop + "px",
                    background: "#FFFFFF",
                    "font-family": "Arial",
                    "font-weight": "bold",
                    "font-size": p.fontSize,
                    cursor: "pointer",
                    "padding-left": p.listLeftPadding + "px"
                });
                listArr.push($(listIndxComp));
                $(listIndxComp).unbind("click", onListClick).bind("click", onListClick);
                if (BrowserDetect.any()) {
                    $(listIndxComp).unbind("touchstart", onOptionAud).bind("touchstart", onOptionAud).unbind("touchend", onOptionAud).bind("touchend", onOptionAud)
                } else {
                    $(listIndxComp).unbind("mousedown", onOptionAud).bind("mousedown", onOptionAud);
                    $(listIndxComp).unbind("mouseover", onMouseIn).bind("mouseover", onMouseIn);
                    $(listIndxComp).unbind("mouseout", onMouseOut).bind("mouseout", onMouseOut)
                }
                $(listIndxComp).html("<span>" + p.tabItem[i] + "</span>");
                if (i == 0) {
                    $(listIndxComp).css("background", "#666").css("color", "#fff").addClass("selected")
                }
                newHeight += $(listIndxComp).outerHeight()
            }
            innerDivHeight = newHeight;
            if (p.height && p.height + $(listIndxComp).outerHeight() < innerDivHeight) {
                createSlider();
                $(lowerHolder).css({
                    height: $(itemCont).height()
                })
            } else {
                $(lowerHolder).css({
                    height: "auto"
                });
                $(itemCont).css({
                    width: $(lowerHolder).width()
                })
            }
        }
        $(tab).html(p.tabItem[0]);
        selTxt = p.tabItem[0]
    }
    var sliderBase, sliderKnob;
    function createSlider() {
        sliderBase = document.createElement("div");
        $(lowerHolder).append(sliderBase);
        $(sliderBase).css({
            position: "absolute",
            right: "0px",
            top: "0px",
            width: dkScreenResize(20) + "px",
            height: p.height + "px",
            background: "#E5E5E5",
            "box-shadow": "2px 2px 10px rgba(0,0,0,0.5) inset"
        });
        sliderHold = document.createElement("div");
        $(sliderBase).append(sliderHold);
        $(sliderHold).css({
            position: "absolute",
            left: dkScreenResize(5) + "px",
            top: dkScreenResize(5) + "px",
            width: dkScreenResize(20) - dkScreenResize(10) + "px",
            height: parseInt($(sliderBase).css("height")) - p.paddingTop + "px"
        });
        sliderKnob = document.createElement("div");
        $(sliderHold).append(sliderKnob);
        $(sliderKnob).css({
            position: "absolute",
            left: "0px",
            top: "0px",
            width: dkScreenResize(20) - dkScreenResize(10) + "px",
            height: p.boxHeight + "px",
            background: "#FFFFFF",
            "background-size": p.paddingTop + "px " + dkScreenResize(17) + "px",
            "background-position": "center",
            "box-shadow": "2px 2px 5px rgba(0,0,0,0.5)"
        }).attr("p_title", GetGlobalTooltip("tooltip", "tablescroll"));
        $(sliderKnob).addClass("commongrab");
        $(sliderKnob).draggable({
            containment: "parent",
            drag: onSlideEvent
        });
        if (BrowserDetect.any()) {
            $(sliderKnob).unbind("touchstart", onDownEvt).bind("touchstart", onDownEvt).unbind("touchend", onDownEvt).bind("touchend", onDownEvt)
        } else {
            $(sliderKnob).unbind("mousedown", onDownEvt).bind("mousedown", onDownEvt)
        }
    }
    function onSlideEvent(event, ui) {
        var _y = parseInt($(sliderKnob).css("top"));
        var _max = parseInt($(sliderHold).css("height")) - parseInt($(sliderKnob).css("height"));
        var newTop = (innerDivHeight - p.height) * (_y / _max);
        newTop = Math.abs(newTop) * -1;
        $(itemCont).css("top", newTop)
    }
    function onDownEvt(e) {
        if (e.type == "mousedown" || e.type == "touchstart") {
            focusOutInput();
            addPointerGrabbing(true);
            audioPlayerObj.playAudio("down");
            if (!BrowserDetect.any()) {
                $(document).unbind("mouseup", onDownEvt).bind("mouseup", onDownEvt)
            }
        } else if (e.type == "mouseup" || e.type == "touchend") {
            audioPlayerObj.playAudio("up");
            addPointerGrabbing(false);
            $(document).unbind("mouseup", onDownEvt)
        }
    }
    this.addEventListener = function(_evt, _fun) {
        p[_evt] = _fun
    };
    this.setStatus = function(bool) {
        if (bool) {
            if (BrowserDetect.any()) {
                $(DrpDnContainer).unbind("touchstart", downEvt).bind("touchstart", downEvt);
                $(DrpDnContainer).unbind("touchend", downEvt).bind("touchend", downEvt)
            } else {
                $(DrpDnContainer).unbind("mousedown", downEvt).bind("mousedown", downEvt);
                $(DrpDnContainer).css("cursor", "pointer")
            }
            $(DrpDnContainer).unbind("click", btnEvt).bind("click", btnEvt);
            $(DrpDnContainer).css("opacity", 1)
        } else {
            if (BrowserDetect.any()) {
                $(DrpDnContainer).unbind("touchstart", downEvt);
                $(DrpDnContainer).unbind("touchend", downEvt)
            } else {
                $(DrpDnContainer).unbind("mousedown", downEvt);
                $(DrpDnContainer).css("cursor", "default")
            }
            $(DrpDnContainer).unbind("click", btnEvt);
            $(DrpDnContainer).css("opacity", .7)
        }
    };
    this.setSelcetedIndex = function(indx) {
        resetIndexItem();
        $(tab).html(p.tabItem[indx]);
        setTabContainerHt();
        curSelIndex = indx;
        selTxt = p.tabItem[indx];
        setListItem(indx)
    };
    this.getSelcetedIndex = function() {
        return curSelIndex
    };
    this.updateListItem = function(_listArr) {
        p.tabItem = [];
        for (var i = 0; i < _listArr.length; i++) {
            p.tabItem[i] = _listArr[i]
        }
        $(lowerHolder).show();
        setListItemFn();
        setTabContainerHt();
        $(lowerHolder).hide()
    };
    this.show = function() {
        p.target.show()
    };
    this.hide = function() {
        p.target.hide()
    };
    this.setSelectedText = function(_txt) {
        selTxt = _txt
    };
    this.getSelectedText = function() {
        return selTxt
    };
    this.updateCss = function(_css) {
        p.target.css(_css)
    };
    function onMouseIn(e) {
        $(this).css("background", "#666").css("color", "#fff")
    }
    function onMouseOut(e) {
        if (!$(this).hasClass("selected")) {
            $(this).css("background", "#fff").css("color", "#000")
        }
    }
    function onOptionAud(e) {
        if (e.type == "mousedown" || e.type == "touchstart") {
            audioPlayerObj.playAudio("down");
            if (e.type == "mousedown") {
                $(document).unbind("mouseup", onOptionAud).bind("mouseup", onOptionAud)
            }
        } else if (e.type == "mouseup" || e.type == "touchend") {
            audioPlayerObj.playAudio("up");
            $(document).unbind("mouseup", onOptionAud)
        }
    }
    function onWindowUp(e) {
        if (e.type == "touchstart") {
            e.pageX = e.originalEvent.touches[0].pageX;
            e.pageY = e.originalEvent.touches[0].pageY
        }
        var _xCond = e.pageX < p.target.offset().left || e.pageX > p.target.offset().left + p.target.outerWidth(true);
        if (p.downwards) {
            var _yCond = e.pageY < p.target.offset().top || e.pageY > p.target.offset().top + p.target.outerHeight(true) + $(lowerHolder).outerHeight(true)
        } else {
            var _yCond = e.pageY > p.target.offset().top + p.target.outerHeight(true) || e.pageY < p.target.offset().top - $(lowerHolder).outerHeight(true)
        }
        if (_xCond || _yCond) {
            $(lowerHolder).hide();
            $(document).unbind("mousedown", onWindowUp);
            $(document).unbind("touchstart", onWindowUp)
        }
    }
    function downEvt(e) {
        var _bPix = dkScreenResize(1) < 1 ? 1 : dkScreenResize(1);
        if (e.type == "mousedown" || e.type == "touchstart") {
            focusOutInput();
            $(tab).css({
                background: "#666666",
                "box-shadow": "0px 0px 0px " + _bPix + "px #545454",
                color: "#FFFFFF"
            });
            $(indicator).css({
                background: "url(./images/ddarrowdown.png) no-repeat #666666",
                "background-position": "center",
                "background-size": dkScreenResize(13) + "px " + dkScreenResize(8) + "px",
                "box-shadow": "0px 0px 0px " + _bPix + "px #545454"
            });
            $(document).unbind("mouseup", downEvt).bind("mouseup", downEvt);
            audioPlayerObj.playAudio("down");
            if (p["downEvt"]) {
                p["downEvt"]({
                    id: p["id"]
                })
            }
        } else if (e.type == "mouseup" || e.type == "touchend") {
            $(document).unbind("mouseup", downEvt);
            $(tab).css({
                background: p.bgColor,
                "box-shadow": _bPix + "px " + _bPix + "px 0px 0px #999999, -" + _bPix + "px -" + _bPix + "px 0px 0px #ffffff",
                color: "#363336"
            });
            $(indicator).css({
                background: "url(./images/ddarrow.png) no-repeat " + p.bgColor,
                "background-position": "center",
                "background-size": dkScreenResize(13) + "px " + dkScreenResize(8) + "px",
                "box-shadow": _bPix + "px " + _bPix + "px 0px 0px #999999, -" + _bPix + "px -" + _bPix + "px 0px 0px #ffffff"
            });
            audioPlayerObj.playAudio("up")
        }
    }
    function btnEvt(e) {
        setTabContainerHt();
        if ($(lowerHolder).css("display") == "none") {
            $(lowerHolder).show();
            if (BrowserDetect.any()) {
                $(document).unbind("touchstart", onWindowUp).bind("touchstart", onWindowUp)
            } else {
                $(document).unbind("mousedown", onWindowUp).bind("mousedown", onWindowUp)
            }
        } else {
            $(lowerHolder).hide();
            $(document).unbind("touchstart", onWindowUp);
            $(document).unbind("mousedown", onWindowUp)
        }
    }
    function setTabContainerHt() {
        if (p.downwards) {
            $(lowerHolder).css("top", "100%")
        } else {
            $(lowerHolder).css("top", "");
            if (p.border) {
                $(lowerHolder).css("bottom", p.target.outerHeight(true) + dkScreenResize(15) + "px")
            } else {
                $(lowerHolder).css("bottom", p.target.outerHeight(true) + dkScreenResize(5) + "px")
            }
        }
        $(indicator).css("height", $(tab).height() + p.paddingTop * 2 + "px");
        if ($(tab).outerHeight() >= p.boxHeight) {
            $(DrpDnContainer).css("height", $(tab).outerHeight() + "px")
        } else {
            $(DrpDnContainer).css("height", p.boxHeight + "px")
        }
    }
    function onListClick(e) {
        var curIndx = $(this).attr("data-dropdownid");
        resetIndexItem();
        $(this).css("background", "#666").css("color", "#fff");
        $(this).unbind("hover");
        $(tab).html(p.tabItem[curIndx]);
        selTxt = p.tabItem[curIndx];
        curListTop = $(p.target).height();
        setTabContainerHt();
        $(this).parent().parent().parent().hide();
        curSelIndex = curIndx;
        if (p["onIndxSelect"]) {
            p["onIndxSelect"]({
                id: p["id"],
                value: curSelIndex
            })
        }
        setListItem(curSelIndex);
        if ($(tab).outerHeight() >= p.boxHeight) {
            $(DrpDnContainer).css("height", $(tab).outerHeight() + "px")
        } else {
            $(DrpDnContainer).css("height", p.boxHeight + "px")
        }
    }
    function resetIndexItem() {
        for (var i = 0; i < p.tabItem.length; i++) {
            listArr[i].css("background", "#fff").css("color", "#000")
        }
    }
    function setListItem(index) {
        for (var i = 0; i < listArr.length; i++) {
            if (i == index) {
                listArr[i].css("background", "#666").css("color", "#fff").addClass("selected")
            } else {
                listArr[i].removeClass("selected")
            }
        }
    }
};
var dkCompImage = function() {
    var p = {
        x: 0,
        y: 0,
        type: "img",
        backgroundFit: false,
        clickable: false
    };
    var _thisObj = this;
    var _div;
    this.init = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        p.x = dkScreenResize(p.x);
        p.y = dkScreenResize(p.y);
        if (p.width) {
            p.width = dkScreenResize(p.width)
        }
        if (p.height) {
            p.height = dkScreenResize(p.height)
        }
        _div = document.createElement(p.type);
        if (p.target) {
            p.target.append(_div)
        } else {
            $("body").append(_div)
        }
        p.target = $(_div);
        p.target.css({
            position: "absolute",
            left: p.x + "px",
            top: p.y + "px"
        }).attr("titleId", p.id);
        p.type == "img" ? p.target.attr("draggable", "false") : null; ! p.clickable ? p.target.css({
            "pointer-events": "none"
        }) : null;
        p.visible == false ? p.target.css("display", "none") : null;
        p.index ? p.target.css("z-index", p.index) : null;
        p.title ? p.target.attr("p_title", GCTConv(p.title)) : null;
        if (p.width) {
            p.target.css("width", p.width + "px")
        }
        if (p.height) {
            p.target.css("height", p.height + "px")
        }
        if (p.class) {
            p.target.attr({
                "class": p.class
            })
        }
        if (p.type == "img") {
            if (p.src) {
                p.target.attr("src", p.src)
            } else if (p.txtsrc) {
                p.target.attr("src", gizmoImageObj[p.txtsrc].src)
            }
        } else {
            if (p.src) {
                p.target.css({
                    background: "url(" + p.src + ") no-repeat"
                })
            } else if (p.txtsrc) {
                p.target.css({
                    background: "url(" + gizmoImageObj[p.txtsrc].src + ") no-repeat"
                })
            }
            p.target.css({
                "background-size": "100% 100%"
            })
        }
    };
    this.getElem = function() {
        return p.target
    };
    this.getId = function() {
        return p.id
    };
    this.setSource = function(arg) {
        if (p.type == "img") {
            p.target.attr("src", arg)
        } else {
            p.target.css({
                background: "url(" + arg + ") no-repeat",
                "background-size": "100% 100%"
            })
        }
    };
    this.setTxtSource = function(arg) {
        if (p.type == "img") {
            p.target.attr("src", gizmoImageObj[arg].src)
        } else {
            p.target.css({
                background: "url(" + gizmoImageObj[arg].src + ") no-repeat"
            })
        }
    };
    this.animStart = function(type, duration, animProp, easing, callBack) {
        callBack = typeof callBack == "undefined" ?
        function() {}: callBack;
        if (type == "fadeIn" || type == "fadeOut") {
            p.target[type](duration, callBack)
        } else if (type == "animate") {
            easing = typeof easing == "undefined" ? "linear": easing;
            p.target[type](animProp, duration, easing, callBack)
        }
    };
    this.animStop = function(clearQueue, jumpToEnd) {
        clearQueue = typeof clearQueue == "undefined" ? false: clearQueue;
        jumpToEnd = typeof jumpToEnd == "undefined" ? false: jumpToEnd;
        p.target.stop(clearQueue, jumpToEnd)
    };
    this.show = function() {
        p.target.show()
    };
    this.hide = function() {
        p.target.hide()
    };
    this.setPosition = function(_posObj) {
        p.target.css({
            position: "absolute",
            left: _posObj.x + "px",
            top: _posObj.y + "px"
        })
    };
    this.setTitle = function(_title) {
        p.target.attr("p_title", GCTConv(_title))
    }
};
var dkCompMsgBox = function() {
    var p = {
        id: "",
        width: 350,
        topBorder:4,
        topBorderColor:"#0000FF"
    };
    var _thisObj = this;
    var msgWin, _inDiv;
    this.init = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        p.topBorder = Math.round( dkScreenResize(p.topBorder) );
        if (p.width !=undefined && p.width>350){
        	p.width = p.width;
        }
        msgWin = document.createElement("div");
        $("body").append(msgWin);
        $(msgWin).css({
            position: "fixed",
            left: "0px",
            top: "0px",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.3)",
            "z-index": 104,
            display: "none"
        });
        _inDiv = document.createElement("div");
        $(msgWin).append(_inDiv);
        $(_inDiv).text("Hello World!");
        $(_inDiv).css({
            position: "absolute",
            left: "50%",
            top: "35%",
            width: p.width +"px",
            background: "#FFFFFF",
            "box-shadow": "rgba(0, 0, 0, 0.5) 0px 0px 20px",
            "text-align": "center",
            "border-top" :  p.topBorder +"px  solid "+ p.topBorderColor,
            padding: "25px",
            cursor: "default"
        })
    };
    this.showMsg = function(_msg, _bool) {
        focusOutInput();
        $(_inDiv).html(_msg);
        setTimeout(function() {
            $(_inDiv).css({
                "margin-left": -1 * ($(_inDiv).outerWidth() / 2),
                "margin-top": -1 * ($(_inDiv).outerHeight() / 2)
            });
            $(msgWin).show();
            $(msgWin).unbind("click", btnEvt);
            if (!_bool) {
                $(msgWin).bind("click", btnEvt)
            }
        },
        100)
    };
    this.hideMsg = function() {
        $(msgWin).hide()
    };
    this.addEventListener = function(_evt, _fun) {
        p[_evt] = _fun
    };
    function btnEvt(e) {
        _thisObj.hideMsg()
    }
};

var dkCompTab = function() {
    var p = {
        x: 0,
        y: 0,
        width: 600,
        height: 600,
        tabs: ["LABEL 1", "LABEL 2"],
        tabBarColors : ["red","blue"],
        tabwidth: "auto",
        shadowMargin: 20,
        leftMargin: 20,
        labelSize: "0.7em",
        tabHeight: 23,
        tabType: "normal",
        selectedTab: 0
    };
    var _thisObj = this;
    var baseDiv;
    var tabButtons = new Array;
    var tabClkButtons = new Array;
    this.init = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        p.x = dkScreenResize(p.x);
        p.y = dkScreenResize(p.y);
        p.width = dkScreenResize(p.width);
        p.height = dkScreenResize(p.height);
        p.shadowMargin = dkScreenResize(p.shadowMargin);
        p.leftMargin = dkScreenResize(p.leftMargin);
        p.tabHeight = dkScreenResize(p.tabHeight);
        createPlaceHolders()
    };
    this.addEventListener = function(_evt, _fun) {
        p[_evt] = _fun
    };
    this.show = function() {
        p.target.show()
    };
    this.hide = function() {
        p.target.hide()
    };
    this.activeTab = function(actTab) {
        if (typeof actTab != "undefined") {
            for (var i = 0; i < tabButtons.length; i++) {
                if ($(tabButtons[i]).attr("tabid").split("_")[1] == actTab) {
                    $(tabClkButtons[i]).trigger("click");
                    break
                }
            }
        } else {
            return p.selectedTab
        }
    };
    this.setDisableTab = function(tab_Id) {
        $(tabClkButtons[tab_Id]).unbind("click", showTab);
        $(tabClkButtons[tab_Id]).css({
            opacity: .5,
            cursor: "default"
        })
    };
    this.setEnableTab = function(tab_Id) {
        $(tabClkButtons[tab_Id]).unbind("click", showTab).bind("click", showTab);
        $(tabClkButtons[tab_Id]).css({
            opacity: 1,
            cursor: "pointer"
        })
    };
    function createPlaceHolders() {
        var _tDiv = document.createElement("div");
        if (p.target) {
            p.target.append(_tDiv)
        } else {
            $("body").append(_tDiv)
        }
        p.target = $(_tDiv);
        p.visible == false ? p.target.css("display", "none") : null;
        p.index ? p.target.css("z-index", p.index) : null;
        p.target.css({
            position: "absolute",
            left: p.x + "px",
            top: p.y + "px",
            width: p.width + "px",
            height: p.height + "px",
        });
        p.target.attr("id",p.id)

        drawTabs("#e5e5e5", true, false);
        baseDiv = document.createElement("div");
        p.target.append(baseDiv);
        $(baseDiv).css({
            position: "absolute",
            left: p.shadowMargin + "px",
            top: p.shadowMargin + (p.tabHeight - 1) + "px",
            width: p.width - p.shadowMargin * 2 + "px",
            height: p.height - p.shadowMargin * 2 - p.tabHeight + "px",
            background: "#FFFFFF",
            "box-shadow": "rgba(0, 0, 0, 0.5) 0px 0px 20px"
        });
        if (p.tabType != "simulation") {
            if (p.tabColors) {
                $(baseDiv).css("background", p.tabColors[0] == "" ? "#FFFFFF": p.tabColors[0]);
                drawTabs("#FFFFFF", false, false, tabButtons, p.tabColors)
            } else {
                if (p.tabBarColors){
	                drawTabs("#D9DEE7", false, false, tabButtons,"", p.tabBarColors);
   	        	}else{
	                drawTabs("#FFFFFF", false, false, tabButtons );
   	        	}
            }
            drawTabs("rgba(255, 0, 0, 0.5)", false, true, tabClkButtons)
        } else {
            p.tabColors ? $(baseDiv).css("background", p.tabColors[0] == "" ? "#FFFFFF": p.tabColors[0]) : null
        }
        addEvents()
    }
    function drawTabs(_col, _bool, _text, _arr, _tabCol, _barCol) {
        var _xPos = p.leftMargin;
        for (var i = 0; i < p.tabs.length; i++) {
            var _tWid = typeof p.tabwidth == "number" ? dkScreenResize(p.tabwidth) : (p.width - p.shadowMargin * 2) / p.tabs.length;
            if (p.tabwidth != "auto" && p.tabwidth.length && p.tabwidth[i]) {
                _tWid = dkScreenResize(p.tabwidth[i])
            }
            if (_tabCol) {
                if (_tabCol[i]) {
                    _col = _tabCol[i]
                }
            }
            var _div = document.createElement("div");
            p.target.append(_div);
            $(_div).attr("tabid", "tabComp_" + i);
            $(_div).css({
                position: "absolute",
                left: _xPos + "px",
                top: p.shadowMargin + "px",
                width: _tWid + "px",
                height: p.tabHeight + "px",
                overflow: "hidden",
                background: "rgba(0, 0, 0, 0)"
            });
            if (p.tabType == "simulation") {
                p.tabColors ? $(_div).css({
                    background: p.tabColors[0] == "" ? "#FFFFFF": p.tabColors[0]
                }) : $(_div).css({
                    background: "rgba(255, 255, 255, 1)"
                });
                $(_div).css("cursor", "default");
                $(_div).css({
                    left: p.leftMargin + "px",
                    "z-index": "1"
                });
                $(_div).html('<div style="position: relative; text-align:center; font-size:' + p.labelSize + "; display: table-cell; width: " + _tWid + "px; height: " + p.tabHeight + 'px; vertical-align: middle;">' + p.tabs[i] + "</div>")
            } else {
                if (_text) {
                    $(_div).css("cursor", "pointer");
                    $(_div).append('<div style="position: relative; text-align:center; font-size:' + p.labelSize + "; color:#333; display: table-cell; width: " + _tWid + "px; height: " + p.tabHeight + 'px; vertical-align: middle;" p_title="' + (p.title ? GCTConv(p.title) : GetGlobalTooltip("tooltip", "tabs")) + '">' + p.tabs[i] + "</div>");
                    $(_div).bind("click", showTab);
                    if (BrowserDetect.any()) {
                        $(_div).bind("touchstart", showTab).bind("touchend", showTab)
                    } else {
                        $(_div).bind("mousedown", showTab)
                    }
                } else {
                    var _cnv = document.createElement("canvas");
                    $(_div).append(_cnv);
                    var _ctx = _cnv.getContext("2d");
                    _cnv.width = _tWid;
                    _cnv.height = p.tabHeight;
                    _ctx.fillStyle = _col;
                    _ctx.moveTo(dkScreenResize(10), 0);
                    _ctx.lineTo(_cnv.width, 0);
                    _ctx.lineTo(_cnv.width, _cnv.height);
                    _ctx.lineTo(0, _cnv.height);
                    _ctx.lineTo(dkScreenResize(10), 0);
                    _ctx.fill();
                    if ( _barCol!="undefined" && _barCol ){
	                    _ctx.beginPath();
	                    _ctx.strokeStyle = _barCol[i];
	                    _ctx.lineWidth = dkScreenResize(2);
	                    _ctx.moveTo(dkScreenResize(10), dkScreenResize(1));
	                    _ctx.lineTo(_cnv.width, dkScreenResize(1));
	                    _ctx.stroke()
                    }
				}
            }
            if (_arr) {
                _arr.push(_div)
            }
            _xPos += _tWid
        }
    }
    function addEvents() {
        for (var i = 0; i < tabButtons.length; i++) {
            if (i == p.selectedTab) {
                $(tabButtons[i]).show()
            } else {
                $(tabButtons[i]).hide()
            }
        }
    }
    function showTab(e) {
        if (e.type == "mousedown" || e.type == "touchstart") {
            focusOutInput();
            audioPlayerObj.playAudio("down");
            if (e.type == "mousedown") {
                $(document).unbind("mouseup", showTab).bind("mouseup", showTab)
            }
        } else if (e.type == "mouseup" || e.type == "touchend") {
            audioPlayerObj.playAudio("up");
            $(document).unbind("mouseup", showTab)
        } else {
            for (var i = 0; i < tabButtons.length; i++) {
                if ($(tabButtons[i]).attr("tabid") == $(this).attr("tabid")) {
                    $(tabButtons[i]).show();
                    if (p.tabColors) {
                        $(baseDiv).css("background", p.tabColors[i] == "" ? "#FFFFFF": p.tabColors[i])
                    } else {
                        $(baseDiv).css("background", "#FFFFFF")
                    }
                    innerActiveTab(i)
                } else {
                    $(tabButtons[i]).hide()
                }
            }
            e.index = Number($(this).attr("tabid").split("_")[1]);
            p.change ? p.change(e) : null
        }
    }
    function innerActiveTab(_i) {
        p.selectedTab = _i
    }
};

var dkTracePad = function() {
    var p = {
        id: "tracePadComp",
        x: 0,
        y: 0,
        width: 300,
        height: 300,
        border: false
    };
    var _thisObj = this;
    var canvas, context;
    this.init = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        p.x = dkScreenResize(p.x);
        p.y = dkScreenResize(p.y);
        p.width = dkScreenResize(p.width);
        p.height = dkScreenResize(p.height);
        canvas = document.createElement("canvas");
        context = canvas.getContext("2d");
        if (p.target) {
            p.target.css({
                position: "absolute"
            });
            p.target.append(canvas);
            createBaseCanvas()
        }
        if (BrowserDetect.any()) {
            $(canvas).unbind("touchstart", mouseEvent).bind("touchstart", mouseEvent);
            $(canvas).unbind("touchmove", mouseEvent).bind("touchmove", mouseEvent);
            $(canvas).unbind("touchend", mouseEvent).bind("touchend", mouseEvent);
            $(window).unbind("touchmove", mouseEvent).bind("touchmove", mouseEvent)
        } else {
            $(canvas).unbind("mousedown", mouseEvent).bind("mousedown", mouseEvent);
            $(canvas).unbind("mousemove", mouseEvent).bind("mousemove", mouseEvent);
            $(canvas).unbind("mouseover", mouseEvent).bind("mouseover", mouseEvent);
            $(canvas).unbind("mouseout", mouseEvent).bind("mouseout", mouseEvent);
            $(canvas).unbind("mouseup", mouseEvent).bind("mouseup", mouseEvent)
        }
    };
    this.show = function() {
        $(canvas).show()
    };
    this.hide = function() {
        $(canvas).hide()
    };
    this.addTitle = function(_title) {
        if (typeof _title == "undefined" || _title == "") {
            $(canvas).removeAttr("p_title")
        } else {
            $(canvas).attr("p_title", _title)
        }
    };
    this.addEventListener = function(_evt, _fun) {
        p[_evt] = _fun
    };
    this.removeEventListener = function(_evt) {
        delete p[_evt]
    };
    function createBaseCanvas() {
        canvas.width = p.width;
        canvas.height = p.height;
        $(canvas).css({
            position: "absolute",
            left: p.x + "px",
            top: p.y + "px",
            "background-color": p.bgColor,
            "box-shadow": p.bgShadow
        }).attr("id", "canvas_" + p.id);
        p.index ? $(canvas).css("z-index", p.index) : null;
        p.visible == false ? p.target.css("display", "none") : null;
        p.border ? $(canvas).css("border", "0.1em solid red") : null
    }
    var checkForMouseOut = false;
    var isMouseDown = false;
    var prevX, prevY;
    var prevPageX, prevPageY;
    function mouseEvent(e) {
        var flag = false;
        if (e.type == "touchstart" || e.type == "touchmove") {
            e.pageX = e.originalEvent.touches[0].pageX;
            e.pageY = e.originalEvent.touches[0].pageY;
            prevPageX = e.pageX;
            prevPageY = e.pageY
        }
        if (e.type == "touchend") {
            e.pageX = prevPageX;
            e.pageY = prevPageY
        }
        var mouseX = e.pageX - $(canvas).offset().left;
        var mouseY = e.pageY - $(canvas).offset().top;
        if (e.type == "mousedown" || e.type == "touchstart") {
            prevX = mouseX;
            prevY = mouseY;
            focusOutInput();
            if (!BrowserDetect.any()) {
                $(canvas).unbind("mousemove", mouseEvent);
                $(window).unbind("mousemove", mouseEvent).bind("mousemove", mouseEvent);
                $(window).unbind("mouseup", mouseEvent).bind("mouseup", mouseEvent)
            }
            checkForMouseOut = false;
            isMouseDown = true;
            e.type = "mousedown"
        } else if (e.type == "mousemove" || e.type == "touchmove") {
            if (prevX == mouseX && prevY == mouseY) flag = true;
            e.type = "mousemove";
            if ((mouseX < 0 || mouseX > p.width || mouseY < 0 || mouseY > p.height) && !checkForMouseOut && isMouseDown) {
                checkForMouseOut = true;
                e.type = "mouseout"
            }
            if (mouseX >= 0 && mouseX <= p.width && mouseY >= 0 && mouseY <= p.height && checkForMouseOut && isMouseDown) {
                checkForMouseOut = false;
                e.type = "mouseover"
            }
        } else if (e.type == "mouseup" || e.type == "touchend") {
            checkForMouseOut = false;
            isMouseDown = false;
            if (!BrowserDetect.any()) {
                $(window).unbind("mouseup", mouseEvent);
                $(window).unbind("mousemove", mouseEvent);
                $(canvas).unbind("mousemove", mouseEvent).bind("mousemove", mouseEvent)
            }
            e.type = "mouseup"
        }
        e.x = mouseX;
        e.y = mouseY;
        e.id = p.id;
        if (!flag) p.mouseEvent ? p.mouseEvent(e) : null;
        e.preventDefault()
    }
};

var AudioPlayerClass = function() {
    var p = {
        click: {
            source: "../ejs/audio/click.mp3"
        },
        down: {
            source: "../ejs/audio/mdown.mp3"
        },
        up: {
            source: "../ejs/audio/mup.mp3"
        },
        camera: {
            source: "../ejs/audio/click.mp3"
        },
        confirm: {
            source: "../ejs/audio/confirm.mp3"
        }
    };
    var _thisObj = this;
    var allowToPlay = true;
    var audioContext;
    var audioObj = new Object;
    var volume = 1;
    var contextBool = false;
    var aChans = [];
    var aChansPlaying = [];
    var currentlyPlaying = new Object;
    var interval_obj = new GlobalAnimClass;
    var globalTime = new Date;
    for (var i = 0; i < 20; i++) {
        aChans[i] = new Audio;
        aChans[i].id = i
    }
    if (BrowserDetect.FF()) {
        contextBool = true
    } else {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext
        } catch(e) {
            contextBool = true
        }
    }
    if (contextBool) {
        for (var i in p) {
            audioObj[i] = new Object;
            audioObj[i].src = p[i].source
        }
    }
    if (audioContext) {
        for (var i in p) {
            loadAudio(i, true)
        }
    }
    this.add = function(_type, _path, _cback, _ref, _noClean) {
        if (_type.toLowerCase() != "click") {
            if (!audioContext) {
                audioObj[_type] = new Object;
                audioObj[_type].oncanplaythrough = _ref;
                audioObj[_type].index = [];
                audioObj[_type].src = _path;
                if (typeof _cback != undefined) {
                    audioObj[_type].onended = _cback
                }
                typeof _ref != "undefined" ? setTimeout(function() {
                    _ref()
                },
                100) : null
            } else {
                p[_type] = {
                    source: _path
                };
                typeof _noClean != undefined ? p[_type].noClean = _noClean: null;
                typeof _cback != undefined ? p[_type].callBack = _cback: null;
                loadAudio(_type, true, _ref)
            }
        }
    };
    this.remove = function(_type) {
        if (audioContext) {
            if (p[_type]) {
                _thisObj.stop(_type, true);
                p[_type].context = undefined;
                p[_type].gainNode = undefined;
                p[_type].volume = undefined;
                p[_type].loop = undefined;
                p[_type].callBack = undefined;
                p[_type] = undefined
            }
        } else {
            if (audioObj[_type]) {
                if (audioObj[_type].audio) {
                    audioObj[_type].audio.src = "";
                    audioObj[_type].audio = null
                }
                audioObj[_type].index = null;
                audioObj[_type].oncanplaythrough = null;
                audioObj[_type].onended = null;
                audioObj[_type].loop = null;
                audioObj[_type].volume = null;
                audioObj[_type] = null
            }
        }
    };
    this.destroyContext = function() {
        audioContext.uninitialize()
    };
    this.setVolume = function(_vol) {
        volume = _vol
    };
    this.sVolume = function(_type, _vol) {
        if (p[_type]) {
            p[_type].volume = _vol;
            if (p[_type].gainNode && p[_type].gainNode.gain) {
                p[_type].gainNode.gain.value = _vol
            }
        }
    };
    this.stop = function(_type, _bool) {
        if (audioContext) {
            if (p[_type] && p[_type].context) {
                var _cont = p[_type].context;
                _cont.onended = null;
                try {
                    if (p[_type].context.stop) {
                        p[_type].context.stop(0);
                        if (!_bool) {
                            delete currentlyPlaying[_type]
                        }
                        return false
                    }
                    if (p[_type].context.noteOff) {
                        p[_type].context.noteOff(0);
                        if (!_bool) {
                            delete currentlyPlaying[_type]
                        }
                        return false
                    }
                } catch(e) {}
            }
        } else {
            if (audioObj[_type] && audioObj[_type].audio) {
                audioObj[_type].audio.onended = null;
                audioObj[_type].audio.pause()
            }
        }
    };
    this.stopAll = function(_bool) {
        if (audioContext) {
            for (var i in p) {
                _thisObj.stop(i, _bool)
            }
        } else {
            for (var i in audioObj) {
                _thisObj.stop(i, _bool)
            }
        }
    };
    this.enable = function(_flag) {
        allowToPlay = _flag; ! allowToPlay ? this.stopAll() : null
    };
    this.playAudio = function(_type, _cb, _loop, _volume) {
        if (!allowToPlay) return;
        if (!audioContext) {
            for (var i = 0; i < aChans.length; i++) {
                if (aChansPlaying.indexOf(aChans[i].id) == -1) {
                    aChansPlaying.push(aChans[i].id);
                    audioObj[_type].audio = aChans[i];
                    break
                }
            }
        }
        if (typeof _cb == "function") {
            if (audioContext) {
                p[_type].callBack = _cb
            }
        }
        if (!audioContext) {
            if (audioObj[_type].audio) {
                audioObj[_type].audio.onended = function(e) {
                    aChansPlaying.splice(aChansPlaying.indexOf(e.target.id), 1);
                    typeof _cb == "function" ? _cb() : null
                }
            }
        }
        if (_loop) {
            if (!audioContext) {
                audioObj[_type].audio ? audioObj[_type].audio.loop = true: null
            } else {
                p[_type].loop = true
            }
        } else {
            if (!audioContext) {
                audioObj[_type].audio ? audioObj[_type].audio.loop = false: null
            } else {
                p[_type].loop = false
            }
        }
        if (audioContext && _volume) {
            p[_type].volume = _volume
        }
        if (!audioContext) {
            if (audioObj[_type] && audioObj[_type].audio) {
                if (_volume) {
                    audioObj[_type].audio.volume = _volume
                }
                audioObj[_type].audio.src = audioObj[_type].src;
                if (audioObj[_type].audio.currentTime) {
                    audioObj[_type].audio.currentTime = .01
                }
                audioObj[_type].audio.play()
            }
        } else {
            if (p[_type]) {
                if (!p[_type].buffer) {
                    loadAudio(_type)
                } else {
                    playAfterLoad(_type)
                }
            }
        }
    };
    function onError() {}
    function loadAudio(_type, _bool, _ref) {
        var request = new XMLHttpRequest;
        request.open("GET", p[_type].source, true);
        request.responseType = "arraybuffer";
        request.onload = function() {
            audioContext.decodeAudioData(request.response,
            function(buffer) {
                p[_type].buffer = buffer;
                if (!_bool) {
                    playAfterLoad(_type, _bool)
                }
            },
            onError);
            typeof _ref != "undefined" ? _ref() : null
        };
        request.send()
    }
    function playAfterLoad(_type, _bool) {
        p[_type].context = audioContext.createBufferSource();
        if (audioContext.createGain) {
            p[_type].gainNode = audioContext.createGain()
        }
        if (audioContext.createGainNode) {
            p[_type].gainNode = audioContext.createGainNode()
        }
        p[_type].context.buffer = p[_type].buffer;
        p[_type].context.connect(p[_type].gainNode);
        p[_type].gainNode.connect(audioContext.destination);
        p[_type].gainNode.gain.value = typeof p[_type].volume == "undefined" ? typeof volume == "undefined" ? 1 : volume: p[_type].volume;
        p[_type].context.loop = p[_type].loop;
        p[_type].context.onended = function(e) {
            contextEnd(e, _type)
        };
        if (!_bool) {
            currentlyPlaying[_type] = p[_type];
            if (p[_type].context.start && p[_type].context.noteOn) {
                if (p[_type].context.start) {
                    _bool ? null: p[_type].context.start(0)
                }
                return false
            }
            if (p[_type].context.start) {
                _bool ? null: p[_type].context.start(0);
                return false
            }
            if (p[_type].context.noteOn) {
                _bool ? null: p[_type].context.noteOn(0);
                return false
            }
        }
    }
    function contextEnd(e, _type) {
        if (p[_type]) {
            if (!p[_type].loop) {
                p[_type].context = undefined;
                typeof p[_type].callBack == "function" ? p[_type].callBack() : null;
                delete currentlyPlaying[_type]
            }
        }
    }
    function checkForFocus() {
        var _nd = new Date;
        if (_nd - globalTime > 1500) {}
        globalTime = _nd
    }
    this.getAudioStatus = function() {
        return allowToPlay
    }
};
var audioPlayerObj = new AudioPlayerClass;


var dkCompTable = function() {
    var p = {
        id: "",
        width: 300,
        height: 300,
        maxRows: 7,
        selectedMode: 0,
        selectedBgColor:"#8090B0",
        selectedColor:"#FFFFFF",
        selectedOldBgColor:"#EEEEF5",
        selectedOldColor:"#222222",
        scrollerWidth: 27,
        scrollerHandleWidth: 18,
        scrollerHandleHeight: 20,
        scrollerDisplay: true,
        fontSize: "1em",
        emdash: false,
        headingAlign: "center",
        bodyAlign: "center",
        barHeight: 5,
        showHeader: true,
        borderWidth: 1,
        decimalAlign: false,
        rowsCss: [],
        colsCss: [],
        refreshScroller: true,
        nanDecimalAlign: false,
        cols: [{
            label: "COLUMN 1",
            width: 50,
            border: "2px solid #A7A7A7",
            bg: "#F4F4F4"
        },
        {
            label: "COLUMN 2",
            width: 50,
            border: "2px solid #A7A7A7",
            bg: "#F4F4F4"
        }]
    };
    var _thisObj = this;
    var tableDiv, sliderBase, sliderKnob, sliderHold, printDiv;
    var trArray = new Array;
    var tdArray = new Array;
    var dataArray = new Array;
    var scrollIndex = 0;
    var mathjaxContainerDiv;
    var selected = -1;
    var oldselected = -1;
    this.init = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        p.x = globalResizeCalc(p.x);
        p.y = globalResizeCalc(p.y);
        p.width = globalResizeCalc(p.width);
        p.height = globalResizeCalc(p.height);
        p.scrollerHandleWidth = globalResizeCalc(p.scrollerHandleWidth);
        p.scrollerHandleHeight = globalResizeCalc(p.scrollerHandleHeight);
        p.borderWidth = globalResizeCalc(p.borderWidth);
        if (p.headerHeight) {
            p.headerHeight = globalResizeCalc(p.headerHeight);
            p.height = p.height - p.headerHeight
        }
        if (p.borderWidth < 1) {
            p.borderWidth = 1
        }
        var _tDiv = document.createElement("div");
        if (p.target) {
            p.target.append(_tDiv)
        } else {
            $("body").append(_tDiv)
        }
        p.target = $(_tDiv);
        p.visible == false ? p.target.css("display", "none") : null;
        p.index ? p.target.css("z-index", p.index) : null;
        p.title ? p.target.attr("p_title", GCTConv(p.title)) : null;
        if (p.scrollerDisplay) {
            p.scrollerWidth = globalResizeCalc(p.scrollerWidth);
            p.width -= p.scrollerWidth
        } else {
            p.scrollerWidth = 0
        }
        p.target.css({
            position: "absolute",
            left: p.x + "px",
            top: p.y + "px",
            width: p.width + "px",
            height: p.height + "px"
        });
        printDiv = document.createElement("div");
        createTable();
        createSlider();
        _thisObj.refreshTable()
    };
    this.getRowNumber = function(){
    	return dataArray==undefined? 0: dataArray.length;
    }
    this.getColNumber = function(){
    	return p.cols==undefined? 0:  p.cols.length;
    }
    this.deleteRow = function(_row , dealSerial){
    	var _rowNum,_colNum;
    	_rowNum = this.getRowNumber();
    	_colNum = this.getColNumber();
    	if ( _colNum>0 && _rowNum>0 && _row <_rowNum  ){
		    dataArray.splice(_row,1);
		    if (dealSerial==true){
			    for (var i=_row; i<dataArray.length; i++){
			    	dataArray[i][0] = String((parseInt(dataArray[i][0])-1));
			    }
		    }
			updateTable();
			this.setLastIndex()
   		}
    }
    this.setRowColors = function(row,bgColor,fontColor){
    	var _colNum = this.getColNumber();
		for (var i=0;i <_colNum; i ++ ){
			this.setCellStyle(row,i,{background:bgColor,color:fontColor});
		}
    }
    function setRowColors(row,bgColor,fontColor){
    	var _colNum = p.cols.length;
		for (var i=0;i <_colNum; i ++ ){
	        if (tdArray[row + 1][i]) {
    	        $(tdArray[row + 1][i]).css({background:bgColor,color:fontColor})
        	}
		}
    }
    this.selected = function(){
    	return selected;
    }
    this.addEventListener = function(_evt, _fun) {
        p[_evt] = _fun
    };
    function onRowDownEvt(e) {
    	var validSelected = false;
    	if (p.selectedMode==undefined || p.selectedMode==0){
    		return;
    	}

        if (e.type == "mousedown" || e.type == "touchstart") {
            focusOutInput();
            if (selected>=0){
				oldselected =  selected;
            }
            var s = e.currentTarget.className.split(" ");

            if (s[1]){
	            var _i = s[1]-2;
	            if (_i>=0 && _i < dataArray.length){
	            	selected = _i;
	            	validSelected = true;
	            }
            }
            if (selected>=0){
				setRowColors(selected,p.selectedBgColor,p.selectedColor);
				if (oldselected >=0 && oldselected != selected ){
					setRowColors(oldselected,"#EEEEF5","#000000");
				}
            }
			audioPlayerObj.playAudio("down");
            if (!BrowserDetect.any()) {
                $(document).unbind("mouseup", onDownEvt).bind("mouseup", onRowDownEvt)
            }
	        if (validSelected==true){
	           	e.selected = selected;
	   	        if (p.change) {
	       	        p.change(e)
	   	        }
	        }
        } else if (e.type == "mouseup" || e.type == "touchend") {
            audioPlayerObj.playAudio("up");
			$(document).unbind("mouseup", onRowDownEvt)
        }
    }
    this.show = function() {
        p.target.show();
        checkTableHeightForSlider()
    };
    this.hide = function() {
        p.target.hide()
    };
    this.addData = function(_data) {
        dataArray.push(_data);
        checkLimit();
        updateTable();
        this.setLastIndex()
    };
    this.addWholeData = function(_dataArr) {
        dataArray = _dataArr;
        checkLimit();
        updateTable();
        this.setLastIndex()
    };
    this.clearData = function() {
        dataArray = new Array;
        scrollIndex = 0;
        if (p.resetToTop) {
            scrollIndex = 0;
            $(sliderKnob).css("top", "0px")
        }
        updateTable()
    };
    this.getTable = function() {
        $("body").append(printDiv);
        $(printDiv).css("opacity", 0);
        $(printDiv).attr("printdiv", true);
        var _htmlArr = new Array;
        _htmlArr[0] = new Array;
        if (p.showHeader) {
            for (var i = 0; i < p.cols.length; i++) {
                $(printDiv).html(p.cols[i].label);
                _htmlArr[0].push($(printDiv).text())
            }
        }
        if (dataArray.length > 0) {
            for (var i = 0; i < dataArray.length; i++) {
                var _i = p.showHeader ? i + 1 : i;
                _htmlArr[_i] = new Array;
                for (var j = 0; j < dataArray[i].length; j++) {
                    $(printDiv).html(dataArray[i][j] != undefined ? dataArray[i][j] : "");
                    _htmlArr[_i].push($(printDiv).text())
                }
            }
            $(printDiv).remove();
            return _htmlArr
        } else {
            $(printDiv).remove();
            return false
        }
    };
    this.updateHeaderLabel = function(_arr) {
        for (var i = 0; i < tdArray[0].length; i++) {
            p.cols[i].label = String(_arr[i]).replace(/-/g, "–");
            $(tdArray[0][i]).html(String(_arr[i]).replace(/-/g, "–"))
        }
    };
    this.getCellData = function(_row, _col) {
        if (tdArray[_row + 1][_col]) {
            return $(tdArray[_row + 1][_col]).html()
        }
    };
    this.setCellData = function(_row, _col, _val) {
        if (tdArray[_row + 1][_col]) {
            if (_row + 1 == 0) p.cols[_col].label = String(_val).replace(/-/g, "–");
            $(tdArray[_row + 1][_col]).html(String(_val).replace(/-/g, "–"))
        }
    };
    this.setCellStyle = function(_row, _col, _val) {
        if (tdArray[_row + 1][_col]) {
            $(tdArray[_row + 1][_col]).css(_val)
        }
    };
    this.setLastIndex = function() {
        if ($(sliderKnob).css("display") != "none" && p.scrollerDisplay) {
            var _max = parseInt($(sliderHold).css("height")) - parseInt($(sliderKnob).css("height"));
            _max = _max < 0 ? 0 : _max;
            $(sliderKnob).css("top", _max);
            onSlideEvent()
        }
    };
    this.getScrollIndex = function() {
        return scrollIndex
    };
    this.setScrollIndex = function(_index) {
        if (_index != undefined && _index < dataArray.length) {
            scrollIndex = _index;
            var _max = parseInt($(sliderHold).css("height")) - parseInt($(sliderKnob).css("height"));
            var _y = scrollIndex / (dataArray.length - p.maxRows) * _max;
            $(sliderKnob).css("top", _y);
            updateTable()
        }
    };
    this.refreshTable = function() {
        applyCss();
        updateTable();
        checkTableHeightForSlider()
    };
    function checkLimit() {
        if (p.maxLimit == undefined) return;
        while (dataArray.length > p.maxLimit) {
            dataArray.splice(0, 1)
        }
    }
    function applyCss() {
        for (var i = 1; i < p.maxRows + 1; i++) {
            var tempCssObj = new Object;
            if (p.rowsCss[i]) {
                for (var inc1 in p.rowsCss[i]) {
                    tempCssObj[inc1] = p.rowsCss[i][inc1]
                }
            }
            for (var j = 0; j < p.cols.length; j++) {
                if (p.colsCss[j]) {
                    for (var inc2 in p.colsCss[j]) {
                        tempCssObj[inc2] = p.colsCss[j][inc2]
                    }
                }
                if (p.colsCss[j] || p.rowsCss[i]) $(tdArray[i][j]).css(tempCssObj)
            }
        }
    }
    function createTable() {
        if (p.columnBg) {
            var colBgArr = new Array;
            var _trHgt = p.height / (p.maxRows + 1);
            for (var i = 0; i < p.cols.length; i++) {
                colBgArr[i] = document.createElement("div");
                p.target.append(colBgArr[i]);
                var _cellWid = p.width * parseInt(p.cols[i].width) / 100;
                $(colBgArr[i]).css({
                    width: _cellWid + "px",
                    height: p.height - _trHgt - globalResizeCalc(2) + "px",
                    background: p.cols[i].cbg,
                    "float": "left"
                })
            }
        }
        tableDiv = document.createElement("div");
        mathjaxContainerDiv = document.createElement("div");
        p.target.append(mathjaxContainerDiv);
        p.target.append(tableDiv);
        $(tableDiv).addClass("ntable").attr("id", p.id + "_table");
        $(tableDiv).css({
            position: "absolute",
            left: "0px",
            top: "0px",
            width: Math.round(p.width) + "px",
            height: p.height + "px"
        }).attr({
            cellpadding: 0,
            cellspacing: 0
        });
        $(mathjaxContainerDiv).css({
            position: "absolute",
            left: "0px",
            top: "0px",
            opacity: 0
        });
        var _trHgt = p.height / (p.maxRows + 1);
        var _barExist = false;
        for (var i = 0; i <= p.maxRows + 1; i++) {
            var _totalWidth = 0;
            tdArray[i] = new Array;
            trArray[i] = document.createElement("div");

            $(trArray[i]).addClass("ntr "+i);
            $(tableDiv).append(trArray[i]);

            if (BrowserDetect.any()) {
                $(trArray[i]).unbind("touchstart", onRowDownEvt).bind("touchstart", onRowDownEvt).unbind("touchend", onRowDownEvt).bind("touchend", onRowDownEvt)
            } else {
                $(trArray[i]).unbind("mousedown", onRowDownEvt).bind("mousedown", onRowDownEvt)
            }

            for (var j = 0; j < p.cols.length; j++) {
                if (typeof p.cols[j].barColor != "undefined") {
                    _barExist = true
                } {
                    var _tempTd = document.createElement("div");
                    tdArray[i][j] = _tempTd;
                    tdArray[i][j] = document.createElement("div");
                    $(tdArray[i][j]).addClass("ntd");
                    _tempTd = tdArray[i][j];
                    $(trArray[i]).append(tdArray[i][j])
                }
                $(_tempTd).css({
                    background: p.cols[j].bg,
                    "border-left": p.cols[j].border,
                    "border-right": p.cols[j].border,
                    overflow: "hidden"
                });
                if (i == 0) {
                    $(tdArray[i][j]).css({
                        "border-top": p.cols[j].border,
                        "border-bottom": p.cols[j].border
                    })
                }
                if (i == p.maxRows + 1) {
                    $(tdArray[i][j]).css({
                        "border-bottom": p.cols[j].border
                    })
                } else {
                    $(tdArray[i][j]).css({})
                }
                $(tdArray[i][j]).css({
                    overflow: "hidden",
                    display: "table-cell",
                    "font-size": p.fontSize,
                    "text-align": "center",
                    "vertical-align": "middle",
                    cursor: "default",
                    background: p.cols[j].bg,
                    "border-left": p.cols[j].border,
                    "border-right": p.cols[j].border
                });
                if (j != p.cols.length - 1) {
                    var _cellWid = p.width * parseInt(p.cols[j].width) / 100;
                    $(tdArray[i][j]).css({
                        width: _cellWid + "px",
                        height: _trHgt
                    });
                    $(_tempTd).css({
                        width: _cellWid + "px"
                    });
                    _totalWidth += _cellWid
                } else {
                    $(tdArray[i][j]).css({
                        width: p.width - _totalWidth + "px",
                        height: _trHgt
                    });
                    $(_tempTd).css({
                        width: p.width - _totalWidth + "px"
                    })
                }
                if (i < 2) {
                    $(_tempTd).css({
                        border: p.cols[j].border
                    });
                    $(tdArray[i][j]).css({
                        "font-weight": "bold",
                        "text-align": p.headingAlign
                    });
                    if (p.headerHeight) $(tdArray[0][j]).css({
                        height: p.headerHeight
                    });
                    if (p.leftPadding) $(tdArray[i][j]).css({
                        "padding-left": p.leftPadding
                    });
                    if (p.rightPadding) $(tdArray[i][j]).css({
                        "padding-right": p.rightPadding
                    });
                    var _str = String(p.cols[j].label).replace(/-/g, "–");
                    if (_str.indexOf("\\begin{equation}") != -1) {
                        if (p.katex) {
                            printKatex($(tdArray[i][j]), _str)
                        } else {
                            var _div = document.createElement("div");
                            $(tdArray[i][j]).html(_div);
                            $(_div).attr("id", p.id + "_" + i + "_" + j + "_div").css({
                                display: "inline-block"
                            }).html(_str)
                        }
                    } else {
                        $(tdArray[i][j]).html(_str)
                    }
                } else {
                    $(tdArray[i][j]).css({
                        "text-align": p.bodyAlign
                    });
                    if (p.leftPadding) $(tdArray[i][j]).css({
                        "padding-left": p.leftPadding
                    });
                    if (p.rightPadding) $(tdArray[i][j]).css({
                        "padding-right": p.rightPadding
                    })
                }
                if (i == p.maxRows + 1) {
                    $(_tempTd).css({
                        "border-bottom": p.cols[j].border
                    })
                }
                $(_tempTd).css({
                    "border-width": p.borderWidth + "px"
                }).attr("id", p.id + "_" + i + "_" + j)
            }
        }
        if (_barExist) {
            for (var j = 0; j < tdArray[1].length; j++) {
                if (typeof p.cols[j].barColor != "undefined") {
                    $(tdArray[1][j]).css({
                        background: p.cols[j].barColor,
                        height: globalResizeCalc(p.barHeight) + "px"
                    }).html("")
                }
            }
        } else {
            $(trArray[1]).remove();
            for (var j = 0; j < tdArray[1].length; j++) {
                $(tdArray[1][j]).remove()
            }
        }
        tdArray.splice(1, 1);
        trArray.splice(1, 1)
    }

    function createSlider() {
        if (p.scrollerDisplay) {
            sliderBase = document.createElement("div");
            p.target.append(sliderBase);
            $(sliderBase).css({
                position: "absolute",
                left: p.width + "px",
                top: "0px",
                width: p.scrollerWidth + "px",
                height: $(tableDiv).outerHeight(true) + "px",
                background: "#E5E5E5",
                "box-shadow": "2px 2px 10px rgba(0,0,0,0.5) inset"
            });
            sliderHold = document.createElement("div");
            $(sliderBase).append(sliderHold);
            $(sliderHold).css({
                position: "absolute",
                left: globalResizeCalc(5) + "px",
                top: globalResizeCalc(5) + "px",
                width: p.scrollerWidth - globalResizeCalc(10) + "px",
                height: parseInt($(sliderBase).css("height")) - globalResizeCalc(10) + "px"
            });
            sliderKnob = document.createElement("div");
            $(sliderHold).append(sliderKnob);
            $(sliderKnob).css({
                position: "absolute",
                left: "0px",
                top: "0px",
                width: p.scrollerWidth - globalResizeCalc(10) + "px",
                height: globalResizeCalc(39) + "px",
                background: "#FFFFFF",
                "background-size": globalResizeCalc(10) + "px " + globalResizeCalc(17) + "px",
                "background-position": "center",
                "box-shadow": "2px 2px 5px rgba(0,0,0,0.5)",
                display: "none"
            }).attr("p_title", GetGlobalTooltip("tooltip", "tablescroll"));
            $(sliderKnob).addClass("commongrab");
            $(sliderKnob).draggable({
                containment: "parent",
                drag: onSlideEvent
            });
            if (BrowserDetect.any()) {
                $(sliderKnob).unbind("touchstart", onDownEvt).bind("touchstart", onDownEvt).unbind("touchend", onDownEvt).bind("touchend", onDownEvt)
            } else {
                $(sliderKnob).unbind("mousedown", onDownEvt).bind("mousedown", onDownEvt)
            }
        }
        if (!p.showHeader) {
            $(trArray[0]).hide();
            for (var j = 0; j < tdArray[1].length; j++) {
                $(tdArray[1][j]).css({
                    "border-top": p.cols[j].border,
                    "border-width": p.borderWidth + "px"
                })
            }
            updateTable()
        }
    }
    function checkTableHeightForSlider() {
        if (p.scrollerDisplay) {
            var _tableManageDiv = document.createElement("div");
            $("body").append(_tableManageDiv);
            $(_tableManageDiv).css({
                position: "absolute",
                left: "0px",
                top: "0px",
                opacity: 0
            });
            var _parent = p.target.parent();
            $(_tableManageDiv).append(p.target);
            $(sliderBase).css({
                height: $(tableDiv).outerHeight(true) + "px"
            });
            $(sliderHold).css({
                height: parseInt($(sliderBase).css("height")) - globalResizeCalc(10) + "px"
            });
            $(_parent).append(p.target);
            $(_tableManageDiv).remove()
        }
    }
    function updateTable() {
        $(mathjaxContainerDiv).empty();
        var _cnt = 1;
        var callBackArr = [];
        for (var k = 1; k < tdArray.length; k++) {
            for (var m = 0; m < tdArray[k].length; m++) {
                $(tdArray[k][m]).html("")
            }
        }
        for (var i = scrollIndex; i < dataArray.length; i++) {
            if (tdArray[_cnt]) {
                for (var j = 0; j < tdArray[_cnt].length; j++) {
                    var _str = String(dataArray[i][j]);
                    if (_str.indexOf("\\begin{equation}") != -1) {
                        if (p.katex) {
                            printKatex($(tdArray[_cnt][j]), _str);
                            $(".katex").css("font-weight", p.bold)
                        } else {
                            var _div = document.createElement("div");
                            var _html = String(dataArray[i][j]).replace(/-/g, "–");
                            $(mathjaxContainerDiv).append(_div);
                            var tempName = p.id + "_" + _cnt + "_" + j + "_div";
                            $("#" + tempName).remove();
                            $(_div).attr("id", tempName).css({
                                display: "inline-block",
                                opacity: 0
                            }).attr("parentName", $(tdArray[_cnt][j]).attr("id"));
                            callBackArr.push(tempName);
                            var mjObj = MathJax.Hub.getAllJax(tempName)[0],
                            mjHubParam = mjObj ? ["Text", mjObj, _html] : ["Typeset", MathJax.Hub, tempName];
                            if (!mjObj) {
                                $(_div).html(_html);
                                MathJax.Hub.Queue(mjHubParam, p.id + "_table",
                                function() {
                                    var counter = 0;
                                    for (var k in callBackArr) {
                                        if ($("#" + callBackArr[k]).css("opacity") != 1 && $("#" + callBackArr[k] + " > div.MathJax_Display").length > 0) {
                                            var _tempCallBackDiv = $("#" + callBackArr[k]).clone();
                                            $(_tempCallBackDiv).css("opacity", 1);
                                            $("#" + $(_tempCallBackDiv).attr("parentName")).empty().append(_tempCallBackDiv);
                                            $(_tempCallBackDiv).removeAttr("id");
                                            counter++
                                        }
                                    }
                                    var mjD = $(_div).children(".MathJax_Display");
                                    if (mjD) mjD.css("text-align", "center")
                                })
                            }
                        }
                    } else {
                        var _str = String(dataArray[i][j]).replace(/-/g, "–");
                        if (p.decimalAlign) {
                            var _wwid = (parseFloat(tdArray[_cnt][j].style.width) - 1) / 2;
                            var _arr, _midd;
                            if (!isNaN(dataArray[i][j]) || p.nanDecimalAlign) {
                                if (_str.indexOf(".") != -1) {
                                    _arr = _str.split(".");
                                    _midd = "."
                                } else {
                                    _arr = [_str, ""];
                                    _midd = "<span style='opacity:0;'>.</span>"
                                }
                                if (!p.decimalPadding) _str = '<div style="display:table;"><div style="display:table-cell; text-align:right; width:' + _wwid + 'px;">' + _arr[0] + '</div><div style="display:table-cell; width:1px;">' + _midd + '</div><div style="display:table-cell; text-align:left;">' + _arr[1] + "</div></div>";
                                else _str = '<div style="display:table;"><div style="display:table-cell; text-align:right; width:' + _wwid + 'px;">' + _arr[0] + '</div><div style="display:table-cell; width:1px;">' + _midd + '</div><div style="display:table-cell; text-align:left; width:' + _wwid + 'px;">' + _arr[1] + "</div></div>"
                            }
                        }
                        $(tdArray[_cnt][j]).html(_str)
                    }
                }
                _cnt++
            }
        }
        checkSlider();
        if (p.refreshScroller) checkTableHeightForSlider()
    }
    function checkSlider() {
        if (dataArray.length > tdArray.length - 1) {
            $(sliderKnob).show()
        } else {
            $(sliderKnob).hide()
        }
    }
    function onSlideEvent(event, ui) {
        var _y = parseInt($(sliderKnob).css("top"));
        var _max = parseInt($(sliderHold).css("height")) - parseInt($(sliderKnob).css("height"));
        scrollIndex = Math.round((dataArray.length - p.maxRows) / _max * _y);
        updateTable()
    }
    function onDownEvt(e) {
        if (e.type == "mousedown" || e.type == "touchstart") {
            focusOutInput();
            addPointerGrabbing(true);
            audioPlayerObj.playAudio("down");
            if (!BrowserDetect.any()) {
                $(document).unbind("mouseup", onDownEvt).bind("mouseup", onDownEvt)
            }
        } else if (e.type == "mouseup" || e.type == "touchend") {
            audioPlayerObj.playAudio("up");
            addPointerGrabbing(false);
            $(document).unbind("mouseup", onDownEvt)
        }
    }
};


var dkCompCordGraph = function() {
    var p = {
        gridId: "grid",
        width: 500,
        height: 500,
        labelPlusSign: false,
        drawQuads: 0,
        lineType: true,
        showBarNumbers: false,
        arrowXL: false,
        arrowXR: false,
        arrowYU: false,
        arrowYD: false,
        centerX: 0,
        centerY: 0,
        suffixX: "",
        suffixY: "",
        drawGridLines: true,
        drawScaleX: false,
        drawScaleY: false,
        panX: true,
        panY: true,
        regPointStyle: "",
        labelStyleXYFamily: "arial",
        labelStyleXYSize: "16px",
        labelStyleXYStyle: "normal",
        labelStyleXYColor: "#000000",
        scaleLoc : 0,
        stopLabelX: true,
        stopLabelY: true,
        stopAxisY: false,
        stopAxisX: false,
        labelStyle: "italic",
        borderStyle: "",
        gridXYColor: "#555555",
        gridBigColor: "#808080",
        gridSmallColor: "#CCCCCC",
        bgColor: "#FFFFF2",
        gridBgColor: "rgba(255,231,231,1)",
        bgShadow: "",
        gridBgShadow: "none",
        gridXYWidth: 2,
        axisWidth: 4,
        gridBigWidth: 2,
        gridSmallWidth: 1,
        gridXVisible: true,
        gridYVisible: true,
        axisXVisible: true,
        axisYVisible: true,
        intervalXVisible: true,
        intervalYVisible: true,
        centerLabelXVisible: false,
        centerLabelYVisible: false,
 		dotSize: 10,
        zoomX: true,
        zoomY: true,
        zoomFromCenterX: true,
        zoomFromCenterY: true,
        maxZoom: 2,
        minZoom: .5,
        zoomValX: 1,
        zoomValY: 1,
        marginLeft: 100,
        marginTop: 30,
        marginRight: 30,
        marginBottom: 30,
        leastCountX: 60,
        leastCountY: 60,
        unitX: 1,
        unitY: 1,
        labelIntervalX: 1,
        labelIntervalY: 1,
        majorIntervalX: 1,
        majorIntervalY: 1,
        minorIntervalX: 1,
        minorIntervalY: 1,
        oxReg: "center",
        oyReg: "center",
        xReg: 100,
        yReg: 100,
        xRegOffset:0,
        yRegOffset:0,
        decimal: 1,
        decimalInNumber: false,
        updateOnDrag: false,
        toolTip: false,
        showXAxis: false,
        labelInBold: true,
        barValueHeight: 10,
        mouseCurType: "grab",
        customIndex: 0,
        xLabelSuffix: "",
        yLabelSuffix: "",
        barLabelTop: 5,
        isMaths: true,
        toFixedX: true,
        toFixedY: true,
        showBarZeroVal: true,
        canvasLineBuffer: 0,
        allowPointIndexing: false,
        leftGridMinor: false,
        rightGridMinor: true,
        dashedAxisLen: 10,
        probeDimentionOffset: 0,
        canvasClipBool: false,
        dashedXAxis: false,
        dashedYAxis:true,
       	provePoint: 0,
        provePointH: 0,
        probeColor: "#00A86E",
        probeFillColor: "#66CBA8",
        probeColorH: "#00A86E",
        probeFillColorH: "#66CBA8",
        proveArea: 10,
        probeVisible: true,
        probeVisibleH: false,
        probeInterPoint: [],
        probeInterPointH: [],
        probeSnap: true,
        probePaddingTop: 0,
        probePaddingBottom: 0,
        probePaddingLeft: 0,
        probePaddingRight: 0,
    };
    var _thisObj = this;
    var canvas, ctx;
    var canvasAxis, ctxAxis;
    var canvasCustomDraw, ctxCustomDraw;
    var canvasBarLabel, ctxBarLabel;
    var canvasLine, ctxLine;
    var canvasPoint, ctxPoint;
    var canvasProve, ctxProve;
    var labelXDiv, labelYDiv;
    var drawingObject;
    var oldTouchX, oldTouchY, oldTouchZoom;
    var baseGridIndex = 0;
    var userLines = new Array;
    var interSecPoints = new Array;
    var isOnDots, isOnProves, isOnProvesH, isOnLine, proveMove, proveMoveH;
    var numberX, numberY;
    var probeSnapPoints = new Array;
    var probeSnapPointsH = new Array;
    var mouseDownActivated = false;
    var toolTip, gapCount;
    var prevMouseX, prevMouseY;
    var mouseMoved = false;
    var proveDecimal = 0;
    var indexingArr = new Array;
    this.init = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i];
        }
        p.x = globalResizeCalc(p.x);
        p.y = globalResizeCalc(p.y);
        p.width = globalResizeCalc(p.width);
        p.height = globalResizeCalc(p.height);
        p.marginLeft = globalResizeCalc(p.marginLeft);
        p.marginTop = globalResizeCalc(p.marginTop);
        p.marginRight = globalResizeCalc(p.marginRight);
        p.marginBottom = globalResizeCalc(p.marginBottom);
        p.labelStyleXYSize = globalResizeCalc(p.labelStyleXYSize) + "px";
        p.dotSize = globalResizeCalc(p.dotSize);
        p.unitX = p.unitX / globalResizeCalc(1);
        p.unitY = p.unitY / globalResizeCalc(1);
        p.axisWidth = globalResizeCalc(p.axisWidth);
        p.gridBigWidth = globalResizeCalc(p.gridBigWidth);
        p.gridSmallWidth = globalResizeCalc(p.gridSmallWidth);
        p.proveArea = globalResizeCalc(p.proveArea);
        p.probePaddingTop = globalResizeCalc(p.probePaddingTop);
        p.probePaddingBottom = globalResizeCalc(p.probePaddingBottom);
        p.probePaddingLeft = globalResizeCalc(p.probePaddingLeft);
        p.probePaddingRight = globalResizeCalc(p.probePaddingRight);
        p.barValueHeight = globalResizeCalc(p.barValueHeight);
        p.barLabelTop = globalResizeCalc(p.barLabelTop);
        p.dashedAxisLen = globalResizeCalc(p.dashedAxisLen);
        proveDecimal = ("" + p.probeSnapVal).indexOf(".") == -1 ? 0 : ("" + p.probeSnapVal).split(".")[1].length;
        if (p.arrows) {
            p.arrowX = true;
            p.arrowY = true
        }
        if (p.arrowX) {
            p.arrowXR = true;
            p.arrowXL = true
        }
        if (p.arrowY) {
            p.arrowYU = true;
            p.arrowYD = true
        }
        if (!p.isMaths) {
            p.toFixedX = false;
            p.toFixedY = false
        }
        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d");
        canvasAxis = document.createElement("canvas");
        ctxAxis = canvasAxis.getContext("2d");
        canvasCustomDraw = document.createElement("canvas");
        ctxCustomDraw = canvasCustomDraw.getContext("2d");
        canvasBarLabel = document.createElement("canvas");
        ctxBarLabel = canvasBarLabel.getContext("2d");
        canvasLine = document.createElement("canvas");
        ctxLine = canvasLine.getContext("2d");
        canvasPoint = document.createElement("canvas");
        ctxPoint = canvasPoint.getContext("2d");
        canvasProve = document.createElement("canvas");
        ctxProve = canvasProve.getContext("2d");
        var _tDiv = document.createElement("div");
        if (p.target) {
            p.target.append(_tDiv)
        } else {
            $("body").append(_tDiv)
        }
        p.target = $(_tDiv);
        p.target.css({
            position: "absolute",
            left: p.x + "px",
            top: p.y + "px"
        });
        p.target.append(canvas);
        p.target.append(canvasCustomDraw);
        p.target.append(canvasBarLabel);
        p.target.append(canvasLine);
        p.target.append(canvasAxis);
        p.target.append(canvasProve);
        p.target.append(canvasPoint);
        if (p.customIndex) {
            $(canvasCustomDraw).css({
                "z-index": p.customIndex
            })
        }
        if (p.customLineCanvas) {
            $(canvasLine).css({
                "z-index": p.customLineCanvas
            })
        }
        if (p.customPointCanvas) {
            $(canvasPoint).css({
                "z-index": p.customPointCanvas
            })
        }
        if (p.pointIndex) {
            $(canvasPoint).css({
                "z-index": p.pointIndex
            })
        }
        createLabelDivs();
        if (p.title) {
            if (typeof p.title == "string") {
                p.title ? $(canvasPoint).attr("p_title", GCTConv(p.title)) : null
            }
        }
        p.visible == false ? p.target.css("display", "none") : null;
        p.index ? p.target.css("z-index", p.index) : null;
        switch (p.drawQuads) {
        case 1:
			p.oxReg = "left";
            p.oyReg = "bottom";
            p.zoomFromCenterX = false;
            p.zoomFromCenterY = false;
            break
        }

        createBaseCanvas();
        drawProve();
        p.pointShadeImg = new Image;
        p.pointShadeImg.onload = function() {
            drawPointCanvas()
        };
        p.pointShadeImg.src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAD0UlEQVQ4jY2U3W7bOBCFDzkkpVhO5Ch/6G5ToN19jD56X6E3RWu0SNIq2jSpY8uWI0uyRHK4N3EQZHux544/58NwcDgCv1EIQXz69GnUNE3U973suk5UVSVns5m8vr7G58+f2w8fPtQA+KWXXm5cXFwclGX5pzHmxBhzcHh4mOzv76s3b96E0Wgk4zg2URTtn52dZdZat1wu++d+9byq6XR6DuCYiEYAojiOZQiB4zjumbk9PT19iKKoM8YEALpt29dt29a3t7f//Ac4nU7PjDF/KKVSrfV+CCEWQsgQAgshttbaGoDJsmwFYNO2rSzL0s3n8/T29rYBsHx68pcvX8ZKqb+NMZlS6lgplSmlDpVSB0SUCCEMACWECN57juN423Wd7/teVlUl1+t11jRNA2CgEIKYzWZ/RVF0rJTKjDFHxpgjIsqIaCKl3CMiBQDM7AE455wlom61WsmyLOVqtZKLxWIC4F5Np9NkNBolRBQTUSKl3JdSZlrrQynlHjN31lotpXRE1DJzHUVRfHR0hCzLOE3TMB6PA4AIwJHq+35Pa01aay2lNEQUK6USpVRGRBPvfRVCGJg59t4bKaUehoGccwQARBSMMQAQAEyk1jr+TQ7DY8Y8AH5c/x+NlTGGhRCWmQdm7r33nVKqcc4tmbll5m0IofHed8zcM/MghLBKKT8Mg+66TgzDAAACgFJlWeLk5KR3zm2llI2U8qHve1JKDUSkvffWOVd77x+8941zbgugL8sSm81GbDYbWde1fMphWZY0mUw2RDTy3hshBIUQPDM3QggVQnDM3D0C19772nu/KcuSyrKkqqrkcrncAZ0qimIYj8fq9PR0BUCEEDyAznu/B0A+9rKz1m6stWvn3Or+/t7nea5//vwp5/O5nM/nO2CnLi8vh9FoFEdR1B0fHy+stT0zNwCi3U8B0HvvGyFEvV6v+zzPdVEU6vv376ooCnrsHwBUZK11aZpm2+1WCCFcmqYbAFtm7gA0zFwDWIcQHvI8D1+/flVXV1fq4uJCX11d6aIo9O65AK7Vx48f7WQyqeu6TquqcovFQiZJYtM0HXaNXq/XomkaXRQF3dzcqDzP6fLyUn/79u1pFgC4A+B3peL9+/fvzs/PTZZlfHJywlEUPc26vu/lfD6Xy+VS/vr1i/I8Vz9+/HgOWwC43mVnJ3r79u3rV69e7e/t7fHBwcFTmB8eHkTXdfLu7k7OZjNq21Y+890+VoeXwJ1eJ0lymCSJ1FrDWothGGRVVeLFfQfgBkD53Pw7IAAYAKcAjvBsZj4DlQDuAQwvzvAvTRFKTnCrF10AAAAASUVORK5CYII=";
        if (p.toolTip) {
            toolTip = new ToolTipComp;
            toolTip.init({})
        } else {
            toolTip = {
                showTip: function() {},
                hideTip: function() {}
            }
        }
        if (BrowserDetect.any()) {
            $(document).on("commonToolTipActiveAndMoving",
            function(e) {
                graphOver({
                    pageX: e.pageX,
                    pageY: e.pageY,
                    type: "mousemove"
                });
                proveOverGraph({
                    pageX: e.pageX,
                    pageY: e.pageY,
                    type: "mousemove"
                })
            })
        }
    };
    this.show = function() {
        p.target.show()
    };
    this.hide = function() {
        p.target.hide()
    };
    this.reSetParams = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        if (_obj.customIndex) {
            $(canvasCustomDraw).css({
                "z-index": p.customIndex
            })
        }
        if (_obj.customLineCanvas) {
            $(canvasLine).css({
                "z-index": p.customLineCanvas
            })
        }
        if (_obj.customPointCanvas) {
            $(canvasPoint).css({
                "z-index": p.customPointCanvas
            })
        }
        if (_obj.pointIndex) {
            $(canvasPoint).css({
                "z-index": p.pointIndex
            })
        }
        if (_obj.probeSnapVal) proveDecimal = ("" + p.probeSnapVal).indexOf(".") == -1 ? 0 : ("" + p.probeSnapVal).split(".")[1].length
    };
    this.drawCanvas = function() {
        createBaseGrid();
        drawCanvas()
    };
    this.provePoint = function(_val) {
        if (_val != undefined) {
            p.provePoint = _val;
            drawProve()
        } else {
            return p.provePoint
        }
    };
    this.provePointH = function(_val) {
        if (_val != undefined) {
            p.provePointH = _val;
            drawProve()
        } else {
            return p.provePointH
        }
    };
    this.proveShow = function(_bool, flag) {
        if (flag) {
            p.probeVisibleH = _bool
        } else {
            p.probeVisible = _bool
        }
        if (p.probeVisibleH || p.probeVisible) {
            $(canvasProve).show()
        } else {
            $(canvasProve).hide()
        }
        drawProve()
    };
    this.showGridX = function(_bool) {
        p.gridXVisible = _bool;
        createBaseGrid()
    };
    this.showGridY = function(_bool) {
        p.gridYVisible = _bool;
        createBaseGrid()
    };
    this.getGraphArea = function() {
        var _ppMin = pixelToPoint(0, 0);
        var _ppMax = pixelToPoint(canvas.mw, canvas.mh);
        var _ppCenter = pixelToPoint(canvas.mw / 2, canvas.mh / 2);
        return {
            min: {
                x: _ppMin.x,
                y: _ppMin.y
            },
            max: {
                x: _ppMax.x,
                y: _ppMax.y
            },
            center: {
                x: _ppCenter.x,
                y: _ppCenter.y
            }
        }
    };
    this.setMouseEvent = function(e, bool) {
        graphOver(e);
        if (!bool) {
            panGraph(e)
        }
    };
    this.setInterPoint = function(_arr) {
        for (var i in _arr) this.drawInterPoint(_arr[i], true);
        drawPointCanvas()
    };
    this.setUserLines = function(_arr) {
        for (var i in _arr) this.drawLines(_arr[i], true);
        drawLineCanvas()
    };
    this.drawLines = function(_obj, doNotDraw) {
        if (!mouseDownActivated || p.updateOnDrag) {
            if (_obj.id == undefined || _obj.data == undefined) {
                return false
            }
            var _arr = _obj.data;
            var _id = _obj.id;
            if (!userLines[_id]) {
                userLines[_id] = {
                    point: [],
                    color: "#000000",
                    lineWidth: 2
                }
            }
            if (typeof _obj.label != "undefined") {
                userLines[_id].label = _obj.label
            }
            if (_obj.reset) {
                userLines[_id].point = new Array
            }
            if (typeof _obj.dashed != "undefined") {
                userLines[_id].dashed = _obj.dashed
            }
            if (typeof _obj.allowParse != "undefined") {
                userLines[_id].allowParse = _obj.allowParse
            }
            for (var i = 0; i < _arr.length; i++) {
                userLines[_id].point.push({
                    x: _arr[i].x,
                    y: _arr[i].y
                })
            }
            if (_obj.color) {
                userLines[_id].color = _obj.color
            }
            if (_obj.title) {
                userLines[_id].title = _obj.title
            }
            if (_obj.toolTip) {
                userLines[_id].toolTip = _obj.toolTip
            }
            if (_obj.lineWidth) {
                userLines[_id].lineWidth = Math.max(globalResizeCalc(_obj.lineWidth), 1)
            }
            if (_obj.borderWidth && _obj.borderColor) {
                userLines[_id].borderWidth = _obj.borderWidth;
                userLines[_id].borderColor = _obj.borderColor
            }
            if (_obj.showArrow) {
                userLines[_id].showArrow = _obj.showArrow
            } else {
                userLines[_id].showArrow = null
            }
            if (_obj.pan) {
                userLines[_id].pan = true
            } else {
                userLines[_id].pan = false
            }
            userLines[_id].removeLineCap = userLines[_id].removeLineCap == "undefined" ? false: true;
            if (!doNotDraw) drawLineCanvas()
        }
    };
    this.showNumbers = function(_bool) {
        p.showBarNumbers = _bool;
        drawLineCanvas()
    };
    this.drawInterPoint = function(_obj, doNotDraw) {
        if (!mouseDownActivated || p.updateOnDrag) {
            if (indexingArr.indexOf(_obj.id) == -1) {
                indexingArr.push(_obj.id)
            } else if (p.allowPointIndexing) {
                var curIndex = indexingArr.indexOf(_obj.id);
                var lastIndex = indexingArr.length;
                moveArrayElement(indexingArr, curIndex, lastIndex)
            }
            removeUndefinedFromArray(indexingArr);
            _obj.xPix = _obj.x;
            _obj.yPix = _obj.y;
            interSecPoints[_obj.id] = _obj;
            interSecPoints[_obj.id].toolTip = typeof _obj.toolTip != "undefined" ? _obj.toolTip: "";
            interSecPoints[_obj.id].radius = typeof _obj.radius != "undefined" ? _obj.radius: p.dotSize;
            if (isOnDots == _obj.id) {
                var _xVal = ("" + Number(interSecPoints[isOnDots].x).toFixed(p.decimal) * 1).replace(/-/g, "&ndash;");
                var _yVal = ("" + Number(interSecPoints[isOnDots].y).toFixed(p.decimal) * 1).replace(/-/g, "&ndash;");
                var _pTem = pointToPixel(interSecPoints[isOnDots].x, interSecPoints[isOnDots].y, true);
                var tempX = _pTem.x + $(canvasPoint).offset().left + interSecPoints[_obj.id].radius;
                var tempY = _pTem.y + $(canvasPoint).offset().top + interSecPoints[_obj.id].radius;
                var mouseE = new Object;
                if (BrowserDetect.any()) {
                    mouseE.touches = [];
                    mouseE.touches.push({
                        pageX: tempX,
                        pageY: tempY
                    })
                }
                mouseE.pageX = tempX;
                mouseE.pageY = tempY;
                if (p.toolTip && checkCanvasBoundary(mouseE)) {
                    if (typeof interSecPoints[isOnDots].toolTip != "undefined" && String(interSecPoints[isOnDots].toolTip).length > 0) {
                        if (interSecPoints[isOnDots].toolTip) toolTip.showTip(interSecPoints[isOnDots].toolTip, mouseE);
                        else toolTip.hideTip()
                    } else if (p.toolTip == "x") {
                        toolTip.showTip(_xVal, mouseE)
                    } else if (p.toolTip == "y") {
                        toolTip.showTip(Number(_yVal), mouseE)
                    } else {
                        toolTip.showTip("(" + _xVal + ", " + _yVal + ")", mouseE)
                    }
                }
            }
            if (!doNotDraw) drawPointCanvas()
        }
    };
    this.setZoom = function(_type, _value, _zoomx, _zoomy) {
        if (_type == "reset") {
            p.zoomValX = p.zoomValY = 1
        } else if (_type == "increase") {
            p.zoomValX = _zoomx ? p.zoomValX + _value: p.zoomValX;
            p.zoomValY = _zoomy ? p.zoomValY + _value: p.zoomValY
        } else if (_type == "decrease") {
            p.zoomValX = _zoomx ? p.zoomValX - _value: p.zoomValX;
            p.zoomValY = _zoomy ? p.zoomValY - _value: p.zoomValY
        }
        returnViewChange("zoom");
        createBaseGrid()
    };
    this.setProvePoints = function(_arr) {
        p.probeInterPoint = _arr;
        drawProve()
    };
    this.cleanAll = function(_id) {
        if (_id != undefined) {
            userLines[_id] = undefined;
            interSecPoints[_id] = undefined
        } else {
            userLines = new Array;
            interSecPoints = new Array
        }
        drawLineCanvas();
        drawPointCanvas()
    };
    this.getSnapShot = function(_complete) {
        if (_complete) {
            return {
                x: p.x,
                y: p.y,
                width: canvas.width,
                height: canvas.height
            }
        } else {
            return {
                x: p.x + canvas.mx,
                y: p.y + canvas.my,
                width: canvas.mw,
                height: canvas.mh
            }
        }
    };
    this.addEventListener = function(_evt, _fun) {
        p[_evt] = _fun
    };
    this.reArrangeGraph = function(_obj, zoomPoint) {
        _obj.unitX ? _obj.unitX = _obj.unitX / globalResizeCalc(1) : null;
        _obj.unitY ? _obj.unitY = _obj.unitY / globalResizeCalc(1) : null;
        var _ncenterPoint = zoomPoint ? zoomPoint: {
            x: _thisObj.getGraphArea().center.x,
            y: _thisObj.getGraphArea().center.y
        };
        var _centerPix = zoomPoint ? pointToPixel(zoomPoint.x, zoomPoint.y) : pointToPixel(_thisObj.getGraphArea().center.x, _thisObj.getGraphArea().center.y);
        _thisObj.reSetParams(_obj);
        var _newCenterPix = pointToPixel(_ncenterPoint.x, _ncenterPoint.y);
        setQuardZoomStyle();
        if (!isNaN(p.xReg) && p.zoomFromCenterX) {
            p.xReg += _centerPix.x - _newCenterPix.x
        }
        if (!isNaN(p.yReg) && p.zoomFromCenterY) {
            p.yReg += _centerPix.y - _newCenterPix.y
        }
        if (!p.isMaths) {
            p.toFixedX = false;
            p.toFixedY = false
        } else {
            p.toFixedX = true;
            p.toFixedY = true
        }
//<dk>160623
if (_obj.x!=undefined ||_obj.y!=undefined || _obj.width!=undefined|| _obj.height!=undefined || _obj.bgColor!=undefined){
	if (_obj.x!=undefined && _obj.y!=undefined ){
		p.target.css({
		    position: "absolute",
		    left: dkScreenResize(_obj.x) + "px",
		    top: dkScreenResize(_obj.y) + "px"
		});
	}
	if (_obj.width!=undefined ){
		p.width = dkScreenResize(_obj.width);
	}
	if (_obj.height!=undefined ){
		p.height = dkScreenResize(_obj.height);
	}
	createBaseCanvas();
}
        createLabelDivs();
        createBaseGrid();
        drawLineCanvas();
        drawPointCanvas();
        returnViewChange("zoom")
    };
    this.getPointToPixel = function(_x, _y, _bool) {
        return pointToPixel(_x, _y, _bool)
    };
    this.getPixelToPoint = function(_x, _y, _bool) {
        return pixelToPoint(_x, _y, _bool)
    };
    this.setPanX = function(_val, flagForLine, flagForPoint) {
        p.xReg = canvas.mx;
        p.xReg = -1 * (pointToPixel(_val - 1, 0, true).x - p.marginLeft);
        calcProve();
        createBaseGrid();
        if (!flagForLine) drawLineCanvas();
        if (!flagForPoint) drawPointCanvas()
    };
    this.setPanY = function(_val) {
        p.yReg = canvas.my;
        p.yReg = -1 * (pointToPixel(0, _val - 1, true).y - p.marginTop);
        createBaseGrid();
        drawLineCanvas();
        drawPointCanvas()
    };
    this.scratchPad = function() {
        return canvasCustomDraw
    };
    function createBaseCanvas() {
        canvas.width = p.width;
        canvas.height = p.height;
        $(canvas).css({
            position: "absolute",
            left: "0px",
            top: "0px",
            "background-color": p.bgColor,
            "box-shadow": p.bgShadow
        }).attr("id", "canvas_" + p.id);
        canvasBarLabel.width = p.width;
        canvasBarLabel.height = p.height;
        $(canvasBarLabel).css({
            position: "absolute",
            left: "0px",
            top: "0px"
        }).attr("id", "canvasBarLabel_" + p.id);
        canvas.mx = p.marginLeft;
        canvas.my = p.marginTop;
        canvas.mw = canvas.width - p.marginLeft - p.marginRight;
        canvas.mh = canvas.height - p.marginTop - p.marginBottom;
        canvasLine.width = canvas.mw + p.canvasLineBuffer * 2;
        canvasLine.height = canvas.mh + p.canvasLineBuffer * 2;
        $(canvasLine).css({
            position: "absolute",
            left: canvas.mx - p.canvasLineBuffer + "px",
            top: canvas.my - p.canvasLineBuffer + "px"
        }).attr("id", "canvasLine_" + p.id);
        canvasAxis.width = canvas.width;
        canvasAxis.height = canvas.height;
        $(canvasAxis).css({
            position: "absolute",
            left: "0px",
            top: "0px"
        }).attr("id", "canvasAxis_" + p.id);
        canvasCustomDraw.width = p.width;
        canvasCustomDraw.height = p.height;
        $(canvasCustomDraw).css({
            position: "absolute",
            left: "0px",
            top: "0px"
        }).attr("id", "canvasCustomDraw_" + p.id);
        canvasProve.width = canvas.width;
        canvasProve.height = canvas.height;
        $(canvasProve).css({
            position: "absolute",
            left: "0px",
            top: "0px"
        }).attr("id", "canvasProve_" + p.id);
        p.probeVisible || p.probeVisibleH ? $(canvasProve).show() : $(canvasProve).hide();
        canvasPoint.width = canvas.mw + p.dotSize * 2;
        canvasPoint.height = canvas.mh + p.dotSize * 2;
        $(canvasPoint).css({
            position: "absolute",
            left: canvas.mx - p.dotSize + "px",
            top: canvas.my - p.dotSize + "px"
        }).attr("id", "canvasPoint_" + p.id);
        if (p.panX || p.panY) {
            if (p.mouseCurType == "move") {
                $(canvasPoint).addClass("commonpan")
            } else if (p.mouseCurType == "grab") {
                $(canvasPoint).addClass("commongrab")
            }
            $(labelXDiv).addClass("commongrab");
            $(labelYDiv).addClass("commongrab")
        }
        canvasPoint.removeEventListener("touchstart", panGraph, false);
        canvasPoint.removeEventListener("touchmove", panGraph, false);
        canvasPoint.removeEventListener("touchend", panGraph, false);
        canvasPoint.addEventListener("touchstart", panGraph, false);
        canvasPoint.addEventListener("touchmove", panGraph, false);
        canvasPoint.addEventListener("touchend", panGraph, false);
        canvasPoint.removeEventListener("mousedown", panGraph, false);
        canvasPoint.addEventListener("mousedown", panGraph, false);
        canvasPoint.removeEventListener("mouseover", graphOver, false);
        canvasPoint.addEventListener("mouseover", graphOver, false);
        canvasPoint.removeEventListener("mouseout", graphOut, false);
        canvasPoint.addEventListener("mouseout", graphOut, false);
        if (BrowserDetect.any()) {
            $(canvasProve).unbind("touchstart", provePanGraph).bind("touchstart", provePanGraph);
            $(canvasProve).unbind("touchmove", provePanGraph).bind("touchmove", provePanGraph);
            $(canvasProve).unbind("touchend", provePanGraph).bind("touchend", provePanGraph)
        } else {
            $(canvasProve).unbind("mousedown", provePanGraph).bind("mousedown", provePanGraph);
            $(canvasProve).unbind("mousemove", proveOverGraph).bind("mousemove", proveOverGraph)
        }
        createBaseGrid()
    }
    function createBaseGrid() {
        probeSnapPoints = new Array;
        probeSnapPointsH = new Array;
        drawingObject = new Array;
        var _maxX = canvas.mx + canvas.mw;
        var _maxY = canvas.my + canvas.mh;
        p.zoomValX = p.zoomValX < p.minZoom ? p.minZoom: p.zoomValX > p.maxZoom ? p.maxZoom: p.zoomValX;
        p.zoomValY = p.zoomValY < p.minZoom ? p.minZoom: p.zoomValY > p.maxZoom ? p.maxZoom: p.zoomValY;
        if (p.drawQuads == 1) {
			if (p.oxReg > canvas.mx) {
                p.oxReg = "left"
            }
            if (p.oyReg < canvas.my + canvas.mh) {
                p.oyReg = "bottom"
            }
        }
		switch (p.oxReg) {
        case "left":
            p.xReg = canvas.mx;
            break;
        case "right":
            p.xReg = canvas.mx + canvas.mw;
            break;
        case "center":
            p.xReg = canvas.mx + canvas.mw / 2;
            break
        }
        switch (p.oyReg) {
        case "top":
            p.yReg = canvas.my;
            break;
        case "bottom":
            p.yReg = canvas.my + canvas.mh;
            break;
        case "center":
            p.yReg = canvas.my + canvas.mh / 2;
            break
        }
        if (p.xRegOffset!=undefined && typeof(p.xRegOffset)=="number" && p.xRegOffset!=0 && p.oxReg=="center" ){
        	if ( Math.abs( p.xRegOffset) < 2 ){
        		p.xRegOffset = 2;
        	}
           	p.xReg  += canvas.mw / p.xRegOffset;
        }
        if (p.yRegOffset!=undefined && typeof(p.yRegOffset)=="number" && p.yRegOffset!=0 && p.oyReg=="center"){
        	if ( Math.abs( p.yRegOffset) < 2 ){
        		p.yRegOffset = 2;
        	}
           	p.yReg  += canvas.mh / p.yRegOffset;
        }

		if (p.minorIntervalX && p.minorIntervalY) {
            probeSnapPoints.push(0);
            probeSnapPointsH.push(0);
            var zeroPos = pointToPixel(0, 0);
	          if ( (p.gridXVisible || p.drawScaleX) && p.axisXVisible) {
                var xNum = p.minorIntervalX;
                var xPix = pointToPixel(xNum, 0);
                while (xPix.x < _maxX) {
                	//<dk>
                	if (p.gridXVisible){
	                    drawingObject.push({
	                        points: [{
	                            x: xPix.x,
	                            y: canvas.my
	                        },
	                        {
	                            x: xPix.x,
	                            y: _maxY
	                        }],
	                        strokeStyle: p.gridSmallColor,
	                        lineWidth: p.gridSmallWidth
	                    });
                    }
                	if (p.drawScaleX){
	                	tempObj = {
	                    	points: [{
			                	x: xPix.x,
			               		y: p.yReg + (p.leftGridMinor ? p.dashedAxisLen*2/3  : 0)
	                    	},
	                   		{
			                	x: xPix.x,
			                	y: p.yReg - (p.rightGridMinor ?  p.dashedAxisLen*2/3  : 0)
	                    	}],
	                    	strokeStyle: p.gridBigColor,
	                    	lineWidth: p.gridSmallWidth
	                	};
                		drawingObject.push(tempObj);
                	}

                	probeSnapPoints.push(Number(xNum.toFixed(p.decimal)));
                    xNum += p.minorIntervalX;
                    xPix = pointToPixel(xNum, 0)
                }
                var xNum = -1 * p.minorIntervalX;
                xPix = pointToPixel(xNum, 0);
                while (xPix.x > canvas.mx) {
                	if (p.gridYVisible){
	                    drawingObject.push({
	                        points: [{
	                            x: xPix.x,
	                            y: canvas.my
	                        },
	                        {
	                            x: xPix.x,
	                            y: _maxY
	                        }],
	                        strokeStyle: p.gridSmallColor,
	                        lineWidth: p.gridSmallWidth
	                    });
                    }
                	if (p.drawScaleX){
	                	tempObj = {
	                    	points: [{
			                	x: xPix.x,
			               		y: p.yReg + (p.leftGridMinor ? p.dashedAxisLen*2/3  : 0)
	                    	},
	                   		{
			                	x: xPix.x,
			                	y: p.yReg - (p.rightGridMinor ?  p.dashedAxisLen*2/3  : 0)
	                    	}],
	                    	strokeStyle: p.gridBigColor,
	                    	lineWidth: p.gridSmallWidth
	                	};
                		drawingObject.push(tempObj);
                	}
                    probeSnapPoints.push(Number(xNum.toFixed(p.decimal)));
                    xNum -= p.minorIntervalX;
                    xPix = pointToPixel(xNum, 0)
                }
            }
		    if ( (p.gridYVisible || p.drawScaleY) && p.axisYVisible ) {
                var yNum = p.minorIntervalY;
                var yPix = pointToPixel(0, yNum);
                while (yPix.y > canvas.my) {
                	if (p.gridXVisible) {
	                    drawingObject.push({
	                        points: [{
			                    x: canvas.mx,
	                            y: yPix.y
	                        },
	                        {
								x: _maxX,
	                            y: yPix.y
	                        }],
	                        strokeStyle: p.gridSmallColor,
	                        lineWidth: p.gridSmallWidth
	                    });
                	}
                	if (p.drawScaleX){
	                	tempObj = {
	                    	points: [{
			                	x: p.xReg - (p.leftGridMinor ? p.dashedAxisLen*2/3  : 0),
			               		y: yPix.y
	                    	},
	                   		{
			                	x: p.xReg + (p.rightGridMinor ?  p.dashedAxisLen*2/3  : 0),
			                	y: yPix.y
	                    	}],
	                    	strokeStyle: p.gridBigColor,
	                    	lineWidth: p.gridSmallWidth,
	                	};
                		drawingObject.push(tempObj);
                	}
                    probeSnapPointsH.push(Number(yNum.toFixed(p.decimal)));
                    yNum += p.minorIntervalY;
                    yPix = pointToPixel(0, yNum)
                }
                yNum = -1 * p.minorIntervalY;
                yPix = pointToPixel(0, yNum);
                while (yPix.y < _maxY) {
                	if (p.gridXVisible) {
	                    drawingObject.push({
	                        points: [{
	                            x: canvas.mx,
	                            y: yPix.y
	                        },
	                        {
	                            x: _maxX,
	                            y: yPix.y
	                        }],
	                        strokeStyle: p.gridSmallColor,
	                        lineWidth: p.gridSmallWidth
	                    });
	                }
                	if (p.drawScaleX){
	                	tempObj = {
	                    	points: [{
			                	x: p.xReg - (p.leftGridMinor ? p.dashedAxisLen*2/3  : 0),
			               		y: yPix.y
	                    	},
	                   		{
			                	x: p.xReg + (p.rightGridMinor ?  p.dashedAxisLen*2/3  : 0),
			                	y: yPix.y
	                    	}],
	                    	strokeStyle: p.gridBigColor,
	                    	lineWidth: p.gridSmallWidth,
	                	};
                		drawingObject.push(tempObj);
                	}
                    probeSnapPointsH.push(Number(yNum.toFixed(p.decimal)));
                    yNum -= p.minorIntervalY;
                    yPix = pointToPixel(0, yNum)
                }
            }
            baseGridIndex = drawingObject.length
        }

        var axisPointArr = [];
        var zeroPos = pointToPixel(0, 0);
        if (p.axisYVisible || p.gridXVisible) {
            var xNum = 0,
            _arrowWidth = globalResizeCalc(10+(p.axisWidth/screenScale-2)*2);
            var xPix = pointToPixel(xNum, 0);
            while (xPix.x < _maxX) {
                var tempObj = {
                    points: [{
                        x: xPix.x,
                        y: xNum == 0 && p.arrowYU ? canvas.my + _arrowWidth: canvas.my
                    },
                    {
                        x: xPix.x,
                        y: xNum == 0 && p.arrowYD && p.drawQuads != 1 ? _maxY - _arrowWidth: _maxY
                    }],
                    strokeStyle: xNum == 0 && p.drawQuads != 1 ? p.gridXYColor: p.gridBigColor,
                    lineWidth: xNum == 0 && p.drawQuads != 1 ? p.axisWidth: p.gridBigWidth,
                    arrows: xNum == 0 ? "y": ""
                };
				if (xNum==0 && p.drawQuads != 1){
					if (!p.axisYVisible){
						tempObj.points[0].y = canvas.my;
						tempObj.points[1].y = _maxY;
						tempObj.lineWidth = p.gridBigWidth;
					}
					axisPointArr.push(tempObj);
				}
				if (xNum==0 && p.drawQuads == 1){
					drawingObject.push(tempObj);
				}
				if (xNum != 0 &&  p.gridXVisible && p.axisXVisible){
					drawingObject.push(tempObj);
				}
                if (p.drawScaleX && p.axisXVisible){
	                tempObj = {
	                    points: [{
			                x: xPix.x,
			                y: p.yReg + (p.leftGridMinor ? p.dashedAxisLen  : 0)
	                    },
	                    {
			                x: xPix.x,
			                y: p.yReg - (p.rightGridMinor ?  p.dashedAxisLen  : 0)
	                    }],
	                    strokeStyle: p.gridBigColor,
	                    lineWidth: p.gridBigWidth,
	                };
                	drawingObject.push(tempObj);
                }
                xNum += p.majorIntervalX;
                xPix = pointToPixel(xNum, 0)
            }
            xNum = -1 * p.majorIntervalX;
            xPix = pointToPixel(xNum, 0);
            while (xPix.x > canvas.mx) {
                var tempObj = {
                    points: [{
                        x: xPix.x,
                        y: canvas.my
                    },
                    {
                        x: xPix.x,
                        y: _maxY
                    }],
                    strokeStyle: xNum == 0 && p.drawQuads != 1 ? p.gridXYColor: p.gridBigColor,
                    lineWidth: xNum == 0 && p.drawQuads != 1 ? p.axisWidth: p.gridBigWidth,
                    arrows: ""
                };
				if (xNum != 0 &&  p.gridXVisible && p.axisXVisible){
					drawingObject.push(tempObj);
				}
                if (p.drawScaleX && p.axisXVisible){
	                tempObj = {
	                    points: [{
			                x: xPix.x,
			                y: p.yReg + (p.leftGridMinor ? p.dashedAxisLen  : 0)
	                    },
	                    {
			                x: xPix.x,
			                y: p.yReg - (p.rightGridMinor ?  p.dashedAxisLen  : 0)
	                    }],
	                    strokeStyle: p.gridBigColor,
	                    lineWidth: p.gridBigWidth,
	                };
                	drawingObject.push(tempObj);
                }
                xNum -= p.majorIntervalX;
                xPix = pointToPixel(xNum, 0)
            }
        }

        if (p.axisXVisible || p.gridYVisible) {
        	var yNum = 0,
			_arrowWidth = globalResizeCalc(10+(p.axisWidth/screenScale-2)*2);
            var yPix = pointToPixel(0, yNum);
            while (yPix.y > canvas.my) {
                var tempObj = {
                    points: [{
		                x: yNum == 0 && p.arrowXL && p.drawQuads != 1 ? canvas.mx + _arrowWidth: canvas.mx,
                        y: yPix.y
                    },
                    {
       					x: yNum == 0 && p.arrowXR ? _maxX - _arrowWidth: _maxX,
                        y: yPix.y
                    }],
                    strokeStyle: yNum == 0 && p.drawQuads != 1 ? p.gridXYColor: p.gridBigColor,
                    lineWidth: yNum == 0 && p.drawQuads != 1 ? p.axisWidth: p.gridBigWidth,
                    arrows: yNum == 0 ? "x": ""
                };
				if (yNum==0 && p.drawQuads != 1 ){
					if (!p.axisXVisible){
						tempObj.points[0].x = canvas.mx;
						tempObj.points[1].x = _maxX;
						tempObj.lineWidth = p.gridBigWidth;
					}
					axisPointArr.push(tempObj) ;
				}
				if (yNum==0 && p.drawQuads == 1){
					drawingObject.push(tempObj);
				}
                if (yNum != 0  && p.gridYVisible && p.axisYVisible){
                	drawingObject.push(tempObj);
                }
                if (p.drawScaleY && p.axisYVisible){
	                	tempObj = {
	                    points: [{
			                x: p.xReg - (p.leftGridMinor ? p.dashedAxisLen  : 0),
			                y: yPix.y
	                    },
	                    {
			                x: p.xReg + (p.rightGridMinor ?  p.dashedAxisLen  : 0),
			                y: yPix.y
	                    }],
	                    strokeStyle: p.gridBigColor,
	                    lineWidth: p.gridBigWidth,
	                };
                	drawingObject.push(tempObj);
                }
                yNum += p.majorIntervalY;
                yPix = pointToPixel(0, yNum)
            }
            yNum = -1 * p.majorIntervalY;
            yPix = pointToPixel(0, yNum);
            while (yPix.y < _maxY) {
				var tempObj = {
                    points: [{
		                x: canvas.mx,
                        y: yPix.y
                    },
                    {
                        x: _maxX,
                        y: yPix.y
                    }],
                    strokeStyle: yNum == 0 && p.drawQuads != 1 ? p.gridXYColor: p.gridBigColor,
                    lineWidth: yNum == 0 && p.drawQuads != 1 ? p.axisWidth: p.gridBigWidth,
                    arrows: ""
                };
                if (yNum != 0  && p.gridYVisible && p.axisYVisible){
                	drawingObject.push(tempObj);
                }
                if (p.drawScaleY && p.axisYVisible ){
	                	tempObj = {
	                    points: [{
			                x: p.xReg - (p.leftGridMinor ? p.dashedAxisLen  : 0),
			                y: yPix.y
	                    },
	                    {
			                x: p.xReg + (p.rightGridMinor ?  p.dashedAxisLen  : 0),
			                y: yPix.y
	                    }],
	                    strokeStyle: p.gridBigColor,
	                    lineWidth: p.gridBigWidth,
	                };
                	drawingObject.push(tempObj);
                }

                yNum -= p.majorIntervalY;
                yPix = pointToPixel(0, yNum)
            }
        }
        baseGridIndex = drawingObject.length;
        for (var i in axisPointArr) {
            drawingObject.push(axisPointArr[i])
        }

        var _newMaxY = p.drawQuads == 0 ? parseInt(p.labelStyleXYSize) + 10 : 0;
        numberX = new Array;
        numberY = new Array;
		if (p.axisXVisible && p.intervalXVisible) {
            xNum = 0;
            xPix = pointToPixel(xNum, 0);
            while (xPix.x < canvas.mx + canvas.mw) {
                if (xPix.x >= canvas.mx && (p.showXAxis == true || p.lineType == true)) {
             	    var _x,_y;
					if (p.scaleLoc==1){
             	    	_y = (zeroPos.y > _maxY - _newMaxY && p.stopLabelX ? _maxY - _newMaxY: zeroPos.y < canvas.my && p.stopLabelX ? canvas.my: zeroPos.y) - parseInt(p.labelStyleXYSize) + globalResizeCalc(3);
						_x =  (xNum==0 && p.axisYVisible)? xPix.x + dkScreenResize(14) : xPix.x
					}else{
             	    	_y = (zeroPos.y > _maxY - _newMaxY && p.stopLabelX ? _maxY - _newMaxY: zeroPos.y < canvas.my && p.stopLabelX ? canvas.my: zeroPos.y) + parseInt(p.labelStyleXYSize) + globalResizeCalc(3)
						_x =  xPix.x
					}
					if (p.scaleLoc==1 && xNum==0 && p.axisYVisible){
					}else
					numberX.push({
                        label: p.lineType || p.showXAxis ? p.drawQuads == 0 && xNum == 0 && !p.centerLabelYVisible ? "": xNum: "",
        				x: _x,
        				y: _y
                    })
                }
                xNum += p.labelIntervalX;
                xNum = Number(xNum.toFixed(p.decimal));
                xPix = pointToPixel(xNum, 0)
            }

            var _mxxx = _thisObj.getGraphArea().max.x;
            xNum = 0;
            xPix = pointToPixel(xNum, 0);
            while (xPix.x > canvas.mx) {
                if (xPix.x > canvas.mx && xNum < _mxxx) {
					if (p.scaleLoc==1){
                        _y = (zeroPos.y > _maxY - _newMaxY && p.stopLabelX ? _maxY - _newMaxY: zeroPos.y < canvas.my && p.stopLabelX ? canvas.my: zeroPos.y) - parseInt(p.labelStyleXYSize) + globalResizeCalc(3);
					}else{
                        _y = (zeroPos.y > _maxY - _newMaxY && p.stopLabelX ? _maxY - _newMaxY: zeroPos.y < canvas.my && p.stopLabelX ? canvas.my: zeroPos.y) + parseInt(p.labelStyleXYSize) + globalResizeCalc(3)
					}
					if (p.scaleLoc==1 && xNum==0){
					}else
                    numberX.push({
                        label: p.lineType || p.showXAxis ? p.drawQuads == 0 && xNum == 0 && !p.centerLabelYVisible ? "": xNum: "",
                        x: xPix.x,
                        y: _y
                    })
                }
                xNum -= p.labelIntervalX;
                xNum = Number(xNum.toFixed(p.decimal));
                xPix = pointToPixel(xNum, 0)
            }
        }

		if (p.axisYVisible && p.intervalYVisible) {
            numberY = new Array;
            yNum = 0;
            yPix = pointToPixel(0, yNum);
            var _newMaxX = p.drawQuads == 0 ? parseInt(p.labelStyleXYSize) + 15 : 0;
            while (yPix.y > canvas.my) {
                if (yPix.y <= canvas.my + canvas.mh) {
                	var _x,_y;
					if (p.scaleLoc==1){
                        _x = ( zeroPos.x > _maxX && p.stopLabelY ? _maxX: zeroPos.x < canvas.mx + _newMaxX && p.stopLabelY ? canvas.mx + _newMaxX: zeroPos.x) + globalResizeCalc(10);
						_y = (yNum==0 && p.axisXVisible) ? yPix.y + parseInt(p.labelStyleXYSize) / 2 - globalResizeCalc(22) :yPix.y + parseInt(p.labelStyleXYSize) / 2 - globalResizeCalc(2)
					}else{
                        _x = ( zeroPos.x > _maxX && p.stopLabelY ? _maxX: zeroPos.x < canvas.mx + _newMaxX && p.stopLabelY ? canvas.mx + _newMaxX: zeroPos.x) - globalResizeCalc(6);
						_y = yPix.y + parseInt(p.labelStyleXYSize) / 2 - globalResizeCalc(2)
					}
                    numberY.push({
                        label: p.drawQuads == 0 && yNum == 0 && !p.centerLabelXVisible ? "": yNum,
                        x: _x,
                        y: _y
                    })
                }
                yNum += p.labelIntervalY;
                yNum = Number(yNum.toFixed(p.decimal));
                yPix = pointToPixel(0, yNum)
            }
            var _myyy = _thisObj.getGraphArea().min.y;
            yNum = 0;
            yPix = pointToPixel(0, yNum);
            while (yPix.y < _maxY) {
                if (yPix.y < canvas.my + canvas.mh && yNum < _myyy) {
					if (p.scaleLoc==1){
                        _x = ( zeroPos.x > _maxX && p.stopLabelY ? _maxX: zeroPos.x < canvas.mx + _newMaxX && p.stopLabelY ? canvas.mx + _newMaxX: zeroPos.x) + globalResizeCalc(10);
					}else{
                        _x = ( zeroPos.x > _maxX && p.stopLabelY ? _maxX: zeroPos.x < canvas.mx + _newMaxX && p.stopLabelY ? canvas.mx + _newMaxX: zeroPos.x) - globalResizeCalc(6);
					}
					if (p.scaleLoc==1 && yNum==0){
					}else
					numberY.push({
                        label: p.drawQuads == 0 && yNum == 0 && !p.centerLabelXVisible ? "": yNum,
                        x: _x,
                        y: yPix.y + parseInt(p.labelStyleXYSize) / 2 - globalResizeCalc(2)
                    })
                }
                yNum -= p.labelIntervalY;
                yNum = Number(yNum.toFixed(p.decimal));
                yPix = pointToPixel(0, yNum)
            }
        }
        drawCanvas()
    }
    function drawCanvas(_cn, _ct) {
        var _cnv = canvas;
        var _ctx = ctx;
        var _mx = canvas.mx;
        var _my = canvas.my;
        var _mw = canvas.mw;
        var _mh = canvas.mh;
        var _pToN = new Object;
        if (_cn && _ct) {
            _cnv = _cn;
            _ctx = _ct
        }
        _cnv.width = _cnv.width;
        _ctx.beginPath();
        _ctx.save();
        _ctx.rect(canvas.mx, canvas.my, canvas.mw, canvas.mh);
        _ctx.fillStyle = p.gridBgColor;
        if (p.gridBgShadow && p.gridBgShadow != "none") {
            _ctx.shadowOffsetX = parseInt(p.gridBgShadow.split(" ")[0]);
            _ctx.shadowOffsetY = parseInt(p.gridBgShadow.split(" ")[1]);
            _ctx.shadowBlur = parseInt(p.gridBgShadow.split(" ")[2]);
            _ctx.shadowColor = p.gridBgShadow.split(" ")[3]
        }
        if (p.borderStyle != "none" && p.borderStyle != "") {
            _ctx.StrokeStyle = p.borderStyle;
            _ctx.stroke()
        }
        _ctx.fill();
        _ctx.restore();
        _ctx.closePath();
       for (var i = 0; i < drawingObject.length; i++) {
            _ctx.beginPath();
            drawingObject[i].strokeStyle ? _ctx.strokeStyle = drawingObject[i].strokeStyle: null;
            drawingObject[i].lineWidth ? _ctx.lineWidth = drawingObject[i].lineWidth: null;
            var _arr = drawingObject[i].points;
            var _drawStart = 0;
            for (var j = 0; j < _arr.length; j++) {
                if (_arr[j].x >= canvas.mx && _arr[j].x <= canvas.mx + canvas.mw && _arr[j].y >= canvas.my && _arr[j].y <= canvas.my + canvas.mh) {
                    _drawStart == 0 ? _ctx.moveTo(parseInt(_arr[j].x) + .1, parseInt(_arr[j].y) + .1) : _ctx.lineTo(parseInt(_arr[j].x) + .1, parseInt(_arr[j].y) + .1);
                    _drawStart++
                }
            }
            if (drawingObject[i].text && _drawStart > 0) {
                var _tObj = drawingObject[i].text;
                _ctx.fillStyle = p.labelStyleXYColor;
                _ctx.font = p.labelStyleXYStyle + " " + p.labelStyleXYSize + " " + p.labelStyleXYFamily;
                _ctx.textAlign = _tObj.textAlign ? _tObj.textAlign: "left";
                _ctx.fillText(_tObj.txt, parseInt(_tObj.x) + .5, parseInt(_tObj.y) + .5)
            }
            _ctx.stroke();
            if (drawingObject[i].arrows == "x") {
                _pToN.y = drawingObject[i].points[0].y
            } else if (drawingObject[i].arrows == "y") {
                _pToN.x = drawingObject[i].points[0].x
            }
        }
        for (var k = 0; k < numberX.length; k++) {
            var _tObj = numberX[k];
            _ctx.fillStyle = p.labelStyleXYColor;
            _ctx.font = p.labelStyleXYStyle + " " + p.labelStyleXYSize + " " + p.labelStyleXYFamily;
            _ctx.textAlign = "center";
            if (_tObj.label.toString().length > 0) {
                var str = Math.abs(_tObj.label);
                str = p.toFixedX ? str: Number(str).toFixed(p.decimal);
                _ctx.fillText(str + p.xLabelSuffix, parseInt(_tObj.x) + .5, parseInt(_tObj.y) + .5);
                _ctx.fillStyle = p.labelStyleXYColor;
                _ctx.font = p.labelStyleXYStyle + " " + p.labelStyleXYSize + " " + p.labelStyleXYFamily;
                _ctx.textAlign = "right";
                _ctx.fillText(_tObj.label < 0 ? "–": "", parseInt(_tObj.x - _ctx.measureText(str + p.xLabelSuffix).width / 2 - globalResizeCalc(2)) + .5, parseInt(_tObj.y) + .5)
            }
        }
        for (var k = 0; k < numberY.length; k++) {
            var _tObj = numberY[k];
            _ctx.fillStyle = p.labelStyleXYColor;
            _ctx.font = p.labelStyleXYStyle + " " + p.labelStyleXYSize + " " + p.labelStyleXYFamily;
			if (p.scaleLoc==1){
            	_ctx.textAlign = "left";
			}else{
	            _ctx.textAlign = "right";
			}
            if (_tObj.label.toString().length > 0) {
                var str = Math.abs(_tObj.label);
                str = p.toFixedY ? str: Number(str).toFixed(p.decimal);
                str = _tObj.label < 0 ? "–" + str: str;
                _ctx.fillText(str + p.yLabelSuffix, parseInt(_tObj.x) + .5, parseInt(_tObj.y) + .5)
            }
        }
        if (p.labelX && p.axisXVisible) {
            $(labelXDiv).html(p.labelX)
        }
        if (p.labelY && p.axisYVisible) {
            $(labelYDiv).html(p.labelY)
        }
        _ctx.beginPath();
        _ctx.fillStyle = p.gridXYColor;
        if (p.axisXVisible && p.drawQuads != 1) {
		    var _arrowWidth = globalResizeCalc(10+(p.axisWidth/screenScale-2)*2);
            if (_pToN.y < canvas.my) {
                _pToN.y = canvas.my
            } else if (_pToN.y > canvas.my + canvas.mh) {
                _pToN.y = canvas.my + canvas.mh
            } else {
                if (p.arrowXR) {
                    _ctx.moveTo(parseInt(canvas.mx + canvas.mw) + .5, parseInt(_pToN.y) + .5);
                    _ctx.lineTo(parseInt(canvas.mx + canvas.mw - _arrowWidth) + .5, parseInt(_pToN.y - _arrowWidth / 2) + .5);
                    _ctx.lineTo(parseInt(canvas.mx + canvas.mw - _arrowWidth) + .5, parseInt(_pToN.y + _arrowWidth / 2) + .5);
                    _ctx.lineTo(parseInt(canvas.mx + canvas.mw) + .5, parseInt(_pToN.y) + .5)
                }
                if (p.arrowXL) {
                    _ctx.moveTo(parseInt(canvas.mx) + .5, parseInt(_pToN.y) + .5);
                    _ctx.lineTo(parseInt(canvas.mx + _arrowWidth) + .5, parseInt(_pToN.y - _arrowWidth / 2) + .5);
                    _ctx.lineTo(parseInt(canvas.mx + _arrowWidth) + .5, parseInt(_pToN.y + _arrowWidth / 2) + .5);
                    _ctx.lineTo(parseInt(canvas.mx) + .5, parseInt(_pToN.y) + .5)
                }
            }
        }
        if (p.axisYVisible && p.drawQuads != 1) {
		    var _arrowWidth = globalResizeCalc(10+(p.axisWidth/screenScale-2)*2);
            if (_pToN.x < canvas.mx) {
                _pToN.x = canvas.mx
            } else if (_pToN.x > canvas.mx + canvas.mw) {
                _pToN.x = canvas.mx + canvas.mw
            } else {
                if (p.arrowYU) {
                    _ctx.moveTo(parseInt(_pToN.x) + .5, parseInt(canvas.my) + .5);
                    _ctx.lineTo(parseInt(_pToN.x - _arrowWidth / 2) + .5, parseInt(canvas.my + _arrowWidth) + .5);
                    _ctx.lineTo(parseInt(_pToN.x + _arrowWidth / 2) + .5, parseInt(canvas.my + _arrowWidth) + .5);
                    _ctx.lineTo(parseInt(_pToN.x) + .5, parseInt(canvas.my) + .5)
                }
                if (p.arrowYD) {
                    _ctx.moveTo(parseInt(_pToN.x) + .5, parseInt(canvas.my + canvas.mh) + .5);
                    _ctx.lineTo(parseInt(_pToN.x - _arrowWidth / 2) + .5, parseInt(canvas.my + canvas.mh - _arrowWidth) + .5);
                    _ctx.lineTo(parseInt(_pToN.x + _arrowWidth / 2) + .5, parseInt(canvas.my + canvas.mh - _arrowWidth) + .5);
                    _ctx.lineTo(parseInt(_pToN.x) + .5, parseInt(canvas.my + canvas.mh) + .5)
                }
            }
        }
        _ctx.fill();
        if (p.drawQuads == 1) {
		    var _arrowWidth = globalResizeCalc(10+(p.axisWidth-2)*2);
            canvasAxis.width = canvasAxis.width;
			if (p.axisYVisible) {
                ctxAxis.beginPath();
                ctxAxis.strokeStyle = p.gridXYColor;
                ctxAxis.fillStyle = p.gridXYColor;
                ctxAxis.lineWidth = p.axisWidth;
                ctxAxis.moveTo(parseInt(canvas.mx), p.arrowY ? parseInt(canvas.my + _arrowWidth) : parseInt(canvas.my));
                ctxAxis.lineTo(parseInt(canvas.mx), p.arrowY ? parseInt(canvas.my + canvas.mh + globalResizeCalc(2)) : parseInt(canvas.my + canvas.mh + globalResizeCalc(2)));
                ctxAxis.stroke();
                if (p.arrowYU) {
                    ctxAxis.beginPath();
                    ctxAxis.strokeStyle = p.gridXYColor;
                    ctxAxis.fillStyle = p.gridXYColor;
                    ctxAxis.lineWidth = p.axisWidth;
                    ctxAxis.moveTo(parseInt(canvas.mx) + .5, parseInt(canvas.my) + .5);
                    ctxAxis.lineTo(parseInt(canvas.mx - _arrowWidth / 2) + .5, parseInt(canvas.my + _arrowWidth) + .5);
                    ctxAxis.lineTo(parseInt(canvas.mx + _arrowWidth / 2) + .5, parseInt(canvas.my + _arrowWidth) + .5);
                    ctxAxis.lineTo(parseInt(canvas.mx) + .5, parseInt(canvas.my) + .5);
                    ctxAxis.fill()
                }
            }
            if (p.axisXVisible) {
                ctxAxis.beginPath();
                ctxAxis.strokeStyle = p.gridXYColor;
                ctxAxis.fillStyle = p.gridXYColor;
                ctxAxis.lineWidth = p.axisWidth;
                ctxAxis.moveTo(parseInt(canvas.mx), parseInt(canvas.my + canvas.mh));
                ctxAxis.lineTo(p.arrowXR ? parseInt(canvas.mx + canvas.mw - _arrowWidth) : parseInt(canvas.mx + canvas.mw), parseInt(canvas.my + canvas.mh));
                ctxAxis.stroke();
                if (p.arrowXR) {
                    ctxAxis.beginPath();
                    ctxAxis.strokeStyle = p.gridXYColor;
                    ctxAxis.fillStyle = p.gridXYColor;
                    ctxAxis.lineWidth = p.axisWidth;
                    ctxAxis.moveTo(parseInt(canvas.mx + canvas.mw) + .5, parseInt(canvas.my + canvas.mh) + .5);
                    ctxAxis.lineTo(parseInt(canvas.mx + canvas.mw - _arrowWidth) + .5, parseInt(canvas.my + canvas.mh - _arrowWidth / 2) + .5);
                    ctxAxis.lineTo(parseInt(canvas.mx + canvas.mw - _arrowWidth) + .5, parseInt(canvas.my + canvas.mh + _arrowWidth / 2) + .5);
                    ctxAxis.lineTo(parseInt(canvas.mx + canvas.mw) + .5, parseInt(canvas.my + canvas.mh) + .5);
                    ctxAxis.fill()
                }
            }
            if (_pToN.x < canvas.mx) {
                _pToN.x = canvas.mx
            } else if (_pToN.x + _ctx.measureText(p.labelY).width + 30 > canvas.mx + canvas.mw) {
                _pToN.x = canvas.mx + canvas.mw - _ctx.measureText(p.labelY).width - globalResizeCalc(30)
            }
            if (_pToN.y > canvas.my + canvas.mh) {
                _pToN.y = canvas.my + canvas.mh
            }
        }
        if (_pToN.y < canvas.my + 30) {
            _pToN.y = canvas.my + 30
        }
        if (_pToN.x > canvas.mx + canvas.mw - 35) {
            _pToN.x = canvas.mx + canvas.mw - 35
        }
        if (p.labelX) {
            $(labelXDiv).css({
                bottom: -(_pToN.y - globalResizeCalc(5)) + "px",
                right: -(canvas.mx + canvas.mw)  + "px"
            })
        }

        if (p.labelY) {
            $(labelYDiv).css({
                left: _pToN.x + globalResizeCalc(15) + "px",
                top: canvas.my + "px"
            })
        }
    }
    function drawLineCanvas() {
        canvasLine.width = canvasLine.width;
        if (!p.lineType) {
            canvasBarLabel.width = canvasBarLabel.width;
            var _ctx = canvasBarLabel.getContext("2d");
            var _cnt = 0
        }
        gapCount = 0;
        for (var i = 0; i < userLines.length; i++) {
            if (userLines[i]) {
                var _pnt = userLines[i].point;
                ctxLine.beginPath();
                if (p.lineType) {
                    ctxLine.lineWidth = userLines[i].lineWidth;
                    if (!userLines[i].removeLineCap) ctxLine.lineCap = "round";
                    if (!ctxLine.setLineDash && typeof userLines[i].dashed != "undefined" && userLines[i].dashed[0]) {
                        var _pToN_1 = pointToPixel(_pnt[0].x, _pnt[0].y, true);
                        var _pToN_2 = pointToPixel(_pnt[_pnt.length - 1].x, _pnt[_pnt.length - 1].y, true);
                        typeof userLines[i].dashed != "undefined" ? ctxLine.dashedLine(_pToN_1.x + p.canvasLineBuffer, _pToN_1.y + p.canvasLineBuffer, _pToN_2.x + p.canvasLineBuffer, _pToN_2.y + p.canvasLineBuffer, globalResizeCalc(10)) : null
                    } else {
                        if (ctxLine.setLineDash) ctxLine.setLineDash([]);
                        typeof userLines[i].dashed != "undefined" && userLines[i].dashed[0] > 0 ? ctxLine.setLineDash(userLines[i].dashed) : null;
                        for (var j = 0; j < _pnt.length; j++) {
                            var _pToN_2 = pointToPixel(_pnt[j].x, _pnt[j].y, true);
                            if (j > 0) {
                                var _pToN_1 = pointToPixel(_pnt[j - 1].x, _pnt[j - 1].y, true);
                                if (userLines[i].allowParse) {
                                    ctxLine.moveTo(tf(_pToN_1.x + p.canvasLineBuffer), tf(_pToN_1.y + p.canvasLineBuffer));
                                    ctxLine.lineTo(tf(_pToN_2.x + p.canvasLineBuffer), tf(_pToN_2.y + p.canvasLineBuffer))
                                } else {
                                    ctxLine.moveTo(_pToN_1.x + p.canvasLineBuffer, _pToN_1.y + p.canvasLineBuffer);
                                    ctxLine.lineTo(_pToN_2.x + p.canvasLineBuffer, _pToN_2.y + p.canvasLineBuffer)
                                }
                            }
                        }
                    }
                    ctxLine.strokeStyle = userLines[i].color;
                    ctxLine.stroke();
                    if (userLines[i].showArrow) {
                        var _len = _pnt.length - 1;
                        var _prevPoint = pointToPixel(_pnt[_len - 1].x, _pnt[_len - 1].y, true);
                        var _endPoint = pointToPixel(_pnt[_len].x, _pnt[_len].y, true);
                        _prevPoint.x += p.canvasLineBuffer;
                        _prevPoint.y += p.canvasLineBuffer;
                        _endPoint.x += p.canvasLineBuffer;
                        _endPoint.y += p.canvasLineBuffer;
                        plotArrow(_prevPoint, _endPoint, ctxLine, userLines[i].lineWidth, userLines[i].color)
	                    //<dk>增加在箭头旁写title
	              		if (userLines[i].title!=undefined&&userLines[i].title!=""){
	              			var _tx = (_endPoint.x>_prevPoint.x)? _endPoint.x+dkScreenResize(4):_endPoint.x-dkScreenResize(13)
	              			var _ty = (_endPoint.y>_prevPoint.y)?_endPoint.y+dkScreenResize(2): _endPoint.y-dkScreenResize(18)
	   	   					ctxLine.beginPath();
							ctxLine.font = "bold "+String(dkScreenResize(16))+"px consolas";
	   	   					ctxLine.textAlign = 'center';
	   						ctxLine.textBaseline = 'top';
	                    	ctxLine.fillText(userLines[i].title,_tx,_ty);
	              		}
                    }
                } else {
                    if (p.barProp) {
                        if (isNaN(p.barProp.gap)) {
                            var _barPropGap = p.barProp.gap[gapCount];
                            gapCount++;
                            if (gapCount == p.barProp.gap.length) {
                                gapCount = 0
                            }
                        } else {
                            var _barPropGap = p.barProp.gap
                        }
                        var zeroPos = pointToPixel(0, 0);
                        var _maxY = canvas.my + canvas.mh;
                        var _pToN_1 = pointToPixel(p.barProp.start + _cnt, 0, true);
                        var _pToN_2 = pointToPixel(p.barProp.start + _cnt + p.barProp.end, _pnt[0].y, true);
                        var lineWidth = 0;
                        if (userLines[i].borderWidth && userLines[i].borderColor) {
                            lineWidth = userLines[i].borderWidth
                        }
                        _pToN_1.x = tf(_pToN_1.x);
                        _pToN_1.y = tf(_pToN_1.y);
                        _pToN_2.x = tf(_pToN_2.x);
                        _pToN_2.y = tf(_pToN_2.y);
                        ctxLine.fillStyle = userLines[i].color;
                        ctxLine.moveTo(_pToN_1.x, _pToN_1.y);
                        ctxLine.lineTo(_pToN_1.x, _pToN_2.y);
                        ctxLine.lineTo(_pToN_2.x, _pToN_2.y);
                        ctxLine.lineTo(_pToN_2.x, _pToN_1.y);
                        ctxLine.lineTo(_pToN_1.x, _pToN_1.y);
                        ctxLine.fill();
                        if (userLines[i].borderWidth && userLines[i].borderColor) {
                            ctxLine.lineWidth = userLines[i].borderWidth;
                            ctxLine.strokeStyle = userLines[i].borderColor;
                            ctxLine.stroke()
                        }
                        _ctx.fillStyle = p.labelStyleXYColor;
                        p.labelInBold ? _ctx.font = "bold " + p.labelStyleXYSize + " " + p.labelStyleXYFamily: _ctx.font = p.labelStyleXYSize + " " + p.labelStyleXYFamily;
                        _ctx.textAlign = "center";
                        _ctx.fillText(userLines[i].label, parseInt(canvas.mx + _pToN_1.x + (_pToN_2.x - _pToN_1.x) / 2) + .5, parseInt(canvas.my + canvasLine.height + parseInt(p.labelStyleXYSize) + p.barLabelTop) + .5);
                        if (p.showBarNumbers) {
                            var _flagForFill = true;
                            if (!p.showBarZeroVal && _pnt[0].y == 0) {
                                _flagForFill = false
                            }
                            _ctx.font = p.labelStyleXYSize + " " + p.labelStyleXYFamily;
                            var _showBarNumbersY = .5;
                            if (_pnt[0].y < 0) {
                                _showBarNumbersY = parseInt(_pToN_2.y + canvas.my + parseFloat(p.labelStyleXYSize)) + .5
                            } else {
                                _showBarNumbersY = parseInt(_pToN_2.y + canvas.my - p.barValueHeight) + .5
                            }
                            var _maxY = canvas.my + canvas.mh;
                            if (_flagForFill && _maxY >= _showBarNumbersY) {
                                if (p.decimalInNumber) {
                                    _ctx.fillText(Number(_pnt[0].y.toFixed(p.decimal)), parseInt(canvas.mx + _pToN_1.x + (_pToN_2.x - _pToN_1.x) / 2) + .5, _showBarNumbersY)
                                } else {
                                    _ctx.fillText(_pnt[0].y.toFixed(p.decimal), parseInt(canvas.mx + _pToN_1.x + (_pToN_2.x - _pToN_1.x) / 2) + .5, _showBarNumbersY)
                                }
                            }
                        }
                        _cnt += _barPropGap + p.barProp.end
                    } else {
                        0
                    }
                }
                ctxLine.closePath()
            }
        }
    }
    function drawPointCanvas() {
        canvasPoint.width = canvasPoint.width;
        for (var k = 0; k < indexingArr.length; k++) {
            if (indexingArr[k] != "undefined" && String(indexingArr[k]).length > 0) {
                var i = indexingArr[k];
                if (interSecPoints[i]) {
                    var _iSec = interSecPoints[i];
                    var _area = _thisObj.getGraphArea();
                    var condition = p.canvasClipBool ? true: _iSec.x >= _area.min.x && _iSec.x <= _area.max.x && _iSec.y <= _area.min.y && _iSec.y >= _area.max.y;
                    if (condition) {
                        var _pTem = pointToPixel(_iSec.x, _iSec.y, true);
                        var _width = Math.max(0, _iSec.radius - globalResizeCalc(2));
                        var _cX = _pTem.x + p.dotSize;
                        var _cY = _pTem.y + p.dotSize;
                        ctxPoint.beginPath();
                        ctxPoint.arc(_cX, _cY, _width, 0, 2 * Math.PI);
                        ctxPoint.fillStyle = _iSec.color;
                        ctxPoint.fill();
                	    if (interSecPoints[i].title!=""){
	   	   					ctxPoint.beginPath();
							ctxPoint.font = "bold "+String(dkScreenResize(15))+"px consolas";
	   	   					ctxPoint.textAlign = 'center';
	   						ctxPoint.textBaseline = 'top';
	                    	ctxPoint.fillText(interSecPoints[i].title,_cX+dkScreenResize(10),_cY+dkScreenResize(3));
                    	}
                        if (interSecPoints[i].pan) {
                            if (_iSec.color != "transparent") ctxPoint.drawImage(p.pointShadeImg, 0, 0, p.pointShadeImg.height, p.pointShadeImg.height, _cX - _width, _cY - _width, _width * 2, _width * 2)
                        }
                    }
                }
            }
        }
    }
    function calcProve() {
        var proveLineWidth = globalResizeCalc(0);
        var _ptp = pointToPixel(p.provePoint, 0, true);
        if (_ptp.x <= 0) {
            p.provePoint = pixelToPoint(0, 0).x
        }
        if (_ptp.x >= canvas.mw) {
            p.provePoint = pixelToPoint(canvas.mw, 0).x
        }
        var _ptp = pointToPixel(0, p.provePointH, true);
        if (_ptp.y <= proveLineWidth) {
            p.provePointH = pixelToPoint(0, proveLineWidth).y
        }
        if (_ptp.y >= canvas.mh - proveLineWidth) {
            p.provePointH = pixelToPoint(0, canvas.mh - proveLineWidth).y
        }
        drawProve();
        returnViewChange("prove")
    }
    function drawProve() {
        canvasProve.width = canvasProve.width;
        var _temProve = p.probeInterPoint.sort(function(a, b) {
            return parseFloat(a.y) - parseFloat(b.y)
        });
        var _ptp = pointToPixel(p.provePoint, 0);
        //{？
            if (_ptp.x >= canvas.mw + p.marginLeft) _ptp.x = canvas.mw + p.marginLeft;
            if (_ptp.x <= 0) _ptp.x = 0;
            var _x = tf(_ptp.x);
            var _y = tf(globalResizeCalc(1.5) + p.probePaddingTop);
            var _h = tf(globalResizeCalc(1.5) + canvas.height - globalResizeCalc(3) - p.probePaddingBottom);
            var _r = globalResizeCalc(15+p.probeDimentionOffset)/2;
            ctxProve.beginPath();
            ctxProve.lineWidth = Math.round(globalResizeCalc(2.5));
            ctxProve.lineCap="round";
            ctxProve.beginPath();
            ctxProve.strokeStyle = p.probeColor;
            for (var jj = _temProve.length - 1; jj >= 0; jj--) {
                var _ptp2 = pointToPixel(_temProve[jj].x, _temProve[jj].y);
                if (_ptp2.y > canvas.my && _ptp2.y < canvas.my + canvas.mh) {
                    ctxProve.lineTo(_ptp2.x, _ptp2.y - globalResizeCalc(8));
                    ctxProve.lineTo(_ptp2.x - globalResizeCalc(5), _ptp2.y);
                    ctxProve.lineTo(_ptp2.x, _ptp2.y + globalResizeCalc(8))
                }
            }
 			ctxProve.beginPath();
			ctxProve.arc(_x,_h - globalResizeCalc(15)+_r,_r/2,0,Math.PI*2,false);
            ctxProve.fillStyle = p.probeColor;
		    ctxProve.fill();
            var rgd = ctxProve.createRadialGradient (_x,_h - globalResizeCalc(15)+_r, 0,_x,_h - globalResizeCalc(15)+_r,_r);
     		var _col = hexToRgba(p.probeColor,0.5);
     		var _colstr = "rgba("+_col.r+","+_col.g+","+_col.b+","+_col.a+")";
     		rgd.addColorStop(0, _colstr);
     		rgd.addColorStop(1, _colstr);
			ctxProve.arc(_x,_h - globalResizeCalc(15)+_r,_r+Math.round(globalResizeCalc(2.5)),0,Math.PI*2,false);
		    ctxProve.fillStyle = rgd;
		    ctxProve.fill();
            ctxProve.closePath();
   			//?
            ctxProve.beginPath();
            for (var jj = 0; jj < _temProve.length; jj++) {
                var _ptp2 = pointToPixel(_temProve[jj].x, _temProve[jj].y);
                if (_ptp2.y > canvas.my && _ptp2.y < canvas.my + canvas.mh) {
                    ctxProve.lineTo(_ptp2.x, _ptp2.y + globalResizeCalc(8));
                    ctxProve.lineTo(_ptp2.x + globalResizeCalc(5), _ptp2.y);
                    ctxProve.lineTo(_ptp2.x, _ptp2.y - globalResizeCalc(8))
                }
            }
            ctxProve.moveTo(_x, _h - globalResizeCalc(15) + _r);
            ctxProve.lineTo(_x, _y + globalResizeCalc(15) - _r);
            ctxProve.strokeStyle = p.probeColor;
            ctxProve.stroke();
            ctxProve.closePath();
            ctxProve.beginPath();
            ctxProve.lineWidth = Math.round(globalResizeCalc(1));
            ctxProve.strokeStyle = "#CC00CC";
            ctxProve.moveTo(globalResizeCalc(p.marginLeft),_h-_r);
            ctxProve.lineTo(_x,_h-_r);
            ctxProve.stroke();
            ctxProve.closePath();
            ctxProve.beginPath();
            ctxProve.strokeStyle = p.probeColor;
            ctxProve.moveTo(_x,_h-_r);
            ctxProve.lineTo(canvas.width - globalResizeCalc(6) - p.probePaddingRight,_h-_r);
            ctxProve.stroke();
            ctxProve.closePath();

       // }
        if (p.probeVisibleH) {
            var _ptp = pointToPixel(0, p.provePointH);
            if (_ptp.y >= canvas.my) {
                var _x = globalResizeCalc(1.5) + p.probePaddingLeft;
                var _y = _ptp.y;
                var _w = globalResizeCalc(1.5) + canvas.width - globalResizeCalc(3) - p.probePaddingRight;
                var _r = globalResizeCalc(15+p.probeDimentionOffset)/2;
                ctxProve.beginPath();
                ctxProve.lineWidth = globalResizeCalc(2.5);
                ctxProve.lineCap="round";
                ctxProve.strokeStyle = p.probeColor;
                ctxProve.fillStyle = p.probeColor;
                ctxProve.moveTo(_x + globalResizeCalc(15), _y);
                ctxProve.lineTo(_w - globalResizeCalc(15), _y);
                ctxProve.stroke();
                ctxProve.closePath();
				ctxProve.arc(_x + globalResizeCalc(15), _y,_r/2,0,Math.PI*2,false);
    	        ctxProve.fillStyle = p.probeColor;
                ctxProve.fill();
            	var rgd = ctxProve.createRadialGradient (_x + globalResizeCalc(15), _y, 0,_x + globalResizeCalc(15), _y,_r);
     			var _col = hexToRgba(p.probeColor,0.5);
     			var _colstr = "rgba("+_col.r+","+_col.g+","+_col.b+","+_col.a+")";
     			rgd.addColorStop(0, _colstr);
     			rgd.addColorStop(1, _colstr);
				ctxProve.arc(_x + globalResizeCalc(15), _y,_r+Math.round(globalResizeCalc(2.5)),0,Math.PI*2,false);
		   		ctxProve.fillStyle = rgd;
		    	ctxProve.fill();
            }
        }
    }
    function tf(num) {
        return parseInt(num) + .5
    }
    function pointToPixel(_x, _y, _bool) {
        var xRet, yRet;
        if (_bool) {
            xRet = p.xReg - p.marginLeft + _x * (p.leastCountX * p.zoomValX / p.unitX);
            yRet = p.yReg - p.marginTop + -1 * _y * (p.leastCountY * p.zoomValY / p.unitY)
        } else {
            xRet = p.xReg + _x * (p.leastCountX * p.zoomValX / p.unitX);
            yRet = p.yReg + -1 * _y * (p.leastCountY * p.zoomValY / p.unitY)
        }
        return {
            x: xRet,
            y: yRet
        }
    }
    function pixelToPoint(_x, _y, _bool) {
        var xRet, yRet;
        if (_bool) {
            xRet = (_x - (p.xReg - p.marginLeft - canvas.mx)) / (p.leastCountX * p.zoomValX / p.unitX);
            yRet = (_y - (p.yReg - p.marginTop - canvas.my)) / (p.leastCountY * p.zoomValY / p.unitY)
        } else {
            xRet = (_x - (p.xReg - canvas.mx)) / (p.leastCountX * p.zoomValX / p.unitX);
            yRet = -1 * ((_y - (p.yReg - canvas.my)) / (p.leastCountY * p.zoomValY / p.unitY))
        }
        return {
            x: xRet,
            y: yRet
        }
    }
    function graphOver(e) {
        if (e.type == "touchstart" || e.type == "touchmove") {
            prevMouseX = e.touches[0].pageX;
            prevMouseY = e.touches[0].pageY
        }
        if (e.type == "touchend") {
            e = {
                touches: [{
                    pageX: prevMouseX,
                    pageY: prevMouseY
                }],
                type: "touchend",
                preventDefault: function() {
                    return false
                }
            }
        }
        if (e.type == "mousemove" || e.type == "mousedown" || e.type == "mouseup") {
            e.touches = [{
                pageX: e.pageX,
                pageY: e.pageY
            }]
        }
        if (e.type == "mouseover") {
            $(this).unbind("mousemove", graphOver).bind("mousemove", graphOver);
            $(this).unbind("mouseout", graphOver).bind("mouseout", graphOver)
        } else if (e.type == "mousemove") {
            var _bool = false;
            var _probeBool = false;
            var _probeBoolH = false;
            var ptpT = pixelToPoint(e.pageX - $(canvasLine).offset().left, e.pageY - $(canvasLine).offset().top, false);
            var _mousePoint = {
                x: e.touches[0].pageX - $(canvasPoint).offset().left - p.dotSize,
                y: e.touches[0].pageY - $(canvasPoint).offset().top - p.dotSize
            };
            var mouserOverItem = {
                type: "graphOver",
                x: ptpT.x,
                y: ptpT.y
            };
            var isMouseOnLine = false;
            for (var k = indexingArr.length - 1; k >= 0; k--) {
                var i = indexingArr[k];
                if (interSecPoints[i]) {
                    var _pTem = pointToPixel(interSecPoints[i].x, interSecPoints[i].y, true);
                    if (getDistanceFor2pts(_pTem, _mousePoint) <= interSecPoints[i].radius) {
                        if (p.mouseCurType == "move" && typeof interSecPoints[i].pan != "undefined") {
                            $(canvasPoint).removeClass("commonpan");
                            $(canvasPoint).addClass("commongrab")
                        }
                        interSecPoints[i].title ? $(canvasPoint).attr("p_title", GCTConv(interSecPoints[i].title)) : null;
                        var _xVal = ("" + Number(interSecPoints[i].x).toFixed(p.decimal) * 1).replace(/-/g, "&ndash;");
                        var _yVal = ("" + Number(interSecPoints[i].y).toFixed(p.decimal) * 1).replace(/-/g, "&ndash;");
                        if (p.toolTip) {
                            if (typeof interSecPoints[i].toolTip != "undefined" && String(interSecPoints[i].toolTip).length > 0) {
                                if (interSecPoints[i].toolTip) toolTip.showTip(interSecPoints[i].toolTip, e)
                            } else if (p.toolTip == "x") {
                                toolTip.showTip(_xVal, e)
                            } else if (p.toolTip == "y") {
                                toolTip.showTip(_yVal, e)
                            } else {
                                toolTip.showTip("(" + _xVal + ", " + _yVal + ")", e)
                            }
                        }
                        if (interSecPoints[i].pan == "x" || interSecPoints[i].pan == "y" || interSecPoints[i].pan == "xy") {
                            $(canvasPoint).addClass("commongrab")
                        }
                        mouserOverItem = interSecPoints[i];
                        mouserOverItem.type = "point";
                        _bool = true;
                        break
                    } else {
                        if (p.mouseCurType == "move" && !isMouseOnLine) {
                            $(canvasPoint).removeClass("commongrab");
                            $(canvasPoint).addClass("commonpan")
                        } else p.panX || p.panY ? null: $(canvasPoint).removeClass("commongrab");
                        p.toolTip ? toolTip.hideTip() : null
                    }
                }
            }
            if (!_bool) {
                for (var i = 0; i < userLines.length; i++) {
                    if (typeof userLines[i] != "undefined" && userLines[i].pan == true && userLines[i].point != "") {
                        var _tempPoint = {
                            x: e.touches[0].pageX - $(canvasPoint).offset().left - p.dotSize,
                            y: e.touches[0].pageY - $(canvasPoint).offset().top - p.dotSize
                        };
                        var _tempPoint1 = pointToPixel(userLines[i].point[0].x, userLines[i].point[0].y, true);
                        var _tempPoint2 = pointToPixel(userLines[i].point[userLines[i].point.length - 1].x, userLines[i].point[userLines[i].point.length - 1].y, true);
                        if (isPointOnLine(_tempPoint, _tempPoint1, _tempPoint2, globalResizeCalc(15))) {
                            if (p.mouseCurType == "move") {
                                $(canvasPoint).removeClass("commonpan")
                            }
                            if (!$(canvasPoint).hasClass("commongrab")) $(canvasPoint).addClass("commongrab");
                            isMouseOnLine = true;
                            mouserOverItem = userLines[i];
                            mouserOverItem.type = "line";
                            if (p.toolTip) {
                                if (typeof userLines[i].toolTip != "undefined" && String(userLines[i].toolTip).length > 0) {
                                    if (userLines[i].toolTip) toolTip.showTip(userLines[i].toolTip, e)
                                }
                            }
                        } else {
                            if (p.mouseCurType == "move") {
                                $(canvasPoint).removeClass("commongrab");
                                $(canvasPoint).addClass("commonpan")
                            } else p.panX || p.panY ? null: $(canvasPoint).removeClass("commongrab");
                            isMouseOnLine = false
                        }
                    }
                    if (isMouseOnLine) {
                        userLines[i].title ? $(canvasPoint).attr("p_title", GCTConv(userLines[i].title)) : null;
                        break
                    }
                }
            }
            if (p.probeVisible && !_bool && !isMouseOnLine) {
                var _proveTp = pointToPixel(p.provePoint, 0, true);
                if (e.pageX - $(canvasPoint).offset().left - p.dotSize >= _proveTp.x - p.proveArea && e.pageX - $(canvasPoint).offset().left - p.dotSize <= _proveTp.x + p.proveArea) {
                    if (p.mouseCurType == "move") {
                        $(canvasPoint).removeClass("commonpan")
                    }
                    $(canvasPoint).addClass("commongrab");
                    p.title ? p.title.probe ? $(canvasPoint).attr("p_title", GCTConv(p.title.probe)) : null: null;
                    _probeBool = true;
                    mouserOverItem = {
                        id: "probe",
                        value: p.provePoint
                    };
                    mouserOverItem.type = "probeV"
                } else {
                    if (p.mouseCurType == "move" && !isMouseOnLine) {
                        $(canvasPoint).removeClass("commongrab");
                        $(canvasPoint).addClass("commonpan")
                    } else p.panX || p.panY ? null: $(canvasPoint).removeClass("commongrab")
                }
            }
            if (p.probeVisibleH && !_bool && !_probeBool && !isMouseOnLine) {
                var _proveTp = pointToPixel(0, p.provePointH, true);
                if (e.pageY - $(canvasPoint).offset().top - p.dotSize >= _proveTp.y - p.proveArea && e.pageY - $(canvasPoint).offset().top - p.dotSize <= _proveTp.y + p.proveArea) {
                    if (p.mouseCurType == "move") {
                        $(canvasPoint).removeClass("commonpan")
                    }
                    $(canvasPoint).addClass("commongrab");
                    p.title ? p.title.probeH ? $(canvasPoint).attr("p_title", GCTConv(p.title.probeH)) : null: null;
                    _probeBoolH = true;
                    mouserOverItem = {
                        id: "probeH",
                        value: p.provePointH
                    };
                    mouserOverItem.type = "probeH"
                } else {
                    if (p.mouseCurType == "move" && !isMouseOnLine) {
                        $(canvasPoint).removeClass("commongrab");
                        $(canvasPoint).addClass("commonpan")
                    } else p.panX || p.panY ? null: $(canvasPoint).removeClass("commongrab")
                }
            }
            if (!isMouseOnLine && !_bool && !_probeBool && !_probeBoolH) {
                typeof p.title != "string" ? $(canvasPoint).removeAttr("p_title") : null;
                p.panX || p.panY ? typeof p.title == "string" ? $(canvasPoint).attr("p_title", p.title) : $(canvasPoint).attr("p_title", GetGlobalTooltip("tooltip", "graphArea")) : null
            }
            p.onGraphOver ? p.onGraphOver(mouserOverItem) : null
        } else if (e.type == "mouseout") {
            $(this).unbind("mousemove", graphOver);
            $(this).unbind("mouseout", graphOver);
            var mouserOverItem = {
                type: "graphOut"
            };
            p.onGraphOver ? p.onGraphOver(mouserOverItem) : null
        }
    }
    function graphOut(e) {
        p.onGraphOut ? p.onGraphOut(e) : null
    }
    function panGraph(e) {
        if (e.type == "mouseover" || e.type == "mouseout") {
            return false
        }
        if (e.type == "touchstart" || e.type == "touchmove") {
            prevMouseX = e.touches[0].pageX;
            prevMouseY = e.touches[0].pageY
        }
        if (e.type == "touchend") {
            e = {
                touches: [{
                    pageX: prevMouseX,
                    pageY: prevMouseY
                }],
                type: "touchend",
                preventDefault: function() {
                    return false
                }
            }
        }
        if (e.type == "mousemove" || e.type == "mousedown" || e.type == "mouseup") {
            e.touches = [{
                pageX: e.pageX,
                pageY: e.pageY
            }]
        }
        var ptpT = pixelToPoint(e.touches[0].pageX - $(canvasPoint).offset().left, e.touches[0].pageY - $(canvasPoint).offset().top, true);
        var _mousePoint = {
            x: e.touches[0].pageX - $(canvasPoint).offset().left - p.dotSize,
            y: e.touches[0].pageY - $(canvasPoint).offset().top - p.dotSize
        };
        var mouserOverItem = {
            x: ptpT.x,
            y: ptpT.y
        };
        if (e.type == "touchstart" || e.type == "mousedown") {
            focusOutInput();
            if ($(canvasPoint).hasClass("commonpan") || $(canvasPoint).hasClass("commongrab")) {
                addPointerGrabbing(true)
            }
            isOnDots = undefined;
            isOnProves = undefined;
            isOnProvesH = undefined;
            oldTouchX = undefined;
            oldTouchY = undefined;
            oldTouchZoom = undefined;
            if (e.touches.length == 1) {
                if (p.probeVisible) {
                    var _proveTp = pointToPixel(p.provePoint, 0, true);
                    if (e.touches[0].pageX - $(canvasPoint).offset().left - p.dotSize >= _proveTp.x - p.proveArea && e.touches[0].pageX - $(canvasPoint).offset().left - p.dotSize <= _proveTp.x + p.proveArea) {
                        isOnProves = true
                    }
                }
                if (p.probeVisibleH) {
                    var _proveTp = pointToPixel(0, p.provePointH, true);
                    if (e.touches[0].pageY - $(canvasPoint).offset().top - p.dotSize >= _proveTp.y - p.proveArea && e.touches[0].pageY - $(canvasPoint).offset().top - p.dotSize <= _proveTp.y + p.proveArea) {
                        isOnProves = false;
                        isOnProvesH = true
                    }
                }
                for (var i = 0; i < userLines.length; i++) {
                    if (typeof userLines[i] != "undefined" && userLines[i].pan == true && userLines[i].point != "") {
                        var _tempPoint = {
                            x: e.touches[0].pageX - $(canvasPoint).offset().left - p.dotSize,
                            y: e.touches[0].pageY - $(canvasPoint).offset().top - p.dotSize
                        };
                        var _tempPoint1 = pointToPixel(userLines[i].point[0].x, userLines[i].point[0].y, true);
                        var _tempPoint2 = pointToPixel(userLines[i].point[userLines[i].point.length - 1].x, userLines[i].point[userLines[i].point.length - 1].y, true);
                        if (isPointOnLine(_tempPoint, _tempPoint1, _tempPoint2, globalResizeCalc(15))) {
                            isOnProves = false;
                            isOnProvesH = false;
                            isOnLine = i;
                            mouserOverItem = userLines[i];
                            mouserOverItem.type = "line";
                            break
                        }
                    }
                }
                for (var k = indexingArr.length - 1; k >= 0; k--) {
                    var i = indexingArr[k];
                    if (typeof interSecPoints[i] != "undefined") {
                        var _pTem = pointToPixel(interSecPoints[i].x, interSecPoints[i].y, true);
                        if (getDistanceFor2pts(_pTem, _mousePoint) <= interSecPoints[i].radius) {
                            isOnProves = false;
                            isOnProvesH = false;
                            isOnLine = undefined;
                            isOnDots = i;
                            mouserOverItem = interSecPoints[i];
                            mouserOverItem.type = "point";
                            var _xVal = ("" + Number(interSecPoints[i].x).toFixed(p.decimal) * 1).replace(/-/g, "&ndash;");
                            var _yVal = ("" + Number(interSecPoints[i].y).toFixed(p.decimal) * 1).replace(/-/g, "&ndash;");
                            if (p.toolTip) {
                                if (typeof interSecPoints[i].toolTip != "undefined" && String(interSecPoints[i].toolTip).length > 0) {
                                    if (interSecPoints[i].toolTip) toolTip.showTip(interSecPoints[i].toolTip, e)
                                } else if (p.toolTip == "x") {
                                    toolTip.showTip(_xVal, e)
                                } else if (p.toolTip == "y") {
                                    toolTip.showTip(_yVal, e)
                                } else if (p.toolTip == "xy" || p.toolTip == true) {
                                    toolTip.showTip("(" + _xVal + ", " + _yVal + ")", e)
                                }
                            }
                            break
                        }
                    }
                }
            }
            mouseDownActivated = true;
            if (p.onMouseDown) {
                p.onMouseDown({
                    id: p.id ? p.id: "",
                    type: "mousedown",
                    isOnProves: isOnProves,
                    isOnProvesH: isOnProvesH,
                    isOnLine: isOnLine,
                    isOnDots: isOnDots,
                    mouserOverItem: mouserOverItem
                })
            }
        }
        if (e.type == "touchmove" || e.type == "mousemove") {
            if (e.touches.length == 1) {
                if (isOnProves) {
                    proveDrawCalc(e, true)
                } else if (isOnProvesH) {
                    proveDrawCalc(e, false)
                } else if (typeof isOnLine != "undefined") {
                    var _pToP = pixelToPoint(e.touches[0].pageX - $(canvasPoint).offset().left - p.dotSize, e.touches[0].pageY - $(canvasPoint).offset().top - p.dotSize);
                    returnViewChange("line", _pToP)
                } else if (typeof isOnDots != "undefined" && typeof interSecPoints[isOnDots].pan != "undefined") {
                    var _pToP = pixelToPoint(e.touches[0].pageX - $(canvasPoint).offset().left - p.dotSize, e.touches[0].pageY - $(canvasPoint).offset().top - p.dotSize);
                    if (interSecPoints[isOnDots].pan == "x") {
                        interSecPoints[isOnDots].x = _pToP.x;
                        returnViewChange("point", isOnDots)
                    } else if (interSecPoints[isOnDots].pan == "y") {
                        interSecPoints[isOnDots].y = _pToP.y;
                        returnViewChange("point", isOnDots)
                    } else if (interSecPoints[isOnDots].pan == "xy") {
                        interSecPoints[isOnDots].x = _pToP.x;
                        interSecPoints[isOnDots].y = _pToP.y;
                        returnViewChange("point", isOnDots)
                    }
                } else if ((p.panX || p.panY) && mouseDownActivated) {
                    var _temBool = false;
                    if (p.panX && (Math.abs(oldTouchX - e.touches[0].pageX) > 10 || oldTouchX == undefined)) {
                        if (oldTouchX != undefined) {
                            p.xReg += e.touches[0].pageX - oldTouchX;
                            _temBool = true
                        }
                        oldTouchX = e.touches[0].pageX
                    }
                    if (p.panY && (Math.abs(oldTouchY - e.touches[0].pageY) > 10 || oldTouchY == undefined)) {
                        if (oldTouchY != undefined) {
                            p.yReg += e.touches[0].pageY - oldTouchY;
                            _temBool = true
                        }
                        oldTouchY = e.touches[0].pageY
                    }
                    setQuardZoomStyle();
                    if (_temBool) {
                        createBaseGrid()
                    }
                    returnViewChange("pan")
                }
                if (isOnDots) {
                    if (BrowserDetect.any()) {
                        if (p.toolTip) {
                            var _xVal = ("" + Number(interSecPoints[isOnDots].x).toFixed(p.decimal) * 1).replace(/-/g, "&ndash;");
                            var _yVal = ("" + Number(interSecPoints[isOnDots].y).toFixed(p.decimal) * 1).replace(/-/g, "&ndash;");
                            if (typeof interSecPoints[isOnDots].toolTip != "undefined" && String(interSecPoints[isOnDots].toolTip).length > 0) {
                                if (interSecPoints[isOnDots].toolTip) toolTip.showTip(interSecPoints[isOnDots].toolTip, e)
                            } else if (p.toolTip == "x") {
                                toolTip.showTip(_xVal, e)
                            } else if (p.toolTip == "y") {
                                toolTip.showTip(_yVal, e)
                            } else {
                                toolTip.showTip("(" + _xVal + ", " + _yVal + ")", e)
                            }
                        }
                    }
                    if (!checkCanvasBoundary(e)) p.toolTip ? toolTip.hideTip() : null
                }
                if (p.onMouseMove) {
                    p.onMouseMove({
                        id: p.id ? p.id: "",
                        type: "mousemove",
                        isOnProves: isOnProves,
                        isOnProvesH: isOnProvesH,
                        isOnLine: isOnLine,
                        isOnDots: isOnDots,
                        mouserOverItem: mouserOverItem
                    })
                }
            }
            if (e.touches.length == 2) {
                var _ncenterPoint = {
                    x: _thisObj.getGraphArea().center.x,
                    y: _thisObj.getGraphArea().center.y
                };
                var _centerPix = pointToPixel(_thisObj.getGraphArea().center.x, _thisObj.getGraphArea().center.y);
                var _d = getDistance(e.touches[0].pageX, e.touches[0].pageY, e.touches[1].pageX, e.touches[1].pageY);
                if ((p.zoomX || p.zoomY) && (Math.abs(_d - oldTouchZoom) > 10 || oldTouchZoom == undefined)) {
                    if (_d - oldTouchZoom < 0) {
                        p.zoomX && p.zoomValX > p.minZoom ? p.zoomValX -= .1 : null;
                        p.zoomY && p.zoomValY > p.minZoom ? p.zoomValY -= .1 : null;
                        var _newCenterPix = pointToPixel(_ncenterPoint.x, _ncenterPoint.y);
                        if (!isNaN(p.xReg) && p.zoomFromCenterX) {
                            p.xReg += _centerPix.x - _newCenterPix.x
                        }
                        if (!isNaN(p.yReg) && p.zoomFromCenterY) {
                            p.yReg += _centerPix.y - _newCenterPix.y
                        }
                        setQuardZoomStyle();
                        createBaseGrid()
                    }
                    if (_d - oldTouchZoom > 0) {
                        p.zoomX && p.zoomValX < p.maxZoom ? p.zoomValX += .1 : null;
                        p.zoomY && p.zoomValX < p.maxZoom ? p.zoomValY += .1 : null;
                        var _newCenterPix = pointToPixel(_ncenterPoint.x, _ncenterPoint.y);
                        if (!isNaN(p.xReg) && p.zoomFromCenterX) {
                            p.xReg += _centerPix.x - _newCenterPix.x
                        }
                        if (!isNaN(p.yReg) && p.zoomFromCenterY) {
                            p.yReg += _centerPix.y - _newCenterPix.y
                        }
                        setQuardZoomStyle();
                        createBaseGrid()
                    }
                    oldTouchZoom = _d
                }
                returnViewChange("zoom")
            }
        }
        if (e.type == "mousedown") {
            $(window).unbind("mousemove", panGraph).bind("mousemove", panGraph);
            $(window).unbind("mouseup", panGraph).bind("mouseup", panGraph)
        }
        if (e.type == "mouseup" || e.type == "touchend") {
			//<dk>为pointChange传递stop消息
			if (typeof isOnDots != "undefined" && typeof interSecPoints[isOnDots].pan != "undefined") {
            var _pToP = pixelToPoint(e.touches[0].pageX - $(canvasPoint).offset().left - p.dotSize, e.touches[0].pageY - $(canvasPoint).offset().top - p.dotSize);
                if (interSecPoints[isOnDots].pan == "x") {
                    interSecPoints[isOnDots].x = _pToP.x;
                    returnViewChange("point", isOnDots, true)
                } else if (interSecPoints[isOnDots].pan == "y") {
                    interSecPoints[isOnDots].y = _pToP.y;
                    returnViewChange("point", isOnDots, true)
                } else if (interSecPoints[isOnDots].pan == "xy") {
                    interSecPoints[isOnDots].x = _pToP.x;
                    interSecPoints[isOnDots].y = _pToP.y;
                    returnViewChange("point", isOnDots, true)
                }
            }

            p.toolTip ? toolTip.hideTip() : null;
            addPointerGrabbing(false);
            $(window).unbind("mousemove", panGraph);
            $(window).unbind("mouseup", panGraph);
            mouseDownActivated = false;
            isOnLine = undefined;
            isOnDots = undefined;
            isOnProves = undefined;
            isOnProvesH = undefined;
            if (p.onMouseUp) {
                p.onMouseUp({
                    id: p.id ? p.id: "",
                    type: e.type,
                    mouserOverItem: mouserOverItem
                })
            }
        }
        if (p.onMouseEvents) {
            p.onMouseEvents(e)
        }
        e.preventDefault()
    }
    function proveDrawCalc(e, flag) {
        if (flag) {
            var _xPos = (e.touches ? e.touches[0].pageX: e.pageX) - $(canvasPoint).offset().left - p.dotSize;
            if (_xPos < 0) {
                _xPos = 0
            }
            if (_xPos > canvas.mw) {
                _xPos = canvas.mw
            }
            var _pToP = pixelToPoint(_xPos, (e.touches ? e.touches[0].pageY: e.pageY) - $(canvasPoint).offset().top - p.dotSize);
            var _p2pNum = _pToP.x;
            probeSnapPoints = probeSnapPoints.sort(function(a, b) {
                return a - b
            });
            if (p.probeSnap) {
                if (p.probeSnapVal) {
                    _p2pNum = _floatPrecision(Math.round(_p2pNum / p.probeSnapVal) * p.probeSnapVal, proveDecimal)
                } else {
                    for (var _psp = 0; _psp < probeSnapPoints.length - 1; _psp++) {
                        if (_p2pNum > probeSnapPoints[_psp] && _p2pNum < probeSnapPoints[_psp + 1]) {
                            var _mid = probeSnapPoints[_psp] + (probeSnapPoints[_psp + 1] - probeSnapPoints[_psp]) / 2;
                            if (_p2pNum > _mid) {
                                _p2pNum = probeSnapPoints[_psp + 1]
                            } else {
                                _p2pNum = probeSnapPoints[_psp]
                            }
                        }
                    }
                }
            }
            p.provePoint = _p2pNum
        } else {
            var _yPos = (e.touches ? e.touches[0].pageY: e.pageY) - $(canvasPoint).offset().top - p.dotSize;
            if (_yPos < 0) {
                _yPos = 0
            }
            if (_yPos > canvas.mh) {
                _yPos = canvas.mh
            }
            var _pToP = pixelToPoint((e.touches ? e.touches[0].pageX: e.pageX) - $(canvasPoint).offset().left - p.dotSize, _yPos);
            var _p2pNum = _pToP.y;
            probeSnapPointsH = probeSnapPointsH.sort(function(a, b) {
                return a - b
            });
            if (p.probeSnap) {
                if (p.probeSnapVal) {
                    _p2pNum = _p2pNum - _p2pNum % p.probeSnapVal
                } else {
                    for (var _psp = 0; _psp < probeSnapPointsH.length - 1; _psp++) {
                        if (_p2pNum > probeSnapPointsH[_psp] && _p2pNum < probeSnapPointsH[_psp + 1]) {
                            var _mid = probeSnapPointsH[_psp] + (probeSnapPointsH[_psp + 1] - probeSnapPointsH[_psp]) / 2;
                            if (_p2pNum > _mid) {
                                _p2pNum = probeSnapPointsH[_psp + 1]
                            } else {
                                _p2pNum = probeSnapPointsH[_psp]
                            }
                        }
                    }
                }
            }
            p.provePointH = _p2pNum
        }
        calcProve()
    }
    function proveOverGraph(e) {
        if (p.probeVisible) {
            var _proveTp = pointToPixel(p.provePoint, 0, true);
            if (e.pageX - $(canvasPoint).offset().left - p.dotSize >= _proveTp.x - p.proveArea && e.pageX - $(canvasPoint).offset().left - p.dotSize <= _proveTp.x + p.proveArea) {
                $(canvasProve).addClass("commongrab");
                p.title ? p.title.probe ? $(canvasProve).attr("p_title", GCTConv(p.title.probe)) : null: null
            } else {
                $(canvasProve).removeClass("commongrab");
                $(canvasProve).removeAttr("p_title")
            }
        }
        if (p.probeVisibleH) {
            var _proveTp = pointToPixel(0, p.provePointH, true);
            if (e.pageY - $(canvasPoint).offset().top - p.dotSize >= _proveTp.y - p.proveArea && e.pageY - $(canvasPoint).offset().top - p.dotSize <= _proveTp.y + p.proveArea) {
                $(canvasProve).addClass("commongrab");
                p.title ? p.title.probe ? $(canvasProve).attr("p_title", GCTConv(p.title.probe)) : null: null
            } else {
                $(canvasProve).removeClass("commongrab");
                $(canvasProve).removeAttr("p_title")
            }
        }
        if (p.onMouseEvents) {
            p.onMouseEvents(e)
        }
    }
    function provePanGraph(e) {
        if (e.type == "touchmove" || e.type == "touchstart") {
            e.pageX = e.originalEvent.touches[0].pageX;
            e.pageY = e.originalEvent.touches[0].pageY
        }
        if (e.type == "mousedown") {
            $(window).unbind("mousemove", provePanGraph).bind("mousemove", provePanGraph);
            $(window).unbind("mouseup", provePanGraph).bind("mouseup", provePanGraph)
        }
        if (e.type == "mousedown" || e.type == "touchstart") {
            focusOutInput();
            var _proveTp = pointToPixel(p.provePoint, 0, true);
            if (e.pageX - $(canvasPoint).offset().left - p.dotSize >= _proveTp.x - p.proveArea && e.pageX - $(canvasPoint).offset().left - p.dotSize <= _proveTp.x + p.proveArea) {
                proveMove = true;
                addPointerGrabbing(true)
            }
            var _proveTp = pointToPixel(0, p.provePointH, true);
            if (e.pageY - $(canvasPoint).offset().top - p.dotSize >= _proveTp.y - p.proveArea && e.pageY - $(canvasPoint).offset().top - p.dotSize <= _proveTp.y + p.proveArea) {
                proveMoveH = true;
                addPointerGrabbing(true)
            }
            if (p.onMouseDown) {
                p.onMouseDown({
                    id: p.id ? p.id: "",
                    type: "mousedown",
                    proveMove: proveMove,
                    proveMoveH: proveMoveH
                })
            }
        }
        if (e.type == "mousemove" || e.type == "touchmove") {
            if (proveMove) {
                proveDrawCalc(e, true)
            } else if (proveMoveH) {
                proveDrawCalc(e, false)
            }
            if (p.onMouseMove) {
                p.onMouseMove({
                    id: p.id ? p.id: "",
                    type: "mousemove",
                    proveMove: proveMove,
                    proveMoveH: proveMoveH
                })
            }
        }
        if (e.type == "mouseup" || e.type == "touchend") {
            addPointerGrabbing(false);
            $(window).unbind("mousemove", provePanGraph);
            $(window).unbind("mouseup", provePanGraph);
            proveMove = false;
            proveMoveH = false
        }
        if (p.onMouseEvents) {
            p.onMouseEvents(e)
        }
        e.preventDefault()
    }
    function returnViewChange(_typeStr, _id, _stop) {
        if (_typeStr && _typeStr != "") {
            if (_typeStr == "prove") {
                if (p.onProveChange) {
                    p.onProveChange({
                        id: p.id ? p.id: "",
                        type: _typeStr,
                        value: p.provePoint,
                        valueH: p.provePointH
                    })
                }
            } else if (_typeStr == "point") {
                if (p.onPointChange) {
                    p.onPointChange({
                        id: p.id ? p.id: "",
                        type: _typeStr,
                        value: {
                            point: _id,
                            status: _stop!=undefined&&_stop==true? "stop":"moving",
                            x: interSecPoints[_id].x,
                            y: interSecPoints[_id].y
                        }
                    })
                } else {
                    drawPointCanvas()
                }
            } else if (_typeStr == "line") {
                if (p.onLineChange) {
                    p.onLineChange({
                        id: p.id ? p.id: "",
                        type: _typeStr,
                        value: {
                            line: isOnLine,
                            x: _id.x,
                            y: _id.y
                        }
                    })
                }
            } else {
                calcProve();
                if (p.onViewChange) {
                    p.onViewChange({
                        id: p.id ? p.id: "",
                        type: _typeStr
                    })
                } else {
                    drawCanvas();
                    drawLineCanvas();
                    drawPointCanvas()
                }
            }
        }
    }
    function getDistance(x1, y1, x2, y2) {
        var _d = Math.abs(Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
        return _d
    }
    function setQuardZoomStyle() {
        if (p.drawQuads == 1) {
            if (_thisObj.getGraphArea().min.x == 0) {
                p.zoomFromCenterX = false;
                p.zoomFromCenterY = false
            } else {
                p.zoomFromCenterX = true;
                p.zoomFromCenterY = true
            }
        }
    }
    function plotArrow(_prevPoint, _endPoint, _ctx, _lineWidth, _lineColor) {
        var _angle = Math.PI + getAngle(_prevPoint, _endPoint, true);
        var point1 = new Object;
        var point2 = new Object;
        var point3 = new Object;
        var angle = _angle + .5;
        var angle1 = _angle - .5;
        point1.x = _endPoint.x - globalResizeCalc(15) * Math.cos(angle);
        point1.y = _endPoint.y - globalResizeCalc(15) * Math.sin(angle);
        point2.x = _endPoint.x - globalResizeCalc(5) * Math.cos(_angle);
        point2.y = _endPoint.y - globalResizeCalc(5) * Math.sin(_angle);
        point3.x = _endPoint.x - globalResizeCalc(15) * Math.cos(angle1);
        point3.y = _endPoint.y - globalResizeCalc(15) * Math.sin(angle1);
        _ctx.beginPath();
        _ctx.moveTo(_endPoint.x, _endPoint.y);
        _ctx.lineTo(point1.x, point1.y);
        _ctx.lineTo(point2.x, point2.y);
        _ctx.lineTo(point3.x, point3.y);
        _ctx.lineTo(_endPoint.x, _endPoint.y);
        _ctx.lineWidth = _lineWidth;
        _ctx.lineJoin = "round";
        _ctx.fillStyle = _lineColor;
        _ctx.strokeStyle = _lineColor;
        _ctx.fill();
        _ctx.stroke();
        _ctx.closePath()
    }
    function createLabelDivs() {
        if (p.labelX && !labelXDiv) {
            labelXDiv = document.createElement("div");
            p.target.append(labelXDiv);
            $(labelXDiv).css({
                position: "absolute",
                "font-weight": "bold",
                "pointer-events": "none",
                "white-space": "nowrap"
            })
        }
        if (p.labelY && !labelYDiv) {
            labelYDiv = document.createElement("div");
            p.target.append(labelYDiv);
            $(labelYDiv).css({
                position: "absolute",
                "font-weight": "bold",
                "pointer-events": "none",
                "white-space": "nowrap",
                "padding-right": globalResizeCalc(2) + "px",
                "padding-bottom": globalResizeCalc(2) + "px"
            })
        }
    }
    function checkCanvasBoundary(e) {
        if (e.type == "touchmove" || e.type == "touchstart") {
            e.pageX = e.touches[0].pageX;
            e.pageY = e.touches[0].pageY
        }
        var _x = e.pageX - $(canvasPoint).offset().left;
        var _y = e.pageY - $(canvasPoint).offset().top;
        if (_x >= 0 && _x <= canvasPoint.width && _y >= 0 && _y <= canvasPoint.height) return true;
        return false
    }
    function removeUndefinedFromArray(_arr) {
        for (var i = 0; i < _arr.length; i++) {
            if (typeof _arr[i] == "undefined") {
                _arr.splice(i, 1);
                i--
            }
        }
    }
    function getAngle(p1, p2, isRad) {
        return isRad ? Math.atan2(p1.y - p2.y, p1.x - p2.x) : Math.atan2(p1.y - p2.y, p1.x - p2.x) * (180 / Math.PI)
    }
    function isPointOnLine(_p, _p1, _p2, hitArea) {
        var len1 = getDistanceFor2pts(_p, _p1);
        var len2 = getDistanceFor2pts(_p, _p2);
        var TO_RADIANS = Math.PI / 180;
        var _center = getMidPoint(_p1, _p2);
        var dist = getDistanceFor2pts(_p, _center);
        var mainDist = getDistanceFor2pts(_p1, _center);
        var pointAngle = getAngle(_p, _center);
        pointAngle = pointAngle < 0 ? 360 + pointAngle: pointAngle;
        var mainAngle = getAngle(_center, _p1);
        mainAngle = mainAngle < 0 ? 360 + mainAngle: mainAngle;
        var finalAngle = pointAngle - mainAngle + 90;
        _p.x = _center.x + dist * Math.cos(finalAngle * TO_RADIANS);
        _p.y = _center.y + dist * Math.sin(finalAngle * TO_RADIANS);
        var tempObj = {
            a: _center.x - hitArea / 2,
            b: _center.x + hitArea / 2,
            c: _center.y - mainDist,
            d: _center.y + mainDist,
            p: _p
        };
        if (_center.x - hitArea / 2 <= _p.x && _center.x + hitArea / 2 >= _p.x && _center.y - mainDist <= _p.y && _center.y + mainDist >= _p.y) {
            tempObj.flag = true
        } else {
            tempObj.flag = false
        }
        if (tempObj.flag) {
            if (len1 > len2) return _p2;
            else return _p1
        }
        return false
    }
    getDistanceFor2pts = function(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
    };
    getMidPoint = function(_p1, _p2) {
        var newPoint = new Object;
        newPoint.x = (_p1.x + _p2.x) / 2;
        newPoint.y = (_p1.y + _p2.y) / 2;
        return newPoint
    }
};



var FrameClass = function(_callbackFn) {
    var frameElements = new Array;
    var frameObjects = new Array;
    var originFontSize = parseInt($("body").css("font-size"));
    var makeInvisibleDivs = new Array;
    for (var i = 0; i < frameJson.length; i++) {
        var e = frameJson[i];
        var _div = document.createElement("div");
        if (e.target != undefined) {
            e.target = eval(e.target);
            e.target.append(_div)
        } else {
            $("body").append(_div)
        }
        frameElements.push({
            element: $(_div),
            e: e
        });
        e.css != undefined ? $(_div).attr("style", e.css) : null;
        $(_div).css("position", "absolute");
        if (typeof e.index != "undefined") {
            if (e.index < 100) {
                $(_div).css("z-index", e.index)
            } else {
                alert("ERROR!!: z-index set to more than the allowed number in " + e.id + ".");
                return false
            }
        }
        e.class != undefined ? $(_div).addClass(e.class) : null;
        e.id != undefined ? $(_div).attr("id", e.id) : null;
        setElementResize();
        e.visible != undefined ? e.visible ? $(_div).show() : makeInvisibleDivs.push(_div) : null;
        $(_div).html(e.content ? e.content: "")
    }
    for (var i in componentJson) {
        for (var j = 0; j < componentJson[i].length; j++) {
            var _item = componentJson[i];
            this[_item[j].id] = eval("new " + i + "()");
            _item[j].target = eval(_item[j].target);
            this[_item[j].id].init(_item[j]);
            if (typeof _item[j].index != "undefined") {
                if (_item[j].index >= 100) {
                    alert("ERROR!!: z-index set to more than the allowed number in " + _item[j].id + ".");
                    return false
                }
            }
            frameObjects.push(this[_item[j].id])
        }
    }
    for (var i = 0; i < makeInvisibleDivs.length; i++) {
        $(makeInvisibleDivs[i]).hide()
    }
    function setElementResize() {
        $("body").css("font-size", dkScreenResize(originFontSize) + "px");
        for (var i = 0; i < frameElements.length; i++) {
            var d = frameElements[i].element;
            var e = frameElements[i].e;
            e.x != undefined ? $(d).css("left", dkScreenResize(e.x)) : null;
            e.y != undefined ? $(d).css("top", dkScreenResize(e.y)) : null;
            e.width != undefined ? $(d).css("width", dkScreenResize(e.width)) : null;
            e.height != undefined ? $(d).css("height", dkScreenResize(e.height)) : null
        }
    }
    GlobalCodeOnInit()
};

var AnimClass = function(_callbackFn) {
    var animObjects = new Array;
    if (typeof animJson != "undefined") {
        for (var i in animJson) {
            for (var j = 0; j < animJson[i].length; j++) {
                var _item = animJson[i];
                this[_item[j].id] = eval("new " + i + "()");
                _item[j].target = eval(_item[j].target);
                this[_item[j].id].init(_item[j]);
                animObjects.push(this[_item[j].id])
            }
        }
    }
};

var wMain = 1024;
var hMain = 740;
var hCap = 40;
var hGraph = 438;
var hTab = 224;

var frameJson = [{
    "class": "desktop",
    x: 0,
    y: 0,
    width: wMain,
    height: hMain
},
{
    id: "capDiv",
    "class": "capDiv",
    x: 0,
    y: 0,
    width: wMain,
    height: hCap-1
},
{
    id: "graphDiv",
    target: "$('.desktop')",
    x: 0,
    y: hCap + 0,
    width: wMain,
    height: hGraph
}
];

var componentJson = {
    dkCompTab: [{
        id: "tabComp",
        target: '$(".desktop")',
        x: -3,
        y: hCap+hGraph+1,
        width: wMain+6,
        height: hTab+40,
        tabHeight: 40,
        labelSize: "0.9em",
        tabs: ["<b>偏转模型</b>","<b>加速模型</b>","<b>数据分析</b>"],
        tabBarColors : ["#FF3333","#FF3333","#0000FF"],
        tabwidth: 126,
        shadowMargin: 0,
        leftMargin: 13,
        index: 0,
        tabType: "normal"
    }],
    dkCompTextLabel: [
    {
        id: "txt_result",
        target: '$(".desktop")',
        html: "<b></b>",
        x: 240,
        y: hCap + hGraph -43,
        width : 700,
        height: 23,
        color: "#FFFFFF",
        bgColor: "#778899",
        fontSize: "0.85em",
        index: 7,
        emdash: true
    },
    {
        id: "txt_1",
        target: '$(".desktop")',
        html: "<b>坐标缩放</b>",
        x: 483,
        y: hCap + hGraph + 9,
        width : 100,
        color: "#777777",
        fontSize: "0.8em",
        emdash: true
    },
    {
        id: "txt_zoom",
        target: '$(".desktop")',
        html: "<b>x1</b>",
        x: 628,
        y: hCap + hGraph + 9,
        width : 50,
        color: "#555555",
        fontSize: "0.8em",
        emdash: true
    },
    {
        id: "txt_2",
        target: '$(".desktop")',
        html: "<b>演示速度</b>",
        x: 665,
        y: hCap + hGraph + 9,
        width : 100,
        color: "#777777",
        fontSize: "0.8em",
        emdash: true
    },
    {
        id: "txt_speed",
        target: '$(".desktop")',
        html: "<b>x1</b>",
        x: 825,
        y: hCap + hGraph + 9,
        width : 50,
        color: "#555555",
        fontSize: "0.8em",
        emdash: true
    },
    {
        id: "txt_timer",
        target: '$(".desktop")',
        html: "<b>0.0</b><i>s</i>",
        x: wMain-130,
        y: hCap+4,
        align: "right",
        width : 125,
        color: "#FFFFFF",
        fontSize: "1em",
        fontFamily: "Arial",
        Align: "right",
        index: 11,
        emdash: true
    },
    {
        id: "txt_i1",
        target: '$(".desktop")',
        html: "<b>极性</b>",
        x: 340,
        y: hMain-32,
        width : 64,
        color: "#222222",
        fontSize: "0.8em",
        fontFamily: "Arial",
        Align: "right",
        emdash: true
    },
    {
        id: "txt_i2",
        target: '$(".desktop")',
        html: "<b>电量<i>(1.6x10<sup>-19</sup>C)</i></b>",
        x: 435,
        y: hMain-35,
        width : 150,
        color: "#222222",
        fontSize: "0.8em",
        fontFamily: "Arial",
        Align: "right",
        emdash: true
    },
    {
        id: "txt_i2",
        target: '$(".desktop")',
        html: "<b>质量<i>(1.67x10<sup>-27</sup>kg)</i></b>",
        x: 710,
        y: hMain-35,
        width : 150,
        color: "#222222",
        fontSize: "0.8em",
        fontFamily: "Arial",
        Align: "right",
        emdash: true
    }],
	dkCompMsgBox:[{
		id:"msgBox",
	}],
	dkCompCaption : [{
        id: "dkCaption",
        target: "$('.capDiv')",
        x:0,
        y:0,
        width: wMain,
        height: 39,
        color: "#7788AA",
        lineColor:"#0000AA",
        text:"带电粒子在匀强电场中的运动 <sub><i>v3.0</i></sub>",
        textColor:"#FFFFFF",
        bold: true,
        lineBox: true,
        cursor: "default",
        fontSize: "1em",
        bgAlpha: 0.3,
        paddingTop: 4,
        paddingLeft: 10,
        index:10
    }],
    dkCompColorBar: [
	{
        id: "dkColorBar_vt",
        target: "$('.desktop')",
        x:wMain-410,
        y:hCap+40,
        width: 320,
        height: 188,
        colorStyle: "#8092b0",
        bold: true,
        sqrBox: false,
        lineBox: false,
        lineLoc :1,
        labelText:"Hi",
        cursor: "default",
        fontSize: "1em",
        bgAlpha: .3,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        index:7
    },
	{
        id: "dkColorBar_st",
        target: "$('.desktop')",
        x:wMain-410,
        y:hCap+233,
        width: 320,
        height: 188,
        colorStyle: "#8092b0",
        bold: true,
        sqrBox: false,
        lineBox: false,
        lineLoc :1,
        labelText:"Hi",
        cursor: "default",
        fontSize: "1em",
        bgAlpha: .3,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        index:7
    },
    {
        id: "dkColorBar_Time",
        target: "$('.desktop')",
        x:wMain-130,
        y:hCap,
        width: 130,
        height: 33,
        colorStyle: "#000000",
        bold: true,
        sqrBox: false,
        lineBox: true,
        lineLoc :1,
        lineColor:"#00008B",
        labelText:"Hi",
        cursor: "default",
        fontSize: "1em",
        bgAlpha: 0.8,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        index:10
    },
    {
        id: "dkColorBar_d1",
        target: "$('.desktop')",
        x:0,
        y:hCap+hGraph+40,
        width: 332,
        height: hTab,
        colorStyle: "#8092b0",
        bold: true,
        sqrBox: false,
        lineBox: true,
        lineLoc :2,
        labelText:"Hi",
        cursor: "default",
        fontSize: "1em",
        bgAlpha: .3,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    {
        id: "dkColorBar_d2",
        target: "$('.desktop')",
        x:331,
        y:hCap+hGraph+hTab-4,
        width: wMain-331,
        height: hTab,
        colorStyle: "#8092b0",
        bold: true,
        sqrBox: false,
        lineBox: true,
        lineLoc :2,
        labelText:"Hi",
        cursor: "default",
        fontSize: "1em",
        bgAlpha: .2,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        text:""
    },
    {
        id: "dkColorBar_d3",
        target: "$('.desktop')",
        x:333,
        y:hCap+hGraph+40,
        width: wMain-300,
        height: hTab,
        colorStyle: "#8092b0",
        bold: true,
        sqrBox: false,
        lineBox: true,
        lineLoc :2,
        labelText:"Hi",
        cursor: "default",
        fontSize: "1em",
        bgAlpha: .2,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        text:""
    },
    {
        id: "dkColorBar_3",
        target: "$('.desktop')",
        x:5,
        y:hCap+hGraph+ 50,
        width: 80,
        height: 28,
        colorStyle: "#AABBCC",
        bold: true,
        sqrBox: false,
        lineBox: true,
        lineLoc :1,
        lineColor:"#CC00CC",
        labelText:"Hi",
        cursor: "default",
        fontSize: "0.85em",
        bgAlpha: .5,
        paddingTop: 4,
        paddingBottom: 5,
        paddingLeft: 3,
        paddingRight: 2,
        text:"极板电位"
    },
    {
        id: "dkColorBar_4",
        target: "$('.desktop')",
        x:5,
        y:hCap+hGraph+120,
        width: 80,
        height: 28,
        colorStyle: "#AABBCC",
        bold: true,
        sqrBox: false,
        lineBox: true,
        lineLoc :1,
        lineColor:"#CC00CC",
        labelText:"Hi",
        cursor: "default",
        fontSize: "0.85em",
        bgAlpha: 0.5,
        paddingTop: 4,
        paddingBottom: 5,
        paddingLeft: 3,
        paddingRight: 3,
        text:"电压(<i>kV</i>)"
    },
    {
        id: "dkColorBar_5",
        target: "$('.desktop')",
        x:100,
        y:hCap+hGraph+50,
        width: 85,
        height: 28,
        colorStyle: "#AABBCC",
        bold: true,
        sqrBox: false,
        lineBox: true,
        lineLoc :1,
        lineColor:"#CC00CC",
        labelText:"Hi",
        cursor: "default",
        fontSize: "0.85em",
        bgAlpha: .5,
        paddingTop: 4,
        paddingBottom: 5,
        paddingLeft: 2,
        paddingRight: 2,
        text:"长度(<i>cm</i>)"
    },
    {
        id: "dkColorBar_6",
        target: "$('.desktop')",
        x:100,
        y:hCap+hGraph+85,
        width: 85,
        height: 28,
        colorStyle: "#AABBCC",
        bold: true,
        sqrBox: false,
        lineBox: true,
        lineLoc :1,
        lineColor:"#CC00CC",
        labelText:"Hi",
        cursor: "default",
        fontSize: "0.85em",
        bgAlpha: .5,
        paddingTop: 4,
        paddingBottom: 5,
        paddingLeft: 2,
        paddingRight: 2,
        text:"间距(<i>cm</i>)"
    },
    {
        id: "dkColorBar_7",
        target: "$('.desktop')",
        x:5,
        y:hCap+hGraph+155,
        width: 135,
        height: 29,
        colorStyle: "#AABBCC",
        bold: true,
        sqrBox: false,
        lineBox: true,
        lineLoc :1,
        lineColor:"#009900",
        labelText:"Hi",
        cursor: "default",
        fontSize: "0.85em",
        bgAlpha: .5,
        paddingTop: 1,
        paddingBottom: 5,
        paddingLeft: 3,
        paddingRight: 2,
        text:"初速度<i>(10<sup>7</sup>m/s)</i>"
    },
    {
        id: "dkColorBar_8",
        target: "$('.desktop')",
        x:5,
        y:hCap+hGraph+190,
        width: 135,
        height: 28,
        colorStyle: "#AABBCC",
        bold: true,
        sqrBox: false,
        lineBox: true,
        lineLoc :1,
        lineColor:"#009900",
        labelText:"Hi",
        cursor: "default",
        fontSize: "0.85em",
        bgAlpha: .5,
        paddingTop: 4,
        paddingBottom: 5,
        paddingLeft: 3,
        paddingRight: 2,
        text:"初速方向(<i>°</i>)"
    },
    {
        id: "dkColorBar_9",
        target: "$('.desktop')",
        x:5,
        y:hCap+hGraph+225,
        width: 135,
        height: 28,
        colorStyle: "#AABBCC",
        bold: true,
        sqrBox: false,
        lineBox: true,
        lineLoc :1,
        lineColor:"#009900",
        labelText:"Hi",
        cursor: "default",
        fontSize: "0.85em",
        bgAlpha: .5,
        paddingTop: 3,
        paddingBottom: 5,
        paddingLeft: 3,
        paddingRight: 2,
        text:"粒子种类"
    },
    {
        id: "dkColorBar_10",
        target: "$('.desktop')",
        x:335,
        y:hCap+hGraph+175,
        width:682,
        height: 35,
        colorStyle: "#708090",
        bold: true,
        sqrBox: false,
        lineBox: true,
        lineLoc :1,
        lineColor:"#0000CC",
        labelText:"Hi",
        cursor: "default",
        fontSize: "0.85em",
        bgAlpha: .6,
        paddingTop: 6,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        text:"<font color='FFFF99'>速度(<i>m/s</i>)</font>"
    },
    {
        id: "dkColorBar_11",
        target: "$('.desktop')",
        x:335,
        y:hCap+hGraph+132,
        width:682,
        height: 35,
        colorStyle: "#708090",
        bold: true,
        sqrBox: false,
        lineBox: true,
        lineColor:"#CC0000",
        lineLoc :1,
        labelText:"Hi",
        cursor: "default",
        fontSize: "0.85em",
        bgAlpha: 0.6,
        paddingTop: 7,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        text:"<font color='#FFFF99'>位置<i>(m)</i></font>"
    },
    {
        id: "dkColorBar_11",
        target: "$('.desktop')",
        x:737,
        y:hCap+hGraph+89,
        width:280,
        height: 35,
        colorStyle: "#708090",
        bold: true,
        sqrBox: false,
        lineBox: true,
        lineColor:"#009900",
        lineLoc :1,
        labelText:"Hi",
        cursor: "default",
        fontSize: "0.85em",
        bgAlpha: 0.6,
        paddingTop: 7,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        text:""
    }],
	dkCompRadioButton: [{
        target: '$(".desktop")',
        id: "rd_particle",
        selectedIndex: 0,
        padding: 8,
        radioLabelMargin: 3,
        color: "#003300",
        fontSize: "0.85em",
        radioSize:26,
        labelColor: "#000000",
        labelArr: ["<b><font color='#0000CC'>电子</font></b>", "<b><font color='#CC0000'>质子</font></b>","<b><font color='#CC00CC'>离子</font></b>"],
        setXY: ["125:705", "195:705","265:705"],
        verticalAlign: true,
        index: 1
    }],
    dkCompSlider: [
    {
        target: '$(".desktop")',
        id: "slider_be",
        x: 30,
        y: hCap + hGraph + 82,
        width: 22,
        height: 5,
        knobHeight : 22,
        knobWidth : 22,
        horizontal: true,
        min: 0,
        max: 1,
        step: 1,
        value: 1,
        color: "#708090",
        knobColor : "#CC0000",
        knobType : 2,
    },
    {
        target: '$(".desktop")',
        id: "slider_V",
        x: 95,
        y: hCap + hGraph + 117,
        width: 180,
        height: 6,
        knobHeight : 28,
        knobWidth : 9,
        knobType : 0,
        horizontal: true,
        min: 1,
        max: 25,
        step: 1,
        value: 3,
        color: "#9900CC",
        knobColor : "#990099",
        index: 9,
        attechedLabel:"13",
        labelWidth:40,
        labelHeight:26,
        labelBkColor : "#990099",
        labelText:"113",
        labelTextColor:"#FFFFFF"
    },
    {
        target: '$(".desktop")',
        id: "slider_L",
        x: 195,
        y: hCap + hGraph + 48,
        width: 80,
        height: 6,
        knobHeight : 28,
        knobWidth : 9,
        knobType : 0,
        horizontal: true,
        min: 10,
        max: 30,
        step: 1,
        value: 20,
        color: "#9900CC",
        knobColor : "#990099",
        index: 9,
        attechedLabel:"13",
        labelWidth:40,
        labelHeight:26,
        labelBkColor : "#990099",
        labelText:"113",
        labelTextColor:"#FFFFFF"
    },
    {
        target: '$(".desktop")',
        id: "slider_d",
        x: 195,
        y: hCap + hGraph + 84,
        width: 80,
        height: 6,
        knobHeight : 28,
        knobWidth : 9,
        knobType : 0,
        horizontal: true,
        min: 5,
        max: 15,
        step: 1,
        value: 10,
        color: "#9900CC",
        knobColor : "#990099",
        index: 9,
        attechedLabel:"13",
        labelWidth:40,
        labelHeight:26,
        labelBkColor : "#990099",
        labelText:"113",
        labelTextColor:"#FFFFFF"
    },
    {
        target: '$(".desktop")',
        id: "slider_v0",
        x: 155,
        y: hCap + hGraph + 155,
        width: 120,
        height: 6,
        knobHeight : 30,
        knobWidth : 8,
        knobType : 0,
        horizontal: true,
        min: 1,
        max: 10,
        step: 0.1,
        value: 6,
        color: "#336666",
        knobColor : "#55AA66",
        index: 9,
        attechedLabel:"13",
        labelWidth:40,
        labelHeight:26,
        labelBkColor : "#55AA66",
        labelText:"113",
        labelTextColor:"#FFFFFF"
    },
    {
        target: '$(".desktop")',
        id: "slider_va",
        x: 155,
        y: hCap + hGraph + 187,
        width: 120,
        height: 6,
        knobHeight : 30,
        knobWidth : 9,
        knobType : 0,
        horizontal: true,
        min: -30,
        max: 30,
        step: 1,
        value: 0,
        color: "#336666",
        knobColor : "#55AA66",
        index: 9,
        attechedLabel:"13",
        labelWidth:40,
        labelHeight:26,
        labelBkColor : "#55AA66",
        labelText:"113",
        labelTextColor:"#FFFFFF"
    },
    {
        target: '$(".desktop")',
        id: "slider_speed",
        x: 747,
        y: hCap + hGraph + 4,
        width: 63,
        height: 6,
        knobHeight : 25,
        knobWidth : 25,
        horizontal: true,
        knobType : 2,
        min: 0.25,
        max: 1,
        step: 0.25,
        value: 1,
        color: "#AAAAAA",
        index: 10
    },
    {
        target: '$(".desktop")',
        id: "slider_zoom",
        x: 565,
        y: hCap + hGraph + 4,
        width: 50,
        height: 6,
        knobHeight : 25,
        knobWidth : 25,
        horizontal: true,
        knobType : 2,
        min: 1,
        max: 2,
        step: 1,
        value: 1,
        color: "#AAAAAA",
        index: 10
    },
    {
        target: '$(".desktop")',
        id: "slider_pe",
        x: 390,
        y: hMain-37,
        width: 22,
        height: 5,
        knobHeight : 22,
        knobWidth : 22,
        horizontal: true,
        min: 0,
        max: 1,
        step: 1,
        value: 1,
        color: "#708090",
        knobColor : "#CC0000",
        knobType : 2,
    },
    {
        target: '$(".desktop")',
        id: "slider_pee",
        x: 580,
        y: hMain-37,
        width: 60,
        height: 6,
        knobHeight : 28,
        knobWidth : 9,
        knobType : 0,
        horizontal: true,
        min: 1,
        max: 10,
        step: 1,
        value: 1,
        color: "#708090",
        knobColor : "#55AA66",
        index: 9,
        attechedLabel:"13",
        labelWidth:38,
        labelHeight:26,
        labelBkColor : "#55AA66",
        labelText:"113",
        labelTextColor:"#FFFFFF"
    },
    {
        target: '$(".desktop")',
        id: "slider_pem",
        x: 870,
        y: hMain-37,
        width: 60,
        height: 6,
        knobHeight : 28,
        knobWidth : 9,
        knobType : 0,
        horizontal: true,
        min: 1,
        max: 10,
        step: 1,
        value: 1,
        color: "#708090",
        knobColor : "#55AA66",
        index: 9,
        attechedLabel:"13",
        labelWidth:38,
        labelHeight:26,
        labelBkColor : "#55AA66",
        labelText:"113",
        labelTextColor:"#FFFFFF"
    }],
    dkCompCheckBox: [{
        id: "checkBox_grid",
        target: "$('.desktop')",
        checked: false,
        label: "<b>网格</b>",
        labelColor: "#777777",
        x: wMain-70,
        y: hCap + hGraph -42,
        width: 100,
        checkSize : 1,
        checkColor : "#777777",
        checkType :1,
        fontSize: "0.85em",
        title: "",
        index:13
    },
    {
    	id: "checkBox_vt",
        target: "$('.desktop')",
        checked: false,
        label: "<b><font color='#5599FF'><i>v<sub>x</sub>-t</font><br><font color='#0000CC'>v<sub>y</sub>-t</i></font></b>",
        labelColor: "#5599FF",
        x: wMain-70,
        y: hCap + 190,
        width: 110,
        checkSize : 1,
        checkColor : "#5599FF",
        checkType :1,
        fontSize: "0.75em",
        title: "",
        index:13
    },
    {
        id: "checkBox_st",
        target: "$('.desktop')",
        checked: false,
        label: "<b><font color='#FF7744'><i>s<sub>x</sub>-t</font><br><font color='#CC0000'>s<sub>y</sub>-t</i></font></b>",
        labelColor: "#FF7744",
        x: wMain-70,
        y: hCap + 240,
        width: 100,
        checkSize : 1,
        checkColor : "#FF7744",
        checkType :1,
        fontSize: "0.85em",
        title: "",
        index:13
    },
	{
        id: "checkBox_2",
        target: "$('.desktop')",
        checked: true,
        label: "<b>显示轨迹</b>",
        labelColor: "#444444",
        x: 345,
        y: hCap + hGraph  + 52,
        width: 100,
        checkSize : 1,
        checkColor : "#778899",
        checkType :1,
        fontSize: "0.9em",
        title: "",
        index:3,
    },
	{
        id: "checkBox_3",
        target: "$('.desktop')",
        checked: false,
        label: "<b>频闪痕迹</b>",
        labelColor: "#444444",
        x: 465,
        y: hCap + hGraph  + 52,
        width: 100,
        checkSize : 1,
        checkColor : "#778899",
        checkType :1,
        fontSize: "0.9em",
        title: "",
        index:3
    },
	{
        id: "checkBox_10",
        target: "$('.desktop')",
        checked: false,
        label: "<b>前次轨迹</b>",
        labelColor: "#444444",
        x: 585,
        y: hCap + hGraph  + 52,
        width: 100,
        checkSize : 1,
        checkColor : "#778899",
        checkType :1,
        fontSize: "0.9em",
        title: "",
        index:3
    },
	{
        id: "checkBox_4",
        target: "$('.desktop')",
        checked: false,
        label: "<b>受力方向</b>",
        labelColor: "#444444",
        x: 705,
        y: hCap + hGraph  + 52,
        width: 100,
        checkSize : 1,
        checkColor : "#55AA00",
        checkType :1,
        fontSize: "0.9em",
        title: "",
        index:3
    },
	{
        id: "checkBox_5",
        target: "$('.desktop')",
        checked: false,
        label: "<b>出射反向延长线</b>",
        labelColor: "#444444",
        x: 820,
        y: hCap + hGraph  + 52,
        width: 100,
        checkSize : 1,
        checkColor : "#55AA00",
        checkType :1,
        fontSize: "0.9em",
        title: "",
        index:3
    },
	{
        id: "checkBox_6",
        target: "$('.desktop')",
        checked: false,
        label: "<b>位移</b>",
        labelColor: "#444444",
        x: 345,
        y: hCap + hGraph  + 92,
        width: 100,
        checkSize : 1,
        checkColor : "#FF3333",
        checkType :1,
        fontSize: "0.9em",
        title: "",
        index:3
    },
	{
        id: "checkBox_7",
        target: "$('.desktop')",
        checked: false,
        label: "<b>位移分解</b>",
        labelColor: "#444444",
        x: 425,
        y: hCap + hGraph  + 92,
        width: 100,
        checkSize : 1,
        checkColor : "#FF3333",
        checkType :1,
        fontSize: "0.9em",
        title: "",
        index:3
    },
	{
        id: "checkBox_8",
        target: "$('.desktop')",
        checked: false,
        label: "<b>速度</b>",
        labelColor: "#444444",
        x: 545,
        y: hCap + hGraph  + 92,
        checked:true,
        width: 100,
        checkSize : 1,
        checkColor : "#0000AA",
        checkType :1,
        fontSize: "0.9em",
        title: "",
        index:3
    },
	{
        id: "checkBox_9",
        target: "$('.desktop')",
        checked: false,
        label: "<b>速度分解</b>",
        labelColor: "#444444",
        x: 625,
        y: hCap + hGraph  + 92,
        width: 100,
        checkSize : 1,
        checkColor : "#0000AA",
        checkType :1,
        fontSize: "0.9em",
        title: "",
        index:3
    },
	{
        id: "cb_v",
        target: "$('.desktop')",
        checked: true,
        label: "<b><i>v</i></b>",
        labelColor: "#222222",
        x: 435,
        y: hCap + hGraph + 180,
        width: 100,
        checkSize : 1,
        checkColor : "#0000AA",
        checkType :1,
        fontSize: "0.85em",
        title: "",
        index:3,
        attechedLabel:"13",
        labelWidth:60,
        labelHeight:28,
        labelBkColor : "",
        labelText:"113",
        labelTextColor:"#FFFFFF",
    },
    {
        id: "cb_vx",
        target: "$('.desktop')",
        checked: true,
        label: "<b><i>v<sub>x</sub></i></b>",
        labelColor: "#222222",
        x: 575,
        y: hCap + hGraph + 180,
        width: 100,
        checkSize : 1,
        checkColor : "#0000AA",
        checkType :1,
        fontSize: "0.85em",
        title: "",
        index:3,
        attechedLabel:"13",
        labelWidth:60,
        labelHeight:28,
        labelBkColor : "",
        labelText:"113",
        labelTextColor:"#FFFFFF",
    },
    {
        id: "cb_vy",
        target: "$('.desktop')",
        checked: true,
        label: "<b><i>v<sub>y</sub></i></b>",
        labelColor: "#222222",
        x: 720,
        y: hCap + hGraph + 180,
        width: 100,
        checkSize : 1,
        checkColor : "#0000AA",
        checkType :1,
        fontSize: "0.85em",
        title: "",
        index:3,
        attechedLabel:"13",
        labelWidth:60,
        labelHeight:28,
        labelBkColor : "",
        labelText:"113",
        labelTextColor:"#FFFFFF",
    },
    {
        id: "cb_va",
        target: "$('.desktop')",
        checked: true,
        label: "<b>方向</b>(°)",
        labelColor: "#444444",
        x: 865,
        y: hCap + hGraph + 180,
        width: 100,
        checkSize : 1,
        checkColor : "#0000AA",
        checkType :1,
        fontSize: "0.85em",
        title: "",
        index:3,
        attechedLabel:"13",
        labelWidth:60,
        labelHeight:28,
        labelBkColor : "",
        labelText:"113",
        labelTextColor:"#FFFFFF",
    },
    {
        id: "cb_x",
        target: "$('.desktop')",
        checked: true,
        label: "<b><i>x</i></b>",
        labelColor: "#222222",
        x: 435,
        y: hCap + hGraph + 136,
        width: 100,
        checkSize : 1,
        checkColor : "#FF3333",
        checkType :1,
        fontSize: "0.85em",
        title: "",
        index:3,
        attechedLabel:"13",
        labelWidth:60,
        labelHeight:28,
        labelBkColor : "",
        labelText:"113",
        labelTextColor:"#FFFFFF",
    },
    {
        id: "cb_y",
        target: "$('.desktop')",
        checked: true,
        label: "<b><i>y</i></b>",
        labelColor: "#222222",
        x: 575,
        y: hCap + hGraph + 136,
        width: 100,
        checkSize : 1,
        checkColor : "#FF3333",
        checkType :1,
        fontSize: "0.85em",
        title: "",
        index:3,
        attechedLabel:"13",
        labelWidth:60,
        labelHeight:28,
        labelBkColor : "",
        labelText:"113",
        labelTextColor:"#FFFFFF",
    },
    {
        id: "cb_F",
        target: "$('.desktop')",
        checked: true,
        label: "<b>力<i>(N)</i></b>",
        labelColor: "#FFFF99",
        x: 745,
        y: hCap + hGraph + 136,
        width: 60,
        checkSize : 1,
        checkColor : "#006600",
        checkType :1,
        fontSize: "0.85em",
        title: "",
        index:3,
        attechedLabel:"13",
        labelWidth:120,
        labelHeight:28,
        labelBkColor : "",
        labelText:"113",
        labelTextColor:"#FFFFFF",
    },
    {
        id: "cb_acc",
        target: "$('.desktop')",
        checked: true,
        label: "<b>加速度<i>(Nm/s<sup>2</sup>)</i></b>",
        labelColor: "#FFFF99",
        x: 745,
        y: hCap + hGraph + 93,
        width: 100,
        checkSize : 1,
        checkColor : "#006600",
        checkType :1,
        fontSize: "0.85em",
        title: "",
        index:3,
        attechedLabel:"13",
        labelWidth:60,
        labelHeight:28,
        labelBkColor : "",
        labelText:"113",
        labelTextColor:"#FFFFFF",
    },
    {
        id: "cb_playBack",
        target: "$('.desktop')",
        checked: false,
        label: "<b>回放</b>",
        labelColor: "#222222",
        x: 390,
        y: hCap + hGraph + 6,
        width: 70,
        checkSize : 1,
        checkColor : "#990099",
        checkType :1,
        fontSize: "0.85em",
        title: "",
        index:13
    }],
    dkTracePad: [{
        id: "tracePad",
        target: '$(".desktop")',
        x: 0,
        y: hCap,
        width: wMain,
        height: hGraph,
        index: 6
    }],
    dkCompCordGraph: [{
        id: "graphComp",
        target: '$(".desktop")',
        gridBgColor: "#FFFFF5",
        bgColor: "#FFFFF5",
        x: 0,
        y: hCap+0,
        width: wMain,
        height: hGraph,
        arrowXR: true,
        arrowYU: true,
        labelY: "<i>y/m</i>",
        labelX: "<i>x/m</i>",
        marginLeft:30,
        marginTop: 0,
        marginRight: 110,
        marginBottom: 20,
        leastCountX: 1800,
        leastCountY: 1800,
        labelIntervalX: 0.05,
        labelIntervalY: 0.05,
        unitX: 1,
        unitY: 1,
        borderStyle: "",
        bgShadow: "",
        gridBgShadow: "0 0 10 rgba(0,0,0,0)",
        updateOnDrag: true,
        panX: false,
        panY: false,
        majorIntervalX: 0.05,
        majorIntervalY: 0.05,
        minorIntervalX: 0.01,
        minorIntervalY: 0.01,
        oxReg: "center",
        oyReg: "center",
        xRegOffset:-2.1,
        probeVisible: true,
        probePaddingTop: 5,
        probePaddingBottom: 5,
        probeColor:"#0066FF",
        title: "pe",
        index: 6,
        decimal: 2,
        axisWidth: 2,
     	gridBigWidth:1,
     	gridSmallWidth:1,
		dashedAxisLen:10,
		gridYVisible:false,
        gridXVisible:false,
        drawScaleY:true,
        drawScaleX:true,
    },
    {
        id: "graph_vt",
        target: '$(".desktop")',
        gridBgColor: "#EEFFEE",
        gridBgColor: "transparent",
        bgColor: "transparent",
        x: wMain-400,
        y: hCap+40,
        labelX: "<font size='3px' color='blue'><i>t(10<sup>-9</sup>s)</i></font>",
        labelY: "<font size='3px' color='blue'><i>v(10<sup>7</sup>m/s)</i></font>",
        width: 305,
        height: 190,
        marginLeft: 6,
        marginTop: 2,
        marginRight: 2,
        marginBottom: 6,
        leastCountX: 12,
        leastCountY: 7.5,
        labelIntervalX: 10,
        labelIntervalY: 10,
        unitX: 1,
        unitY: 1,
        borderStyle: "",
        bgShadow: "0px 0px 20px rgba(0,0,0,0)",
        gridBgShadow: "0 0 10 rgba(0,0,0,0)",
        probeVisible: false,
        provePoint: 0,
        updateOnDrag: true,
        panX: false,
        panY: false,
        majorIntervalX: 10,
        majorIntervalY: 10,
        minorIntervalX: 2,
        minorIntervalY: 2,
        oxReg: "left",
        oyReg: "center",
        zoomX: false,
        zoomY: false,
        zoomFromCenterX: false,
        zoomFromCenterY: false,
        probePaddingTop: 9,
        probePaddingBottom: 9,
        drawQuads: 0,
        probeSnap: true,
        title: "vt",
        dotSize: 8,
        index:6,
        arrowYU :true,
       	arrowXR : true,
        gridXYMinorColor:"#AAAAAA",
        labelStyleXYSize:"13px",
     	axisWidth:2,
     	gridBigWidth:1.5,
     	gridSmallWidth:1,
		dashedAxisLen:7,
		scaleLoc:0,
		gridYVisible:false,
        gridXVisible:false,
        drawScaleY:true,
        drawScaleX:true,
    },
    {
        id: "graph_st",
        target: '$(".desktop")',
        gridBgColor: "#EEFFEE",
        gridBgColor: "transparent",
        bgColor: "transparent",
        x: wMain-400,
        y: hCap+235,
        labelX: "<font size='3px' color='#FF7744'><i>t(10<sup>-9</sup>s)</i></font>",
        labelY: "<font size='3px' color='#FF7744'><i>s(m)</i></font>",
        width: 305,
        height: 190,
        marginLeft: 6,
        marginTop: 2,
        marginRight: 2,
        marginBottom: 6,
        leastCountX: 10,
        leastCountY: 800,
        labelIntervalX: 10,
        labelIntervalY: 1,
        unitX: 1,
        unitY: 1,
        borderStyle: "",
        bgShadow: "0px 0px 20px rgba(0,0,0,0)",
        gridBgShadow: "0 0 10 rgba(0,0,0,0)",
        probeVisible: false,
        provePoint: 0,
        updateOnDrag: true,
        panX: false,
        panY: false,
        majorIntervalX: 10,
        majorIntervalY: 0.1,
        minorIntervalX: 2,
        minorIntervalY: 0.05,
        oxReg: "left",
        oyReg: "center",
        zoomX: false,
        zoomY: false,
        zoomFromCenterX: false,
        zoomFromCenterY: false,
        probePaddingTop: 9,
        probePaddingBottom: 9,
        drawQuads: 0,
        probeSnap: true,
        title: "vt",
        dotSize: 8,
        index:6,
        arrowYU :true,
       	arrowXR : true,
        gridXYMinorColor:"#AAAAAA",
        labelStyleXYSize:"13px",
     	axisWidth:2,
     	gridBigWidth:1.5,
     	gridSmallWidth:1,
		dashedAxisLen:7,
		scaleLoc:0,
		gridYVisible:false,
        gridXVisible:false,
        drawScaleY:true,
        drawScaleX:true,
    }
    ],
    dkCompTable: [{
        id: "tableComp",
        target: '$(".desktop")',
        x: 0,
        y: hCap + hGraph +40,
        width: wMain,
        height: hTab-10,
        maxRows: 5,
        scrollerWidth: 10,
        scrollerHandleWidth: 10,
        scrollerDisplay: false,
        fontSize: "0.75em",
        emdash: false,
        headingAlign: "center",
        bodyAlign: "center",
        showHeader: true,
        borderWidth: 1,
        decimalAlign: false,
        refreshScroller: true,
        nanDecimalAlign: false,
        visible :true,
        index: 10,
        selectedMode:1,
        selectedColor:"#FFFFFF",
        cols: [
        {
            label: "<b>#</b>",
            bg: "#EEEEF5",
            border: "0.1em solid #C0C9D8",
            width: 3.3
        },
        {
            label: "<font color='#CD853F'>极板电位</font>",
            bg: "#EEEEF5",
            border: "0.1em solid #C0C9D8",
            width: 7.2
        },
        {
            label: "<font color='#CD853F'>长度(<i>m</i>)</font>",
            bg: "#EEEEF5",
            border: "0.1em solid #C0C9D8",
            width: 7
        },
        {
            label: "<font color='#CD853F'>间距(<i>m</i>)</font>",
            bg: "#EEEEF5",
            border: "0.1em solid #C0C9D8",
            width: 7
        },
        {
            label: "<font color='#CD853F'>电压(<i>kV</i>)</font>",
            bg: "#EEEEF5",
            border: "0.1em solid #C0C9D8",
            width: 7
        },
        {
            label: "<font color='#007700'>粒子质量(<i>kg</i>)</font>",
            bg: "#EEEEF5",
            border: "0.1em solid #C0C9D8",
            width: 7.2
        },
        {
            label: "<font color='#007700'>电量<br>(<i>C</i>)</font>",
            bg: "#EEEEF5",
            border: "0.1em solid #C0C9D8",
            width: 7
        },
        {
            label: "<font color='#007700'>初速度(<i>m/s</i>)</font>",
            bg: "#EEEEF5",
            border: "0.1em solid #C0C9D8",
            width: 7
        },
        {
            label: "<font color='#007700'>初角度<br>(<i>°</i>)</font>",
            bg: "#EEEEF5",
            border: "0.1em solid #C0C9D8",
            width: 7
        },
        {
            label: "<font color='#FF0000'>穿越<i>Y</i> /<br>落板<i>N</i></font>",
            bg: "#EEEEF5",
            border: "0.1em solid #C0C9D8",
            width: 7.2
        },
        {
            label: "<font color='#800080'>时间<br>(<i>s</i>)</font>",
            bg: "#EEEEF5",
            border: "0.1em solid #C0C9D8",
            width: 7.4
        },
        {
            label: "<font color='#800080'>x坐标<br>(<i>cm</i>)</font>",
            bg: "#EEEEF5",
            border: "0.1em solid #C0C9D8",
            width: 6.9
        },
        {
            label: "<font color='#800080'>y坐标<br>(<i>cm</i>)</font>",
            bg: "#EEEEF5",
            border: "0.1em solid #C0C9D8",
            width: 6.9
        },
        {
            label: "<font color='#800080'>速度<br>(<i>m/s</i>)</font>",
            bg: "#EEEEF5",
            border: "0.1em solid #C0C9D8",
            width: 7
        },
        {
            label: "<font color='#800080'>角度<br>(<i>°</i>)</font>",
            bg: "#EEEEF5",
            border: "0.1em solid #C0C9D8",
            width: 7
        }],
    }],
    dkCompPlayButton: [{
        id: "activitySystemControl",
        target: '$(".desktop")',
        x: 870,
        y: hCap+hGraph-1,
        showButtons: ["play", "pause", "reset"],
        index: 2,
        plainType:true,
        plainColor:"#0000AA",
        plainShape:0
    }]
};

var animJson = {
    canvasGraph: [{
        id: "canvasGraphObj",
        target: "$('.desktop')",
        x: 0,
        y: hCap,
        width: wMain,
        height: hGraph-20,
        index: 6
    }]
 };


var particleinEfieldClass = function() {
    var frameObj;
    var animObj;
	var isPlaying = false;
	var isPaused = false;
	var demoSpeed = 0.000000005;
	var totalP;
	var maxX,maxY;
 	var mapX,mapY;
 	var xScale,yScale;
	var timer;
 	var	pt,pt1,pt2;
	var t0;
	var dt;
	var olddt;
 	var rt;
 	var tMax = 0.0005;
 	var tableN = 0;
 	var tableMax=5;
 	var curRow = 0;
 	var oldRow = -1;
	var zoomLevel = 1;
	var graphModel = 0;
	var oldModel = -1;
	var isPlayback = false;
	var showGrid = false;
	var showSt = false;
	var showVt = false;
	var showPath = true;
	var showFlash = false;
	var showForce = false;
	var showBackExt = false;
	var showHigh = false;
	var showDisp = false;
	var showDispDec = false;
	var showVelo = true;
	var showVeloDec = false;
	var showOld = false;
	var showRuning = [true,true,true,true];
	var showVelocity = [true,true,true,true];

	function ballObj(name){
		this.m  = 0.000000000000000000000000000000928;
		this.q  = -0.00000000000000000016;
		this.x0 = 0;
		this.y0 = 0;
		this.v0 = 60000000;
		this.va = 0;
		this.x  = 0;
		this.y  = 0;
		this.s  = 0;
		this.sang = 0;
		this.v  = 0;
		this.vx = 0;
		this.vy = 0;
		this.vang  = 0;
		this.a  =  0;
		this.t  =  0;
		this.tp = 0;
		this.tend = 0;
		this.ox = 0;
		this.oy = 0;
		this.ot = 0;
		this.ov = 0;
		this.ova =0;
		this.r  = 6.5,
		this.color =  "#0000CC";
		this.colorp =  "#CC0000";
		this.name = name;
		this.pL = 0.2;
		this.pd = 0.1;
		this.pU =3000;
		this.pe =1;
		this.nt =0;
	}
	var ball1 = new ballObj("Now");
	var ballOld = new ballObj("Old");
	var ballTab = new ballObj("");
	var ballPath = [];
	var ballPathOld = [];
	var ballPathTab = [];
 	this.init = function() {
        frameObj = new FrameClass;
        animObj = new AnimClass;
		frameObj.checkBox_grid.addEventListener("change", checkBoxEvents);
		frameObj.checkBox_vt.addEventListener("change", checkBoxEvents);
		frameObj.checkBox_st.addEventListener("change", checkBoxEvents);
        frameObj.checkBox_2.addEventListener("change", checkBoxEvents);
        frameObj.checkBox_3.addEventListener("change", checkBoxEvents);
		frameObj.checkBox_4.addEventListener("change", checkBoxEvents);
        frameObj.checkBox_5.addEventListener("change", checkBoxEvents);
        frameObj.checkBox_6.addEventListener("change", checkBoxEvents);
		frameObj.checkBox_7.addEventListener("change", checkBoxEvents);
        frameObj.checkBox_8.addEventListener("change", checkBoxEvents);
        frameObj.checkBox_9.addEventListener("change", checkBoxEvents);
        frameObj.checkBox_10.addEventListener("change", checkBoxEvents);
        frameObj.cb_v.addEventListener("change", checkBoxEvents);
        frameObj.cb_vx.addEventListener("change", checkBoxEvents);
        frameObj.cb_vy.addEventListener("change", checkBoxEvents);
        frameObj.cb_va.addEventListener("change", checkBoxEvents);
        frameObj.cb_x.addEventListener("change", checkBoxEvents);
        frameObj.cb_y.addEventListener("change", checkBoxEvents);
        frameObj.cb_F.addEventListener("change", checkBoxEvents);
        frameObj.cb_acc.addEventListener("change", checkBoxEvents);
        frameObj.cb_playBack.addEventListener("change", checkBoxEvents);
        frameObj.tableComp.addEventListener("change", tableEvent);
        frameObj.msgBox.addEventListener("click", msgBox);
        frameObj.rd_particle.addEventListener("onRdSelect", radioEvent);
		frameObj.slider_pe.addEventListener("slide", sliderEvents);
		frameObj.slider_pee.addEventListener("slide", sliderEvents);
		frameObj.slider_pem.addEventListener("slide", sliderEvents);
		frameObj.slider_v0.addEventListener("slide", sliderEvents);
		frameObj.slider_va.addEventListener("slide", sliderEvents);
		frameObj.slider_L.addEventListener("slide", sliderEvents);
		frameObj.slider_d.addEventListener("slide", sliderEvents);
		frameObj.slider_V.addEventListener("slide", sliderEvents);
		frameObj.slider_be.addEventListener("slide", sliderEvents);
		frameObj.slider_zoom.addEventListener("slide", sliderEvents);
		frameObj.slider_speed.addEventListener("slide", sliderEvents);
		frameObj.tabComp.addEventListener("change", tabEvent);
        frameObj.tracePad.addEventListener("mouseEvent", tracePadEvent1);
        frameObj.activitySystemControl.addEventListener("click", systemControlEvent);
        frameObj.graphComp.addEventListener("onProveChange", graphEvents);
		d_initData();
    };
	function d_initData(){
		t0 = 0;
		rt = 0;
		dt = 0;
		olddt = 0;
		pt1 = pt2 = pt = 0;
		var p2 = frameObj.graphComp.getPointToPixel(0.48,0.1,false);
		var p1 = frameObj.graphComp.getPointToPixel(0,0,false);
		totalP = Math.round(p2.x-p1.x)+1;
		xScale = (p2.x-p1.x)/0.48;
		yScale = (p1.y-p2.y)/0.1;
		mapX = p1.x;
		mapY = p1.y;
		maxX = p2.x;
		maxY = p2.y;
		oldModel = -1;
		showTab1(true);
		frameObj.tableComp.clearData();
		frameObj.activitySystemControl.setDisable("pause");
		frameObj.activitySystemControl.setDisable("reset");
		frameObj.checkBox_7.disable();
  		frameObj.dkColorBar_vt.hide();
  		frameObj.graph_vt.hide();
  		frameObj.dkColorBar_st.hide();
  		frameObj.graph_st.hide();
 		frameObj.slider_pe.disable();
 		frameObj.slider_pee.disable();
 		frameObj.slider_pem.disable();
  		frameObj.graphComp.proveShow(false);
  		frameObj.txt_result.hide();
		for (var i=0;i <15; i ++ ){
			frameObj.tableComp.setCellStyle(-1,i,{background:"#D9DEE7"	});
		}
		showRuningData();
		cacuRuningConst(ball1);
		animObj.canvasGraphObj.setSwitches(showPath,showOld,showFlash,showForce,showBackExt,showDisp,showDispDec,showVelo,showVeloDec,showVt,showSt);
		animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale, yScale,mapX,mapY,maxX,maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
	}
	function cacuRuningConst(ball){
		if (graphModel==0 || graphModel==2){
			ball.a = (ball1.pe==1? -1:1)*ball.pU*ball.q/(ball.pd*ball.m);
			var _t = ball.pL/(ball.v0*Math.cos(ball.va*Math.PI/180));
			var _s = ball.v0*Math.sin(ball.va*Math.PI/180)*_t+ball.a*_t*_t/2;
			//穿过极板
			if ( Math.abs(_s) < ball.pd/2) {
				ball.tend = ((maxX-mapX)/xScale)/(ball.v0*Math.cos(ball.va*Math.PI/180));
				ball.ot = _t;
				ball.ox = ball.pL;
				ball.oy = _s;
				var _vx = ball.v0*Math.cos(ball.va*Math.PI/180);
				var _vy = ball.v0*Math.sin(ball.va*Math.PI/180)+ball.a*_t;
				ball.ov = Math.sqrt( Math.pow(_vx,2)+Math.pow(_vy,2));
				ball.ova = Math.atan(_vy/_vx)*180/Math.PI;
				ball.tp=0;
			}else{

				var _t1,_t2;
				var _dt1 = Math.pow(ball.v0*Math.sin(ball.va*Math.PI/180),2)+ball.a*ball.pd;
				var _dt2 = Math.pow(ball.v0*Math.sin(ball.va*Math.PI/180),2)-ball.a*ball.pd;
				if (_dt1>0){
					var _t1a = ( Math.sqrt(_dt1)-ball.v0*Math.sin(ball.va*Math.PI/180))/ball.a;
					var _t1b = (-Math.sqrt(_dt1)-ball.v0*Math.sin(ball.va*Math.PI/180))/ball.a;
					_t1 = _t1a>0? _t1a: _t1b;
				}else{
					_t1 = -1;
				}
				if (_dt2>0){
					var _t2a = ( Math.sqrt(_dt2)-ball.v0*Math.sin(ball.va*Math.PI/180))/ball.a;
					var _t2b = (-Math.sqrt(_dt2)-ball.v0*Math.sin(ball.va*Math.PI/180))/ball.a;
					_t2 = _t2a>0? _t2a: _t2b;
				}else{
					_t2 = -1;
				}
				if ( _t1>0 && _t2>0){
					_t = Math.min(_t1,_t2);
				}else if (_t1>0){
					_t = _t1;
				}else if (_t2>0){
					_t = _t2;
				}
				ball.ox = ball.v0*Math.cos(ball.va*Math.PI/180)*_t;
				ball.tp = _t;
				ball.tend = _t;
			}

		}else if (graphModel==1){

			ball.a = (ball1.pe==1? 1:-1)*ball.pU*ball.q/(ball.pd*ball.m);
			ball.va = 0;
			var _t = (Math.sqrt(Math.pow(ball.v0,2)+2*ball.a*ball.pd)-ball.v0)/ball.a;
			ball.ot = _t;
			ball.ox = ball.pd;
			ball.oy = 0;
			ball.ov = ball.v0+ball.a*_t;
			ball.ova = 0;
			ball.tend = _t+ ((maxX-mapX)/xScale-ball.pd)/ball.ov;
		}
	}
    function cacuRuningPath( ball ){
    	var _vx,_vy,_v,_vang,_x,_y;
    	var totoalP = maxX-mapX+1;
    	mapX = Math.round(mapX);
   		if (ball.tend==0){
   			return 0;
   		}
   		var bPath = [];
   		var _maxt = ball.tend;
   		var _maxDis = Math.round( ball.v0*Math.cos(ball.va*Math.PI/180)*_maxt*xScale );
   		var _maxPts = _maxDis < totoalP?  _maxDis : totoalP;
   		var _tflashed = 0;
		var _flash = false;
		for (var i=0; i < _maxPts; i++){
    		var _dt = i*_maxt/_maxDis;
    		if ( _dt>=ball.ot && ball.ot>0 ){
	 			_vx = ball.v0*Math.cos(ball.va*Math.PI/180);
				_vy = ball.ov*Math.sin(ball.ova*Math.PI/180);
				_v = ball.ov;
				_vang = ball.ova;
				_x = i;
				_y = ball.oy + _vy*(_dt-ball.ot);
    		}else{
	 			_vx = ball.v0*Math.cos(ball.va*Math.PI/180);
				_vy = ball.v0*Math.sin(ball.va*Math.PI/180) + ball.a*_dt;
				_v = Math.sqrt(Math.pow(_vx,2)+Math.pow(_vy,2));
				_vang = Math.atan(_vy/_vx)*180/Math.PI;
				_x = i;
				_y = ball.v0*Math.sin(ball.va*Math.PI/180)*_dt + ball.a*Math.pow(_dt,2)/2 ;
    		}
			if (_dt>_tflashed){
				_flash = true;
				_tflashed += (maxX-mapX)/xScale/(ball.v0*Math.cos(ball.va*Math.PI/180)*13);
			}else{
				_flash = false;
			}
 			var ps={
    			x: mapX + _x,
    			y: mapY - _y*yScale,
    			vx: _vx,
    			vy: _vy,
    			v : _v,
    			vang : _vang,
    			checked: false,
    			flashed: _flash
    		}
    		bPath.push(ps)
    	}
    	return bPath;
    }
	function num2e(num,fixed){
		if (num==0){
			return "";
		}
		var isNegative = false;
		if (num<0){
			isNegative = true;
			num = -num;
		}
	    var p = Math.floor(Math.log(num)/Math.LN10);
    	var n = num * Math.pow(10, -p);
    	var f = (fixed==undefined)? 2 :fixed;
    	var str = n.toFixed(f) + 'x10<sup>' + p + '</sup>'
    	if (isNegative==true) str = "-"+str;
		return str;
	}
	function num_2e(num,fixed){
		if (num==0){
			return "";
		}
		var isNegative = false;
		if (num<0){
			isNegative = true;
			num = -num;
		}
	    var p = Math.floor(Math.log(num)/Math.LN10);
    	var n = num * Math.pow(10, -p);
    	var f = (fixed==undefined)? 2 :fixed;
    	var str = n.toFixed(f) + 'e' + p;
    	if (isNegative==true) str = "-"+str;
		return str;
	}
	var vtArr = new Array;
    function showGraphVt(ball,dt) {
   		frameObj.graph_vt.cleanAll();
    	if (ball.name==""){
    		return;
    	}
        var minVy=maxVy=0;
        var px=py1=py2=-1;
        var vx,vy;
        vtArr = [];
        for (var i = 0; i < 2; i ++ ){
        	vtArr[i] = new Array;
        }
        var _tend = ball.tend*1000000000;
        for ( i=0; i<=_tend; i+=0.1){
        	if (graphModel==0||graphModel==2){
		       	vx = ball.v0*0.0000001*Math.cos(ball.va*Math.PI/180);
		       	if (ball.tp==0){
		       		if (i<ball.ot*1000000000){
			        	vy = ball.v0*0.0000001*Math.sin(ball.va*Math.PI/180) + (ball.a*i/1000000000)*0.0000001;
		       		}else{
			        	vy = ball.ov*0.0000001*Math.sin(ball.ova*Math.PI/180);
		       		}
		       	}else{
		        	vy = ball.v0*0.0000001*Math.sin(ball.va*Math.PI/180) + (ball.a*i/1000000000)*0.0000001;
		       	}
        	}else if (graphModel==1){
		       	vy = 0;
		       	if (i<ball.ot*1000000000){
			       	vx = ball.v0*0.0000001 + (ball.a*i/1000000000)*0.0000001;
		       	}else{
			       	vx = ball.ov*0.0000001;
		       	}
        	}
        	if (vy>maxVy){
        		maxVy = vy
        	}else if (vy<minVy){
        		minVy = vy
        	}
        	vtArr[0].push({
	            x: i,
	            y: vx
	        });
	        vtArr[1].push({
	            x: i,
	            y: vy
	        });
	        if (dt!=undefined  && dt>0 && i.toFixed(1) == (dt*1000000000).toFixed(1)){
	        	px = i;
	        	py1 = vx;
	        	py2 = vy;
	        }
		}
        //调整graph组件到合适的坐标，即横轴最大时间，纵轴正负最大速度
        var my =  Math.abs(minVy) > maxVy ? Math.abs(minVy) : maxVy;
		if (vx > my){
        	my = vx;
        }
        var mt = _tend;
		frameObj.graph_vt.reArrangeGraph({
            leastCountX: 280/mt,
            leastCountY: 80/ my,
            labelIntervalX: mt>1?Math.floor(mt): Math.floor(mt*10)/10,
            majorIntervalX: mt>1?Math.floor(mt)/2: Math.floor(mt*10)/10,
            minorIntervalX: mt>1?Math.floor(mt)/4:0.1,
            labelIntervalY: my>=10?10:Math.floor(my),
            majorIntervalY: my>=10?10:Math.floor(my),
            minorIntervalY: my>=10?5:2,
        });
        drawLinesOnGraphVt(vtArr[0], "#5599FF", 100,true)
        drawLinesOnGraphVt(vtArr[1], "#0000CC", 200,true)
        if (dt!=undefined && dt<=ball.tend && px>0 ){
	        drawPointOnGraphVt( px,py1,  6, "#5599FF", 1)
		    drawPointOnGraphVt( px,py2,  6, "#0000CC", 2)
        }
    }
    var stArr = new Array;
    function showGraphSt(ball,dt) {
   		frameObj.graph_st.cleanAll();
    	if (ball.name==""){
    		return;
    	}
        var px=py1=py2=-1;
        var maxS=0;
        stArr = [];
        for (var i = 0; i < 2; i ++ ){
        	stArr[i] = new Array;
        }
        var _tend = ball.tend*1000000000;
        for ( i=0; i<=_tend; i+=0.1){
        	if (graphModel==0||graphModel==2){
	        	sx = ball.v0*Math.cos(ball.va*Math.PI/180)*i/1000000000;
		       	if (ball.tp==0){
		       		if (i<ball.ot*1000000000){
			        	sy = ball.v0*Math.sin(ball.va*Math.PI/180)*i/1000000000 +  Math.pow(i/1000000000,2)*ball.a/2;
		       		}else{
			        	sy = ball.oy + ball.ov*Math.sin(ball.ova*Math.PI/180)*(i/1000000000-ball.ot);
		       		}
		       	}else{
		        	sy = ball.v0*Math.sin(ball.va*Math.PI/180)*i/1000000000 +  Math.pow(i/1000000000,2)*ball.a/2;
		       	}
        	}else if (graphModel==1){
	        	sy = 0;
	       		if (i<ball.ot*1000000000){
		        	sx = ball.v0*i/1000000000 +  Math.pow(i/1000000000,2)*ball.a/2;
	       		}else{
		        	sx = ball.ox + ball.ov*(i/1000000000-ball.ot);
	       		}
        	}
        	if (sx>maxS){
        		maxS = sx
        	}
        	if (sy>maxS){
        		maxS = sy
        	}
	        stArr[0].push({
	            x: i,
	            y: sx
	        });
	        stArr[1].push({
	            x: i,
	            y: sy
	        });
	        if (dt!=undefined && dt>0 && (i.toFixed(1)==(dt*1000000000).toFixed(1))){
	        	px = i;
	        	py1 = sx;
	        	py2 = sy;
	        }
        }
        var mt = _tend;
        frameObj.graph_st.reArrangeGraph({
            leastCountX: 280/mt,
            leastCountY: 80/ maxS,
            labelIntervalX: mt>1?Math.floor(mt): Math.floor(mt*10)/10,
            majorIntervalX: mt>1?Math.floor(mt)/2: Math.floor(mt*10)/10,
            minorIntervalX: mt>1?Math.floor(mt)/4:0.1,
            labelIntervalY: maxS>0.2? 0.2:0.1,
            majorIntervalY: maxS>0.2? 0.2:0.1,
            minorIntervalY: maxS>0.2? 0.1:0.05,
        });
        drawLinesOnGraphSt(stArr[0], "#FF7744", 100,true)
        drawLinesOnGraphSt(stArr[1], "#CC0000", 200,true)
        if (dt!=undefined && dt<=ball.tend && px>0 ){
	        drawPointOnGraphSt( px,py1,  6, "#FF7744", 1)
		    drawPointOnGraphSt( px,py2,  6, "#CC0000", 2)
        }
    }
    function drawPointOnGraphVt( px, py, r, color, id){
        frameObj.graph_vt.drawInterPoint({
            x: px,
            y: py,
            id: id,
            radius: r,
            color: color,
            title: ""
        });
    }
    function drawPointOnGraphSt( px, py, r, color, id){
        frameObj.graph_st.drawInterPoint({
            x: px,
            y: py,
            id: id,
            radius: r,
            color: color,
            title: ""
        });
    }
    function drawLinesOnGraphVt(lineArr, color, lineId, reset) {
        frameObj.graph_vt.drawLines({
            data: lineArr,
            id: lineId,
            color: color,
            reset: reset,
            dashed:true,
            showArrow:false,
            title:"x",
            borderWidth:300,
            borderHeight:100,
            removeLineCap:true,
            lineWidth: 2.5
        })
    }
    function drawLinesOnGraphSt(lineArr, color, lineId, reset) {
        frameObj.graph_st.drawLines({
            data: lineArr,
            id: lineId,
            color: color,
            reset: reset,
            dashed:true,
            showArrow:false,
            title:"x",
            borderWidth:300,
            borderHeight:100,
            removeLineCap:true,
            lineWidth: 2.5
        })
    }
	function d_animation(){
		var date;
		var tx2 = tx1 = tx0 = 0;
		var status = "";
		if (isPaused==true){
			dt = olddt;
		}else{
			date = new Date();
 			dt = date.getTime()/1000-pt-t0;
		}
 		if (isPlaying == false){
 			dt=0;
 			olddt = 0;
 		}
		dt = dt*demoSpeed;
		if (dt >= tMax){
			dt = olddt;
			status = "done";
		}
		animObj.canvasGraphObj.setSwitches(showPath,showOld,showFlash,showForce,showBackExt,showDisp,showDispDec,showVelo,showVeloDec,showVt,showSt);
		if (graphModel==0 || graphModel==1){
			status=animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX,mapY,maxX,maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
		}else if (graphModel==2){
			status=animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX,mapY,maxX,maxY,ballTab,ballPathTab, ballOld,ballPathOld,graphModel);
		}
		if (showVt==true){
			if (graphModel==2){
				showGraphVt(ballTab,dt);
			}else{
				showGraphVt(ball1,dt);
			}
		}
		if (showSt==true){
			if (graphModel==2){
				showGraphSt(ballTab,dt);
			}else{
				showGraphSt(ball1,dt);
			}
		}
		if (isPaused==false){
 			olddt = dt;
		}
		return status;
	}
	function msgBox(){
//    	frameObj.msgBox.hide();
    }
    function systemControlEvent(e) {
    	var date = new Date();
        switch (e.btnType) {
        case "play":
        	if (graphModel==2 && ( isPlayback==false || frameObj.tableComp.selected()<0 )){
        		break;
        	}
            isPlaying = true;
            if (isPaused == true){
            	isPaused = false;
				pt2 = date.getTime()/1000;
				pt += pt2-pt1;
            }else{
				t0 = date.getTime()/1000;
				pt = 0;
            }
            setButtons("_play");
			cacuRuningConst(ball1);
			ballPath = cacuRuningPath(ball1 );
			var status;
			timer = setInterval(function() {
						status = d_animation();
						setTimerText(pt);
 						showRuningData();
	 					if (status == "done"){
							isPaused = true;
	 						frameObj.activitySystemControl.setDisable("pause");
	 						clearInterval(timer);
          					if (graphModel==0||graphModel==1){
		 						for(var i in ball1){
									ballOld[i] = ball1[i];
		 						}
		 						if (ballPath.length>0){
			 						ballPathOld = ballPath.slice(0);
		 						}
		 						if (graphModel!=1){
			 						frameObj.graphComp.proveShow(true);
		            				addTableData();
		 						}
          					}
	 					}
					},
        			25);
            break;
        case "pause":
			isPaused = true;
			pt1 = date.getTime()/1000;
			setButtons("_pause");
			clearInterval(timer);
			if (graphModel==0 || graphModel==1){
				status=animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX,mapY,maxX,maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
			}else if (graphModel==2){
				status=animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX,mapY,maxX,maxY,ballTab,ballPathTab, ballOld,ballPathOld,graphModel);
			}
			break;
        case "reset":
            isPlaying = false;
            isPaused = false;
            setButtons("_reset");
            clearInterval(timer);
            rt = 0;
            pt1 = pt2 = pt = 0;
            dt = 0;
            ball1.x = ball1.y = ball1.s = ball1.sang =  0;
            ball1.v = ball1.vx = ball1.vy = ball1.vang =  0;
            ball1.ot = ball1.oy = ball1.ov = ball1.tp = 0;
            showRuningData();
			frameObj.txt_timer.setText( "<b>"+ "0.0" +"</b><i>s</i>" );
		 	frameObj.graphComp.proveShow(false);
			if (graphModel==0 || graphModel==1){
				status=animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX,mapY,maxX,maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
			}else if (graphModel==2){
				status=animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX,mapY,maxX,maxY,ballTab,ballPathTab, ballOld,ballPathOld,graphModel);
			}
			break
        }
    }
    function showRuningData(_dt){
		vs = (showVelocity[0]) ? "<b>" + (ball1.v==0?"0.00":num2e(ball1.v)) + "</b>" : "<b>0.00</b>";
		frameObj.cb_v.setLabelText(vs);
		vx = (showVelocity[1]) ? "<b>"+  (ball1.vx==0?"0.00":num2e(ball1.vx)) +"</b>" : "<b>0.00</b>";
		frameObj.cb_vx.setLabelText(vx);
		vy = (showVelocity[2]) ? "<b>"+ (ball1.vy==0?"0.00":num2e(ball1.vy))+"</b>" : "<b>0.00</b>";
		frameObj.cb_vy.setLabelText(vy);
		vang = (showVelocity[3]) ? "<b>"+String(ball1.vang.toFixed(2))+"</b>" : "<b>0.00</b>";
		frameObj.cb_va.setLabelText(vang);
		sx = (showRuning[0]) ? "<b>"+String(ball1.x.toFixed(3))+"</b>" : "<b>0.00</b>";
		frameObj.cb_x.setLabelText(sx);
		sy = (showRuning[1]) ? "<b>"+String(ball1.y.toFixed(3))+"</b>" : "<b>0.00</b>";
		frameObj.cb_y.setLabelText(sy);
		var _tt;
		_tt = _dt?_dt:dt;
		sf = (showRuning[2]) ? "<b>"+ (_tt>=ball1.ot? "0.00": num2e(ball1.m*ball1.a)) +"</b>" : "<b>0.00</b>";
		frameObj.cb_F.setLabelText(sf);
		sa = (showRuning[3]) ? "<b>"+(_tt>=ball1.ot? "0.00":num2e(ball1.a))+"</b>" : "<b>0.00</b>";
		frameObj.cb_acc.setLabelText(sa);
    }
    function setTimerText(pt){
    	var date = new Date();
    	rt = date.getTime()/1000 - pt -  t0;
    	rt *= demoSpeed;
 		frameObj.txt_timer.setText( "<b>"+ num2e(rt) +"</b><i>s</i>" );
 		return rt;
    }
    function setTimerBack(dt){
 		frameObj.txt_timer.setText( "<b>"+ (dt?num2e(dt):"0.0") +"</b><i>s</i>" );
    }
    function graphEvents(e) {
        if (e) {}
        if (e && e.type == "prove") {
            var _dt = e.value/(ball1.v0*Math.cos(ball1.va*Math.PI/180));
            if (_dt>=0 && _dt <=ball1.tend){
 				animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,_dt,xScale,yScale,mapX, mapY,maxX, maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
            	setTimerBack(_dt);
            	showRuningData(_dt);
				if (showVt==true){
					showGraphVt(ball1,_dt);
				}
				if (showSt==true){
					showGraphSt(ball1,_dt);
				}
            }
        }
    }
    function setButtons(mode) {
        switch (mode) {
        case "_play":
            frameObj.activitySystemControl.setDisable("play");
            frameObj.activitySystemControl.setEnable("pause");
            frameObj.activitySystemControl.setEnable("reset");
	        frameObj.slider_be.disable();
	        frameObj.slider_v0.disable();
	        frameObj.slider_va.disable();
	        frameObj.slider_L.disable();
	        frameObj.slider_d.disable();
	        frameObj.slider_V.disable();
			frameObj.rd_particle.disable();
	 		frameObj.slider_pe.disable();
	 		frameObj.slider_pee.disable();
	 		frameObj.slider_pem.disable();
	        if (graphModel==0){
	        	frameObj.tabComp.setDisableTab(1);
	        	frameObj.tabComp.setDisableTab(2);
	        }else if (graphModel==1){
	        	frameObj.tabComp.setDisableTab(0);
	        	frameObj.tabComp.setDisableTab(2);
	        }else if (graphModel==2){
	        	frameObj.tabComp.setDisableTab(0);
	        	frameObj.tabComp.setDisableTab(1);
	        }
            break;
        case "_pause":
            frameObj.activitySystemControl.setEnable("play");
            frameObj.activitySystemControl.setDisable("pause");
            frameObj.activitySystemControl.setEnable("reset");
            break;
        case "_reset":
            frameObj.activitySystemControl.setEnable("play");
            frameObj.activitySystemControl.setDisable("pause");
            frameObj.activitySystemControl.setDisable("reset");
            if (graphModel!=1){
	    	    frameObj.slider_be.enable();
		        frameObj.slider_va.enable();
            }
	        frameObj.slider_v0.enable();
	        frameObj.slider_L.enable();
	        frameObj.slider_d.enable();
	        frameObj.slider_V.enable();
			frameObj.rd_particle.enable();
			if (frameObj.rd_particle.getSelected()==2){
		 		frameObj.slider_pe.enable();
		 		frameObj.slider_pee.enable();
		 		frameObj.slider_pem.enable();
			}
	        frameObj.tabComp.setEnableTab(0);
	        frameObj.tabComp.setEnableTab(1);
	        frameObj.tabComp.setEnableTab(2);
	        break;
        }
    }
	function checkBoxEvents(e) {
        switch (e.id) {
        case "checkBox_grid":
           	if (e.checked) {
           		showGrid = true;
				frameObj.graphComp.reArrangeGraph({
       				gridYVisible:true,
       				gridXVisible:true,
        		})
       	    }else{
           		showGrid = false;
				frameObj.graphComp.reArrangeGraph({
       				gridYVisible:false,
       				gridXVisible:false,
        		})
        	}
       	    break;
        case "checkBox_vt":
			showVt = e.checked?  true :false;
  			if (showVt){
  				frameObj.dkColorBar_vt.show();
  				frameObj.graph_vt.show();
  				if (graphModel==2){
					showGraphVt(ballTab);
  				}else{
					showGraphVt(ball1);
  				}
  			}else{
  				frameObj.dkColorBar_vt.hide();
  				frameObj.graph_vt.hide();
  			}
			break;
        case "checkBox_st":
			showSt = e.checked?  true :false;
  			if (showSt){
  				frameObj.dkColorBar_st.show();
  				frameObj.graph_st.show();
  				if (graphModel==2){
  					showGraphSt(ballTab);
  				}else{
  					showGraphSt(ball1);
  				}
  			}else{
  				frameObj.dkColorBar_st.hide();
  				frameObj.graph_st.hide();
  			}
			break;
		case "checkBox_2":
			showPath = e.checked?  true :false;
			animObj.canvasGraphObj.setSwitches(showPath,showOld,showFlash,showForce,showBackExt,showDisp,showDispDec,showVelo,showVeloDec,showVt,showSt);
			if (isPlaying==false|| isPaused==true ){
				animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX, mapY,maxX, maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
			}
			break;
		case "checkBox_3":
			showFlash = e.checked?  true :false;
			animObj.canvasGraphObj.setSwitches(showPath,showOld,showFlash,showForce,showBackExt,showDisp,showDispDec,showVelo,showVeloDec,showVt,showSt);
			if (isPlaying==false|| isPaused==true ){
				animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX, mapY,maxX, maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
			}
			break;
		case "checkBox_10":
			showOld = e.checked?  true :false;
			animObj.canvasGraphObj.setSwitches(showPath,showOld,showFlash,showForce,showBackExt,showDisp,showDispDec,showVelo,showVeloDec,showVt,showSt);
			if (isPlaying==false|| isPaused==true ){
				animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX, mapY,maxX, maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
			}
			break;
		case "checkBox_4":
			showForce = e.checked?  true :false;
			animObj.canvasGraphObj.setSwitches(showPath,showOld,showFlash,showForce,showBackExt,showDisp,showDispDec,showVelo,showVeloDec,showVt,showSt);
			if (isPlaying==false|| isPaused==true ){
				animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX, mapY,maxX, maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
			}
			break;
		case "checkBox_5":
			showBackExt = e.checked?  true :false;
			animObj.canvasGraphObj.setSwitches(showPath,showOld,showFlash,showForce,showBackExt,showDisp,showDispDec,showVelo,showVeloDec,showVt,showSt);
			if (isPlaying==false|| isPaused==true ){
				animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX, mapY,maxX, maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
			}
			break;
		case "checkBox_6":
			showDisp = e.checked?  true :false;
			if (showDisp==true){
				frameObj.checkBox_7.enable();
			}else{
				frameObj.checkBox_7.disable();
			}
			animObj.canvasGraphObj.setSwitches(showPath,showOld,showFlash,showForce,showBackExt,showDisp,showDispDec,showVelo,showVeloDec,showVt,showSt);
			if (isPlaying==false|| isPaused==true ){
				animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX, mapY,maxX, maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
			}
			break;
		case "checkBox_7":
			showDispDec = e.checked?  true :false;
			animObj.canvasGraphObj.setSwitches(showPath,showOld,showFlash,showForce,showBackExt,showDisp,showDispDec,showVelo,showVeloDec,showVt,showSt);
			if (isPlaying==false|| isPaused==true ){
				animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX, mapY,maxX, maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
			}
			break;
		case "checkBox_8":
			showVelo = e.checked?  true :false;
			if (showVelo==true){
				frameObj.checkBox_9.enable();
			}else{
				frameObj.checkBox_9.disable();
			}
			animObj.canvasGraphObj.setSwitches(showPath,showOld,showFlash,showForce,showBackExt,showDisp,showDispDec,showVelo,showVeloDec,showVt,showSt);
			if (isPlaying==false || isPaused==true ){
				animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX, mapY,maxX, maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
			}
			break;
		case "checkBox_9":
			showVeloDec = e.checked?  true :false;
			animObj.canvasGraphObj.setSwitches(showPath,showOld,showFlash,showForce,showBackExt,showDisp,showDispDec,showVelo,showVeloDec,showVt,showSt);
			if (isPlaying==false|| isPaused==true ){
				animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX, mapY,maxX, maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
			}
			break;
		case "cb_v":
			showVelocity[0] = e.checked?  true :false;
			vs = (showVelocity[0]) ? "<b>"+String(ball1.v.toFixed(2))+"</b>" : "<b>0.00</b>";
			frameObj.cb_v.setLabelText(vs);
			break;
		case "cb_vx":
			showVelocity[1] = e.checked?  true :false;
			vx = (showVelocity[1]) ? "<b>"+String(ball1.vx.toFixed(2))+"</b>" : "<b>0.00</b>";
			frameObj.cb_vx.setLabelText(vx)
			break;
		case "cb_vy":
			showVelocity[2] = e.checked?  true :false;
			vy = (showVelocity[2]) ? "<b>"+String(ball1.vy.toFixed(2))+"</b>" : "<b>0.00</b>";
			frameObj.cb_vy.setLabelText(vy)
			break;
		case "cb_va":
			showVelocity[3] = e.checked?  true :false;
			vang = (showVelocity[3]) ? "<b>"+String(ball1.vang.toFixed(2))+"</b>" : "<b>0.00</b>";
			frameObj.cb_va.setLabelText(vang)
			break;
		case "cb_x":
			showRuning[0] = e.checked?  true :false;
			sx = (showRuning[0]) ? "<b>"+String(ball1.x.toFixed(2))+"</b>" : "<b>0.00</b>";
			frameObj.cb_x.setLabelText(sx)
			break;
		case "cb_y":
			showRuning[1] = e.checked?  true :false;
			sy = (showRuning[1]) ? "<b>"+String(ball1.y.toFixed(2))+"</b>" : "<b>0.00</b>";
			frameObj.cb_y.setLabelText(sy)
			break;
		case "cb_F":
			showRuning[2] = e.checked?  true :false;
			sf = (showRuning[2]) ? "<b>"+String((ball1.m*ball1.a).toFixed(2))+"</b>" : "<b>0.00</b>";
			frameObj.cb_F.setLabelText(sf)
			break;
		case "cb_acc":
			showRuning[3] = e.checked?  true :false;
			sa = (showRuning[3]) ? "<b>"+String(ball1.a.toFixed(2))+"</b>" : "<b>0.00</b>";
			frameObj.cb_F.setLabelText(sa)
			break;
		case "cb_playBack":
			isPlayback = e.checked?  true :false;
			if (isPlayback==true ){
				var _row = frameObj.tableComp.selected();
				if (_row>=0){
					playbackTableData( _row );
					if (showVt){
						showGraphVt(ballTab);
					}
					if (showSt){
						showGraphSt(ballTab);
					}
				}
			}else{
  				frameObj.txt_result.hide();
				ballTab.name = "";
				animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale, yScale,mapX,mapY,maxX,maxY,
					ballTab,ballPathTab, ballOld,ballPathOld,graphModel);
				if (showVt){
					showGraphVt(ballTab);
				}
				if (showSt){
					showGraphSt(ballTab);
				}
			}
			break;
        }
    }
    function tableEvent(e) {
    	if (graphModel!=2){
    		return;
    	}
    	if (e.selected>=0 && isPlayback==true){
	       	var etmp={btnType:"reset"};
	       	systemControlEvent(etmp);
	       	playbackTableData(e.selected);
			if (showVt==true){
				showGraphVt(ballTab);
			}
			if (showVt==true){
			showGraphSt(ballTab);
			}
    	}
    }
    function radioEvent(e) {
        switch (e.id) {
        case "rd_particle":
            if (e.selected == 0) {
				ball1.m  = 0.000000000000000000000000000000928;
				ball1.q  = -0.00000000000000000016;
		      	var p = {
		            min: 1,
		            max: 25,
		            value: 3,
		            step: 1
		      	}
		      	frameObj.slider_V.updateMaxMin(p);
		      	frameObj.slider_V.value(3);
				ball1.pU = 3*1000;
   	           	frameObj.slider_v0.value( 6 );
           		ball1.v0 = 6*10000000;
		 		frameObj.slider_pe.disable();
		 		frameObj.slider_pee.disable();
		 		frameObj.slider_pem.disable();
		 		if (graphModel==1){
		 			frameObj.slider_be.value(0);
		 			sliderEvents({
		 				id:"slider_be",
		 				value: 0
		 			})
		 		}
 			}else if (e.selected == 1) {
				ball1.m  = 0.00000000000000000000000000167;
				ball1.q  = 0.00000000000000000016;
		      	var p = {
		            min: 300,
		            max: 1200,
		            value: 500,
		            step: 100
		      	}
		      	frameObj.slider_V.updateMaxMin(p);
		      	frameObj.slider_V.value(500);
				ball1.pU = 500*1000;
   	           	frameObj.slider_v0.value( 2 );
           		ball1.v0 = 2*10000000;
		 		frameObj.slider_pe.disable();
		 		frameObj.slider_pee.disable();
		 		frameObj.slider_pem.disable();
		 		if (graphModel==1){
		 			frameObj.slider_be.value(1);
		 			sliderEvents({
		 				id:"slider_be",
		 				value: 1
		 			})
		 		}
 			}else if (e.selected == 2) {
 		      	var p = {
		            min: 300,
		            max: 1200,
		            value: 500,
		            step: 100
		      	}
		      	frameObj.slider_V.updateMaxMin(p);
		      	frameObj.slider_V.value(500);
				ball1.pU = 500*1000;
   	           	frameObj.slider_v0.value( 2 );
           		ball1.v0 = 2*10000000;
		 		frameObj.slider_pe.enable();
		 		frameObj.slider_pee.enable();
		 		frameObj.slider_pem.enable();
		 		ball1.q = frameObj.slider_pee.value() * 0.00000000000000000016;
		 		if ( frameObj.slider_pee.value()==0 ){
		 			ball1.q = -ball1.q;
		 		}
		 		ball1.m = frameObj.slider_pem.value() * 0.00000000000000000000000000167;
 			}
 			if (showVt){
		   		frameObj.graph_vt.cleanAll();
 			}
 			if (showSt){
		   		frameObj.graph_st.cleanAll();
 			}
 			cacuRuningConst(ball1);
			animObj.canvasGraphObj.setSwitches(showPath,showOld,showFlash,showForce,showBackExt,showDisp,showDispDec,showVelo,showVeloDec,showVt,showSt);
			animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX, mapY,maxX, maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
            break;
        }
    }
    function sliderEvents(e) {
        switch (e.id) {
        case "slider_zoom":
            zoomLevel  = frameObj.slider_zoom.value();
			frameObj.txt_zoom.setText("<b>x"+String( zoomLevel )+"</b>");
			zoomGraph(zoomLevel);
			ballPath = cacuRuningPath(ball1);
			if (ballPathOld.length>0){
				ballPathOld = cacuRuningPath(ballOld);
			}
			if (ballPathTab){
				ballPathTab = cacuRuningPath(ballTab);
			}
			if (graphModel==0 || graphModel==1){
				animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale, yScale,mapX,mapY,maxX,maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
			}else if (graphModel==2){
				animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale, yScale,mapX,mapY,maxX,maxY,ballTab,ballPathTab, ballOld,ballPathOld,graphModel);
			}
    	    break;
        case "slider_speed":
            var ds  = frameObj.slider_speed.value();
            demoSpeed  = ds*0.000000005;
			frameObj.txt_speed.setText("<b>x"+String( ds )+"</b>");
	        break;
        case "slider_v0":
            v0  = frameObj.slider_v0.value();
            ball1.v0 = v0*10000000;
            if (showVelo){
				animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX, mapY,maxX, maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
            }
            cacuRuningConst(ball1);
            break;
        case "slider_va":
            va0  = frameObj.slider_va.value();
			ball1.va = va0;
            cacuRuningConst(ball1);
			animObj.canvasGraphObj.setSwitches(showPath,showOld,showFlash,showForce,showBackExt,showDisp,showDispDec,showVelo,showVeloDec,showVt,showSt);
			animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX, mapY,maxX, maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
            break;
        case "slider_L":
            ball1.pL  = frameObj.slider_L.value()/100;
			cacuRuningConst(ball1);
			animObj.canvasGraphObj.setSwitches(showPath,showOld,showFlash,showForce,showBackExt,showDisp,showDispDec,showVelo,showVeloDec,showVt,showSt);
			animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX, mapY,maxX, maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
            break;
        case "slider_d":
            ball1.pd  = frameObj.slider_d.value()/100;
            if (ball1.pd >=ball1.pL){
   	           	frameObj.slider_L.value( ball1.pd*100+5 );
   	           	ball1.pL = (ball1.pd*100+5)/100	;
            }
         	cacuRuningConst(ball1);
			animObj.canvasGraphObj.setSwitches(showPath,showOld,showFlash,showForce,showBackExt,showDisp,showDispDec,showVelo,showVeloDec,showVt,showSt);
			animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX, mapY,maxX, maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
            break;
        case "slider_V":
			ball1.pU = frameObj.slider_V.value()*1000;
			cacuRuningConst(ball1);
            break;
       case "slider_be":
            ball1.pe = frameObj.slider_be.value();
            if (ball1.pe ==0){
	            frameObj.slider_be.changeColor("","#0000AA","",true,false,true);
            }else  if (ball1.pe ==1) {
	            frameObj.slider_be.changeColor("","#CC0000","",true,false,true);
            }
         	cacuRuningConst(ball1);
			animObj.canvasGraphObj.setSwitches(showPath,showOld,showFlash,showForce,showBackExt,showDisp,showDispDec,showVelo,showVeloDec,showVt,showSt);
			animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX, mapY,maxX, maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
            break;
       case "slider_pe":
 			ball1.q = -ball1.q;
            if (ball1.q <0){
	            frameObj.slider_pe.changeColor("","#0000AA","",true,false,true);
            }else{
	            frameObj.slider_pe.changeColor("","#CC0000","",true,false,true);
            }
 			if (graphModel==1){
	   	        if (ball1.q<0){
		 			frameObj.slider_be.value(0);
		 			sliderEvents({
		 				id:"slider_be",
		 				value: 0
		 			})
	   	        }else{
		 			frameObj.slider_be.value(1);
		 			sliderEvents({
		 				id:"slider_be",
		 				value: 1
		 			})
	   	        }
 			}
			break;
       case "slider_pee":
	 		ball1.q = frameObj.slider_pee.value() * 0.00000000000000000016;
	 		if ( frameObj.slider_pee.value()==0 ){
	 			ball1.q = -ball1.q;
	 		}
			break;
       case "slider_pem":
		 	ball1.m = frameObj.slider_pem.value() * 0.00000000000000000000000000167;
		 	break;
        }
	}
    function tabEvent(e) {
        var tabIndex = e.index;
        switch (tabIndex){
        	case 0:
        		showTab1(true);
        		break;
        	case 1:
        		showTab2(true);
        		break;
        	case 2:
        		showTab3(true);
        		break;
        	default:
        	    showTab1(true);
        		break;
        }
    }
    function showTab1( visible ){
        if (visible) {
        	oldModel = graphModel;
        	graphModel = 0;
	      	frameObj.tableComp.hide();
  			frameObj.txt_result.hide();
			frameObj.slider_v0.show();
			frameObj.slider_va.show();
			frameObj.slider_L.show();
			frameObj.slider_d.show();
			frameObj.slider_V.show();
			frameObj.dkColorBar_3.show();
			frameObj.dkColorBar_4.show();
			frameObj.dkColorBar_5.show();
			frameObj.dkColorBar_6.show();
			frameObj.dkColorBar_7.show();
			frameObj.dkColorBar_8.show();
			frameObj.cb_playBack.hide();
   	        frameObj.slider_va.enable();
   	        frameObj.slider_be.enable();
 			if (showVt){
		   		frameObj.graph_vt.cleanAll();
 			}
 			if (showSt){
		   		frameObj.graph_st.cleanAll();
 			}
   	        if (graphModel==0 || graphModel==1){
				status=animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX,mapY,maxX,maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
			}else if (graphModel==2){
				status=animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX,mapY,maxX,maxY,ballTab,ballPathTab, ballOld,ballPathOld,graphModel);
			}
        }
    }
    function showTab2( visible ){
        if (visible) {
        	oldModel = graphModel;
        	graphModel = 1;
	      	frameObj.tableComp.hide();
  		    frameObj.txt_result.hide();
  		    frameObj.slider_v0.show();
			frameObj.slider_va.show();
			frameObj.slider_L.show();
			frameObj.slider_d.show();
			frameObj.slider_V.show();
			frameObj.dkColorBar_3.show();
			frameObj.dkColorBar_4.show();
			frameObj.dkColorBar_5.show();
			frameObj.dkColorBar_6.show();
			frameObj.dkColorBar_7.show();
			frameObj.dkColorBar_8.show();
			frameObj.cb_playBack.hide();
   	        frameObj.slider_va.value( 0 );
   	        frameObj.slider_va.disable();
   	        ball1.va = 0;
   	        if (ball1.q<0){
	 			frameObj.slider_be.value(0);
	 			sliderEvents({
	 				id:"slider_be",
	 				value: 0
	 			})
   	        }else{
	 			frameObj.slider_be.value(1);
	 			sliderEvents({
	 				id:"slider_be",
	 				value: 1
	 			})
   	        }
   	        frameObj.slider_be.disable();
 			if (showVt){
		   		frameObj.graph_vt.cleanAll();
 			}
 			if (showSt){
		   		frameObj.graph_st.cleanAll();
 			}
			if (graphModel==0 || graphModel==1){
				status=animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX,mapY,maxX,maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
			}else if (graphModel==2){
				status=animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX,mapY,maxX,maxY,ballTab,ballPathTab, ballOld,ballPathOld,graphModel);
			}
        }
    }
    function showTab3( visible ){
        if (visible) {
        	oldModel = graphModel;
        	graphModel = 2;
	      	frameObj.tableComp.show();
			frameObj.cb_playBack.show();
	      	frameObj.slider_v0.hide();
			frameObj.slider_va.hide();
			frameObj.slider_L.hide();
			frameObj.slider_d.hide();
			frameObj.slider_V.hide();
			frameObj.dkColorBar_3.hide();
			frameObj.dkColorBar_4.hide();
			frameObj.dkColorBar_5.hide();
			frameObj.dkColorBar_6.hide();
			frameObj.dkColorBar_7.hide();
			frameObj.dkColorBar_8.hide();
			if (graphModel==0 || graphModel==1){
				status=animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX,mapY,maxX,maxY,ball1,ballPath, ballOld,ballPathOld,graphModel);
			}else if (graphModel==2){
				status=animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale,yScale,mapX,mapY,maxX,maxY,ballTab,ballPathTab, ballOld,ballPathOld,graphModel);
			}
			if (showVt){
				showGraphVt(ballTab);
			}
			if (showSt){
				showGraphSt(ballTab);
			}
        }
    }
    function zoomGraph( level ){
		var p2;
		var p1;
		var mX = 0.48;
		var mY = 0.1;
    	var leastCountX = 1800;
    	var leastCountY = 1800;
    	var labelIntervalX = 0.05;
    	var labelIntervalY = 0.05;
    	var majorIntervalX = 0.05;
    	var minorIntervalX = 0.01;
    	var majorIntervalY = 0.05;
    	var minorIntervalY = 0.01;
    	switch (level) {
        case 1:
            break;
        case 2:
    	    leastCountX = 900;
    	    leastCountY = 900;
    	    labelIntervalX = 0.1;
    	    labelIntervalY = 0.1;
    	    majorIntervalX = 0.1;
    	    minorIntervalX = 0.02;
    	    majorIntervalY = 0.1;
    	    minorIntervalY = 0.02;
    	    mX = 0.96;
    	    mY = 0.2;
            break;
        case 3 :
    	    leastCountX = 600;
    	    leastCountY = 600;
    	    labelIntervalX = 0.15;
    	    labelIntervalY = 0.15;
    	    majorIntervalX = 0.15;
    	    minorIntervalX = 0.03;
    	    majorIntervalY = 0.15;
    	    minorIntervalY = 0.03;
    	    mX = 1.44;
    	    mY = 0.3;
            break;
        }
        frameObj.graphComp.reArrangeGraph({
            leastCountX: leastCountX,
            leastCountY: leastCountY,
            labelIntervalX: labelIntervalX,
            labelIntervalY: labelIntervalY,
            majorIntervalY: majorIntervalY,
            minorIntervalY: minorIntervalY,
            majorIntervalX: majorIntervalX,
            minorIntervalX: minorIntervalX,
        });
        p2 = frameObj.graphComp.getPointToPixel(mX,mY,false)
        p1 = frameObj.graphComp.getPointToPixel(0,0,false)
		totalP = Math.round(p2.x-p1.x)+1;
		xScale = (p2.x-p1.x)/mX;
		yScale = (p1.y-p2.y)/mY;
		mapX = p1.x;
		mapY = p1.y;
		maxX = p2.x;
		maxY = p2.y;
    }
    function addTableData(){
    	var tData;
    	if (tableN >= tableMax){
			frameObj.tableComp.deleteRow(0,true);
			tableN--;
		}
    	tData = [tableN+1,ball1.pe==1?"+":"–",ball1.pL.toFixed(2),ball1.pd.toFixed(2),ball1.pU,
    				ball1.m, ball1.q, num_2e(ball1.v0), ball1.va,
    				ball1.tp==0? "Y" : "N",
    				ball1.tp==0? num_2e( ball1.ot): num_2e( ball1.tend),
    				ball1.ox.toFixed(3),
    				(ball1.tp==0? (ball1.oy.toFixed(3)) : ball1.pd/2),
    				ball1.tp==0?  num_2e(ball1.ov) : num_2e(ball1.v),
    				ball1.tp==0? ball1.ova.toFixed(2): ball1.vang.toFixed(2)
    			];
    	frameObj.tableComp.addData(tData);
    	tableN ++;
    }
    function playbackTableData(row){
    	if (frameObj.tableComp.getCellData(row,1)){
    		frameObj.txt_result.show();
    		if (ballTab.name=="" ){
    			ballTab.name="TABLE";
    		}
			ballTab.x = ballTab.y = ballTab.s = ballTab.sang =  0;
	        ballTab.v = ballTab.vx = ballTab.vy = ballTab.vang =  0;
	        ballTab.ot = ballTab.ox = ballTab.oy = ballTab.ov = ballTab.tp = 0;
			var _s = frameObj.tableComp.getCellData(row,1);
			ballTab.pe = (_s=="+")? 1:0;
			ballTab.pL = parseFloat(frameObj.tableComp.getCellData(row,2));
			ballTab.pd = parseFloat(frameObj.tableComp.getCellData(row,3));
			ballTab.pU = parseFloat(frameObj.tableComp.getCellData(row,4));
			_s = frameObj.tableComp.getCellData(row,5);
			_s = _s.replace("–","-");
			var _n = new Number(_s);
			ballTab.m = _n;
			_s = frameObj.tableComp.getCellData(row,6);
			_s = _s.replace(/–/g,"-");
			_n = new Number(_s);
			ballTab.q = _n;
			_s = frameObj.tableComp.getCellData(row,7);
			_n = new Number(_s);
			ballTab.v0 = _n;
			_s = frameObj.tableComp.getCellData(row,8);
			_s = _s.replace("–","-");
			ballTab.va = parseFloat(_s);
			cacuRuningConst(ballTab)
			ballPathTab = cacuRuningPath(ballTab);
			animObj.canvasGraphObj.drawGraph(isPlaying,isPaused,dt,xScale, yScale,mapX,mapY,maxX,maxY,
				ballTab,ballPathTab, ballOld,ballPathOld,graphModel);
			if (ballTab.tp==0){
				_s ="  动能增量<i>ΔE<sub>k</sub>=mv<sup>2</sup>/2-mv<sub>0</sub><sup>2</sup>/2="
						+ num2e(ballTab.ov*ballTab.ov*ballTab.m/2-ballTab.v0*ballTab.v0*ballTab.m/2)+"J</i>, "
						+"电场力做功<i>ΔE<sub>k</sub>=(Uq/d)*y=" + num2e(Math.abs(ballTab.pU*ballTab.q*ballTab.oy/ballTab.pd))+"J</i>";
			}else{
				_s ="  动能增量<i>ΔE<sub>k</sub>=mv<sup>2</sup>/2-mv<sub>0</sub><sup>2</sup>/2="
						+ num2e(Math.abs(ballTab.pU*ballTab.q/2)) +"J</i>, "
						+"电场力做功<i>ΔE<sub>k</sub>=(Uq/d)*y=" + num2e(Math.abs(ballTab.pU*ballTab.q/2))+"J</i>";
			}
			frameObj.txt_result.setText(_s);
    	}else{
    	}
    }
    var flag = "";
    var isMouseDown = false;
    function tracePadEvent1(e) {
    	var i;
        if (e.type == "mousedown") {
            isMouseDown = true;
				flag = "hit";
                setTracePadCursor(true)
        } else if (e.type == "mousemove") {
            if (flag && isMouseDown) {
            }
        } else if (e.type == "mouseup") {
			setTracePadCursor(false) ;
			isMouseDown = false;
			flag = ""
        }
    }
    function setTracePadCursor(_flagForCursor) {
        if (_flagForCursor) {
            if (_flagForCursor == true) $("#canvas_tracePad").css("cursor", "move");
        } else {
            $("#canvas_tracePad").css("cursor", "")
        }
    }
};
var particleinEfieldClass = new particleinEfieldClass;
$(document).ready(function(e) {
    particleinEfieldClass.init();
    $(".desktop").css({
    	background : "#FFFFF5",
    	overflow: "hidden"
    })
    $("#graphDiv").css({
    	background : "#FFFFF5"
    })
});

var canvasGraph = function() {
    var p = {
        x: 0,
        y: hCap,
        width: wMain,
        height: hGraph,
        index: 2,
    };
	var canvDiv;
	var canv;
	var ctx;
	var _showPath = true;
	var _showFlash = false;
	var _showForce = false;
	var _showBackExt = false;
	var _showDisp = false;
	var _showDispDec = false;
	var _showVelo = false;
	var _showVeloDec = false;
	var _showVt = false;
	var _showSt = false;
	var _showOld = false;
	this.init = function(_obj) {
        for (var i in _obj) {
            p[i] = _obj[i]
        }
        p.x = dkScreenResize(p.x);
        p.y = dkScreenResize(p.y);
        p.height = dkScreenResize(p.height);
        p.width = dkScreenResize(p.width);
        createCanvas();
        canv.width = canv.width;
    };
    function createCanvas() {
        canvDiv = document.createElement("div");
        canv = document.createElement("canvas");
        ctx = canv.getContext("2d");
        $(canvDiv).css({
            position: "absolute",
            left: p.x + "px",
            top: p.y + "px",
            width: p.width + "px",
            height: p.height + "px",
            "z-index": p.index
        }).addClass("graphCanvas");
        $(canv).css({
            position: "absolute"
        });
        canv.width = p.width;
        canv.height = p.height;
        p.target.append(canvDiv);
        $(canvDiv).append(canv)
    }
    //开关参数
    this.setSwitches = function(showPath,showOld,showFlash,showForce,showBackExt,showDisp,showDispDec,showVelo,showVeloDec,showVt,showSt,yGrd,aGrd){
		_showPath = showPath;
		_showFlash = showFlash;
		_showForce = showForce;
		_showBackExt = showBackExt;
		_showDisp = showDisp;
		_showDispDec = showDispDec;
		_showVelo = showVelo;
		_showVeloDec = showVeloDec;
		_showSt = showSt;
		_showVt = showVt;
		_showOld = showOld
    }
    this.clearGraph = function(){
		canv.width = canv.width;
    }
    this.drawGraph = function(isPlaying,isPaused,dt,xScale,yScale,mapX,mapY,maxX,maxY,ball,ballPath, ballOld,ballPathOld,graphModel){
		var status = "";
		if (dt>=ball.tend){
			status = "done";
			dt = ball.tend;
		}
		canv.width = canv.width;
		if (graphModel==0 || graphModel==2 ){
			ctx.beginPath();
			var cgrd = ctx.createLinearGradient(mapX,mapY-ball.pd*yScale/2-dkScreenResize(8),mapX,mapY-ball.pd*yScale/2);
			cgrd.addColorStop(0, "#CC9966");
			cgrd.addColorStop(1, "#996633");
			ctx.fillStyle = cgrd;
			ctx.fillRect(mapX,mapY-ball.pd*yScale/2-dkScreenResize(8),ball.pL*xScale+dkScreenResize(2),dkScreenResize(8));
	        ctx.font = "bold " + globalResizeCalc(16) + "px Arial";
	        ctx.textAlign = "center";
	        ctx.textBaseline = "bottom";
	        ctx.fillStyle = ball.pe==1? "#CC0000":"#0000CC";
	        var _es = ball.pe==1? "+":"–";
	        ctx.fillText("A   "+_es, mapX+ball.pL*xScale/2,mapY-ball.pd*yScale/2-dkScreenResize(8));
	 		cgrd = ctx.createLinearGradient(mapX,mapY+ball.pd*yScale/2,mapX,mapY+ball.pd*yScale/2+dkScreenResize(8));
			cgrd.addColorStop(0, "#996633");
			cgrd.addColorStop(1, "#CC9966");
			ctx.fillStyle = cgrd;
			ctx.fillRect(mapX,mapY+ball.pd*yScale/2,ball.pL*xScale+dkScreenResize(2),dkScreenResize(8));
	        ctx.textBaseline = "top";
	        ctx.fillStyle = ball.pe==0? "#CC0000":"#0000CC";
	        var _es = ball.pe==0? "+":"–";
	        ctx.fillText("B   "+_es, mapX+ball.pL*xScale/2,mapY+ball.pd*yScale/2+dkScreenResize(8));
	        var _n = Math.floor(ball.pL/0.025) ;
	        if (_n<5){
	        	_n = 5;
	        }
	        var _dn = ball.pL/_n;
	        for (var i=0;i<=_n;i++){
	        	if (ball.pe==1){
		        	dkDrawArrow(ctx,mapX+i*_dn*xScale,mapY-ball.pd*yScale/2,mapX+i*_dn*xScale,mapY+ball.pd*yScale/2,"#996600",1.5,0);
	        	}else{
		        	dkDrawArrow(ctx,mapX+i*_dn*xScale,mapY+ball.pd*yScale/2,mapX+i*_dn*xScale,mapY-ball.pd*yScale/2,"#996600",1.5,0);
	        	}
	        }
		}else if (graphModel==1 ){
			ctx.beginPath();
			var cgrd = ctx.createLinearGradient(mapX,mapY,mapX-dkScreenResize(8),mapY);
			cgrd.addColorStop(0, "#CC9966");
			cgrd.addColorStop(1, "#996633");
			ctx.fillStyle = cgrd;
			ctx.fillRect(mapX-dkScreenResize(8),mapY-ball.pL*yScale/2-dkScreenResize(2),dkScreenResize(8),ball.pL*yScale/2-dkScreenResize(5));
			ctx.fillRect(mapX-dkScreenResize(8), mapY+dkScreenResize(7), dkScreenResize(8),ball.pL*yScale/2-dkScreenResize(5));
			ctx.font = "bold " + globalResizeCalc(16) + "px Arial";
	        ctx.textAlign = "right";
	        ctx.textBaseline = "top";
	        ctx.fillStyle = ball.pe==1? "#CC0000":"#0000CC";
	        var _es = ball.pe==1? "+":"–";
	        ctx.fillText("A "+_es, mapX-dkScreenResize(10),mapY);
	 		cgrd = ctx.createLinearGradient(mapX+ball.pd*xScale,mapY,mapX+ball.pd*xScale+dkScreenResize(8),mapY);
			cgrd.addColorStop(0, "#996633");
			cgrd.addColorStop(1, "#CC9966");
			ctx.fillStyle = cgrd;
			ctx.fillRect(mapX+ball.pd*xScale,mapY-ball.pL*yScale/2-dkScreenResize(2),dkScreenResize(8),ball.pL*yScale/2-dkScreenResize(5));
			ctx.fillRect(mapX+ball.pd*xScale,mapY+dkScreenResize(7),dkScreenResize(8),ball.pL*yScale/2-dkScreenResize(5));
	        ctx.textAlign = "left";
	        ctx.fillStyle = ball.pe==0? "#CC0000":"#0000CC";
	        var _es = ball.pe==0? "+":"–";
	        ctx.fillText("B "+_es, mapX+ball.pd*xScale+dkScreenResize(10),mapY);
	        var _n = Math.floor(ball.pL/0.025) ;
	        if (_n<5){
	        	_n = 5;
	        }
	        var _dn = ball.pL/_n;
	        for (var i=0;i<=_n;i++){
	        	if (ball.pe==1){
		        	dkDrawArrow(ctx,mapX,mapY+ball.pL*yScale/2-i*_dn*yScale,mapX+ball.pd*yScale,mapY+ball.pL*yScale/2-i*_dn*yScale,"#996600",1.5,0);
	        	}else{
		        	dkDrawArrow(ctx,mapX+ball.pd*yScale,mapY+ball.pL*yScale/2-i*_dn*yScale,mapX,mapY+ball.pL*yScale/2-i*_dn*yScale,"#996600",1.5,0);
	        	}
	        }
		}
		if (graphModel==2){
			if (ball.name=="" ){
				status = "waiting"
				return status;
			}
		 	if ( ballPath.length >1 ){
		 		for (var i=0; i < ballPath.length-1; i++ ){
		 			if ( ballPath[i].x > mapX+ball.mx*xScale ){
		 				if (i%3==0){
				 			dkDrawLine(ctx,ballPath[i].x,ballPath[i].y,ballPath[i+1].x,ballPath[i+1].y,2.5,"#777777");
		 				}
		 			}else{
			 			dkDrawLine(ctx,ballPath[i].x,ballPath[i].y,ballPath[i+1].x,ballPath[i+1].y,2.5,"#990099");
		 			}
		 		}
		 		if ( Math.abs(ball.oy) >0){
		 			dkDrawBall(ctx,mapX+ball.pL*xScale,mapY-ball.oy*yScale,2.5,"#990000",true);
		 			ctx.beginPath();
					ctx.fillStyle = "#990099";
					ctx.font = "bold "+String(dkScreenResize(16))+"px consolas";
   	   				ctx.textAlign = "left";
   					ctx.textBaseline = 'top';
		 			ctx.fillText( "y="+String(ball.oy.toFixed(3)) +"m, t=" + num_2e(ball.ot)+ "s, v=" + num_2e(ball.ov)+"m/s",
		 				mapX+ball.pL*xScale+dkScreenResize(2),mapY-ball.oy*yScale);
		 		}
		 	}
		}
		if (_showOld==true && ballOld && graphModel==0 ){
	 		for (var i=0; i < ballPathOld.length-1; i++ ){
		 		dkDrawLine(ctx,ballPathOld[i].x,ballPathOld[i].y,ballPathOld[i+1].x,ballPathOld[i+1].y,2,"#AAAAAA")
		 	}
		}
		if (dt>0){
			if (graphModel==0 || graphModel==2){
				if (dt>=ball.ot && ball.ot>0){
					ball.vx = ball.v0*Math.cos(ball.va*Math.PI/180);
					ball.vy = ball.ov*Math.sin(ball.ova*Math.PI/180);
					ball.v = ball.ov;
					ball.vang = ball.ova;
					ball.x = ball.vx*dt;
					ball.y = ball.oy+ball.ov*Math.sin(ball.ova*Math.PI/180) * (dt-ball.ot);
				}else{
					ball.vx = ball.v0*Math.cos(ball.va*Math.PI/180);
					ball.vy = ball.v0*Math.sin(ball.va*Math.PI/180) + ball.a*dt;
					ball.v = Math.sqrt(Math.pow(ball.vx,2)+Math.pow(ball.vy,2));
					ball.vang = Math.atan(ball.vy/ball.vx)*180/Math.PI;
					ball.x = ball.vx*dt;
					ball.y = ball.v0*Math.sin(ball.va*Math.PI/180)*dt + ball.a*Math.pow(dt,2)/2 ;
				}
				ball.s = Math.sqrt(Math.pow(ball.x,2)+Math.pow(ball.y,2));
				ball.sang = Math.atan(ball.y/ball.x)*180/Math.PI;
			 	if ( ballPath.length >1 ){
			 		for (var i=0; i < ballPath.length-1; i++ ){
			 			if (ballPath[i].x < mapX+ball.x*xScale) {
			 				//画轨迹
							if (_showPath){
					 			dkDrawLine(ctx,ballPath[i].x,ballPath[i].y,ballPath[i+1].x,ballPath[i+1].y,2,"#990099")
					 		}
			 				if (_showFlash && graphModel!=2 ){
								if (ballPath[i].flashed){
									dkDrawCircle(ctx,ballPath[i].x,ballPath[i].y,ball.r,1,ball.q<0? ball.color:ball.colorp);
									drawVeloVector2(ctx, ball , ballPath[i] );
									drawDistVector2(ctx, mapX,mapY, ball, ballPath[i] );
								}
			 				}
			 			}
			 		}
			 	}
			 	if ( (_showBackExt && ball.tp==0 && ball.x>ball.pL) || (ball.tp==0 && graphModel==2)){
		 			dkDrawLine(ctx,mapX+ball.pL*xScale/2,mapY,mapX+ball.pL*xScale,mapY-ball.oy*yScale,1.5,"#990099",4,4 );
		 			dkDrawBall(ctx,mapX+ball.pL*xScale/2,mapY,2.5,"#990000",false);
		 			dkDrawBall(ctx,mapX+ball.pL*xScale,mapY-ball.oy*yScale,2.5,"#990000",false);
			 	}
			 	drawVeloVector( ctx, mapX,mapY,xScale,yScale, ball.x,ball.y,ball,false,graphModel);
			 	if (_showForce && graphModel!=2 ){
			 		_dy = (ball.a>0?1:-1)* dkScreenResize(55);
			 		dkDrawArrow(ctx,mapX+ball.x*xScale,mapY-ball.y*yScale,mapX+ball.x*xScale,mapY-ball.y*yScale-_dy,"#55AA66",2,1)
			 	}
				dkDrawBall(ctx,mapX+ball.x*xScale,mapY-ball.y*yScale,ball.r,ball.q<0? ball.color:ball.colorp,false);
				if (graphModel==2){
					dkDrawCircle(ctx,mapX+ball.x*xScale,mapY,ball.r,1,ball.color)
					dkDrawCircle(ctx,mapX,mapY-ball.y*yScale,ball.r,1,ball.color)
				}
			 	drawDistVector( ctx,mapX,mapY,xScale,yScale, ball.x, ball.y,graphModel );
			}else if (graphModel==1){
				if (dt>=ball.ot){
					ball.vx = ball.ov;
					ball.v = ball.ov;
					ball.x = ball.ox + ball.vx*(dt-ball.ot);
				}else{
					ball.vx = ball.v0 + ball.a*dt;
					ball.v = ball.vx;
					ball.x = ball.v0*dt + ball.a*Math.pow(dt,2)/2;
				}
				ball.vang = 0;
				ball.vy = 0;
				ball.y = 0;
				ball.s = ball.x;
				ball.sang = 0;
				//简化Path，用以一条直线，问题是flashed point?
				if (_showPath){
			 		dkDrawLine(ctx, mapX,mapY,mapX+ball.x*xScale,mapY,2,"#990099");
		 		}
				//?
 				if (_showFlash  ){
			 	}
			 	drawVeloVector( ctx, mapX,mapY,xScale,yScale, ball.x,ball.y,ball,false,graphModel);
				dkDrawBall(ctx,mapX+ball.x*xScale,mapY-ball.y*yScale,ball.r,ball.q<0? ball.color:ball.colorp,false);
			}
		}else{
			//初始状态 dt=0
			drawVeloVector( ctx, mapX,mapY,xScale,yScale, ball.x0,ball.y0,ball,true,graphModel);
			dkDrawBall(ctx,mapX+ball.x0*xScale,mapY-ball.y0*yScale,ball.r, ball.q<0? ball.color:ball.colorp,false);
		}
		return status;
    }
    function drawVeloVector( ctx,mapX,mapY,xScale,yScale, x,y,ball,inital,graphModel ){
		if (_showVelo){
			var _dx,_dy;
			var _vc = 120*1000000;
			if (inital==true){
				_dx = ((ball.v0/_vc)*dkScreenResize(50)+dkScreenResize(50))*Math.cos(ball.va*Math.PI/180);
				_dy = ((ball.v0/_vc)*dkScreenResize(50)+dkScreenResize(50))*Math.sin(ball.va*Math.PI/180);
			}else{
				if (ball.va<90){
					_dx = ((ball.v0/_vc)*dkScreenResize(50)+dkScreenResize(50))*Math.cos(ball.va*Math.PI/180);
					_dy = _dx*Math.tan(ball.vang*Math.PI/180) ;
				}else{
					_dx = 0;
					_dy = (ball.vy/ball.v0)*((ball.v0/_vc)*dkScreenResize(50)+dkScreenResize(50));
				}
			}
			dkDrawArrow(ctx,mapX+x*xScale,mapY-y*yScale,mapX+x*xScale+_dx,mapY-y*yScale-_dy,"#0000AA",2,1)
		 	if ( (_showVeloDec || graphModel==2) && (graphModel!=1) ){
				dkDrawLine(ctx,mapX+x*xScale+_dx,mapY-y*yScale-_dy,mapX+x*xScale+_dx,mapY-y*yScale,1.5,"#0000AA",3,3);
		 		dkDrawArrow(ctx,mapX+x*xScale,mapY-y*yScale,mapX+x*xScale+_dx,mapY-y*yScale,"#0000AA",2,0	)
				dkDrawLine(ctx,mapX+x*xScale+_dx,mapY-y*yScale-_dy,mapX+x*xScale,mapY-y*yScale-_dy,1.5,"#0000AA",3,3);
				dkDrawArrow(ctx,mapX+x*xScale,mapY-y*yScale,mapX+x*xScale,mapY-y*yScale-_dy,"#0000AA",2,0)
		 	}
		}
    }
	function drawVeloVector2(ctx,ball,ballPath,graphModel ){
		if (_showVelo){
			var _dx,_dy;
			var _vc = 120*1000000;
			if (ballPath.vang<90){
				_dx = ((ball.v0/_vc)*dkScreenResize(50)+dkScreenResize(50))*Math.cos(ball.va*Math.PI/180);
				_dy = _dx*Math.tan(ballPath.vang*Math.PI/180) ;
			}else{
				_dx = 0;
				_dy = (ballPath.vy/ball.v0)*((ball.v0/_vc)*dkScreenResize(50)+dkScreenResize(50));
			}
			dkDrawArrow(ctx,ballPath.x,ballPath.y,ballPath.x+_dx,ballPath.y-_dy,"#0000AA",1.5,1)
			if (graphModel==1){
				return;
			}
		 	if (_showVeloDec && ball.va<90 && Math.abs(_dy)>=dkScreenResize(5) ){
				dkDrawLine(ctx,ballPath.x+_dx,ballPath.y-_dy,ballPath.x+_dx,ballPath.y,1,"#0000AA",3,3);
		 		dkDrawArrow(ctx,ballPath.x,ballPath.y,ballPath.x+_dx,ballPath.y,"#0000AA",1.5,0	)
				dkDrawLine(ctx,ballPath.x+_dx,ballPath.y-_dy,ballPath.x,ballPath.y-_dy,1,"#0000AA",3,3);
				dkDrawArrow(ctx,ballPath.x,ballPath.y,ballPath.x,ballPath.y-_dy,"#0000AA",1.5,0)
		 	}
		}
	}
    function drawDistVector( ctx,mapX,mapY,xScale,yScale, x,y,graphModel ){
	 	if (_showDisp  ){
	 		dkDrawArrow(ctx,mapX,mapY,mapX+x*xScale,mapY-y*yScale,"#ff3333",2,1)
		 	if (_showDispDec || graphModel==2){
				dkDrawLine(ctx,mapX+x*xScale,mapY-y*yScale,mapX+x*xScale,mapY,1.5,"#FF3333",3,3);
		 		dkDrawArrow(ctx,mapX,mapY,mapX+x*xScale,mapY,"#FF3333",2,0	)
				dkDrawLine(ctx,mapX+x*xScale,mapY-y*yScale,mapX,mapY-y*yScale,1.5,"#FF3333",3,3);
		 		dkDrawArrow(ctx,mapX,mapY,mapX,mapY-y*yScale,"#FF3333",2,0	)
		 	}
	 	}
	 	if (graphModel==2 && _showDisp==false &&_showDispDec==false){
			dkDrawLine(ctx,mapX+x*xScale,mapY-y*yScale,mapX+x*xScale,mapY,1.5,"#FF3333",3,3);
			dkDrawLine(ctx,mapX+x*xScale,mapY-y*yScale,mapX,mapY-y*yScale,1.5,"#FF3333",3,3);
	 	}
	}
    function drawDistVector2( ctx,mapX,mapY,ball,ballPath ){
	 	if (_showDisp){
	 		dkDrawArrow(ctx,mapX,mapY,ballPath.x,ballPath.y,"#ff3333",2,1)
		 	if (_showDispDec ){
				dkDrawLine(ctx,ballPath.x,ballPath.y,ballPath.x,mapY,1.5,"#FF3333",3,3);
		 		dkDrawArrow(ctx,mapX,mapY,ballPath.x,mapY,"#FF3333",2,0	)
				dkDrawLine(ctx,ballPath.x,ballPath.y,mapX,ballPath.y,1.5,"#FF3333",3,3);
		 		dkDrawArrow(ctx,mapX,mapY,mapX,ballPath.y,"#FF3333",2,0	)
		 	}
	 	}
    }
	function num_2e(num,fixed){
		if (num==0){
			return "";
		}
		var isNegative = false;
		if (num<0){
			isNegative = true;
			num = -num;
		}
	    var p = Math.floor(Math.log(num)/Math.LN10);
    	var n = num * Math.pow(10, -p);
    	var f = (fixed==undefined)? 2 :fixed;
    	var str = n.toFixed(f) + 'e' + p;
    	if (isNegative==true) str = "-"+str;
		return str;
	}
};