# frozen_string_literal: true

require "test_helper"

class Api::V1::UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @valid_user_params = {
      user: {
        name: "John Doe",
        email: "john@example.com",
        password: "Password@123",
        password_confirmation: "Password@123"
      }
    }
  end

  def test_should_create_user_with_valid_params
    assert_difference "User.count", 1 do
      post api_v1_users_url, params: @valid_user_params, as: :json
    end

    assert_response :success
    assert_match /successfully created/i, response.parsed_body["notice"]
  end

  def test_should_not_create_user_without_required_fields
    invalid_params = { user: { email: "", name: "" } }

    assert_no_difference "User.count" do
      post api_v1_users_url, params: invalid_params, as: :json
    end

    assert_response :unprocessable_entity
    assert_includes response.parsed_body["error"], "Email is invalid"
    assert_includes response.parsed_body["error"], "Name can't be blank"
  end
end
