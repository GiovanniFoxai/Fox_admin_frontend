import React, { useEffect, useState } from "react";
import { authAxios } from "../../config/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  saveChatList,
  saveChatId,
  savePrevChats,
  saveNewChats,
  saveConversationList,
} from "../../Redux/Reducers/appSlice";
import { logout } from "../../Redux/Reducers/authSlice";

function ChatList({ setLoading }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);
  const { chatList } = useSelector((state) => state.app);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(false);

  useEffect(() => {
    getAllChatList();
  }, []);

  const getAllChatList = async (e) => {
    setLoading(true);
    await authAxios()
      .get("/chat/list")
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            dispatch(saveChatList(resData?.chatSessions));
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response?.data?.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    dispatch(logout());
    toast.success("Logout Successfully")
    navigate("/auth/login");
  };

  const handleClearAllChat = async (e) => {
    setLoading(true);
    await authAxios()
      .delete("/chat/delete-chats")
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            getAllChatList();
            dispatch(saveNewChats([]));
            dispatch(savePrevChats([]));
            dispatch(saveConversationList([]));
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response?.data?.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const handleShowPrevChats = async (data) => {
    dispatch(saveChatId(data._id));
    dispatch(saveNewChats([]));
    setLoading(true);
    await authAxios()
      .get(`/chat/chats/${data._id}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            dispatch(saveConversationList(resData?.chats));
            // dispatch(savePrevChats(resData?.chats))
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response?.data?.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  return (
    <>
      <div className="black--box-text">
        <div className="inner-bk-box">
          {chatList &&
            chatList.length > 0 &&
            chatList.map((item, index) => (
              <a
                key={index + 1}
                data-testid="convo-item"
                onClick={() => handleShowPrevChats(item)}
                className="group relative flex cursor-pointer items-center gap-3 break-all rounded-md py-3 px-3 hover:bg-gray-800 hover:pr-4"
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <div className="relative max-h-5 flex-1 overflow-hidden text-ellipsis break-all">
                  {item.chats[0].question}
                </div>
                <div className="absolute inset-y-0 right-0 z-10 w-8 rounded-r-md bg-gradient-to-l from-gray-900 group-hover:from-gray-700/70"></div>
              </a>
            ))}
        </div>
      </div>
      <div className="group-open-v" data-headlessui-state="open">
        <button
          onClick={() => setActiveDropdownIndex(!activeDropdownIndex)}
          className="group-ui-open dropdown--up"
          type="button"
          id="profile_btn"
        >
          <div className="relative flex">
            {/*<img className="rounded-sm"
                            src="https://api.dicebear.com/6.x/initials/svg?seed=Hemant Rawat&amp;fontFamily=Verdana&amp;fontSize=36"
                            width="20px" />
                            */}
            <span>{email}</span>
          </div>
          {/*  <div className="profile-name">
                        {user.name}</div>*/}

          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 flex-shrink-0 text-gray-500"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </button>
        <div
          className={`log-out-area dropdown--item ${
            activeDropdownIndex ? "active" : ""
          }`}
          id="profile_option"
          role="menu"
        >
          <div
            id="headlessui-menu-item"
            role="menuitem"
            tabIndex="-1"
            data-headlessui-state=""
          >
            <a
              onClick={handleClearAllChat}
              className="flex w-full cursor-pointer items-center gap-3 rounded-none px-3 py-3 text-sm text-white transition-colors duration-200 hover:bg-gray-700"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              Clear conversations
            </a>
          </div>
          <div
            id="headlessui-menu-item"
            role="menuitem"
            tabIndex="-1"
            data-headlessui-state=""
          >
            <a className="flex w-full cursor-pointer items-center gap-3 rounded-none px-3 py-3 text-sm text-white transition-colors duration-200 hover:bg-gray-700">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Help &amp; FAQ
            </a>
          </div>
          <div
            id="headlessui-menu-item"
            role="menuitem"
            tabIndex="-1"
            data-headlessui-state=""
          >
            <a className="flex w-full cursor-pointer items-center gap-3 rounded-none px-3 py-3 text-sm text-white transition-colors duration-200 hover:bg-gray-700">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              Settings
            </a>
          </div>
          <div
            id="headlessui-menu-item"
            className="log-open"
            role="menuitem"
            tabIndex="-1"
            data-headlessui-state=""
          >
            <a href="#">
              <button
                className=" "
                onClick={handleLogout}
                fdprocessedid="otft8"
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Log out</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatList;
