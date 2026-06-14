# Forslagstavle

En digital forslagstavle bygget med Django REST Framework og React + TypeScript.

## Funksjonalitet

- Legg til forslag med tittel og beskrivelse
- Se alle forslag som kort på tavlen
- Endre status på forslag (Ny / Gjennomgått / Godkjent / Avslått)
- Slette forslag

## Teknologier

**Backend:** Python, Django, Django REST Framework, SQLite  
**Frontend:** React, TypeScript, Tailwind CSS, Vite

## Kom i gang

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
python3 -m pip install django djangorestframework django-cors-headers
python3 manage.py migrate
python3 manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Åpne [http://localhost:5173](http://localhost:5173) i nettleseren.

## API-endepunkter

| Metode | URL | Beskrivelse |
|--------|-----|-------------|
| GET | /api/proposals/ | Hent alle forslag |
| POST | /api/proposals/ | Opprett nytt forslag |
| PATCH | /api/proposals/:id/ | Oppdater status |
| DELETE | /api/proposals/:id/ | Slett forslag |

## Hvis jeg hadde hatt mer tid
- Legge til flere måter å sortere og filtrere forslag på, slik at brukerne lettere kan finne relevante innlegg.
- Implementere automatisk gjenkjenning av lignende forslag, slik at forslag om samme tema kan slås sammen eller brukere kan oppfordres til å støtte eksisterende forslag i stedet for å opprette duplikater.
- Innføre dark mode for å forbedre brukeropplevelsen og tilgjengeligheten i ulike lysforhold.
- Legge til støtte for flere språk for å gjøre plattformen tilgjengelig for et bredere publikum.

## Tekniske valg

**Django REST Framework (backend)**
Jeg valgte Django fordi det er et modent og veldokumentert rammeverk for Python. Django REST Framework gjør det enkelt å bygge et REST API med lite kode — `ModelViewSet` gir automatisk støtte for GET, POST, PATCH og DELETE uten at man trenger å skrive disse metodene manuelt.

**SQLite (database)**
SQLite er innebygd i Django og krever ingen ekstra oppsett, noe som gjør det ideelt for en MVP. All data lagres i én fil (`db.sqlite3`) lokalt på maskinen.

**React + TypeScript (frontend)**
React gjør det enkelt å bygge dynamiske brukergrensesnitt der siden oppdaterer seg uten reload. TypeScript ble valgt for å få bedre feilmeldinger under utvikling og tydeligere struktur på dataene som sendes mellom frontend og backend.

**Vite**
Vite brukes som byggverktøy for frontend fordi det starter opp raskt og gir rask reload under utvikling.

**Tailwind CSS**
Tailwind gjør det raskt å style komponenter direkte i JSX uten å måtte skrive separate CSS-filer. Det passer godt for et prosjekt av denne størrelsen.