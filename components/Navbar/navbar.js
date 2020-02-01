import React, { useState } from 'react'
import styled from 'styled-components'
import { Row, Col, Container, Form, FormControl,  } from 'react-bootstrap';

import Link from "next/link";
import { useFormik } from 'formik';
import * as Yup from 'yup';


import { useRouter } from 'next/router'
import { Button, Popover, PopoverHeader, PopoverBody, UncontrolledPopover} from 'reactstrap';
import ListGroup from "react-bootstrap/ListGroup";

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NotifyBtn } from '../utils'

import { withSearch } from '../Search/jobsearch'


const AppBar = styled.div`
  width: 100%;
  background: ${ props => props.theme.colors.primary};
  height: fit-content;
  margin-bottom: 40px;
`
const Brand = styled.h3`
  color: white;

  
  @media(min-width: 360px) {
   font-size: 20px;
  }
`
const SearchInput = styled.input`
    background: #FFFFFF;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    height: 40px;
    padding: 12px 20px;
    border: 1px solid #ccc;

    
`

const Avator = styled.div`
    width: 40px;
    background-size: contain;
    background-image: url(http://interglobalforest.com/assets/images/male-avatar.png);
    height: 40px;
    border-radius: 50%;
    border: 1px solid #ccc;

`;


const PopItem = styled.div`
font-style: normal;
font-weight: normal;
font-size: 15px;
line-height: 28px;
text-transform: capitalize;
color: #000000;
`;



const QuickSearch = withSearch((props) => {
  const router = useRouter()



   const formik = useFormik({
    initialValues: {
        search: '',
    },
    validationSchema: Yup.object({
        search: Yup.string()
      }),
    onSubmit: values => {
    //   console.log(values)
      props.search_req(values.search,_)
      router.push('/jobfeeds')
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row>
       <Col sm={10}> 
          <Form.Control 
          type="text" 
          placeholder="Search" 
          className="mr-sm-2" 
          {...formik.getFieldProps('search')}
          />
       </Col>

        <Col sm={2}>
          <Button  type="submit" variant="outline-success">Search</Button>
       </Col>
      </Row>
    </Form>
  )
})


const NavBar =  (props) => {

  const { user, isLogin, Logout } = props;
  const [popoverOpen, setPopoverOpen] = useState(false);
  const router = useRouter();

  const toggle = () => setPopoverOpen(!popoverOpen);


  const _logout = () => {
      Logout()
      router.push('/')
  }
  let register;
  let avator;
  let searchBar;
  if(!isLogin){
    register = (
      <Nav className="ml-auto" >
        <Nav.Link href="/signup" className="text-white">Sign-Up</Nav.Link>
        <Nav.Link href="/" className="text-white">Sign-In</Nav.Link>
      </Nav>
    )




  }else{
    avator = (
      < >
        <div className="ml-auto d-flex flex-row">
         <Nav.Link  id="findwork" href="/jobfeeds" className="text-white">Find Work</Nav.Link>
         
         <Nav.Link id="myjobs"  href="#" className="text-white" >My Jobs</Nav.Link>
         
         <div className="p-2 mr-3">
            <NotifyBtn fill="white"/>
         </div>
         <Avator id="Popover1"  className="p-2"/>
        </div>



        <UncontrolledPopover
          trigger="legacy"
          placement="bottom"
          // isOpen={popoverOpen}
          target="myjobs"
          // toggle={toggle}
        >

     
       
          <Link href="/job/archived" >
            <ListGroup.Item> My Jobs </ListGroup.Item>
          </Link>
          <Link href="/contacts/all">
            <ListGroup.Item> My Contacts </ListGroup.Item>
          </Link>

          <Link href="/proposal/archived">
            <ListGroup.Item> Proposals </ListGroup.Item>
          </Link>
        </UncontrolledPopover>



        <UncontrolledPopover
          trigger="legacy"
          placement="bottom"
          // isOpen={popoverOpen}
          target="Popover1"
          // toggle={toggle}
        >

          <PopoverHeader>
            <PopItem>
              {user.firstname} {user.lastname}
            </PopItem>
          </PopoverHeader>

          <PopoverBody>
            <Nav.Link href="/profile">
                <PopItem > Profile View </PopItem>
            </Nav.Link>
            <Nav.Link>
                <PopItem onClick={_logout}>Log-out </PopItem>
            </Nav.Link>

          </PopoverBody>     

        </UncontrolledPopover>
      </>
    );

    searchBar = (<QuickSearch/>)
  }



  return (
    <AppBar>


      <Navbar bg="transparent" expand="lg">

        <Navbar.Brand href="/jobfeeds">
          <Brand>
            Service Link Guyana
                    </Brand>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
         {searchBar}
          
          
           


          {avator}

        </Navbar.Collapse>
      </Navbar>

   
    </AppBar>
  )

}

export default NavBar;













  
