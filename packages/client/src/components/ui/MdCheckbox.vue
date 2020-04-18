<template>
  <div class="pointer" :class="{ checked }">
    <input class="checkbox dn" type="checkbox" />

    <div class="indicator flex items-center">
      <svg class="flex-shrink-0 mr3" width="18px" height="18px" viewBox="0 0 18 18">
        <path
          d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"
        />
        <polyline points="1 9 7 14 15 4" />
      </svg>
    </div>

    <slot />
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    checked: { type: Boolean },
  },
  data() {
    return {
      uid: null,
    }
  },
  mounted() {
    this.uid = `checkbox-${this._uid}`
  },
}
</script>

<style lang="scss" scoped>
.indicator::v-deep {
  position: relative;
  -webkit-tap-highlight-color: transparent;
  transform: translate3d(0, 0, 0);
  &:before {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(34, 50, 84, 0.03);
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  svg {
    position: relative;
    z-index: 1;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: var(--moon-gray);
    stroke-width: 1.5;
    transform: translate3d(0, 0, 0);
    transition: all 0.2s ease;
    path {
      stroke-dasharray: 60;
      stroke-dashoffset: 0;
    }
    polyline {
      stroke-dasharray: 22;
      stroke-dashoffset: 66;
    }
  }
  &:hover {
    // &:before {
    //   opacity: 1;
    // }
    svg {
      stroke: var(--blue);
    }
  }
}

.checked::v-deep > .indicator {
  svg {
    stroke: var(--blue);
    path {
      stroke-dashoffset: 60;
      transition: all 0.3s linear;
    }
    polyline {
      stroke-dashoffset: 42;
      transition: all 0.2s linear;
      transition-delay: 0.15s;
    }
  }
}
</style>
