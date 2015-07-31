var ModuleTestResourceDownloader = (function(global) {

global["BENCHMARK"] = false;
//ResourceDownloader["VERBOSE"] = true;

var test = new Test("ResourceDownloader", {
        disable:    false, // disable all tests.
        browser:    true,  // enable browser test.
        worker:     true,  // enable worker test.
        node:       true,  // enable node test.
        nw:         true,  // enable nw.js test.
        button:     true,  // show button.
        both:       true,  // test the primary and secondary modules.
        ignoreError:false, // ignore error.
        callback:   function() {
        },
        errorback:  function(error) {
        }
    }).add([
        // generic test
        testResourceDownloader_200,
        testResourceDownloader_404,
        testResourceDownloader_remove,
        testResourceDownloader_clear,
        testResourceDownloader_parallel_1,
        testResourceDownloader_parallel_2,
        testResourceDownloader_parallel_3,
        testResourceDownloader_parallel_100,
    ]);

if (IN_BROWSER || IN_NW) {
    test.add([
        // browser and node-webkit test
    ]);
} else if (IN_WORKER) {
    test.add([
        // worker test
    ]);
} else if (IN_NODE) {
    test.add([
        // node.js and io.js test
    ]);
}

// --- test cases ------------------------------------------
function testResourceDownloader_200(test, pass, miss) {
    var dl = new ResourceDownloader();

    dl.ontick = function() {
        if ( Object.keys(dl.source).length === 7 && dl.remain === 0 ) {
            test.done(pass());
        }
    };
    dl.onerror = function(error) {
        test.done(miss());
    };

    dl.source =  "../lib/ResourceDownloader.js";
    dl.source = ["../lib/WebModule.js",
                 "./index.html",
                 "./node.js",
                 "./nw.html",
                 "./package.json",
                 "./worker.js"];
}

function testResourceDownloader_404(test, pass, miss) {
    var dl = new ResourceDownloader();

    dl.ontick = function() {
        test.done(miss());
    };
    dl.onerror = function(error) {
        test.done(pass());
    };

    dl.source =  "../lib/ResourceDownloader.xx.js";
    dl.source = ["../lib/WebModule.xx.js",
                 "./index.xx.html",
                 "./node.xx.js",
                 "./nw.xx.html",
                 "./package.xx.json",
                 "./worker.xx.js"];
}

function testResourceDownloader_remove(test, pass, miss) {
    var url = "../lib/ResourceDownloader.js";
    var dl = new ResourceDownloader();

    dl.ontick = function() {
        if ( Object.keys(dl.source).length === 7 && dl.remain === 0 ) {
            dl.remove(url);
            if ( Object.keys(dl.source).length === 6 && dl[url] === undefined) {
                test.done(pass());
                return;
            }
            test.done(miss());
        }
    };
    dl.onerror = function(error) {
        test.done(miss());
    };

    dl.source =  url;
    dl.source = ["../lib/WebModule.js",
                 "./index.html",
                 "./node.js",
                 "./nw.html",
                 "./package.json",
                 "./worker.js"];
}

function testResourceDownloader_clear(test, pass, miss) {
    var url = "../lib/ResourceDownloader.js";
    var dl = new ResourceDownloader();

    dl.ontick = function() {
        if ( Object.keys(dl.source).length === 7 && dl.remain === 0 ) {
            dl.clear();
            if ( Object.keys(dl.source).length === 0 && dl[url] === undefined) {
                test.done(pass());
                return;
            }
            test.done(miss());
        }
    };
    dl.onerror = function(error) {
        test.done(miss());
    };

    dl.source =  url;
    dl.source = ["../lib/WebModule.js",
                 "./index.html",
                 "./node.js",
                 "./nw.html",
                 "./package.json",
                 "./worker.js"];
}

function testResourceDownloader_parallel_1(test, pass, miss) {
    var dl = new ResourceDownloader(1);

    dl.ontick = function() {
        test.done(pass());
    };
    dl.onerror = function(error) {
        test.done(miss());
    };

    dl.source = ["../LICENSE",
                 "../lib/WebModule.js",
                 "./index.html",
                 "./node.js",
                 "./nw.html",
                 "./package.json",
                 "./worker.js"];
}

function testResourceDownloader_parallel_2(test, pass, miss) {
    var dl = new ResourceDownloader(2);

    dl.ontick = function() {
        test.done(pass());
    };
    dl.onerror = function(error) {
        test.done(miss());
    };

    dl.source = ["../LICENSE",
                 "../lib/WebModule.js",
                 "./index.html",
                 "./node.js",
                 "./nw.html",
                 "./package.json",
                 "./worker.js"];
}

function testResourceDownloader_parallel_3(test, pass, miss) {
    var dl = new ResourceDownloader(3);

    dl.ontick = function() {
        test.done(pass());
    };
    dl.onerror = function(error) {
        test.done(miss());
    };

    dl.source = ["../LICENSE",
                 "../lib/WebModule.js",
                 "./index.html",
                 "./node.js",
                 "./nw.html",
                 "./package.json",
                 "./worker.js"];
}

function testResourceDownloader_parallel_100(test, pass, miss) {
    var dl = new ResourceDownloader(100);

    dl.ontick = function() {
        test.done(pass());
    };
    dl.onerror = function(error) {
        test.done(miss());
    };

    dl.source = ["../README.md",
                 "../lib/WebModule.js",
                 "./index.html",
                 "./node.js",
                 "./nw.html",
                 "./package.json",
                 "./worker.js"];
}

return test.run();

})(GLOBAL);

