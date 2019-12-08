class Note < ApplicationRecord
  has_many :comments
  # validates :title, length: {minimum: 1, maximum: 50 }
  # validates :content, length: {minimum: 1, maximum: 100 }
end
