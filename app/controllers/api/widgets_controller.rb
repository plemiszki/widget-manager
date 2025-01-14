class Api::WidgetsController < ActionController::API
  include RenderErrors

  def index
    @widgets = Widget.all
    render "index", formats: [ :json ], handlers: [ :jbuilder ]
  end

  def create
    @widget = Widget.new(widget_params)
    if @widget.save
      render "show", formats: [ :json ], handlers: [ :jbuilder ]
    else
      render_errors(@widget)
    end
  end

  def show
    @widget = Widget.find(params[:id])
    render "show", formats: [ :json ], handlers: [ :jbuilder ]
  end

  def update
    @widget = Widget.find(params[:id])
    if @widget.update(widget_params)
      render "show", formats: [ :json ], handlers: [ :jbuilder ]
    else
      render_errors(@widget)
    end
  end

  def destroy
    @widget = Widget.find(params[:id])
    if @widget.destroy
      render json: @widget, status: 200
    else
      render_errors(@widget)
    end
  end

  private

  def widget_params
    params[:widget].permit(:name, :age)
  end
end
