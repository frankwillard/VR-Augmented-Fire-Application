/**
 * Function enables ability to zoom in webVR mode
 * Changing delta can enable a stronger or weaker zoom
 * Zoom does not change position of HUD elements- should fix that
 */

function zoomthatwheel(e) {
  // console.log(e);
  var evt = window.event || e; //equalize event object
  var ndelta = evt.detail ? evt.detail * -120 : evt.wheelDelta; //check for detail first so Opera uses that instead of wheelDelta
  // console.log("ndelta: ", ndelta);
  // document.getElementById("wheelvalue").innerHTML=ndelta //delta returns +120 when wheel is scrolled up, -120 when down
  const delta = Math.sign(ndelta / 120) * 0.05; // the .05 smooths out the zooming
  //getting the mouse wheel change (120 or -120 and normalizing it to 1 or -1)
  var mycam = document.getElementById("cam").getAttribute("camera");
  var finalZoom =
    document.getElementById("cam").getAttribute("camera").zoom + delta;
  //limiting the zoom so it doesnt zoom too much in or out
  if (finalZoom < 1) finalZoom = 1;
  if (finalZoom > 5) finalZoom = 5;
  mycam.zoom = finalZoom;
  //setting the camera element
  document.getElementById("cam").setAttribute("camera", mycam);
}

// Enables ability to zoom for Firefox
var mousewheelevt = /Firefox/i.test(navigator.userAgent)
  ? "DOMMouseScroll"
  : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x
if (document.attachEvent)
  //if IE (and Opera depending on user setting)
  document.attachEvent("on" + mousewheelevt, zoomthatwheel);
else if (document.addEventListener)
  //WC3 browsers
  document.addEventListener(mousewheelevt, zoomthatwheel, false);
