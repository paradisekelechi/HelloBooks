import chai from 'chai';
import logger from '../../tools/Logger';

const {
  assert
} = chai;

describe('Logger test', () => {
  it('should be able to log file', (done) => {
    const message = 'Test Logging';
    const level = 'info';
    const loggerResult = logger(level, message);
    assert.exists(loggerResult.isLogged);
    assert.exists(loggerResult.message);
    assert.exists(loggerResult.level);
    assert.equal(loggerResult.isLogged, true);
    assert.equal(loggerResult.message, message);
    assert.equal(loggerResult.level, level);
    done();
  });
});
