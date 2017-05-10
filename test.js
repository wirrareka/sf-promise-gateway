const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
const gateway = require('./index');

chai.use(chaiAsPromised);

describe('Processing', () => {

  it("Should throw error without arguments", () => {
    expect(gateway).to.throw(Error, /Missing Items Argument/);
  });

  it("Should throw error without items", () => {
    expect(gateway).to.throw(Error, /Missing Items Argument/);
  });

  it("Should throw error without process function", () => {
    const init = () => {
      gateway([]);
    };
    expect(init).to.throw(Error, /Missing Process Function Argument/);
  });

  it("Should throw error if items argument is not Array type", () => {
    const init = () => {
      gateway("i_am_not_an_array", (item, next) => {});
    };
    expect(init).to.throw(Error, /Items argument is not 'Array' type/);
  });

  it("Should throw error if process function argument is not function type", () => {
    const init = () => {
      gateway([], 'i_am_not_a_function');
    };
    expect(init).to.throw(Error, /Process Function is not 'function' type/);
  });

  it("Should continue with 0 items", () => {
    const init = () => {
      gateway([], (item, next) => { next(); });
    };
    expect(init).to.not.throw(Error);
  });

  it("Should forward process results", () => {
    const items = [1, 2, 3, 4, 5];
    return gateway(items, (item, next) => {
      next(null, item * 2);
    }).then((results) => {      
      expect(results.length).to.equal(items.length);
      expect(results[0]).to.equal(items[0] * 2);
      expect(results[1]).to.equal(items[1] * 2);
      expect(results[2]).to.equal(items[2] * 2);
      expect(results[3]).to.equal(items[3] * 2);
      expect(results[4]).to.equal(items[4] * 2);
    });         
  });  

});
