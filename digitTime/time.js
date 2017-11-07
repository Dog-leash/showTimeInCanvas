var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;//距离画布上边距的距离
var MARGIN_LEFT = 30;//第一个数字距离画布左边距的距离
var T = new Date();
var curHours = add_zero(T.getHours());
var curMinutes = add_zero(T.getMinutes());
var curSeconds = add_zero(T.getSeconds());

var balls = [];
const colors = ["#33B5E5","#0099CC","AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","CC0000"];


window.onload = function() {
    var canvas = document.getElementById("canvas")
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    setInterval(
        function() {
            render(context);
            getCurTime();
        },
        50
    );

}


function render(cxt) {
    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(curHours / 10), cxt);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours % 10), cxt);
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10), cxt);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10), cxt);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10), cxt);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds % 10), cxt);

    for(var i = 0;i<balls.length;i++){
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
        cxt.closePath();

        cxt.fill();
    }

}

function getCurTime() {
    var T = new Date();
    var nexHours = add_zero(T.getHours());
    var nexMinutes = add_zero(T.getMinutes());
    var nexSeconds = add_zero(T.getSeconds());

    if(nexSeconds != curSeconds ){
        if( parseInt(curHours / 10) != parseInt(nexHours/10)){
            addBalls(MARGIN_LEFT+0,MARGIN_TOP,arseInt(curHours / 10));
        }
        if(parseInt(curHours % 10) !=parseInt(nexHours % 10)){
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1),MARGIN_TOP,parseInt(curHours % 10));
        }
        if( parseInt(curMinutes / 10) != parseInt(nexMinutes/10)){
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
        }
        if(parseInt(curMinutes % 10) !=parseInt(nexMinutes % 10)){
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
        }
        if( parseInt(curSeconds / 10) != parseInt(nexSeconds/10)){
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
        }
        if(parseInt(curSeconds / 10) != parseInt(nexSeconds%10)){
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nexSeconds % 10));
        }
        curSeconds = nexSeconds;
        curMinutes = nexMinutes;
        curHours = nexHours;
    }

    updateBalls();

}

function updateBalls(){
    for( var i =0;i<balls.length;i++){
        balls[i].x +=balls[i].vx;
        balls[i].y +=balls[i].vy;
        balls[i].vy +=balls[i].g;

        if(balls[i].y >= WINDOW_HEIGHT-RADIUS){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = -balls[i].vy*0.75;
        }
    }

    //对超出画布的小球进行处理，提高性能
     var count = 0;
    for(var i = 0;i < balls.length;i++){
        if(balls[i].x +RADIUS >0 && balls[i].x-RADIUS<WINDOW_WIDTH){
            balls[count++] = balls[i];
        }
    }

    while( balls.length > Math.min(300,count)){
        balls.pop();
    } 
}

function addBalls(x,y,num){
    for( var i = 0;i<digit[num].length;i++)
        for(var j = 0;j<digit[num][i].length;j++)
            if(digit[num][i][j] ==1){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy:-5+Math.random(),
                    color:colors[Math.floor(Math.random()*colors.length)]
                }
                balls.push(aBall);
            }
}

function add_zero(temp) {
    if (temp < 10)
        return "0" + temp;
    else
        return temp;
}


//构成时间数字的小球绘制方法
function renderDigit(x, y, num, cxt) {

    cxt.fillStyle = "rgb(0,102,153)";

    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++)
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();

                cxt.fill()
            }
}
