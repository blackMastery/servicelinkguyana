import React,{useState} from 'react'
import styled from 'styled-components'
import { Row, Col, Container, Form, Modal } from 'react-bootstrap';
import Layout from '../layout'
import { Paper, AddBtn, SaveBtn, SecondaryBtn, JobButton, PrimaryBtn } from '../components/utils'
import Link from "next/link";
import Login from '../components/login';
import { userLogin } from "../actions/action";
import { firebaseCloudMessaging} from '../lib/webPush'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`



const LinkText = styled(Link)`

  color: white;
  
  &:hover {
    text-decoration: none;
  }
`





class Index extends React.Component {
  componentDidMount() {
    // firebaseCloudMessaging.init();
  }

  render() {
    // firebaseCloudMessaging.init()
 

    return (
      <Layout>
        <Container>
       <Row className="justify-content-md-center">
            <Paper>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <h2>Sign-in</h2>
                </Col>
              </Row>
              <hr />
              <Col md="auto">
                <Login {...this.props} />
              </Col>
            </Paper>
          </Row>

         
        </Container>
      </Layout>
    );
  }
}


const mapStateToProps = state => ({
  loginError: state.user.loginError,
  isLogin: state.user.isLogin
});

const mapDispatchToProps = dispatch => ({
  userLogin: bindActionCreators(userLogin, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);