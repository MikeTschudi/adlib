/**
 * adlib.spec.js
 */

let expect = require('chai').expect;
// let _ = require('lodash');
// let lodashdeep = require('lodash-deep');
let adlib = require('../dist/adlib.js');


describe('adlib ::', () => {
  it('should return a deep copy of the template', () => {
    let template = {
      foo: 'bar',
      baz: ['one', 'two']
    };
    let result = adlib(template, {});
    expect(template).to.not.equal(result);
    // ensure that changing the result DOES NOT change the template
    result.check = 'wat';
    expect(template.check).to.be.undefined;
    expect(result.foo).to.equal('bar');
    expect(result.foo).to.equal(template.foo);
  });
  /**
   * Lets play with strings!
   */
  describe('string interpolation ::', () => {
    it('should replace a simple path with a string', () => {
      let template = {
        value: '{{thing.value}}'
      };
      let settings = {
        thing: {
          value: 'red'
        }
      };
      let result = adlib(template, settings);

      expect(result.value).to.equal('red');
    })

    it('should replace multiple values in a string', () => {
      let template = {
        value: 'The {{thing.animal}} was {{thing.color}} but still a {{thing.animal}}'
      };
      let settings = {
        thing: {
          color: 'red',
          animal: 'fox'
        }
      };
      let result = adlib(template, settings);

      expect(result.value).to.equal('The fox was red but still a fox');
    })

    it('should flow missing things through', () => {
      let template = {
        value: '{{thing.value}}',
        v2: '{{not.present}}'
      };
      let settings = {
        thing: {
          value: 'red'
        }
      };
      let result = adlib(template, settings);

      expect(result.value).to.equal('red');
      expect(result.v2).to.equal(template.v2);
    })

    it('should work with deep graphs', () => {
      let template = {
        l1: {
          l2: {
            l3: {
              v: '{{s.l1.l2.val}}'
            }
          }
        }
      };
      let settings = {
        s: {
          l1: {
            l2: {
              val: 'green'
            }
          }
        }
      };
      let result = adlib(template, settings);
      expect(result.l1.l2.l3.v).to.equal('green');
    });
  });
  /**
   * Lets play with objects!
   */
  describe('objects ::', () => {
    it('should replace a token with an object', () => {
      let template = {
        value: '{{s.obj}}'
      };
      let settings = {
        s: {
          obj: {
            val: 'red'
          }
        }
      };
      let result = adlib(template, settings);
      expect(result.value.val).to.be.defined;
      expect(result.value.val).to.equal('red');
    })
    it('should replace a deep token with an deep object', () => {
      let template = {
        value: '{{s.l1.l2.obj}}'
      };
      let settings = {
        s: {
          l1: {
            l2: {
              obj: {
                val: 'red'
              }
            }
          }
        }
      };
      let result = adlib(template, settings);
      expect(result.value.val).to.be.defined;
      expect(result.value.val).to.equal('red');
    })
  });
  /**
   * Lets play with arrays!
   */
  describe('arrays ::', () => {
    it('should replace tokens within an array with strings', () => {
      let template = {
        values: ['{{s.animal}}', 'fuzzy','{{s.color}}']
      };
      let settings = {
        s: {
          animal: 'bear',
          color: 'brown'
        }
      };
      let result = adlib(template, settings);
      expect(result.values).to.be.defined;
      expect(result.values[0]).to.equal('bear');
      expect(result.values[2]).to.equal('brown');
    })

    it('should replace tokens within an array with objects', () => {
      let template = {
        values: ['{{s.animal}}']
      };
      let settings = {
        s: {
          animal: {
            type: 'bear'
          },
          color: 'brown'
        }
      };
      let result = adlib(template, settings);
      expect(result.values[0].type).to.equal('bear');
    });
    it('should replace tokens with an array', () => {
      let template = {
        values:'{{s.animals}}'
      };
      let settings = {
        s: {
          animals: [
            'bear', 'panda'
          ]
        }
      };
      let result = adlib(template, settings);
      expect(result.values).to.be.defined;
      expect(Array.isArray(result.values)).to.be.true;
      expect(result.values[1]).to.equal('panda');
    })
  })
})
