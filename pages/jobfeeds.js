import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap';
import Layout from '../layout';
import { Row, Col, Container } from 'react-bootstrap';
import JobSearch from '../components/Search/jobsearch'


import JobCard from '../components/jobCard';

const jobs =[ {
    title:'Laravel Expert needed in several projects',
    description:`I have a ton of projects that I need help with.
Most of them are related to Laravel and Javascript skills.
So, I need someone who can help me out`,
    proposals: 12,
    spent: '5k',
    location:'linden',
    est:'10 min',
    skills: ['node.js', 'socket.io', 'typescript', 'angular', 'rxjs',]

},

 {
     title: 'Data Visualization Expert To Create Sales Dashboards',
     description: `Looking to use a sales dashboard platform like dash this, klipfolio, google data studio, or supermetrics, or open to something more custom in Google Sheets.
The perfect candidate will have extensive experience building sales dashboards, 
relevant examples in their portfolio, and provide business analysis and reporting insights.`,
        proposals: 13,
        spent: '5k',
        location: 'linden',
        est: '10 min',
        skills: ['node.js', 'socket.io', 'typescript', 'angular',]

    },

     {
         title: 'Need developer to create Sports stat API website',
         description: `Idea for website: Website will be a simpler/cleaner/modern version of 
         gamescreener.com where users can find games based on data. Would prefer if you
          would use React and Firebase if possible but open to other ideas such as MongoDB.
          `,
        proposals: 12,
        spent: '1200',
        location: 'linden',
        est: '5 hours',
        skills: ['node.js', 'socket.io', 'typescript', 'angular', 'rxjs',]

    }

]





export default () => (
    <Layout>
        <Container>
            <Row>
                <Col md={{ span: 3, offset: 3 }}>
                    <h2>Jobs Feeds</h2>
                </Col>
            </Row>
             <Row>
                 <Col md={3}>
                    <h2>Categories </h2>
                 </Col>
                <Col md={9}>
                    <JobSearch/>
                    {
                        jobs.map((job) => (<JobCard {...job} />) )
                    }
                </Col>
             </Row>
        </Container>

        
    </Layout>
)