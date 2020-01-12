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



export const SelectComp = connect(null,dispatchSaveEst)((props) => {
    const [est, setEst] = useState('')
    const handleChange = (event) => setEst(event.target.value)
    const _blur = () => props.saveEst(est)
    const options = ['one week', 'more than one week', 'three weeks',  'other']

    return (
      
                <Form>
                    <FormLabel>How long will this project take?</FormLabel>
                       <FormControl as="select" name='est'
                       value={est}
                       onChange={handleChange}
                       onBlur={_blur}
                       >
                           { 
                            options.map((opt,idx) => <option key={idx} value={opt} >{opt}</option>)
                           }
                       </FormControl>
                </Form>
    
    )
})




const dispatchSaveLetter = (dispatch) => ({
    saveCoverLetter: bindActionCreators(cover_letter, dispatch)
})

// 
export const CoverLetter = connect(null, dispatchSaveLetter)((props) =>{
    const [letter, setLetter] = useState('')
    const handleChange = (event) =>{ 
        setLetter(event.target.value)
    }
    const _blur = () => props.saveCoverLetter(letter)

    return (
        <Form className="form" style={{ marginTop: "20px" }}>
            <Form.Group >
                <Form.Label style={{ marginBottom: "1.2rem" }}>
                    {" "}
                    <Topic> Cover letter </Topic>
                </Form.Label>
                <Form.Control
                    as="textarea"
                    rows="3"
                    name="description"
                    value={letter}
                    onChange={handleChange}
                    onBlur={_blur}
                />
            </Form.Group>
        </Form>
    )
})




const dispatchSaveRate = (dispatch) => ({
    saveRate: bindActionCreators(chargingRate, dispatch)
})


export const Rate = connect(null, dispatchSaveRate)((props) => {

    const [rate, setRate] = useState('')
    const handleChange = (event) => {
        setRate(event.target.value)
    }
    const _blur = () => props.saveRate(rate)

    return (
        <Form>

            <Form.Group controlId="formBasicEmail">
                <Form.Control
                as='input'
                type='number'
                required
                value={rate}
                onChange={handleChange}
                onBlur={_blur}
                />
            </Form.Group>
        </Form>
    )
})

