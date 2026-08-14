import DemoOne from "@/components/ui/demo"

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-ink flex flex-col items-center justify-center p-6 text-paper">
      <div className="max-w-4xl w-full text-center space-y-4 mb-8">
        <span className="eyebrow text-sand bg-sand/10">Interactive Visualisation</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-sand">Rotating Earth Wireframe Globe</h1>
        <p className="text-paper/70 text-sm max-w-lg mx-auto">
          3D orthographic halftone dotted globe rendered with D3.js, canvas, and smooth rotation controls.
        </p>
      </div>
      <div className="w-full flex justify-center items-center">
        <DemoOne />
      </div>
    </main>
  )
}
