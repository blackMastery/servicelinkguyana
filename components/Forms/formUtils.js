import React from 'react';
import { Formik, useField, Form, useFormik } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Container, FormControl, FormLabel } from 'react-bootstrap';
import { SaveBtn } from "../../components/utils";











export const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
        <FormControl {...field} {...props} />
        {meta.touched && meta.error ? (
          <div>{meta.error}</div>
        ) : null}
      </>
    );
  };




export const AvailableForm = (props) => {
    console.log(props, "AvailableForm")
      const options = [
        "More than 30 hr/week",
        "Less than 30hrs/week",
        "As needed - open to offer"
    ];
      return (
          <Formik
          initialValues ={{
            availability: '',
          }}
          validationSchema={ Yup.object({
            availability: Yup.string()
              .oneOf(
                  options,
                  'Invalid  Type'
              )
              .required('Required')
      
          })}
          onSubmit= {(values, { setSubmitting }) => {
               console.log(values)
               const {user,_updateUser} = props;
               _updateUser(user._id, user.token, values)
               props.closeModal()  
          }}
  
          >
              <Form>
                <Container>
  
                  <Row className="mt-3">
                    <Col md={6}>
                      <p>
                      Are you available to take on new work? Knowing when you are 
                      available helps Service Link Guyana find the right jobs for you
                      </p>
                    </Col>
  
                    <Col md={6}>
                          <MySelect as="select" label="Select Your Availability!" name="availability">
                              { 
                              options.map((opt,idx) => <option key={idx} value={opt} >{opt}</option>)
                            }
                        </MySelect> 
                      </Col>
                  </Row>
  
                  <Row className="mt-3" >
                    <Col>
                      <SaveBtn className="ml-auto" variant="primary" type="submit">Save</SaveBtn>
                    </Col>
                  </Row>
              </Container>
         
              </Form>
  
          </Formik>
  
      )
  }
  


const TextFeild = ({ label, ...props }) =>{
  const [field, meta] = useField(props);
  return (
      <>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <FormControl  {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}



 export  const RateForm = (props) => {


    return (
      <Formik
      
      initialValues ={{
        rate: 0,
      }}
      validationSchema={ Yup.object({
        rate: Yup.number().required('Required'),
  
      })}
      onSubmit= {(values, { setSubmitting }) => {
           console.log(values)
           const {user,_updateUser} = props;
           _updateUser(user._id, user.token, values)
           props.closeModal()  
      }}
      >
        <Form>
          <Container>
                 <Row>
                   <Col>
                      <TextFeild 
                      as='input'
                      type='number'
                      label="Rates"
                      name='rate'

                      />
                   </Col>
                 </Row> 


                <Row className="mt-3" >
                    <Col>
                      <SaveBtn className="ml-auto" variant="primary" type="submit">Save</SaveBtn>
                    </Col>
              </Row>       
          </Container>
        </Form>
      </Formik>
    )
  }



