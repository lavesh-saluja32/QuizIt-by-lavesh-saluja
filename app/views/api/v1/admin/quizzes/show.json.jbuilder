# frozen_string_literal: true

json.quiz do
  json.extract! @quiz, :id, :status, :last_saved_at, :name, :created_at, :updated_at
end
