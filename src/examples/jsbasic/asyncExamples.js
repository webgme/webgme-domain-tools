/**
 * Created by Zsolt on 4/17/2014.
 */


var arr = ['a', 'b', 'c', 'd', 'e', 'f'];

var fcn1 = function(idx, a, callback) {
    setTimeout(function() {
        console.log(idx + ' : ' + a[idx]);
        callback(idx + ' finished');
    }, Math.random() * 250);
};


for (var i = 0; i < arr.length; i += 1) {
    fcn1(i, arr, function(msg) {
        console.log(msg);

        console.log('Do NOT use i here: ' + i);
    });
}