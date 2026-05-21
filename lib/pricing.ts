export type Mode = 'min' | 'default' | 'max';

export interface PricingItem {
  id: string;
  name: string;
  desc: string;
  unit: string;
  min: number;
  default: number;
  max: number;
}

export const PRICING: Record<string, PricingItem[]> = {
  exposure: [
    { id: 'ex_cream', name: 'Cream', desc: 'No aggregate exposed. Smooth cement-paste finish, modern minimal look.', unit: 'm²', min: 50, default: 55, max: 60 },
    { id: 'ex_sp', name: 'Salt & Pepper', desc: 'Light grind. Fine speckled aggregate visible. Most popular for residential.', unit: 'm²', min: 60, default: 65, max: 70 },
    { id: 'ex_med', name: 'Medium Exposure', desc: 'Mix of fine and medium aggregate revealed. Bolder, textural look.', unit: 'm²', min: 70, default: 75, max: 80 },
    { id: 'ex_full', name: 'Full Exposure', desc: 'Deep grind. Full aggregate visible — terrazzo-like statement floor.', unit: 'm²', min: 80, default: 85, max: 90 },
  ],
  grit: [
    { id: 'gt_basic', name: 'Basic Grind', desc: 'No polish — raw ground finish. Industrial / warehouse aesthetic.', unit: 'm²', min: 0, default: 0, max: 0 },
    { id: 'gt_honed', name: 'Honed (120 Grit)', desc: 'Matte / satin. No reflection. Refined natural concrete look.', unit: 'm²', min: 15, default: 20, max: 25 },
    { id: 'gt_400', name: '400 Grit', desc: 'Low sheen / soft satin. Most common residential finish.', unit: 'm²', min: 35, default: 40, max: 45 },
    { id: 'gt_800', name: '800 Grit', desc: 'Semi-gloss. Light reflection. Modern feature floors.', unit: 'm²', min: 45, default: 50, max: 55 },
    { id: 'gt_1500', name: '1500 Grit', desc: 'High gloss. Strong reflection and clarity.', unit: 'm²', min: 55, default: 60, max: 70 },
    { id: 'gt_3000', name: '3000 Grit', desc: 'Mirror finish. Premium showstopper. Slab condition must suit.', unit: 'm²', min: 70, default: 80, max: 95 },
  ],
  grouting: [
    { id: 'gr_single', name: 'Single Grout Pass', desc: 'For pinholes and minor surface imperfections.', unit: 'm²', min: 5, default: 7, max: 8 },
    { id: 'gr_double', name: 'Double Grout Pass', desc: 'Premium finish or porous concrete.', unit: 'm²', min: 10, default: 12, max: 15 },
  ],
  densifier: [
    { id: 'de_std', name: 'Standard Densifier', desc: 'Lithium densifier or similar standard hardener.', unit: 'm²', min: 5, default: 8, max: 10 },
    { id: 'de_prem', name: 'Premium Densifier System', desc: 'Higher spec system or extra application.', unit: 'm²', min: 10, default: 12, max: 15 },
  ],
  sealers: [
    { id: 'se_water', name: 'Water-Based Topical Sealer', desc: 'Basic acrylic or water-based topical seal.', unit: 'm²', min: 10, default: 10, max: 10 },
    { id: 'se_solv', name: 'Solvent-Based Topical Sealer', desc: 'Stronger finish, richer look, more gloss.', unit: 'm²', min: 15, default: 15, max: 15 },
    { id: 'se_pen', name: 'Impregnating / Penetrating Sealer', desc: 'Natural look, longer-term stain resistance.', unit: 'm²', min: 20, default: 20, max: 20 },
    { id: 'se_colour', name: 'Colour Enhancing Impregnating Sealer', desc: 'Premium. Darkens and enriches concrete.', unit: 'm²', min: 25, default: 25, max: 25 },
  ],
  prep: [
    { id: 'pr_minor', name: 'Minor Surface Prep', desc: 'Minor uneven areas, nibs and surface correction.', unit: 'm²', min: 25, default: 25, max: 25 },
    { id: 'pr_mod', name: 'Moderate Levelling', desc: 'Noticeable unevenness or extra preparation.', unit: 'm²', min: 35, default: 40, max: 45 },
    { id: 'pr_heavy', name: 'Heavy Levelling / Self Leveller', desc: 'Heavy floor correction. Materials may be extra.', unit: 'm²', min: 50, default: 55, max: 60 },
  ],
  cracks: [
    { id: 'cr_hairline', name: 'Hairline Crack Fill', desc: 'Included on premium jobs.', unit: 'm²', min: 0, default: 5, max: 5 },
    { id: 'cr_std', name: 'Standard Crack Repair', desc: 'Visible cracks. Charged per linear metre.', unit: 'LM', min: 15, default: 20, max: 25 },
    { id: 'cr_ext', name: 'Extensive Crack Repair', desc: 'Wider cracking, chasing, deeper fill.', unit: 'LM', min: 30, default: 40, max: 50 },
  ],
  patching: [
    { id: 'pa_min', name: 'Patching Minimal', desc: 'Small chips or isolated minor holes.', unit: 'm²', min: 10, default: 10, max: 10 },
    { id: 'pa_mod', name: 'Patching Moderate', desc: 'Multiple holes or moderate damage.', unit: 'm²', min: 20, default: 20, max: 20 },
    { id: 'pa_heavy', name: 'Patching Heavy', desc: 'Extensive damage, spalling or heavy patch.', unit: 'm²', min: 30, default: 40, max: 50 },
  ],
  other: [
    { id: 'ot_gen', name: 'Generator / Remote Power', desc: 'Site power unavailable or generator setup required.', unit: 'Job', min: 150, default: 200, max: 300 },
    { id: 'ot_access', name: 'Difficult Access', desc: 'Stairs, tight access, long ramps, extra labour.', unit: 'Job', min: 250, default: 400, max: 750 },
    { id: 'ot_furn', name: 'Furniture / Obstacle Moving', desc: 'Area not cleared before arrival.', unit: 'Hour', min: 80, default: 100, max: 120 },
  ],
  travel: [
    { id: 'tv_local', name: 'Travel 10–50km', desc: 'Per day for jobs outside immediate metro.', unit: 'Day', min: 150, default: 150, max: 150 },
    { id: 'tv_mid', name: 'Travel 50–100km', desc: 'Per day for outer metro / regional jobs.', unit: 'Day', min: 375, default: 375, max: 375 },
    { id: 'tv_far', name: 'Travel 100km+', desc: 'Per day for distant regional work.', unit: 'Day', min: 775, default: 775, max: 775 },
  ],
  dustRemoval: [
    { id: 'dr_min', name: 'Dust Removal — Minimal', desc: '5–10 bags of grinding waste.', unit: 'Job', min: 250, default: 250, max: 250 },
    { id: 'dr_med', name: 'Dust Removal — Medium', desc: '10–20 bags of grinding waste.', unit: 'Job', min: 500, default: 500, max: 500 },
    { id: 'dr_max', name: 'Dust Removal — Max', desc: '20+ bags of grinding waste.', unit: 'Job', min: 1000, default: 1000, max: 1000 },
  ],
  epoxyFlake: [
    { id: 'ef_ultra', name: 'Ultra Flake', desc: 'Durable epoxy flake system for garages, workshops and alfresco areas.', unit: 'm²', min: 75, default: 80, max: 85 },
    { id: 'ef_hyper', name: 'Hyper Flake', desc: 'Premium dense-blend epoxy flake system with stronger contrast and depth.', unit: 'm²', min: 90, default: 95, max: 100 },
  ],
};

