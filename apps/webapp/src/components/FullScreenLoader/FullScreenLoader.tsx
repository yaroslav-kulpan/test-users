import { Spinner } from "../Spinner";
import React from "react";

export function FullScreenLoader() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-70">
      <div className="absolute inset-0 flex items-center justify-center">
        <Spinner />
      </div>
    </div>
  );
}
