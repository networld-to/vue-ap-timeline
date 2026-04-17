{
  description = "Vue AP Timeline - Vue.js ActivityPub Timeline Component";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      supportedSystems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      forAllSystems =
        f:
        nixpkgs.lib.genAttrs supportedSystems (
          system:
          f {
            pkgs = import nixpkgs { inherit system; };
          }
        );
    in
    {
      devShells = forAllSystems (
        { pkgs }:
        {
          default = pkgs.mkShell {
            buildInputs = with pkgs; [
              nodejs_24
              yarn
              typescript
            ];

            shellHook = ''
              echo "Node.js $(node --version)"
              echo "Yarn $(yarn --version)"
              echo "TypeScript $(tsc --version)"
            '';
          };
        }
      );
    };
}
