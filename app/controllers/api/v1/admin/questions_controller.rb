# frozen_string_literal: true

class Api::V1::Admin::QuestionsController < ApplicationController
  after_action :verify_authorized, except: %i[index]
  before_action :load_quiz!, only: %i[index create]
  before_action :load_question!, only: %i[update destroy show clone]

  def index
    @questions = policy_scope([:admin, @quiz.questions]).includes(:options).order(updated_at: :desc)
  end

  def create
    @question = @quiz.questions.new(question_params)
    authorize([:admin, @question])
    Question.transaction do
     @question.save!
     @quiz.update!(status: "draft") unless @quiz.draft?
   end
  end

  def update
    authorize([:admin, @question])

    ActiveRecord::Base.transaction do
      @question.options.destroy_all
      @question.update!(question_params)
    end
  end

  def show
    authorize([:admin, @question])
  end

  def destroy
    authorize([:admin, @question])
    @question.destroy!
  end

  def clone
    authorize([:admin, @question])
    Question.transaction do
      @question.clone_question!
      @question.quiz.update!(status: "draft") unless @question.quiz.draft?
    end
    @question
  end

  private

    def load_quiz!
      @quiz = @current_user.organization.quizzes.find(params[:quiz_id])
    end

    def question_params
      params.require(:question).permit(:question_text, :quiz_id, options_attributes: [:option_text, :is_correct])
    end

    def update_params
      params.require(:question).permit(:question_text, options_attributes: [:id, :option_text, :is_correct, :_destroy])
    end

    def load_question!
      @question = Question
        .joins(quiz: :organization)
        .where(id: params[:id], quizzes: { organization_id: @current_user.organization_id })
        .first!
    end
end
