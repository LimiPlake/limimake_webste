const form = document.getElementById("join-form");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    const registration = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        registeringFor: formData.get("registeringFor"),
        email: formData.get("email"),
        startingLevel: formData.get("startingLevel"),
        lessonMethod: formData.get("lessonMethod")
    };

    const submitButton = form.querySelector('button[type="submit"]');

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

        if (!response.ok) {
            throw new Error("Formspree rejected the submission.");
        }

        sessionStorage.setItem(
            "limimakeRegistration",
            JSON.stringify(registration)
        );

        window.location.href = "joinedlm.html";
    } catch (error) {
        console.error(error);

        alert(
            "The form could not be sent. Please try again."
        );

        submitButton.disabled = false;
        submitButton.textContent = "Go!";
    }
});
