# frozen_string_literal: true

class Api::V1::QuizzesController < ApplicationController
  before_action :load_quiz!, only: %i[update show]

  def index
    @quizzes = Quiz.published
  end

  def show
    puts @quiz.inspect
  end

  private

    def load_quiz!
      @quiz = Quiz.find(params[:id])
    end
end
