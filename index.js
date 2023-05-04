const express = require('express');
const axios = require('axios');
const app = express();
app.set('view engine', 'ejs');



app.get("/search", (req, res) => {
    let result = {};
    axios
      .get(`https://api.spacexdata.com/v4/${req.query.item}`)
      .then(function (response) {
        for (let key in req.query) {
          if (key === "item") {
            continue;
          } else {
            for (let i = 0; i < response.data.length; i++) {
              let dataObj = response.data[i];
              if (typeof dataObj === "object") { // check if the current element is an object
                for (let subKey in dataObj) { // iterate over the object's properties
                  if (dataObj[subKey] === req.query[key]) {
                    return res.json({ result: dataObj });
                  }
                }
              } else if (dataObj[key] === req.query[key]) {
                return res.json({ result: dataObj });
              }
            }
          }
        }
        return res.json({ message: "Data not found. Please try again..." });
      })
      .catch(function (error) {
        return res.json({ message: "Data not found. Please try again later." });
      });
  });
  

// scenerio 1 - return a single capsule
// app.get('/capsules/:serial', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/capsules')
//         .then(function (response) {
//             // handle success
//             //console.log(response.data);
//             //
//             for (let i = 0; i < response.data.length; i++) {
//                 let capsule = response.data[i];
//                 let splitSerial = req.params.serial.split(''); // array ['c', '1',...]
//                 let finalSerial = splitSerial[0].toUpperCase() + splitSerial.slice(1).join('');
//                 //upperCaseSerial[0].toUpperCase()
//                 //upperCaseSerial.join('');
//                 console.log('UpperCase Serial', finalSerial);
//                 //console.log('CAPSULE---->', capsule)
//                 if (capsule.serial === finalSerial) {
//                     return res.json({ capsule: capsule });
//                 }
//             }
//             return res.json({ message: 'Capsule does not exist' })
//         })
//         .catch(function (error) {
//             //console.log(error);
//             return res.json({ message: 'Data not found. Please try again later' })
//         });
// });






app.get('/capsules/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/capsules')
    .then(function (response) {
        // print req.params
        console.log('req.params', req.params); // print an object
        console.log('api response', response.data); // print an array of capsules
        // run a for loop to search based of the key from req.params
        const capsuleArray = [];
        for (let i = 0; i < response.data.length; i++) {
            let capsule = response.data[i];
            let userRequest = req.params['0'].split('/'); // ['serial', 'c103'] ['reuse_count', '0'] parsing -> getting it into the format the will serve us...
            if (req.params['0'].includes('serial')) {
                if (capsule.serial === userRequest[1].toUpperCase()) {
                    return res.json({ capsule });
                }
            } else if (userRequest[0] === 'id') {
                if (capsule.id === userRequest[1]) {
                    return res.json({ capsule });
                }
            } else if (userRequest[0] === 'reuse_count') {
                // check to see which capsule have the reuse count
                // question: is the value of reuse_count a string or number when it comes in
                // from the user...
                let countValue = parseInt(userRequest[1]); // Number(userRequest[1])
                // check the count value
                if (capsule.reuse_count === countValue) {
                    capsuleArray.push(capsule);
                }
            } else if (userRequest[0] === 'water_landings') {
                // check to see which capsule have the reuse count
                // question: is the value of reuse_count a string or number when it comes in
                // from the user...
                let countValue = parseInt(userRequest[1]); // Number(userRequest[1])
                // check the count value
                if (capsule.water_landings === countValue) {
                    capsuleArray.push(capsule);
                }
            } else if (userRequest[0] === 'land_landings') {
                // check to see which capsule have the reuse count
                // question: is the value of reuse_count a string or number when it comes in
                // from the user...
                let countValue = parseInt(userRequest[1]); // Number(userRequest[1])
                // check the count value
                if (capsule.land_landings === countValue) {
                    capsuleArray.push(capsule);
                }
            } else if (userRequest[0] === 'last_update') {
                // check to see which capsule have the reuse count
                // question: is the value of reuse_count a string or number when it comes in
                // from the user...
                let countValue = parseInt(userRequest[1]); // Number(userRequest[1])
                // check the count value
                if (capsule.last_update === countValue) {
                    capsuleArray.push(capsule);
                }
            } else if (userRequest[0] === 'status') {
                // check to see which capsule have the reuse count
                // question: is the value of reuse_count a string or number when it comes in
                // from the user...
                let value = userRequest[1]; // Number(userRequest[1])
                // check the count value
                if (capsule.status === value) {
                    capsuleArray.push(capsule);
                }
            } else if (userRequest[0] === 'type') {
                // check to see which capsule have the reuse count
                // question: is the value of reuse_count a string or number when it comes in
                // from the user...
                let value = userRequest[1]; // Number(userRequest[1])
                // check the count value
                if (capsule.type === value) {
                    capsuleArray.push(capsule);
                }
            } else {
                return res.json({ message: 'invalid key' });
            }

            // @todo - we need make a conditional for id
            // @todo - we need make a conditional for water_landings
            // @todo - we need make a conditional for last_update
            // @todo - we need make a conditional for status
            // @todo - we need make a conditional for type

        }
        if (capsuleArray.length = 0) {
            return res.json({ message: 'No matching capsule'})
        } else {
            return res.json({ capsules: capsuleArray});
        }
    });
});

 


