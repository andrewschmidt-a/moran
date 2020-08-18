# Moran
Simple Data Layer for the JS Developer

## Getting Started
### Rollup
To define your modules for Moran simply create a moran.config.js file like this:
```javascript
var {TestDataModule, TestDataModule2} = require('moran')

exports.modules = {
    "testData": TestDataModule2.TestDataModule(),
    "testData2": TestDataModule2.TestDataModule()
}
```

Add the following to the rollup.config plugin list:
```javascript
MoranRollupPlugin(require('./moran.config'),{
    exclude: "node_modules/**"
}),
```

## What to develop your own module??
It's simple! All you need is to define a schema and resolver for your data!

```javascript
var { MoranModule } = require('moran')

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
```

### schema
The schema needs to include a type named "root". This is what will be used to define the modules schema when it is stiched with all the other schemas. 

### resolver

Define resolver for the objects within your schema. This can be used to call apis, load data from files or generate random data.