export const CATEGORY_LABELS: Record<string, string> = {
  exposure: 'Exposure',
  grit: 'Smoothness',
  grouting: 'Grouting',
  densifier: 'Densifier',
  sealers: 'Sealer',
  prep: 'Prep & Levelling',
  cracks: 'Crack Repair',
  patching: 'Patching',
  other: 'Site Logistics',
  travel: 'Travel',
  dustRemoval: 'Dust Removal',
  epoxyFlake: 'Epoxy Flake',
};

export interface Selection {
  qty: number;
  auto: boolean;
  included?: boolean;
}

export interface QuoteState {
  client: { name: string; date: string; site: string; phone: string; email: string };
  area: number;
  mode: Mode;
  exposure: string | null;
  grit: string | null;
  selections: Record<string, Selection>;
  cashDiscount: boolean;
  customAdjust: number;
  notes: string;
}

export interface LineResult {
  category: string;
  name: string;
  unit: string;
  qty: number;
  rate: number;
  total: number;
  included?: boolean;
  baseRate?: number;
}

export interface CalcResult {
  lines: LineResult[];
  subtotal: number;
  cashDiscountAmount: number;
  customAdjust: number;
  adjustedSubtotal: number;
  gst: number;
  grandTotal: number;
  perM2: number;
  includedValue: number;
}

