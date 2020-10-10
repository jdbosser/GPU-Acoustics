
# GPU-Acoustics

This project demonstrates a prototype me (John Daniel Bossér) and my 
father (Lennart Bertil Bossér) made for the International Conference on
Underwater Acoustics (ICUA). The paper about this project can be found 
[here](https://asa.scitation.org/doi/abs/10.1121/2.0001301). 

![Demo image](https://github.com/jdbosser/GPU-Acoustics/raw/master/images/demo.png)

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


