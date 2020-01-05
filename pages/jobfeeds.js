import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap';
import Layout from '../layout';
import { Row, Col, Container } from 'react-bootstrap';
import JobSearch from '../components/Search/jobsearch'
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import fetch from "isomorphic-unfetch";
import { Paper, AddBtn, SaveBtn,
   SecondaryBtn, JobButton, PrimaryBtn } from '../components/utils';

import { loaded_jobs } from '../actions/action'
import JobPagination from '../components/Pagination/pagination';

import AuthContainer from '../components/Auth/authContainer'



import JobCard from '../components/jobCard';









 class JobFeeds extends React.Component {
                 constructor(props){
                    super(props)
                   this.pageChange = this.pageChange.bind(this)
                 }
            
                componentDidMount(){
                  const { jobs, loadJobs }  = this.props
                  loadJobs(1,5)                  
                }

               pageChange(page){
                  const { loadJobs }  = this.props

                  loadJobs(page,5)
                }
                 render() {
                   const { remaining, numofJobs, page, resultsLength } = this.props
                   const { _jobs } = this.props;
                   const pageData = { remaining, numofJobs, page, resultsLength }
                   if(!_jobs) return null
                  //  console.log("from state", _jobs, { remaining, numofJobs, page, resultsLength })
                   return (
                     <Layout>
                       <Container>
                         <Row>
                           <Col md={{ span: 3, offset: 3 }}>
                             <h2 id="jobs" >Find Work</h2>
                           </Col>
                         </Row>
                         <Row>
                           <Col md={3}>
                             <h2>Categories</h2>
                           </Col>
                           <Col md={9}>

                             <JobSearch />
                             {_jobs.map((job, idx) => (
                               <JobCard
                                 {...job}
                                 key={idx}
                               />
                             ))} 
                           </Col>
                         </Row>


                              <Row>
                                <Col md={3}>
                                  </Col>
                                <Col md={9}>

                             <JobPagination data={pageData} pageChange={this.pageChange} />


                                </Col>
                              </Row>
                       </Container>
                     </Layout>
                   );
                 }
               }


const mapStateToProps = (state) => ({
  _jobs: state.jobs.jobs,
  remaining: state.jobs.remaining,
  numofJobs: state.jobs.numofJobs,
  resultsLength: state.jobs.resultsLength,
  page: state.jobs.page,
  isLogin: state.user.isLogin
})



const mapDispatchToProps = ( dispatch ) => ({
  loadJobs: bindActionCreators(loaded_jobs, dispatch)
})





export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthContainer(JobFeeds));



/**
 * {
            "skills": [],
            "interviewing": 0,
            "invitesSent": 0,
            "proposals": 0,
            "close": false,
            "_id": "5dfae7a07950ea07e061d03c",
            "title": "machine learing e-com npl,................",
            "description": "All the pages on your site look more or less the same. There's a chrome window, a common base layer, and you just want to change what's inside.",
            "paymentStyle": "fixed price",
            "experienceLevel": "entry",
            "jobType": "one time project",
            "client": "5df7ce031d853e3be469c416",
            "cost": 26000,
            "duration": "three weeks",
            "hourlyRate": "More than 30 hr/week",
            "createdAt": "2019-12-19T02:59:44.326Z",
            "__v": 0
        },
 */