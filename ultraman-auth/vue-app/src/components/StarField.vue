<template>
  <canvas ref="cvs" class="starfield"></canvas>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const cvs = ref(null)
let ctx = null
let raf = 0
let timer = null
let stars = []
let meteors = []
let w = 0
let h = 0

const dpr = () => Math.min(window.devicePixelRatio || 1, 2)

function resize() {
  const c = cvs.value
  if (!c) return
  w = c.clientWidth
  h = c.clientHeight
  c.width = w * dpr()
  c.height = h * dpr()
  ctx.setTransform(dpr(), 0, 0, dpr(), 0, 0)
  build()
}

function build() {
  stars = []
  const count = Math.min(200, Math.round((w * h) / 7200))
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + .3,
      a: Math.random() * .7 + .3,
      s: Math.random() * .25 + .05,
      t: Math.random() * Math.PI * 2
    })
  }
}

function spawnMeteor() {
  meteors.push({
    x: Math.random() * w * .8 + w * .2,
    y: -20,
    len: Math.random() * 90 + 60,
    spd: Math.random() * 5 + 5,
    a: 1
  })
}

function loop() {
  ctx.clearRect(0, 0, w, h)
  for (const st of stars) {
    st.t += st.s * .06
    const tw = .55 + Math.sin(st.t) * .45
    ctx.beginPath()
    ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(200,225,255,${(st.a * tw).toFixed(3)})`
    ctx.fill()
    st.y += st.s * .35
    if (st.y > h + 2) st.y = -2
  }
  for (let i = meteors.length - 1; i >= 0; i--) {
    const m = meteors[i]
    const g = ctx.createLinearGradient(m.x, m.y, m.x - m.len, m.y + m.len)
    g.addColorStop(0, `rgba(255,255,255,${m.a.toFixed(2)})`)
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.strokeStyle = g
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(m.x, m.y)
    ctx.lineTo(m.x - m.len, m.y + m.len)
    ctx.stroke()
    m.x -= m.spd
    m.y += m.spd
    m.a -= .012
    if (m.a <= 0) meteors.splice(i, 1)
  }
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  ctx = cvs.value.getContext('2d')
  resize()
  loop()
  timer = setInterval(spawnMeteor, 2600)
  window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  clearInterval(timer)
  window.removeEventListener('resize', resize)
})
</script>

<style scoped>
.starfield {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
