require 'sinatra'
require 'json'
require 'mysql2'
require 'bcrypt'
require 'dotenv'

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

# (1) Routes for blog posts
# Get all posts
get '/posts' do
  results = db.query("SELECT * FROM posts ORDER BY created_at DESC")
  results.to_a.to_json
end

# Create a new post
post '/posts' do
  data = JSON.parse(request.body.read)
  # Escape values before using in query
  title = db.escape(data['title'])
  content = db.escape(data['content'])
  user_id = data['user_id'].to_i

  query = "INSERT INTO posts (title, content, user_id) VALUES ('#{title}', '#{content}', '#{user_id}')"
  db.query(query)

  status 201 # 'created'
  {message: "Post created successfully"}.to_json # 'return' is optional
end

# Delete a post
delete '/posts/:id' do |id|
  id = db.escape(id)
  db.query('DELETE FROM posts WHERE id = #{id}')
  status 204 # 'no content'
end


# (2) Routes for users
# User routes
post '/users' do
  data = JSON.parse(request.body.read)

  username = db.escape(data['username'])
  email = db.escape(data['email'])
  hashed_password = BCrypt::Password.create(data['password'])
  hashed_password = db.escape(hashed_password)
  
  
  query = "INSERT INTO users (username, email, password_digest) VALUES ('#{username}', '#{email}', '#{hashed_password}')"
  db.query(query)
  
  status 201
  {message: "User created successfully"}.to_json
end