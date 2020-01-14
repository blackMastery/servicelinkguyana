import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import { Formik, useField, useFormik } from 'formik';
import * as Yup from 'yup';

import { Row, Col, Container, Modal, Form, FormControl, FormLabel } from 'react-bootstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import { chargingRate, est_action, cover_letter } from '../../actions/action'


import {
    Paper,
    JobBadge,
    Topic,
    Info,
    Description,
    JobButton
} from "../../components/utils";
























const dispatchSaveEst = (dispatch) => ({
    saveEst: bindActionCreators(est_action, dispatch)
})

const estState = ( state ) => ({
    est: state.proposal.submittedProposal.est 
})

export const SelectComp = connect(estState,dispatchSaveEst)((props) => {
    // const [est, setEst] = useState('')
    const options = ['one week', 'more than one week', 'three weeks',  'other']
    const [defaultOpt]  = options
    // props.saveEst(defaultOpt)
    const handleChange = ({target}) =>{ 
        const { value } = target;
        props.saveEst(value)
}    

    const {est} = props
    console.log(est)
    return (
                    <>
                    <FormLabel>How long will this project take?</FormLabel>
                       <FormControl as="select" name='est'
                       value={est}
                       onChange={handleChange}
                       >
                           { 
                            options.map((opt,idx) => <option key={idx} value={opt} >{opt}</option>)
                        }
                       </FormControl>
                    </>
    
    )
})




const dispatchSaveLetter = (dispatch) => ({
    saveCoverLetter: bindActionCreators(cover_letter, dispatch)
})
const coverLetterState = ( state ) => ({
    coverLetter: state.proposal.submittedProposal.coverLetter 
})

// 
export const CoverLetter = connect(coverLetterState, dispatchSaveLetter)((props) =>{
    const handleChange = (event) =>{ 
        props.saveCoverLetter(event.target.value)
    }
    // const _blur = () => 
    const { coverLetter } = props

    return (
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
    )
})




const dispatchSaveRate = (dispatch) => ({
    saveRate: bindActionCreators(chargingRate, dispatch)
})




const RateForm = (props) => {

    const [rate, setRate] = useState('')

    const handleChange = (event) => {
        setRate(event.target.value)
    }
    const _submit = (e) => {
        e.preventDefault()
        props._save(rate)
}
    return (
        <Form onSubmit={_submit}>

            <Form.Group controlId="formBasicEmail">
                <Form.Control
                as='input'
                type='number'
                required
                onChange={handleChange}
                />
            </Form.Group>
        </Form>
    )
}


const RateContainer = (props) =>  {
        const _save = (data) => {
            props.saveRate(data)
        }
            return (
               <RateForm _save={_save}/>
            )
        }

export const Rate = connect(null, dispatchSaveRate)(RateContainer)