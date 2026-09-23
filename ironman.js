import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";


// ==========================================
// GSAP
// ==========================================

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;

if (!gsap || !ScrollTrigger) {
    console.error("GSAP or ScrollTrigger is not loaded");
} else {
    gsap.registerPlugin(ScrollTrigger);
}


// ==========================================
// DOM
// ==========================================

const canvas =
    document.querySelector("#ironCanvas");

const container =
    document.querySelector("#helmet");

const heroText =
    document.querySelector("#heroText");

if (!canvas) {
    throw new Error("#ironCanvas was not found");
}

if (!container) {
    throw new Error("#helmet was not found");
}


// ==========================================
// THREE.JS SCENE
// ==========================================

const scene =
    new THREE.Scene();


// ==========================================
// CAMERA
// ==========================================

const camera =
    new THREE.PerspectiveCamera(
        30,
        1,
        0.1,
        100
    );

camera.position.set(
    0,
    0.5,
    8.5
);


// ==========================================
// RENDERER
// ==========================================

const renderer =
    new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
    1.25;


// ==========================================
// LIGHTS
// ==========================================

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        1.8
    );

scene.add(ambientLight);


const redLight =
    new THREE.PointLight(
        0xff2018,
        32,
        10
    );

redLight.position.set(
    3,
    2,
    4
);

scene.add(redLight);


const whiteLight =
    new THREE.PointLight(
        0xffffff,
        24,
        10
    );

whiteLight.position.set(
    -3,
    3,
    3
);

scene.add(whiteLight);


const topLight =
    new THREE.DirectionalLight(
        0xffffff,
        3
    );

topLight.position.set(
    0,
    5,
    4
);

scene.add(topLight);


// ==========================================
// MODEL GROUP
// ==========================================

const modelGroup =
    new THREE.Group();

scene.add(modelGroup);

let ironMan = null;


// ==========================================
// LOAD GLB MODEL
// ==========================================

const loader =
    new GLTFLoader();


// IMPORTANT:
// GLB is beside ironman.js in your GitHub repository

const modelURL =
    new URL(
        "./ironman_mua3.glb",
        import.meta.url
    ).href;


console.log(
    "Loading Iron Man from:",
    modelURL
);


loader.load(

    modelURL,

    // SUCCESS
    function (gltf) {

        console.log(
            "GLB FILE LOADED"
        );

        ironMan =
            gltf.scene;

        modelGroup.add(
            ironMan
        );


        // ==================================
        // GET MODEL SIZE
        // ==================================

        const box =
            new THREE.Box3()
                .setFromObject(
                    ironMan
                );

        const center =
            box.getCenter(
                new THREE.Vector3()
            );

        const size =
            box.getSize(
                new THREE.Vector3()
            );


        console.log(
            "MODEL SIZE:",
            size
        );


        // ==================================
        // CENTER MODEL
        // ==================================

        ironMan.position.set(
            -center.x,
            -center.y,
            -center.z
        );


        // ==================================
        // SCALE MODEL
        // ==================================

        const largestSide =
            Math.max(
                size.x,
                size.y,
                size.z
            );

        const desiredSize =
            4.5;

        const scale =
            desiredSize /
            largestSide;

        modelGroup.scale.setScalar(
            scale
        );


        // ==================================
        // MODEL POSITION
        // ==================================

        modelGroup.position.set(
            0,
            -0.5,
            0
        );


        // Start facing front

        modelGroup.rotation.set(
            0,
            Math.PI,
            0
        );


        setupScrollAnimation();


        console.log(
            "IRON MAN READY"
        );

    },


    // LOADING
    function (xhr) {

        if (xhr.total > 0) {

            const percent =
                (
                    xhr.loaded /
                    xhr.total
                ) * 100;

            console.log(
                `Loading model: ${percent.toFixed(0)}%`
            );

        }

    },


    // ERROR
    function (error) {

        console.error(
            "IRON MAN MODEL ERROR:",
            error
        );

    }

);


// ==========================================
// SCROLL CONTROL
// ==========================================

function setupScrollAnimation() {

    if (!gsap || !ScrollTrigger) {
        return;
    }


    // ======================================
    // 360 DEGREE ROTATION
    // ======================================

    gsap.to(
        modelGroup.rotation,
        {

            // Starts at PI.
            // PI -> 3PI = one complete 360° rotation.

            y: Math.PI * 3,

            ease: "none",

            scrollTrigger: {

                trigger: ".hero",

                start: "top top",

                end: "bottom bottom",

                scrub: 1

            }

        }
    );


    // ======================================
    // SMALL CAMERA ZOOM
    // ======================================

    gsap.to(
        camera.position,
        {

            z: 7,

            ease: "none",

            scrollTrigger: {

                trigger: ".hero",

                start: "top top",

                end: "bottom bottom",

                scrub: 1

            }

        }
    );


    // ======================================
    // TEXT FADE
    // ======================================

    if (heroText) {

        gsap.to(
            heroText,
            {

                x: -120,

                opacity: 0,

                ease: "none",

                scrollTrigger: {

                    trigger: ".hero",

                    start: "top top",

                    end: "45% top",

                    scrub: true

                }

            }
        );

    }


    // ======================================
    // RED LIGHT INTENSITY
    // ======================================

    gsap.to(
        redLight,
        {

            intensity: 55,

            ease: "none",

            scrollTrigger: {

                trigger: ".hero",

                start: "top top",

                end: "bottom bottom",

                scrub: true

            }

        }
    );


    ScrollTrigger.refresh();

}


// ==========================================
// RESIZE
// ==========================================

function resize() {

    const width =
        container.clientWidth;

    const height =
        container.clientHeight;

    if (
        width <= 0 ||
        height <= 0
    ) {
        return;
    }


    const pixelWidth =
        Math.floor(
            width *
            Math.min(
                window.devicePixelRatio,
                2
            )
        );

    const pixelHeight =
        Math.floor(
            height *
            Math.min(
                window.devicePixelRatio,
                2
            )
        );


    if (
        canvas.width !== pixelWidth ||
        canvas.height !== pixelHeight
    ) {

        renderer.setSize(
            width,
            height,
            false
        );

        camera.aspect =
            width /
            height;

        camera.updateProjectionMatrix();

    }

}


// ==========================================
// RENDER LOOP
// ==========================================

function animate() {

    requestAnimationFrame(
        animate
    );

    resize();

    renderer.render(
        scene,
        camera
    );

}

animate();
