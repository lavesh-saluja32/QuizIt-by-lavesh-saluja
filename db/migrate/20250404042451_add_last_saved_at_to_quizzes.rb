# frozen_string_literal: true

class AddLastSavedAtToQuizzes < ActiveRecord::Migration[7.1]
  def change
    add_column :quizzes, :last_saved_at, :datetime
  end
end
