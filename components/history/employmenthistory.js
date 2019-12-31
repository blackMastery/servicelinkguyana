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
    height: 100%;
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
  return <DeleteIconBtn _delete={_delete} />;
};

const EmpView = (props) => {
  const { _id, title, role, description,
     company, deleteEmployment, user } = props;
     const _delete = () => {
       deleteEmployment(user._id, _id);
     }

  return (
    <Row>
      <Col>
        <h2>{company}</h2>
        <p>{title}</p>
        <p>{description}</p>
      </Col>
      <EditOverLay
        id={_id}
        deleteHandler={_delete}
      />
    </Row>
  );
};








// const EmpModel = (props) =>{
//   const [show, setShow] = useState(false);
//   const showModel = () => setShow(true);
//   const closeModel = () => setShow(false);

//   const { formHandler } = props
//   return (
//     <Row>
//       <Col md={10}>
//         <h2>Employment History</h2>
//       </Col>
//       <Col md={2}>
//         <AddBtn handler={showModel} />
//       </Col>
//     <Modal show={show} onHide={closeModel}>
//       <Modal.Header closeButton>
//         <Modal.Title>Add Employment </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <EmploymentForm _handler={formHandler} closeModel={closeModel} />
//       </Modal.Body>
//     </Modal>
//     </Row>
//   )
// }











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
      const  { user, addEmployment } = this.props; 
      addEmployment(user._id, data);
      

    // updateEmp(`/api/v1/client/employment/${user._id}`, data, add_employment)
  };

  render () {
   const  { empHistory, deleteEmployment, user, addEmployment, updateEmp } = this.props; 
  return (
    <Container>
      <Row>
        <Col md={10}>
          <h2>Employment History</h2>
        </Col>
        <Col md={2}>
          <AddBtn handler={this.showModal} />
        </Col>
      </Row>
      <hr />

      {empHistory.map((emp, idx) => (
        <EmpView deleteEmployment={deleteEmployment}  user={user} {...emp} key={idx} />
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
user: state.user
})

const mapDispatchToProps = dispatch => ({
  deleteEmployment: bindActionCreators(deleteEmpAction, dispatch),
  addEmployment: bindActionCreators(addEmp, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmploymentHistory);
