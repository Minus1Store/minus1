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
  const msgToSeller = {
    to: SENDGRID_TO_EMAIL,
    from: data.email,
    subject: 'Order',
    html: `
            <table style='margin-bottom:15px; border:1px dotted #959595;border-collapse: collapse'>
                <tr>
                    <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>First Name</th>
                    <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${data.firstName}</td>
                </tr>
                <tr>
                    <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>Last Name</th>
                    <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${data.lastName}</td>
                </tr>
                <tr>
                    <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>Email</th>
                    <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${data.email}</td>
                </tr>
                <tr>
                    <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white;'>Address</th>
                    <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${data.address}</td>
                </tr>
            </table>
            <table style='margin-bottom:15px; border:1px dotted #959595;border-collapse: collapse'>
                <tr>
                   <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>Quantity</th>
                   <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>Product</th>
                   <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>Color</th>
                   <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>Size</th>
                   <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>UID</th> 
                </tr>
                ${JSON.parse(data.products).map(product => {
      return `<tr>
                        <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${product.quantity}</td>
                        <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${product.data.title}</td>
                        <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${product.data.color_name}</td>
                        <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${product.size}</td>
                        <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${product.uid}</td>
                    </tr>`;
    })}
                <tr style='width:100%'><th colspan='5' style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>Total</th></tr>                
                <tr style='width:100%'><td colspan='5' style='padding:2.5px; border:1px dotted #959595; text-align:center;'>€${data.price}</td></tr>                
            </table>
            <p>Message: ${data.message}</p>
        `
  };
  const msgToBuyer = {
    to: data.email,
    from: SENDGRID_TO_EMAIL,
    subject: 'Order from Minus1 Shop',
    html: `
            <table style='margin-bottom:15px; border:1px dotted #959595;border-collapse: collapse'>
                <tr>
                    <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>First Name</th>
                    <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${data.firstName}</td>
                </tr>
                <tr>
                    <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>Last Name</th>
                    <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${data.lastName}</td>
                </tr>
                <tr>
                    <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>Email</th>
                    <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${data.email}</td>
                </tr>
                <tr>
                    <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white;'>Shipping Address</th>
                    <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${data.address}</td>
                </tr>
            </table>
            <table style='margin-bottom:15px; border:1px dotted #959595;border-collapse: collapse'>
                <tr>
                   <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>Quantity</th>
                   <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>Product</th>
                   <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>Color</th>
                   <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>Size</th>
                   <th style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>UID</th> 
                </tr>
                ${JSON.parse(data.products).map(product => {
      return `<tr>
                        <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${product.quantity}</td>
                        <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${product.data.title}</td>
                        <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${product.data.color_name}</td>
                        <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${product.size}</td>
                        <td style='padding:2.5px; border:1px dotted #959595; text-align:center;'>${product.uid}</td>
                    </tr>`;
    })}
                <tr style='width:100%'><th colspan='5' style='padding:2.5px; border:1px dotted #959595; text-align:center;background: #626262; color: white'>Total</th></tr>                
                <tr style='width:100%'><td colspan='5' style='padding:2.5px; border:1px dotted #959595; text-align:center;'>€${data.price}</td></tr>                
            </table>
            <p>Please respond to this email if you have any questions regarding your order, thanks!</p>
        `
  };

  try {
    await sgMail.send(msgToSeller);
    await sgMail.send(msgToBuyer);
    let successBody = JSON.stringify({
      status: 'success',
      message: 'Order successfuly placed, wait for email for details!'
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