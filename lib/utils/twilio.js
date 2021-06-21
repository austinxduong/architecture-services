import dotenv from 'dotenv';
dotenv.config();
//require('dotenv').config();

import twilio from 'twilio';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
  process.env.TWILIO_ORDER_HANDLER_NUMBER
);
export const sendSms = (to, message) => {
  return twilioClient.messages.create({
    body: message,
    from: process.env.TWILIO_NUMBER,
    to
  });
};
