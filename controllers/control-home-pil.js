//Handle a GET request for index.ejs (home-org page)
const homePil = (req, res) => {
    res.render("homePilg",{});
};

// Export the landing function
module.exports = {
    homePil
};

