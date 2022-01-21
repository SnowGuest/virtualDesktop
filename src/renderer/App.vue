<script setup lang="ts">
import HeaderVue from "./components/Header.vue";
import MainVue, { API as MainAPI } from "./components/Main.vue";
import { provide, ref } from "vue";
import { ProvideInterface, MenuBarColorStatus } from "@/assets/config";

const Main = ref<MainAPI>();
function loadDesktop() {
  Main.value?.loadDesktop();
}
provide<ProvideInterface>("base", {
  menuBarColor: MenuBarColorStatus.black,
  loadDesktop,
});
</script>

<template>
  <HeaderVue />
  <MainVue ref="Main" />
  <router-view></router-view>
</template>

<style>
@import "@/assets/base.css";
</style>
