from math import *
import numpy as np
import time
import matplotlib.pyplot as plt


# Input parameters

R = 6.0         # radius
f = 2000.0     # frequency
c = 1500.0      # speed of sound

lamda = c/f     # wavelength
k = 2*pi/lamda  # wave number

# other parameters
mmax = 500             # "halva" antalet punkter i en koordinatriktning
n = 2*mmax + 1         # array dimension, vill ha ett udda antal
step = R/mmax          # avståndsteg mellan enskilda punkter (i x eller y)
pixarea = R*R/(n*n)    # ytan av en pixel

xs = np.linspace(-R,R,n)      # x-koordinater
ys = np.linspace(-R,R,n)      # y-kordinater
elems = np.zeros((n,n), dtype = np.complex128)      # matrisen som lagrar elementbidrag

# z-koordinaten för punkt (i,j) på sfären
# här tänker jag mig en indexering från -mmax till mmax
def z(R,x,y):
    try:
        sq = sqrt(R*R - x*x - y*y)  
    except:
        print 'exception',  R, x ,y
        sq = 0
    return sq

        
# normalvinkeln för punkt (i,j) på sfären
# här tänker jag mig en indexering från -mmax till mmax
def cosfi(R,x,y):
    return z(R,x,y)/R

# projicerad area för en pixel sfären   
# här tänker jag mig en indexering från -mmax till mmax
def projarea(R,x,y):
    return pixarea/cosfi(R,x,y)

# ligger punkten x,y på projicveringen av en sfär med radien R?
def inrange(R,x,y):
    return (x*x + y*y) < (R*R)


# beräkna alla elementbidrag och lagra värden i matrisen
def fill_array():
    for i in range(n):
        x = xs[i]
        for j in range(n):
            y = ys[j]
            if inrange(R,x,y):
                try:
# Man behövde inte göra något märkvärdigt med projektionen, så följande två rader bortkommenterade                    
#                    a = projarea(x,y)
#                    a = pixarea*cosfi(x,y)
                    a = pixarea
                    val = 4*a/lamda  # intensiteten (varför 4*?)
                    phase = -2*k*(9-z(R,x,y))
                    elems[i,j] = val*complex(cos(phase), sin(phase))
                except:
                    print x,y,a

# kolla beräkningstid för en frekvens                    
def run_time_test():
    print 'lambda', lamda
    start_time = time.time()
    fill_array();    
    fill_time = time.time()    
    res = abs(np.sum(elems))**2
    res_time = time.time()
    print res
    print 'fill time', (fill_time - start_time)
    print 'sum time', (res_time - fill_time)


""" n is the number of points """
def sphere_TS(radius,n,frequency):
    N = 2*trunc(n/2) + 1    # I want an odd number
    lamda = c/frequency
    k = 2*pi/lamda
    xs = np.linspace(-radius,radius,N)
    ys = np.linspace(-radius,radius,N)
    elems = np.zeros((N,N), dtype = np.complex128)      # element contributions
    pixarea = 4*radius*radius/(N*N)    
    """
    print 'n',n
    print 'N',N
    print 'radius',radius
    print 'freq',frequency
    print 'lambda', lamda
    print 'k',k
    """
    print 'freq',frequency
    
    #elems = np.zeros((N,N), dtype = np.complex64)      # element contributions
    for i in range(N):
        x = xs[i]
        for j in range(N):
            y = ys[j]
            if inrange(radius,x,y):
                try:
#                    a = projarea(x,y)
#                    a = pixarea*cosfi(x,y)
                    a = pixarea
                    val = a/lamda  
                    phase = -2*k*(999-z(radius,x,y))
                    elems[i,j] = val*complex(cos(phase), sin(phase))
                except:
                    print x,y,a
    return abs(np.sum(elems))**2

def plot_sphere():
    n = 2000
    radius = 2.0
    c = 1500.0 # speed of sound

    freqs = np.logspace(1,5, num = 50) # öka num för noggrannare plott
    print freqs
    plt.xscale('log')
    plt.yscale('log')
    #print sphere_TS(2.0,1000,10000.0)

    plt.plot(freqs, [sphere_TS(radius,n,f) for f in freqs])
    plt.show()

def square_TS(a,b,n,frequency,angle = 0.0):
    N = 2*trunc(n/2) + 1    # I want an odd number
    xs = np.linspace(-a/2,a/2,N)
    ys = np.linspace(-b/2,b/2,N)
    lamda = c/frequency
    k = 2*pi/lamda
    elems = np.zeros((N,N), dtype = np.complex64)      # element contributions
    pixarea = a*b/(N*N)
    """
    print 'a',a
    print 'b',b
    print 'lambda', lamda
    print 'pixarea',pixarea
    """
    print angle*180/pi
    
    for i in range(N):
        x = xs[i]
        for j in range(N):
            y = ys[j]
            try:
#                a = projarea(x,y)
                a = pixarea
                val = a*cos(angle)/lamda  
                phase = -2*k*(x*sin(angle))
                elems[i,j] = val*complex(cos(phase), sin(phase))
            except:
                print x,y,a
    return abs(np.sum(elems))**2

def plot_rect():
    c = 1500.0
    a = 2.0
    b = 1.02
    freq = 10000.0
    angle = 0
    n = 1000
    print square_TS(a,b,n,freq, 0.0)

    # ovanstående stämmer bra för vinkeln 0


    angles = np.linspace(0,pi/2,900)   #1/10 grads upplösning
    plt.plot(angles*180/pi, [10*log10(square_TS(a,b,n,freq,angle)) for angle in angles])
    plt.show()



#run_time_test()    # Avkommentera för att köra testet
#plot_sphere()      # avkommentera för att köra testet
#plot_rect()        # avkommentera för att köra testet    
