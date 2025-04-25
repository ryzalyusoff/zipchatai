class ChatMessagesController < ApplicationController
  skip_forgery_protection

  def create
    @bot_reply = [
      "Thanks for your message! Our team will get back to you soon.",
      "We've received your inquiry and will respond shortly.",
      "Thank you for contacting us. We'll respond as soon as possible.",
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
