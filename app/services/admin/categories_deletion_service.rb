# frozen_string_literal: true

class Admin::CategoriesDeletionService
  def initialize(category, new_category_id)
    @category = category
    @organization = category.organization
    @new_category_id = new_category_id
  end

  def process!
    if @category.quizzes.count == 0
      @category.destroy!
      return
    end
    target_category = determine_target_category
    reassign_quizzes_to(target_category)
    @category.destroy!
  end

  private

    def determine_target_category
      if only_one_category? || !@new_category_id.present?
        find_or_create_general_category
      else
        @organization.categories.find(@new_category_id)
      end
    end

    def find_or_create_general_category
      @organization.categories.find_or_create_by!(name: "General")
    end

    def only_one_category?
      @organization.categories.count == 1
    end

    def reassign_quizzes_to(new_category)
      @category.quizzes.update_all(category_id: new_category.id)
    end
end
