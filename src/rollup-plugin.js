const fs = require("fs")
var { graphql,buildSchema, GraphQLObjectType, GraphQLString, GraphQLSchema} = require('graphql');

module.exports = function(moranConfig, options) {
    let fields =  Object.assign({}, ...Object.keys(moranConfig.modules).map(k => ({[k]: moranConfig.modules[k].graphQLConfig(k)})));

    var rootQueryType = new GraphQLObjectType({
        name: 'Query',
        fields: fields
    });
    return {
      name: 'moran',
      load() {
      },
      resolveId() { /* ... */ },
      generateBundle() { /* ... */ },

      async transform(code, id){

        let queries = [];
        let matches = [...code.matchAll(/(\_\:)\s*([A-z]+)\s*\=\s*`([^`]*)`/), ...code.matchAll(/(\_\:)\s*([A-z]+)\s*\=\s*"([^"]*)"/), ...code.matchAll(/(\_\:)\s*([A-z]+)\s*\=\s*'([^']*)'/)]
        // console.log(matches)
        matches.forEach(match => {
            if(match){
                queries.push(new Promise(function(resolve, reject){
                  graphql(new GraphQLSchema({query: rootQueryType}), match[3].trim()).then(data => {
                    //   console.log(data)
                      resolve([data.data, match])
                  })
                }))
            }
        })
          var results = await Promise.all(queries)
            // console.log(results)
            for(var result of results){
                var match = result[1];
                code = code.replace(match[0], `let ${match[2]} = ${JSON.stringify(result[0])}`)
                // console.log(code)
            }
          return code
      }
      // ...
    }
  }