<script setup lang="ts">
import HeaderVue from './components/Header.vue';
import MainVue from './components/Main.vue';
import { provide } from "vue"
import { ProvideInterface, MenuBarColorStatus } from "@/assets/config"

provide<ProvideInterface>("base", {
  menuBarColor: MenuBarColorStatus.black
})
</script>

<template>
  <HeaderVue />
  <MainVue />
</template>

<style>
@import "@/assets/base.css";
</style>
