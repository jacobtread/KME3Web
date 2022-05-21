<script setup lang="ts">

import { players } from "@/data";
import { useRoute } from "vue-router";
import type { OtherSettings } from "@/api"
import { onMounted, ref } from "vue";
import { getPlayerOtherSettings } from "@/api";

const route = useRoute()
const id = route.query.id ?? 0
const player = players.value.find(value => value.id == id)
const otherSettings = ref<OtherSettings>({})

onMounted(async () => {
    if (player) {
        otherSettings.value = await getPlayerOtherSettings(player.id)
    }
})

function onSubmit() {

}

</script>

<template>
    <main>
        <RouterLink to="/">Back</RouterLink>
        <h1>Player: {{ player.displayName }}</h1>
        <form v-on:submit.prevent="onSubmit">
            {{ player }}
            <label>Display Name
                <input type="text" v-model="player.displayName">
            </label>
            <label>Email
                <input type="text" v-model="player.email">
            </label>
            <div>
                <h2>Settings</h2>
                {{ otherSettings }}
            </div>
        </form>
    </main>
</template>
