from PIL import Image, ImageDraw, ImageFilter
import numpy as np

def crop_circle_antialiased(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # Create a circular mask (L mode)
    # We make it slightly smaller than full size to cut off background artifacts
    mask = Image.new('L', (width, height), 0)
    draw = ImageDraw.Draw(mask)
    
    center_x, center_y = width // 2, height // 2
    radius = min(center_x, center_y) - 5  # Contract by 5px to avoid edge artifacts
    
    # Draw solid white circle
    draw.ellipse((center_x - radius, center_y - radius, center_x + radius, center_y + radius), fill=255)
    
    # Slight blur for anti-aliasing
    # mask = mask.filter(ImageFilter.GaussianBlur(1)) 
    # Actually, standard drawing is usually jagged. Let's supersample or just rely on CSS for the curve.
    # A simple mask is safer than complex logic if the background is black.
    
    # Apply mask
    img.putalpha(mask)
    
    # Crop to bounding box of non-zero alpha
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(output_path)
    print(f"Saved clean globe to {output_path}")

try:
    crop_circle_antialiased("assets/globe_large_raw.png", "assets/globe_final_v2.png")
except Exception as e:
    print(f"Error: {e}")
