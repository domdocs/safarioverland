/**
 * Hard-coded "in-season right now" data, used by the home in-season strip.
 *
 * Phase 3 placeholder — each item is a region or signature event with a
 * status flag. Eventually this will be powered by a live data source
 * (operator reports, calendar feeds). Until then, edit this file when
 * conditions change month to month.
 */

export type ConditionStatus = "in" | "shoulder" | "out"

export type Condition = {
  /** Display label, e.g. "Maasai Mara". */
  label: string
  /** Country / region context line. */
  context: string
  /** Status of the season for this destination right now. */
  status: ConditionStatus
  /** Short description of why it matters this month. */
  note: string
}

const STATUS_META: Record<ConditionStatus, { label: string; tone: string }> = {
  in: { label: "In season", tone: "moss" },
  shoulder: { label: "Shoulder", tone: "amber" },
  out: { label: "Out of season", tone: "flame" },
}

export function getStatusMeta(status: ConditionStatus): { label: string; tone: string } {
  return STATUS_META[status]
}

/**
 * Current in-season picks. Update as the calendar moves.
 */
export const CURRENT_CONDITIONS: Condition[] = [
  {
    label: "Maasai Mara",
    context: "Kenya · Migration north",
    status: "in",
    note: "Crossing season at its peak. Crowded — book ahead, stay in conservancies.",
  },
  {
    label: "Okavango Delta",
    context: "Botswana · Flood high",
    status: "in",
    note: "Water at its highest, mokoro routes open, predator concentrations excellent.",
  },
  {
    label: "South Luangwa",
    context: "Zambia · Walking season",
    status: "in",
    note: "Dry-season walking safaris. Camps fully open, river game drives at their best.",
  },
  {
    label: "Hwange",
    context: "Zimbabwe · Pumped pans",
    status: "shoulder",
    note: "Game concentrating at managed water points; quieter than the Mara crossings.",
  },
  {
    label: "Bwindi",
    context: "Uganda · Gorilla trekking",
    status: "shoulder",
    note: "Drier than spring but trails still slick. Permits scarce — plan months ahead.",
  },
  {
    label: "Etosha",
    context: "Namibia · Floodlit waterholes",
    status: "out",
    note: "Game viewing fine but expect heat. Better paired with the dry July–Sept window.",
  },
]
