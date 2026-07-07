# MealsApp

## Progetto e autore

- Progetto: MealsApp
- Autore: Micheal Alibrando

## Obiettivo

Applicazione mobile Expo/React Native per esplorare ricette italiane, visualizzare dettagli, salvare preferiti e accedere tramite login mock.

## Prerequisiti

Prima di iniziare assicurati di avere:

- Node.js LTS installato
- Expo Go installato sul tuo dispositivo Android/iPhone oppure un emulatore compatibile
- Un terminale con accesso a npm

## Installazione e avvio

Esegui questi comandi da terminale:

```bash
git clone <url-repo>
cd <nome-cartella>
npm install
npx expo start
```

Dopo l’avvio:

- premi `a` per aprire su Android
- oppure scansiona il QR code con Expo Go

## API usate

L’app usa TheMealDB per recuperare i dati delle ricette.

- Endpoint elenco: `GET /filter.php?a=Italian`
- Endpoint dettaglio: `GET /lookup.php?i={id}`
- Documentazione ufficiale: https://www.themealdb.com/api.php

## Utenti mock per il login

| Email                     | Password    | Nome           |
| ------------------------- | ----------- | -------------- |
| mario.rossi@student.it    | React2026!  | Mario Rossi    |
| giulia.bianchi@student.it | Expo2026!   | Giulia Bianchi |
| luca.verdi@student.it     | Mobile2026! | Luca Verdi     |

## Deep linking

Il progetto è configurato per aprire il dettaglio di un piatto tramite un percorso del tipo:

```text
meal/:idMeal
```

Esempio di test da Expo Go:

```text
exp://<your-expo-ip>:8081/--/meal/52772
```

## Google Doc

Link al documento con screenshot dei laboratori 13–22:
https://docs.google.com/document/d/1RXdJJVh4GlMYAngYksM9MLcUvdgkYoO3lizdgMCK36Y/edit?tab=t.r1a4okuds53

## Scelta dello stato globale

Lo stato globale è gestito con React Context per autenticazione, preferiti e tema.
Questa scelta è stata fatta per condividere facilmente i dati tra più schermate senza ricorrere a prop drilling e senza introdurre una libreria di stato più complessa per un progetto di questa dimensione.

## Edge case gestiti

L’app gestisce i seguenti casi:

- rete/API non disponibile: mostra errore e pulsante retry
- login fallito: messaggio di errore in schermata
- lista vuota o nessun risultato: messaggio esplicito
- preferiti: salvataggio persistente e visualizzazione nella schermata dedicata
- deep link invalido o meal non trovato: schermata di fallback

## Feature opzionali incluse

Tra le feature extra implementate troviamo:

- tema chiaro/scuro
- preferiti persistenti
- deep linking per i dettagli del piatto
- condivisione della ricetta
