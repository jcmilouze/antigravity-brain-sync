# Design Document: Modular Teacher CRM ("CRM Prof")

**Date:** 2026-03-18
**Status:** Draft
**Author:** Antigravity (Tech Lead)

## 1. Vision & Goals
Create a professional, modular, and premium CRM for teachers to manage their daily tasks.
- **Mono-user**: Local/Personal deployment focus.
- **Modular**: Users can activate/deactivate features (Internships, Life Skills, etc.).
- **Pronote Integration**: Easy start by importing student data.
- **Aesthetics**: Premium UI with glassmorphism and smooth animations.

## 2. Technical Stack
- **Framework**: Next.js 15 (App Router) - For unified UI and API.
- **Styling**: Tailwind CSS v4 - For high-end design tokens.
- **Database**: PostgreSQL - Robust and scalable.
- **ORM**: Prisma - Type-safe database access.
- **Icons**: Lucide React - Clean and consistent.
- **Charts**: Recharts - For student progress and life skills visualization.

## 3. Modular Architecture
The application will follow a **Core + Plugins** pattern:

### 3.1 Core (Locked)
- **Class Management**: Name, level, school year.
- **Student Management**: First name, last name, class, Pronote ID.
- **Settings**: Module activation/deactivation.
- **Import Engine**: CSV parser for Pronote exports.

### 3.2 Modules (Toggleable)
- **Module: Life Skills (Vie de classe)**
    - Track "Savoir-être" (Respect, Material, Attire, Participation).
    - History of observations.
- **Module: Internships (Stages/PFMP)**
    - Company database (Name, Address, Tutor).
    - Internship periods (Dates, Student, Company).
    - *Note: No convention management as requested.*
- **Module: Lesson Log (Cahier de texte)**
    - Séquences & Séances.
    - File attachments (links to resources).
- **Module: Agenda**
    - Weekly view of classes.
    - Deadlines and reminders.

## 4. Data Model (High-Level)
- `Class`: id, name, level.
- `Student`: id, firstName, lastName, classId, pronoteId.
- `Company`: id, name, address, contactName.
- `Internship`: id, studentId, companyId, startDate, endDate.
- `LifeSkillEntry`: id, studentId, category (RESPECT, MATERIAL, etc.), value (positive/negative), date, comment.
- `Lesson`: id, classId, title, content, date.

## 5. Pronote Import Strategy
1. User exports a CSV/Excel from Pronote.
2. User uploads file to the CRM.
3. CRM parses the file (Mapping: Last Name, First Name, Class).
4. CRM reconciles or creates new students/classes.

## 6. UI/UX Design
- **Theme**: Dark mode by default with deep purples/blues.
- **Glassmorphism**: Translucent cards with subtle borders.
- **Animations**: Framer Motion for page transitions and card hovers.
- **Dashboard**: Modular grid where each active module shows a summary widget.
