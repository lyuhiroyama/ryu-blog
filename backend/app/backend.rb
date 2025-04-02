require 'sinatra'
require 'json'
require 'mysql2'
require 'bcrypt'
require 'dotenv'
require_relative 'graphql/graphql_schema'

# For debugging purposes
Dotenv.load(File.join(__dir__, '../.env'))
puts "DB_PASSWORD from env: #{ENV['DB_PASSWORD']}"
puts "DB_HOST from env: #{ENV['DB_HOST']}"
puts "Available mutations: "
puts ShipmentTrackerSchema.mutation.fields.keys

# Enable CORS
before do # 'before' filter. Runs before every request processing.
  content_type :json
  headers 'Access-Control-Allow-Origin' => 'http://localhost:3000',
          'Access-Control-Allow-Methods' => ['OPTIONS', 'POST'],
          'Access-Control-Allow-Headers' => 'Content-Type'
end

# Handle preflight requests 
# - (preflight requests = essentially a request to see if server allow requests)
# - uses 'OPTIONS' method
# - Takes place when Cross- Origin requests are attempted
options '*' do
  response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
  response.headers['Access-Control-Allow-Methods'] = 'OPTIONS, POST'
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
  200
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

  # for debugging purposes:
  puts "Received GraphQL query: #{data['query'].inspect}"

  # Execute GraphQL query
  result = ShipmentTrackerSchema.execute(
    data['query'],
    variables: data['variables']
  )

  # Return result as JSON
  result.to_json
end


 