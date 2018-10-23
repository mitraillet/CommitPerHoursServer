const { expect } = require('chai');
const throttleToDo = require('../worker.js');

describe('my worker js', () => {
  it('should return true', () => {
    expect(throttleToDo.throttleToDo('EPHEC-Enovatech', 'sensorygarden-api')).to.equal(true);
  });
});
