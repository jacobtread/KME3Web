<script setup lang="ts">

import { players } from "@/data";
import { useRoute, useRouter } from "vue-router";
import PlayerViewer from "@/components/PlayerViewer.vue";
import type { Player } from "@/api";

const route = useRoute()
const router = useRouter()
const id = route.query.id ?? 0
const player = players.value.find(value => value.id == id)


</script>

<template>
    <Suspense v-if="player">
        <PlayerViewer :player="player"/>
        <template #fallback>
            <h1>Loading Player...</h1>
        </template>
    </Suspense>
</template>
