import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap';
import Layout from '../layout';
import { Row, Col, Container } from 'react-bootstrap';

import {
  Paper,
  JobBadge,
  Topic,
  Info,
  Description,
  JobButton
} from "./utils";





const Wrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-flow: column nowrap;
    margin-top: 30px;

`;
export default ({ goingJobs, completedJobs, jobCount})=>(
<Wrapper>
    <style jsx>
        {`
        .viewinfo{
            margin-top: 20px;
        }
        `}
    </style>
    <div className="viewinfo">
        <Topic>Guyana</Topic>
        <Info>
            linden 9:12am
        </Info>
    </div>

    <div className="viewinfo">
            <Topic>{jobCount } jobs posted</Topic>
        <Info>
    {completedJobs} % hire rate, {jobCount} open jobs
        </Info>
    </div>
</Wrapper>
)