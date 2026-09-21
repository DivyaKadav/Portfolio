/* =========================================================
   DIVYA KADAV PORTFOLIO
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. TYPEWRITER EFFECT
   ========================================================= */

const roles = [
    "German Language Specialist",
    "Linguist",
    "Translator"
];

let roleIndex = 0;
let characterIndex = 0;
let isDeleting = false;

const typingText = document.getElementById("typing-text");


function typeEffect() {

    // Stop if the typing element does not exist on this page
    if (!typingText) {
        return;
    }

    const currentRole = roles[roleIndex];

    if (isDeleting) {

        typingText.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

    } else {

        typingText.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

    }


    let typingSpeed = isDeleting ? 50 : 100;


    // Pause after typing the full role
    if (
        !isDeleting &&
        characterIndex === currentRole.length
    ) {

        typingSpeed = 1500;
        isDeleting = true;

    }

    // Move to the next role
    else if (
        isDeleting &&
        characterIndex === 0
    ) {

        isDeleting = false;

        roleIndex =
            (roleIndex + 1) % roles.length;

        typingSpeed = 500;

    }


    setTimeout(typeEffect, typingSpeed);
}


// Start only on pages containing #typing-text
if (typingText) {
    typeEffect();
}



/* =========================================================
   2. NAVBAR ACTIVE LINK
   ========================================================= */

const navLinks =
    document.querySelectorAll(".nav-link");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (navLink) {
            navLink.classList.remove("active");
        });

        this.classList.add("active");

    });

});



/* =========================================================
   3. CONTACT FORM
   GOOGLE APPS SCRIPT + GMAIL
   ========================================================= */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    const submitButton =
        document.getElementById("contactSubmitButton");

    const formStatus =
        document.getElementById("formStatus");


    const scriptURL =
        "https://script.google.com/macros/s/AKfycbz3T1SZ1AAcuTV1b_Ip9AhwfASJQBqhpE9RXS54x2O4I2KofOCsiLcXGvE3kMKS_n9P/exec";


    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* ================================
               GET FORM VALUES
               ================================ */

            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const subject =
                document
                    .getElementById("subject")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();



            /* ================================
               VALIDATION
               ================================ */

            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                showFormError(
                    "Please complete all fields."
                );

                return;
            }



            /* ================================
               EMAIL VALIDATION
               ================================ */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                showFormError(
                    "Please enter a valid email address."
                );

                return;
            }



            /* ================================
               SENDING STATE
               ================================ */

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.innerHTML = `
                    <span>Sending...</span>
                    <i class="bi bi-hourglass-split"></i>
                `;

            }


            if (formStatus) {

                formStatus.innerHTML = "";
                formStatus.className = "form-status";

            }



            /* ================================
               PREPARE DATA
               ================================ */

            const formData = {
                name: name,
                email: email,
                subject: subject,
                message: message
            };



            /* ================================
               SEND TO GOOGLE APPS SCRIPT
               ================================ */

            try {

                await fetch(
                    scriptURL,
                    {
                        method: "POST",

                        mode: "no-cors",

                        headers: {
                            "Content-Type":
                                "text/plain;charset=utf-8"
                        },

                        body:
                            JSON.stringify(formData)
                    }
                );


                /* ================================
                   SUCCESS MESSAGE
                   ================================ */

                if (formStatus) {

                    formStatus.innerHTML = `
                        <i class="bi bi-check-circle-fill"></i>
                        Message submitted successfully.
                        Thank you for reaching out!
                    `;

                    formStatus.className =
                        "form-status form-success";

                }


                contactForm.reset();

            }

            catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                showFormError(
                    "Unable to submit your message. " +
                    "Please email me directly at " +
                    "kadavdivya@gmail.com."
                );

            }

            finally {

                /* ================================
                   RESTORE BUTTON
                   ================================ */

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.innerHTML = `
                        <span>Send Message</span>
                        <i class="bi bi-arrow-right"></i>
                    `;

                }

            }

        }
    );



    /* =====================================================
       ERROR MESSAGE
       ===================================================== */

    function showFormError(message) {

        if (!formStatus) {
            return;
        }


        formStatus.innerHTML = `
            <i class="bi bi-exclamation-circle-fill"></i>
            ${message}
        `;


        formStatus.className =
            "form-status form-error";

    }

}
