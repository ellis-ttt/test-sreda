<script setup lang="ts">
    import { useDevices } from './composables/useDevices';
    import DeviceRow from './components/DeviceRow.vue';

    const { devices, editingId, addDevice, updateDevice, deleteDevice, startEditing } = useDevices();
</script>

<template>
    <div class="app-container">
        <div class="header">
            <button
                    class="add-button"
                    @click="addDevice"
            >
                Добавить Устройство
            </button>
        </div>

        <div class="devices-container">
            <DeviceRow
                    v-for="device in devices"
                    :key="device.id"
                    :device="device"
                    :is-editing="editingId === device.id"
                    @update="updateDevice"
                    @delete="deleteDevice"
                    @edit="startEditing"
            />
        </div>
    </div>
</template>

<style scoped>
    .app-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 16px;
    }

    .header {
        margin-bottom: 16px;
    }

    .add-button {
        padding: 8px 16px;
        background-color: #2196F3;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .add-button:hover {
        background-color: #1976D2;
    }

    .devices-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
</style>