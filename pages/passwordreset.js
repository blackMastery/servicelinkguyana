import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col, Container, Form, Modal } from "react-bootstrap";
import Layout from "../layout";
import ResetForm from "../components/Forms/resetpassoword";
import { Paper, JobButton, PrimaryBtn } from "../components/utils";





class PasswordReset extends React.Component {



    render(){
        return (
          <Layout>
            <Container>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <h1>Password Reset</h1>
                  <Paper>
                    <ResetForm />
                  </Paper>
                </Col>
              </Row>
            </Container>
          </Layout>
        );
    }
}


export default PasswordReset;