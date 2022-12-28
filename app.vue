<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'

  const types = [{
    value: 'title:desc',
    label: 'Sort by title'
  }, {
    value: 'discount:asc',
    label: 'Sort by higher discount'
  }, {
    value: 'price:asc',
    label: 'Sort by higher price'
  }]

  const selectedType = ref('title:desc')
  const loading = ref(true)
  const search = ref('')
  const items = ref([])
  const storeCity = ref('Milano')
  const storeIds = ref(['233', '295', '455'])
  const stores = ref([])

  const sortBy = (array: any, key: string, direction = 'asc') => [...array].sort((a: any, b: any) => {
    if (direction === 'asc') return (a[key] < b[key]) ? 1 : -1
    else return (a[key] > b[key]) ? 1 : -1
  })
  const storeSelected = computed(() => stores.value.find((s: any) => s.city === storeCity.value))
  const itemsDiscounted = computed(() => sortBy(items.value, 'discount'))
  const itemsList = computed(() => {
    const typeSplit = selectedType.value.split(':')
    const list = sortBy(items.value, typeSplit[0], typeSplit[1])
    return list.filter(l => {
      if (search.value) {
        return l.title.toLowerCase().includes(search.value.toLowerCase()) || l.description.toLowerCase().includes(search.value.toLowerCase())
      }
      return true
    })
  })

  const reloadData = async () => {
    loading.value = true
    const { data } = await axios.get(`https://teonji.npkn.net/ikeapp?ids=${storeIds.value.join(',')}`)
    items.value = data?.content
    stores.value = data?.stores
    loading.value = false
  }

  const changeCity = () => {
    if (storeSelected.value && storeSelected.value && storeSelected.value?.stores) {
      storeIds.value = storeSelected.value.stores.map((s: any) => s.id)
      reloadData()
    }
  }

  onMounted(reloadData)
</script>

