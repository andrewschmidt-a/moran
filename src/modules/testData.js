
var { MoranModule } = require('./module')

let schema = `
    type TestObject2{
        test: String
    }
    type TestObject {
        test: TestObject2
    }
    type root {
        hello: String,
        testObject: TestObject
    }
`;

let resolver = {
    hello: () => {
      return 'Hello world!';
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