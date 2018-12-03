var Animated = (function () {
	
    var font = new Font();
	
    font.name = "animated";
    font.version = "1";
    font.description = "animated Latin letters!";
    font.heightCorrection = 1;
    font.scale = 1.0;  // by definition
	
	// 10: red
	// 20: blue
	// 30: green
	// 40: purple
	// 50: orange
	// e (purple, stationary) --> green, stationary  (used to be j)
	
    font.alpha = {
        a: '10',
        b: '20',
        c: '20',
        d: '40',
        e: '30',
        f: '50',
        g: '30',
        h: '10',
        i: '00',
        j: '40',
        k: '30',
        l: '20',
        m: '00',
        n: '40',
        o: '50',
        p: '40',
        q: '50',
        r: '10',
        s: '00',
        t: '10',
        u: '30',
        v: '20',
        w: '00',
        x: '20',
        y: '10',
        z: '00',
        '^': 'w0',
        '*': 'w1'
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

		//console.log('wordCounter:', font.wordCounter);
        var res = "<div class='animated-word delay-"+ String(font.wordCounter %5) + "'>";
        var all_caps = (word.toUpperCase() == word && word.toLowerCase() != word);
        if (all_caps) {                   
            // all caps
            word = "*" + word.toLowerCase();
        } else {
            word = word.replace(/[A-Z]/g, function(letter) { return "^" + letter.toLowerCase(); });
        }
		
        word.split("").forEach(function (char, i) {
            console.assert(char in font.alpha);
            //res += "<div class='letter backdrop'>";
			var c = font.alpha[char];
			var classStr = "animated-" + char + " c-" + c[0] + " g-" + c.slice(1,c.length);
			res += repl("<div class='letter $classStr'", [classStr]);
			res += ">" + char + "</div>";
			//res += "</div>"; // backdrop
			//console.log(res);
        });
        res += "</div>"; // animated-word
        return res;
    }
    font.testDups();
    return font;
})();


addFont(Animated);
