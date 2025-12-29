import React, { useState } from "react";
import Icon from "./Icon";

/**
 * Example component showing how to use Tailwind CSS with your existing theme
 * Yeh component aapko dikhata hai ki kaise Tailwind classes use karni hain
 */
export default function TailwindExample() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDarkMode ? "bg-bg text-text" : "light bg-bg-light text-text-light"
      }`}
    >
      <div className="container mx-auto p-lg">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-xl">
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
            Tailwind CSS Example
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="bg-primary hover:bg-primary-dark text-white px-lg py-sm rounded-md shadow transition flex items-center gap-sm"
          >
            <Icon name={isDarkMode ? "sun" : "moon"} size="16px" />
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg mb-xl">
          {/* Primary Card */}
          <div className="bg-panel border border-line rounded-lg shadow-md hover:shadow-lg transition p-lg">
            <div className="flex items-center gap-md mb-md">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Icon name="star" size="20px" className="text-white" />
              </div>
              <h3 className="text-xl font-semibold">Primary Card</h3>
            </div>
            <p className="text-text-secondary mb-md">
              Yeh card primary colors use kar raha hai. Background, border, aur
              shadow sab theme ke according hai.
            </p>
            <button className="bg-primary hover:bg-primary-dark text-white px-md py-sm rounded-md text-sm font-medium transition">
              Primary Action
            </button>
          </div>

          {/* Secondary Card */}
          <div className="bg-panel border border-line rounded-lg shadow-md hover:shadow-lg transition p-lg">
            <div className="flex items-center gap-md mb-md">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="heart" size="20px" className="text-white" />
              </div>
              <h3 className="text-xl font-semibold">Secondary Card</h3>
            </div>
            <p className="text-text-secondary mb-md">
              Yeh card secondary (purple) colors use kar raha hai. Hover effects
              bhi included hain.
            </p>
            <button className="bg-secondary hover:bg-secondary-dark text-white px-md py-sm rounded-md text-sm font-medium transition">
              Secondary Action
            </button>
          </div>

          {/* Success Card */}
          <div className="bg-panel border border-line rounded-lg shadow-md hover:shadow-lg transition p-lg">
            <div className="flex items-center gap-md mb-md">
              <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                <Icon name="check" size="20px" className="text-white" />
              </div>
              <h3 className="text-xl font-semibold">Success Card</h3>
            </div>
            <p className="text-text-secondary mb-md">
              Success state ke liye green colors use kiye gaye hain. Semantic
              colors ka example hai.
            </p>
            <button className="bg-success hover:bg-success-light text-white px-md py-sm rounded-md text-sm font-medium transition">
              Success Action
            </button>
          </div>
        </div>

        {/* Gradient Header Example */}
        <div className="gradient-primary text-white rounded-lg p-lg mb-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-shadow mb-sm">
              Gradient Header
            </h2>
            <p className="text-white text-opacity-90">
              Yeh aapke modal headers jaisa gradient background hai. Same effect
              Tailwind classes se achieve kiya gaya hai.
            </p>
          </div>
          {/* Decorative Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>
        </div>

        {/* Form Example */}
        <div className="bg-panel border border-line rounded-lg shadow-md p-lg mb-xl">
          <h3 className="text-xl font-semibold mb-lg">Form Example</h3>
          <div className="space-y-md">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-xs">
                Name
              </label>
              <input
                type="text"
                className="w-full bg-input-bg border border-input-border rounded-md px-lg py-sm text-text placeholder-text-placeholder focus:border-primary focus:ring-2 focus:ring-primary-150 transition"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-xs">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-input-bg border border-input-border rounded-md px-lg py-sm text-text placeholder-text-placeholder focus:border-primary focus:ring-2 focus:ring-primary-150 transition"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex gap-sm">
              <button className="bg-primary hover:bg-primary-dark text-white px-lg py-sm rounded-md font-medium transition flex-1">
                Submit
              </button>
              <button className="bg-btn-bg hover:bg-btn-border border border-btn-border text-text px-lg py-sm rounded-md font-medium transition flex-1">
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Badges Example */}
        <div className="bg-panel border border-line rounded-lg shadow-md p-lg mb-xl">
          <h3 className="text-xl font-semibold mb-lg">Badges & Status</h3>
          <div className="flex flex-wrap gap-sm">
            <span className="bg-primary-150 text-primary px-sm py-xs rounded-full text-xs font-semibold">
              Primary
            </span>
            <span className="bg-secondary-150 text-secondary px-sm py-xs rounded-full text-xs font-semibold">
              Secondary
            </span>
            <span className="bg-success-bg text-success px-sm py-xs rounded-full text-xs font-semibold">
              Success
            </span>
            <span className="bg-warning-bg text-warning px-sm py-xs rounded-full text-xs font-semibold">
              Warning
            </span>
            <span className="bg-error-bg text-error px-sm py-xs rounded-full text-xs font-semibold">
              Error
            </span>
            <span className="bg-info-bg text-info px-sm py-xs rounded-full text-xs font-semibold">
              Info
            </span>
          </div>
        </div>

        {/* Glassmorphism Example */}
        <div className="relative bg-gradient-secondary rounded-lg p-lg">
          <h3 className="text-xl font-bold text-white text-shadow mb-md">
            Glassmorphism Effect
          </h3>
          <div className="glass rounded-md p-md">
            <p className="text-white">
              Yeh glassmorphism effect hai jo aapke modals mein use hota hai.
              Backdrop blur aur transparency se banaya gaya hai.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
