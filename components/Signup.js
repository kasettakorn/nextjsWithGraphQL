import React, {useState} from 'react'
import Link from 'next/link'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const SIGN_UP = gql`
    mutation SIGN_UP($name: String!, $email: String!, $password: String!){
    signup(name: $name, email: $email, password: $password) {
        id
        name
        email
    }
}
`

const Signup = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [success, setSuccess] = useState(false)
    //mutation not execute immediately while component rendering or loading (loading and error still undefined).
    //but only return value for using later (loading and error defined when executed).
    const [signup, { loading, error }] = useMutation(SIGN_UP, { 
        variables: {...userInfo},
        onCompleted: data => {
            if(data) {
                setSuccess(true)
                setUserInfo({
                    name: '',
                    email: '',
                    password: ''   
                })
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
            await signup()
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
                <input style={{ margin: '5px', height: '30px'}} onChange={handleChange} value={userInfo.name} type="text" name="name" placeholder="Username"/>
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
                {success && <p>You successfully signed up, please <Link href="/signin"><a>sign in</a></Link>.</p>}
                {error && <p style={{ color: 'red' }}>{error.graphQLErrors[0].message}</p>}
            </div>
        </div>
    )
}

export default Signup;
