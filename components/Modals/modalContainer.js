import React, { useState } from 'react';
import styled from 'styled-components'
import { Row, Col, Container, Modal, Button, Form } from 'react-bootstrap';
import { Paper, AddBtn, SaveBtn, SecondaryBtn } from '../utils'

/**
 * 
 * @props {show} boolean
 *  
 */


const ModalContainer = (Component) => class DataModal extends React.Component {

    constructor(props){
        super(props)
        this.state ={
            show: false
        }
        this.closeModel = this.closeModel.bind(this)
    }
componentDidMount(){
    this.setState({
        show: this.props.show
    })
}
closeModel(){
    this.setState({
        show: false
    })
}
    render(){
        console.log(this.props.show)
        return (
            <Modal show={this.props.show} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Component {...this.props}/>
                </Modal.Body>
            </Modal>
        )
    }

} 






export default ModalContainer