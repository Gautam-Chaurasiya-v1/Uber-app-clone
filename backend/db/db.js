const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(`${process.env.DB_CONNECT}/uberBackend`)
        .then((val) => {
            console.log("DB Connected : ", val.Model);
        })
        .catch((err) => {
            console.log(`Error in DB connection : ${err}`);
        })
}

module.exports = connectToDB;