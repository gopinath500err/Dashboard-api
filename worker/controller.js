const express = require("express"),
    router = express.Router(),
    mongoose = require("mongoose"),
    mWorker = require("../models/worker").workers;

    router.get("/getWorkerList",(req, res) => {

        /* mWorker.aggregate([
            {
                $lookup: {
                   from: "managers", let: { crtUser_id: "$crtUser_id" },
                }
            }
        ]) */

        mWorker.find((err,response)=>{
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

    router.post("/updateWTask",(req, res) => {
        let { id, status } = req.body;
        mWorker.updateOne({ _id: mongoose.Types.ObjectId(id)}, {
            $set:
         {
            status: status
         }
         }, (err, updtResults)=>{
            if (err) {
                res.status(500).send({ err: err.message, data: null });
             } else if (updtResults.nModified === 0) {
                res.status(204).send({ err: null, data: { code: 201, msg: "Not Updated" } });
             } else {
                res.status(200).send({ err: null, data: "Successfully updated" });
             }
        })
    
    })

    module.exports = router;