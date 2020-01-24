import React, {useState} from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchReq } from '../../actions/action';
import Accordion from 'react-bootstrap/Accordion'
import { Col, Row, Card, Button } from 'react-bootstrap';

import Form from 'react-bootstrap/Form'


const Wrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
`;


const SearchFeild = styled.input`
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 3px;
    /* max-width: 715px; */
    width: 100%;
    min-height: 50px;
    padding: 12px 20px;
    border: 1px solid #ccc;
`

const SearchBtn = styled.button`
    background: #2E576D;
    min-height: 50px;
    min-width: 50px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    display: flex;
    border: none;
    justify-content: center;
    align-items: center;
        &:hover{
        cursor: pointer;
    }
`;


const SearchForm = (props) => {
    // console.log(props)

    const formik = useFormik({
        initialValues: {
            search: '',
            entry: false,
            intermediate: false,
            expert: false,
            "200-1000": false,
            "500-10000": false,
            "1000-20000": false,
            "1-5": false,
            "5-10": false,
            "10-20": false

        },
        validationSchema: Yup.object({
            search: Yup.string(),
            entry: Yup.boolean(),
            intermediate: Yup.boolean(),
            expert: Yup.boolean(),
            "200-1000": Yup.boolean(),
            "500-10000": Yup.boolean(),
            "1000-20000": Yup.boolean(),
            "1-5": Yup.boolean(),
            "5-10": Yup.boolean(),
            "10-20": Yup.boolean()

        }),
        onSubmit: values => {
          console.log(values)
        //   props.run_search(values.search)
        },
      });

return (
        
<form onSubmit={formik.handleSubmit} className="mb-3">
    <Wrapper>
        <SearchFeild 
        {...formik.getFieldProps('search')} 
        type="text" name='search' id="search" placeholder="Search for Jobs"/>
        <SearchBtn type="submit">
            <svg width="32" height="32" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M27 15C27 21.6274 21.6274 27 15 27C8.37258 27 3 21.6274 3 15C3 8.37258 8.37258 3 15 3C21.6274 3 27 8.37258 27 15ZM24.508 26.6022C21.92 28.7256 18.6088 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 18.5945 28.7357 21.8936 26.6275 24.477L41.1846 39.9439L39 42L24.508 26.6022Z" fill="white" />
            </svg>
        </SearchBtn> 
    </Wrapper>

    <Accordion>
    <Card>
        <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Advance Search
        </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
        <Card.Body>
        <Row>
                <Col md="auto">
                    <p>Experience Level</p>
                        <Form.Group controlId="Experience">
                            <Form.Check 
                            type="checkbox"
                            {...formik.getFieldProps('entry')} 
                            name="entry"
                            label="entry" />
                            <Form.Check type="checkbox"
                            {...formik.getFieldProps('intermediate')} 
                            name="intermediate"
                            label="intermediate" />
                            <Form.Check type="checkbox" 
                            name="expert" label="expert" 
                            {...formik.getFieldProps('expert')} />
                        </Form.Group>
                </Col>        

            <Col md="auto">
                    <p>Budget</p>
                    <Form.Group controlId="Budget">
                        <Form.Check type="checkbox" {...formik.getFieldProps('expert')} label="200-1000" />
                        <Form.Check type="checkbox" label="500-10000" {...formik.getFieldProps('500-10000')}  />
                        <Form.Check type="checkbox" label="1000-20000" {...formik.getFieldProps('1000-20000')} />
                    </Form.Group>
            </Col>

            <Col md="auto">

                    <p>Number of Proposals</p>
                    <Form.Group controlId="proposals">
                        <Form.Check type="checkbox" label="1-5" {...formik.getFieldProps("1-5")} />
                        <Form.Check type="checkbox" label="5-10" {...formik.getFieldProps('5-10')} />
                        <Form.Check type="checkbox" label="10-20"  {...formik.getFieldProps('10-20')} />
                    </Form.Group>
            </Col> 
    </Row> 
        </Card.Body>
        </Accordion.Collapse>


 

    </Card>
    </Accordion>

  </form>
    
)}



const mapSearchToProps = (dispatch) =>({
   search_req: bindActionCreators(searchReq, dispatch) 
})

export const withSearch = (Comp) => connect(null,mapSearchToProps)(function (props){
    return(<Comp {...props} />)
})

const JobSearch = (props) => {
   const run_search = (q) =>{
       console.log(q)
       props.search_req(q, 1, 2)
    }

    return (<SearchForm run_search={run_search} />)
}

export default withSearch(JobSearch);



