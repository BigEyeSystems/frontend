<script setup>
import footerMenu from "@/components/footer.vue";
import profileButton from '@/components/profileButton.vue';
import {
    PhWallet,
    PhGear,
    PhHeadset,
    PhInfo,
    PhCrownSimple
} from "@phosphor-icons/vue";
</script>
<template>
    <div>
        <div class="flex mb-3 items-center gap-2">
            <div class="border rounded-full">
                <PhCrownSimple :size="49" color="#d9d900" weight="fill" />
            </div>
            <div>
                <p class="text-lg font-bold">John Doe</p>
                <p>Nov 10 2024</p>
            </div>
        </div>
        <div class="flex flex-col gap-3">
            <profileButton :text="'Кошелек'">
                <template #icon>
                    <PhWallet :size="24" />
                </template>
            </profileButton>
            <profileButton :text="'Настройки'">
                <template #icon>
                    <PhGear :size="24" />
                </template>
            </profileButton>
            <profileButton :text="'Cлужба поддержки'">
                <template #icon>
                    <PhHeadset :size="24" />
                </template>
            </profileButton>
            <profileButton :text="'Самые задаваемы вопросы'">
                <template #icon>
                    <PhInfo :size="24" />
                </template>
            </profileButton>
        </div>
        <footer class="fixed bottom-0 left-0 w-full mt-48 mb-4">
            <footerMenu class="w-[85vw]" />
        </footer>
    </div>
</template>