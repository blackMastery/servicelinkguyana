import React, { useState } from 'react';
import styled from 'styled-components'
import { Row, Col, Container, Modal, Button, Form } from 'react-bootstrap';
import { Paper, AddBtn, SaveBtn, SecondaryBtn } from '../utils'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


export default ({ _handler, closeModal}) => {
  const [_school, setSchool] = useState("");
  const [_periodFrom, setFrom] = useState("");
  const [_periodTo, setTo] = useState("");
  const [_degree, setDegree] = useState("");
  const [_area, setArea] = useState("");
  const [_description, setDesc] = useState("");
  const [validated, setValidated] = useState(false);
  
  const handler = event => {
    const { name, value } = event.target;
    switch (name) {
      case "school":
        return setSchool(value);
      case "from":
        return setFrom(value);
      case "to":
        return setTo(value);
      case "degree":
        return setDegree(value);
      case "area":
        return setArea(value);
      case "description":
        return setDesc(value);
      default:
        return;
    }
  };

  const _save = () => {
  // e.preventDefault();
  const education = {
    school: _school,
    period: { from: _periodFrom, to: _periodTo },
    degree: _degree,
    areaOfStudy: _area,
    description: _description
  };
  setArea('')
  setDegree('')
  setDesc('')
  setTo('')
  setSchool('')
  setFrom('')
  
  _handler(education);
}


  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    _save()
    closeModal()

  };

  const addMore = ( e ) =>{
    e.preventDefault();
    _save()
   }

  return (
    <Form onSubmit={handleSubmit} action="#">
      <Form.Group controlId="formBasicCompany">
        <Form.Label>School</Form.Label>
        <Form.Control
          type="text"
          name="school"
          placeholder="school name"
          value={_school}
          required
          onChange={handler}
        />
      </Form.Group>

      <Form.Group controlId="formBasicTitle">
        <Form.Label>Period</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="text"
              name="from"
              placeholder="from"
              onChange={handler}
            required
              value={_periodFrom}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="to"
              name="to"
              value={_periodTo}
              required
              onChange={handler}
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group controlId="formBasicTitle">
        <Form.Label>Degree (optional) </Form.Label>
        <Form.Control
          type="text"
          placeholder="degree name"
          name="degree"
          onChange={handler}
          required

          value={_degree}
        />
      </Form.Group>

      <Form.Group controlId="formBasicTitle">
        <Form.Label>Area of study (optional) </Form.Label>
        <Form.Control
          type="text"
          placeholder="eg: computer science"
          name="area"
          onChange={handler}
          required

          value={_area}
        />
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description (optional) </Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          name="description"
          onChange={handler}
          required
          value={_description}
        />
      </Form.Group>
      <Row>
        <Col>
          <SecondaryBtn onClick={closeModal}>Cancel</SecondaryBtn>
        </Col>
        <Col>
          <SecondaryBtn onClick={addMore}>Save and more</SecondaryBtn>
        </Col>
        <Col>
          <SaveBtn variant="primary" type="submit">
            Save
          </SaveBtn>
        </Col>
      </Row>
    </Form>
  );
};



const mapStateToProps = (state) => ({
  eduList: state.user.education,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  addEducation: bindActionCreators(updateEdu, dispatch),
  editEducation: bindActionCreators(edit_education, dispatch),
  deleteEdu: bindActionCreators(deleteEducation, dispatch)
});