app.get('/', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/company')
      .then(function (response) {
        // handle success
        //console.log(response.data.)
        //to find company name -> console.log(response.data.name)
        console.log( 'data for company:', response.data);
        res.render( 'index', { company: response.data }) //company.name
      })
      .catch(function(error) {
          // console.log(error);
          res.json({ message: 'Data not found. Please try again later'});
      });
  });



  app.get('/company', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/company')
      .then(function (response) {
        // handle success
        //console.log(response.data.)
        //to find company name -> console.log(response.data.name)
        console.log(response.data);
        res.json({ company: response.data }) //company.name
      })
      .catch(function(error) {
          // console.log(error);
          res.json({ message: 'Data not found. Please try again later'});
      });
  });

 
 
  app.get('/cores', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/cores')
      .then(function (response) {
        // handle success
        // console.log('Data for cores', response.data);
        res.render( 'cores', {cores: response.data })
      })
      .catch(function(error) {
          // console.log(error);
          res.json({ message: 'Data not found. Please try again later'});
      });
  });

  app.get('/cores/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/cores')
    .then(function (response) {
        // print req.params
        console.log('req.params', req.params); // print an object
        console.log('api response', response.data); // print an array of capsules
        // run a for loop to search based of the key from req.params
        const coresArray = [];
for (let i = 0; i < response.data.length; i++) {
    let cores = response.data[i];
    let userRequest = req.params['0'].split('/');
    if (req.params['0'].includes('serial')) {
        if (cores.serial === userRequest[1].toUpperCase()) {
            coresArray.push(cores);
        }
    } else if (userRequest[0] === 'id') {
        if (cores.id === userRequest[1]) {
            coresArray.push(cores);
        }
    } else if (userRequest[0] === 'reuse_count') {
        let countValue = parseInt(userRequest[1]);
        if (cores.reuse_count === countValue) {
            coresArray.push(cores);
        }
    } else if (userRequest[0] === 'rtls_attempts') {
        let countValue = parseInt(userRequest[1]);
        if (cores.rtls_attempts === countValue) {
            coresArray.push(cores);
        }
    } else if (userRequest[0] === 'rtls_landings') {
        let countValue = parseInt(userRequest[1]);
        if (cores.rtls_landings === countValue) {
            coresArray.push(cores);
        }
    } else if (userRequest[0] === 'status') {
        let value = userRequest[1];
        if (cores.status === value) {
            coresArray.push(cores);
        }
    } else if (userRequest[0] === 'type') {
        let value = userRequest[1];
        if (cores.type === value) {
            coresArray.push(cores);
        }
    } else {
        return res.json({ message: 'invalid key' });
    }
}

if (coresArray.length === 0) {
    return res.json({ message: 'no matching cores found' });
} else {
    return res.json({ cores: coresArray });
        }
    });
});


