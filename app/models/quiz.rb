# frozen_string_literal: true

# == Schema Information
#
# Table name: quizzes
#
#  id               :uuid             not null, primary key
#  last_saved_at    :datetime
#  name             :string           not null
#  slug             :string
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
#  index_quizzes_on_slug             (slug) UNIQUE
#  index_quizzes_on_user_id          (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (category_id => categories.id)
#  fk_rails_...  (organization_id => organizations.id)
#  fk_rails_...  (user_id => users.id)
#
class Quiz < ApplicationRecord
  include QuizSluggable

  MAX_QUIZ_NAME_LENGTH = 30
  MIN_VALUE = 0

  enum status: { draft: "draft", published: "published" }

  has_many :questions, dependent: :destroy
  belongs_to :category
  belongs_to :user
  belongs_to :organization
  has_many :submissions, dependent: :destroy
  has_one_attached :report

  validates :name, presence: true, length: { maximum: MAX_QUIZ_NAME_LENGTH }
  validates :submission_count, numericality: { greater_than_or_equal_to: MIN_VALUE, only_integer: true }
  validates :total_questions, numericality: { greater_than_or_equal_to: MIN_VALUE, only_integer: true }
  validate :publish_verification, on: :update
  validates :slug, uniqueness: true

  after_update :update_last_saved_timestamp
  before_create :set_slug

  def update_last_saved
    update(last_saved_at: Time.current)
  end

  def clone_quiz!
    cloned_quiz = deep_clone include: { questions: :options }
    cloned_quiz.status = "draft"
    cloned_quiz.submission_count = 0
    cloned_quiz.slug = nil
    cloned_quiz.save!
    cloned_quiz
  end

  private

    def update_last_saved_timestamp
      update_column(:last_saved_at, Time.current)
    end

    def publish_verification
      errors.add(:base, I18n.t("publishError")) if questions.empty?
    end
end
