---
title: "Multi-tenancy as a boundary in Sigebra"
description: "How tenant isolation, permissions and multiple services shape a school management platform with a built-in learning environment."
date: "2026-09-18"
lang: "en"
tags: ["Multi-tenancy", "Laravel", "Sigebra"]
translationKey: "sigebra-multi-tenancy"
---

Sigebra is a multi-tenant school management system with a built-in Virtual Learning Environment. It has been adopted by six or more schools and spans a Laravel API, a SvelteKit web application, a background worker and a marketing site.

## A school is a tenant boundary

Domain-based multi-tenancy isolates each school in its own tenant. That boundary matters because school operations include users, roles, course content, lessons and student-facing flows. Tenant resolution establishes which school owns a request before application work continues.

Isolation also gives the architecture a useful rule: data and operations should always have an explicit tenant context. That rule is easier to review than a collection of optional school filters added query by query.

## Authentication and authorization have different jobs

JWT authentication carries identity across the web application and worker. Roles and permissions, implemented with Spatie Permissions, decide what that identity can do. Keeping those concerns distinct makes access decisions easier to follow:

| Concern | Question |
| --- | --- |
| Tenant | Which school owns this operation? |
| Authentication | Who is making the request? |
| Authorization | What may that person do? |

These checks support one another, but none is a substitute for another.

## One product, several services

The API, web application, worker and landing page run as separate services orchestrated with Docker. This shape allows each part to serve a focused responsibility while remaining part of the same product. OpenAPI documents the API contract between consumers and the Laravel backend.

The Virtual Learning Environment follows the same boundaries. Course content and lessons belong to the school tenant, and student-facing workflows consume the same protected platform capabilities.

For Sigebra, multi-tenancy is not an extra filter added after the product was designed. It is one of the first boundaries used to reason about every request.
