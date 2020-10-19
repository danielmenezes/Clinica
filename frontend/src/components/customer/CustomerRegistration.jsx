import React, { useCallback } from 'react'
import { useEffect, useRef, useContext } from 'react';
import { useForm } from "react-hook-form";
import { useToasts } from 'react-toast-notifications'


import './CustomerRegistration.css'
import testCpf from './utils/testCpf';
import { registerCustomers, updateCustomers } from './api'
import {appContext} from '../../main/contexts/Context'


export default (props) => {
    const { register, handleSubmit, errors, reset, setValue } = useForm();
    const {currentCustomer, setCurrentCustomer} = useContext(appContext)
    const {editMode, setEditMode} = useContext(appContext)
    
    const buttonSubmitRef = useRef(null)
    const formRef = useRef(null)
    const { addToast } = useToasts()

    const maskCpf = useCallback(e => {
        e.currentTarget.maxLength = 11
        let value = e.currentTarget.value
        value = value.replace(/\D/g, "")
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
        e.currentTarget.value = value
    }, [])

    const maskAge = useCallback(e => {
        e.currentTarget.maxLength = 8
        let value = e.currentTarget.value
        value = value.replace(/\D/g, "")
        value = value.replace(/^(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")
        e.currentTarget.value = value
    }, [])


    useEffect(() => {

        if(editMode) { 
            setValue("name", currentCustomer.name)
            setValue("cpf", currentCustomer.cpf)
            setValue("mother", currentCustomer.mother)
            setValue("age", currentCustomer.age)
            setValue("phone", currentCustomer.phone)
            setValue("sex", currentCustomer.sex)            
            setValue("street", currentCustomer.street)
            setValue("number", currentCustomer.number)
            setValue("city", currentCustomer.city)
            setValue("uf", currentCustomer.uf)

            buttonSubmitRef.current.innerHTML = "Salvar"
        } else {
            buttonSubmitRef.current.innerHTML = "Cadastrar"
        }


    }, [currentCustomer, setValue, editMode, setEditMode])

    const onClear = useCallback(() => {
        reset()
    }, [reset])

    const onCancelSubmit = useCallback(() => {
        buttonSubmitRef.current.innerHTML = "Cadastrar"
        setEditMode(false)
        setCurrentCustomer({})
        reset()
    }, [setEditMode, reset, setCurrentCustomer])

    const onSubmit = async (data) => {
        let res = null

        if(editMode) {
            res = await updateCustomers(data, currentCustomer.id)
        } else {
            res = await registerCustomers(data)
        }

        if(res.error) {
            addToast(res.error, {
                appearance: 'error',
                autoDismiss: true,
            })
        }

        if(res && res.status === 204) {
            addToast(editMode ? 'Cliente alterado com sucesso!' : 'Cliente cadastrado com sucesso!', {
                appearance: 'success',
                autoDismiss: true,
            })
            setCurrentCustomer({})
            setEditMode(false)
            reset()
        }
    }

    return (
            <div className="customer-form">
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
     
                        <label htmlFor="name"> Nome </label>
                        <input type="text" name="name" 
                            ref={register({
                                required: true,
                                minLength: 2
                            })}/>
                        <p>{errors.name && 'Digite o nome'}</p>

                        <label htmlFor="cpf"> CPF </label>
                        <input type="text" name="cpf" onChange={maskCpf}
                            ref={register({ 
                                required: false,
                                validate: value => testCpf(value),
                            })} />
                        <p>{errors.cpf && 'Digite um CPF Válido'}</p>
                        
   
                        <label htmlFor="mother"> Nome da mãe </label>
                        <input type="text" name="mother" 
                            ref={register({ 
                                required: true,
                            })} />
                        <p>{errors.mother && 'Digite o nome da mãe'}</p>

                        <label htmlFor="age"> Data de nascimento </label>
                        <input type="text" name="age" onChange={maskAge}
                            ref={register({ 
                                required: true,
                                minLength: 8
                            })} />
                        <p>{errors.age && 'Digite a data de nascimento'}</p>
                        
                        <label htmlFor="phone"> Telefone </label>
                        <input type="text" name="phone"
                            ref={register({
                                required: false,
                                minLength: 8
                            })} />
                        <p>{errors.phone && 'Digite um número de telefone'}</p>
                        
                        <div className="radio-sex">
                            <label> Sexo </label>
                            <div className="radio-items">
                                <label> Masculino </label>
                                <input type="radio" id="male" name="sex"  value="Masculino"
                                    ref={register({
                                        required: true
                                    })}/>
                                <label> Feminino </label>
                                <input type="radio" id="female" name="sex" value="Feminino"
                                    ref={register({
                                        required: true
                                    })}/>
                            </div>
                        </div>
                        <p>{errors.sex && 'Selecione o sexo'}</p>
                        
                        <label> Endereço </label>
                        <div className="form-address">
                            <div className="form-street-number">
                                <input type="text" name="street" ref={register} 
                                        placeholder="Rua - Bairro"/>
                                <input type="text" name="number" ref={register} 
                                        placeholder="Nº"/>
                            </div>
                            <div className="form-city-uf">
                                <input type="text" name="city" ref={register} 
                                    placeholder="Cidade"/>
                                <input type="text" name="uf" ref={register} 
                                    placeholder="UF"/>
                            </div>
                        </div>
                    
                 
                    <button type="submit" ref={buttonSubmitRef} > Cadastrar </button>
                    {editMode || <button onClick={() => onClear()} type="button"> Limpar Campos </button>}
                    {!editMode || <button onClick={() => onCancelSubmit()} type="button"> Cancelar </button>}
                </form>
            </div>
    )
}



