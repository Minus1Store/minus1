require('dotenv').config()
const sgMail = require('@sendgrid/mail')

const {SENDGRID_API_KEY, SENDGRID_TO_EMAIL} = process.env

sgMail.setApiKey(SENDGRID_API_KEY)



exports.handler = async function(event, context) {
    const data = event.queryStringParameters

    console.log(data.products)
    
    const msgToSeller = {
        to: SENDGRID_TO_EMAIL,
        from: data.email,
        subject: 'Order',
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
                    <td>Address</td>
                    <td>${data.address}</td>
                </tr>
            </table>
            <table>
                <tr>
                   <th>Quantity</th>
                   <th>Product</th>
                   <th>Color</th>
                   <th>Size</th>
                   <th>UID</th> 
                </tr>
                ${products.map(product => {
                    return `<tr>
                        <td>${product.quantity}</td>
                        <td>${product.data.title}</td>
                        <td>${product.data.color_name}</td>
                        <td>${product.size}</td>
                        <td>${product.uid}</td>
                    </tr>`
                })}                
            </table>
            <p>${data.message}</p>
        `
      }
    try{
          await sgMail.send(msgToSeller);
          let successBody = JSON.stringify({
              status:'success',
              message:'Order successfuly placed, wait for email for details!'
          })
          return {
              statusCode:200,
              body:successBody
            }
        }catch(error){
            let errorBody = JSON.stringify({
              status:'error',
              message:'There was some error with our servers. Try later!'
            })          
            return {
            statusCode:500,
            body: errorBody
        }
    }
  }