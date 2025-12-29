# 🚀 Tailwind CSS Quick Reference

## 🎯 Most Used Classes (Your Theme)

### 📦 Layout & Containers

```jsx
<div className="container mx-auto">           {/* Centered container */}
<div className="flex items-center gap-lg">    {/* Flex with gap */}
<div className="grid grid-cols-3 gap-md">     {/* Grid layout */}
<div className="w-full h-full">              {/* Full width/height */}
```

### 🎨 Backgrounds

```jsx
<div className="bg-bg">                      {/* Main background */}
<div className="bg-panel">                   {/* Panel background */}
<div className="bg-primary">                 {/* Primary color */}
<div className="gradient-primary">           {/* Primary gradient */}
```

### 📝 Text

```jsx
<h1 className="text-2xl font-bold">          {/* Large heading */}
<p className="text-text-secondary">          {/* Secondary text */}
<span className="text-primary">              {/* Primary colored text */}
<small className="text-xs text-text-muted">  {/* Small muted text */}
```

### 🔲 Spacing

```jsx
<div className="p-lg">                       {/* Padding: 16px */}
<div className="m-xl">                       {/* Margin: 24px */}
<div className="space-y-md">                 {/* Vertical spacing between children */}
<div className="gap-sm">                     {/* Gap in flex/grid: 8px */}
```

### 🎯 Buttons

```jsx
{
  /* Primary Button */
}
<button className="bg-primary hover:bg-primary-dark text-white px-lg py-sm rounded-md shadow transition">
  Primary
</button>;

{
  /* Secondary Button */
}
<button className="bg-btn-bg hover:bg-btn-border border border-btn-border text-text px-lg py-sm rounded-md transition">
  Secondary
</button>;
```

### 📋 Cards

```jsx
<div className="bg-panel border border-line rounded-lg shadow-md p-lg">
  <h3 className="text-xl font-semibold mb-md">Card Title</h3>
  <p className="text-text-secondary">Card content...</p>
</div>
```

### 📝 Forms

```jsx
<input className="w-full bg-input-bg border border-input-border rounded-md px-lg py-sm text-text placeholder-text-placeholder focus:border-primary focus:ring-2 focus:ring-primary-150 transition" />
```

### 🏷️ Badges

```jsx
<span className="bg-primary-150 text-primary px-sm py-xs rounded-full text-xs font-semibold">
  Badge
</span>
```

## 🌈 Color Combinations

### Primary Theme

```jsx
bg-primary text-white                        {/* Primary button */}
bg-primary-150 text-primary                 {/* Primary badge */}
border-primary ring-primary-150             {/* Primary focus */}
```

### Success Theme

```jsx
bg-success text-white                        {/* Success button */}
bg-success-bg text-success                  {/* Success badge */}
border-success                              {/* Success border */}
```

### Warning Theme

```jsx
bg-warning text-white                        {/* Warning button */}
bg-warning-bg text-warning                  {/* Warning badge */}
border-warning                              {/* Warning border */}
```

### Error Theme

```jsx
bg-error text-white                          {/* Error button */}
bg-error-bg text-error                      {/* Error badge */}
border-error                                {/* Error border */}
```

## 📱 Responsive Design

```jsx
<div className="p-sm md:p-lg lg:p-xl">       {/* Responsive padding */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"> {/* Responsive grid */}
<div className="text-sm md:text-base lg:text-lg"> {/* Responsive text */}
```

## ✨ Effects & Animations

```jsx
<div className="hover:shadow-lg transition">  {/* Hover shadow */}
<div className="hover:scale-105 transition">  {/* Hover scale */}
<div className="glass">                      {/* Glassmorphism */}
<div className="backdrop-blur-md">           {/* Backdrop blur */}
```

## 🌙 Dark/Light Mode

```jsx
{
  /* Wrapper with theme class */
}
<div
  className={isDark ? "bg-bg text-text" : "light bg-bg-light text-text-light"}
>
  {/* Content automatically adapts */}
</div>;
```

## 🎯 Common Patterns

### Modal Header

```jsx
<div className="gradient-primary text-white p-lg rounded-t-lg relative overflow-hidden">
  <div className="relative z-10">
    <h2 className="text-xl font-bold text-shadow">Title</h2>
  </div>
  <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>
</div>
```

### Loading Spinner

```jsx
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
```

### Notification Toast

```jsx
<div className="bg-success text-white p-md rounded-md shadow-lg flex items-center gap-sm">
  <Icon name="check" size="16px" />
  <span>Success message</span>
</div>
```

### Search Box

```jsx
<div className="relative">
  <Icon
    name="search"
    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
    size="16px"
  />
  <input
    className="w-full bg-input-bg border border-input-border rounded-md pl-10 pr-lg py-sm"
    placeholder="Search..."
  />
</div>
```

### Status Badge

```jsx
<span
  className={`px-sm py-xs rounded-full text-xs font-semibold ${
    status === "active"
      ? "bg-success-bg text-success"
      : status === "pending"
      ? "bg-warning-bg text-warning"
      : "bg-error-bg text-error"
  }`}
>
  {status}
</span>
```

## 🔧 Custom Utilities Available

```jsx
.gradient-primary                            {/* Primary gradient background */}
.gradient-secondary                          {/* Secondary gradient background */}
.text-shadow                                {/* Text shadow effect */}
.glass                                      {/* Glassmorphism effect */}
```

## 💡 Pro Tips

1. **Use your spacing scale**: `xs, sm, md, lg, xl, 2xl, 3xl, 4xl`
2. **Consistent colors**: Always use theme colors instead of arbitrary values
3. **Responsive first**: Start with mobile, then add `md:` and `lg:` prefixes
4. **Transitions**: Add `transition` class for smooth hover effects
5. **Focus states**: Always include focus styles for accessibility

## 🚀 Migration Strategy

1. **Start with new components**: Use Tailwind for all new components
2. **Replace gradually**: Convert existing components one by one
3. **Keep theme.css**: Don't delete it, use it alongside Tailwind
4. **Use both**: You can mix CSS variables with Tailwind classes

Example:

```jsx
{/* Old way */}
<div style={{backgroundColor: 'var(--primary)', padding: 'var(--spacing-lg)'}}>

{/* New way */}
<div className="bg-primary p-lg">
```
