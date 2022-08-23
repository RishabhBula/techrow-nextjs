import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Button, Row, Col } from "react-bootstrap";
import { InputBox } from "../../../utils/formUtils";
import validator from "../../../utils/validator";
import styles from "./ContactUs.module.scss";
import Texts from "../../../constants/staticText";
import {pushNotification} from '../../../utils/notifications';
import _ from 'lodash';

const ContactUs = ({contactContent }) => {
  const [error, setErrors] = useState({});
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    organizationName: "",
    workEmail: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { firstName, lastName, organizationName, workEmail, message } =
    userData || {};
  const handleInputChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
    setErrors({ ...error, [name]: null });
  };

  const validateOnBlur = (name) => {
    const { errors } = _isValid(name);
    setErrors({ ...error, [name]: errors[name] });
  };

  // For profile form validation
  const _isValid = (field = null) => {
    const list = {
      firstName: ["minLength|2"],
      lastName: ["minLength|2"],
      organizationName: ["minLength|2"],
      workEmail: ["minLength|2"],
      message: ["minLength|2"],
    };
    const validate = validator.createValidator(
      list,
      {
        firstName: firstName,
        lastName: lastName,
        organizationName: organizationName,
        workEmail: workEmail,
        message: message,
      },
      field,
      {
        firstName: "",
        lastName: "",
        organizationName: "",
        workEmail: "",
        message: "",
      }
    );
    return validate;
  };

  const handleSubmitForm = () => {
    const { isValid } = _isValid();
    if (isValid) {
      // Send data to Salesforce
      webToCase();
    } else {
      const { errors } = isValid;
      setErrors({ ...errors, email: error.email });
    }
  };

  const webToCase = () => {
    setIsLoading(true)
    const requestOptions = {
      method: "POST",
      mode: "no-cors",
    };
    fetch(
      `https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&oid=${Texts.SALESFORCE_OID}&first_name=${firstName}&last_name=${lastName}&organization_name=${organizationName}&work_email=${workEmail}&message=${message}`,
      requestOptions
    )
      .then((response) =>
      {
        setUserData({
          firstName: "",
          lastName: "",
          organizationName: "",
          workEmail: "",
          message: "",
        })
        pushNotification('Contact details have been added successfully', 'success', 'TOP_CENTER', 3000)
      }
      )
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
      setIsLoading(false)
  };

  const isDisabled =  !firstName ||
  !lastName ||
  !organizationName ||
  !workEmail ||
  !message

  const renderContactUsForm = () => {
    return (
      <div>
        <Row className={styles.FormRow}>
          <Col xs={12} sm={6}>
            <InputBox
              errorMessage={error.firstName}
              label={"First Name"}
              placeholder={"First Name"}
              size="lg"
              type={"text"}
              name={"firstName"}
              value={firstName}
              onChange={(name) =>
                handleInputChange(
                  "firstName",
                  name.trimStart().replace(/[^A-Za-z]/gi, "")
                )
              }
              onBlur={(e) => validateOnBlur(e.target.name)}
              className={`${styles.FormControl} required-field`}
            />
          </Col>
          <Col xs={12} sm={6}>
            <InputBox
              errorMessage={error.lastName}
              label={"Last Name"}
              placeholder={"Last Name"}
              type={"text"}
              name={"lastName"}
              size="lg"
              value={lastName}
              onChange={(name) =>
                handleInputChange(
                  "lastName",
                  name.trimStart().replace(/[^A-Za-z]/gi, "")
                )
              }
              onBlur={(e) => validateOnBlur(e.target.name)}
              className={`${styles.FormControl} required-field`}
            />
          </Col>
        </Row>
        <Row className={styles.FormRow}>
          <Col xs={12} sm={6}>
            <InputBox
              errorMessage={error.organizationName}
              label={"Organization Name"}
              placeholder={"Organization Name"}
              type={"text"}
              name={"organizationName"}
              value={organizationName}
              size="lg"
              onChange={(name) =>
                handleInputChange("organizationName", name.trimStart())
              }
              onBlur={(e) => validateOnBlur(e.target.name)}
              className={`${styles.FormControl} required-field`}
            />
          </Col>
          <Col xs={12} sm={6}>
            <InputBox
              errorMessage={error.workEmail}
              label={"Work Email"}
              placeholder={"Work Email"}
              type={"text"}
              name={"workEmail"}
              size="lg"
              value={workEmail}
              onChange={(name) =>
                handleInputChange("workEmail", name.trimStart())
              }
              onBlur={(e) => validateOnBlur(e.target.name)}
              className={`${styles.FormControl} required-field`}
            />
          </Col>
        </Row>
        <InputBox
          errorMessage={error.message}
          label={"Message"}
          placeholder={"Message"}
          type={"textarea"}
          name={"message"}
          size="lg"
          rows={3}
          value={message}
          onChange={(name) => handleInputChange("message", name.trimStart())}
          onBlur={(e) => validateOnBlur(e.target.name)}
          className={`${styles.FormControl} required-field`}
        />
        <Button
          variant="primary"
          className="btn-block mt-4"
          onClick={handleSubmitForm}
          disabled={isDisabled || isLoading}
        >
         {isLoading ? 'SUBMITTING'  : 'SUBMIT'}
        </Button>
        <h5 className="contact-required-text">All fields are required</h5>
      </div>
    );
  };

  if(!contactContent){
    return (<></>);
  }

  return (
    <Fragment>
      <div className={styles.ContactUsWrapper} id="contact-us-form">
        <Row className={styles.ContentSection}>
          <Col xs={12} lg={5} className={styles.ContactUsDetail}>
            <div>
              <h1 className="text-secondary">
                {_.get(contactContent, 'connectHeadline')}
              </h1>
              <h5 className="sub-title">
                {_.get(contactContent, 'connectToutText')}
              </h5>
            </div>
          </Col>

          <Col xs={12} lg={7} className={styles.ContactForm}>
            {renderContactUsForm()}
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

ContactUs.propTypes = {
  children: PropTypes.any,
};

export default ContactUs;