export function getRate(item: PricingItem, mode: Mode): number {
  return item[mode];
}

export function findItem(id: string): { item: PricingItem; category: string } | null {
  for (const cat of Object.keys(PRICING)) {
    const found = PRICING[cat].find(i => i.id === id);
    if (found) return { item: found, category: cat };
  }
  return null;
}

export function defaultQty(item: PricingItem, area: number): number {
  if (item.unit === 'm²') return area || 0;
  return item.unit === 'LM' ? 0 : 1;
}

export function calculate(state: QuoteState): CalcResult {
  const lines: LineResult[] = [];

  if (state.exposure) {
    const item = PRICING.exposure.find(i => i.id === state.exposure);
    if (item) {
      const rate = getRate(item, state.mode);
      const qty = state.area || 0;
      lines.push({ category: 'Exposure', name: item.name, unit: item.unit, qty, rate, total: qty * rate });
    }
  }

  if (state.grit) {
    const item = PRICING.grit.find(i => i.id === state.grit);
    if (item) {
      const rate = getRate(item, state.mode);
      const qty = state.area || 0;
      lines.push({ category: 'Smoothness', name: item.name, unit: item.unit, qty, rate, total: qty * rate });
    }
  }

  for (const [itemId, sel] of Object.entries(state.selections)) {
    const found = findItem(itemId);
    if (!found) continue;
    const baseRate = getRate(found.item, state.mode);
    const rate = sel.included ? 0 : baseRate;
    const qty = sel.qty ?? defaultQty(found.item, state.area);
    lines.push({
      category: CATEGORY_LABELS[found.category] ?? found.category,
      name: found.item.name,
      unit: found.item.unit,
      qty,
      rate,
      total: qty * rate,
      included: sel.included,
      baseRate,
    });
  }

  const subtotal = lines.reduce((s, l) => s + l.total, 0);
  const includedValue = lines.reduce((s, l) => s + (l.included ? (l.baseRate || 0) * l.qty : 0), 0);
  const cashDiscountAmount = state.cashDiscount ? subtotal * 0.05 : 0;
  const adjustedSubtotal = subtotal - cashDiscountAmount + (state.customAdjust || 0);
  const gst = state.cashDiscount ? 0 : adjustedSubtotal * 0.1;
  const grandTotal = adjustedSubtotal + gst;
  const perM2 = state.area > 0 ? adjustedSubtotal / state.area : 0;

  return {
    lines,
    subtotal,
    cashDiscountAmount,
    customAdjust: state.customAdjust || 0,
    adjustedSubtotal,
    gst,
    grandTotal,
    perM2,
    includedValue,
  };
}

export function fmt(n: number): string {
  return '$' + (Math.round(n * 100) / 100).toLocaleString('en-AU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
