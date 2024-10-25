<script setup lang="ts">
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps<{
        node: DeviceNode;
        isEditing: boolean;
    }>();

    const emit = defineEmits<{
        update: [node: DeviceNode];
        delete: [id: string];
    }>();
</script>

<template>
    <div class="node-container" draggable="true">
        <template v-if="isEditing">
            <input
                    v-model="node.name"
                    class="input"
                    @blur="emit('update', node)"
            />
            <button
                    class="delete-button"
                    @click="emit('delete', node.id)"
            >
                Удалить
            </button>
        </template>
        <template v-else>
            <span class="node">{{ node.name }}</span>
        </template>
    </div>
</template>

<style scoped>
    .node-container {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        background-color: #f9f9f9;
        border-radius: 4px;
        margin-bottom: 4px;
        cursor: move;
    }

    .input {
        padding: 4px 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .delete-button {
        padding: 4px 8px;
        background-color: #ff4444;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .delete-button:hover {
        background-color: #cc0000;
    }

    .node {
        color: black;
    }
</style>