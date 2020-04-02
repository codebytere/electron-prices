const csv = require('papaparse');

let url;
const stocks = {
  oil: 'CL.F',
  gold: 'GC.F',
  silver: 'SI.F',
};

for (let symbol in stocks) {
  url = `https://stooq.com/q/l/?s=${stocks[symbol]}&f=sd2t2ohlc&h&e=csv`;

  csv.parse(url, {
    download: true,
    delimiter: ',',
    complete: (results) => {
      const prices = results.data[1];
      const previousPrice = parseFloat(prices[3], 10);
      const currentPrice = parseFloat(prices[6], 10);
      let change = Math.round((currentPrice - previousPrice) * 100) / 100;

      if (change >= 0) {
        change = `+${change}`;
      }

      const priceElement = document.getElementById(`${symbol}-price`);
      priceElement.innerText = currentPrice.toLocaleString();

      const changeElement = document.getElementById(`${symbol}-change`);
      changeElement.innerText = change;
    },
  });
}
