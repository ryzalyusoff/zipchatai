class ChatMessagesController < ApplicationController
  skip_forgery_protection

  def create
    @user_message = params[:content]

    respond_to do |format|
      format.turbo_stream
    end
  end
end
