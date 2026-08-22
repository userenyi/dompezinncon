"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BuildIcon from "@mui/icons-material/Build";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import type { RepairStatus } from "../../lib/repairs";

const statuses = [
  "Request Received",
  "Device Inspection",
  "Repair in Progress",
  "Repair Completed",
  "Ready for Collection",
];

export default function StaffPage() {
  const router = useRouter();

  const [repairs, setRepairs] = useState<Record<string, RepairStatus>>({});
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    async function loadRepairsFromDatabase() {
      try {
        const response = await fetch("/api/repairs");

        if (!response.ok) {
          throw new Error("Unable to load repairs");
        }

        const data = await response.json();

        const repairsById = Object.fromEntries(
          (data.repairs as RepairStatus[]).map((repair) => [
            repair.id,
            repair,
          ])
        );

        setRepairs(repairsById);
      } catch (error) {
        console.error("Failed to load repairs:", error);
      }
    }

    loadRepairsFromDatabase();
  }, []);

  const repairList = Object.values(repairs).sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

  const filteredRepairs = repairList.filter((repair) => {
    const query = search.trim().toUpperCase();

    if (!query) return true;

    return (
      repair.id.toUpperCase().includes(query) ||
      repair.name.toUpperCase().includes(query) ||
      repair.phone.toUpperCase().includes(query) ||
      repair.device.toUpperCase().includes(query)
    );
  });

  async function handleLogout() {
    try {
      await fetch("/api/staff/logout", {
        method: "POST",
      });
    } finally {
      router.replace("/staff/login");
      router.refresh();
    }
  }

  function selectRepair(repair: RepairStatus) {
    setSelectedId(repair.id);
  }

  const selectedRepair = selectedId
    ? repairs[selectedId]
    : null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{
              alignItems: { md: "center" },
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                  letterSpacing: 1.5,
                }}
              >
                REPAIRTECH STAFF
              </Typography>

              <Typography
                variant="h3"
                sx={{ fontWeight: 700 }}
              >
                Staff Technician Dashboard
              </Typography>

              <Typography color="text.secondary">
                View repair requests and customer repair information.
              </Typography>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{
                alignItems: { sm: "center" },
              }}
            >
              <Button
                component={Link}
                href="/"
                variant="outlined"
              >
                Back to Website
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Stack>
          </Stack>

          <Card>
            <CardContent>
              <TextField
                fullWidth
                label="Search repairs"
                placeholder="DON-PH-2026-003, customer name, phone..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                slotProps={{
                  input: {
                    startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                  },
                }}
              />
            </CardContent>
          </Card>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1.4fr",
              },
              gap: 3,
            }}
          >
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mb: 2 }}
                >
                  Repair Requests
                </Typography>

                <Stack spacing={1}>
                  {filteredRepairs.length === 0 ? (
                    <Typography color="text.secondary">
                      No repair requests found.
                    </Typography>
                  ) : (
                    filteredRepairs.map((repair) => (
                      <Button
                        key={repair.id}
                        onClick={() => selectRepair(repair)}
                        variant={
                          selectedId === repair.id
                            ? "contained"
                            : "outlined"
                        }
                        sx={{
                          justifyContent: "flex-start",
                          textAlign: "left",
                          py: 1.5,
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 700 }}
                          >
                            {repair.id}
                          </Typography>

                          <Typography variant="caption">
                            {repair.name} · {repair.device}
                          </Typography>
                        </Box>
                      </Button>
                    ))
                  )}
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                {!selectedRepair ? (
                  <Stack
                    spacing={2}
                    sx={{
                      minHeight: 300,
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <BuildIcon
                      sx={{
                        fontSize: 56,
                        color: "primary.main",
                      }}
                    />

                    <Typography variant="h6">
                      Select a repair
                    </Typography>

                    <Typography color="text.secondary">
                      Choose a repair request to view its details
                      and update its status.
                    </Typography>
                  </Stack>
                ) : (
                  <Stack spacing={3}>
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        TRACKING ID
                      </Typography>

                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: "primary.main",
                        }}
                      >
                        {selectedRepair.id}
                      </Typography>
                    </Box>

                    <Divider />

                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700 }}
                      >
                        Device Information
                      </Typography>

                      <Typography>
                        {selectedRepair.device}
                      </Typography>

                      <Typography color="text.secondary">
                        {selectedRepair.brand}{" "}
                        {selectedRepair.model}
                      </Typography>

                      <Typography
                        sx={{ mt: 1 }}
                        color="text.secondary"
                      >
                        {selectedRepair.problem}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700 }}
                      >
                        Customer
                      </Typography>

                      <Typography>
                        {selectedRepair.name}
                      </Typography>

                      <Typography color="text.secondary">
                        {selectedRepair.phone}
                      </Typography>

                      {selectedRepair.email && (
                        <Typography color="text.secondary">
                          {selectedRepair.email}
                        </Typography>
                      )}
                    </Box>

                    <Divider />

                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700 }}
                      >
                        Repair Status
                      </Typography>

                      <Typography
                        sx={{
                          mt: 1,
                          fontWeight: 600,
                          color: "primary.main",
                        }}
                      >
                        {selectedRepair.status}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700 }}
                      >
                        Technician Message
                      </Typography>

                      <Typography
                        sx={{ mt: 1 }}
                        color="text.secondary"
                      >
                        {selectedRepair.message ||
                          "No technician message has been added yet."}
                      </Typography>
                    </Box>
                    <Divider />

                  </Stack>
                )}
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
