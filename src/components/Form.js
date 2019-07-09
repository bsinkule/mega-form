import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Field } from "formik";
import MaskedInput from "react-text-mask";
import styled from "styled-components";
import * as Yup from "yup";
import IconEyeShow from "../static/images/eye-show.png";
import IconEyeHide from "../static/images/eye-hide.png";

const phoneValid = /^[^_]*$/;
const zipCode = /^[0-9]{5}(?:-[0-9]{4})?$/;
const dateMatch = /(0\d{1}|1[0-2])-([0-2]\d{1}|3[0-1])-(19|20)\d{2}/;
const email = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const validation = Yup.object().shape({
  megaOption: Yup.string()
    .test(
      "mega option",
      "Please choose an option",
      value => value !== "Choose an option"
    )
    .required("Required"),
  purchaseDate: Yup.string()
    .matches(dateMatch, {
      message: "Please enter a valid date",
      excludeEmptyString: true
    })
    .required("Purchase date is required"),
  comments: Yup.string(),
  email: Yup.string()
    .matches(email, {
      message: "Make sure email is formatted properly",
      excludeEmptyString: true
    })
    .required("Email is required")
    .email(),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Must be at least 8 characters"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string()
    .test(
      "state",
      "Required",
      value => value !== "Choose a State"
    )
    .required("Required"),
  zipCode: Yup.string()
    .matches(zipCode, { message: "Invalid zip code", excludeEmptyString: true })
    .required("Required"),
  phoneNumber: Yup.string()
    .matches(phoneValid, {
      message: "Invalid phone number",
      excludeEmptyString: true
    })
    .required("Phone number is required"),
  gender: Yup.string().required("Please select a gender"),
  promoCode: Yup.string(),
  terms: Yup.bool()
    .test("terms", "You must agree to terms", value => value !== false)
    .required("Required"),
});

class MegaForm extends Component {
  state = {
    submitBool: false,
    errorBool: false,
    errorMessage: "",
    passwordToggle: true,
    errorRadio: false,
    radioValue: "",
    promoSuccess: false,
  };

  getInitialValues(inputs) {
    const initialValues = {};
    inputs.forEach(field => {
      if (!initialValues[field]) {
        initialValues[field] = "";
      }
    });
    return initialValues;
  }