// return a single core
// app.get('/cores/:serial', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/cores')
//         .then(function (response) {
//             // handle success
//             //console.log(response.data);
//             //
//             for (let i = 0; i < response.data.length; i++) {
//                 let cores = response.data[i];
//                 let splitSerial = req.params.serial.split(''); // array ['c', '1',...]
//                 let finalSerial = splitSerial[0].toUpperCase() + splitSerial.slice(1).join('');
//                 //upperCaseSerial[0].toUpperCase()
//                 //upperCaseSerial.join('');
//                 console.log('UpperCase Serial', finalSerial);
//                 //console.log('CORES---->', cores)
//                 if (cores.serial === finalSerial) {
//                     return res.json({ cores: cores });
//                 }
//             }
//             return res.json({ message: 'Core does not exist' })
//         })
//         .catch(function (error) {
//             //console.log(error);
//             return res.json({ message: 'Data not found. Please try again later' })
//         });
// });



  app.get('/crew', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/crew')
      .then(function (response) {
        // handle success
        console.log(response.data);
        res.render( 'crew', {crew: response.data })
      })
      .catch(function(error) {
          // console.log(error);
          res.json({ message: 'Data not found. Please try again later'});
      });
  });

 //return a single crew
 app.get('/crew/:name', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/crew')
        .then(function (response) {
            // handle success
            //console.log(response.data);
            //
            for (let i = 0; i < response.data.length; i++) {
                let crew = response.data[i];
                let splitName = req.params.name.split(''); // array ['c', '1',...]
                let finalName = splitName[0].toUpperCase() + splitName.slice(1).join('');
                //upperCaseSerial[0].toUpperCase()
                //upperCaseSerial.join('');
                console.log('UpperCase Serial', finalName);
                //console.log('CREW---->', crew)
                if (crew.name === finalName) {
                    return res.json({ crew: crew });
                }
            }
            return res.json({ message: 'Crew does not exist' })
        })
        .catch(function (error) {
            //console.log(error);
            return res.json({ message: 'Data not found. Please try again later' })
        });
});



  app.get('/dragons', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/dragons')
      .then(function (response) {
        // handle success
        console.log(response.data);
        res.render( 'dragons', {dragons: response.data })
      })
      .catch(function(error) {
          // console.log(error);
          res.json({ message: 'Data not found. Please try again later'});
      });
  });


  app.get('/dragons/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/dragons')
    .then(function (response) {
        // print req.params
        console.log('req.params', req.params); // print an object
        console.log('api response', response.data); // print an array of capsules
        // run a for loop to search based of the key from req.params
        const dragonArray = [];
        for (let i = 0; i < response.data.length; i++) {
            let dragon = response.data[i];
            let userRequest = req.params['0'].split('/'); // ['serial', 'c103'] ['reuse_count', '0'] parsing -> getting it into the format the will serve us...
            if(userRequest[0].toLowerCase() === 'name') { // search by name
                if(dragon.name.toUpperCase() === userRequest[1].toUpperCase()) {
                    return res.json({ dragon });
                }
            } else if(userRequest[0].toLowerCase() === 'id') { // search by id
                if(dragon.id.toUpperCase() === userRequest[1].toUpperCase()) {
                    return res.json({ dragon });
                }
            } else if (userRequest[0].toLowerCase() === 'crew_capacity') { // search by crew_capacity
                let crewCap = parseInt(userRequest[1]);
                if (dragon.crew_capacity === crewCap) {
                    dragonArray.push(dragon);
                }
            } else if (userRequest[0].toLowerCase() === 'status') { // search by status
                if (dragon.status === userRequest[1]) {
                    dragonArray.push(dragon);
                }
            } else if (userRequest[0].toLowerCase() === 'type') { // search by type
                if (dragon.type === userRequest[1]) {
                    dragonArray.push(dragon);
                }
            } else if (userRequest[0].toLowerCase() === 'active') { // search by active
                if ((dragon.active === true && userRequest[1].toLowerCase() === 'true') || (dragon.active === false && userRequest[1].toLowerCase() === 'false')) {
                    dragonArray.push(dragon);
                }
            } else {
                return res.json({ message: 'Invalid key.' });
            }
        }

        if (dragonArray.length > 0) {
            return res.json({ dragons: dragonArray });
        } else {
            return res.json({ message: 'No matching dragons.' });
        }
    });
});


  //return a single Dragon
