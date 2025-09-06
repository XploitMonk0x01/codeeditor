const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        minLength:3,
        maxLength:20
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:20,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim: true,
        lowercase:true,
        immutable: true,
    },
    age:{
        type:Number,
        min:6,
        max:80,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default: 'user'
    },
    problemSolved:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'problem'
        }],
        default: []
    },
    password:{
        type:String,
        required: true
    },
    
    bio: {
        type: String,
        maxLength: 200,
        default: ''
    },
    location: {
        type: String,
        maxLength: 50,
        default: ''
    },
    username: {
        type: String,
        maxLength: 30,
        default: ''
    },
    linkedinProfile: {
        type: String,
        default: ''
    },
    githubProfile: {
        type: String,
        default: ''
    },
    contestRating: {
        type: Number,
        default: 1200
    },
    dailySubmissions: {
        type: Map,
        of: Number,
        default: new Map()
    },
    streakData: {
        currentStreak: {
            type: Number,
            default: 0
        },
        longestStreak: {
            type: Number,
            default: 0
        },
        lastSubmissionDate: {
            type: Date,
            default: null
        },
        streakDates: {
            type: [Date],
            default: []
        }
    },
    profileStats: {
        easyProblems: {
            type: Number,
            default: 0
        },
        mediumProblems: {
            type: Number,
            default: 0
        },
        hardProblems: {
            type: Number,
            default: 0
        },
        totalSubmissions: {
            type: Number,
            default: 0
        },
        acceptedSubmissions: {
            type: Number,
            default: 0
        }
    }
},{
    timestamps:true
});

userSchema.post('findOneAndDelete', async function (userInfo) {
    if (userInfo) {
      await mongoose.model('submission').deleteMany({ userId: userInfo._id });
    }
});

const User = mongoose.model("user",userSchema);

module.exports = User;