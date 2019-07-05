with import <nixpkgs> {};

with pkgs;
let 
  my-python-packages = python-packages: with python-packages; [
    numpy
    (matplotlib.override {enableTk = true;})
    jupyter
  ];
  python-with-my-packages = python3.withPackages my-python-packages;
in
stdenv.mkDerivation rec {
  name = "Python_Enviroment";
  env = buildEnv {name = name; paths = buildInputs; };
  buildInputs = [python-with-my-packages];
}
