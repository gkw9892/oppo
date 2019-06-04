function Option(){
    this.headjs=document.getElementById('headjs');   
    this.headjs.innerHTML=Option.headerjs; 
    this.tabControl=document.getElementById('tabControl');
    this.ali = document.getElementsByClassName('option');
    this.headerbj=document.getElementById('headerbj');
    this.icon=document.getElementById('icon');
    this.init();
}
Option.headerjs=`<div class="headerbj" id="headerbj">
<div class="header">    
    <h1><a href="list.html"><img src="../img/headerBlack.png" data-img="../img/headerWhite.png"></a></h1>
    <ul class="tab">
        <li class="option" data-series="Find"><a href="##">Find系列</a></li>
        <li class="option" data-series="Reno"><a href="##">Reno系列</a></li>
        <li class="option" data-series="R"><a href="##">R系列</a></li>
        <li class="option" data-series="A"><a href="##">A系列</a></li>
        <li class="option" data-series="K"><a href="##">K系列</a></li>
        <li class="option" data-series="配件"><a href="##">配件</a></li>
        <li class="nooption"><a href="##">服务</a></li>
        <li class="nooption"><a href="##">商城</a></li>
    </ul>
    <div class="icon" id="icon"><a><i class="iconfont">&#xe640;
    </i></a></div>
    <ul class="icon2">
        <li><a href="shopping.html"><i class="iconfont">&#xe621;<span>购物车</span>
        </i></a></li>
        <li><a href="##"><i class="iconfont">&#xe65f;<span>个人中心</span>
        </i></a></li>
        <li><a href="login.html"><i class="iconfont">&#xe617;<span>登录</span>
        </i></a></li>
    </ul>
</div>
</div>
<div class="tabControl">
    <ul id="tabControl" style="width: max-content">
        <!-- <li><i><img src="../img/tab1.png"></i><p>Find X</p></li> -->
    </ul>
</div>
`
Option.prototype={
    init:function(){
        this.xxk();
        this.hidtabControl();
        this.menu();
    },
    xxk:function(){
        for(var i = 0;i<this.ali.length;i++){
            this.ali[i].addEventListener("mouseover",this.xxkCb.bind(this,this.ali[i]))
            this.ali[i].addEventListener("mouseout",this.xxkCb2.bind(this,this.ali[i]))
        }
    },
    xxkCb:function(that){
        this.tabControl.parentNode.style.zIndex="888";
        axios({
            method:"get",
            url:"../php/tab.php",
            data:{
                series:that.getAttribute('data-series')
            }
        }).then(this.toxxkCb.bind(this))
    },
    xxkCb2:function(){
        this.tabControl.parentNode.style.zIndex="0";
    },
    toxxkCb:function(data){
        var str ="";
        for(var i =0;i<data.length;i++){
            str+=`<li><i><img src="../img/${data[i].img}"></i>
            <p>${data[i].p}</p></li>`
        }
        this.tabControl.innerHTML=str;
    },
    hidtabControl:function(){
        
        this.tabControl.addEventListener("mousemove",this.hidtabControlCb1.bind(this))
        this.tabControl.parentNode.addEventListener("mouseout",this.hidtabControlCb.bind(this))
        this.tabControl.parentNode.addEventListener("mousemove",this.hidtabControlCb1.bind(this))
        // this.headerbj.addEventListener("mousemove",this.hidtabControlCb1.bind(this))
    },
    hidtabControlCb:function(){
        this.tabControl.parentNode.style.zIndex="0";
    },
    hidtabControlCb1:function(){
        this.tabControl.parentNode.style.zIndex="888";
    },
    hidtabControlCb2:function(){
        this.tabControl.parentNode.style.zIndex="0";
    },
    // 菜单栏
    menu:function(){
        
        this.icon.addEventListener("click",this.menuCb.bind(this,this.icon))
    },
    menuCb:function(that){
        this.icon2=document.getElementsByClassName("icon2")[0];
        this.icon2.style.display="block";
        that.addEventListener("click",this.hidmenu.bind(this,that))
    },
    hidmenu:function(that){
        this.icon2.style.display="none";
        this.icon.removeEventListener("click",this.menu());
    }
}