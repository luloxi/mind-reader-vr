/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */


AFRAME.registerComponent('set-image', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    link: {type: 'string'},
    dur: {type: 'number', default: 500}
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    console.log(data);
    this.setupFadeAnimation();

    
    el.addEventListener(data.on, function () {
      // Fade out image.
      data.target.emit('set-image-fade');
      // Wait for fade to complete.
       
      window.currentMove = data.link;
      var video = document.getElementById(data.src.replace('#',''));
      video.addEventListener('ended', myHandler, false);
      video.play();
      function myHandler(e) {
          video.currentTime = v1.currentTime -5 ; 
          video.play();
      }
      data.target.setAttribute('material', 'src', data.src);

      // window.game.renderCategory(window.currentMove);

    });
  },

  /**
   * Setup fade-in + fade-out.
   */
  setupFadeAnimation: function () {
    var data = this.data;
    var targetEl = this.data.target;

    // Only set up once.
    if (targetEl.dataset.setImageFadeSetup) { return; }
    targetEl.dataset.setImageFadeSetup = true;

    // Create animation.
    targetEl.setAttribute('animation__fade', {
      property: 'material.color',
      startEvents: 'set-image-fade',
      dir: 'alternate',
      dur: data.dur,
      from: '#000',
      to: '#FFF'
    });
  }
});
