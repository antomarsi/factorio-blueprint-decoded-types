import { inflate } from "pako";
import { BlueprintType } from "./native";


export enum BLUEPRINT_TYPES {
    BLUEPRINT_BOOK = "blueprint_book",
    BLUEPRINT = "blueprint",
    UPGRADE_PLANNER= "upgrade_planner",
    DECONSTRUCTION_PLANNER = "deconstruction_planner"
}

class BlueprintDecoder {
    public readonly encodedText: string;

    public decodedBlueprint: BlueprintType;
    public blueprintType: BLUEPRINT_TYPES;
    public versionString: string;

    constructor(encodedText: string) {
        this.encodedText = encodedText;
        this.decodedBlueprint = this.convertEncodedTextToObject(this.encodedText);

        if ("blueprint_book" in this.decodedBlueprint) {
            this.blueprintType = BLUEPRINT_TYPES.BLUEPRINT_BOOK;
            this.versionString = this.parseVersion(this.decodedBlueprint.blueprint_book.version)
        } else if ("blueprint" in this.decodedBlueprint) {
            this.blueprintType = BLUEPRINT_TYPES.BLUEPRINT
            this.versionString = this.parseVersion(this.decodedBlueprint.blueprint.version)
        } else if ("upgrade_planner" in this.decodedBlueprint) {
            this.blueprintType = BLUEPRINT_TYPES.UPGRADE_PLANNER;
            this.versionString = this.parseVersion(this.decodedBlueprint.upgrade_planner.version)
        } else if ("deconstruction_planner" in this.decodedBlueprint) {
            this.versionString = this.parseVersion(this.decodedBlueprint.deconstruction_planner.version)
            this.blueprintType = BLUEPRINT_TYPES.DECONSTRUCTION_PLANNER
        } else {
            throw new Error("Invalid blueprint type")
        }
    }

    public validate() {
        return this.decodedBlueprint !== undefined;
    }

    public convertEncodedTextToObject(encodedText: string): BlueprintType {
        try {
            const jsonString: string = BlueprintDecoder.decodeV15Base64(this.encodedText);
            return JSON.parse(jsonString);
        }
        catch (e) {
            throw new Error("Invalid Blueprint")
        }
    }

    public parseVersion(versionNumber: number): string {
        const version = BigInt(versionNumber);
        const parts = [];
        for (let i = 0; i < 4; i++) {
            // Extract each 16-bit chunk
            const part = Number((version >> BigInt(48 - i * 16)) & BigInt(0xffff));
            parts.push(part);
        }

        // Remove trailing zeros
        while (parts.length > 1 && parts[parts.length - 1] === 0) {
            parts.pop();
        }

        return parts.join('.');
    }

    static decodeV15Base64(string: string): string {
        const binary: string = atob(string.slice(1));
        const arrayBuffer: Uint8Array = new Uint8Array(new ArrayBuffer(binary.length));
        for (let i = 0; i < binary.length; i++) {
            arrayBuffer[i] = binary.charCodeAt(i);
        }

        const unzipped: Uint8Array = inflate(arrayBuffer);
        return BlueprintDecoder.fromCharCode(unzipped);
    }

    static fromCharCode(bytes: Uint8Array): string {
        let result = '';
        for (let i = 0; i < bytes.byteLength; i++) {
            result += String.fromCharCode(bytes[i]);
        }
        return result;
    }
}

export default BlueprintDecoder;