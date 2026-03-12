import { useState, useCallback } from 'react'
import Grid from './components/Grid'
import Palette from './components/Palette'
import Gallery from './components/Gallery'
import Toolbar from './components/Toolbar'
import paletteData from './palette.json'
import './App.css'

const GRID_SIZE = 20
const EMPTY_COLOR = '#1a1a2e'

function createEmptyGrid() {
  return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(EMPTY_COLOR))
}

export default function App() {
  const [grid, setGrid] = useState(createEmptyGrid)
  const [selectedColor, setSelectedColor] = useState(paletteData.colors[4].hex)
  const [gallery, setGallery] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)

  const paintCell = useCallback((row, col) => {
    setGrid(prev => {
      const next = prev.map(r => [...r])
      next[row][col] = selectedColor
      return next
    })
  }, [selectedColor])

  const handleMouseDown = useCallback((row, col) => {
    setIsDrawing(true)
    paintCell(row, col)
  }, [paintCell])

  const handleMouseEnter = useCallback((row, col) => {
    if (isDrawing) paintCell(row, col)
  }, [isDrawing, paintCell])

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false)
  }, [])

  const handleReset = useCallback(() => {
    setGrid(createEmptyGrid())
  }, [])

  const handleSave = useCallback(() => {
    const newEntry = {
      id: Date.now(),
      grid: grid.map(r => [...r]),
      savedAt: new Date().toLocaleString('ro-RO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    }
    setGallery(prev => [newEntry, ...prev])
  }, [grid])

  const handleLoad = useCallback((entry) => {
    setGrid(entry.grid.map(r => [...r]))
  }, [])

  const handleDelete = useCallback((id) => {
    setGallery(prev => prev.filter(e => e.id !== id))
  }, [])

  return (
    <div className="app" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <header className="header">
        <div className="header-logo">
          <span className="pixel-icon">◼</span>
          <h1>PIXEL<span>FORGE</span></h1>
        </div>
        <p className="header-sub">Create · Save · Masterpiece</p>
      </header>

      <main className="main-layout">
        <aside className="left-panel">
          <Palette
            colors={paletteData.colors}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />
          <Toolbar onReset={handleReset} onSave={handleSave} />
        </aside>

        <section className="canvas-section">
          <div className="canvas-wrapper">
            <Grid
              grid={grid}
              onMouseDown={handleMouseDown}
              onMouseEnter={handleMouseEnter}
              gridSize={GRID_SIZE}
            />
          </div>
          <div className="canvas-info">
            <span>Canvas: {GRID_SIZE}×{GRID_SIZE}</span>
            <span className="color-preview-label">
              Active:
              <span
                className="active-color-dot"
                style={{ background: selectedColor }}
              />
            </span>
          </div>
        </section>

        <aside className="right-panel">
          <Gallery
            gallery={gallery}
            onLoad={handleLoad}
            onDelete={handleDelete}
            gridSize={GRID_SIZE}
            emptyColor={EMPTY_COLOR}
          />
        </aside>
      </main>
    </div>
  )
}
