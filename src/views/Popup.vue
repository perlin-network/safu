<template>
  <div class="overlay" @click.self="closePopup()">
    <div class="popup">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    close: Function
  },
  methods: {
    closePopup() {
      this.close();
    }
  }
};
</script>

<style scoped>
.overlay {
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 0;
  margin: 0 0;
  width: 100%;
  height: 100%;
  background-color: rgba(224, 224, 224, 0.6);
}
.popup {
  position: absolute;
  top: 60px;
  left: 100px;
  height: calc(100% - 120px);
  width: calc(100% - 200px);
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 0 5px #aaaaaa;
}
</style>
