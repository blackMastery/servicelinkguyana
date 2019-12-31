import React, { useState } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NavBar from './navbar'
import { logout  } from '../../actions/action'


function Appbar(Component){
    return class Container extends React.Component {
        
        constructor(props){
            super(props)
        }
        
        render(){
            return (
                <Component {...this.props}/>
            )
        }
    }



}


const mapStateToProps = (state) => ({
    user: state.user,
    isLogin: state.user.isLogin
})

const mapDispatchToProps = (dispatch) => ({
    Logout: bindActionCreators(logout, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Appbar(NavBar))
