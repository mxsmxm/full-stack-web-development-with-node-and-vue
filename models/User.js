import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})

const User = mongoose.model("User", UserSchema)

export {
    User as
    default
}