//Handle a GET request for hujjGuide.ejs
const Guide = (req, res) => {
    res.render("hujjGuide",{});
};

// Export the guide function
module.exports = {
    Guide
};

