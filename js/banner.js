function Banner(){
    this.banner = document.getElementById("banner");
    this.circular = document.getElementById("circular");
    this.acir = document.querySelectorAll("#circular a");
    this.ali = this.banner.getElementsByTagName("li");
    this.inow = 0;
    this.timer = null; 
    this.banner.appendChild(this.ali[0].cloneNode(true));
    this.liw = this.ali[0].offsetWidth;
    this.banner.style.width = this.liw * this.ali.length + "px";
    this.init();
}
Banner.prototype={
    init:function(){
        // console.log(this.banner.style.width);
        this.autoplay();
        this.anchange();
    },
    autoplay: function () {
        this.timer = setInterval(this.autoplayCb.bind(this),4000)
    },
    autoplayCb: function () {
        if (this.inow == this.ali.length - 1) {
            this.banner.style.left = 0;
            this.inow = 1;
        } else {
            this.inow++;
        }
        this.toimg();
    },
    toimg: function () {
        for (var i = 0; i < this.acir.length; i++) {
            this.acir[i].className = "";
        }
        if (this.inow == this.ali.length - 1) { //注意这里要跟哪个数组作比较
            this.acir[0].className = "active";
        } else {
            this.acir[this.inow].className = "active";
        }
        move(this.banner, {
            left: -this.liw * this.inow
        })
    },
    anchange: function () {
        for (var i = 0; i < this.acir.length; i++) {
            this.acir[i].index = i;
            this.acir[i].addEventListener("click", this.anchangeCb.bind(this,this.acir[i])); 
        }
    },
    anchangeCb: function (that) {
        clearInterval(this.timer);
        for (var j = 0; j < this.acir.length; j++) {
            this.acir[j].className = "";
        }
        that.className = "active";
        this.inow = that.index;
        this.toimg();
        this.autoplay();
    }
}
















