const data = {
    region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
    },
    periodType: 'days',
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
}

let output = {data: {},impact: {},severeImpact: {}};

const periodNormaliser = (currentlyInfected, days, data) => {
    let normalDays;
    if (data.periodType == 'days'){
        normalDays = days;
    }
    else if (data.periodType == 'weeks'){
        normalDays = days*7;
    }
    else if (data.periodType == 'months'){
        normalDays = days*30;
    }
    let decimalDiscard = Number(normalDays/3) | 0;
    return currentlyInfected * (2 ** decimalDiscard);
};

const covid19ImpactEstimator = (data) => data;
    const days = data.timeToElapse;
    const currentlyInfected = data.reportedCases*10;

    output.impact.currentlyInfected = currentlyInfected;
    output.severeImpact.currentlyInfected = data.reportedCases*50;

    const infectionsByRequestedTime = currentlyInfected;
    output.impact.infectionsByRequestedTime = periodNormaliser(currentlyInfected,days,data);
    output.severeImpact.infectionsByRequestedTime = periodNormaliser((currentlyInfected)*50,days,data);

    /****************** CH_2 ************************/
    const severeCasesByRequestedTime = currentlyInfected;
    let severeCases = periodNormaliser(currentlyInfected,days,data)*(15/100);
    output.impact.severeCasesByRequestedTime = severeCases;
    output.severeImpact.severeCasesByRequestedTime = severeCases*50;

    const hospitalBedsByRequestedTime = severeCasesByRequestedTime;
    let bedsTotal = data.totalHospitalBeds;
    let bedsAvailable = ((35/100) - bedsTotal)| 0;
    output.impact.hospitalBedsByRequestedTime = severeCases - bedsAvailable;
    output.severeImpact.hospitalBedsByRequestedTime = (severeCases*50) - bedsAvailable;

    /****************** CH_3 ************************/

    const casesForICUByRequestedTime = infectionsByRequestedTime;
    let casesIcu = periodNormaliser(currentlyInfected,days,data);
    output.impact.casesForICUByRequestedTime = (5/100) * casesIcu;
    output.severeImpact.casesForICUByRequestedTime = (5/100) * casesIcu;

    const casesForVentilatorsByRequestedTime = infectionsByRequestedTime;
    let casesVentilator = periodNormaliser(currentlyInfected,days,data);
    output.impact.casesForVentilatorsByRequestedTime = ((2/100) * casesVentilator) | 0;
    output.severeImpact.casesForVentilatorsByRequestedTime = ((2/100) * casesVentilator*50) | 0;

    const dollarsInFlight = infectionsByRequestedTime;
    let infectionByTime = periodNormaliser(currentlyInfected,days,data);
    output.impact.dollarsInFlight = ((infectionByTime * 0.65 * 1.5) / 30) | 0;
    output.severeImpact.dollarsInFlight = (((infectionByTime*50) * 0.65 * 1.5) / 30) | 0;

    //export default covid19ImpactEstimator; added module.export due to a module error
    output.data = data;
    return output;
module.exports = covid19ImpactEstimator;
console.log(output)