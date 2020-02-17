import React from 'react'
import styled, { css } from "styled-components";
import Layout from '../../layout';
import { Row, Col, Container, Form } from 'react-bootstrap';


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


import Proposal from '../../components/Proposal/proposal'




class ProposalPage extends React.Component {

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
                    <Info>Experience level</Info>

                    <Topic>{job.hourlyRate}</Topic>
                    <Info>Hourly</Info>

                    <Topic> {job.duration} </Topic>
                    <Info>Project Length</Info>

                    <Topic> ${job.cost} </Topic>
                    <Info>Budget</Info>
                  </Col>
                </Row>
              </Paper>

              <hr />

              <Proposal jobId={job._id} />


            </Container>
          </Layout>
        );
    }
}



ProposalPage.getInitialProps = async function (context) {
    const { id } = context.query;
    const res = await apiCaller(`/api/v1/client/job/${id}`
    );
    const { job } = res;


    return {job};
};





export default ProposalPage