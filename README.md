# 🎋 Intro

Create solar system with JavaScript & Three.js and using parcel as web application bundler

## 📦 Tech Stack

- Javascript
- Three.js
- Parcel
- CSS
- Deployed with Vercel

## 👩🏽‍🍳 Features

- Using textureLoader function from Three.js to apply texture to each material with image
- Each mesh self rotate and rotate around sun with rotateY property

## ✨ Improvement

This app is using images as the texture which can be heavy on initial loading, utilising GLSL would be one of the way to improve performance.

Another way to improve performance, caching the images for second time.

## 💭 Process

I always like to build website with Three.js and I thought it would be great if I can build solar system with Three.js.

## 🚦 Running the Project

```
# Install the dependencies
npm install

# Start development server
npm run dev

# Building static files
npm run build
```

## Demo

https://solarsystem-mu.vercel.app/
