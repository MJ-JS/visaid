const fs = require('fs');
const { join } = require('path');
const { getUserInfo } = require('../services/utils/visa-api/visa');

const fileName = '../mock-db/requests.json';

const submitResponse = function (req, res) {
  fs.readFile(join(__dirname, fileName), 'utf-8', (err, requestsDB) => {
    requestsDB = JSON.parse(requestsDB);
    const session = requestsDB[req.body.safetyCode];
    if (!session) res.status(500).send('no active sessions found with that code');
    Object.keys(session.permissions).forEach(name => {
      session.permissions[name] = req.body.permissions[name];
    });
    session.status = 'INPROGRESS';
    fs.writeFile(join(__dirname, fileName), JSON.stringify(requestsDB, null, 2), (err) => {
      if (err) res.status(500).send(err);
      getUserInfo()
        .then(user => {
          /* asdfasdfd */
          res.send('Verifiasdf isdf  fucked');
        })
        .catch(err => console.log(err));
    });
  });
};


module.exports = { 
  submitResponse
};

/*
submitResponse request Body Schema
    {
        safetyCode: string,
        permissions: string[]    
    }


DB Schema
'efkhwr3tn43tkfewkjfnskjfn36': {  //internal visa user id
    'safetyCode': string,
    'expirationTime': number,
    'status': string,
    'location': number,
    'permissions': {
        'permissionName': boolean
    }
  }


  Sample post COMMAND
    curl -H 'Content-Type: application/json' -X POST -d '{'safetyCode': '171031', 'permissions': {'Address': false,'Picture': true,'Employment Status': true,'Occupation': true}}' localhost:3000/v1/submit

  */