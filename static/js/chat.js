let channelDiv = document.getElementById("channelDiv")
let messageDiv = document.getElementById("messageDiv")
let messageBox = document.getElementById("messageBox")
let statusMessage = document.getElementById("statusMessage")

let channelID = 0

// create a cache to store the images (delete this once you add SSE)
const imageCache = {};

async function updateMessages(id) {
  try {
    const response = await fetch(`/api/chat/getmessages/${id}`);
    const messages = await response.json();
    statusMessage.innerText = "";
    document.querySelectorAll(".messageParagraph").forEach((el) => el.remove());

    for (const message of messages) {
      const messageParagraph = document.createElement("p");
      const timeParagraph = document.createElement("p");
      const { creator, content, id, created } = message;

      // Check if the message content contains any links that are not image links and hide image links
      const hideRegex = /(https?:\/\/(?:cdn\.discordapp\.com|media\.discordapp\.net|media\.tenor\.com|i\.imgur\.com)\/.+?\.(?:png|apng|webp|svg|jpg|jpeg|gif))(?=$|\s)/gi;
      let messageContent = content.replace(hideRegex, "");

      messageParagraph.innerText = `${creator.username}: ${messageContent}`;
      messageParagraph.classList.add("messageParagraph");
      messageParagraph.id = `messageParagraph${id}`;
      messageParagraph.appendChild(timeParagraph);

      const time = new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "numeric" }).format(Number(created.split(".")[0]) * 1000 + 20265);

      messageParagraph.innerHTML = `<span style="color: #515051; font-size: 14px;">${time}</span> ${messageParagraph.innerHTML}`;
      messageDiv.append(messageParagraph);

      const imgLinks = content?.match(/(https?:\/\/(?:cdn\.discordapp\.com|media\.discordapp\.net|media\.tenor\.com|i\.imgur\.com|burger\.ctaposter\.xyz)\/.+?\.(?:png|apng|webp|svg|jpg|jpeg|gif))(?=$|\s)/gi) || [];

      for (const link of imgLinks) {
        // delete the code below once you add sse
        if (imageCache[link]) {
          messageParagraph.appendChild(imageCache[link].cloneNode(true));
        } else {
        // delete the code above once you add sse
          const img = new Image();
          img.src = link;
          img.className = "messageImage";
          img.onload = () => {
            const maxWidth = 400;
            const maxHeight = 400;
            let { width, height } = img;
            if (width > maxWidth || height > maxHeight) {
              const ratio = Math.min(maxWidth / width, maxHeight / height);
              width *= ratio;
              height *= ratio;
            }
            img.width = width;
            img.height = height;
            // delete the line below once you add sse
            imageCache[link] = img.cloneNode(true);
            messageParagraph.appendChild(img);
          };
        }
      }
    }
  } catch {
    statusMessage.innerText = "Not connected";
  }
}

function selectChannel(id) {
    channelID = id

    let selectedButton = channelDiv.querySelector(".selected");
    if (selectedButton) {
        selectedButton.classList.remove("selected");
    }

    let channelButton = document.getElementById("channelButton" + id)
    if (channelButton) {
        channelButton.classList.add("selected")
    }
    else {
        console.log("channelButton not found")
    }

    updateMessages(id)
}

function selectChannel(id) {
    channelID = id

    let selectedButton = channelDiv.querySelector(".selected");
    if (selectedButton) {
        selectedButton.classList.remove("selected");
    }

    let channelButton = document.getElementById("channelButton" + id)
    if (channelButton) {
        channelButton.classList.add("selected")
    }
    else {
        console.log("channelButton not found")
    }

    updateMessages(id)
}

async function updateRooms() {
    let response = await fetch("/api/chat/listrooms");
    let rooms = await response.json()
    for (let i in rooms) {
        let channelButton = document.createElement("button")
        channelButton.appendChild(document.createTextNode(rooms[i]["name"]))
        channelButton.id = "channelButton" + rooms[i]["id"]
        channelButton.onclick = function () { selectChannel(rooms[i]["id"]) }

        channelDiv.append(channelButton)
    }

    selectChannel(1)
}

async function sendMessage(content, id) {
    fetch("/api/chat/send/" + String(id), {
        method: "POST",
        body: JSON.stringify({
            content: content
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

messageBox.addEventListener("keyup", function onEvent(event) {
    if (event.key === "Enter") {
        if (!messageBox.value == "") {
            if (messageBox.value.length < 140) {
                sendMessage(messageBox.value, channelID)
                updateMessages(channelID)
                messageBox.value = ""
            }
        }
    }
})

function update() {
    updateMessages(channelID)

    setTimeout(update, 1500);
}

window.addEventListener("load", function () {
    updateRooms()
    update()
})