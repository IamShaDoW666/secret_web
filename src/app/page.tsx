"use client";
import Bubble from "@/components/chat/bubble";
import HeartPing from "@/components/chat/heart-ping";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EVENTS, SERVER_LOCAL, USERNAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Message } from "@/types/message";
import _, { throttle } from "lodash";
import { BellRing, Send } from "lucide-react";
import { useEffect, useRef, useState, useCallback, use } from "react";
import { io, Socket } from "socket.io-client";

export default function Home() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [hide, setHide] = useState<boolean>(true);
  const [typing, setTyping] = useState<boolean>(false);
  let typingTimeout: NodeJS.Timeout;
  const _scrollToBottom = () => {
    chatBoxRef.current?.scrollBy({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    setTyping(false);
    _scrollToBottom();
  }, [messages]);

  useEffect(() => {
    _scrollToBottom();
  }, [typing]);

  useEffect(() => {
    const newSocket = io(SERVER_LOCAL, {
      transports: ["websocket"],
      autoConnect: false,
      query: {
        username: USERNAME,
      },
    });
    newSocket.connect();
    setSocket(newSocket);
    newSocket.on(EVENTS.SERVER.NEW_MESSAGE, (newMsg: Message) => {
      const newMessage: Message = {
        message: newMsg.message,
        sent: false,
        username: newMsg.username,
        time: new Date(newMsg.time).toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, newMessage]);
    });

    newSocket.on(
      EVENTS.SERVER.CONNECTIONS,
      ({ connections }: { connections: number }) => {
        if (connections == 2) {
          setHide(false);
        } else {
          setHide(true);
        }
      }
    );

    newSocket.on(EVENTS.SERVER.UPSTREAM, (data: Message[]) => {
      const newMessages = data.map((msg) => {
        return {
          message: msg.message,
          sent: false,
          username: msg.username,
          time: new Date(msg.time).toLocaleTimeString("en-US", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });
      setMessages((prev) => [...prev, ...newMessages]);
      newSocket.emit(EVENTS.CLIENT.DOWNSTREAM);
    });

    newSocket.on(EVENTS.SERVER.TYPING, (data: { username: string }) => {
      setTyping(true);
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        setTyping(false);
      }, 3000);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (text.length == 0) return;
    const newMessage: Message = {
      message: text,
      sent: true,
      username: USERNAME,
      time: new Date().toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
    socket?.emit(EVENTS.CLIENT.SEND_MESSAGE, newMessage);
    setText("");
  };

  const sendPoke = () => {
    socket?.emit(EVENTS.CLIENT.POKE, { username: USERNAME });
  };

  const emitTyping = useCallback(
    throttle(
      () => {
        socket?.emit(EVENTS.CLIENT.TYPING);
      },
      2000,
      { leading: true, trailing: false }
    ),
    [socket]
  );

  const _handleTextChange = (value: string) => {
    setText(value);
    emitTyping();
  };
  return (
    <section className="max-w-6xl mx-auto h-screen flex flex-col items-center justify-center gap-y-8">
      <section
        ref={chatBoxRef}
        className={cn(
          "flex flex-col h-3/4 overflow-auto items-start gap-y-4 bg-zinc-200 sm:rounded-xl w-full p-4",
          !hide && "border-2 border-primary"
        )}
      >
        {messages?.map((message, index) => (
          <Bubble key={index} message={message} />
        ))}
        {typing && (
          <Bubble
            typing
            message={{
              message: "...",
              sent: false,
              time: "",
              username: "Malu",
            }}
          />
        )}
      </section>
      <div className="w-sm mx-auto flex gap-x-4 items-center">
        <Input
          value={text}
          onKeyDown={(e) => {
            if (e.code == "Enter") {
              sendMessage();
            }
          }}
          onChange={(e) => _handleTextChange(e.target.value)}
        />
        <Button onClick={sendMessage} size={"lg"} className="">
          <Send />
        </Button>
        <Button onClick={sendPoke} size={"lg"} variant={"outline"} className="">
          <BellRing />
        </Button>
      </div>
    </section>
  );
}
