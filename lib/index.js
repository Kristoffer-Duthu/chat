const batch = 572; // change to your own batch id
const baseUrl = `https://wagon-chat.herokuapp.com/${batch}/messages`;

// Your turn to code!
const btnRefresh = document.querySelector('#refresh');
const messages = document.querySelector('#message-list');
const form = document.querySelector('#comment-form');
const content = document.querySelector('#your-message');
const name = document.querySelector('#your-name');

const chatRefresh = () => {
  fetch(baseUrl)
    .then(response => response.json())
    .then((data) => {
      messages.innerHTML = "";
      console.log(data);
      data.messages.forEach((message) => {
        console.log(message);
        const minsAgo = Math.round((new Date() - new Date(message.created_at)) / 60000);
        console.log(minsAgo);
        const messageFull = `<li>${message.content} (posted <span class="date"> ${minsAgo} mins ago</span>) by ${message.author}</li>`;
        messages.insertAdjacentHTML('afterbegin', messageFull);
      });
    });
};

const messagePost = (message, callback) => {
  fetch(baseUrl, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  }).then(response => response.json())
    .then((data) => {
      console.log(data);
      callback();
    });
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(content.value, name.value);
  const data = { author: name.value, content: content.value };
  messagePost(data, chatRefresh);
});

btnRefresh.addEventListener('click', chatRefresh);
document.addEventListener("DOMContentLoaded", chatRefresh);
setInterval(chatRefresh, 60000);
