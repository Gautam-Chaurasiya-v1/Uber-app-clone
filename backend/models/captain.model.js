const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, 'First name must be of atleast 3 characters']
        },
        lastname: {
            type: String,
            minLength: [3, 'Last name must be of atleast 3 characters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minLength: [3, 'Color must be of atleast 3 character']
        },
        plate: {
            type: String,
            required: true,
            minLength: [10, 'Plate must be of 10 character']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be atleast 1']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'auto', 'bike']
        }
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }

})

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const Captain = model('Captain', captainSchema);

module.exports = Captain;