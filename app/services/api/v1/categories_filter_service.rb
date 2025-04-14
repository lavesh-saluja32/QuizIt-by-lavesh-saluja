# frozen_string_literal: true

class Api::V1::CategoriesFilterService < BaseFilterService
  def initialize(params, categories)
    super(params)
    @categories = categories
  end

  def process
    filter_by_search_term(@categories)
  end
end
