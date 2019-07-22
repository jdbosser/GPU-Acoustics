import sys
import math
import json
import matplotlib.pyplot as plt

filename = sys.argv[1]
with open(filename, 'r') as f:
    read_data = f.read()
    json_data = json.loads(read_data) 
    ax = plt.subplot(111, projection = 'polar')
    x_axis = json_data['x'] + list(map(lambda x: x + math.pi, json_data['x']))
    y_axis = json_data['y'] + list(reversed(json_data['y']))
    ax.plot(x_axis, y_axis)
    ax.grid(True)
    plt.show()

