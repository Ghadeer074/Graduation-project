//Handle a GET request for signUp oranizer.ejs (Sign up page - organizer)
const signOrgGet = (req, res) => {
    res.render("signUp organizer",{});
};

// handle post request for signUp organizer.ejs
function signOrgPost(req,res){
    const {firstName, lastName, OrganizationtName, OrganizationNumber, email, phoneNumber, password } = req.body;

    // Error messages array to store all validation issues
    const errors = [];

    // Helper functions
    const isAlphabetical = (str) => /^[a-zA-Z]+$/.test(str); // Only letters
    const isAlphanumeric = (str) => /^[a-zA-Z0-9]+$/.test(str); // Alphanumeric
    const isValidPhone = (str) => /^\d{10}$/.test(str); // 10 digits
    const isOrgNumValid= (str) => /^\d{2}$/.test(str); // 2 digits
    const containsUpperLowerDigit = (str) => /[A-Z]/.test(str) && /[a-z]/.test(str) && /\d/.test(str); // Contains upper, lower, and digit
    const isValidEmail = (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str); // Basic email validation
    const hasNoWhitespace = (str) => /^\S+$/.test(str); // No white spaces

    // Name validation
    if (!firstName || !isAlphabetical(firstName)) {
        errors.push("First name must contain only letters and cannot be empty.");
    }
    if (!lastName || !isAlphabetical(lastName)) {
        errors.push("Last name must contain only letters and cannot be empty.");
    }

    // Organization Name validation
    if (!OrganizationtName || !isAlphabetical(OrganizationtName)) {
        errors.push("Organization name must contain only letters and cannot be empty.");
    }
   
    // Organization number validation 
    if (!OrganizationNumber || isOrgNumValid(OrganizationNumber)){
        errors.push("Organization number must be two digits and cannot be empty");
        
    }

    // Email validation
    if (!email || !isValidEmail(email)) {
        errors.push("Email is not valid.");
    }

    // Phone number validation
    if (!phoneNumber || !isValidPhone(phoneNumber)) {
        errors.push("Phone number must be exactly 10 digits.");
    }


    // Password validation
    if (!password || password.length < 8 || password.length > 12 || !containsUpperLowerDigit(password) || !hasNoWhitespace(password)) {
        errors.push(
            "Password must be 8-12 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and no spaces."
        );
    }

    // Check for any validation errors
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // If all validation passes, proceed with account creation
    return res.status(200).json({ message: "Account created successfully!" });
}

// Export the function
module.exports = {signOrgGet,signOrgPost};


