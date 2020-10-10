import sys
import json
import matplotlib.pyplot as plt

def logplot(x,y):
    plt.semilogx(x,y)
    plt.title("TS for sphere with 2m radius") 
    plt.xlabel("Frequency [Hz]")
    plt.ylabel("TS [dB]")
    plt.grid(True, which="both")

folder = "precalculated/" 

# Open the file
filename = folder + "2msphereDiffFreqsTS.json"
with open(filename, 'r') as f:
    read_data = f.read()
    json_data = json.loads(read_data) 
    logplot(json_data['x'], json_data['y'])
    plt.savefig("pngs/2msphereDiffFreqTS.png", format="png") 
    plt.savefig("svgs/2msphereDiffFreqTS.svg", format="svg") 

filename = folder + "2msphereDiffFreqsTS200x200.json"
with open(filename, 'r') as f:
    read_data = f.read()
    json_data = json.loads(read_data) 
    plt.clf()
    logplot(json_data['x'], json_data['y'])
    plt.savefig("pngs/2msphereDiffFreqTS200x200.png", format="png") 
    plt.savefig("svgs/2msphereDiffFreqTS200x200.svg", format="svg") 

filename = folder + "2msphereDiffFreqsTS2000x2000.json"
with open(filename, 'r') as f:
    read_data = f.read()
    json_data = json.loads(read_data) 
    plt.clf()
    logplot(json_data['x'], json_data['y'])
    plt.savefig("pngs/2msphereDiffFreqTS2000x2000.png", format="png") 
    plt.savefig("svgs/2msphereDiffFreqTS2000x2000.svg", format="svg") 

filename = folder + "rotateTSSubmarine.json"
with open(filename, 'r') as f:
    read_data = f.read()
    json_data = json.loads(read_data) 
    plt.clf()
    plt.plot(json_data['x'], json_data['y'])
    plt.xlabel("Angle [rad]");
    plt.ylabel("TS [dB]")
    plt.savefig("pngs/" + "rotateTSSubmarine.png", format="png") 
    plt.savefig("svgs/" + "rotateTSSubmarine.svg", format="svg") 

filename = folder + "2msphereDiffFreqsTScomplexMaterial.json"
with open(filename, 'r') as f:
    read_data = f.read()
    json_data = json.loads(read_data) 
    plt.clf()
    logplot(json_data['x'], json_data['y'])
    plt.savefig("pngs/" + "2msphereDiffFreqsTScomplexMaterial.png", format="png") 
    plt.savefig("svgs/" + "2msphereDiffFreqsTScomplexMaterial.svg", format="svg") 

