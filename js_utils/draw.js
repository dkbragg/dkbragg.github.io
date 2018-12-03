// My drawings are arrays of commands. Commands are like:
// ['rect', x, y, width, height, (color), (back)] 
// ['advance', 0.5] advances future commands to the right by 0.5
// 'next' moves the x position to the last drawn box, e.g., [['rect', 0, 0, 2, 2], 'next', ['rect', 1, 0, 1, 2]] draws:
// ** *
// ** *
//
// Opts include scale



Draw = {
    svg: function (commands, opts) {
        var ans = "";
        opts = opts || {};
        var scale = opts.scale || 1;
        var bbox = undefined; // unscaled
        var originX = 0;
        var originY = 0;
        var deltaX = 0;
        function touch(x, y) {
            if (bbox === undefined) {
                bbox = [x, y, x, y];
                return;
            }
            if (x < bbox[0]) bbox[0] = x;
            if (x > bbox[2]) bbox[2] = x;
            if (y < bbox[1]) bbox[1] = y;
            if (y > bbox[3]) bbox[3] = y;
        }
        commands.forEach(function (cmd) {
            if (cmd === 'next') {
                if (bbox) deltaX = bbox[2];
                return;
            }
            var cmd_name = cmd[0];
            var x = cmd[1];
            if (cmd_name == 'advance') {
                deltaX += x;
                return;
            }
            var y = cmd[2];
            if (cmd_name == 'rect') {
                var width = cmd[3];
                var height = cmd[4];
                touch(x + deltaX, y);
                touch(x + deltaX + width, y + height);
                var color = cmd[5] || "black";
                var back = cmd[6];
                ans = (back ? "" : ans) + repl('<rect x="$x" y="$y" width="$width" height="$height" style="fill:$color;stroke:none;" />',
                            [(x + deltaX) * scale, y * scale, width * scale, height * scale, color]) + (back ? ans : "");
            } else if (cmd_name == 'ellipse') {
                var width = cmd[3];
                var height = cmd[4];
                touch(x + deltaX, y);
                touch(x + deltaX + width, y + height);
                var color = cmd[5] || "black";
                var back = cmd[6];
                var classStr = "";
                if(cmd[7]) classStr = 'class="' + cmd[7] +'"';
                str = repl('<ellipse cx="$x" cy="$y" rx="$width" ry="$height" style="fill:$color;stroke:none;" $classStr />',
                            [(x + deltaX + width/2) * scale, (y + height/2) * scale, (width/2) * scale, (height/2) * scale, color, classStr]);
                ans = (back ? "" : ans) + str + (back ? ans : "");                                                
            } else {
                assert(false);
            }     
        });
        var style_string = opts.style ? 'style="' + opts.style + '"' : "";
        var class_string = opts.class ? 'class="' + opts.class + '"' : "";
        ans = repl('<svg width="$width" height="$height" $style $class >\n', [(bbox[2] - originX) * scale, (bbox[3] - originY) * scale, style_string, class_string]) //style="shape-rendering:crispEdges;"  // style="vertical-align:bottom"
        + ans + '\n</svg>';

        return ans;
    }
};


