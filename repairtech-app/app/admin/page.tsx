"use client";

import { useEffect, useState } from "react";
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
import {
  loadRepairs,
  saveRepair,
  type RepairStatus,
} from "../../lib/repairs";

const statuses = [
  "Request Received",
  "Device Inspection",
  "Repair in Progress",
  "Repair Completed",
  "Ready for Collection",
];

export default function AdminPage() {
  const [repairs, setRepairs] = useState<Record<string, RepairStatus>>({});
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setRepairs(loadRepairs());
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

  function selectRepair(repair: RepairStatus) {
    setSelectedId(repair.id);
    setStatus(repair.status);
    setMessage(repair.message);
  }

  function updateRepair() {
    const repair = repairs[selectedId];

    if (!repair) return;

    const updatedRepair: RepairStatus = {
      ...repair,
      status,
      message,
    };

    saveRepair(updatedRepair);

    setRepairs((current) => ({
      ...current,
      [selectedId]: updatedRepair,
    }));
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
                Technician Dashboard
              </Typography>

              <Typography color="text.secondary">
                Manage repair requests and update customer status.
              </Typography>
            </Box>

            <Button
              component={Link}
              href="/"
              variant="outlined"
            >
              Back to Website
            </Button>
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

                    <TextField
                      select
                      fullWidth
                      label="Repair Status"
                      value={status}
                      onChange={(event) =>
                        setStatus(event.target.value)
                      }
                    >
                      {statuses.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      label="Technician message"
                      value={message}
                      onChange={(event) =>
                        setMessage(event.target.value)
                      }
                    />

                    <Button
                      variant="contained"
                      size="large"
                      onClick={updateRepair}
                    >
                      Save Repair Update
                    </Button>
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
