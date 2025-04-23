# frozen_string_literal: true

require "test_helper"

class Api::V1::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @admin_user = create(:user, role: :admin_user, organization: @organization)
    @standard_user = create(:user, role: :standard_user, organization: @organization)
    @category1 = create(:category, organization: @organization, name: "random")
    @category2 = create(:category, organization: @organization)
    @admin_headers = headers(@admin_user)
    @standard_user_headers = headers(@standard_user)
  end

  def test_should_get_all_categories
    get api_v1_categories_path, headers: @standard_user_headers, as: :json
    assert_response :success
    response_json = response.parsed_body
    assert_equal 2, response_json.length
    assert_includes response_json.map { |c| c["name"] }, @category1.name
    assert_includes response_json.map { |c| c["name"] }, @category2.name
  end
end
