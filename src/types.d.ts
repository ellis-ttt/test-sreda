interface DeviceNode {
    id: string;
    name: string;
}

interface Device {
    id: string;
    name: string;
    nodes: DeviceNode[];
}