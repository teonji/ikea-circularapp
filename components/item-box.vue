<script setup>
  const props = defineProps({
    id: Number,
    title: String,
    price: Number,
    articlesPrice: Number,
    priceDiff: Number,
    discount: Number,
    currency: String,
  })
</script>

<template>
  <div class="bg-gray-800 hover:bg-gray-900
               p-4 h-48
               flex justify-center items-center text-center
               rounded-lg border border-gray-700"
  >
    <div>
      <div>{{ title }}</div>
      <div class="text-lg mr-2 text-green-400">{{ price }} {{ currency }}</div>
      <div class="text-lg mr-2 text-red-400">-{{ discount }}%</div>
    </div>
  </div>
</template>
