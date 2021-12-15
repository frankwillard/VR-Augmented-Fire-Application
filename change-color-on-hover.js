// from: https://aframe.io/docs/0.9.0/introduction/interactions-and-controllers.html#handling-events-with-javascript
AFRAME.registerComponent("change-color-on-hover", {
  schema: {
    color: { default: "red" }
  },

  init: function() {
    //   return; //temp
    var data = this.data;
    var el = this.el; // <a-box>
    var defaultColor = el.getAttribute("material").color;

    el.addEventListener("mouseenter", function() {
      el.setAttribute("color", data.color);
    });

    el.addEventListener("mouseleave", function() {
      el.setAttribute("color", defaultColor);
    });
  }
});
