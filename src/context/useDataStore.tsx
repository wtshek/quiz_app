import { useContext } from "react";
import { DataStoreContext } from "./DataStore";

export const useDataStore = () => useContext(DataStoreContext);
