# frozen_string_literal: true

require "test_helper"

class Api::V1::Admin::OrganizationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @organization = create(:organization, name: "Old Organization Name")
    @admin = create(:user, role: :admin_user, organization: @organization)
    @standard_user = create(:user, role: :standard_user, organization: @organization)
    @admin_headers = headers(@admin)
    @standard_user_headers = headers(@standard_user)
  end

  def test_admin_should_update_organization
    new_name = "Updated Organization Name"

    patch api_v1_admin_organizations_url,
      params: { organization: { name: new_name } },
      headers: @admin_headers,
      as: :json

    assert_response :success
    assert_equal new_name, @organization.reload.name
  end

  def test_admin_can_view_organization_details
    get api_v1_admin_organizations_url,
      headers: @admin_headers,
      as: :json

    assert_response :success
    response_json = response.parsed_body
    assert_equal @organization.name, response_json["name"]
  end
end
