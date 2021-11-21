const express = require("express"),
    router = express.Router(),
    _ = require("lodash"),
    mongoose = require("mongoose"),
    mManager = require("../models/manager").managers;

    /* Creating Tasks and inserting into DB 

          not allowed Duplicate entry. TaskId should be unique.
    */
router.post("/createTask",(req, res) => {
    let { taskId, taskName, status, assignTo, points } = req.body;
    let managerDetail = new mManager({
        taskId: taskId,
        taskName: taskName,
        status: status,
        assignTo: assignTo,
        points: points,
    })

    let mainQuery = { $and: [] };
     mainQuery["$and"].push({  taskId: { $regex: `^${taskId}$`} });

    mManager.findOne(mainQuery, (err, doc) => {
        if (err) {
            console.log("err",err);
           res.status(500).send({ err: err, data: null });

        }
        else {
            if (_.isEmpty(doc)) {
                mManager.create(managerDetail,
                 
                  (err, results) => {
                     if (err) {
                         console.log(err)
                        res.status(500).send({ err: err.message, status: "error", data: null });
                     } else if (results.nModified === 0) {
                        res.setHeader("Content-Type", "application/json");
                        res.status(204).send({ err: null, status: "no-records", data: null });
                     } else {
                        res.setHeader("Content-Type", "application/json");
                        res.status(200).send({ err: null, status: "success", data: null });
                     }
                  })
   
            }
            else { 

                // Duplicate TaskId ID scenario

               placeHolder = `Task ID ${taskId}`;
               message = 'Duplicate Entry'
               res.status(409).send({ err: null, status: "warning", data: message })
            }
   
         }
    })
   
});

/* Update Tasks 

          not allowed Duplicate entry. TaskId should be unique.
    */

router.post("/updateTask",(req, res) => {
    let { _id,taskId } = req.body;
   
   let mainQuery = { $and: [] };
     mainQuery["$and"].push({ _id: { $ne: mongoose.Types.ObjectId(_id) },  taskId: { $regex: `^${taskId}$` } });

    mManager.findOne(mainQuery, (err, doc) => {
        if (err) {
            console.log("err",err);
           res.status(500).send({ err: err, data: null });

        }
        else {
            if (_.isEmpty(doc)) {
                mManager.updateOne({ _id: mongoose.Types.ObjectId(_id) },req.body,
                 
                  (err, results) => {
                     if (err) {
                         console.log(err)
                        res.status(500).send({ err: err.message, status: "error", data: null });
                     } else if (results.nModified === 0) {
                        res.setHeader("Content-Type", "application/json");
                        res.status(204).send({ err: null, status: "no-records", data: null });
                     } else {
                        res.setHeader("Content-Type", "application/json");
                        res.status(200).send({ err: null, status: "success", data: null });
                     }
                  })
   
            }
            else {  // Duplicate TaskId ID scenario
               placeHolder = `Task ID ${taskId}`;
               message = 'Duplicate Entry'
               res.status(409).send({ err: null, status: "warning", data: message })
            }
   
         }
    })
    

})

/* Delete selected document into DB */

router.post("/remove", (req, res) => {
    let { _Id } = req.body;
    mManager.deleteOne({ _id: mongoose.Types.ObjectId(_Id) },
      (err, results) => {
         if (err) {
            res.status(500).send({ err: err.message, status: "error", data: null });
         } else if (results.nModified === 0) {
            res.setHeader("Content-Type", "application/json");
            res.status(204).send({ err: null, status: "no-records", data: null });
         } else {
            res.setHeader("Content-Type", "application/json");
            res.status(200).send({ err: null, status: "success", data: null });
         }
      })
})

router.get("/getTaskList",(req, res) => {

    mManager.find((err,response)=>{
        if (err) {
            res.status(500).send({ err: err, data: null })
         }else {
            res.status(200).send({
                err: null,
                status: "success",
                data: response
            });
         }
    })
})

module.exports = router;