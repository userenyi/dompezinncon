"use client";

import Link from "next/link";

import { useState } from "react";
import BuildIcon from "@mui/icons-material/Build";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import { findRepair, type RepairStatus } from "../lib/repairs";


const translations = {
  English: {
    services: "Services",
    howItWorks: "How It Works",
    trackRepair: "Track Repair",
    admin: "Admin",
    bookRepair: "Book a Repair",
    professional: "DOMPEZ INTERNATIONAL COMPUTER REPAIR",
    heroTitle1: "Your Device.",
    heroTitle2: "Professionally Repaired.",
    heroDescription:
      "Expert Repairs. Global Solutions.",
    trackMyRepair: "Track My Repair",
    trackTitle: "Track Your Repair",
    trackDescription:
      "{t.trackDescription}",
    trackButton: "Track Repair",
    noAccount: "No customer account required.",
    servicesTitle: "DOMPEZ International Computer Repair Services",
    servicesDescription:
      "{t.servicesDescription}",
    needHelp: "Need help?",
    assistantDescription:
      "{t.assistantDescription}",
    askAssistant: "Ask Assistant",
    footer: "{t.footer}",
  },

  Français: {
    services: "Services",
    howItWorks: "Comment ça marche",
    trackRepair: "Suivre la réparation",
    admin: "Administration",
    bookRepair: "Réserver une réparation",
    professional: "RÉPARATION ÉLECTRONIQUE PROFESSIONNELLE",
    heroTitle1: "Votre appareil.",
    heroTitle2: "Réparé par des professionnels.",
    heroDescription:
      "Réparation électronique rapide et fiable, avec un service transparent et un suivi en temps réel.",
    trackMyRepair: "Suivre ma réparation",
    trackTitle: "Suivez votre réparation",
    trackDescription:
      "Entrez votre numéro de suivi pour voir l'état actuel de votre appareil.",
    trackButton: "Suivre la réparation",
    noAccount: "Aucun compte client requis.",
    servicesTitle: "Services de réparation électronique",
    servicesDescription:
      "Services professionnels pour téléphones, ordinateurs portables, tablettes, téléviseurs, consoles de jeux, appareils électroménagers et autres appareils électroniques.",
    needHelp: "Besoin d'aide ?",
    assistantDescription:
      "Notre assistant de réparation aide les clients avec les questions courantes, le suivi des réparations et les informations sur les services.",
    askAssistant: "Demander à l'assistant",
    footer: "© 2026 DOMPEZ INTERNATIONAL COMPUTER REPAIR. Services professionnels de réparation électronique.",
  },

  Español: {
    services: "Servicios",
    howItWorks: "Cómo funciona",
    trackRepair: "Seguir reparación",
    admin: "Administración",
    bookRepair: "Reservar una reparación",
    professional: "REPARACIÓN ELECTRÓNICA PROFESIONAL",
    heroTitle1: "Tu dispositivo.",
    heroTitle2: "Reparado profesionalmente.",
    heroDescription:
      "Reparación electrónica rápida y fiable, con un servicio transparente y seguimiento en tiempo real.",
    trackMyRepair: "Seguir mi reparación",
    trackTitle: "Sigue tu reparación",
    trackDescription:
      "Introduce tu número de seguimiento para ver el estado actual de tu dispositivo.",
    trackButton: "Seguir reparación",
    noAccount: "No se requiere una cuenta de cliente.",
    servicesTitle: "Servicios de reparación electrónica",
    servicesDescription:
      "Servicios profesionales para teléfonos, portátiles, tabletas, televisores, consolas de videojuegos, electrodomésticos y otros dispositivos electrónicos.",
    needHelp: "¿Necesitas ayuda?",
    assistantDescription:
      "Nuestro asistente de reparación ayuda a los clientes con preguntas frecuentes, seguimiento de reparaciones e información sobre servicios.",
    askAssistant: "Preguntar al asistente",
    footer: "© 2026 DOMPEZ INTERNATIONAL COMPUTER REPAIR. Servicios profesionales de reparación electrónica.",
  },
};

