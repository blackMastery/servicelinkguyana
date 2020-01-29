 
import styled, { css } from "styled-components";
import React, {useState} from 'react'
 
import {FormControl, FormLabel,Row, Col, Container } from 'react-bootstrap';
import { useFormik, Form, useField, Formik } from 'formik';
 



 export const Description = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
`;
 export const Paper = styled.div`
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  background: white;
  padding: 20px 30px;
`;

 export const JobBadge = styled.div`
  width: 89px;
  height: 29px;
  background: #e2dcdc;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
 export const Topic = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  margin-bottom: 0px;
  text-transform: capitalize;

`;

 export const Info = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */
  color: #000000;
  margin-bottom: 10px;

`;

export const JobButton = styled.button`
  background: ${props => props.theme.colors.secondary};
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.10);
  border-radius: 2px;
  width: 100%;
  height: 34px;
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  text-transform: capitalize;

  &:hover {
    cursor: pointer;
  }
`;


export const ProfileAv = styled.div`
         width: 120.23px;
         height: 120.23px;
         background-size: contain;
         background-image: url(http://interglobalforest.com/assets/images/male-avatar.png);
         border-radius: 50%;
         /* border: 1px solid #ccc; */
         border: 2px solid #F7C515;

       `;



export const SuccessBar = ({percent=10} )=> {
const Range = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 15px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
`;

const Bar = styled.div`
  background-color: #dcad06;
  height: 15px;
  width: 90%;
`;

console.log(percent)
return (
    <Range>
        <Bar {...percent}/>
    </Range>
)

}


export const AddBtn = ({ handler }) => {


  return (
    <div onClick={handler} className="end">
      <style jsx>{`
                    .end{
                        display: flex;
                        justify-content: flex-end;
                    }
                
                `}</style>
      <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#0E82B0" />
        <path d="M20 8.85254V32.4591" stroke="white" />
        <path d="M32.1302 20.3279L8.52452 20.5327" stroke="white" />
      </svg>
    </div>
  )
}




export const SaveBtn = styled.button`
    background: #09B4A1;
    border-radius: 5px;
    width: 119px;
    height: 49px;
    color: white;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;


export const SecondaryBtn = styled(SaveBtn)`
    color: #09B4A1;
    background: white;
    border-radius: 5px;
    width: 123px;
    height: 49px;
    font-weight: 500;
    border: 1px solid #d9d5d547;
    box-shadow: none !important;
`



export const EditBtnPencil = ({handler}) => {
  return (
    <div className="edit-overlay" >
<style jsx>{`
     svg:hover{
       cursor: pointer;
   
     }

     .edit-overlay{
       display: flex;
       justify-content: flex-end;
        opacity:0;
        padding-right: 15px;
     }
      .edit-overlay{
      height: 100%;
      width: 100%;
      z-index: 2;
      position: absolute;

      }
      .edit-overlay:hover {
        opacity:1;

      }
`}</style>
      <svg onClick={handler} width="31" height="24" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8.00635" y="19.1965" width="25.4821" height="11" transform="rotate(-35.9363 8.00635 19.1965)" fill="#09B4A1" />
      <path d="M29 3.96539L33.5119 0.694933C33.9591 0.370805 34.5844 0.470549 34.9085 0.917717L40.1905 8.20475C40.5146 8.65192 40.4149 9.27718 39.9677 9.6013L35.4557 12.8718L29 3.96539Z" fill="#09B4A1" />
      <path d="M3.13973 29.3762L7.81041 20.3278L13.2483 28.1495L3.13973 29.3762Z" fill="#09B4A1" />
    </svg>
    </div>
  )
}



export const Panel = ({ children, title}) => {


  const PanelHead = styled.div`
    width: 100%;
    height: 70px;
    background: #2E576D;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20px;
`;


  const PanelBody = styled(Paper)`
    padding: 0px 0px 10px 0px;
    width: 100%;
`

  const PanelTitle = styled.h3`
    font-style: normal;
    font-weight: 300;
    font-size: 36px;
    line-height: 42px;
    text-transform: capitalize;
    color: #FFFFFF;

`;



  return (

    <PanelBody>
      <PanelHead>
        <PanelTitle>
          {title}
        </PanelTitle>
      </PanelHead>

      {children}
          
    </PanelBody>
  )
}


export const PrimaryBtn = styled(JobButton)`
background-color: ${ props => props.theme.colors.primary};
color: white;
`


export const SkillBadge = styled.div`
width: fit-content;
height: fit-content;
background: #6AD6EF;
margin: 2px;
border-radius: 5px;
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 8px;
 
`;




export const EditIconBtn = ({ showModel }) => (
  <svg
    onClick={showModel}
    width="31"
    height="24"
    viewBox="0 0 41 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="8.00635"
      y="19.1965"
      width="25.4821"
      height="11"
      transform="rotate(-35.9363 8.00635 19.1965)"
      fill="#09B4A1"
    />
    <path
      d="M29 3.96539L33.5119 0.694933C33.9591 0.370805 34.5844 0.470549 34.9085 0.917717L40.1905 8.20475C40.5146 8.65192 40.4149 9.27718 39.9677 9.6013L35.4557 12.8718L29 3.96539Z"
      fill="#09B4A1"
    />
    <path
      d="M3.13973 29.3762L7.81041 20.3278L13.2483 28.1495L3.13973 29.3762Z"
      fill="#09B4A1"
    />
  </svg>
)

export const DeleteIconBtn = ({ _delete}) =>(
  <svg onClick={_delete} width="29" height="22" viewBox="0 0 39 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 10H38L31.2131 42H9.37705L2 10Z" fill="#F80000" />
    <line x1="-1.31134e-07" y1="6.5" x2="39" y2="6.5" stroke="#F80000" stroke-width="3" />
    <line x1="10" y1="1.5" x2="29" y2="1.5" stroke="#F80000" stroke-width="3" />
  </svg>

)


export const NotifyBtn = ({fill}) =>(

<svg width="22" height="27" viewBox="0 0 32 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
 d="M13.7168 2.28619C13.7168 2.28619 14.2187 -0.160387 16.0587 0.00834273C17.8988 0.177072 18.4006 2.28619 18.4006 2.28619V3.88912C18.4006 3.88912 27.2664 5.28114 27.5173 15.0253C27.7683 24.7694 32.5357 25.7396 31.9502 28.0174C31.3647 30.2953 29.8592 29.7891 29.8592 29.7891L2.25826 30C2.25826 30 0 29.8735 0 27.8065C0 25.7396 4.93472 23.7148 4.6838 15.0253C4.76744 5.32332 13.7168 3.88912 13.7168 3.88912V2.28619Z"
  fill={fill}/>
<path d="M11 32H21C21 32 20.3488 37.0464 15.8837 36.9997C11.4186 36.953 11 32 11 32Z" fill={fill}/>
</svg>

)


export const HeartBtn = (props) => {
  const [like, setLike] = useState(false)
  const handle = () => setLike(!like)
  const color =  like ? "#09B4A1": "none";
  return (
    <svg onClick={handle} width="31" height="26" viewBox="0 0 41 36"
     fill={color} xmlns="http://www.w3.org/2000/svg">
     <path
      d="M20.3049 34.9903C19.2388 34.5098 15.907 31.0593 15.907 31.0593L4.09053 18.8294C4.09053 18.8294 -3.15047 9.83178 4.53475 3.36744C12.22 -3.0969 20.4382 5.72605 20.4382 5.72605C20.4382 5.72605 28.1678 -3.00955 36.0751 3.54215C43.9824 10.0938 37.4966 17.9559 37.4966 17.9559C37.4966 17.9559 21.3711 35.4708 20.3049 34.9903Z"
       stroke="#09B4A1" strokeWidth="2"/>
  </svg>

  )
}