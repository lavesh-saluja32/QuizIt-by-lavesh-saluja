# frozen_string_literal: true

class QuizNotificationJob
  include Sidekiq::Job

  def perform(submission_id)
    submission = Submission.find(submission_id)
    quiz = submission.quiz
    QuizMailer.submission_notification(
      quiz,
      submission.user.name,
      submission.user.email,
      submission.correct_answers
        ).deliver_now
  end
end
