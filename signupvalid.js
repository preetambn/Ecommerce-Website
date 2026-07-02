const form = document.getElementById("signupForm");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const strength = document.getElementById("strength");

const email = document.getElementById("email");
const phone = document.getElementById("phone");

// Password Strength Indicator
password.addEventListener("input", () => {
    const value = password.value;
    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    switch (score) {
        case 1:
        case 2:
            strength.style.width = "33%";
            strength.style.background = "red";
            break;
        case 3:
        case 4:
            strength.style.width = "66%";
            strength.style.background = "orange";
            break;
        case 5:
            strength.style.width = "100%";
            strength.style.background = "green";
            break;
        default:
            strength.style.width = "0";
    }
});

// Form Validation
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        alert("Please enter a valid email address.");
        email.focus();
        return;
    }

    // Phone Validation (10 digits)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone.value)) {
        alert("Phone number must contain exactly 10 digits.");
        phone.focus();
        return;
    }

    // Password Length
    if (password.value.length < 8) {
        alert("Password must be at least 8 characters long.");
        password.focus();
        return;
    }

    // Strong Password
    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordPattern.test(password.value)) {
        alert(
            "Password must contain:\n\n" +
            "• At least 8 characters\n" +
            "• One uppercase letter\n" +
            "• One lowercase letter\n" +
            "• One number\n" +
            "• One special character"
        );
        password.focus();
        return;
    }

    // Confirm Password
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match.");
        confirmPassword.focus();
        return;
    }

    alert("Account created successfully!");
    form.reset();
    strength.style.width = "0";
});
window.onload = function () {
    document.getElementById("signupForm").reset();
};