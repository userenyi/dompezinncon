"use client";

import { FormEvent, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BuildIcon from "@mui/icons-material/Build";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
import { generateTrackingId, saveRepair } from "../../lib/repairs";

const services = [
  "Phone repair",
  "Laptop repair",
  "Tablet repair",
  "TV repair",
  "Game console repair",
  "Appliance repair",
  "Other electronic repair",
];

export default function BookRepairPage() {
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

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

      if (!response.ok) {
        throw new Error("Failed to create repair");
      }

      setTrackingId(id);
      setSubmitted(true);
    } catch (error) {
      console.error("Repair submission failed:", error);
      alert(
        "We couldn't submit your repair request. Please try again."
      );
    }
  }

  if (submitted) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: { xs: 5, md: 10 },
        }}
      >
        <Container maxWidth="sm">
          <Card elevation={3}>
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Stack
                spacing={3}
                sx={{
                  alignItems: "center",
                  textAlign: "center"
                }}>
                <CheckCircleIcon
                  sx={{ fontSize: 72, color: "success.main" }}
                />

                <Typography variant="h4" sx={{
                  fontWeight: 700
                }}>
                  Repair Request Received
                </Typography>

                <Typography sx={{
                  color: "text.secondary"
                }}>
                  Your repair request has been recorded successfully.
                  Keep your tracking ID so you can check the status of
                  your repair.
                </Typography>

                <Box
                  sx={{
                    width: "100%",
                    p: 2,
                    bgcolor: "#EEF5FB",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="caption" sx={{
                    color: "text.secondary"
                  }}>
                    YOUR TRACKING ID
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "primary.main"
                    }}>
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
                    href={`/track?id=${trackingId}`}
                    variant="contained"
                    fullWidth
                  >
                    Track Repair
                  </Button>

                  <Button
                    component={Link}
                    href="/"
                    variant="outlined"
                    fullWidth
                  >
                    Return Home
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
          href="/"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
        >
          Back to Home
        </Button>

        <Card elevation={3}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Stack spacing={1} sx={{ mb: 4 }}>
              <Stack direction="row" spacing={1.5} sx={{
                alignItems: "center"
              }}>
                <BuildIcon color="primary" />

                <Typography variant="h4" sx={{
                  fontWeight: 700
                }}>
                  Book a Repair
                </Typography>
              </Stack>

              <Typography sx={{
                color: "text.secondary"
              }}>
                Tell us about your device and the problem you're
                experiencing. We'll use these details to prepare your
                repair request.
              </Typography>
            </Stack>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Typography variant="h6" sx={{
                  fontWeight: 700
                }}>
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
                    Select your device
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
                  placeholder="Tell us what is wrong with the device..."
                />

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    pt: 2
                  }}>
                  Customer Information
                </Typography>

                <TextField
                  required
                  fullWidth
                  label="Full name"
                  name="name"
                />

                <TextField
                  required
                  fullWidth
                  type="tel"
                  label="Phone number"
                  name="phone"
                  placeholder="+257 ..."
                />

                <TextField
                  fullWidth
                  type="email"
                  label="Email address"
                  name="email"
                  placeholder="you@example.com"
                />

                <TextField
                  required
                  fullWidth
                  multiline
                  minRows={3}
                  label="Preferred contact / additional information"
                  name="notes"
                  placeholder="Anything else we should know?"
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<BuildIcon />}
                  sx={{ py: 1.5 }}
                >
                  Submit Repair Request
                </Button>

                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    textAlign: "center"
                  }}>
                  No payment is required at this stage. A technician
                  will review the request before repair begins.
                </Typography>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
