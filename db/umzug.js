const db = require('./database');
const { app } = require('electron');
const path = require('path');

console.log(app.getAppPath());
console.log(path.resolve('db', 'migrations'));

const Umzug = require('umzug');
const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize: db.sequelize
    },
    migrations: {
        params: [
            db.sequelize.getQueryInterface(),
            db.Sequelize
        ],
        path: path.resolve('db', 'migrations'),
        pattern: /\.js$/
    }
});

module.exports = umzug;
