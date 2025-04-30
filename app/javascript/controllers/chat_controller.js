import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["chatbubble", "messages", "input"]

  chatOpen = false

  connect() {
    console.log("Chat controller connected");

    if (window.shopify) {
      console.log("Shopify App Bridge script loaded successfully!");
    } else {
      console.log("Shopify App Bridge script is not loaded.");
    }
  }

  handleKeyPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      this.element.querySelector("form").requestSubmit()
    }
  }

  handleToggle(event) {
    const chatbox = this.chatbubbleTarget;

    if (this.chatOpen) {
      console.log("- Window should be minimized now");
      chatbox.style.display = 'none';
      window.resizeTo(150, 70); 
      this.chatOpen = false;
    } else {
      console.log("+ Window should be maximized now");
      window.resizeTo(415, 700); 
      chatbox.style.display = 'block';
      this.chatOpen = true;
    }
  }

  submitStart(event) {
    const content = this.inputTarget.value.trim()
    if (content === "") {
      event.preventDefault() 
      return
    }

    const div = document.createElement("div")
    div.className = "message user"
    div.innerHTML = `<div class="message-content">${content}</div>`
    this.messagesTarget.appendChild(div)

    this.inputTarget.value = ""
  }
}
