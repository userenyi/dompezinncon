"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import BuildIcon from "@mui/icons-material/Build";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";

const services = [
  "Phone repair",
  "Laptop repair",
  "Tablet repair",
  "TV repair",
  "Game console repair",
  "Appliance repair",
  "Other electronic repair",
];

function generateTrackingId(deviceType: string) {
  const codes: Record<string, string> = {
    "Phone repair": "PH",
    "Laptop repair": "LT",
    "Tablet repair": "TB",
    "TV repair": "TV",
    "Game console repair": "GC",
    "Appliance repair": "AP",
    "Other electronic repair": "OT",
  };

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const random = Math.floor(100000 + Math.random() * 900000);

  return `DON-${codes[deviceType] ?? "OT"}-${year}${month}${day}-${random}`;
}

export default function StaffBookRepairPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const deviceType = String(formData.get("deviceType") || "");
    const id = generateTrackingId(deviceType);

    const repair = {
      id,
      device: deviceType || "Electronic device",
      deviceType,
      brand: String(formData.get("brand") || ""),
      model: String(formData.get("model") || ""),
      problem: String(formData.get("problem") || ""),
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      notes: String(formData.get("notes") || ""),
    };

    try {
      const response = await fetch("/api/repairs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(repair),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to create repair.");
      }

      setTrackingId(data.repair.id);
      setSubmitted(true);
    } catch (submitError) {
      console.error("Staff repair booking failed:", submitError);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to create repair."
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 8 }}>
        <Container maxWidth="sm">
          <Card elevation={3}>
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Stack spacing={3} sx={{ alignItems: "center", textAlign: "center" }}>
                <CheckCircleIcon
                  sx={{ fontSize: 72, color: "success.main" }}
                />

                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Repair Booked Successfully
                </Typography>

                <Typography sx={{ color: "text.secondary" }}>
                  The customer's repair has been registered. Give the
                  customer their tracking reference so they can monitor
                  the repair.
                </Typography>

                <Box
                  sx={{
                    width: "100%",
                    p: 2,
                    bgcolor: "#EEF5FB",
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    TRACKING ID
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "primary.main" }}
                  >
                    {trackingId}
                  </Typography>
                </Box>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ width: "100%" }}
                >
                  <Button
                    component={Link}
                    href={`/staff/track?id=${trackingId}`}
                    variant="contained"
                    fullWidth
                  >
                    Track Repair
                  </Button>

                  <Button
                    component={Link}
                    href="/staff"
                    variant="outlined"
                    fullWidth
                  >
                    Staff Workspace
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="md">
        <Button
          component={Link}
          href="/staff"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
        >
          Back to Staff Workspace
        </Button>

        <Card elevation={3}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Stack spacing={1} sx={{ mb: 4 }}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <BuildIcon color="primary" />

                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Book a Repair
                </Typography>
              </Stack>

              <Typography sx={{ color: "text.secondary" }}>
                Register a customer's device and create their repair
                tracking record.
              </Typography>
            </Stack>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Device Information
                </Typography>

                <TextField
                  select
                  required
                  fullWidth
                  label="Device type"
                  name="deviceType"
                  defaultValue=""
                >
                  <MenuItem value="" disabled>
                    Select the customer's device
                  </MenuItem>

                  {services.map((service) => (
                    <MenuItem key={service} value={service}>
                      {service}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  required
                  fullWidth
                  label="Brand"
                  name="brand"
                  placeholder="e.g. Samsung, Apple, HP"
                />

                <TextField
                  required
                  fullWidth
                  label="Model"
                  name="model"
                  placeholder="e.g. iPhone 15, Galaxy S24"
                />

                <TextField
                  required
                  fullWidth
                  multiline
                  minRows={4}
                  label="Describe the problem"
                  name="problem"
                  placeholder="Describe the customer's reported problem..."
                />

                <Typography variant="h6" sx={{ fontWeight: 700, pt: 2 }}>
                  Customer Information
                </Typography>

                <TextField
                  required
                  fullWidth
                  label="Customer full name"
                  name="name"
                />

                <TextField
                  required
                  fullWidth
                  type="tel"
                  label="Customer phone number"
                  name="phone"
                  placeholder="+240 ..."
                />

                <TextField
                  fullWidth
                  type="email"
                  label="Email address"
                  name="email"
                />

                <TextField
                  required
                  fullWidth
                  multiline
                  minRows={3}
                  label="Additional information"
                  name="notes"
                  placeholder="Anything else the technician should know?"
                />

                {error && (
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "#FEE2E2",
                      color: "#B91C1C",
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {error}
                    </Typography>
                  </Box>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<BuildIcon />}
                  disabled={loading}
                  sx={{ py: 1.5 }}
                >
                  {loading ? "Booking Repair..." : "Book Repair"}
                </Button>

                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", textAlign: "center" }}
                >
                  The repair will be registered using the same repair
                  tracking system used by customers.
                </Typography>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
