import React from 'react'
import styled from 'styled-components'
import { Row, Col, Container } from 'react-bootstrap';

const AppBar = styled.div`
  width: 100%;
  background: ${ props => props.theme.colors.primary};
  height: 60px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
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
`

const Avator = styled.div`
    width: 40px;
    background-size: contain;
    background-image: url(http://www.w3schools.com/howto/img_avatar2.png);
    height: 40px;
    border-radius: 50%;
    border: 1px solid #ccc;

`;






export default () =>(
  <AppBar>
    <Container fluid={true}>
      <Row>
        <Col md="auto">
          <Brand>
              Sevice Link Guyana
          </Brand>
        </Col>
        
        <Col md="auto">
          <SearchInput/>
        </Col>

        <Col>
          <div className="end">
          <Avator />
          </div>

        </Col>

      <style jsx>{
         `
         .end {
           display: flex;
           justify-content: flex-end;
           }
         
        ` }
      </style>
      </Row>
    </Container>


  </AppBar>
	)
