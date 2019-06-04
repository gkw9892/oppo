function Section(){
    this.d4h=document.getElementsByClassName("d4h")[0];
    this.str ="";
    this.init();
}

Section.prototype={
    init:function(){
        this.getData();  
    },
    getData:function(){
        axios({
            method:"get",
            url:"../php/section.php"
        }).then(this.getDataCb.bind(this))
    },
    getDataCb:function(data){
        this.str+=` <div class="content"><div>
        <a href="details.html"  class="mobile" data-id="${data[0].id}" data-list="1">
            <ul class="d4himg" >
                <li><p><img src="${data[0].img}"></p></li>
            </ul>
            <div>
                <ul class="lilist_${data[0].series}">
                </ul>
                <h3>${data[0].series}</h3>
                <p>${data[0].configuration}|${data[0].message2}</p>
                <span>${data[0].price}</span>
            </div>
        </a>
    </div>`     
        for(var i = 1;i<data.length;i++){
            if(data[i].series==data[i-1].series){
                this.str+=`<div>
                <a href="details.html" class="mobile"  data-id="${data[i].id}" data-list="1">
                    <ul class="d4himg">
                        <li><p><img src="${data[i].img}"></p></li>
                    </ul>
                    <div>
                        <ul class="lilist_${data[i].series}">
                        </ul>
                        <h3>${data[i].series}</h3>
                        <p>${data[i].configuration}|${data[i].message2}</p>
                        <span>${data[i].price}</span>
                    </div>
                </a>
            </div>`
            }else{
                this.str+=`</div><div class="content"><div>
                <a href="details.html"  class="mobile"  data-id="${data[i].id}" data-list="1">
                    <ul class="d4himg" >
                        <li><p><img src="${data[i].img}"></p></li>
                    </ul>
                    <div>
                        <ul class="lilist_${data[i].series}">
                        </ul>
                        <h3>${data[i].series}</h3>
                        <p>${data[i].configuration}|${data[i].message2}</p>
                        <span>${data[i].price}</span>
                    </div>
                </a>
            </div>`
            }
        }
        this.str+=`</div>`;
        this.d4h.innerHTML=this.str;
        axios({
            method:"get",
            url:"../php/section2.php"
        }).then(this.getColorCb.bind(this))
        this.todetails();
    },
    getColorCb:function(data){
        for(var i = 0;i<data.length;i++){
            this.lilist=document.getElementsByClassName("lilist_"+data[i].series);
            var acolor = data[i].color.split(",");
            var listr="";
            for(var j =0;j<acolor.length;j++){
                listr +=`<li><i style="background:${acolor[j]};""></i><i style="border-color:${acolor[j]};"></i></li>`
            }
            for(var m=0;m<this.lilist.length;m++){
                this.lilist[m].innerHTML=listr;
                this.ali=this.lilist[m].getElementsByTagName("li");
                this.content=document.getElementsByClassName("content");
                for(var k=0;k<this.ali.length;k++){
                    
                this.ali[k].addEventListener("mouseover",this.tabcolor.bind(this,i,k))
                } 
            }
        }
    },
    todetails:function(){
        this.mobile=document.getElementsByClassName("mobile");
        for(var i = 0;i<this.mobile.length;i++){
            this.mobile[i].addEventListener("click",this.todetailsCb.bind(this, this.mobile[i]))
        }
    },
    todetailsCb:function(that,e){
        sessionStorage.id=that.getAttribute("data-id");
        sessionStorage.list=that.getAttribute("data-list");
    },
    tabcolor:function(i,k,e){
        this.adiv=this.content[i].children;
        for(var j = 0;j<this.adiv.length;j++){
            this.adiv[j].style.display="none";
        }
        this.adiv[k].style.display="block";
    },
}
