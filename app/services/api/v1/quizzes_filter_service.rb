# frozen_string_literal: true

class Api::V1::QuizzesFilterService
  attr_reader :params, :quizzes

  def initialize(quizzes, params)
    @quizzes = quizzes
    @params = params
  end

  def process!
    filter_by_category
    @quizzes
  end

  private

    def filter_by_category
      return unless params[:category].present? && params[:category].is_a?(Array)

      @quizzes = @quizzes.joins(:category).where(categories: { name: params[:category] })
    end
end
