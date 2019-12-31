/**
 * CRUD ROUTES FOR JOBS
 */
const Job = require('../models/job')
const factory = require("./handlerFactory");
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const User = require('../models/user')





// exports.createJob = factory.createOne(Job);


exports.createJob = catchAsync(async (req, res, next) => {
    const { body } = req;

    const doc = await Job.create(body);
    const user = await User.findById(body.user)
    await User.findByIdAndUpdate(body.client, { $set: {jobCount: user.jobCount + 1 }})



    res.status(201).json({
        status: "success",
        data: {
            data: doc
        }
    });
})

exports.updateJob = factory.updateOne(Job)

exports.deleteJob = factory.deleteOne(Job);

exports.getJob = factory.getOne(Job, {
  path: "client",
    select: "jobCount paidAvgHourlyRate goingJobs completedJobs"
});




// exports.getJob = catchAsync(async (req, res, next) => {
//     console.log(req.params.id, "getojob")
//     let query = Job.findById(req.params.id);

 
//     // query = query
//     const doc = await query.populate("client");

//     if (!doc) {
//         return next(new AppError("No document found with that ID", 404));
//     }

//     res.status(200).json({
//         status: "success",
//         data: {
//             data: doc
//         }
//     })
// })

exports.getAllJob = catchAsync(async (req, res, next) => {
            const queryObject = {
                ...req.query
            };
            const excludefields = [
                "feilds",
                "sort",
                'page',
                'limit'
            ];
            excludefields.forEach(
                feild =>
                delete queryObject[
                    feild
                ]
            );

            /**
            * filter object structure
            * from request obj { interviewing:7 ,proposals: {gte: 5} }
            * to { interviewing: 7, proposals: {$gte: 5}}
            *  operators
            * from: gte lte gt   lt
            * to: $gte $lte $gt   $lt
            *
            */
            //  advance filtering

 

            let queryStrObj = JSON.stringify(
                queryObject
            );
            let queryStr = queryStrObj.replace(
                /\b(gte|lte|gt|lt)\b/g,
                match =>
                `$${match}`
            );

            queryStrObj = JSON.parse(queryStr)
         
            //   excute query
            let query = Job.find(queryStrObj);

            // Pagination 
            const page = req.query.page * 1 || 1;
            const limit = req.query.limit * 1 || 100;
            const skip = ( page - 1 ) * limit;
            const numofJobs = await Job.countDocuments();
            const remaining = numofJobs - (skip + limit); 
            
            console.log(req.query, skip)
            query = query.skip(skip).limit(limit);
            if(req.query.page){
                if(skip  >= numofJobs) throw new Error('this page does not exist')
            }

            // sorting 
            if (req.query.sort){
                const sortBy = req.query.sort.split(',').join(" ");
                query = query.sort(sortBy);
                
            } else {
                query = query.sort("createdAt");
            }
            const jobs = await query

                res.status(200).json({
                    remaining,
                    numofJobs,
                    resultsLength: jobs.length,
                    jobs,
                    page
                })

         });


