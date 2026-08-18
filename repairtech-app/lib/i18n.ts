export type Language = "English" | "Français" | "Español";

export const languages: Language[] = [
  "English",
  "Français",
  "Español",
];

export const translations = {
  English: {
    nav: {
      services: "Services",
      howItWorks: "How It Works",
      trackRepair: "Track Repair",
      admin: "Admin",
      bookRepair: "Book a Repair",
    },

    home: {
      professional: "DOMPEZ INTERNATIONAL COMPUTER REPAIR",
      heroTitle1: "Your Device.",
      heroTitle2: "Professionally Repaired.",
      heroDescription:
        "Expert Repairs. Global Solutions.",
      trackMyRepair: "Track My Repair",
      trackTitle: "Track Your Repair",
      trackDescription:
        "Enter your tracking ID to see the current status of your device.",
      trackButton: "Track Repair",
      noAccount: "No customer account required.",
      servicesTitle: "Electronic Repair Services",
      servicesDescription:
        "Professional repair services for phones, laptops, tablets, televisions, game consoles, appliances and other electronic devices.",
      needHelp: "Need help?",
      assistantDescription:
        "Our repair assistant will help customers with common questions, repair tracking and service information.",
      askAssistant: "Ask Assistant",
      footer:
        "© 2026 DOMPEZ INTERNATIONAL COMPUTER REPAIR. DOMPEZ INTERNATIONAL COMPUTER REPAIR — Expert Repairs. Global Solutions.",
      trackingRequired: "Please enter your tracking ID.",
      trackingNotFound:
        "We couldn't find that repair. Check the ID and try again.",
    },

    book: {
      backHome: "Back to Home",
      title: "Book a Repair",
      description:
        "Tell us about your device and the problem you're experiencing. We'll use these details to prepare your repair request.",
      deviceInformation: "Device Information",
      deviceType: "Device type",
      selectDevice: "Select your device",
      brand: "Brand",
      model: "Model",
      problem: "Describe the problem",
      problemPlaceholder:
        "Tell us what is wrong with the device...",
      customerInformation: "Customer Information",
      fullName: "Full name",
      phone: "Phone number",
      email: "Email address",
      notes: "Preferred contact / additional information",
      notesPlaceholder: "Anything else we should know?",
      submit: "Submit Repair Request",
      noPayment:
        "No payment is required at this stage. A technician will review the request before repair begins.",
      received: "Repair Request Received",
      receivedDescription:
        "Your repair request has been recorded successfully. Keep your tracking ID so you can check the status of your repair.",
      trackingId: "YOUR TRACKING ID",
      trackRepair: "Track Repair",
      returnHome: "Return Home",
    },

    track: {
      backHome: "Back to Home",
      title: "Track Your Repair",
      description:
        "Enter your DOMPEZ tracking ID to see the current status of your repair.",
      trackingId: "Tracking ID",
      track: "Track",
      requestReceived: "Repair Request Received",
      requestDescription:
        "Your repair request has been successfully received and is awaiting device inspection.",
      progress: "Repair Progress",
      inspection: "Device Inspection",
      inspectionDescription:
        "A technician will inspect your device.",
      inProgress: "Repair in Progress",
      inProgressDescription:
        "Your device is being repaired.",
      completed: "Repair Completed",
      completedDescription:
        "Your device is ready for collection.",
      preliminary:
        "This is a preliminary repair status. Updates will appear as your device moves through the repair process.",
      bookAnother: "Book Another Repair",
      loading: "Loading repair tracking...",
    },

    common: {
      language: "English",
    },
  },

  Français: {
    nav: {
      services: "Services",
      howItWorks: "Comment ça marche",
      trackRepair: "Suivre la réparation",
      admin: "Administration",
      bookRepair: "Réserver une réparation",
    },

    home: {
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
      footer:
        "© 2026 DOMPEZ INTERNATIONAL COMPUTER REPAIR. Services professionnels de réparation électronique.",
      trackingRequired: "Veuillez saisir votre numéro de suivi.",
      trackingNotFound:
        "Nous n'avons pas trouvé cette réparation. Vérifiez le numéro et réessayez.",
    },

    book: {
      backHome: "Retour à l'accueil",
      title: "Réserver une réparation",
      description:
        "Indiquez-nous votre appareil et le problème rencontré. Ces informations nous aideront à préparer votre demande de réparation.",
      deviceInformation: "Informations sur l'appareil",
      deviceType: "Type d'appareil",
      selectDevice: "Sélectionnez votre appareil",
      brand: "Marque",
      model: "Modèle",
      problem: "Décrivez le problème",
      problemPlaceholder:
        "Indiquez-nous ce qui ne fonctionne pas avec l'appareil...",
      customerInformation: "Informations client",
      fullName: "Nom complet",
      phone: "Numéro de téléphone",
      email: "Adresse e-mail",
      notes: "Contact préféré / informations supplémentaires",
      notesPlaceholder: "Y a-t-il autre chose que nous devrions savoir ?",
      submit: "Envoyer la demande de réparation",
      noPayment:
        "Aucun paiement n'est requis à cette étape. Un technicien examinera la demande avant le début de la réparation.",
      received: "Demande de réparation reçue",
      receivedDescription:
        "Votre demande de réparation a été enregistrée avec succès. Conservez votre numéro de suivi pour consulter l'état de votre réparation.",
      trackingId: "VOTRE NUMÉRO DE SUIVI",
      trackRepair: "Suivre la réparation",
      returnHome: "Retour à l'accueil",
    },

    track: {
      backHome: "Retour à l'accueil",
      title: "Suivez votre réparation",
      description:
        "Entrez votre numéro de suivi DOMPEZ pour voir l'état actuel de votre réparation.",
      trackingId: "Numéro de suivi",
      track: "Suivre",
      requestReceived: "Demande de réparation reçue",
      requestDescription:
        "Votre demande de réparation a bien été reçue et attend l'inspection de l'appareil.",
      progress: "Progression de la réparation",
      inspection: "Inspection de l'appareil",
      inspectionDescription:
        "Un technicien inspectera votre appareil.",
      inProgress: "Réparation en cours",
      inProgressDescription:
        "Votre appareil est en cours de réparation.",
      completed: "Réparation terminée",
      completedDescription:
        "Votre appareil est prêt à être récupéré.",
      preliminary:
        "Ceci est un état préliminaire de la réparation. Les mises à jour apparaîtront au fur et à mesure de l'avancement.",
      bookAnother: "Réserver une autre réparation",
      loading: "Chargement du suivi de réparation...",
    },

    common: {
      language: "Français",
    },
  },

  Español: {
    nav: {
      services: "Servicios",
      howItWorks: "Cómo funciona",
      trackRepair: "Seguir reparación",
      admin: "Administración",
      bookRepair: "Reservar una reparación",
    },

    home: {
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
      footer:
        "© 2026 DOMPEZ INTERNATIONAL COMPUTER REPAIR. Servicios profesionales de reparación electrónica.",
      trackingRequired: "Introduce tu número de seguimiento.",
      trackingNotFound:
        "No encontramos esa reparación. Comprueba el número e inténtalo de nuevo.",
    },

    book: {
      backHome: "Volver al inicio",
      title: "Reservar una reparación",
      description:
        "Cuéntanos sobre tu dispositivo y el problema que presenta. Usaremos estos datos para preparar tu solicitud de reparación.",
      deviceInformation: "Información del dispositivo",
      deviceType: "Tipo de dispositivo",
      selectDevice: "Selecciona tu dispositivo",
      brand: "Marca",
      model: "Modelo",
      problem: "Describe el problema",
      problemPlaceholder:
        "Cuéntanos qué ocurre con el dispositivo...",
      customerInformation: "Información del cliente",
      fullName: "Nombre completo",
      phone: "Número de teléfono",
      email: "Correo electrónico",
      notes: "Contacto preferido / información adicional",
      notesPlaceholder: "¿Hay algo más que debamos saber?",
      submit: "Enviar solicitud de reparación",
      noPayment:
        "No se requiere ningún pago en esta etapa. Un técnico revisará la solicitud antes de comenzar la reparación.",
      received: "Solicitud de reparación recibida",
      receivedDescription:
        "Tu solicitud de reparación se ha registrado correctamente. Conserva tu número de seguimiento para consultar el estado de tu reparación.",
      trackingId: "TU NÚMERO DE SEGUIMIENTO",
      trackRepair: "Seguir reparación",
      returnHome: "Volver al inicio",
    },

    track: {
      backHome: "Volver al inicio",
      title: "Sigue tu reparación",
      description:
        "Introduce tu número de seguimiento de RepairTech para ver el estado actual de tu reparación.",
      trackingId: "Número de seguimiento",
      track: "Seguir",
      requestReceived: "Solicitud de reparación recibida",
      requestDescription:
        "Tu solicitud de reparación se ha recibido correctamente y está pendiente de inspección.",
      progress: "Progreso de la reparación",
      inspection: "Inspección del dispositivo",
      inspectionDescription:
        "Un técnico inspeccionará tu dispositivo.",
      inProgress: "Reparación en curso",
      inProgressDescription:
        "Tu dispositivo está siendo reparado.",
      completed: "Reparación completada",
      completedDescription:
        "Tu dispositivo está listo para recoger.",
      preliminary:
        "Este es un estado preliminar de la reparación. Las actualizaciones aparecerán a medida que avance el proceso.",
      bookAnother: "Reservar otra reparación",
      loading: "Cargando el seguimiento de reparación...",
    },

    common: {
      language: "Español",
    },
  },
} as const;
