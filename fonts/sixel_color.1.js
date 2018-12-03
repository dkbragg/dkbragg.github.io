var SixelColor = (function () {

    var font = new Font();

    font.name = "SixelColor";
    font.version = "1";
    font.description = "In SixelColor, like Sixel, each letter is pattern of six squares. However, letters are now colored.";
    //font.scale = 1.210649;
	font.scale = 1.13;

    
    font.TOP = 0;
    font.BOT = 0;

    font.alpha = {
        e: parseInt(101101, 2),
        t: parseInt(100111, 2),
        a: parseInt(1011, 2),
        o: parseInt(11011, 2),
        i: parseInt(11100, 2),
        n: parseInt(11001, 2),
        s: parseInt(110011, 2),
        h: parseInt(111010, 2),
        r: parseInt(11010, 2),
        d: parseInt(11111, 2),
        l: parseInt(111001, 2),
        c: parseInt(111101, 2),
        u: parseInt(1001, 2),
        m: parseInt(111111, 2),
        w: parseInt(110001, 2),
        f: parseInt(111100, 2),
        g: parseInt(11101, 2),
        y: parseInt(100011, 2),
        p: parseInt(111110, 2),
        b: parseInt(111011, 2),
        v: parseInt(10001, 2),
        k: parseInt(10101, 2),
        j: parseInt(1110, 2),
        x: parseInt(101010, 2),
        q: parseInt(110111, 2),
        z: parseInt(11110, 2),
        " ": parseInt(111, 2)
    };

    //var colorMap = ["red", "#5f5", '#55f', "white", "orange", 'yellow'];
	var colorMap = ["red", "blue", "white"]
	//var colorMap = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33"]; // Colors from ColorBrewer
	//var colorMap = ["#C98286", "#AD924B", "#5CA386", "#529EBD", "#A88ABD", "#A88ABD"]; //Evenly spaced Munsell hues.
	
	
    font.colors = {
        e: colorMap[0],
        t: colorMap[1],
        a: colorMap[2],
        o: colorMap[1],
        i: colorMap[1],
        n: colorMap[1],
        s: colorMap[0],
        h: colorMap[0],
        r: colorMap[1],
        d: colorMap[1],
        l: colorMap[2],
        c: colorMap[2],
        u: colorMap[0],
        m: colorMap[0],
        w: colorMap[2],
        f: colorMap[2],
        g: colorMap[1],
        y: colorMap[0],
        p: colorMap[0],
        b: colorMap[0],
        v: colorMap[2],
        k: colorMap[1],
        j: colorMap[1],
        x: colorMap[0],
        q: colorMap[2],
        z: colorMap[2],
        " ": "white",
    }


    font.testDups = function () {
        var keys = Object.keys(font.alpha);
        var hash = {};
        keys.forEach(function (key) {
            var val = font.alpha[key];
            //console.assert(!hash[val], "COLLISION: " + hash[val] + "=" + key);
            hash[val] = key;
        })
        font.testDups = function () { };
    }

    /*font.html = function (text) {
        var split = text.split(this.wordRegex);
        var w2h = this.word2html;
        return split.map(function (str, i) {
            if (str.match(/^[a-zA-Z ]+$/)) return w2h(str);
            return escapeHtml(str);
        }).join("");
    }*/

    font.word2html = function (word, height) {
        var commands = [];
        font.testDups();
        if (word.length == 0) return "";

        var res = "";
        function rect(x, y, width, height, color) {
            commands.push(['rect', x, y, width+0.02, height+0.02, color]);
        }
        var x = 0;
        function draw(c, width, color) {
            if ((c & 4)) rect(x, font.BOT, 1, width, color);
            if ((c & 2)) rect(x, font.BOT + 1.5 - width / 2, 1, width, color);
            if ((c & 1)) rect(x, font.BOT + 3 - width, 1, width, color);
            x++;
        }

        word.split("").forEach(function (char, i) {
            var lchar = char.toLowerCase();
            var width = 1;
            //rect(x, font.BOT, width, 3);
            //x += width;

            //rect(x, font.BOT, width, 3, "yellow"); //"rgb(146,208,80)");

            var c = font.alpha[lchar];
            var color = font.colors[lchar];
            if (c > 077) {
                draw(c >> 6, width, color);
                c = c & 077;
            }
            if (c > 07) {
                draw(c >> 3, width, color);
                c = c & 07;
            }
            draw(c, width, color);
            x+=0.5;
        });
        //    rect(0, 0, x, font.BOT);
        //    rect(0, font.BOT + 3, x, font.TOP);
        //return "<div class='word'>" + Draw.svg(commands, { scale: .3333333333*height }) + "</div>";
		return Draw.svg(commands, { scale: .3333333333*height });
    }
    return font;
})();

addFont(SixelColor);