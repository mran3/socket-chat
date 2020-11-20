import Modals from './modals.js';
import {formatAMPM, ready} from './utils.js'
const socket = io();

function renderMsg(ownMsg, text) {
    if(text == "" || text == undefined) return;
    const msgBox = document.createElement("div");
    msgBox.textContent = text;
    msgBox.classList.add('message');

    const timeLabel = document.createElement("div");
    timeLabel.classList.add('message-time');
    const today = new Date();
    let time;
    if(localStorage.getItem('ampm') == "12") {
        time = formatAMPM(today);
    } else {
        time = today.getHours() + ":" + today.getMinutes();
    }
    
    timeLabel.textContent = time;

    const bubble = document.createElement("div");
    const bubbleClass = ownMsg ? 'me' : 'you';
    bubble.classList.add('bubble');
    bubble.classList.add(bubbleClass);
    bubble.appendChild(msgBox);
    bubble.appendChild(timeLabel);

    const chatWindow = document.getElementById('main-chat__conversation');
    chatWindow.appendChild(bubble);
}

function setUpSocket() {
    socket.on('msg', (msg) => {        
        renderMsg(false, msg.msg);        
    });
}

function setUpChatUI() {
    const sendBtn = document.getElementById('btn-send');
    sendBtn.addEventListener('click', () => {
        const messageBox = document.getElementById('message-box');
        socket.emit('msg', {'msg': messageBox.value});        
        renderMsg(true, messageBox.value);
        messageBox.value = '';
    });
}

function setUpModals() {
    Modals.initModals();
    const saveBtn = document.getElementById('save-preferences'); 
    saveBtn.addEventListener('click', () => {
        document.querySelector('input[name="timedisplay"]:checked').value;        
        if (document.querySelector('input[name="timedisplay"]:checked').value == "12") {
            localStorage.setItem('ampm', "12")
        } else {
            localStorage.setItem('ampm', "24")
        }
        Modals.hideModals();
    })
}

ready(() => {    
    setUpModals();
    setUpSocket();
    setUpChatUI();
})