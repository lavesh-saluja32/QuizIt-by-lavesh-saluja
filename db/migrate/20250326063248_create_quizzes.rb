# frozen_string_literal: true

class CreateQuizzes < ActiveRecord::Migration[7.1]
  def change
    create_table :quizzes, id: :uuid do |t|
      t.string :name, null: false
      t.references :category, null: false, foreign_key: true, type: :uuid
      t.string :status, null: false, default: "draft"
      t.integer :submission_count, default: 0, null: false
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.integer :total_questions, default: 0, null: false

      t.timestamps
    end
  end
end
