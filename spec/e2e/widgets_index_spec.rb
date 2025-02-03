require 'rails_helper'

describe 'widgets_index', type: :feature do

  it 'displays a list of widgets' do
    Widget.create!(name: "Test Widget", age: 22)
    visit widgets_path
    expect(page).to have_content 'Test Widget'
    expect(page).to have_content '22'
  end

  it 'creates a new widget' do
    visit widgets_path
    add_button = find('button', text: "ADD WIDGET")
    add_button.click

    name_field, age_field = find_all('input')
    name_field.set('name')
    age_field.set('16')
    add_button = find('button', text: /^ADD$/)
    add_button.click

    widget = Widget.first
    expect(widget.name).to eq('name')
    expect(widget.age).to eq(16)
    expect(page).to have_content 'name'
    expect(page).to have_content '16'
  end

end
