"use strict";
var gulp = require("gulp");

var _ = require("lodash");

var fs = require("fs");
var argv = require("minimist");
const { renderFile } = require("ejs");
const { join } = require("path");

// Remember to pass argument '--name TheServiceName' or '-n TheServiceName' to the service creation command
// If you want to use an API as a database model, pass the base url and the endpoint. '--baseurl http://google.com' or '--b http://google.com'
// '--endpoint users' or '--e users'
// Note that the name must be singular
gulp.task("service", function (done) {
  var args = argv(process.argv.slice(2));
  var name;
  var baseurl;
  var endpoint;
  var isSQL;
  baseurl = args.baseurl;
  endpoint = args.endpoint;
  if (!baseurl) {
    baseurl = args.b;
  }

  if (!endpoint) {
    endpoint = args.e;
  }

  if (!endpoint) {
    endpoint = args.e;
  }

  name = args.name;

  if (!name) {
    name = args.n;
  }

  if (!name) {
    throw new Error(
      'Please, pass the service name using the "-n" argument or "--name" argument'
    );
  }
  name = name.toLowerCase();
  var namePlural = name + "s";

  // Create the Route
  renderFile("./template/route.ejs", { service: name }, (err, rendered) => {
    if (err) throw err;

    fs.writeFile(
      "./src/routes/" + namePlural + ".ts",
      rendered,
      function (err) {
        if (err) {
          throw err;
        }
        console.log("Route created at ./routes/" + namePlural + ".ts");
      }
    );
  });
  renderFile("./template/model.ejs", { service: name }, (err, rendered) => {
    if (err) throw err;

    fs.writeFile(
      "./src/models/" + namePlural + ".ts",
      rendered,
      function (err) {
        if (err) {
          throw err;
        }
        console.log("Model created at ./models/" + namePlural + ".ts");
      }
    );
  });

  renderFile("./template/interface.ejs", { service: name }, (err, rendered) => {
    if (err) throw err;

    fs.writeFile(
      "./src/interfaces/" + namePlural + ".ts",
      rendered,
      function (err) {
        if (err) {
          throw err;
        }
        console.log("interface created at ./interfaces/" + namePlural + ".ts");
      }
    );
  });

  renderFile(
    "./template/controller.ejs",
    { service: name },
    (err, rendered) => {
      if (err) throw err;

      fs.writeFile(
        "./src/controllers/" + namePlural + ".ts",
        rendered,
        function (err) {
          if (err) {
            throw err;
          }
          console.log(
            "controller created at ./controllers/" + namePlural + ".ts"
          );
        }
      );
    }
  );

  renderFile("./template/test.ejs", { service: name }, (err, rendered) => {
    if (err) throw err;

    fs.writeFile(
      "./src/__tests__/" + namePlural + ".test.ts",
      rendered,
      function (err) {
        if (err) {
          throw err;
        }
        console.log("test created at ./__tests__/" + namePlural + ".test.ts");
      }
    );
  });
  //   // Create the Route Unit Test
  //   fs.readFile(isSQL ? './template/route_sql_test.tmpl' : './template/route_test.tmpl', function (err, data) {
  //     if (err) {
  //       throw err;
  //     }
  //     var tpl = _.template(data);
  //     var result = tpl({ service: name});

  //     fs.writeFile('./test/routes/' + namePlural + '.js', result, function (err) {
  //       if (err) {
  //         throw err;
  //       }
  //       console.log('Route unit test created at ./test/routes/' + namePlural + '.js');
  //     });
  //   });

  //   // Create the Model

  //     fs.readFile(isSQL ? './template/model_sql.tmpl' : './template/model.tmpl', function (err, data) {
  //       if (err) {
  //         throw err;
  //       }
  //       var tpl = _.template(data);
  //       var result = tpl({ service: nameCapitalise, object: nameLowerCase });

  //       fs.writeFile('./models/' + nameCapitalisePlural + '.js', result, function (err) {
  //         if (err) {
  //           throw err;
  //         }
  //         console.log('Model created at ./models/' + nameCapitalisePlural + '.js');
  //       });
  //     });

  //   // Create the Model Unit Test
  //   fs.readFile(isSQL ? './template/model_sql_test.tmpl' : './template/model_test.tmpl', function (err, data) {
  //     if (err) {
  //       throw err;
  //     }
  //     var tpl = _.template(data);
  //     var result = tpl({ service: nameCapitalise, object: nameLowerCase });

  //     fs.writeFile('./test/models/' + namePlural + '.js', result, function (err) {
  //       if (err) {
  //         throw err;
  //       }
  //       console.log('Model unit test created at ./test/models/' + namePlural + '.js');
  //     });
  //   });

  //   // Create the controller
  //   fs.readFile(isSQL ? './template/controller_sql.tmpl' : './template/controller.tmpl', function (err, data) {
  //     if (err) {
  //       throw err;
  //     }
  //     var tpl = _.template(data);
  //     var result = tpl({ service: nameCapitalise, object: nameLowerCase });

  //     fs.writeFile('./controllers/' + nameCapitalisePlural + '.js', result, function (err) {
  //       if (err) {
  //         throw err;
  //       }
  //       console.log('Controller created at ./controllers/' + nameCapitalisePlural + '.js');
  //     });
  //   });

  return done();
});
