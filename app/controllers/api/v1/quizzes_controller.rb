# frozen_string_literal: true

class Api::V1::QuizzesController < ApplicationController
  before_action :load_quiz!, only: %i[update show]
  after_action :verify_authorized, except: %i[index show]

  def index
    @quizzes = Quiz.published
  end

  def create
    quiz = @current_user.quizzes.new(quiz_params)
    puts "hello"
    begin
      authorize quiz
    rescue Pundit::NotAuthorizedError => e
      puts "Pundit Error: #{e.message}"
      raise
    end
    puts "hello"
    puts quiz.inspect
    quiz.save!
    render_json
  end

  def show
    puts @quiz.inspect
  end

  def update
    authorize @quiz
    @quiz.update!(update_params)
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
