import { type SchemaTypeDefinition } from "sanity";
import { creator, collection } from "./schemas";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [creator, collection],
};
