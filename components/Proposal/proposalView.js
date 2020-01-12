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

import { SelectComp, CoverLetter, Rate } from '../Forms/formUtils'



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
                <Row>
                    <Col>
                        <CoverLetter />
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <JobButton onClick={props._submit}> Submit Proposal </JobButton>
                    </Col>
                </Row>
                <hr />
            </Container>
        </Panel>
        </>
    )
}


export default ProposalView