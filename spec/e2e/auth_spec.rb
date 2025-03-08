require 'rails_helper'

describe 'auth', type: :feature do

  let(:user) { User.create!(email_address: 'test@example.com', password: 'password') }

  # it 'has a working sign-in' do
  #   widget = Widget.create!(name: "Test Widget", age: 22)
  #   visit widget_path(widget)
  #   expect(page).to have_button('Sign in')
  # end

  it 'has a working sign-out' do
    visit authenticated_path(widgets_path, user)
    expect(page).to have_button('Sign Out')
    sign_out_button = find('button', text: "SIGN OUT")
    sign_out_button.click

    expect(page).to have_button('Sign in')
  end

end
