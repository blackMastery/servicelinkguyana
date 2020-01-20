import React from 'react'

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
import SearchView from '../components/SearchView/searchView';









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
                   const { searchView, remaining, numofJobs, page, resultsLength } = this.props
                   const { _jobs } = this.props;
                   const pageData = { remaining, numofJobs, page, resultsLength, limit:5 }
                   let jobview;
                   let searchResult;
                   if(!_jobs) return null



                   if (!searchView){
                     jobview = (<> 
                        {_jobs.map((job, idx) => (
                               <JobCard
                                 {...job}
                                 key={idx}
                               />
                               
                               ))} 
                           <JobPagination data={pageData} pageChange={this.pageChange} />

                     </>)
                   } else{
                     searchResult = (<SearchView/>)
                    }

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

                             {jobview}
                              {searchResult}

                           </Col>
                         </Row>


                              {/* <Row>
                                <Col md={3}>
                                </Col>
                                <Col md={9}>
                                
                                
                                
                                </Col>
                              </Row> */}
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
  isLogin: state.user.isLogin,
  searchView: state.search.searchView
})



const mapDispatchToProps = ( dispatch ) => ({
  loadJobs: bindActionCreators(loaded_jobs, dispatch)
})





export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthContainer(JobFeeds));



