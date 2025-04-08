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

require "test_helper"

class OptionTest < ActiveSupport::TestCase
  def setup
    @category = create(:category, name: "category 1")
    @quiz = create(:quiz, category: @category)
    @question = build(:question, quiz: @quiz)
    @option = build(:option, question: @question)
    @question.options << [@option]
    @question.save!
  end

  def test_valid_option
    assert @option.valid?
  end

  def test_invalid_without_option_text
    @option.option_text = nil
    assert_not @option.valid?
    assert_includes @option.errors[:option_text], I18n.t("option.validations.blank_text")
  end

  def test_invalid_with_long_option_text
    @option.option_text = "A" * 301 # Exceeds max length
    assert_not @option.valid?
    assert_includes @option.errors[:option_text], I18n.t("option.validations.max_length", count: 300)
  end

  def test_invalid_without_question
    @option.question = nil
    assert_not @option.valid?
    assert_includes @option.errors[:question], I18n.t("option.validations.question_required")
  end

  def test_invalid_with_nil_is_correct_value
    @option.is_correct = nil
    assert_not @option.valid?
    assert_includes @option.errors[:is_correct], I18n.t("option.validations.boolean_required")
  end

  def test_default_is_correct_is_false
    @option.save!
    assert_not @option.is_correct?
  end
end
