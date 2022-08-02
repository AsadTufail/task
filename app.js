var express = require('express'),
    app = express(),
    fs = require('fs'),
    port = process.env.PORT || 3000,
    bodyParser = require("body-parser");

app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(__dirname + "/views"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    var obj;
    fs.readFile('./task.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        res.render('index', { obj });
    });
})

app.post("/", function(req, res){
    console.log()
    var obj = {
        "name": req.body.name,
        "description": req.body.description,
        "image": req.body.image,
        "edition": req.body.edition,
        "attributes": [
            {
                "trait_type": "background",
                "value": req.body.background
            },
            {
                "trait_type": "curious base",
                "value": req.body.curious_base
            },
            {
                "trait_type": "stitches",
                "value": req.body.stitches
            },
            {
                "trait_type": "body buttons",
                "value": req.body.body_buttons
            },
            {
                "trait_type": "curious face",
                "value": req.body.curious_face
            },
            {
                "trait_type": "clothes",
                "value": req.body.clothes
            },
            {
                "trait_type": "face mask",
                "value": req.body.face_mask
            }
        ]
    }
    console.log(obj);
    fs.writeFile('./task.json', JSON.stringify(obj), function (err) {
        if (err){
            console.log(err);
        }
        else {
            res.render('index', { obj })
        }
    });    
})

app.listen(port, function(){
    console.log("App is running on port " + port);
})