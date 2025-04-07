# frozen_string_literal: true

require "test_helper"

class Api::V1::RegisterServiceTest < ActiveSupport::TestCase
  def setup
    @valid_params = { name: "John Doe", email: "john@example.com" }
  end

  def test_should_create_new_user_if_not_exists
    assert_nil User.find_by(email: @valid_params[:email])
    user = Api::V1::RegisterService.new(@valid_params).process!
    assert user.persisted?
    assert_equal "John Doe", user.name
    assert_equal "john@example.com", user.email
  end

  def test_should_return_existing_user_if_already_exists
    existing_user = create(:user, email: @valid_params[:email], name: "Existing Name")
    assert_equal 1, User.where(email: @valid_params[:email]).count

    user = Api::V1::RegisterService.new(@valid_params).process!

    assert_equal existing_user.id, user.id
    assert_equal "Existing Name", user.name # Should not overwrite name
  end

  def test_should_raise_error_if_email_is_missing
    invalid_params = { name: "John" }

    assert_raises(ActiveRecord::RecordInvalid) do
      Api::V1::RegisterService.new(invalid_params).process!
    end
  end

  def test_should_raise_error_if_email_is_blank
    invalid_params = { name: "John", email: "" }

    assert_raises(ActiveRecord::RecordInvalid) do
      Api::V1::RegisterService.new(invalid_params).process!
    end
  end
end
