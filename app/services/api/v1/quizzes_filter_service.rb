# frozen_string_literal: true

class Api::V1::QuizzesFilterService < BaseFilterService
  def initialize(quizzes, params)
    super(params)
    @quizzes = quizzes
  end

  def process!
    @quizzes = filter_by_category(@quizzes)
    @quizzes = filter_by_search_term(@quizzes, table: "quizzes")
    @quizzes
  end
end
