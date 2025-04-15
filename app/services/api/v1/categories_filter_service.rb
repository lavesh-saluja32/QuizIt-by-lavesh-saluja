# frozen_string_literal: true

class Api::V1::CategoriesFilterService < BaseFilterService
  def initialize(params, categories)
    puts categories
    puts "HELLO"
    super(params)
    @categories = categories
  end

  def process
    puts "LOP@"
    puts @categories
    filter_by_search_term(@categories)
    puts @categories
    puts "LOPP"
    @categories
  end
end