// app.get('/dragons/:name', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/dragons')
//         .then(function (response) {
//             // handle success
//             //console.log(response.data);
//             //
//             for (let i = 0; i < response.data.length; i++) {
//                 let dragons = response.data[i];
//                 let splitName = req.params.name.split(''); // array ['c', '1',...]
//                 let finalName = splitName[0].toUpperCase() + splitName.slice(1).join('');
//                 //upperCaseSerial[0].toUpperCase()
//                 //upperCaseSerial.join('');
//                 console.log('UpperCase Serial', finalName);
//                 //console.log('CREW---->', crew)
//                 if (dragons.name === finalName) {
//                     return res.json({ dragons: dragons });
//                 }
//             }
//             return res.json({ message: 'Dragon does not exist' })
//         })
//         .catch(function (error) {
//             //console.log(error);
//             return res.json({ message: 'Data not found. Please try again later' })
//         });
// });



  app.get('/landpads', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/landpads')
      .then(function (response) {
        // handle success
        console.log(response.data);
        res.render('landpads', {landpads: response.data })
      })
      .catch(function(error) {
          // console.log(error);
          res.json({ message: 'Data not found. Please try again later'});
      });
  });


  app.get('/landpads/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/landpads')
    .then(function (response) {
        // print req.params
        console.log('req.params', req.params); // print an object
        console.log('api response', response.data); // print an array of capsules
        // run a for loop to search based of the key from req.params
        const landpadArray = [];
        for (let i = 0; i < response.data.length; i++) {
            let landpad = response.data[i];
            let userRequest = req.params['0'].split('/'); // ['serial', 'c103'] ['reuse_count', '0'] parsing -> getting it into the format the will serve us...
            if(userRequest[0].toLowerCase() === 'full_name') { // search by full_name
                if(landpad.full_name.toUpperCase() === userRequest[1].toUpperCase()) {
                    return res.json({ landpad });
                }
            } else if(userRequest[0].toLowerCase() === 'id') { // search by id
                if(landpad.id.toUpperCase() === userRequest[1].toUpperCase()) {
                    return res.json({ landpad });
                }
            } else if(userRequest[0].toLowerCase() === 'region') { // search by region
                if(landpad.region.toUpperCase() === userRequest[1].toUpperCase()) {
                    return res.json({ landpad });
                }
            }else if (userRequest[0].toLowerCase() === 'landing_attempts') { // search by landing_attempts
                let landAttempts = parseInt(userRequest[1]);
                if (landpad.landing_attempts === landAttempts) {
                    landpadArray.push(landpad);
                }
            } else if (userRequest[0].toLowerCase() === 'type') { // search by type
                if (landpad.type === userRequest[1]) {
                    landpadArray.push(landpad);
                }
            } else {
                return res.json({ message: 'Invalid key.' });
            }
        }

        if (landpadArray.length > 0) {
            return res.json({ landpads: landpadArray });
        } else {
            return res.json({ message: 'No matching landpads.' });
        }
    });
});


    //return a single Landpad
// app.get('/landpads/:id', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/landpads')
//         .then(function (response) {
//             // handle success
//             //console.log(response.data);
//             //
//             for (let i = 0; i < response.data.length; i++) {
//                 let landpads = response.data[i];
//                 let splitId = req.params.id.split(''); // array ['c', '1',...]
//                 let finalId = splitId[0].toUpperCase() + splitId.slice(1).join('');
//                 //upperCaseSerial[0].toUpperCase()
//                 //upperCaseSerial.join('');
//                 console.log('UpperCase id', finalId);
//                 //console.log('CREW---->', crew)
//                 if (landpads.id === finalId) {
//                     return res.json({ landpads: landpads });
//                 }
//             }
//             return res.json({ message: 'Landpad does not exist' })
//         })
//         .catch(function (error) {
//             //console.log(error);
//             return res.json({ message: 'Data not found. Please try again later' })
//         });
// });

  

  app.get('/launches', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/launches')
      .then(function (response) {
        // handle success
        console.log(response.data);
        res.json({data: response.data })
      })
      .catch(function(error) {
          // console.log(error);
          res.json({ message: 'Data not found. Please try again later'});
      });
  });


  app.get('/launches/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launches')
    .then(function (response) {
        console.log('req.params', req.params);
        console.log('api response', response.data);
        const launchArray = [];
        for (let i = 0; i < response.data.length; i++) {
            let launch = response.data[i];
            let userRequest = req.params['0'].split('/');
            if(userRequest[0].toLowerCase() === 'flight_number') {
                if(launch.flight_number === parseInt(userRequest[1])) {
                    return res.json({ launch });
                }
            } else if(userRequest[0].toLowerCase() === 'id') {
                if(launch.id.toUpperCase() === userRequest[1].toUpperCase()) {
                    return res.json({ launch });
                }
            } else if(userRequest[0].toLowerCase() === 'name') {
                if(launch.name.toUpperCase() === userRequest[1].toUpperCase()) {
                    return res.json({ launch });
                }
            }else if (userRequest[0].toLowerCase() === 'success') {
                if (launch.success === (userRequest[1] === 'true')) {
                    launchArray.push(launch);
                }
            } else if (userRequest[0].toLowerCase() === 'rocket') {
                if (launch.rocket === userRequest[1]) {
                    launchArray.push(launch);
                }
            } else {
                return res.json({ message: 'Invalid key.' });
            }
        }

        if (launchArray.length > 0) {
            return res.json({ launches: launchArray });
        } else {
            return res.json({ message: 'No matching launches.' });
        }
    });
});





  //return a single Launch
