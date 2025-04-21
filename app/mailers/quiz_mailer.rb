# frozen_string_literal: true

class QuizMailer < ApplicationMailer
  def submission_notification(quiz, candidate_name, candidate_email, score)
    @quiz = quiz
    @candidate_name = candidate_name
    @candidate_email = candidate_email
    @score = score

    mail(
      to: quiz.user.email,
      subject: "#{quiz.name} submitted by #{@candidate_name}"
    )
  end
end
