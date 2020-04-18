<template>
  <div
    class="step flex items-center pa2 f6 br3 w5 br--right"
    :tabindex="canInteract ? 0 : -1"
    :class="{
      'done': done && !current,
      'bg-blue white': current,
      'green': done && !current,
      'pointer': canInteract,
      'non-selectable o-10': blocked,
    }"
    v-on="$listeners"
  >
    <div
      class="f7 flex items-center justify-center mr2 w1 h1 br-100 non-selectable no-underline"
      :class="{
        'blue bg-white': current,
        'bg-moon-gray white': !current,
        'bg-green': done && !current,
      }"
    >
      <span v-if="done">
        <check-icon :size="8"></check-icon>
      </span>
      <span class="lh-solid" v-else>
        {{ index + 1 }}
      </span>
    </div>

    <div class="relative" :class="{ 'underline-hover': canInteract }">
      {{ step }}

      <div v-if="bold" class="dot absolute br-100 bg-blue" />
    </div>
    <slot />
  </div>
</template>

<script>
import CheckIcon from 'vue-material-design-icons/Check.vue'

export default {
  components: {
    CheckIcon,
  },
  props: {
    bold: { type: Boolean, required: true },
    blocked: { type: Boolean, required: true },
    canInteract: { type: Boolean, required: true },
    current: { type: Boolean, required: true },
    done: { type: Boolean, required: true },
    index: { type: Number, required: true },
    step: { type: String, required: true },
  },
}
</script>

<style scoped>
div:hover > .underline-hover,
div:focus-visible > .underline-hover {
  text-decoration: underline;
}
.step.done:focus-visible {
  box-shadow: 0 0 6px 0px #19a974;
  border-left: 0.5rem solid var(--green);
  margin-left: -0.5rem;
  width: calc(100% + 0.5rem);
}
.dot {
  height: 8px;
  width: 8px;
  top: 5px;
  right: -16px;
}
</style>
