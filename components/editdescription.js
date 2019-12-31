import React, { useState } from 'react'
import styled from 'styled-components'
import { Row, Col, Container, Modal, Button, Form } from 'react-bootstrap';
import { Paper, AddBtn, SaveBtn, SecondaryBtn, Description, EditBtnPencil } from './utils'

import { updateUser } from '../api';
import { updateUserInfo } from '../actions/action';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";



const DescriptionForm = (props) => {
    const [description, setDescription] = useState("");
    // const { updateUser } = props;
    const handler = e => {
        const { value } = e.target;
        setDescription(value)
    }
    
    const submitDesc = (e) => {
        e.preventDefault();
        console.log(description)
        props.updateHandler(description)
    }




    return (
        <Form onSubmit={submitDesc}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description (optional) </Form.Label>
                <Form.Control as="textarea" rows="3" value={description} onChange={handler} />
            </Form.Group>
            <Row>
                <Col>
                    <SecondaryBtn>
                        Cancel
                    </SecondaryBtn>
                </Col>

                <Col>
                    <button variant="primary" type="submit">
                        Save
                    </button>
                </Col>
            </Row>
        </Form>
    )
}

const EditDescription = ({ children, _updateUser, user } ) => {
    const [show, setShow] = useState(false);
    const showModel = () => setShow(true)
    const closeModel = () => setShow(false)

    const updateHandler = async ( data ) =>{
        const userData = await updateUser(`/api/v1/client/updateclientinfo/5e046dc3bd60a23e5c816da8`,
            { description: data});
        _updateUser(userData)
        
    }

    return (
        <>
        <Description>
                      <EditBtnPencil handler={showModel} />

                {children}
        </Description>

            <Modal show={show} onHide={closeModel}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Description </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DescriptionForm updateHandler={updateHandler}/>
                </Modal.Body>
            </Modal>
        </>
    )
}




const mapStateToProps = (state) => ({
    user: state.user,
    isLogin: state.user.isLogin
})
const mapDispatchToProps = (dispatch) => ({
    _updateUser: bindActionCreators(updateUserInfo, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(EditDescription)