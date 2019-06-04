function Shopping(){
    this.obj={};
    this.str='';
    this.d1h2=document.getElementsByClassName("d1h2")[0];

    this.init();    
}
Shopping.prototype={
    init:function(){
        this.render();
        this.bechecked();
        this.reduce();
        this.delete();
    },
    render:function(){
        this.agoods=JSON.parse(sessionStorage.goods);
        for(var i = 0;i<this.agoods.length;i++){
            this.list=this.agoods[i].list;
            this.id=this.agoods[i].id;
            this.num=this.agoods[i].num;
            this.img=this.agoods[i].img;
            this.name=this.agoods[i].name;
            this.price=this.agoods[i].price;
            this.str=`<ul class="goods" data-id="${this.id}" data-list="${this.list}">
                <li class="fxk"><input type="checkbox"></li>
                <li class="img"><img src="${this.img}"></li>
                <li class="name">${this.name}</li>
                <li class="price">${this.price}</li>
                <li class="button"><button  class="reduceNum">-</button><input type="text" value="${this.num}" class="amount"><button class="addNum">+</button></li>
                <li class="del"><a href="##"></a></li>
            </ul>`;
            this.d1h2.innerHTML+=this.str;
        } 
    },
    bechecked:function(){
        this.amount=document.getElementsByClassName("amount");
        this.price=document.getElementsByClassName("price");
        this.fxk=document.getElementsByClassName("fxk");
        this.totalPrices=document.getElementById("totalPrices");
        for(var i = 0;i<this.fxk.length;i++){
            this.fxk[i].children[0].checked=true;
            this.fxk[i].children[0].addEventListener("click",this.fxkCb.bind(this))
        }
        this.total();
    },
    fxkCb:function(){
        this.total();
    },
    total:function(){
        this.totalPrices.innerText="￥";
        this.sum=0;
        for(var j = 0 ;j<this.fxk.length;j++){
            if(this.fxk[j].children[0].checked){
                this.sum+=((Number(this.price[j].innerText.slice(1)*100))*(Number(this.amount[j].value)));
            }     
        } 
        this.totalPrices.innerText+= (this.sum/100).toFixed(2);   
    },
    reduce:function(){
        this.reduceNum=document.getElementsByClassName("reduceNum");
        this.amount=document.getElementsByClassName("amount");
        this.addNum=document.getElementsByClassName("addNum");
        for(var i = 0;i<this.reduceNum.length;i++){
            this.reduceNum[i].addEventListener("click",this.reduceCb.bind(this,i));
            this.addNum[i].addEventListener("click",this.addCb.bind(this,i));
            this.amount[i].addEventListener("blur",this.amountCb.bind(this,i));
        }
    },
    reduceCb:function(i){
        if(this.amount[i].value>1){
            this.amount[i].value=Number(this.amount[i].value)-1;
            this.agoods=JSON.parse(sessionStorage.goods);
            this.delid=this.amount[i].parentNode.parentNode.getAttribute("data-id");
            this.dellist=this.amount[i].parentNode.parentNode.getAttribute("data-list");
            for(var i = 0;i<this.agoods.length;i++){
                if(this.delid==this.agoods[i].id && this.dellist==this.agoods[i].list){
                    this.agoods[i].num=this.amount[i].value;
                    sessionStorage.goods=JSON.stringify(this.agoods);
                }
            }
        }
        this.total();
    },
    addCb:function(i){
        this.amount[i].value=Number(this.amount[i].value)+1;
        this.agoods=JSON.parse(sessionStorage.goods);
        this.delid=this.addNum[i].parentNode.parentNode.getAttribute("data-id");
        this.dellist=this.addNum[i].parentNode.parentNode.getAttribute("data-list");
        for(var i = 0;i<this.agoods.length;i++){
            if(this.delid==this.agoods[i].id && this.dellist==this.agoods[i].list){
                this.agoods[i].num=this.amount[i].value;
                sessionStorage.goods=JSON.stringify(this.agoods);
            }
        }
        this.total();
    },
    amountCb:function(i){
        this.agoods=JSON.parse(sessionStorage.goods);
        this.delid=this.addNum[i].parentNode.parentNode.getAttribute("data-id");
        this.dellist=this.addNum[i].parentNode.parentNode.getAttribute("data-list");
        for(var i = 0;i<this.agoods.length;i++){
            if(this.delid==this.agoods[i].id && this.dellist==this.agoods[i].list){
                this.agoods[i].num=this.amount[i].value;
                sessionStorage.goods=JSON.stringify(this.agoods);
            }
        }
        this.total();
    },
    delete:function(){
        this.del=document.getElementsByClassName("del");
        for(var i =0;i<this.del.length;i++){
            this.del[i].children[0].addEventListener("click",this.deleteCb.bind(this,i))
        }
    },
    deleteCb:function(i){
        this.delid=this.del[i].parentNode.getAttribute("data-id");
        this.dellist=this.del[i].parentNode.getAttribute("data-list");
        this.del[i].parentNode.remove();
        this.agoods=JSON.parse(sessionStorage.goods);
        console.log(this.delid)
        for(var i = 0;i<this.agoods.length;i++){
            if(this.delid==this.agoods[i].id && this.dellist==this.agoods[i].list){
                this.agoods.splice(i,1);
                sessionStorage.goods=JSON.stringify(this.agoods);
            }
        }
        this.total();
    },
}