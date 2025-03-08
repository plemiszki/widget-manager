require 'rails_helper'

def open_dialog
  add_button = find('button', text: "ADD WIDGET")
  add_button.click

  within('div[role="dialog"]') do
    expect(page).to have_content('Add Widget')
  end
end

describe 'widgets_index', type: :feature do

  let(:user) { User.create!(email_address: 'test@example.com', password: 'password') }

  it 'displays a list of widgets' do
    Widget.create!(name: "Test Widget", age: 22)
    visit authenticated_path(widgets_path, user)
    expect(page).to have_content 'Test Widget'
    expect(page).to have_content '22'
  end

  it 'creates a new widget' do
    visit authenticated_path(widgets_path, user)
    open_dialog

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

  it 'validates the presence of the widget name' do
    visit authenticated_path(widgets_path, user)
    open_dialog

    name_field, age_field = find_all('input')
    name_field.set('')
    age_field.set('16')
    add_button = find('button', text: /^ADD$/)
    add_button.click

    expect(page).to have_content("Name can't be blank")
    expect(Widget.count).to eq(0)
  end

  it 'validates the uniqueness of the widget name' do
    Widget.create!(name: 'name', age: 1)
    visit authenticated_path(widgets_path, user)
    open_dialog

    name_field, age_field = find_all('input')
    name_field.set('name')
    age_field.set('16')
    add_button = find('button', text: /^ADD$/)
    add_button.click

    expect(page).to have_content("Name has already been taken")
    expect(Widget.count).to eq(1)
  end

  it 'validates the numericality of the widget age' do
    visit authenticated_path(widgets_path, user)
    open_dialog

    name_field, age_field = find_all('input')
    name_field.set('name')
    age_field.set('age')
    add_button = find('button', text: /^ADD$/)
    add_button.click

    expect(page).to have_content("Age is not a number")
    expect(Widget.count).to eq(0)
  end

  it 'validates the widget age is an integer' do
    visit authenticated_path(widgets_path, user)
    open_dialog

    name_field, age_field = find_all('input')
    name_field.set('name')
    age_field.set('4.5')
    add_button = find('button', text: /^ADD$/)
    add_button.click

    expect(page).to have_content("Age must be an integer")
    expect(Widget.count).to eq(0)
  end

  it 'validates the widget age is greater than zero' do
    visit authenticated_path(widgets_path, user)
    open_dialog

    name_field, age_field = find_all('input')
    name_field.set('name')
    age_field.set('-1')
    add_button = find('button', text: /^ADD$/)
    add_button.click

    expect(page).to have_content("Age must be greater than 0")
    expect(Widget.count).to eq(0)
  end

end
