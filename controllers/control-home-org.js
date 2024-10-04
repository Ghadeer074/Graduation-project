// basic starting file will be modified later 

//Handle a GET request for index.ejs (home-org page)
//const landingPage = require("");
const homeOrg = (req, res) => {
    res.render("homeOrg",{});
};

// Export the landing function
module.exports = {
    homeOrg
};

