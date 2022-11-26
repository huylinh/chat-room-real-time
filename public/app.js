const socket = io();
const msgText = document.querySelector("#msg");
const btnSend = document.querySelector("#btn-send");
const chatBox = document.querySelector(".chat-content");
const displayMsg = document.querySelector(".message");
var output = document.getElementById('output');

let data;
let selectId = 1; //mac dinh chu cua hang noi chuyen voi nguoi 1
let listUsers;

axios.get('https://sheetdb.io/api/v1/eqmb0knb7l8rv')
.then(function (response) {

  //Sau khi lay duoc data

  //Chuong trinh se chay sau khi lay het data
  

  data = response.data;

  main();
  console.log(data);
  if (id==-1) hienthiNguoiDung();
  hienthiData();
})
.catch(function (error) {
  console.log(error);
});

//Hien thi data lich su dua theo selectId va id nguoi dung
function hienthiData() {

  document.querySelector(".message").innerHTML = "";

  if (id == -1) {
    data.forEach(element => {
      console.log("Vong lap trong hien thi data",element)
      if (element.id == id && element.to == selectId) {   //chu cua hang
        display(element,"you-message");
      } else if (element.id == selectId)  //
        display(element,"other-message");
  
    });
  }
  else {
    data.forEach(element => {
      console.log("Vong lap trong hien thi data",element)
      if (element.id == id) {   //tin nhan cua ban than
        display(element,"you-message");
      } else if (element.id == -1 && element.to == id)  //neu k phai chua cua hang => mac dinh noi chuyen voi doi tuong la chu cua hang id = -1, con khong thi tuy vao selectId
        display(element,"other-message");
  
    });
  }
}

function hienthiNguoiDung() {
  const key = 'id';
  listUsers = [...new Map(data.map(item =>
    [item[key], item])).values()];

  listUsers.forEach(element => {
    if (element.id != id) {
      document.getElementById('list-wrap').innerHTML += `
      <div class="user-select" id=${element.id}>
      <div class="l-user-name">
        ${element.name}
      </div>
      <div class="l-user-time">
        20ms
      </div>
    </div>`
    }
  });

  document.querySelectorAll(".user-select").forEach((user)=>{
    user.addEventListener('click',(e) => {
      selectId = user.id;
      hienthiData();
      highLight(selectId);
      readed(selectId);
      console.log(e);
    })
  })

  highLight(selectId);

}

function highLight(id) {
  //xoa het mau neu co
  console.log("Highlight ID: ", id);
  document.querySelectorAll(".user-select").forEach((user)=>{
    user.classList.remove('user-selected');
  })
  document.getElementById(id).classList.add('user-selected');
}

function newMess(id) {
  //xoa het mau neu co
  console.log("New mess ID: ", id);
  document.getElementById(id).classList.add('user-new-mess');
}

function readed(id) {
  document.getElementById(id).classList.remove('user-new-mess');
}

let id;
let name;

function main() {
  do {
    id = prompt("what is your id");
    // if(id!=-1) name = prompt("What is your name: "); else name = "Chu cua hang";
  
    //chu cua hang
    if (id == -1) {
      name = "Nhan vien tu van";
      break;
    }
  
    const found = data.find(element => element.id == id);
    
    if (found) {
      name = found.name;
    } else {
      name = prompt("Chao mung ban moi, ten cua ban la: ");
    }
  } while (!id);

  document.querySelector("#your-name").textContent = name;
}

btnSend.addEventListener("click", (e) => {
  e.preventDefault(); //bấm submit chuyển trang nên cần cái này dể giữ trang còn nguyên

  if (hasImg) {
    uploadToFileBase();
  }
  else {
    sendMsg(msgText.value);
    msgText.value = "";
    msgText.focus();
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});

const sendMsg = (message) => {
  let msg = {
    id: id,
    name: name,
    to:  id==-1? selectId : -1,
    message: message.trim(),
    time: new Date().toLocaleTimeString()
  };
  //API lấy tên
  display(msg, "you-message");
  socket.emit("sendMessage",msg);
  //
};

socket.on("sendToAll", (msg) => {

  const found = data.find(element => element.id == msg.id);

  console.log('Found?',found,msg);
  if (found) {
    if (found != selectId) {
      newMess(msg.id);
    } else display(msg, "other-message");
  } else {
    data.push(msg);
    newMess(msg.id);
  }
  //mỗi lần mình display mesage là phải cập nhật cho scrollop = vị trí y của chat xuống cuối
  chatBox.scrollTop = chatBox.scrollHeight;
});

const display = (msg, type) => {
  console.log(msg);

    const msgDiv = document.createElement("div");
    let className = type;
    msgDiv.classList.add(className, "message-row");
    const imgOrText = checkURL(msg.message) ? `<img class="img-chat-view" src="${msg.message}" alt="">` : `<div class="message-text">${msg.message}</div>`
    let innerText = `
    <div class="message-title">🤤<span>${msg.name}</span></div>
    ${imgOrText}
    <div class="message-time">${msg.time}</div>
      `;
    msgDiv.innerHTML = innerText;
    displayMsg.appendChild(msgDiv);
};

// querry
//26/11: lưu 1 phòng vào database
//19/11: kiểm tra tiến độ lưu nhiều phòng

//Tai anh len:

var file;
var hasImg = false;

document.getElementById("file").addEventListener('change', (e) => {
	console.log(event);
	file = event.target.files[0];
	console.log(file);
    output.src = URL.createObjectURL(event.target.files[0]);
	output.style.visibility = "visible";
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }

    hasImg = true;
})

import e from "express";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCenHuhDER2MN5S5jt8j7DMWaPBQcYFQAw",
    authDomain: "uploadfiletofirebase-ae63f.firebaseapp.com",
    projectId: "uploadfiletofirebase-ae63f",
    storageBucket: "uploadfiletofirebase-ae63f.appspot.com",
    messagingSenderId: "548678075768",
    appId: "1:548678075768:web:d9a471afe85756f666348d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

function uploadToFileBase() {
      const metadata = {
      contentType: 'image/jpeg'
    };
    const storage = getStorage();
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  //       uploadBytes(storageRef, file).then((snapshot) => {
  //     console.log('Uploaded a blob or file!');
  // });

  uploadTask.on('state_changed',
  (snapshot) => {
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case 'paused':
    console.log('Upload is paused');
    break;
    case 'running':
    console.log('Upload is running');
    break;
  }
  }, 
  (error) => {
  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
    // User doesn't have permission to access the object
    break;
    case 'storage/canceled':
    // User canceled the upload
    break;

    // ...

    case 'storage/unknown':
    // Unknown error occurred, inspect error.serverResponse
    break;
  }
  }, 
  () => {
  // Upload completed successfully, now we can get the download URL
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    console.log('File available at', downloadURL);
    hasImg = false;
    output.style.visibility = "hidden";

    sendMsg(downloadURL);
    msgText.value = "";
    msgText.focus();
    chatBox.scrollTop = chatBox.scrollHeight;
  });
  }
  );

}

function checkURL(url) {
  return url?.includes("uploadfiletofirebase-ae63f.appspot.com");
}

// List
