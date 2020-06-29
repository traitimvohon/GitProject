    var canvas = document.getElementById("game");
    var context = canvas.getContext("2d");
    var paddle = {
        width:70,
        height:10,
        x:canvas.width/2-35,
        y:canvas.height-10,
        speed:10,
        isMovingleft: false,
        isMovingRight: false,
    };
    var ball = {
        x:canvas.width/2,
        y:canvas.height- paddle.height - 10,
        dx:5,
        dy:5,
        radius:10
    };
    var Brickconfig = {
        offsetX: 25,
        offsetY: 25,
        margin: 25,
        height: 15,
        width: 70,
        totalRow: 4,
        totalCol: 4
    };
     var UserScore = 0;
    var isGameover = false;
    var isGamewin = false;
    var maxScore = Brickconfig.totalCol*Brickconfig.totalRow;
    var Bricklist=[];
    for (var i = 0; i < Brickconfig.totalRow; i++) {
        for(var j =0;j<Brickconfig.totalCol;j++){
            Bricklist.push({
                x: Brickconfig.offsetX + j*(Brickconfig.width + Brickconfig.margin),
                y:Brickconfig.offsetY + i*(Brickconfig.height + Brickconfig.margin),
                isBroken: false
            });
        }
    }
    document.addEventListener('keyup',function(event){
        if (event.keyCode ==37) {
            paddle.isMovingleft = false;
        }else if (event.keyCode == 39) {
            paddle.isMovingRight = false;
        }
    })
    document.addEventListener('keydown',function(event){
        if (event.keyCode ==37) {
            paddle.isMovingleft = true;
        }else if (event.keyCode == 39) {
            paddle.isMovingRight = true;
        }
    })
    function draball(){
        context.beginPath();
        context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
        context.fillStyle = 'red';
        context.fill();
        context.closePath();
    }
    function drawBricks() {
        Bricklist.forEach(function(b){
            if (!b.isBroken) {
            context.beginPath();
            context.rect(b.x,b.y, Brickconfig.width ,Brickconfig.height);
            context.fill();
            context.closePath(); 
            }
        }) 
    }
    function drawpaddle() {
        context.beginPath();
        context.rect(paddle.x,paddle.y,paddle.width,paddle.height);
        context.fill();
        context.closePath();
    }
    function xulyvacham() {
        if (ball.x < ball.radius || ball.x>canvas.width-ball.radius){
            ball.dx=-ball.dx;
        }
        if (ball.y<ball.radius){
            ball.dy=-ball.dy;
        }
    }
    function xulychampaddle() {
        if (ball.x + ball.radius>= paddle.x 
            && ball.x+ ball.radius<=paddle.x + paddle.width 
            && ball.y+ ball.radius >= canvas.height - paddle.height + ball.radius*Math.sqrt(2)/2) {
            ball.dy = -ball.dy;
        }
    }
    function xulyphagach() {
        Bricklist.forEach(function(b) {
            if (!b.isBroken) {
                if (ball.x >= b.x && ball.x <= b.x + Brickconfig.width && ball.y + ball.radius >= b.y && ball.y -ball.radius <= b.y + Brickconfig.height) {
                    ball.dy = -ball.dy;
                    b.isBroken = true;
                    UserScore +=1;
                    document.getElementById("diemso").innerHTML = "Điểm Số: "+UserScore
                    if (UserScore == maxScore){
                        isGameover = true;
                        isGamewin = true;
                    }
                }
            }
        })
    }
    function update_vitri() {
        ball.x+=ball.dx;
        ball.y+=ball.dy;
    }
    function update_saukhichamthanhchan() {
        if (paddle.isMovingleft) {
                paddle.x -=paddle.speed;
            }else if (paddle.isMovingRight) {
                paddle.x += paddle.speed;
            }
            if (paddle.x<0) {
                paddle.x=0;
            }else if (paddle.x > canvas.width-paddle.width) {
                paddle.x = canvas.width- paddle.width;
            }
    }
    function checkgameOver() {
       if( ball.y>canvas.height-ball.radius) {
                isGameover = true;
            }
    }
    function restart() {
        if (isGameover == true || isGamewin == true) {
            document.location.reload();
        } 
}
    function handlegameover() {
        if (isGamewin) {
            //alert("You Win!");
            document.getElementById("content").innerHTML = "<h3>You Win</h3>";
        }else{
            document.getElementById("content").innerHTML = "<h3>Game Over</h3>"+"<button onclick="+"restart()"+">CHƠI LẠI</button>";
            //document.getElementById("content").innerHTML = "";
        }
    }
    function dislay(){
        draball();
        drawBricks();
        drawpaddle();
    }
    function dislay_count() {
        
    }
    function draw(){
        if (!isGameover) {
            context.clearRect(0,0,canvas.width,canvas.height);
            draball();
            drawBricks();
            drawpaddle();
            xulyvacham();
            xulychampaddle(); 
            update_vitri();
            update_saukhichamthanhchan();
            xulyphagach();
            checkgameOver();
            requestAnimationFrame(draw);
        }else{
            handlegameover();
        }
    }
    dislay();
    