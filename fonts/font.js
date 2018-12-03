FONTS = [];

function addFont(font) {
    FONTS.push(font)
}

var DEFAULT_HEIGHT = 24;

Font = function () { 
    this.name = "Font Template";
    this.version = "1";
    this.heightCorrection = 17 / 24;  // this is how tall the letter is compared to the entire height of the Latin font (used for punctuation, special symbols, etc.)
    this.scale = 1;
    this.word2html = function (word, height) {
        return "[" + word + "]";
    }
    this.html = function (text, height) {
        height = height || (DEFAULT_HEIGHT * this.scale);
        var split = text.split(this.wordRegex);
        var w2h = this.word2html;
        var html = "";
        var height2 = height * this.heightCorrection;
        html += split.map(function (str, i) {
            return ((i % 2) ? ("<div class='word'>" + w2h(str, height2) + "</div>") : escapeHtml(str));
        }).join("");
        var css = 'font-size:' + height + 'px;';
        var classStr = "smartfont " + this.name;
        html = repl("<div style='$css' class='$classStr'>$html</div>", [css, classStr, html]);
		//console.log(html);
        return html;
    }
    this.wordRegex = /([a-zA-Z]+)/g; // need a capturing group!
    this.scrape = function () {
        this.knobVals = this.knobVals || {};
        if (!this.knobs) return;
        var k;
        for (k in this.knobs) {
            var el = $("#knobs [name=" + k + "]:visible");
            if (typeof this.knobs[k] == "string") {
                this.knobVals[k] = el.val();
                continue;
            }
            if (typeof this.knobs[k] == "number") {
                this.knobVals[k] = Number(el.val());
                continue;
            }
            if (typeof this.knobs[k] == "boolean") {
                this.knobVals[k] = el.is(":checked");
                continue;
            }
            if (this.knobs[k] instanceof Array) {
                this.knobVals[k] = this.knobs[k][el[0].selectedIndex][1];
                continue;
            }
        }
    }
}