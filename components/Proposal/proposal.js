import React, { useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Router from 'next/router'

import ProposalView from './proposalView';
import { SelectComp, CoverLetter, Rate } from '../../components/Forms/formUtils'

import { 
    set_proposal_id, 
    valid_proposal,
    proposal_request,
    cover_letter } from '../../actions/action'

import * as Yup from 'yup';









class Proposal extends React.Component {
    constructor(props){
        super(props)
        this._submit = this._submit.bind(this)
    }
    
    _submit(data){
        const { user, jobId } = this.props
        this.props.saveIds(user._id, jobId)
        const proposal =  Object.assign({},
            data,
             {
             provider: user._id,
             job: jobId 
             }
            );
        console.log(proposal)
        this.props.saveProposal(proposal, this.props.user.token)
    }
        

        

    render(){
        console.log(this.props)
        return(<ProposalView _submit={this._submit} />)
        }
}



const mapStateToProps = (state) => ({
    user: state.user,
    coverLetter: state.proposal.submittedProposal.coverLetter,
    _proposal: state.proposal.submittedProposal
})




const mapDispatchToProps = (dispatch) => ({
    saveCoverLetter: bindActionCreators(cover_letter, dispatch),
    saveIds: bindActionCreators(set_proposal_id, dispatch),
    propospalIsvalid: bindActionCreators(valid_proposal, dispatch),
    saveProposal: bindActionCreators(proposal_request, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Proposal)