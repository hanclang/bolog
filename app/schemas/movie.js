var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var MovieSchema = new mongoose.Schema({
  title: String,
  author: String,
  label: String,
  isUse: {
    type: Number,
    default: 0
  },
  like: Number,
  country: String,
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  text: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

MovieSchema.pre('save', function(next) {
  var movie = this;

  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }else {
    this.meta.updateAt = Date.now();
  }
  next();
})

MovieSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = MovieSchema;
