const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        if(req.params.id) user.id = req.params.id

        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            const userFromDB = await app.db('users')
                .where({name: user.name}).first()
            
            if(!user.id) {
                notExistsOrError(userFromDB, 'Já existe um usuário cadastrado com esse nome')
            }
            
        } catch(msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if(user.id) {
            app.db('users').update(user).where({id: user.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users').insert(user)
                .then(_ =>  res.status(204).send())
                .catch(err =>  res.status(500).send(err))
        }

    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'admin')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        const userId = req.params.id

        try {
            existsOrError(userId, 'ID não informado')

            const userDeleted = await app.db('customers').where({id: userId}).del()
            existsOrError(userDeleted, 'Usuário não encontrado')
            res.send('Cliente deletado')
        } catch(msg) {
            res.status(400).send(msg)
        }

    }

    return { save, get, remove }

}