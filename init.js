global.config = require('./config.json') 
const { timer } = require('rxjs');
const { switchMap } = require('rxjs/operators');
const fetch = require('node-fetch')
const mysql = require('mysql');
const { config } = require('process');
const startInSeconds = 1000
const schedule = 1000 * 60 * .25

// var connection = mysql.createConnection(config);

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });


function callAndStore() {
  const body = { a: 1 };
  let t = timer(startInSeconds, schedule)
      .pipe(
          switchMap(async() => {
            return fetch('https://httpbin.org/post', {
                        method: 'post',
                        body:    JSON.stringify(body),
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