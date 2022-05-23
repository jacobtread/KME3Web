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
const inventory = ref(getPlayerInventory(player.value.settings.inventory));
const namedInventory = getInventoryNamed(inventory.value);
const characters = getFilterInventory(namedInventory, InventoryType.CHARACTER);
const weapons = getFilterInventoryMultple(namedInventory, [
    InventoryType.ASSAULT_RIFLE,
    InventoryType.SNIPER_RIFLE,
    InventoryType.SHOTGUN,
    InventoryType.HEAVY_PISTOL,
    InventoryType.SUB_MACHINE_GUN,
])
const equipment = getFilterInventoryMultple(namedInventory, [
    InventoryType.ARMOR_EQUIP,
    InventoryType.AMMO_EQUIP,
    InventoryType.WEAPON_EQUIP,
    InventoryType.GEAR_EQUIP,
])
const consumables = getFilterInventoryMultple(namedInventory, [
    InventoryType.CONSUMABLE_STOCK,
    InventoryType.CONSUMABLE_CAPACITY,
    InventoryType.CONSUMABLE_OTHER,
])

const tab = ref('characters')

function setInventoryValue(index: number, value: number) {
    inventory.value[index] = value
}

</script>
<template>
    <form v-on:submit.prevent="" class="viewer">
        <div class="viewer__pane">
            <RouterLink to="/">Back</RouterLink>
            <span>ID: {{ player.id }}</span>
            <span>Email: {{ player.email }}</span>
            <span>Display Name: {{ player.displayName }}</span>
        </div>
        <div class="viewer__pane">
            <div class="tabbed">
                <div class="tabbed__header">
                    <button class="tabbed__header__button"
                            :class="{'tabbed__header__button--active': tab === 'characters'}"
                            @click="tab = 'characters'"
                            type="button"
                    >
                        Characters
                    </button>
                    <button class="tabbed__header__button"
                            :class="{'tabbed__header__button--active': tab === 'weapons'}"
                            @click="tab = 'weapons'"
                            type="button"
                    >
                        Weapons
                    </button>
                    <button class="tabbed__header__button"
                            :class="{'tabbed__header__button--active': tab === 'equipment'}"
                            @click="tab = 'equipment'"
                            type="button"
                    >
                        Equipment
                    </button>
                    <button class="tabbed__header__button"
                            :class="{'tabbed__header__button--active': tab === 'consumables'}"
                            @click="tab = 'consumables'"
                            type="button"
                    >
                        Consumables
                    </button>
                       <button class="tabbed__header__button"
                            :class="{'tabbed__header__button--active': tab === 'indexed'}"
                            @click="tab = 'indexed'"
                            type="button"
                    >
                        Indexed
                    </button>

                </div>
                <div class="tabbed__body">
                    <div class="tabbed__body__tab" v-if="tab === 'characters'">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="character in characters">
                                <td>{{ character.name }}</td>
                                <td class="input__wrapper">
                                    <button class="button button--min" @click="setInventoryValue(character.index, 0)">MIN</button>
                                    <input class="input" v-model="inventory[character.index]">
                                    <button class="button button--max" @click="setInventoryValue(character.index, 20)">MAX</button>
                                    <button class="button button--god" @click="setInventoryValue(character.index, 255)">GOD</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="tabbed__body__tab" v-if="tab === 'weapons'">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="weapon in weapons">
                                <td>{{ weapon.name }}</td>
                                <td class="input__wrapper">
                                    <button class="button button--min" @click="setInventoryValue(weapon.index, 0)">MIN</button>
                                    <input class="input" v-model="inventory[weapon.index]">
                                    <button class="button button--max" @click="setInventoryValue(weapon.index, 20)">MAX</button>
                                    <button class="button button--god" @click="setInventoryValue(weapon.index, 255)">GOD</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="tabbed__body__tab" v-if="tab === 'equipment'">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="equip in equipment">
                                <td>{{ equip.name }}</td>
                                <td class="input__wrapper">
                                    <button class="button button--min" @click="setInventoryValue(equip.index, 0)">MIN</button>
                                    <input class="input" v-model="inventory[equip.index]">
                                    <button class="button button--max" @click="setInventoryValue(equip.index, 20)">MAX</button>
                                    <button class="button button--god" @click="setInventoryValue(equip.index, 255)">GOD</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="tabbed__body__tab" v-if="tab === 'consumables'">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="consumable in consumables">
                                <td>{{ consumable.name }}</td>
                                <td class="input__wrapper">
                                    <button class="button button--min" @click="setInventoryValue(consumable.index, 0)">MIN</button>
                                    <input class="input" v-model="inventory[consumable.index]">
                                    <button class="button button--max" @click="setInventoryValue(consumable.index, 20)">MAX</button>
                                    <button class="button button--god" @click="setInventoryValue(consumable.index, 255)">GOD</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="tabbed__body__tab" v-if="tab === 'indexed'">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Index</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(_, index) in inventory">
                                <td>{{ index }}</td>
                                <td class="input__wrapper">
                                    <button class="button button--min" @click="setInventoryValue(index, 0)">MIN</button>
                                    <input class="input" v-model="inventory[index]">
                                    <button class="button button--max" @click="setInventoryValue(index, 20)">MAX</button>
                                    <button class="button button--god" @click="setInventoryValue(index, 255)">GOD</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </form>
</template>
<style scoped lang="scss">
@import "../assets/variables";

.viewer {
    display: flex;
    flex-flow: row;
    width: 100%;
    height: 100%;
    padding: 1rem;
}

.viewer__pane {
    flex: auto;
    height: 100%;
    overflow-y: auto;
}

.table {
    width: 100%;
    border-collapse: collapse;
    overflow: auto;

    > thead {
        > tr > th {
            text-align: left;
            background-color: #1c1a1e;
            padding: 1rem;
        }
    }

    > tbody {
        > tr {
            border: 2px solid #333;

            > td {
                padding: 0.5rem;

            }
        }
    }
}

.button {
    padding: 0.5rem;
    color: white;
    font-weight: bold;
    border: none;
    background-color: #333;
    cursor: pointer;

    &--min {

    }

    &--max {
        background-color: #0091bd;
    }

    &--god {
        background-color: #bd0010;

    }
}

.input {
    background-color: #333;
    color: white;
    border: none;
    padding: 0.5rem;
    font-size: 1rem;

    &__wrapper {
        display: flex;
        justify-self: end;
    }
}

.tabbed {
    position: relative;
    display: flex;
    flex-flow: column;
    height: 100%;
    background: #202023;

    &__header {
        display: flex;
        flex-flow: row;
        flex: 0;
        background: #202023;
        padding: 1rem 1rem 0;

        &__button {
            cursor: pointer;
            background: transparent;
            border: none;
            padding: 0.5rem;
            color: white;
            font-size: 1.25rem;
            font-weight: bold;
            border-bottom: 2px solid transparent;
            transition: all 0.25s ease;

            &--active {
                background: #383030;
                border-bottom-color: $primary;
            }
        }
    }

    &__body {
        position: relative;
        flex: 1 auto;
        overflow: auto;
        padding: 1rem;

        &__tab {
            position: relative;

        }
    }
}

.grid-editor {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 1rem;

    &__item {
        display: flex;
        flex-flow: column;
        background: #222;
        text-align: center;

        &__index {
            font-size: 0.7rem;
            color: #888;
        }

        &__value {
            display: inline;
            background: none;
            width: 3rem;
            margin: 0 auto;
            border: none;
            color: white;
            text-align: center;
            font-size: 1rem;
        }
    }
}

</style>