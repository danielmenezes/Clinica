const admin = require('./admin')


module.exports = app => {
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)
    
    app.route('/users')
        //.all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)
        
    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .delete(app.api.user.remove)
    
    app.route('/customers')
        //.all(app.config.passport.authenticate())
        .post(app.api.customer.save)
        .get(app.api.customer.getByNameOrCPF)
        
    app.route('/customers/:id')
        //.all(app.config.passport.authenticate())
        .put(app.api.customer.save)
        .delete(app.api.customer.remove)

}