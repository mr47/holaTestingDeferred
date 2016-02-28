'use strict';

const deferred = function(){
    this.listners = [];
    this.then = (listner) => {
        this.listners.push(listner);
    };
    this.resolve = (resp) => {
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
    setTimeout(function () { d1.resolve("Inner Done"); }, 1000);
    return d1;
});

d.then(function (res) { console.log("2 %s", res); return "b"; });
d.then(function (res) { console.log("2 %s", res); return "c"; });
d.then(function (res) { console.log("2 %s", res); return "d"; });
d.then(function (res) { console.log("2 %s", res); return "e"; });

d.resolve("done");