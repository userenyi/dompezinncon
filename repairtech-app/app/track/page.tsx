"use client";

import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import BuildIcon from "@mui/icons-material/Build";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DoneAllIcon from "@mui/icons-material/DoneAll";
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
import { FormEvent, useState } from "react";
import type { RepairStatus } from "../../lib/repairs";

const statuses = [
  {
    title: "Repair Request Received",
    description: "Your repair request has been received.",
    icon: <CheckCircleIcon />,
    completed: true,
  },
  {
    title: "Device Inspection",
    description: "A technician will inspect your device.",
    icon: <EngineeringIcon />,
    completed: false,
  },
  {
    title: "Repair in Progress",
    description: "Your device is being repaired.",
    icon: <BuildIcon />,
    completed: false,
  },
  {
    title: "Repair Completed",
    description: "Your device is ready for collection.",
    icon: <DoneAllIcon />,
    completed: false,
  },
];

function TrackRepairContent() {
  const [trackingId, setTrackingId] = useState("");
  const [searchedId, setSearchedId] = useState("");
  const [repair, setRepair] = useState<RepairStatus | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");

    if (!id) {
      return;
    }

    const normalizedId = id.trim().toUpperCase();

    setTrackingId(normalizedId);
    setSearchedId(normalizedId);

    async function loadRepair() {
      try {
        const response = await fetch(
          `/api/repairs/${encodeURIComponent(normalizedId)}`
        );

        if (!response.ok) {
          throw new Error("Repair not found");
        }

        const data = await response.json();

        setRepair(data.repair);
        setError("");
      } catch (error) {
        console.error("Tracking lookup failed:", error);
        setRepair(null);
        setError("We couldn't find that repair. Check the ID and try again.");
      }
    }

    loadRepair();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const id = trackingId.trim().toUpperCase();

    if (!id) {
      setError("Please enter your tracking ID.");
      setRepair(null);
      setSearchedId("");
      return;
    }

    setSearchedId(id);

    try {
      const response = await fetch(
        `/api/repairs/${encodeURIComponent(id)}`
      );

      if (!response.ok) {
        throw new Error("Repair not found");
      }

      const data = await response.json();

      setError("");
      setRepair(data.repair);
    } catch (error) {
      console.error("Tracking lookup failed:", error);
      setError("We couldn't find that repair. Check the ID and try again.");
      setRepair(null);
    }
  }


  const hasResult = searchedId.length > 0;

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
          sx={{ mb: 3 }}
        >
          ← Back to Home
        </Button>

        <Stack spacing={1} sx={{ mb: 4 }}>
          <Stack direction="row" spacing={1.5} sx={{
            alignItems: "center"
          }}>
            <SearchIcon color="primary" />

            <Typography variant="h4" sx={{
              fontWeight: 700
            }}>
              Track Your Repair
            </Typography>
          </Stack>

          <Typography sx={{
            color: "text.secondary"
          }}>
            Enter your RepairTech tracking ID to see the current
            status of your repair.
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
                  placeholder="e.g. RT-2026-483921"
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<SearchIcon />}
                  sx={{ minWidth: { sm: 160 } }}
                >
                  Track
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        {error && (
          <Card elevation={3} sx={{ mt: 3 }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography
                color="error"
                sx={{ fontWeight: 600, textAlign: "center" }}
              >
                {error}
              </Typography>
            </CardContent>
          </Card>
        )}

        {hasResult && repair && (
          <Card elevation={3} sx={{ mt: 3 }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="caption" sx={{
                    color: "text.secondary"
                  }}>
                    TRACKING ID
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "primary.main"
                    }}>
                    {searchedId}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#EEF5FB",
                  }}
                >
                  <Stack direction="row" spacing={2} sx={{
                    alignItems: "center"
                  }}>
                    <ScheduleIcon color="primary" />

                    <Box>
                      <Typography sx={{
                        fontWeight: 700
                      }}>
                        {repair.status}
                      </Typography>

                      <Typography variant="body2" sx={{
                        color: "text.secondary"
                      }}>
                        {repair.message}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Divider />

                <Typography variant="h6" sx={{
                  fontWeight: 700
                }}>
                  Repair Progress
                </Typography>

                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#F7F6F2",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Device
                  </Typography>

                  <Typography sx={{ fontWeight: 700 }}>
                    {repair.device || "Device information pending"}
                  </Typography>
                </Box>

                <Stack spacing={0}>
                  {statuses.map((status, index) => (
                    <Box key={status.title}>
                      <Stack direction="row" spacing={2}>
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: status.completed
                              ? "primary.main"
                              : "#E5E7EB",
                            color: status.completed
                              ? "white"
                              : "#9CA3AF",
                            flexShrink: 0,
                          }}
                        >
                          {status.icon}
                        </Box>

                        <Box sx={{ pb: index === statuses.length - 1 ? 0 : 3 }}>
                          <Typography sx={{
                            fontWeight: 700
                          }}>
                            {status.title}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary"
                            }}
                          >
                            {status.description}
                          </Typography>
                        </Box>
                      </Stack>

                      {index < statuses.length - 1 && (
                        <Box
                          sx={{
                            width: 2,
                            height: 24,
                            bgcolor: "#E5E7EB",
                            ml: "20px",
                          }}
                        />
                      )}
                    </Box>
                  ))}
                </Stack>

                <Divider />

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    textAlign: "center"
                  }}>
                  This is a preliminary repair status. Updates will
                  appear as your device moves through the repair
                  process.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        )}

        <Stack
          sx={{
            alignItems: "center",
            mt: 4
          }}>
          <Button
            component={Link}
            href="/book"
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

export default TrackRepairContent;
