function Details(){
    this.str='';
    this.d1hbj=document.getElementsByClassName("d1hbj")[0];
    this.init();
    this.arr=[];  
}
Details.prototype={
    init:function(){
        this.getId();  
    },
    getId:function(){
        this.list=sessionStorage.list;
        this.id=sessionStorage.id;
        if(this.list==1){
            axios({
                method:"get",
                url:"../php/detailsList1.php",
                data:{
                    id:this.id
                }
            }).then(this.getIdCb.bind(this))
        }else{
            axios({
                method:"get",
                url:"../php/detailsList2.php",
                data:{
                    id:this.id
                }
            }).then(this.getIdCb.bind(this))
        }
    },
    getIdCb:function(data){
        this.str=`<div class="d1h">
        <div class="d1h1">
            <i><img src="${data[0].img}"></i>
            <ul>
                <li><img src="${JSON.parse(data[0].details).img1}"></li>
                <li><img src="${JSON.parse(data[0].details).img2}"></li>
                <li><img src="${JSON.parse(data[0].details).img3}"></li>
                <li><img src="${JSON.parse(data[0].details).img4}"></li>
            </ul>
            <span></span>
        </div>
        <div class="d1h2">
            <h3>${data[0].name}</h3>
            <i>${data[0].message}</i>
            <p class="price">${data[0].price}</p>
            <b>商品支持： 花呗分期 3/6/12 期</b>
            <i>颜色</i>
            <p class="color"></p>
            <i>花呗分期</i>
            <p class="flower"></p>
            <i>选择数量</i>
            <p class="count"><button id="reduceNum">-</button><input type="text" value="1" id="num"><button id="addNum">+</button></p>
            <a href="shopping.html" class="toshopping">加入购物车</a>
            <a href="shopping.html" class="toshopping">立即购买</a>
        </div>
    </div>`;
        this.img=data[0].img;
        this.name=data[0].name;
        this.price=data[0].price;
        this.d1hbj.innerHTML=this.str;
        this.addNum();
        this.shopping();
    },
    addNum:function(){
        this.addNum=document.getElementById('addNum');
        this.reduceNum=document.getElementById('reduceNum');
        this.num=document.getElementById('num');
        this.addNum.addEventListener("click",this.addNumCb.bind(this));
        this.reduceNum.addEventListener("click",this.reduceNumCb.bind(this));
        this.toshopping=document.getElementsByClassName("toshopping");
    },
    addNumCb:function(){
        this.num.value=Number(this.num.value)+1;
    },
    reduceNumCb:function(){
        if(this.num.value>1){
			this.num.value=Number(this.num.value)-1;
		}
    },
    shopping:function(){
        for(var i =0;i<this.toshopping.length;i++){
            this.toshopping[i].addEventListener("click",this.shoppingCb.bind(this));
        }
    },
    shoppingCb:function(){
        if(!sessionStorage.goods){
            sessionStorage.goods=JSON.stringify([{id:this.id,list:this.list,num:this.num.value,name:this.name,price:this.price,img:this.img}]);
		}else{
			this.agoods =JSON.parse(sessionStorage.goods);
			bStop=true;
		 	for(var i=0;i<this.agoods.length;i++){
		 		if(this.agoods[i].id==this.id){
					bStop=false;
                    this.agoods[i].num=Number(this.agoods[i].num)+Number(this.num.value);
                    sessionStorage.goods=JSON.stringify(this.agoods);
					break;
		 		}
			}
			console.log(sessionStorage.goods)
			if(bStop){
				this.agoods.push({id:this.id,list:this.list,num:this.num.value,name:this.name,price:this.price,img:this.img});
				sessionStorage.goods=JSON.stringify(this.agoods);
			}
		 }
    }
}