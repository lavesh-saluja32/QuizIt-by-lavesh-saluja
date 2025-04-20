# frozen_string_literal: true

require "test_helper"

class Api::V1::Admin::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, name: "Old Organization Name")
    @admin = create(:user, role: :admin_user, organization: @organization)
    @standard_user = create(:user, role: :standard_user, organization: @organization)
    @admin_headers = headers(@admin)

    @category1 = create(:category, organization: @organization, position: 1, name: "Category 1")
    @category2 = create(:category, organization: @organization, position: 2, name: "Category 2")
    @category3 = create(:category, organization: @organization, position: 3, name: "Category 3")
  end

  def test_should_reorder_category_as_admin
    patch reorder_api_v1_admin_category_url(@category3),
      params: { category: { position: 1 } },
      headers: @admin_headers,
      as: :json

    assert_response :success

    assert_equal 1, @category3.reload.position
    assert_equal 2, @category1.reload.position
    assert_equal 3, @category2.reload.position
  end

  def test_should_return_not_found_for_invalid_category
    invalid_id = SecureRandom.uuid
    patch reorder_api_v1_admin_category_url(invalid_id),
      params: { category: { position: 1 } },
      headers: @admin_headers,
      as: :json

    assert_response :not_found
  end

  def test_should_get_index
    get api_v1_admin_categories_url, headers: @admin_headers, as: :json
    assert_response :success

    response_ids = response.parsed_body.map { |cat| cat["id"] }
    expected_ids = @organization.categories.order(:position).pluck(:id)

    assert_equal expected_ids, response_ids
  end

  def test_should_create_category
    assert_difference "@organization.categories.count", 1 do
      post api_v1_admin_categories_url,
        params: { category: { name: "New Category" } },
        headers: @admin_headers,
        as: :json
    end

    assert_response :success
    assert @organization.categories.pluck(:name).include?("New Category")
  end

  def test_should_update_category
    patch api_v1_admin_category_url(@category1),
      params: { category: { name: "Updated Name" } },
      headers: @admin_headers,
      as: :json

    assert_response :success
    assert_equal "Updated Name", @category1.reload.name
  end
end
