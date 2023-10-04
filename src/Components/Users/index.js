import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/image/logo.png";
import { generateRandomId } from "../../Helper/helper";
import { authAxios } from "../../config/config";
import { toast } from "react-toastify";
//import ChatResponse from "../Users/ChatResponse";
import ChatList from "../Users/ChatList";
import Conversations from "../Users/Conversation";
import { useDispatch, useSelector } from "react-redux";
import {
  saveChatId,
  saveChatList,
  saveConversationList,
  saveNewChats,
  savePrevChats,
} from "../../Redux/Reducers/appSlice";
import IsLoadingHOC from "../../Common/IsLoadingHOC";
//import IsLoggedinHOC from "./IsLoggedinHOC";

const User = (props) => {
  const { setLoading, isLoading } = props;
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(false);
  const [toggelDropdown, settoggelDropdown] = useState(false);
  const [activeDropdownGpt, setActiveDropdownGpt] = useState(false);
  const [isToggleVisible, setIsToggleVisible] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { prevChats, chatId, newChats, conversationList } = useSelector(
    (state) => state.app
  );

  const { company } = useSelector((state) => state.auth);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Modeldata, setModeldata] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [textareaheight, setTextareaheight] = useState(1);

  const [newChat, setNewChat] = useState("");

  useEffect(() => {
    let new_id = generateRandomId(20);
    dispatch(saveChatId(new_id));
    dispatch(saveNewChats([]));
    dispatch(savePrevChats([]));
    dispatch(saveConversationList([]));
  }, []);

  const shouldRemoveClass = windowWidth <= 768;
  const shouldAddClass = windowWidth < 768;

  const handleNavActiveClick = () => {
    document.querySelector(".nav--container").classList.add("active--toggle");
  };

  const handleNavCloseButtonClick = () => {
    document
      .querySelector(".nav--container")
      .classList.remove("active--toggle");
  };

  const handleToggleClick = () => {
    setIsToggleVisible(true);
  };
  const handleToggleCloseClick = () => {
    setIsToggleVisible(false);
  };

  const handleClickNewChat = () => {
    let new_id = generateRandomId(20);
    dispatch(saveChatId(new_id));
    dispatch(saveNewChats([]));
    dispatch(savePrevChats([]));
    dispatch(saveConversationList([]));
  };

  const getAllChatList = async (e) => {
    await authAxios()
      .get("/chat/list")
      .then(
        (response) => {
          if (response.data.status === 1) {
            const resData = response.data.data;
            dispatch(saveChatList(resData?.chatSessions));
          }
        },
        (error) => {
          toast.error(error.response?.data?.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      prompt: newChat,
      session: chatId,
      previous_prompt: "Hello, how can I assist you?",
    };
    setLoading(true);
    await authAxios()
      .post("/chat/create", payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            setNewChat("");
            const newData = response.data.data;
            getConversation();
            getAllChatList();
            setTextareaheight(1);
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response.data.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleChange = (event) => {
    const height = event.target.scrollHeight;
    const value = event.target.value.length;
    const rows = event.target.rows;
    const rowHeight = 50;
    const trows = Math.ceil(height / rowHeight);
    setNewChat(event.target.value);
    if (value === 0) {
      setTextareaheight(0);
    } else if (trows > rows) {
      setTextareaheight(trows);
    }
  };

  const getConversation = async () => {
    dispatch(saveNewChats([]));
    setLoading(true);
    await authAxios()
      .get(`/chat/chats/${chatId}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            dispatch(saveConversationList(resData?.chats));
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
    <section className="main-section height--auto">
      <div className="container">
        <div className="top--mobile--header">
          <div className="toggle--mobile">
            <button className="toggle--active" onClick={handleNavActiveClick}>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="heading--mb">
            <h1>New Chat</h1>
          </div>
          <div className="add--chat--mb">
            <button>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
        <div className="open--toggle">
          <button
            type="button"
            onClick={handleNavActiveClick}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-white hover:bg-gray-500/10 toggle--active"
            id="nav-menu-close-btn"
          >
            <span className="sr-only">Close sidebar</span>
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
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
          </button>
        </div>
        <div
          className={`black--section nav--container ${
            shouldRemoveClass ? "" : "active--toggle"
          } ${shouldAddClass ? "" : "active--toggle"}`}
        >
          {/* <div className="black--section nav--container active--toggle"> */}
          <div className="nav active" id="menu-container">
            <div className="nav-box">
              <div className="nav-action">
                <nav className="relative flex h-full flex-1 flex-col space-y-1 p-2">
                  <div className="top--nav">
                    <a
                      onClick={handleClickNewChat}
                      className="mb-2 flex h-11 flex-shrink-0 flex-grow cursor-pointer items-center gap-3 rounded-md border border-white/20 px-3 py-3 text-sm text-white transition-colors duration-200 hover:bg-gray-500/10"
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
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      <p>New Chat</p>
                    </a>
                    <button
                      type="button"
                      className="nav-close-button inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-white hover:bg-gray-500/10"
                      id="nav-menu-close-btn"
                      onClick={handleNavCloseButtonClick}
                    >
                      <span className="sr-only">Close sidebar</span>
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
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="9" y1="3" x2="9" y2="21"></line>
                      </svg>
                    </button>
                  </div>

                  <ChatList setLoading={setLoading} />
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="white--section">
          {conversationList && conversationList.length === 0 && (
            <>
              <div className="brand--logo">
                <img src={Logo} alt="" />
              </div>
              <div className="capabilities--cont">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  ></path>
                </svg>
                <h2 className="cab--heading">Capabilities</h2>
                <ul className="capailitie-list">
                  <li className="">
                    Remembers what user said earlier in the conversation
                  </li>
                  <li className="">
                    Allows user to provide follow-up corrections
                  </li>
                  <li className="">
                    Trained to decline inappropriate requests
                  </li>
                </ul>
              </div>
            </>
          )}

          {/* {newChats && newChats.length > 0 &&
            < ChatResponse setLoading={setLoading} />
          } */}
          {conversationList && conversationList.length > 0 && (
            <Conversations setLoading={setLoading} />
          )}
          <div className="area--footer">
            <div className="drop-up-area">
              <div className="openAIOptions-simple-container">
                {/* <div className="model-selector">
                  <button onClick={() => setActiveDropdownGpt(!activeDropdownGpt)} className=" model-text dropdown--up" id="openbox" type="button">
                    <span className="model-start">
                      <span className="text-xs text-gray-700 dark:text-gray-500">Model:</span>text-davinci-003</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"><svg
                      stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                      strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4  text-gray-400"
                      height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"
                      style={{ transform: "scaleY(-1)" }}>
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg></span>
                  </button>
                  <ul className={`display_none drop--up dropdown--item ${activeDropdownGpt ? 'active' : ''}`}
                    id="openbox_data">
                    <li className="group relative flex h-[42px] cursor-pointer select-none items-center overflow-hidden border-b border-black/10 pl-3 pr-9 text-gray-900 last:border-0 hover:bg-[#ECECF1] dark:border-white/20 dark:text-white dark:hover:bg-gray-700"
                      id="headlessui-listbox-option-:r88:" role="option" tabIndex="-1" aria-selected="false"
                      data-headlessui-state=""><span className="flex items-center gap-1.5 truncate"><span
                        className="flex h-6 items-center gap-1 text-gray-800 dark:text-gray-100">gpt-3.5-turbo-16k-0613</span></span>
                    </li>
                    <li className="group relative flex h-[42px] cursor-pointer select-none items-center overflow-hidden border-b border-black/10 pl-3 pr-9 text-gray-900 last:border-0 hover:bg-[#ECECF1] dark:border-white/20 dark:text-white dark:hover:bg-gray-700"
                      id="headlessui-listbox-option-:r89:" role="option" tabIndex="-1" aria-selected="true"
                      data-headlessui-state="selected"><span className="flex items-center gap-1.5 truncate"><span
                        className="flex h-6 items-center gap-1 text-gray-800 dark:text-gray-100 font-semibold">text-davinci-003</span><span
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-800 dark:text-gray-100"><svg
                            stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                            strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" height="1em"
                            width="1em" xmlns="http://www.w3.org/2000/svg">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg></span></span></li>
                    <li className="group relative flex h-[42px] cursor-pointer select-none items-center overflow-hidden border-b border-black/10 pl-3 pr-9 text-gray-900 last:border-0 hover:bg-[#ECECF1] dark:border-white/20 dark:text-white dark:hover:bg-gray-700"
                      id="headlessui-listbox-option-:r8a:" role="option" tabIndex="-1" aria-selected="false"
                      data-headlessui-state=""><span className="flex items-center gap-1.5 truncate"><span
                        className="flex h-6 items-center gap-1 text-gray-800 dark:text-gray-100">gpt-3.5-turbo</span></span>
                    </li>
                    <li className="group relative flex h-[42px] cursor-pointer select-none items-center overflow-hidden border-b border-black/10 pl-3 pr-9 text-gray-900 last:border-0 hover:bg-[#ECECF1] dark:border-white/20 dark:text-white dark:hover:bg-gray-700"
                      id="headlessui-listbox-option-:r8b:" role="option" tabIndex="-1" aria-selected="false"
                      data-headlessui-state=""><span className="flex items-center gap-1.5 truncate"><span
                        className="flex h-6 items-center gap-1 text-gray-800 dark:text-gray-100">gpt-3.5-turbo-0301</span></span>
                    </li>
                    <li className="group relative flex h-[42px] cursor-pointer select-none items-center overflow-hidden border-b border-black/10 pl-3 pr-9 text-gray-900 last:border-0 hover:bg-[#ECECF1] dark:border-white/20 dark:text-white dark:hover:bg-gray-700"
                      id="headlessui-listbox-option-:r8c:" role="option" tabIndex="-1" aria-selected="false"
                      data-headlessui-state=""><span className="flex items-center gap-1.5 truncate"><span
                        className="flex h-6 items-center gap-1 text-gray-800 dark:text-gray-100">gpt-3.5-turbo-16k</span></span>
                    </li>
                    <li className="group relative flex h-[42px] cursor-pointer select-none items-center overflow-hidden border-b border-black/10 pl-3 pr-9 text-gray-900 last:border-0 hover:bg-[#ECECF1] dark:border-white/20 dark:text-white dark:hover:bg-gray-700"
                      id="headlessui-listbox-option-:r8d:" role="option" tabIndex="-1" aria-selected="false"
                      data-headlessui-state=""><span className="flex items-center gap-1.5 truncate"><span
                        className="flex h-6 items-center gap-1 text-gray-800 dark:text-gray-100">gpt-3.5-turbo-0613</span></span>
                    </li>
                  </ul>
                </div> */}
                {/* <button className="toggle--up" type="button" id="filter_btn" style={{ padding: "6px 14px" }} onClick={handleToggleClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="w-4 text-gray-600 dark:text-white">
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                </button> */}
                {isToggleVisible && (
                  <div className="toggle--up--show" style={{ opacity: 1 }}>
                    <div
                      className="endpointOptionsPopover-container show"
                      id="filterbox"
                    >
                      <div className="pop-up-box">
                        <div className="up-inner-box">
                          <button
                            onClick={handleToggleCloseClick}
                            className="inline-flex items-center close--toggle justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800 ml-auto h-auto bg-transparent px-2 py-1 text-xs font-normal text-black hover:bg-slate-200 hover:text-black focus:ring-offset-0 dark:bg-transparent dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                            type="button"
                            id="cross_icon"
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
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        </div>
                        <div className="pop-up-inner">
                          <div className="col-s">
                            <div className="grid w-full items-center gap-2">
                              <div className="items-center justify-center gap-2 flex w-full resize-none">
                                <div className="inner-box-btn">
                                  <button
                                    className="m-text"
                                    id="headlessui-listbox-button-:ra:"
                                    type="button"
                                    aria-haspopup="listbox"
                                    aria-expanded="false"
                                    data-headlessui-state=""
                                    aria-labelledby="headlessui-listbox-label-:r1: headlessui-listbox-button-:ra:"
                                    fdprocessedid="4ns6y"
                                  >
                                    {" "}
                                    <label
                                      className="block text-xs text-gray-700 dark:text-gray-500"
                                      data-headlessui-state=""
                                      id="headlessui-listbox-label-:r1:"
                                    >
                                      Company
                                    </label>
                                    <span className="inline-flex w-full truncate">
                                      <span className="flex h-6 items-center gap-1 truncate text-sm text-gray-900 dark:text-white">
                                        {company||"none"}
                                      </span>
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="grid w-full items-center gap-2">
                              <div className="items-center justify-center gap-2 flex w-full resize-none">
                                <div className="relative w-full">
                                  <button
                                    className="m-text dropdown--up"
                                    id="open_drop_down_btn"
                                    type="button"
                                    onClick={() =>
                                      settoggelDropdown(!toggelDropdown)
                                    }
                                    aria-haspopup="listbox"
                                    aria-expanded="true"
                                    data-headlessui-state="open"
                                    aria-labelledby="headlessui-listbox-label-:r1: headlessui-listbox-button-:ra:"
                                    fdprocessedid="bgy91"
                                    aria-controls="headlessui-listbox-options-:r7m:"
                                  >
                                    <div>
                                      <label
                                        className="block text-xs text-gray-700 dark:text-gray-500"
                                        data-headlessui-state="open"
                                        id="headlessui-listbox-label-:r1:"
                                      >
                                        Model
                                      </label>
                                      <span className="inline-flex w-full truncate">
                                        <span className="flex h-6 items-center gap-1 truncate text-sm text-gray-900 dark:text-white">
                                          Manufacturing Model
                                        </span>
                                      </span>
                                    </div>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <svg
                                        stroke="currentColor"
                                        fill="none"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4  text-gray-400"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                      </svg>
                                    </span>
                                  </button>
                                  <ul
                                    className={`display_none drop-li dropdown--item ${
                                      toggelDropdown ? `active` : ""
                                    }`}
                                    id="close_drop_down_btn"
                                    role="listbox"
                                  >
                                    <li
                                      className="group relative flex h-[42px] cursor-pointer select-none items-center overflow-hidden border-b border-black/10 pl-3 pr-9 text-gray-900 last:border-0 hover:bg-[#ECECF1] dark:border-white/20 dark:text-white dark:hover:bg-gray-700"
                                      id="headlessui-listbox-option-:r7n:"
                                      role="option"
                                      tabIndex="-1"
                                      aria-selected="false"
                                      data-headlessui-state=""
                                    >
                                      <span className="flex items-center gap-1.5 truncate">
                                        <span className="flex h-6 items-center gap-1 text-gray-800 dark:text-gray-100">
                                          Manufacturing Model
                                        </span>
                                      </span>
                                    </li>
                                    <li
                                      className="group relative flex h-[42px] cursor-pointer select-none items-center overflow-hidden border-b border-black/10 pl-3 pr-9 text-gray-900 last:border-0 hover:bg-[#ECECF1] dark:border-white/20 dark:text-white dark:hover:bg-gray-700"
                                      id="headlessui-listbox-option-:r7o:"
                                      role="option"
                                      tabIndex="-1"
                                      aria-selected="true"
                                      data-headlessui-state="selected"
                                    >
                                      <span className="flex items-center gap-1.5 truncate">
                                        <span className="flex h-6 items-center gap-1 text-gray-800 dark:text-gray-100 font-semibold">
                                          Space Science Model
                                        </span>
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-800 dark:text-gray-100">
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
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                          </svg>
                                        </span>
                                      </span>
                                    </li>
                                    <li
                                      className="group relative flex h-[42px] cursor-pointer select-none items-center overflow-hidden border-b border-black/10 pl-3 pr-9 text-gray-900 last:border-0 hover:bg-[#ECECF1] dark:border-white/20 dark:text-white dark:hover:bg-gray-700"
                                      id="headlessui-listbox-option-:r7p:"
                                      role="option"
                                      tabIndex="-1"
                                      aria-selected="false"
                                      data-headlessui-state=""
                                    >
                                      <span className="flex items-center gap-1.5 truncate">
                                        <span className="flex h-6 items-center gap-1 text-gray-800 dark:text-gray-100">
                                          Resume Model
                                        </span>
                                      </span>
                                    </li>
                                    <li
                                      className="group relative flex h-[42px] cursor-pointer select-none items-center overflow-hidden border-b border-black/10 pl-3 pr-9 text-gray-900 last:border-0 hover:bg-[#ECECF1] dark:border-white/20 dark:text-white dark:hover:bg-gray-700"
                                      id="headlessui-listbox-option-:r7q:"
                                      role="option"
                                      tabIndex="-1"
                                      aria-selected="false"
                                      data-headlessui-state=""
                                    >
                                      <span className="flex items-center gap-1.5 truncate">
                                        <span className="flex h-6 items-center gap-1 text-gray-800 dark:text-gray-100">
                                          My Personal Healthcare Model
                                        </span>
                                      </span>
                                    </li>
                                    <li
                                      className="group relative flex h-[42px] cursor-pointer select-none items-center overflow-hidden border-b border-black/10 pl-3 pr-9 text-gray-900 last:border-0 hover:bg-[#ECECF1] dark:border-white/20 dark:text-white dark:hover:bg-gray-700"
                                      id="headlessui-listbox-option-:r7r:"
                                      role="option"
                                      tabIndex="-1"
                                      aria-selected="false"
                                      data-headlessui-state=""
                                    >
                                      <span className="flex items-center gap-1.5 truncate">
                                        <span className="flex h-6 items-center gap-1 text-gray-800 dark:text-gray-100">
                                          {" "}
                                          Article Writer Model
                                        </span>
                                      </span>
                                    </li>
                                    <li
                                      className="group relative flex h-[42px] cursor-pointer select-none items-center overflow-hidden border-b border-black/10 pl-3 pr-9 text-gray-900 last:border-0 hover:bg-[#ECECF1] dark:border-white/20 dark:text-white dark:hover:bg-gray-700"
                                      id="headlessui-listbox-option-:r7s:"
                                      role="option"
                                      tabIndex="-1"
                                      aria-selected="false"
                                      data-headlessui-state=""
                                    >
                                      <span className="flex items-center gap-1.5 truncate">
                                        <span className="flex h-6 items-center gap-1 text-gray-800 dark:text-gray-100">
                                          Imaginative Model
                                        </span>
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* <div className="form-field fied-p"><label
                            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200 text-left text-sm font-medium"
                            htmlFor="chatGptLabel">Create Model Company<small className="opacity-40">(default:
                              blank)</small></label><input
                              className="dark:focus:ring-offset-slate-900 rounded-md border border-gray-200 focus:border-slate-400 focus:bg-gray-50 bg-transparent text-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] outline-none placeholder:text-gray-400 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-500 dark:bg-gray-700 focus:dark:bg-gray-600 dark:text-gray-50 dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] dark:focus:border-gray-400 dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-gray-400 dark:focus:ring-offset-0 flex h-10 max-h-10 w-full resize-none px-3 py-2 focus:outline-none focus:ring-0 focus:ring-opacity-0 focus:ring-offset-0"
                              id="chatGptLabel" placeholder="Create your own model Company" value=""
                              fdprocessedid="uq2rb5" /></div>
                          <div className="form-field fied-p"><label
                            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200 text-left text-sm font-medium"
                            htmlFor="promptPrefix">Create Model Description <small className="opacity-40">(default:
                              blank)</small></label><textarea id="promptPrefix"
                                placeholder="Set custom instructions to include in System Message. Default: none"
                                className="rounded-md border border-gray-200 focus:border-slate-400 focus:bg-gray-50 bg-transparent text-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] outline-none placeholder:text-gray-400 focus:outline-none focus:ring-gray-400 focus:ring-opacity-20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-500 dark:bg-gray-700 focus:dark:bg-gray-600 dark:text-gray-50 dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] dark:focus:border-gray-400 dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-gray-400 dark:focus:ring-offset-0 flex max-h-[300px] min-h-[100px] w-full resize-none px-3 py-2"
                                style={{ height: "57.6px !important" }}></textarea></div> */}
                          </div>
                          <div className="col-s">
                            <label htmlFor="Create Model">Create Model</label>
                            <div className="form-field create--model--div">
                              <input placeholder="Model Title" />
                              <input placeholder="Model Category" />
                              <textarea placeholder="Model Description" />
                            </div>
                            <button className="custom--btn">Create</button>
                          </div>
                          {/* <div className="col-s"><a data-state="closed" className="grid w-full items-center gap-2">
                          <div className="flex justify-between"><label
                            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200 text-left text-sm font-medium"
                            htmlFor="temp-int">Temperature <small className="opacity-40">(default:
                              1)</small></label>
                            <div
                              className="rc-input-number flex focus:ring-2 dark:focus:ring-offset-slate-900 rounded-md focus:border-slate-400 bg-transparent text-sm outline-none placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-50 dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] dark:focus:border-gray-400 dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-gray-400 dark:focus:ring-offset-0 p-0 shadow-none text-right pr-1 border-transparent focus:ring-[#10a37f] focus:ring-offset-0 focus:ring-opacity-100 hover:bg-gray-800/10 dark:hover:bg-white/10 focus:bg-gray-800/10 dark:focus:bg-white/10 transition-colors reset-rc-number-input reset-rc-number-input-text-right h-auto w-12 border-0 group-hover/temp:border-gray-200">
                              <div className="rc-input-number-input-wrap"></div>
                            </div>
                          </div>
                          <div>
                            <span id="rangeValue">0</span>
                            <input className="range" type="range" name="" value="0" min="0" max="1000"
                              onMouseMove="rangeSlide(this.value)" onChange="rangeSlide(this.value)"
                              style={{ accentColor: "#17271e" }} />
                          </div>
                        </a><a data-state="closed" className="grid w-full items-center gap-2">
                            <div className="flex justify-between"><label
                              className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200 text-left text-sm font-medium"
                              htmlFor="top-p-int">Top P <small className="opacity-40">(default:
                                1)</small></label>
                              <div
                                className="rc-input-number flex focus:ring-2 dark:focus:ring-offset-slate-900 rounded-md focus:border-slate-400 bg-transparent text-sm outline-none placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-50 dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] dark:focus:border-gray-400 dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-gray-400 dark:focus:ring-offset-0 p-0 shadow-none text-right pr-1 border-transparent focus:ring-[#10a37f] focus:ring-offset-0 focus:ring-opacity-100 hover:bg-gray-800/10 dark:hover:bg-white/10 focus:bg-gray-800/10 dark:focus:bg-white/10 transition-colors reset-rc-number-input reset-rc-number-input-text-right h-auto w-12 border-0 group-hover/temp:border-gray-200">
                              </div>
                            </div>
                            <div>
                              <span id="rangeValues">0</span>
                              <input className="range" type="range" name="" value="0" min="0" max="1000"
                                onMouseMove="rangeSlides(this.value)" onChange="rangeSlides(this.value)"
                                style={{ accentColor: "#17271e" }} />
                            </div>
                          </a><a data-state="closed" className="grid w-full items-center gap-2">
                            <div className="flex justify-between"><label
                              className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200 text-left text-sm font-medium"
                              htmlFor="freq-penalty-int">Frequency Penalty <small className="opacity-40">(default:
                                0)</small></label>
                              <div
                                className="rc-input-number flex focus:ring-2 dark:focus:ring-offset-slate-900 rounded-md focus:border-slate-400 bg-transparent text-sm outline-none placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-50 dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] dark:focus:border-gray-400 dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-gray-400 dark:focus:ring-offset-0 p-0 shadow-none text-right pr-1 border-transparent focus:ring-[#10a37f] focus:ring-offset-0 focus:ring-opacity-100 hover:bg-gray-800/10 dark:hover:bg-white/10 focus:bg-gray-800/10 dark:focus:bg-white/10 transition-colors reset-rc-number-input reset-rc-number-input-text-right h-auto w-12 border-0 group-hover/temp:border-gray-200">
                                <div className="rc-input-number-input-wrap"></div>
                              </div>
                            </div>
                            <div>
                              <span id="rangeValuess">268</span>
                              <input className="range" type="range" name="" value="0" min="0" max="1000"
                                onMouseMove="rangeSlidess(this.value)" onChange="rangeSlidess(this.value)"
                                style={{ accentColor: "#17271e" }} />
                            </div>
                          </a><a data-state="closed" className="grid w-full items-center gap-2">
                            <div className="flex justify-between"><label
                              className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200 text-left text-sm font-medium"
                              htmlFor="pres-penalty-int">Presence Penalty <small className="opacity-40">(default:
                                0)</small></label>
                              <div
                                className="rc-input-number flex focus:ring-2 dark:focus:ring-offset-slate-900 rounded-md focus:border-slate-400 bg-transparent text-sm outline-none placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-50 dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] dark:focus:border-gray-400 dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-gray-400 dark:focus:ring-offset-0 p-0 shadow-none text-right pr-1 border-transparent focus:ring-[#10a37f] focus:ring-offset-0 focus:ring-opacity-100 hover:bg-gray-800/10 dark:hover:bg-white/10 focus:bg-gray-800/10 dark:focus:bg-white/10 transition-colors reset-rc-number-input reset-rc-number-input-text-right h-auto w-12 border-0 group-hover/temp:border-gray-200">
                                <div className="rc-input-number-input-wrap"></div>
                              </div>
                            </div>
                            <div>
                              <span id="rangeValuesss">215</span>
                              <input className="range" type="range" name="" value="0" min="0" max="1000"
                                onMouseMove="rangeSlidesss(this.value)" onChange="rangeSlidesss(this.value)"
                                style={{ accentColor: "#17271e" }} />
                            </div>
                          </a></div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <section className="footer--area">
              <div className="input-panel">
                <form onSubmit={handleSubmit} className="stretch">
                  <div className="serch-box">
                    <div className="search-part">
                      <div className="chat-start-icon">
                        <img src={Logo} alt="logo" />
                      </div>
                      <div className="search-text">
                        <textarea
                          onKeyDown={handleKeyDown}
                          rows={textareaheight}
                          value={newChat}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <div className="file-add-btn">
                        <label htmlFor="file">
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
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </label>
                        <input type="file" id="file" name="" />
                      </div>
                      <div className="share-btn">
                        <button disabled={!newChat} type="submit" className="">
                          <div className=" ">
                            <svg
                              stroke="currentColor"
                              fill="none"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-1 h-4 w-4 "
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <line x1="22" y1="2" x2="11" y2="13"></line>
                              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <button
                className="toggle--up-1"
                type="button"
                id="filter_btn"
                style={{ padding: "6px 14px" }}
                onClick={handleToggleClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 text-gray-600 dark:text-white"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
              </button>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

//export default IsLoadingHOC(IsLoggedinHOC(User));
export default IsLoadingHOC(User);
