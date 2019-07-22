import sys
import json
import matplotlib.pyplot as plt

filename = sys.argv[1]

with open(filename, 'r') as f:
    read_data = f.read()
    json_data = json.loads(read_data) 
    plt.plot(json_data['x'], json_data['y'])
    plt.xlabel("x");
    plt.ylabel("TS [dB]")
    plt.show()

