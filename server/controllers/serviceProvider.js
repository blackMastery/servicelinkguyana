const SeriveProvider = require('../models/serviceProvider')
const catchAsync = require('../utils/catchAsync')
const factory = require('./handlerFactory')
const {get} = require('../utils/queryTools')
const Proposal = require('../models/proposal')
const User = require('../models/user')


exports.createJobSeriveProvider = factory.createOne(SeriveProvider);

exports.updateJobSeriveProvider = factory.updateOne(SeriveProvider);

exports.deleteJobSeriveProvider = factory.deleteOne(SeriveProvider);

exports.getJobSeriveProvider = factory.getOne(SeriveProvider);



exports.createProposal = catchAsync( async (req, res, next) => {
  /**
   * user is allow to submit one proposal for the same
   * update user sentProposal with job id 
   */
  const { job, provider, } = req.body;
  const user = await get(User,provider);
 

  if(user.sentProposals.includes(job)){
    return res.status(400)
    .json({
      message: "you have submitted already"
    })
  }
 user.sentProposals.addToSet(job)

  await User.findOneAndUpdate({_id: provider},
    { $set: { sentProposals: [...user.sentProposals]}},{
      runValidators: true
    });

  const doc = await Proposal.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: doc
    }
  });
  


  
})



exports.getAllProposals = catchAsync( async (req, res, next) => {
  const { providerid }  =  req.params;
  const proposals = await Proposal.find({ provider: providerid})
    .populate('job')

    res.status(200)
    .json({
      status: 'success',
      data: proposals
    })

})


exports.editProposal = factory.updateOne(Proposal)

exports.getProposal = factory.getOne(Proposal)













 