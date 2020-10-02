
module.exports = app => {
    
    app.route('/customers')
        .post(app.api.customer.save)
        .get(app.api.customer.getByNameOrCPF)
        
    app.route('/customers/:id')
        .put(app.api.customer.save)
        .delete(app.api.customer.remove)

    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)
        
    app.route('/users/:id')
        .put(app.api.user.save)
        .delete(app.api.user.remove)
}