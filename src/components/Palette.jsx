import './Palette.css'

export default function Palette({ colors, selectedColor, onSelectColor }) {
  return (
    <div className="palette-panel">
      <h2 className="panel-title">🎨 Palette</h2>
      <div className="palette-grid">
        {colors.map(color => (
          <button
            key={color.id}
            className={`color-swatch ${selectedColor === color.hex ? 'selected' : ''}`}
            style={{ background: color.hex }}
            title={color.name}
            onClick={() => onSelectColor(color.hex)}
          >
            {selectedColor === color.hex && <span className="check">✓</span>}
          </button>
        ))}
      </div>
      <div className="selected-info">
        <div className="selected-preview" style={{ background: selectedColor }} />
        <span className="selected-name">
          {colors.find(c => c.hex === selectedColor)?.name || 'Custom'}
        </span>
      </div>
    </div>
  )
}
