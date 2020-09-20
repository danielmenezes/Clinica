import React, { useState } from 'react'
import { useForm } from "react-hook-form";

import './CustomerSearch.css'

let backendList = [{
    id: 1, 
    name: "Daniel de Menezes Silva",
    cpf: "041.066.383-20", 
    age: "07/11/1989",
    sex: "Masculino",
    address: {
        street: "Rua Agostinho Carlos Santiago",
        number: "1130",
        city: "Russas",
        uf: "Ceará"
    }
},
{
    id: 2, 
    name: "Maiane Cordeiro de Lima Menezes",
    cpf: "018.789.683-60", 
    age: "25/03/1992"
}]



export default (props) => {
    const { register, handleSubmit, reset } = useForm();
    const [customerList, setCustomerList] = useState()
    const setCurretUser = props.currentUser

    const randleList = (customerList) => {
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
                        <button onClick={() => deleteCustomer()} className="delete fa fa-trash" type="button"></button>
                    </div>
                </li>
            ) : <li> Nenhum cliente encontrado </li>
        )
    }
    
    function editCustomer(customer) {
        setCurretUser(customer)
    }
    
    function deleteCustomer(customer) {
        console.log('Delete')
    }
    
    const onSubmit = data => {
        console.log(data)
        setCustomerList(backendList)
        reset()
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