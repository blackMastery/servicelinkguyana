import React, { useState } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Container, Form, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router'

// import Link from "next/link";
// import styled from 'styled-components'


import { login_user } from '../actions/action'
import {login} from  '../api';
import { Paper, JobButton, PrimaryBtn } from '../components/utils'


const LoginForm = (props) => {
    const { handleSubmit, setShow } = props
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handler = event => {
        const { name, value } = event.target;
        switch (name) {
            case "email":
                return setEmail(value);
            case 'password':
                return setPassword(value)
            default:
                return
           
        }
    };

    const _submit = (e) => {
        e.preventDefault()
         handleSubmit({ email, password })
        // handleSubmit({ email:"kevon3000@yahoo.com",password:"password"})

    } 

    return (
        <Paper>
        <Form onSubmit={_submit}>
            <Form.Group controlId="formBasicEmail" >
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" name="email" onChange={handler} placeholder="Enter email" value={email} />
            </Form.Group>


            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" name="password" onChange={handler} placeholder="Password" value={password} />
            </Form.Group>


            <JobButton variant="primary" type='submit'>
                Continue
            </JobButton>
            <hr />
        </Form>
            <PrimaryBtn onClick={setShow}>
                Create An Account
            </PrimaryBtn>
        </Paper>
    )
}





















 const Login  = (props) => {
     const router = useRouter()
   
    async   function handleSubmit  (data){
        console.log(data)
        let path = '/api/v1/client/login';
       const user =  await login(path, data)
       console.log(user)
       props.userLogin(user)
       router.push('/jobfeeds')
    }
    const { setShow } =  props

    

        return (
            <LoginForm handleSubmit={handleSubmit} setShow={setShow}/>
        )
} 




// const mapStateToProps = ( state ) => ({user})
const mapDispatchToProps = (dispatch ) => ({
    userLogin: bindActionCreators(login_user, dispatch),
})

export default connect(null, mapDispatchToProps)(Login)