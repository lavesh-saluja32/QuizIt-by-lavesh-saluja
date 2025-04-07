# frozen_string_literal: true

class Api::V1::SubmissionsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token
  after_action :verify_authorized, except: %i[index]
  before_action :load_quiz!, only: %i[create]
  before_action :load_submission!, only: %i[update]

  def index
  end

  def create
    user = Api::V1::RegisterService.new(submission_params).process!
    @submission = @quiz.submissions.new(user: user)
    authorize @submission
    @submission.save!
  end

  def update
    authorize @submission
    updated_params = Api::V1::SubmissionService.new(@submission, update_params).process!
    puts updated_params
    @submission.update!(updated_params)

    @submission.status = "completed"
    @submission.save!
    @user_answers = update_params[:answers].to_h.transform_keys(&:to_s)
  end

  private

    def submission_params
      params.require(:submission).permit(:name, :email, :quiz_id)
    end

    def load_quiz!
      @quiz = Quiz.find(submission_params[:quiz_id])
    end

    def update_params
      params.require(:submission).permit(answers: {})
    end

    def load_submission!
      @submission = Submission.find(params[:id])
    end
end
