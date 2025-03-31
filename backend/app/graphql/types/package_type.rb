require 'graphql'

module Types
  class PackageType < GraphQL::Schema::Object
    field :id, ID, null: false
    field :tracking_number, String, null: false
    field :sender, String, null: false
    field :recipient, String, null: false
    field :status, String, null: false
    field :estimated_delivery_date, String, null: true
    field :created_at, String, null: false
    field :user_id, Integer, null: false
  end
end