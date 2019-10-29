// const functions = require('firebase-functions');
// // const admin = require('firebase-admin');
// const uuidv5 = require('uuid/v5');

//   // Listens for new messages added to /messages/:pushId/original and creates an
// // uppercase version of the message to /messages/:pushId/uppercase
// exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
// .onCreate((snapshot, context) => {
//   // Grab the current value of what was written to the Realtime Database.
//   const original = snapshot.val();
//   console.log('Uppercasing', context.params.pushId, original);
//   const uppercase = original.toUpperCase();


// //   const eventId = '1b671a64-40d5-491e-99b0-da01ff1f3341';
// //   uuidv5(original, eventId);

// //   uppercase = uppercase + 'with UUIDV5-' + eventId;

//   // You must return a Promise when performing asynchronous tasks inside a Functions such as
//   // writing to the Firebase Realtime Database.
//   // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
//   return snapshot.ref.parent.child('uppercase').set(uppercase);
// });