<script setup lang="ts">

import { getPlayerInventory, players } from "@/data";
import { useRoute } from "vue-router";
import type { OtherSettings } from "@/api"
import { onMounted, ref } from "vue";
import { getPlayerOtherSettings } from "@/api";
import PlayerViewer from "@/components/PlayerViewer.vue";

const route = useRoute()
const id = route.query.id ?? 0
const player = players.value.find(value => value.id == id)

</script>

<template>
    <main>
        <RouterLink to="/">Back</RouterLink>
        <Suspense>
            <PlayerViewer :player="player"/>
            <template #fallback>
                <h1>Loading Player...</h1>
            </template>
        </Suspense>
    </main>
</template>
