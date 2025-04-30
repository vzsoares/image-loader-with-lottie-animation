import Alpine from 'alpinejs';

document.addEventListener("alpine:init", () => {
    Alpine.data("imageLoader", () => ({
        lottieUrl: "",
        imageUrl: "",
        bgColor: "#ffffff",
        imageLoaded: false,
        showImage: false,
        minLoadTime: 2000, // Minimum loading time in milliseconds
        loadStartTime: 0,

        init() {
            // Parse URL parameters
            const urlParams = new URLSearchParams(
                window.location.search,
            );
            this.lottieUrl =
                urlParams.get("lottie") ||
                "https://assets3.lottiefiles.com/packages/lf20_usmfx6bp.json"; // Default lottie
            this.bgColor = urlParams.get("bgcolor") || "#ffffff"; // Default background color
            this.imageUrl = urlParams.get("imageurl") || ""; // No default image

            // Record the start time of loading
            this.loadStartTime = Date.now();

            // If no image URL is provided, wait minimum time then hide loader
            if (!this.imageUrl) {
                setTimeout(() => {
                    this.showImage = true;
                }, this.minLoadTime);
            }
        },

        handleImageLoad() {
            this.imageLoaded = true;

            // Calculate how much time has passed since loading started
            const elapsedTime = Date.now() - this.loadStartTime;
            const remainingTime = Math.max(
                0,
                this.minLoadTime - elapsedTime,
            );

            // Wait for the remaining time (if any) before showing the image
            setTimeout(() => {
                this.showImage = true;
            }, remainingTime);
        },
    }));
});

// Initialize Alpine.js
Alpine.start();
