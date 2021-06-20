import fetch from '@system.fetch';
import router from '@system.router';

export default {
    data: {
        title: 'World',
        url: "",
        mp4_url: "",
        event: '',
        seekingtime: '',
        timeupdatetime: '',
        seekedtime: '',
        isStart: true,
        isfullscreenchange: false,
        duration: '',
        responseData:'正在加载中',
    },
    seekingCallback: function (e) {
        this.seekingtime = e.currenttime;
    },
    timeupdateCallback: function (e) {
        this.timeupdatetime = e.currenttime;
    },
    change_start_pause: function () {
        if (this.isStart) {
            this.$element('vedioId').pause();
            this.isStart = false;
        } else {
            this.$element('vedioId').start();
            this.isStart = true;
        }
    },
    change_fullscreenchange: function () { //全屏
        if (!this.isfullscreenchange) {
            this.$element('videoId').requestFullscreen({
                screenOrientation: 'default'
            });
            this.isfullscreenchange = true;
        } else {
            this.$element('vedioId').exitFullscreen();
            this.isfullscreenchange = false;
        }
    },
    fetch: function () {
        var that = this;
        fetch.fetch({
            url: 'https://liyuanjing-1300376177.cos.ap-shanghai.myqcloud.com/viptopmodel.json',
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
        this.url = decodeURIComponent(this.data1);
        this.mp4_url = decodeURIComponent(this.data2);
        this.title= decodeURIComponent(this.data3);
        this.fetch();
    }
}
