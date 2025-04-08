# frozen_string_literal: true

require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
  end

  def test_standard_user_should_not_login_user_with_valid_credentials
    puts @user.inspect
    post api_v1_session_path, params: { login: { email: @user.email, password: @user.password } }, as: :json
    assert_response :unauthorized
  end

  def test_admin_user_should_login_user_with_valid_credentials
    @admin = create(:user, role: "admin_user")
    puts @admin.inspect
    post api_v1_session_path, params: { login: { email: @admin.email, password: @admin.password } }, as: :json
    assert_response :success
  end

  def test_shouldnt_login_user_with_invalid_credentials
    post api_v1_session_path, params: { login: { email: @user.email, password: "invalid password" } }, as: :json
    assert_response :unauthorized
    response_json = response.parsed_body
    assert_equal I18n.t("session.incorrect_credentials"), response_json["error"]
  end

  def test_should_respond_with_not_found_error_if_user_is_not_present
    non_existent_email = "this_email_does_not_exist_in_db@example.email"
    post api_v1_session_path, params: { login: { email: non_existent_email, password: "welcome" } }, as: :json
    assert_response :not_found
    response_json = response.parsed_body
    assert_match /Couldn't find User/, response_json["error"]
  end
end
