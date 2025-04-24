  # frozen_string_literal: true

  json.extract! @quiz, :id, :status, :last_saved_at, :name, :created_at, :updated_at, :slug, :is_public,
    :is_timer_enabled, :time, :is_shuffle_options_enabled, :is_shuffle_questions_enabled, :is_email_notification_enabled
