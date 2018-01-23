// Define Packages
var colors = require('colors');
var parse = require('csv-parse');
var fs = require('fs');
const uuidV4 = require('uuid/v4');
var prettyjson = require('prettyjson');

// Used for Async
var parsing = true;
var parsedJson = {};

// Read CSV File
var path = process.argv[2];

try {
  var csvFileString = fs.readFileSync(path, 'utf8');
} catch (err) {
  console.error(colors.bgRed.white('You must provide the path to the CSV file as a command line argument.'));
  console.error(colors.bgRed.white('No CSV File was found at: ' + path + ''));
  return -1;
}

// Define Main Function
function main() {
  if (!csvFileString) {
    console.error('You must provide the path to the CSV file as a command line argument.'.bgRed.white);
    return 0;
  } else {
    var jobs = {};
    parse(csvFileString, {comment: '#'}, function(err, output){
      for (index = 1; index < output.length; index++){
        var candidateObject = {};
        var uuid = uuidV4();
        candidateObject[uuid] = {
          'timestamp': output[index][0],
          'interviewer': output[index][1],
          'other interviewers': output[index][2],
          'candidate name': output[index][4] + ' ' + output[index][5],
          'position': output[index][6],
          'personality': output[index][7],
          'leadership & initiative': output[index][8],
          'interview preparedness': output[index][9],
          'communication skills': output[index][10],
          'teamwork experience': output[index][11],
          'confidence': output[index][12],
          'extracurriculars': output[index][13],
          'has worked at ecfmg': output[index][14],
          'offer': output[index][15]
        }
        jobs[candidateObject[uuid].position] = [] || jobs[candidateObject[uuid].position];
        jobs[candidateObject[uuid].position].push(candidateObject);
      }
      console.log(prettyjson.render(jobs));
    });
  }
}

// Execute Main Function
main();

// Define Helper Functions
function convertToJson(csv){
  var jobs = {};
  var candidateObject = {};
  parse(csvFileString, {comment: '#'}, function(err, output){
    for (index = 0; index < output.length; index++){
      candidateObject[uuidV4()] = {
        'timestamp': output[index][0],
        'interviewer': output[index][1],
        'other interviewers': output[index][2],
        'candidate name': output[index][4] + ' ' + output[index][5],
        'position': output[index][6],
        'personality': output[index][7],
        'leadership & initiative': output[index][8],
        'interview preparedness': output[index][9],
        'communication skills': output[index][10],
        'teamwork experience': output[index][11],
        'confidence': output[index][12],
        'extracurriculars': output[index][13],
        'has worked at ecfmg': output[index][14],
        'offer': output[index][15]
      }
      jobs[candidateObject.position] = [] || jobs[candidateObject.position];
      jobs[candidateObject.position].push(candidateObject);
    }
  });
}
