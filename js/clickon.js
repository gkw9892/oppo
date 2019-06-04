function clickOn(){
    this.clickon=document.getElementsByClassName("clickon");
    this.init();
}
clickOn.prototype={
    init:function(){
        this.toclickon();
    },
    toclickon:function(){
        for(var i=0;i<this.clickon.length;i++){
            
            this.ali=this.clickon[i].getElementsByTagName("li");
            for(var j =0;j<this.ali.length;j++){
                this.ali[j].index=i
                this.ali[j].num=j;
                this.ali[j].addEventListener("click",this.toclickonCb.bind(this,this.ali[j]))
            }
        }   
    },
    toclickonCb:function(that){
        for(var k =0;k<this.ali.length;k++){
            this.ali=this.clickon[that.index].getElementsByTagName("li");
            this.ali[k].children[1].style.display="none";
            that.parentNode.parentNode.previousElementSibling.children[k].className="";
        }
            that.children[1].style.display="block";
            that.parentNode.parentNode.previousElementSibling.children[that.num].className="d2h_active";
    },
    
}
new clickOn();