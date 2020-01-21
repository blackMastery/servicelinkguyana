import React, {useState} from 'react'

import {
  Paper,
  AddBtn,
  SaveBtn,
  SecondaryBtn,
  Description,
  EditBtnPencil
} from "../utils";

import { Row, Col, Form } from "react-bootstrap";



export const DescriptionForm = props => {
  const [description, setDescription] = useState(props.description);
  const handler = e => {
    const { value } = e.target;
    setDescription(value);
  };
  const submitDesc = e => {
    e.preventDefault();
    console.log(description);
    props.updateHandler({ description });
    props.closeModal();
  };
  
  return (
    <Form onSubmit={submitDesc}>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description (optional) </Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          value={description}
          required
          onChange={handler}
        />
      </Form.Group>
      <Row>
        <Col md="auto" className="ml-auto" >
          <SaveBtn variant="primary" type="submit">
            Save
          </SaveBtn>
        </Col>
      </Row>
    </Form>
  );
};
