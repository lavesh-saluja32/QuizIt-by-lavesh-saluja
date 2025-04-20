# frozen_string_literal: true

require "test_helper"

class Admin::CategoriesDeletionServiceTest < ActiveSupport::TestCase
  setup do
    @organization = create(:organization)
    @admin = create(:user, role: :admin_user, organization: @organization)
    @category1 = create(:category, organization: @organization, name: "Programming")
    @category2 = create(:category, organization: @organization, name: "Design")
    @quiz1 = create(:quiz, category: @category1)
    @quiz2 = create(:quiz, category: @category1)
  end

  def test_should_reassign_quizzes_to_provided_category
    assert_equal 2, @category1.quizzes.count
    assert_equal 0, @category2.quizzes.count

    Admin::CategoriesDeletionService.new(@category1, @category2.id).process!

    assert_equal 2, @category2.quizzes.count
    assert_equal 0, @category1.quizzes.reload.count
  end

  def test_should_reassign_quizzes_to_general_if_only_one_category
    @category2.destroy

    assert_equal 1, @organization.categories.count
    assert_equal 2, @category1.quizzes.count

    Admin::CategoriesDeletionService.new(@category1, nil).process!

    general_category = @organization.categories.find_by(name: "General")
    assert general_category.present?
    assert_equal 2, general_category.quizzes.count
  end

  def test_should_create_general_category_if_not_exists
    @category2.destroy

    assert_nil @organization.categories.find_by(name: "General")

    Admin::CategoriesDeletionService.new(@category1, nil).process!

    assert @organization.categories.find_by(name: "General")
  end

  def test_should_not_duplicate_general_category_if_already_exists
    @category2.destroy

    existing_general = create(:category, name: "General", organization: @organization)

    Admin::CategoriesDeletionService.new(@category1, nil).process!

    assert_equal 1, @organization.categories.where(name: "General").count
    assert_equal 2, existing_general.reload.quizzes.count
  end
end
