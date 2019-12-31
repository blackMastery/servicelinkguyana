import React from 'react'
import styled from 'styled-components'
import { Row, Col, Container } from 'react-bootstrap';
import { Paper } from '../utils'




const Title = styled.div`
font-style: normal;
font-weight: normal;
font-size: 22px;
line-height: 42px;
text-transform: capitalize;
color: #2C1BF1;

`

export default ()=>{


    return (
        <Container>
                <Row>
                    <Col>
                        <h2>Work History</h2>
                    </Col>
                </Row>
            <Paper>
                <Row>
                    <Col>
                        <Title> ecommerce web application and Create a realtime survey
                            
                         / polling like app using node.js and mongodb</Title>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <span>x</span>
                        <span>x</span>
                        <span>x</span>
                        <span>x</span>
                        <span>x</span>
                    </Col>
                    <Col>
                       <div>$200.00</div>
                    </Col>
                    <Col>
                        <div>john doe</div>
                    </Col>
                </Row>
            </Paper>


        </Container>

    )
}