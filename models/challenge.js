const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  level: { 
  	type: Number, 
  	required: true 
  },
  difficulty: { 
  	type: String, 
  	required: true 
  },
  vulnerability: { 
  	type: String, 
  	required: true 
  },
  description: { 
  	type: String, 
  	required: true 
  },
  hint: { 
  type: String 
},
});

module.exports = mongoose.model('Challenge', challengeSchema);
