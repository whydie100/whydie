window.__cflog = function(msg, data) {
    if (typeof console != "undefined" && _debug) {
        if (_dumpdata && data)
            console.log(msg, data);
        else
            console.log(msg);
        console.log("-----------------------------------------------------------");
    }
};
(function(_cf) {
    this.gcalparams = new Array();
    _cf.design = _cf.design || {};
    _cf.newOpts = _cf.newOpts || {};
    _cf.servVars = _cf.servVars || {};
    this.jserr = '';
    this.rcld = false;

    this._script = function(_src, _id) {
        try {
            var _scrpt = document.createElement("script");
            _scrpt.src = _cf.servVars.kchst + _src;
            _scrpt.id = _id;
            document.getElementsByTagName('head')[0].appendChild(_scrpt);
            return;
        } catch (e) {
            this._apndError("js tag create error - ", e);
            return;
        }
    }

    this.getgcalparams = function() {
        try {
            if (this.gcalparams.length == 0) {
                var totRS = 0;
                var rstobshwn = 0;
                var entrscnt = _cf.servVars.entrscnt;
                var lastRS = {};
                for (designvar in _cf.design) {
                    if (_cf.design[designvar].type == 'relatedsearch') {
                        totRS++;
                        lastRS = _cf.design[designvar];
                        if (_cf.design[designvar].number) {
                            if(parseInt(_cf.servVars.entrscnt)>=1) {
                                if (_cf.design[designvar].number >= entrscnt)
                                    _cf.design[designvar].number = entrscnt;

                                entrscnt = entrscnt - _cf.design[designvar].number;
                            }
                            else {
                            }
                            rstobshwn = rstobshwn + _cf.design[designvar].number;
                        }
                    }
                    var newopts = {};
                    newopts = _cf.newOpts[_cf.design[designvar].type];


                    if ((_cf.servVars._afdad == 1) && (_cf.design[designvar].rmg_isbt == 1)) {
                        continue;
                    }

                    delete _cf.design[designvar].rmg_isbt;
                    this.mergeobj(_cf.design[designvar], newopts);
                    this.gcalparams[this.gcalparams.length] = _cf.design[designvar];

                }

                if(entrscnt>=1) {
                    lastRS.number   = lastRS.number + entrscnt;
                    rstobshwn       = rstobshwn + entrscnt;
                }


                try {
                    if (_cf.design['pageOptions'].terms) {
                        if (typeof JSON === 'object' && typeof JSON.parse === 'function') {
                            var prsedrs = JSON.parse(_cf.design['pageOptions'].terms);
                        } else {
                            var prsedrs = eval('(' + _cf.design['pageOptions'].terms + ')');
                        }

                        if (prsedrs.length >= 1) {
                            var fnlrs = Math.min(rstobshwn, prsedrs.length);
                            var fnltrms = prsedrs.slice(0, fnlrs).join('","');
                            _cf.design['pageOptions'].terms = '"' + fnltrms + '"';

                        } else {
                        }
                    } else {
                    }
                } catch (e) {
                }

                try {
                    if ((typeof window.abp != "undefined") && (_cf.design['pageOptions'].clicktrackUrl)) {
                        _cf.design['pageOptions'].clicktrackUrl += window.abp ? '&bd=' + encodeURI('####1') : '&bd=' + encodeURI('####0');
                    }
                } catch (e) {}

            }
            return this.gcalparams;
        } catch (e) {
            this._apndError("google call param error - ", e);
            return;
        }
    };

    this.mergeobj = function(obj1, obj2) {
        try {
            if (typeof obj1 != "object")
                obj1 = {};

            for (var key in obj2)
                obj1[key] = obj2[key];

            return obj1;
        } catch (e) {
            this._apndError("merge object error - ", e);
            return;
        }
    };

    this.runPage = function() {
        try {
            function applyConstruct(ctor, params) {
                var obj, newobj;

                // Create the object with the desired prototype
                if (typeof Object.create === "function") {
                    // ECMAScript 5
                    obj = Object.create(ctor.prototype);
                } else if ({}.__proto__) {
                    // Non-standard __proto__, supported by some browsers
                    obj = {};
                    obj.__proto__ = ctor.prototype;
                    if (obj.__proto__ !== ctor.prototype) {
                        // Setting it didn't work
                        obj = makeObjectWithFakeCtor();
                    }
                } else {
                    // Fallback
                    obj = makeObjectWithFakeCtor();
                }

                // Set the object's constructor
                obj.constructor = ctor;

                // Apply the constructor function
                newobj = ctor.apply(obj, params);

                // If a constructor function returns an object, that
                // becomes the return value of `new`, so we handle
                // that here.
                if (typeof newobj === "object") {
                    obj = newobj;
                }

                // Done!
                return obj;

                // Subroutine for building objects with specific prototypes
                function makeObjectWithFakeCtor() {
                    function fakeCtor() {}
                    fakeCtor.prototype = ctor.prototype;
                    return new fakeCtor();
                }
            }

            if ((typeof google == "undefined") || !google) {
                _cf.rtrycnt = 0;
                var tmr = window.setInterval(function() {
                    if (_cf.rtrycnt > 5) {
                        this._apndError("call exceed -", _cf.rtrycnt);
                        window.clearInterval(tmr);
                    }

                    if (typeof google != "undefined") {
                        this._apndError("call tries-", _cf.rtrycnt);
                        window.clearInterval(tmr);
                        var a;
                        a = applyConstruct(google.ads.domains.Caf, arguments);
                    } else {
                        _cf.rtrycnt++;
                    }
                }, 100);
            } else {
                var a;
                a = applyConstruct(google.ads.domains.Caf, arguments);
            }

        } catch (e) {
            this._apndError("cant call google- ", e);
            return;
        }
    }
    this._lgres = function(status) {
        try {
            var _cfsrc = "rg-logcafrep.php?lgky=" + _cf.servVars.lgky;
            for (_v in status) {
                _cfsrc += "&" + _v + "=" + status[_v];
            }
            this._script(_cfsrc, '_cfrep');
        } catch (e) {
            return;
        }
    }

    this.aftrprss = function() {
        try {
            if (_cf.servVars._aftrprss) {
                var __unc = new Function(_cf.servVars._aftrprss);
                __unc();
            }
        } catch (e) {
            this._apndError("after process code error", e);
            return;
        }
    }

    this._redir = function(url) {
        try {
            if (top) {
                top.location.href = url;
            } else {
                location.href = url;
            };
            return;
        } catch (e) {};
    };

    this.onPageLoad = function(requestdone, status) {
        try {
            status = status || {};
            document.body.style.visibility = 'visible';

            if (!requestdone) {
                window.pgld = false;
                status.__edc__ = "GlError";
                error_code = status.error_code;
                this._lgres(status);

                if (!this.rcld && (error_code == 221 || error_code == 222 || error_code == 223)) {
                    calprms = this.getgcalparams();
                    if (status.adult) {
                        calprms[0]['pubId'] = _cf.servVars.erpub;
                        calprms[0]['channel'] = _cf.servVars.erch;
                    } else {
                        calprms[0]['pubId'] = _cf.servVars.erpubcln;
                        calprms[0]['channel'] = _cf.servVars.erchcln;
                    }
                    this.rcld = true;
                    this.runPage.apply(null, calprms);
                    return;
                }

                if (_cf.servVars.noredir) {
                    return;
                }

                if (error_code == 225) {
                    this._redir(_cf.servVars.ghu + "&t=GlBlocked");
                    return;
                }

				/*if(_cfrg)*/
                this._redir(_cf.servVars.ghu + "&t=GlError");
                return;
            } else {
                window.pgld = true;
            }

            this._lgres(status);

            if (status.error_code && status.error_code >= 1 /*&& _cfrg*/ ) {
                this._redir(_cf.servVars.ghu + "&t=GlError_" + status.error_code);
                return;
            }

            this.aftrprss();
        } catch (e) {
            this._apndError("on page load error", e);
            return;
        }
    }

    this._apndError = function(_txt, _expn) {
        this.jserr += _txt + " - " + _expn + "##";
        return;
    }

    this.adLoaded = function(containerName, adsLoaded) {
        if (adsLoaded) {
            try {
                // most likely do nothing
            } catch (e) {
                //Do something to handle error gracefully
            }
        } else {
            // as you always do when there is no ad coverage from Google
        }
    };

    try {
        this.runPage.apply(null, this.getgcalparams());
    } catch (e) {
        this._apndError("JS error", e);
    }

    try {
        if (this.jserr.length >= 1) {
            var _err = {
                "__edc__": "ExpnEr",
                "_expn": this.jserr
            };
            this._lgres(_err);
        }
    } catch (e) {}

})(_cfHelp);