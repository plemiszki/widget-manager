require 'rails_helper'

RSpec.describe Widget do

  it 'creates a widget' do
    @widget = Widget.create(name: "test")
    expect(@widget.name).to eq "test"
  end

end
