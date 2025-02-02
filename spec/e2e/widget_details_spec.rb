require 'rails_helper'

describe 'widget_details', type: :feature do

  it 'displays details about the widget' do
    widget = Widget.create!(name: "Test Widget", age: 22)
    visit widget_path(widget)
    name_field, age_field = find_all('input')

    expect(name_field[:value]).to eq('Test Widget')
    expect(age_field[:value]).to eq('22')
  end

  it 'updates the widget' do
    widget = Widget.create!(name: "Test Widget", age: 22)
    visit widget_path(widget)
    name_field, age_field = find_all('input')

    name_field.set('updated name')
    age_field.set('40')
    save_button = find('button', text: 'SAVE')
    save_button.click

    expect(page).to have_no_css("div[data-test='spinner']")
    widget.reload
    expect(widget.name).to eq('updated name')
    expect(widget.age).to eq(40)
  end

  it 'validates the presence of the widget name' do
    widget = Widget.create!(name: "Test Widget", age: 22)
    visit widget_path(widget)
    name_field = find_all('input')[0]

    name_field.set(' ')
    save_button = find('button', text: 'SAVE')
    save_button.click

    expect(page).to have_no_css("div[data-test='spinner']")
    expect(page).to have_content("Name can't be blank")
    widget.reload
    expect(widget.name).to eq('Test Widget')
  end

  it 'validates the uniqueness of the widget name' do
    Widget.create!(name: "Existing Name", age: 22)
    widget = Widget.create!(name: "Test Widget", age: 22)
    visit widget_path(widget)
    name_field = find_all('input')[0]

    name_field.set('Existing Name')
    save_button = find('button', text: 'SAVE')
    save_button.click

    expect(page).to have_no_css("div[data-test='spinner']")
    expect(page).to have_content("Name has already been taken")
    widget.reload
    expect(widget.name).to eq('Test Widget')
  end

  it 'validates the numericality of the widget age' do
    widget = Widget.create!(name: "Test Widget", age: 22)
    visit widget_path(widget)
    name_field, age_field = find_all('input')

    age_field.set('asdf')
    save_button = find('button', text: 'SAVE')
    save_button.click

    expect(page).to have_no_css("div[data-test='spinner']")
    expect(page).to have_content("Age is not a number")
    widget.reload
    expect(widget.age).to eq(22)
  end

  it 'validates the widget age is an integer' do
    widget = Widget.create!(name: "Test Widget", age: 22)
    visit widget_path(widget)
    name_field, age_field = find_all('input')

    age_field.set('3.4')
    save_button = find('button', text: 'SAVE')
    save_button.click

    expect(page).to have_no_css("div[data-test='spinner']")
    expect(page).to have_content("Age must be an integer")
    widget.reload
    expect(widget.age).to eq(22)
  end

  it 'validates the widget age is greater than zero' do
    widget = Widget.create!(name: "Test Widget", age: 22)
    visit widget_path(widget)
    name_field, age_field = find_all('input')

    age_field.set('-1')
    save_button = find('button', text: 'SAVE')
    save_button.click

    expect(page).to have_no_css("div[data-test='spinner']")
    expect(page).to have_content("Age must be greater than 0")
    widget.reload
    expect(widget.age).to eq(22)
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
