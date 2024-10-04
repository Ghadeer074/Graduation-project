// basic starting file will be modified later 

//Handle a GET request for index.ejs (Landing page)
//const landingPage = require("");
const landing = (req, res) => {
    res.render("index",{});
};

// Export the landing function
module.exports = {
    landing
};

