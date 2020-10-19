import React, { useState, useCallback, useContext } from 'react'
import { useForm } from "react-hook-form";
import { useToasts } from 'react-toast-notifications'

import './CustomerSearch.css'
import { getCustomers, deleteCustomers } from './api'
import {appContext} from '../../main/contexts/Context'

let backendList = []


export default (props) => {
    const { register, handleSubmit, reset } = useForm();
    const [customerList, setCustomerList] = useState([])
    const {setCurrentCustomer} = useContext(appContext)
    const {editMode, setEditMode} = useContext(appContext)
    const { addToast } = useToasts()


    const editCustomer = useCallback((customer) =>{
        setEditMode(true)
        setCurrentCustomer(customer)
        setCustomerList([])
    }, [setCurrentCustomer, setEditMode])

    const deleteCustomer = useCallback(async (customer, indice) => {
               
        const res = await deleteCustomers(customer)

        if(res.error) {
            addToast(res.error, {
                appearance: 'error',
                autoDismiss: true,
            })
        
        } else {
            backendList.splice(indice,1)
            setCustomerList(backendList)
            addToast('Cliente deletado com sucesso!', {
                appearance: 'success',
                autoDismiss: true,
            })
        }
    }, [addToast])

    const randleList = (customerList) => {
        return  (
            customerList ? customerList.map( (customer, indice) => 
                <li key={indice}>
                    <div className="list-item-values">
                        <div> {customer.name} </div> 
                        <div> {customer.cpf} </div>
                        <div> {customer.age} </div>
                    </div>
                    <div className="list-buttons">
                        <button onClick={() => editCustomer(customer)} className="edit fa fa-edit" type="button"></button>
                        <button onClick={() => deleteCustomer(customer, indice)} className="delete fa fa-trash" type="button"></button>
                    </div>
                </li>
            ) : ""
        )
    }

    
    const onSubmit = async (data) => {
        backendList = await getCustomers(data)
        
        reset()
        if(!editMode) {
            setCustomerList(backendList)
        } else {
            alert("Você está editando um cliente")
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}  className="customer-search-container">
            <div className="type-search">
                <label htmlFor="type-search"> Pesquisar por: </label>
                <input type="radio" id="name" defaultChecked name="typeSearch" value="name"
                    ref={register({ required: true })}/> 
                <label> Nome </label>
                <input type="radio" id="cpf" name="typeSearch" value="cpf"
                    ref={register({ required: true })}/>
                <label> CPF </label>
            </div>
            <div className="customer-search"> 
                <input type="text" name="inputSearch" 
                    placeholder="Digite sua pesquisa..." 
                    ref={register({ required: true })} />
                <button type="submit"> Pesquisar </button>
            </div>
            <div className="customer-list">
                <ul>
                    {randleList(customerList)}
                </ul>
            </div>
        </form>
    )
}