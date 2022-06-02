import glob
from PIL import Image, ImageOps

widths = []
for i, fn in enumerate(glob.glob('img_squared_pruned/*.jpg')):
  #print(i)
  im = Image.open(fn)
  width, _ = im.size
  widths.append(width)
print(widths)
print(min(widths))
print(len(list(w for w in widths if w >= 300)))
print(max(widths))