var canvas = document.getElementById("canvas");
var processing = new Processing(canvas, function(processing) {
    processing.size(400, 400);
    processing.background(0xFFF);

    var mouseIsPressed = false;
    processing.mousePressed = function () { mouseIsPressed = true; };
    processing.mouseReleased = function () { mouseIsPressed = false; };

    var keyIsPressed = false;
    processing.keyPressed = function () { keyIsPressed = true; };
    processing.keyReleased = function () { keyIsPressed = false; };

    function getImage(s) {
        var url = "https://www.kasandbox.org/programming-images/" + s + ".png";
        processing.externals.sketch.imageCache.add(url);
        return processing.loadImage(url);
    }

    function getLocalImage(url) {
        processing.externals.sketch.imageCache.add(url);
        return processing.loadImage(url);
    }

    // use degrees rather than radians in rotate function
    var rotateFn = processing.rotate;
    processing.rotate = function (angle) {
        rotateFn(processing.radians(angle));
    };

    with (processing) 
    {
        var Player = function(config)
        {
            this.xPos = config.xPos;
            this.yPos = config.yPos;
            this.width = config.width;
            this.height = config.height;
            this.color = config.color || color(47, 99, 189);

            this.head = function(xPos, yPos, width, height)
            {
                var setXPos = xPos;
                var setYPos = yPos;
                var setWidth = width;
                var setHeight = height;
                noStroke();
                fill(0, 0, 0);
                rect(setXPos, setYPos, setWidth, setHeight, 5);
                fill(this.color);
                rect(setXPos + setWidth * 0.15, setYPos + setHeight * 0.15, setWidth * 0.7, setHeight * 0.7, 5);
            };
            
            this.body = function(xPos, yPos, width, height)
            {
                fill(20, 140, 20);
                noStroke();
                rect(xPos, yPos, width, height, 5);
            };
            
            this.draw = function()
            {
                stroke(0, 0, 0);
                rect(this.xPos + this.width * 0.20, this.yPos + this.height * 0.25, this.width * 0.60, this.height * 0.75, 5);
                this.body(this.xPos + this.width * (1 / 3), this.yPos + this.height * 0.25, this.width * (1 / 3), this.height * 0.75);
                this.head(this.xPos + this.width * 0.25, this.yPos, this.width * 0.5, this.height / 2);
                
                
                
                noFill();
                stroke(0, 0, 0);
                strokeWeight(1);
                rect(this.xPos, this.yPos, this.width, this.height);
            };
        };
        
        var player = new Player({
           xPos : 200 - 20, 
           yPos : 200 - 20,
           width : 40,
           height : 40,
        });
        
        background(255, 255, 255);
        player.draw();
    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});