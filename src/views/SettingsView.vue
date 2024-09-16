<script setup>
import { ref, onMounted, watch } from 'vue';
import { Switch } from 'ant-design-vue';
import LocalesView from './LocalesView.vue';
import axios from 'axios';
import { useI18n } from "vue-i18n";
const { t } = useI18n( {useScope: 'global'} ); 

const responseSettings = ref(null);
const checkedNotification = ref(true);
const checkedImpulse = ref(false); 
const checkedActive = ref(false); 
const checkedFundFinance = ref(true);
const checkedFunctionPremission = ref(false);
const checkedImbalances = ref(false);
const checkedCancelKeyLiquidity = ref(false);
const checkedTrendTouch = ref(false);
const checkedRSI = ref(false);
const checkedTradeRecommendations = ref(false);
const checkedFibonacciNotice = ref(false);
const checkedGrowthGradation = ref(false);
const openLocales = ref(false);

const toggleTeleport = () => {
    openLocales.value = !openLocales.value;
};

onMounted(async () => {
    try {
        const response = await axios.get(
          "https://dsde1736.fornex.org/api/user/get_notifications",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        responseSettings.value = response.data;

        checkedImpulse.value = responseSettings.value?.notifications.last_impulse ?? false;
        checkedActive.value = responseSettings.value?.notifications.tracking_ticker ?? false;
    } catch (error) {
        console.log("Error fetching data: " + error);
    }
});

watch(responseSettings, (newValue) => {
    checkedImpulse.value = newValue?.notifications.last_impulse ?? false;
    checkedActive.value = newValue?.notifications.tracking_ticker ?? false;
});

const onChange = async (key, value) => {
    switch (key) {
        case 'impulse':
            checkedImpulse.value = value;
            responseSettings.value.notifications.last_impulse = value;
            break;
        case 'active':
            checkedActive.value = value;
            responseSettings.value.notifications.tracking_ticker = value;
            break;
    }

    try {
        await axios.post(
            "https://dsde1736.fornex.org/api/user/update_notifications", 
            {
                last_impulse: checkedImpulse.value,
                tracking_ticker: checkedActive.value,
            }, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }
        );
    } catch (error) {
        console.log("Error updating notifications: " + error);
    }
};
</script>

<template>
    <div>
        {{responseSettings?.notifications.last_impulse}}
        <div class="flex mb-4 items-center justify-between w-1/2">
            <button class="flex text-sm text-[#B8B8B8] items-center" @click="$router.go(-1)">
                <PhCaretLeft :size="22" color="#B8B8B8" />{{ $t('back')}}
            </button>
            <div>
                <p class="text-lg font-semibold translate-x-2/4">{{ $t('settingsPage.title')}}</p>
            </div>
        </div>
        <div>
            <div class="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-[#ffffff1f] to-[#ffffff12] rounded-xl my-4"
                @click="toggleTeleport">
                <div class="flex flex-col gap-1">
                    <p class="text-sm font-semibold">Русский</p>
                    <p class="text-xs text-[#b8b8b8]">{{ $t('settingsPage.lang')}}</p>
                </div>
                <PhCaretRight :size="24" color="#b2b2b2" />
            </div>
            <div
                class="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-[#ffffff1f] to-[#ffffff12] rounded-xl my-4">
                <div class="flex gap-1">
                    <p class="text-sm">{{ $t('settingsPage.notificationsSmartAnalytics')}}</p>
                </div>
                <Switch default-checked v-model:checked="checkedNotification" @change="onChange" />
            </div>
        </div>
        <p class="text-sm font-semibold mb-4">{{ $t('settingsPage.alerts')}}</p>
        <div class="bg-gradient-to-r from-[#ffffff1f] to-[#ffffff12] px-4 py-3 rounded-lg text-sm">
            <div class="flex justify-between py-4 setting-border">
                <p>{{ $t('premiumPage.impulses')}}</p>
                <Switch default-checked v-model:checked="checkedImpulse" @change="onChange" />
            </div>
            <div class="flex justify-between py-4 setting-border">
                <p>{{ $t('premiumPage.assetTracking')}}</p>
                <Switch default-checked v-model:checked="checkedActive" @change="onChange" />
            </div>
            <div class="flex justify-between py-4 setting-border">
                <p>{{ $t('premiumPage.fundingRate')}}</p>
                <Switch default-checked v-model:checked="checkedFundFinance" @change="onChange" />
            </div>
            <div class="flex justify-between py-4 setting-border">
                <p>{{ $t('premiumPage.accessNewFeatures')}}</p>
                <Switch default-checked v-model:checked="checkedFunctionPremission" @change="onChange" disabled/>
            </div>
            <div class="flex justify-between py-4 setting-border">
                <p>{{ $t('premiumPage.imbalance')}}</p>
                <Switch default-checked v-model:checked="checkedImbalances" @change="onChange" disabled/>
            </div>
            <div class="flex justify-between py-4 setting-border">
                <p>{{ $t('premiumPage.liqudities')}} </p>
                <Switch default-checked v-model:checked="checkedCancelKeyLiquidity" @change="onChange" disabled/>
            </div>
            <div class="flex justify-between py-4 setting-border">
                <p>{{ $t('premiumPage.gradationVolume')}}</p>
                <Switch default-checked v-model:checked="checkedGrowthGradation" @change="onChange" disabled/>
            </div>
            <div class="flex justify-between py-4 setting-border">
                <p>{{ $t('premiumPage.fibonacci')}} </p>
                <Switch default-checked v-model:checked="checkedFibonacciNotice" @change="onChange" disabled/>
            </div>
            <div class="flex justify-between py-4 setting-border">
                <p>{{ $t('premiumPage.tradingRecommendations')}}</p>
                <Switch default-checked v-model:checked="checkedTradeRecommendations" @change="onChange" disabled/>
            </div>
            <div class="flex justify-between py-4 setting-border">
                <p>{{ $t('premiumPage.RSI')}}</p>
                <Switch default-checked v-model:checked="checkedRSI" @change="onChange" disabled/>
            </div>
            <div class="flex justify-between py-4">
                <p>{{ $t('premiumPage.touchingTrend')}} </p>
                <Switch default-checked v-model:checked="checkedTrendTouch" @change="onChange" disabled/>
            </div>
        </div>
        <Teleport to="body">
            <transition name="modal">
                <div v-if="openLocales"
                    class="modal h-[60vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white">
                    <div class="flex justify-between mb-3">
                        <div class="flex gap-3 items-center">
                            <PhList :size="32" />
                            <p class="text-lg font-bold">Смена языка</p>
                        </div>
                        <button @click="openLocales = false">
                            <PhX :size="21" />
                        </button>
                    </div>
                    // <LocalesView @submit="toggleTeleport"/>
                </div>
            </transition>
        </Teleport>
    </div>
</template>
<style scoped>
.setting-border {
    border-bottom: 0.5px solid #4B4B4B;
}

.modal-enter-active,
.modal-leave-active {
    transition: transform 0.3s ease-in-out;
}

.modal-enter-from,
.modal-leave-to {
    transform: translateY(100%);
}

.modal-enter-to,
.modal-leave-from {
    transform: translateY(0);
}
</style>
