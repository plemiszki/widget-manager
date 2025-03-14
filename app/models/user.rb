VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

class User < ApplicationRecord
  has_secure_password
  has_many :sessions, dependent: :destroy

  validates :email_address, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }

  normalizes :email_address, with: ->(e) { e.strip.downcase }
end
