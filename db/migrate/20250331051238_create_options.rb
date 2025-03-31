# frozen_string_literal: true

class CreateOptions < ActiveRecord::Migration[7.1]
  def change
    create_table :options, id: :uuid do |t|
      t.references :question, null: false, foreign_key: true, type: :uuid
      t.string :option_text, null: false
      t.boolean :is_correct, default: false

      t.timestamps
    end
  end
end
