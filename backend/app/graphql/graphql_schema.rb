require 'graphql'
require_relative 'types/package_type'
require_relative 'types/user_type'
require_relative 'types/query_type'
require_relative 'types/mutation_type'

# root structure of GraphQL API
class ShipmentTrackerSchema < GraphQL::Schema
  query Types::QueryType
  mutation Types::MutationType
end