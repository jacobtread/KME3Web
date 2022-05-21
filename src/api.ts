const baseUrl = 'http://localhost/panel/api'

export interface Player {
    id: number;
    email: string;
    displayName: string;
    settings: PlayerSettingsBase;
}

export async function getPlayers(): Promise<Player[]> {
    const response = await fetch(`${baseUrl}/players`)
    const json = await response.json()
    return json as Player[]
}
export async function getPlayerOtherSettings(id: number): Promise<OtherSettings> {
    const response = await fetch(`${baseUrl}/playerSettings?id=${id}`)
    const json = await response.json()
    return json as OtherSettings
}

export interface PlayerSettingsBase {
    credits: number;
    creditsSpent: number;
    gamesPlayed: number;
    secondsPlayed: number;
    inventory: string;
}

export type OtherSettings = Record<string, string>

interface PlayerCharacter {
    index: number;
    kitName: string;
    name: string;
    tint1: number;
    tint2: number;
    pattern: number;
    patternColor: number;
    pong: number;
    emissive: number;
    skinTone: number;
    secondsPlayed: number;
    timestampYear: number;
    timestampMonth: number;
    timestampDay: number;
    timestampSeconds: number;
    powers: string;
    hotkeys: string;
    weapons: string;
    weaponMods: string;
    deployed: string;
    leveledUp:String;
}