'use strict';
var router = require('express').Router();
var AV = require('leanengine');

var UnsignedSite = AV.Object.extend('siteinfo');
router.get('/',function(req,res,next){
    var query = new AV.Query(UnsignedSite);
    query.descending('createdAt');
    query.startsWith('country',req.query.content || '');
    console.log('\n\n search',req.query.content || '')
    query.find().then(function(results){
        res.render('maps',{
            sites: results
        });
    },function(err){
      console.log(err);
        if (err.code === 101) {
      res.render('maps', {
        sites: []
      });
    } else {
      next(err);
    }
    }).catch(next);
});
module.exports = router;