import './Toolbar.css'

export default function Toolbar({ onReset, onSave }) {
  return (
    <div className="toolbar">
      <button className="btn btn-save" onClick={onSave}>
        <span>💾</span> Save
      </button>
      <button className="btn btn-reset" onClick={onReset}>
        <span>🗑</span> Reset
      </button>
    </div>
  )
}
