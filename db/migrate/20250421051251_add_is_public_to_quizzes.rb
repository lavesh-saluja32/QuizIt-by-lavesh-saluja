# frozen_string_literal: true

class AddIsPublicToQuizzes < ActiveRecord::Migration[7.1]
  def change
    add_column :quizzes, :is_public, :boolean, default: true
  end
end
