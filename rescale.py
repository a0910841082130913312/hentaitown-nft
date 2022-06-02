import os
import glob
import subprocess
from PIL import Image, ImageOps

target_size = 800
for i, fn in enumerate(glob.glob('img_squared_pruned/*.jpg')):
  print(i)
  fn_out = fn.replace('pruned', 'pruned_rescaled')
  im = Image.open(fn)
  width, _ = im.size
  if width >= target_size:
    if width > target_size:
      im = im.resize((target_size, target_size))
    im.save(fn_out)
  else:
    cmd = ' '.join(['waifu2x', '--input', fn, '--output', 'tmp/tmp.png', '--scale_ratio', str(int(600/width) + 1)])
    subprocess.call(cmd, shell=True)
    fn_tmp = list(glob.glob('tmp/*.png'))[0]
    im2 = Image.open(fn_tmp)
    im2 = im2.resize((target_size, target_size))
    im2.save(fn_out.replace('jpg', 'png'))
    os.remove(fn_tmp)