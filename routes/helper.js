const client = require('./client/routelist')
const admin = require('./admin/routelist')
/**
 * 
 * @param {Object} app 
 */
exports.registerClient = (app => {
    for(let key in client){
        app.use(`/api/v1/${key}`,client[key])
    }
});

/**
 * 
 * @param {Object} app 
 */
 exports.registerAdmin = (app) => {
    for(let key in admin){
        app.use(`/api/v1/admin/${key}`,admin[key])
    }
};

