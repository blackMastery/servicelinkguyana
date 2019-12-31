import React, { useState } from 'react'
import styled from 'styled-components'
import { Row, Col, Container, Modal, Button, Form } from 'react-bootstrap';
import { Paper, AddBtn, SaveBtn, SecondaryBtn, SkillBadge } from '../utils'




const Close = styled.span`
    color: white;
    font-weight: bold;
    padding: 5px;
    &:hover{
    color: red;
    cursor: pointer;

    }
`



const SkillForm = ( props ) => {
    const { skills, _delete, _add } = props;
    const [skill, setSkill] = useState('');


    
    const reqDelete = (id) => {
        console.log(id)
        _delete(id)
    }

    const handler = (e) =>{
        const {value} = e.target
        console.log(value)
        console.log('from the handler....')

        setSkill(value)
        e.preventDefault()

    }
    const _submit = (event) =>{
        console.log('from the _submit....')
        _add({name:skill})
        setSkill('')
        event.preventDefault();
        event.stopPropagation();

     
    }
    





    return (
        <Container>
        <Row>
            <Col>
                <Form onSubmit={_submit} >
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="enter skill"
                            name="skill"
                            value={skill}
                            onChange={handler}
                            required
                            as='input'
                            // onKeyDown={_submit}
                        />
                    </Form.Group>
                        <hr/>

                        <Row>
                            <Col>
                                <Paper>
                                    <Row>
                                        {skills.map((skill) => (
                                            <Col xs="auto">
                                                <SkillBadge>{skill.name} <Close onClick={()=>reqDelete(skill._id)} >X</Close></SkillBadge>
                                            </Col>
                                        ))}
                                    </Row>
                                </Paper>
                            </Col>
                        </Row>

                        <hr/>
                        <Row>
                            <Col md="auto" className="ml-auto" >
                                <SaveBtn>
                                    save
                                </SaveBtn>
                            </Col>
                        </Row>

                   
                </Form>
            </Col>
        </Row>
        </Container>
        )
    }



export default SkillForm;