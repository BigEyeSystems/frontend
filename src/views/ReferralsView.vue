<script setup>
import crown from "../components/icons/crown.vue";
import footerMenu from "@/components/footer.vue";

</script>
<template>
    <div>
        <div class="flex gap-3">
            <div>
                <crown />
            </div>
            <p class="text-lg font-semibold">Referrals</p>
        </div>
        <footer class="fixed bottom-0 left-0 w-full mt-48 mb-4">
            <footerMenu class="w-[90vw]" />
        </footer>
    </div>


</template>