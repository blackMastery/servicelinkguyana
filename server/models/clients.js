const mongoose = require('mongoose');
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
// const validator = require("validator");



/**
* required feilds
+ firstname: string
+ lastname: string

+ email: string

+ passwordhash: string
+ location: string

+ mobileNumber: string

 */



const clientSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'must have a firstname'],
        trim: true,
        maxlength: [40, 'A firstname must have less or equal then 40 characters'],
    },
    lastname: {
        type: String,
        required: [true, 'must have a lastname'],
        trim: true,
        maxlength: [40, 'A lastname must have less or equal then 40 characters'],
    },
    photo: String,
    email: {
        type: String,
        required: [true, 'must have a email'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
      },
      location: {
            type: {
              type: String,
              default: 'Point',
              enum: ['Point']
            },
            coordinates: [Number],
            address: String,
            description: String,
            day: Number
          
    },
      passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          // This only works on CREATE and SAVE!!!
          validator: function(el) {
            return el === this.password;
          },
          message: 'Passwords are not the same!'
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
      goingJobs :{
        type: Number,
        default: 0
      },
      completedJobs: {
        type: Number,
        default: 0
      },
      jobCount:{
        type: Number,
        default: 0,
      },
      paidAvgHourlyRate: Number,
      joined: {
        type: Date,
        default: Date.now()
      },

     

})

clientSchema.pre("save", async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

clientSchema.pre("save", function(next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});


// Virtual populate
clientSchema.virtual('jobs', {
  ref: 'Job',
  foreignField: 'client',
  localField: '_id'
});




clientSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Client = mongoose.model('Client', clientSchema)

module.exports = Client;