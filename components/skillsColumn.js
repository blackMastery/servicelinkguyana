import React, { useState } from 'react'
import styled from 'styled-components'
import { Row, Col, Container, Modal, Button, Form } from 'react-bootstrap';
import { Paper, AddBtn, SaveBtn, SecondaryBtn, SkillBadge } from './utils'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ModalContainer from "./Modals/modalContainer";
import { DeleteSkillAction, AddSkillAction } from "../actions/action";

import SkillForm from '../components/Forms/skills'


const SkillModal = ModalContainer(SkillForm);





const SkillColumn = ( props ) => {
    const [show, setShow] = useState(false);
    const showModal = () => setShow(true);
    const closeModal = () => setShow(false);
  const { skills, removeSkill, user, AddSkill } = props;
    if(!skills) return null;
    const formHandler = (data) => {
        console.log(data)
    }
    const _delete = (skillid) =>{
      removeSkill(user._id, skillid)
    }
    const _add = (skill) => {
      AddSkill(skill, user._id);
    }
    

    return (
      <Container>
        <Row>
          <Col md={10}>
            <h2>Skills</h2>
          </Col>
          <Col md={2}>
            <AddBtn handler={showModal} />
          </Col>
        </Row>

          <hr />
        <Row>
          {skills.map(skill => (
            <Col md="auto">
              <SkillBadge>{skill.name}</SkillBadge>
            </Col>
          ))}
        </Row>


        <SkillModal
          title="Add Education"
          _handler={formHandler}
          show={show}
          closeModal={closeModal}
          skills={skills}
          _delete={_delete}
          _add={_add}
        />
      </Container>
    );
}

const mapStateToProps = state => ({
  skills: state.user.skills,
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  removeSkill: bindActionCreators( DeleteSkillAction, dispatch),
  AddSkill: bindActionCreators(AddSkillAction, dispatch)

})

export default connect(mapStateToProps, mapDispatchToProps)(SkillColumn);