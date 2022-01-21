<template>
  <nav class="docketBox flex">
    <ul class="docket grow-1 flex">
      <li class="docketItem center column">
        <img src="@/assets/desktopBackground/computer.png" />
      </li>
      <li class="docketItem center column">
        <img src="@/assets/desktopBackground/shop.png" />
      </li>
    </ul>
  </nav>
</template>
             
<script lang="ts" setup>
</script>
<style lang="scss" scoped>
.docketBox {
  backdrop-filter: blur(2px);
  height: 8vh;
  border-radius: 40px;
  min-width: 20vw;
  background-color: rgba(25, 255, 255, 0.6);
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translatex(-50%);
  padding: 0 10px;
  li {
    list-style: none;
  }
  .docket {
    transform: translateY(4px);
    .docketItem {
      width: 80px;
      transition: width 0.43s, transform 0.3s;
      cursor: pointer;
      img {
        object-fit: cover;
        height: 100%;
      }
      &:hover {
        width: 110px;
        transform: scale(1.3) translateY(-20%);
      }
    }
  }
}
</style>