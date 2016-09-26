var express = require("express");
var router = express();
var mongo = require("mongodb");

var url="mongodb://jitindrafartiyal-webapp-3809259:27017/school";

router.get('/',function(request,response,next){
   console.log('Requested for index page');
   response.render("index.ejs",{resultArray : []});
});

router.post('/insert',function(request,response,next){
    console.log('Requested to insert elements in database',request.body);
    
    var student = {
        studentId : request.body.studentId, 
        studentName : request.body.studentName
        
    };
    mongo.connect(url,function(err,db){
        if(err != null)
            console.log("Error in connecting database");
        else
        {
            db.collection("students").insertOne(student,function(err){
                if(err != null)
                    console.log("Data is not inserted");
                else
                    console.log("Successfully inserted data",request.body);
            });   
        }
        db.close();
    });
    response.redirect('/');   
});

router.post('/load',function(request,response,next){
   var resultArray = [];
   console.log('Requested to load data');
    
   mongo.connect(url,function(err,db){
        if(err != null)
            console.log('Error in connecting database');
        else
        {
            var cursor = db.collection('students').find();   
            cursor.forEach(function(doc,err){
                if(err != null)
                    console.log('Cannot insert data into resultArray');
                else
                    resultArray.push(doc);

            },function(){
                db.close();
                 response.render('index', { resultArray: resultArray });
            });
           
        }
   });
});

router.post('/update',function(request, response, next) {
    console.log('Requested to update element in database',request.body);
    
    var student = {
        studentId : request.body.studentId, 
        studentName : request.body.studentName
        
    };
    mongo.connect(url,function(err, db) {
        if(err != null)
            console.log('Error in connecting');
        else
        {
            db.collection('students').updateOne({"studentId":student.studentId},{$set:student},function(err){
                if(err != null)
                    console.log('Element cannot be updated');
                else
                    console.log('Successfully updated the element');
            },function(){
                db.close();
            });
            response.redirect('/');
        }
    });
});

router.post('/delete',function(request, response, next) {
   console.log('Requested to delete and element from the database');
   
   var studentId = request.body.studentId;
   mongo.connect(url,function(err, db) {
       if(err != null)
            console.log('Error in connecting');
        else
        {
        
            db.collection('students').deleteOne({"studentId":studentId},function(err){
                if(err != null)
                    console.log('Element cannot be deleted')
                else
                    console.log('Successfully deleted the element');
           },function(){
               db.close();
           });
            response.redirect('/');
        }
   })
});

module.exports=router;