// Fitness Tracker Data
// Set an Array for the Fitness Tracker.
let liftsArray = [];

let liftsObject = function(dailylift, setlifts, replifts) {
    this.dlifts = dailylift;
    this.slifts = setlifts;
    this.rlifts = replifts;
    this.LiftID = liftsArray.length + 1;
}

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("ftpsubmit").addEventListener("click", function() {
            let newlift = new liftsObject(
            document.getElementById("dlift").value, 
            document.getElementById("setlift").value, 
            document.getElementById("replift").value);
            $.ajax({
                url: "/AddFitness",
                type: "POST",
                data: JSON.stringify(newlift),
                contentType: "application/json; charset=utf-8",
                dataType   : "json",
                success: function(result) {
                    console.log(result);
                }
            });
            document.location.href = "#PersonalP"
    })
})

// Quality Life Tracker Data
let qltArray = [];

let qualityLifeObject = function(SupName, SupIntake, WaterIntake, proteinIntake, CarbIntake, SleepHours, PersonalGoals) {
    this.supN = SupName;
    this.supI = SupIntake;
    this.waterI = WaterIntake;
    this.proteinI = proteinIntake;
    this.carbI = CarbIntake;
    this.sleepH = SleepHours;
    this.personalG = PersonalGoals;
    this.qltID = qltArray.length + 1;
}

let sleepSelect = "None";
document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("qualitysubmit").addEventListener("click", function() {
        let newquality = new qualityLifeObject(
        document.getElementById("Supplements").value, 
        document.getElementById("SupplementsIntake").value,
        document.getElementById("water").value, 
        document.getElementById("protein").value, 
        document.getElementById("carbs").value, 
        document.getElementById("Sleep").value, 
        document.getElementById("Goals").value );
        $.ajax({
            url: "/AddQuality",
            type: "POST",
            data: JSON.stringify(newquality),
            contentType: "application/json; charset=utf-8",
            dataType   : "json",
            success: function(result) {
                console.log(result);
                
            }
        });
        document.location.href = "#PersonalP"
    })
})

$(document).on("pagebeforeshow", "#PersonalP", function (event) {
    createList();
})


function createList(){
    // Display Fitness user data
$.get("/getAllFitness", function(data, status) {
    console.log(status)
    liftsArray = data;

    var FitList = document.getElementById("FitnessList");
    FitList.innerHTML = "";

    liftsArray.forEach(function(item) {
        var li = document.createElement('li');
        li.classList.add('oneLift');
        li.innerHTML = "The Exercise: " + item.dlifts + "," + 
        " Total Sets: " + item.slifts + "," + " Total Reps: " 
        + item.rlifts + ".";
        li.setAttribute("data-parm", item.LiftID)
        FitList.appendChild(li);
    })
    let liftlilist = document.getElementsByClassName("oneLift")
    let liftnewLIArray = Array.from(liftlilist)

    liftnewLIArray.forEach(function(element,i) {
        element.addEventListener('click', function() {
        var parm = this.getAttribute("data-parm");
        localStorage.setItem('parm', parm)
        document.location.href = "#FitnessDetail";
        });
    });
});
$.get("/getAllQuality", function(data, status) {
        console.log(status)
        qltArray = data;
    
    // Display Quality Life user data
    var QuaList = document.getElementById("QualityList");
    QuaList.innerHTML = "";

    qltArray.forEach(function(item) {
        var li = document.createElement('li');
        li.classList.add('onequality');
        li.innerHTML = "Supplements: " + item.supN + " "
        + item.supI + " Daily"+"," 
        + " Water Intake: " + item.waterI + ","  
        + " Protein Intake: " + item.proteinI + "," 
        + "Carbs Intake: " + item.carbI + "," 
        + " Amount of sleep: " + item.sleepH + "," 
        + " Personal Goals: "+ item.personalG + ".";
        li.setAttribute("data-parm", item.qltID)
        QuaList.appendChild(li);
    })
    let Qualitylilist = document.getElementsByClassName("onequality")
    let QualitynewLIArray = Array.from(Qualitylilist)

    QualitynewLIArray.forEach(function(element,i) {
        element.addEventListener('click', function() {
        var parm = this.getAttribute("data-parm");
        localStorage.setItem('parm', parm)
        document.location.href = "#QualityDetail";
        });
    });
});
}