const data = [];
const output = { 
    data: {}, 
    impact: {}, 
    severeImpact: {} 
    };

const addData = (ev) => {
    ev.preventDefault();
    let inputData = {
        region: { 
            name: document.getElementById('name').value,
            avgAge: document.getElementById('avgAge').value,
            avgDailyIncomeInUSD: document.getElementById('avgIncomeInUSD').value,
            avgDailyIncomePopulation: document.getElementById('avgIncomePopulation').value
        },
        periodType: document.querySelector('input[name="period"]:checked').value,
        timeToElapse: document.getElementById('timeToElapse').value,
        reportedCases: document.getElementById('rptedCases').value,
        population: document.getElementById('population').value,
        totalHospitalBeds: document.getElementById('tHospitalBeds').value 
    }
    data.push(inputData);
    document.forms[0].reset();
    console.warn('added', {data});
    let pre = document.querySelector('#msg pre');
    pre.textContent = '\n' + JSON.stringify(output, '\t', 2);
      //saving///
    //localStorage.setItem('mydatalist', JSON.stringify(data))
    //localStorage.getItem('mydatalist')

}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('btn').addEventListener('click', addData); 
});

const periodNormaliser = (currentlyInfected, days, data) => { 
    let normalDays;
    if (data.periodType === 'days') { 
        normalDays = days; 
    }
    else if (data.periodType === 'weeks') { 
    normalDays = days*7;
    }
    else if (data.periodType === 'months') {
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

module.exports = covid19ImpactEstimator;


