# frozen_string_literal: true

json.questions @questions do |question|
  json.extract! question, :id, :question_text, :description

  json.options @quiz.is_shuffle_options_enabled ? question.options.shuffle : question.options do |option|
    json.extract! option, :id, :option_text
  end
end
