# frozen_string_literal: true

# == Schema Information
#
# Table name: options
#
#  id          :uuid             not null, primary key
#  is_correct  :boolean          default(FALSE)
#  option_text :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  question_id :uuid             not null
#
# Indexes
#
#  index_options_on_question_id  (question_id)
#
# Foreign Keys
#
#  fk_rails_...  (question_id => questions.id)
#
class Option < ApplicationRecord
  MAX_OPTION_LENGTH = 300
  belongs_to :question
  validates :option_text, presence: true, length: { maximum: MAX_OPTION_LENGTH }
  validates :is_correct, inclusion: { in: [true, false] }
end
