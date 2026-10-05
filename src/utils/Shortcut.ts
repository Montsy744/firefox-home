interface Shortcut {
  label: string
  url: (q: string) => string
}

const SHORTCUTS: Record<string, Shortcut> = {
  gh: { label: 'GitHub', url: (q) => `https://github.com/search?q=${encodeURIComponent(q)}` },
  ytb: { label: 'YouTube', url: (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}` },
  mdn: { label: 'MDN', url: (q) => `https://developer.mozilla.org/search?q=${encodeURIComponent(q)}` },
  npm: { label: 'npm', url: (q) => `https://www.npmjs.com/search?q=${encodeURIComponent(q)}` },
  so: { label: 'Stack Overflow', url: (q) => `https://stackoverflow.com/search?q=${encodeURIComponent(q)}` },
  maps: { label: 'Maps', url: (q) => `https://www.openstreetmap.org/search?query=${encodeURIComponent(q)}` },
}

export {
    Shortcut,
    SHORTCUTS
}