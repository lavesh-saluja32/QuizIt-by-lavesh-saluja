# frozen_string_literal: true

class Api::V1::Admin::QuestionsController < ApplicationController
  after_action :verify_authorized, except: %i[index]
  before_action :load_quiz!, only: %i[index create]
  before_action :load_question!, only: %i[update destroy show clone]

  def index
    @questions = Admin::QuestionPolicy::Scope.new(current_user, Question, @quiz.id).resolve.includes(:options)
  end

  def create
    @question = @quiz.questions.new(question_params)
    authorize([:admin, @question])
    @question.save!
    @quiz.update!(status: "draft") unless @quiz.draft?
    render_json
  end

  def update
    authorize([:admin, @question])

    ActiveRecord::Base.transaction do
      @question.options.destroy_all
      @question.update!(question_params)
    end

    render_json
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def show
    authorize([:admin, @question])
    puts @question.inspect
  end

  def destroy
    authorize([:admin, @question])
    @question.destroy!
    render_json
  end

  def clone
    authorize([:admin, @question])
    @question.clone_question!
    @question.quiz.update!(status: "draft") unless @question.quiz.draft?
    puts "CLone 3"
  end

  private

    def load_quiz!
      @quiz = Quiz.find(params[:quiz_id])
    end

    def question_params
      params.require(:question).permit(:question_text, :quiz_id, options_attributes: [:option_text, :is_correct])
    end

    def update_params
      puts "1"
      params.require(:question).permit(:question_text, options_attributes: [:id, :option_text, :is_correct, :_destroy])
    end

    def load_question!
      puts "hello"
      @question = Question.find(params[:id])
    end
end
