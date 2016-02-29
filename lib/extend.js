var extend = function(target){
    var len = arguments.length,
        index = 1,
        first = arguments[0];
    if(typeof target == 'boolean'){
        if(target) first = {};
        else{
            first = arguments[1];
            index = 2;
        }
    }
    for(; index < len; index++){
        var o = arguments[index];
        for(i in o) if(o[i] !== undefined) first[i] = o[i];
    }
    return first;
}

module.exports = extend
