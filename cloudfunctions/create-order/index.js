// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
/**
 * calculate: true 创建订单前计算
 * calculate: false 创建订单
 */
exports.main = async (event, context) => {
  const {
    OPENID,
    APPID
  } = cloud.getWXContext()
  const _ = db.command

  if(event.calculate) {
    let arr = event.goodsArr, 
      totalNum = 0, 
      totalPrice = 0,
      amountTax = 0 // 运费

    arr.forEach(item => {
      totalNum += item.num
      // toto 计算价格-精确 加入优惠券 运费等逻辑
      totalPrice += item.num * item.goods.price
    })
    return {
      totalPrice: totalPrice,
      totalNum: totalNum,
      amountTax: amountTax,
      success: 1
    }
  } else {
    let arr = event.goodsArr
      msgCountArr = []  //库存不足的商品 
    const tasks = []
    arr.forEach(item => {
      const promise = db.collection('goods').doc(item.goodsId).get()
      .then( res => {
        let data = res.data
        if(data.surplusCount < item.num) {
          msgCountArr.push({
            name: data.name,
            surplusCount: data.surplusCount
          })
        }
      })
      tasks.push(promise)
    })

    // 等待所有
    await Promise.all(tasks).then((values) => {

    })

    if(msgCountArr.length > 0) {
      return {
        msgCountArr: msgCountArr,
        success: 0,
        error: {
          msg: '部分商品库存不足，请修改已选择商品'
        }
      }
    }

    await db.collection('orders').add({
      data: {
        // todo 微信支付
        status: '2', // 1 待支付  2 待收货  3 已完成  4 已取消  5 已关闭
        cantactUserId: OPENID,// 谁买的
        cantactGoodsArr: arr, //买的商品集合
        creatTime: new Date()
      }
    }).then(res => {
      arr.forEach(item => {

        db.collection('goods').doc(item.goodsId).update({
          data: {
            surplusCount: _.inc(-item.num) // 减库存
          }
        })
      })

      db.collection('users').where({
        _openid: OPENID
      }).update({
        data: {
          cartIdArr: []
        }
      })
    })

    return {
      success: 1
    }
  }
}