
const path = require('path');
const Sequelize = require('sequelize');
const { app } = require('electron');

const userDataPath = app.getPath('userData');
console.log('userDataPath:' + userDataPath);
const storagePath = path.join(userDataPath, 'evox.sqlite');
console.log('storagePath:' + storagePath);

const db = {
    sequelize: new Sequelize('evox', null, null, {
        dialect: 'sqlite',
        storage: storagePath,
        operatorsAliases: false
    }),
    Sequelize: Sequelize
};

module.exports = db;
