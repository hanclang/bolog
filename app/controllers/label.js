var Label = require("../models/label");

exports.findAll = function (req, res) {
    Label.fetch(function(err, labels){
        if(err){
            console.log(err)
        }
        res.render("label/label",{
            title: "label",
            labelList:labels
        })
    })
}

exports.saveLabel = function (req, res) {
    var label = req.query.label;
    var id = req.query.id;
    console.log(label);
    var _label = new Label({labelname:label, _id: id});
    _label.save(function (err, label) {
        if(err){
            console.log(err)
        }
        res.send("1");
    })
}

exports.deleteLabel = function (req, res) {
    var id = req.query.id;
    Label.remove({_id:id},function (err, label) {
        if(err){
            console.log(err)
        }
        res.send("1");
    })
}