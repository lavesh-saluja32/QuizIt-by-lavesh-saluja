# frozen_string_literal: true

class Api::V1::SubmissionsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token
  after_action :verify_authorized, except: %i[index show]
  before_action :load_quiz!, only: %i[create]
  before_action :load_submission!, only: %i[update show]

  def create
    user = RegisterService.new(submission_params).process!
    @submission = @quiz.submissions.new(user: user)
    authorize @submission
    @submission.save!
  end

  def update
    authorize @submission
    if @submission.quiz.is_time_enabled
      deadline = @submission.created_at + @submission.quiz.time.minutes + 10.seconds
      if Time.current > deadline
        render_error(I18n.t("errors.messages.time_limit"), :forbidden)
        return
      end
    end
    @user_answers = SubmissionService.new(@submission, update_params).process[:answers]
    @questions = @submission.quiz.questions.includes(:options)
    @quiz = @submission.quiz
    puts @quiz.id
    if @quiz.email_notification
      QuizNotificationJob.perform_async(params[:id])
    end
  end

  def show
    render
  end

  private

    def submission_params
      params.require(:submission).permit(:name, :email, :quiz_slug)
    end

    def load_quiz!
      @quiz = Organization.last.quizzes.find_by!(slug: submission_params[:quiz_slug])
    end

    def update_params
      params.require(:submission).permit(answers: {})
    end

    def load_submission!
      @submission = Submission.find(params[:id])
    end
end
