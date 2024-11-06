        alert("Rendering may take 2–3 minutes. I’m working on optimizing the code to reduce loading time. Thank you for your patience!");
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        const loader = new THREE.GLTFLoader();
        let object;

        loader.load('./assets/scene.gltf',
            function(gltf) {
                object = gltf.scene;
                scene.add(object);

                // Adjust camera position to view entire model
                const box = new THREE.Box3().setFromObject(object);
                const size = box.getSize(new THREE.Vector3()).length();
                const center = box.getCenter(new THREE.Vector3());

                camera.near = size / 100;
                camera.far = size * 100;

                camera.position.copy(center);
                camera.position.x += size / 2.0;
                camera.position.y += size / 5.0;
                camera.position.z += size / 2.0;
                camera.lookAt(center);

                // Ensure the object is centered
                object.position.set(0, 0, 0);

                // Optionally, you can set initial rotation
                object.rotation.set(0, 0, 0);
            },
            function(xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function(error) {
                console.log(error);
            }
        );

        renderer.setSize(765,665);
        document.getElementById("container").appendChild(renderer.domElement);
         console.log(renderer.domElement);

        const toplight = new THREE.DirectionalLight(0xffffff, 1);
        toplight.position.set(300, 300, 300);
        scene.add(toplight);

        const ambientLight = new THREE.AmbientLight(0x333333);
        scene.add(ambientLight);

        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });


        function animate() {
            requestAnimationFrame(animate);

                   // Assuming 'container' is the ID of the container element
var container = document.getElementById("container");

// Add an event listener for mouse movement within the container
container.addEventListener('mousemove', function(event) {
    // Get the size and position of the container
    var rect = container.getBoundingClientRect();

    // Calculate mouseX and mouseY relative to the container
    var mouseX = (event.clientX - rect.left) / container.clientWidth;
    var mouseY = (event.clientY - rect.top) / container.clientHeight;
// Assuming you have the original scale stored somewhere before this point
var originalScale = object.scale.clone();

// Inside your update or render loop
if (object) {
    var rotationY = (mouseX - 0.5) * Math.PI * 2; // Adjust sensitivity as needed

    // Limit rotationX to only affect rotation around the y-axis (left and right)
    var rotationX = 0; // Assume no vertical rotation

    // Apply the rotation to the object
    object.rotation.y = rotationY;
    object.rotation.x = rotationX;
} else {
    // Restore original scale
    if (object) object.scale.copy(originalScale);
}

    
});

            renderer.render(scene, camera);
        }
        animate();
