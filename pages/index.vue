<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'

  const types = [{
    value: 'title:desc',
    label: 'Sort by title'
  }, {
    value: 'discount:asc',
    label: 'Sort by discount'
  }, {
    value: 'price:asc',
    label: 'Sort by price'
  }]

  const countries = [
    {
      name: 'Belgium',
      code: 'be/fr',
      default: {
        city: 'Anderlecht',
        store: ['482']
      }
    },
    {
      name: 'Czechia',
      code: 'cz/cz',
      default: {
        city: 'Brno',
        store: ['278']
      }
    },
    {
      name: 'Denmark',
      code: 'dk/dk',
      default: {
        city: 'Aalborg',
        store: ['005']
      }
    },
    {
      name: 'España',
      code: 'es/es',
      default: {
        city: 'A Coruña',
        store: ['502']
      }
    },
    {
      name: 'Finland',
      code: 'fi/fi',
      default: {
        city: 'Espoo',
        store: ['202']
      }
    },
    {
      name: 'France',
      code: 'fr/fr',
      default: {
        city: 'Paris Nord',
        store: ['131']
      }
    },
    {
      name: 'Germany',
      code: 'de/de',
      default: {
        city: 'Augsburg',
        store: ['066']
      }
    },
    {
      name: 'Hungary',
      code: 'hu/hu',
      default: {
        city: 'Budaörs',
        store: ['182']
      }
    },
    {
      name: 'Ireland',
      code: 'ie/ie',
      default: {
        city: 'Dublin',
        store: ['038']
      }
    },
    {
      name: 'Italy',
      code: 'it/it',
      storeLink: 'https://www.ikea.com/it/it/campaigns/circular-hub-online-pubca33ae00#',
      default: {
        city: 'Milano',
        store: ['233', '295', '455']
      }
    },
    {
      name: 'Netherlands',
      code: 'nl/nl',
      default: {
        city: 'Amersfoort',
        store: ['415']
      }
    },
    {
      name: 'Poland',
      code: 'pl/pl',
      default: {
        city: 'Bydgoszcz',
        store: ['429']
      }
    },
    {
      name: 'Romania',
      code: 'ro/ro', //
      default: {
        city: 'Bucuresti Baneasa',
        store: ['059']
      }
    },
    {
      name: 'Slovakia',
      code: 'sk/sk',
      default: {
        city: 'Bratislava',
        store: ['489']
      }
    },
    {
      name: 'Sweden',
      code: 'se/se',
      default: {
        city: 'Älmhult',
        store: ['268']
      }
    },
    {
      name: 'Switzerland',
      code: 'ch/fr',
      default: {
        city: 'Aubonne',
        store: ['078']
      }
    },
    {
      name: 'United kingdom',
      code: 'gb/en',
      default: {
        city: 'Bristol',
        store: ['264']
      }
    },
  ]

  const router = useRouter()

  const searchParams = new URLSearchParams(window.location.search)

  const searchParamsObject: any = {}
  for (let [key, value] of searchParams.entries()) {
    if (key.includes('[]')) {
      key = key.replace('[]', '')
      if (!searchParamsObject[key]) searchParamsObject[key] = []
      searchParamsObject[key].push(value)
    } else {
      searchParamsObject[key] = value
    }
  }

  const selectedType = ref(searchParamsObject?.sort ?? 'title:desc')
  const loading = ref(true)
  const country = ref(searchParamsObject?.country ?? countries.find(c => c.name === 'Italy')?.code)
  const search = ref('')
  const items = ref([])
  const city = ref(searchParamsObject?.city ?? 'Milano')
  const storeIds = ref(searchParamsObject?.store ?? ['233', '295', '455'])
  const stores = ref([])

  const sortBy = (array: any, key: string, direction: string = 'asc') => [...array].sort((a: any, b: any) => {
    if (direction === 'asc') return (a[key] < b[key]) ? 1 : -1
    else return (a[key] > b[key]) ? 1 : -1
  })
  const countryData = computed(() => countries.find(c => c.code === country.value))
  const storeSelected = computed(() => stores.value.find((s: any) => s.city === city.value))
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
    const { data } = await axios.get(`https://teonji.npkn.net/ikeapp?ids=${storeIds.value.join(',')}&country=${country.value}`)
    items.value = data?.content
    stores.value = data?.stores
    loading.value = false
  }

  const updateUrl = () => router.push({ path: '/', query: { city: city.value, 'store[]': storeIds.value, sort: selectedType.value, country: country.value } })

  const changeCountry = () => {
    const defaultData = countryData.value?.default
    storeIds.value = defaultData?.store
    city.value = defaultData?.city
    updateUrl()
    reloadData()
  }

  const changeCity = () => {
    if (storeSelected.value && storeSelected.value && storeSelected.value?.stores) {
      storeIds.value = storeSelected.value.stores.map((s: any) => s.id)
      updateUrl()
      reloadData()
    }
  }

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  onMounted(() => {
    reloadData()
    let toTopButton = document.getElementById('to-top-button')
    window.onscroll = function () {
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        toTopButton.classList.remove("hidden");
      } else {
        toTopButton.classList.add("hidden");
      }
    }
  })
