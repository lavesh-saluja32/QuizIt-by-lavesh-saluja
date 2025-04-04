# frozen_string_literal: true

class Api::V1::Admin::QuizzesController < ApplicationController
  after_action :verify_authorized, except: %i[index]
  before_action :load_quiz!, only: %i[update show clone destroy]

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
    @quiz.update_last_saved
    render_json
  end

  def create
    quiz = @current_user.quizzes.new(quiz_params)
    puts quiz_params
    authorize [:admin, quiz]
    quiz.save!
    puts @quiz.inspect
    quiz.update_last_saved
    render_json
  end

  def show
    authorize [:admin, @quiz]
  end

  def clone
    authorize([:admin, @quiz])
    @quiz.clone_quiz!
  end

  def destroy
    authorize([:admin, @quiz])
    @quiz.destroy
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name, :category_id)
    end

    def update_params
      params.require(:quiz).permit(:name, :status)
    end

    def load_quiz!
      @quiz = Quiz.find(params[:id])
    end
end
