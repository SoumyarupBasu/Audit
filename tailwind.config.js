/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      // Font Family
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },

      // Font Sizes (matching your theme.css)
      fontSize: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
      },

      // Font Weights
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },

      // Line Heights
      lineHeight: {
        tight: "1.25",
        normal: "1.5",
        relaxed: "1.7",
      },

      // Spacing (matching your theme.css)
      spacing: {
        xs: "0.25rem", // 4px
        sm: "0.5rem", // 8px
        md: "0.75rem", // 12px
        lg: "1rem", // 16px
        xl: "1.5rem", // 24px
        "2xl": "2rem", // 32px
        "3xl": "3rem", // 48px
        "4xl": "4rem", // 64px
      },

      // Border Radius
      borderRadius: {
        sm: "0.375rem", // 6px
        md: "0.5rem", // 8px
        lg: "0.75rem", // 12px
        xl: "1rem", // 16px
        "2xl": "1.5rem", // 24px
        full: "9999px",
      },

      // Colors (matching your theme.css exactly)
      colors: {
        // Background Colors
        bg: {
          DEFAULT: "#0a1628", // Dark theme default
          2: "#0f1f38", // Elevated surface
          3: "#162844", // Higher elevation
          light: "#fafaf9", // Light theme default
          "light-2": "#ffffff", // Light theme elevated
          "light-3": "#f5f5f4", // Light theme higher elevation
        },

        panel: {
          DEFAULT: "#0d1b30", // Dark theme panel
          light: "#ffffff", // Light theme panel
        },

        // Primary Colors (Teal/Emerald)
        primary: {
          DEFAULT: "#14b8a6", // Teal-500
          light: "#2dd4bf", // Teal-400
          dark: "#0d9488", // Teal-600
          50: "rgba(20, 184, 166, 0.05)",
          100: "rgba(20, 184, 166, 0.1)",
          150: "rgba(20, 184, 166, 0.15)",
          200: "rgba(20, 184, 166, 0.2)",
          250: "rgba(20, 184, 166, 0.25)",
          300: "rgba(20, 184, 166, 0.3)",
          // Light theme primary
          "light-default": "#0d9488",
          "light-light": "#14b8a6",
          "light-dark": "#0f766e",
        },

        // Secondary Colors (Purple)
        secondary: {
          DEFAULT: "#a855f7", // Purple-500
          light: "#c084fc", // Purple-400
          dark: "#9333ea", // Purple-600
          50: "rgba(168, 85, 247, 0.05)",
          100: "rgba(168, 85, 247, 0.1)",
          150: "rgba(168, 85, 247, 0.15)",
          200: "rgba(168, 85, 247, 0.2)",
          // Light theme secondary
          "light-default": "#9333ea",
          "light-light": "#a855f7",
          "light-dark": "#7e22ce",
        },

        // Text Colors
        text: {
          DEFAULT: "#f1f5f9", // Slate-100 (dark theme)
          secondary: "#cbd5e1", // Slate-300 (dark theme)
          muted: "#94a3b8", // Slate-400
          placeholder: "#64748b", // Slate-500
          // Light theme text
          light: "#1c1917", // Stone-900 (light theme)
          "light-secondary": "#44403c", // Stone-700 (light theme)
          "light-muted": "#78716c", // Stone-500 (light theme)
          "light-placeholder": "#a8a29e", // Stone-400 (light theme)
        },

        // Semantic Colors
        success: {
          DEFAULT: "#10b981", // Emerald-500
          light: "#34d399", // Emerald-400
          bg: "rgba(16, 185, 129, 0.1)",
          // Light theme
          "light-default": "#059669",
          "light-light": "#10b981",
          "light-bg": "rgba(5, 150, 105, 0.1)",
        },

        warning: {
          DEFAULT: "#f59e0b", // Amber-500
          light: "#fbbf24", // Amber-400
          bg: "rgba(245, 158, 11, 0.1)",
          // Light theme
          "light-default": "#d97706",
          "light-light": "#f59e0b",
          "light-bg": "rgba(217, 119, 6, 0.1)",
        },

        error: {
          DEFAULT: "#ef4444", // Red-500
          light: "#f87171", // Red-400
          bg: "rgba(239, 68, 68, 0.1)",
          // Light theme
          "light-default": "#dc2626",
          "light-light": "#ef4444",
          "light-bg": "rgba(220, 38, 38, 0.1)",
        },

        info: {
          DEFAULT: "#06b6d4", // Cyan-500
          light: "#22d3ee", // Cyan-400
          bg: "rgba(6, 182, 212, 0.1)",
          // Light theme
          "light-default": "#0891b2",
          "light-light": "#06b6d4",
          "light-bg": "rgba(8, 145, 178, 0.1)",
        },

        // UI Elements
        line: {
          DEFAULT: "#1e3a5f", // Border color (dark)
          light: "#2d4a6f", // Lighter border (dark)
          // Light theme
          "light-default": "#e7e5e4", // Stone-200
          "light-light": "#d6d3d1", // Stone-300
        },

        input: {
          bg: "#0c1a2e", // Input background (dark)
          border: "#1e3a5f", // Input border (dark)
          // Light theme
          "light-bg": "#ffffff",
          "light-border": "#d6d3d1",
        },

        btn: {
          bg: "#162844", // Button background (dark)
          border: "#2d4a6f", // Button border (dark)
          // Light theme
          "light-bg": "#f5f5f4",
          "light-border": "#d6d3d1",
        },

        dz: {
          bg: "#0d1b30", // Dropzone background (dark)
          // Light theme
          "light-bg": "#fafaf9",
        },
      },

      // Box Shadows (matching your theme.css)
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
        DEFAULT:
          "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)",
        md: "0 6px 12px -2px rgba(0, 0, 0, 0.4), 0 3px 6px -2px rgba(0, 0, 0, 0.3)",
        lg: "0 10px 20px -3px rgba(0, 0, 0, 0.5), 0 4px 8px -2px rgba(0, 0, 0, 0.4)",
        xl: "0 20px 40px -6px rgba(0, 0, 0, 0.6), 0 8px 16px -4px rgba(0, 0, 0, 0.5)",
        // Light theme shadows
        "light-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        light:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "light-md":
          "0 6px 12px -2px rgba(0, 0, 0, 0.12), 0 3px 6px -2px rgba(0, 0, 0, 0.08)",
        "light-lg":
          "0 10px 20px -3px rgba(0, 0, 0, 0.15), 0 4px 8px -2px rgba(0, 0, 0, 0.1)",
        "light-xl":
          "0 20px 40px -6px rgba(0, 0, 0, 0.2), 0 8px 16px -4px rgba(0, 0, 0, 0.15)",
      },

      // Background Images (Gradients)
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)",
        "gradient-success": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        "gradient-bg": "linear-gradient(180deg, #0a1628 0%, #0f1f38 100%)",
        // Light theme gradients
        "gradient-primary-light":
          "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
        "gradient-secondary-light":
          "linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)",
        "gradient-success-light":
          "linear-gradient(135deg, #059669 0%, #047857 100%)",
        "gradient-bg-light":
          "linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)",
      },

      // Animation and Transitions
      transitionDuration: {
        fast: "150ms",
        DEFAULT: "200ms",
        slow: "300ms",
      },

      transitionTimingFunction: {
        DEFAULT: "ease-in-out",
      },

      // Backdrop Blur
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
    },
  },
  plugins: [
    // Add any additional plugins here
    function ({ addUtilities, theme }) {
      const newUtilities = {
        // Custom gradient utilities
        ".gradient-primary": {
          background: theme("backgroundImage.gradient-primary"),
        },
        ".gradient-secondary": {
          background: theme("backgroundImage.gradient-secondary"),
        },
        ".gradient-success": {
          background: theme("backgroundImage.gradient-success"),
        },
        ".gradient-bg": {
          background: theme("backgroundImage.gradient-bg"),
        },

        // Light theme gradients
        ".light .gradient-primary": {
          background: theme("backgroundImage.gradient-primary-light"),
        },
        ".light .gradient-secondary": {
          background: theme("backgroundImage.gradient-secondary-light"),
        },
        ".light .gradient-success": {
          background: theme("backgroundImage.gradient-success-light"),
        },
        ".light .gradient-bg": {
          background: theme("backgroundImage.gradient-bg-light"),
        },

        // Text shadow utilities
        ".text-shadow": {
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        },
        ".text-shadow-lg": {
          textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        },

        // Glassmorphism utilities
        ".glass": {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        },
        ".glass-dark": {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(0, 0, 0, 0.2)",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
