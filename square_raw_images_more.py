import glob
from PIL import Image, ImageOps

for i, fn in enumerate(glob.glob('img_raw_more/*.jpg')):
  print(i)
  im = Image.open(fn)
  width, height = im.size
  if width < height:
    amount = height - width
    if amount % 2 == 0:
      c1, c2 = amount/2, amount/2
    else:
      c1, c2 = int(amount/2), int(amount/2) + 1
    im = ImageOps.crop(im, (0, c1, 0, c2))
  elif width > height:
    amount = width - height
    if amount % 2 == 0:
      c1, c2 = amount/2, amount/2
    else:
      c1, c2 = int(amount/2), int(amount/2) + 1
    im = ImageOps.crop(im, (c1, 0, c2, 0))
  try:
    im.save(fn.replace('img_raw_more', 'img_squared_more'))
  except:
    im.save(fn.replace('img_raw_more', 'img_squared_more').replace('.jpg', '.png'))