  render() {
    const valuesFromValidation = Object.keys(validation.fields);
    const initialValues = this.getInitialValues(valuesFromValidation);
    return (
      <MainWrapper>
        <div className="text-step">STEP 1 OF 1</div>
        <div className="text-title">MEGA FORM</div>
        <div className="text-instruction">
          Mega Form provides examples of the most common form inputs, built with 
          React, Formik, Yup and Styled-Components. The form has input validation, 
          is responsive and works across different browsers.
        </div>

        <Formik
          onSubmit={(values, { resetForm }) => {
            values["gender"] = this.state.radioValue;
            if (values["gender"] === "") {
              this.setState({ errorRadio: true });
              return;
            }
            const upperCaseState = values["state"].toUpperCase();
            values["state"] = upperCaseState;
            const removePhoneNonNumbers = values["phoneNumber"].replace(/[^\d]/g, "");
            values["phoneNumber"] = removePhoneNonNumbers;
            delete values["terms"];
            // POST FUNCTION GOES HERE:::: this.postWarranty(values, event, resetForm, initialValues);
            resetForm(initialValues);
            this.setState({ submitBool: true });
            setTimeout(() => {
              this.setState({
                submitBool: false,
                errorBool: false,
                radioValue: "",
              });
              // ROUTE TO NEXT PAGE:::::: this.props.history.push("/registration/five"), THIS AND ABOVE PRY LIVES IN POST FUNCTION;
            }, 3000);
          }}
          validationSchema={validation}
          initialValues={initialValues}
          render={form => {
            return (
              <div>
                <form
                  className="form"
                  onSubmit={form.handleSubmit}
                  autoComplete="on"
                >
                  <SelectStyle>
                    <label className="select-label">MEGA OPTION</label>
                    <div>
                      <Field
                        name="megaOption"
                        render={props => {
                          const { field } = props;
                          const { errors, touched } = props.form;
                          const hasError =
                            errors["megaOption"] && touched["megaOption"]
                              ? "select--error"
                              : "select--input";
                          let defaultOption = (
                            <option key="default" value="Choose an option">
                              Choose an option
                            </option>
                          );
                          const optionsArray = ["tiny", "small", "shmedium", "medium", "marge", "large", "mega"]
                          const options = optionsArray.map((i, index) => {
                            return (
                              <option
                                key={index}
                                value={i}
                                // DISABLE IF LIST NEEDS CATEGORIZED:::: disabled={"if something" ? "something" : null}
                              >
                                {" "}{i}{" "}
                              </option>
                            );
                          });
                          const selectOptions = [defaultOption, ...options];
                          return (
                            <div className="drop-down">
                              {touched["megaOption"] ? (
                                <div className="text-message">{errors["megaOption"]}</div>
                              ) : (
                                <div className="text-message" />
                              )}
                              <select value={field.value} {...field} className={hasError}>
                                {selectOptions}
                              </select>
                            </div>
                          );
                        }}
                      />
                    </div>
                  </SelectStyle>
                  <InputStyle>
                    <label className="input-label">PURCHASE DATE (MM-DD-YYYY)</label>
                    <div>
                      <Field
                        name="purchaseDate"
                        render={props => {
                          const { field } = props;
                          const { errors, touched } = props.form;
                          const hasError =
                            errors["purchaseDate"] && touched["purchaseDate"]
                              ? "has-error"
                              : "input";
                          // NEED THE BELOW IF RADIO BUTTON LOGIC ISN'T BEING USED::::: 
                          // !Object.keys(props.form.errors).length && this.state.errorBool ? this.setState({ errorBool: false }) : null;
                          return (
                            <div className="input-parent">
                              {touched["purchaseDate"] ? (
                                <div className="text-message">{errors["purchaseDate"]}</div>
                              ) : (
                                <div className="text-message" />
                              )}
                                <MaskedInput
                                  {...field}
                                  className={hasError}
                                  type="input"
                                  autoComplete="off"
                                  mask={[/[0-1]/, /\d/, "-", /[0-3]/, /\d/, "-", /[1-2]/, /[9|0]/, /\d/, /\d/]}
                                />
                            </div>
                          );
                        }}
                      />
                    </div>
                  </InputStyle>
                  <InputStyle>
                    <label className="input-label">COMMENTS</label>
                    <div>
                      <Field
                        name="comments"
                        render={props => {
                          const { field } = props;
                          const { errors, touched } = props.form;
                          const hasError =
                            errors["comments"] && touched["comments"]
                              ? "textarea-error"
                              : "textarea";
                          // NEED THE BELOW IF RADIO BUTTON LOGIC ISN'T BEING USED::::: 
                          // !Object.keys(props.form.errors).length && this.state.errorBool ? this.setState({ errorBool: false }) : null;
                          return (
                            <div className="input-parent">
                              {touched["comments"] ? (
                                <div className="text-message">{errors["comments"]}</div>
                              ) : (
                                <div className="text-message" />
                              )}
                                <textarea
                                  {...field}
                                  className={hasError}
                                  type="textarea"
                                  autoComplete="off"
                                />
                            </div>
                          );
                        }}
                      />
                    </div>
                  </InputStyle>
                  <InputStyle>
                    <label className="input-label">EMAIL</label>
                    <div>
                      <Field
                        name="email"
                        render={props => {
                          const { field } = props;
                          const { errors, touched } = props.form;
                          const hasError =
                            errors["email"] && touched["email"]
                              ? "has-error"
                              : "input";
                          // NEED THE BELOW IF RADIO BUTTON LOGIC ISN'T BEING USED::::: 
                          // !Object.keys(props.form.errors).length && this.state.errorBool ? this.setState({ errorBool: false }) : null;
                          return (
                            <div className="input-parent">
                              {touched["email"] ? (
                                <div className="text-message">{errors["email"]}</div>
                              ) : (
                                <div className="text-message" />
                              )}
                                <input
                                  {...field}
                                  className={hasError}
                                  type="input"
                                  autoComplete="on"
                                />
                            </div>
                          );
                        }}
                      />
                    </div>
                  </InputStyle>
                  <InputStyle>
                    <label className="input-label">PASSWORD</label>
                    <div>
                      <Field
                        name="password"
                        render={props => {
                          const { field } = props;
                          const { errors, touched } = props.form;
                          const hasError =
                            errors["password"] && touched["password"]
                              ? "has-error"
                              : "input";
                          // NEED THE BELOW IF RADIO BUTTON LOGIC ISN'T BEING USED::::: 
                          // !Object.keys(props.form.errors).length && this.state.errorBool ? this.setState({ errorBool: false }) : null;
                          return (
                            <div className="input-parent">
                              {touched["password"] ? (
                                <div className="text-message">{errors["password"]}</div>
                              ) : (
                                <div className="text-message" />
                              )}
                                <input
                                  {...field}
                                  className={hasError}
                                  type={this.state.passwordToggle ? "password" : "input"}
                                  autoComplete="new-password"
                                />
                                <img
                                  src={this.state.passwordToggle ? IconEyeHide : IconEyeShow}
                                  className="toggle-password"
                                  onClick={() =>
                                    this.setState({
                                      passwordToggle: !this.state.passwordToggle
                                    })
                                  }
                                />
                            </div>
                          );
                        }}
                      />
                    </div>
                  </InputStyle>
                  <InputStyle>
                    <label className="input-label">ADDRESS</label>
                    <div>
                      <Field
                        name="address"
                        render={props => {
                          const { field } = props;
                          const { errors, touched } = props.form;
                          const hasError =
                            errors["address"] && touched["address"]
                              ? "has-error"
                              : "input";
                          // NEED THE BELOW IF RADIO BUTTON LOGIC ISN'T BEING USED::::: 
                          // !Object.keys(props.form.errors).length && this.state.errorBool ? this.setState({ errorBool: false }) : null;
                          return (
                            <div className="input-parent">
                              {touched["address"] ? (
                                <div className="text-message">{errors["address"]}</div>
                              ) : (
                                <div className="text-message" />
                              )}
                                <input
                                  {...field}
                                  className={hasError}
                                  type="input"
                                  autoComplete="on"
                                />
                            </div>
                          );
                        }}
                      />
                    </div>
                  </InputStyle>
                  <InputStyle>
                    <label className="input-label">CITY</label>
                    <div>
                      <Field
                        name="city"
                        render={props => {
                          const { field } = props;
                          const { errors, touched } = props.form;
                          const hasError =
                            errors["city"] && touched["city"]
                              ? "has-error"
                              : "input";
                          // NEED THE BELOW IF RADIO BUTTON LOGIC ISN'T BEING USED::::: 
                          // !Object.keys(props.form.errors).length && this.state.errorBool ? this.setState({ errorBool: false }) : null;
                          return (
                            <div className="input-parent">
                              {touched["city"] ? (
                                <div className="text-message">{errors["city"]}</div>
                              ) : (
                                <div className="text-message" />
                              )}
                                <input
                                  {...field}
                                  className={hasError}
                                  type="input"
                                  autoComplete="on"
                                />
                            </div>
                          );
                        }}
                      />
                    </div>
                  </InputStyle>
                  <SelectStyle>
                    <label className="select-label">STATE</label>
                    <div>
                      <Field
                        name="state"
                        render={props => {
                          const { field } = props;
                          const { errors, touched } = props.form;
                          const hasError =
                            errors["state"] && touched["state"]
                              ? "select--error"
                              : "select--input";
                          let defaultOption = (
                            <option key="default" value="Choose a State">

                            </option>
                          );
                          const optionsArray = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ]
                          const options = optionsArray.map((i, index) => {
                            return (
                              <option
                                key={index}
                                value={i}
                                // DISABLE IF LIST NEEDS CATEGORIZED:::: disabled={"if something" ? "something" : null}
                              >
                                {" "}{i}{" "}
                              </option>
                            );
                          });
                          const selectOptions = [defaultOption, ...options];
                          return (
                            <div className="drop-down">
                              {touched["state"] ? (
                                <div className="text-message">{errors["state"]}</div>
                              ) : (
                                <div className="text-message" />
                              )}
                              <select value={field.value} {...field} className={hasError}>
                                {selectOptions}
                              </select>
                            </div>
                          );
                        }}
                      />
                    </div>
                  </SelectStyle>
                  <InputStyle>
                    <label className="input-label">ZIP CODE</label>
                    <div>
                      <Field
                        name="zipCode"
                        render={props => {
                          const { field } = props;
                          const { errors, touched } = props.form;
                          const hasError =
                            errors["zipCode"] && touched["zipCode"]
                              ? "has-error"
                              : "input";
                          // NEED THE BELOW IF RADIO BUTTON LOGIC ISN'T BEING USED::::: 
                          // !Object.keys(props.form.errors).length && this.state.errorBool ? this.setState({ errorBool: false }) : null;
                          return (
                            <div className="input-parent">
                              {touched["zipCode"] ? (
                                <div className="text-message">{errors["zipCode"]}</div>
                              ) : (
                                <div className="text-message" />
                              )}
                                <input
                                  {...field}
                                  className={hasError}
                                  type="input"
                                  autoComplete="on"
                                />
                            </div>
                          );
                        }}
                      />
                    </div>
                  </InputStyle>
                  <InputStyle>
                    <label className="input-label">PHONE NUMBER</label>
                    <div>
                      <Field
                        name="phoneNumber"
                        render={props => {
                          const { field } = props;
                          const { errors, touched } = props.form;
                          const hasError =
                            errors["phoneNumber"] && touched["phoneNumber"]
                              ? "has-error"
                              : "input";
                          // NEED THE BELOW IF RADIO BUTTON LOGIC ISN'T BEING USED::::: 
                          // !Object.keys(props.form.errors).length && this.state.errorBool ? this.setState({ errorBool: false }) : null;
                          return (
                            <div className="input-parent">
                              {touched["phoneNumber"] ? (
                                <div className="text-message">{errors["phoneNumber"]}</div>
                              ) : (
                                <div className="text-message" />
                              )}
                                <MaskedInput
                                  {...field}
                                  className={hasError}
                                  type="input"
                                  autoComplete="on"
                                  mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
                                />
                            </div>
                          );
                        }}
                      />
                    </div>
                  </InputStyle>

                  <div className="radioField">
                    <label className="radio-label">ARE YOU</label>
                    <div>
                      <Field
                        name="gender"
                        render={props => {
                          const { field } = props;
                          const { touched, errors } = props.form;
                          this.state.radioValue ? (touched["gender"] = true) : false
                          // COMMENT line ABOVE AND UNCOMMENT ONE line BELOW IF YOU USE THE line 3 lines BELOW, THEN COMMENT 4th line below
                          // this.state.radioValue ? (touched["gender"] = true, delete errors["gender"]) : false
                          // NEED THE BELOW IF RADIO LOGIC ISN'T BEING USED::::: 
                          // !Object.keys(props.form.errors).length && this.state.errorBool ? this.setState({ errorBool: false }) : null;
                          Object.keys(props.form.errors).length === 1 && this.state.radioValue ? (delete errors["gender"], this.setState({ errorBool: false})) : null;
                          return (
                            <div>
                              {this.state.errorRadio ? (
                                <div className="eMessage">{errors["gender"]}</div>
                              ) : (
                                <div className="eMessage" />
                              )}
                              <input
                                hidden
                                {...field}
                                type="input"
                              />
                            </div>
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="genderButtonsContainer">
                    <button
                      className={
                        this.state.radioValue === "male"
                          ? "genderSelected"
                          : this.state.errorRadio
                          ? "error-radio"
                          : null
                      }
                      type="button"
                      onClick={() =>
                        this.setState({
                          radioValue: "male",
                          errorRadio: false
                        })
                      }
                    >
                      Male
                    </button>
                    <button
                      className={
                        this.state.radioValue === "female"
                          ? "genderSelected"
                          : this.state.errorRadio
                          ? "error-radio"
                          : null
                      }
                      type="button"
                      onClick={() =>
                        this.setState({
                          radioValue: "female",
                          errorRadio: false
                        })
                      }
                    >
                      Female
                    </button>
                    <button
                      className={
                        this.state.radioValue === "other"
                          ? "genderSelected"
                          : this.state.errorRadio
                          ? "error-radio"
                          : null
                      }
                      type="button"
                      onClick={() =>
                        this.setState({
                          radioValue: "other",
                          errorRadio: false
                        })
                      }
                    >
                      Other
                    </button>
                  </div>

                  <InputStyle>
                    <label className="inputLabel">
                      PROMO CODE
                      {/* BELOW: STUBBED IN FOR MESSAGE PLACEMENT */}
                      {this.state.promoSuccess 
                      ? <span
                        style={{
                          color: "green",
                          fontStyle: "italic",
                          fontSize: "12px",
                          marginLeft: "10px"
                        }}
                      >
                        Applied Successfully!
                      </span>
                      : null}
                    </label>
                    <div className="promo-field">
                      <Field
                        name="promoCode"
                        render={props => {
                          const {
                            field,
                            form: { errors, touched }
                          } = props;
                          const hasError =
                            errors["promoCode"] && touched["promoCode"]
                              ? "has-error"
                              : "input";
                          return (
                            <div className="input-parent">
                              {touched["promoCode"] ? (
                                <div className="text-message">
                                  {errors["promoCode"]}
                                </div>
                              ) : (
                                <div className="text-message" />
                              )}
                              <input
                                {...field}
                                className={hasError}
                                type="text"
                                placeholder=""
                                autoComplete="off"
                              />
                              <button
                                className="promo-btn-verify"
                                type="button"
                                // THE BELOW ONCLICK WOULD BE HOOKED UP TO A POST THAT CHECKED FOR A VALID PROMO CODE
                                onClick={() => this.setState({ promoSuccess: true })}
                              >
                                APPLY
                              </button>
                            </div>
                          );
                        }}
                      />
                    </div>
                  </InputStyle>

                  <CheckboxStyle>
                    <Field
                      name="terms"
                      render={props => {
                        const { field } = props;
                        const { errors, touched } = props.form;
                        return (
                          <div className="center-check">
                            {touched["terms"] ? (
                              <div className="error-message">
                                {errors["terms"]}
                              </div>
                            ) : null}
                            <div>
                              <input
                                name="terms"
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                {...field}
                              />
                              <label className="cb-label">
                                &nbsp;Check the box to accept our{" "}
                                <a
                                  className="text-terms--blue"
                                  href="https://www.freeprivacypolicy.com/blog/privacy-policy-url/"
                                  target="_blank"
                                >
                                  Privacy Policy & Terms.
                                </a>
                              </label>
                            </div>
                          </div>
                        );
                      }}
                    />
                  </CheckboxStyle>

                  {this.state.submitBool &&
                  <div className="success">
                    Mega Form Submitted Successfully!
                  </div>
                  }
                  {this.state.errorBool && 
                  <div className="error">
                    Please Resolve Form Errors
                  </div>
                  }
                  <div className="submit-btn-container">
                    <button 
                      type="submit" 
                      className="btn-submit"
                      onClick={() => {
                        console.log("FORM", form);  
                        this.setState({ 
                          errorBool: true,
                          errorRadio: 
                            this.state.radioValue === ""
                              ? true
                              : false
                        })
                      }}
                    >
                      SUBMIT MEGA
                    </button>
                  </div>
                </form>
              </div>
            );
          }}
        />
      </MainWrapper>
    );
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(MegaForm);

const SelectStyle = styled.div`
  width: 100%;
  padding: 0px 0px 30px 10px;
  color: white;

  .select-label {
    display: inline-block;
    width: 100%;
    opacity: 0.7;
  }

  .select--error {
    width: 100%;
    height: 55px;
    background-color: #2d0906;
    border-color: red;
    font-size: 1.3em;
    border: 1px solid red;
    color: white;
    margin-top: 3px;
  }

  .select--input {
    width: 100%;
    height: 55px;
    background-color: rgb(37, 39, 39);
    border: solid 1px #ffffff;
    font-size: 1.3em;
    color: white;
    margin-top: 3px;
  }

  .drop-down {
    position: relative;
  }

  .text-message {
    color: red;
    text-align: center;
    height: 14px;
  }
`;

const CheckboxStyle = styled.div`
  width: 100%;

  .center-check {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px 0px;
  }

  .cb-label {
    font-size: 16px;
    text-align: center;
  }

  .text-terms--blue {
    color: rgb(255, 0, 255);
    text-decoration: none;
  }

  .error-message {
    padding: 2px;
    color: red;
    text-align: center;
  }
`;

const InputStyle = styled.div`
  width: 100%;
  padding: 0px 10px;

  .input-label {
    display: inline-block;
    width: 100%;
    opacity: 0.7;
  }

  .has-error {
    font-size: 1.3em;
    width: 100%;
    height: 50px;
    margin: 3px 0px 20px 0px;
    border: 1.5px solid red;
    border-radius: 5px;
    color: white;
    padding-left: 10px;
  }

  .textarea-error {
    font-size: 1.3em;
    width: 100%;
    height: 150px;
    margin: 3px 0px 20px 0px;
    border: 1.5px solid red;
    border-radius: 5px;
    color: white;
    padding-left: 10px;
  }

  .input {
    font-size: 1.3em;
    width: 100%;
    height: 50px;
    margin: 3px 0px 20px 0px;
    border: solid 1px #ffffff;
    border-radius: 5px;
    padding-left: 10px;
    color: white;
  }

  .textarea {
    font-size: 1.3em;
    width: 100%;
    height: 150px;
    margin: 3px 0px 20px 0px;
    border: solid 1px #ffffff;
    border-radius: 5px;
    padding-left: 10px;
    color: white;
  }

  .input-parent {
    position: relative;
    input:valid {
      background-color: rgb(37, 39, 39);
    }

    input:-webkit-autofill {
      -webkit-text-fill-color: white;
      -webkit-box-shadow: 0 0 0px 1000px rgb(27, 28, 28) inset;
    }
    input:-moz-autofill {
      -moz-text-fill-color: white;
      -moz-box-shadow: 0 0 0px 1000px rgb(27, 28, 28) inset;
    }
    input:-o-autofill {
      -o-text-fill-color: white;
      -o-box-shadow: 0 0 0px 1000px rgb(27, 28, 28) inset;
    }
    input:-khtml-autofill {
      -khtml-text-fill-color: white;
      -khtml-box-shadow: 0 0 0px 1000px rgb(27, 28, 28) inset;
    }
  }

  .text-message {
    color: red;
    text-align: center;
    height: 14px;
  }

  .toggle-password {
    position: absolute;
    right: 0;
    top: 37px;
    width: 30px;
    height: 20px;
  }
`;

const MainWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 25px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;

  .text-step {
    font-size: 13px;
    padding: 0px 0px 20px 0px;
  }

  .text-title {
    font-size: 30px;
    text-align: center;
  }

  .text-instruction {
    text-align: center;
    font-size: 18px;
    opacity: 0.7;
    padding: 30px 10px 40px 10px;
  }

  .success {
    background-color: green;
    color: white;
    padding: 15px;
    margin: 10px auto;
    border-radius: 10px;
    text-align: center;
  }

  .error {
    border: 2px solid red;
    background-color: #fde6e6;
    padding: 15px;
    margin: 10px auto;
    color: red;
    border-radius: 10px;
    font-weight: 600;
  }

  .btn-submit {
    margin: 30px auto;
    padding: 12px;
    cursor: pointer;
    min-height: 50px;
    background-color: rgb(255, 0, 255);
    width: 66%;
    color: white;
    font-size: 16px;
    border-radius: 5px;
    border: none;
  }

  .submit-btn-container {
    width: 100%; 
    display: flex; 
    justify-content: center;
  }

  .radioField {
    width: 100%;
    padding: 0px 10px;
  }

  .radio-label {
    display: inline-block;
    width: 100%;
    opacity: 0.7;
  }

  .genderButtonsContainer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 5px 0px 20px 10px;

    button {
      width: 30%;
      height: 50px;
      border-radius: 10px;
      border: solid 1px #ffffff;
      background-color: #1b1c1c;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }

    .genderSelected {
      background-color: rgba(255, 0, 255);
    }

    .error-radio {
      border: 1px solid red;
    }
  }

  .eMessage {
    color: red;
    text-align: center;
    height: 14px;
  }

  .form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    & ${InputStyle}:nth-child(13) {
      .promo-field {
        width: 100%;
        position: relative;
      }

      .promo-btn-verify {
        border: 1px solid rgba(51, 51, 51, 0.4);
        border-radius: 0px 4px 4px 0px;
        background-color: rgba(51, 51, 51, 0.4);
        height: 48px;
        width: 100px;
        color: white;
        margin-right: -10px;
        margin-top: 20px;
        font-size: 14px;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    & ${InputStyle}:nth-child(7) {
      width: 45%;
    }
    & ${SelectStyle}:nth-child(8) {
      width: 20%;
    }
    & ${InputStyle}:nth-child(9) {
      width: 20%;
    }
  }

  @media screen and (max-width: 600px) {
    .form {
      & ${InputStyle}:nth-child(7) {
        width: 100%;
      }
      & ${SelectStyle}:nth-child(8) {
        width: 45%;
      }
      & ${InputStyle}:nth-child(9) {
        width: 45%;
      }
    }
  }
`;
