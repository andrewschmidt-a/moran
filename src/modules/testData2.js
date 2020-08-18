
var { MoranModule } = require('./module')

let schema = `
    type TestObject200{
        test: String
    }
    type TestObject00 {
        test: TestObject200
    }
    type root {
        hello: String,
        testObject: TestObject00
    }
`;

let resolver = {
    hello: () => {
      return 'Hello world 2!';
    },
    testObject: () => {
        return {
          test: {
              test: "test"
          }
        }
    }
  };
exports.TestDataModule = function(){
    return new MoranModule(schema, resolver);
}