import glob
from PIL import Image

fns = glob.glob('img_squared_pruned_rescaled/*')
for fn in fns:
  Image.open(fn).resize((500, 500)).save(fn.replace('img_squared_pruned_rescaled', 'img_squared_pruned_rescaled_good_downscaled'))