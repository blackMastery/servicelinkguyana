import React,{useState} from 'react'
import styled from 'styled-components'
import { Row, Col, Container, Form, Modal } from 'react-bootstrap';
import Layout from '../layout'
import { Paper, AddBtn, SaveBtn, SecondaryBtn, JobButton, PrimaryBtn } from '../components/utils'
import Link from "next/link";
import Login from '../components/login';
import Registration from '../components/Signup/signContainer'
import { userLogin } from "../actions/action";

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





const Index = ( props ) =>{
  const [show, setShow] = useState(false);
  const showModel = () => setShow(true);
  const closeModel = () => setShow(false);
  // console.log(process.env.NODE_ENV);

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
      <hr/>
         <Col md="auto">
            <Login {...props} setShow={setShow}/>
         </Col>
         </Paper>
       </Row>


      <Modal show={show} onHide={closeModel}>
        <Modal.Header closeButton>
          <Modal.Title>Account As </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Registration/>
        </Modal.Body>
      </Modal>
  </Container> 

</Layout>
)
}



const mapStateToProps = state => ({
  loginError: state.user.loginError,
  isLogin: state.user.isLogin
});

const mapDispatchToProps = dispatch => ({
  userLogin: bindActionCreators(userLogin, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);