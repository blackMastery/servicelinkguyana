import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 30px;
`;


const SearchFeild = styled.input`
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 3px;
    max-width: 715px;
    width: 100%;
    min-height: 50px;
    padding: 12px 20px;
    border: 1px solid #ccc;
`

const SearchBtn = styled.div`
    background: #2E576D;
    min-height: 50px;
    min-width: 50px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
        &:hover{
        cursor: pointer;
    }
`;


export default ()=>(
    <Wrapper>
        <SearchFeild type="text" name='job' placeholder="Search for Jobs"/>
        <SearchBtn>
            <svg width="32" height="32" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M27 15C27 21.6274 21.6274 27 15 27C8.37258 27 3 21.6274 3 15C3 8.37258 8.37258 3 15 3C21.6274 3 27 8.37258 27 15ZM24.508 26.6022C21.92 28.7256 18.6088 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 18.5945 28.7357 21.8936 26.6275 24.477L41.1846 39.9439L39 42L24.508 26.6022Z" fill="white" />
            </svg>
        </SearchBtn>    
    </Wrapper>
    
)