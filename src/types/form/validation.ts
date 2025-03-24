import {RegisterOptions, FieldValues, Path} from "react-hook-form";

/**
 * Type générique pour la validation des formulaires
@template T
*/
export type ValidationRules<T extends FieldValues> = {
  [K in Path<T>]: Omit<RegisterOptions<T, K>, "valueAsNumber" | "valueAsDate" | "setValueAs">;
};
