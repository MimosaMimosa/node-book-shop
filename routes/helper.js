const client = require('./client/routelist')
const admin = require('./admin/routelist')
/**
 * 
 * @param {Object} app 
 * @param {Object} router 
 * @param {String} version 
 * @return {void}
 */
exports.registerClient = (app => {
    for(let key in client){
        app.use(`/api/v1/${key}`,client[key])
    }
});

/**
 * 
 * @param {Object} app 
 * @param {Object} router 
 * @param {String} version 
 * @return {void}
 */
 exports.registerAdmin = (app) => {
    for(let key in admin){
        app.use(`/api/v1/admin/${key}`,admin[key])
    }
};

