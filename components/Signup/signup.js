import React, {useState} from 'react'
import styled from 'styled-components'
import { Row, Col, Container, Form, Modal } from 'react-bootstrap';
import { Paper, AddBtn, SaveBtn, SecondaryBtn, JobButton } from '../../components/utils';



const PrimaryBtn = styled(JobButton)`
background-color: ${ props => props.theme.colors.primary};
color: white;
`



export default class Registration extends React.Component {

constructor(props){
    super(props)
    this.state = {
        firstname: '',
        lastname: '',
        password: '',
        errorMessage: "",
        confirmPassword: '',
        email: '',
        provider: false,
        client: false,
        isInvalid: false,
        selectAccount: ''	

    }

    this.change = this.change.bind(this);
    this.handler = this.handler.bind(this);
    this.account = this.account.bind(this)
    this._confirmPassword;
    this._password;
    this.checkPassword = this.checkPassword.bind(this)


}

account(e){

    // const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(e.target.checked, e.target.name)
    if(e.target.name === 'client'){
        this.setState({
            provider: false,
            client: true
        })
    }
    else if (e.target.name === 'provider') {
        this.setState({
            provider: true,
            client: false
        })
    }
        
}




    checkPassword(){
        if (this._password.value !== this._confirmPassword.value) {
            this.setState({
                isInvalid: true,
                errorMessage: 'password does not match'
            })
        } else {
            this.setState({
                isInvalid: false,
                errorMessage: ''

            })
        }
        return

    }
change(e){
    const {name,value} = e.target;
    console.log(value)
    this.setState({
        [name]: value
    })
  return
}

async handler(e){
    e.preventDefault()
    const {email,firstname, lastname,password,confirmPassword, client, provider} = this.state;

    if (firstname.length === 0 && lastname.length === 0
        & email.length === 0) { return }

    let role;
    if(client){
        role = 'client';
        this.setState({
            selectAccount: ''
        })
    }
    else if(provider){
        role ='provide';
        this.setState({
            selectAccount: ''
        })
    }
    else {
        this.setState({
            selectAccount: 'Must select an account type'
        })
        return
    }

    const userData = { email, firstname, lastname, 
        password, passwordConfirm:confirmPassword, role} 
    this.props.postAndRedirect(userData)





}

render () {

    const { email, firstname, lastname, password, errorMessage, 
        confirmPassword, client, selectAccount, provider, isInvalid} = this.state;
  

    return (
            <Form onSubmit={this.handler}>
                <Container>
                <Row>
                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                            value={email}
                            onChange={this.change}
                            required
                            name="email"

                            type="email"
                             placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                        </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>FirstName</Form.Label>
                            <Form.Control type="text" 
                            value={firstname}
                            onChange={this.change}
                            required
                            name="firstname"
                            placeholder="firstname" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control type="text" 
                            value={lastname}
                            onChange={this.change}
                            required
                            name="lastname" 
                            placeholder="lastname" />
                        </Form.Group>
                    </Col>
                </Row>


                <Row>
                    <Col md={6} >
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" 
                            value={password}
                            onChange={this.change}
                            ref={input => this._password = input}
                            required
                                isInvalid={isInvalid}
                            name="password" placeholder="Password" />
                        </Form.Group>

                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label> Confirm Password</Form.Label>
                            <Form.Control type="password"
                            value={confirmPassword}
                            ref={input => this._confirmPassword = input}
                            onChange={this.change}
                            required
                                isInvalid={isInvalid}
                            name="confirmPassword" 
                            placeholder="confirm password"
                            onBlur={this.checkPassword}
                            />
                            <Form.Text className="text-muted">
                             {errorMessage}
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                <hr/>

                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="radio"  name="provider" label="As Service Provider" onChange={this.account} checked={provider} />
                    <Form.Check type="radio" label="As Client ( Hire Service Provider )" name="client" onChange={this.account} checked={client} />
                    <Form.Text className="text-muted">
                    {selectAccount}
                    </Form.Text>
                </Form.Group>

                
                <JobButton variant="primary" type='submit'>
                    Submit
                </JobButton>
              
                </Container>
            </Form>
    )
}
}