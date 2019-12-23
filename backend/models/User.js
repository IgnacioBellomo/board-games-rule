const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema(
  {
    email: {type: String, unique: true, required: true},
    firstName:  {type: String, required: true},
    lastName:  {type: String, required: true},
    friends: [{type: Schema.Types.ObjectId, ref: "User"}],
    requests: [{
      user: {type: Schema.Types.ObjectId, ref: "User"},
      received: {type: Boolean},
    }],
    movieList: [{
      movie: {type: Schema.Types.ObjectId, ref: "Movie"},
      review: {type: Schema.Types.ObjectId, ref: "MovieReview"}
    }],
    showList: [{
      show: {type: Schema.Types.ObjectId, ref: "Show"},
      review: {type: Schema.Types.ObjectId, ref: "ShowReview"},
      status: String,
      currentSeason: Number,
      currentEpisode: Number
    }],
    feed: [{
      status: String,
      review: {type: Schema.Types.ObjectId, ref: "MovieReview"},
    }]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model('User', userSchema);
