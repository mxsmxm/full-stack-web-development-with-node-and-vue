import jwt from "jsonwebtoken"
const getUserId = (request, requireAuth = true) => {
    // 1. 获取token 2. 验证 token  3. 还回userid
    //第二个参数值为真的时候，返回userId，否则抛出错误
    //第二杆参数为false的时候，返回null，不抛出错误
    //http的头文件在request.request.headers中
    //当使用订阅功能的时候，使用的是websocket协议，所以头文件在request.connection.context.Authorization中
    const auth = request.request ? request.request.headers.authorization : request.connection.context.Authorization;
    if (auth) {
        const token = auth.replace("Bearer ", "");
        //token 认证失败会自动抛出异常
        const decode = jwt.verify(token, process.env.JWT_TOKEN);

        return decode.userId
    } else {
        if (requireAuth) {
            throw new Error("无认证信息！");
        } else {
            return null;
        }
    }

}

export {
    getUserId as
    default
}