export default function Home() {
  const [trackingId, setTrackingId] = useState("");
  const [repair, setRepair] = useState<RepairStatus | null>(null);
  const [trackingError, setTrackingError] = useState("");
  const [languageAnchor, setLanguageAnchor] =
    useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState("English");

  const languageMenuOpen = Boolean(languageAnchor);
  const t = translations[language as keyof typeof translations];

  function handleLanguageOpen(
    event: React.MouseEvent<HTMLElement>
  ) {
    setLanguageAnchor(event.currentTarget);
  }

  function handleLanguageClose() {
    setLanguageAnchor(null);
  }

  function handleLanguageSelect(selectedLanguage: string) {
    setLanguage(selectedLanguage);
    setLanguageAnchor(null);
  }

  function handleTrackRepair() {
    const id = trackingId.trim().toUpperCase();

    if (!id) {
      setTrackingError("Please enter your tracking ID.");
      setRepair(null);
      return;
    }

    const result = findRepair(id);

    if (!result) {
      setTrackingError(
        "We couldn't find that repair. Check the ID and try again."
      );
      setRepair(null);
      return;
    }

    setTrackingError("");
    setRepair(result);
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Header */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(255,255,255,0.95)",
          color: "secondary.main",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: 72 }}>
            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  bgcolor: "secondary.main",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                RT
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 18,
                    lineHeight: 1,
                    color: "secondary.main",
                  }}
                >
                  REPAIR
                  <Box component="span" sx={{ color: "primary.main" }}>
                    TECH
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    fontSize: 9,
                    color: "text.secondary",
                    letterSpacing: 1.5,
                    mt: 0.5,
                  }}
                >
                  ELECTRONICS SERVICE
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                display: { xs: "none", md: "flex" },
              }}
            >
              <Button color="inherit">{t.services}</Button>

              <Button color="inherit">{t.howItWorks}</Button>

              <Button
                color="inherit"
                component={Link}
                href="/track"
              >
                Track Repair
              </Button>

              <Button
                color="inherit"
                startIcon={<LanguageIcon />}
                onClick={handleLanguageOpen}
                sx={{ minWidth: 120 }}
              >
                {language}
              </Button>

              <Menu
                anchorEl={languageAnchor}
                open={languageMenuOpen}
                onClose={handleLanguageClose}
              >
                <MenuItem
                  selected={language === "English"}
                  onClick={() => handleLanguageSelect("English")}
                >
                  English
                </MenuItem>

                <MenuItem
                  selected={language === "Français"}
                  onClick={() => handleLanguageSelect("Français")}
                >
                  Français
                </MenuItem>

                <MenuItem
                  selected={language === "Español"}
                  onClick={() => handleLanguageSelect("Español")}
                >
                  Español
                </MenuItem>
              </Menu>

              <Button
                color="inherit"
                component={Link}
                href="/admin"
              >
                Admin
              </Button>

              <Button
                component={Link}
                href="/book"
                variant="contained"
                startIcon={<BuildIcon />}
                sx={{
                  ml: 1,
                  bgcolor: "primary.main",
                  "&:hover": {
                    bgcolor: "#1d4e8a",
                  },
                }}
              >
                Book a Repair
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero */}
      <Box
        sx={{
          bgcolor: "secondary.main",
          color: "white",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={6}
            sx={{
              alignItems: "center",
            }}
          >
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={3}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "#DCEAF5",
                    fontWeight: 700,
                    letterSpacing: 1.5,
                  }}
                >
                  DOMPEZ INTERNATIONAL COMPUTER REPAIR
                </Typography>

                <Typography
                  component="h1"
                  sx={{
                    fontSize: {
                      xs: "2.5rem",
                      sm: "3.5rem",
                      md: "4.5rem",
                    },
                    fontWeight: 700,
                    lineHeight: 1.05,
                  }}
                >
                  {t.heroTitle1}
                  <br />
                  {t.heroTitle2}
                </Typography>

                <Typography
                  sx={{
                    color: "#D1D5DB",
                    fontSize: { xs: "1rem", md: "1.2rem" },
                    maxWidth: 650,
                    lineHeight: 1.7,
                  }}
                >
                  Fast, reliable electronic repair with transparent
                  service and real-time repair tracking.
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ pt: 1 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<BuildIcon />}
                    sx={{
                      bgcolor: "primary.main",
                      px: 3,
                      py: 1.5,
                      "&:hover": {
                        bgcolor: "#1d4e8a",
                      },
                    }}
                  >
                    Book a Repair
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<SearchIcon />}
                    sx={{
                      color: "white",
                      borderColor: "rgba(255,255,255,0.35)",
                      px: 3,
                      py: 1.5,
                    }}
                  >
                    Track My Repair
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            {/* Tracking Card */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Card
                elevation={10}
                sx={{
                  borderRadius: 3,
                  p: 2,
                }}
              >
                <CardContent>
                  <Stack spacing={3}>
                    <Box>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: 700 }}
                      >
                        Track Your Repair
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        Enter your tracking ID to see the current
                        status of your device.
                      </Typography>
                    </Box>

                    <TextField
                      fullWidth
                      value={trackingId}
                      onChange={(event) => {
                        setTrackingId(event.target.value);
                        if (trackingError) setTrackingError("");
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleTrackRepair();
                        }
                      }}
                      placeholder="e.g. DON-PH-2026-0817001"
                      error={Boolean(trackingError)}
                      helperText={trackingError}
                    />

                    <Button
                      variant="contained"
                      fullWidth
                      endIcon={<ArrowForwardIcon />}
                      onClick={handleTrackRepair}
                      sx={{
                        py: 1.5,
                        bgcolor: "secondary.main",
                        "&:hover": {
                          bgcolor: "primary.main",
                        },
                      }}
                    >
                      Track Repair
                    </Button>

                    {repair && (
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: "#EEF7F0",
                          border: "1px solid #C7E4CC",
                        }}
                      >
                        <Stack direction="row" spacing={1.5}>
                          <CheckCircleIcon
                            sx={{ color: "#2E7D32", mt: 0.25 }}
                          />

                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 700 }}
                            >
                              {repair.status}
                            </Typography>

                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary", mt: 0.5 }}
                            >
                              {repair.device}
                            </Typography>

                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary", mt: 1 }}
                            >
                              {repair.message}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    )}

                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        textAlign: "center",
                      }}
                    >
                      No customer account required.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services */}
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            textAlign: "center",
            mb: 6,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            DOMPEZ International Computer Repair Services
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              maxWidth: 650,
            }}
          >
            Professional repair services for phones, laptops,
            tablets, televisions, game consoles, appliances and
            other electronic devices.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {[
            ["Phones", "Screen, battery, charging port and motherboard repair."],
            [
              "Laptops",
              "Hardware, display, keyboard, charging and software issues.",
            ],
            ["Tablets", "Screen, battery, charging and hardware repairs."],
            [
              "TVs",
              "Display, power supply, board and component-level repairs.",
            ],
            [
              "Game Consoles",
              "HDMI, power, controller and motherboard repairs.",
            ],
            [
              "Appliances",
              "Diagnosis and repair of electronic household appliances.",
            ],
          ].map(([title, description]) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={title}>
              <Card
                sx={{
                  height: "100%",
                  transition: "0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: "primary.main",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      bgcolor: "#DCEAF5",
                      color: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <BuildIcon />
                  </Box>

                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    {title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                  >
                    {description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* AI teaser */}
      <Box sx={{ bgcolor: "white", py: 8 }}>
        <Container maxWidth="md">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{
              alignItems: "center",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                bgcolor: "secondary.main",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <SmartToyIcon fontSize="large" />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Need help?
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
              >
                Our repair assistant will help customers with common
                questions, repair tracking and service information.
              </Typography>
            </Box>

            <Button variant="outlined">{t.askAssistant}</Button>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: "secondary.main",
          color: "#D1D5DB",
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="body2">
            {t.footer}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
