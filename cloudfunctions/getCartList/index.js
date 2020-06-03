// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    OPENID,
    APPID
  } = cloud.getWXContext()

  let resData = {}
  let arr = [], totalPrice = 0, totalNum = 0
  await db.collection('users').where({
    _openid: OPENID,
  }).get().then(res => {
    arr = res.data[0].cartIdArr
  })

  // 承载所有读操作的 promise 的数组
  const tasks = []
  arr.forEach(item => {
    const promise = db.collection('goods').doc(item.goodsId).get()
    .then(res => {
      console.log(res.data)
      item.goods = {...res.data}
    })
    tasks.push(promise)
  })

  // 等待所有
  await Promise.all(tasks).then((values) => {
    arr.forEach(item => {
      totalNum += item.num
      // toto 计算价格-精确
      totalPrice += item.num * item.goods.price
    })
    resData = {
      data: {
        items: arr,
        price: totalPrice,
        number: totalNum
      },
      success: 1
    }
  })

  if(resData.success) {
    return resData
  } else {
    return {
      data: {
        items: [],
        price: totalPrice,
        number: totalNum
      },
      error: {
        msg: '异常'
      }, 
      success: 0
    }
  }
}