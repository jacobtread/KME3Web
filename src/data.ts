import { ref } from "vue";
import type { Player } from "@/api";
import { getPlayers } from "@/api";
import type { InventoryDefinition } from "@/constants";
import { InventoryDefinitions, InventoryType } from "@/constants";

export const players = ref<Player[]>([])
getPlayers().then(value => players.value = value)

export function getPlayerInventory(value: string): number[] {
    const count = value.length / 2;
    const out = new Array(count);
    let index = 0
    for (let i = 0; i < value.length; i += 2) {
        out[index++] = parseInt(value.substring(i, i + 2), 16)
    }
    return out
}

type ValueDefinition = {
    index: number;
} & InventoryDefinition

export function getInventoryNamed(inventory: number[]): ValueDefinition[] {
    const out: ValueDefinition[] = new Array(inventory.length)
    for (let i = 0; i < inventory.length; i++) {
        const definition: InventoryDefinition | undefined = InventoryDefinitions[i];
        if (definition == undefined) {
            out[i] = {
                index: i,
                name: 'UNKNOWN_' + i,
                type: InventoryType.UNKNOWN
            }
        } else {
            out[i] = {
                index: i,
                ...definition
            }
        }
    }
    return out
}


export function getFilterInventory(inventory: ValueDefinition[], type: InventoryType): ValueDefinition[] {
    const out: ValueDefinition[] = [];
    for (let i = 0; i < inventory.length; i++) {
        const definition = inventory[i]
        if (definition.type === type) {
            out.push(definition)
        }
    }
    out.sort((a, b) => a.type - b.type)
    return out
}

export function getFilterInventoryMultple(inventory: ValueDefinition[], types: InventoryType[]): ValueDefinition[] {
    const out: ValueDefinition[] = [];
    for (let i = 0; i < inventory.length; i++) {
        const definition = inventory[i]
        for (let type of types) {
            if (definition.type === type) {
                out.push(definition)
            }
        }
    }
    out.sort((a, b) => a.type - b.type)
    return out
}

