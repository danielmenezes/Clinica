import React, { useCallback } from 'react'
import { useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";

import './CustomerRegistration.css'
import testCpf from './utils/testCpf';


export default (props) => {
    const { register, handleSubmit, errors, reset, setValue } = useForm();
    const currentUser = props.currentUser
    const buttonRef = useRef(null)

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
        setValue("name", currentUser.name)
        setValue("cpf", currentUser.cpf)
        setValue("mother", currentUser.mother)
        setValue("age", currentUser.age)
        setValue("phone", currentUser.phone)
        setValue("sex", currentUser.sex)
        setValue("address", currentUser.address)

        //buttonRef.current.innerHTML = "Salvar"
    }, [currentUser, setValue])

    const onSubmit = (data) => {
        console.log(data)

        reset()
    }

    return (
            <div className="customer-form">
                <form onSubmit={handleSubmit(onSubmit)}>
     
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
                                <input type="text" name="address.street" ref={register} 
                                        placeholder="Rua - Bairro"/>
                                <input type="number" name="address.number" ref={register} 
                                        placeholder="Nº"/>
                            </div>
                            <div className="form-city-uf">
                                <input type="text" name="address.city" ref={register} 
                                    placeholder="Cidade"/>
                                <input type="text" name="address.uf" ref={register} 
                                    placeholder="UF"/>
                            </div>
                        </div>
                    
                 
                    <button type="submit" ref={buttonRef} > Cadastrar </button>
                </form>
            </div>
    )
}



