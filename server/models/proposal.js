const { Schema, model } = require('mongoose');


const proposalSchema = new Schema({
    hourRate: {
        type: Number,
    },
    rate: {
        type: Number,
    },
    fixedRate:  {
        type: Number
    },
    provider: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    job: {
        type: Schema.ObjectId,
        ref: 'Job'    
    },
    coverLetter: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    est: {
        type: String,
        enum: {
            values: ['one week', 'more than two weeks','three weeks','other']
        }
    } 
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })


const Proposal  = model('Proposal', proposalSchema);

module.exports = Proposal