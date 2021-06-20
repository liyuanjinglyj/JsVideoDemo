import fetch from '@system.fetch';
import router from '@system.router';

export default {
    data: {
        title: "",
        url: "https://liyuanjing-1300376177.cos.ap-shanghai.myqcloud.com/viptopmodel.json",
        responseData: '正在加载中',
        swiper_index: 0,
    },
    //路由跳转
    jump_router:function(item){
        router.push({
            uri: 'pages/index/playvideo/playvideo',
            params: {
                data1: encodeURIComponent(item.img_url),
                data2: encodeURIComponent(item.mp4_url),
                data3: encodeURIComponent(item.title),
            },
        });
    },
    //list列表点击事件
    list_item_onclick:function(item){
        this.jump_router(item);
    },
    //网格点击事件
    grid_onclick:function(item){
        this.jump_router(item);
    },
    //滑动模块点击事件
    swiper_onClick: function (item) {
        this.jump_router(item);
    },
    //界面初始化网络JSON数据获取
    fetch: function () {
        var that = this;
        fetch.fetch({
            url: that.url,
            success: function (response) {
                console.info("网络请求成功");
                that.responseData = JSON.parse(response.data);
                console.info(that.responseData.vipList[0].title);
            },
            fail: function () {
                console.info("网络请求错误");
            }
        });
    },

    onInit() {
        this.title = this.$t('strings.world');
        this.fetch();
    }
}
