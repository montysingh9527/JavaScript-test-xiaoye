import Vue from "./vue.js"

const vm = new Vue({
    el:"#app",
    data(){
        return {
            isShowImg1: true,
            isShowImg2: true,
        }
    },
    template: `
        <div>
            <img v-if="isShowImg1" width="200" src="./img/slide_1.jpg" />
            <img v-show="isShowImg2" width="200" src="./img/slide_2.jpg" />
        </div>
        <button @click="showImg1">图片1</button>
        <button @click="showImg2">图片2</button>
    `,
    methods:{
        showImg1(){
            this.isShowImg1 = !this.isShowImg1;
        },
        showImg2(){
            this.isShowImg2 = !this.isShowImg2;
        }
    }
})