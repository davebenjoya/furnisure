class AddFloorToRooms < ActiveRecord::Migration[6.0]
  def change
    add_column :rooms, :floor, :string
  end
end
