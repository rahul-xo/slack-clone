import { UserButton } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useStreamChat } from "../hooks/useStreamChat.js";
import PageLoader from "../components/PageLoader.jsx";
import "../styles/stream-chat-theme.css";
import {HashIcon, List, PlusIcon, UserIcon} from "lucide-react"
import {
  Chat,
  Channel,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import CreateChannelModal from "../components/CreateChannelModal.jsx";
import CustomChannelPreview from "../components/CustomChannelPreview.jsx";
import UserList from "../components/UserList.jsx";
import CustomChannelHeader from "../components/CustomChannelHeader.jsx";

const HomePage = () => {
  const [isCreateModalOpen, setisCreateModalOpen] = useState(false);
  const [activeChannel, setActiveChannel] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { chatClient, isLoading, error } = useStreamChat();

  useEffect(() => {
    if (chatClient) {
      const channelId = searchParams.get("channel");
      if (channelId) {
        const channel = chatClient.channel("messaging", channelId);
        setActiveChannel(channel);
      }
    }
  }, [chatClient, searchParams]);

  if (error) return <div className="">something went wrong..</div>;
  if (isLoading || !chatClient) return <PageLoader />;

  return (
    <>
      <div className="chat-wrapper">
        <Chat client={chatClient}>
          <div className="chat-container">
            {/* LEFT SIDEBAR */}
            <div className="str-chat__channel-list">
              <div className="team-channel-list">
                {/* HEADER */}
                <div className="team-channel-list__header gap-4">
                  <div className="brand-container">
                    <img src="/slack-logo.png" alt="Logo" className="brand-logo" />
                    <span className="brand-name">Slack</span>
                  </div>
                  <div className="user-button-wrapper">
                    <UserButton />
                  </div>
                </div>
                {/* CHANNELS LIST */}
                <div className="team-channel-list__content">
                  <div className="create-channel-section">
                    <button
                      onClick={() => setisCreateModalOpen(true)}
                      className="create-channel-btn"
                    >
                      <PlusIcon className="size-4" />
                      <span>Create Channel</span>
                    </button>
                  </div>

                  {/* CHANNEL LIST */}
                  <ChannelList
                  filters={{members:{$in:[chatClient?.user?.id]}}}
                  options={{state:true,watch:true}}
                  Preview={({channel})=>(
                    <CustomChannelPreview
                    channel={channel}
                    activeChannel={activeChannel}
                    setActiveChannel={(channel)=> setSearchParams({channel:channel.id})}
                    />
                  )}
                  List={({children,loading,error})=>(
                    <div className="channel-sections">
                      <div className="section-header">
                        <div className="section-title">
                          <HashIcon className="size-4"/>
                          <span>Channels</span>
                        </div>
                      </div>
                      {loading && <div className="loading-message">loading channels...</div>}
                      {error && <div className="error-message">error loading channels</div>}
                      <div className="channel-list">{children}</div>
                      <div className="section-header direct-messages">
                        <div className="section-title">
                          <UserIcon className="size-3.5"/>
                          <span>Direct Messages</span>
                        </div>
                      </div>
                      <UserList activeChannel={activeChannel}/>
                    </div>
                  )}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT CONTAINER */}
            <div className="chat-main">
              <Channel channel={activeChannel}>
                <Window>
                  <CustomChannelHeader />
                  <MessageList />
                  <MessageInput />
                </Window>

                <Thread />
              </Channel>
            </div>
          </div>

          {isCreateModalOpen && (
            <CreateChannelModal onClose={() => setisCreateModalOpen(false)} />
          )}
        </Chat>
      </div>
    </>
  );
};

export default HomePage;
