
    var container;

    var camera, scene, renderer;

    var cube, plane;

    var targetRotation = 0;
    var targetRotationOnMouseDown = 0;

    var mouseX = 0;
    var mouseXOnMouseDown = 0;

    var canvasWidth = 495;
    var canvasHeight = 334;
    
    var rotx=0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    init();
    animate();

    function init() {

      var local = document.getElementById("canvas-container");
      container = document.createElement('div');
      
      local.appendChild( container );

      camera = new THREE.Camera( 70, canvasWidth / canvasHeight, 1, 1000 );
      camera.position.y = 150;
      camera.position.z = 500;
      camera.target.position.y = 150;

      scene = new THREE.Scene();
      
      var arrayCor = new Array();
      arrayCor = [0x0092BF, 0x0092BF, 0xd9d9d9, 0xd9d9d9, 0xF14A29, 0xF14A29];
      
      // Cube

      var materials = [];

        for ( var i = 0; i < 6; i ++ ) {

          materials.push( [ new THREE.MeshBasicMaterial( { color: arrayCor[i] } ) ] );

        }

        cube = new THREE.Mesh( new THREE.Cube( 250, 250, 250, 1, 1, 1, materials ), new THREE.MeshFaceMaterial() );
        cube.position.y = 150;
        cube.overdraw = true;
        scene.addObject( cube );

        // Plane

        plane = new THREE.Mesh( new THREE.Plane( 350, 350 ), new THREE.MeshBasicMaterial( { color: 0xe0e0e0 } ) );
        plane.rotation.x = - 90 * ( Math.PI / 180 );
        plane.overdraw = true;
        //scene.addObject( plane );

        renderer = new THREE.CanvasRenderer();
        renderer.setSize(canvasWidth, canvasHeight);

        container.appendChild( renderer.domElement );

        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );
      }

      //

      function onDocumentMouseDown( event ) {

        event.preventDefault();

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'mouseup', onDocumentMouseUp, false );
        document.addEventListener( 'mouseout', onDocumentMouseOut, false );

        mouseXOnMouseDown = event.clientX - windowHalfX;
        mouseYOnMouseDown = event.clientY - windowHalfY;
        targetRotationOnMouseDown = targetRotation;
      }

      function onDocumentMouseMove( event ) {

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
        targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
        rotx+= ( mouseY - mouseYOnMouseDown ) * 0.02;
      }

      function onDocumentMouseUp( event ) {

        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
      }

      function onDocumentMouseOut( event ) {

        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
      }

      function onDocumentTouchStart( event ) {

        if ( event.touches.length == 1 ) {

          event.preventDefault();

          mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
          targetRotationOnMouseDown = targetRotation;

        }
      }

      function onDocumentTouchMove( event ) {

        if ( event.touches.length == 1 ) {

          event.preventDefault();

          mouseX = event.touches[ 0 ].pageX - windowHalfX;
          targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

        }
      }

      //

      function animate() {

        requestAnimationFrame( animate );

        render();

      }

      function render() {
        rotx*=0.95;
        plane.rotation.z = cube.rotation.y += ( targetRotation - cube.rotation.y ) * 0.05;
        cube.rotation.x += ( rotx) * 0.001;
        renderer.render( scene, camera );

      }