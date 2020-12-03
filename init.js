global.config = require('./config.json') 
const { timer } = require('rxjs');
const { switchMap } = require('rxjs/operators');
const fetch = require('node-fetch')
const mysql = require('mysql');
const { config } = require('process');
const startInSeconds = 5000     // wait 5 seconds before starting
const schedule = 1000 * 60 * 2  // poll binance every 2mins

// var connection = mysql.createConnection(config);

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });


function callAndStore() {
  let t = timer(startInSeconds, schedule)
      .pipe(
          switchMap(async() => {
            return fetch('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT', {
                        method: 'get',
                        headers: { 'Content-Type': 'application/json' },
                        })
                        .then(res => res.json())
                    })
      )

  t.subscribe((response) => {
          console.log(response)
          // connection.query(`INSERT INTO data (value) VALUES(${response})`)
      })
}

callAndStore()