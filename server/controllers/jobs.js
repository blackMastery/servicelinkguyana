/**
 * CRUD ROUTES FOR JOBS
 */
const Job = require('../models/job')
const factory = require("./handlerFactory");
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const User = require('../models/user')
const APIFeatures = require('../utils/apiFeatures')



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


exports.getJob = catchAsync( async (req, res, next) => {
    const { id } = req.params;
    const query = Job.findById(id)
    const job = await query.populate({
        path: "user",
    select: "firstname jobCount paidAvgHourlyRate goingJobs completedJobs Proposal"
    })
    .populate('proposals')

 
       res.status(200).json({
         status: "success",
         job: job
       });

})





exports.jobTest = catchAsync( async (req, res, next) =>{
    


    const { q } = req.query;
    console.log(q)
    let queryObj = { ...req.query };

    const excludedFields = ['q'];
    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

     queryObj = JSON.parse(queryStr);
    
    let query = Job.find({
        
        $text: {
            $search: q,
            $caseSensitive: false
        }
        
    });
    
    const { experienceLevel= '' } = queryObj;
    if(experienceLevel !== ''){
        query = query.find({ experienceLevel }) 
    }


    for (key in queryObj){
        let value = queryObj[key]
        let [low, high] = value.split('-')
        lo = low;
        console.log({ l:low++, h:high++ , key})
        query = query.gte(key,low).lte(key,high)


    }

    console.log(lo)

    const jobs = await query
    res.status(200)
        .json({ jobs })
})

exports.jobSearch = catchAsync(async(req,res,next)=>{
    const {q} = req.query;
    let queryObj = { ...req.query };
    const {page,limit} = req.query;

    const excludedFields = ['q','page','limit'];
    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    queryObj = JSON.parse(queryStr);

    let query =  Job.find({
        
            $text:{
                $search: q,
                $caseSensitive: false
            }
        
    })

    const { experienceLevel = '' } = queryObj;
    if (experienceLevel !== '') {
        query = query.find({ experienceLevel })
    }


    for (key in queryObj) {
        let value = queryObj[key]
        let [low, high] = value.split('-')
        lo = low;
        console.log({ l: low++, h: high++, key })
        query = query.gte(key, low).lte(key, high)


    }

    
    const searchResults = await query;
    const features = new APIFeatures(query, { page, limit })
    .paginate()
    
    
    const jobs = await features.query
    const remaining = searchResults.length - (features.skip + features.limit);


    res.status(200)
    .json({
        remaining,
        page: features.page,
        resultsLength: searchResults.length,
        jobs
    })











})

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
                if(skip  >= numofJobs)  return next (AppError("No Jobs on this page yete", 404));
            }

            // sorting 
            if (req.query.sort){
                const sortBy = req.query.sort.split(',').join(" ");
                query = query.sort(sortBy);
                
            } else {
                query = query.sort("createdAt");
            }
            const jobs = await query.populate('proposals')

                res.status(200).json({
                    remaining,
                    numofJobs,
                    resultsLength: jobs.length,
                    jobs,
                    page
                })

         });



