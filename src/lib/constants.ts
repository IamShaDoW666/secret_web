import { Message } from "@/types/message";

export const dummyMessages: Message[] = [
  {
    message: "Hey there! How's it going?",
    username: "Alice",
    time: "10:30 AM",
    sent: true,
  },
  {
    message: "Hey Alice! I'm doing great. How about you?",
    username: "Bob",
    time: "10:32 AM",
    sent: false,
  },
  {
    message: "Hey there! How's it going?",
    username: "Alice",
    time: "10:30 AM",
    sent: true,
  },
  {
    message: "Hey Alice! I'm doing great. How about you?",
    username: "Bob",
    time: "10:32 AM",
    sent: false,
  },
  {
    message: "Hey there! How's it going?",
    username: "Alice",
    time: "10:30 AM",
    sent: true,
  },
];

export const SERVER_LOCAL = "http://localhost:5100";
export const SERVER_LIVE = "https://chatt.foodonspot.online";
export const USERNAME = "Malu"
export const EVENTS = {
  connection: "connection",
  disconnect: "disconnect",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    SEND_MESSAGE: "SEND_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM",
    DOWNSTREAM: "DOWNSTREAM",
    POKE: "POKE",
    TYPING: "TYPING_CLIENT"
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
    NEW_MESSAGE: "NEW_MESSAGE",
    CONNECTIONS: "CONNECTIONS",
    UPSTREAM: "UPSTREAM",
    POKED: "POKED",
    TYPING: "TYPING"
  },
};
