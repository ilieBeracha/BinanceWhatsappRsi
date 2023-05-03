import Binance from "binance-api-node";
import { RSI } from "technicalindicators";
import cron from "node-cron";
import { sendMessage } from "./twilio";

const client = Binance();
const symbol = "BTCUSDT";
const interval = "15m";
const limit = 100;

let canSend = true;

async function getRsiByPair() {
  const period = 14;
  const candles = await client.candles({
    symbol: symbol,
    interval: interval,
    limit: limit,
  });
  const closes = candles.map((candle) => parseFloat(candle.close));
  const inputRSI = {
    values: closes,
    period: period,
  };
  const rsi = new RSI(inputRSI);
  const rsiValues = rsi.getResult();

  if (
    rsiValues[rsiValues.length - 1] < 20 ||
    (rsiValues[rsiValues.length - 1] > 80 && canSend)
  ) {
    sendMessage(
      "RSI is " +
        rsiValues[rsiValues.length - 1] +
        " on " +
        symbol +
        " in " +
        interval +
        " interval"
    );

    canSend = false;
    setTimeout(() => {
      canSend = true;
    }, 10 * 60 * 1000);
  }

  console.log(rsiValues[rsiValues.length - 1]);
  return rsiValues;
}


export function runEachMin() {
  cron.schedule("* * * * *", () => {
    getRsiByPair();
  });
}
