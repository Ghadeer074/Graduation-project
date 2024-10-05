//Handle a GET request for index.ejs (home-org page)
const homeOrg = (req, res) => {
    res.render("homeOrg",{});
};

// Export the landing function
module.exports = {
    homeOrg
};

