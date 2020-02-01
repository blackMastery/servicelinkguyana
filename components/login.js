import React, { useState } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Container, Form, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';

const isServer = typeof window === 'undefined'

import { Formik } from "formik";
import * as Yup from "yup";
import Registration from "./Signup/signContainer";


// import Link from "next/link";
// import styled from 'styled-components'


import { Paper, JobButton, PrimaryBtn } from '../components/utils'


const LoginForm = (props) => {
  
    const { handleSubmit, setShow } = props
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
          <Paper>
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
          </Paper>
        )}
      </Formik>
    );
}





















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
    const showModel = () => setShow(true);
    const closeModel = () => setShow(false);
    console.log(process.env.NODE_ENV);
      

        return (
          <>
            <LoginForm
              errorMessage={props.loginError}
              handleSubmit={handleSubmit}
              setShow={showModel}
            />

            <Modal show={show} onHide={closeModel}>
              <Modal.Header closeButton>
                <Modal.Title>Account As </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Registration />
              </Modal.Body>
            </Modal>
          </>
        );
} 





export default Login;