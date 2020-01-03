import React, { useState } from 'react'
import styled from 'styled-components'
import { Row, Col, Container, Modal, Button, Form } from 'react-bootstrap';
import { Paper, AddBtn, SaveBtn, SecondaryBtn, Description, EditBtnPencil } from './utils'

// import { updateUser } from '../api';
import { updateUser } from "../actions/action";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ModalContainer from "./Modals/modalContainer";


const DescriptionForm = (props) => {
    const [description, setDescription] = useState(props.description);
    const handler = e => {
        const { value } = e.target;
        setDescription(value)
    }
    const submitDesc = (e) => {
        e.preventDefault();
        console.log(description)
        props.updateHandler({description})
    }
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
          <Col md="auto" className="ml-auto">
            <SaveBtn variant="primary" type="submit">
              Save
            </SaveBtn>
          </Col>
        </Row>
      </Form>
    );
}



const DescModal = ModalContainer(DescriptionForm);


class EditDescription extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
       show: false
     };
     
    this.handler = this.handler.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  showModal() {
    this.setState({
      show: true
    });
  }
  closeModal() {
    this.setState({
      show: false
    });
  }
  handler(data) {
      console.log(data)
    this.props._updateUser(this.props.user._id, data);
  }

  render() {
    const { children, _updateUser, user } = this.props;

    return (
      <>
        <Description>
          <EditBtnPencil handler={this.showModal} />
          {children}
        </Description>

        <DescModal
          title="Edit Description"
          {...user}
          closeModal={this.closeModal}
          show={this.state.show}
          updateHandler={this.handler}
        />
      </>
    );
  }
} 


const mapStateToProps = (state) => ({
    user: state.user,
    isLogin: state.user.isLogin
})
const mapDispatchToProps = dispatch => ({
  _updateUser: bindActionCreators(updateUser, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(EditDescription)