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
#  user_id          :uuid             not null
#
# Indexes
#
#  index_quizzes_on_category_id  (category_id)
#  index_quizzes_on_user_id      (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (category_id => categories.id)
#  fk_rails_...  (user_id => users.id)
#
class Quiz < ApplicationRecord
  MAX_QUIZ_NAME_LENGTH = 30
  MIN_VALUE = 0
  enum status: { draft: "draft", published: "published" }
  has_many :questions, dependent: :destroy
  belongs_to :category
  belongs_to :user

  validates :name, presence: true, length: { maximum: MAX_QUIZ_NAME_LENGTH }
  validates :submission_count, numericality: { greater_than_or_equal_to: MIN_VALUE, only_integer: true }
  validates :total_questions, numericality: { greater_than_or_equal_to: MIN_VALUE, only_integer: true }

  def update_last_saved
    update(last_saved_at: Time.current)
  end

  def clone_quiz!
    cloned_quiz = deep_clone include: { questions: :options }
    cloned_quiz.status = "draft"
    cloned_quiz.save!
    cloned_quiz
  end
end
