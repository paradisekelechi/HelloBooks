/*
 * Simple Middleware to set a variable in request.
* */
export default (request, response, next) => {
  /*
     * Do something to REQUEST or RESPONSE
    * */

  if (!request.didSomething) {
    request.didSomething = true;
    next();
  } else {
    // Something went wrong, throw and error
    const error = new Error();
    error.message = 'Error doing what this does';
    next(error);
  }
};
