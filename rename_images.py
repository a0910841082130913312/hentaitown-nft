import glob
import shutil
import random

fns = list(glob.glob('img_prefinal/*'))
random.shuffle(fns)
for i, fn in enumerate(fns):
  shutil.copyfile(fn, 'img_final/'+str(i+1)+'.jpg')