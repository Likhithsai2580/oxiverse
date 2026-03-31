import * as THREE from 'three'
import { ReactThreeFiber, Overwrite } from '@react-three/fiber'

type ThreeColor = ReactThreeFiber.Color
type ThreeVector3 = ReactThreeFiber.Vector3

export interface ThreeJSXElements {
  group: Overwrite<ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group>, { ref?: React.Ref<THREE.Group> }>
  mesh: Overwrite<ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>, { ref?: React.Ref<THREE.Mesh> }>
  sphereGeometry: ReactThreeFiber.GeometryNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>
  boxGeometry: ReactThreeFiber.GeometryNode<THREE.BoxGeometry, typeof THREE.BoxGeometry>
  planeGeometry: ReactThreeFiber.GeometryNode<THREE.PlaneGeometry, typeof THREE.PlaneGeometry>
  meshBasicMaterial: ReactThreeFiber.MaterialNode<THREE.MeshBasicMaterial, typeof THREE.MeshBasicMaterial>
  meshStandardMaterial: ReactThreeFiber.MaterialNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>
  meshPhysicalMaterial: ReactThreeFiber.MaterialNode<THREE.MeshPhysicalMaterial, typeof THREE.MeshPhysicalMaterial>
  meshLambertMaterial: ReactThreeFiber.MaterialNode<THREE.MeshLambertMaterial, typeof THREE.MeshLambertMaterial>
  meshPhongMaterial: ReactThreeFiber.MaterialNode<THREE.MeshPhongMaterial, typeof THREE.MeshPhongMaterial>
  meshToonMaterial: ReactThreeFiber.MaterialNode<THREE.MeshToonMaterial, typeof THREE.MeshToonMaterial>
  lineBasicMaterial: ReactThreeFiber.MaterialNode<THREE.LineBasicMaterial, typeof THREE.LineBasicMaterial>
  shaderMaterial: ReactThreeFiber.MaterialNode<THREE.ShaderMaterial, typeof THREE.ShaderMaterial>
  points: Overwrite<ReactThreeFiber.Object3DNode<THREE.Points, typeof THREE.Points>, { ref?: React.Ref<THREE.Points> }>
  pointLight: Overwrite<ReactThreeFiber.Object3DNode<THREE.PointLight, typeof THREE.PointLight>, { ref?: React.Ref<THREE.PointLight> }>
  ambientLight: Overwrite<ReactThreeFiber.Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>, { ref?: React.Ref<THREE.AmbientLight> }>
  directionalLight: Overwrite<ReactThreeFiber.Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>, { ref?: React.Ref<THREE.DirectionalLight> }>
  spotLight: Overwrite<ReactThreeFiber.Object3DNode<THREE.SpotLight, typeof THREE.SpotLight>, { ref?: React.Ref<THREE.SpotLight> }>
  hemisphereLight: Overwrite<ReactThreeFiber.Object3DNode<THREE.HemisphereLight, typeof THREE.HemisphereLight>, { ref?: React.Ref<THREE.HemisphereLight> }>
  line: Overwrite<ReactThreeFiber.Object3DNode<THREE.Line, typeof THREE.Line>, { ref?: React.Ref<THREE.Line> }>
  lineSegments: Overwrite<ReactThreeFiber.Object3DNode<THREE.LineSegments, typeof THREE.LineSegments>, { ref?: React.Ref<THREE.LineSegments> }>
  bufferGeometry: ReactThreeFiber.GeometryNode<THREE.BufferGeometry, typeof THREE.BufferGeometry>
  circleGeometry: ReactThreeFiber.GeometryNode<THREE.CircleGeometry, typeof THREE.CircleGeometry>
  coneGeometry: ReactThreeFiber.GeometryNode<THREE.ConeGeometry, typeof THREE.ConeGeometry>
  cylinderGeometry: ReactThreeFiber.GeometryNode<THREE.CylinderGeometry, typeof THREE.CylinderGeometry>
  dodecahedronGeometry: ReactThreeFiber.GeometryNode<THREE.DodecahedronGeometry, typeof THREE.DodecahedronGeometry>
  extrudeGeometry: ReactThreeFiber.GeometryNode<THREE.ExtrudeGeometry, typeof THREE.ExtrudeGeometry>
  icosahedronGeometry: ReactThreeFiber.GeometryNode<THREE.IcosahedronGeometry, typeof THREE.IcosahedronGeometry>
  latheGeometry: ReactThreeFiber.GeometryNode<THREE.LatheGeometry, typeof THREE.LatheGeometry>
  octahedronGeometry: ReactThreeFiber.GeometryNode<THREE.OctahedronGeometry, typeof THREE.OctahedronGeometry>
  polyhedronGeometry: ReactThreeFiber.GeometryNode<THREE.PolyhedronGeometry, typeof THREE.PolyhedronGeometry>
  ringGeometry: ReactThreeFiber.GeometryNode<THREE.RingGeometry, typeof THREE.RingGeometry>
  shapeGeometry: ReactThreeFiber.GeometryNode<THREE.ShapeGeometry, typeof THREE.ShapeGeometry>
  tetrahedronGeometry: ReactThreeFiber.GeometryNode<THREE.TetrahedronGeometry, typeof THREE.TetrahedronGeometry>
  torusGeometry: ReactThreeFiber.GeometryNode<THREE.TorusGeometry, typeof THREE.TorusGeometry>
  torusKnotGeometry: ReactThreeFiber.GeometryNode<THREE.TorusKnotGeometry, typeof THREE.TorusKnotGeometry>
  tubeGeometry: ReactThreeFiber.GeometryNode<THREE.TubeGeometry, typeof THREE.TubeGeometry>
  wireframeGeometry: ReactThreeFiber.GeometryNode<THREE.WireframeGeometry, typeof THREE.WireframeGeometry>
  textGeometry: ReactThreeFiber.GeometryNode<THREE.TextGeometry, typeof THREE.TextGeometry>
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeJSXElements {}
  }
}

export {}
