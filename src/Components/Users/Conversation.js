import React from 'react';
import { useSelector } from 'react-redux';
import Logo from '../../assets/image/logo.png';


function PreviousChats() {
    const { conversationList , chatId } = useSelector(state => state.app)


    return (
        <>
            <div className="chat--list">
                <ul>
                    {conversationList && conversationList.length > 0 &&
                        conversationList.map((item, index) =>
                            <React.Fragment key={index + 1}>
                                <li>
                                    <div className="max--col">
                                        <span className="icon--chat">hr</span>
                                        <p>{item?.question}</p>
                                        <div className="icon--list">
                                            <button className="edit--icon">
                                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                                    strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" height="1em" width="1em"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7">
                                                    </path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z">
                                                    </path>
                                                </svg>
                                            </button>
                                            <button className="edit--icon">
                                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                                    strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" height="1em" width="1em"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2">
                                                    </path>
                                                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="max--col">
                                        <span className="icon--chat admin--icon">
                                        <img src={Logo} alt="logo" />
                                        </span>
                                        <p>{item?.message}</p>
                                        <div className="icon--list">
                                            <button className="edit--icon">
                                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                                    strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" height="1em" width="1em"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <polyline points="1 4 1 10 7 10"></polyline>
                                                    <polyline points="23 20 23 14 17 14"></polyline>
                                                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15">
                                                    </path>
                                                </svg>
                                            </button>
                                            <button className="edit--icon">
                                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                                    strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" height="1em" width="1em"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2">
                                                    </path>
                                                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </React.Fragment>
                        )
                    }
                </ul>
            </div>
        </>
    )
}

export default PreviousChats