//   app.get('/launches/:id', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/launches')
//         .then(function (response) {
//             // handle success
//             //console.log(response.data);
//             //
//             for (let i = 0; i < response.data.length; i++) {
//                 let launches = response.data[i];
//                 let splitId = req.params.id.split(''); // array ['c', '1',...]
//                 let finalId = splitId[0].toUpperCase() + splitId.slice(1).join('');
//                 //upperCaseSerial[0].toUpperCase()
//                 //upperCaseSerial.join('');
//                 console.log('UpperCase id', finalId);
//                 //console.log('CREW---->', crew)
//                 if (launches.id === finalId) {
//                     return res.json({ launches: launches });
//                 }
//             }
//             return res.json({ message: 'Launch does not exist' })
//         })
//         .catch(function (error) {
//             //console.log(error);
//             return res.json({ message: 'Data not found. Please try again later' })
//         });
// });


  app.get('/launchpads', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/launchpads')
      .then(function (response) {
        // handle success
        console.log(response.data);
        res.json({data: response.data })
      })
      .catch(function(error) {
          // console.log(error);
          res.json({ message: 'Data not found. Please try again later'});
      });
  });


  app.get('/launchpads/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launchpads/')
    .then(function (response) {
        console.log('req.params', req.params);
        console.log('api response', response.data);
        const launchpadArray = [];
        for (let i = 0; i < response.data.length; i++) {
            let launchpad = response.data[i];
            let userRequest = req.params['0'].split('/');
            if(userRequest[0].toLowerCase() === 'id') {
                if(launchpad.id.toUpperCase() === userRequest[1].toUpperCase()) {
                    return res.json({ launchpad });
                }
            } else if(userRequest[0].toLowerCase() === 'name') {
                if(launchpad.name.toUpperCase() === userRequest[1].toUpperCase()) {
                    launchpadArray.push(launchpad);
                }
            } else if(userRequest[0].toLowerCase() === 'region') {
                if(launchpad.region.toUpperCase() === userRequest[1].toUpperCase()) {
                    launchpadArray.push(launchpad);
                }
            } else if(userRequest[0].toLowerCase() === 'full_name') {
                if(launchpad.full_name.toUpperCase() === userRequest[1].toUpperCase()) {
                    launchpadArray.push(launchpad);
                }
            } else {
                return res.json({ message: 'Invalid key.' });
            }
        }

        if (launchpadArray.length > 0) {
            return res.json({ launchpads: launchpadArray });
        } else {
            return res.json({ message: 'No matching launchpads.' });
        }
    });
});




