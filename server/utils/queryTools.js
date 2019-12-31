const AppError = require('./appError');
const mongoose = require('mongoose');


  exports.get = async function (model, id) {
        try {
            let post;

            if (mongoose.Types.ObjectId.isValid(id)) {
                doc = await model.findById(id).exec();
            }
            if (doc) {
                return doc;
            }

        } catch (error) {

            throw new AppError('Docs does not exist',404);
        }

    }
