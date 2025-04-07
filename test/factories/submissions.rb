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

FactoryBot.define do
  factory :submission do
    association :user
    association :quiz
    status { "incomplete" }
    submission_time { nil } # Only needed when status is 'completed'
    correct_answers { 1 }
    wrong_answers { 1 }
    unanswered { 1 }

    trait :completed do
      status { "completed" }
      submission_time { Time.current }
    end

    trait :incomplete do
      status { "incomplete" }
      submission_time { nil }
    end
  end
end
