
Vue.component('myheader', {
    template: `
    <div>
    <div id="header" class="header"><header>
        <div class="headerWeiZhi"><a href=""><img src="./img/定位.png" alt="位置"></a></div>
        <input type="text" id="indexSouSuo" class="indexSouSuo" placeholder="  请输入搜索词然后按回车或确认" />
        <div class="headerGeRen"><a href=""><img src="./img/我的.png" alt="个人中心"></a></div>
    </header></div>
    </div>  `,
  })

Vue.component('myfooter', {
data:function(){
    return{
    footerArr:[
        {footera:"./index.html",footerSrc:"./img/首页.png",footername:"首页"},
        {footera:"./index.html",footerSrc:"./img/客服.png",footername:"客服"},
        {footera:"./index.html",footerSrc:"./img/购物.png",footername:"购物"},
        {footera:"./personal.html",footerSrc:"./img/我的.png",footername:"我的"},
    ],
    fabu:false,
    tianjiaButton:function () {
        if (this.fabu==true) {
            this.fabu=false;
        } else {
            this.fabu=true;
        }
    }
    }
},
props:['dlzt'],
template:`
<div>
<footer><div id="footer" class="footer">
    <form action="/tianjiasp" method="post" v-if="fabu==true">
        <p><input type="text" name="name"  placeholder="用户名" required/></p>
        <p><input type="tel" name="phone" placeholder="电话号码" required/></p>
        <p><input type="text" name="spname" placeholder="商品名称" required/></p>
        <p><textarea name="spxq" placeholder="商品详情" required></textarea></p>
        <p><input type="text" name="shuliang" placeholder="价格" required/></p>
        <input type="submit"/>
    </form>
    <nav>
    <div class="tianjiasp" v-if="fabu==false&&dlzt=='t'" @click="tianjiaButton()"></div>
    <a href="./personal.html"><div class="tianjiasp" v-if="fabu==false&&dlzt!='t'"></div></a>
    <ul>
        <li v-for="(v, i) in footerArr"><a :href="v.footera"><img :src="v.footerSrc" :alt="v.footername"></a></li>
    </ul>
    </nav>
</div></footer>
</div>
`
})