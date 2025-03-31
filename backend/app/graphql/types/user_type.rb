require 'graphql'

module Types
  class UserType < GraphQL::Schema::Object
    field :id, ID, null: false
    field :username, String, null: false
    field :email, String, null: false
    field :created_at, String, null: false
    field :packages, [PackageType], null: true
  end
end