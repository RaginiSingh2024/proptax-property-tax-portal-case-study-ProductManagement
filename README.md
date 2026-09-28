# PropTax — Online Property Tax Self-Assessment & Payment Portal

> A Software Engineering & Project Management case study for designing a proposed digital property tax self-assessment and payment portal.

[![Case Study](https://img.shields.io/badge/Case%20Study-141-1f6feb)](https://github.com/RaginiSingh2024)
[![Software Engineering](https://img.shields.io/badge/Software%20Engineering-Project-0f766e)](https://github.com/RaginiSingh2024)
[![Project Management](https://img.shields.io/badge/Project%20Management-Documentation-7c3aed)](https://github.com/RaginiSingh2024)
[![UI Prototype](https://img.shields.io/badge/UI-Prototype-f59e0b)](https://stitch.withgoogle.com/projects/12519224402147468096)

---

## Overview

**PropTax** is a proposed online property tax self-assessment and payment portal designed to digitize the property tax process for citizens.

The case study focuses on analysing the existing paper-based self-assessment process and designing a structured digital solution covering:

- Property search
- Property information
- Online self-assessment
- Property tax calculation
- Online payment
- Digital payment receipts
- Objection submission and tracking

The project is developed as a **Software Engineering & Project Management case study**, covering requirements engineering, system modelling, project planning, forecasting, testing, risk management, and project closure.

---

## Case Study Information

| Detail | Information |
|---|---|
| **Case Study No.** | 141 |
| **Project Name** | PropTax – Online Property Tax Self-Assessment & Payment Portal |
| **Subject** | Software Engineering & Project Management |
| **Student** | Ragini Singh |
| **Roll No.** | 150096724023 |
| **Programme** | B.Tech Computer Science & Engineering |
| **Batch** | 2025–29 |
| **Semester** | V |
| **Project Role** | Solution Architect |

---

## Problem Statement

The city has a population of approximately **9 lakh** and around **1.8 lakh properties**.

Currently, property tax collection is mainly handled through ward offices. Although self-assessment is legally allowed, the existing process is paper-based.

Property owners may face difficulty understanding property tax rate tables, which can lead to disputes and delays.

The proposed **PropTax** portal provides a digital workflow for property search, self-assessment, tax calculation, online payment, payment receipts, and an objection workflow.

The case study also states that the objection process involves legal procedures and may require additional time.

---

## Objectives

The primary objectives of the proposed PropTax system are:

- Digitize the property tax self-assessment process.
- Provide online property search.
- Allow citizens to view relevant property information.
- Provide a guided self-assessment workflow.
- Calculate applicable property tax.
- Enable online tax payment.
- Generate digital payment receipts.
- Provide an objection workflow.
- Improve accessibility and transparency of the property tax process.
- Reduce dependency on paper-based tax assessment and payment processes.

---

## Project Context

The case study provides the following project parameters:

| Parameter | Value |
|---|---:|
| City Population | 9 lakh |
| Number of Properties | 1.8 lakh |
| Search & Calculator Backlog | 34 points |
| Payment & Receipts Backlog | 21 points |
| Objections Workflow Backlog | 29 points |
| Velocity | 11 points / 2-week sprint |
| Time Available | 16 weeks |
| Year 1 Online Payment Target | 35% |

---

# System Scope

## Core Features

### 1. Property Search

Citizens can search for their property using available property information.

### 2. Property Details

The portal displays relevant property and ownership information required for assessment.

### 3. Self-Assessment

Citizens can enter property assessment information through a structured workflow.

### 4. Tax Calculation

The system calculates the applicable property tax based on assessment inputs and approved tax rules.

### 5. Online Payment

Citizens can complete the tax payment through an online payment workflow.

### 6. Payment Receipts

A digital payment receipt is generated after successful payment.

### 7. Objection Workflow

Citizens can submit and track objections related to property tax assessment.

> **Scope Note:** The objection workflow involves legal procedures and is analysed separately from the initial release scope.

---

# Citizen Workflow

The proposed citizen journey is:

```text
Login
  ↓
Dashboard
  ↓
Property Search
  ↓
Property Details
  ↓
Self-Assessment
  ↓
Tax Calculation
  ↓
Review Assessment
  ↓
Online Payment
  ↓
Payment Confirmation
  ↓
Digital Receipt
```

---

# Project Deliverables

This repository contains the major documentation and analysis deliverables developed for Case Study 141.

## 01 — Software Requirements Specification

The SRS defines the proposed system requirements and scope.

### Includes

- Introduction
- Purpose
- Problem Statement
- Objectives
- Stakeholders
- System Overview
- Scope
- Constraints
- Functional Requirements
- Non-Functional Requirements
- MoSCoW Prioritization
- Assumptions
- Requirements Traceability Matrix
- Release Scope Decision

**File:**

`Ragini_Singh_141_SRS_PropTax.docx`

---

## 02 — UML Package

The UML package models the proposed PropTax system.

### Diagrams Included

- Use Case Diagram
- Class Diagram
- Sequence Diagram
- Activity Diagram
- State Diagram

### Additional Analysis

- Cohesion
- Coupling
- UML consistency

**File:**

`Ragini_Singh_141_UML_Package.docx`

---

## 03 — Project Plan

The project planning document defines the development and release planning approach.

### Includes

- Work Breakdown Structure
- Network Diagram
- Dependency Analysis
- Critical Path
- Gantt Chart
- Sprint Planning
- Milestones
- Resource Allocation
- Release Scope Analysis

**File:**

`Ragini_Singh_141_Project_Plan.docx`

---

## 04 — Forecast Sheet

The forecast analysis uses the backlog and velocity provided in the case study.

### Core Release Calculation

The initial release considers:

```text
Search & Calculator     = 34 points
Payment & Receipts      = 21 points
-----------------------------------
Total                   = 55 points
```

Given:

```text
Velocity = 11 points / sprint
Sprint Duration = 2 weeks
```

Therefore:

```text
55 / 11 = 5 sprints

5 × 2 = 10 weeks
```

The core release therefore requires approximately **10 weeks**, leaving **6 weeks** within the 16-week period.

### Full Scope Calculation

Including the objections workflow:

```text
Search & Calculator     = 34 points
Payment & Receipts      = 21 points
Objections Workflow     = 29 points
-----------------------------------
Total                   = 84 points
```

Therefore:

```text
84 / 11 = 7.64 sprints

Required = 8 sprints

8 × 2 = 16 weeks
```

The complete backlog would therefore consume the available **16-week period** with no schedule buffer.

**File:**

`Ragini_Singh_141_Forecast_Sheet.xlsx`

---

# Testing & Quality Assurance

The testing deliverables cover the major workflows and quality considerations of the proposed system.

## Testing Techniques

- Boundary Value Analysis
- Equivalence Class Testing
- Decision Table Testing
- Functional Testing
- Payment Testing
- Receipt Testing
- Security Testing
- Requirements Traceability

## Test Documentation

The test plan contains:

- Test case register
- Defect log
- Defect density
- Defect Removal Efficiency
- Requirements-to-test-case traceability
- Test evidence structure

### Files

```text
Ragini_Singh_141_Test_Plan_Evidence.docx
Ragini_Singh_141_Test_Plan_Evidence.xlsx
```

> **Note:** Where the original case study does not provide actual test execution data, worked examples are explicitly identified as examples rather than actual production test results.

---

# Risk Management

The project risk analysis considers technical, schedule, data, security, payment, and legal dependencies.

## Major Risks Considered

| Risk | Impact |
|---|---|
| Legal requirements for objections | High |
| Incorrect tax rate/rebate rules | High |
| Payment gateway failure | High |
| Velocity below planned value | Medium |
| Unauthorized access/security issues | Medium |
| Property data quality issues | Medium |
| Late testing defects | Medium |

## Risk Management Approach

The risk documentation includes:

- Risk Register
- Probability × Impact Matrix
- Risk Exposure
- Risk Owners
- RMMM
- Issue Log
- Lessons Learned
- Closure Note

### Files

```text
Ragini_Singh_141_Risk_Register_Closure_Note.docx
Ragini_Singh_141_Risk_Register.xlsx
```

---

# Release Planning

The case study provides a backlog of **84 points** divided across three major areas:

```text
Search & Calculator       → 34 points
Payment & Receipts        → 21 points
Objections Workflow      → 29 points
```

With a velocity of **11 points per 2-week sprint**:

### Initial Release

```text
34 + 21 = 55 points

55 / 11 = 5 sprints

5 × 2 weeks = 10 weeks
```

### Full Scope

```text
34 + 21 + 29 = 84 points

84 / 11 = 7.64 sprints

Required = 8 sprints

8 × 2 weeks = 16 weeks
```

The objections workflow therefore introduces significant schedule and legal considerations.

---

# UI Prototype

A responsive web UI prototype was created to visually demonstrate the proposed PropTax portal.

The prototype represents the citizen-facing workflow and provides a visual representation of the proposed system.

## Prototype Screens

The UI concept covers:

- Login
- Citizen Dashboard
- Property Search
- Property Details
- Self-Assessment
- Tax Calculator
- Payment
- Payment Confirmation
- Digital Receipt
- Payment History
- Objection Workflow
- Help & Support

## Prototype Flow

```text
Login
  ↓
Dashboard
  ↓
Property Search
  ↓
Property Details
  ↓
Self-Assessment
  ↓
Tax Calculator
  ↓
Review
  ↓
Payment
  ↓
Success
  ↓
Receipt
```

### View UI Prototype

**[Open PropTax UI Prototype](https://stitch.withgoogle.com/projects/12519224402147468096)**

> The UI prototype is a supporting design/showcase for the case study. It is not a production application or live municipal payment system.

---

# Repository Structure

```text
proptax-property-tax-portal-case-study-ProductManagement/
│
├── 01-SRS/
│   └── Ragini_Singh_141_SRS_PropTax.docx
│
├── 02-UML/
│   └── Ragini_Singh_141_UML_Package.docx
│
├── 03-Project-Plan/
│   └── Ragini_Singh_141_Project_Plan.docx
│
├── 04-Forecast/
│   └── Ragini_Singh_141_Forecast_Sheet.xlsx
│
├── 05-Test-Plan-Evidence/
│   ├── Ragini_Singh_141_Test_Plan_Evidence.docx
│   └── Ragini_Singh_141_Test_Plan_Evidence.xlsx
│
├── 06-Risk-Register/
│   ├── Ragini_Singh_141_Risk_Register_Closure_Note.docx
│   └── Ragini_Singh_141_Risk_Register.xlsx
│
└── README.md
```

---

# Technology / Tools Used

The case study primarily focuses on software engineering and project management artefacts rather than implementation.

### Documentation & Modelling

- Software Requirements Specification
- UML
- Project Planning
- Agile Sprint Planning
- Risk Management
- Software Testing

### UI Prototyping

- Google Stitch / UI Prototyping

### Repository

- Git
- GitHub

---

# Assumptions & Data Limitations

The case study does not provide every implementation-level value required for a production system.

Therefore:

- Official tax rates are not invented.
- Official rebate percentages are not assumed.
- Exact tax calculation rules are not fabricated.
- Where numerical NFR targets are proposed, they are treated as proposed specification targets.
- BVA limits are represented symbolically where exact limits are not provided.
- Worked testing metrics are clearly identified as examples where actual execution data is unavailable.
- The UI prototype uses sample or placeholder values where the case study does not provide official values.

---

# Scope Boundary

This repository represents a **Software Engineering & Project Management case study and proposed system design**.

It does **not** represent:

- A production municipal portal
- A live government payment gateway
- A live property database
- Official municipal tax calculations
- A production authentication system
- A legally operational objection-processing system

The UI prototype is provided only for **visual demonstration and system understanding**.

---

# Key Outcomes

The case study demonstrates an end-to-end software engineering and project management approach:

```text
Problem Analysis
      ↓
Requirements Engineering
      ↓
SRS
      ↓
UML Modelling
      ↓
Project Planning
      ↓
Forecasting
      ↓
Testing & Quality Planning
      ↓
Risk Management
      ↓
Closure
      ↓
UI Prototype Showcase
```

---

# Skills Demonstrated

- Requirements Engineering
- Software Requirements Specification
- UML Modelling
- System Analysis
- Agile & Sprint Planning
- Work Breakdown Structure
- Project Scheduling
- Gantt Planning
- Network Planning
- Velocity-Based Forecasting
- Software Testing
- Risk Management
- RMMM
- Traceability
- Technical Documentation
- UI Prototyping
- Git & GitHub

---

# Academic & Portfolio Purpose

This repository has been created as an academic case study and portfolio showcase demonstrating the planning and design of the proposed **PropTax Online Property Tax Self-Assessment & Payment Portal**.

---

## Author

**Ragini Singh**

B.Tech Computer Science & Engineering  
Case Study No. 141  
Semester V

---

## Repository

**PropTax – Online Property Tax Self-Assessment & Payment Portal**

**GitHub:**  
https://github.com/RaginiSingh2024/proptax-property-tax-portal-case-study-ProductManagement

**UI Prototype:**  
https://stitch.withgoogle.com/projects/12519224402147468096

---

## License

This repository is intended for **academic and portfolio purposes**.

The PropTax system described in this repository is a proposed case-study solution and is not an official municipal property tax service.
