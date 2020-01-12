 
import styled, { css } from "styled-components";
 
 
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
         border: 1px solid #ccc;
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
    padding: 0px;
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


