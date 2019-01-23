import bcryptjs from "bcryptjs"

const hashPassword = (password) => {
    if (password.length < 8) {
        throw new Error("密码需要至少8位！");
    }
    return bcryptjs.hash(password, 10);
}

export {
    hashPassword as
    default
}