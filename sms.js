

const accountSid = 'AC45947ef15c21f42dc1ff760ed9cc0adb'; // Your Account SID from www.twilio.com/console
const authToken = 'e3311fa2747070e52069cbb18b2efd97';   // Your Auth Token from www.twilio.com/console

const client = require('twilio')(accountSid, authToken, {
  lazyLoading: true
});

client.messages.create({
  to: '+17788778963',
  from: '+16042659587',
  body: 'Hello NATTTTTTTTAAAAAASSSSSSHHHHAAAA'
})
.then((message) => console.log(message))
.catch((err)=> console.log(err))