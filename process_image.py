from PIL import Image
import numpy as np

def make_transparent(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    
    # Sample corner pixel to determinate background color
    bg_color = data[0, 0]
    
    # Create mask for pixels that match background (allowing slight variance)
    tolerance = 30
    diff = np.abs(data[:, :, :3] - bg_color[:3])
    mask = np.all(diff < tolerance, axis=2)
    
    # Set alpha to 0 for matching pixels
    data[mask, 3] = 0
    
    # Also crop the circle strictly? 
    # Let's just create a circular mask to be safe
    height, width = data.shape[:2]
    y, x = np.ogrid[:height, :width]
    center_y, center_x = height // 2, width // 2
    radius = min(center_x, center_y)
    
    # Circular mask: Keep inside circle, make outside transparent
    circle_mask = (x - center_x)**2 + (y - center_y)**2 > radius**2
    data[circle_mask, 3] = 0
    
    result = Image.fromarray(data)
    result.save(output_path)
    print(f"Processed image saved to {output_path}")

try:
    make_transparent("assets/globe_round.png", "assets/globe_final.png")
except Exception as e:
    print(f"Error: {e}")
