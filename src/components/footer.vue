<script setup>
import { PhHouseSimple, PhChartPieSlice, PhUsersThree, PhUser } from "@phosphor-icons/vue";
import { ref, computed, onMounted, shallowRef } from 'vue';
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n( {useScope: 'global'} ); 

const footerItems = ref([
    {link: '/', text: 'home', iconComponent: PhHouseSimple},
    {link: '/analytics', text: 'analytics', iconComponent: PhChartPieSlice},
    {link: '/referrals', text: 'referrals', iconComponent: PhUsersThree},
    {link: '/profile', text: 'profile', iconComponent: PhUser},
])
</script>

<template>
    <div class="rounded-[calc(1.5rem-10px)] p-1 bg-[#303339] flex justify-between text-xs">
        
        <RouterLink v-for="(menuItem, index) in footerItems" :key="index" :to="menuItem.link" class="w-full">
            <div class="flex flex-col px-2 rounded-xl w-full h-[71px] justify-center items-center gap-1" :class="$route.path === menuItem.link ? 'text-white' : 'text-[#797979]'">
                <div class="flex justify-center">
                    <component :is="menuItem.iconComponent" size="24" :color="$route.path === menuItem.link ? 'white' : '#797979' " />
                </div>
                <p>
                    {{ $t(`footer.${menuItem.text}`) }}
                </p>
            </div>
        </RouterLink>
    </div>
</template>
