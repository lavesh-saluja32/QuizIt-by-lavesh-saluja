# frozen_string_literal: true

class ReportDownloadChannel < ApplicationCable::Channel
  def subscribed
    stream_from params[:pubsub_token] if params[:pubsub_token].present?
    puts "HELLO POP 2"
  end

  def unsubscribed
    stop_all_streams
  end
end
