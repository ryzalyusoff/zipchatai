class ChatMessagesController < ApplicationController
  # disable CSRF checks for API POSTs
  skip_forgery_protection

  def create
    bot_reply = [
      "Thanks for your message! Our team will get back to you soon.",
      "We've received your inquiry and will respond shortly.",
      "Thank you for contacting us. We'll respond as soon as possible.",
      "Your message has been received. We'll be in touch!",
      "Thanks for reaching out! We'll get back to you within 24 hours."
    ].sample

    # simulate a small processing delay
    sleep 0.5

    respond_to do |format|
      # ← This is what our Checkout extension will call
      format.json do
        render json: { reply: bot_reply }
      end

      # optional: still support turbo streams if you have an HTML chat page
      format.turbo_stream
      format.html { redirect_to chat_path }
    end
  end
end
