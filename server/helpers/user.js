exports.validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasValidLength = password.length >= 8;
    return hasValidLength && hasUppercase;
};