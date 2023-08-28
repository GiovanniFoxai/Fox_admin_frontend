import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chatId: '',
    chatList: [],
    newChats: [],
    prevChats: [],
    conversationList: []
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        saveChatList: (state, action) => {
            state.chatList = action.payload;
        },
        saveChatId: (state, action) => {
            state.chatId = action.payload;
        },
        saveNewChats: (state, action) => {
            state.newChats = action.payload;
        },
        savePrevChats: (state, action) => {
            state.prevChats = action.payload;
        },
        saveConversationList: (state, action) => {
            state.conversationList = action.payload;
        },
    },
});

export const { saveChatId, saveChatList, saveNewChats, savePrevChats, saveConversationList } = appSlice.actions;

export default appSlice.reducer;