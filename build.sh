#!/usr/bin/env bash
set -euo pipefail

# Always run from this script's location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "Building wasm-drive-verify..."

# Build the Rust WASM target
echo "Building Rust WASM target..."
cargo build --target wasm32-unknown-unknown --release \
  --config 'profile.release.panic="abort"' \
  --config 'profile.release.strip=true' \
  --config 'profile.release.debug=false' \
  --config 'profile.release.incremental=false' \
  --config 'profile.release.lto=true' \
  --config 'profile.release.opt-level="z"' \
  --config 'profile.release.codegen-units=1' \

# Create pkg directory if it doesn't exist
mkdir -p pkg

if command -v wasm-snip &> /dev/null; then
  wasm-snip ./target/wasm32-unknown-unknown/release/wasm_drive_verify.wasm -o ./target/wasm32-unknown-unknown/release/wasm_drive_verify.wasm --snip-rust-fmt-code --snip-rust-panicking-code
fi

# Run wasm-bindgen
echo "Running wasm-bindgen..."
if ! command -v wasm-bindgen &> /dev/null; then
  echo "Error: 'wasm-bindgen' not found. Install via 'cargo install wasm-bindgen-cli'." >&2
  exit 1
fi
wasm-bindgen \
  --typescript \
  --out-dir=pkg \
  --target=web \
  --omit-default-module-path ./target/wasm32-unknown-unknown/release/wasm_drive_verify.wasm

if command -v wasm-opt &> /dev/null; then
  echo "Optimizing wasm using Binaryen"
  wasm-opt \
      --code-folding \
      --const-hoisting \
      --abstract-type-refining \
      --dce \
      --strip-producers \
      -Oz \
      --generate-global-effects \
      --enable-bulk-memory \
      --enable-nontrapping-float-to-int  \
      -tnh \
      --flatten \
      --rereloop \
      -Oz \
      --converge \
      --vacuum \
      --dce \
      --gsi \
      --inlining-optimizing \
      --merge-blocks \
      --simplify-locals \
      --optimize-added-constants \
      --optimize-casts \
      --optimize-instructions \
      --optimize-stack-ir \
      --remove-unused-brs \
      --remove-unused-module-elements \
      --remove-unused-names \
      --remove-unused-types \
      --post-emscripten \
      -Oz \
      -Oz \
      "pkg/wasm_drive_verify_bg.wasm" \
      -o \
      "pkg/wasm_drive_verify_bg.wasm"
else
  echo "wasm-opt command not found. Skipping wasm optimization."
fi

echo "Converting wasm binary into base64 module"
WASM_BUILD_BASE_64=$(base64 -i "pkg/wasm_drive_verify_bg.wasm")
echo 'export const wasmBase64 = "'${WASM_BUILD_BASE_64}'"' > "pkg/wasm_drive_verify_bg.js"
echo 'export { wasmBase64 } from "./wasm_drive_verify_bg.js"' >> ./pkg/wasm_drive_verify.js
echo 'export { wasmBase64 } from "./wasm_drive_verify_bg.js"' >> ./pkg/wasm_drive_verify.d.ts

echo "Build complete!"
echo "Output files are in the pkg/ directory"
