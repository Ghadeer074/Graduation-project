//Handle a GET request for index.ejs (Landing page)
const landing = (req, res) => {
    res.render("index",{});
};

// Export the landing function
module.exports = {
    landing
};

