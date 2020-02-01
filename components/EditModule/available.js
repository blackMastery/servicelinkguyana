import React, { useState } from 'react'

 
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ModalContainer from "../Modals/modalContainer";
import WithEditingModel from './editContainer'
import { updateUser } from "../../actions/action";
import { EditBtnPencil } from '../utils'

import {  AvailableForm } from '../Forms/formUtils'















const Avail  = (props) => {
  console.log(props, "Avail")
  const { availability } = props.user
  const open = () => props.handler()

  return (
    <div className="d-flex justify-content-start">
      <strong className="pr-2">Available: </strong>{" "}
        <span> {availability}</span>
        <EditBtnPencil handler={open}/>
    </div>
  )
}


const mapStateToProps = (state) => ({
  user: state.user,
  title: "Change availability",
  isLogin: state.user.isLogin
})
const mapDispatchToProps = dispatch => ({
_updateUser: bindActionCreators(updateUser, dispatch)
});


const AvModal =  ModalContainer(AvailableForm)
const Availability = WithEditingModel(Avail, AvModal)

export default connect(mapStateToProps,mapDispatchToProps)(Availability)


