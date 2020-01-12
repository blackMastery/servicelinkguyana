const mongoose = require('mongoose');
const crypto = require("crypto");
const bcrypt = require("bcryptjs");


const employment = new mongoose.Schema({
    company:{
         type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        address: String,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: false,
        trim: true,
    },
    from: String,
    to: String,
    stillWorkHere: Boolean,
  



})
const education = new mongoose.Schema({
    school: String,
    startDate: Date,
    endDate: Date,
    degree: String,
    areaOfStudy: String,
    description: String
})


const skill  = new mongoose.Schema({name:String})


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "must have a firstname"],
        trim: true,
        maxlength: [40, "A firstname must have less or equal then 40 characters"]
    },
    lastname: {
        type: String,
        required: [true, "must have a lastname"],
        trim: true,
        maxlength: [40, "A lastname must have less or equal then 40 characters"]
    },
    photo: String,
    email: {
        type: String,
        required: [true, "must have a email"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ['client', 'provider'],
    },
    location: {
        type: {
            type: String,
            default: "Point",
            enum: ["Point"]
        },
        coordinates: [Number],
        address: String,
        description: String
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            // This only works on CREATE and SAVE!!!
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords are not the same!"
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    education: [education],
    skills: [skill],
    availability: {
        type: String,
        enum: {
            values: [
                "More than 30 hr/week",
                "Less than 30hrs/week",
                "As needed - open to offer"
            ],
            message: `Are you available to take on new work? Knowing when you 
                    are available helps Upwork find the right jobs for you.`,

            default: "As needed - open to offer"
        }
    },
    employmentHistory: [employment],
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    goingJobs: {
        type: Number,
        default: 0
    },
    completedJobs: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    jobCount: {
        type: Number,
        default: 0,
    },
    paidAvgHourlyRate: Number,
    joined: {
        type: Date,
        default: Date.now()
    },
    sentProposals: [{type: mongoose.Schema.ObjectId, ref: 'Proposal'},]

},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        strict: 'throw', useNestedStrict: true 
    }
);



// Virtual populate
userSchema.virtual('jobs', {
    ref: 'Job',
    foreignField: 'user',
    localField: '_id'
});



userSchema.pre("save", async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified("password")) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});







userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};






const User = mongoose.model('User', userSchema)


module.exports = User;