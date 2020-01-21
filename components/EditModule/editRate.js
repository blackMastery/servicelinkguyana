import React, { useState } from 'react'

 
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ModalContainer from "../Modals/modalContainer";
import WithEditingModel from './editContainer'
import { updateUser } from "../../actions/action";
import { EditBtnPencil } from '../utils'
import styled from "styled-components";

import {  RateForm } from '../Forms/formUtils'



const Bold = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
    text-transform: capitalize;
    color: #000000;
    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    margin: 0px;
`
const Rate = (props) => {
    const {rate} = props.user;
    const open = () => props.handler()

    return (
       <div className="d-flex justify-content-start">
            <Bold>
            ${rate}
            </Bold>
            <EditBtnPencil handler={open} />
        </div>
      )
}

const mapStateToProps = (state) => ({
    user: state.user,
    title: "Change Your Rate",
    isLogin: state.user.isLogin
  })
  const mapDispatchToProps = dispatch => ({
  _updateUser: bindActionCreators(updateUser, dispatch)
  });

const RateModal  = ModalContainer(RateForm)


export default connect(mapStateToProps,mapDispatchToProps)(WithEditingModel(Rate, RateModal) )

