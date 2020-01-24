import React from 'react'

import Layout from '../layout';
import { Row, Col, Container } from 'react-bootstrap';
import JobSearch from '../components/Search/jobsearch'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import fetch from "isomorphic-unfetch";
import { Paper, AddBtn, SaveBtn,
   SecondaryBtn, JobButton, PrimaryBtn } from '../components/utils';

import { loaded_jobs,searchReq } from '../actions/action'
import JobPagination from '../components/Pagination/pagination';

import AuthContainer from '../components/Auth/authContainer'
import JobCard from '../components/jobCard';
import SearchView from '../components/SearchView/searchView';
import styled from 'styled-components'




const SearchQ = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  margin-bottom: 0px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.colors.secondary};
    border-left: 2px solid #09B4A1;
    background-color: white;
  }
`




 class JobFeeds extends React.Component {
                 constructor(props){
                    super(props)
                   this.pageChange = this.pageChange.bind(this)
                   this.run_search = this.run_search.bind(this)
                 }
            
                componentDidMount(){
                  const { jobs, loadJobs }  = this.props
                  loadJobs(1,5)                  
                }

               pageChange(page){
                  const { loadJobs }  = this.props

                  loadJobs(page,5)
                }

                run_search(q){
                  this.props.search_req(q, 1, 3)
                }
                 render() {
                   const { searchView, recentSearch, remaining, numofJobs, page, resultsLength } = this.props
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
                             <h2>Recent Search</h2>
                              {recentSearch.map((s,idx) => (<SearchQ key={idx} onClick={()=> this.run_search(s)} >{s}</SearchQ>))}
                             
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
  searchView: state.search.searchView,
  recentSearch: state.search.recentSearch

})



const mapDispatchToProps = ( dispatch ) => ({
  loadJobs: bindActionCreators(loaded_jobs, dispatch),
  search_req: bindActionCreators(searchReq, dispatch) 

})





export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthContainer(JobFeeds));



