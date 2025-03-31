# frozen_string_literal: true

class Api::V1::Admin::QuestionsController < ApplicationController
  after_action :verify_authorized, except: %i[index]
  before_action :load_quiz!, only: %i[index create]
  before_action :load_question!, only: %i[update destroy show]

  def index
    @questions = policy_scope([:admin, Question]).includes(:options)
  end

  def create
    @question = @quiz.questions.new(question_params)
    authorize([:admin, @question])
    @question.save!
    render_json
  end

  def update
    puts "Update action reached"
    puts @question.inspect
    authorize([:admin, @question])
    @question.update!(question_params)
    render_json
  end

  # def show
  #   authorize([:admin, @question])
  # end

  def destroy
    authorize([:admin, @question])
    @question.destroy!
  end

  private

    def load_quiz!
      @quiz = Quiz.find(params[:quiz_id])
    end

    def question_params
      params.require(:question).permit(:question_text, :quiz_id, options_attributes: [:option_text, :is_correct])
    end

    def load_question!
      puts "hello"
      @question = Question.find(params[:id])
    end
end
