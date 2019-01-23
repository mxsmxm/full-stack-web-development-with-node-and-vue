const index = {
    controller(app) {
        app.get("/", (req, res) => {
            res.render("index", {
                title: "express controller index"
            })
        })
    }
}

export {
    index as
    default
}