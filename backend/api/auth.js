const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const singin = async (req, res) => {
        if(!req.body.name || !req.body.password) {
            return res.status(400).send('Informe usuário e senha!')
        }

        const user = await app.db('users')
            .where({name: req.body.name})
            .first()
        
        if(!user) return res.status(401).send('Usuário/senha inválidos!')
        
        const isMatch = bcrypt.compareSync(req.body.password, user.password)

        if(!isMatch) return res.status(401).send('Usuário/Senha inválidos!')
    }
}