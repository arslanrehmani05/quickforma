import React, { useState } from "react";
import { Home, Calendar, DollarSign, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const VacationRentalShortTermOccupancy: React.FC = () => {
  const [adr, setAdr] = useState<number>(245); // Average Daily Rate ($/night)
  const [occupancyRatePercent, setOccupancyRatePercent] = useState<number>(68); // 68% occupancy
  const [platformCommissionPercent, setPlatformCommissionPercent] = useState<number>(3.0); // Airbnb host-only 3%
  const [cleaningFeePerStay, setCleaningFeePerStay] = useState<number>(140);
  const [avgStayNights, setAvgStayNights] = useState<number>(3.5);

  const handleReset = () => {
    setAdr(245);
    setOccupancyRatePercent(68);
    setPlatformCommissionPercent(3.0);
    setCleaningFeePerStay(140);
    setAvgStayNights(3.5);
  };

  const bookedNights = Math.round(365 * (occupancyRatePercent / 100));
  const revPan = adr * (occupancyRatePercent / 100); // Revenue Per Available Night
  const annualNightlyRevenue = bookedNights * adr;
  const bookingsCount = avgStayNights > 0 ? bookedNights / avgStayNights : 0;
  const annualCleaningCollected = bookingsCount * cleaningFeePerStay;
  const grossBookings = annualNightlyRevenue + annualCleaningCollected;

  const platformFees = annualNightlyRevenue * (platformCommissionPercent / 100);
  const netOwnerNightlyPayout = annualNightlyRevenue - platformFees;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="STR Seasonal Occupancy & Revenue Per Available Night"
        description="Compute Airbnb / VRBO short-term vacation rental occupancy rates, RevPAN metrics, and net booking payouts."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Average Daily Nightly Rate (ADR $)"
            value={adr}
            onChange={(val) => setAdr(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Annual Occupancy Rate (%)"
            value={occupancyRatePercent}
            onChange={(val) => setOccupancyRatePercent(Math.min(100, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={100}
            suffix="%"
          />
          <InputField
            label="Platform Host Commission (%)"
            value={platformCommissionPercent}
            onChange={(val) => setPlatformCommissionPercent(Math.min(25, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={25}
            suffix="%"
          />
          <InputField
            label="Cleaning Fee Charged ($/stay)"
            value={cleaningFeePerStay}
            onChange={(val) => setCleaningFeePerStay(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Average Guest Stay Duration (Nights)"
            value={avgStayNights}
            onChange={(val) => setAvgStayNights(Math.max(1, Number(val) || 1))}
            type="number"
            min={1}
            step={0.5}
            suffix="nights"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="RevPAN (Nightly Yield)"
          value={`$${revPan.toFixed(2)}/night`}
          subtitle="Revenue / available night"
          variant="indigo"
        />
        <ResultCard
          title="Annual Net Nightly Payout"
          value={`$${netOwnerNightlyPayout.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="After platform commissions"
          variant="light"
        />
        <ResultCard
          title="Total Booked Nights"
          value={`${bookedNights} nights`}
          subtitle={`${occupancyRatePercent}% annual occupancy`}
          variant="light"
        />
        <ResultCard
          title="Total Turnovers / Stays"
          value={`${Math.round(bookingsCount)} guest stays`}
          subtitle={`$${annualCleaningCollected.toLocaleString()} cleaning collected`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Short-Term Rental Performance</h4>
        <p className="text-slate-600">
          Booking {bookedNights} nights at an ADR of ${adr} produces a RevPAN of <strong className="text-slate-800">${revPan.toFixed(2)} per night</strong> across all 365 calendar days. After deducting ${platformFees.toLocaleString()} in booking host commissions, your property nets <strong className="text-slate-800">${netOwnerNightlyPayout.toLocaleString()} in room revenue</strong> annually.
        </p>
      </div>
    </div>
  );
};
