import { mkdirSync, rmSync } from "fs";
import path from "path";

/* 
	Clean the data directory
*/
const dataPath = path.resolve("./data");
try {
	rmSync(dataPath, { recursive: true });
} catch (e) {}

/*
	Make sure folders exist
*/
mkdirSync("data/content", { recursive: true });
mkdirSync("data/media", { recursive: true });
mkdirSync("data/usync", { recursive: true });
