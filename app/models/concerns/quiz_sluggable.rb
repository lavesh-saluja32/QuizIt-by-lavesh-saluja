# frozen_string_literal: true

module QuizSluggable
  extend ActiveSupport::Concern

  included do
    before_create :set_slug
  end

  def set_slug
    value_field = :name
    slug_field = :slug
    relation = self.class

    parameterized_value = self.send(value_field)&.parameterize
    value_slug = parameterized_value.blank? ? "untitled" : parameterized_value

    slug_count = 0
    latest_slug = relation
      .where("#{slug_field} ~ ?", "^#{value_slug}$|^#{value_slug}-[0-9]+$")
      .unscope(:order)
      .order("LENGTH(#{slug_field}) DESC", "#{slug_field}" => :desc)
      .first&.send(slug_field)

    if latest_slug.present?
      slug_count = latest_slug.split("-").last.to_i
      slug_count = 1 if slug_count == 0
    end

    value_slug = slug_count.positive? ? "#{value_slug}-#{slug_count + 1}" : value_slug
    self.slug = value_slug
  end
end
