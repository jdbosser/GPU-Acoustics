import sys
import json
import matplotlib.pyplot as plt

def logplot(x,y):
    plt.semilogx(x,y)
    plt.title("TS for sphere with 2m radius") 
    plt.xlabel("Frequency [Hz]")
    plt.ylabel("TS [dB]")
    plt.grid(True, which="both")

# Open the file
filename = "2msphereDiffFreqsTS.json"
with open(filename, 'r') as f:
    read_data = f.read()
    json_data = json.loads(read_data) 
    logplot(json_data['x'], json_data['y'])
    plt.savefig("pngs/2msphereDiffFreqTS.png", format="png") 
    plt.savefig("svgs/2msphereDiffFreqTS.png", format="svg") 
