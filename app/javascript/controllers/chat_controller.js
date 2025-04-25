import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["messages", "input"]

  connect() {
    console.log("Chat controller connected")
  }

  handleKeyPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      this.element.querySelector("form").requestSubmit()
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
