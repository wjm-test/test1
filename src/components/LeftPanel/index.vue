<template>
  <div ref="leftPanel" :class="{show:show}" class="leftPanel-container">
    <div class="leftPanel-background" />
    <div class="leftPanel">
      <div class="handle-button" :style="{'top':buttonTop+'%','background-color':theme}" @click="show=!show">
        <i :class="show?'el-icon-arrow-left':'el-icon-arrow-right'" />
      </div>
      <div class="leftPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
// import { addClass, removeClass } from '@/utils'

export default {
  name: 'LeftPanel',
  props: {
    clickNotClose: {
      default: false,
      type: Boolean
    },
    buttonTop: {
      default: 30,
      type: Number
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    theme() {
      return this.$store.state.settings.theme
    }
  },
  watch: {
    show(value) {
      if (value && !this.clickNotClose) {
        this.addEventClick()
      }
      // if (value) {
      //   addClass(document.body, 'showLeftPanel')
      // } else {
      //   removeClass(document.body, 'showLeftPanel')
      // }
    }
  },
  mounted() {
    this.insertToBody()
  },
  beforeDestroy() {
    const elx = this.$refs.leftPanel
    elx.remove()
  },
  methods: {
    addEventClick() {
      window.addEventListener('click', this.closeSidebar)
    },
    closeSidebar(evt) {
      const parent = evt.target.closest('.leftPanel')
      if (!parent) {
        this.show = false
        window.removeEventListener('click', this.closeSidebar)
      }
    },
    insertToBody() {
      const elx = this.$refs.leftPanel
      const body = document.querySelector('body')
      body.insertBefore(elx, body.firstChild)
    }
  }
}
</script>

<style>

/* .showLeftPanel {
  overflow: hidden;
  position: relative;
  width: calc(0 - 15px);
} */
</style>

<style lang="scss" scoped>
.leftPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity .3s cubic-bezier(.7, .3, .1, 1);
  background: rgba(0, 0, 0, .2);
  z-index: -1;
}

.leftPanel {
  width: 100%;
  max-width: 260px;
  height: calc(100vh - 100px);
  position: fixed;
  bottom: 0;
  left: 210px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, .05);
  transition: all .25s cubic-bezier(.7, .3, .1, 1);
  transform: translate(-100%);
  background: #fff;
  z-index: 999;
}

.show {
  transition: all .3s cubic-bezier(.7, .3, .1, 1);

  .leftPanel-background {
    z-index: 998;
    opacity: 0;
    width: 100%;
    height: 100%;
  }

  .leftPanel {
    transform: translate(0);
  }
}

.handle-button {
  width: 40px;
  height: 56px;
  position: absolute;
  right: -40px;
  text-align: center;
  font-size: 24px;
  border-radius:  0 6px 6px 0  !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 56px;
  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
