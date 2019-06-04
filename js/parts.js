function Parts(){
    this.d5h2=document.getElementsByClassName("d5h2")[0];  
    this.toappear=document.getElementById("toappear");
    this.ali=this.toappear.querySelectorAll("#toappear>li");
    this.str ="";
    this.init();
}
Parts.prototype={
    init(){
        this.getData();
        this.appear();
    },
    getData:function(){
        axios({
            method:"get",
            url:"../php/parts.php"
        }).then(this.getDataCb.bind(this))
    },
    getDataCb:function(data){
        this.str+=`<div class="d5h21" id="appear">
        <ul>
            <li>
            <a href="details.html" class="mobile" data-list="2" data-id="${data[0].id}">
                <img src="${data[0].img}">
                <h3>${data[0].name}</h3>
                <p>${data[0].price}</p>
                </a>
            </li>`;
        for(var i =1;i<data.length;i++){
            if(data[i].series==data[i-1].series){
                this.str+=` <li><a href="details.html" class="mobile" data-list="2" data-id="${data[i].id}">
                <i><img src="${data[i].img}"></i>
                <h3>${data[i].name}</h3>
                <p>${data[i].price}</p>
                </a>
            </li>`;
            }else{
                this.str+=`</ul>
                </div><div class="d5h21">
                <ul>
                    <li><a href="details.html" class="mobile" data-list="2" data-id="${data[i].id}">
                        <img src="${data[i].img}">
                        <h3>${data[i].name}</h3>
                        <p>${data[i].price}</p>
                        </a>
                    </li>`;
            }
        }
        this.str+=`</ul>
        </div>`;
        this.d5h2.innerHTML=this.str;
        this.todetails();
    },
    appear:function(){
        for(var i=0;i<this.ali.length;i++){
            this.ali[i].addEventListener("mouseover",this.appearCb.bind(this,i))
        }
    },
    appearCb:function(i){
        this.d5h21=document.getElementsByClassName("d5h21");
        for(var j=0;j<this.d5h21.length;j++){
            this.d5h21[j].id="";
            this.ali[j].className="";
        }
        this.d5h21[i].id="appear";
        this.ali[i].className="white";
    },
    todetails:function(){
        this.mobile=document.getElementsByClassName("mobile");
        for(var i = 0;i<this.mobile.length;i++){
            this.mobile[i].addEventListener("click",this.todetailsCb.bind(this,this.mobile[i]))
        }
    },
    todetailsCb:function(that){
        sessionStorage.id=that.getAttribute("data-id");
        sessionStorage.list=that.getAttribute("data-list");
    }
}