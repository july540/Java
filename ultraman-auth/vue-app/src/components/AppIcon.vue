<template>
  <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path v-for="(d, i) in paths" :key="i" :d="d" />
    <circle v-for="(c, i) in circles" :key="'c' + i" :cx="c[0]" :cy="c[1]" :r="c[2]" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ name: { type: String, required: true } })

const MAP = {
  user:   { path: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'], circle: [[12, 7, 4]] },
  mail:   { path: ['M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z', 'm4 7 8 6 8-6'] },
  lock:   { path: ['M5 11h14v10H5z', 'M8 11V7a4 4 0 0 1 8 0v4'] },
  eye:    { path: ['M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z'], circle: [[12, 12, 2.6]] },
  eyeoff: { path: ['M3 3l18 18', 'M10.6 6.2A9.9 9.9 0 0 1 12 6c6.4 0 10 6 10 6a17 17 0 0 1-3.3 3.9', 'M6.6 7.9A16.7 16.7 0 0 0 2 12s3.6 6 10 6a10 10 0 0 0 4-.8'] },
  shield: { path: ['M12 3l8 3v6c0 5-3.6 8.3-8 9-4.4-.7-8-4-8-9V6z'] },
  bolt:   { path: ['M13 2 4 14h7l-1 8 9-12h-7z'] },
  check:  { path: ['m5 13 4 4L19 7'] },
  arrow:  { path: ['M5 12h14', 'm13 6 6 6-6 6'] }
}

const item = computed(() => MAP[props.name] || { path: [], circle: [] })
const paths = computed(() => item.value.path || [])
const circles = computed(() => item.value.circle || [])
</script>

<style scoped>
.ico { width: 18px; height: 18px; }
</style>
