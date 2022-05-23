<script setup lang="ts">

import { players } from "@/data";
import { useRoute } from "vue-router";
import PlayerViewer from "@/components/PlayerViewer.vue";

const route = useRoute()
const id = route.query.id ?? 0
const player = players.value.find(value => value.id == id)

</script>

<template>
    <Suspense>
        <PlayerViewer :player="player"/>
        <template #fallback>
            <h1>Loading Player...</h1>
        </template>
    </Suspense>
</template>