<template>
  <div class="flex bg-gray-900 text-white min-h-screen">
    <div v-if="!loading" class="w-full">
      <div class="container mx-auto">
        <div class="md:my-8 my-4">
          <div class="md:px-6 mx-4 md:mb-12 mb-4">
            <div class="bg-[#0058AB] text-[#FBD914] font-black
             p-4 h-[400px]
             flex justify-center items-center text-center
             rounded-lg border border-gray-700"
            >
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" height="300" width="350" viewBox="-122.61315 -82.9955 1062.6473 497.973">
                  <path d="M15.931 165.991c0 80.243 164.586 146.897 392.78 146.897 228.193 0 392.661-66.654 392.661-146.897S636.787 19.094 408.71 19.094c-228.076 0-392.779 66.654-392.779 146.897z" class="st1" fill="#ffdb00"/>
                  <path d="M276.34 102.148c-1.758 3.515-1.758 6.912-1.758 10.426v43.929s23.546-30.575 28.934-37.838c4.1-5.388 9.138-13.002 9.138-16.517h76.845c-5.271 3.515-11.128 9.84-15.931 15.697-4.217 5.155-28.115 34.323-28.115 34.323s35.495 54.003 40.063 60.914c2.577 3.749 5.389 7.263 8.669 10.426h-88.443c0-3.514-3.397-10.66-7.146-16.283-3.748-5.623-24.014-36.431-24.014-36.431v42.288c0 3.515 0 6.912 1.757 10.426h-73.682c1.757-3.514 1.757-6.911 1.757-10.426V112.574c0-3.514 0-6.911-1.757-10.426zm272.824 0h-142.21c1.756 3.515 1.756 6.912 1.756 10.426v100.508c0 3.515 0 6.912-1.757 10.426h142.211v-33.62c-3.514 1.757-6.911 1.757-10.425 1.757h-59.86v-15.931h57.517V150.06h-57.517v-16.05h59.86c3.514 0 6.911 0 10.425 1.64zm197.034 110.934c1.172 3.866 3.163 7.38 5.74 10.426h-77.08c.352-3.514-.937-6.911-2.342-10.426 0 0-1.172-2.811-2.812-6.911l-.703-1.757h-44.397l-.703 1.874s-1.288 3.397-2.46 6.912c-1.171 3.514-2.46 6.91-1.991 10.425h-60.797a30.721 30.721 0 005.506-10.425l36.431-100.51c1.289-3.514 2.577-6.911 2.109-10.426h102.734c-.937 3.515.937 6.912 2.225 10.426 3.046 7.614 35.963 93.597 38.54 100.391m-86.92-34.322l-10.777-28.115c-.937-2.577-1.757-5.271-2.342-7.965a46.958 46.958 0 01-2.109 7.965c-.352 1.172-4.92 13.472-10.191 28.115zm-493.287-66.186c0-3.514 0-6.911 1.757-10.426H87.623c1.757 3.515 1.757 6.912 1.757 10.426v100.508c0 3.515 0 6.912-1.757 10.426h80.125c-1.757-3.514-1.757-6.911-1.757-10.426zm555.607-.82c-.234 8.786 6.677 16.166 15.58 16.4 8.786.234 16.166-6.677 16.4-15.58v-.82c.118-8.669-6.677-15.814-15.345-15.931h-.586a15.284 15.284 0 00-15.932 14.877c-.234.351-.234.703-.117 1.054m28.7 0c.234 7.029-5.388 13.003-12.417 13.12-7.029.234-13.003-5.389-13.12-12.417v-.82c-.234-6.794 5.037-12.534 11.831-12.769h.938c6.911-.117 12.651 5.389 12.768 12.3v.586m-4.92 9.606h-3.163l-3.748-6.795h-4.1v6.795h-2.812v-19.212h7.146c3.397.118 5.974 2.812 5.974 6.209 0 2.343-1.288 4.451-3.397 5.623zm-7.146-9.606c1.875.117 3.515-1.289 3.515-3.163 0-1.874-1.289-3.514-3.163-3.514h-4.217v6.794h3.865" class="st0" fill="#0058a3"/>
                </svg>
                <span class="text-3xl">CIRCULAR APP</span>
              </div>
            </div>
          </div>
          <div class="md:px-6 mx-4 mb-4">
            <h2 class="container text-gray-500 text-lg">Best discounts items</h2>
          </div>
          <div class="mb-12 md:-mx-4 mx-4">
            <div v-if="itemsDiscounted.length" class="grid md:grid-cols-5 md:gap-4 grid-cols-2 gap-2">
              <item-box v-for="(i, k) in itemsDiscounted.slice(0, 5)" :key="i.id" v-bind="i" class="shadow-custom" :class="{'hidden md:block': k === 4}" />
            </div>
          </div>
          <div class="md:px-6 mx-4 mb-12">
            <form class="md:flex items-center mb-8">
              <div class="relative w-full">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" v-model="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search">
                <!--<button type="button" class="flex absolute inset-y-0 right-0 items-center pr-3">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clip-rule="evenodd"></path></svg>
                </button>-->
              </div>
            </form>
            <div class="md:flex justify-between items-center mb-4">
              <div class="md:flex justify-between items-center">
                <h2 class="text-gray-500 md:mb-2 text-lg">Present in {{ storeSelected.city }} ({{ items.length }} items)</h2>
                <div v-if="storeSelected.stores.length > 1" class="flex md:ml-4 py-4">
                  <div v-for="s in storeSelected.stores" :key="s" class="mr-2">
                    <input type="checkbox" :id="s.id" :value="s.id" v-model="storeIds" class="mr-2" @change="reloadData">
                    <label :for="s.shortName">{{ s.shortName }}</label>
                  </div>
                </div>
              </div>
              <div class="flex">
                <select v-model="storeCity" @change="changeCity" class="w-1/2 mr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option v-for="s in stores" :key="s" :value="s.city">
                    {{ s.city.charAt(0).toUpperCase() + s.city.slice(1) }}
                  </option>
                </select>
                <select v-model="selectedType" class="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option v-for="t in types" :key="t" :value="t.value">{{ t.label.charAt(0).toUpperCase() + t.label.slice(1) }}</option>
                </select>
              </div>
            </div>
            <div class="grid md:grid-cols-5 md:gap-4 grid-cols-1 gap-2">
              <item v-for="i in itemsList" :key="i.id" v-bind="i" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center items-center w-full">
      <div>
        <div class="text-[#0058AB] text-center font-black text-[60px] mb-4">IKEA</div>
        <div class="text-[#FBD914] text-center font-black text-3xl mb-4">CIRCULAR APP</div>
        <div class="flex justify-between">
          <div class="spinner-grow inline-block w-24 h-24 bg-[#0058AB] rounded-full opacity-0" />
          <div class="spinner-grow inline-block w-24 h-24 bg-[#FBD914] rounded-full opacity-0" />
        </div>
      </div>
    </div>
  </div>
  <div class="fixed bottom-0 w-full bg-blue-300 py-4 text-center mx-auto" :class="{'md:relative': !loading}">
    with 💜 from <a href="https://www.matteotritto.it">teonji</a>
  </div>
</template>

<style>
.shadow-custom {
  -webkit-box-shadow: 0 20px 25px -5px rgb(0 0 0 / 80%), 0 10px 10px -5px rgb(0 0 0 / 4%);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 80%), 0 10px 10px -5px rgb(0 0 0 / 4%);
}
@keyframes _spinner-grow{0%{transform:scale(0)}50%{opacity:1;transform:none}}
.spinner-grow {
  vertical-align: -0.125em;
  animation: .75s linear infinite _spinner-grow;
}
</style>
