/**
 * CustomCursor - Reference-matched pointer cursor for React
 *
 * Real navigation cursor: sharp tip on RIGHT (click point), body on LEFT.
 * Distinct notch, clear geometry. White stroke #fff, black fill #000.
 * Large left offset so tip aligns with mouse; body stays left of click.
 *
 * Usage:
 *   import CustomCursor from './CustomCursor';
 *   <CustomCursor />  // or <CustomCursor offsetX={26} offsetY={8} />
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import './CustomCursor.css';

// Tip at (26, 8) - right side of shape. Large left offset so tip = click point.
const DEFAULT_OFFSET_X = 26;
const DEFAULT_OFFSET_Y = 8;

const INTERACTIVE_SELECTORS = [
  'a', 'button', 'input', 'textarea', 'select', 'label',
  '[role="button"]', '[onclick]', '.clickable',
].join(', ');

export default function CustomCursor({ offsetX = DEFAULT_OFFSET_X, offsetY = DEFAULT_OFFSET_Y }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const rafRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const htmlRef = useRef(null);
  const hasMovedRef = useRef(false);

  const SMOOTHING = 0.18;
  const lerp = (start, end, factor) => start + (end - start) * factor;

  const isInteractive = useCallback((el) => {
    if (!el) return false;
    return el.matches?.(INTERACTIVE_SELECTORS) || el.closest?.(INTERACTIVE_SELECTORS);
  }, []);

  const animate = useCallback(() => {
    const current = currentRef.current;
    const target = targetRef.current;

    current.x = lerp(current.x, target.x, 1 - SMOOTHING);
    current.y = lerp(current.y, target.y, 1 - SMOOTHING);

    setPosition({ x: Math.round(current.x * 10) / 10, y: Math.round(current.y * 10) / 10 });
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    htmlRef.current = document.documentElement;

    const onMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!hasMovedRef.current) {
        currentRef.current = { x: e.clientX, y: e.clientY };
        hasMovedRef.current = true;
        setVisible(true);
      }
      setIsHovering(isInteractive(e.target));
    };

    const onMouseEnter = () => {
      setInViewport(true);
      htmlRef.current?.classList.add('custom-cursor-active');
    };

    const onMouseLeave = () => {
      setInViewport(false);
      htmlRef.current?.classList.remove('custom-cursor-active');
    };

    const onMouseOut = (e) => {
      if (!e.relatedTarget) {
        setInViewport(false);
        htmlRef.current?.classList.remove('custom-cursor-active');
      }
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);

    rafRef.current = requestAnimationFrame(animate);

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    const onVisibilityChange = () => {
      if (document.hidden) {
        setInViewport(false);
        htmlRef.current?.classList.remove('custom-cursor-active');
      }
    };

    const onBlur = () => {
      setInViewport(false);
      setIsPressed(false);
      htmlRef.current?.classList.remove('custom-cursor-active');
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('blur', onBlur);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('blur', onBlur);
      htmlRef.current?.classList.remove('custom-cursor-active');
    };
  }, [animate, isInteractive]);

  const show = visible && inViewport;

  return (
    <div
      className={`custom-cursor ${show ? 'visible' : ''} ${isHovering ? 'hover' : ''} ${isPressed ? 'active' : ''}`}
      style={{
        left: position.x,
        top: position.y,
        '--offset-x': `-${offsetX}px`,
        '--offset-y': `-${offsetY}px`,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 28 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
      >
        {/*
          Reference-matched pointer: tip on RIGHT, body on LEFT
          • Sharp tip at right (click point)
          • Broad base on left
          • Distinctive notch, clear directional geometry
          • White stroke #fff, black fill #000
          • Rounded corners via stroke-linejoin
        */}
        <path
          d="M 4 4 L 4 18 L 12 14 L 26 8 L 12 4 Z"
          fill="#000000"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
