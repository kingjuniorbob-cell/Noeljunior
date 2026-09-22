import * as THREE from "three";

import { GLTFLoader } from
    "three/addons/loaders/GLTFLoader.js";


// ==========================================
// GSAP
// ==========================================

gsap.registerPlugin(
    ScrollTrigger
);


// ==========================================
// DOM
// ==========================================

const canvas =
    document.querySelector("#ironCanvas");

const container =
    document.querySelector("#helmet");

const heroText =
    document.querySelector("#heroText");


// ==========================================
// SCENE
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

        canvas,

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
// LIGHTING
// ==========================================

// soft white overall light

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        1.8
    );

scene.add(
    ambientLight
);


// RED KEY LIGHT

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

scene.add(
    redLight
);


// WHITE RIM LIGHT

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

scene.add(
    whiteLight
);


// TOP LIGHT

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

scene.add(
    topLight
);


// ==========================================
// MODEL GROUP
// ==========================================

const modelGroup =
    new THREE.Group();

scene.add(
    modelGroup
);


let ironMan;


// ==========================================
// LOAD MODEL
// ==========================================

const loader =
    new GLTFLoader();


loader.load(

    "models/ironman_mua3.glb",


    function (gltf) {


        ironMan =
            gltf.scene;


        modelGroup.add(
            ironMan
        );


        // ==================================
        // MODEL BOUNDING BOX
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


        // ==================================
        // CENTER MODEL
        // ==================================

        ironMan.position.set(

            -center.x,

            -center.y,

            -center.z

        );


        // ==================================
        // AUTO SCALE
        // ==================================

        const largestSide =
            Math.max(

                size.x,

                size.y,

                size.z

            );


        const desiredSize =
            5.2;


        const scale =
            desiredSize /
            largestSide;


        modelGroup.scale.setScalar(
            scale
        );


        // CENTER OF SCREEN

       modelGroup.position.set(
    0,
    -1.0,
    0
);

// Start from front view
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


    undefined,


    function (error) {

        console.error(
            "MODEL ERROR",
            error
        );

    }

);


// ==========================================
// SCROLL ANIMATION
// ==========================================

function setupScrollAnimation() {


    // --------------------------------------
    // EXACT 360° ROTATION
    // --------------------------------------

    gsap.to(
    modelGroup.rotation,
    {
        y: Math.PI * 3,

            ease:
                "none",


            scrollTrigger: {

                trigger:
                    ".hero",

                start:
                    "top top",

                end:
                    "bottom bottom",

                scrub:
                    1

            }

        }

    );


    // --------------------------------------
    // SLIGHT CAMERA DEPTH
    // --------------------------------------

    gsap.to(

        camera.position,

        {

            z: 4.25,

            ease:
                "none",


            scrollTrigger: {

                trigger:
                    ".hero",

                start:
                    "top top",

                end:
                    "bottom bottom",

                scrub:
                    1

            }

        }

    );


    // --------------------------------------
    // HERO TEXT DISAPPEARS
    // --------------------------------------

    if (heroText) {

        gsap.to(

            heroText,

            {

                x: -120,

                opacity: 0,

                ease:
                    "none",


                scrollTrigger: {

                    trigger:
                        ".hero",

                    start:
                        "top top",

                    end:
                        "45% top",

                    scrub:
                        true

                }

            }

        );

    }


    // --------------------------------------
    // LIGHT INTENSITY DURING SCROLL
    // --------------------------------------

    gsap.to(

        redLight,

        {

            intensity:
                55,

            ease:
                "none",


            scrollTrigger: {

                trigger:
                    ".hero",

                start:
                    "top top",

                end:
                    "bottom bottom",

                scrub:
                    true

            }

        }

    );

}


// ==========================================
// RESIZE
// ==========================================

function resize() {


    if (!container) {
        return;
    }


    const width =
        container.clientWidth;


    const height =
        container.clientHeight;


    if (
        width === 0 ||
        height === 0
    ) {

        return;

    }


    renderer.setSize(
        width,
        height,
        false
    );


    camera.aspect =
        width / height;


    camera.updateProjectionMatrix();

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