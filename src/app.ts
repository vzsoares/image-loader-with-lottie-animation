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
        svgUrl: "",
        svgBackground: "",
        imageLoaded: false,
        showImage: false,
        minLoadTime: 2000, // Minimum loading time in milliseconds
        loadStartTime: 0,
        dotLottieInstance: undefined as DotLottie | undefined,

        init() {
            console.log("Alpine component initialized");

            // Parse URL parameters
            const urlParams = new URLSearchParams(window.location.search);

            // Get the Lottie URL from query params or use default
            this.lottieUrl =
                urlParams.get("lottie") ||
                "https://cdn.zenhalab.com/assets/structured/lottie_clap_animation.json";

            this.bgColor = urlParams.get("bgcolor") || "#ffffff";
            this.imageUrl = urlParams.get("imageurl") || "https://cdn.zenhalab.com/assets/images/landscape-placeholder.jpeg";
            this.svgUrl = urlParams.get("svgurl") || "";

            console.log("Image URL:", this.imageUrl);
            console.log("Lottie URL:", this.lottieUrl);
            console.log("SVG URL:", this.svgUrl);

            // Load SVG if provided
            if (this.svgUrl) {
                this.loadSVGBackground();
            }

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

        loadSVGBackground() {
            fetch(this.svgUrl)
                .then((response) => {
                    // Check if the request was successful
                    if (!response.ok) {
                        throw new Error(
                            `Network response was not ok: ${response.status}`,
                        );
                    }
                    return response.text();
                })
                .then((svgContent) => {
                    this.svgBackground = this.createSVGPattern(svgContent);
                })
                .catch((error) => {
                    console.error("Failed to load SVG:", error);
                });
        },

        createSVGPattern(svgContent: string): string {
            try {
                // Check if we have a full SVG document
                const isSVGDocument = svgContent.trim().startsWith("<svg");

                let svgBody;
                let viewBox = ["0", "0", "100", "100"]; // Default values

                if (isSVGDocument) {
                    // Extract just the inner content of the SVG if it's a full SVG document
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(
                        svgContent,
                        "image/svg+xml",
                    );
                    const svgElement = doc.querySelector("svg");

                    if (svgElement) {
                        // Get viewBox if it exists
                        const viewBoxAttr = svgElement.getAttribute("viewBox");
                        if (viewBoxAttr) {
                            viewBox = viewBoxAttr.split(/\s+/);
                        } else {
                            // Try to get width and height
                            const width = svgElement.getAttribute("width");
                            const height = svgElement.getAttribute("height");
                            if (width && height) {
                                viewBox = ["0", "0", width, height];
                            }
                        }

                        // Get the inner content
                        svgBody = svgElement.innerHTML;
                    } else {
                        svgBody = ""; // Empty if we can't parse the SVG
                    }
                } else {
                    // Assume it's already SVG content without the outer <svg> tag
                    svgBody = svgContent;
                }

                // Create width and height from viewBox
                const width = parseFloat(viewBox[2]) || 100;
                const height = parseFloat(viewBox[3]) || 100;

                // Create a pattern SVG that repeats the original SVG
                return `
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style="position: absolute; top: 0; left: 0;">
                        <defs>
                            <pattern id="bg-pattern" patternUnits="userSpaceOnUse" width="${width}" height="${height}" patternTransform="scale(0.5)">
                                ${svgBody}
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#bg-pattern)" opacity="0.2"/>
                    </svg>
                `;
            } catch (error) {
                console.error("Error creating SVG pattern:", error);
                return ""; // Return empty string on error
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
