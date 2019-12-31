/**
 * CRUD ROUTES FOR REVIEWS
 */
const Review = require('../models/review')
const factory = require("./handlerFactory");


exports.createReview = factory.createOne(Review);

exports.updateReview = factory.updateOne(Review)

exports.deleteReview = factory.deleteOne(Review)

exports.getReview = factory.getOne(Review)