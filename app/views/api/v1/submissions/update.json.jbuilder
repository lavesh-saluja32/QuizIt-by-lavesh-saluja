# frozen_string_literal: true

json.submission do
  json.extract! @submission, :id, :status, :correct_answers, :wrong_answers, :unanswered, :submission_time
end

json.questions @submission.quiz.questions.includes(:options) do |question|
  json.id question.id
  json.question_text question.question_text
  json.options question.options do |option|
    json.extract! option, :id, :option_text, :is_correct
  end
  json.user_answer_id @user_answers[question.id.to_s]
end
