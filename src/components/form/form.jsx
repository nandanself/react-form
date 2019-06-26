import React, { Component } from "react";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: {
        isNameError: false,
        isPhoneError: false
      }
    };
  }

  validateName = name => {
    return ( /^[A-Za-z ]{5}$/.test(name) ? false : true);
  };

  validatePhone = phone => {
    return (/^[789]\d{9}$/.test(phone) ? false : true);
  };

  handleBlur = refName => {
    let { formError } = this.state;
    let refValue = this.refs[refName].value;
    switch (refName) {
      case "myName":
            formError.isNameError = (refValue && this.validateName(refValue));
        break;

      case "myPhone":
            formError.isPhoneError = (refValue && this.validatePhone(refValue));
        break;
    }
    this.setState({ formError });
  };

  onSubmit = () => {
    let { formError } = this.state;
    let name = this.refs.myName.value;
    let phone = this.refs.myPhone.value;
    formError.isNameError = (name && this.validateName(name));
    formError.isPhoneError = (phone && this.validatePhone(phone));
    this.setState({formError});
  };

  render() {
    let {
      formError: { isNameError, isPhoneError }
    } = this.state;
    return (
      <div className="form">
        <input
          placeholder="name"
          ref="myName"
          onBlur={() => this.handleBlur("myName")}
        />
        {isNameError ? <p className="error">Invalid name</p> : null}
        <input
          placeholder="phone"
          ref="myPhone"
          onBlur={() => this.handleBlur("myPhone")}
        />
        {isPhoneError ? <p className="error">Invalid Phone number</p> : null}

        <button onClick={this.onSubmit}>Submit</button>
      </div>
    );
  }
}
