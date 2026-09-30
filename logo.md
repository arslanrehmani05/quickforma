# QuickForma Official Brand Logo Suite

This document contains the official logo specifications and raw source code for **QuickForma** in **SVG, PNG, and JPG** formats.

---

## 🎨 1. Primary Blue/Indigo Icon (SVG)

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect x="32" y="32" width="448" height="448" rx="128" ry="128" fill="#4f46e5"/>
  <path d="M 288 80 L 144 288 L 256 288 L 224 432 L 368 224 L 256 224 Z" fill="#FFFFFF"/>
</svg>
```

---

## 🎨 2. Monochrome Black Icon (SVG)

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect x="32" y="32" width="448" height="448" rx="128" ry="128" fill="#000000"/>
  <path d="M 288 80 L 144 288 L 256 288 L 224 432 L 368 224 L 256 224 Z" fill="#FFFFFF"/>
</svg>
```

---

## 🎨 3. Horizontal Full Logo (SVG)

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 320" width="1200" height="320">
  <g transform="translate(40, 20)">
    <rect x="16" y="16" width="248" height="248" rx="72" ry="72" fill="#4f46e5"/>
    <path d="M 158 44 L 78 158 L 140 158 L 122 236 L 202 122 L 140 122 Z" fill="#FFFFFF"/>
  </g>
  <text x="340" y="188" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-weight="800" font-size="112" fill="#000000" letter-spacing="-3">QuickForma</text>
</svg>
```

---

## 🖼️ 4. PNG & JPG Format Conversion Guide

To convert the SVG code above to PNG or JPG:

### Using Web Browser:
1. Save any SVG code block above as a file named `logo.svg`.
2. Open `logo.svg` in Chrome, Safari, or Firefox.
3. Right-click and choose **Save Image As...** to save as PNG or JPG.

### Using Python (Pillow):
```python
from PIL import Image, ImageDraw

def generate_logo_png(size=512, bg_color="#4f46e5", output_format="PNG"):
    img = Image.new("RGBA" if output_format == "PNG" else "RGB", (size, size), (255, 255, 255, 0 if output_format == "PNG" else 255))
    draw = ImageDraw.Draw(img)
    padding = int(size * 0.08)
    radius = int(size * 0.25)
    draw.rounded_rectangle([padding, padding, size - padding, size - padding], radius=radius, fill=bg_color)
    pts = [
        (size * 0.56, size * 0.16),
        (size * 0.28, size * 0.56),
        (size * 0.50, size * 0.56),
        (size * 0.44, size * 0.84),
        (size * 0.72, size * 0.44),
        (size * 0.50, size * 0.44)
    ]
    draw.polygon(pts, fill=(255, 255, 255))
    img.save(f"quickforma-logo.{output_format.lower()}", format=output_format)

generate_logo_png(512, "#4f46e5", "PNG")
generate_logo_png(512, "#4f46e5", "JPEG")
```
