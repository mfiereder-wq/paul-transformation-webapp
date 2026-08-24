import { describe, expect, it } from 'vitest'
import { getTimeline } from './calculator'

describe('getTimeline', () => {
  it('returns a transparent orientation for a new person focused on fat loss', () => {
    const result = getTimeline({ ageBand: '30–39', goal: 'fat-loss', experience: 'start' })

    expect(result.weeks).toBe('16–24 Wochen')
    expect(result.title).toContain('Körperkomposition')
    expect(result.description).toContain('unverbindliche Orientierung')
  })

  it('adjusts the orientation for an experienced person and vitality goal', () => {
    const result = getTimeline({ ageBand: '18–29', goal: 'vitality', experience: 'trained' })

    expect(result.weeks).toBe('8–14 Wochen')
    expect(result.title).toContain('Energie')
  })

  it('accounts for the configured age-band adjustment without exposing medical claims', () => {
    const result = getTimeline({ ageBand: '50+', goal: 'muscle', experience: 'building' })

    expect(result.weeks).toBe('18–26 Wochen')
    expect(result.description).not.toContain('garantiert')
  })
})
