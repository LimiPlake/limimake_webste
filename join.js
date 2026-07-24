const form = document.getElementById("join-form");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = form.querySelector('[type="submit"]');
    const formData = new FormData(form);

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

        const result = await response.json();

        if (!response.ok) {
            let message = "The form could not be sent.";

            if (result.errors && result.errors.length > 0) {
                message = result.errors
                    .map(error => error.message)
                    .join("\n");
            }

            throw new Error(message);
        }

        const registration = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            registeringFor: formData.get("registeringFor"),
            email: formData.get("email"),
            startingLevel: formData.get("startingLevel"),
            lessonMethod: formData.get("lessonMethod")
        };

        sessionStorage.setItem(
            "limimakeRegistration",
            JSON.stringify(registration)
        );

        window.location.href = "joinedlm.html";

    } catch (error) {
        console.error(error);

        alert(error.message);

        submitButton.disabled = false;
        submitButton.textContent = "Go!";
    }
});
