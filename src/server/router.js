const express = require('express')
const router = exporess.Router();

router.get('/check_vegan/router', function(req, res) {
  console.log(req.body);
  console.log(res.body);
  res.send(req.body);
})

module.exports = router;