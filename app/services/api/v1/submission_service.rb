# frozen_string_literal: true

class Api::V1::SubmissionService
  def initialize(submission, answer_params)
    @submission = submission
    @answers = answer_params[:answers] || []
  end

  def process!
    calculate_scores
  end

  private

    def calculate_scores
      wrong = 0
      correct = 0

      option_ids = @answers.values

      options = Option.includes(:question).where(id: option_ids).index_by(&:id)

      @answers.each do |question_id, option_id|
        option = options[option_id]
        if option.present? && option.is_correct && option.question_id.to_s == question_id.to_s
          correct += 1
        else
          wrong += 1
        end
      end

      total_questions = @submission.quiz.questions.count
      unanswered = total_questions - correct - wrong

      {
        correct_answers: correct,
        wrong_answers: wrong,
        unanswered:,
        status: :completed,
        submission_time: Time.current
      }
    end
end
