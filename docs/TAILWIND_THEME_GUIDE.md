# 🎨 Tailwind CSS Theme Guide

Yeh guide aapko batayega ki aapki existing CSS theme ko Tailwind classes ke saath kaise use karna hai.

## 🌈 Color Classes

### Background Colors

```jsx
// Dark Theme (Default)
<div className="bg-bg">           {/* --bg: #0a1628 */}
<div className="bg-bg-2">         {/* --bg-2: #0f1f38 */}
<div className="bg-bg-3">         {/* --bg-3: #162844 */}
<div className="bg-panel">        {/* --panel: #0d1b30 */}

// Light Theme (with .light class on parent)
<div className="bg-bg-light">     {/* --bg: #fafaf9 */}
<div className="bg-bg-light-2">   {/* --bg-2: #ffffff */}
<div className="bg-bg-light-3">   {/* --bg-3: #f5f5f4 */}
```

### Primary Colors (Teal/Emerald)

```jsx
<div className="bg-primary">        {/* #14b8a6 */}
<div className="bg-primary-light">  {/* #2dd4bf */}
<div className="bg-primary-dark">   {/* #0d9488 */}
<div className="bg-primary-100">    {/* rgba(20, 184, 166, 0.1) */}
<div className="bg-primary-150">    {/* rgba(20, 184, 166, 0.15) */}

<span className="text-primary">     {/* Primary text color */}
<span className="text-primary-light">
<span className="text-primary-dark">
```

### Secondary Colors (Purple)

```jsx
<div className="bg-secondary">      {/* #a855f7 */}
<div className="bg-secondary-light">{/* #c084fc */}
<div className="bg-secondary-dark"> {/* #9333ea */}

<span className="text-secondary">   {/* Secondary text color */}
```

### Text Colors

```jsx
// Dark Theme
<span className="text-text">           {/* #f1f5f9 - Main text */}
<span className="text-text-secondary"> {/* #cbd5e1 - Secondary text */}
<span className="text-text-muted">     {/* #94a3b8 - Muted text */}
<span className="text-text-placeholder">{/* #64748b - Placeholder */}

// Light Theme
<span className="text-text-light">           {/* #1c1917 */}
<span className="text-text-light-secondary"> {/* #44403c */}
<span className="text-text-light-muted">     {/* #78716c */}
```

### Semantic Colors

```jsx
// Success (Green)
<div className="bg-success">      {/* #10b981 */}
<div className="bg-success-bg">   {/* rgba(16, 185, 129, 0.1) */}
<span className="text-success">

// Warning (Amber)
<div className="bg-warning">      {/* #f59e0b */}
<div className="bg-warning-bg">   {/* rgba(245, 158, 11, 0.1) */}
<span className="text-warning">

// Error (Red)
<div className="bg-error">        {/* #ef4444 */}
<div className="bg-error-bg">     {/* rgba(239, 68, 68, 0.1) */}
<span className="text-error">

// Info (Cyan)
<div className="bg-info">         {/* #06b6d4 */}
<div className="bg-info-bg">      {/* rgba(6, 182, 212, 0.1) */}
<span className="text-info">
```

## 🎨 Gradients

```jsx
<div className="gradient-primary">    {/* Teal gradient */}
<div className="gradient-secondary">  {/* Purple gradient */}
<div className="gradient-success">    {/* Green gradient */}
<div className="gradient-bg">         {/* Background gradient */}

// Light theme mein automatically change ho jayenge
```

## 📏 Spacing

```jsx
<div className="p-xs">    {/* padding: 4px */}
<div className="p-sm">    {/* padding: 8px */}
<div className="p-md">    {/* padding: 12px */}
<div className="p-lg">    {/* padding: 16px */}
<div className="p-xl">    {/* padding: 24px */}
<div className="p-2xl">   {/* padding: 32px */}
<div className="p-3xl">   {/* padding: 48px */}
<div className="p-4xl">   {/* padding: 64px */}

// Margin ke liye m- use karein
<div className="m-lg">    {/* margin: 16px */}
<div className="mx-lg">   {/* margin-left & margin-right: 16px */}
<div className="my-lg">   {/* margin-top & margin-bottom: 16px */}
```

## 🔤 Typography

