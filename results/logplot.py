import sys
import json
import matplotlib.pyplot as plt

def logplot(x,y):
    plt.semilogx(x,y)
    plt.title("TS for sphere with 2m radius") 
    plt.xlabel("Frequency [Hz]")
    plt.ylabel("TS [dB]")
    plt.grid(True, which="both")

filename = sys.argv[1]
with open(filename, 'r') as f:
    read_data = f.read()
    json_data = json.loads(read_data) 
    logplot(json_data['x'], json_data['y'])
    plt.show();

