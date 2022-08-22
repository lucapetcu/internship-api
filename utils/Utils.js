const Location = require('../models/coordinatesModel');

const interval = setInterval(() => {
    // const now = new Date();
    // const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    // Location.deleteMany({sendAt: {$gte: oneWeekAgo}})
    //     .then(console.log('Data deleted weekly'))
    //     .catch(err => console.log(err));
    console.log('Interval');
}, 2000);

module.exports = interval;