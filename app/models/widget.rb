class Widget < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :age, numericality: { greater_than: 0, only_integer: true }
end
