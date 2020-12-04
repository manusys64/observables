global.config = require('./config.json') 
const { timer } = require('rxjs');
const { switchMap } = require('rxjs/operators');
const fetch = require('node-fetch')
const mysqlx = require('@mysql/xdevapi');
const startInSeconds = 5000     // wait 5 seconds before starting
const schedule = 1000 * 60 * 2  // poll binance every 2mins

const client = mysqlx.getClient(config.connection);




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
          client.getSession()
            .then(session => {
              const table = session.getSchema(config.schema).getTable(config.table)
              table.insert('bnb')
                .values(parseFloat(response.price))
                .execute()
            });

      })
}

callAndStore()