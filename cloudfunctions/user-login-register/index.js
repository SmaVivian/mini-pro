const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    OPENID,
    APPID
  } = cloud.getWXContext()

  const db = cloud.database()

  //添加或更新用户
  db.collection('users').where({
    _openid: OPENID,
  }).get().then(
    res => {
      // console.log(res)
      if (res.data.length==0){//不存在则添加
        db.collection('users').add({
          data: {
            _openid: OPENID,
            ...event.userInfo,
            cartIdArr: [] // 默认购物车商品id集合为空数组
          }
        })
        // .then(res => {
        //   console.log(res)
        // })
      } else {//存在则更新
        db.collection('users').doc(res.data[0]._id).update({
          data: {
            ...event.userInfo
          }
        })
      }
    }
  )
}