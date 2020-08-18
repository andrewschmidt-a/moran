var {TestDataModule, TestDataModule2} = require('./src/index')

exports.modules = {
    "testData": TestDataModule.TestDataModule(),
    "testData2": TestDataModule2.TestDataModule()
}