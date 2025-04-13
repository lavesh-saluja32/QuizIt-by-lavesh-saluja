# frozen_string_literal: true

require "test_helper"

class Api::V1::Admin::OrganizationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin = create(:user, role: :admin_user)
    @standard_user = create(:user, role: :standard_user)
    @organization = create(:organization, name: "Old Organization Name")
    @admin_headers = headers(@admin)
    @standard_user_headers = headers(@standard_user)
  end

  def test_admin_should_update_organization
    # Arrange: Define the new organization name
    new_name = "Updated Organization Name"

    # Act: Perform the update action
    patch api_v1_admin_organization_url,
      params: { organization: { name: new_name } },
      headers: @admin_headers,
      as: :json

    # Assert: Check if the response is success and the organization name is updated
    assert_response :success
    assert_equal new_name, @organization.reload.name
  end
end