```jsx
// Font Sizes
<h1 className="text-4xl">   {/* 36px */}
<h2 className="text-3xl">   {/* 30px */}
<h3 className="text-2xl">   {/* 24px */}
<h4 className="text-xl">    {/* 20px */}
<h5 className="text-lg">    {/* 18px */}
<p className="text-base">   {/* 16px */}
<small className="text-sm"> {/* 14px */}
<span className="text-xs">  {/* 12px */}

// Font Weights
<span className="font-normal">    {/* 400 */}
<span className="font-medium">    {/* 500 */}
<span className="font-semibold">  {/* 600 */}
<span className="font-bold">      {/* 700 */}
<span className="font-extrabold"> {/* 800 */}

// Line Heights
<p className="leading-tight">   {/* 1.25 */}
<p className="leading-normal">  {/* 1.5 */}
<p className="leading-relaxed"> {/* 1.7 */}

// Text Shadow
<h1 className="text-shadow">    {/* 0 2px 4px rgba(0, 0, 0, 0.2) */}
<h1 className="text-shadow-lg"> {/* 0 4px 8px rgba(0, 0, 0, 0.3) */}
```

## 🔲 Border Radius

```jsx
<div className="rounded-sm">   {/* 6px */}
<div className="rounded-md">   {/* 8px */}
<div className="rounded-lg">   {/* 12px */}
<div className="rounded-xl">   {/* 16px */}
<div className="rounded-2xl">  {/* 24px */}
<div className="rounded-full"> {/* 9999px */}
```

## 🌟 Shadows

```jsx
// Dark Theme Shadows
<div className="shadow-sm">  {/* Small shadow */}
<div className="shadow">     {/* Default shadow */}
<div className="shadow-md">  {/* Medium shadow */}
<div className="shadow-lg">  {/* Large shadow */}
<div className="shadow-xl">  {/* Extra large shadow */}

// Light Theme Shadows (automatic with .light class)
<div className="shadow-light-sm">
<div className="shadow-light">
<div className="shadow-light-md">
<div className="shadow-light-lg">
<div className="shadow-light-xl">
```

## ✨ Special Effects

```jsx
// Glassmorphism
<div className="glass">      {/* Light glass effect */}
<div className="glass-dark"> {/* Dark glass effect */}

// Backdrop Blur
<div className="backdrop-blur">    {/* 8px blur */}
<div className="backdrop-blur-sm"> {/* 4px blur */}
<div className="backdrop-blur-lg"> {/* 16px blur */}
```

## 🎯 Common Component Examples

### Button

```jsx
<button className="bg-primary hover:bg-primary-dark text-white px-lg py-sm rounded-md shadow transition">
  Primary Button
</button>

<button className="bg-secondary hover:bg-secondary-dark text-white px-lg py-sm rounded-md shadow transition">
  Secondary Button
</button>
```

### Card

```jsx
<div className="bg-panel border border-line rounded-lg shadow-md p-lg">
  <h3 className="text-xl font-semibold text-text mb-sm">Card Title</h3>
  <p className="text-text-secondary">Card content goes here...</p>
</div>
```

### Modal Header (Gradient)

```jsx
<div className="gradient-primary text-white p-lg rounded-t-lg relative overflow-hidden">
  <div className="relative z-10">
    <h2 className="text-xl font-bold text-shadow">Modal Title</h2>
  </div>
  {/* Decorative element */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>
</div>
```

### Input Field

```jsx
<input
  className="w-full bg-input-bg border border-input-border rounded-md px-lg py-sm text-text placeholder-text-placeholder focus:border-primary focus:ring-2 focus:ring-primary-150 transition"
  placeholder="Enter text..."
/>
```

### Badge

```jsx
<span className="bg-primary-150 text-primary px-sm py-xs rounded-full text-xs font-semibold">
  Primary Badge
</span>

<span className="bg-success-bg text-success px-sm py-xs rounded-full text-xs font-semibold">
  Success Badge
</span>
```

## 🌙 Dark/Light Theme Toggle

Aapko sirf parent element par `.light` class add/remove karni hai:

```jsx
// Dark theme (default)
<div className="min-h-screen bg-bg text-text">
  <div className="bg-panel p-lg">Content</div>
</div>

// Light theme
<div className="light min-h-screen bg-bg-light text-text-light">
  <div className="bg-panel-light p-lg">Content</div>
</div>
```

## 🚀 Migration Tips

1. **Existing CSS ko replace karne ke liye:**

   ```css
   /* Old CSS */
   .my-component {
     background: var(--primary);
     padding: var(--spacing-lg);
     border-radius: var(--radius-md);
   }
   ```

   ```jsx
   {/* New Tailwind */}
   <div className="bg-primary p-lg rounded-md">
   ```

2. **Custom classes ke liye:**

   ```jsx
   // Agar koi specific combination bar bar use kar rahe hain
   <div className="bg-panel border border-line rounded-lg shadow-md p-lg hover:shadow-lg transition">
   ```

3. **Responsive design:**
   ```jsx
   <div className="p-sm md:p-lg lg:p-xl">
     {/* Mobile: 8px, Tablet: 16px, Desktop: 24px */}
   </div>
   ```

Yeh config file aapki existing theme ke saath 100% match karti hai. Ab aap Tailwind classes use kar sakte hain! 🎉
