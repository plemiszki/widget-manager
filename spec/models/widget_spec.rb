require 'rails_helper'

RSpec.describe Widget do
  it 'creates a widget' do
    @widget = Widget.create!(name: "test")
    expect(Widget.count).to eq 1
    expect(@widget.name).to eq "test"
  end

  it 'requires a name' do
    expect do
      Widget.create!(name: "")
    end.to raise_error(ActiveRecord::RecordInvalid)
  end
end
