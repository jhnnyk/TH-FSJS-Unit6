const Profile = require("./profile.js");
const renderer = require('./renderer.js');
const querystring = require("querystring");
const commonHeaders = {'Content-Type': 'text/html'};

// Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  // if url == "/" && GET
  if (request.url === '/') {
    if (request.method.toLowerCase() === "get") {
      // show search
      response.writeHead(200, commonHeaders);
      renderer.view("header", {}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    } else {
      // if url == "/" && POST

      // get the post data from body
      request.on("data", function(postBody) {
        // extract the username
        let query = querystring.parse(postBody.toString());
        response.write(query.username);
        response.end();
        // redirect to /:username
      });

    }
  }

}

// Handle HTTP route for GET /:username i.e. /johnknotts
function user(request, response) {
  // if url == "/..."
  let username = request.url.replace("/", "");
  if (username.length > 0) {
    response.writeHead(200, commonHeaders);
    renderer.view("header", {}, response);

    // get JSON from Treehouse
    let studentProfile = new Profile(username);
    // on "end"
    studentProfile.on("end", function(profileJSON) {
      // show profile

      // Store the values which we need
      let values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }

      // Simple response
      renderer.view("profile", {values}, response);
      renderer.view("footer", {}, response);
      response.end();
    });

    // on "error"
    studentProfile.on("error", function(error) {
      // show error
      renderer.view("error", {values:{errorMessage: error.message}}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    });

  }
}


module.exports.home = home;
module.exports.user = user;
