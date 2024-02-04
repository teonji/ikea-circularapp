<script setup>
  const props = defineProps({
    countryLink: String,
    id: Number,
    title: String,
    description: String,
    price: Number,
    heroImage: String,
    articlesPrice: Number,
    priceDiff: Number,
    discount: Number,
    currency: String,
    store: Object,
  })
</script>

<template>
  <a :href="countryLink ? `${countryLink}/${id}` : null" target="_blank" class="mb-8 md:mb-0">
    <span class="bg-gray-800 hover:bg-gray-900
                 p-4 aspect-square
                 flex justify-start items-start
                 rounded-lg border border-gray-700
                 bg-cover bg-center"
          :style="{ backgroundImage: `url(${heroImage})` }"
    >
      <span class="inline-flex items-center rounded-full p-2 bg-[#FBD914] text-[#0058AB] font-extrabold group transition-all duration-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none" role="alert">
        <span>-{{ discount }}%</span>
        <span class="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-500 group-hover:px-2 group-focus:px-2">discount</span>
      </span>
    </span>
    <div class="mt-2 text-xl">{{ title }}</div>
    <div class="text-sm text-gray-400">{{ description }}</div>
    <div class="text-sm text-gray-400">
      <span class="text-lg mr-2 text-green-400">{{ price }} {{ currency }}</span>
      <span v-if="price !== articlesPrice" class="line-through mr-2">{{ articlesPrice }} {{ currency }}</span>
      <span class="text-white">@{{ store.shortName }}</span>
    </div>
  </a>
</template>
