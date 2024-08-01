<script setup>
import { Alert } from "vue-tg";
import menuItems from "../components/menuItem.vue";
import graph from "../components/icons/graph.vue";
</script>

<template>
  <main>
    <div class="flex gap-4">
      <menuItems title="Menu Item 1">
        <template #icon>
          <graph />
        </template>
      </menuItems>
      <menuItems title="Menu Item 2">
        <template #icon>
          <graph />
        </template>
      </menuItems>
      <menuItems title="Menu Item 3">
        <template #icon>
          <graph />
        </template>
      </menuItems>
    </div>

    <Alert title="Hello" message="This is a message" />
  </main>
</template>
