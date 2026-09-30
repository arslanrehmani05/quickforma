/**
 * Pure client-side Physics Engine powering QuickForma academic tools
 */

export interface SuvatInput {
  u?: number; // initial velocity (m/s)
  v?: number; // final velocity (m/s)
  a?: number; // acceleration (m/s^2)
  s?: number; // displacement (m)
  t?: number; // time (s)
}

export function solveSuvat(input: SuvatInput): {
  u: number;
  v: number;
  a: number;
  s: number;
  t: number;
} {
  let { u, v, a, s, t } = input;
  let count = 0;
  if (u !== undefined) count++;
  if (v !== undefined) count++;
  if (a !== undefined) count++;
  if (s !== undefined) count++;
  if (t !== undefined) count++;

  if (count < 3) {
    throw new Error('Please provide at least 3 SUVAT kinematic variables.');
  }

  // Solve v = u + at
  if (u !== undefined && a !== undefined && t !== undefined && v === undefined) {
    v = u + a * t;
  }
  // Solve s = ut + 0.5 a t^2
  if (u !== undefined && a !== undefined && t !== undefined && s === undefined) {
    s = u * t + 0.5 * a * t * t;
  }
  // Solve v^2 = u^2 + 2as
  if (u !== undefined && a !== undefined && s !== undefined && v === undefined) {
    v = Math.sqrt(Math.max(0, u * u + 2 * a * s));
  }
  // Solve u = v - at
  if (v !== undefined && a !== undefined && t !== undefined && u === undefined) {
    u = v - a * t;
  }
  // Solve a = (v - u) / t
  if (v !== undefined && u !== undefined && t !== undefined && t > 0 && a === undefined) {
    a = (v - u) / t;
  }
  // Solve t = (v - u) / a
  if (v !== undefined && u !== undefined && a !== undefined && a !== 0 && t === undefined) {
    t = (v - u) / a;
  }

  return {
    u: u !== undefined ? Math.round(u * 1000) / 1000 : 0,
    v: v !== undefined ? Math.round(v * 1000) / 1000 : 0,
    a: a !== undefined ? Math.round(a * 1000) / 1000 : 0,
    s: s !== undefined ? Math.round(s * 1000) / 1000 : 0,
    t: t !== undefined ? Math.round(t * 1000) / 1000 : 0,
  };
}

/**
 * Newton's Second Law & Momentum $F = ma$, $p = mv$, $J = F \Delta t$
 */
export function calculateForceMomentum(
  mass_kg?: number,
  accel_ms2?: number,
  velocity_ms?: number
): { force_N: number; momentum_kgms: number; weight_N: number } {
  const g = 9.80665;
  const mass = Math.max(0, mass_kg || 0);
  const accel = accel_ms2 || 0;
  const vel = velocity_ms || 0;

  const force_N = mass * accel;
  const momentum_kgms = mass * vel;
  const weight_N = mass * g;

  return {
    force_N: Math.round(force_N * 1000) / 1000,
    momentum_kgms: Math.round(momentum_kgms * 1000) / 1000,
    weight_N: Math.round(weight_N * 1000) / 1000,
  };
}

/**
 * Work, Kinetic & Potential Energy $KE = 0.5 m v^2$, $PE = m g h$, $W = F d \cos\theta$
 */
export function calculateEnergyPower(
  mass_kg: number,
  velocity_ms: number,
  height_m: number,
  time_s?: number
): { kineticEnergy_J: number; potentialEnergy_J: number; totalMechanicalEnergy_J: number; power_W: number } {
  const g = 9.80665;
  const ke = 0.5 * mass_kg * velocity_ms * velocity_ms;
  const pe = mass_kg * g * height_m;
  const total = ke + pe;

  let power = 0;
  if (time_s && time_s > 0) {
    power = total / time_s;
  }

  return {
    kineticEnergy_J: Math.round(ke * 100) / 100,
    potentialEnergy_J: Math.round(pe * 100) / 100,
    totalMechanicalEnergy_J: Math.round(total * 100) / 100,
    power_W: Math.round(power * 100) / 100,
  };
}

/**
 * Ohm's Law & Circuit Calculations $V = I R$, $P = V I$
 */
export function calculateOhmsLaw(
  voltage_V?: number,
  current_A?: number,
  resistance_Ohm?: number
): { voltage: number; current: number; resistance: number; power_W: number } {
  let v = voltage_V || 0;
  let i = current_A || 0;
  let r = resistance_Ohm || 0;

  if (v > 0 && i > 0 && r === 0) {
    r = v / i;
  } else if (v > 0 && r > 0 && i === 0) {
    i = v / r;
  } else if (i > 0 && r > 0 && v === 0) {
    v = i * r;
  } else {
    throw new Error('Provide any 2 of Voltage (V), Current (I), or Resistance (R).');
  }

  const power = v * i;

  return {
    voltage: Math.round(v * 1000) / 1000,
    current: Math.round(i * 1000) / 1000,
    resistance: Math.round(r * 1000) / 1000,
    power_W: Math.round(power * 1000) / 1000,
  };
}

/**
 * Wave Equation $v = f \lambda$, $T = 1/f$, $E = h f$
 */
export function calculateWaveProperties(
  frequency_Hz?: number,
  wavelength_m?: number,
  speed_ms?: number
): { frequency: number; wavelength: number; speed: number; period: number; photonEnergy_J: number } {
  const h = 6.62607015e-34; // Planck constant
  let f = frequency_Hz || 0;
  let w = wavelength_m || 0;
  let v = speed_ms || 3e8; // Default light speed if omitted

  if (f > 0 && w > 0) {
    v = f * w;
  } else if (v > 0 && f > 0 && w === 0) {
    w = v / f;
  } else if (v > 0 && w > 0 && f === 0) {
    f = v / w;
  } else {
    throw new Error('Provide at least 2 wave properties (frequency, wavelength, or wave speed).');
  }

  const period = f > 0 ? 1 / f : 0;
  const photonEnergy = h * f;

  return {
    frequency: Math.round(f * 1000) / 1000,
    wavelength: Math.round(w * 1000) / 1000,
    speed: Math.round(v * 1000) / 1000,
    period: Math.round(period * 100000) / 100000,
    photonEnergy_J: photonEnergy,
  };
}
