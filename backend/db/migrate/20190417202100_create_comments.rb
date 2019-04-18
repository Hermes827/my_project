class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :username
      t.string :content
      t.integer :note_id

      t.timestamps
    end
  end
end
