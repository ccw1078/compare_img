// pages/index.js
const app = getApp();

Page({
  data: {
    img_paths: [],
  },
  add_img: function () {
    const that = this;
    wx.chooseImage({
      count: 2,
      success: function (res) {
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (info) {
            const img_ratio = info.width / info.height; // 图片的宽高比
            const img_width = img_ratio > that.data.img_box_ratio ? 
              that.data.img_max_width : Math.round(that.data.img_max_height * img_ratio);
            const img_left = (app.globalData.window_width - img_width) * 0.5; // 图片离屏幕的左边距
            that.setData({
              img_paths: res.tempFilePaths,
              img_width: img_width,
              img_height: Math.round(img_width / img_ratio),
              img_left: img_left,
              cursor_x: Math.round(((img_width - that.data.cursor_width) * 0.5 + img_left) / app.globalData.px_ratio)
            });
          }
        });
      }
    });
  },
  onLoad: function () {
    const that = this;
    const img_margin = 20; // 图片上下边缘留空，单位rpx
    const cursor_height = 80; // 游标高度，单位rpx
    const cursor_width = 176; // 游标高度，单位rpx
    const img_max_width = 750 - img_margin * 2; // 图片最大宽度，单位rpx
    const img_max_height = app.globalData.window_height - cursor_height - img_margin * 2; // 图片最大高度，单位rpx
    const img_box_ratio = img_max_width / img_max_height; // 图片最大宽度和最大高度的比例
    that.setData({
      img_box_ratio: img_box_ratio,
      img_max_width: img_max_width, 
      img_max_height: img_max_height,
      cursor_height: cursor_height,
      cursor_width: cursor_width
    });
  }
})