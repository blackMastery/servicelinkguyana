import React, {Component } from 'react';

import TableView from './table'
import { Row, Col, Container, Form } from 'react-bootstrap';

export default class ProposalTable extends React.Component {

     componentDidMount(){
         const {user, proposalReq, proposals }  = this.props;
         proposalReq(user._id, user.token)
        }   

    
    
    render (){
        const {user, proposals }  = this.props;
        const list = proposals.map((proposal,idx) =>{
          const { job, est, rate, createdAt }  = proposal;
          const { title,cost, paymentStyle, experienceLevel  } = job;

          return { title,cost, paymentStyle,createdAt, experienceLevel,job, est, rate  }
        } )
        if(!user.isLogin && proposals.length < 1) return null;
        console.log(proposals)  
        return (
            <Container>
                <TableView list={list}/>
            </Container>
        )
    }
}

    
    


