import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import starsTexture from '../img/stars.jpg'
import sunTexture from '../img/sun.jpg'
import mercuryTexture from '../img/mercury.jpg'
import venusTexture from '../img/venus.jpg'
import earthTexture from '../img/earth.jpg'
import marsTexture from '../img/mars.jpg'
import jupiterTexture from '../img/jupiter.jpg'
import saturnTexture from '../img/saturn.jpg'
import saturnRingTexture from '../img/saturn ring.png'
import uranusTexture from '../img/uranus.jpg'
import uranusRingTexture from '../img/uranus ring.png'
import neptuneTexture from '../img/neptune.jpg'
import plutoTexture from '../img/pluto.jpg'

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)

const orbit = new OrbitControls(camera, renderer.domElement)

camera.position.set(-90, 140, 140)
orbit.update()

// const ambientLight = new THREE.AmbientLight(0x333333)
// scene.add(ambientLight)

const cubeTextureLoader = new THREE.CubeTextureLoader()
scene.background = cubeTextureLoader.load([
	starsTexture,
	starsTexture,
	starsTexture,
	starsTexture,
	starsTexture,
	starsTexture,
])

const textureLoader = new THREE.TextureLoader()
const sunGeometry = new THREE.SphereGeometry(15, 32, 16)
const sunMaterial = new THREE.MeshBasicMaterial({
	map: textureLoader.load(sunTexture),
})

const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun)

function createPlanet(size, position, texture, ring) {
	const geo = new THREE.SphereGeometry(size, 30, 30)
	const material = new THREE.MeshBasicMaterial({
		map: textureLoader.load(texture),
	})

	const mesh = new THREE.Mesh(geo, material)
	const obj = new THREE.Object3D()

	obj.add(mesh)
	scene.add(obj)
	obj.position.x = position

	if (ring) {
		const ringGeo = new THREE.RingGeometry(
			ring.innerRadius,
			ring.outerRadius,
			30
		)
		const ringMat = new THREE.MeshBasicMaterial({
			map: textureLoader.load(ring.texture),
			side: THREE.DoubleSide,
		})
		const ringMesh = new THREE.Mesh(ringGeo, ringMat)

		obj.add(ringMesh)
		ringMesh.rotation.x = 0.5 * Math.PI
	}

	return { mesh, obj }
}

const mercury = createPlanet(5, 22, mercuryTexture)
const venus = createPlanet(8, 37, venusTexture)
const earth = createPlanet(8, 55, earthTexture)
const mars = createPlanet(4.5, 70, marsTexture)

// const saturnGeo = new THREE.SphereGeometry(10, 25, 25)
// const saturnMat = new THREE.MeshBasicMaterial({
// 	map: textureLoader.load(saturnTexture),
// })
// const saturn = new THREE.Mesh(saturnGeo, saturnMat)
// const saturnObject = new THREE.Object3D()

// saturnObject.add(saturn)
// scene.add(saturnObject)
// saturnObject.position.x = 65

// // saturn ring
// const saturnRingGeo = new THREE.RingGeometry(10, 20, 30)
// const saturnRingMat = new THREE.MeshBasicMaterial({
// 	map: textureLoader.load(saturnRingTexture),
// 	side: THREE.DoubleSide,
// })
// const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat)

// saturnObject.add(saturnRing)
// saturnRing.rotation.x = 0.5 * Math.PI

const pointLight = new THREE.PointLight(0xffffff, 2, 300)
scene.add(pointLight)

function animate() {
	// Self rotation
	sun.rotateY(0.004)
	mercury.mesh.rotateY(0.004)
	venus.mesh.rotateY(0.01)
	earth.mesh.rotateY(0.01)
	mars.mesh.rotateY(0.01)


	// rotation around the earth
	mercury.obj.rotateY(0.04)

	renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

window.addEventListener('resize', function () {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
})
