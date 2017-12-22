'use strict';

const https = require('https');

module.exports = (robot) => {
  robot.hear(/bit.(.*)/i, (msg) => {
    var data = [];
    const cmd = msg.match[1];
    const req = https.request('https://api.fcce.jp/api/1/ticker/btc_jpy', (res) => {
      res.on('data', (chunk) => {
        data.push(chunk);
      }).on('end', () => {
        data = Buffer.concat(data).toString();
        const decoded = decodeURIComponent(data);
        data = JSON.parse(decoded);
        if (cmd === 'now') {
          msg.send(`現在のBITCOINの取引額は、${data.bid}円です。`);
        } else if (cmd === 'high') {
          msg.send(`過去24時間のBITCOINの最高値は、${data.high}円です。`);
        } else if (cmd === 'low') {
          msg.send(`過去24時間のBITCOINの最安値は、${data.low}円です。`);
        } else {
          msg.send('???');
        }
      });
    });
    req.end();
  });

  robot.hear(/mona.(.*)/i, (msg) => {
    var data = [];
    const cmd = msg.match[1];
    const req = https.request('https://api.fcce.jp/api/1/ticker/mona_jpy', (res) => {
      res.on('data', (chunk) => {
        data.push(chunk);
      }).on('end', () => {
        data = Buffer.concat(data).toString();
        const decoded = decodeURIComponent(data);
        data = JSON.parse(decoded);
        if (cmd === 'now') {
          msg.send(`現在のMONACOINの取引額は、${data.bid}円です。`);
        } else if (cmd === 'high') {
          msg.send(`過去24時間のMONACOINの最高値は、${data.high}円です。`);
        } else if (cmd === 'low') {
          msg.send(`過去24時間のMONACOINの最安値は、${data.low}円です。`);
        } else {
          msg.send('???');
        }
      });
    });
    req.end();
  });
}