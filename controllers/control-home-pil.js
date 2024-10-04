// basic starting file will be modified later 

//Handle a GET request for index.ejs (home-org page)
//const landingPage = require("");
const homePil = (req, res) => {
    res.render("homePilg",{});
};

// Export the landing function
module.exports = {
    homePil
};

