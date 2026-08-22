"use client";

import { FormEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import BuildIcon from "@mui/icons-material/Build";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ScheduleIcon from "@mui/icons-material/Schedule";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import type { RepairStatus } from "../../../lib/repairs";

export default function StaffTrackRepairPage() {
  const [trackingId, setTrackingId] = useState("");
  const [repair, setRepair] = useState<RepairStatus | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function lookupRepair(id: string) {
    const normalizedId = id.trim().toUpperCase();

    if (!normalizedId) {
      setError("Please enter a tracking ID.");
      setRepair(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/repairs/${encodeURIComponent(normalizedId)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Repair not found.");
      }

      setRepair(data.repair);
      setTrackingId(normalizedId);
    } catch (lookupError) {
      console.error("Staff repair lookup failed:", lookupError);
      setRepair(null);
      setError(
        lookupError instanceof Error
          ? lookupError.message
          : "We couldn't find that repair."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");

    if (id) {
      setTrackingId(id.trim().toUpperCase());
      void lookupRepair(id);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await lookupRepair(trackingId);
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

        <Stack spacing={1} sx={{ mb: 4 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <SearchIcon color="primary" />

            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Track a Repair
            </Typography>
          </Stack>

          <Typography sx={{ color: "text.secondary" }}>
            Help a customer check the current progress of their repair.
          </Typography>
        </Stack>

        <Card elevation={3}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
              >
                <TextField
                  fullWidth
                  required
                  label="Tracking ID"
                  value={trackingId}
                  onChange={(event) => setTrackingId(event.target.value)}
                  placeholder="e.g. DON-PH-20260819-123456"
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<SearchIcon />}
                  disabled={loading}
                  sx={{ minWidth: { sm: 160 } }}
                >
                  {loading ? "Searching..." : "Track"}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        {error && (
          <Card elevation={3} sx={{ mt: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                color="error"
                sx={{ fontWeight: 600, textAlign: "center" }}
              >
                {error}
              </Typography>
            </CardContent>
          </Card>
        )}

        {repair && (
          <Card elevation={3} sx={{ mt: 3 }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    TRACKING ID
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "primary.main" }}
                  >
                    {repair.id}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#EEF5FB",
                  }}
                >
                  <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                    <ScheduleIcon color="primary" />

                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>
                        {repair.status}
                      </Typography>

                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {repair.message}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Divider />

                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Customer & Device
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gap: 2,
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Customer
                    </Typography>
                    <Typography sx={{ fontWeight: 700 }}>
                      {repair.name}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Phone
                    </Typography>
                    <Typography sx={{ fontWeight: 700 }}>
                      {repair.phone}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Device
                    </Typography>
                    <Typography sx={{ fontWeight: 700 }}>
                      {repair.device}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Brand / Model
                    </Typography>
                    <Typography sx={{ fontWeight: 700 }}>
                      {repair.brand} {repair.model}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#F7F6F2",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Reported problem
                  </Typography>

                  <Typography sx={{ fontWeight: 600 }}>
                    {repair.problem}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", textAlign: "center" }}
                >
                  Use this information to assist the customer with their
                  repair enquiry. Repair status changes remain part of the
                  repair-management workflow.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        )}

        <Stack sx={{ alignItems: "center", mt: 4 }}>
          <Button
            component={Link}
            href="/staff/book"
            variant="outlined"
            startIcon={<BuildIcon />}
          >
            Book Another Repair
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
