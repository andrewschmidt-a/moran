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
