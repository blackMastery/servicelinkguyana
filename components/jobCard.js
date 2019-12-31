import React from 'react'
import styled from 'styled-components'
import { Row, Col, Container } from 'react-bootstrap';
import Link from "next/link";
import _ from 'lodash'

/**
 * props:
 * title, description location, proposals, est, spent
 */
const Card = styled.div`
    max-width: 766px;
    background: #FFFFFF;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.10);
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
const OverLay = styled.div`
  height: 1035px;
  width: 30px;
  -webkit-transition: width 2s;
  transition: width 2s;
  position: absolute;
  background: red;
  left: 816px;
  bottom: -36px;
  z-index: 2;
`;


 export default class JobCard extends React.Component {
          constructor(props){
                    super(props)
                    this.handleClick = this.handleClick.bind(this)
                 }
            
                  handleClick({type}) {
                      if(type !== 'click') return

                    console.log("click...");
                    if (typeof window !== "undefined") {
                        console.log('broswer code')
                      let overlay = document.querySelector(".overlay");
                    //   console.log(overlay)
                      overlay.style.width = '1020px';
                      overlay.style.left = '-68px'

                    }
                  }

                  render() {
                    const {
                      title,
                      description,
                      est,
                      skills,
                      proposals,
                      spent,
                      location,
                      cost,
                      _id,
                      hourlyRate,
                      paymentStyle,
                      duration,
                      experienceLevel
                    } = this.props;

                    const desc = _.truncate(description, {
                      'length':200,
                      'separator': ' '
                    })

                    return (
                      <Link href='/job/[id]' as={`/job/${_id}`}>
                        <Card>
                        <Container fluid={true}>
                          <style jsx>
                            {`
                              .end {
                                display: flex;
                                justify-content: flex-end;
                              }

                              .card-title {
                                color: #0e82b0;
                                font-style: normal;
                                font-weight: 500;
                                font-size: 24px;
                                line-height: 28px;
                                text-transform: capitalize;
                              }

                              .card-title:hover {
                                text-decoration: underline;
                              }
                            `}
                          </style>
                          <Row>
                            <Col md={9}>
                              <h4 className="card-title">{title}</h4>
                            </Col>
                            <Col md={3}>
                              <span className="end time">{est}</span>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                                <strong>{paymentStyle} </strong> - {experienceLevel} ($$)  - Budget: ${cost}  - {duration} -  Est {hourlyRate}
                            </Col>
                          </Row>
                          <hr/>
                          <Row>
                            <Col>
                                <p>{desc} </p> <span><strong>Read more</strong></span>
                            </Col>
                          </Row>

                          <Row>
                            {skills.map((skill, idx) => (
                              <Col xs="auto" key={idx}>
                                {" "}
                                <Badge> {skill} </Badge>
                              </Col>
                            ))}
                          </Row>
                          <hr />
                          <Row>
                            <Col xs="auto">
                              <span>Proposals: {proposals}</span>
                            </Col>
                            <Col xs="auto">
                              <span>
                                spent: <strong>${spent}+</strong>
                              </span>
                            </Col>
                            <Col xs="auto">
                              <span>{location}</span>
                            </Col>
                          </Row>
                        </Container>
                      </Card>
                      </Link>                      

                    );
                  }
                }
 
