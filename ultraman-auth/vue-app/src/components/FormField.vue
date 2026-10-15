<template>
  <div class="field" :class="{ error: !!error, focus }">
    <label class="label" :for="id">{{ label }}</label>

    <div class="box">
      <AppIcon v-if="icon" :name="icon" class="lead" />

      <input
        :id="id"
        class="input"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        @input="onInput"
        @focus="focus = true"
        @blur="focus = false"
      />

      <button v-if="type === 'password'" type="button" class="toggle" @click="revealed = !revealed"
              :aria-label="revealed ? '隐藏密码' : '显示密码'">
        <AppIcon :name="revealed ? 'eyeoff' : 'eye'" />
      </button>

      <AppIcon v-if="!error && modelValue && type !== 'password'" name="check" class="checked" />
    </div>

    <p class="msg">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  icon: { type: String, default: '' },
  error: { type: String, default: '' },
  autocomplete: { type: String, default: 'off' }
})
const emit = defineEmits(['update:modelValue'])

let uid = 0
const id = 'f' + (++uid) + Math.random().toString(36).slice(2, 7)
const revealed = ref(false)
const focus = ref(false)

const inputType = computed(() => (props.type === 'password' && revealed.value ? 'text' : props.type))
const onInput = (e) => emit('update:modelValue', e.target.value)
</script>

<style scoped>
.field { margin-bottom: 4px; }
.field.error { animation: shake .42s var(--ease); }

.label {
  display: block;
  margin: 0 0 8px 2px;
  font-size: 12.5px;
  letter-spacing: 1.5px;
  color: var(--muted);
  transition: color .25s;
}
.field.focus .label { color: var(--cyan); }

.box {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 46px;
  padding: 0 14px;
  border-radius: 13px;
  background: rgba(6, 14, 32, .68);
  border: 1px solid var(--line);
  transition: border-color .25s, box-shadow .25s, background .25s;
}
.field.focus .box {
  border-color: rgba(70, 226, 255, .7);
  box-shadow: 0 0 0 4px rgba(70, 226, 255, .12);
  background: rgba(8, 20, 44, .92);
}
.field.error .box {
  border-color: var(--err);
  box-shadow: 0 0 0 4px rgba(255, 107, 107, .12);
}

.lead { flex: none; color: #6c7ea3; transition: color .25s; }
.field.focus .lead, .field.error .lead { color: var(--cyan); }
.field.error .lead { color: var(--err); }

.input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--text);
  font-size: 15px;
  font-family: inherit;
}
.input::placeholder { color: #5d6c8c; }

.toggle {
  flex: none;
  border: 0;
  padding: 4px;
  border-radius: 8px;
  background: transparent;
  color: #6c7ea3;
  cursor: pointer;
  transition: color .2s, background .2s;
}
.toggle:hover { color: var(--cyan); background: rgba(70, 226, 255, .1); }

.checked { flex: none; color: var(--ok); }

.msg {
  margin: 5px 0 8px 2px;
  min-height: 14px;
  font-size: 12px;
  color: var(--err);
}
</style>
