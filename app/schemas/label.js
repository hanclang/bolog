var mongoose = require('mongoose');

var LabelSchema = new mongoose.Schema({
    _id: String,
    labelname : String
});

LabelSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

module.exports = LabelSchema;