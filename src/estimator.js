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
const output = {
	data: {},
	impact: {},
	severeImpact: {}
};
output.data = input_data;
var currentlyInfected = input_data.reportedCases*10;
output.impact = currentlyInfected;
//console.log(output)

var severelyInfected = input_data.reportedCases*50;
output.severeImpact= severelyInfected;
console.log(output)

//export default covid19ImpactEstimator; added module.export due to a module error
module.exports = covid19ImpactEstimator;