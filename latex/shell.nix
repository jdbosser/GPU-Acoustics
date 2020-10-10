with import <nixpkgs> {};

let 
  tex_packages = ( texlive.combine {
    inherit (texlive) comment caption enumitem listings scheme-basic hyperref; # Other packages goes here
  });
in
stdenv.mkDerivation rec {
  name = "env";
  env = buildEnv { name = name; paths = buildInputs; };
  buildInputs = [
    tex_packages
  ];
}
