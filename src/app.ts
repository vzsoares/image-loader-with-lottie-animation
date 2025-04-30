import Alpine from "alpinejs";
import "@lottiefiles/lottie-player";

// Make sure Alpine is defined as a window property to ensure it's globally available
// @ts-ignore
window.Alpine = Alpine;

document.addEventListener("DOMContentLoaded", () => {
    // First, register the Alpine data
    Alpine.data("imageLoader", () => ({
        lottieUrl: "",
        imageUrl: "",
        bgColor: "#ffffff",
        imageLoaded: false,
        showImage: false,
        minLoadTime: 2000, // Minimum loading time in milliseconds
        loadStartTime: 0,

        init() {
            console.log("Alpine component initialized"); // Debug log

            // Parse URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            this.lottieUrl =
                urlParams.get("lottie") ||
                "https://assets3.lottiefiles.com/packages/lf20_usmfx6bp.json"; // Default lottie
            this.bgColor = urlParams.get("bgcolor") || "#ffffff"; // Default background color
            this.imageUrl = urlParams.get("imageurl") || ""; // No default image

            console.log("Image URL:", this.imageUrl); // Debug log
            console.log("Lottie URL:", this.lottieUrl); // Debug log

            // Force the component to start with loader visible
            this.showImage = false;

            // Record the start time of loading
            this.loadStartTime = Date.now();

            // Start preloading the image if URL is provided
            if (this.imageUrl) {
                const img = new Image();
                img.src = this.imageUrl;
                img.onload = () => {
                    this.handleImageLoad();
                };
            } else {
                // If no image URL is provided, wait minimum time then hide loader
                setTimeout(() => {
                    this.showImage = true;
                }, this.minLoadTime);
            }
        },

        handleImageLoad() {
            console.log("Image loaded"); // Debug log
            this.imageLoaded = true;

            // Calculate how much time has passed since loading started
            const elapsedTime = Date.now() - this.loadStartTime;
            const remainingTime = Math.max(0, this.minLoadTime - elapsedTime);

            console.log(`Waiting ${remainingTime}ms before showing image`); // Debug log

            // Wait for the remaining time (if any) before showing the image
            setTimeout(() => {
                this.showImage = true;
                console.log("Image shown"); // Debug log
            }, remainingTime);
        },
    }));

    // Then start Alpine
    Alpine.start();
    console.log("Alpine started"); // Debug log
});
