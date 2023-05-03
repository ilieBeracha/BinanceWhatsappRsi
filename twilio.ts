import * as dotenv from "dotenv";
dotenv.config();

const client = require("twilio")(process.env.TWILIO_ACCOUNTSID, process.env.TWILIO_AUTHTOKEN);

export function sendMessage(message:any) {
  client.messages
    .create({
      body: message,
      from: "+12183967913",
      to: "+972544868495"
    })
}

