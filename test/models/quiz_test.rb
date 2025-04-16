# frozen_string_literal: true

# == Schema Information
#
# Table name: quizzes
#
#  id               :uuid             not null, primary key
#  last_saved_at    :datetime
#  name             :string           not null
#  status           :string           default("draft"), not null
#  submission_count :integer          default(0), not null
#  total_questions  :integer          default(0), not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  category_id      :uuid             not null
#  organization_id  :uuid
#  user_id          :uuid             not null
#
# Indexes
#
#  index_quizzes_on_category_id      (category_id)
#  index_quizzes_on_organization_id  (organization_id)
#  index_quizzes_on_user_id          (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (category_id => categories.id)
#  fk_rails_...  (organization_id => organizations.id)
#  fk_rails_...  (user_id => users.id)
#

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @quiz = build(:quiz)
  end

  def test_quiz_should_be_valid
    assert @quiz.valid?
  end

  def test_name_should_be_present
    @quiz.name = ""
    assert_not @quiz.valid?
    assert_includes @quiz.errors[:name], "can't be blank"
  end

  def test_name_should_not_exceed_max_length
    @quiz.name = "A" * (Quiz::MAX_QUIZ_NAME_LENGTH + 1)
    assert_not @quiz.valid?
    assert_includes @quiz.errors[:name], "is too long (maximum is #{Quiz::MAX_QUIZ_NAME_LENGTH} characters)"
  end

  def test_submission_count_should_be_non_negative_integer
    @quiz.submission_count = -1
    assert_not @quiz.valid?
    assert_includes @quiz.errors[:submission_count], "must be greater than or equal to #{Quiz::MIN_VALUE}"

    @quiz.submission_count = 2.5
    assert_not @quiz.valid?
    assert_includes @quiz.errors[:submission_count], "must be an integer"
  end

  def test_total_questions_should_be_non_negative_integer
    @quiz.total_questions = -1
    assert_not @quiz.valid?
    assert_includes @quiz.errors[:total_questions], "must be greater than or equal to #{Quiz::MIN_VALUE}"

    @quiz.total_questions = 3.7
    assert_not @quiz.valid?
    assert_includes @quiz.errors[:total_questions], "must be an integer"
  end

  def test_quiz_must_belong_to_category
    @quiz.category = nil
    assert_not @quiz.valid?
    assert_includes @quiz.errors[:category], "must exist"
  end

  def test_quiz_must_belong_to_user
    @quiz.user = nil
    assert_not @quiz.valid?
    assert_includes @quiz.errors[:user], "must exist"
  end

  def test_quiz_status_should_be_valid_enum
    valid_statuses = %w[draft published]
    valid_statuses.each do |status|
      @quiz.status = status
      assert @quiz.valid?
    end

    assert_raises(ArgumentError) do
      @quiz.status = "invalid_status"
    end
  end
end
