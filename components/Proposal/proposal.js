import React, { useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Router from 'next/router'
import { useRouter } from 'next/router';

import ProposalView from './proposalView';
import { SelectComp, CoverLetter, Rate } from '../../components/Forms/formUtils'

import { 
    set_proposal_id, 
    valid_proposal,
    proposal_request,
    cover_letter } from '../../actions/action'

import * as Yup from 'yup';









const Proposal = (props) => {
    const router = useRouter()
    
    const _submit = (data) => {
        const { user, jobId } =  props
        props.saveIds(user._id, jobId)
        const proposal =  Object.assign({},
            data,
             {
             provider: user._id,
             job: jobId 
             }
            );
        console.log(proposal)
        props.saveProposal(proposal, this.props.user.token)
        router.push('/proposal/archived')
    }
        

        

    
        return(<ProposalView _submit={_submit} />)
        
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