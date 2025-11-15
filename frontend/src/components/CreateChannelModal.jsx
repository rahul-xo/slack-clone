import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useChatContext } from "stream-chat-react";
import * as Sentry from "@sentry/react";
import toast from "react-hot-toast";
import { AlertCircleIcon, HashIcon, XIcon } from "lucide-react";
const CreateChannelModal = ({ isOpen, onClose }) => {
  const [channelName, setChannelName] = useState("");
  const [channelType, setChannelType] = useState("public");
  const [description, setDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [_, setSearchParams] = useSearchParams();

  const { client, setActiveChannel } = useChatContext();

  useEffect(() => {
    const fetchUser = async () => {
      if (!client?.user) return;

      setLoadingUsers(true);
      try {
        const response = await client.queryUsers(
          { id: { $ne: client.user.id } },
          { name: 1 },
          { limit: 100 }
        );
        setUsers(response.users || []);
      } catch (error) {
        console.log("error :", error);
        Sentry.captureException(error, {
          tags: { component: "CreateChannelModal" },
          extra: { context: "fetch_users_for_channel" },
        });
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };
  }, [client]);

  useEffect(() => {
    if (channelType === "public") setSelectedMembers(users.map((u) => u.id));
    else setSelectedMembers([]);
  }, [channelType, users]);

  const validateChannelName = (name) => {
    if (!name.trim()) return "Channel name is required";
    if (name.length < 2) return "name should be atleast 2 character long";
    if (name.length > 22) return "name should be smaller than 22 character";

    return "";
  };

  const handleChannelNameChange = (e) => {
    const value = e.target.value;
    setChannelName(value);
    setError(validateChannelName(value));
  };

  const handleMemberToggle = (id) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter((uid) => uid !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateChannelName(channelName);
    if (validationError) return setError(validationError);
    if (isCreating || !client?.user) return;

    setIsCreating(true);
    setError("");
    try {
      const channelId = channelName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-_]/g, "")
        .slice(0, 20);

      const channelData = {
        name: channelName.trim(),
        created_by_id: client.user.id,
        members: [client.user.id, ...selectedMembers],
      };

      if (description) channelData.description = description;
      if (channelType === "private") {
        channelData.private = true;
        channelData.visibility = "private";
      } else {
        channelData.visibility = "public";
        channelData.discoverable = true;
      }

      const channel = client.channel("messaging", channelId, channelData);
      await channel.watch();

      setActiveChannel(channel);
      setSearchParams({ channel: channelId });

      toast.success(`Channel ${channelName} created successfully`);
      onClose();
    } catch (error) {
      console.log("error creating channel :", error);
    } finally {
      setIsCreating(false);
    }
  };
  return (
    <div className="create-channel-modal-overlay">
      <div className="create-channel-modal">
        <div className="create-channel-modal__header">
          <h2>Create Channel</h2>
          <button className="create-channel-modal__close" onClick={onClose}>
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit} action="" className="create-channel-modal__form">
          {error &&(
            <div className="form-error">
              <AlertCircleIcon className="w-4 h-4"/>
              <span>{error}</span>
            </div>
          )}
          {/* channel name */}
          <div className="form-group">
            <div className="input-with-icon">
              <HashIcon className="w-4 h-4 input-icon"/>
              <input type="text" id="channelName" value={channelName} onChange={handleChannelNameChange} placeholder="e.g marketing" className={`form-input ${error ? "form-input--error" :""}`} autoFocus maxLength={22} />
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateChannelModal;
