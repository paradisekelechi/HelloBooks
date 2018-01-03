const Alert = (alertType, alertMessage, callback) => {
  Materialize.toast(
    alertMessage,
    6000,
    `${alertType !== 'error' ? 'blue' : 'red'} rounded`, () => {
      callback();
    }
  );
};

export default Alert;
