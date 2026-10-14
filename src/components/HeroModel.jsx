import { Component, Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer, PresentationControls, useGLTF } from '@react-three/drei'
import { Box3, Vector3 } from 'three'
import StickerTag from './StickerTag'

const MODEL_URL = '/models/loci-sticker-card.glb'

function Model() {
  const { scene } = useGLTF(MODEL_URL)

  // Normalize whatever scale/origin the export used: center it and fit the
  // longest side to a known size so framing stays stable if the file changes.
  const scale = useMemo(() => {
    const box = new Box3().setFromObject(scene)
    const size = box.getSize(new Vector3())
    const center = box.getCenter(new Vector3())
    scene.position.sub(center)
    return 5.1 / Math.max(size.x, size.y, size.z)
  }, [scene])

  return (
    <group scale={scale} position={[0.35, 0.85, 0]} rotation={[0.05, -Math.PI / 2, 0]}>
      <primitive object={scene} />
    </group>
  )
}

/** Falls back to the CSS sticker if WebGL or the model fails. */
class ModelBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) return this.props.fallback
    return this.props.children
  }
}

const cssFallback = (
  <div className="flex h-full items-center justify-center">
    <StickerTag peel sheen className="h-56 w-56 sm:h-64 sm:w-64" />
  </div>
)

export default function HeroModel({ className = '' }) {
  return (
    <div className={className} aria-label="Interactive 3D model of the Loci Sticker" role="img">
      <ModelBoundary fallback={cssFallback}>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0.6, 7.2], fov: 34 }}
          gl={{ alpha: true, antialias: true, toneMappingExposure: 0.78 }}
          style={{ background: 'transparent', touchAction: 'pan-y' }}
        >
          {/* Cinematic image-based lighting: soft panels in the site palette */}
          <ambientLight intensity={0.16} color="#dfe6ee" />
          <directionalLight position={[3, 5, 4]} intensity={0.5} color="#f3efe6" />
          <Environment resolution={64}>
            <Lightformer intensity={1.5} color="#f2ecdd" position={[0, 5, 3]} rotation={[-Math.PI / 2.4, 0, 0]} scale={[10, 4, 1]} />
            <Lightformer intensity={1.1} color="#3d7ab5" position={[-6, 1, 2]} rotation={[0, Math.PI / 2.4, 0]} scale={[7, 5, 1]} />
            <Lightformer intensity={0.7} color="#d2b478" position={[6, -1, 3]} rotation={[0, -Math.PI / 2.4, 0]} scale={[5, 3, 1]} />
          </Environment>

          <Suspense fallback={null}>
            <PresentationControls
              cursor
              snap
              speed={1.5}
              zoom={1}
              polar={[-0.22, 0.28]}
              azimuth={[-0.55, 0.55]}
            >
              <Float rotationIntensity={0.35} floatIntensity={0.9} speed={2.2}>
                <Model />
              </Float>
            </PresentationControls>
            <ContactShadows position={[0, -1.6, 0]} opacity={0.6} blur={2.6} scale={9} far={4} />
          </Suspense>
        </Canvas>
      </ModelBoundary>
    </div>
  )
}

useGLTF.preload(MODEL_URL)
