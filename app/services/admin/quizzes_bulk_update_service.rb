# frozen_string_literal: true

class Admin::QuizzesBulkUpdateService
  def initialize(user:, params:)
    @user = user
    @quiz_ids = params[:ids]
    @updates = params.slice(:status, :category_id).compact
  end

  def process
    quizzes = Quiz.where(id: @quiz_ids, user_id: @user.id)

    return if quizzes.blank? || @updates.blank?

    if @updates.key?(:status)
      update_status(quizzes)
    elsif @updates.key?(:category_id)
      update_category(quizzes)
    end
  end

  private

    def update_status(quizzes)
      Quiz.transaction do
        quizzes.each do |quiz|
          quiz.update!(@updates.merge(last_saved_at: Time.current))
        end
      end
    end

    def update_category(quizzes)
      quizzes.update_all(
        category_id: @updates[:category_id],
        last_saved_at: Time.current
      )
    end
end
