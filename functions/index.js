// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp()

const uuidv5 = require('uuid/v5');

// const addMessage = require('./addMessage');
// const makeUppercase = require('./makeUppercase');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// addMessage();
// makeUppercase();

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    const snapshot = await admin.database().ref('/messages').push({original: original});
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref.toString());
  });




  // Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
.onCreate((snapshot, context) => {
  // Grab the current value of what was written to the Realtime Database.
  const original = snapshot.val();
  console.log('Uppercasing', context.params.pushId, original);
  const uppercase = original.toUpperCase();


  const eventId = '1b671a64-40d5-491e-99b0-da01ff1f3341';
  const id = uuidv5(original, eventId);

  const uppercaseWithID = uppercase.concat(', UUIDV5: ', id);

  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to the Firebase Realtime Database.
  // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
  return snapshot.ref.parent.child('uppercase').set(uppercaseWithID);
});


exports.createNewUser = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.,  
    const { firstname, lastname, birthday, age, hobby } = req.query;
    const newUser = {
      firstname, lastname, birthday, age, hobby
    };
 
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    const snapshot = await admin.database().ref('/users').push({user: newUser});
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    // res.redirect(303, snapshot.ref.toString());
    // app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      // next();
    // });

    res.status(200).json({ newUser, snapshot });
  });
  


  exports.addUUIDToUser = functions.database.ref('/users/{pushId}/user')
.onCreate((snapshot, context) => {
  // Grab the current value of what was written to the Realtime Database.
  const user = snapshot.val();
  console.log('Adding UUID to', context.params.pushId, user);


  const uuidString = '1b671a64-40d5-491e-99b0-da01ff1f3341';
  const userTag = user.firstname.concat('-', user.lastname);
  const id = uuidv5(userTag, uuidString);

  user.userId = id;

  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to the Firebase Realtime Database.
  // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
  return snapshot.ref.parent.child('userWithID').set(user);
});