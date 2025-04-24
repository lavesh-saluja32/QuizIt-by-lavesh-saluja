# frozen_string_literal: true

class RenameBooleanColumnsInQuizzes < ActiveRecord::Migration[7.0]
  def change
    rename_column :quizzes, :shuffle_options, :is_shuffle_options_enabled
    rename_column :quizzes, :shuffle_questions, :is_shuffle_questions_enabled
    rename_column :quizzes, :email_notification, :is_email_notification_enabled
    rename_column :quizzes, :is_time_enabled, :is_timer_enabled
  end
end
