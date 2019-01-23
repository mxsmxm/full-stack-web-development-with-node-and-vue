import User from "../models/User"
const users = {
    controller(app) {
        app.get("/users", (req, res) => {
                User.find({}, "name email")
                    .then(users => {
                        res.send({
                            msg: "ok",
                            users
                        })
                    })
                    .catch(err => {
                        res.send({
                            msg: "err",
                            err
                        })
                    })
            }),
            //获取单个用户
            app.get("/users/:id", (req, res) => {
                User.find({
                        _id: req.params.id
                    }, "name email")
                    .then(users => {
                        res.send({
                            msg: "ok",
                            users
                        })
                    })
                    .catch(err => {
                        res.send({
                            msg: "err",
                            err
                        })
                    })
            }),
            //增加一个用户
            app.post("/users", (req, res) => {
                if (req.body.name && req.body.email) {
                    const user = new User({
                        name: req.body.name,
                        email: req.body.email
                    })
                    user.save(user)
                        .then(user => {
                            res.send({
                                msg: "success",
                                user
                            })
                        })
                        .catch(err => {
                            res.send({
                                msg: "err",
                                err
                            })
                        })
                }
            }),
            //更新一个用户
            app.put("/users/:id", (req, res) => {
                User.findById({
                        _id: req.params.id
                    })
                    .then(user => {
                        if (req.body.name) {
                            user.name = req.body.name
                        }
                        if (req.body.email) {
                            user.email = req.body.email
                        }
                        user.save()
                            .then(user => {
                                res.send({
                                    msg: "success",
                                    user
                                })
                            })
                            .catch(err => {
                                res.send({
                                    msg: "[err]",
                                    err
                                })
                            })

                    })
                    .catch(err => {
                        res.send({
                            msg: "[err]",
                            err
                        })
                    })
            }),
            //删除一个用户,使用async/await语法
            app.delete("/users/:id", (req, res) => {
                User.findByIdAndDelete({
                        _id: req.params.id
                    })
                    .then(user => {
                        res.send({
                            msg: "成功删除一个用户",
                            user
                        })
                    })
                    .catch(err => {
                        res.send({
                            msg: "[err]",
                            err
                        })
                    })

            })
    }
}

export {
    users as
    default
}