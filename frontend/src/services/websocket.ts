import { Client } from '@stomp/stompjs';
import { useStore } from '../stores/appStore';

const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:8080/ws';

let client: Client | null = null;

export function connectWebSocket() {
  const token = localStorage.getItem('token');
  if (client?.connected) return;

  client = new Client({
    brokerURL: WS_URL.replace(/^http/, 'ws'),
    connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    onConnect: () => {
      useStore.getState().setConnected(true);

      client!.subscribe('/topic/visualization', (msg) => {
        const data = JSON.parse(msg.body);
        if (data.type === 'jvm_snapshot') {
          useStore.getState().setSnapshot(data.payload);
        }
      });

      client!.publish({
        destination: '/app/visualization.start',
        body: JSON.stringify({}),
      });
    },
    onDisconnect: () => {
      useStore.getState().setConnected(false);
    },
  });

  client.activate();
}

export function disconnectWebSocket() {
  if (client?.connected) {
    client.publish({
      destination: '/app/visualization.stop',
      body: JSON.stringify({}),
    });
    client.deactivate();
  }
  client = null;
  useStore.getState().setConnected(false);
}
