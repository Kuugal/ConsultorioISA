class CreateConsults < ActiveRecord::Migration[5.1]
  def change
    create_table :consults do |t|
      t.string :paciente
      t.string :procedimiento
      t.boolean :pendiente

      t.timestamps
    end
  end
end
