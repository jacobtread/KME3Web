<script setup lang="ts">

import type { OtherSettings, Player } from "@/api";
import { getPlayerOtherSettings } from "@/api";
import { defineProps, ref } from "vue";
import { getFilterInventory, getFilterInventoryMultple, getInventoryNamed, getPlayerInventory } from "@/data";
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
const weapons = getFilterInventoryMultple(namedInventory, [
    InventoryType.ASSAULT_RIFLE,
    InventoryType.SNIPER_RIFLE,
    InventoryType.SHOTGUN,
    InventoryType.HEAVY_PISTOL,
    InventoryType.SUB_MACHINE_GUN,
])

</script>
<template>
    <form v-on:submit.prevent="" class="viewer">
        <div class="viewer__pane">
            <span>ID: {{ player.id }}</span>
            <span>Email: {{ player.email }}</span>
            <span>Display Name: {{ player.displayName }}</span>
        </div>
        <div class="viewer__pane">
            <h1>Inventory</h1>
            <div v-for="character in characters">
                <h2>{{ character.name }}</h2>
                <span>{{ character.value }}</span>
            </div>
        </div>
    </form>
</template>
<style scoped lang="scss">
.viewer {
    display: flex;
    flex-flow: row;
}
</style>