</script>

<template>
  <div class="flex bg-gray-900 text-white min-h-screen">
    <div class="w-full">
      <div class="container mx-auto h-full">
        <div class="md:my-8 my-4">
          <div class="md:px-6 mx-4 md:mb-8 mb-4">
            <div class="bg-[#0058AB] text-[#FBD914] font-black
             p-4 h-[200px]
             flex justify-center items-center text-center
             rounded-lg border border-gray-700"
            >
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" height="100" width="350" viewBox="-122.61315 -82.9955 1062.6473 497.973">
                  <path d="M15.931 165.991c0 80.243 164.586 146.897 392.78 146.897 228.193 0 392.661-66.654 392.661-146.897S636.787 19.094 408.71 19.094c-228.076 0-392.779 66.654-392.779 146.897z" class="st1" fill="#ffdb00"/>
                  <path d="M276.34 102.148c-1.758 3.515-1.758 6.912-1.758 10.426v43.929s23.546-30.575 28.934-37.838c4.1-5.388 9.138-13.002 9.138-16.517h76.845c-5.271 3.515-11.128 9.84-15.931 15.697-4.217 5.155-28.115 34.323-28.115 34.323s35.495 54.003 40.063 60.914c2.577 3.749 5.389 7.263 8.669 10.426h-88.443c0-3.514-3.397-10.66-7.146-16.283-3.748-5.623-24.014-36.431-24.014-36.431v42.288c0 3.515 0 6.912 1.757 10.426h-73.682c1.757-3.514 1.757-6.911 1.757-10.426V112.574c0-3.514 0-6.911-1.757-10.426zm272.824 0h-142.21c1.756 3.515 1.756 6.912 1.756 10.426v100.508c0 3.515 0 6.912-1.757 10.426h142.211v-33.62c-3.514 1.757-6.911 1.757-10.425 1.757h-59.86v-15.931h57.517V150.06h-57.517v-16.05h59.86c3.514 0 6.911 0 10.425 1.64zm197.034 110.934c1.172 3.866 3.163 7.38 5.74 10.426h-77.08c.352-3.514-.937-6.911-2.342-10.426 0 0-1.172-2.811-2.812-6.911l-.703-1.757h-44.397l-.703 1.874s-1.288 3.397-2.46 6.912c-1.171 3.514-2.46 6.91-1.991 10.425h-60.797a30.721 30.721 0 005.506-10.425l36.431-100.51c1.289-3.514 2.577-6.911 2.109-10.426h102.734c-.937 3.515.937 6.912 2.225 10.426 3.046 7.614 35.963 93.597 38.54 100.391m-86.92-34.322l-10.777-28.115c-.937-2.577-1.757-5.271-2.342-7.965a46.958 46.958 0 01-2.109 7.965c-.352 1.172-4.92 13.472-10.191 28.115zm-493.287-66.186c0-3.514 0-6.911 1.757-10.426H87.623c1.757 3.515 1.757 6.912 1.757 10.426v100.508c0 3.515 0 6.912-1.757 10.426h80.125c-1.757-3.514-1.757-6.911-1.757-10.426zm555.607-.82c-.234 8.786 6.677 16.166 15.58 16.4 8.786.234 16.166-6.677 16.4-15.58v-.82c.118-8.669-6.677-15.814-15.345-15.931h-.586a15.284 15.284 0 00-15.932 14.877c-.234.351-.234.703-.117 1.054m28.7 0c.234 7.029-5.388 13.003-12.417 13.12-7.029.234-13.003-5.389-13.12-12.417v-.82c-.234-6.794 5.037-12.534 11.831-12.769h.938c6.911-.117 12.651 5.389 12.768 12.3v.586m-4.92 9.606h-3.163l-3.748-6.795h-4.1v6.795h-2.812v-19.212h7.146c3.397.118 5.974 2.812 5.974 6.209 0 2.343-1.288 4.451-3.397 5.623zm-7.146-9.606c1.875.117 3.515-1.289 3.515-3.163 0-1.874-1.289-3.514-3.163-3.514h-4.217v6.794h3.865" class="st0" fill="#0058a3"/>
                </svg>
                <span class="text-3xl">CIRCULAR APP</span>
              </div>
            </div>
          </div>
          <div v-if="!loading" class="md:px-6 mx-4 mb-8">
            <div class="md:flex items-center mb-4 md:mb-8 bg-gray-900 -mx-4 px-4 py-4 sticky top-0 z-50">
              <div class="relative w-full">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" v-model="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search">
                <button v-if="search" @click="search = ''" type="button" class="flex absolute inset-y-0 right-0 items-center pr-3">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
            </div>
            <div class="md:flex justify-between items-center mb-8">
              <div class="md:flex justify-between items-center">
                <h2 v-if="storeSelected" class="text-gray-500 text-lg">
                  <span :class="[itemsList.length ? 'text-green-400' : 'text-red-400']">
                    {{ itemsList.length }}
                  </span>
                  items available
                  <span v-if="search === ''">in {{ storeSelected.city }}</span>
                </h2>
                <div v-if="storeSelected && storeSelected.stores.length > 1" class="flex md:ml-4 py-4">
                  <div v-for="s in storeSelected.stores" :key="s" class="flex justify-center items-center">
                    <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                      <input type="checkbox" :id="s.id" :value="s.id" v-model="storeIds" :name="s.shortName" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" @change="reloadData">
                      <label :for="s.shortName" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" />
                    </div>
                    <label for="toggle" class="text-xs text-gray-500 mr-4">{{ s.shortName }}</label>
                  </div>
                </div>
              </div>
              <div class="flex">
                <select v-model="country" @change="changeCountry" class="w-1/2 mr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option v-for="c in countries" :key="c" :value="c.code">
                    {{ c.name }}
                  </option>
                </select>
                <select v-model="city" @change="changeCity" class="w-1/2 mr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option v-for="s in stores" :key="s" :value="s.city">
                    {{ s.city.charAt(0).toUpperCase() + s.city.slice(1) }}
                  </option>
                </select>
                <select v-model="selectedType" @change="updateUrl" class="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option v-for="t in types" :key="t" :value="t.value">{{ t.label }}</option>
                </select>
              </div>
            </div>
            <div class="grid md:grid-cols-5 md:gap-4 grid-cols-1 gap-2">
              <item v-for="i in itemsList" :key="i.id" v-bind="i" :country-link="countryData.storeLink" />
            </div>
            <div v-if="itemsList.length === 0" class="w-full text-center mx-auto">
              No items found.
            </div>
          </div>
        </div>
        <div v-if="loading" class="flex justify-center items-center h-1/2 w-full pb-8">
            <div class="flex justify-between w-1/2 md:w-1/6 mx-auto">
              <div class="spinner-grow inline-block w-24 h-24 bg-[#0058AB] rounded-full opacity-0" />
              <div class="spinner-grow inline-block w-24 h-24 bg-[#FBD914] rounded-full opacity-0" />
            </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-center bottom-0 w-full bg-blue-300 py-4 text-center mx-auto" :class="{'fixed': loading}">
    <span class="mr-2">with 💜 from</span>
    <a href="https://www.matteotritto.it">teonji</a>
    <span class="mx-2">-</span>
    <a href="https://github.com/teonji/ikea-circularapp" class="flex">
      <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      <span>Github</span>
    </a>
  </div>
  <button id="to-top-button" @click="goToTop" title="Go To Top" class="hidden fixed z-90 bottom-8 right-8 border-0 w-16 h-16 rounded-full drop-shadow-md bg-[#0058AB] text-[#FBD914] text-3xl font-bold">&uarr;</button>
</template>

<style>
@keyframes _spinner-grow{
  0% {
    transform: scale(0)
  }
  50% {
    opacity: 1;
    transform: none
  }
}
.spinner-grow {
  vertical-align: -0.125em;
  animation: .75s linear infinite _spinner-grow;
}
.toggle-checkbox:checked {
  @apply: right-0 border-green-400;
  right: 0;
  border-color: #68D391;
}
.toggle-checkbox:checked + .toggle-label {
  @apply: bg-green-400;
  background-color: #68D391;
}
</style>
