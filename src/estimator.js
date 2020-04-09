const input_data = {
	region: {
	name: "Africa",
	avgAge: 19.7,
	avgDailyIncomeInUSD: 5,
	avgDailyIncomePopulation: 0.71
	},
	periodType: "days",
	timeToElapse: 58,
	reportedCases: 674,
	population: 66622705,
	totalHospitalBeds: 1380614
}

const covid19ImpactEstimator = (data) => data;
let output = {
	data: {},
	impact: {},
	severeImpact: {}
};
//output.data = input_data;
var currentlyInfected = input_data.reportedCases*10;
output.data='currentlyInfected'
output.impact = currentlyInfected;
console.log(output)

var severelyInfected = input_data.reportedCases*50;
output.data='severelyInfected: '
output.severeImpact= severelyInfected;
console.log(output)

var infectionsByRequestedTime = input_data.reportedCases*10*(2**10);
output.data='infectionsByRequestedTime'
output.impact = infectionsByRequestedTime;
console.log(output)

var infectionsByRequestedTime = input_data.reportedCases*50*(2**10);
output.data='severeInfectionsByRequestedTime: '
output.severeImpact = infectionsByRequestedTime;
console.log(output)

//export default covid19ImpactEstimator; added module.export due to a module error
module.exports = covid19ImpactEstimator;