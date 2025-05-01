import Alpine from "alpinejs";
import { DotLottie } from "@lottiefiles/dotlottie-web";

// Make Alpine available to the window object
// @ts-ignore
window.Alpine = Alpine;

document.addEventListener("DOMContentLoaded", () => {
    // Register the Alpine data store
    Alpine.data("imageLoader", () => ({
        lottieUrl: "",
        imageUrl: "",
        bgColor: "#ffffff",
        imageLoaded: false,
        showImage: false,
        minLoadTime: 2000, // Minimum loading time in milliseconds
        loadStartTime: 0,
        dotLottieInstance: new DotLottie({
            canvas: document.getElementById("") as HTMLCanvasElement,
        }),

        init() {
            console.log("Alpine component initialized");

            // Parse URL parameters
            const urlParams = new URLSearchParams(window.location.search);

            // Get the Lottie URL from query params or use default
            this.lottieUrl =
                urlParams.get("lottie") ||
                "https://lottie.host/9e0475c4-a6ea-46bf-b27c-8f8c3e14dc9a/AJTA2WRbpB.json";

            this.bgColor = urlParams.get("bgcolor") || "#ffffff";
            this.imageUrl = urlParams.get("imageurl") || "";

            console.log("Image URL:", this.imageUrl);
            console.log("Lottie URL:", this.lottieUrl);

            // Initialize Lottie animation
            this.$nextTick(() => {
                this.initializeLottie();
            });

            // Record the start time of loading
            this.loadStartTime = Date.now();

            // Start preloading the image if URL is provided
            if (this.imageUrl) {
                const img = new Image();
                img.src = this.imageUrl;

                img.onload = () => {
                    this.handleImageLoad();
                };

                img.onerror = () => {
                    console.error("Error loading image");
                    // Show an empty screen after min time if image fails
                    setTimeout(() => {
                        this.showImage = true;
                    }, this.minLoadTime);
                };
            } else {
                // If no image URL is provided, wait minimum time then hide loader
                setTimeout(() => {
                    this.showImage = true;
                }, this.minLoadTime);
            }
        },

        initializeLottie() {
            try {
                const canvas = document.getElementById("dotlottie-canvas");
                if (!canvas) {
                    console.error("Canvas element not found");
                    return;
                }

                // Create the DotLottie instance
                this.dotLottieInstance = new DotLottie({
                    autoplay: true,
                    loop: true,
                    canvas: canvas as HTMLCanvasElement,
                    src: this.lottieUrl,
                });

                console.log("Lottie animation initialized");
            } catch (error) {
                console.error("Error initializing Lottie:", error);
            }
        },

        handleImageLoad() {
            console.log("Image loaded");
            this.imageLoaded = true;

            // Calculate how much time has passed since loading started
            const elapsedTime = Date.now() - this.loadStartTime;
            const remainingTime = Math.max(0, this.minLoadTime - elapsedTime);

            console.log(`Waiting ${remainingTime}ms before showing image`);

            // Wait for the remaining time (if any) before showing the image
            setTimeout(() => {
                this.showImage = true;

                // Destroy the Lottie instance when no longer needed
                if (this.dotLottieInstance) {
                    try {
                        this.dotLottieInstance.destroy();
                    } catch (error) {
                        console.error(
                            "Error destroying Lottie instance:",
                            error,
                        );
                    }
                }

                console.log("Image shown, Lottie destroyed");
            }, remainingTime);
        },
    }));

    // Start Alpine
    Alpine.start();
    console.log("Alpine started");
});
