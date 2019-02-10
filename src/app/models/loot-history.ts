export interface LootHistory {
  id?: string;
  date: number;
  loot?: string;
  crew: string[];
  price?: number;
  soldByAlliance: boolean;
}
