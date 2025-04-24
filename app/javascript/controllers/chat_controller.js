import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "messages"]

  connect() {
    console.log("Chat controller connected")
  }

  handleKeyPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      this.element.querySelector("form").requestSubmit()
    }
  }

  afterSubmit() {
    this.inputTarget.value = ""

    setTimeout(() => {
      fetch("/chat_replies", {
        method: "POST",
        headers: {
          "Accept": "text/vnd.turbo-stream.html",
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        }
      })
        .then(response => response.text())
        .then(html => {
          const fragment = document.createRange().createContextualFragment(html)
          document.body.appendChild(fragment)
        })
    }, 1000)
  }
}
