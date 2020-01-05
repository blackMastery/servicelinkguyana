import React, { useState } from 'react'
import styled from 'styled-components'
import { Row, Col, Container, Form, FormControl,  } from 'react-bootstrap';

import Link from "next/link";


import { useRouter } from 'next/router'
import { Button, Popover, PopoverHeader, PopoverBody, UncontrolledPopover} from 'reactstrap';
import ListGroup from "react-bootstrap/ListGroup";

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'





const AppBar = styled.div`
  width: 100%;
  background: ${ props => props.theme.colors.primary};
  height: fit-content;
  margin-bottom: 40px;
`
const Brand = styled.h3`
  color: white;
`
const SearchInput = styled.input`
    background: #FFFFFF;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    width: 254px;
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
      <>
        <Avator id="Popover1" className="ml-auto" />
        <UncontrolledPopover
          trigger="legacy"
          placement="bottom"
          // isOpen={popoverOpen}
          target="Popover1"
          // toggle={toggle}
        >

        {/* <Popover
        > */}
          <PopoverHeader>
            {user.firstname} {user.lastname}
          </PopoverHeader>
          <PopoverBody></PopoverBody>
          <Link href="/profile">
            <ListGroup.Item>Profile Veiw </ListGroup.Item>
          </Link>
          <ListGroup.Item onClick={_logout}>Log-out </ListGroup.Item>
        {/* </Popover> */}
        </UncontrolledPopover>
      </>
    );

    searchBar = (<Form inline >
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>)
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













  
