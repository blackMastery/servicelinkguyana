import React, {Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { DeleteSkillAction, AddSkillAction } from "../../actions/action";

import {SkillColumn} from './skillsColumn'






class SkillContainer extends Component {

    render(){
    if (!this.props.skills) return null;

        return (<SkillColumn{...this.props} />)
    }


}






const mapStateToProps = state => ({
  skills: state.user.skills,
  user: state.user,
  viewAsOthers: state.app.viewAsOthers
});

const mapDispatchToProps = (dispatch) => ({
  removeSkill: bindActionCreators( DeleteSkillAction, dispatch),
  AddSkill: bindActionCreators(AddSkillAction, dispatch)

})


export default connect(mapStateToProps, mapDispatchToProps)(SkillContainer);