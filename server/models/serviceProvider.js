const mongoose = require('mongoose');
const crypto = require("crypto");
const bcrypt = require("bcryptjs");


/**
 * service_provider

+ firstname: string
+ lastname: string

+ email: string

+ passwordhash: string
+ location: string

+ mobileNumber: string

+ skills

+ education
 */

//  const skill = new mongoose.Schema({
//      name: String,
//  })


 const employment = new mongoose.Schema({
     company: String,
     location: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
          },
          coordinates: [Number],
          address: String,
          description: String,
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
    startMonth: String,
    startYear: Number,
    endMonth: String,
    endYear: Number,
    stillWorkHere: Boolean,
    description: {
        type: String,
        required: false,
        trim: true,
    } 




 })
const education = new mongoose.Schema({
    school: String,
    startDate: Date,
    endDate: Date,
    degree: String,
    areaOfStudy: String,
    description: String
})

const serviceProviderSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "must have a firstname"],
    unique: true,
    trim: true,
    maxlength: [40, "A firstname must have less or equal then 40 characters"]
  },
  lastname: {
    type: String,
    required: [true, "must have a lastname"],
    unique: true,
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
      validator: function(el) {
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
  availability: {
    type: String,
    required: [true, "Must select availability"],
    enum: {
      values: [
        "More than 30 hr/week",
        "Less than 30hrs/week",
        "As needed - open to offer"
      ],
      message: `Are you available to take on new work? Knowing when you 
                    are available helps Upwork find the right jobs for you.`
    }
  },
  employmentHistory: [employment]
});



serviceProviderSchema.pre("save", async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
0
  // Delete passwordConfirm field
  if(this.passwordConfirm){
    this.passwordConfirm = undefined;
  }

  next();
});

serviceProviderSchema.pre("save", function(next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});


serviceProviderSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};







const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema)


module.exports = ServiceProvider;