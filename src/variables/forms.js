export const Login = {
  email: {
    elementType: "input",
    elementConfig: {
      type: "email",
      id: "Login",
      placeholder: "Your Email",
    },
    value: null,
    icon: "email",
    validation: {
      required: true,
      isEmail: true,
    },
    valid: false,
    touched: false,
  },

  password: {
    elementType: "input",
    elementConfig: {
      type: "password",
      placeholder: "Your Password",
      id: "LoginPass",
    },
    value: null,
    icon: "lock",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
};

export const ResetPassword = {
  token: {
    elementType: "input",
    elementConfig: {
      type: "text",
      id: "PassCheck",
      placeholder: "Paste the Token Here",
    },
    value: null,
    icon: "key",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },

  password: {
    elementType: "input",
    elementConfig: {
      type: "password",
      placeholder: "Your Password",
      id: "SignUpPass",
    },
    value: null,
    icon: "lock",
    validation: {
      required: true,
      minLength: 8,
    },
    valid: false,
    touched: false,
  },

  passwordConfirm: {
    elementType: "input",
    elementConfig: {
      type: "password",
      placeholder: "Confirm Your Password",
      id: "SignUpPassConfirm",
    },
    value: null,
    icon: "lockFill",
    validation: {
      required: true,
      minLength: 8,
      same: true,
    },
    valid: false,
    touched: false,
  },
};

export const ForgotPassword = {
  email: {
    elementType: "input",
    elementConfig: {
      type: "email",
      id: "ForgotEmail",
      placeholder: "Your Email",
    },
    value: null,
    icon: "email",
    validation: {
      required: true,
      isEmail: true,
    },
    valid: false,
    touched: false,
  },
};
