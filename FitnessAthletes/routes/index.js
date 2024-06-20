var express = require('express');
var router = express.Router();
let ServerliftsArray = [];
let ServerqltArray = [];

var fs = require("fs")
let fileManger = {
  read: function() {
    var rawdata = fs.readFileSync('objectdata.json')
    let goodData = JSON.parse(rawdata)
    ServerliftsArray = goodData;
    ServerqltArray = goodData;
  },
  write: function(){
    let data = JSON.stringify(ServerliftsArray || ServerqltArray);
    fs.writeFileSync('objectdata.json', data);
  },

  validData: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    console.log(rawdata.length);
    if(rawdata.length < 1){
      return false;
    }
    else {
      return true;
    }
  }
}

if(!fileManger.validData()){
  fileManger.write()
} else {
  fileManger.read()
}

let liftsObject = function(dailylift, setlifts, replifts) {
    this.dlifts = dailylift;
    this.slifts = setlifts;
    this.rlifts = replifts;
    this.LiftID = ServerliftsArray.length + 1;
}

let qualityLifeObject = function(SupName, SupIntake, WaterIntake, proteinIntake, CarbIntake, SleepHours, PersonalGoals) {
    this.supN = SupName;
    this.supI = SupIntake;
    this.waterI = WaterIntake;
    this.proteinI = proteinIntake;
    this.carbI = CarbIntake;
    this.sleepH = SleepHours;
    this.personalG = PersonalGoals;
    this.qltID = ServerqltArray.length + 1;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile('index');
});

router.get('/getAllFitness', function(req,res) {
  fileManger.read();
  res.status(200).json(ServerliftsArray)
});

router.post('/AddFitness', function(req,res) {
  const newFitness = req.body;
  ServerliftsArray.push(newFitness);
  fileManger.write();
  res.status(200).json(newFitness);
});

router.get('/getAllQuality', function(req,res) {
  fileManger.read();
  res.status(200).json(ServerqltArray)
});

router.post('/AddQuality', function(req,res) {
  const newQ = req.body;
  ServerqltArray.push(newQ);
  fileManger.write();
  res.status(200).json(newQ);
});

module.exports = router;
