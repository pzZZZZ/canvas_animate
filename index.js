function Circle(x,y){
    this.x = x;
    this.y = y;
    this.r = Math.random() * 14 + 1;
    this._mx = Math.random() * 2 - 1;
    this._my = Math.random() * 2 - 1;
    this.drarCircle = function(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r,0, 360);
        ctx.closePath();
        ctx.fillStyle  = 'rgba(204, 204, 204, .2)';
        ctx.fill();
    }
    this.drawline = function(ctx, _circle){
        var dx = this.x - _circle.x;
        var dy = this.y - _circle.y;
        var  distans = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        if(distans < 150){
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(_circle.x,_circle.y);
            ctx.closePath();
            ctx.strokeStyle = 'rgba(204, 204, 204, .1)';
            ctx.stroke();
        }
    }
    this.move = function(w, h){
        this._mx = (this.x < w && this.x > 0) ? this._mx: ( - this._mx);
        this._my = (this.y < h && this.y > 0) ? this._my: ( - this._my);
        this.x += this._mx/2;
        this.y += this._my/2;

    }
}

function curCircle(){
    Circle.call(this);
    this.drawCircle = function(ctx){
        ctx.beginPath();
        this.r = (this.r < 14 && this.r >1)? 5 : 5;
        ctx.arc(this.x, this.y, this.r, 0, 360);
        ctx.closePath();
        ctx.fillStyle = 'rgba(45, 120, 244, .1)';
        ctx.fill();


    }

}
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
let canvas = document.querySelector("#mainbox");
let ctx = canvas.getContext("2d");
let w = canvas.width =  canvas.offsetWidth;
let h = canvas.height = canvas.offsetHeight;
let circles = [];
let current_circle  = new curCircle(0, 0);

let draw = function(){
     ctx.clearRect(0, 0, w, h);
    for(let i = 0; i < circles.length; i++) {
        circles[i].move(w, h);
        circles[i].drarCircle(ctx);
        for(j = i + 1; j < circles.length; j++) {
            circles[i].drawline(ctx, circles[j])
        }
    }
    if(current_circle.x){
        current_circle.drawCircle(ctx);
        for(var k = 1; k < circles.length; k++) {
            current_circle.drawline(ctx, circles[k]);
        }
    }
    requestAnimationFrame(draw);
}
let init = function(num){
    for(var i = 0; i < num; i ++){
        circles.push(new Circle(Math.random() * w, Math.random() * h));
    }
    draw();
}

window.addEventListener('load', init(50));
window.onmousemove = function(e) {
    e = e || window.event;
    current_circle.x = e.clientX;
    current_circle.y = e.clientY;
}, window.onmouseout = function() {
    current_circle.x = null;
    current_circle.y = null;
};