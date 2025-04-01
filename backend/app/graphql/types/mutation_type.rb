require 'graphql'

module Types
  class MutationType < GraphQL::Schema::Object
    
    # (1) Create new package
    field :create_package, PackageType, null: false do 
      argument :tracking_number, String, required: true
      argument :sender, String, required: true
      argument :recipient, String, required: true
      argument :status, String, required: true
      argument :estimated_delivery_date, String, required: false
      argument :user_id, ID, required: true
    end

    def created_package(tracking_number:, sender:, recipient:, status:, estimated_delivery_date: nil, user_id:)
      sql = "INSERT INTO packages (tracking_number, sender, recipient, status, estimated_delivery_date, user_id) VALUES (?, ?, ?, ?, ?, ?)"

      db.prepare(sql).execute(
        tracking_number,
        sender,
        recipient,
        status,
        estimated_delivery_date,
        user_id
      )

      # Return newly created package
      db.query(
        "SELECT * FROM packages WHERE tracking_number = '#{db.escape(tracking_number)}' LIMIT 1"
        ).first
    end

    # (2) Update package status
    field :update_package_status, PackageType, null: false do
      argument :tracking_number, String, required: true
      argument :status, String, required: true
    end

    def update_package_status(tracking_number:, status:)
      sql = "UPDATE packages SET status = ? WHERE tracking_number = ?"
      db.prepare(sql).execute(tracking_number, status)

      db.query(
        "SELECT * FROM packages WHERE tracking_number = '#{db.escape(tracking_number)}' LIMIT 1"
      ).first
    end

    private

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