import React, {useState} from 'react'
import styled from 'styled-components'
import { Row, Col, Container, Modal, Button, Form  } from 'react-bootstrap';
import { Paper, AddBtn, SaveBtn, SecondaryBtn, EditIconBtn, DeleteIconBtn } from '../utils'
import EducationForm from '../Forms/educationform'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ModalContainer from '../Modals/modalContainer';


import {
  add_education,
  remove_employment,
  edit_education,
  deleteEducation,
  updateEdu
} from "../../actions/action";

const EduModal = ModalContainer(EducationForm);





const EditOverLay = ({ id, user, deleteHandler, showModal, editHandler}) => {
    const _delete = () => {
      console.log(user,id)
        deleteHandler(user._id, id)
    }
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
        {/* <EditIconBtn showModel={showModel}/> */}
        <DeleteIconBtn _delete={_delete}/>
      </Overlay>
    );
}

const EduView = (props) => {
  const { _id, user, education, deleteHandler, _handler, viewAsOthers } = props;

  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);

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

            <h2>{education.school}</h2>
            <p>{education.areaOfStudy}</p>
          </div>

          {!viewAsOthers && (
            <EditOverLay
              showModal={showModal}
              id={education._id}
              user={user}
              deleteHandler={deleteHandler}
            />
          )}
        </div>
      </Col>
    </Row>
  );
};

const EducationHistory = ({
  eduList,
  addEducation,
  deleteEdu,
  editEducation,
  user,
  viewAsOthers
}) => {
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const formHandler = data => {
    console.log(data);
    addEducation(user._id, user.token, data);
  };
  const deleteHandler = (userid, id) => {
    console.log(userid, id);
    deleteEdu(userid, user.token, id);
  };

  console.log(show);
  return (
    <Container>
      <Row>
        <Col md={10}>
          <h2>Education History</h2>
        </Col>
        <Col md={2}>{!viewAsOthers && <AddBtn handler={showModal} />}</Col>
      </Row>
      <hr />
      {eduList.map((education, idx) => (
        <EduView
          key={idx}
          education={education}
          user={user}
          _handler={formHandler}
          viewAsOthers={viewAsOthers}
          deleteHandler={deleteHandler}
        />
      ))}

      <EduModal
        title="Add Education"
        _handler={formHandler}
        show={show}
        closeModal={closeModal}
      />
    </Container>
  );
};

const mapStateToProps = state => ({
  eduList: state.user.education,
  user: state.user,
  viewAsOthers: state.app.viewAsOthers
});

const mapDispatchToProps = dispatch => ({
  addEducation: bindActionCreators(updateEdu, dispatch),
  editEducation: bindActionCreators(edit_education, dispatch),
  deleteEdu: bindActionCreators(deleteEducation, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(EducationHistory);