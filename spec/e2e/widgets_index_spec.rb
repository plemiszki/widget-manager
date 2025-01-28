require 'rails_helper'

describe 'widget_index', type: :feature do

  it 'displays a list of widgets' do
    Widget.create!(name: "Test Widget", age: 22)
    visit widgets_path
    expect(page).to have_content 'Test Widget'
    expect(page).to have_content '22'
  end

end
