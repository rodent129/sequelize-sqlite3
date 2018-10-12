

class DbManager {

    private ipcMain: any;

    constructor() {
        this.ipcMain = require('electron').ipcMain;

        this.ipcMain.on('call-log:get-all', (event, arg) => {
            console.log('get all call log: ' + arg);
        });
    }

    public connectDatabase(dbname: string, storagePath: string) {
        const Sequelize = require('sequelize');
        const sequelize = new Sequelize(dbname, 'Lisa', null, {
            dialect: 'sqlite',
            storage: storagePath,
            operatorsAliases: false
        });
        console.log('sequelize initialize');
        sequelize.authenticate().then(() => {
            console.log('Connection has been established.');
        })
            .catch((err) => {
                console.log('Unable to connect to the database', err);
            });

        // const User = sequelize.define('user', {
        //     firstName: {
        //         type: Sequelize.STRING
        //     },
        //     lastName: {
        //         type: Sequelize.STRING
        //     },
        //     gender: {
        //         type: Sequelize.STRING
        //     },
        //     birthday: {
        //         type: Sequelize.DATE
        //     }
        // });
        //
        // User.sync().then(() => {
        //   // Table created.
        //   // Add the model data.
        //   return User.create({firstName: 'melisaa', lastName: 'tan'});
        // });

        // This is the raw query.
        // sequelize.query('SELECT * FROM users', {model: User}).then(users => {
        //     users.forEach(user => {
        //        console.log(user.firstName + ' ' + user.lastName + ', gender:' + user.gender);
        //     });
        // });

        // Define calls tablename
        const Call = sequelize.define('call', {
            number: { type: Sequelize.STRING, allowNull: false },
            call_type: { type: Sequelize.STRING },
            date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
            duration: { type: Sequelize.INTEGER },
            new: { type: Sequelize.STRING },
            video: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
            cached_name: { type: Sequelize.STRING },
            cached_photo_uri: { type: Sequelize.STRING },
            source_type: { type: Sequelize.STRING },
            source_unique_key: { type: Sequelize.STRING }
        });

        Call.sync();

        // Call.create({number: '123456', call_type: 'outgoing', new: 'new'}).then(call => {
        //     console.log('id: ' + call.id);
        // });

        // Build non-persistent instance and then call save to store the data.
        // const call = Call.build({ number: '23456', call_type: 'incoming', new: 'new'} );
        // console.log('before: id:' + call.id);
        //
        // call.save().then(() => {
        //     console.log('id:' + call.id);
        // });

        // find all
        // Call.findAll().then(calls => {
        //    calls.forEach(call => {
        //        console.log('id:' + call.id + ', number:' + call.number);
        //    });
        // });

        // find all with where clause
        // Call.findAll({ where: {
        //     number: '23456'
        //     }}).then(calls => {
        //     calls.forEach(call => {
        //         console.log('id:' + call.id + ', number:' + call.number);
        //     });
        // });
        //
        const Op = Sequelize.Op;
        // find all which matching the number like '123456' and data is not equal null.
        // Call.findAll({ where: {
        //         number: { [Op.like]: '123456'},
        //         date: {
        //             [Op.ne]: null
        //         }
        //     }}).then(calls => {
        //     calls.forEach(call => {
        //         console.log('id:' + call.id + ', number:' + call.number);
        //     });
        // });

        // select number, call_type from calls where number='123456'
        // Call.findAll(
        //     {
        //         where: {number: '123456'},
        //         attributes: ['number', 'call_type']
        //     }
        // ).then(calls => {
        //     calls.forEach(call => {
        //         console.log('number:' + call.number + ', ' + call.call_type + ', ' + call.date);
        //     });
        // });

        // find one
        // // select * from calls where number='123456' limit 1
        // Call.findOne({ where: {number: '123456'}}).then(call => {
        //    console.log('call:' + call.number + ', ' + call.call_type);
        // });

        // find by primary key id
        // Call.findById(5).then(call => {
        //     console.log('call: ' + call.id + ', ' + call.number + ', ' + call.call_type);
        // });

        // Call.findAll({ order: [['date', 'DESC']]}).then(calls => {
        //     calls.forEach(call => {
        //         console.log('call: ' + call.id + ', ' + call.number + ', ' + call.call_type);
        //     });
        // });

        // Pagination. Skip 3 instances/rows and fetch 1 instance.
        // Call.findAll({ offset: 3, limit: 1}).then(calls => {
        //     calls.forEach(call => {
        //         console.log('call: ' + call.id + ', ' + call.number + ', ' + call.call_type);
        //     });
        // });

        // Call.findAll({order: [['date', 'DESC']], offset: 3, limit: 3}).then(calls => {
        //     calls.forEach(call => {
        //         console.log('call: ' + call.id + ', ' + call.number + ', ' + call.call_type);
        //     });
        // });

        // Call.update({new: 'old'}, {where: {id: 1}}).then(data => {
        //     console.log(data);
        // });

        // Call.update({new: 'old'}, {where: {id: 2}}).spread((affectedCount, affectedRows) => {
        //     console.log(affectedCount + ', ' + affectedRows);
        // });

        // Call.update({new: 'old', call_type: 'outgoing'}, {fields: ['new'], where: {id: 3}}).spread((affectedCount, affectedRows) => {
        //     console.log(affectedCount + ', ' + affectedRows);
        // });

        // Call.update({new: 'old', call_type: 'incoming'}, {fields: ['new', 'call_type'], where: {id: 3}})
        //                      .spread((affectedCount, affectedRows) => {
        //     console.log(affectedCount + ', ' + affectedRows);
        // });

        // Call.findById(3).then(call => {
        //     console.log('call: ' + call.id + ', ' + call.number + ', ' + call.call_type);
        //     // call.update({number: '45678', call_type: 'outgoing'} , { fields: ['call_type'] }).then(() => {
        //     //     console.log('call updated:' + call.call_type);
        //     //     })
        //     //     .catch(error => {
        //     //         console.log('error:' + error);
        //     //     });
        //
        //     call.call_type = 'outgoing';
        //     call.save({ fields: ['call_type'] }).then(() => {
        //         console.log('call updated:' + call.call_type);
        //     })
        //         .catch(error => {
        //             console.log('error:' + error);
        //         });
        // });


        // Call.findById(2).then(call => {
        //     console.log('call: ' + call.id + ', ' + call.number + ', ' + call.call_type);
        //     return call.destroy();
        // }).then(() => {
        //     console.log('I am gone');
        // }).catch(error => {
        //     console.log('error: ' + error);
        // });

    }


}

// module.exports = DbManager;
export default DbManager;

