require('dotenv').config()
const sgMail = require('@sendgrid/mail')

const {SENDGRID_API_KEY, SENDGRID_TO_EMAIL} = process.env

sgMail.setApiKey(SENDGRID_API_KEY)


exports.handler = async function(event, context) {
    const data = event.queryStringParameters

    const msg = {
        to: SENDGRID_TO_EMAIL,
        from: data.email,
        subject: data.reasonOfContact,
        html:`
            <table>
                <tr>
                    <td>First Name</td>
                    <td>${data.firstName}</td>
                </tr>
                <tr>
                    <td>First Name</td>
                    <td>${data.lastName}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>${data.email}</td>
                </tr>
                <tr>
                    <td>Order Number</td>
                    <td>${data.orderNumber}</td>
                </tr>
            </table>                
            <p>${data.message}</p>
        `
      }
    try{
          await sgMail.send(msg);
          let successBody = JSON.stringify({
              status:'success',
              message:'Your message has been sent!'
          })
          return {
              statusCode:200,
              body:successBody
            }
        }catch(error){
            let errorBody = JSON.stringify({
              status:'error',
              message:"There was some error with our servers. Try later!"
            })          
            return {
            statusCode:500,
            body: errorBody
        }
    }
  }