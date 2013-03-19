// Generated by CoffeeScript 1.5.0
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function(window, document) {
  var XBTooltip;
  XBTooltip = (function() {

    function XBTooltip(element, userConf, tooltip) {
      this.element = element;
      this.tooltip = tooltip;
      this.move = __bind(this.move, this);
      this.out = __bind(this.out, this);
      this.over = __bind(this.over, this);
      this.config = {
        id: userConf.id || undefined,
        className: userConf.className || undefined,
        x: userConf.x || 20,
        y: userConf.y || 20,
        text: userConf.text || undefined
      };
      if (this.tooltip === undefined && this.config.id) {
        this.tooltip = document.getElementById(this.config.id);
        if (this.tooltip) {
          this.tooltip = this.tooltip.parentNode.removeChild(this.tooltip);
        }
      }
      if (this.tooltip === undefined && this.config.text) {
        this.tooltip = document.createElement("div");
        if (this.config.id) {
          this.tooltip.id = this.config.id;
        }
        this.tooltip.innerHTML = this.config.text;
      }
      if (this.config.className) {
        this.tooltip.className = this.config.className;
      }
      this.tooltip = document.body.appendChild(this.tooltip);
      this.tooltip.style.position = "absolute";
      this.element.onmouseover = this.over;
      this.element.onmouseout = this.out;
      this.element.onmousemove = this.move;
      this.over();
    }

    XBTooltip.prototype.over = function(event) {
      return this.tooltip.style.display = "block";
    };

    XBTooltip.prototype.out = function(event) {
      return this.tooltip.style.display = "none";
    };

    XBTooltip.prototype.move = function(event) {
      var body, doc;
      event = (event ? event : window.event);
      if ((event.pageX == null) && (event.clientX != null)) {
        doc = document.documentElement;
        body = document.body;
        event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
      }
      this.tooltip.style.top = (event.pageY + this.config.y) + "px";
      return this.tooltip.style.left = (event.pageX + this.config.x) + "px";
    };

    return XBTooltip;

  })();
  return window.XBT = XBTooltip;
})(window, document);