<script setup>
import { Alert } from "vue-tg";
import menuItems from "../components/menuItem.vue";
import Header from "../components/Header.vue";
import graph from "../components/icons/graph.vue";
import cube from "../components/icons/cube.vue";
</script>

<template>
  <main>
    <Header UserName="John Doe" />
    <div class="flex gap-4 my-4">
      <menuItems title="Импульсы цены">
        <template #icon>
          <graph />
        </template>
      </menuItems>
      <menuItems title="ТОП тикеры">
        <template #icon>
          <cube />
        </template>
      </menuItems>
      <menuItems title="Ставки финансирования">
        <template #icon>
          <graph />
        </template>
      </menuItems>
    </div>
    <div class="flex gap-4">
      <menuItems title="Градация  объёмов">
        <template #icon>
          <graph />
        </template>
      </menuItems>
      <menuItems title="Рост активов">
        <template #icon>
          <graph />
        </template>
      </menuItems>
      <menuItems title="Отслеживание актива">
        <template #icon>
          <graph />
        </template>
      </menuItems>
    </div>
    <h3>TOP 5 тикеры</h3>
    <p>Последнее обновление:</p>
    <Alert title="Welcome to smart trade!" message="Tade with us, success with us!" />
  </main>
</template>
