import React from 'react'
import styled, { css } from "styled-components";
import Layout from '../../layout';
import { Row, Col, Container, Form } from 'react-bootstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useRouter } from "next/router";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { apiCaller } from "../../api";

import { Panel } from '../../components/utils'


import {
    Paper,
    JobBadge,
    Topic,
    Info,
    Description,
    JobButton
} from "../../components/utils";


class Proposal extends React.Component {

    constructor(props){
        super(props)

        
    }
    render (){
        const { job } = this.props;


        return (
          <Layout>
            <Container>
              <Paper>
                <Row>
                  <Col>
                    <h2>Job Details</h2>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col md={8}>
                    <h2>{job.title}</h2>
                    <Description>{job.description}</Description>

                    <hr />
                    <Topic>Skills and expertise</Topic>
                    <Row>
                      {job.skills.map(skill => (
                        <Col xs="auto">
                          <JobBadge>{skill}</JobBadge>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                  <Col md={4}>
                    <Topic>{job.experienceLevel}</Topic>
                    <Info>experience level</Info>

                    <Topic>{job.hourlyRate}</Topic>
                    <Info>Hourly</Info>

                    <Topic> {job.duration} </Topic>
                    <Info>Project Length</Info>
                  </Col>
                </Row>
              </Paper>

              <hr />
              <Panel title="Project Terms">
                <Container>
                  <Row>
                    <style jsx>{`
                      .rateState {
                        font-style: normal;
                        font-weight: normal;
                        font-size: 24px;
                        line-height: 28px;
                        text-transform: capitalize;
                        color: #000000;
                        margin-top: 34px;
                        margin-bottom: 12px;
                      }

                      .myrate {
                        font-weight: normal;
                        font-size: 12px;
                        line-height: 28px;
                        text-transform: capitalize;
                        color: #000000;
                      }
                    `}</style>
                    <Col>
                      <h3 className="rateState">
                        What is the rate you'd like to bid for this job?
                      </h3>
                      <p className="myrate">
                        Your profile rate: $25.00/ per day
                      </p>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <p>Total amount the client will see on your proposal</p>
                    </Col>
                    <Col md={3}>
                      <Form>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            placeholder="$"
                            name="company"
                          />
                        </Form.Group>
                      </Form>
                    </Col>
                    <Col md={3}></Col>
                  </Row>

                  <hr />
                  <Row>
                    <Col md={6}>
                      <p>Service Link Guyana fee</p>
                    </Col>
                    <Col md={3}>
                      <strong>$00</strong>
                    </Col>
                    <Col md={3}></Col>
                  </Row>
                  <hr />

                  <Row>
                    <Col md={6}>
                      <strong>You'll Receive</strong>

                      <p>
                        The estimated amount you'll receive after service fees
                      </p>
                    </Col>
                    <Col md={3}>
                      <Form>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            placeholder="$"
                            name="company"
                          />
                        </Form.Group>
                      </Form>
                    </Col>
                    <Col md={3}></Col>
                  </Row>
                </Container>
              </Panel>
              <hr />
              <Panel title="Additional details">
                <Container>
                  <Row>
                    <Col>
                      <Form className="form" style={{  marginTop: "20px" }}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Label style={{ marginBottom: "1.2rem" }}>
                            {" "}
                            <Topic> Cover letter </Topic>
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows="3"
                            name="description"
                          />
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>
                      <JobButton> Submit Proposal </JobButton>
                    </Col>
                  </Row>
                  <hr />
                </Container>
              </Panel>
            </Container>
          </Layout>
        );
    }
}



Proposal.getInitialProps = async function (context) {
    const { id } = context.query;
    const res = await apiCaller(`/api/v1/client/job/${id}`
    );
    const { data } = res;

    // console.log(`Fetched show: ${job.title}`);

    return { job: data.data };
};

// const mapStateToProps = (state) => ({
//     jobs: state.jobs
// })




export default Proposal