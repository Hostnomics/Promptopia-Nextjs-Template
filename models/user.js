//Created at 1:31:20: https://youtu.be/wm5gMKuwSYk?t=5480
import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
    }, 
    image: {
        type: String,
    }
});

// If using Express backend you'd have to (regular, always on backend server)
// const User = model("User", UserSchema);
// export default User;

// At (1:34:26): https://youtu.be/wm5gMKuwSYk?t=5666
// Check if model exists || IF NOT, then create a new model:
const User = models.User || model("User", UserSchema);
export default User;