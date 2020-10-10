
# GPU-Acoustics

This project demonstrates a prototype me (John Daniel Bossér) and my 
father (Lennart Bertil Bossér) made for the International Conference on
Underwater Acoustics (ICUA). The paper about this project can be found 
[here](https://asa.scitation.org/doi/abs/10.1121/2.0001301). 

![Demo image](https://github.com/jdbosser/GPU-Acoustics/raw/master/images/demo.png)

Some addititional implementation notes can be found in the `latex` folder. 

# Running the project

## Dependiencies 

To run the project, you need a modern web-browser with support for WebGL. 
The project has only been tested in recent versions of `firefox`, but
other modern browsers should in theory be supported. 

Other dependencies include `python3` to start a server that hosts the 
application and to plot the produced results. 


## Create a python virtualenvironment and run the project

It is a common practice to create an isolated python environment to install the 
requirements. To install everything python-related needed to run the project, 
do the following:

Create a python environment named `env`:
```
python3 -m venv env
source env/bin/activate
```
To install the requirements to run the project
```
pip install -r requirements.txt
```

You should now be able to run the project:
```
./run.sh
```
and open the project in a webbrowser. If you have firefox, you can run:
```
firefox localhost:8000
```

To leave the virtualenvironment when you are done with your experiments, run
```
deactivate
```

## Usage

The program shows two different views. 
+ Left: **Control view**. Here, you can view your uploaded module, zoom in and out, and rotate. Note that you are actually not rotating the model in relation to the incoming acoustic signal. You are only viewing the geometry from a different angle. 
+ Right: **Computation view**. This image is the actual image used to compute the target strength, see equation (2) in the [conference paper](https://asa.scitation.org/doi/abs/10.1121/2.0001301).

To get a different incoming angle towards the model, you need to rotate the model itself. This can be done from the **control panel** in the top right corner. 

### Control panel

The control panel also allows you to change
+ Wavelength
+ Phaseshift
+ Turn of automatic calculation of TS (speeds up the program)
+ Turn on visibility of the GPU-camera, which creates the image used to calculate the TS. 
+ Model rotation and material. **Note that you need to use the *complex* material in order to get correct TS values.**

You can also trigger routines from the control panel:
+ **"r = 2m"** sphere test calculates the target strength of a sphere with a radius of 2 meters for different wavelengths. This routine creates the data presented in figure 2 in the [conference paper](https://asa.scitation.org/doi/abs/10.1121/2.0001301).
+ **"TS for every degree"**: Calculates the target strength for every whole angle between 0 and 360. 
+ **"TS for every wavelength"**: Calculates the TS for all wavelengths between 10 Hz and 100000 Hz.

The routines create `.json` files that the user is prompted to download. These 
files contains TS and either the corresponding wavelength or angle. 

### Plotting the results

Example files to parse and plot the results are provided in the `results` folder. 

After running one of routines, you will be prompted to download a file. 
You can place this file with the name `<filename>.json` in the `results` folder
and then plot it by running 
```
python logplot.py <filename>.json 
```
```
python polarplot.py <filename>.json 
```
```
python sweeplot.py <filename>.json 
```

Some premade calculations exists in the `results/precalculated`-folder. These
can be plotted by running 
```
python plot_precalculated.py
```

### Change model

You can change the model by clicking "Upload 3D-model" in the top left corner. Only `.stl` files are supported currently. 

# Citation

If you want to use the results from this project, or make a continuation of 
it, please cite it by using the following BibTex:
```
@article{doi:10.1121/2.0001301,
author = {Bossér,Lennart Bertil  and Bossér,John Daniel },
title = {Target Strength Calculation using the Graphics Pipeline},
journal = {Proceedings of Meetings on Acoustics},
volume = {40},
number = {1},
pages = {070004},
year = {2020},
doi = {10.1121/2.0001301},

URL = { 
        https://asa.scitation.org/doi/abs/10.1121/2.0001301
    
},
eprint = { 
        https://asa.scitation.org/doi/pdf/10.1121/2.0001301
    
}

}
```


