import React, { useState, useContext } from 'react'
import Router from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Cookies from 'js-cookie' //set cookie in browser storage
import { AuthContext } from '../appState/AuthProvider'

const LOG_IN = gql`
    mutation LOG_IN($email: String!, $password: String!){
    login(email: $email, password: $password) {
        user{
            id
            name
            email
            products {
            id
            }
            carts {
            id
            product {
                description
                price
                imageUrl
            }
            quantity
            }
        }
        jwt
     }
}
`

const Signin = () => {
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })
    const { setAuthUser } = useContext(AuthContext)
    //mutation not execute immediately while component rendering or loading (loading and error still undefined).
    //but only return value for using later (loading and error defined when executed).
    const [login, { loading, error }] = useMutation(LOG_IN, { 
        variables: {...userInfo},
        onCompleted: data => {
            if(data) {
                setAuthUser(data.login.user)
                Cookies.set('jwt', data.login.jwt)
                setUserInfo({
                    email: '',
                    password: ''   
                })
                Router.push('/products')
            }
        } //activity that you do after completed
    }) //[mutate function name, object that return (status of state)]



    const handleChange = event => {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value
        })
        
    }

    const handleSubmit = async event => {
        try {
            event.preventDefault()
            await login()
        } catch (error) {
            console.log(error);
            
        }
    }
    
    return (
        <div style={{
            margin: '100px'
        }}>
            <form style={{
                display: 'flex',
                flexDirection: 'column',
                margin: 'auto',
                width: '30%'
            }} onSubmit={handleSubmit}>
                <input style={{ margin: '5px', height: '30px'}} onChange={handleChange} value={userInfo.email} type="email" name="email" placeholder="E-mail"/>
                <input style={{ margin: '5px', height: '30px'}} onChange={handleChange} value={userInfo.password} type="password" name="password" placeholder="Password"/>
                <button type="submit" style={{
                    margin: '5px', 
                    padding: '10px', 
                    background: 'teal', 
                    color: 'white', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontSize: '18px'}}
                disabled={loading}>Submit</button>
            </form>
            <div style={{ width: '30%', margin: 'auto'}}>
                {error && <p style={{ color: 'red' }}>{error.graphQLErrors[0].message}</p>}
            </div>
        </div>
    )
}

export default Signin;
