// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // 分页
  const countRes = await db.collection('goods').count()
  const total = countRes.total

  let resData = {}
  await db.collection('goods').skip((event.currentPage-1) * event.size).limit(event.size).get().then(res => {
    console.log(parseInt(total / event.size) + (total % event.size > 0 ? 1 : 0))
    // 未成功
    // const aaa = await cloud.callFunction({
    //   name: 'tools',
    //   data: {
    //     total: total,
    //     currentPage: event.currentPage,
    //     size: event.size
    //   }
    // })
    // console.log(333, aaa)
    resData = {
      data: res.data,
      page: {
        allRow: total,
        currentPage: event.currentPage,
        size: event.size,
        totalPage: parseInt(total / event.size) + (total % event.size > 0 ? 1 : 0)
      },
      success: 1
    }
    console.log(res.data)
  })

  if(resData.success) {
    return resData
  } else {
    return {
      data: [],
      error: {
        msg: '异常'
      }, 
      success: 0
    }
  }

  // return db.collection('goods').skip((event.currentPage-1) * event.size).limit(event.size).get()

  // return db.collection('goods').where({
  //   _openid: 'server'
  // }).limit(1).get()
}