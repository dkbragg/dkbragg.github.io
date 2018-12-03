function getHeightScale(font) { 
    var WIDTH = 1000;
    var BASE = 24;
    var BASE_FONT = Latin;
    var target = AvgDivHeight(BASE_FONT, BASE, WIDTH);
    console.log("Target avg height:", target);
    var height = BASE;
    best_scale = undefined;
    best_delta = undefined;
    for(var i=0;i<8;i++) {
        var h = AvgDivHeight(font, height, WIDTH);
        var delta = (target/h + h/target)/2 - 1;
        var scale = height/BASE;
        if(best_delta===undefined || delta<best_delta) {
            best_delta = delta;
            best_scale = scale;
        }
        console.log(i, "scale:", scale, "h:", h, "delta:", delta);
        if (delta < 0.00000001) {
            break;
        }
          height *= Math.sqrt(target / h);
    }
    return best_scale;
}

function AvgDivHeight(font, font_height, div_width) {
    measure = $("#measure");
    if(measure.length==0) {
        $("body").append("<div id='measure' style='width:" + div_width + "px;'></div>");
        measure = $("#measure");
    }
    measure.show();
    var corpus_name;
    var num_corpora = 0;
    var SLICE_SIZE = 1000;
    var MAX_LEN = 200000;
    var tot_height = 0;
    for (corpus_name in TEXTS) {
        var i;
        var corpus = TEXTS[corpus_name].replace(/[^a-zA-Z]+/g," ").slice(0, MAX_LEN);
        for (i = 0; i < corpus.length; i += SLICE_SIZE) {
            var text = corpus.slice(i, SLICE_SIZE + i);
            measure.html(font.html(text, font_height));            
            var div_height = measure.height();
            tot_height += div_height / corpus.length;
        }
        num_corpora += 1;
    }
    return tot_height;
}

