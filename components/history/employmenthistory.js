import React, { useState } from 'react'
import styled from 'styled-components'
import { Row, Col, Container, Modal, Button, Form  } from 'react-bootstrap';
import { Paper, AddBtn, SaveBtn, SecondaryBtn, DeleteIconBtn } from '../utils'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import EmploymentForm from '../Forms/employmentform'
import {
  deleteEmpAction,
  addEmp,
  add_employment,
} from "../../actions/action";
import ModalContainer from "../Modals/modalContainer";





const EmpModal = ModalContainer(EmploymentForm);



const EditOverLay = ({ id, deleteHandler }) => {
  const _delete = () => {
    deleteHandler();
  };
  //  const _edit = (edu)
  const Overlay = styled.div`
    width: 100%;
    height: 50%;
    
    display: flex;
    justify-content: flex-end;
    z-index: 2;
    position: absolute;
    padding-right: 20px;
    opacity: 0;
    &:hover {
      opacity: 1;
    }
  `;
  return ( 
        <Overlay> 
              <DeleteIconBtn _delete={_delete} />
          </Overlay> 

  );
};

const EmpView = (props) => {
  const {
    _id,
    title,
    role,
    description,
    company,
    deleteEmployment,
    user,
    viewAsOthers
  } = props;
     const _delete = () => {
       deleteEmployment(user._id, user.token, _id);
     }

  return (
    <Row>
      <Col className="mb-3">
        <div className=" d-flex flex-row">
          <div>
            <style jsx>{`
              h2 {
              text-transform: capitalize;
              }
              p {
                text-transform: capitalize;
                font-size: 22px;
              }
            `}</style>
            <h2>{company}</h2>
            <p>{title}</p>
            <p>{description}</p>
        </div>

   {
     !viewAsOthers
     &&   
     <EditOverLay
     id={_id}
     deleteHandler={_delete}
     />
    }
    </div>

    </Col>

    </Row>
  );
};
















// const _delete = id => deleteEmployment(id);

class EmploymentHistory extends React.Component {

  constructor(props){
    super(props)
    this.formHandler = this.formHandler.bind(this);
    this.state = { 
      show: false
    }

    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }
  

  showModal(){
    this.setState({
      show: true
    })
  }
  closeModal(){
    this.setState({
      show: false
    })
  }
   formHandler (data) { 
      console.log(data)
      const  { user, addEmployment  } = this.props; 
      addEmployment(user._id, user.token, data);
  }

  render () {
   const  { empHistory, deleteEmployment, user, addEmployment, viewAsOthers, updateEmp } = this.props; 
  return (
    <Container>
      <Row>
        <Col md={10}>
          <h2>Employment History</h2>
        </Col>
        <Col md={2}>{!viewAsOthers && <AddBtn handler={this.showModal} />}</Col>
      </Row>
      <hr />

      {empHistory.map((emp, idx) => (
        <EmpView
          deleteEmployment={deleteEmployment}
          viewAsOthers={viewAsOthers}
          user={user}
          {...emp}
          key={idx}
        />
      ))}

      <EmpModal
        title="Add Employment"
        _handler={this.formHandler}
        show={this.state.show}
        closeModal={this.closeModal}
      />
    </Container>
  );
};
} 



const mapStateToProps = (state) => ({ empHistory: state.user.employmentHistory,
user: state.user,
viewAsOthers: state.app.viewAsOthers
})

const mapDispatchToProps = dispatch => ({
  deleteEmployment: bindActionCreators(deleteEmpAction, dispatch),
  addEmployment: bindActionCreators(addEmp, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmploymentHistory);
