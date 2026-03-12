import './Grid.css'

export default function Grid({ grid, onMouseDown, onMouseEnter, gridSize }) {
  return (
    <div
      className="grid"
      style={{ '--grid-size': gridSize }}
      onDragStart={e => e.preventDefault()}
    >
      {grid.map((row, r) =>
        row.map((color, c) => (
          <div
            key={`${r}-${c}`}
            className="cell"
            style={{ background: color }}
            onMouseDown={() => onMouseDown(r, c)}
            onMouseEnter={() => onMouseEnter(r, c)}
          />
        ))
      )}
    </div>
  )
}
