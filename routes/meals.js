var express = require('express');
var router = express.Router();
var meals = require('../mockData/mockData');

router.get('/', function(req, res, next) {
  var pageNo = req.query.pageNo;
  var pageSize = req.query.pageSize;
  var startIndex = (pageNo - 1) * pageSize;
  var endIndex = pageNo * pageSize < meals.length ? pageNo * pageSize: meals.length;
  var results = [];

  for (var i = startIndex; i < endIndex; i++) {
    results.push(meals[i]);
  }

  console.log("pageNo: " + pageNo);
  console.log("pageSize: " + pageSize);
  console.log("startIndex: " + startIndex);
  console.log("endIndex: " + endIndex);
  console.log("results.length: " + results.length);

  res.json({
    meals: results,
    totalCount: meals.length
  });
});

module.exports = router;
