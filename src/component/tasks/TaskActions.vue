<template>
    <div class="task-actions">

        <button class="btn btn-sm btn-circle btn-outline-secondary me-1" 
        @click="$event => emit('edit')">
            <iconPencil />
        </button>
        <button class="btn btn-sm btn-circle btn-outline-danger" 
        @click="$event => emit('remove')">
            <iconTrash />
        </button>
    </div>
</template>

<script setup>

import iconPencil from "../icons/iconPencil.vue"
import iconTrash from "../icons/iconTrash.vue"


const emit = defineEmits(['edit', 'remove'])
</script>