import React, { useState } from 'react';
import { Row, Col, Container, Modal, Form, FormControl, FormLabel } from 'react-bootstrap';
import RateView from "../ContractRate/rateContainer";
import {
    Panel,
    Paper,
    JobBadge,
    Topic,
    Info,
    Description,
    JobButton
} from '../utils'

import { SelectComp, Rate } from '../Forms/formUtils'
import CoverLetter from '../Forms/CoverLetter'


const ProposalView = ( props ) => {


    return (
        <>
        <Row>
            <Col>
                <Panel title="Project Terms">
                    <RateView />
                </Panel>
            </Col>
            <Col>
                <Panel title="Time Complete Project ?">
                    <Container>
                        <Row>
                            <Col className="mb-4 mt-4">
                                <SelectComp />
                            </Col>
                        </Row>
                    </Container>
                </Panel>
            </Col>
        </Row>
        <hr /> 
        <Panel title="Additional details">
            <Container>
                  <CoverLetter {...props}/>
                <hr />
            </Container>
        </Panel>
        </>
    )
}


export default ProposalView