export interface PatchCollection {
  patches: unknown[];
  inversePatches: unknown[];
  undo: () => void;
}

export interface PatchResult {
  patchResult: PatchCollection;
  endpointName: string;
  originalArgs: any;
}
