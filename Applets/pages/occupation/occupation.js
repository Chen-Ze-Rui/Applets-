// pages/occupation/occupation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition:"时间",
    time:"/image/time.png",
    positioning:"/image/positioning.png",
    post:"/image/post.png",
    gridList:[],
    A:{
      title:'图书管理员',
      time:'2022-08-12',
      worktime:'4小时/天',
      place:'第一图书馆',
      person:'第一图书馆办公室'
    },
    B:{
      title:'学生社区工作',
      time:'2022-08-10',
      worktime:'2小时/天',
      place:'学生社区中心',
      person:'学生社区中心办公室'
    },
    C:{
      title:'办公室助理',
      time:'2022-08-08',
      worktime:'4小时/天',
      place:'计算机学院',
      person:'计算机学院办公室'
    },
  },

  //合并数据
  merge(){
    this.setData({
      gridList:[this.data.A,this.data.B,this.data.C]
    })
  },

  //条件筛选
  time(){
    this.setData({
      condition:"时间",
      gridList:[
        this.data.A,
         this.data.B,
        this.data.C
      ],
      time:"/image/time1.png",
      positioning:"/image/positioning.png",
       post:"/image/post.png",
    })
    console.log(this.image)


  },
  positioning(){
    this.setData({
      condition:"地点",
      gridList:[
        this.data.A,
         this.data.C,
        this.data.B
      ],
      time:"/image/time.png",
      positioning:"/image/positioning1.png",
       post:"/image/post.png",
    })
  },
  post(){
    this.setData({
      time:"time",
      condition:"岗位",
      gridList:[
        this.data.C,
         this.data.A,
        this.data.B
      ],
      time:"/image/time.png",
      positioning:"/image/positioning.png",
       post:"/image/post1.png",
    })
  },

  //搜索功能
  input(e) {
    this.search(e.detail.value)
    // console.log(e.detail.value)
  },
  search(key) {
    var that = this;
    //从本地缓存中异步获取指定 key 的内容
    wx.getStorage({
      key: 'gridList',
      //从Storage中取出存储的数据
      success: function (res) {
        // console.log(res)
        if (key == '') {   //用户没有输入时全部显示
          that.setData({
            gridList: res.data
          })
          return;
        }
        var arr = [];     //临时数组，用于存放匹配到的数组
        for (let i in res.data) {

          if (res.data[i].title.indexOf(key) >= 0 ||
          res.data[i].time.indexOf(key) >= 0 ||
          res.data[i].worktime.indexOf(key) >= 0||
          res.data[i].place.indexOf(key) >= 0 ||
          res.data[i].person.indexOf(key) >= 0 

          ) {
            arr.push(res.data[i])
          }
        }
        if (arr.length == 0) {
          that.setData({
            gridList: [{ title: '没有相关数据！' }]
          })
        } else {
          that.setData({
            gridList: arr
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

    wx.setStorage({
      key: 'gridList',
      data: this.data.gridList
    })

  },
  onLoad: function (options) {
    this.merge()
    // console.log(this.data.gridList)


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      time:"/image/time.png",
      positioning:"/image/positioning.png",
      post:"/image/post.png",
      condition:"时间"
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})