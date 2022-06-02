import glob
import random
from PIL import Image

dim = 200
cols = 6
rows = 6
width = cols * dim
height = rows * dim

def create_collage(listofimages):
  thumbnail_width = width//cols
  thumbnail_height = height//rows
  size = thumbnail_width, thumbnail_height
  new_im = Image.new('RGB', (width, height))
  ims = []
  for p in listofimages:
    im = Image.open(p)
    im.resize((dim, dim))
    im.thumbnail(size)
    ims.append(im)
  i = 0
  x = 0
  y = 0
  for col in range(cols):
    for row in range(rows):
      print(i, x, y)
      new_im.paste(ims[i], (x, y))
      i += 1
      y += thumbnail_height
    x += thumbnail_width
    y = 0
  new_im.save("preview.jpg")

fns = list(glob.glob('img_squared_pruned_rescaled/*'))
fns = random.sample(fns, cols*rows)
create_collage(fns)