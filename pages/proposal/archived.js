import Layout from '../../layout';
import { Row, Col, Container, Form } from 'react-bootstrap';
import ProposalTable from '../../components/Table/proposalTable'
import { getProposals } from '../../actions/action'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const Archive  = ( props ) => {
    // if(props.proposals) return null;
      
    return (<Layout>
        <h1>My Proposals</h1>
                <ProposalTable {...props}/>
         </Layout>
    )
}




const mapStateToProps = (state) =>({
    user: state.user,
    proposals: state.proposal.proposals
})


const mapDispatchToProps = ( dispatch ) => ({
    proposalReq: bindActionCreators(getProposals, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(Archive)




// export default Archive;

