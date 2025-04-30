class ChatMessagesController < ApplicationController
  skip_forgery_protection

  def create
    @bot_reply = [
      "Thanks for your message!",
      "We'll respond shortly.",
      "Got it. Thanks for reaching out!",
      "Your message has been received. We'll be in touch!",
      "Thanks for reaching out! We'll get back to you within 24 hours."
    ].sample

    sleep 0.5

    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to chat_path }
    end
  end
end
