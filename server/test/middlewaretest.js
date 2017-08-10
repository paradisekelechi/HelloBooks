import checkuser  from '../server/helper/checkuser'; // the Middleware you want to test
import httpMocks from 'node-mocks-http'; // quickly sets up REQUEST and RESPONSE to be passed into Express Middleware
import jwt from 'jsonwebtoken';
let request = {}; 
let response = {}; 

describe('Middleware test', function(){
    context('Valid arguments are passed', function() {
        beforeEach((done) => {
            
            request = httpMocks.createRequest({
                body: {
                    
                }
                
            });
            response = httpMocks.createResponse();
            
            done(); // call done so that the next test can run
        });
        
        it('does something', function(done) {
            /*
             * Middleware expects to be passed 3 arguments: request, response, and next.
             * We are going to be manually passing REQUEST and RESPONSE into the middleware
             * and create an function callback for next in which we run our tests
            **/
            checkuser(request, response, function next(error) {
                /*
                 * Usually, we do not pass anything into next except for errors, so because
                 * in this test we are passing valid data in REQUEST we should not get an 
                 * error to be passed in.
                **/
                if (error) { throw new Error('Expected not to receive an error'); }
                
                // Other Tests Against request and response
                if (!request.didSomething) { throw new Error('Expected something to be done'); }

                
                
                done(); // call done so we can run the next test
            }); // close middleware
        }); // close it
    }); // close context
}); // close describe