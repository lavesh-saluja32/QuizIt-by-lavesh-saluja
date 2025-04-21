# frozen_string_literal: true

json.quiz do
  json.extract! @quiz, :id, :status, :last_saved_at, :name, :created_at, :updated_at, :slug, :is_public,
    :is_time_enabled, :time, :shuffle_options, :shuffle_questions, :email_notification
end
