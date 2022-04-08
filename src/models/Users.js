const mongoose = require("mongoose");

const userschema = mongoose.Schema({
        email: {
        type: String,
        required: [true, "Email is a required field"],
        minlength: 12,
        maxlength: 100,
        trim: true,
        unique:true,
        validate: {
            validator: function (v) {
                return /^[A-Za-z0-9._]{3,}@tothenew.com$/.test(v);
            },
            message: (props) => `${props.value} is not a valid TTN mail`
            }
            },

    password: {
        type:String,
        required:true
              },

    firstname: {
        type: String,
        minlength: [3, "firstname should be minimum of 3 character"],
        maxlength: [12, "firstname should be maximum of 12 character"],
        required: true,
        trim: true,


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
        default: ""
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
    dob: {
        type: Date,
        default: "01-01-2000",

    },
    profile_img: {
        type: String,
    },

    is_Admin: {
        type: Boolean,
        default: false
    }
    });
const Users = mongoose.model("USERS", userschema);
module.exports = Users;

