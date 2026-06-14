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