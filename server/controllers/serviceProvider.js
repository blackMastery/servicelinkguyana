const SeriveProvider = require('../models/serviceProvider')
const catchAsync = require('../utils/catchAsync')
const factory = require('./handlerFactory')
const {get} = require('../utils/queryTools')


exports.createJobSeriveProvider = factory.createOne(SeriveProvider);

exports.updateJobSeriveProvider = factory.updateOne(SeriveProvider);

exports.deleteJobSeriveProvider = factory.deleteOne(SeriveProvider);

exports.getJobSeriveProvider = factory.getOne(SeriveProvider);


exports.getEducation = (req, res, next) =>{
    const {providerid} = req.params;
     res.send('....')

}

exports.addEducation = catchAsync( async (req, res, next) =>{
    const { providerid } = req.params;
    const provider = await get(SeriveProvider, providerid);
      
      const doc = await SeriveProvider.findOneAndUpdate(
        { _id: providerid },
        { $set: { education: [...provider.education, req.body] }},
         {
          runValidators: true
       });
       console.log(doc)
      res.status(200)
      .json({
          status: 'success'
      })

    
 })

exports.deleteEducation = catchAsync( async (req, res, next) =>{
  const { providerid, educationid   } = req.params;
  const provider = await get(SeriveProvider, providerid);

  provider.education.id(educationid).remove()

  const doc = await SeriveProvider.findOneAndUpdate(
    { _id: providerid },
    { $set: { education: [...provider.education] } },
    {
      runValidators: true
    }
  );
  res.status(204).json({status: "success"})
                 
    })



    exports.addEmployment = catchAsync( async (req, res, next) =>{
        const { providerid, empid } = req.params;
        const provider = await get(SeriveProvider, providerid);

          const doc = await SeriveProvider.findOneAndUpdate(
            { _id: providerid },
            {
              $set: {
                employmentHistory: [...provider.employmentHistory, req.body]
              }
            },
            {
              runValidators: true
            }
          );
            res.status(200).json({
              status: " add emp success"
            });
    })




    exports.deleteEmployment = catchAsync( async (req, res, next) => {
        const { providerid, empid } = req.params;
        const provider = await get(SeriveProvider, providerid);

          provider.employmentHistory.id(empid).remove();

          const doc = await SeriveProvider.findOneAndUpdate(
            { _id: providerid },
            { $set: { employmentHistory: [...provider.employmentHistory] } },
            {
              runValidators: true
            }
          );
      
          res.status(200).json({
            status: "delete success"
          });

    })