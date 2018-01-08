/**
 *  @fileOverview Helper function that sets up and sends responses
 *
 *  @author Paradise Kelechi
 *
 */


const ResponseHandler = (req, res, status, success, message, payload, payloadName) => {
  const responseObject = {
    success,
    message
  };
  if (payload) {
    responseObject[payloadName] = payload;
  }
  res.status(status).send(responseObject);
};

export default ResponseHandler;
