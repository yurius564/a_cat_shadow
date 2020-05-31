from PIL import Image

img = Image.open('image/map/map1.bmp')
img = img.convert('RGB')
pix = img.load()

pixel   = {}
first_y = 0
first_flag = True
for y in range(img.size[1]):
    for x in range(img.size[0]):
        if pix[x,y] == (255,255,255): # ignore white
            continue
        for px in pixel:
            if pix[x,y] == pixel[px][0]:
                if first_flag:
                    first_y = y # first pixel what counts
                    first_flag = False
                pixel[px][1].append([x,(y-first_y)])
                break
        else:
            pixel["tile_"+str(len(pixel.keys()))] = [pix[x,y],[]] # first appear

Z_DIM     = 1  # temporary
TILE_SIZE = 16 # temporary
with open("image/map/map1.txt", "w") as f: # "floor0,0,0,1\n"
    mapstr = ""
    for px in pixel:
        for coord in pixel[px][1]:
            mapstr += f"\"{px},{coord[0]*TILE_SIZE},{coord[1]*TILE_SIZE},{Z_DIM}\\n\"+\n"
    f.write(mapstr[:-5] + "\";")