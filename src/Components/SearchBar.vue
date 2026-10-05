<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { SHORTCUTS } from '../utils/Shortcut'

withDefaults(defineProps<{ placeholder?: string }>(), {
  placeholder: 'chercher quelque chose…',
})

const query = ref('')
const input = ref<HTMLInputElement | null>(null)

// Détecte « !code terme » ; renvoie null si ce n'est pas un raccourci connu.
const parsed = computed(() => {
  const m = query.value.match(/^!(\w+)(?:\s+(.*))?$/)
  const shortcut = m ? SHORTCUTS[m[1]] : undefined
  return shortcut ? { shortcut, term: (m?.[2] ?? '').trim() } : null
})

function submit() {
  const q = query.value.trim()
  if (!q) return

  const p = parsed.value
  if (p) {
    if (p.term) window.location.href = p.shortcut.url(p.term)
    return
  }

  if (typeof browser !== 'undefined' && browser.search?.search) {
    browser.search.search({ query: q, disposition: 'CURRENT_TAB' })
  } else {
    window.location.href = `https://duckduckgo.com/?q=${encodeURIComponent(q)}`
  }
}

function focus() {
  input.value?.focus()
}

function onGlobalKey(e: KeyboardEvent) {
  const el = document.activeElement
  const typing = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement
  if (e.key === '/' && !typing) {
    e.preventDefault()
    focus()
  }
}

function onInputKey(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    query.value = ''
    input.value?.blur()
  }
}

onMounted(() => window.addEventListener('keydown', onGlobalKey))
onUnmounted(() => window.removeEventListener('keydown', onGlobalKey))

defineExpose({ focus })
</script>

<template>
  <form class="search" role="search" @submit.prevent="submit">
    <span class="search__prefix" aria-hidden="true">~/</span>
    <input
      ref="input"
      v-model="query"
      class="search__input"
      type="text"
      autocomplete="off"
      spellcheck="false"
      :placeholder="placeholder"
      aria-label="Rechercher sur le web"
      @keydown="onInputKey"
    />
    <span v-if="parsed" class="search__hint">→ {{ parsed.shortcut.label }}</span>
    <kbd v-else-if="!query" class="search__kbd" aria-hidden="true">/</kbd>
  </form>
</template>

<style scoped>
.search {
  
  --_accent: var(--color-accent);
  
  display: flex;
  align-items: center;
  gap: 12px;
  height: 48px;
  padding: 0 20px;
  border-radius: 999px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transition: border-color 0.15s, box-shadow 0.15s;
}

.search:focus-within {
  border-color: var(--_accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--_accent) 25%, transparent);
}

.search__prefix {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 400;
  color: var(--_accent);
}

.search__input {
  flex: 1;
  min-width: 0;
  background: none;
  border: 0;
  color: var(--color-text);
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 400;
}

.search__input:focus-visible {
  outline: none;
}

.search__input::placeholder {
  color: var(--color-muted);
}

.search__kbd,
.search__hint {
  font-size: 11px;
  color: var(--color-muted);
}

.search__kbd {
  border: 1px solid var(--color-border);
  border-radius: 5px;
  padding: 1px 7px;
  font-family: var(--font-mono);
}

.search__hint {
  color: var(--_accent);
  font-size: 12px;
}
</style>