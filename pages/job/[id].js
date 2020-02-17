import React from 'react'
import styled, { css } from "styled-components";
import { Button } from 'react-bootstrap';
import Layout from '../../layout';
import { Row, Col, Container } from 'react-bootstrap';
import OwnerView from '../../components/ownerview';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useRouter } from "next/router";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { apiCaller } from "../../api";
import { MoneySign } from '../../icons/money'

import {
  Paper,
  JobBadge,
  Topic,
  Info,
  Description,
  JobButton
} from "../../components/utils";



class JobDetails extends React.Component {


  constructor(props){
    super(props)
  }
render() {

  
  const { job } = this.props;
  // const router = useRouter()
  // const job = jobs.find((p) => {
  //   return p.id == router.query.id
  // })

  console.log(job)
  
  return (
    <Layout>
      <Container>
        <Paper>
          <Row>
            <Col md={8}>
              <h2>{job.title}</h2>
              <Description>{job.description}</Description>

              <hr />

              <Row>
                <Col>
                  <Info>Availability</Info>
                  <Topic>{job.hourlyRate}</Topic>
                </Col>
                <Col>
                  <Info>Project Length</Info>
                  <Topic>{job.duration}</Topic>
                </Col>
                <Col>
                  <Info>Experience Level </Info>

                  <div> <MoneySign/> {job.experienceLevel} Level</div>
                </Col>
                <Col>
                  <Info>{job.paymentStyle}</Info>
                  <Topic>
                    {" "}
                    <strong>$</strong>
                    {job.cost}
                  </Topic>
                </Col>
              </Row>

              <hr />
              <Topic>Skills and expertise</Topic>

              <Row>
                {job.skills.map(skill => (
                  <Col xs="auto">
                    <JobBadge>{skill}</JobBadge>
                  </Col>
                ))}
              </Row>

              <hr />
              <Row>
                <Col>
                  <Topic className="pb-3">
                    <strong>Activity on this job</strong>
                  </Topic>
                  <Info>
                    {" "}
                    <strong>Proposals: </strong> {job.proposals}
                  </Info>
                  <Info>
                    <strong> Interviewing: </strong> {job.interviewing}{" "}
                  </Info>
                  <Info>
                    <strong> Invites sent: </strong> {job.invitesSent}{" "}
                  </Info>
                  <Info>
                    <strong> Unanswered invites: </strong> {job.interviewing}{" "}
                  </Info>
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <Link href="/proposal/[id]" as={`/proposal/${job._id}`}>
                <JobButton> Submit Proposal </JobButton>
              </Link>
              <OwnerView {...job.client} />
            </Col>
          </Row>
        </Paper>
      </Container>
    </Layout>
  );
}

}





JobDetails.getInitialProps = async function (context) {
  const { id } = context.query;
  const res = await apiCaller(`/api/v1/client/job/${id}`
  );
  const { job } = res;

  return { job };

};



// const mapStateToProps = (state) => ({
//   jobs: state.jobs
// })

export default JobDetails;