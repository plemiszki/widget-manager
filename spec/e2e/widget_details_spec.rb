require 'rails_helper'

describe 'widget_details', type: :feature do

  it 'displays details about the widget' do
    widget = Widget.create!(name: "Test Widget", age: 22)
    visit widget_path(widget)
    name_field, age_field = find_all('input')

    expect(name_field[:value]).to eq('Test Widget')
    expect(age_field[:value]).to eq('22')
  end

  it 'deletes the widget' do
    widget = Widget.create!(name: "Test Widget", age: 22)
    visit widget_path(widget)
    delete_button = find('button', text: 'DELETE')
    delete_button.click
    confirm_button = find('button', text: 'YES')
    confirm_button.click

    expect(page).to have_current_path("/widgets")
    expect(Widget.count).to eq(0)
  end

end
