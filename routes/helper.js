
/**
 * 
 * @param {Object} app 
 * @param {Object} router 
 * @param {String} version 
 * @return {void}
 */
exports.registerClient = (app, router,version) => {
    for(let key in router){
        app.use(`api/${version}/${key}`,router[key])
    }
};
