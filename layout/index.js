import React from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap';
import NavBar from '../components/navbar'


export default ({children}) =>(
	<Container fluid={true}>
	<NavBar/>
	{children}
	</Container>
	)
