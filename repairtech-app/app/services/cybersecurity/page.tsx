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
              Cybersecurity
            </Typography>

            <Typography
              variant="h6"
              sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 400, lineHeight: 1.7 }}
            >
              Practical cybersecurity services that help protect your systems, accounts and business information.
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
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key="Security Assessments">
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
                    Security Assessments
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Identify common security weaknesses across your business technology.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key="Computer & Network Security">
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
                    Computer & Network Security
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Improve the security of computers, networks and connected devices.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key="Malware & Virus Protection">
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
                    Malware & Virus Protection
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Help protect business devices against malware, viruses and other common threats.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key="Basic Incident Response">
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
                    Basic Incident Response
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Practical assistance when a business experiences a basic security incident.
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

