# frozen_string_literal: true

class AddSendSubmissionEmailToQuizzes < ActiveRecord::Migration[7.1]
  def change
    add_column :quizzes, :email_notification, :boolean, default: false
  end
end
