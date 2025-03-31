require 'graphql'

module Types
  class QueryType < GraphQl::Schema::Object
    
    # Query to fetch single package via tracking_number
    field :package, PackageType, null: true do
      argument :tracking_number, String, required: true
    end

    def package(tracking_number:)
      result = db.query(
        "SELECT * FROM packages WHERE tracking_number = '#{db.escape(tracking_number)}' LIMIT 1"
        ).first
      result
    end

    # Query to fetch all packages, optionally filtered via user_id
    field :packages, [PackageType], null: true do
      argument :user_id, ID, required: false
    end

    def packages(user_id: nil)
      if user_id
        db.query("SELECT * FROM packages WHERE user_id = #{user_id.to_i}").to_a
      else
        db.query("SELECT * FROM packages").to_a
      end
    end

    # methods beneath 'private' can only be called from within the class
    private

    # Create/Maintain db connection
    def db
      @db ||= Mysql2::Client.new(
        host: ENV['DB_HOST'],
        username: ENV['DB_USERNAME'],
        password: ENV['DB_PASSWORD'],
        database: ENV['DB_NAME']
      )
    end
  end
end