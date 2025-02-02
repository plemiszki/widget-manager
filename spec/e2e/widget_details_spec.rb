require 'rails_helper'

describe 'widget_details', type: :feature do

  it 'displays details about the widget' do
    widget = Widget.create!(name: "Test Widget", age: 22)
    visit widget_path(widget)
    name_field, age_field = find_all('input')

    expect(name_field[:value]).to eq('Test Widget')
    expect(age_field[:value]).to eq('22')
  end

end
