
module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const customer = { ...req.body }
        if(req.params.id) customer.id = req.params.id

        try {
            existsOrError(customer.name, 'Nome não informado')
            existsOrError(customer.cpf, 'CPF não informado')
            existsOrError(customer.mother, 'Nome da mãe não informado')
            existsOrError(customer.age, 'Data de nascimento não informada')
            existsOrError(customer.sex, 'Sexo não informado')

            const customerFromDB = await app.db('customers')
                .where({cpf: customer.cpf}).first()
            
            if(!customer.id) {
                notExistsOrError(customerFromDB, 'Usuário já cadastrado com esse CPF')
            }
            
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(customer.id) {
            app.db('customers').update(customer).where({id: customer.id})
                .then(_ => res.status(204).send())
                .catch(err = res.status(500).send(err))
        } else {
            app.db('customers').insert(customer)
                .then(_ => res.status(204).send())
                .catch(err = res.status(500).send(err))
        }
        
    }

    const getByNameOrCPF = async (req, res) => {
        const { inputSearch, typeSearch } = {...req.body}

        try {
            existsOrError(inputSearch, 'Digite sua pesquisa')
            existsOrError(typeSearch, 'Selecione o tipo da pesquisa')
        } catch(msg) {
            return res.send(400).send(msg)
        }


        try {
            if(typeSearch === 'name') {
                const customers = await app.db('customers').where('name', 'ilike', `%${inputSearch}%`)
                res.json(customers)    
            } else if(typeSearch === "cpf") {
                const customers = await app.db('customers').where({ cpf: inputSearch })
                res.json(customers)    
            }
        } catch {
            res.send(500)
        }
    }

    const remove = async (req, res) => {
        const customerId = req.params.id

        try {
            existsOrError(customerId, 'ID não informado')

            const customerDeleted = await app.db('customers').where({id: customerId}).del()
            existsOrError(customerDeleted, 'Usuário não encontrado')
            res.send('Cliente deletado')
        } catch(msg) {
            res.status(400).send(msg)
        }

    }

    return { save, getByNameOrCPF, remove }
}