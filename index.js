
const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss');

// let ipAddress = "money";

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
  fetchCoordsByIP(ip, (error, location) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  
    console.log('It worked! Returned location:' , location);
    fetchISSFlyOverTimes(location, ()=>{
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
      console.log()
      
    });

    
  })
 

})
;


// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//   // success, print out the deets!
//   fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
//   fetchCoordsByIP(ip, (error, location) => {
//     if (error) {
//       console.log("It didn't work!" , error);
//       return;
//     }
  
//     console.log('It worked! Returned location:' , location);
//     fetchISSFlyOverTimes(location, ()=>{
//       if (error) {
//         console.log("It didn't work!" , error);
//         return;
//       }
      
//     });

    
//   })
 

// })
//   console.log(passTimes);
// });


// const logData = (data) => {
//   console.log(data);
// };
// fetchMyIP(logData);

// let ipAddress = fetchMyIP((error, ip) => ip)


// fetchCoordsByIP(ipAddress, (error, location) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned location:' , location);
// });




module.exports = { fetchMyIP };