import random
import glob
import imageio
from PIL import Image

fns = random.sample(glob.glob('img_final/*'), 100)
images = []
for fn in fns:
  im = Image.open(fn)
  im = im.resize((150, 150))
  im.save(fn.replace('img_final', 'img_gif'))
fns = glob.glob('img_gif/*')
for fn in fns:
  images.append(imageio.imread(fn))
imageio.mimsave('movie.gif', images)