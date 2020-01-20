import React from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap';
import NavBar from '../components/Navbar/NavContainer'


const Footer = styled.footer`
background: #2E576D;
width: 100%;
height: 337px;
margin-top: 30px;

`


export default ({children}) =>(
		
	<Container className="bgcolor" fluid={true} style={{ backgroundColor: '#F2F2F2',padding:0}} >
	<NavBar/>
	{children}

	<Footer/>
	</Container>
	)
