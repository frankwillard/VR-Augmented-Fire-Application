/* global AFRAME, THREE */

/**
 * keeps temperature text attached to the sphere
 */

AFRAME.registerComponent("follow", {
  schema: {
    target: { type: "selector" },
    speed: { type: "number" }
  },

  init: function() {
    this.directionVec3 = new THREE.Vector3();
  },

  tick: function(time, timeDelta) {
    var directionVec3 = this.directionVec3;

    // Grab position vectors (THREE.Vector3) from the entities' three.js objects.
    var targetPosition = this.data.target.firstElementChild.object3D.position; //this.data.target.getAttribute('position');
    var currentPosition = this.el.object3D.position;

    // Subtract the vectors to get the direction the entity should head in.
    directionVec3.copy(targetPosition).sub(currentPosition);

    // Translate the entity in the direction towards the target.
    this.el.setAttribute("position", {
      x: currentPosition.x + directionVec3.x,
      y: currentPosition.y + directionVec3.y,
      z: currentPosition.z + directionVec3.z
    });
  }
});
