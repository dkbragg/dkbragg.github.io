function loadDev() {
    $.script("words.js")

}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/  /g, " &nbsp;");
}

function rtrim(str) {
    while(str[str.length-1]===' ') str = str.slice(0, str.length-1);
    return str;
}

function ltrim(str) {
    while(str[0] === ' ') str = str.slice(1);
    return str;
}

function repl(str, replacements) {
    var i=0;
    return str.replace(/\$[a-zA-Z0-9]+/g, function () {
        console.assert(i < replacements.length);
        return replacements[i++];
    });
}

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randrange(n) {
    return Math.floor(Math.random()*n);
}

function shuffle(arr) {
    var i;
    var j;
    var t;
    for (i = arr.length-1; i > 0; i--) {
        j = Math.floor(Math.random() * i);
        t = arr[j];
        arr[j] = arr[i];
        arr[i] = t;
    }
    return arr;
}

function vals(dict) {
    return Object.keys(dict).map(function (k) { return dict[k]; });
}

function svgRect(x, y, width, height, color) {
        color = color || "black";
        res += repl('<rect x="$x" y="$y" width="$width" height="$height" style="fill:$color;stroke:none;" />',
                     [x * sixel.SCALE * 0.75, y * sixel.SCALE, width * sixel.SCALE * 0.75, height * sixel.SCALE, color]);
}

/*
BLURS = [0,1,2,4,6,8];
function change_blur(up) {
	if (up) BLURS.push(BLURS.shift()); // move first number to the end of the list
	else BLURS.unshift(BLURS.pop()); // move first number to the end of the list
	$("body").css("-webkit-filter", "blur(" + BLURS[0] + "px)");
}

function keydown(evt) {
	if(evt.key.toLowerCase()=="b") {
		change_blur(evt.key=="b");
	}
}
$(function(){
	$("body").keydown(keydown);
});

*/