<script setup lang="ts">

import type { OtherSettings, Player } from "@/api";
import { getPlayerOtherSettings } from "@/api";
import { defineProps, ref } from "vue";
import { getFilterInventory, getInventoryNamed, getPlayerInventory } from "@/data";
import { InventoryType } from "@/constants";

interface Properties {
    player: Player,
}

const { player: playerProp } = defineProps<Properties>()
const player = ref<Player>(playerProp)
const settings: OtherSettings = await getPlayerOtherSettings(player.value.id);
const inventory = getPlayerInventory(player.value.settings.inventory);
const namedInventory = getInventoryNamed(inventory);
const characters = getFilterInventory(namedInventory, InventoryType.CHARACTER);

</script>
<template>
    <div>
        <h1>Player: {{ player.displayName }}</h1>
        <form v-on:submit.prevent="">
            {{ player }}
            <label>Display Name
                <input type="text" v-model="player.displayName">
            </label>
            <label>Email
                <input type="text" v-model="player.email">
            </label>
            <div>
                <h1>Inventory</h1>
                <div v-for="character in characters">
                    <h2>{{ character.name }}</h2>
                    <span>{{ character.value }}</span>
                </div>
            </div>
            <!--            <div>-->
            <!--                <h2>Settings</h2>-->
            <!--                {{ otherSettings }}-->
            <!--            </div>-->
        </form>
    </div>
</template>
<style scoped lang="scss">

</style>