/**
 * Alert Function
 *
 * @param {String} alertType
 * @param {String} alertMessage
 * @param {Object} callback
 * @returns {void}
 */
const Alert = (alertType, alertMessage, callback) => {
  if (callback) {
    Materialize.toast(
      alertMessage,
      6000,
      `${alertType !== 'error' ? 'blue' : 'red'} rounded`,
    );
  } else {
    Materialize.toast(
      alertMessage,
      6000,
      `${alertType !== 'error' ? 'blue' : 'red'} rounded`,
    );
  }
};

export default Alert;
