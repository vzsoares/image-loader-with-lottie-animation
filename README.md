# 🎬 Image Loader with Lottie Animation

![Language](https://img.shields.io/badge/language-TypeScript%20%7C%20AlpineJS-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-brightgreen)

A customizable image loader application with smooth Lottie animations and SVG background patterns. Perfect for enhancing user experience during image loading on websites and web applications.

<p align="center">
  <img width="800" src="/public/Image-Loader-with-Lottie-Animation.gif">
</p>

## ✨ Features

- **Lottie Animation**: Beautiful loading animations powered by dotLottie
- **Configurable via URL Parameters**: Easily customize all aspects through URL parameters
- **SVG Background Patterns**: Add optional SVG patterns as decorative backgrounds
- **Minimum Loading Time**: Ensures smooth transitions even with fast-loading images
- **Responsive Design**: Works seamlessly on all device sizes

## 🚀 Live Webapp

Try it now: [Image Loader with Lottie Animation](https://vzsoares.github.io/image-loader-with-lottie-animation/?lottie=https://cdn.zenhalab.com/assets/structured/lottie_clap_animation.json&bgcolor=%23ff0000&imageurl=https://cdn.zenhalab.com/assets/images/landscape-placeholder.jpeg&svgurl=https://cdn.zenhalab.com/assets/patterns/qqquad.svg)

## 🔧 URL Parameters

Customize the loader by adding these parameters to the URL:

- **lottie**: URL to a Lottie JSON animation file
- **imageurl**: URL to the image you want to display after loading
- **bgcolor**: Background color in hex format (e.g., `%23ffffff` for white)
- **svgurl**: URL to an SVG file to use as a background pattern

### Example URL

```
https://vzsoares.github.io/image-loader-with-lottie-animation/?lottie=https://cdn.zenhalab.com/assets/structured/lottie_clap_animation.json&bgcolor=%23ff0000&imageurl=https://cdn.zenhalab.com/assets/images/landscape-placeholder.jpeg&svgurl=https://cdn.zenhalab.com/assets/patterns/qqquad.svg
```

## 🎮 How It Works

1. **Loading Phase**:

    - Displays the Lottie animation while loading your image
    - Applies the specified background color and pattern
    - Ensures a minimum loading time for a smooth experience

2. **Transition**:

    - Smoothly fades from the animation to the loaded image

3. **Final Display**:
    - Shows your image with the configured background

## 🔧 Development

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Setup

```bash
# 1. Clone the repository:
git clone https://github.com/vzsoares/image-loader-with-lottie-animation.git
cd image-loader-with-lottie-animation

# 2. Install dependencies:
yarn install

# 3. Run development server:
yarn dev

# 4. Build for production:
yarn build
```

## 🛠️ Tech Stack

- **TypeScript**: For type-safe code
- **Alpine.js**: Lightweight JavaScript framework for reactivity
- **dotLottie**: Official LottieFiles dotLottie player
- **TailwindCSS**: Utility-first CSS framework
- **Vite**: Next-generation frontend tooling

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs and issues
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

_Created by [vzsoares](https://github.com/vzsoares)_
