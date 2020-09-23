import React, { useState, useCallback} from 'react'
import { useForm } from "react-hook-form";

import './CustomerSearch.css'

let backendList = []



export default (props) => {
    const { register, handleSubmit, reset } = useForm();
    const [customerList, setCustomerList] = useState([])
    const setCurrentUser = props.currentUser
    const [editMode, setEditMode] = props.editMode


    const editCustomer = useCallback((customer) =>{
        setEditMode(true)
        setCurrentUser(customer)
        setCustomerList([])
    }, [setCurrentUser, setEditMode])

    const deleteCustomer = useCallback((customer) => {
        console.log('Delete')
    }, [])

    const randleList = useCallback((customerList) => {
        return  (
            customerList ? customerList.map( customer => 
                <li key={customer.id}>
                    <div className="list-item-values">
                        <div> {customer.name} </div> 
                        <div> {customer.cpf} </div>
                        <div> {customer.age} </div>
                    </div>
                    <div className="list-buttons">
                        <button onClick={() => editCustomer(customer)} className="edit fa fa-edit" type="button"></button>
                        <button onClick={() => deleteCustomer(customer)} className="delete fa fa-trash" type="button"></button>
                    </div>
                </li>
            ) : ""
        )
    }, [deleteCustomer, editCustomer])
    
    
    const onSubmit = data => {
        console.log(data)
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
                <input type="radio" id="name" defaultChecked name="type-search" value="name"
                    ref={register({ required: true })}/> 
                <label> Nome </label>
                <input type="radio" id="cpf" name="type-search" value="cpf"
                    ref={register({ required: true })}/>
                <label> CPF </label>
            </div>
            <div className="customer-search"> 
                <input type="text" name="input-search" 
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