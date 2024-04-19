import strings from '../i18n/strings';

// regex for phone number
const phoneNumberRegex = /^[0-9]{10}$/;

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex = /^(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z]).{1,}$/;

const nameRegex = /^([\w]{1,})+([\w\s]{0,})+$/i;

// regex for atm card number
const atmCardNumberRegex = /^[0-9]{16}$/;

// regex for expiry date
const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
// regex for cvv
const cvvRegex = /^[0-9]{3}$/;

// Phone Number validation
const validatePhoneNumber = phoneNumber => {
  if (!phoneNumber) {
    return {
      status: false,
      msg: strings.thisFieldIsMandatory,
    };
  } else {
    return phoneNumberRegex.test(phoneNumber)
      ? {status: true, msg: ''}
      : {
          status: false,
          msg: strings.validPhoneNumber,
        };
  }
};

// Name validation
const validateName = name => {
  if (!name) {
    return {
      status: false,
      msg: strings.thisFieldIsMandatory,
    };
  } else {
    return nameRegex.test(name)
      ? {status: true, msg: ''}
      : {
          status: false,
          msg: strings.validName,
        };
  }
};

// ATM card number validation
const validateCardNumber = atmCardNumber => {
  if (!atmCardNumber) {
    return {
      status: false,
      msg: strings.thisFieldIsMandatory,
    };
  } else {
    return atmCardNumberRegex.test(atmCardNumber)
      ? {status: true, msg: ''}
      : {
          status: false,
          msg: strings.validCardNumber,
        };
  }
};

// CVV validation
const validateCvv = cvv => {
  if (!cvv) {
    return {
      status: false,
      msg: strings.thisFieldIsMandatory,
    };
  } else {
    return cvvRegex.test(cvv)
      ? {status: true, msg: ''}
      : {
          status: false,
          msg: strings.validCvv,
        };
  }
};

// Expiry date validation
const validateExpiryDate = expiryDate => {
  if (!expiryDate) {
    return {
      status: false,
      msg: strings.thisFieldIsMandatory,
    };
  } else {
    return expiryDateRegex.test(expiryDate)
      ? {status: true, msg: ''}
      : {
          status: false,
          msg: strings.validExpiryDate,
        };
  }
};

//Email validation
const validateEmail = email => {
  if (!email) {
    return {
      status: false,
      msg: strings.thisFieldIsMandatory,
    };
  } else {
    return emailRegex.test(email)
      ? {status: true, msg: ''}
      : {
          status: false,
          msg: strings.validEmail,
        };
  }
};

//Password validation
const validatePassword = (pass, isConfrimPass, password) => {
  if (!pass) {
    return {
      status: false,
      msg: strings.plsEnterPassword,
    };
  } else if (pass.length < 8) {
    return {
      status: false,
      msg: strings.validatePassword,
    };
  } else {
    if (passwordRegex.test(pass)) {
      if (isConfrimPass && password != pass) {
        return {
          status: false,
          msg: strings.confirmPassValidString,
        };
      }
      return {status: true, msg: ''};
    } else {
      return {
        status: false,
        msg: strings.validatePassword,
      };
    }
  }
};

// confirm password validation
const validateConfirmPassword = (pass, password) => {
  if (!pass) {
    return {
      status: false,
      msg: strings.plsEnterPassword,
    };
  } else if (pass.length < 8) {
    return {
      status: false,
      msg: strings.validatePassword,
    };
  } else {
    if (passwordRegex.test(pass)) {
      if (password != pass) {
        return {
          status: false,
          msg: strings.confirmPassValidString,
        };
      }
      return {status: true, msg: ''};
    } else {
      return {
        status: false,
        msg: strings.validatePassword,
      };
    }
  }
};

export {
  validatePhoneNumber,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateCardNumber,
  validateCvv,
  validateExpiryDate,
};