//return a single Landpad
// app.get('/launchpads/:id', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/launchpads')
//         .then(function (response) {
//             // handle success
//             //console.log(response.data);
//             //
//             for (let i = 0; i < response.data.length; i++) {
//                 let launchPads = response.data[i];
//                 let splitId = req.params.id.split(''); // array ['c', '1',...]
//                 let finalId = splitId[0].toUpperCase() + splitId.slice(1).join('');
//                 //upperCaseSerial[0].toUpperCase()
//                 //upperCaseSerial.join('');
//                 console.log('UpperCase id', finalId);
//                 //console.log('CREW---->', crew)
//                 if (launchPads.id === finalId) {
//                     return res.json({ launchPads: launchPads });
//                 }
//             }
//             return res.json({ message: 'Launchpad does not exist' })
//         })
//         .catch(function (error) {
//             //console.log(error);
//             return res.json({ message: 'Data not found. Please try again later' })
//         });
// });


  app.get('/payloads', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/payloads')
      .then(function (response) {
        // handle success
        console.log(response.data);
        res.json({data: response.data })
      })
      .catch(function(error) {
          // console.log(error);
          res.json({ message: 'Data not found. Please try again later'});
      });
  });


  app.get('/payloads/:id', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/payloads')
        .then(function (response) {
            // handle success
            //console.log(response.data);
            //
            for (let i = 0; i < response.data.length; i++) {
                let payloads = response.data[i];
                let splitId = req.params.id.split(''); // array ['c', '1',...]
                let finalId = splitId[0].toUpperCase() + splitId.slice(1).join('');
                //upperCaseSerial[0].toUpperCase()
                //upperCaseSerial.join('');
                console.log('UpperCase id', finalId);
                //console.log('CREW---->', crew)
                if (payloads.id === finalId) {
                    return res.json({ payloads: payloads });
                }
            }
            return res.json({ message: 'Payload does not exist' })
        })
        .catch(function (error) {
            //console.log(error);
            return res.json({ message: 'Data not found. Please try again later' })
        });
});




  app.get('/roadster', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/roadster')
      .then(function (response) {
        // handle success
        console.log(response.data);
        res.json({data: response.data })
      })
      .catch(function(error) {
          // console.log(error);
          res.json({ message: 'Data not found. Please try again later'});
      });
  });

  app.get('/rockets', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/rockets')
      .then(function (response) {
        // handle success
        console.log(response.data);
        res.json({data: response.data })
      })
      .catch(function(error) {
          // console.log(error);
          res.json({ message: 'Data not found. Please try again later'});
      });
  });


  app.get('/rockets/:name', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/rockets')
        .then(function (response) {
            // handle success
            //console.log(response.data);
            //
            for (let i = 0; i < response.data.length; i++) {
                let rockets = response.data[i];
                let splitName = req.params.name.split(''); // array ['c', '1',...]
                let finalName = splitName[0].toUpperCase() + splitName.slice(1).join('');
                //upperCaseSerial[0].toUpperCase()
                //upperCaseSerial.join('');
                console.log('UpperCase Name', finalName);
                //console.log('CREW---->', crew)
                if (rockets.name === finalName) {
                    return res.json({ rockets: rockets });
                }
            }
            return res.json({ message: 'Rocket does not exist' })
        })
        .catch(function (error) {
            //console.log(error);
            return res.json({ message: 'Data not found. Please try again later' })
        });
});



  app.get('/ships', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/ships')
      .then(function (response) {
        // handle success
        console.log(response.data);
        res.json({data: response.data })
      })
      .catch(function(error) {
          // console.log(error);
          res.json({ message: 'Data not found. Please try again later'});
      });
  });


  app.get('/ships/:id', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/ships')
        .then(function (response) {
            // handle success
            //console.log(response.data);
            //
            for (let i = 0; i < response.data.length; i++) {
                let ships = response.data[i];
                let splitId = req.params.id.split(''); // array ['c', '1',...]
                let finalId = splitId[0].toUpperCase() + splitId.slice(1).join('');
                //upperCaseSerial[0].toUpperCase()
                //upperCaseSerial.join('');
                // console.log('UpperCase id', finalId);
                //console.log('CREW---->', crew)
                if (ships.id === finalId) {
                    return res.json({ ships: ships });
                }
            }
            return res.json({ message: 'Ship does not exist' })
        })
        .catch(function (error) {
            //console.log(error);
            return res.json({ message: 'Data not found. Please try again later' })
        });
});




  app.get('/starlink', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/starlink')
      .then(function (response) {
        // handle success
        console.log(response.data);
        res.json({data: response.data })
      })
      .catch(function(error) {
          // console.log(error);
          res.json({ message: 'Data not found. Please try again later'});
      });
  });


  app.get('/starlink/:id', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/starlink')
        .then(function (response) {
            // handle success
            //console.log(response.data);
            //
            for (let i = 0; i < response.data.length; i++) {
                let starlink = response.data[i];
                let splitId = req.params.id.split(''); // array ['c', '1',...]
                let finalId = splitId[0].toUpperCase() + splitId.slice(1).join('');
                //upperCaseSerial[0].toUpperCase()
                //upperCaseSerial.join('');
                // console.log('UpperCase id', finalId);
                //console.log('CREW---->', crew)
                if (starlink.id === finalId) {
                    return res.json({ starlink: starlink });
                }
            }
            return res.json({ message: 'Starlink does not exist' })
        })
        .catch(function (error) {
            //console.log(error);
            return res.json({ message: 'Data not found. Please try again later' })
        });
});



  app.get('/history', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/history')
      .then(function (response) {
        // handle success
        console.log(response.data);
        res.json({data: response.data })
      })
      .catch(function(error) {
          // console.log(error);
          res.json({ message: 'Data not found. Please try again later'});
      });
  });



  app.get('/index', function (req, res) {
    res.sendFile(__dirname+'/views/index.html');
  });
  
  app.get('/about', function (req, res) {
    res.sendFile(__dirname+'/views/about.html');
  });
  
  app.get('/blog-directory', function (req, res) {
    res.sendFile(__dirname+'/views/blog-directory.html');
  });





const PORT = process.env.PORT || 8000;

app.listen(PORT, function() {
    console.log(`Server is running on PORT`, PORT);
});

module.exports = {
    app, PORT
};