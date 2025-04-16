# frozen_string_literal: true

class Api::V1::QuizzesController < ApplicationController
  before_action :load_quiz!, only: %i[show]
  skip_before_action :authenticate_user_using_x_auth_token
  def index
    @quizzes = QuizzesFilterService.new(Quiz.published.includes(:category, :questions, :user), params).process!
  end

  def show
    render
  end

  private

    def load_quiz!
      @quiz = Organization.last.quizzes.find(params[:id])
    end
end
