import React, { useState } from 'react'
import { Description, EditBtnPencil } from './utils'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { updateUser } from "../actions/action";
import ModalContainer from "./Modals/modalContainer";
import {DescriptionForm} from './Forms/descriptionForm' 



const DescModal = ModalContainer(DescriptionForm);


class EditDescription extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
       show: false
     };
     
    this.handler = this.handler.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  showModal() {
    this.setState({
      show: true
    });
  }
  closeModal() {
    this.setState({
      show: false
    });
  }
  handler(data) {
      console.log(data)
    this.props._updateUser(this.props.user._id,
       this.props.user.token, data);
  }

  render() {
    const { children, user } = this.props;

    return (
      <>
        <Description>
          <EditBtnPencil handler={this.showModal} />
          {children}
        </Description>

        <DescModal
          title="Edit Description"
          {...user}
          closeModal={this.closeModal}
          show={this.state.show}
          updateHandler={this.handler}
        />
      </>
    );
  }

  
} 


const mapStateToProps = (state) => ({
    user: state.user,
    isLogin: state.user.isLogin
})
const mapDispatchToProps = dispatch => ({
  _updateUser: bindActionCreators(updateUser, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(EditDescription)