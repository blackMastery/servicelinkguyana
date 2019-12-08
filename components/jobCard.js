import React from 'react'
import styled from 'styled-components'
import { Row, Col, Container } from 'react-bootstrap';

/**
 * props:
 * title, description location, proposals, est, spent
 */
const Card = styled.div`
    max-width: 766px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 20px;
    padding: 10px;
    &:hover{
        cursor: pointer;
    }


`;
const Badge = styled.div`
    width: fit-content;
    background: #6AD6EF;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    &:hover {
        background: #0AB606;
        color: white;
    }
`

 export default ({title,description,proposals,est,spent,location, skills})=>(
     <Card>
         <Container fluid={true}>
            <style jsx>{
                `
         .end {
           display: flex;
           justify-content: flex-end;
           }

           .card-title{
               color: #0E82B0;
               font-style: normal;
                font-weight: 500;
                font-size: 24px;
                line-height: 28px;
                text-transform: capitalize;
           }

           .card-title:hover{
               text-decoration: underline;
           }
         
        ` }
            </style>
            <Row>
                <Col md={9}>
                    <h4 className="card-title">{title}</h4>
                </Col>
                <Col md={3}>
                    <span className="end">{est}</span>
                </Col>
            </Row>
            <Row>
                <Col>
                <p>
                        {description}
                </p>
                </Col>
            </Row>

            <Row>

                {skills.map((skill) => <Col xs="auto"> <Badge> {skill} </Badge></Col>) }
            </Row>
           <hr/>
            <Row>
                <Col>
                    <span>Proposals: {proposals}</span>
                </Col>
                <Col>
                        <span>Spent ${spent}+</span>
                </Col>
                <Col>
                    <span>{location}</span>
                </Col>
            </Row>
         </Container>
     </Card>

 );


