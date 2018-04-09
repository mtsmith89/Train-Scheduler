// Initialize Firebase
var config = {
  apiKey: "AIzaSyCsco5yVmxwFPFaGcNRWljg3NV6F4MqcZY",
  authDomain: "train-scheduler-f522f.firebaseapp.com",
  databaseURL: "https://train-scheduler-f522f.firebaseio.com",
  projectId: "train-scheduler-f522f",
  storageBucket: "",
  messagingSenderId: "1050704696511"
};
firebase.initializeApp(config);

var database = firebase.database();



$("#addTrain").on("click", function() {
  var trainName = $("#trainName")
    .val()
    .trim();
  var destination = $("#destination")
    .val()
    .trim();
  var firstTrain = moment(
    $("#firstTrain")
      .val()
      .trim(),
    "HH:mm"
  )
    .subtract(10, "years")
    .format("X");
  var frequency = $("#frequency")
    .val()
    .trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  database.ref().push(newTrain);

//   alert("Train successfully added");
  vex.dialog.alert('Train Successfully Added!')

  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");

  return false;
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFrequency = childSnapshot.val().frequency;
  var tFirstTrain = childSnapshot.val().firstTrain;

  var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
  var tRemainder =
    moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
  var tMinutes = tFrequency - tRemainder;

  var tArrival = moment()
    .add(tMinutes, "m")
    .format("hh:mm A");

  $("#trainTable > tbody").append(
    "<tr><td>" +
      tName +
      "</td><td>" +
      tDestination +
      "</td><td>" +
      tFrequency +
      "</td><td>" +
      tArrival +
      "</td><td>" +
      tMinutes +
      "</td></tr>"
  );
});
