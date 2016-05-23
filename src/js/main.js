// import $ from "../../node_modules/zepto/zepto.min.js";

const card = {
    init() {
        let canvasRect = document.getElementById('card').getBoundingClientRect();
        let ctx = document.getElementById('card').getContext('2d');
        let img = new Image();
        let newImg = {
            width: canvasRect.right - canvasRect.left,
            width: canvasRect.bottom - canvasRect.top
        };
        img.onload = function () {
            ctx.drawImage(img, 0, 0, 300, 220);
            ctx.font = "48px serif";
            ctx.fillText("Hello world", 10, 50);
        };
        img.src = 'public/build/img/tencent.png';
    },
    draw() {

    }
};

window.onload = function () {
    card.init();    
};
