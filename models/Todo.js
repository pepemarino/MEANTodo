// models/todo.js
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requiredStringValidator = [
    function (val) {
        var testVal = val.trim();
        return (testVal.length > 0);
    },
    '{PATH} cannot be empty.'
];

var todoSchema = new Schema({
	title: {
		type: String,
		required: true,
		validate: requiredStringValidator
	},
	completed: {
		type: Boolean,
		default: false
	},
	createdOn: {
		type: Date,
		default: Date.now
	} 
});

module.exports = mongoose.model('Todo', todoSchema);