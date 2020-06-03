// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数 
/**
 * 添加购物车 
 * type(必传) 1 加 2减
 * num(可选) 购物车中直接修改数量
 */
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
      // todo 连续点击 加或减
      arr.forEach(item => {
        if(item.goodsId === event.goodsId) {
          hasItem = true
          // 1 加 2减
          if(!event.num) {
            event.type === '1' ? item.num++ : item.num--
          } else {
            item.num = event.num
          }
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