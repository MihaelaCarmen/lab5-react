import './Gallery.css'

const THUMB_SIZE = 80

function Thumbnail({ grid, gridSize, emptyColor }) {
  const cellSize = THUMB_SIZE / gridSize

  return (
    <canvas
      width={THUMB_SIZE}
      height={THUMB_SIZE}
      ref={canvas => {
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        grid.forEach((row, r) => {
          row.forEach((color, c) => {
            ctx.fillStyle = color
            ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize)
          })
        })
      }}
      style={{ imageRendering: 'pixelated', display: 'block' }}
    />
  )
}

export default function Gallery({ gallery, onLoad, onDelete, gridSize, emptyColor }) {
  return (
    <div className="gallery-panel">
      <div className="gallery-header">
        <h2 className="panel-title">🖼 Gallery</h2>
        <span className="gallery-count">{gallery.length} saved</span>
      </div>

      {gallery.length === 0 ? (
        <div className="gallery-empty">
          <p>No drawings yet.</p>
          <p>Hit Save to start your collection!</p>
        </div>
      ) : (
        <div className="gallery-list">
          {gallery.map((entry, idx) => (
            <div key={entry.id} className="gallery-item">
              <div className="thumb-wrapper">
                <Thumbnail grid={entry.grid} gridSize={gridSize} emptyColor={emptyColor} />
                <div className="thumb-overlay">
                  <button className="thumb-btn load" onClick={() => onLoad(entry)} title="Load">
                    ▶
                  </button>
                </div>
              </div>
              <div className="gallery-item-info">
                <span className="item-number">#{gallery.length - idx}</span>
                <span className="item-date">{entry.savedAt}</span>
                <button className="delete-btn" onClick={() => onDelete(entry.id)} title="Delete">
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
