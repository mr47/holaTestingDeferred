'use strict';

// writed this after 20 after interview, and live codding  was in google docs.

const deferred = function(){
    this.listners = [];
    this.then = (listner) => {
        this.listners.push(listner);
    };
    this.noop = function(){};
    this.resolve = (resp) => {
        this.listners.push(this.noop);
        let i = 0;
        if (resp instanceof deferred) {
            resp.then((nextResp)=>{
                i<this.listners.length && resp.resolve(this.listners[i++](nextResp));
                return resp;
            })
        } else {
            i<this.listners.length && this.resolve(this.listners[i++](resp));
        }
    };
};

var d = new deferred();

d.then(function (res) {
    var d1 = new deferred();
    setTimeout(function () { d1.resolve("Inner Done"); }, 1);
    return d1;
});

d.then(function (res) { console.log("2 %s", res); return "b"; });
d.then(function (res) { console.log("2 %s", res); return "c"; });
d.then(function (res) { console.log("2 %s", res); return "d"; });
d.then(function (res) { console.log("2 %s", res); return "e"; });

d.resolve("done");