class XBTooltip
  constructor: (@element, userConf, @tooltip) ->
    @config =
      id: userConf.id or `undefined`
      className: userConf.className or `undefined`
      x: userConf.x or 20
      y: userConf.y or 20
      text: userConf.text or `undefined`

    if @tooltip is `undefined` and @config.id
      @tooltip = document.getElementById(@config.id)
      @tooltip = @tooltip.parentNode.removeChild(@tooltip) if @tooltip
    if @tooltip is `undefined` and @config.text
      @tooltip = document.createElement("div")
      @tooltip.id = @config.id if @config.id
      @tooltip.innerHTML = @config.text
    @tooltip.className = @config.className if @config.className
    @tooltip = document.body.appendChild(@tooltip)
    @tooltip.style.position = "absolute"
    @element.onmouseover = @over
    @element.onmouseout = @out
    @element.onmousemove = @move
    @out()

  over: (event) =>
    @tooltip.style.display = "block"

  out: (event) =>
    @tooltip.style.display = "none"

  move: (event) =>
    event = (if event then event else window.event)
    if not event.pageX? and event.clientX?
      doc = document.documentElement
      body = document.body
      event.pageX = event.clientX + (doc and doc.scrollLeft or body and body.scrollLeft or 0) - (doc and doc.clientLeft or body and body.clientLeft or 0)
      event.pageY = event.clientY + (doc and doc.scrollTop or body and body.scrollTop or 0) - (doc and doc.clientTop or body and body.clientTop or 0)
    @tooltip.style.top = (event.pageY + @config.y) + "px"
    @tooltip.style.left = (event.pageX + @config.x) + "px"
