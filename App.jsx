/**
 * Demo App - Custom Cursor usage
 * Import CustomCursor and render it at the root of your app.
 */

import CustomCursor from './CustomCursor';
import './App.css';

export default function App() {
  return (
    <>
      <CustomCursor />
      <div className="app">
        <h1>Custom Cursor Demo</h1>
        <p className="subtitle">
          Rounded triangular pointer • White stroke, black fill • Tip aligns with click
        </p>

        <div className="card">
          <h2>Interactive Elements</h2>
          <p>Hover over buttons and links to see the cursor scale up. Click to see the press effect.</p>
          <div className="button-group">
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-outline">Outline</button>
          </div>
          <div className="links">
            <a href="#">Link one</a>
            <a href="#">Link two</a>
          </div>
        </div>

        <div className="card">
          <h2>Form</h2>
          <p>Text selection and inputs work normally.</p>
          <div className="form-group">
            <label htmlFor="input">Input</label>
            <input id="input" type="text" placeholder="Type here..." />
          </div>
        </div>

        <p className="footer">Move mouse outside the window to restore system cursor.</p>
      </div>
    </>
  );
}
