import React, { useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Router from 'next/router'

import { Row, Col, Container } from 'react-bootstrap';

import JobCard from '../jobCard';
import JobPagination from '../Pagination/pagination';
import { searchReq } from '../../actions/action'



const SearchView = (props) => {
    const { remaining, page, resultsLength } = props
    const { _jobs } = props;

    const pageChange = (page) =>{

        const {q} = props
        props.run_search(q, page, 2)
    }


    const pageData = { remaining, page, 
        numOfJobs: resultsLength, limit:2 };
    
return (<>
    {_jobs.map((job, idx) => (
    <JobCard
        {...job}
        key={idx}
    />
    ))} 
    <JobPagination data={pageData} pageChange={pageChange} />

</>)
}

const mapStateToProps = (state) => ({
    _jobs: state.search.searchResults,
    remaining: state.search.remaining,
    numofJobs: state.jobs.numofJobs,
    resultsLength: state.search.resultsLength,
    page: state.search.page,
    q: state.search.q
  })

  const mapDispatchToProps = (dispatch) => ({
      run_search: bindActionCreators(searchReq, dispatch)
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(SearchView)  