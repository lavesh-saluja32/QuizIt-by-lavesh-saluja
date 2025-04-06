# == Schema Information
#
# Table name: submissions
#
#  id              :uuid             not null, primary key
#  correct_answers :integer          default(0), not null
#  status          :string           default("incomplete"), not null
#  submission_time :datetime
#  unanswered      :integer          default(0), not null
#  wrong_answers   :integer          default(0), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  quiz_id         :uuid             not null
#  user_id         :uuid             not null
#
# Indexes
#
#  index_submissions_on_quiz_id  (quiz_id)
#  index_submissions_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (quiz_id => quizzes.id)
#  fk_rails_...  (user_id => users.id)
#
# frozen_string_literal: true

require "test_helper"

class SubmissionTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @quiz = create(:quiz)
  end

  def test_valid_submission
    submission = build(:submission, user: @user, quiz: @quiz)
    assert submission.valid?
  end

  def test_invalid_without_user
    submission = build(:submission, user: nil)
    assert_not submission.valid?
    assert_includes submission.errors[:user], "must exist"
  end

  def test_invalid_without_quiz
    submission = build(:submission, quiz: nil)
    assert_not submission.valid?
    assert_includes submission.errors[:quiz], "must exist"
  end

  def test_invalid_with_negative_correct_answers
    submission = build(:submission, correct_answers: -1)
    assert_not submission.valid?
    assert_includes submission.errors[:correct_answers], "must be greater than or equal to 0"
  end

  def test_invalid_with_negative_wrong_answers
    submission = build(:submission, wrong_answers: -1)
    assert_not submission.valid?
    assert_includes submission.errors[:wrong_answers], "must be greater than or equal to 0"
  end

  def test_invalid_with_negative_unanswered
    submission = build(:submission, unanswered: -2)
    assert_not submission.valid?
    assert_includes submission.errors[:unanswered], "must be greater than or equal to 0"
  end

  def test_submission_time_required_for_completed_status
    submission = build(:submission, status: "completed", submission_time: nil)
    assert_not submission.valid?
    assert_includes submission.errors[:submission_time], "can't be blank"
  end

  def test_submission_time_not_required_for_incomplete_status
    submission = build(:submission, status: "incomplete", submission_time: nil)
    assert submission.valid?
  end

  def test_enum_status_values
    submission = build(:submission)
    assert_includes Submission.statuses.keys, "incomplete"
    assert_includes Submission.statuses.keys, "completed"
    assert submission.incomplete?
  end
end
