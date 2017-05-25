const Profile = require("./profile.js");

// Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  // if url == "/" && GET
  if (request.url === '/') {
    // show search
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write("Header\n");
    response.write("Search\n");
    response.end("Footer\n");
  }

  // if url == "/" && POST
    // redirect to /:username
}

// Handle HTTP route for GET /:username i.e. /johnknotts
function user(request, response) {
  // if url == "/..."
  let username = request.url.replace("/", "");
  if (username.length > 0) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write("Header\n");

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
      response.write(`${values.username} has ${values.badges} badges\n`);
      response.end("Footer\n");
    });

    // on "error"
    studentProfile.on("error", function(error) {
      // show error
      response.write(error.message + "\n");
      response.end("Footer\n");
    });

  }
}


module.exports.home = home;
module.exports.user = user;
