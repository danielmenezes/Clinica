import { baseApiUrl } from '../../main/config'
import axios from 'axios'


const url = `${baseApiUrl}/customers`

const getCustomers = (search) => {
    
    return axios.get(url, {params: {...search}})
        .then(res => {
            return res.data
        })
        .catch(err => {
            alert(err)
        })
       
}

const registerCustomers = (customer) => {

    return axios.post(url, customer)
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
 
    return axios.put(url+`/${id}`, customer)
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
    return axios.delete(url+`/${customer.id}`)
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