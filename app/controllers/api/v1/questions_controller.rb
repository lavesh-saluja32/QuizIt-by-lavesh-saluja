# frozen_string_literal: true

class Api::V1::QuestionsController < ApplicationController
  before_action :load_quiz!, only: :index
  skip_before_action :authenticate_user_using_x_auth_token
  def index
    @questions = @quiz.questions.includes(:options)
    render :index
  end

  private

    def load_quiz!
      @quiz = Quiz.find(params[:quiz_id])
    end
end
