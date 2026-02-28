# Custom Cursor React Component

Pixel-perfect custom mouse cursor matching the reference design:
- Rounded triangular navigation pointer
- White stroke (#ffffff), black fill (#000000)
- Smooth curves, scoop/tail on bottom-right
- Tip points top-right (~1:30-2 o'clock)
- Left+up offset so tip aligns with click position

## Installation

```bash
cd react
npm install
npm run dev
```

## Usage

```jsx
import CustomCursor from './CustomCursor';

function App() {
  return (
    <>
      <CustomCursor />
      {/* Your app content */}
    </>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `offsetX` | number | 32 | Pixels to offset cursor left (tip alignment) |
| `offsetY` | number | 4 | Pixels to offset cursor up |

```jsx
<CustomCursor offsetX={28} offsetY={6} />
```

## Behavior

- Hides system cursor when mouse is inside the page
- Restores system cursor when mouse leaves or tab loses focus
- `pointer-events: none` - clicks, hover, text selection, inputs work normally
- Scale up on hover over links/buttons
- Scale down on mouse click
- Smooth `requestAnimationFrame` tracking
