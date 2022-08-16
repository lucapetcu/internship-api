const admin = require('firebase-admin');

const serviceAccount = require("../locationapp-ee402-firebase-adminsdk-xkww7-d733b9c2e0.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;