var Latin = (function () {

    var font = new Font();

    font.name = "Latin";
    font.version = "1";
    //font.hidden = true;
    font.description = "The good old fashioned ABC's you know and love.";
    font.heightCorrection = 19 / 24;
    font.scale = 1.0;  // by definition

    font.word2html = function (word, height) {
        return word;
    }



    return font;
})();

addFont(Latin);