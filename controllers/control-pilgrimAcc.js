//Handle a GET request for signUp piligrm.ejs (Sign up page - pilgrim)
const signPilGet = (req, res) => {
    res.render("signup-pilgrim",{});
};

// handle post request for signUp piligrm.ejs
function signUpPil(req, res) {
    const { firstName, lastName, province, nationality, email, phoneNumber, dob, username, password } = req.body;

    // Error messages array to store all validation issues
    const errors = [];

    // Helper functions
    const isAlphabetical = (str) => /^[a-zA-Z]+$/.test(str); // Only letters
    const isAlphanumeric = (str) => /^[a-zA-Z0-9]+$/.test(str); // Alphanumeric
    const isValidPhone = (str) => /^\d{10}$/.test(str); // 10 digits
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

    // Province validation (assuming province is similar to firstName/lastName)
    if (!province || !isAlphabetical(province)) {
        errors.push("Province must contain only letters and cannot be empty.");
    }

    // Nationality validation (must be selected)
    if (!nationality) {
        errors.push("Nationality must be selected.");
    }

    // Email validation
    if (!email || !isValidEmail(email)) {
        errors.push("Email is not valid.");
    }

    // Phone number validation
    if (!phoneNumber || !isValidPhone(phoneNumber)) {
        errors.push("Phone number must be exactly 10 digits.");
    }

    // Date of birth validation (must be 18 years old or older)
    const userBirthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - userBirthDate.getFullYear();
    const isBirthdayPassed = today.setFullYear(1970) >= userBirthDate.setFullYear(1970);
    if (!dob || age < 18 || (age === 18 && !isBirthdayPassed)) {
        errors.push("You must be 18 years old or older.");
    }

    // Username validation (must be alphanumeric and not empty)
    if (!username || !isAlphanumeric(username)) {
        errors.push("Username must be alphanumeric and cannot contain spaces.");
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
module.exports = {signPilGet,signUpPil};

