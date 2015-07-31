var ModuleTestResourceDownloader = (function(global) {

global["BENCHMARK"] = false;

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

return test.run();

})(GLOBAL);

