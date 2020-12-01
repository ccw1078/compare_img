// pages/index.js
const app = getApp();

Page({
  data: {
    img_paths: [],
    img_margin: undefined, // 图片边缘留空，单位rpx
    img_max_width: undefined, // 图片最大宽度，单位rpx
    cursor_height: undefined, // 游标高度，单位rpx
    img_max_height: undefined, // 屏幕高度 - 游标高度，单位rpx
    img_height: undefined,
    img_width: undefined,
    img_left: undefined,
  },
  add_img: function () {
    const that = this;
    wx.chooseImage({
      count: 2,
      success: function (res) {
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (info) {
            const img_ratio = info.width / info.height;
            const img_box_ratio = that.data.img_box_ratio;
            const img_width = img_ratio > img_box_ratio ? 
              that.data.img_max_width : Math.round(that.data.img_max_height * img_ratio);
            const img_left = (app.globalData.window_width - img_width) * 0.5;
            const cursor_width = that.data.cursor_width
            const cursor_x = Math.round(((img_width - cursor_width) * 0.5 + img_left) / app.globalData.px_ratio);
            that.setData({
              img_paths: res.tempFilePaths,
              img_width: img_width,
              img_height: Math.round(img_width / img_ratio),
              img_left: img_left,
              cursor_x: cursor_x
            });
          }
        });
      }
    });
  },
  onLoad: function () {
    const that = this;
    const img_margin = 20; // 图片边缘留空，单位rpx
    const img_max_width = 750 - img_margin * 2; // 图片最大宽度，单位rpx
    const cursor_height = 80; // 游标高度，单位rpx
    const cursor_width = 176; // 游标高度，单位rpx
    const img_max_height = app.globalData.window_height - cursor_height - img_margin * 2; // 屏幕高度 - 游标高度，单位rpx
    const img_box_ratio = img_max_width / img_max_height;
    that.setData({
      img_box_ratio: img_box_ratio,
      img_max_width: img_max_width,
      img_max_height: img_max_height,
      cursor_height: cursor_height,
      cursor_width: cursor_width
    });
  }
})