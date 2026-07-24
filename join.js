const form = document.getElementById("join-form");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = form.querySelector(
        'button[type="submit"]'
    );

    const formData = new FormData(form);

    const registration = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        registeringFor: formData.get("registeringFor"),
        email: formData.get("email"),
        startingLevel: formData.get("startingLevel"),
        lessonMethod: formData.get("lessonMethod")
    };

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json"
            }
        });

        let result = {};

        try {
            result = await response.json();
        } catch {
            result = {};
        }

        if (!response.ok) {
            let message = "The form could not be sent.";

            if (
                Array.isArray(result.errors) &&
                result.errors.length > 0
            ) {
                message = result.errors
                    .map(function (error) {
                        return error.message;
                    })
                    .join("\n");
            }

            throw new Error(message);
        }

        sessionStorage.setItem(
            "limimakeRegistration",
            JSON.stringify(registration)
        );

        window.location.href = "joinedlm.html";

    } catch (error) {
        console.error(error);

        alert(
            error.message ||
            "The form could not be sent. Please try again."
        );

        submitButton.disabled = false;
        submitButton.textContent = "Go!";
    }
});
