import "three-stdlib";

declare module "three-stdlib" {
  interface TransformControls {
    addEventListener(type: "dragging-changed", listener: (event: { value: boolean }) => void): void;
    removeEventListener(
      type: "dragging-changed",
      listener: (event: { value: boolean }) => void
    ): void;
  }
}
