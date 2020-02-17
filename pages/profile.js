import React from "react";
import styled, { css } from "styled-components";
import { Row, Col, Container, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useRouter } from 'next/router';

import { updateUser } from '../api';
import { updateUserInfo, toggleView } from "../actions/action";


import Layout from "../layout";
import {
  Paper,
  JobBadge,
  Topic,
  Info,
  Description,
  JobButton,
  ProfileAv,
  SuccessBar,
  EditBtnPencil,
  ViewBtn
} from "../components/utils";


import WorkHistory from '../components/history/workhistory'
import EducationHistory from '../components/history/educationhistory'
import EditDescription from '../components/editdescription'
import EmploymentHistory from '../components/history/employmenthistory'
import SkillColumn from '../components/SkillColumn/skillContainer'
import AuthContainer from '../components/Auth/authContainer';
import ModalContainer from "../components/Modals/modalContainer";

import Availability from '../components/EditModule/available'

import Rate from '../components/EditModule/editRate'




 class Profile extends React.Component {
 
   
   constructor(props){
     super(props)
     this.toggle = this.toggle.bind(this)
   }
    async  updateHandler  (data) {
        const userData = await updateUser(data);
    }

    toggle (){
      console.log("toggle")
      this.props.toggle_view()
    }

        
        render () {
          const { firstname, lastname, completedJobs, description } = this.props.user;

        return (
          <Layout>
            <Container>
              <Paper className="mb-3">
                <Row>
                  <Col md="auto">
                    <ProfileAv />
                      <ViewBtn toggle={this.toggle} />
                  </Col>
                  <Col md={7}>
                    <div>
                      <Topic>
                        {" "}
                        {firstname} {lastname}{" "}
                      </Topic>
                      <p>Chaguanas, Trinidad and Tobago </p>
                      <Availability />
                    </div>
                  </Col>
                  <Col md={3}>
                    <h2>90%</h2>
                    <SuccessBar percent={9} />
                    <strong>Success rate</strong>
                  </Col>
                </Row>

                <hr />

                <Row>
                  <style jsx>{`
                    .bold-text {
                      font-style: normal;
                      font-weight: 500;
                      font-size: 20px;
                      line-height: 20px;
                      text-transform: capitalize;
                      color: #000000;
                      text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
                      margin: 0px;
                    }

                    .md-text {
                      font-style: normal;
                      font-weight: 300;
                      font-size: 20px;
                      line-height: 42px;
                      text-transform: capitalize;
                      color: #000000;
                      text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
                    }
                  `}</style>
                  <Col md={3}>
                    <div>
                      <p className="bold-text">{completedJobs}</p>

                      <p className="md-text">jobs</p>

                      <p className="bold-text">$200,000</p>

                      <p className="md-text">last job price</p>

                      <Rate />

                      <p className="md-text">Hourly rate</p>
                    </div>
                  </Col>
                  <Col md={9}>
                    <EditDescription>{description}</EditDescription>
                  </Col>
                </Row>
              </Paper>


              <Row className="mb-3">
                <Col>
                  <Paper className="mb-3">
                    <WorkHistory />
                  </Paper>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Paper className="mb-3">
                    <EmploymentHistory />
                  </Paper>
                </Col>

                <Col>
                  <Paper className="mb-3">
                    <EducationHistory />
                  </Paper>

                  <Paper className="mb-3">
                    <SkillColumn />
                  </Paper>
                </Col>
              </Row>
            </Container>
          </Layout>
        );
    }

}










const mapStateToProps = (state) => ({
  user: state.user,
  isLogin: state.user.isLogin
})

const mapDispatchToProps = dispatch => ({
  updateUser: bindActionCreators(updateUserInfo, dispatch),
  toggle_view: bindActionCreators(toggleView, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile)