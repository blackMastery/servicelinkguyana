import React, { useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ProposalView from './proposalView';
import { SelectComp, CoverLetter, Rate } from '../../components/Forms/formUtils'

import { set_proposal_id, valid_proposal, proposal_request } from '../../actions/action'

import * as Yup from 'yup';

class Proposal extends React.Component {
    constructor(props){
        super(props)
        this._submit = this._submit.bind(this)
    }
     
     check (propposal) {
        let schema = Yup.object().shape({
            hourRate: Yup
                .number()
                .required()
                .positive()
                .integer(),
            provider: Yup.string().required(),
            job: Yup.string().required(),
            est: Yup.string().required(),
            coverLetter: Yup.string().required()

        });

         schema.validate(propposal)
            .then((valid) => {
                console.log(valid)
                // return R.merge(state, valid)
            })
            .catch((err) => {
                const { message, path, name } = err;
                console.log({ message, path, name })

                // return R.merge(state, { error: { message } })
            })



    }
    _submit(){
        const { user, jobId } = this.props
        this.props.saveIds(user._id, jobId)
        // this.props.propospalIsvalid();
        this.check(this.props._proposal)
        
    }

    render(){
        console.log(this.props)
        return(<ProposalView {...this.props}  _submit={this._submit} />)
        }
}


const mapDispatchToProps = (dispatch) => ({
    saveIds: bindActionCreators(set_proposal_id, dispatch),
    propospalIsvalid: bindActionCreators(valid_proposal, dispatch),
    saveProposal: bindActionCreators(proposal_request, dispatch)
    

});

const mapStateToProps = (state) => ({
    user: state.user,
    _proposal: state.proposal.submittedProposal
})


export default connect(mapStateToProps, mapDispatchToProps)(Proposal)