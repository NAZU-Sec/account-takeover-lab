const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: { 
  	type: String, 
  	required: true, 
  	unique: true,
  },
  password: {
      type: String,
      required: true,
  },
  levelProgress: { 
  	type: Number, 
    default: 1,
},
sessionId: { 
	type: String,
	},
},
{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
