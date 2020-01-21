import React, { useState } from 'react';
import { Row, Col, Container, Modal, Form, FormControl, FormLabel } from 'react-bootstrap';
import {
    Panel,
    Paper,
    JobBadge,
    Topic,
    Info,
    Description,
    JobButton
} from '../utils'

import { SelectComp, Rate } from '../Forms/formUtils'
import CoverLetter from '../Forms/CoverLetter'

import { Formik, useField, useFormik } from 'formik';
import * as Yup from 'yup';
import InputGroup from 'react-bootstrap/InputGroup'

const ProposalView = ( props ) => {
    const options = ['one week', 'more than two weeks','three weeks','other'];
    const [defaultOpt]  = options

    return (
        
        
        <>
        <Row>

            <Col>
                <Panel title="Project Terms">
            <Formik
            onSubmit={(values) => {
                console.log(values);
                props._submit(values)
                }}
            
                validationSchema={Yup.object({
                    coverLetter: Yup.string().required(),
                rate: Yup.number().required('Required'),
                est: Yup.string()
                .oneOf(
                    options,
                    'Invalid  Type'
                )
                .required('Required')
        
                })}
                initialValues={{
                rate: 0,
                est:'one week',
                coverLetter: ''
                }}
            >


        { formik =>(
            <Form onSubmit={formik.handleSubmit} className="mt-3">
                <Container>
                    <style jsx>{`
                    .myrate {
                        font-weight: normal;
                        font-size: 12px;
                        line-height: 28px;
                        text-transform: capitalize;
                        color: #000000;
                    }
                    `}
                    </style>

                    

                <Row>
                    <Col md={5}>
                        <FormLabel> What is the rate you'd like to bid for this job? </FormLabel>
                            <Form.Group 
                            controlId="rate"
                            >
                            <Form.Control 
                                placeholder="$" 
                                name="rate"
                                as="input"
                                type="number"
                                {...formik.getFieldProps('rate')}
                                
                            />
                            </Form.Group>
                    </Col>



                    <Col md={{ span: 5, offset: 2 }}>
                        <FormLabel>How long will this project take?</FormLabel>
                            <FormControl
                            as="select"
                            name='est'
                            id="est"
                            {...formik.getFieldProps('est')}
                            >
                            { 
                            options.map((opt,idx) => <option key={idx} value={opt} >{opt}</option>)
                            }
                        </FormControl>
                    </Col>
                </Row>

                        




                <Row>
                    <Col md={12}>
                        <Form.Group controlId="coverLetter"  controlId="formBasicEmail">
                            <Form.Label style={{ marginBottom: "1.2rem" }}>
                                {" "}
                                <Topic> Cover letter </Topic>
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                name="coverLetter"
                                placeholder="Talk briefly about your previous job similar to this one and/or explain your approach to complete this job"
                                {...formik.getFieldProps('coverLetter')}
                                
                            />
                        </Form.Group>
                    </Col>
                </Row>


                <Row>
                    <Col md={12}>
                        <JobButton type="submit"> Submit Proposal </JobButton>
                    </Col>
                </Row>
            
                </Container>
                </Form>
                    )}
    </Formik>

</Panel>
        </Col>
        </Row>
        </>





         
    )
}


export default ProposalView