import React, { useState } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { updateUser } from "../../actions/action";



function WithEditingModel (Comp, Modal) {

  return  class HOCOMP extends React.Component {
        
        constructor(props) {
        super(props);
         this.state = {
             show: false
         };
         
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



      render(){
          return (<> 
             <Comp  
             handler={this.showModal} 
             {...this.props} 
             />

             <Modal
              closeModal={this.closeModal}
              show={this.state.show}
              title={this.props.title}
              {...this.props}
             />
            </>
            

          )
      }
}

}


export default WithEditingModel


// export default WithEditingModel;

