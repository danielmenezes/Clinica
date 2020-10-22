import  api from '../../services/api'

const getCustomers = (search) => {
    
    return api.get('customers', {params: {...search}})
        .then(res => {
            return res.data
        })
        .catch(err => {
            alert(err)
        })
       
}

const registerCustomers = (customer) => {

    return api.post('customers', customer)
        .then(res => {
            return res
        })
        .catch(err => {
            if(err && err.response && err.response.data) {
                return {error: err.response.data}
            }
        })
}

const updateCustomers = (customer, id) => {
 
    return api.put(`customers/${id}`, customer)
        .then(res => {
            return res
        })
        .catch(err => {
            if(err && err.response && err.response.data) {
                 return {error: err.response.data}
            }
        })
}

const deleteCustomers = (customer) => {
    return api.delete(`customers/${customer.id}`)
        .then(res => {
            return res
        })
        .catch(err => {
            if(err && err.response && err.response.data) {
                return {error: err.response.data}
           }
        })
}

export { getCustomers, registerCustomers, updateCustomers, deleteCustomers }