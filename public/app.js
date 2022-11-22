
const socket = io();
const msgText = document.querySelector("#msg");
const btnSend = document.querySelector("#btn-send");
const chatBox = document.querySelector(".chat-content");
const displayMsg = document.querySelector(".message");

let data;
axios.get('https://sheetdb.io/api/v1/eqmb0knb7l8rv')
.then(function (response) {
  data = response.data;
  console.log(data);

  data.forEach(element => {
    if ((element.id == type) || (element.type == type)) {
      display({
        message: element.tinnhan},"you-message");
    } else display({
      message: element.tinnhan},"other-message");
  });
})
.catch(function (error) {
  console.log(error);
});

let name;
let type;
do {
  name = prompt("what is your name");
  type = prompt("khachhang?")
} while (!name);

document.querySelector("#your-name").textContent = name;
btnSend.addEventListener("click", (e) => {
  e.preventDefault(); //bấm submit chuyển trang nên cần cái này dể giữ trang còn nguyên
  sendMsg(msgText.value);
  msgText.value = "";
  msgText.focus();
  chatBox.scrollTop = chatBox.scrollHeight;
});

const sendMsg = (message) => {
  let msg = {
    user: name,
    type: type,
    message: message.trim(),
  };
  //API lấy tên
  display(msg, "you-message");
  socket.emit("sendMessage",msg);
  //
};

socket.on("sendToAll", (msg) => {
  display(msg, "other-message");
  //mỗi lần mình display mesage là phải cập nhật cho scrollop = vị trí y của chat xuống cuối
  chatBox.scrollTop = chatBox.scrollHeight;
});

const display = (msg, type) => {
  const msgDiv = document.createElement("div");
  let className = type;
  msgDiv.classList.add(className, "message-row");
  let times = new Date().toLocaleTimeString();
  let innerText = `
  <div class="message-title">🤤<span>${msg.user}</span></div>
  <div class="message-text">${msg.message}</div>
  <div class="message-time">${times}</div>
    `;
  msgDiv.innerHTML = innerText;
  displayMsg.appendChild(msgDiv);
};

// querry
//26/11: lưu 1 phòng vào database
//19/11: kiểm tra tiến độ lưu nhiều phòng
