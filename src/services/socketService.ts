import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;

  connect(token: string | null) {
    this.socket = io(SOCKET_URL, {
        withCredentials: true,
        autoConnect: true, // Automatically reconnect
        reconnectionAttempts: 5, // Try 5 times before giving up
        reconnectionDelay: 1000, // Wait 1 second before trying again
      });

    // Log when attempting to connect
    console.log('Attempting to connect to WebSocket...');
   
    this.socket.on('connect', () => {
      console.log('WebSocket connected:', this.socket?.id);

      if (token) {
        console.log('Authenticating WebSocket with token...');
        this.socket?.emit('authenticate', { token });
      }
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected.');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    this.socket.on('authenticated', () => {
      console.log('WebSocket authenticated successfully!');
    });

    this.socket.on('authentication_error', (error) => {
      console.error('WebSocket authentication error:', error);
    });

    this.socket.connect();
  }

  disconnect() {
    if (this.socket) {
      console.log('Disconnecting WebSocket...');
      this.socket.disconnect();
    }
  }
}

export const socketService = new SocketService();
