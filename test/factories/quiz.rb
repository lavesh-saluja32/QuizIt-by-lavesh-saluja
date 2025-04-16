# frozen_string_literal: true

# == Schema Information
#
# Table name: quizzes
#
#  id               :uuid             not null, primary key
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
FactoryBot.define do
  factory :quiz do
    sequence(:name) { |n| "Quiz #{n}" }
    status { "draft" }
    submission_count { 0 }
    total_questions { 0 }
    category
    user
    organization
  end
end
