<script setup>
import { PhHouseSimple, PhChartPieSlice, PhUsersThree, PhUser } from "@phosphor-icons/vue";
import { ref, computed } from 'vue';

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
    <div class="rounded-[calc(1.5rem-10px)] p-1 bg-[#212225] p-3 flex justify-between text-xs">
        <div class="flex flex-col justify-center gap-1" @click="toggleHome">
            <div class="flex justify-center">
                <PhHouseSimple :size="24" :class="{'text-white fill-current': isClickedHome}" :color="iconColorHome"/>
            </div>
            <p :class="{'text-white': isClickedHome, 'text-[#797979]': !isClickedHome}">Home</p>
        </div>
        <div class="flex flex-col justify-center gap-1" @click="toggleAnalytics">
            <div class="flex justify-center">
                <PhChartPieSlice :size="24" :class="{'text-white fill-current': isClicked}" :color="iconColor"/>
            </div>
            <p :class="{'text-white': isClicked, 'text-[#797979]': !isClicked}">Analytics</p>
        </div>
        <div class="flex flex-col justify-center gap-1" @click="toggleReferrals">
            <div class="flex justify-center">
                <PhUsersThree :size="24" :class="{'text-white fill-current': isClickedReferral}" :color="iconColorReferral"/>
            </div>
            <p :class="{'text-white': isClickedReferral, 'text-[#797979]': !isClickedReferral}">Referrals</p>
        </div>
        <div class="flex flex-col justify-center gap-1" @click="toggleProfile">
            <div class="flex justify-center">
                <PhUser :size="24" :class="{'text-white fill-current': isClickedProfile}" :color="iconColorProfile"/>
            </div>
            <p :class="{'text-white': isClickedProfile, 'text-[#797979]': !isClickedProfile}">Profile</p>
        </div>
    </div>
</template>
