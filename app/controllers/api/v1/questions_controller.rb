# frozen_string_literal: true

class Api::V1::QuestionsController < ApplicationController
  before_action :load_quiz!, only: :index

  skip_before_action :authenticate_user_using_x_auth_token

  def index
    @questions = @quiz.questions.includes(:options)
  end

  private

    def load_quiz!
      puts Organization.last
      puts params[:quiz_id]
      @quiz = Organization.last.quizzes.find_by!(slug: params[:quiz_slug])
    end
end
