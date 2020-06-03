// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('event', event)
  const {
    OPENID,
    APPID
  } = cloud.getWXContext()

  let arr = []

  await db.collection('users').where({
    _openid: OPENID
  }).get().then(
    res => {
      // console.log(res.data)
      arr = res.data[0].cartIdArr
      let hasItem = false
      arr.forEach(item => {
        if(item.goodsId === event.goodsId) {
          hasItem = true
          // 1 加 2减
          event.type === '1' ? item.num++ : item.num--
        }
      })
      if(!hasItem) {
        arr.push({goodsId: event.goodsId, num: 1})
      }
    }
  )

  let resData = await db.collection('users').where({
    _openid: OPENID
  }).update({
    data: {
      cartIdArr: arr
      // cartIdArr: [{goodsId: 1, num: 2}]
    }
  })

  if(resData.stats.updated) {
    return {
      success: 1
    }
  } else {
    return {
      success: 0
    }
  }
}