var OptimalJumping = (function () {
	
    var font = new Font();
	
    font.name = "optimalJumping";
    font.version = "1";
    font.description = "optimal non-jumping block letters!";
    font.heightCorrection = 19 / 24;
    //font.scale = 0.6190983922001235;  // by definition
	//font.scale = 0.571373;
	//font.scale = 0.743292;
	font.scale = 0.64;
	
	
    font.alpha = {
        a: ['b', 'sj'],
        b: ['y', 'qj'],
        c: ['y', 'qp'],
        d: ['o', 'qp'],
        e: ['y', 'no'],
        f: ['z', 'no'],
        g: ['w', 'sp'],
        h: ['z', 'qr'],
        i: ['c', 'qp'],
        j: ['g', 'qj'],
        k: ['i', 'no'],
        l: ['x', 'no'],
        m: ['b', 'qf'],
        n: ['g', 'sp'],
        o: ['u', 'qf'],
        p: ['g', 'qr'],
        q: ['o', 'sj'],
        r: ['w', 'qf'],
        s: ['r', 'qj'],
        t: ['b', 'sp'],
        u: ['u', 'sj'],
        v: ['x', 'sf'],
        w: ['u', 'sp'],
        x: ['r', 'sf'],
        y: ['w', 'sj'],
        z: ['x', 'qj'],
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

        //var res = "<div class='optimalJumping-word delay-"+ String(font.wordCounter %5) + "'>";
		var res = "<div class='optimalJumping-word'>";
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
			var classStr = "optimalJumping-" + char + " c-" + c[0] + " m-" + c[1];
			
			res += repl("<div class='letter $classStr'", [classStr]);
			
			res += " style='animation-delay: " + String(i*.1) + "s !important;'";
			res += ">"

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


addFont(OptimalJumping);
