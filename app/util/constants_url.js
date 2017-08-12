/**
 * URL
 *
 * @author lingzhi
 * @date 2017-04-12
 */

// const YZYUrlHost = 'http://10.180.14.152'; //（打包测试环境）
const YZYUrlHost = 'http://10.180.14.149';    //开发环境
// const YZYUrlHost = 'http://wxdev3.600280.com';    //外网环境

//广告位
//http://10.180.14.149/order/user/list
//用户订单列表查询
export const YZYGetOrder = YZYUrlHost + '/order/user/list';
//http://localhost/order/comment/add
//增加评论
export const YZYAddComment = YZYUrlHost + '/order/comment/add';
// http://10.180.14.149/user/login、
//登录接口
export const YZYMineLoginURL = YZYUrlHost + '/user/login';



