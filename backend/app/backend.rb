require 'sinatra'
require 'json'
require 'mysql2'
require 'bcrypt'
require 'dotenv'
require_relative 'graphql/graphql_schema'

# Enable CORS
before do # 'before' filter. Runs before every request processing.
  content_type :json # content_type(:json)
end

# db connection
def db
  Mysql2::Client.new( # Mysql2 module's Client class's new method
    host: ENV['DB_HOST'],
    username: ENV['DB_USERNAME'],
    password: ENV['DB_PASSWORD'],
    database: ENV['DB_NAME']
  )
end

# GraphQL endpoing
post '/graphql' do
  # Parse JSON request body
  data = JSON.parse(request.body.read)

  # Execute GraphQL query
  result = ShipmentTrackerSchema.execute(
    data['query'],
    variables: data['variables']
  )

  # Return result as JSON
  result.to_json
end


 