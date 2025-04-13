# frozen_string_literal: true

require "test_helper"

class CategoriesFilterServiceTest < ActiveSupport::TestCase
  setup do
    @category_rails = create(:category, name: "Rails")
    @category_ruby = create(:category, name: "Ruby")
    @category_js = create(:category, name: "JavaScript")
    @all_categories = Category.all
  end

  def test_should_return_all_categories_when_search_is_nil
    filtered_categories = Api::V1::CategoriesFilterService.new({}, @all_categories).process
    assert_equal 3, filtered_categories.count
  end

  def test_should_return_all_categories_when_search_is_blank
    filtered_categories = Api::V1::CategoriesFilterService.new({ search: "" }, @all_categories).process
    assert_equal 3, filtered_categories.count
  end

  def test_should_return_matching_categories_when_search_term_matches
    filtered_categories = Api::V1::CategoriesFilterService.new({ search: "Ruby" }, @all_categories).process
    assert_equal 1, filtered_categories.count
    assert_equal "Ruby", filtered_categories.first.name
  end

  def test_should_return_matching_categories_case_insensitive
    filtered_categories = Api::V1::CategoriesFilterService.new({ search: "rails" }, @all_categories).process
    assert_equal 1, filtered_categories.count
    assert_equal "Rails", filtered_categories.first.name
  end

  def test_should_return_empty_when_search_term_does_not_match_any_category
    filtered_categories = Api::V1::CategoriesFilterService.new({ search: "Python" }, @all_categories).process
    assert_empty filtered_categories
  end
end
