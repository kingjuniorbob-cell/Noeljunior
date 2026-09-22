// ==============================
// NOEL CORE PORTFOLIO
// ==============================


// ------------------------------
// Typing animation
// ------------------------------

const typingText =
    document.getElementById("typingText");

const roles = [
    "SOFTWARE DEVELOPER",
    "GAME DEVELOPER",
    "CREATIVE CODER",
    "UI EXPLORER"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeRole() {

    const currentRole =
        roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;

        if (
            characterIndex ===
            currentRole.length
        ) {

            deleting = true;

            setTimeout(
                typeRole,
                1600
            );

            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1)
                % roles.length;
        }
    }

    const speed =
        deleting ? 40 : 80;

    setTimeout(
        typeRole,
        speed
    );
}

typeRole();


// ------------------------------
// Cursor glow
// ------------------------------

const cursorGlow =
    document.querySelector(
        ".cursor-glow"
    );

document.addEventListener(
    "mousemove",
    (event) => {

        cursorGlow.style.left =
            event.clientX + "px";

        cursorGlow.style.top =
            event.clientY + "px";
    }
);


// ------------------------------
// Scroll progress HUD
// ------------------------------

const progressBar =
    document.getElementById(
        "progressBar"
    );

window.addEventListener(
    "scroll",
    () => {

        const scrollTop =
            document.documentElement.scrollTop;

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress =
            (scrollTop / height) * 100;

        progressBar.style.width =
            progress + "%";
    }
);




// ------------------------------
// Magnetic buttons
// ------------------------------

const magneticButtons =
    document.querySelectorAll(
        ".magnetic"
    );

magneticButtons.forEach(
    button => {

        button.addEventListener(
            "mousemove",
            event => {

                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `translate(
                        ${x * 0.15}px,
                        ${y * 0.15}px
                    )`;
            }
        );

        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "translate(0,0)";
            }
        );
    }
);


// ------------------------------
// Project card 3D tilt
// ------------------------------

const cards =
    document.querySelectorAll(
        ".project-card"
    );

cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 900)
                return;

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) /
                    centerY) * -2;

            const rotateY =
                ((x - centerX) /
                    centerX) * 2;

            card.style.transform =
                `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-5px)
                `;
        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                `
                perspective(1000px)
                rotateX(0)
                rotateY(0)
                translateY(0)
                `;
        }
    );
});


// ==============================
// COMMAND CENTER
// ==============================

const commandOverlay =
    document.getElementById(
        "commandOverlay"
    );

const commandButton =
    document.getElementById(
        "commandButton"
    );

const closeCommand =
    document.getElementById(
        "closeCommand"
    );

const commandInput =
    document.getElementById(
        "commandInput"
    );


function openCommand() {

    commandOverlay.classList.add(
        "active"
    );

    setTimeout(
        () => commandInput.focus(),
        100
    );
}


function closeCommandCenter() {

    commandOverlay.classList.remove(
        "active"
    );

    commandInput.value = "";
}


commandButton.addEventListener(
    "click",
    openCommand
);


closeCommand.addEventListener(
    "click",
    closeCommandCenter
);


// CTRL + K

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey ||
             event.metaKey) &&
            event.key.toLowerCase()
            === "k"
        ) {

            event.preventDefault();

            openCommand();
        }

        if (
            event.key === "Escape"
        ) {

            closeCommandCenter();
        }
    }
);


// command buttons

document
.querySelectorAll(
    ".commands button"
)
.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const section =
                button.dataset.section;

            document
                .getElementById(section)
                .scrollIntoView({
                    behavior: "smooth"
                });

            closeCommandCenter();
        }
    );
});


// ------------------------------
// Typed command navigation
// ------------------------------

commandInput.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Enter")
            return;

        const command =
            commandInput.value
                .toLowerCase()
                .trim();

        const sections = {
            home: "home",
            about: "about",
            skills: "skills",
            projects: "projects",
            contact: "contact"
        };


        if (sections[command]) {

            document
                .getElementById(
                    sections[command]
                )
                .scrollIntoView({
                    behavior: "smooth"
                });

            closeCommandCenter();

        }


        // Easter egg
        
    }
);


// ------------------------------
// Secret Core Mode
// ------------------------------




// ------------------------------
// Scroll reveal
// ------------------------------

const revealElements =
    document.querySelectorAll(
        `
        .skill-card,
        .project-card,
        .terminal,
        .about-text
        `
    );


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");
                    }
                }
            );

        },

        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(30px)";

        element.style.transition =
            `
            opacity .8s ease,
            transform .8s ease
            `;

        observer.observe(element);
    }
);


// CSS class applied by JS

const animationStyle =
    document.createElement(
        "style"
    );

animationStyle.textContent = `

.visible {
    opacity: 1 !important;
    transform:
        translateY(0) !important;
}

`;

document.head.appendChild(
    animationStyle
);



   


    // ==========================
    // TEXT
    // ==========================

    const textMove =
        progress * -250;

    scrollHeroText.style.transform =
        `translateX(${textMove}px)`;


    // ==========================
    // FADE
    // ==========================

    scrollHeroText.style.opacity =
        Math.max(
            0,
            1 - progress * 1.5
        );

    scrollHelmet.style.opacity =
        Math.max(
            0,
            1 - progress * 1.15
        );

