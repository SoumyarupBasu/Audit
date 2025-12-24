import React from 'react'

/**
 * Modern Icon Component using Unicode symbols and emojis
 * Provides a lightweight alternative to icon libraries
 */

const iconMap = {
  // Navigation icons - Using geometric shapes for modern look
  'dashboard': '◧',
  'icon-dashboard': '◧',

  // Document icons - Clean geometric symbols
  'document': '▭',
  'icon-document': '▭',
  'file': '▭',
  'icon-file': '▭',

  // Upload/Download icons - Directional triangles
  'upload': '▲',
  'icon-upload': '▲',
  'download': '▼',
  'icon-download': '▼',

  // Search/Analysis icons - Circles for focus
  'search': '◎',
  'icon-search': '◎',
  'analyze': '◉',

  // Framework/Security icons - Diamond/Shield shapes
  'shield': '◆',
  'icon-shield': '◆',
  'security': '◈',
  'icon-security': '◈',
  'lock': '◉',
  'icon-lock': '◉',
  'eye': '◉',
  'icon-eye': '◉',
  'eye-off': '◎',
  'icon-eye-off': '◎',

  // Chart/Analytics icons - Bar/Graph shapes
  'chart': '◫',
  'icon-chart': '◫',
  'analytics': '◭',

  // Settings/Config icons - Gear-like
  'settings': '◉',
  'icon-settings': '◉',
  'gear': '◉',

  // Book/Documentation icons - Rectangle stacks
  'book': '◫',
  'icon-book': '◫',
  'docs': '▭',

  // User/Profile icons - Circle for person
  'user': '◉',
  'icon-user': '◉',
  'profile': '◉',

  // Status icons - Clear symbols
  'check': '✓',
  'icon-check': '✓',
  'checkmark': '✓',
  'success': '✓',
  'warning': '▲',
  'icon-warning': '▲',
  'error': '✕',
  'icon-error': '✕',
  'info': '◉',
  'icon-info': '◉',

  // Arrow icons - Clean directional
  'arrow-up': '↑',
  'icon-arrow-up': '↑',
  'arrow-down': '↓',
  'icon-arrow-down': '↓',
  'arrow-left': '←',
  'icon-arrow-left': '←',
  'arrow-right': '→',
  'icon-arrow-right': '→',

  // Action icons - Simple symbols
  'plus': '+',
  'icon-plus': '+',
  'add': '+',
  'minus': '−',
  'icon-minus': '−',
  'close': '✕',
  'icon-close': '✕',
  'delete': '✕',
  'icon-delete': '✕',
  'trash': '🗑',
  'icon-trash': '🗑',
  'edit': '✎',
  'icon-edit': '✎',

  // Time icons - Clock symbols
  'clock': '◷',
  'icon-clock': '◷',
  'time': '◷',
  'calendar': '◫',
  'icon-calendar': '◫',

  // Folder icons - Box shapes
  'folder': '◧',
  'icon-folder': '◧',
  'folder-open': '◨',

  // List icons
  'list': '☰',
  'icon-list': '☰',

  // Communication icons - Envelope/Bell
  'mail': '✉',
  'icon-mail': '✉',
  'message': '◫',
  'notification': '◉',
  'icon-notification': '◉',

  // Theme icons - Sun/Moon
  'sun': '◉',
  'icon-sun': '◉',
  'moon': '◐',
  'icon-moon': '◐',

  // Misc icons - Various shapes
  'star': '★',
  'icon-star': '★',
  'heart': '♥',
  'icon-heart': '♥',
  'refresh': '↻',
  'icon-refresh': '↻',
  'menu': '☰',
  'icon-menu': '☰',
  'home': '⌂',
  'icon-home': '⌂',
  'link': '◈',
  'icon-link': '◈',
  'tag': '◈',
  'icon-tag': '◈',
  'lightbulb': '◉',
  'icon-lightbulb': '◉',

  // Compliance/Audit specific - Professional symbols
  'audit': '◎',
  'icon-audit': '◎',
  'compliance': '✓',
  'icon-compliance': '✓',
  'framework': '◆',
  'icon-framework': '◆',
  'report': '▭',
  'icon-report': '▭',
}

export default function Icon({ name, size = '1em', style = {}, className = '' }) {
  const icon = iconMap[name] || iconMap[`icon-${name}`] || '•'
  
  return (
    <span 
      className={`icon ${className}`}
      style={{
        fontSize: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
        ...style
      }}
      role="img"
      aria-label={name}
    >
      {icon}
    </span>
  )
}

// Export the icon map for direct use
export { iconMap }

