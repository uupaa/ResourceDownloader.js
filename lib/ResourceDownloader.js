(function moduleExporter(name, closure) {
"use strict";

var entity = GLOBAL["WebModule"]["exports"](name, closure);

if (typeof module !== "undefined") {
    module["exports"] = entity;
}
return entity;

})("ResourceDownloader", function moduleClosure(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
// --- class / interfaces ----------------------------------
function ResourceDownloader(parallel) { // @arg UINT8 = 3 - Number of maximum parallel downloads.
    this._parallel = Math.max(parallel || 3, 1);
    this._remain = [];
    this._source = {};
}

ResourceDownloader["VERBOSE"] = false;
ResourceDownloader["repository"] = "https://github.com/uupaa/ResourceDownloader.js";
ResourceDownloader["prototype"] = Object.create(ResourceDownloader, {
    "constructor": { "value": ResourceDownloader }, // new ResourceDownloader(parallel:UINT8 = 3):ResourceDownloader
    "source": {
        "set": ResourceDownloader_setSource,                    // this.source = URLString|URLStringArray
        "get": function()   { return this._source;        } },  // this.source:Object
    "remove": { "value": ResourceDownloader_remove          },  // this.remove(url:URLString):void
    "clear":  { "value": ResourceDownloader_clear           },  // this.clear():void
    "remain": {
        "get": function()   { return this._remain.length; } },
    "ontick": {
        "set": function(fn) { this._ontick = fn;          },    // this.ontick = function():void
        "get": function()   { return this._ontick;        } },  // this.ontick:Function
    "onerror": {
        "set": function(fn) { this._onerror = fn;         },    // this.onerror = function(error:Error):void
        "get": function()   { return this._onerror;       } },  // this.onerror:Function
});

// --- implements ------------------------------------------
function ResourceDownloader_setSource(source) { // @arg URLString|URLStringArray
    var that = this;
    var sourceArray = [].concat(source);

    that._remain = that._remain.concat(sourceArray);

    var parallel = this._parallel;
    var fmap = {};
    var flow = sourceArray.map(function(url, index) {
                    fmap["dl" + index] = function(task) {
                        _download(that, task, url, index);
                    };
                    if (parallel >= 2) {
                        return "dl" + index + (((index + 1) % parallel) ? " + " : " > ");
                    }
                    return "dl" + index + " > ";
                }).join(" ").slice(0, -3);

    if (ResourceDownloader["VERBOSE"]) {
        console.log("ResourceDownloader::source", flow, JSON.stringify(source));
    }
    TaskMap("ResourceDownloader::download", flow, fmap, function(error) {
        if (error) {
            if (that._onerror) {
                that._onerror(error);
            }
        } else {
            if (that._ontick) {
                that._ontick(that._source, that._remain.length);
            }
        }
    });
}

function _download(that, task, url, index) {
    TypedArray["toArrayBuffer"](url, function(arrayBuffer) {
        _removeValue(that._remain, url);
        that._source[url] = arrayBuffer;

        task.pass();
    }, function(error) {
        task.done(error);
    });
}

function _removeValue(array, value) {
    var pos = array.indexOf(value);
    if (pos >= 0) {
        array.splice(pos, 1);
    }
    return array;
}

function ResourceDownloader_remove(url) { // @arg URL
    delete this._source[url];
}

function ResourceDownloader_clear() {
    this._source = {};
}

return ResourceDownloader; // return entity

});

