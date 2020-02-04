import React, { useState } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Container, Form, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';

const isServer = typeof window === 'undefined'

import { Formik } from "formik";
import * as Yup from "yup";
import Registration from "./Signup/signContainer";
import { forgot_password } from '../actions/action'


// import Link from "next/link";
// import styled from 'styled-components'


import { Paper, JobButton, PrimaryBtn } from '../components/utils'


const LoginForm = (props) => {
  
    const { handleSubmit, setShow, showForgot } = props;
     console.log(props.errorMessage)
    
    return (
      <Formik
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          handleSubmit(values);
        }}
        validationSchema={Yup.object({
          password: Yup.string().required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required")
        })}
        initialValues={{
          password: "",
          email: ""
        }}
      >
        {formik => (
          <>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  {...formik.getFieldProps("email")}
                  isValid={formik.errors.email}
                />
              </Form.Group>
              <span>{formik.errors.password}</span>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="password"
                  placeholder="Password"
                  isValid={!formik.errors.password}
                  {...formik.getFieldProps("password")}
                />

                <Form.Text className="text-muted">
                  {props.errorMessage}
                </Form.Text>
              </Form.Group>

              <JobButton variant="primary" type="submit">
                Continue
              </JobButton>
              <hr />
            </Form>
            <PrimaryBtn onClick={setShow}>Create An Account</PrimaryBtn>
            <hr />
            <PrimaryBtn onClick={showForgot}>Forgot Password</PrimaryBtn>
          </>
        )}
      </Formik>
    );
}



const dispatchForgotRequest = (dispatch) =>({
  forgotRequest: bindActionCreators(forgot_password, dispatch)
})

const mapStateToProps =(state)=>({
  message: state.user.resetMessage
})


const ForgetForm = connect(
  mapStateToProps,
  dispatchForgotRequest
)(props => {
  console.log(props)
  return (
    <Formik
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        props.forgotRequest(values);
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Required")
      })}
      initialValues={{
        email: ""
      }}
    >
      {formik => (
        <>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                placeholder="Enter email"
                {...formik.getFieldProps("email")}
                isValid={formik.errors.email}
              />
            </Form.Group>
              <p>{props.message}</p>
            <JobButton variant="primary" type="submit">
              Continue
            </JobButton>
            <hr />
          </Form>
        </>
      )}
    </Formik>
  );
});













 const Login  = (props) => {
   let router;
   if (!isServer) {
      router = useRouter()
     if (props.isLogin) {
       router.push("/jobfeeds");

     }
   }

    async function handleSubmit  (data){
      await props.userLogin(data);
      router.push("/jobfeeds");

        
    }
    
    // const { setShow } =  props
    const [show, setShow] = useState(false);
    const [openForget, setForget] = useState(false);
    const showModel = () => setShow(true);
    const closeModel = () => setShow(false);
    console.log(process.env.NODE_ENV);


    const showForgot = ()=> setForget(true);
    const closeForget = ()=> setForget(false);



      

        return (
          <>
            <LoginForm
              errorMessage={props.loginError}
              handleSubmit={handleSubmit}
              setShow={showModel}
              showForgot={showForgot}
            />

            <Modal show={show} onHide={closeModel}>
              <Modal.Header closeButton>
                <Modal.Title>Account As </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Registration />
              </Modal.Body>
            </Modal>

            <Modal show={openForget} onHide={closeForget}>
              <Modal.Header closeButton>
                <Modal.Title>Enter your email </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ForgetForm />
              </Modal.Body>
            </Modal>
          </>
        );
} 





export default Login;