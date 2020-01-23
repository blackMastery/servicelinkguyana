const Job = require('../models/job')
const factory = require('./handlerFactory');
const User = require('../models/user')
const {get} = require('../utils/queryTools')
const Proposal = require('../models/proposal')


/**
 * CRUD ROUTES FOR CLIENT
 */
const catchAsync = require('../utils/catchAsync')


 exports.createClient = catchAsync( async (req, res) => {
  throw new Error("User Name cannot be empty"); 
  res.send("signup route");
  
 
  });

exports.updateDesc = factory.updateOne(User)




exports.addSkill = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await get(User, id);
  console.log(req.body)

  const doc = await User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        skills: [...user.skills, req.body]
      }
    },
    {
      runValidators: true
    }
  );


  const skills = await findUserwithField(id, ['skills'])

  res.status(200).json({
    status: " add emp success",
    skills
  });
})


exports.addEmployment = catchAsync(async (req, res, next) => {
  const { id, empid } = req.params;
  const user = await get(User,id);
  console.log(req.body)
  const doc = await User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        employmentHistory: [...user.employmentHistory, req.body]
      }
    },
    {
      runValidators: true
    }
  );


  const employment = await findUserwithField(id, ['employmentHistory'])

  res.status(200).json({
    status: " add emp success",
    employment
  });
})



async function findUserwithField (id, fields){

  const user = await User.findById(id, ...fields)
  return user._doc;

}

exports.addEducation = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await get(User, id);

  const doc = await User.findOneAndUpdate(
    { _id: id },
    { $set: { education: [...user.education, req.body] } },
    {
      runValidators: true
    });
  const education = await findUserwithField(id, ['education']);
  console.log(education)
  // const { education } = user_updated
  res.status(200)
    .json({
      status: 'success',
      education
    })


})

    exports.deleteEmployment = catchAsync( async (req, res, next) => {
        const { id, empid } = req.params;
        const user = await get(User, id);

         user.employmentHistory.id(empid).remove();

          const doc = await User.findOneAndUpdate(
            { _id: id },
            { $set: { employmentHistory: [...user.employmentHistory] } },
            {
              runValidators: true
            }
          );
      
          res.status(200).json({
            status: "delete success"
          });

    })


exports.deleteEducation = catchAsync(async (req, res, next) => {
  const { id, educationid } = req.params;
  const user = await get(User, id);

  user.education.id(educationid).remove()

  await User.findOneAndUpdate(
    { _id: id },
    { $set: { education: [...user.education] } },
    {
      runValidators: true
    }
  );



  // const { education } = user_updated
  res.status(200)
    .json({
      status: 'success'
    })

})


exports.updatedEducation = catchAsync(async (req,res, next) => {
  const { id, educationid } = req.params;
  const user = await get(User, id);

  user.education.id(educationid).remove()

  await User.findOneAndUpdate(
    { _id: id },
    { $set: { education: [...user.education, req.body] } },
    {
      runValidators: true
    }
  );
})


exports.deleleteSkill = catchAsync( async ( req, res, next ) => {
   const {id, skillid } = req.params;
   const user = await get(User, id);

   user.skills.id(skillid).remove();
   await User.findByIdAndUpdate({_id: id },
    {$set: {skills: [...user.skills]}})


  res.status(200)
    .json({
      status: 'success',
      statCode: 200
    })

})



exports.getProposals = catchAsync( async (req, res, next) => {
  const {id} = req.params;
  const proposals = await Proposal.find({provider:id}).populate('job')

  res.status(200)
  .json({proposals})
})







exports.updateClient = catchAsync(async( req, res) => {
     res.send(" client update route")
 })



