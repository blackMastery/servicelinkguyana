import React, { useState } from 'react'

import { Row, Col, Container, Form, Modal } from 'react-bootstrap';
import { Paper, AddBtn, SaveBtn, SecondaryBtn, JobButton } from '../../components/utils';
import Registration from './signup'
// import {register} from '../../api'
import { useRouter } from 'next/router'

import { Register } from '../../actions/action'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";



const SignUpContainer = ({ register }) => {
    const router = useRouter()
    const postAndRedirect = async (data) => {
        try {
            await register(data);
            router.push('/jobfeeds')

        } catch(error){
            console.log(error)
            router.push('/')

        }

        // console.log(user)


    }
    return (
        <Registration postAndRedirect={postAndRedirect} />
    )
}

const mapStateToProps = ( state ) => ({

})

const mapDispatchToProps = ( dispatch ) => ({
    register: bindActionCreators(Register, dispatch)
})
export default connect(null, mapDispatchToProps)(SignUpContainer)