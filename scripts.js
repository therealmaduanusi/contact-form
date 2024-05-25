document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const firstName = form['first-name'];
    const lastName = form['last-name'];
    const email = form['email'];
    const queryType = form['query-type'];
    const message = form['message'];
    const consent = form['consent'];

    let valid = true;

    if (!firstName.value.trim()) {
        showError(firstName, 'This field is required');
        valid = false;
    } else {
        hideError(firstName);
    }

    if (!lastName.value.trim()) {
        showError(lastName, 'This field is required');
        valid = false;
    } else {
        hideError(lastName);
    }

    if (!email.value.trim() || !validateEmail(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        valid = false;
    } else {
        hideError(email);
    }

    if (!form.querySelector('input[name="query-type"]:checked')) {
        showError(queryType[0].closest('.form-group'), 'Please select a query type');
        valid = false;
    } else {
        hideError(queryType[0].closest('.form-group'));
    }

    if (!message.value.trim()) {
        showError(message, 'This field is required');
        valid = false;
    } else {
        hideError(message);
    }

    if (!consent.checked) {
        showError(consent.closest('.form-group'), 'To submit this form, please consent to being contacted');
        valid = false;
    } else {
        hideError(consent.closest('.form-group'));
    }

    if (valid) {
        // Submit the form or perform further processing
        let message = document.querySelector('.message');
        message.style.opacity = 1;
        message.style.visibility = 'visible'
        message.innerHTML = `
            <div>
                <h4><img src="/img/Vector.svg" alt="sent">Message Sent!</h4>
                <p>Thanks for completing the form. We’ll be in touch soon!</p>
            </div>
        `
        form.reset();
    }
});

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-message');
    error.textContent = message;
    error.style.display = 'block';
}

function hideError(input) {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-message');
    error.style.display = 'none';
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}
