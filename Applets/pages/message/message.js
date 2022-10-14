// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:"",
    delBtnWidth: 100,
    startX: "",
    gridList:[{
      avatar:"/image/man.png",
      person:"计算机学院",
      recording:['同学，你什么时候到岗'],
      time:"18：00",
      state:"none"
    },{
      avatar:"/image/woman.png",
      person:"第二图书馆",
      recording:['同学，不好意思，我们已经招满了'],
      time:"17：00",
      state:"none"
    },{
      avatar:"/image/man.png",
      person:"计算机学院",
      recording:['老师，请问学院办公室还需要人吗'],
      time:"8月10号",
      state:"none"
    },{
      avatar:"/image/woman.png",
      person:"政管学院",
      recording:['请问还需要人吗'],
      time:"18：00",
      state:"none"
    }],  
  },
  touchS: function (e) {
    if (e.touches.length == 1) {
        this.setData({
            //设置触摸起始点水平方向位置
            startX: e.touches[0].clientX
        });
    }
},
touchM: function (e) {

    if (e.touches.length == 1) {
        //手指移动时所在的位置
        var moveX = e.touches[0].clientX;
        // console.log("手指移动时所在的位置" + moveX)
        //手指起始点位置与移动期间的差值
        var disX = this.data.startX - moveX;
        // console.log("手指移动的距离" + disX)

        //触发事件的距离
        var delBtnWidth = this.data.delBtnWidth;
        //获取手指触摸的是哪一项
        var index = e.currentTarget.dataset.index;

        var txtStyle = "";
        if (disX == 0 || disX < 0) {//如果移动距离小于等于0，说明向右滑动，文本层位置不变
           
           this.data.gridList[index].state = "none"

        } else if(disX > 0){//移动距离大于0，文本层left值等于手指移动距离
          this.data.gridList.txtStyle =  disX + "rpx";
          this.data.gridList[index].state = "none"

        if (disX >= delBtnWidth/2) {
            //控制文本移动距离最大值为删除按钮的宽度
            this.data.gridList.txtStyle = + delBtnWidth + "rpx";
            this.data.gridList[index].state = "block";
        }
    
    }
    var gridList = this.data.gridList;
    gridList[index].txtStyle = txtStyle;
    // console.log( list[index].txtStyle)

    //更新列表的状态
    this.setData({
      gridList: gridList
    });
}
},
touchE: function (e) {
    if (e.changedTouches.length == 1) {
        //手指移动结束后水平位置
        var endX = e.changedTouches[0].clientX;
        //触摸开始与结束，手指移动的距离
        var disX = this.data.startX - endX;
        var delBtnWidth = this.data.delBtnWidth;
        //如果距离小于删除按钮的1/2，不显示删除按钮
        var txtStyle = ""
                 //获取手指触摸的是哪一项
     var index = e.currentTarget.dataset.index;
      if(disX > delBtnWidth / 2){
         txtStyle =-delBtnWidth + "rpx"
      }else if(disX <=delBtnWidth){
        txtStyle = "0rpx"
        this.data.gridList[index].state = "none";

      }

        //获取手指触摸的是哪一项
        var index = e.currentTarget.dataset.index;
        var gridList = this.data.gridList;
        // console.log(list[index].txtStyle)
        gridList[index].txtStyle = txtStyle;
        //更新列表的状态
        this.setData({    
          gridList: gridList
        });
    }
},
//点击删除按钮事件
delItem: function (e) {

    //获取列表中要删除项的下标
    var index = e.currentTarget.dataset.index;

    var gridList = this.data.gridList;
    //移除列表中下标为index的项
    gridList.splice(index, 1);
    //更新列表的状态
    this.setData({
      gridList: gridList
    });
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
    key: 'gridList1',
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

        if (
        res.data[i].time.indexOf(key) >= 0 ||
        res.data[i].person.indexOf(key) >= 0 ||
        res.data[i].recording.indexOf(key) >= 0 

        ) {
          arr.push(res.data[i])
        }
      }
      if (arr.length == 0) {
        that.setData({
          gridList: [{ 
            person: '没有相关数据！',
            state:'none'
           }]
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
onLoad(options) {
},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady() {
  wx.setStorage({
    key: 'gridList1',
    data: this.data.gridList
  })
},

/**
 * 生命周期函数--监听页面显示
 */
onShow() {

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