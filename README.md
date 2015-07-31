# ResourceDownloader.js [![Build Status](https://travis-ci.org/uupaa/ResourceDownloader.js.svg)](https://travis-ci.org/uupaa/ResourceDownloader.js)

[![npm](https://nodei.co/npm/uupaa.resourcedownloader.js.svg?downloads=true&stars=true)](https://nodei.co/npm/uupaa.resourcedownloader.js/)

Resource downloader

- Please refer to [Spec](https://github.com/uupaa/ResourceDownloader.js/wiki/) and [API Spec](https://github.com/uupaa/ResourceDownloader.js/wiki/ResourceDownloader) links.
- The ResourceDownloader.js is made of [WebModule](https://github.com/uupaa/WebModule).

## Browser and NW.js(node-webkit)

```js
<script src="<module-dir>/lib/WebModule.js"></script>
<script src="<module-dir>/lib/ResourceDownloader.js"></script>
<script>
    var dl = new ResourceDownloader();

    dl.ontick = function() {
        if (dl.remain === 0) {
            console.log("finished");
        }
    };
    dl.onerror = function(error) {
        console.error(error.message);
    };

    dl.source =  "../lib/ResourceDownloader.js";
    dl.source = ["../lib/WebModule.js",
                 "./index.html",
                 "./node.js",
                 "./nw.html",
                 "./package.json",
                 "./worker.js"];

</script>
```

## WebWorkers

```js
importScripts("<module-dir>lib/WebModule.js");
importScripts("<module-dir>lib/ResourceDownloader.js");

```

## Node.js

```js
require("<module-dir>lib/WebModule.js");
require("<module-dir>lib/ResourceDownloader.js");

```

