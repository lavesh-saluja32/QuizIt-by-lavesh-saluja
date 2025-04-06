# frozen_string_literal: true

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
class Submission < ApplicationRecord
  enum status: { incomplete: "incomplete", completed: "completed" }
  belongs_to :user
  belongs_to :quiz

  validates :correct_answers, :wrong_answers, :unanswered,
    presence: true,
    numericality: { greater_than_or_equal_to: 0 }

  validates :submission_time, presence: true, if: -> { completed? }
end
