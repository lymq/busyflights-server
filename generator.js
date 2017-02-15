module.exports = function() {
  let faker = require('faker');
  let _ = require('lodash');
  let dateFormat = require('dateformat');

  let crazyAirFlightsConfig = { min: 3, max: 3 };

  let toughAirFlightsConfig = { min: 2, max: 2 };

  let airline = function() {
    return _.upperFirst(_.words(faker.random.word(), /[^ ]+/g)[0]) + ' Air';
  }

  let amount = function() {
    return faker.finance.amount();
  }

  let airportCode = function() {
    return _.upperCase(faker.random.word().substr(0, 3));
  }

  let departureDate = function() {
    return faker.date.future(0, new Date());
  }

  let arrivalDate = function(fromDate) {
    return faker.date.future(2, fromDate);
  }

  return {
    crazyair : _.times(faker.random.number(crazyAirFlightsConfig), function(n){
      let ddate = departureDate(),
          adate = arrivalDate(ddate),
          fdate = function(dt) {
            return dateFormat(dt, 'mm-dd-yyyy hh:MM:ss')
          };
      return {
        airline: airline(),
        price: amount(),
        cabinclass: _.capitalize(faker.random.word(1)),
        departureAirportCode: airportCode(),
        destinationAirportCode: airportCode(),
        departureDate: fdate(ddate),
        arrivalDate: fdate(adate)
      }
    }),
    toughair : _.times(faker.random.number(toughAirFlightsConfig), function(n){
      let ddate = departureDate(),
          adate = arrivalDate(ddate);
      return {
        carrier: airline(),
        basePrice: amount(),
        tax: faker.finance.amount(1, 200),
        discount: faker.random.number({min: 1, max: 100}),
        departureAirportName: airportCode(),
        arrivalAirportName: airportCode(),
        departureDay: ddate.getDate(),
        departureMonth: ddate.getMonth() + 1,
        departureYear: ddate.getFullYear(),
        returnDay: adate.getDate(),
        returnMonth: adate.getMonth() + 1,
        returnYear: adate.getFullYear()
      }
    })
  }
};
