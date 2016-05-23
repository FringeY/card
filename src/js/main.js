// import $ from "../../node_modules/zepto/zepto.min.js";

const card = {
    init() {
        let ctx = document.getElementById('card').getContext('2d');
        let img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, 0, 300, 220);
            ctx.font = "48px serif";
            ctx.fillText("Hello world", 10, 50);
        }
        img.src = 'src/img/tencent.png';
    },
    draw() {

    }
};

card.init();