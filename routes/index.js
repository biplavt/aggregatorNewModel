var express = require('express');
var router = express.Router();

/* GET home page. */
var getIndex =function (req,res) {
  res.render('index', { title: 'ASD Aggregator - Please Include API Key' });
};

module.exports = {
	getIndex
};
