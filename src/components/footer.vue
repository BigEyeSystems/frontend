<script setup>
import { PhHouseSimple, PhChartPieSlice, PhUsersThree, PhUser } from "@phosphor-icons/vue";
import { ref, computed, onMounted } from 'vue';
import { useRoute, RouterLink } from "vue-router";

const route = useRoute();

const isClickedHome = ref(false);
const isClicked = ref(false);
const isClickedReferral = ref(false);
const isClickedProfile = ref(false);

const resetAll = () => {
    isClickedHome.value = false;
    isClicked.value = false;
    isClickedReferral.value = false;
    isClickedProfile.value = false;
};

const updateButtonState = () => {
    resetAll();
    switch (route.path) {
        case '/':
            isClickedHome.value = true;
            break;
        case '/analytics':
            isClicked.value = true;
            break;
        case '/referrals':
            isClickedReferral.value = true;
            break;
        case '/profile':
            isClickedProfile.value = true;
            break;
    }
};

onMounted(() => {
    updateButtonState();
});

const toggleHome = () => {
    resetAll();
    isClickedHome.value = true;
};

const toggleAnalytics = () => {
    resetAll();
    isClicked.value = true;
};

const toggleReferrals = () => {
    resetAll();
    isClickedReferral.value = true;
};

const toggleProfile = () => {
    resetAll();
    isClickedProfile.value = true;
};

const iconColorHome = computed(() => (isClickedHome.value ? 'white' : '#797979'));
const iconColor = computed(() => (isClicked.value ? 'white' : '#797979'));
const iconColorReferral = computed(() => (isClickedReferral.value ? 'white' : '#797979'));
const iconColorProfile = computed(() => (isClickedProfile.value ? 'white' : '#797979'));
</script>

<template>
    <div id="app" class="rounded-[calc(1.5rem-10px)] p-1 bg-[#212225] p-3 flex justify-between text-xs">
        <RouterLink to="/" @click="toggleHome">
            <div class="flex flex-col justify-center gap-1">
                <div class="flex justify-center">
                    <PhHouseSimple :size="24" :class="{ 'text-white fill-current': isClickedHome }"
                        :color="iconColorHome" />
                </div>
                <p :class="{ 'text-white': isClickedHome, 'text-[#797979]': !isClickedHome }">Home</p>
            </div>
        </RouterLink>
        <RouterLink to='/analytics' @click="toggleAnalytics">
            <div class="flex flex-col justify-center gap-1">
                <div class="flex justify-center">
                    <PhChartPieSlice :size="24" :class="{ 'text-white fill-current': isClicked }" :color="iconColor" />
                </div>
                <p :class="{ 'text-white': isClicked, 'text-[#797979]': !isClicked }">Analytics</p>
            </div>
        </RouterLink>
        <RouterLink to='/referrals' @click="toggleReferrals">
            <div class="flex flex-col justify-center gap-1">
                <div class="flex justify-center">
                    <PhUsersThree :size="24" :class="{ 'text-white fill-current': isClickedReferral }"
                        :color="iconColorReferral" />
                </div>
                <p :class="{ 'text-white': isClickedReferral, 'text-[#797979]': !isClickedReferral }">Referrals</p>
            </div>
        </RouterLink>
        <RouterLink to='/profile' @click="toggleProfile">
            <div class="flex flex-col justify-center gap-1">
                <div class="flex justify-center">
                    <PhUser :size="24" :class="{ 'text-white fill-current': isClickedProfile }" :color="iconColorProfile" />
                </div>
                <p :class="{ 'text-white': isClickedProfile, 'text-[#797979]': !isClickedProfile }">Profile</p>
            </div>
        </RouterLink>
    </div>
</template>
