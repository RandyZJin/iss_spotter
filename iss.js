const request = require("request");
// const fetchMyIP = function(callback) { 
//   request.get(`https://api.ipify.org`, (error, response, body) => {
//      // Print the error if one occurred
//     // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     if (error) {
//       callback(error, null);
//       return;
//     }
//     return new Promise((resolve, reject) => {
//       if (!error) {
//         resolve(callback(body));
//       } else {
//         console.log('error:', error);
//         reject("error:", error);
//       }
//     }
//     );
//   });
// }



// const logData = (data) => {
//   console.log(data);
// };


// module.exports = fetchMyIP;

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) return callback(error, null);

    
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching location: ${body}`), null);
      return;
    }

    const location = [JSON.parse(body), JSON.parse(body)];
    if (location[0].success === false) {
      callback(Error(location[0].message), null);
      return;
    }
    callback(null, [location[0].latitude, location[0].longitude]);
  });
}

const fetchISSFlyOverTimes = function(coords, callback) {
  let latitude =  coords[0];
  let longitude = coords[1];

  request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
    if (error) return callback(error, null);

    
    
    if (response.statusCode !== 200) {
      callback(Error(`error message: ${body}`), null);
      return;
    }
    let passage = JSON.parse(body).response
    for (pass of passage) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      // let time = Datetime.setUTCseconds(pass.risetime)//.toString()
       console.log(`Next pass at ${datetime} for ${pass.duration} seconds!`)
    }

  });
  // ...
};

const nextISSTimesForMyLocation = function(callback) {
  // empty for now
}



module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };