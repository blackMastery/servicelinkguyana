import React, { useState } from 'react'
import styled from 'styled-components'
import { Row, Col, Container, Modal, Button, Form } from 'react-bootstrap';
import { Paper, AddBtn, SaveBtn, SecondaryBtn } from '../utils'









export default ({ _handler, closeModal }) => {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [to, setTo] = useState("");
  const [from, toFrom] = useState("");

  const handler = event => {
    const { name, value } = event.target;
    switch (name) {
      case "company":
        return setCompany(value);
      case "to":
        return setTo(value);
      case "title":
        return setTitle(value);
      case "from":
        return toFrom(value);
      default:
        return;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    _save();
    closeModal()
  };

  const _save = () => {
    const emp = {
      company,
      title,
      from,
      to
    };
    _handler(emp);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Company</Form.Label>
        <Form.Control
          type="text"
          placeholder="company name"
          required
          name="company"
          value={company}
          onChange={handler}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="job title"
          name="title"
          value={title}
              required

          onChange={handler}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Period</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="from"
              name="from"
              value={from}
              required

              onChange={handler}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="to"
              name="to"
              onChange={handler}
              required
              value={to}
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          name="current"
          custom
          label="work here currently"
        />
      </Form.Group>
      <hr></hr>
      <Row>
        <Col md="auto" className="ml-auto">
          <SaveBtn variant="primary" type="submit">
            Save
          </SaveBtn>
        </Col>
      </Row>
    </Form>
  );
};
