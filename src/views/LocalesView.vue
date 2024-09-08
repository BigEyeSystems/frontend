<script setup>
import ButtonView from "../components/button.vue";
import { ref } from "vue";

import { useI18n } from "vue-i18n";
const { t, locale } = useI18n( {useScope: 'global'} ); 

const isSelectedRus = ref(false);
const isSelectedEng = ref(false);
const selectRussian = () => {
    isSelectedRus.value = !isSelectedRus.value;
    isSelectedEng.value = false;
    locale.value === 'en'? locale.value = 'ru' : locale.value = '';
};
const selectEnglish = () => {
    isSelectedRus.value = false;
    isSelectedEng.value = !isSelectedEng.value;
    locale.value === 'ru'? locale.value = 'en' : locale.value = 'ru';
};
</script>
<template>
    <div>
        <input class="w-full my-4 p-3 rounded-lg border-transparent focus:outline-none bg-[#17181C] focus:bg-[#17181C]"
            type="text" placeholder="Поиск">
        <div class="bg-gradient-to-r from-[#ffffff1f] to-[#ffffff12] px-4 py-3 rounded-lg text-sm">
            <div class="flex justify-between py-4 setting-border">
                <div class="flex flex-col gap-1">
                    <p class="text-sm font-semibold">Русский</p>
                    <p class="text-xs text-[#b8b8b8]">Русский</p>
                </div>
                <div class="flex items-center">
                    <button v-if="isSelectedRus">
                        <PhCheckCircle :size="20" color="#92FBDB" weight="fill" @click="selectRussian" />
                    </button>
                    <button v-if="!isSelectedRus" @click="selectRussian">
                        <PhCircle :size="20" color="#36373a" />
                    </button>
                </div>
            </div>
            <div class="flex justify-between py-4">
                <div class="flex flex-col gap-1">
                    <p class="text-sm font-semibold">Английский</p>
                    <p class="text-xs text-[#b8b8b8]">English</p>
                </div>
                <div class="flex items-center">
                    <button v-if="isSelectedEng">
                        <PhCheckCircle :size="20" color="#92FBDB" weight="fill" @click="selectEnglish" />
                    </button>
                    <button v-if="!isSelectedEng" @click="selectEnglish">
                        <PhCircle :size="20" color="#36373a" />
                    </button>
                </div>
            </div>
        </div>
        <footer class="fixed bottom-0 left-0 w-full mt-48 mb-4 px-4">
            <ButtonView :text="'Сохранить'" class="mt-4"/>
        </footer>
    </div>
</template>
<style scoped>
.setting-border {
    border-bottom: 0.5px solid #4B4B4B;
}
</style>