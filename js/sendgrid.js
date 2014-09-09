
$(document).on('ready', function() {

    $(document).on('click', function() {

        
/*
 * SendGrid Node.JS Example
 * This file shows how to send email through SendGrid using
 * the SendGrid Node.JS library.  For more information on the
 * SendGrid Node.JS Library, visit:
 *
 *      https://github.com/sendgrid/sendgrid-nodejs
 */

/* SENDGRID CREDENTIALS
 * Enter in your SendGrid username and 
 * password below.
 *===========================================*/
var sg_username = "brianloughnane";
var sg_password = "sgpw1232";


/* MAIL INFORMATION
 * Fill in the relevant information below
 *===========================================*/
// YOUR SENDING ADDRESS
var from_address = "brian@brianloughnane.com";

// YOUR TO ADDRESS(ES)
var to_address = "brian@brianloughnane.com";

// SUBJECT
var subject = "You've received a message from your website";

// TEXT BODY
var text_body = "Hello,\n\nThis is a test message from SendGrid.    We have sent this to you because you requested a test message be sent from your account.\n\nThis is a link to google.com: http://www.google.com\nThis is a link to apple.com: http://www.apple.com\nThis is a link to sendgrid.com: http://www.sendgrid.com\n\nThank you for reading this test message.\n\nLove,\nYour friends at SendGrid";

// HTML BODY
var html_body = "<table style=\"border: solid 1px #000; background-color: #666; font-family: verdana, tahoma, sans-serif; color: #fff;\"> <tr> <td> <h2>Hello,</h2> <p>This is a test message from SendGrid.    We have sent this to you because you requested a test message be sent from your account.</p> <a href=\"http://www.google.com\" target=\"_blank\">This is a link to google.com</a> <p> <a href=\"http://www.apple.com\" target=\"_blank\">This is a link to apple.com</a> <p> <a href=\"http://www.sendgrid.com\" target=\"_blank\">This is a link to sendgrid.com</a> </p> <p>Thank you for reading this test message.</p> Love,<br/> Your friends at SendGrid</p> <p> <img src=\"http://cdn1.sendgrid.com/images/sendgrid-logo.png\" alt=\"SendGrid!\" /> </td> </tr> </table>";


/* CREATE THE MAIL OBJECT
 *===========================================*/
// This will send your email via SendGrid's Web API.  If you
// wish to send it via SMTP, use the following line instead:
// var sendgrid  = require("sendgrid")(sg_username, sg_password, {api: 'smtp'});
var sendgrid = require("sendgrid")(sg_username, sg_password);


/* SEND THE MAIL
 *===========================================*/
try {
    sendgrid.send({
        to:         to_address,
        from:       from_address,
        subject:    subject,
        text:       text_body,
        html:       html_body
    }, function(err, json) {
        if (err) return console.error(err);
        console.log(json);
    });
} catch(e) {
    console.log(e);
}













    });

});
