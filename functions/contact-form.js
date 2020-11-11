"use strict";

require('dotenv').config();

const sgMail = require('@sendgrid/mail');

const {
  SENDGRID_API_KEY,
  SENDGRID_TO_EMAIL
} = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

exports.handler = async function (event, context) {
  const data = event.queryStringParameters;
  const msg = {
    to: SENDGRID_TO_EMAIL,
    from: data.email,
    subject: data.reasonOfContact,
    html: `
            <table style='margin-bottom:15px; border:1px dotted #959595;border-collapse: collapse'>
                <tr>
                    <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>First Name</th>
                    <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${data.firstName}</td>
                </tr>
                <tr>
                    <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>First Name</th>
                    <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${data.lastName}</td>
                </tr>
                <tr>
                    <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>Email</th>
                    <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${data.email}</td>
                </tr>
                <tr>
                    <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>Order Number</th>
                    <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${data.orderNumber}</td>
                </tr>
            </table>                
            <p>Message: ${data.message}</p>
        `
  };

  try {
    await sgMail.send(msg);
    let successBody = JSON.stringify({
      status: 'success',
      message: 'Your message has been sent!'
    });
    return {
      statusCode: 200,
      body: successBody
    };
  } catch (error) {
    let errorBody = JSON.stringify({
      status: 'error',
      message: 'There was some error with our servers. Try later!'
    });
    return {
      statusCode: 500,
      body: errorBody
    };
  }
};