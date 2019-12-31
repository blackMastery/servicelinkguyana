import React, { useState } from 'react'
import styled from 'styled-components'
import { Row, Col, Container, Form, Modal } from 'react-bootstrap';
import { Paper, AddBtn, SaveBtn, SecondaryBtn, JobButton } from '../../components/utils';
import Registration from './signup'
import {register} from '../../api'
import { useRouter } from 'next/router'



export default () => {
    const router = useRouter()
    const postAndRedirect = async (data) => {
    const user = await register('/api/v1/client/signup',data)
    console.log(user)
    router.push('/jobfeeds')

    }
    return (
        <Registration postAndRedirect={postAndRedirect} />
    )
}