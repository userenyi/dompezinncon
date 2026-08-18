export type RepairStatus = {
  id: string;
  device: string;
  deviceType: string;
  brand: string;
  model: string;
  problem: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  status: string;
  message: string;
  createdAt: string;
};

export const DEMO_REPAIRS: Record<string, RepairStatus> = {
  "DON-PH-2026-0817001": {
    id: "DON-PH-2026-0817001",
    device: "iPhone 13",
    deviceType: "Phone repair",
    brand: "Apple",
    model: "iPhone 13",
    problem: "Screen and charging issue",
    name: "Demo Customer",
    phone: "+257 00 000 000",
    email: "",
    notes: "",
    status: "Repair in progress",
    message:
      "Our technician has diagnosed your device and is currently completing the repair.",
    createdAt: "2026-08-17",
  },

  "DON-LT-2026-0817002": {
    id: "DON-LT-2026-0817002",
    device: "Dell Latitude",
    deviceType: "Laptop repair",
    brand: "Dell",
    model: "Latitude",
    problem: "Hardware issue",
    name: "Demo Customer",
    phone: "+257 00 000 000",
    email: "",
    notes: "",
    status: "Ready for collection",
    message:
      "Your repair is complete and your device is ready for collection.",
    createdAt: "2026-08-17",
  },
};

const STORAGE_KEY = "repairtech_repairs";

export function loadRepairs(): Record<string, RepairStatus> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return {};
    }

    return JSON.parse(stored) as Record<string, RepairStatus>;
  } catch {
    return {};
  }
}

export function saveRepair(repair: RepairStatus) {
  if (typeof window === "undefined") {
    return;
  }

  const repairs = loadRepairs();
  repairs[repair.id] = repair;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(repairs));
}

export function findRepair(id: string): RepairStatus | null {
  const normalizedId = id.trim().toUpperCase();

  const storedRepairs = loadRepairs();

  return (
    storedRepairs[normalizedId] ??
    DEMO_REPAIRS[normalizedId] ??
    null
  );
}

const DEVICE_CODES: Record<string, string> = {
  "Phone repair": "PH",
  "Laptop repair": "LT",
  "Tablet repair": "TB",
  "TV repair": "TV",
  "Game console repair": "GC",
  "Appliance repair": "AP",
  "Other electronic repair": "OT",
};

export function generateTrackingId(deviceType: string): string {
  const year = new Date().getFullYear();
  const code = DEVICE_CODES[deviceType] ?? "OT";

  const repairs = {
    ...DEMO_REPAIRS,
    ...loadRepairs(),
  };

  const sequence = Object.keys(repairs).length + 1;

  const datePart = [
    String(year),
    String(new Date().getMonth() + 1).padStart(2, "0"),
    String(new Date().getDate()).padStart(2, "0"),
  ].join("");

  const sequencePart = String(sequence).padStart(3, "0");

  return `DON-${code}-${datePart}-${sequencePart}`;
}
