<script setup lang="ts">
    import { ref } from 'vue';
    import DeviceNode from './DeviceNode.vue';

    const props = defineProps<{
        device: Device;
        isEditing: boolean;
    }>();

    const emit = defineEmits<{
        update: [device: Device];
        delete: [id: string];
        edit: [id: string];
    }>();

    const localDevice = ref<Device>({ ...props.device });

    const addNode = () => {
        localDevice.value.nodes.push({
            id: crypto.randomUUID(),
            name: ''
        });
    };

    const updateNode = (updatedNode: DeviceNode) => {
        const index = localDevice.value.nodes.findIndex(n => n.id === updatedNode.id);
        if (index !== -1) {
            localDevice.value.nodes[index] = updatedNode;
        }
    };

    const deleteNode = (id: string) => {
        localDevice.value.nodes = localDevice.value.nodes.filter(n => n.id !== id);
    };

    const handleDragStart = (e: DragEvent, index: number) => {
        if (e.dataTransfer) {
            e.dataTransfer.setData('text/plain', index.toString());
        }
    };

    const handleDrop = (e: DragEvent, targetIndex: number) => {
        const sourceIndex = parseInt(e.dataTransfer?.getData('text/plain') || '');
        if (!isNaN(sourceIndex)) {
            const nodes = [...localDevice.value.nodes];
            const [movedNode] = nodes.splice(sourceIndex, 1);
            nodes.splice(targetIndex, 0, movedNode);
            localDevice.value.nodes = nodes;
        }
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
    };
</script>

<template>
    <div class="device-container">
        <div class="device-header">
            <template v-if="isEditing">
                <input
                        v-model="localDevice.name"
                        class="input"
                        @blur="emit('update', localDevice)"
                />
                <button
                        class="save-button"
                        @click="emit('update', localDevice)"
                >
                    Сохранить
                </button>
            </template>
            <template v-else>
                <span class="device-name">{{ device.name }}</span>
                <button
                        class="edit-button"
                        @click="emit('edit', device.id)"
                >
                    Редактировать
                </button>
            </template>
            <button
                    class="delete-button"
                    @click="emit('delete', device.id)"
            >
                Удалить
            </button>
        </div>

        <div v-if="isEditing" class="add-node-container">
            <button
                    class="add-button"
                    @click="addNode"
            >
                Добавить Узел
            </button>
        </div>

        <div class="nodes-container">
            <template v-for="(node, index) in localDevice.nodes" :key="node.id">
                <div
                        @dragstart="handleDragStart($event, index)"
                        @drop="handleDrop($event, index)"
                        @dragover="handleDragOver"
                >
                    <DeviceNode
                            :node="node"
                            :is-editing="isEditing"
                            @update="updateNode"
                            @delete="deleteNode"
                    />
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
    .device-container {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 16px;
    }

    .device-header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 16px;
    }

    .device-name {
        font-size: 1.25rem;
        font-weight: 500;
    }

    .input {
        padding: 4px 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .save-button, .edit-button, .add-button {
        padding: 4px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        color: white;
    }

    .save-button {
        background-color: #4CAF50;
    }

    .save-button:hover {
        background-color: #45a049;
    }

    .edit-button {
        background-color: #2196F3;
    }

    .edit-button:hover {
        background-color: #1976D2;
    }

    .delete-button {
        padding: 4px 16px;
        background-color: #ff4444;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .delete-button:hover {
        background-color: #cc0000;
    }

    .add-button {
        background-color: #4CAF50;
        margin-bottom: 16px;
    }

    .add-button:hover {
        background-color: #45a049;
    }

    .nodes-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
</style>