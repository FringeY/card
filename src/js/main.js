// import $ from "../../node_modules/zepto/zepto.min.js";
import Fastclick from "../../node_modules/fastclick";

let info = {
    name: '',
    company: 0,
    job: 0
};
const companys = {
    0: '腾讯',
    1: '阿里巴巴',
    2: '百度',
    3: '网易'
};
const jobs = {
    0: '产品实习经理',
    1: '运营实习生',
    2: '市场部实习生',
    3: '前端实习生',
    4: '移动开发工程师',
    5: '视觉设计实习生'
};
const images = {
    0: 'public/build/img/tencent.png',
    1: 'public/build/img/alibaba.png',
    2: 'public/build/img/baidu.png',
    3: 'public/build/img/wangyi.png'
};

//表单页
const form = {
    init() {
        this.render();
        this.bind();
        document.querySelector('.button').addEventListener('click', () => {
            if (info.name.replace(/\s/g, '') === '') {
                alert('请输入你的姓名');
                return false;
            };
            location.hash = `type=result&name=${info.name}&company=${info.company}&job=${info.job}`;
        });
    },
    bind() {
        for (let key in info) {
            let input = document.querySelector(`[name=${key}]`);
            info[key] = input.value;
            input.addEventListener('change', function () {
                info[key] = this.value;
                console.log(info);
            });
        };
    },
    render() {
        document.getElementById('form').style.display = 'block';
        document.getElementById('result').style.display = 'none';
        let company = document.createElement('select');
        let job = document.createElement('select');
        for (let key in companys) {
            let opt = document.createElement('option');
            opt.text = companys[key];
            opt.value = key;
            company.appendChild(opt);
        };
        for (let key in jobs) {
            let opt = document.createElement('option');
            opt.text = jobs[key];
            opt.value = key;
            job.appendChild(opt);
        };
        company.name = 'company';
        company.value = info.company;
        job.name = 'job';
        job.value = info.job;
        document.querySelector('.company').replaceChild(company, document.querySelector('[name=company]'));
        document.querySelector('.job').replaceChild(job, document.querySelector('[name=job]'));
    }
};

//展示页
const result = {
    init() {
        for (let key in images) {
            let image = new Image();
            image.src = images[key];
        };          
    },
    render() {
        document.getElementById('result').style.display = 'block';
        document.getElementById('form').style.display = 'none';        
        let img = new Image();
        img.src = images[info.company];
        img.onload = () => {
            let canvas = document.getElementById('canvas');
            let ctx = canvas.getContext('2d');
            let date = new Date();
            ctx.drawImage(img, 0, 0);
            ctx.font = "22px no-serif";
            ctx.fillText(info.name, 254, 250);
            ctx.fillText(jobs[info.job], 254, 300);
            ctx.fillText(`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`, 254, 348);
            document.getElementById('card').src = canvas.toDataURL("image/png");
        };  
    }
};

//路由
const route = {
    init() {
        this.render.call(this, this.parse()); 
        window.addEventListener('hashchange', () => {
            this.render.call(this, this.parse()); 
        });  
    },
    parse() {
        let hash = location.hash;
        let type = (hash.match(/type=(?:(\w+)&)?/) ? location.hash.match(/type=(?:(\w+)&)?/)[1] : 'form') || 'form';
        info.name = (hash.match(/name=(?:(\w+)&)?/) ? location.hash.match(/name=(?:(\w+)&)?/)[1] : '') || '';
        info.company = (hash.match(/company=(?:(\w+)&)?/) ? location.hash.match(/company=(?:(\w+)&)?/)[1] : 0) || 0;
        info.job = (hash.match(/job=(?:(\w+)&)?/) ? location.hash.match(/job=(?:(\w+)&)?/)[1] : 0) || 0;
        return type;
    },
    render(type) {
        console.log(type);
        if (!info.name || info.name.replace(/\s/g, '') === '') {
            type = 'form';
        }
        switch (type) {
            case 'form':   
                form.init();
                result.init();              
                break;
            case 'result':
                result.init();
                result.render();
                break;
            default:
                break;    
        }
    }
};

window.onload = function () {
    FastClick.attach(document.body);
    route.init();
    
};
