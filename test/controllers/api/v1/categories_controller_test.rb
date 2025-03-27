# frozen_string_literal: true

require "test_helper"

class Api::V1::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin_user = create(:user, role: "admin_user")
    @standard_user = create(:user, role: "standard_user")
    @category1 = create(:category, name: "Science")
    @category2 = create(:category, name: "Math")
    @admin_headers = headers(@admin_user)
    @standard_user_headers = headers(@standard_user)
  end

  def test_should_get_all_categories
    get api_v1_categories_path, headers: @standard_user_headers, as: :json
    assert_response :success

    response_json = response.parsed_body["categories"]
    puts response_json
    assert_equal 2, response_json.length
    assert_includes response_json.map { |c| c["name"] }, "Science"
    assert_includes response_json.map { |c| c["name"] }, "Math"
  end

  def test_should_create_category_if_admin
    assert_difference("Category.count", 1) do
      post api_v1_categories_path, params: { category: { name: "New Category" } }, headers: @admin_headers, as: :json
    end

    assert_response :success
    assert_match "Category was successfully created!", response.parsed_body["notice"]
  end

  def test_should_not_create_category_with_duplicate_name
    assert_no_difference("Category.count") do
      post api_v1_categories_path, params: { category: { name: "Science" } }, headers: @admin_headers, as: :json
    end

    assert_response :unprocessable_entity
  end

  def test_should_not_create_category_if_standard_user
    assert_no_difference("Category.count") do
      post api_v1_categories_path, params: { category: { name: "Unauthorized Category" } },
        headers: @standard_user_headers, as: :json
    end

    assert_response :forbidden
  end
end
