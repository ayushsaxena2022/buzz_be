const mongoose = require("mongoose");

const userschema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is a required field"],
        minlength: 12,
        maxlength: 100,
        trim: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[A-Za-z0-9._]{3,30}@tothenew.com$/.test(v);
            },
            message: (props) => `${props.value} is not a valid TTN mail`
        }
    },

    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        minlength: [3, "firstname should be minimum of 3 character"],
        maxlength: [15, "firstname should be maximum of 12 character"],
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        minlength: [3, "lastname should be minimum of 3 character"],
        maxlength: [12, "lastname should be maximum of 12 character"],
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        default: ""
    },
    age: {
        type: Number,
        default: null
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""

    }, country: {
        type: String,
        default: ""
    },
    designation: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    dob: {
        type: Date,
        default: "01-01-2000",
    },
    profile_img: {
        type: String,
        default: "https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8="
    },
    is_Admin: {
        type: Boolean,
        default: false
    }
});
const Users = mongoose.model("USERS", userschema);
module.exports = Users;
