---
title: "Designing PROVATEC around domain boundaries"
description: "How bounded contexts keep enrollment, forms, payments and administration understandable inside a Laravel platform."
date: "2026-09-18"
lang: "en"
tags: ["Architecture", "Laravel", "PROVATEC"]
translationKey: "provatec-domain-architecture"
draft: true
---

PROVATEC is an enrollment platform for a large annual medical board exam. Its work spans candidate registration, configurable forms, online payments and an administrative back office. Treating that as one undivided application would make every change depend on unrelated parts of the system.

## Boundaries that match the work

The Laravel backend is organized around four bounded contexts:

| Context | Responsibility |
| --- | --- |
| Candidate | Physician registration and enrollment data |
| FormBuilder | Configurable questions and enrollment flows |
| Payment | Online payment workflows |
| Admin | Back-office operations |

Each context owns its services, repositories and automatically loaded routes. The boundary gives a change a clear home and keeps framework-level organization aligned with the product language.

## A form builder instead of fixed screens

Enrollment requirements can change. The dynamic form builder lets the platform represent custom enrollment flows without requiring a code change for every form variation. That is an architectural decision as much as a product feature: configuration stays in the FormBuilder context instead of spreading conditional fields throughout candidate screens.

## Separate storage responsibilities

The platform uses PostgreSQL, MongoDB and Redis. The project record assigns MongoDB to the audit trail, while Laravel handles the main API and media workflows. The purpose of this mix is explicit responsibility, not novelty: transactional application data, audit history and short-lived operational data have different needs.

## Evolving the frontend without rewriting the domain

I built the first frontend in Next.js and later migrated it to SvelteKit. Separating domain boundaries helps keep frontend migrations focused on delivery without changing core business concepts.

The result is a system whose structure explains the business it supports. New work starts with the domain that owns it, rather than with a generic technical folder.
