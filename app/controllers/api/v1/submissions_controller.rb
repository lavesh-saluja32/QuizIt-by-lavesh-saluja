# frozen_string_literal: true

class Api::V1::SubmissionsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token
  after_action :verify_authorized, except: %i[index]
  before_action :load_quiz!, only: %i[create]
  before_action :load_submission!, only: %i[update]

  def create
    user = RegisterService.new(submission_params).process!
    @submission = @quiz.submissions.new(user: user)
    authorize @submission
    @submission.save!
  end

  def update
    authorize @submission
    @user_answers = SubmissionService.new(@submission, update_params).process[:answers]
    @questions = @submission.quiz.questions.includes(:options)
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
