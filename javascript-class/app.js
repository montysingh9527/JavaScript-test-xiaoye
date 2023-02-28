// import Fade from "./carousel/fade";

// new Fade("#carousel-fade",{
//     defaultIndex: 0, // 默认选中
//     duration: 3000, //  轮播时间

// });

// import Slide from "./carousel/slide";
// new Slide("#carousel-slide", {
//   defaultIndex: 0, // 默认选中
//   duration: 3000, //  轮播时间
// });

import Carousel from "./carousel/index";
Carousel.create("#carousel-slide",{
    type:"slide",
    defaultIndex: 0,
    duration: 3000
}).then(res=>{
    console.log("==app.js===res==",res)
})

Carousel.create("#carousel-fade",{
    type:"fade",
    defaultIndex: 0,
    duration: 3000
}).then(res=>{
    console.log("==app.js===res==",res)
})