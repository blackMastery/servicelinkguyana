import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap';
import Layout from '../layout'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

export default () =>( 
<Layout> 
 <Title>My page</Title>
 <Button> click this</Button> 

 <p className="para">red</p>

    <style jsx>{
      `
         .para {
           font-size: 40px;
          background: red;
         }
         
        ` }
    </style>
</Layout>
)