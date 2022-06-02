import glob
from PIL import Image

fns = glob.glob('img_squared_pruned_rescaled_badsubset/*')
fns2 = glob.glob('img_squared_pruned/*')
for fn in fns:
  ident = fn.split('/')[-1].split('.')[0]
  fn_old = [fn for fn in fns2 if ident in fn][0]
  fn_new = fn_old.replace('img_squared_pruned', 'img_squared_pruned_rescaled_badsubset_retry')
  im = Image.open(fn_old)
  im = im.resize((500, 500))
  im.save(fn_new)