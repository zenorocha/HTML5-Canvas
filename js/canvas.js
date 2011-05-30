// https://github.com/mrdoob/three.js/wiki/API-Reference
// http://www.aerotwist.com/lab/getting-started-with-three-js/
// https://github.com/mrdoob/three.js/

    var camera, cena, renderer, cubo;

// alvo da rotação no eixo X e Y 
    var targetRotationX = 0;
    var targetRotationY = 0;

// alvo da rotação no eixo X e Y quando o mouse estiver pressionado
    var targetRotationOnMouseDownX = 0;
    var targetRotationOnMouseDownY = 0;

    var mouseX = 0;
    var mouseY = 0;

    var mouseXOnMouseDown = 0;
    var mouseYOnMouseDown = 0;

    var canvasWidth = 495;
    var canvasHeight = 334;
    
    var canvasHalfX = canvasWidth / 2;
    var canvasHalfY = canvasHeight / 2;

    init();
    animate();

    function init() {

      var container = document.getElementById("canvas-container");

	// Construtor: ( fov <Number>, aspect <Number>, near <Number>, far <Number>, target <THREE.Object3D> )

	// field of vision (view) - quanto menor mais ampliada
	// aspecto - proporção entre a altura e largura
	// near - distancia minima para renderizar um objeto
	// far - distancia maxima para renderizar um objeto

      camera = new THREE.Camera(70, canvasWidth / canvasHeight, 1, 1000);
      camera.position.y = 150;
      camera.position.z = 500;
      camera.target.position.y = 150;

      cena = new THREE.Scene();

	// define as cores das faces - ver qual face é cada cor
      var arrayCor = new Array();
      arrayCor = [0x0092BF, 0x0092BF, 0xd9d9d9, 0xd9d9d9, 0xF14A29, 0xF14A29];
      
      var materials = [];

	// define cada uma das cores para cada uma das faces
        for ( var i = 0; i < 6; i ++ ) {

          materials.push( [ new THREE.MeshLambertMaterial( { color: arrayCor[i] } ) ] );

        }

	// cria o cubo e seta os materiais relativos a ele

	// mesh é um grafo tridimensional

		var abc = new THREE.Cube(250, 250, 250, 1, 1, 1, materials);

        cubo = new THREE.Mesh(abc, new THREE.MeshFaceMaterial() );
        cubo.position.y = 150;
        //cubo.overdraw = true;
        cena.addObject(cubo);

	// cria o renderizador
        renderer = new THREE.CanvasRenderer();
	// seta o tamanho
        renderer.setSize(canvasWidth, canvasHeight);
	// coloca o renderizador dentro do container criado
        container.appendChild( renderer.domElement );

	// adiciono os eventos
        document.addEventListener('mousedown', onMouseDown, false);
      }

      function onMouseDown(event) {

        event.preventDefault();

	// adiciona os eventos 
        document.addEventListener('mousemove', onMouseMove, false);
        document.addEventListener('mouseup', onMouseUp, false);
        document.addEventListener('mouseout', onMouseOut, false);

	// posicao do mouse no eixo X e Y quando o mouse estiver clicado
        mouseXOnMouseDown = event.clientX - canvasHalfX;
        mouseYOnMouseDown = event.clientY - canvasHalfY;
        targetRotationOnMouseDownX = targetRotationX;
        targetRotationOnMouseDownY = targetRotationY;
      }

      function onMouseMove(event) {

	// posicao do mouse no eixo X e Y quando o mouse estiver movendo
        mouseX = event.clientX - canvasHalfX;
        mouseY = event.clientY - canvasHalfY;
        targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.02;
		targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.02;
      }

      function onMouseUp(event) {

	// removendo os eventos quando o mouse nao estiver clicado
        document.removeEventListener('mousemove', onMouseMove, false);
        document.removeEventListener('mouseup', onMouseUp, false);
        document.removeEventListener('mouseout', onMouseOut, false);
      }

      function onMouseOut(event) {

	// removendo os eventos quando o mouse deixar a tela
        document.removeEventListener('mousemove', onMouseMove, false);
        document.removeEventListener('mouseup', onMouseUp, false);
        document.removeEventListener('mouseout', onMouseOut, false);
      }

      //

      function animate() {
        requestAnimationFrame(animate);
        render();
      }

      function render() {
		cubo.rotation.y += (targetRotationX - cubo.rotation.y) * 0.05;
		cubo.rotation.x += (targetRotationY - cubo.rotation.x) * 0.05;
        renderer.render(cena, camera);
      }
