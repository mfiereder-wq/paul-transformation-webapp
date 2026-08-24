export type Goal = 'fat-loss' | 'muscle' | 'vitality'
export type Experience = 'start' | 'building' | 'trained'

export type CalculatorInput = {
  ageBand: string
  goal: Goal
  experience: Experience
}

export type TimelineResult = {
  weeks: string
  title: string
  description: string
}

const baseWeeks: Record<Goal, number> = {
  'fat-loss': 16,
  muscle: 20,
  vitality: 12,
}

const titles: Record<Goal, string> = {
  'fat-loss': 'Fokus: nachhaltige Körperkomposition',
  muscle: 'Fokus: strukturierter Kraftaufbau',
  vitality: 'Fokus: Energie und belastbare Routinen',
}

export function getTimeline(input: CalculatorInput): TimelineResult {
  const experienceAdjustment = input.experience === 'start' ? 4 : input.experience === 'trained' ? -2 : 0
  const ageAdjustment = input.ageBand === '50+' ? 2 : 0
  const lower = Math.max(8, baseWeeks[input.goal] + experienceAdjustment + ageAdjustment - 4)
  const upper = Math.max(lower + 4, baseWeeks[input.goal] + experienceAdjustment + ageAdjustment + 4)

  return {
    weeks: `${lower}–${upper} Wochen`,
    title: titles[input.goal],
    description:
      'Diese Zeitspanne ist eine unverbindliche Orientierung. Dein tatsächlicher Weg hängt von Ausgangslage, Alltag, Training und Regeneration ab.',
  }
}
