const form = document.getElementById("join-form");

form.addEventListener("submit", function () {

    const data = {
        firstName: form.firstName.value.trim(),
        lastName: form.lastName.value.trim(),
        registeringFor: form.registeringFor.value,
        email: form.email.value,
        startingLevel: form.startingLevel.value,
        lessonMethod: form.lessonMethod.value
    };

    sessionStorage.setItem(
        "limimakeRegistration",
        JSON.stringify(data)
    );

});
