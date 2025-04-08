# frozen_string_literal: true

json.submissions @submissions do |submission|
  json.extract! submission, :id, :correct_answers, :status, :submission_time, :unanswered, :wrong_answers

  json.name submission.user.name
  json.email submission.user.email
  json.totalQuestions(submission.correct_answers + submission.wrong_answers + submission.unanswered)
end
