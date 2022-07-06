<script setup lang="ts">

import { getPlayers } from "@/api";
import { onMounted } from "vue";
import { players } from "@/data";

</script>

<template>
    <main>
        <h1>Players</h1>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Display Name</th>
                <th>Email</th>
                <th>Credits</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="player in players">
                <td>{{ player.id }}</td>
                <td>{{ player.displayName }}</td>
                <td>{{ player.email }}</td>
                <td>{{ player.credits }}</td>
                <td>
                    <RouterLink :to="{name: 'edit', query: {id: player.id} }">Edit</RouterLink>
                </td>
            </tr>
            </tbody>
        </table>
    </main>
</template>
