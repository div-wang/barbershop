var extend = require('./extend.js')

var Deferred = function(res){
    this.status = 0
    this.promise = new Promise(res)
}

var Promise = function(res){
    this.res = res
    this.status = 0
    this.fix = 0
}

extend(Deferred.prototype, {
    resolve: function(obj) {
        this.promise.status = 1
        this.promise.fn(obj)
    },
    reject: function(obj) {
        this.promise.status = 2
        this.promise.fn(obj)
    },
    notify: function(obj) {
        this.promise.status = 3
        this.promise.fn(obj)
    }
});

extend(Promise.prototype, {
    fn: function(obj){
        var status = this.status,
            res = this.res;
        if(this.fix === 0) this.fix = status
        else if(status != this.fix) return
        if(status == 1){
            if(this._success) this._success(obj,res)
        }else if(status == 2){
            if(this._fail) this._fail(obj,res)
        }else{
            if(this._progres) this._progres(obj,res)
        }
    },
    then: function(success, error, progres) {
        this._success = success
        this._fail = error
        this._progres = progres
    },
    success: function(callback) {
        this._success = callback
        return this
    },
    fail: function(callback) {
        this._fail = callback
        return this
    },
    progres: function(callback) {
        this._progres = callback
        return this
    }
});

module.exports = function(res) {
    return new Deferred(res);
};
