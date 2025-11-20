import { useState, useEffect, useRef } from "react";
import { StreamChat } from "stream-chat";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api.js";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

export const useStreamChat = () => {
  const { user } = useUser();
  const [chatClient, setChatClient] = useState(null);
  const isConnecting = useRef(false);

  const { data: tokenData, isLoading: isTokenLoading } = useQuery({
    queryKey: ["streamToken", user?.id],
    queryFn: getStreamToken,
    enabled: !!user?.id,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!tokenData?.token || !user?.id || !STREAM_API_KEY) return;
    if (chatClient) return;
    if (isConnecting.current) return;

    const client = StreamChat.getInstance(STREAM_API_KEY);

    const connect = async () => {
      try {
        isConnecting.current = true;

        if (client.userID) {
          await client.disconnectUser();
        }

        await client.connectUser(
          {
            id: user.id,
            name: user.fullName || user.username || user.id,
            image: user.imageUrl,
          },
          tokenData.token
        );

        setChatClient(client);
      } catch (error) {
        console.log("Stream Connection Error:", error);
        // setChatClient(null);
      } finally {
        isConnecting.current = false;
      }
    };

    connect();

    return () => {
      isConnecting.current = false;
    };
  }, [tokenData?.token, user?.id]);

  const isLoading = isTokenLoading || (!chatClient && !!user?.id);

  return { chatClient, isLoading };
};
