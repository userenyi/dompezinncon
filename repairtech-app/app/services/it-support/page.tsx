import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function ServicePage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      <Box
        component="header"
        sx={{
          bgcolor: "secondary.main",
          color: "white",
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3} sx={{ maxWidth: 800 }}>
            <Typography
              variant="overline"
              sx={{ fontWeight: 700, letterSpacing: 1.5 }}
            >
              RepairTech Services
            </Typography>

            <Typography
              variant="h1"
              sx={{ fontWeight: 800, fontSize: "3rem", lineHeight: 1.1 }}
            >
              IT Support
            </Typography>

            <Typography
              variant="h6"
              sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 400, lineHeight: 1.7 }}
            >
              Reliable technology support that keeps your business connected, productive and running smoothly.
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Stack spacing={1} sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            What We Offer
          </Typography>

          <Typography color="text.secondary">
            Practical technology services tailored to your organization.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key="Computer & Office IT Support">
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                    Computer & Office IT Support
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Practical support for computers, printers, software and everyday office technology.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key="Network Setup & Support">
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                    Network Setup & Support
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Help setting up and maintaining reliable business networks and connectivity.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key="Software Installation & Configuration">
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                    Software Installation & Configuration
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Installation, configuration and troubleshooting for essential business software.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key="IT Maintenance">
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                    IT Maintenance
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Regular maintenance and troubleshooting to keep business technology working reliably.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
        </Grid>

        <Card
          elevation={0}
          sx={{
            mt: 6,
            p: 4,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Need help with your technology?
              </Typography>
              <Typography color="text.secondary">
                Contact RepairTech to discuss your requirements.
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="secondary"
              href="/book"
            >
              Book a Service
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}

