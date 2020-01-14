import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Formik, useField, useFormik } from 'formik';
import * as Yup from 'yup';

import { Row, Col, Container, Modal, Form, FormControl, FormLabel } from 'react-bootstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { cover_letter } from '../../actions/action'
import { set_proposal_id, valid_proposal, proposal_request } from '../../actions/action'



import {
    Paper,
    JobBadge,
    Topic,
    Info,
    Description,
    JobButton
} from "../../components/utils";




const LetterForm = (props) => {

    const [coverLetter, setLetter] = useState('')

    const handleChange = (event) => {
        setLetter(event.target.value)
    }
    const _submit = (e) => {
        e.preventDefault()
        props._save(coverLetter)
        props.saveIds(props.user._id, props.jobId)
        props.sendProposal()
}

console.log(props)
    return (        
                <Form onSubmit={_submit}>
                    <Row>
                        <Col>

                                <Form.Group >
                                    <Form.Label style={{ marginBottom: "1.2rem" }}>
                                        {" "}
                                        <Topic> Cover letter </Topic>
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows="3"
                                        name="description"
                                        value={coverLetter}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <JobButton type="submit"> Submit Proposal </JobButton>
                        </Col>
                    </Row>
                </Form>

    )
}






const LetterFormContainer = (props) => {
    const _save = (data) => {
        props.saveCoverLetter(data)
    }
    return (
        <LetterForm {...props} _save={_save} />
    )
}

export default LetterFormContainer;