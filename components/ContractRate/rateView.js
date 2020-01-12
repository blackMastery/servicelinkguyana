import React, { useState } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { chargingRate, est_action, cover_letter } from '../../actions/action'

import { Formik } from "formik";
import * as Yup from "yup";



import { SelectComp, CoverLetter, Rate } from '../../components/Forms/formUtils'

const RateField = (props) => {
  const {saveRate} = props;

  return (
    <Formik
      onSubmit={(values) => {
        console.log(values);
        saveRate(values.rate)
      }}
      onBlur={(values) => {
        console.log(values);
        // handleSubmit(values);
      }}
      validationSchema={Yup.object({
        rate: Yup.number().required('Required'),

        })}
      initialValues={{
        rate: 0,
      }}
    >
     {formik => (
        <Form onSubmit={formik.handleSubmit}>
          <span>{formik.errors.rate}</span>

          <Form.Group controlId="formBasicEmail">
            <Form.Control 
              isInvalid={formik.errors.rate}
              isValid={!formik.errors.rate}
              placeholder="$" name="rate"
              {...formik.getFieldProps("rate")}

            />
          </Form.Group>
        </Form>

     )}

    </Formik>
  )
}



const RateView = ( props ) => {
  const [hourRate, setRate] = useState('');


    return (
      <Container>
        <Row>
          <style jsx>{`
            .rateState {
              font-style: normal;
              font-weight: normal;
              font-size: 24px;
              line-height: 28px;
              text-transform: capitalize;
              color: #000000;
              margin-top: 34px;
              margin-bottom: 12px;
            }

            .myrate {
              font-weight: normal;
              font-size: 12px;
              line-height: 28px;
              text-transform: capitalize;
              color: #000000;
            }
          `}</style>
          <Col>
            <h3 className="rateState">
              What is the rate you'd like to bid for this job?
            </h3>
            <p className="myrate">Your profile rate: $25.00/ per day</p>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <p>Total amount the client will see on your proposal</p>
          </Col>
          <Col md={6}>
            <Rate />
          </Col>
        </Row>

        <hr />
        <Row>
          <Col md={6}>
            <p>Service Link Guyana fee (no fee)</p>
          </Col>
          <Col md={3}>
            <strong>$0</strong>
          </Col>
          <Col md={3}></Col>
        </Row>
        <hr />

      </Container>
    );

}


const mapStateToProps = (state) => ({


})

const mapDispatchToProps = (dispatch) =>({
  saveRate: bindActionCreators(chargingRate,dispatch),
  saveEst: bindActionCreators(est_action, dispatch)
})


export default connect(null, mapDispatchToProps)(RateView)