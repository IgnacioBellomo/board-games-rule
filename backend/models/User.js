const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema(
  {
    email: {type: String, unique: true, required: true},
    firstName:  {type: String, required: true},
    lastName:  {type: String, required: true},
    gamesList: [{type: String}],
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model('User', userSchema);
