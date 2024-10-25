import { ref, reactive } from 'vue';

export function useDevices() {
    const devices = reactive<Device[]>([]);
    const editingId = ref<string | null>(null);

    const addDevice = () => {
        const newDevice: Device = {
            id: crypto.randomUUID(),
            name: '',
            nodes: []
        };
        devices.push(newDevice);
        editingId.value = newDevice.id;
    };

    const updateDevice = (device: Device) => {
        const index = devices.findIndex(d => d.id === device.id);
        if (index !== -1) {
            devices[index] = { ...device };
        }
        editingId.value = null;
    };

    const deleteDevice = (id: string) => {
        const index = devices.findIndex(d => d.id === id);
        if (index !== -1) {
            devices.splice(index, 1);
        }
    };

    const startEditing = (id: string) => {
        editingId.value = id;
    };

    return {
        devices,
        editingId,
        addDevice,
        updateDevice,
        deleteDevice,
        startEditing
    };
}