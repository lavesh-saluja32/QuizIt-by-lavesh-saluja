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
end
