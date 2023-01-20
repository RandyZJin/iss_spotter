const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json')
  
};


const fetchCoordsByIP = function(body) {
  ip = JSON.parse(body).ip

  return request(`http://ipwho.is/${ip}`)

};

const fetchISSFlyOverTimes = function(body) {
  latitude = JSON.parse(body).latitude;
  longitude = JSON.parse(body).longitude;

  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`)

};

// const nextISSTimesForMyLocation = function() {
//   return fetchMyIP()
//     .then(fetchCoordsByIP)
//     .then(fetchISSFlyOverTimes)
//     .then((data) => {
//       const { response } = JSON.parse(data);
//       return response;
//     }); 
//   // let passage = JSON.parse(body).response;
//   // for (pass of passage) {
//   //   const datetime = new Date(0);
//   //   datetime.setUTCSeconds(pass.risetime);
//   //   console.log(`Next pass at ${datetime} for ${pass.duration} seconds!`)
//   // }
// };

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};

// console.log("test output: ", ip)

