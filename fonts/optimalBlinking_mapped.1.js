var OptimalBlinkingMapped = (function () {
	
    var font = new Font();
	
    font.name = "optimalBlinking";
    font.version = "1";
    font.description = "optimal non-jumping block letters!";
    font.heightCorrection = 19 / 24;
    //font.scale = 0.6190983922001235;  // by definition
	//font.scale = 0.743292;
	font.scale = 0.64;
	
	
    font.alpha = {
        a: ['x', 'no'],
        b: ['b', 'qf'],
        c: ['z', 'sp'],
        d: ['y', 'sf'],
        e: ['g', 'no'],
        f: ['c', 'sr'],
        g: ['g', 'qf'],
        h: ['w', 'qr'],
        i: ['i', 'no'],
        j: ['r', 'qp'],
        k: ['x', 'qf'],
        l: ['b', 'sp'],
        m: ['x', 'sp'],
        n: ['i', 'sp'],
        o: ['z', 'no'],
        p: ['i', 'qf'],
        q: ['u', 'sf'],
        r: ['g', 'sp'],
        s: ['r', 'qr'],
        t: ['o', 'qf'],
        u: ['b', 'no'],
        v: ['o', 'sr'],
        w: ['w', 'qp'],
        x: ['c', 'qp'],
        y: ['w', 'no'],
        z: ['y', 'sr'],
        '^': ['u', 'no'],
        '*': ['u', 'no']
    }

    font.testDups = function () {
        var keys = Object.keys(font.alpha);
        var hash = {};
        keys.forEach(function (key) {
            var val = font.alpha[key];
            //console.assert(!hash[val], "COLLISION: " + hash[val] + "=" + key);
            hash[val] = key;
        })
    }

    font.wordCounter = 0;

    font.word2html = function (word, height) {
        font.wordCounter += 1;
        var SMALL_SIZE = 0.5;
        if (word.length == 0) return "";

        //var res = "<div class='optimalBlinking-word delay-"+ String(font.wordCounter %5) + "'>";
		//var res = "<div class='optimalBlinking-word' style='color: black; font-size:" + height*2 + "px;'>";
		var res = "<div class='optimalBlinking-word' style='color: black; font-size: 1em;'>";
        var all_caps = (word.toUpperCase() == word && word.toLowerCase() != word);
        if (all_caps) {                   
            // all caps
            word = "*" + word.toLowerCase();
        } else {
            word = word.replace(/[A-Z]/g, function(letter) { return "^" + letter.toLowerCase(); });
        }
		
        word.split("").forEach(function (char, i) {

            console.assert(char in font.alpha);
            res += "<div class='letter backdrop'>";
			var c = font.alpha[char];
			var classStr = "optimalBlinking-" + char + " c-" + c[0] + " m-" + c[1];
			
			res += repl("<div class='letter $classStr'", [classStr]);
			
			res += " style='animation-delay: " + String(i*.1) + "s !important;;'";
			res += ">"
			res += char
			res += "</div>";
			
			res += "</div>"; // backdrop
			//console.log(res);
        });
        res += "</div>"; // animated-word
        return res;
    }
    font.testDups();
    return font;
})();


addFont(OptimalBlinkingMapped);
