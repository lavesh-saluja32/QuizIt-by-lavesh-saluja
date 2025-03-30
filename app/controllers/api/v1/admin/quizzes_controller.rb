# frozen_string_literal: true

class Api::V1::Admin::QuizzesController < ApplicationController
  after_action :verify_authorized, except: %i[index]
  before_action :load_quiz!, only: %i[update]

  def index
    @quizzes = policy_scope([:admin, Quiz.includes(:category, :user)])
    @quizzes_filter = Api::V1::Admin::QuizzesFilterService.new(@quizzes, params).process!
    @quizzes = @quizzes_filter.quizzes
    @total_size = @quizzes_filter.filtered_size
    render "api/v1/quizzes/index"
  end

  def update
    authorize [:admin, @quiz]
    @quiz.update!(update_params)
    render_json
  end

  def create
    quiz = @current_user.quizzes.new(quiz_params)
    puts quiz_params
    authorize [:admin, quiz]
    quiz.save!
    render_json
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name, :category_id)
    end

    def update_params
      params.require(:quiz).permit(:name)
    end

    def load_quiz!
      @quiz = Quiz.find(params[:id])
    end
end
