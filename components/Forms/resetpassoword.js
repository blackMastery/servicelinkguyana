import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Container, Form, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';

const isServer = typeof window === 'undefined'
import { Paper, JobButton, PrimaryBtn } from "../utils";

import { Formik } from "formik";
import * as Yup from "yup";
import { password_reset } from '../../actions/action' 






const ResetForm = (props) => {
  
    useEffect(() => {
      const allCookies = document.cookie;
      console.log("cookies!!!1", { allCookies });
    });

    const handler =  (passwords) => {
         try {
           props.resetPassword(passwords);

         }catch(error){
           console.log(error)
         }
    }

    return (
      <Formik
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
            handler(values);
          
        }}
        validationSchema={Yup.object({
          password: Yup.string().required("Required"),
          confirmPassword: Yup.string().required("Required")
        })}
        initialValues={{
          password: "",
          email: ""
        }}
      >
        {formik => (
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  {...formik.getFieldProps("password")}
                  isValid={formik.errors.password}
                />
              </Form.Group>
              <span>{formik.errors.password}</span>

              <Form.Group controlId="formBasicPassword">
                <Form.Label> Confirm Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  isValid={!formik.errors.confirmPassword}
                  {...formik.getFieldProps("confirmPassword")}
                />

                <Form.Text className="text-muted">
                  {props.errorMessage}
                </Form.Text>
              </Form.Group>

              <JobButton variant="primary" type="submit">
                Submit
              </JobButton>
              <hr />
            </Form>
        )}
      </Formik>
    );

}


const mapDispatchToProps = (dispatch) => ({
    resetPassword: bindActionCreators(password_reset,dispatch)
})


export default connect(null,mapDispatchToProps)(ResetForm)