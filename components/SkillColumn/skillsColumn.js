import React, { useState } from 'react'
// import styled from 'styled-components'
import { Row, Col, Container } from 'react-bootstrap';
import { AddBtn, SaveBtn, SecondaryBtn, SkillBadge } from '../utils'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ModalContainer from "../Modals/modalContainer";
import { DeleteSkillAction, AddSkillAction } from "../../actions/action";

import SkillForm from '../Forms/skills'


const SkillModal = ModalContainer(SkillForm);





export const SkillColumn = ( props ) => {
    const { skills, removeSkill, user, AddSkill, viewAsOthers } = props;
    const [show, setShow] = useState(false);
    const showModal = () => setShow(true);
    const closeModal = () => setShow(false);

    
    const formHandler = (data) => {
        console.log(data)
    }
    const _delete = (skillid) =>{
      removeSkill(user._id, user.token, skillid)
    }
    const _add = (skill) => {
      AddSkill(skill, user.token, user._id);
    }
    

    return (
      <Container>
        <Row>
          <Col md={10}>
            <h2>Skills</h2>
          </Col>
          <Col md={2}>
          {
            !viewAsOthers &&
            <AddBtn handler={showModal} />
          }
          </Col>
        </Row>

          <hr />
        <Row>
          {skills.map((skill,idx) => (
            <Col md="auto" key={idx}>
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

